import {readFileSync} from 'node:fs';

const root=readFileSync('index.html','utf8');
const style=readFileSync('src/style.css','utf8');
const competition=readFileSync('dist/index.html','utf8');
const platform=readFileSync('wavedash-dist/index.html','utf8');

const hook=s=>/updateLoadProgressZeroToOne\(1\).*Wavedash\.init/s.test(s);
const fullBleed=s=>/background:#090610/.test(s)&&/canvas\{[^}]*width:min\(100vw,150vh\)/.test(s)&&!/width:min\(100vw,150vh,960px\)/.test(s)&&!/background:#111/.test(s);
if(!hook(root))throw Error('root direct-upload shell does not initialize Wavedash');
if(!hook(platform))throw Error('wavedash-dist build does not initialize Wavedash');
if(/Wavedash\.init/.test(competition))throw Error('competition artifact contaminated by Wavedash code');
if(!/src\/04-ui-input\.js[\s\S]*Wavedash\.init/.test(root))throw Error('root shell signals ready before game scripts load');
if(!/src\/style\.css/.test(root)||!fullBleed(style))throw Error('root direct-upload shell is not using the responsive full-bleed canvas skin');
if(!fullBleed(competition)||!fullBleed(platform))throw Error('built canvas regressed to a capped or gray Wavedash frame');
console.log('PASS: root upload + wavedash-dist initialize Wavedash; responsive canvas fills the frame without gray gutters; competition dist remains Wavedash-free');
