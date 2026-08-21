import {readFileSync} from 'node:fs';

const root=readFileSync('index.html','utf8');
const competition=readFileSync('dist/index.html','utf8');
const platform=readFileSync('wavedash-dist/index.html','utf8');

const hook=s=>/updateLoadProgressZeroToOne\(1\).*Wavedash\.init/s.test(s);
if(!hook(root))throw Error('root direct-upload shell does not initialize Wavedash');
if(!hook(platform))throw Error('wavedash-dist build does not initialize Wavedash');
if(/Wavedash\.init/.test(competition))throw Error('competition artifact contaminated by Wavedash code');
if(!/src\/04-ui-input\.js[\s\S]*Wavedash\.init/.test(root))throw Error('root shell signals ready before game scripts load');
console.log('PASS: root upload + wavedash-dist initialize Wavedash; competition dist remains untouched');
