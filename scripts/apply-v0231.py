from pathlib import Path
import re, json


def must(old, new, s, label):
    if old not in s:
        raise SystemExit('missing ' + label)
    return s.replace(old, new, 1)


p = Path('package.json')
j = json.loads(p.read_text())
j['version'] = '0.23.1'
p.write_text(json.dumps(j, indent=2) + '\n')

p = Path('index.html')
s = p.read_text().replace('v0.23.0 — STORYBOOK REFRAME', 'v0.23.1 — FIRST FLIGHT')
p.write_text(s)

p = Path('src/00-core.js')
s = p.read_text()
s = must(
    "stageT=1.25;say('LEVEL '+wave+' • '+SN[wave-1],2.2);",
    "stageT=1.25;say('LEVEL '+wave+' • '+SN[wave-1],2.2);if(D<1&&wave<4)say(['','HEART HURTS • HORN + RAINBOW SAFE','PULL BACK • SNAP THROUGH CORN','GRAZE OR PARRY • RECHARGE FASTER'][wave],2.6);",
    s,
    'easy coaching',
)
p.write_text(s)

p = Path('src/01-combat.js')
s = p.read_text()
s = must(
    "if(s){snap=",
    "if(s){if(mode==10&&tip>2){tip++;if(tip>5)stageT=.7}snap=",
    s,
    'training snap count',
)
p.write_text(s)

p = Path('src/02-update.js')
s = p.read_text()
s = must(
    "if(mode!=1)return;music(dt);runT+=dt;stageT=Math.max(0,stageT-dt);",
    "if(mode!=1&&mode!=10)return;music(dt);runT+=dt;stageT=Math.max(0,stageT-dt);if(mode==10&&tip>5&&!stageT){D=.7;reset();say('FIRST FLIGHT COMPLETE • EASY',2.3);return}",
    s,
    'practice simulation',
)
s = must(
    "}}\n if(hitW(A.x,A.y,24))safeSpawn();",
    "}}\n if(mode==10){if(!tip&&Math.hypot(A.x-390,A.y-370)>55)tip=1;if(tip==1&&(ax||ay))tip=2;if(tip==2&&charge>.46)tip=3}\n if(hitW(A.x,A.y,24))safeSpawn();",
    s,
    'practice gates',
)
p.write_text(s)

