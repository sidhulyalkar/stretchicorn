import assert from'node:assert/strict';
import vm from'node:vm';
import {readFileSync} from'node:fs';
import {TextEncoder,TextDecoder} from'node:util';

const source=readFileSync('src/wavedash-platform.js','utf8');
const raf=[],listeners={},events={},stats=new Map(),achievements=new Set(),boards=[],uploads=[],ugc=[],presence=[],files=new Map();
let now=0,initCalls=0,overlayToggles=0;

const noop=()=>{},gradient={addColorStop:noop};
const gctx=new Proxy({beginPath:noop,clearRect:noop,moveTo:noop,lineTo:noop,stroke:noop,arc:noop,fill:noop,fillText:noop,save:noop,restore:noop},
  {get:(o,k)=>o[k]??(o[k]=noop),set:(o,k,v)=>(o[k]=v,true)});
const makeCanvas=()=>({width:0,height:0,style:{},setAttribute:noop,getContext:()=>gctx,getBoundingClientRect:()=>({left:100,top:50,width:960,height:640})});
const nodes=new Map();
const document={
  body:{appendChild:n=>{if(n.id)nodes.set('#'+n.id,n)}},
  createElement:tag=>tag==='canvas'?makeCanvas():{style:{},textContent:'',id:'',setAttribute:noop},
  querySelector:q=>nodes.get(q)||null,
};
const storage={SV:'1,1,1'};
const localStorage=new Proxy(storage,{get:(o,k)=>o[k],set:(o,k,v)=>(o[k]=String(v),true)});

const SDK={
  LeaderboardSortOrder:{ASC:0,DESC:1},
  LeaderboardDisplayType:{NUMERIC:0,TIME_MILLISECONDS:2},
  UGCType:{GAME_MANAGED:3},UGCVisibility:{PUBLIC:0},
  Events:{BACKEND_CONNECTED:'connected',BACKEND_DISCONNECTED:'disconnected',BACKEND_RECONNECTING:'reconnecting',MUTE_CHANGED:'mute',FULLSCREEN_CHANGED:'fullscreen'},
  updateLoadProgressZeroToOne:v=>assert.equal(v,1),
  init:opts=>{initCalls++;assert.equal(opts.deferEvents,true);return true},
  on:(name,fn)=>events[name]=fn,readyForEvents:noop,
  getUsername:()=> 'tester',getUserId:()=> 'user-1',getUser:()=>({username:'tester',id:'user-1'}),
  isMuted:()=>false,isFullscreen:()=>false,toggleOverlay:()=>{overlayToggles++;return true},
  listFriends:async()=>({success:true,data:[{isOnline:true},{isOnline:false}]}),
  updateUserPresence:async p=>(presence.push(p),{success:true}),
  requestStats:async()=>({success:true,data:true}),getStat:id=>stats.get(id)||0,setStat:(id,v)=>(stats.set(id,v),true),
  getAchievement:id=>achievements.has(id),setAchievement:id=>(achievements.add(id),true),storeStats:()=>true,
  remoteFileExists:async()=>({success:true,data:false}),writeLocalFile:async(path,bytes)=>(files.set(path,bytes),{success:true,data:path}),
  uploadRemoteFile:async()=>({success:true}),downloadRemoteFile:async()=>({success:false}),readLocalFile:async path=>files.get(path),
  getOrCreateLeaderboard:async(name,sort,display)=>(boards.push({name,sort,display}),{success:true,data:{id:'lb-'+name,name}}),
  listLeaderboardEntries:async()=>({success:true,data:[]}),getMyLeaderboardEntries:async()=>({success:true,data:[]}),
  uploadLeaderboardScore:async(id,score,keepBest,ugcId,metadata)=>(uploads.push({id,score,keepBest,ugcId,metadata}),{success:true,data:{globalRank:3,submittedRank:3,scoreChanged:true}}),
  createUGCItem:async(type,title,description,visibility,path)=>(ugc.push({type,title,description,visibility,path}),{success:true,data:'ugc-1'}),
  downloadUGCItem:async()=>({success:false}),deleteUGCItem:async()=>({success:true}),
};

const sandbox={
  console,TextEncoder,TextDecoder,document,localStorage,performance:{now:()=>now},
  requestAnimationFrame:fn=>(raf.push(fn),raf.length),addEventListener:(name,fn)=>listeners[name]=fn,
  window:{Wavedash:SDK},
  W:960,H:640,C:makeCanvas(),X:gctx,
  D:1,mode:0,wave:1,score:0,runT:0,hearts:13,kills:0,combo:1,queen:0,kick:0,snap:0,
  A:{x:445,y:360},P:{x:500,y:360},V:[1,1,1],
  reset(w=1){sandbox.wave=w;sandbox.score=0;sandbox.runT=0;sandbox.hearts=13;sandbox.kills=0;sandbox.combo=1;sandbox.kick=0;sandbox.snap=0;sandbox.mode=1},
  startKick(){if(sandbox.kick>0)return;sandbox.kick=.24;sandbox.snap=sandbox.nextSnap||1},nextSnap:1,
  lucky(){},killE(){sandbox.kills++},say(){},save(){storage.SV=sandbox.V.join(',')},
  title(){},victory(){},txt:noop,
};
sandbox.window.window=sandbox.window;
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:'wavedash-platform.js'});

