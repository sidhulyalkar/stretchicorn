from pathlib import Path
import json


def rep(path, old, new, n=1):
    p=Path(path); s=p.read_text()
    if s.count(old)<n: raise SystemExit(f'missing seam in {path}: {old[:80]!r}')
    p.write_text(s.replace(old,new,n))


def between(path, a, b, new):
    p=Path(path); s=p.read_text(); i=s.find(a); j=s.find(b,i)
    if i<0 or j<0: raise SystemExit(f'missing range in {path}: {a!r} -> {b!r}')
    p.write_text(s[:i]+new+s[j:])

# Version and chapter names.
p=Path('package.json'); q=json.loads(p.read_text()); q['version']='0.23.0'; p.write_text(json.dumps(q,indent=2)+'\n')
rep('src/00-core.js',"const SN=['PASTEL PATCH','KERNEL PANIC','POPCORN FRONT','HUSK MAZE','THE MAIZE MONARCH','BUTTER BLITZ','HUSK ARMOR','PRISM POPCORN','THE HUSK ARCHITECT','SUGAR CORN','KERNEL GAUNTLET','DOUBLE CORNBOW','THE COBTOPUS'];", "const SN=['THE DEAD FIELD','FIRST STIRRING','ASH FRONT','HUSK PASSAGE','THE MAIZE MONARCH','GOLDEN FEVER','THE SHELL FIELDS','BROKEN SPECTRUM','THE HUSK ARCHITECT','CRYSTAL NIGHT','THE MARCH','PRISM WAR','THE COBTOPUS'];")

# The mandatory tutorial is now a cinematic before difficulty selection; do not repeat tooltip gating in Trial 1.
rep('src/02-update.js',"function upd(dt){t+=dt;if(mode==5){", "function upd(dt){t+=dt;if(mode==9){stageT+=dt;return}if(mode==5){")
old=" if(tip==0&&runT>1.1){tip=1;say('WASD • MOVE THE HEART',8)}else if(tip==1&&Math.hypot(A.x-445,A.y-360)>16){tip=2;say('ARROWS • AIM THE HORN',8)}else if(tip==2&&(ax||ay)){tip=3;say('PULL AWAY • STRETCH THE RAINBOW',8)}else if(tip==3&&ready>0){tip=4;say('SPACE • RAINBOW SNAP',8)}else if(tip==4&&snapT>0){tip=5;say('COLOR RETURNS.',1.6);flash=.25}\n"
rep('src/02-update.js',old,'')
rep('src/02-update.js',"if(wave==1&&tip<5){e.vx=e.vy=0;e.cd=1;continue}",'')

