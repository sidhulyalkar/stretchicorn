import{readFileSync}from'node:fs';
const a=readFileSync('src/03-boss-art-v034.js','utf8'),h=readFileSync('dist/index.html','utf8');
for(const q of['function k34(','function h34(','function f34(','e.b==4?8:6','if(x||y*y>1)','e.b>2?1.45:1.8','z=.55+o*.25','h34(r*.82,o*.7)','k34(r,1.2,c);f34(r,1.25)'])if(!a.includes(q))throw Error('missing v0.35 shape-arbitrage contract: '+q);
if(!h.includes('function f34')&&!h.includes('f34='))throw Error('shared boss face did not ship');
if(!h.includes('COBTOPUS PRIME')||h.includes('COBNOCOPIA'))throw Error('final boss identity drifted');
if(/\.png|\.jpg|\.webp|data:image/i.test(h))throw Error('boss polish must remain procedural; raster asset shipped');
console.log('PASS: v0.35 base shape-arbitrage language remains intact');
