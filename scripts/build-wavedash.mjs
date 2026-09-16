import {copyFileSync,mkdirSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';

const outDir='wavedash-dist';
const rootIndex=readFileSync('index.html','utf8');
const legacyHook='<script>if(window.Wavedash){Wavedash.updateLoadProgressZeroToOne(1);Wavedash.init({debug:false})}</script>';
if(!rootIndex.includes(legacyHook))throw Error('frozen root index no longer contains the expected Wavedash init hook');
const platformHook='<script src="src/wavedash-platform.js"></script><script src="wavedash/challenge-platform.js"></script>';
const platformIndex=rootIndex.replace(legacyHook,platformHook);
const files=[
  'src/style.css',
  'src/00-core.js',
  'src/01-combat.js',
  'src/02-update.js',
  'src/03-render.js',
  'src/04-ui-input.js',
  'src/03-keyart-v026.js',
  'src/wavedash-platform.js',
  'wavedash/challenge-platform.js',
];

rmSync(outDir,{recursive:true,force:true});
mkdirSync(outDir,{recursive:true});
writeFileSync(join(outDir,'index.html'),platformIndex);
for(const file of files){
  const target=join(outDir,file);
  mkdirSync(dirname(target),{recursive:true});
  copyFileSync(file,target);
}
console.log(`Wavedash build: ${outDir}/index.html + ${files.length} frozen/source files`);