# Replace one-off glyph wallpaper with four authored environmental biomes.
world=r'''function worldArt(l){X.save();let b=wave<5?0:wave<9?1:wave<12?2:3,h=H*.73;X.globalAlpha=.42;X.fillStyle=['#111915','#1b110d','#10191b','#100b17'][b];X.fillRect(0,h-42,W,84);X.fillStyle='#050707';X.globalAlpha=.82;if(b==0){for(let i=0;i<13;i++){let x=i*82+(i&1)*17,y=h+18+(i%3)*10;X.strokeStyle='#16231c';X.lineWidth=5;X.beginPath();X.moveTo(x,H);X.quadraticCurveTo(x-9,y-62,x+3,y-112-(i%4)*17);X.stroke();for(let s of [-1,1]){X.beginPath();X.moveTo(x,y-47);X.quadraticCurveTo(x+s*22,y-67,x+s*31,y-52);X.stroke()}}X.globalAlpha=.22;X.strokeStyle='#66766d';X.lineWidth=9;for(let i=0;i<3;i++){X.beginPath();X.arc(W/2,h+72,230+i*18,Math.PI*1.08,Math.PI*1.92);X.stroke()}}else if(b==1){for(let i=0;i<7;i++){let x=45+i*145,w=50+(i&1)*10,top=150+(i%3)*25;X.fillRect(x,top,w,h-top+28);X.beginPath();X.moveTo(x,top);X.lineTo(x+w*.35,top-28-(i&1)*18);X.lineTo(x+w,top);X.fill()}X.globalAlpha=.24;X.strokeStyle='#b08a53';X.lineWidth=11;X.beginPath();X.arc(W/2,h+55,320,Math.PI*1.08,Math.PI*1.92);X.stroke()}else if(b==2){X.strokeStyle='#3e4a4b';X.lineWidth=7;for(let x=70;x<W;x+=135){X.beginPath();X.moveTo(x,H);X.lineTo(x+45,115);X.moveTo(x+45,115);X.lineTo(x+110,H);X.stroke()}X.lineWidth=3;for(let y=180;y<h;y+=75){X.beginPath();X.moveTo(35,y);X.lineTo(W-35,y+20);X.stroke()}X.globalAlpha=.17;X.strokeStyle='#9aa58c';for(let i=0;i<4;i++)X.strokeRect(130+i*205,160+(i&1)*65,120,230)}else{for(let i=0;i<8;i++){let x=i<4?i*105:W-(i-3)*105,sg=i<4?1:-1;X.beginPath();X.moveTo(x,H);X.lineTo(x+sg*(40+(i%3)*28),h-130-(i%4)*45);X.lineTo(x+sg*(70+(i%2)*35),H);X.fill()}X.globalAlpha=.25;X.strokeStyle='#6d5479';X.lineWidth=8;for(let i=0;i<4;i++){X.beginPath();X.moveTo(i&1?0:W,100+i*85);X.quadraticCurveTo(W/2,40+i*80,W/2+(i-2)*35,h-10);X.stroke()}}if(l>.3){let z=(l-.3)/.7;X.globalAlpha=.12+z*.32;X.strokeStyle=RC[(wave+1)%6];X.lineWidth=2+z*3;X.beginPath();X.moveTo(0,h);for(let i=0;i<9;i++)X.lineTo(i*120,h-12-Math.sin(i*1.8+wave)*18*z);X.stroke();if(b==0){for(let i=0;i<3;i++){X.beginPath();X.arc(W/2,h+72,230+i*18,Math.PI*1.1,Math.PI*(1.1+.8*z));X.stroke()}}if(b==2){for(let i=0;i<4;i++){let x=190+i*185;X.beginPath();X.moveTo(x,h);X.lineTo(x+35,160);X.stroke()}}}X.restore()}
'''
between('src/03-render.js','function chapter(','function bossArt(',world)

boss=r'''function bossArt(l){if(!queen)return;X.save();let z=.12+l*.16;X.globalAlpha=z;if(queen==3){X.strokeStyle='#d45b54';X.lineWidth=4;for(let i=0;i<4;i++){X.beginPath();X.arc(W/2,325,105+i*58,.2+i*.12,T-.35);X.stroke()}X.strokeStyle='#879087';for(let i=0;i<8;i++){let a=i*T/8;X.beginPath();X.moveTo(W/2+Math.cos(a)*80,325+Math.sin(a)*60);X.lineTo(W/2+Math.cos(a+.12)*430,325+Math.sin(a+.12)*280);X.stroke()}X.strokeStyle='#755383';for(let i=0;i<5;i++){X.beginPath();X.moveTo(i&1?0:W,150+i*70);X.quadraticCurveTo(W/2,80+i*55,W/2+(i-2)*28,325);X.stroke()}}else if(wave==5){X.fillStyle='#2b1710';for(let i=0;i<5;i++){let x=120+i*180;X.fillRect(x,118,45,H-118);X.beginPath();X.moveTo(x,118);X.lineTo(x+22,78-(i&1)*18);X.lineTo(x+45,118);X.fill()}X.strokeStyle='#c49a4b';X.lineWidth=10;X.beginPath();X.arc(W/2,340,285,Math.PI*1.08,Math.PI*1.92);X.stroke();X.lineWidth=4;X.beginPath();X.moveTo(390,190);X.lineTo(425,126);X.lineTo(468,174);X.lineTo(510,105);X.lineTo(552,174);X.lineTo(588,126);X.stroke()}else if(wave==9){X.strokeStyle='#81908b';X.lineWidth=2;let cx=W/2,cy=315;for(let i=0;i<10;i++){let a=i*T/10;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.cos(a)*390,cy+Math.sin(a)*265);X.stroke()}for(let r=70;r<300;r+=55){X.beginPath();X.arc(cx,cy,r,0,T);X.stroke()}X.globalAlpha=z*.65;for(let i=0;i<4;i++)X.strokeRect(90+i*220,150+(i&1)*80,130,190)}else if(wave==13){X.strokeStyle='#79536f';X.lineWidth=9;for(let i=0;i<8;i++){let a=i*T/8,x=i&1?0:W,y=115+i*55;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(W/2+Math.cos(a+t*.15)*180,120+Math.sin(a)*90,W/2,285);X.stroke()}X.globalAlpha=.3+l*.18;X.fillStyle='#020204';X.beginPath();X.arc(W/2,285,86+Math.sin(t)*7,0,T);X.fill();X.strokeStyle='#9d7598';X.lineWidth=3;X.beginPath();X.arc(W/2,285,106,0,T);X.stroke()}X.restore()}
'''
between('src/03-render.js','function bossArt(','function chroma(',boss)

