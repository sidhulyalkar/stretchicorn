import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Exercise the composed release source, including its overrides and real update
// order. Rendering/audio are inert; gameplay state and collision code are real.
const html=readFileSync(process.env.TEST_HTML||'dist/stretchicorn-local.html','utf8');
const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
function game(storage={SV:'0,0'}) {
  const noop=()=>{}, gradient={addColorStop:noop};
  const ctx=new Proxy({createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},
    {get:(o,k)=>o[k]||(o[k]=noop),set:(o,k,v)=>(o[k]=v,true)});
  const canvas={width:960,height:640,getContext:()=>ctx};
  const s={console,Math,Date,localStorage:storage,setTimeout:noop,clearTimeout:noop,
    requestAnimationFrame:noop,document:{querySelector:()=>canvas,createElement:()=>canvas}};
  s.window=s;vm.createContext(s);vm.runInContext(code,s);
  const run=q=>vm.runInContext(q,s);
  run('wake=()=>{};V=[0,0];D=.7;reset();E.length=B.length=R.length=0;stageT=0;A.x=100;A.y=500;P.x=154;P.y=500');
  return run;
}
const target="let e=enemy(0,500,300,-1);e.hp=e.max=100;e.cd=e.tele=999";
const shot="B.push({x:e.x,y:e.y,vx:0,vy:0,team:1,r:7,l:2,p:t})";
const key=k=>`onkeydown({key:${JSON.stringify(k)},repeat:false,preventDefault(){}})`;

