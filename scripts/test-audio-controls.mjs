import assert from'node:assert/strict';import{readFileSync}from'node:fs';import vm from'node:vm';
const h=readFileSync('dist/stretchicorn-local.html','utf8'),code=[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1],noop=()=>{},g={addColorStop:noop};
function load(SV){let X=new Proxy({createLinearGradient:()=>g,createRadialGradient:()=>g},{get:(o,k)=>o[k]||(o[k]=noop),set:(o,k,v)=>(o[k]=v,true)}),C={width:960,height:640,clientWidth:960,clientHeight:640,style:{},getContext:()=>X},localStorage={SV},s={console,Math,Date,localStorage,setTimeout:noop,clearTimeout:noop,requestAnimationFrame:noop,document:{querySelector:()=>C,createElement:()=>C}};s.window=s;vm.createContext(s);vm.runInContext(code,s);return q=>vm.runInContext(q,s)}
assert.equal(load('0,1,0')('V.map(Number).join()'),'0,1,0','new three-slot SFX/Music/Mouse preferences must restore independently');
assert.equal(load('4,0,1')('V.map(Number).join()'),'1,0,1','legacy volume-style values must migrate to compact booleans');
assert.equal(load('0,0')('V.map(Number).join()'),'1,1,1','legacy two-slot audio settings must not strand pointer or new audio controls OFF');
console.log('PASS: independent Music/SFX/Mouse settings persist and legacy audio state migrates safely');