for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));
assert.equal(initCalls,1,'SDK must initialize exactly once');
assert.equal(boards.length,8,'four difficulties should create Style + Clear Time boards');
assert.equal(new Set(boards.map(b=>b.name)).size,8,'leaderboard names must be unique');
assert.equal(sandbox.window.__stretchicornWavedash.username,'tester');
assert.equal(sandbox.window.__stretchicornWavedash.friendsOnline,1);

sandbox.D=.7;
sandbox.reset();
await new Promise(resolve=>setImmediate(resolve));
assert.equal(stats.get('RUNS_STARTED'),1,'reset hook should count a started run');
assert.match(presence.at(-1).status,/Trial 1\/13/,'run start should publish Trial presence');

sandbox.nextSnap=1;sandbox.kick=0;sandbox.startKick();
assert.equal(stats.get('TOTAL_SNAPS'),1,'charged snap should increment TOTAL_SNAPS');
assert(achievements.has('FIRST_SNAP'),'first charged snap should unlock FIRST_SNAP');

sandbox.nextSnap=2;sandbox.kick=0;sandbox.startKick();
assert.equal(stats.get('TOTAL_SNAPS'),2,'a second charged snap should also be counted');
assert.equal(stats.get('DOUBLE_RAINBOWS'),1,'Double Rainbow should be counted');
assert(achievements.has('DOUBLE_RAINBOW'),'Double Rainbow achievement missing');

sandbox.lucky();
assert.equal(stats.get('LUCKY_13S'),1);assert(achievements.has('LUCKY_13'));
sandbox.say('PARRY!');
assert.equal(stats.get('PARRIES'),1);assert(achievements.has('KERNEL_PARRY'));
sandbox.killE({});
assert.equal(stats.get('TOTAL_KILLS'),1,'eligible kill delta should be tracked');

sandbox.window.__stretchicornWavedash.lastWave=5;
sandbox.wave=6;
sandbox.mode=1;
assert(raf.length,'monitor RAF should be installed');
let tick=raf.shift();now+=16;tick(now);
assert(achievements.has('HUSK_CLEAR'),'advancing beyond Trial 5 should unlock HUSK_CLEAR');

const platform=sandbox.window.__stretchicornWavedash;
platform.trace=Array.from({length:30},(_,i)=>[i*100,400+i,350,470+i,350]);
sandbox.wave=13;sandbox.score=2345;sandbox.runT=123.456;sandbox.hearts=13;sandbox.kills=42;sandbox.combo=4;sandbox.queen=0;sandbox.mode=5;
tick=raf.shift();now+=16;tick(now);
for(let i=0;i<12;i++)await new Promise(resolve=>setImmediate(resolve));

assert(achievements.has('CAPN_CLEAR'),'campaign clear achievement missing');
assert(achievements.has('EASY_CLEAR'),'difficulty clear achievement missing');
assert(achievements.has('PERFECT_13'),'13-heart clear achievement missing');
assert.equal(stats.get('RUNS_CLEARED'),1,'campaign clear stat missing');
assert.equal(ugc.length,1,'Style PB should create exactly one GAME_MANAGED ghost');
assert.equal(uploads.length,2,'clear should upload Style and Clear Time');
const styleUpload=uploads.find(u=>u.id.includes('Style'));
const timeUpload=uploads.find(u=>u.id.includes('Clear Time'));
assert.equal(styleUpload.ugcId,'ugc-1','Style PB should attach ghost UGC');
assert.equal(styleUpload.score,2345);
assert.equal(timeUpload.score,123456);
assert.equal(styleUpload.metadata.hearts,13);
assert.equal(styleUpload.metadata.difficulty,'easy');

listeners.keydown?.({key:'F2',repeat:false,preventDefault:noop});
assert.equal(overlayToggles,1,'F2 should open the Wavedash overlay exactly once');
assert.equal(storage.SV,'1,1,1','platform hooks must not corrupt numeric settings serialization');
console.log('PASS: executable Wavedash mock covers lifecycle, 8 boards, identity/friends, presence, stats, achievements, cloud-safe settings, dual score upload, attached Rainbow Ghost UGC and overlay access');
