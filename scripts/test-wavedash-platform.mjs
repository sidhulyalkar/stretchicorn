import assert from'node:assert/strict';
import vm from'node:vm';
import {readFileSync} from'node:fs';
import {TextEncoder,TextDecoder} from'node:util';

const source=readFileSync('src/wavedash-platform.js','utf8');
const raf=[],listeners={},events={},stats=new Map(),achievements=new Set(),boards=[],uploads=[],ugc=[],deletedUGC=[],presence=[],files=new Map(),entries=new Map();
let now=0,initCalls=0,backendOnline=false,ugcSeq=0,timerSeq=0,leaderboardPopulation=0;
const timers=new Map();
const settle=async(n=16)=>{for(let i=0;i<n;i++)await new Promise(resolve=>setImmediate(resolve))};
const tick=()=>{assert(raf.length,'monitor RAF should be installed');const fn=raf.shift();now+=16;fn(now)};
const trigger=name=>events[name]?.({isConnected:name==='connected',hasEverConnected:true,connectionCount:1,connectionRetries:0});

const storage={SV:'1,1,1','SB0.7':'6000','SB1.0':'1000'};
const localStorage=new Proxy(storage,{get:(o,k)=>o[k],set:(o,k,v)=>(o[k]=String(v),true)});
files.set('remote:stretchicorn/profile-v1.json',new TextEncoder().encode(JSON.stringify({
  version:1,timestamp:1,settings:'0,1,0',best:{easy:5000,normal:2000,hard:0,impossible:0},
})));

const better=(id,next,current)=>id.includes('Clear Time')?next<current:next>current;
const SDK={
  LeaderboardSortOrder:{ASC:0,DESC:1},
  LeaderboardDisplayType:{NUMERIC:0,TIME_MILLISECONDS:2},
  UGCType:{GAME_MANAGED:3},UGCVisibility:{PUBLIC:0},
  Events:{BACKEND_CONNECTED:'connected',BACKEND_DISCONNECTED:'disconnected',BACKEND_RECONNECTING:'reconnecting',STATS_STORED:'stats-stored',MUTE_CHANGED:'mute',FULLSCREEN_CHANGED:'fullscreen'},
  updateLoadProgressZeroToOne:v=>assert.equal(v,1),
  init:opts=>{initCalls++;assert.equal(opts.deferEvents,true);return true},
  on:(name,fn)=>events[name]=fn,
  readyForEvents:()=>{backendOnline=true;trigger('connected')},
  getUsername:()=> 'tester',getUserId:()=> 'user-1',getUser:()=>({username:'tester',id:'user-1'}),
  isMuted:()=>false,isFullscreen:()=>false,
  listFriends:async()=>({success:true,data:[{isOnline:true},{isOnline:false}]}),
  updateUserPresence:async p=>(presence.push(p),{success:true}),
  requestStats:async()=>({success:true,data:true}),
  getStat:id=>stats.get(id)||0,
  setStat:(id,v)=>(stats.set(id,v),true),
  getAchievement:id=>achievements.has(id),
  setAchievement:id=>(achievements.add(id),true),
  storeStats:()=>{queueMicrotask(()=>events['stats-stored']?.({success:true}));return true},
  remoteFileExists:async path=>({success:true,data:files.has(`remote:${path}`)}),
  writeLocalFile:async(path,bytes)=>(files.set(path,bytes),true),
  uploadRemoteFile:async path=>{if(!backendOnline)return{success:false};files.set(`remote:${path}`,files.get(path));return{success:true,data:path}},
  downloadRemoteFile:async path=>{if(!backendOnline||!files.has(`remote:${path}`))return{success:false};files.set(path,files.get(`remote:${path}`));return{success:true,data:path}},
  readLocalFile:async path=>files.get(path)||null,
  getOrCreateLeaderboard:async(name,sort,display)=>{if(!backendOnline)return{success:false};if(!boards.some(b=>b.name===name))boards.push({name,sort,display});return{success:true,data:{id:'lb-'+name,name,totalEntries:leaderboardPopulation}}},
  getMyLeaderboardEntries:async id=>({success:true,data:entries.has(id)?[entries.get(id)]:[]}),
  listLeaderboardEntries:async(id,start,count)=>({success:true,data:Array.from({length:Math.min(count,leaderboardPopulation)},(_,i)=>({userId:`u-${i}`,username:`p${i}`,score:10000-i,globalRank:i+1}))}),
  uploadLeaderboardScore:async(id,score,keepBest,ugcId,metadata)=>{
    if(!backendOnline)return{success:false};
    const previous=entries.get(id);
    const scoreChanged=!previous||!keepBest||better(id,score,previous.score);
    const saved=scoreChanged?{userId:'user-1',username:'tester',score,globalRank:3,ugcId,metadata}:previous;
    entries.set(id,saved);
    uploads.push({id,score,keepBest,ugcId,metadata,scoreChanged});
    return{success:true,data:{globalRank:saved.globalRank,submittedRank:4,scoreChanged,score:saved.score,submittedScore:score}};
  },
  createUGCItem:async(type,title,description,visibility,path)=>{if(!backendOnline)return{success:false};const id=`ugc-${++ugcSeq}`;ugc.push({id,type,title,description,visibility,path});return{success:true,data:id}},
  deleteUGCItem:async id=>(deletedUGC.push(id),{success:true,data:id}),
};

