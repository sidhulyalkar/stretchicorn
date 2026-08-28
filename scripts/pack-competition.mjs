import {readFileSync,writeFileSync,mkdirSync,rmSync} from'node:fs';
import{spawnSync}from'node:child_process';
const tmp='.tmp-pack',input='dist/index.html';rmSync(tmp,{recursive:true,force:true});mkdirSync(tmp,{recursive:true});
const html=readFileSync(input,'utf8'),a=html.indexOf('<script>'),b=html.lastIndexOf('</script>');if(a<0||b<a)throw Error('competition script not found');const pre=html.slice(0,a+8),post=html.slice(b);writeFileSync(`${tmp}/game.js`,html.slice(a+8,b));
function run(bin,args){let p=spawnSync(bin,args,{stdio:'inherit'});if(p.status)throw Error(`${bin} failed (${p.status})`)}
run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=5,toplevel=true','--mangle','toplevel=true','--ecma','2020','--output',`${tmp}/min.js`]);
const tune=['-O2','-D','-Zab22','-Zlr1910','-Zmd14','-S0,1,2,3,6,7,13,25,42,193,338,425'];run('npx',['--yes','roadroller@2.1.0',...tune,`${tmp}/min.js`,'-o',`${tmp}/packed.js`]);const x=readFileSync(`${tmp}/packed.js`,'utf8');writeFileSync(input,pre+x.trim()+post);console.log('packed dist/index.html',Buffer.byteLength(pre+x.trim()+post),'bytes');rmSync(tmp,{recursive:true,force:true});