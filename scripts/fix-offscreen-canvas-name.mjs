import{readFileSync,writeFileSync}from'node:fs';
let p='src/00-core.js',s=readFileSync(p,'utf8');
for(const[a,b]of[["O=document.createElement('canvas'),OX=O.getContext('2d')","OC=document.createElement('canvas'),OX=OC.getContext('2d')"],[";O.width=W;O.height=H;",";OC.width=W;OC.height=H;"]]){if(!s.includes(a))throw Error('missing core canvas seam '+a);s=s.replace(a,b)}writeFileSync(p,s);
p='src/03-render.js';s=readFileSync(p,'utf8');for(const[a,b]of[["X.drawImage(O,d,0)","X.drawImage(OC,d,0)"],["X.drawImage(O,-d,0)","X.drawImage(OC,-d,0)"]]){if(!s.includes(a))throw Error('missing chroma canvas seam '+a);s=s.replace(a,b)}writeFileSync(p,s);
console.log('PASS: offscreen canvas/context now avoid golf aliases O/Y');
