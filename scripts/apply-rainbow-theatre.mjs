import {readFileSync,writeFileSync} from 'node:fs';

function swap(path,oldText,newText,label){
  let s=readFileSync(path,'utf8');
  if(s.includes(newText)){console.log('already',label);return}
  if(!s.includes(oldText))throw Error(`missing seam: ${label}`);
  s=s.replace(oldText,newText);
  writeFileSync(path,s);
  console.log('patched',label);
}

// CORE: story palette, lightweight mastery state, reactive music, and boss theatre.
swap('src/00-core.js',
"const C=document.querySelector('#c'),X=C.getContext('2d'),W=960,H=640,T=Math.PI*2,MAX=13,K={},RC=['#ff5d8f','#ff9f43','#ffe45a','#6fe38a','#61c8ff','#b28dff'],cl=",
"const C=document.querySelector('#c'),X=C.getContext('2d'),W=960,H=640,T=Math.PI*2,MAX=13,K={},RC=['#ff5d8f','#ff9f43','#ffe45a','#6fe38a','#61c8ff','#b28dff'],SC=['#090b12','#10140e','#170f0c','#08120e','#180e0b','#181108','#10140f','#110d18','#071319','#091020','#1b0c0c','#11101b','#070811'],cl=",
'chapter palettes');

swap('src/00-core.js',
"msg='',msgT=0,tip=0,combo=1,comboT=0,aud",
"msg='',msgT=0,tip=0,wounds=0,grade='',combo=1,comboT=0,aud",
'mastery state');

swap('src/00-core.js',
"v=[168,174,178,150,162,184,176,154][b]+(b<2?s*.4:0),k=",
"v=[168,174,178,150,162,184,176,154][b]+(b<2?s*.4:0)+(combo-1)*3,k=",
'combo-reactive tempo');

swap('src/00-core.js',
"beat=Math.max(beat,.3)}if((b==0||b==1)&&s>9",
"beat=Math.max(beat,.3)}if(combo>2&&(s&1))snd(1800+s*20,.012,.003,'square',900);if((b==0||b==1)&&s>9",
'combo-reactive percussion');

swap('src/00-core.js',
"function spawnWave(){E.length=B.length=U.length=0;queen=0;bp=bt=bi=0;walls();",
"function spawnWave(){E.length=B.length=U.length=0;queen=0;wounds=0;grade='';bp=bt=bi=0;walls();",
'per-trial mastery reset');

swap('src/00-core.js',
"if(wave==5||wave==MAX){queen=1;let q=enemy(3,W/2,135);if(wave==MAX){q.y=-55;q.in=1.55;",
"if(wave==5||wave==MAX){queen=1;let q=enemy(3,W/2,135);q.in=.8;if(wave==MAX){q.y=-55;q.in=1.55;",
'Maize Monarch entrance');

swap('src/00-core.js',
"function finale(){E.length=B.length=U.length=0;queen=3;bp=1;bt=0;shiftWalls();enemy(3,240,135).a=1;enemy(3,720,135);enemy(6,480,105);flash=.8}",
"function finale(){E.length=B.length=U.length=0;queen=3;bp=1;bt=0;shiftWalls();enemy(3,240,135,1.55,1);enemy(3,720,135,1.55);enemy(6,480,105,1.55);stageT=1.5;flash=.8;say('NOT YET.',1.2);snd(70,.45,.07,'sawtooth',30)}",
'Impossible encore theatre');

// COMBAT: damage-quality telemetry, grade calculation, and restored-world breathing beats.
swap('src/01-combat.js',
"hearts--;inv=1.15;shake=12;charge=ready=0;",
"hearts--;wounds++;inv=1.15;shake=12;charge=ready=0;",
'damage mastery telemetry');

swap('src/01-combat.js',
"deathFX(e);E.splice(i,1);if(s>=0)",
"deathFX(e);E.splice(i,1);if(queen==3&&s>2){flash=.7;say('NOT YET.',.7);snd(62,.35,.06,'sawtooth',30)}if(s>=0)",
'false-death sting');

swap('src/01-combat.js',
"if(e.type==3){E.length=B.length=0;nextWave=1.5;duo(900,1350);say('MAIZE MONARCH POPS • SKY RESTORED',1.2);return}if(!E.length&&wave<MAX){nextWave=1.2;duo(900,1350);say('SKY RESTORED '+wave+'/13  +'+g,1)}",
"if(wave<MAX&&(e.type==3||!E.length))grade=wounds?wounds>2?'C':'B':combo>2.2?'S':'A';if(e.type==3){E.length=B.length=0;nextWave=1.8;duo(900,1350);say('RESTORED • '+grade,1.4);return}if(!E.length&&wave<MAX){nextWave=1.7;duo(900,1350);say('RESTORED • '+grade+'  +'+g,1.3)}",
'grades and breathing beats');

