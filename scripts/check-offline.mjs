import {readFileSync} from 'node:fs';

const path = process.argv[2] || 'dist/index.html';
const html = readFileSync(path, 'utf8');
const failures = [];

const resourceTags = new Set(['script','link','img','audio','video','source','track','iframe','embed','object','input']);
const resourceAttrs = new Set(['src','srcset','poster','data']);
const tagRe = /<([a-z][\w:-]*)\b([^>]*)>/gi;
const attrRe = /\b([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

const isInline = value => {
  const v = value.trim();
  return !v || v.startsWith('#') || /^(?:data|blob|about):/i.test(v);
};

for (const match of html.matchAll(tagRe)) {
  const tag = match[1].toLowerCase();
  const attrs = match[2];
  for (const attr of attrs.matchAll(attrRe)) {
    const name = attr[1].toLowerCase();
    const value = attr[2] ?? attr[3] ?? attr[4] ?? '';
    const values = name === 'srcset' ? value.split(',').map(v => v.trim().split(/\s+/)[0]) : [value];
    const isResourceReference = resourceTags.has(tag) && resourceAttrs.has(name);
    const isLinkedResource = name === 'href' && (tag === 'link' || tag === 'base');
    if (isResourceReference || isLinkedResource) {
      for (const candidate of values) if (!isInline(candidate)) failures.push(`${tag}[${name}] -> ${candidate}`);
    }
  }
}

for (const match of html.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
  if (!isInline(match[2])) failures.push(`CSS url() -> ${match[2]}`);
}
for (const match of html.matchAll(/@import\s+(?:url\()?\s*(['"]?)([^'"\s;)]+)\1/gi)) {
  if (!isInline(match[2])) failures.push(`CSS @import -> ${match[2]}`);
}

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n');
const forbiddenRuntime = [
  ['fetch()', /\bfetch\s*\(/],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/],
  ['WebSocket', /\bWebSocket\b/],
  ['EventSource', /\bEventSource\b/],
  ['sendBeacon()', /\bsendBeacon\s*\(/],
  ['RTCPeerConnection', /\bRTCPeerConnection\b/],
  ['dynamic import()', /\bimport\s*\(/],
  ['serviceWorker.register()', /serviceWorker\s*\.\s*register\s*\(/],
];
for (const [label, pattern] of forbiddenRuntime) if (pattern.test(scripts)) failures.push(`network-capable runtime API: ${label}`);

if (/(?:https?:|wss?:|ftp:|file:)\/\//i.test(html)) failures.push('absolute external URL present in built HTML');

if (failures.length) {
  console.error(`FAIL: ${path} is not self-contained/offline-safe`);
  for (const failure of [...new Set(failures)]) console.error(` - ${failure}`);
  process.exit(1);
}
console.log(`PASS: ${path} has no external resource references or network-capable runtime APIs`);
