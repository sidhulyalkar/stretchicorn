import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';

const engine = process.env.BROWSER || process.argv[2] || 'chromium';
const artifact = process.env.BROWSER_HTML || 'dist/index.html';
let playwright;
try {
  playwright = await import('playwright');
} catch {
  console.error('Playwright is required for browser smoke tests. Install it with: npm install --no-save --package-lock=false playwright@1.55.0');
  process.exit(2);
}
const launcher = playwright[engine];
if (!launcher || typeof launcher.launch !== 'function') throw new Error(`Unsupported browser engine: ${engine}`);

const html = await readFile(artifact);
const server = createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, {'content-type':'text/html; charset=utf-8','cache-control':'no-store'});
    res.end(html);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, {'content-type':'text/plain'});
    res.end('not found');
  }
});
await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const external = [];
const pageErrors = [];
const consoleErrors = [];
let browser;

try {
  browser = await launcher.launch({headless:true});
  const context = await browser.newContext({viewport:{width:1280,height:800}});
  const page = await context.newPage();
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    external.push(url.href);
    return route.abort('blockedbyclient');
  });
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !/favicon/i.test(message.text())) consoleErrors.push(message.text());
  });

  await page.goto(`${origin}/`, {waitUntil:'load', timeout:15000});
  const canvas = page.locator('#c');
  await canvas.waitFor({state:'visible', timeout:5000});
  const geometry = await canvas.evaluate(node => ({
    width:node.width,
    height:node.height,
    cssWidth:node.getBoundingClientRect().width,
    cssHeight:node.getBoundingClientRect().height,
  }));
  if (geometry.width !== 960 || geometry.height !== 640 || geometry.cssWidth <= 0 || geometry.cssHeight <= 0) throw new Error(`bad canvas geometry: ${JSON.stringify(geometry)}`);

  await page.waitForTimeout(120);
  const introFrame = await canvas.evaluate(node => node.toDataURL());
  await page.keyboard.press('Space');
  await page.waitForTimeout(120);
  const practiceFrame = await canvas.evaluate(node => node.toDataURL());
  if (introFrame === practiceFrame) throw new Error('story did not visibly hand off to First Flight practice');

  // Complete the real tutorial with production controls, rather than testing only its skip path.
  // Aim begins to the right, so moving the heart left stretches directly away from the horn.
  await page.keyboard.down('a');
  await page.waitForTimeout(420);
  await page.keyboard.up('a');
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(60);
  await page.keyboard.up('ArrowRight');
  for (let i=0;i<3;i++) {
    await page.keyboard.down('a');
    await page.waitForTimeout(360);
    await page.keyboard.up('a');
    await page.keyboard.press('Space');
    await page.waitForTimeout(230);
  }
  await page.waitForTimeout(850);
  const playFrame = await canvas.evaluate(node => node.toDataURL());
  if (practiceFrame === playFrame) throw new Error('three charged First Flight Snaps did not hand off to Easy gameplay');

  await page.keyboard.press('m');
  await page.waitForTimeout(80);
  const menuFrame = await canvas.evaluate(node => node.toDataURL());
  await page.keyboard.press('2');
  await page.waitForTimeout(180);
  const normalFrame = await canvas.evaluate(node => node.toDataURL());
  if (menuFrame === normalFrame) throw new Error('manual Normal selection did not start gameplay');

  if (process.env.IMPACT) {
    // IMPACT targets the golfed readable build. These aliases are the stable semantic
    // names defined by scripts/build.mjs and mirrored by release-smoke.mjs.
    await page.evaluate(() => window.eval('_a=4;J=3;_c=3;L=13;_q=0;$y()'));
    await page.waitForTimeout(80);
    const overloadFrame = await canvas.evaluate(node => node.toDataURL());
    await page.evaluate(() => window.eval('mode=5;_K=1;$y()'));
    await page.waitForTimeout(80);
    const releaseFrame = await canvas.evaluate(node => node.toDataURL());
    if (overloadFrame === playFrame || releaseFrame === overloadFrame) throw new Error('impact render paths did not visibly change the canvas');
  }

  await page.keyboard.press('p');
  await page.waitForTimeout(50);
  await page.keyboard.press('p');
  await page.keyboard.press('m');
  await page.waitForTimeout(80);

  if (external.length) throw new Error(`external requests attempted: ${[...new Set(external)].join(', ')}`);
  if (pageErrors.length) throw new Error(`page errors: ${pageErrors.join(' | ')}`);
  if (consoleErrors.length) throw new Error(`console errors: ${consoleErrors.join(' | ')}`);
  console.log(`PASS: ${engine} loaded ${artifact}, completed three real First Flight Snaps, entered Easy, and attempted no external requests`);
  await context.close();
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
