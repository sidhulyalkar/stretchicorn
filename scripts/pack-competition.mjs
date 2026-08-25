import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const tmp='.tmp-pack',input='dist/index.html';
rmSync(tmp,{recursive:true,force:true});mkdirSync(tmp,{recursive:true});
const html=readFileSync(input,'utf8'),a=html.indexOf('<script>'),b=html.lastIndexOf('</script>');
if(a<0||b<a)throw Error('competition script not found');
const pre=html.slice(0,a+8),post=html.slice(b);
writeFileSync(`${tmp}/game.js`,html.slice(a+8,b));
function run(bin,args){let p=spawnSync(bin,args,{stdio:'inherit'});if(p.status)throw Error(`${bin} failed (${p.status})`)}
run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=3','--mangle','--ecma','2020','--output',`${tmp}/min.js`]);
const fixed=['-q','-O0','-D','-Zab25','-Zlr1333','-Zmd11','-Zpr14','-S0,1,2,3,5,6,13,26,49,105,179,449'];
for(let i=0;i<2;i++)run('npx',['--yes','roadroller@2.1.0',...fixed,`${tmp}/min.js`,'-o',`${tmp}/packed${i}.js`]);
const x=readFileSync(`${tmp}/packed0.js`,'utf8'),y=readFileSync(`${tmp}/packed1.js`,'utf8');
if(x!==y)throw Error('Roadroller fixed configuration was not deterministic');
writeFileSync(input,pre+x.trim()+post);
console.log('packed dist/index.html',Buffer.byteLength(pre+x.trim()+post),'bytes');
rmSync(tmp,{recursive:true,force:true});
