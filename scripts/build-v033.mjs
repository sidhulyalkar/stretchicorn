import{readFileSync,writeFileSync,unlinkSync}from'node:fs';
let s=readFileSync('scripts/build.mjs','utf8'),a="'03-bosses-v028.js'];",b="'03-bosses-v028.js','03-intro-v033.js'];";if(!s.includes(a))throw Error('v0.33 build seam missing');let p='scripts/.build-v033.tmp.mjs';writeFileSync(p,s.replace(a,b));try{await import('./.build-v033.tmp.mjs?'+Date.now())}finally{unlinkSync(p)}
