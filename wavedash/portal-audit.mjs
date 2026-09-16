import {readFileSync} from'node:fs';
import {spawnSync} from'node:child_process';

const manifest=JSON.parse(readFileSync('wavedash/achievements.json','utf8'));
const expected=new Map(manifest.achievements.map(a=>[a.identifier,a]));
const secretIds=new Set(['NO_POWER_IMPOSSIBLE','UNTOUCHED','ENCORE_REACHED','PURE_SPECTRUM']);
const run=spawnSync('wavedash',['achievement','list','--json'],{encoding:'utf8'});
if(run.error?.code==='ENOENT'){
  console.error('Wavedash CLI not found. Install/authenticate it, then rerun npm run wavedash:audit.');
  process.exit(1);
}
if(run.status!==0){
  process.stderr.write(run.stderr||'wavedash achievement list failed\n');
  process.exit(run.status||1);
}
let remote;
try{remote=JSON.parse(run.stdout)}catch(error){
  console.error('Could not parse `wavedash achievement list --json` output:',error.message);process.exit(1);
}
const bool=v=>v===true||v===1||v==='true'||v==='1';
const byId=new Map(remote.map(a=>[a.identifier,a]));
const problems=[];
for(const [id,a] of expected){
  const r=byId.get(id);
  if(!r){problems.push(`missing achievement ${id}`);continue}
  const title=r.title??r.displayName??r.display_name;
  const description=r.description;
  const secret=r.secret??r.isSecret??r.is_secret;
  if(title!=null&&title!==a.display_name)problems.push(`${id}: portal title ${JSON.stringify(title)} != ${JSON.stringify(a.display_name)}`);
  if(description!=null&&description!==a.description)problems.push(`${id}: portal description differs from manifest`);
  if(secret!=null&&bool(secret)!==secretIds.has(id))problems.push(`${id}: secret=${JSON.stringify(secret)} but expected ${secretIds.has(id)}`);
}
for(const id of byId.keys())if(!expected.has(id))problems.push(`obsolete/unexpected portal achievement ${id}`);
if(remote.length!==39)problems.push(`portal has ${remote.length} achievements; expected exactly 39`);
if(problems.length){
  console.error('Wavedash portal audit failed:');
  for(const problem of problems)console.error(` - ${problem}`);
  console.error('\nBulk import skips existing identifiers. Update/delete stale portal entries and mark the four documented achievements Secret, then rerun.');
  process.exit(1);
}
console.log('PASS: Wavedash portal contains exactly the intended 39 achievements with matching names/descriptions and secret flags');