# Boss silhouettes get bespoke details instead of being the same cob with one prop.
p=Path('src/03-render.js'); s=p.read_text()
seam="if(e.type==1&&e.state==1){"
extra=r'''if(boss&&wave==5){X.globalAlpha=.45;X.strokeStyle='#e6b957';X.lineWidth=3;X.beginPath();X.arc(0,0,r*1.18,Math.PI*.65,Math.PI*1.35);X.stroke();X.globalAlpha=1;X.fillStyle='#4a2316';X.fillRect(-r*.3,-r*.82,r*.6,r*.18)}if(e.type==6){X.strokeStyle='#e1d5a1';X.lineWidth=2;for(let i=-1;i<2;i++){X.beginPath();X.moveTo(-r*.7,i*r*.24);X.lineTo(r*.65,i*r*.24);X.stroke()}X.strokeRect(-r*.45,-r*.36,r*.9,r*.72)}if(boss&&wave==MAX&&!e.a){X.fillStyle='#120917';X.beginPath();X.arc(-r*.2,0,r*.23,0,T);X.fill();X.strokeStyle='#b887b5';X.lineWidth=2;X.beginPath();X.arc(-r*.2,0,r*.34,0,T);X.stroke()}'''
if seam not in s: raise SystemExit('boss sprite seam missing')
s=s.replace(seam,extra+seam,1); p.write_text(s)

# Replace the old random stars/cloud/rainbow wallpaper with authored environmental composition.
p=Path('src/03-render.js'); s=p.read_text(); a="X.fillStyle=SC[wave-1];"; b="R.forEach(block);"; i=s.find(a); j=s.find(b,i)
if i<0 or j<0: raise SystemExit('scene background seam missing')
new=r'''let gr=X.createLinearGradient(0,72,0,H);gr.addColorStop(0,SC[wave-1]);gr.addColorStop(.58,SC[(wave+3)%13]);gr.addColorStop(1,'#020304');X.fillStyle=gr;X.fillRect(-20,-20,W+40,H+40);worldArt(lit);bossArt(lit);X.globalAlpha=1;X.strokeStyle='#31343b';X.lineWidth=2;X.strokeRect(12,82,W-24,H-94);'''
s=s[:i]+new+s[j:]
# Trial 1 no longer needs post-start tooltip halos.
s=s.replace("if(wave==1&&tip<5){let q=tip<2?A:P;X.globalAlpha=.35+.2*Math.sin(t*8);X.strokeStyle=tip<2?'#ff6f9f':'#8dffe3';X.lineWidth=2;X.beginPath();X.arc(q.x,q.y,31,0,T);X.stroke();X.globalAlpha=1;txt(tip<2?'REVIVED HEART':'SAFE HORN',q.x,q.y+43,10,'#fff','center')}",'')
p.write_text(s)

