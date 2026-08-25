import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const root='.tmp-compression',candidates=`${root}/candidates`;
rmSync(root,{recursive:true,force:true});
mkdirSync(candidates,{recursive:true});

const html=readFileSync('dist/index.html','utf8');
const a=html.indexOf('<script>'),b=html.lastIndexOf('</script>');
if(a<0||b<a)throw Error('competition HTML script not found');
const pre=html.slice(0,a+8),js=html.slice(a+8,b),post=html.slice(b);
writeFileSync(`${root}/base.js`,js);
writeFileSync(`${root}/base.html`,html);
writeFileSync(`${candidates}/00-current.html`,html);

function run(bin,args){
  console.log('$',bin,...args);
  const p=spawnSync(bin,args,{stdio:'inherit'});
  if(p.status)throw Error(`${bin} failed with ${p.status}`);
}
function wrap(name,path){
  const body=readFileSync(path,'utf8').trim(),out=pre+body+post;
  writeFileSync(`${candidates}/${name}.html`,out);
  console.log(name,'HTML bytes',Buffer.byteLength(out));
}
function outer(name,path){
  const body=readFileSync(path,'utf8').trim(),out='<script>'+body+'</script>';
  writeFileSync(`${candidates}/${name}.html`,out);
  console.log(name,'HTML bytes',Buffer.byteLength(out));
}

// The existing custom build already aggressively golfs top-level identifiers and the
// VM regression harness intentionally reaches into a small subset of those globals.
// Let Terser optimize/mangle function-local implementation details while preserving
// that test surface. Unsafe transforms stay off until a candidate proves equivalent.
run('npx',['--yes','terser@5.50.0',`${root}/base.js`,'--compress','passes=3','--mangle','--ecma','2020','--output',`${root}/terser.js`]);
wrap('10-terser',`${root}/terser.js`);
writeFileSync(`${root}/terser.html`,pre+readFileSync(`${root}/terser.js`,'utf8').trim()+post);

// Roadroller was designed for js13k and is intended to be followed by DEFLATE.
// `--dirty` is safe for this one-script artifact. O1 is the production-speed search;
// O2 spends roughly an order of magnitude more trials to test whether deeper tuning
// earns enough bytes to justify pinning a saved configuration later.
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D',`${root}/base.js`,'-o',`${root}/roadroller.js`]);
wrap('20-roadroller-o1',`${root}/roadroller.js`);
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D',`${root}/terser.js`,'-o',`${root}/terser-roadroller.js`]);
wrap('30-terser-roadroller-o1',`${root}/terser-roadroller.js`);
run('npx',['--yes','roadroller@2.1.0','-q','-O2','-D',`${root}/base.js`,'-o',`${root}/roadroller-o2.js`]);
wrap('40-roadroller-o2',`${root}/roadroller-o2.js`);
// Leave the winning Terser → Roadroller O2 search verbose once so CI records the
// optimizer's exact fixed parameters. Production packaging will pin those parameters
// and never run the stochastic optimizer.
run('npx',['--yes','roadroller@2.1.0','-O2','-D',`${root}/terser.js`,'-o',`${root}/terser-roadroller-o2.js`]);
wrap('50-terser-roadroller-o2',`${root}/terser-roadroller-o2.js`);

// Whole-document mode lets Roadroller model the shell/CSS together with JavaScript.
// It reconstructs the page through document.write, so the final file only needs the
// outer decoder script. Real-browser smoke is authoritative for these candidates.
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D','-t','text','-a','write',`${root}/base.html`,'-o',`${root}/html-roadroller.js`]);
outer('60-html-roadroller-o1',`${root}/html-roadroller.js`);
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D','-t','text','-a','write',`${root}/terser.html`,'-o',`${root}/terser-html-roadroller.js`]);
outer('70-terser-html-roadroller-o1',`${root}/terser-html-roadroller.js`);

console.log(`Candidates written to ${candidates}`);