for (const mode of [0,2,3,4,5,6,8]) {
  const r=game();r(`wave=9;spawnWave();mode=${mode};bp=1;bt=.99;winT=100`);
  const before=r('JSON.stringify([bp,bt,R])');
  r('for(let i=0;i<120;i++)upd(1/60)');
  assert.equal(r('JSON.stringify([bp,bt,R])'),before,`wall timers outside play, mode ${mode}`);
}
{
  const r=game();r(target+';'+shot+';mode=2');const before=r('t');
  r('for(let i=0;i<120;i++)upd(1/60)');assert.equal(r('t'),before,'pause cannot age a return');
  r('mode=1;upd(1/60)');assert.equal(r('e.hp'),98,'paused return keeps close tier');
  r('wave=9;bp=1;bt=.99;hitstop=.05;upd(1/60)');assert.equal(r('bt'),.99,'hitstop freezes cover');
}
for (const [age,damage] of [[0,2],[.5,3],[1,4]]) {
  const r=game();r(target+';'+shot+`;B[0].p=t-${age};upd(1/60)`);
  assert.equal(r('e.hp'),100-damage,`exactly one ${damage}-damage return`);
  assert.equal(r('B.length'),0,'return consumed');
}
{
  const r=game();r(target+';let other=enemy(0,500,300,-1);other.hp=100;'+shot+';upd(1/60)');
  assert.equal(r('e.hp+other.hp'),198,'overlapping targets cannot share one return');
}
for (const kind of [1,2,3]) {
  const r=game();r(target+`;mark31(e,${kind});e.tele=e.cd=999;final31=2;need31=1;`+shot+';upd(1/60)');
  assert.equal(r('e.hp'),100,'shield-opening return never also deals HP damage');
  assert.equal(r('e.p'),kind===1?0:1,'one shield credit per projectile');
  assert.equal(r('B.length'),0,'shield consumes return');
}
for (const invalid of ['B[0].l=0','B[0].dead=1','wall(480,280,60,60)','e.x=B[0].x=-100']) {
  const r=game();r(target+';'+shot+';'+invalid+';upd(1/60)');
  assert.equal(r('e.hp'),100,'invalid projectile has no collision: '+invalid);
}
{
  const r=game();r(target+';'+shot+';B[0].x=e.x-e.r-10;B[0].vx=520;upd(1/60)');
  assert.equal(r('e.hp'),98,'a return entering contact this step keeps precision damage');
}
{
  const r=game();r(target+';'+shot+';B[0].r=8;upd(1/60)');
  assert.equal(r('e.hp'),100,'cyan spikes never become friendly damage');
  r('B.length=0;hearts=1;inv=0;for(let i=0;i<2;i++)B.push({x:A.x,y:A.y,vx:0,vy:0,team:1,r:8,l:2});upd(1/60)');
  assert.equal(r('hearts'),0,'one terminal death even with overlapping piercing shots');
  assert.equal(r('mode'),3);r('killE(e)');assert.equal(r('E.length'),1,'death cannot trigger a later victory');
}
for (const d of [.7,1,1.6,2.4]) for (const k of [' ','Enter']) {
  const r=game();r(`D=${d};wave=9;spawnWave();score=800;hearts=0;mode=3;nextWave=1;charge=1;fire=1;K.w=1;Q.push({});`+key(k));
  assert.equal(r('wave'),d<1?9:1,'retry scope follows difficulty');
  assert.equal(r('mode==1&&hearts==13&&score==0&&charge==0&&nextWave==0&&fire==0&&Q.length==0&&Object.keys(K).length==0'),true,'clean retry');
  assert.equal(r('!!hitW(A.x,A.y,24)||!!hitW(P.x,P.y,21)'),false,'retry spawns safely');
  r('mode=4;wave=13;'+key(k));assert.equal(r('wave'),1,'victory always starts a new run');
}
for (const d of [.7,1,1.6]) {
  const r=game();r(`D=${d};wave=13;spawnWave();killE(E[0]);killE(E[0])`);
  assert.equal(r('mode'),1,'first core is not victory');r('killE(E[0])');
  assert.equal(r('mode'),5,'non-Impossible victory follows second core');
  assert.equal(r('best31()'),r('score'),'winning score saved');
}
for (const order of [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]) {
  const r=game();r('D=2.4;wave=13;spawnWave();killE(E[0]);killE(E[0]);killE(E[0])');
  assert.equal(r('mode==1&&queen==3&&final31==3&&E.length==3'),true,'Impossible enters finite Encore');
  assert.equal(r('!!hitW(A.x,A.y,24)||!!hitW(P.x,P.y,21)'),false,'Encore safe entry');
  r('let core=E.find(e=>e.b==3);for(let i=0;i<3;i++)shieldHit(core)');
  assert.equal(r('core.g'),1);r('shieldHit(core)');assert.equal(r('core.g'),0,'Encore core remains unlockable');
  r('enemy(0,400,300,-1)'); // leftovers must not block completion
  order.forEach((b,i)=>{
    r(`killE(E.find(e=>e.b==${b}))`);
    assert.equal(r('mode'),i===2?5:1,'all three bosses required, order '+order);
    assert.equal(r('E.filter(e=>e.b).length'),2-i,'no boss regeneration');
  });
  assert.equal(r('E.length+B.length'),0,'clear remaining threats at victory');
  assert.equal(r('best31()'),r('score'),'Encore score saved');
  r('upd(3.5)');assert.equal(r('mode'),4,'victory animation completes');
}
{
  const store={SV:'0,0'},r=game(store);
  for(const d of [.7,1,1.6,2.4])r(`D=${d};score=${Math.round(d*100)};save();score=0;save()`);
  for(const d of [.7,1,1.6,2.4])assert.equal(r(`D=${d};best31()`),Math.round(d*100),'independent best per mode');
  const reload=game(store);assert.equal(reload('D=1.6;best31()'),160,'best survives reload');
  const denied=game(new Proxy({}, {get(){throw Error('storage disabled')},set(){throw Error('storage disabled')}}));
  denied('score=500;save();mode=3;draw();'+key(' '));assert.equal(denied('mode'),1,'blocked storage never blocks play');
}
console.log('PASS: v0.39 pause, single return authority, shield gates, terminal death, retry, per-mode best, and all six Encore victory orders');
