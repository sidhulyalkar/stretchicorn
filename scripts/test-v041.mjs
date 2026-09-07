import{readFileSync}from'node:fs';import vm from'node:vm';
const s=readFileSync('src/03-title-v037.js','utf8');let baseSpawns=0,baseKills=0,resets=0,msg='';
const X={fillRect(){},strokeRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},save(){},restore(){},translate(){},scale(){},fillText(){}};
const C={clientWidth:960,clientHeight:640};
const c={console,Math,X,C,W:960,H:640,mode:1,kick:0,K:{},BK:['w','s','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '],aim:0,A:{x:445,y:360},bp:0,bt:0,fire:0,wave:1,ready:0,RC:['','','','','',''],D:.7,sel:4,SN:['THE DEAD FIELD'],E:[],B:[],U:[],R:[],puT:0,snap:0,nextWave:0,score:0,inv:0,spawnWave(){baseSpawns++;c.E.push({base:1})},killE(){baseKills++},reset(){resets++;c.wave=1;c.E.length=0;c.spawnWave();c.mode=1},enemy(type,x,y){let e={type,x,y,hp:1,max:1,vx:4,vy:4,g:0};c.E.push(e);return e},upd(dt){c.kick=Math.max(0,c.kick-dt)},draw(){},deathFX(){},puff(){},kp(){},say(v){msg=v},ad:(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a)),cl:(v,a,b)=>v<a?a:v>b?b:v,wake(){},ink(){},txt(){},splash(){},page(){},demo(){},co31(){}};
vm.createContext(c);vm.runInContext(s,c);c.reset();
if(resets!==1||baseSpawns!==1||c.sel!==0||c.E.length!==1||c.SN[0]!=='FIRST FLIGHT'||c.puT!==999||c.inv!==999||!msg.includes('1/5'))throw Error('Easy did not enter a clean First Flight');
let e=c.E[0];c.snap=0;c.killE(e);if(c.sel||c.E.length!==1||c.E[0].hp!==1||!msg.includes('PULL AWAY'))throw Error('uncharged poke incorrectly counted as a tutorial Snap');
let seen=[];for(let n=0;n<5;n++){e=c.E[0];seen.push(e.x+','+e.y);c.snap=1;c.kick=n?0:.1;c.killE(e);if(n<4&&c.E.length!==1)throw Error('tutorial must spawn exactly one next target');if(n===0){if(!c.E[0].g)throw Error('next target must be protected from the same Snap');c.upd(.2);if(c.E[0].g||c.inv!==999||c.E[0].vx||c.E[0].vy)throw Error('tutorial safety/target reset failed')}}
if(c.sel!==5||new Set(seen).size!==5||c.E.length||c.nextWave!==1||c.inv!==1||!msg.includes('FIRST FLIGHT COMPLETE'))throw Error('five successful Snaps did not complete First Flight cleanly');
c.D=1;c.wave=1;c.sel=0;c.spawnWave();if(c.SN[0]!=='FIRST FLIGHT'||baseSpawns!==2)throw Error('Trial 1 naming/base spawn changed unexpectedly');c.killE({});if(baseKills!==1)throw Error('non-tutorial kills lost authoritative path');
console.log('PASS: Easy Trial 1 teaches and requires five separate charged Snaps before Trial 2');
