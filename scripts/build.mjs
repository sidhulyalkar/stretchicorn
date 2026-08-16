import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const files=['00-core.js','01-combat.js','02-update.js','03-render.js','04-ui-input.js'];
const css=readFileSync('src/style.css','utf8').trim();
function mini(s){s=s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/'use strict';/g,'');let o='',q='',e=0;for(let i=0;i<s.length;i++){let c=s[i];if(q){o+=c;if(e)e=0;else if(c=='\\')e=1;else if(c==q)q='';continue}if(c=="'"||c=='"'||c=='`'){q=c;o+=c;continue}if(/\s/.test(c)){let j=i+1;while(j<s.length&&/\s/.test(s[j]))j++;let a=o[o.length-1]||'',b=s[j]||'';if(/[\w$]/.test(a)&&/[\w$]/.test(b))o+=' ';i=j-1}else o+=c}return o}
let js=mini(files.map(f=>readFileSync('src/'+f,'utf8')).join('\n'));
const html='<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Stretchicorn</title><style>'+css+'</style><canvas id=c width=960 height=640></canvas><script>'+"'use strict';"+js+'</script>';
mkdirSync('dist',{recursive:true});writeFileSync('dist/index.html',html);console.log('dist/index.html',Buffer.byteLength(html),'bytes');
