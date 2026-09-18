import {copyFileSync,cpSync,mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';

const outDir='wavedash-dist';
const packedSubmission=readFileSync('dist/index.html','utf8');
const submissionStyle=packedSubmission.match(/<style>([\s\S]*?)<\/style>/)?.[1];
if(!submissionStyle)throw Error('canonical packed js13k artifact no longer contains its inline stylesheet');

const staging=mkdtempSync(join(tmpdir(),'stretchicorn-wavedash-'));
let submissionLocal;
try{
  mkdirSync(join(staging,'scripts'),{recursive:true});
  copyFileSync('package.json',join(staging,'package.json'));
  copyFileSync('scripts/build.mjs',join(staging,'scripts/build.mjs'));
  cpSync('src',join(staging,'src'),{recursive:true});
  const build=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:staging,encoding:'utf8'});
  if(build.status!==0)throw Error(`temporary canonical build failed:\n${build.stderr||build.stdout}`);
  submissionLocal=readFileSync(join(staging,'dist/stretchicorn-local.html'),'utf8');
}finally{
  rmSync(staging,{recursive:true,force:true});
}
submissionLocal=submissionLocal.replace(/<style>[\s\S]*?<\/style>/,`<style>${submissionStyle}</style>`);
if(!submissionLocal.includes('<canvas id=c width=960 height=640></canvas>'))throw Error('reconstructed standalone js13k artifact no longer contains the game canvas');
if(!submissionLocal.includes("boxes(['FIELD GUIDE','CONTROLS'],520)")||!submissionLocal.includes("txt('TOP STYLE '")||!submissionLocal.includes('C.onmousedown='))throw Error('reconstructed standalone js13k artifact no longer contains the final submitted title/input layer');
const platformHook='<script src="src/wavedash-platform.js"></script><script src="wavedash/challenge-platform.js"></script>';
const platformIndex=submissionLocal+platformHook;
const files=[
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
console.log(`Wavedash build: reconstructed js13k submission runtime + ${files.length} SDK-only observer files`);