# Replace title/mascot with a mandatory cinematic tutorial and cleaner opening composition.
ui=Path('src/04-ui-input.js'); s=ui.read_text()
a=s.find('function splash()'); b=s.find('function page(',a)
if a<0 or b<0: raise SystemExit('UI title range missing')
intro=r'''function splash(){let g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#080b11');g.addColorStop(.65,'#11140f');g.addColorStop(1,'#030403');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#050606';X.beginPath();X.moveTo(0,H);for(let i=0;i<9;i++)X.lineTo(i*120,H-105-Math.sin(i*1.7)*32);X.lineTo(W,H);X.fill();X.strokeStyle='#1f2b23';X.lineWidth=5;for(let i=0;i<11;i++){let x=25+i*95;X.beginPath();X.moveTo(x,H);X.quadraticCurveTo(x-10,H-100,x+5,H-175-(i%3)*20);X.stroke()}X.globalAlpha=.18;X.strokeStyle='#77746b';X.lineWidth=10;for(let i=0;i<3;i++){X.beginPath();X.arc(W/2,H+115,275+i*20,Math.PI*1.08,Math.PI*1.92);X.stroke()}X.globalAlpha=1}
function demo(x,y,a,d,c=0){let q=[A.x,A.y,P.x,P.y,charge,aim,wave,hearts,runT];A.x=x;A.y=y;P.x=x+Math.cos(a)*d;P.y=y+Math.sin(a)*d;charge=c;aim=a;wave=2;hearts=13;runT=2;uni();[A.x,A.y,P.x,P.y,charge,aim,wave,hearts,runT]=q}
function intro(){splash();let q=stageT,p,st;X.fillStyle='#0b0d10cc';X.fillRect(0,0,W,78);txt('THE LIVING SCAR',42,47,24,'#eee9e0');X.fillStyle='#171a20';X.fillRect(W-170,22,135,36);txt('SPACE  SKIP',W-102,46,12,'#c6cbd2','center');if(q<2.5){X.globalAlpha=.7;X.fillStyle='#bbb7be';X.beginPath();X.ellipse(305,365,30,25,0,0,T);X.fill();X.beginPath();X.ellipse(655,335,35,22,-.1,0,T);X.fill();X.fillStyle='#766f58';X.beginPath();X.moveTo(678,331);X.lineTo(717,335);X.lineTo(678,339);X.fill();X.globalAlpha=1;txt('THE WORLD FORGOT COLOR.',W/2,165,29,'#ece8df','center');txt('A UNICORN LAY IN TWO PIECES.',W/2,202,15,'#858b91','center')}else if(q<4.8){p=cl((q-2.5)/1.4,0,1);X.globalAlpha=.25+.75*p;for(let i=0;i<6;i++){X.strokeStyle=RC[i];X.lineWidth=5;X.beginPath();X.moveTo(W/2,-20);X.quadraticCurveTo(560,175,305+(350*p),365-30*p);X.stroke()}X.globalAlpha=1;demo(390,355,0,190,0);txt('THE LAST RAINBOW FOUND THE WOUND.',W/2,165,25,'#fff','center');txt('IT COULD NOT REBUILD THE BODY.  SO IT BECAME THE BODY.',W/2,202,13,'#aab0b5','center')}else{let u=q-4.8;if(u<2.5){st='WASD  •  MOVE THE HEART';p=(Math.sin(u*2.4)+1)/2;demo(385+p*85,355,0,125,.12);txt('♥',385+p*85,435,18,'#ff6f9f','center');txt('THE HEART IS THE VULNERABLE HALF.',W/2,190,14,'#aab0b5','center')}else if(u<5){st='ARROWS  •  AIM THE HORN';p=(u-2.5)*1.8;demo(430,355,p,128,.1);txt('THE HORN LEADS.  IT CANNOT BE HURT.',W/2,190,14,'#aab0b5','center')}else if(u<7.5){st='PULL AWAY  •  CHARGE THE SCAR';p=(Math.sin((u-5)*2)+1)/2;demo(470-p*75,355,0,120+p*80,.25+p*.6);txt('DISTANCE BECOMES TENSION.',W/2,190,14,'#aab0b5','center')}else{st='SPACE  •  RAINBOW SNAP';p=((u-7.5)%1.5)/1.5;demo(350+p*155,355,0,190-p*85,1-p*.7);txt('SNAP THROUGH CORN.  GRAZE OR PARRY TO CHARGE FASTER.',W/2,190,13,'#aab0b5','center')}txt(st,W/2,145,26,'#fff','center');txt('THE RAINBOW IS YOUR SPRING, YOUR WEAPON, AND YOUR SECOND LIFE.',W/2,520,13,'#c4b8cf','center');if(u>10){mode=0;stageT=0}}}
function mascot(){demo(360,330,-.08,220,.55);X.globalAlpha=.35;X.strokeStyle='#b7a16d';X.lineWidth=7;X.beginPath();X.arc(700,330,95,Math.PI*.7,Math.PI*1.3);X.stroke();X.globalAlpha=1}
function title(){splash();txt('STRETCHICORN',W/2,94,48,'#fff8ff','center');txt('A LIVING SCAR IN A DEAD WORLD',W/2,132,14,'#b8abbc','center');mascot();txt('CHOOSE THE PRESSURE',W/2,420,12,'#8f969c','center');let n=['1  EASY','2  NORMAL','3  HARD','4  IMPOSSIBLE'];n.forEach((v,i)=>{let x=156+i*170;X.fillStyle='#14181c';X.fillRect(x,442,148,42);X.strokeStyle=i==1?'#d8d2c7':'#353a40';X.strokeRect(x,442,148,42);txt(v,x+74,468,13,i==1?'#fff':'#aeb4b8','center')});txt('[ SPACE ]  PLAY NORMAL',W/2,525,18,'#fff','center');txt('[ T ] REPLAY STORY   [ C ] CONTROLS   [ R ] RULES   [ S ] SETTINGS',W/2,565,12,'#8f969c','center');txt('Best '+best,W/2,602,10,'#62676d','center')}
'''
s=s[:a]+intro+s[b:]
# Draw intro as its own full-screen mode.
s=s.replace("function draw(){if(mode==0){X.setTransform(1,0,0,1,0,0);return title()}","function draw(){if(mode==9){X.setTransform(1,0,0,1,0,0);return intro()}if(mode==0){X.setTransform(1,0,0,1,0,0);return title()}")
# Mandatory cinematic input gate and replay key.
s=s.replace("onkeydown=e=>{if(e.repeat)return;wake();let k=e.key.length==1?e.key.toLowerCase():e.key,enter=e.key=='Enter';", "onkeydown=e=>{if(e.repeat)return;wake();let k=e.key.length==1?e.key.toLowerCase():e.key,enter=e.key=='Enter';if(mode==9){if(e.key==' '||enter||k=='Escape'){mode=0;stageT=0}return}")
s=s.replace("else if(k=='c')mode=6;else if(k=='r')mode=7;", "else if(k=='t'){mode=9;stageT=0}else if(k=='c')mode=6;else if(k=='r')mode=7;")
# Canvas skip button is also clickable.
s=s.replace("onkeyup=e=>K[e.key.length==1?e.key.toLowerCase():e.key]=0;", "C.onclick=e=>{if(mode==9){let r=C.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(x>760&&y<75){mode=0;stageT=0}}};onkeyup=e=>K[e.key.length==1?e.key.toLowerCase():e.key]=0;")
# First view is always the story/tutorial; Space can skip immediately.
s=s.replace("requestAnimationFrame(loop);", "mode=9;stageT=0;requestAnimationFrame(loop);",1)
ui.write_text(s)

