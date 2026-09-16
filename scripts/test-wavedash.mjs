import assert from'node:assert/strict';
import {readFileSync} from'node:fs';

const root=readFileSync('index.html','utf8');
const style=readFileSync('src/style.css','utf8');
const competition=readFileSync('dist/index.html','utf8');
const platformIndex=readFileSync('wavedash-dist/index.html','utf8');
const platformJs=readFileSync('wavedash-dist/src/wavedash-platform.js','utf8');
const challengeJs=readFileSync('wavedash-dist/wavedash/challenge-platform.js','utf8');
const allSdkJs=platformJs+'\n'+challengeJs;
const manifest=JSON.parse(readFileSync('wavedash/achievements.json','utf8'));
const legacyHook='<script>if(window.Wavedash){Wavedash.updateLoadProgressZeroToOne(1);Wavedash.init({debug:false})}</script>';
const platformHook='<script src="src/wavedash-platform.js"></script><script src="wavedash/challenge-platform.js"></script>';

if(!root.includes(legacyHook))throw Error('root game shell no longer matches the frozen Wavedash-init seam');
if(/wavedash-platform|challenge-platform|wavedash\.css/.test(root))throw Error('root game shell contains post-deadline Wavedash presentation or platform code');
assert.equal(platformIndex,root.replace(legacyHook,platformHook),'Wavedash index must differ from the frozen root shell only by replacing the SDK init hook');
if(/wavedash\.css/.test(platformIndex))throw Error('Wavedash build must not add a presentation stylesheet');
if(!/background:#090610/.test(style)||!/width:min\(100vw,150vh\)/.test(style))throw Error('frozen game stylesheet changed');
if(/wavedash-platform|challenge-platform/.test(competition))throw Error('competition artifact contaminated by Wavedash platform code');

for(const file of ['src/style.css','src/00-core.js','src/01-combat.js','src/02-update.js','src/03-render.js','src/04-ui-input.js','src/03-keyart-v026.js']){
  assert.equal(readFileSync(`wavedash-dist/${file}`,'utf8'),readFileSync(file,'utf8'),`${file} changed while assembling the Wavedash build`);
}
assert.equal(challengeJs,readFileSync('wavedash/challenge-platform.js','utf8'),'challenge SDK extension changed while assembling Wavedash build');

if(!/updateLoadProgressZeroToOne\(1\)[\s\S]*SDK\.init\(\{ debug: false, deferEvents: true \}\)/.test(platformJs))throw Error('platform layer does not own the Wavedash load/init lifecycle');
for(const forbidden of ['drawGhost','getContext(\'2d\')','baseTitle','baseVictory','appendChild(ghostCanvas)','CHECKPOINT CLEAR • LEADERBOARDS']){
  if(allSdkJs.includes(forbidden))throw Error(`SDK-only layer contains post-deadline presentation/gameplay seam: ${forbidden}`);
}

const requiredApis=[
  'getOrCreateLeaderboard','uploadLeaderboardScore','getMyLeaderboardEntries','listLeaderboardEntries',
  'requestStats','getStat','setStat','getAchievement','setAchievement','storeStats',
  'remoteFileExists','writeLocalFile','uploadRemoteFile','downloadRemoteFile','readLocalFile',
  'createUGCItem','deleteUGCItem',
  'getUsername','getUserId','listFriends','updateUserPresence',
  'STATS_STORED','MUTE_CHANGED','FULLSCREEN_CHANGED','BACKEND_CONNECTED','BACKEND_DISCONNECTED','BACKEND_RECONNECTING',
];
for(const api of requiredApis)if(!allSdkJs.includes(api))throw Error(`missing Wavedash integration seam: ${api}`);

if(!/Style - \$\{d\.label\}/.test(platformJs)||!/Clear Time - \$\{d\.label\}/.test(platformJs))throw Error('per-difficulty Style + clear-time boards are not configured');
for(const name of ['Biggest Harvest','Silky Style - Hard','Silky Style - Impossible'])if(!challengeJs.includes(name))throw Error(`challenge leaderboard missing: ${name}`);
if(/Purist Style/.test(challengeJs))throw Error('stale Purist Style leaderboard name remains in challenge layer');
if(!/pending-challenge-runs-v1\.json/.test(challengeJs)||!/drainPending/.test(challengeJs))throw Error('challenge leaderboards do not have reconnect-safe submission');
if(!/eee2ac40c71070ddb1502e16362e3b9490d5ce61/.test(challengeJs)||!/traceVersion/.test(challengeJs))throw Error('challenge leaderboard provenance is missing');
if(!/WORLDS_END/.test(challengeJs)||!/worlds-end-own-entry/.test(challengeJs))throw Error('Worlds End startup/reconnect reconciliation is missing');
if(!/UGCType\.GAME_MANAGED/.test(platformJs)||!/PB Replay Trace/.test(platformJs))throw Error('leaderboard-attached replay-trace UGC lane is missing');
if(!/pending-ranked-runs-v1\.json/.test(platformJs)||!/drainPendingRuns/.test(platformJs))throw Error('connectivity-safe ranked submission queue is missing');
if(!/runEligible = startWave === 1/.test(platformJs))throw Error('ranked submissions are not constrained to Trial-1 full campaigns');
if(!/BEST_SLASH_KILLS/.test(platformJs)||!/CORN_COMBINE/.test(platformJs))throw Error('single-slash mastery tracking is missing');
if(!/NO_POWER_ACHIEVEMENTS/.test(platformJs)||!/PURE_SPECTRUM/.test(platformJs))throw Error('zero-powerup challenge tracking is missing');
if(!/THIRTEEN_FASTER/.test(platformJs)||!/CORN_PRIX_CHAMPION/.test(platformJs))throw Error('personal-best achievement tracking is missing');

if(manifest.achievements.length!==39)throw Error(`expected 39 Stretchicorn achievements, got ${manifest.achievements.length}`);
const achievementIds=new Set(manifest.achievements.map(a=>a.identifier));
const expectedAchievements=[
  'FIRST_SNAP','DOUBLE_RAINBOW','LUCKY_13','CLOSE_SHAVE','KERNEL_PARRY','MAX_COMBO','HUSK_CLEAR','COLONEL_CLEAR',
  'EASY_CLEAR','NORMAL_CLEAR','HARD_CLEAR','IMPOSSIBLE_CLEAR','FULL_HEARTS','CORN_COMBINE','THREAD_NEEDLE','RETURN_DEPARTMENT',
  'FULL_SPECTRUM','WALL_TO_WALL','PRISM_BREAK','FULL_PANTRY','NO_POWER_EASY','NO_POWER_NORMAL','NO_POWER_HARD','NO_POWER_IMPOSSIBLE',
  'UNTOUCHED','ENCORE_REACHED','POPCORN_APPRENTICE','CORN_REAPER','MAIZE_MASTER','SERIAL_SNAPPER','GRAZE_CRAZE','RETURN_CENTER',
  'SEEING_DOUBLE','COB_COMPOSTER','THIRTEEN_FASTER','DUAL_PB','CORN_PRIX_CHAMPION','WORLDS_END','PURE_SPECTRUM',
];
for(const id of expectedAchievements)if(!achievementIds.has(id))throw Error(`achievement manifest missing ${id}`);
assert.equal(achievementIds.size,39,'achievement identifiers must be unique');
const statIds=new Set(manifest.stats.map(s=>s.identifier));
for(const id of ['TOTAL_KILLS','TOTAL_SNAPS','DOUBLE_RAINBOWS','PARRIES','TOTAL_GRAZES','WALL_SMASHES','POWERUPS_COLLECTED','RUNS_CLEARED','BEST_SLASH_KILLS','PB_IMPROVED_EASY','PB_IMPROVED_NORMAL','PB_IMPROVED_HARD','PB_IMPROVED_IMPOSSIBLE'])if(!statIds.has(id))throw Error(`achievement manifest missing stat ${id}`);
const byId=Object.fromEntries(manifest.achievements.map(a=>[a.identifier,a]));
const finalNames={
  COLONEL_CLEAR:'Colonel Chop',
  IMPOSSIBLE_CLEAR:'Rainbow Royalty',
  FULL_HEARTS:"Heart Hold'em",
  THREAD_NEEDLE:'Great Grazer',
  RETURN_DEPARTMENT:'Parry Party',
  NO_POWER_HARD:'Raw Rainbow',
  NO_POWER_IMPOSSIBLE:'Powerless Pony',
  UNTOUCHED:'Pristine Prance',
  ENCORE_REACHED:'Cob Comeback',
};
for(const [id,name] of Object.entries(finalNames))assert.equal(byId[id].display_name,name,`${id} display name drifted`);
assert.deepEqual(byId.POPCORN_APPRENTICE.stat_requirement,{stat:'TOTAL_KILLS',threshold:1300});
assert.deepEqual(byId.CORN_REAPER.stat_requirement,{stat:'TOTAL_KILLS',threshold:13000});
assert.deepEqual(byId.MAIZE_MASTER.stat_requirement,{stat:'TOTAL_KILLS',threshold:130000});
assert.deepEqual(byId.SERIAL_SNAPPER.stat_requirement,{stat:'TOTAL_SNAPS',threshold:1300});
assert.deepEqual(byId.GRAZE_CRAZE.stat_requirement,{stat:'TOTAL_GRAZES',threshold:1300});
assert.deepEqual(byId.RETURN_CENTER.stat_requirement,{stat:'PARRIES',threshold:1300});
assert.deepEqual(byId.SEEING_DOUBLE.stat_requirement,{stat:'DOUBLE_RAINBOWS',threshold:130});
assert.deepEqual(byId.COB_COMPOSTER.stat_requirement,{stat:'RUNS_CLEARED',threshold:13});

console.log('PASS: Wavedash build replaces only the frozen SDK init hook; gameplay/rendering files remain byte-identical while identity/presence, 11 boards, 39 achievements, stats, cloud saves, replay UGC and reconnect-safe submission calls stay isolated in SDK-only layers');
