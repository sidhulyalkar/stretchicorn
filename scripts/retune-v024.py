from pathlib import Path
p=Path('scripts/pack-competition.mjs')
s=p.read_text()
old="run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=3','--mangle','--ecma','2020','--output',`${tmp}/min.js`]);"
new="run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=5,toplevel=true','--mangle','toplevel=true','--ecma','2020','--output',`${tmp}/min.js`]);"
if old not in s: raise SystemExit('packer seam missing')
p.write_text(s.replace(old,new,1))
