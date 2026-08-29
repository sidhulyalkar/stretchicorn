import{readFileSync}from'node:fs';
const h=readFileSync('dist/index.html','utf8'),s=readFileSync('src/03-story-v033.js','utf8'),b=readFileSync('scripts/build.mjs','utf8');
for(const q of['THE SPLIT','MAGICAL','CORN ARMY','SNAP BACK TOGETHER','FIRST FLIGHT'])if(!h.includes(q))throw Error('missing story beat '+q);
for(const q of['THE LIVING SCAR','THE LAST RAINBOW FOUND YOU'])if(h.includes(q))throw Error('retired intro shipped: '+q);
if(!b.includes("'03-story-v033.js'")||!s.includes('function intro()'))throw Error('story declaration/build seam missing');
if(!s.includes('demo(575-p*35,345,0,60+p*240')||!s.includes("gel(690,345,12,10,'#ffd65a')"))throw Error('split animation missing');
if(s.includes('practice()'))throw Error('story must wait for player input');
console.log('PASS: v0.33 The Split tells kernel -> pop -> split -> corn army -> reunion goal on one persistent screen');