// UPDATE: replace timed tutorial copy with action-gated teaching, then keep Trial 1 harmless until first Snap.
swap('src/02-update.js',
" if(tip==0&&runT>2.3){tip=1;say('PROTECT THE ♥ BODY • HEAD + RAINBOW CANNOT BE HURT',3)}else if(tip==1&&runT>5.5){tip=2;say('WASD MOVES BODY • ARROWS STEER THE SAFE HEAD',3)}else if(tip==2&&runT>8.5){tip=3;say('PULL AWAY • SHORT STRETCH = SNAP READY',2.7)}else if(tip==3&&ready>0){tip=4;say('PINK FLASH + SPACE = RAINBOW SNAP',2.4)}else if(tip==4&&snapT>0){tip=5;say('SNAP AGAIN QUICKLY = DOUBLE RAINBOW',2.5)}",
" if(tip==0&&runT>1.1){tip=1;say('WASD • MOVE THE HEART',8)}else if(tip==1&&Math.hypot(A.x-445,A.y-360)>16){tip=2;say('ARROWS • AIM THE HORN',8)}else if(tip==2&&(ax||ay)){tip=3;say('PULL AWAY • STRETCH THE RAINBOW',8)}else if(tip==3&&ready>0){tip=4;say('SPACE • RAINBOW SNAP',8)}else if(tip==4&&snapT>0){tip=5;say('COLOR RETURNS.',1.6);flash=.25}",
'action-gated invisible tutorial');

swap('src/02-update.js',
" for(let e of [...E]){e.hit=Math.max(0,e.hit-dt);if(e.in>0)",
" for(let e of [...E]){e.hit=Math.max(0,e.hit-dt);if(wave==1&&tip<5){e.vx=e.vy=0;e.cd=1;continue}if(e.in>0)",
'harmless tutorial corn');

// RENDER: resurrection, stage palettes, skill-driven color restoration, readable piercing shots,
// lightweight procedural life, restored-stage tableaux, and boss-rush title theatre.
swap('src/03-render.js',
"X.lineCap='round';X.strokeStyle=inv?'#fff':'#fff7ff';",
"X.lineCap='round';X.globalAlpha=wave==1?cl(runT/1.3,0,1):1;X.strokeStyle=inv?'#fff':'#fff7ff';",
'rainbow resurrection fade');

swap('src/03-render.js',
"X.stroke()}X.lineCap='butt'}\nfunction uni()",
"X.stroke()}X.globalAlpha=1;X.lineCap='butt'}\nfunction uni()",
'restore alpha after resurrection');

swap('src/03-render.js',
"X.save();X.translate(A.x,A.y);X.rotate(a);X.fillStyle='#fff5ff';",
"X.save();X.translate(A.x,A.y);X.rotate(a);X.scale(1+charge*.08,1-charge*.08);X.fillStyle='#fff5ff';",
'body squash and stretch');

swap('src/03-render.js',
"X.restore();X.save();X.translate(P.x,P.y);X.rotate(a);X.fillStyle='#fff8ff';",
"X.restore();X.save();X.translate(P.x,P.y);X.rotate(a);let u=Math.sin(t*5)*.015;X.scale(1+u,1-u);X.fillStyle='#fff8ff';",
'head breathing');

swap('src/03-render.js',
"X.beginPath();X.arc(8,s*7,3,0,T);X.fill()",
"X.beginPath();X.arc(8,s*7,Math.sin(t*2.1)>.94?1:3,0,T);X.fill()",
'unicorn blink');

swap('src/03-render.js',
"function cob(e){X.save();X.translate(e.x,e.y);let boss=",
"function cob(e){X.save();X.translate(e.x,e.y);let j=e.hit?-.08:Math.sin(t*3+e.x)*.02;X.scale(1+j,1-j);let boss=",
'corn breathing and hit squash');

swap('src/03-render.js',
"let sky=(wave-1)/12;X.fillStyle='#17191e';X.fillRect(-20,-20,W+40,H+40);",
"let sky=(wave-1)/12,lit=cl(sky*.65+(combo-1)*.13+(nextWave?.35:0)+luckyT*.3,0,1);X.fillStyle=SC[wave-1];X.fillRect(-20,-20,W+40,H+40);X.globalAlpha=.18+.18*lit;X.fillStyle=SC[(wave+3)%13];X.fillRect(-20,H*.54,W+40,H*.46);X.globalAlpha=.3;X.fillStyle='#050608';X.beginPath();X.moveTo(0,H);for(let i=0;i<9;i++)X.lineTo(i*120,H-65-Math.sin(i*1.7+wave)*(22+wave*2));X.lineTo(W,H);X.fill();X.globalAlpha=.06+lit*.08;X.fillStyle=RC[wave%6];X.beginPath();X.arc(90+(wave*67)%780,135+(wave%3)*35,30+(wave%4)*7,0,T);X.fill();X.globalAlpha=1;",
'procedural storybook chapter background');

swap('src/03-render.js',
"q=.025+beat*.07;",
"q=.008+lit*.07+beat*.07;",
'skill-driven spectral contamination');

swap('src/03-render.js',
"X.globalAlpha=.12+.12*Math.sin(t*2+i);",
"X.globalAlpha=.05+lit*.14+.08*Math.sin(t*2+i);",
'skill-driven star glow');

