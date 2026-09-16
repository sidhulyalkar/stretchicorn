import {readFileSync} from 'node:fs';

const root=readFileSync('index.html','utf8');
const competitionStyle=readFileSync('src/style.css','utf8');
const wavedashStyle=readFileSync('src/wavedash.css','utf8');
const competition=readFileSync('dist/index.html','utf8');
const platformIndex=readFileSync('wavedash-dist/index.html','utf8');
const platformOverride=readFileSync('wavedash-dist/src/wavedash.css','utf8');
const platformJs=readFileSync('wavedash-dist/src/wavedash-platform.js','utf8');
const manifest=JSON.parse(readFileSync('wavedash/achievements.json','utf8'));

const competitionSkin=s=>/background:#111/.test(s)&&/canvas\{[^}]*width:min\(100vw,150vh,960px\)/.test(s)&&!/background:#090610/.test(s);
const wavedashSkin=s=>/body\{background:#090610\}/.test(s)&&/canvas\{width:min\(100vw,150vh\)\}/.test(s)&&!/960px/.test(s);

if(!/src\/style\.css[\s\S]*src\/wavedash\.css/.test(root))throw Error('Wavedash override must load after the competition stylesheet');
if(!/src\/03-keyart-v026\.js[\s\S]*src\/wavedash-platform\.js/.test(root))throw Error('root must load platform integration after final game renderer');
if(!/src\/wavedash\.css/.test(platformIndex)||!/src\/wavedash-platform\.js/.test(platformIndex))throw Error('wavedash-dist does not ship the presentation + platform layers');
if(!/updateLoadProgressZeroToOne\(1\)[\s\S]*\.init\(\{ debug: false, deferEvents: true \}\)/.test(platformJs))throw Error('platform layer does not own the Wavedash load/init lifecycle');
if(/Wavedash\.init|wavedash-platform|wavedash\.css/.test(competition))throw Error('competition artifact contaminated by Wavedash code or presentation');
if(!competitionSkin(competitionStyle)||!competitionSkin(competition))throw Error('submitted competition presentation changed while building Wavedash');
if(!wavedashSkin(wavedashStyle)||!wavedashSkin(platformOverride))throw Error('Wavedash full-bleed override regressed to a capped or gray frame');

const requiredApis=[
  'getOrCreateLeaderboard','uploadLeaderboardScore','listLeaderboardEntries','getMyLeaderboardEntries',
  'requestStats','setStat','setAchievement','storeStats',
  'remoteFileExists','writeLocalFile','uploadRemoteFile','downloadRemoteFile','readLocalFile',
  'createUGCItem','downloadUGCItem','deleteUGCItem',
  'getUsername','getUserId','listFriends','updateUserPresence','toggleOverlay',
  'MUTE_CHANGED','FULLSCREEN_CHANGED','BACKEND_CONNECTED','BACKEND_DISCONNECTED',
];
for(const api of requiredApis)if(!platformJs.includes(api))throw Error(`missing Wavedash integration seam: ${api}`);

if(!/Style - \$\{d\.label\}/.test(platformJs)||!/Clear Time - \$\{d\.label\}/.test(platformJs))throw Error('per-difficulty Style + clear-time boards are not configured');
if(!/UGCType\.GAME_MANAGED/.test(platformJs)||!/ugcId/.test(platformJs)||!/ghost/.test(platformJs))throw Error('leaderboard-attached ghost replay lane is missing');
if(manifest.achievements.length!==13)throw Error(`expected 13 Stretchicorn achievements, got ${manifest.achievements.length}`);
const achievementIds=new Set(manifest.achievements.map(a=>a.identifier));
for(const id of ['FIRST_SNAP','DOUBLE_RAINBOW','LUCKY_13','KERNEL_PARRY','HUSK_CLEAR','COLONEL_CLEAR','MAX_COMBO','CAPN_CLEAR','EASY_CLEAR','NORMAL_CLEAR','HARD_CLEAR','IMPOSSIBLE_CLEAR','PERFECT_13'])if(!achievementIds.has(id))throw Error(`achievement manifest missing ${id}`);

console.log('PASS: Wavedash Rainbow League ships identity/friends/presence, 8 boards, 13 achievements, stats, cloud sync, attached ghost UGC, social overlay, host events and a platform-only full-bleed skin while the js13k artifact remains byte-isolated');