const sandbox={
  console,TextEncoder,TextDecoder,localStorage,performance:{now:()=>now},
  requestAnimationFrame:fn=>(raf.push(fn),raf.length),
  setTimeout:(fn,delay)=>{const id=++timerSeq;timers.set(id,{fn,delay});return id},
  clearTimeout:id=>timers.delete(id),
  addEventListener:(name,fn)=>listeners[name]=fn,
  window:{Wavedash:SDK},
  D:1,mode:0,wave:1,score:0,runT:0,hearts:13,kills:0,combo:1,queen:0,kick:0,snap:0,slashKillGain:0,
  A:{x:445,y:360},P:{x:500,y:360},V:[1,1,1],
  reset(w=1){sandbox.wave=w;sandbox.score=0;sandbox.runT=0;sandbox.hearts=13;sandbox.kills=0;sandbox.combo=1;sandbox.kick=0;sandbox.snap=0;sandbox.queen=0;sandbox.mode=1;return`reset:${w}`},
  startKick(){if(sandbox.kick>0)return'blocked';sandbox.kick=.24;sandbox.snap=sandbox.nextSnap??1;return'kick'},nextSnap:1,
  lucky(){return'lucky'},
  killE(){sandbox.kills++;return'kill'},
  kickCollisions(){const n=sandbox.slashKillGain;sandbox.slashKillGain=0;for(let i=0;i<n;i++)sandbox.killE({});return'collisions'},
  hurt(){sandbox.hearts--;return'hurt'},
  say(message){return`say:${message}`},
  save(){storage.SV=sandbox.V.join(',');return'save'},
};
sandbox.window.window=sandbox.window;
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:'wavedash-platform.js'});
await settle();

const platform=sandbox.window.__stretchicornWavedash;
assert.equal(initCalls,1,'SDK must initialize exactly once');
assert.equal(platform.online,true,'deferred BACKEND_CONNECTED should mark platform online');
assert.equal(boards.length,8,'four difficulties should create Style + Clear Time boards');
assert.equal(new Set(boards.map(b=>b.name)).size,8,'leaderboard names must be unique');
assert.deepEqual(boards.map(({name,sort,display})=>({name,sort,display})),[
  {name:'Style - Easy',sort:1,display:0},{name:'Style - Normal',sort:1,display:0},
  {name:'Style - Hard',sort:1,display:0},{name:'Style - Impossible',sort:1,display:0},
  {name:'Clear Time - Easy',sort:0,display:2},{name:'Clear Time - Normal',sort:0,display:2},
  {name:'Clear Time - Hard',sort:0,display:2},{name:'Clear Time - Impossible',sort:0,display:2},
],'core boards must use the release-contract names, ordering, and display types');
assert.equal(platform.username,'tester');
assert.equal(platform.friendsOnline,1);
assert(presence.length,'presence should be published after connection');
assert.equal(storage.SV,'0,1,0','cloud settings should restore over the local profile');
assert.equal(storage['SB0.7'],'6000','monotonic merge must keep the stronger local Easy best');
assert.equal(storage['SB1.0'],'2000','monotonic merge must restore the stronger remote Normal best');
const mergedCloud=JSON.parse(new TextDecoder().decode(files.get('remote:stretchicorn/profile-v1.json')));
assert.equal(mergedCloud.settings,'0,1,0');
assert.equal(mergedCloud.best.easy,6000);assert.equal(mergedCloud.best.normal,2000);