swap('src/03-render.js',
"X.globalAlpha=.1-sky*.04+(i%3)*.025;",
"X.globalAlpha=.13-lit*.07+(i%3)*.025;",
'chapter cloud restraint');

swap('src/03-render.js',
"X.globalAlpha=sky*.16;",
"X.globalAlpha=lit*.22;",
'skill-restored horizon rainbow');

swap('src/03-render.js',
"X.lineTo(x+6,H-40);X.lineTo(x+22,H-53);X.stroke()}",
"X.lineTo(x+6,H-40);X.lineTo(x+22,H-53);X.stroke();if(lit>.25){X.globalAlpha=lit;X.fillStyle=RC[(i+wave)%6];X.fillRect(x+5,H-62,4,4);X.globalAlpha=1}}",
'flowers wake with mastery');

swap('src/03-render.js',
"B.forEach(b=>{X.fillStyle=b.team==1?'#8dffe3':'#fff2bf';X.beginPath();X.arc(b.x,b.y,b.r+1,0,T);X.fill();X.fillStyle=b.team==1?'#fff':'#e9b83e';X.beginPath();X.arc(b.x+2,b.y+1,2,0,T);X.fill()});",
"B.forEach(b=>{if(b.r>7){let a=Math.atan2(b.vy,b.vx);X.save();X.translate(b.x,b.y);X.rotate(a);X.fillStyle='#8dffe3';X.beginPath();X.moveTo(12,0);X.lineTo(-10,5);X.lineTo(-19,0);X.lineTo(-10,-5);X.fill();X.globalAlpha=.35;X.fillRect(-30,-2,22,4);X.restore();X.globalAlpha=1}else{X.fillStyle=b.team==1?'#8dffe3':'#fff2bf';X.beginPath();X.arc(b.x,b.y,b.r+1,0,T);X.fill();X.fillStyle=b.team==1?'#fff':'#e9b83e';X.beginPath();X.arc(b.x+2,b.y+1,2,0,T);X.fill()}});",
'cyan piercing comet silhouette');

swap('src/03-render.js',
"if(wave==1&&runT<10){X.globalAlpha=.35+.2*Math.sin(t*8);X.strokeStyle='#ff6f9f';X.lineWidth=2;X.beginPath();X.arc(A.x,A.y,31,0,T);X.stroke();X.globalAlpha=1;txt('♥ BODY TAKES DAMAGE',A.x,A.y+43,10,'#ff9dbc','center')}",
"if(wave==1&&tip<5){let q=tip<2?A:P;X.globalAlpha=.35+.2*Math.sin(t*8);X.strokeStyle=tip<2?'#ff6f9f':'#8dffe3';X.lineWidth=2;X.beginPath();X.arc(q.x,q.y,31,0,T);X.stroke();X.globalAlpha=1;txt(tip<2?'REVIVED HEART':'SAFE HORN',q.x,q.y+43,10,'#fff','center')}",
'tutorial focus marker');

swap('src/03-render.js',
"txt('TRIAL '+wave+' / 13',W/2,282,14,'#ffe767','center');txt(SN[wave-1],W/2,323,27,'#fff','center');",
"txt(queen==3?'IMPOSSIBLE ENCORE':'TRIAL '+wave+' / 13',W/2,282,14,'#ffe767','center');txt(queen==3?'THE WORLD REFUSES':SN[wave-1],W/2,323,27,'#fff','center');",
'boss-rush title theatre');

swap('src/03-render.js',
"X.globalAlpha=1}if(luckyT>0){",
"X.globalAlpha=1}if(nextWave){X.globalAlpha=.08+nextWave*.05;X.fillStyle=RC[wave%6];X.fillRect(0,72,W,H-72);X.globalAlpha=1;txt('RESTORED • '+grade,W/2,H-45,23,'#fff','center')}if(luckyT>0){",
'post-stage storybook tableau');

// TITLE: one sentence of lore, everything else stays wordless/in-play.
swap('src/04-ui-input.js',
"txt('STRETCH • SNAP • SHUCK.',W/2,128,17,'#ffe767','center');mascot();",
"txt('STRETCH • SNAP • SHUCK.',W/2,128,17,'#ffe767','center');txt('REVIVED BY THE LAST RAINBOW',W/2,154,11,'#9abbb2','center');mascot();",
'title lore seed');

// BUILD: reserve compact release aliases for the two new globals.
swap('scripts/build.mjs',
"finale:'$0',bp:'F',bt:'I'",
"finale:'$0',wounds:'$1',grade:'$2',bp:'F',bt:'I'",
'new release aliases');

// TEST: after input/difficulty assertions, mark the tutorial complete before simulation-focused tests.
swap('scripts/test.mjs',
"R('mode=3;D=2.4');key(' ');if(R('D')!==2.4||R('E.length')!==8)throw Error('retry difficulty');\nR('mode=1;D=1.6;wave=1;spawnWave()');",
"R('mode=3;D=2.4');key(' ');if(R('D')!==2.4||R('E.length')!==8)throw Error('retry difficulty');R('tip=5;runT=20');\nR('mode=1;D=1.6;wave=1;spawnWave()');",
'test harness tutorial bypass');

console.log('Rainbow Theatre source pass complete');
