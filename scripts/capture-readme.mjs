import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const out=resolve('docs/screenshots');
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:960,height:640},deviceScaleFactor:1});
await page.goto(pathToFileURL(resolve('dist/stretchicorn-local.html')).href);
await page.waitForSelector('#c');
await page.waitForTimeout(250);
const canvas=page.locator('#c');

async function shot(name,setup){
  await page.evaluate(setup);
  await page.waitForTimeout(40);
  await canvas.screenshot({path:`${out}/${name}.png`});
}

await shot('title',()=>{mode=0;draw()});
await shot('field-guide',()=>{mode=7;draw()});
await shot('controls',()=>{mode=6;draw()});
await shot('gameplay',()=>{D=1;wave=8;spawnWave();charge=.82;ready=.4;aim=-.18;mode=8;scene()});
await shot('hideaway-husk',()=>{D=1;wave=5;spawnWave();charge=.58;ready=.3;mode=8;scene()});
await shot('kernel-colonel',()=>{D=1;wave=9;spawnWave();charge=.58;ready=.3;mode=8;scene()});
await shot('cobtopus-prime',()=>{D=1;wave=13;spawnWave();charge=.72;ready=.4;mode=8;scene()});
await shot('rainbow-popcorn-finale',()=>{D=1;wave=13;spawnWave();E.length=0;B.length=0;Q.length=0;G.length=0;score=4367;hearts=8;runT=184;voidX=480;voidY=250;winT=1.65;t=12;mode=5;draw()});

await browser.close();
console.log('Captured actual in-game README screenshots to',out);