assert.equal(platform.runEligible,false,'a clear cannot qualify until reset() explicitly starts Trial 1');
sandbox.nextSnap=2;sandbox.startKick();sandbox.lucky();sandbox.killE({});sandbox.slashKillGain=5;sandbox.kickCollisions();sandbox.hurt();
for(const message of ['PARRY!','GRAZE!','WALL SMASH','PRISM COB POWER','GOLD COB • 2X'])sandbox.say(message);
sandbox.combo=4;tick();
assert.equal(achievements.size,0,'menu/out-of-run calls must never unlock gameplay achievements');
assert.equal(stats.size,0,'menu/out-of-run calls must never mutate gameplay stats');

sandbox.D=.7;
assert.equal(sandbox.reset(5),'reset:5','reset wrapper must preserve frozen game return value');
tick();
assert.equal(platform.runEligible,false,'mid-campaign retry must be unranked');
platform.trace=Array.from({length:30},(_,i)=>[i*100,400+i,350,470+i,350]);
sandbox.score=999999;sandbox.runT=.25;sandbox.wave=13;sandbox.mode=5;
tick();
await settle();
assert.equal(uploads.length,0,'checkpoint clear must never submit Style/time leaderboards');
assert.equal(ugc.length,0,'checkpoint clear must never create replay UGC');
assert(!achievements.has('EASY_CLEAR'),'checkpoint clear must not unlock full-campaign achievements');
assert.equal(stats.get('RUNS_CLEARED')||0,0,'checkpoint clear must not increment full campaign clears');

assert.equal(sandbox.reset(1),'reset:1');
tick();
assert.equal(platform.runEligible,true,'Trial 1 start must be rank eligible');
sandbox.nextSnap=0;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert.equal(stats.get('TOTAL_SNAPS')||0,0);assert(!achievements.has('FIRST_SNAP'),'an uncharged kick must not count as a Rainbow Snap');
sandbox.nextSnap=1;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert.equal(stats.get('TOTAL_SNAPS'),1);assert(achievements.has('FIRST_SNAP'));
sandbox.runT=1;sandbox.nextSnap=2;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert(achievements.has('DOUBLE_RAINBOW'));assert(!achievements.has('PRISM_BREAK'),'Double Rainbow without Prism must not unlock Prism Break');
sandbox.runT=10;assert.equal(sandbox.say('PRISM COB POWER'),'say:PRISM COB POWER');sandbox.runT=13.1;
sandbox.nextSnap=2;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert(!achievements.has('PRISM_BREAK'),'Double Rainbow after the three-second Prism window must not unlock Prism Break');
sandbox.runT=20;assert.equal(sandbox.say('PRISM COB POWER'),'say:PRISM COB POWER');sandbox.runT=22.9;
sandbox.nextSnap=2;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert.equal(stats.get('DOUBLE_RAINBOWS'),3);assert(achievements.has('PRISM_BREAK'));
assert.equal(sandbox.lucky(),'lucky');assert.equal(stats.get('LUCKY_13S'),1);assert(achievements.has('LUCKY_13'));
for(let i=0;i<12;i++)assert.equal(sandbox.say('PARRY!'),'say:PARRY!');
assert(achievements.has('KERNEL_PARRY'));assert(!achievements.has('RETURN_DEPARTMENT'),'twelve parries must not satisfy the thirteen-parry rule');
assert.equal(sandbox.say('PARRY!'),'say:PARRY!');
assert.equal(stats.get('PARRIES'),13);assert(achievements.has('KERNEL_PARRY'));assert(achievements.has('RETURN_DEPARTMENT'));
for(let i=0;i<12;i++)assert.equal(sandbox.say('GRAZE!'),'say:GRAZE!');
assert(achievements.has('CLOSE_SHAVE'));assert(!achievements.has('THREAD_NEEDLE'),'twelve grazes must not satisfy Great Grazer');
sandbox.hurt();sandbox.say('GRAZE!');
assert(!achievements.has('THREAD_NEEDLE'),'a heart loss earlier in the Trial must invalidate Great Grazer for that Trial');
platform.lastWave=1;sandbox.wave=2;tick();
for(let i=0;i<13;i++)sandbox.say('GRAZE!');
assert.equal(stats.get('TOTAL_GRAZES'),26);assert(achievements.has('THREAD_NEEDLE'),'a fresh Trial with thirteen clean grazes should unlock Great Grazer');
for(let i=0;i<4;i++)sandbox.say('WALL SMASH');
assert(!achievements.has('WALL_TO_WALL'),'four Wall Smashes must not satisfy Wall to Wall');sandbox.say('WALL SMASH');
assert.equal(stats.get('WALL_SMASHES'),5);assert(achievements.has('WALL_TO_WALL'));
for(const message of ['HEART KERNEL +1','HUSK SHIELD','BUTTER BOOST'])sandbox.say(message);
assert(!achievements.has('FULL_PANTRY'),'four unique powerup types must not satisfy Full Pantry');sandbox.say('GOLD COB • 2X');
assert.equal(stats.get('POWERUPS_COLLECTED'),6);assert(achievements.has('FULL_PANTRY'));
sandbox.kick=0;sandbox.nextSnap=1;sandbox.startKick();sandbox.slashKillGain=4;sandbox.kickCollisions();
assert(!achievements.has('CORN_COMBINE'),'four defeats in one slash must not satisfy Corn Combine');
sandbox.kick=0;sandbox.nextSnap=1;sandbox.startKick();sandbox.slashKillGain=5;
assert.equal(sandbox.kickCollisions(),'collisions');assert.equal(stats.get('BEST_SLASH_KILLS'),5);assert(achievements.has('CORN_COMBINE'));
sandbox.combo=3.9;sandbox.runT+=1;tick();assert(!achievements.has('MAX_COMBO'),'combo below x4 must not unlock Rainbow Engine');
sandbox.combo=4;for(let i=0;i<12;i++){sandbox.runT+=1;tick()}
assert(achievements.has('MAX_COMBO'));assert(!achievements.has('FULL_SPECTRUM'),'less than thirteen x4 seconds must not satisfy Full Spectrum');
sandbox.runT+=1;tick();assert(achievements.has('FULL_SPECTRUM'));
sandbox.combo=1;

