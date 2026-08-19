import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('dist/index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw Error('script missing');
if (/\bX\.[_$]/.test(match[1])) throw Error('unsafe Canvas API rename in build');

let tones = 0, ramps = 0, wakes = 0;
const param = () => ({
  value: 0,
  setValueAtTime() {},
  linearRampToValueAtTime() { ramps++; },
  exponentialRampToValueAtTime() { ramps++; },
});
function AudioContextMock() {
  this.currentTime = 0;
  this.destination = {};
  this.resume = () => { wakes++; };
  this.createOscillator = () => ({ frequency: param(), connect() {}, start() { tones++; }, stop() {} });
  this.createGain = () => ({ gain: param(), connect() {} });
}

const ctx = new Proxy({}, {
  get: (o, k) => o[k] || (o[k] = () => {}),
  set: (o, k, v) => (o[k] = v, true),
});
const canvas = { getContext: () => ctx, width: 960, height: 640 };
const sandbox = {
  console, Math, Date,
  setTimeout: () => {}, clearTimeout: () => {}, requestAnimationFrame: () => {},
  document: { querySelector: () => canvas },
  localStorage: { SV: '0,0' },
  AudioContext: AudioContextMock,
  window: null,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(match[1], sandbox);
const R = q => vm.runInContext(q, sandbox);

// Semantic aliases point at the exact golfed lexical state/functions in dist/index.html.
R(`Object.defineProperties(globalThis,{
  charge:{get(){return _0},set(v){_0=v}},ready:{get(){return _1},set(v){_1=v}},
  fire:{get(){return _T},set(v){_T=v}},sling:{get(){return _4},set(v){_4=v}},
  score:{get(){return _5},set(v){_5=v}},wave:{get(){return $K},set(v){$K=v}},
  hearts:{get(){return $L},set(v){$L=v}},kick:{get(){return $M},set(v){$M=v}},
  kickA:{get(){return $N},set(v){$N=v}},inv:{get(){return $O},set(v){$O=v}},
  aim:{get(){return $P},set(v){$P=v}},puT:{get(){return $Q},set(v){$Q=v}}
});
globalThis.reset=$A;globalThis.upd=$B;globalThis.startKick=$C;globalThis.hurt=$D;
globalThis.music=$E;globalThis.snd=$F;globalThis.say=$G;globalThis.spawnWave=$H;
globalThis.hitW=$I;globalThis.pop=$J;`);

const key = (key, repeat = false) => sandbox.onkeydown({ key, repeat, preventDefault() {} });
const up = key => sandbox.onkeyup({ key });

// Persisted OFF is numeric and allocates no audio nodes.
if (R('V[0]') !== 0 || R('V[1]') !== 0 || R('typeof V[0]') !== 'number') throw Error('persisted mute type');
let mutedTones = tones;
R('snd(440)');
if (tones !== mutedTones) throw Error('persisted mute allocated audio');
R('V[0]=V[1]=4');

// Difficulty matrix. Number keys launch directly. Space/Enter is a Normal shortcut.
for (const [k, d, count] of [['1', .7, 3], ['2', 1, 5], ['3', 1.3, 6], ['4', 1.6, 8]]) {
  R('mode=0'); key(k); up(k);
  if (Math.abs(R('D') - d) > 1e-9) throw Error('difficulty scalar ' + k);
  if (R('mode') !== 1 || R('wave') !== 1 || R('E.length') !== count) throw Error('stage1 population ' + k);
}
R('mode=0;D=1.6'); key(' '); up(' ');
if (R('D') !== 1 || R('E.length') !== 5) throw Error('Space did not launch Normal');
R('mode=3;D=1.6'); key(' '); up(' ');
if (R('D') !== 1.6 || R('mode') !== 1 || R('E.length') !== 8) throw Error('retry lost difficulty');

// Difficulty changes only the intended pressure/reward clocks.
R('mode=1;wave=1;D=.7;spawnWave();puT=5'); R('upd(1)'); const pickupEasy = R('puT');
R('mode=1;wave=1;D=1.6;spawnWave();puT=5'); R('upd(1)'); const pickupImpossible = R('puT');
if (!(pickupEasy < pickupImpossible && pickupEasy < 4 && pickupImpossible > 4)) throw Error('pickup cadence');
R('mode=1;wave=3;D=.7;spawnWave();E.find(e=>e.type==2).cd=1'); R('upd(.1)'); const cdEasy = R('E.find(e=>e.type==2).cd');
R('mode=1;wave=3;D=1.6;spawnWave();E.find(e=>e.type==2).cd=1'); R('upd(.1)'); const cdImpossible = R('E.find(e=>e.type==2).cd');
if (!(cdImpossible < cdEasy)) throw Error('enemy cadence');
R('mode=1;wave=2;D=1.6;spawnWave();(()=>{let e=E.find(e=>e.type==1);e._3=1;e._u=.75})()'); R('upd(.1)');
if (Math.abs(R('E.find(e=>e.type==1)._u') - .65) > .001) throw Error('telegraph timing scaled');
for (const [d, n] of [[.7, 1], [1, 1], [1.3, 1], [1.6, 2]]) {
  R(`mode=1;wave=9;D=${d};spawnWave()`);
  if (R('E.filter(e=>e.type==6).length') !== n) throw Error('architect scaling ' + d);
}

// Stage density must rise monotonically across all four modes. These counts include fixed bosses/adds.
const densityExpected={'.7':[3,5,6,7,3,7,8,9,1,11,14,14,8],'1':[5,7,9,11,4,11,12,15,1,17,21,20,11],'1.3':[6,9,12,15,5,15,16,21,1,23,28,26,14],'1.6':[8,12,15,17,6,18,20,23,2,27,34,32,16]};
for(const [d,counts] of Object.entries(densityExpected)) for(let w=1;w<=13;w++){
  R(`mode=1;D=${d};wave=${w};spawnWave()`);
  if(R('E.length')!==counts[w-1]) throw Error(`density ${d} stage ${w}: ${R('E.length')} != ${counts[w-1]}`);
}
// Boss reinforcement ceilings also scale upward, so harder starting density does not suppress later adds.
let reinforcement=[];
for(const d of [.7,1,1.3,1.6]){
  R(`mode=1;D=${d};wave=5;spawnWave();inv=1e9`);
  for(let i=0;i<1800;i++)R('upd(1/60)');
  reinforcement.push(R('E.length'));
}
for(let i=1;i<reinforcement.length;i++)if(reinforcement[i]<reinforcement[i-1])throw Error('boss reinforcement pressure not monotonic '+reinforcement);

// UI, audio unlock, rebinding, reserved keys.
R('mode=0'); key('Enter');
if (R('mode') !== 1 || !wakes || !R('aud')) throw Error('Enter/audio start');
R('mode=0'); key('c'); key('Enter'); key('i');
if (R('BK[0]') !== 'i') throw Error('rebind');
key('ArrowDown'); key('Enter'); key('i');
if (R('BK[1]') !== 'i' || R('BK[0]') !== 's') throw Error('duplicate swap');
key('d'); R('mode=6;sel=8'); key('Enter'); key('m');
if (R('BK[8]') !== ' ' || R('mode') !== 6) throw Error('reserved rebind');

// Fixed-step attack latch and key-repeat suppression.
R('mode=1;D=1;charge=1;ready=.5;kick=fire=0');
key(' ', true);
if (R('kick') !== 0 || R('fire') !== 0) throw Error('repeat attack');
key(' ');
if (R('fire') !== 1 || R('kick') !== 0) throw Error('attack latch');
R('upd(1/60)');
if (R('fire') !== 0 || R('kick') <= 0) throw Error('attack latch not consumed');
up(' ');

// Losing focus is safe.
R('mode=1;K.w=1;fire=1'); sandbox.onblur();
if (R('mode') !== 2 || R('fire') !== 0 || R('Object.keys(K).length')) throw Error('blur pause');

// Mixer stays independent and OFF skips synthesis.
R('mode=0'); key('s'); key('ArrowLeft');
if (R('V[1]') != 3 || R('V[0]') != 4) throw Error('music volume');
key('ArrowDown'); key('ArrowLeft');
if (R('V[0]') != 3) throw Error('sfx volume');
key('m');
let n0 = tones;
R('V[0]=0;snd(440)'); if (tones !== n0) throw Error('sfx gate');
R('V[0]=4;V[1]=0;mt=0;music(1/60)'); if (tones !== n0) throw Error('music gate');
R('V[1]=4');
let audioStart = tones;
R('ms=0;mt=0'); for (let i=0;i<128;i++) R('mt=0;music(1)');
if (tones-audioStart < 90 || ramps < 35) throw Error('POP DROP regression');

// Edge spawn exclusion around the vulnerable body.
for (const [px, py] of [[35,200],[925,200],[400,105],[400,605]]) {
  R(`A.x=${px};A.y=${py}`);
  for (let i=0;i<24;i++) {
    R('E.length=0;$e(0)');
    if (R('ds(E[0],A)') < 110) throw Error('unsafe edge spawn');
  }
}

// HUSKSHIFT and boss geometry.
R('kick=sling=0;mode=1;D=1;wave=9;spawnWave()');
if (!R('E.some(e=>e.type==6&&e.hp==16)')) throw Error('architect missing');
if (R('R.filter(o=>o.d).length') !== 2 || R('bp') !== 1) throw Error('architect blocks missing');
if (R('(()=>{let o=R.find(o=>o.d);return !!hitW(o.x+o.w/2,o.y+o.h/2)})()')) throw Error('warning wall solid early');
R('(()=>{let o=R.find(o=>o.d);A.x=o.x+o.w/2;A.y=o.y+o.h/2;hearts=13;inv=0;bt=1.99})()'); R('upd(1/60)');
if (R('bp') !== 2 || R('hearts') !== 12 || R('!!hitW(A.x,A.y,24)')) throw Error('husk harden/knockback');
let architectHp = R('E.find(e=>e.type==6).hp');
R('(()=>{let e=E.find(e=>e.type==6),o=R.find(o=>o.d);e.x=o.x-e.r-2;e.y=o.y+o.h/2;e.vx=520;e.vy=0})()');
for (let i=0;i<20;i++) R('upd(1/60)');
if (R('E.find(e=>e.type==6).hp') !== architectHp) throw Error('architect self-damaged');
R('bt=2.34'); R('upd(1/60)');
if (R('bp') !== 0) throw Error('blocks did not clear');

// Wall damage remains Charger-only.
R('D=1;wave=4;spawnWave()');
let chargerHp = R('E.find(e=>e.type==1).hp');
R('(()=>{let e=E.find(e=>e.type==1),o=R[0];e.x=o.x-e.r-1;e.y=o.y+o.h/2;e.vx=520;e.vy=0;e._3=2;e.cd=.5})()');
R('upd(1/60)');
if (R('E.find(e=>e.type==1).hp') >= chargerHp) throw Error('charger wall smash missing');
R('wave=5;spawnWave()');
let bossHp = R('E.find(e=>e.type==3).hp');
R('(()=>{let e=E.find(e=>e.type==3),o=R[0];e.x=o.x-e.r-1;e.y=o.y+o.h/2;e.vx=520;e.vy=0})()'); R('upd(1/60)');
if (R('E.find(e=>e.type==3).hp') !== bossHp) throw Error('boss wall self-damage');

// Cobtopus has real no-cover windows.
R('wave=13;spawnWave();bp=2;bt=2.34'); R('upd(1/60)');
if (R('bp') !== 0) throw Error('cobtopus no-cover missing');
for (let i=0;i<120;i++) R('upd(1/60)');
if (R('bp') !== 0) throw Error('cobtopus cover returned early');

// Head steering and snapshot horn direction.
R('reset();D=1');
R("Object.assign(K,{ArrowUp:1})"); for (let i=0;i<4;i++) R('upd(1/60)');
if (Math.abs(R('aim')) < .9) throw Error('head steering');
R('for(let k in K)delete K[k];aim=0;charge=.1;ready=0;startKick()');
let lockedAngle = R('kickA');
R('K.ArrowUp=1'); for (let i=0;i<5;i++) R('upd(1/60)');
if (Math.abs(R('aim')-lockedAngle) > .02 || Math.abs(R('kickA')-lockedAngle) > .02) throw Error('horn bent');
R('for(let k in K)delete K[k]');

// Every stage remains safe on Normal.
for (let w=1;w<=13;w++) {
  R(`D=1;wave=${w};spawnWave()`);
  if (R('!!hitW(A.x,A.y,24)||!!hitW(P.x,P.y,21)')) throw Error('unsafe stage '+w);
  for (let f=0;f<240;f++) {
    if (!(f%60)) R(`for(let k in K)delete K[k];Object.assign(K,${JSON.stringify([{d:1},{s:1},{a:1},{w:1},{ArrowUp:1},{ArrowRight:1}][(w+f/60)%6])})`);
    if (!(f%103)) R('startKick()');
    R('upd(1/60)');
    if (!R('Number.isFinite(P.x+P.y+A.x+A.y)')) throw Error('nonfinite '+w);
  }
}

// Impossible stress remains bounded for 30 simulated seconds in the densest swarm stage.
R('mode=1;D=1.6;wave=11;spawnWave();inv=1e9');
let maxBullets=0,maxFx=0;
for (let i=0;i<1800;i++) {
  R('upd(1/60)');
  maxBullets=Math.max(maxBullets,R('B.length')); maxFx=Math.max(maxFx,R('G.length'));
  if (!R('Number.isFinite(P.x+P.y+A.x+A.y)')) throw Error('impossible stress nonfinite');
}
if (maxBullets>400 || maxFx>300) throw Error(`impossible runaway B=${maxBullets} G=${maxFx}`);
// Impossible Cobtopus stress: keep the player invulnerable and make sure radial fire/adds stay bounded and finite.
R('mode=1;D=1.6;wave=13;spawnWave();inv=1e9');
let bossBullets=0,bossEnemies=0;
for(let i=0;i<1800;i++){
  R('upd(1/60)'); bossBullets=Math.max(bossBullets,R('B.length')); bossEnemies=Math.max(bossEnemies,R('E.length'));
  if(!R('Number.isFinite(P.x+P.y+A.x+A.y)'))throw Error('impossible boss nonfinite');
}
if(bossBullets>500||bossEnemies>20)throw Error(`impossible boss runaway B=${bossBullets} E=${bossEnemies}`);

console.log(`PASS: four modes, full density matrix, pickup/enemy cadence, telegraph fairness, boss scaling, mute/mixer, rebinds, input latch, HUSKSHIFT/Cobtopus, charger walls, 13 stages, impossible stress (swarm B=${maxBullets}, boss B=${bossBullets}/E=${bossEnemies})`);
