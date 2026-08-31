import{readFileSync}from'node:fs';
const a=readFileSync('src/03-boss-art-v034.js','utf8'),h=readFileSync('dist/index.html','utf8');
for(const q of["(x+y)&1?'#ffd65a':c",'h34(r,o);h34(r*.7,o*.5)','oval(0,0,r*.1*z,r*.22*z,c)','for(let i=0;i<3;i++)oval((i-1)*r*.1,r*.37,3,3,RC[i*2])','h34(r*.8,.5);h34(r*.6,1)'])if(!a.includes(q))throw Error('missing v0.36 shape-reuse detail: '+q);
if(!h.includes('COBTOPUS PRIME')||h.includes('COBNOCOPIA'))throw Error('final boss identity drifted');
if(/\.png|\.jpg|\.webp|data:image/i.test(h))throw Error('v0.36 must stay procedural');
console.log('PASS: v0.36 adds Husk peephole/layers, Colonel medals and layered corrupted Prime using existing primitives');
