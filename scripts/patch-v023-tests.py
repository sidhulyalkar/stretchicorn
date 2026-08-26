from pathlib import Path

def rep(path,old,new):
 p=Path(path);s=p.read_text()
 if old not in s: raise SystemExit(f'missing seam {path}: {old[:100]!r}')
 p.write_text(s.replace(old,new,1))

# Canvas gradients are now part of the visual direction; VM mocks must model the API return object.
for path in ['scripts/test.mjs','scripts/release-smoke.mjs']:
 rep(path,"const x=new Proxy({},{get:(o,k)=>o[k]||(o[k]=()=>{}),set:(o,k,v)=>(o[k]=v,true)})" if path.endswith('test.mjs') else "const x=new Proxy({},{get:(o,k)=>o[k]||(o[k]=()=>{if(k=='fillRect')paints++}),set:(o,k,v)=>(o[k]=v,true)})",
     "const gg={addColorStop(){}};const x=new Proxy({createLinearGradient:()=>gg},{get:(o,k)=>o[k]||(o[k]=()=>{}),set:(o,k,v)=>(o[k]=v,true)})" if path.endswith('test.mjs') else "const gg={addColorStop(){}};const x=new Proxy({createLinearGradient:()=>gg},{get:(o,k)=>o[k]||(o[k]=()=>{if(k=='fillRect')paints++}),set:(o,k,v)=>(o[k]=v,true)})")

rep('scripts/test.mjs',"if(!h.includes('createBiquadFilter')||!h.includes(\"globalCompositeOperation='screen'\")||!h.includes('function bossArt')||!h.includes('THE LAST RAINBOW LETS GO.'))throw Error('impact systems missing');",
"if(!h.includes('createBiquadFilter')||!h.includes(\"globalCompositeOperation='screen'\")||!h.includes('function bossArt')||!h.includes('THE LAST RAINBOW LETS GO.')||!h.includes('THE LIVING SCAR')||!h.includes('SPACE  SKIP'))throw Error('story/impact systems missing');")

# Browser smoke must exercise the mandatory story before difficulty selection.
rep('scripts/browser-smoke.mjs',"const menuFrame = await canvas.evaluate(node => node.toDataURL());\n  await page.keyboard.press('2');\n  await page.waitForTimeout(180);\n  const playFrame = await canvas.evaluate(node => node.toDataURL());\n  if (menuFrame === playFrame) throw new Error('difficulty input did not visibly transition from menu to gameplay');",
"const introFrame = await canvas.evaluate(node => node.toDataURL());\n  await page.keyboard.press('Space');\n  await page.waitForTimeout(100);\n  const menuFrame = await canvas.evaluate(node => node.toDataURL());\n  if (introFrame === menuFrame) throw new Error('mandatory story did not visibly transition to the menu');\n  await page.keyboard.press('2');\n  await page.waitForTimeout(180);\n  const playFrame = await canvas.evaluate(node => node.toDataURL());\n  if (menuFrame === playFrame) throw new Error('difficulty input did not visibly transition from menu to gameplay');")

rep('scripts/file-smoke.mjs',"const menu=await canvas.evaluate(n=>n.toDataURL());await page.keyboard.press('2');await page.waitForTimeout(180);const play=await canvas.evaluate(n=>n.toDataURL());\n if(menu===play)throw Error('local file did not visibly transition from menu to gameplay');",
"const intro=await canvas.evaluate(n=>n.toDataURL());await page.keyboard.press('Space');await page.waitForTimeout(100);const menu=await canvas.evaluate(n=>n.toDataURL());if(intro===menu)throw Error('local story did not visibly reach menu');await page.keyboard.press('2');await page.waitForTimeout(180);const play=await canvas.evaluate(n=>n.toDataURL());\n if(menu===play)throw Error('local file did not visibly transition from menu to gameplay');")
rep('scripts/file-smoke.mjs',"rendered the title, started gameplay","rendered the mandatory story and title, started gameplay")

print('v0.23 tests patched')
