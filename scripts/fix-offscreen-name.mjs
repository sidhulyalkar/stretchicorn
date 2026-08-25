import{readFileSync,writeFileSync}from'node:fs';
let p='src/00-core.js',s=readFileSync(p,'utf8'),a="O=document.createElement('canvas'),Y=O.getContext('2d')",b="O=document.createElement('canvas'),OX=O.getContext('2d')";if(!s.includes(a))throw Error('missing core offscreen seam');writeFileSync(p,s.replace(a,b));
p='src/03-render.js';s=readFileSync(p,'utf8');a="Y.setTransform(1,0,0,1,0,0);Y.clearRect(0,0,W,H);Y.drawImage(C,0,0)";b="OX.setTransform(1,0,0,1,0,0);OX.clearRect(0,0,W,H);OX.drawImage(C,0,0)";if(!s.includes(a))throw Error('missing chroma offscreen seam');writeFileSync(p,s.replace(a,b));
console.log('PASS: offscreen context renamed away from golfed inv alias Y');
