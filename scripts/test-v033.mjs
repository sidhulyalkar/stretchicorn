import{readFileSync}from'node:fs';
const h=readFileSync('dist/index.html','utf8'),s=readFileSync('src/03-story-v033.js','utf8'),b=readFileSync('scripts/build.mjs','utf8');
for(const q of['THE SPLIT','MAGICAL','CORN ARMY','SNAP BACK TOGETHER','LIVING SCAR','BOTH HALVES ALIVE','FIGHT BACK','FIRST FLIGHT'])if(!h.includes(q))throw Error('missing story beat '+q);
for(const q of['THE WORLD FORGOT COLOR','THE LAST RAINBOW FOUND THE WOUND','THE LAST RAINBOW FOUND YOU'])if(h.includes(q))throw Error('retired intro shipped: '+q);
if(!b.includes("'03-story-v033.js'")||!s.includes('function intro()'))throw Error('story declaration/build seam missing');
if(!s.includes('demo(610-p*105,325,0,60+p*210')||!s.includes("gel(640,325,12,10,'#ffd65a')"))throw Error('centered parallel split geometry missing');
if(!s.includes('r=cl((q-2.1)/.7')||!s.includes('THE RAINBOW REFUSED TO LET GO.'))throw Error('Living Scar revival transition missing');
if(s.includes('practice()'))throw Error('story must wait for player input');
console.log('PASS: v0.33 The Split flows kernel -> pop -> parallel halves -> Living Scar -> fight-back goal');
