import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';

const input='dist/index.html',outDir='wavedash-dist',out=`${outDir}/index.html`;
const html=readFileSync(input,'utf8');
const hook='<script>if(window.Wavedash){Wavedash.updateLoadProgressZeroToOne(1);Wavedash.init()}</script>';

rmSync(outDir,{recursive:true,force:true});
mkdirSync(outDir,{recursive:true});
writeFileSync(out,html+hook);
console.log(`Wavedash build: ${out}`);
