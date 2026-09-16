import {copyFileSync,mkdirSync,rmSync} from 'node:fs';
import {dirname,join} from 'node:path';

const outDir='wavedash-dist';
const files=[
  'index.html',
  'src/style.css',
  'src/wavedash.css',
  'src/00-core.js',
  'src/01-combat.js',
  'src/02-update.js',
  'src/03-render.js',
  'src/04-ui-input.js',
  'src/03-keyart-v026.js',
  'src/wavedash-platform.js',
];

rmSync(outDir,{recursive:true,force:true});
for(const file of files){
  const target=join(outDir,file);
  mkdirSync(dirname(target),{recursive:true});
  copyFileSync(file,target);
}
console.log(`Wavedash build: ${outDir}/ (${files.length} files, readable platform layer enabled)`);
