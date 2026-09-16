import assert from'node:assert/strict';
import {readFileSync} from'node:fs';

const root=readFileSync('index.html','utf8');
const style=readFileSync('src/style.css','utf8');
const competition=readFileSync('dist/index.html','utf8');
const platformIndex=readFileSync('wavedash-dist/index.html','utf8');
const platformJs=readFileSync('wavedash-dist/src/wavedash-platform.js','utf8');
const manifest=JSON.parse(readFileSync('wavedash/achievements.json','utf8'));
const legacyHook='<script>if(window.Wavedash){Wavedash.updateLoadProgressZeroToOne(1);Wavedash.init({debug:false})}</script>';
const platformHook='<script src="src/wavedash-platform.js"></script>';

if(!root.includes(legacyHook))throw Error('root game shell no longer matches the frozen Wavedash-init seam');
if(/wavedash-platform|wavedash\.css/.test(root))throw Error('root game shell contains post-deadline Wavedash presentation or platform code');
assert.equal(platformIndex,root.replace(legacyHook,platformHook),'Wavedash index must differ from the frozen root shell only by replacing the SDK init hook');
if(/wavedash\.css/.test(platformIndex))throw Error('Wavedash build must not add a presentation stylesheet');
if(!/background:#090610/.test(style)||!/width:min\(100vw,150vh\)/.test(style))throw Error('frozen game stylesheet changed');
if(/wavedash-platform/.test(competition))throw Error('competition artifact contaminated by Wavedash platform code');

for(const file of ['src/style.css','src/00-core.js','src/01-combat.js','src/02-update.js','src/03-render.js','src/04-ui-input.js','src/03-keyart-v026.js']){
  assert.equal(readFileSync(`wavedash-dist/${file}`,'utf8'),readFileSync(file,'utf8'),`${file} changed while assembling the Wavedash build`);
}

if(!/updateLoadProgressZeroToOne\(1\)[\s\S]*SDK\.init\(\{ debug: false, deferEvents: true \}\)/.test(platformJs))throw Error('platform layer does not own the Wavedash load/init lifecycle');
for(const forbidden of ['drawGhost','getContext(\'2d\')','baseTitle','baseVictory','appendChild(ghostCanvas)','CHECKPOINT CLEAR • LEADERBOARDS']){
  if(platformJs.includes(forbidden))throw Error(`SDK-only layer contains post-deadline presentation/gameplay seam: ${forbidden}`);
}

const requiredApis=[
  'getOrCreateLeaderboard','uploadLeaderboardScore','getMyLeaderboardEntries',
  'requestStats','getStat','setStat','getAchievement','setAchievement','storeStats',
  'remoteFileExists','writeLocalFile','uploadRemoteFile','downloadRemoteFile','readLocalFile',
  'createUGCItem','deleteUGCItem',
  'getUsername','getUserId','listFriends','updateUserPresence',
  'STATS_STORED','MUTE_CHANGED','FULLSCREEN_CHANGED','BACKEND_CONNECTED','BACKEND_DISCONNECTED','BACKEND_RECONNECTING',
];
for(const api of requiredApis)if(!platformJs.includes(api))throw Error(`missing Wavedash integration seam: ${api}`);

if(!/Style - \$\{d\.label\}/.test(platformJs)||!/Clear Time - \$\{d\.label\}/.test(platformJs))throw Error('per-difficulty Style + clear-time boards are not configured');
if(!/UGCType\.GAME_MANAGED/.test(platformJs)||!/PB Replay Trace/.test(platformJs))throw Error('leaderboard-attached replay-trace UGC lane is missing');
if(!/pending-ranked-runs-v1\.json/.test(platformJs)||!/drainPendingRuns/.test(platformJs))throw Error('connectivity-safe ranked submission queue is missing');
if(!/runEligible = startWave === 1/.test(platformJs))throw Error('ranked submissions are not constrained to Trial-1 full campaigns');
if(manifest.achievements.length!==13)throw Error(`expected 13 Stretchicorn achievements, got ${manifest.achievements.length}`);
const achievementIds=new Set(manifest.achievements.map(a=>a.identifier));
for(const id of ['FIRST_SNAP','DOUBLE_RAINBOW','LUCKY_13','KERNEL_PARRY','HUSK_CLEAR','COLONEL_CLEAR','MAX_COMBO','CAPN_CLEAR','EASY_CLEAR','NORMAL_CLEAR','HARD_CLEAR','IMPOSSIBLE_CLEAR','PERFECT_13'])if(!achievementIds.has(id))throw Error(`achievement manifest missing ${id}`);

console.log('PASS: Wavedash build replaces only the frozen SDK init hook; gameplay/rendering files remain byte-identical while identity/presence, 8 boards, 13 achievements, stats, cloud saves, replay UGC and reconnect-safe submission calls stay isolated in the platform layer');