platform.lastWave=5;sandbox.wave=6;sandbox.mode=1;tick();
assert(achievements.has('HUSK_CLEAR'),'Trial 5 full-run transition should unlock HUSK_CLEAR');
platform.lastWave=9;sandbox.wave=10;tick();
assert(achievements.has('COLONEL_CLEAR'),'Trial 9 full-run transition should unlock COLONEL_CLEAR');
platform.trace=Array.from({length:30},(_,i)=>[i*100,400+i,350,470+i,350]);
sandbox.wave=13;sandbox.score=2345;sandbox.runT=123.456;sandbox.hearts=13;sandbox.kills=42;sandbox.combo=4;sandbox.queen=0;sandbox.mode=5;
tick();
await settle(30);
assert(achievements.has('EASY_CLEAR'));assert(achievements.has('FULL_HEARTS'));
assert(!achievements.has('NO_POWER_EASY'),'run that collected powerups must not earn a purist clear');
assert.equal(stats.get('RUNS_CLEARED'),1,'only the full campaign should count as cleared');
assert.equal(ugc.length,1,'Style PB should create one GAME_MANAGED replay trace');
assert.equal(uploads.length,2,'full clear should upload Style and Clear Time');
const firstStyle=uploads.find(u=>u.id.includes('Style'));
const firstTime=uploads.find(u=>u.id.includes('Clear Time'));
assert.equal(firstStyle.ugcId,'ugc-1');assert.equal(firstStyle.score,2345);assert.equal(firstStyle.metadata.fullRun,1);assert.equal(firstStyle.metadata.powerups,6);assert.equal(firstStyle.metadata.bestSlash,5);
assert.equal(firstTime.score,123456);assert.equal(firstTime.metadata.fullRun,1);assert.equal(firstTime.metadata.grazes,26);
assert.equal(ugc[0].type,3);assert.equal(ugc[0].visibility,0);assert.match(ugc[0].path,/^replays\/stretchicorn-user-1-\d+-\d+\.json$/);
assert(!achievements.has('THIRTEEN_FASTER'),'first recorded clear establishes a baseline and must not award a PB achievement');
assert(!achievements.has('DUAL_PB'),'first recorded clear must not award the dual-PB achievement');
assert.equal(stats.get('PB_IMPROVED_EASY')||0,0,'first recorded clear must not increment PB improvement stats');
assert.equal(platform.pendingRuns.length,0,'successful submission should leave no retry residue');

