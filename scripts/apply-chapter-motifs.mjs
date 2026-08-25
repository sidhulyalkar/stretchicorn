import {readFileSync,writeFileSync} from 'node:fs';
const p='src/03-render.js',s=readFileSync(p,'utf8');
const fn=`function chapter(l){X.save();X.globalAlpha=.1+l*.16;X.strokeStyle=RC[wave%6];X.fillStyle=RC[(wave+2)%6];X.lineWidth=2;let y=175;for(let i=0;i<7;i++){let x=75+i*135,q=(i+wave)%3;if(wave==1){X.beginPath();for(let j=0;j<5;j++)X.arc(x+Math.cos(j*T/5)*8,y+Math.sin(j*T/5)*8,4,0,T);X.fill()}else if(wave==2){X.fillRect(x,y-35,4,70);for(let j=-1;j<2;j+=2){X.beginPath();X.moveTo(x,y+j*12);X.lineTo(x+j*18,y+j*3);X.stroke()}}else if(wave==3){X.beginPath();X.arc(x,y,13+q*5,Math.PI,0);X.arc(x+15,y-8,10,Math.PI,0);X.stroke()}else if(wave==4){X.strokeRect(x-18,y-35-q*8,36,70+q*16)}else if(wave==5){X.beginPath();X.moveTo(x-16,y+12);X.lineTo(x-13,y-12);X.lineTo(x-5,y);X.lineTo(x,y-18);X.lineTo(x+6,y);X.lineTo(x+15,y-12);X.lineTo(x+16,y+12);X.closePath();X.stroke()}else if(wave==6){for(let j=-1;j<2;j++)X.fillRect(x-28+j*8,y+18-j*22,48,3)}else if(wave==7){X.beginPath();X.ellipse(x,y,22,12,0,0,T);X.stroke();X.beginPath();X.ellipse(x,y,15,7,0,0,T);X.stroke()}else if(wave==8){X.beginPath();X.moveTo(x,y-24);X.lineTo(x+15,y);X.lineTo(x,y+24);X.lineTo(x-15,y);X.closePath();X.stroke()}else if(wave==9){X.strokeRect(x-22,y-22,44,44);X.beginPath();X.moveTo(x-22,y);X.lineTo(x+22,y);X.moveTo(x,y-22);X.lineTo(x,y+22);X.stroke()}else if(wave==10){X.beginPath();for(let j=0;j<8;j++){let a=j*T/8,r=j&1?6:20;X.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}X.closePath();X.stroke()}else if(wave==11){X.beginPath();X.moveTo(x-20,y+18);X.lineTo(x,y-24-q*5);X.lineTo(x+20,y+18);X.closePath();X.fill()}else if(wave==12){for(let j=0;j<2;j++){X.beginPath();X.arc(x+j*8,y+20,28+j*7,Math.PI,2*Math.PI);X.stroke()}}else{X.beginPath();for(let j=0;j<18;j++){let a=j*.7,r=2+j*1.7;X.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}X.stroke()}}X.restore()}
`;
const seam='function scene(){';
if(s.includes('function chapter(l)')){console.log('chapter motifs already applied');process.exit(0)}
if(!s.includes(seam))throw Error('render seam missing');
let n=s.replace(seam,fn+seam);
const call="X.fill();X.globalAlpha=1;for(let i=0;i<18;i++)";
if(!n.includes(call))throw Error('chapter call seam missing');
n=n.replace(call,"X.fill();X.globalAlpha=1;chapter(lit);for(let i=0;i<18;i++)");
writeFileSync(p,n);console.log('chapter motifs applied');
