import assert from'node:assert/strict';
import vm from'node:vm';
import {readFileSync} from'node:fs';
import {TextEncoder,TextDecoder} from'node:util';

const source=readFileSync('wavedash/challenge-platform.js','utf8');
const raf=[],timers=[],events=new Map(),boards=[],uploads=[],files=new Map(),achievements=new Set();
let worldOwn=null,worldTop=[];
const settle=async(n=16)=>{for(let i=0;i<n;i++)await new Promise(resolve=>setImmediate(resolve))};
const tick=()=>{assert(raf.length,'challenge observer RAF should be installed');raf.shift()()};
const trigger=name=>{for(const fn of events.get(name)||[])fn({})};
const runTimers=async()=>{while(timers.length){const fn=timers.shift();await fn();await settle(4)}};

const SDK={
  LeaderboardSortOrder:{DESC:1},LeaderboardDisplayType:{NUMERIC:0},
  Events:{BACKEND_CONNECTED:'connected'},
  on:(name,fn)=>events.set(name,[...(events.get(name)||[]),fn]),
  getOrCreateLeaderboard:async(name,sort,display)=>{if(!boards.some(b=>b.name===name))boards.push({name,sort,display});return{success:true,data:{id:`lb-${name}`,name}}},
  uploadLeaderboardScore:async(id,score,keepBest,ugcId,metadata)=>(uploads.push({id,score,keepBest,ugcId,metadata}),{success:true,data:{scoreChanged:true,globalRank:3}}),
  writeLocalFile:async(path,bytes)=>(files.set(path,bytes),true),
  readLocalFile:async path=>files.get(path)||null,
  getMyLeaderboardEntries:async id=>({success:true,data:id==='lb-Style - Impossible'&&worldOwn?[worldOwn]:[]}),
  listLeaderboardEntries:async id=>({success:true,data:id==='lb-Style - Impossible'?worldTop:[]}),
  getAchievement:id=>achievements.has(id),
  setAchievement:id=>(achievements.add(id),true),
  storeStats:()=>true,
};

const platform={
  online:true,statsReady:true,userId:'user-1',runEligible:true,runSerial:0,
  runPowerups:0,runGrazes:0,runParries:0,runDoubleRainbows:0,bestSlashKills:0,currentMaxCombo:1,
};
const sandbox={
  console,TextEncoder,TextDecoder,Date,
  setTimeout:fn=>(timers.push(fn),timers.length),
  requestAnimationFrame:fn=>(raf.push(fn),raf.length),
  window:{Wavedash:SDK,__stretchicornWavedash:platform},
  D:1,mode:0,score:0,runT:0,hearts:13,kills:0,combo:1,
};
sandbox.window.window=sandbox.window;
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:'challenge-platform.js'});
await settle();

const challenge=sandbox.window.__stretchicornWavedashChallenges;
assert(challenge,'challenge extension should expose audit state');
assert.equal(challenge.loaded,true,'challenge retry queue should load');
for(const name of ['Biggest Harvest','Silky Style - Hard','Silky Style - Impossible'])assert(boards.some(b=>b.name===name),`missing challenge board ${name}`);

platform.runSerial=1;platform.runEligible=true;platform.runPowerups=0;platform.bestSlashKills=7;platform.runGrazes=14;platform.runParries=13;platform.runDoubleRainbows=4;platform.currentMaxCombo=4;
sandbox.D=1.6;sandbox.score=5000;sandbox.runT=321.5;sandbox.hearts=11;sandbox.kills=600;sandbox.combo=4;sandbox.mode=5;tick();await settle(24);
assert.equal(uploads.length,2,'zero-powerup Hard clear should submit harvest + Silky Style boards');
assert(uploads.some(u=>u.id==='lb-Biggest Harvest'&&u.score===7));
assert(uploads.some(u=>u.id==='lb-Silky Style - Hard'&&u.score===5000));
for(const u of uploads){
  assert.equal(u.keepBest,true);assert.equal(u.metadata.fullRun,1);assert.equal(u.metadata.gameBuild,'eee2ac40c71070ddb1502e16362e3b9490d5ce61');assert.equal(u.metadata.traceVersion,1);
}
assert.equal(challenge.pending.length,0,'online challenge clear should drain retry queue');

sandbox.mode=0;tick();platform.runSerial=2;platform.runEligible=false;platform.bestSlashKills=12;sandbox.mode=5;tick();await settle();
assert.equal(uploads.length,2,'checkpoint clear must never submit challenge boards');

sandbox.mode=0;tick();platform.online=false;platform.runSerial=3;platform.runEligible=true;platform.runPowerups=0;platform.bestSlashKills=8;sandbox.D=1.6;sandbox.score=5500;sandbox.runT=300;sandbox.mode=5;tick();await settle();
assert.equal(uploads.length,2,'offline challenge clear must queue locally');
assert.equal(challenge.pending.length,1);assert(files.has('stretchicorn/pending-challenge-runs-v1.json'));
platform.online=true;trigger('connected');await settle(32);
assert.equal(challenge.pending.length,0,'reconnect should drain challenge queue');
assert.equal(uploads.length,4,'reconnect should submit queued harvest + Silky Style result exactly once');

worldOwn={globalRank:8,score:9000};worldTop=Array.from({length:13},(_,i)=>({globalRank:i+1,score:10000-i}));
trigger('connected');await runTimers();await settle();
assert(achievements.has('WORLDS_END'),'startup/reconnect reconciliation should unlock Worlds End once Top 13 is populated');

sandbox.mode=0;tick();platform.runSerial=4;platform.runEligible=true;platform.runPowerups=0;platform.bestSlashKills=9;platform.runGrazes=20;platform.runParries=18;platform.runDoubleRainbows=6;sandbox.D=2.4;sandbox.score=9000;sandbox.runT=280;sandbox.hearts=9;sandbox.kills=620;sandbox.mode=5;tick();await settle(32);
assert(uploads.some(u=>u.id==='lb-Silky Style - Impossible'&&u.score===9000),'Impossible zero-powerup clear should submit its Silky Style board');
assert(uploads.some(u=>u.id==='lb-Biggest Harvest'&&u.score===9),'Impossible clear should also compete on Biggest Harvest');

console.log('PASS: Wavedash challenge extension creates 3 SDK-only boards, persists offline challenge clears, adds frozen-build provenance, preserves checkpoint fairness, and reconciles Worlds End on reconnect');