trigger('disconnected');backendOnline=false;
assert.equal(platform.online,false);
sandbox.reset(1);tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,410+i,360,480+i,360]);
sandbox.wave=13;sandbox.score=3456;sandbox.runT=100;sandbox.hearts=12;sandbox.kills=50;sandbox.combo=4;sandbox.mode=5;
tick();
await settle();
assert(achievements.has('NO_POWER_EASY'),'zero-powerup full clear should unlock the Easy purist achievement');
assert.equal(uploads.length,2,'offline clear must queue instead of attempting remote scores');
assert.equal(platform.pendingRuns.length,1,'offline full run should persist in local retry queue');
assert(files.has('stretchicorn/pending-ranked-runs-v1.json'),'retry queue must be backed by Wavedash local storage');

backendOnline=true;trigger('connected');
await settle(40);
assert.equal(platform.pendingRuns.length,0,'reconnect should drain queued ranked runs');
assert.equal(uploads.length,4,'reconnect should submit both queued leaderboards exactly once');
assert.equal(ugc.length,2,'better queued Style run should attach a second replay trace');
assert.equal(platform.lastResult.styleRank,3);assert.equal(platform.lastResult.timeRank,3);
assert(achievements.has('THIRTEEN_FASTER'),'23.456 second PB improvement should earn THIRTEEN_FASTER');
assert(achievements.has('DUAL_PB'),'simultaneous established Style/time improvements should earn DUAL_PB');
assert.equal(stats.get('PB_IMPROVED_EASY'),1);

// Losing and then restoring a heart may satisfy FULL_HEARTS, but never UNTOUCHED.
sandbox.mode=0;tick();sandbox.D=1.6;sandbox.reset(1);tick();sandbox.hurt();sandbox.hearts=13;
platform.trace=Array.from({length:30},(_,i)=>[i*100,415+i,365,485+i,365]);
sandbox.wave=13;sandbox.score=4300;sandbox.runT=110;sandbox.kills=55;sandbox.combo=4;sandbox.mode=5;
tick();await settle(40);
assert(achievements.has('HARD_CLEAR'));assert(achievements.has('NO_POWER_HARD'));
assert(!achievements.has('UNTOUCHED'),'Hard clear after any heart loss must not unlock Pristine Prance');
assert.equal(uploads.length,6,'first Hard full clear should add exactly two leaderboard submissions');

sandbox.mode=0;tick();sandbox.reset(1);tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,417+i,367,487+i,367]);
sandbox.wave=13;sandbox.score=4800;sandbox.runT=90;sandbox.hearts=13;sandbox.kills=58;sandbox.combo=4;sandbox.mode=5;
tick();await settle(40);
assert(achievements.has('UNTOUCHED'),'clean full Hard clear should unlock Pristine Prance');
assert.equal(stats.get('PB_IMPROVED_HARD'),1);assert.equal(uploads.length,8);

// Exercise both the Normal baseline and a real established PB improvement.
sandbox.mode=0;tick();sandbox.D=1;sandbox.reset(1);tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,418+i,368,488+i,368]);
sandbox.wave=13;sandbox.score=4000;sandbox.runT=120;sandbox.hearts=11;sandbox.kills=52;sandbox.combo=3;sandbox.mode=5;
tick();await settle(40);
assert(achievements.has('NORMAL_CLEAR'));assert(achievements.has('NO_POWER_NORMAL'));
assert(!achievements.has('PURE_SPECTRUM'),'three zero-power difficulties must not satisfy Pure Spectrum');
assert.equal(uploads.length,10);

