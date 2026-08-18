import {statSync} from 'node:fs';
const p=process.argv[2]||'dist/stretchicorn-desktop-v0.20.8.zip',n=statSync(p).size,L=13312;
console.log(`${p}: ${n}/${L} bytes (${L-n} free)`); if(n>L)process.exit(1);
