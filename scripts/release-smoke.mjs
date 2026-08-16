import {readFileSync} from 'node:fs';import vm from'node:vm';
const h=readFileSync('dist/index.html','utf8'),m=h.match(/<script>([\s\S]*?)<\/script>/);if(!m)throw Error('inline game script missing');
let tones=0,filters=0,raf;const p=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}});function AC(){this.currentTime=0;this.destination={};this.createOscillator=()=>({type:'',frequency:p(),connect(){},start(){tones++},stop(){}});this.createGain=()=>({gain:p(),connect(){}});this.createBiquadFilter=()=>(filters++,{type:'',frequency:p(),Q:p(),connect(){}})}
const x=new Proxy({}, {get:(o,k)=>o[k]||(o[k]=()=>{}),set:(o,k,v)=>(o[k]=v,true)}),c={getContext:()=>x,width:960,height:640};
const s={console,Math,Date,setTimeout:()=>{},clearTimeout:()=>{},requestAnimationFrame:f=>raf=f,document:{querySelector:()=>c},localStorage:{},AudioContext:AC,window:null};s.window=s;s.globalThis=s;vm.createContext(s);vm.runInContext(m[1],s);
const frame=(n=1)=>{for(let i=0;i<n;i++){let f=raf;if(!f)throw Error('RAF stopped');raf=null;f((i+1)*16.67)}};frame(3);if(!s.__SR)throw Error('release test hook missing');
// Title -> play.
s.onkeydown({key:'Enter',preventDefault(){}});frame(5);if(s.__SR.get().mode!==1)throw Error('Enter did not start');
// Controls -> Enter rebind -> restore defaults.
vm.runInContext('mode=0',s);s.onkeydown({key:'c',preventDefault(){}});if(s.__SR.get().mode!==6)throw Error('controls page failed');s.onkeydown({key:'Enter',preventDefault(){}});s.onkeydown({key:'i',preventDefault(){}});if(vm.runInContext('BK[0]',s)!=='i')throw Error('Enter rebind failed');s.onkeydown({key:'d',preventDefault(){}});s.onkeydown({key:'m',preventDefault(){}});
// Settings -> independent music/SFX volume controls.
s.onkeydown({key:'s',preventDefault(){}});if(s.__SR.get().mode!==8)throw Error('settings page failed');s.onkeydown({key:'ArrowLeft',preventDefault(){}});if(s.__SR.get().mv!==3)throw Error('music volume failed');s.onkeydown({key:'ArrowDown',preventDefault(){}});s.onkeydown({key:'ArrowLeft',preventDefault(){}});if(s.__SR.get().sv!==3)throw Error('SFX volume failed');s.onkeydown({key:'m',preventDefault(){}});
// Play and exercise exact release artifact.
s.onkeydown({key:'Enter',preventDefault(){}});for(let i=0;i<90;i++)s.__SR.upd(1/60);if(tones<4||filters<1)throw Error('procedural audio did not schedule');
for(let w=1;w<=13;w++){s.__SR.wave(w);let q=s.__SR.get();if(q.rearBlocked||q.headBlocked)throw Error('unsafe stage '+w);s.__SR.clear();s.__SR.setKeys({d:1,ArrowUp:1});for(let i=0;i<90;i++){if(i==25)s.__SR.startKick();s.__SR.upd(1/60)}q=s.__SR.get();if(!Number.isFinite(q.head.x+q.head.y+q.rear.x+q.rear.y))throw Error('non-finite stage '+w)}
console.log('PASS: exact dist HTML loads, settings/menus/rebind work, audio schedules, 13 stages remain finite and spawn-safe');
