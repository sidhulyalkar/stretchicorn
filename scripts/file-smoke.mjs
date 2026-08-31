import {resolve} from'node:path';
import {pathToFileURL} from'node:url';
let playwright;
try{playwright=await import('playwright')}catch{console.error('Playwright is required. Install playwright@1.55.0');process.exit(2)}
const engine=process.env.BROWSER||process.argv[2]||'chromium',artifact=process.env.BROWSER_HTML||'dist/stretchicorn-local.html',launcher=playwright[engine];
if(!launcher||typeof launcher.launch!='function')throw Error(`Unsupported browser engine: ${engine}`);
const errors=[],consoleErrors=[],external=[];let browser;
try{
 browser=await launcher.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1280,height:800}}),page=await context.newPage();
 await page.route('**/*',async route=>{let u=new URL(route.request().url());if(u.protocol==='file:')return route.continue();external.push(u.href);return route.abort('blockedbyclient')});
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
 await page.goto(pathToFileURL(resolve(artifact)).href,{waitUntil:'load',timeout:15000});
 const canvas=page.locator('#c');await canvas.waitFor({state:'visible',timeout:5000});await page.waitForTimeout(120);const snap=()=>canvas.evaluate(n=>n.toDataURL());
 const title=await snap();await page.keyboard.press('t');await page.keyboard.press('Space');await page.waitForTimeout(180);const play=await snap();if(title===play)throw Error('local T intercepted title flow; Space did not reach gameplay');await page.keyboard.press('p');await page.waitForTimeout(100);const pause1=await snap();await page.waitForTimeout(160);const pause2=await snap();if(pause1!==pause2)throw Error('local T intercepted direct gameplay flow; P could not hold stable pause');
 if(errors.length)throw Error(`page errors: ${errors.join(' | ')}`);if(consoleErrors.length)throw Error(`console errors: ${consoleErrors.join(' | ')}`);if(external.length)throw Error(`network requests attempted: ${[...new Set(external)].join(', ')}`);
 console.log(`PASS: ${engine} opened ${artifact} via file://, T could not enter an intro, Space reached gameplay directly, and pause held stable`);await context.close();
}finally{if(browser)await browser.close()}
