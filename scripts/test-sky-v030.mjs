import{readFileSync}from'node:fs';
const h=readFileSync('dist/index.html','utf8'),s=readFileSync('src/03-sky-v030.js','utf8'),b=readFileSync('scripts/build.mjs','utf8');
if(!b.includes("'03-sky-v030.js'")||!b.includes('retired scenery seam missing'))throw Error('v0.30 sky build seam missing');
if(h.includes('function house'))throw Error('legacy house/wheel scenery shipped');
if((s.match(/X\.arc/g)||[]).length<2||!s.includes('i/13<z')||!s.includes('RC[(i+wave)%6]'))throw Error('progressive rainbow restoration missing');
if(/Math\.random|rn\(/.test(s))throw Error('sky restoration must stay deterministic');
console.log('PASS: v0.30 removes wheel scenery and restores deterministic rainbow color across the trials');