p = Path('src/04-ui-input.js')
s = p.read_text()
new_intro = r"""function practice(){D=.7;reset();E.length=B.length=U.length=R.length=0;mode=10;tip=0;puT=1e9;A.x=390;A.y=370;A.vx=A.vy=0;aim=0;hlen=54;P.x=444;P.y=370;charge=ready=0;runT=stageT=msgT=0}
function intro(){splash();let q=stageT,p;X.fillStyle='#0b0d10cc';X.fillRect(0,0,W,78);txt('THE LIVING SCAR',42,47,24,'#eee9e0');X.fillStyle='#171a20';X.fillRect(W-170,22,135,36);txt('SKIP STORY',W-102,46,12,'#c6cbd2','center');if(q<2.5){X.globalAlpha=.7;X.fillStyle='#bbb7be';X.beginPath();X.ellipse(305,365,30,25,0,0,T);X.fill();X.beginPath();X.ellipse(655,335,35,22,-.1,0,T);X.fill();X.fillStyle='#766f58';X.beginPath();X.moveTo(678,331);X.lineTo(717,335);X.lineTo(678,339);X.fill();X.globalAlpha=1;txt('THE WORLD FORGOT COLOR.',W/2,165,29,'#ece8df','center');txt('A UNICORN LAY IN TWO PIECES.',W/2,202,15,'#858b91','center')}else if(q<4.8){p=cl((q-2.5)/1.4,0,1);X.globalAlpha=.25+.75*p;for(let i=0;i<6;i++){X.strokeStyle=RC[i];X.lineWidth=5;X.beginPath();X.moveTo(W/2,-20);X.quadraticCurveTo(560,175,305+350*p,365-30*p);X.stroke()}X.globalAlpha=1;demo(390,355,0,190,0);txt('THE LAST RAINBOW FOUND THE WOUND.',W/2,165,25,'#fff','center');txt('IT COULD NOT REBUILD THE BODY.  SO IT BECAME THE BODY.',W/2,202,13,'#aab0b5','center')}else practice()}
function train(){scene();X.setTransform(1,0,0,1,0,0);X.fillStyle='#071014dd';X.fillRect(105,92,750,126);txt('FIRST FLIGHT • LEARN THE LIVING SCAR',W/2,123,14,'#b8c7c4','center');let a=tip<1?['MOVE THE HEART','WASD • THE HEART IS THE VULNERABLE HALF.']:tip<2?['POINT THE HORN','ARROWS • THE HORN IS SAFE. AIM WHERE YOU WANT TO GO.']:tip<3?['MAKE TENSION','MOVE THE HEART AWAY FROM THE HORN UNTIL THE RAINBOW GLOWS.']:tip<6?['RAINBOW SNAPS  '+(tip-3)+' / 3','SPACE • STORED TENSION BECOMES A DASH + ATTACK.']:['YOU FEEL IT.','THE SCAR IS MOVEMENT, WEAPON, AND SECOND LIFE.'];txt(a[0],W/2,164,25,'#fff','center');txt(a[1],W/2,194,13,'#c7ced3','center');if(tip>2&&tip<6){let x=P.x+Math.cos(aim)*105,y=P.y+Math.sin(aim)*105;X.globalAlpha=.7;for(let i=0;i<6;i++){X.strokeStyle=RC[i];X.lineWidth=3;X.beginPath();X.arc(x,y,22+i*4,0,T);X.stroke()}X.globalAlpha=1}X.fillStyle='#10161acc';X.fillRect(190,565,580,48);txt('BODY PULLS  •  HORN POINTS  •  RAINBOW SNAPS',W/2,590,13,'#d9e0dc','center');txt('ESC / TOP-RIGHT TO SKIP PRACTICE',W/2,608,9,'#747e80','center');X.fillStyle='#171a20';X.fillRect(W-170,22,135,36);txt('SKIP PRACTICE',W-102,46,11,'#c6cbd2','center')}
function mascot()"""
s, n = re.subn(r"function intro\(\)\{.*?\}\nfunction mascot\(\)", new_intro, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit('intro replacement failed')
s, n = re.subn(
    r"function title\(\)\{.*?\}\nfunction page\(a\)",
    "function title(){splash();txt('STRETCHICORN',W/2,94,48,'#fff8ff','center');txt('A LIVING SCAR IN A DEAD WORLD',W/2,132,14,'#b8abbc','center');mascot();txt('START EASY • MASTER UP WHEN READY',W/2,420,12,'#8f969c','center');let n=['1  EASY','2  NORMAL','3  HARD','4  IMPOSSIBLE'];n.forEach((v,i)=>{let x=156+i*170;X.fillStyle='#14181c';X.fillRect(x,442,148,42);X.strokeStyle=i==0?'#d8d2c7':'#353a40';X.strokeRect(x,442,148,42);txt(v,x+74,468,13,i==0?'#fff':'#aeb4b8','center')});txt('[ SPACE ]  PLAY EASY',W/2,525,18,'#fff','center');txt('[ T ] REPLAY FIRST FLIGHT   [ C ] CONTROLS   [ R ] RULES   [ S ] SETTINGS',W/2,565,12,'#8f969c','center');txt('Best '+best,W/2,602,10,'#62676d','center')}\nfunction page(a)",
    s,
    count=1,
    flags=re.S,
)
if n != 1:
    raise SystemExit('title replacement failed')
s = must(
    "function draw(){if(mode==9){X.setTransform(1,0,0,1,0,0);return intro()}if(mode==0)",
    "function draw(){if(mode==9){X.setTransform(1,0,0,1,0,0);return intro()}if(mode==10)return train();if(mode==0)",
    s,
    'training draw',
)
s = must(
    "if(mode==4)panel('SKY RESTORED!','[ SPACE ] PLAY AGAIN\\nFINAL SCORE '+score+'   Best '+best)",
    "if(mode==4)panel('SKY RESTORED!',D<1?'YOU KNOW THE SCAR • [2] NORMAL NEXT\\nSPACE EASY AGAIN • M MENU':D==1?'FLOW MASTERED • [3] HARD NEXT\\nSPACE NORMAL AGAIN • M MENU':D<2?'HARD CLEARED • [4] IMPOSSIBLE NEXT\\nSPACE HARD AGAIN • M MENU':'IMPOSSIBLE CLEARED\\nSPACE AGAIN • M MENU')",
    s,
    'progression panel',
)
s = must(
    "if(mode==9){if(e.key==' '||enter||k=='Escape'){mode=0;stageT=0}return}",
    "if(mode==9){if(e.key==' '||enter||k=='Escape')practice();return}if(mode==10&&k=='Escape'){D=.7;reset();return}",
    s,
    'story to practice input',
)
s = must("if(mode==1&&k==BK[8])fire=1;", "if((mode==1||mode==10)&&k==BK[8])fire=1;", s, 'practice snap input')
s = must("else if(e.key==' '||enter)D=1,reset();", "else if(e.key==' '||enter)D=.7,reset();", s, 'easy title default')
s = must(
    "else if((mode==3||mode==4)&&(e.key==' '||enter))reset()",
    "else if(mode==4&&k>0&&k<5)D=k<3?.4+k*.3:k*.8-.8,reset();else if((mode==3||mode==4)&&(e.key==' '||enter))reset()",
    s,
    'post-win ladder',
)
s = must(
    "C.onclick=e=>{if(mode==9){let r=C.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(x>760&&y<75){mode=0;stageT=0}}};",
    "C.onclick=e=>{if(mode==9||mode==10){let r=C.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(x>760&&y<75)mode==9?practice():(D=.7,reset())}};",
    s,
    'canvas skip',
)
p.write_text(s)

p = Path('scripts/test.mjs')
s = p.read_text().replace("||!h.includes('SPACE  SKIP')", "||!h.includes('SKIP STORY')||!h.includes('FIRST FLIGHT')")
s = must(
    "R('mode=0;D=2.4');key(' ');if(R('D')!==1||R('E.length')!==5||!wakes)throw Error('Normal shortcut');",
    "R('mode=9');key(' ');if(R('mode')!==10||R('D')!==.7||R('E.length'))throw Error('First Flight entry');key('Escape');if(R('mode')!==1||R('D')!==.7||R('E.length')!==3)throw Error('First Flight skip to Easy');R('mode=0;D=2.4');key(' ');if(R('D')!==.7||R('E.length')!==3||!wakes)throw Error('Easy shortcut');",
    s,
    'source onboarding test',
)
p.write_text(s)

p = Path('scripts/release-smoke.mjs')
s = p.read_text()
s = must(
    "if(!h.includes('THE LIVING SCAR')||!h.includes('SPACE  SKIP')||!h.includes('1  EASY')",
    "if(!h.includes('THE LIVING SCAR')||!h.includes('FIRST FLIGHT')||!h.includes('SKIP PRACTICE')||!h.includes('1  EASY')",
    s,
    'release identity',
)
s = must(
    "R('mode=0;D=2.4');s.onkeydown({key:' ',repeat:false,preventDefault(){}});s.onkeyup({key:' '});if(R('D')!==1||R('E.length')!==5||!wakes)throw Error('Normal shortcut/audio');",
    "R('mode=9');s.onkeydown({key:' ',repeat:false,preventDefault(){}});if(R('mode')!==10||R('D')!==.7||R('E.length'))throw Error('First Flight entry');s.onkeydown({key:'Escape',repeat:false,preventDefault(){}});if(R('mode')!==1||R('D')!==.7||R('E.length')!==3)throw Error('First Flight Easy handoff');R('mode=0;D=2.4');s.onkeydown({key:' ',repeat:false,preventDefault(){}});s.onkeyup({key:' '});if(R('D')!==.7||R('E.length')!==3||!wakes)throw Error('Easy shortcut/audio');",
    s,
    'release onboarding test',
)
p.write_text(s)

p = Path('scripts/browser-smoke.mjs')
s = p.read_text()
old = """  const introFrame = await canvas.evaluate(node => node.toDataURL());
  await page.keyboard.press('Space');
  await page.waitForTimeout(100);
  const menuFrame = await canvas.evaluate(node => node.toDataURL());
  if (introFrame === menuFrame) throw new Error('mandatory story did not visibly transition to the menu');
  await page.keyboard.press('2');
  await page.waitForTimeout(180);
  const playFrame = await canvas.evaluate(node => node.toDataURL());
  if (menuFrame === playFrame) throw new Error('difficulty input did not visibly transition from menu to gameplay');
"""
new = """  const introFrame = await canvas.evaluate(node => node.toDataURL());
  await page.keyboard.press('Space');
  await page.waitForTimeout(120);
  const practiceFrame = await canvas.evaluate(node => node.toDataURL());
  if (introFrame === practiceFrame) throw new Error('story did not visibly hand off to First Flight practice');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(180);
  const playFrame = await canvas.evaluate(node => node.toDataURL());
  if (practiceFrame === playFrame) throw new Error('First Flight did not hand off to Easy gameplay');
  await page.keyboard.press('m');
  await page.waitForTimeout(80);
  const menuFrame = await canvas.evaluate(node => node.toDataURL());
  await page.keyboard.press('2');
  await page.waitForTimeout(180);
  const normalFrame = await canvas.evaluate(node => node.toDataURL());
  if (menuFrame === normalFrame) throw new Error('manual Normal selection did not start gameplay');
"""
s = must(old, new, s, 'browser onboarding flow')
p.write_text(s)

p = Path('scripts/file-smoke.mjs')
s = p.read_text()
s = must(
    "const intro=await canvas.evaluate(n=>n.toDataURL());await page.keyboard.press('Space');await page.waitForTimeout(100);const menu=await canvas.evaluate(n=>n.toDataURL());if(intro===menu)throw Error('local story did not visibly reach menu');await page.keyboard.press('2');await page.waitForTimeout(180);const play=await canvas.evaluate(n=>n.toDataURL());\n if(menu===play)throw Error('local file did not visibly transition from menu to gameplay');",
    "const intro=await canvas.evaluate(n=>n.toDataURL());await page.keyboard.press('Space');await page.waitForTimeout(120);const practice=await canvas.evaluate(n=>n.toDataURL());if(intro===practice)throw Error('local story did not reach First Flight');await page.keyboard.press('Escape');await page.waitForTimeout(180);const play=await canvas.evaluate(n=>n.toDataURL());\n if(practice===play)throw Error('local First Flight did not reach Easy gameplay');",
    s,
    'local onboarding flow',
)
s = s.replace('rendered the mandatory story and title, started gameplay', 'rendered story + First Flight practice, started Easy gameplay')
p.write_text(s)

p = Path('PLAY_LOCAL.md')
s = p.read_text().replace('v0.23 test', 'v0.23.1 First Flight test')
s = s.replace(
    'The file begins with the mandatory **Living Scar** origin/tutorial. Watch it through to see the complete intended first-run experience, or use the visible Skip control / Space / Enter / Escape to reach the difficulty menu immediately. Press **T** on the title screen to replay it.',
    'The file begins with **The Living Scar** origin, then enters **First Flight**, a safe practice field using the real production movement physics. New players move the vulnerable heart, aim the safe horn, learn to create rainbow tension, and complete three charged Rainbow Snaps before Easy begins automatically. The story and practice each retain a visible skip escape hatch for returning experts. Press **T** from the menu to replay the onboarding.',
)
p.write_text(s)

p = Path('README.md')
s = p.read_text().replace(
    '**v0.23.0 · STORYBOOK REFRAME · 12,985 / 13,312 bytes · 327 bytes free**',
    '**v0.23.1 · FIRST FLIGHT · story → practice → Easy → mastery ladder**',
)
anchor = '# v0.23 - STORYBOOK REFRAME\n'
insert = '''# v0.23.1 - FIRST FLIGHT

The first-time experience no longer asks a new player to choose difficulty before they understand the game. Every fresh load follows one authored path:

**Living Scar origin → safe First Flight practice → three successful Rainbow Snaps → Easy campaign.**

First Flight uses the real movement/spring/Snap implementation with enemies, walls, pickups, and damage removed. It teaches one concept at a time: move the vulnerable heart, point the safe horn, pull in the opposite direction until the living scar glows, then release that stored tension with Space. The player must complete three charged Snaps before the campaign starts.

Easy then continues teaching through concise contextual strategy prompts: keep the heart behind the horn, use the safe rainbow/horn aggressively, pull back to create charge, and begin learning Graze/Parry as faster recharge tools.

The title screen now defaults to **Easy**, while Normal, Hard, and Impossible remain available for returning/expert players. Clearing each tier explicitly points toward the next pressure level so difficulty feels like a mastery ladder rather than four arbitrary buttons.

---

'''
if '# v0.23.1 - FIRST FLIGHT' not in s:
    s = s.replace(anchor, insert + anchor, 1)
p.write_text(s)

p = Path('CHANGELOG.md')
s = p.read_text()
entry = '''## v0.23.1 - FIRST FLIGHT

- Rebuilt first-time onboarding around an actual safe practice field using production Stretchicorn physics rather than passive control demonstrations.
- New players now follow Living Scar story → First Flight practice → automatic Easy campaign. The difficulty menu is no longer the first gameplay decision.
- First Flight requires moving the vulnerable heart, aiming the safe horn, pulling opposite the horn until the rainbow is charged, and completing three real charged Rainbow Snaps before normal combat begins.
- Added a rainbow Snap target/guide and concise visual coaching around the core mental model: body pulls, horn points, rainbow snaps.
- Added explicit story/practice skip escape hatches for returning experts while keeping onboarding the default path.
- Changed Space / Enter on the title screen from Normal to Easy and visually recommends progressing upward only after the player has learned the mechanic.
- Added post-clear mastery guidance from Easy → Normal → Hard → Impossible, while retaining direct numeric difficulty access for experienced players.
- Added Easy-only early-stage strategy coaching for safe-half positioning, tension/Snap usage, and Graze/Parry recharge.
- Expanded source, packed-artifact, Chromium, Firefox, and standalone-file smoke coverage around story → First Flight → Easy handoff and the new Easy default.

'''
if '## v0.23.1 - FIRST FLIGHT' not in s:
    s = s.replace('# Changelog\n\n', '# Changelog\n\n' + entry, 1)
p.write_text(s)
