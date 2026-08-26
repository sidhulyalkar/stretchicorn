from pathlib import Path
import re
p=Path('src/04-ui-input.js');s=p.read_text()
# First Flight + Easy now teach these rules in context, so the old static rules page duplicates onboarding.
s,n=re.subn(r"\nfunction rules\(\)\{.*?\}\nfunction keyname",'\nfunction keyname',s,count=1,flags=re.S)
if n!=1: raise SystemExit('rules screen seam missing')
s=s.replace("   [ R ] RULES","")
s=s.replace("else if(k=='r')mode=7;","")
s=s.replace("if(mode==7)return rules();","")
s,n=re.subn(r"if\(mode==7\)\{.*?return\}","",s,count=1,flags=re.S)
if n!=1: raise SystemExit('rules input seam missing')
# Mastery grades and the difficulty ladder supersede the old persistent numeric best-score chrome.
s=re.sub(r";txt\('Best '\+best,W/2,602,10,'#62676d','center'\)","",s)
s=s.replace("'SPACE RETRY   •   M MENU\\nScore '+score+'   Best '+best","'SPACE RETRY   •   M MENU\\nScore '+score")
p.write_text(s)

p=Path('src/00-core.js');s=p.read_text()
s=s.replace(',best=0,hearts=13',',hearts=13')
s=s.replace(";best=+localStorage.SR20||0","")
s=s.replace("localStorage.SR20=best;","")
p.write_text(s)

p=Path('src/01-combat.js');s=p.read_text()
s=s.replace("best=Math.max(best,score);save();mode=3","save();mode=3")
s=s.replace("best=Math.max(best,score);save();mode=5","save();mode=5")
p.write_text(s)

p=Path('src/03-render.js');s=p.read_text()
# Preserve primary form, lighting, boss identity and depth. Remove only details that disappear at game speed.
s=s.replace("X.globalAlpha=.3;X.fillStyle='#fff';X.fillRect(x+1,y+1,q-2,2);X.globalAlpha=1","")
s=s.replace("ink('#bfa143',1.5);for(let i=0;i<3;i++){X.beginPath();X.moveTo(23+i*5,-3);X.lineTo(25+i*5,3);X.stroke()}","")
s=s.replace("ink('#fff4a5',1);for(let i=12;i<o.w;i+=24){X.beginPath();X.moveTo(o.x+i,o.y);X.lineTo(o.x+i-16,o.y+o.h);X.stroke()}","")
s=s.replace("X.globalAlpha=.2;for(let i=0;i<4;i++){X.strokeRect(115+i*220,150+(i&1)*70,135,235);X.strokeRect(128+i*220,163+(i&1)*70,109,209)}","")
s=s.replace("X.globalAlpha=z*.45;for(let i=0;i<4;i++)X.strokeRect(90+i*220,150+(i&1)*80,130,190)","")
p.write_text(s)
