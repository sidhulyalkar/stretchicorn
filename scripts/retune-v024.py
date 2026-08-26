from pathlib import Path
p=Path('scripts/pack-competition.mjs')
s=p.read_text()
old="run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=3','--mangle','--ecma','2020','--output',`${tmp}/min.js`]);"
new="run('npx',['--yes','terser@5.50.0',`${tmp}/game.js`,'--compress','passes=5,toplevel=true','--mangle','toplevel=true','--ecma','2020','--output',`${tmp}/min.js`]);"
if old not in s: raise SystemExit('terser seam missing')
s=s.replace(old,new,1)
old="const fixed=['-q','-O0','-D','-Zab25','-Zlr1333','-Zmd11','-Zpr14','-S0,1,2,3,5,6,13,26,49,105,179,449'];"
new="const fixed=['-q','-O0','-D','-Zab22','-Zlr1910','-Zmd14','-S0,1,2,3,6,7,13,25,42,193,338,425'];"
if old not in s: raise SystemExit('roadroller seam missing')
p.write_text(s.replace(old,new,1))
