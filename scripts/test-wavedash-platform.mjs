import assert from'node:assert/strict';
import vm from'node:vm';
import {readFileSync} from'node:fs';
import {TextEncoder,TextDecoder} from'node:util';

const source=readFileSync('src/wavedash-platform.js','utf8');
const raf=[],listeners={},events={},stats=new Map(),achievements=new Set(),boards=[],uploads=[],ugc=[],deletedUGC=[],presence=[],files=new Map(),entries=new Map();
let now=0,initCalls=0,backendOnline=false,ugcSeq=0,timerSeq=0;
const timers=new Map();
const settle=async(n=16)=>{for(let i=0;i<n;i++)await new Promise(resolve=>setImmediate(resolve))};
const tick=()=>{assert(raf.length,'monitor RAF should be installed');const fn=raf.shift();now+=16;fn(now)};
const trigger=name=>events[name]?.({isConnected:name==='connected',hasEverConnected:true,connectionCount:1,connectionRetries:0});

const storage={SV:'1,1,1'};
const localStorage=new Proxy(storage,{get:(o,k)=>o[k],set:(o,k,v)=>(o[k]=String(v),true)});

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
  getOrCreateLeaderboard:async(name,sort,display)=>{if(!backendOnline)return{success:false};if(!boards.some(b=>b.name===name))boards.push({name,sort,display});return{success:true,data:{id:'lb-'+name,name}}},
  getMyLeaderboardEntries:async id=>({success:true,data:entries.has(id)?[entries.get(id)]:[]}),
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
  D:1,mode:0,wave:1,score:0,runT:0,hearts:13,kills:0,combo:1,queen:0,kick:0,snap:0,
  A:{x:445,y:360},P:{x:500,y:360},V:[1,1,1],
  reset(w=1){sandbox.wave=w;sandbox.score=0;sandbox.runT=0;sandbox.hearts=13;sandbox.kills=0;sandbox.combo=1;sandbox.kick=0;sandbox.snap=0;sandbox.mode=1;return`reset:${w}`},
  startKick(){if(sandbox.kick>0)return'blocked';sandbox.kick=.24;sandbox.snap=sandbox.nextSnap||1;return'kick'},nextSnap:1,
  lucky(){return'lucky'},
  killE(){sandbox.kills++;return'kill'},
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
assert.equal(platform.username,'tester');
assert.equal(platform.friendsOnline,1);
assert(presence.length,'presence should be published after connection');

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
assert(!achievements.has('CAPN_CLEAR'),'checkpoint clear must not unlock full-campaign achievements');
assert.equal(stats.get('RUNS_CLEARED')||0,0,'checkpoint clear must not increment full campaign clears');

assert.equal(sandbox.reset(1),'reset:1');
tick();
assert.equal(platform.runEligible,true,'Trial 1 start must be rank eligible');
sandbox.nextSnap=1;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert.equal(stats.get('TOTAL_SNAPS'),1);assert(achievements.has('FIRST_SNAP'));
sandbox.nextSnap=2;sandbox.kick=0;assert.equal(sandbox.startKick(),'kick');
assert.equal(stats.get('DOUBLE_RAINBOWS'),1);assert(achievements.has('DOUBLE_RAINBOW'));
assert.equal(sandbox.lucky(),'lucky');assert.equal(stats.get('LUCKY_13S'),1);assert(achievements.has('LUCKY_13'));
assert.equal(sandbox.say('PARRY!'),'say:PARRY!');assert.equal(stats.get('PARRIES'),1);assert(achievements.has('KERNEL_PARRY'));
assert.equal(sandbox.killE({}),'kill');assert.equal(stats.get('TOTAL_KILLS'),1);

platform.lastWave=5;sandbox.wave=6;sandbox.mode=1;tick();
assert(achievements.has('HUSK_CLEAR'),'Trial 5 full-run transition should unlock HUSK_CLEAR');
platform.trace=Array.from({length:30},(_,i)=>[i*100,400+i,350,470+i,350]);
sandbox.wave=13;sandbox.score=2345;sandbox.runT=123.456;sandbox.hearts=13;sandbox.kills=42;sandbox.combo=4;sandbox.queen=0;sandbox.mode=5;
tick();
await settle(30);
assert(achievements.has('CAPN_CLEAR'));assert(achievements.has('EASY_CLEAR'));assert(achievements.has('PERFECT_13'));
assert.equal(stats.get('RUNS_CLEARED'),1,'only the full campaign should count as cleared');
assert.equal(ugc.length,1,'Style PB should create one GAME_MANAGED replay trace');
assert.equal(uploads.length,2,'full clear should upload Style and Clear Time');
const firstStyle=uploads.find(u=>u.id.includes('Style'));
const firstTime=uploads.find(u=>u.id.includes('Clear Time'));
assert.equal(firstStyle.ugcId,'ugc-1');assert.equal(firstStyle.score,2345);assert.equal(firstStyle.metadata.fullRun,1);
assert.equal(firstTime.score,123456);assert.equal(firstTime.metadata.fullRun,1);
assert.equal(platform.pendingRuns.length,0,'successful submission should leave no retry residue');

trigger('disconnected');backendOnline=false;
assert.equal(platform.online,false);
sandbox.reset(1);tick();
platform.trace=Array.from({length:30},(_,i)=>[i*100,410+i,360,480+i,360]);
sandbox.wave=13;sandbox.score=3456;sandbox.runT=100;sandbox.hearts=12;sandbox.kills=50;sandbox.combo=4;sandbox.mode=5;
tick();
await settle();
assert.equal(uploads.length,2,'offline clear must queue instead of attempting remote scores');
assert.equal(platform.pendingRuns.length,1,'offline full run should persist in local retry queue');
assert(files.has('stretchicorn/pending-ranked-runs-v1.json'),'retry queue must be backed by Wavedash local storage');

backendOnline=true;trigger('connected');
await settle(40);
assert.equal(platform.pendingRuns.length,0,'reconnect should drain queued ranked runs');
assert.equal(uploads.length,4,'reconnect should submit both queued leaderboards exactly once');
assert.equal(ugc.length,2,'better queued Style run should attach a second replay trace');
assert.equal(platform.lastResult.styleRank,3);assert.equal(platform.lastResult.timeRank,3);

assert.equal(sandbox.save(),'save','save wrapper must preserve frozen game return value');
await settle();
assert.equal(storage.SV,'1,1,1','SDK hooks must not corrupt numeric settings serialization');
listeners.pagehide?.();
await settle();
assert.equal(Object.keys(presence.at(-1)).length,0,'pagehide should clear Wavedash presence without touching gameplay');

console.log('PASS: executable Wavedash mock proves observer wrappers preserve game returns, checkpoint clears stay unranked, full runs submit dual leaderboards + replay UGC, cloud/stat calls persist, and offline ranked runs drain safely after reconnect');