sandbox.mode=0;tick();sandbox.reset(1);tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,419+i,369,489+i,369]);
sandbox.wave=13;sandbox.score=4500;sandbox.runT=100;sandbox.hearts=10;sandbox.kills=54;sandbox.combo=4;sandbox.mode=5;
tick();await settle(40);
assert.equal(stats.get('PB_IMPROVED_NORMAL'),1);assert.equal(uploads.length,12);
assert(!achievements.has('CORN_PRIX_CHAMPION'),'three difficulty PB improvements must not satisfy Corn Prix Champion');

// A checkpoint-started Encore is not a full-campaign Encore.
sandbox.mode=0;tick();sandbox.D=2.4;sandbox.reset(5);tick();sandbox.queen=3;tick();
assert(!achievements.has('ENCORE_REACHED'),'checkpoint Impossible run must not unlock Cob Comeback');

leaderboardPopulation=12;sandbox.mode=0;tick();sandbox.reset(1);tick();sandbox.queen=3;tick();
assert(achievements.has('ENCORE_REACHED'),'eligible Impossible Encore should unlock its hidden achievement');
platform.trace=Array.from({length:30},(_,i)=>[i*100,420+i,370,490+i,370]);
sandbox.wave=13;sandbox.score=5000;sandbox.runT=90;sandbox.hearts=13;sandbox.kills=60;sandbox.combo=4;sandbox.queen=3;sandbox.mode=5;
tick();await settle(40);
assert(achievements.has('IMPOSSIBLE_CLEAR'));assert(achievements.has('NO_POWER_IMPOSSIBLE'));assert(achievements.has('PURE_SPECTRUM'));
assert(!achievements.has('WORLDS_END'),'Top 13 rank must not unlock World’s End before thirteen players are ranked');
assert.equal(uploads.length,14);

leaderboardPopulation=13;sandbox.mode=0;tick();sandbox.reset(1);tick();sandbox.queen=3;tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,422+i,372,492+i,372]);
sandbox.wave=13;sandbox.score=5500;sandbox.runT=70;sandbox.hearts=12;sandbox.kills=65;sandbox.combo=4;sandbox.queen=3;sandbox.mode=5;
tick();await settle(40);
assert(achievements.has('WORLDS_END'),'Top 13 Impossible rank with thirteen ranked players should unlock World’s End');
assert.equal(stats.get('PB_IMPROVED_IMPOSSIBLE'),1);assert(achievements.has('CORN_PRIX_CHAMPION'));
assert.equal(uploads.length,16,'four baseline clears and four improvements should each submit Style + Clear Time');
assert(uploads.every(u=>u.keepBest===true),'every core leaderboard upload must preserve the best score');

const manualAchievementIds=[
  'FIRST_SNAP','DOUBLE_RAINBOW','LUCKY_13','CLOSE_SHAVE','KERNEL_PARRY','MAX_COMBO','HUSK_CLEAR','COLONEL_CLEAR',
  'EASY_CLEAR','NORMAL_CLEAR','HARD_CLEAR','IMPOSSIBLE_CLEAR','FULL_HEARTS','CORN_COMBINE','THREAD_NEEDLE','RETURN_DEPARTMENT',
  'FULL_SPECTRUM','WALL_TO_WALL','PRISM_BREAK','FULL_PANTRY','NO_POWER_EASY','NO_POWER_NORMAL','NO_POWER_HARD','NO_POWER_IMPOSSIBLE',
  'UNTOUCHED','ENCORE_REACHED','THIRTEEN_FASTER','DUAL_PB','CORN_PRIX_CHAMPION','WORLDS_END','PURE_SPECTRUM',
];
assert.deepEqual(manualAchievementIds.filter(id=>!achievements.has(id)),[],'all 31 condition-driven achievements must be proven by executable positive cases');

assert.equal(sandbox.save(),'save','save wrapper must preserve frozen game return value');
await settle();
assert.equal(storage.SV,'0,1,0','SDK hooks must not corrupt restored numeric settings serialization');
listeners.pagehide?.();
await settle();
assert.equal(Object.keys(presence.at(-1)).length,0,'pagehide should clear Wavedash presence without touching gameplay');

console.log('PASS: executable Wavedash matrix proves all 31 condition-driven achievements, false-positive boundaries, active-run gating, exact board contracts, replay UGC, monotonic cloud merge, checkpoint fairness, and reconnect-safe ranked submission');
