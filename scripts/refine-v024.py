from pathlib import Path
p=Path('src/03-render.js')
s=p.read_text()

def must(a,b,label):
 global s
 if a not in s: raise SystemExit('missing '+label)
 s=s.replace(a,b,1)

# Bosses should command the frame without changing simulation/collision geometry.
must("X.save();X.translate(e.x,e.y);let j=e.hit?-.08:Math.sin(t*3+e.x)*.02,boss=e.type==3,a=", "X.save();X.translate(e.x,e.y+(e.type==3?8:0));let j=e.hit?-.08:Math.sin(t*3+e.x)*.02,boss=e.type==3,a=", 'boss visual offset')
must(",r=e.r,k=e.type==4?4:", ",r=e.r*(boss?1.14:1),k=e.type==4?4:", 'boss visual scale')
# Cobtopus sprite: fewer, heavier appendages read more organically than a fuzzy fan.
must("if(boss&&wave==MAX&&!e.a){ink('#8f62a3',5);for(let i=0;i<6;i++){", "if(boss&&wave==MAX&&!e.a){ink('#8f62a3',6);for(let i=0;i<4;i++){", 'cobtopus sprite tendrils')
# Foundry: retain the structural braces, remove wallpaper-like secondary linework.
must("for(let x=55;x<W;x+=135){", "for(let x=55;x<W;x+=190){", 'foundry spacing')
must("ink('#74817f',2);for(let y=170;y<h;y+=72){X.beginPath();X.moveTo(25,y);X.lineTo(W-25,y+20);X.stroke()}", "", 'foundry thin lines')
# Black Prism: fewer roots create negative space for projectiles and the player.
must("X.globalAlpha=.22;ink('#85648d',7);for(let i=0;i<5;i++){", "X.globalAlpha=.22;ink('#85648d',8);for(let i=0;i<3;i++){", 'prism background roots')
# Encore is a collision of three visual languages, not a stack of every possible line.
must("if(queen==3){ink('#d45b54',4);for(let i=0;i<4;i++){", "if(queen==3){ink('#d45b54',4);for(let i=0;i<3;i++){", 'encore rings')
must("ink('#879087',3);for(let i=0;i<8;i++){let a=i*T/8+t*.03;", "ink('#879087',3);for(let i=0;i<6;i++){let a=i*T/6+t*.03;", 'encore spokes')
must("ink('#755383',6);for(let i=0;i<5;i++){", "ink('#755383',7);for(let i=0;i<3;i++){", 'encore roots')
# Monarch: ceremonial rays should frame the ruler instead of forming a picket fence.
must("ink('#f0c86b',3);for(let i=0;i<7;i++){", "ink('#f0c86b',3);for(let i=0;i<5;i++){", 'monarch rays')
# Architect: a few precise circles/spokes communicate drafting better than dense geometry.
must("else if(wave==9){ink('#8ea09a',2);for(let r=70;r<300;r+=55){", "else if(wave==9){ink('#8ea09a',2);for(let r=90;r<280;r+=70){", 'architect rings')
must("for(let i=0;i<12;i++){let a=i*T/12-t*.04;", "for(let i=0;i<8;i++){let a=i*T/8-t*.04;", 'architect spokes')
# Cobtopus arena: six substantial organic paths are clearer than nine overlapping ones.
must("else if(wave==13){ink('#805783',9);for(let i=0;i<9;i++){let a=i*T/9,", "else if(wave==13){ink('#805783',10);for(let i=0;i<6;i++){let a=i*T/6,", 'cobtopus arena roots')
p.write_text(s)
