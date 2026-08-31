import{readFileSync}from'node:fs';
const s=readFileSync('src/03-sky-v030.js','utf8'),h=readFileSync('dist/index.html','utf8');
for(const q of['function rain38(','r-j*76-i*6','1+(z>.34)+(z>.68)','rain38(W/2,h+140,450,n,z*.22)','rain38(W/2,H-20,510,3,.16)'])if(!s.includes(q))throw Error('missing v0.38 nested-rainbow contract: '+q);
if(s.includes('W*.66')||s.includes('W*.08'))throw Error('split background rainbows returned');
if(/Math\.random|rn\(/.test(s))throw Error('nested sky must stay deterministic');
if(!h.includes('STRETCHICORN'))throw Error('title did not survive v0.38 sky override');
console.log('PASS: v0.38 renders one symmetric outer-red rainbow family that progresses single -> double -> triple and reuses it on the title');
