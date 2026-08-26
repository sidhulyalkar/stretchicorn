from pathlib import Path
p=Path('src/03-render.js');s=p.read_text()
a=s.find('function bossArt(');b=s.find('\nfunction chroma(',a)
if a<0 or b<0: raise SystemExit('bossArt seam not found')
boss="""function bossArt(l){if(!queen)return;X.save();let z=.13+l*.16,c=W/2,y=H*.55;X.globalAlpha=z;if(queen==3){ink('#120b16',18);for(let i=0;i<3;i++){let q=125+i*145;X.beginPath();X.moveTo(i&1?0:W,q);X.quadraticCurveTo(c+(i-1)*90,q-75,c+(i-1)*35,H*.78);X.stroke()}}else if(wave==5){X.globalAlpha=z*.55;oval(c,y+25,180,150,'#2a160d');X.globalAlpha=z;ink('#694726',12);X.beginPath();X.moveTo(c,y+145);X.lineTo(c,y-90);X.moveTo(c-100,y-42);X.lineTo(c+105,y-42);X.stroke();X.fillStyle='#3b2416';X.fillRect(c-55,y-112,110,18)}else if(wave==13){ink('#27162e',18);for(let i=0;i<4;i++){let x=i<2?0:W,q=160+(i%2)*175;X.beginPath();X.moveTo(x,q);X.bezierCurveTo(c+(i-1.5)*170,80+i*28,c+(i-1.5)*70,y-115,c,y+25);X.stroke()}X.globalAlpha=z*.8;oval(c,y+20,100,76,'#07040a')}X.restore()}"""
s=s[:a]+boss+s[b:];p.write_text(s)