# Release docs get a concise v0.23 design note.
Path('docs/storybook-reframe-v0.23.md').write_text('''# v0.23 — Storybook Reframe\n\nThe v0.22 playtest showed that decorative procedural motifs were not enough. v0.23 removes generic stars, random spectral flecks, cloud blobs, and one-glyph-per-stage wallpaper in favor of authored procedural composition.\n\n## Visual rule\n\nEvery background mark must describe a place, a threat, restoration, or a control concept. If it is merely atmospheric confetti, remove it.\n\n## Four environmental acts\n\n1. **Mourning Field** — dead stalks and the broken arc of the old rainbow architecture.\n2. **Sunken Court** — monumental ruined columns and arches, culminating in the Maize Monarch's false throne.\n3. **Husk Foundry** — braced construction frames and imposed geometry controlled by the Husk Architect.\n4. **Black Prism** — crystalline ribs and organic roots collapsing toward Cobtopus.\n\nRestoration does not spawn stars. It repairs alignment, reveals structural color-veins, and completes pieces of the ancient geometry.\n\n## Mandatory opening\n\nEvery fresh page load begins with a short cinematic tutorial before difficulty selection. It establishes the severed unicorn, the rainbow resurrection, and then visually demonstrates WASD movement, arrow-key aiming, pull-to-charge, and Space-to-Snap. Space/Enter or the visible Canvas Skip button bypasses it. The title screen can replay it with T.\n\n## Boss language\n\n- **Maize Monarch:** monumental ruined court, ritual arch, heavy crown/halo, false authority.\n- **Husk Architect:** radial measurement geometry, ghost wall plans, plated construct silhouette.\n- **Cobtopus:** root-like tendrils, black central void, organic convergence.\n- **Impossible Encore:** all three visual systems collide instead of adding a fourth unrelated motif.\n''')

print('v0.23 storybook reframe applied')
