import{readFileSync}from'node:fs';
const h=readFileSync('dist/index.html','utf8'),s=readFileSync('src/03-story-v033.js','utf8'),b=readFileSync('scripts/build.mjs','utf8'),a=readFileSync('src/03-boss-art-v034.js','utf8');
for(const q of['THE SPLIT','MAGICAL','CORN ARMY','SNAP BACK TOGETHER','13 TRIALS','FIRST FLIGHT'])if(!h.includes(q))throw Error('missing story beat '+q);
for(const q of['THE LIVING SCAR','THE RAINBOW REFUSED TO LET GO','BOTH HALVES ALIVE','THE WORLD FORGOT COLOR','THE LAST RAINBOW FOUND THE WOUND','THE LAST RAINBOW FOUND YOU'])if(h.includes(q))throw Error('retired intro shipped: '+q);
if(!b.includes("'03-story-v033.js'")||!s.includes('function intro()'))throw Error('story declaration/build seam missing');
if(!s.includes('demo(575-p*35,345,0,60+p*240')||!s.includes("gel(690,345,12,10,'#ffd65a')"))throw Error('aligned original Split geometry missing');
if(s.includes('practice()'))throw Error('story must wait for player input');
if(!b.includes("'03-boss-art-v034.js'")||!a.includes('function h34(')||!a.includes('function k34(')||!a.includes('bezierCurveTo')||!a.includes('e.b==1')||!a.includes('e.b==2'))throw Error('v0.34 boss-art seam missing');
console.log('PASS: simple Split intro restored with aligned rainbow; shared husk/cob boss art installed');
