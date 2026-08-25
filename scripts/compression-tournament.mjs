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
writeFileSync(`${candidates}/00-current.html`,html);

function run(bin,args){
  console.log('$',bin,...args);
  const p=spawnSync(bin,args,{stdio:'inherit'});
  if(p.status)throw Error(`${bin} failed with ${p.status}`);
}
function wrap(name,path){
  const body=readFileSync(path,'utf8').trim();
  writeFileSync(`${candidates}/${name}.html`,pre+body+post);
  console.log(name,'HTML bytes',Buffer.byteLength(pre+body+post));
}

// Terser is deliberately conservative here: repeated safe compression plus top-level
// mangling. More aggressive `unsafe_*` switches are excluded from the baseline
// tournament because gameplay determinism matters more than another handful of bytes.
run('npx',['--yes','terser@5.50.0',`${root}/base.js`,'--compress','passes=3','--mangle','toplevel','--ecma','2020','--output',`${root}/terser.js`]);
wrap('10-terser',`${root}/terser.js`);

// Roadroller was designed for js13k and is intended to be followed by DEFLATE.
// `--dirty` is safe for the competition artifact because it contains exactly one
// self-contained script and no external global-scope library.
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D',`${root}/base.js`,'-o',`${root}/roadroller.js`]);
wrap('20-roadroller',`${root}/roadroller.js`);
run('npx',['--yes','roadroller@2.1.0','-q','-O1','-D',`${root}/terser.js`,'-o',`${root}/terser-roadroller.js`]);
wrap('30-terser-roadroller',`${root}/terser-roadroller.js`);

console.log(`Candidates written to ${candidates}`);
