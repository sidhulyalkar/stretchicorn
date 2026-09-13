import{spawnSync}from'node:child_process';
const suites=['test-v044.mjs','test-v043.mjs','test-v042.mjs','test-v041.mjs','test-v040.mjs','test-v039.mjs','test-v038.mjs','test-v037.mjs','test-v036.mjs','test-v035.mjs','test-v032.mjs','test-sky-v030.mjs'];
const run=process.argv.includes('--smoke')?suites.slice(0,-1):suites;
for(const file of run){console.log(`\n== ${file} ==`);const p=spawnSync(process.execPath,[`scripts/${file}`],{stdio:'inherit'});if(p.status!==0)process.exit(p.status??1)}
console.log(`PASS: ${run.length} regression suites`);
