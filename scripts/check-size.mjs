import {readFileSync,statSync} from 'node:fs';
const {version}=JSON.parse(readFileSync('package.json','utf8'));
const L=13312,defaults=[`dist/stretchicorn-desktop-v${version}.zip`,'dist/stretchicorn-js13k.zip'];
const ps=process.argv.length>2?process.argv.slice(2):defaults;
let bad=0;
for(const p of ps){const n=statSync(p).size;console.log(`${p}: ${n}/${L} bytes (${L-n} free)`);if(n>L)bad=1}
if(ps===defaults||process.argv.length==2){const a=readFileSync(defaults[0]),b=readFileSync(defaults[1]);if(!a.equals(b)){console.error('stable js13k alias differs from versioned release');bad=1}}
if(bad)process.exit(1);
