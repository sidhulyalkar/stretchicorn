from pathlib import Path
from zopfli.zlib import compress

LIMIT=13312
ZIP_OVERHEAD=118  # one root-level index.html: local header + central dir + EOCD
root=Path('.tmp-compression/candidates')
paths=sorted(root.glob('*.html'))
if not paths:
    raise SystemExit('no compression candidates found')

print('\n=== js13k compression tournament ===')
print('candidate'.ljust(30),'html'.rjust(8),'z30'.rjust(8),'z80'.rjust(8),'free@80'.rjust(10))
for p in paths:
    data=p.read_bytes()
    sizes=[]
    for iterations in (30,80):
        raw=compress(data,numiterations=iterations)[2:-4]
        sizes.append(len(raw)+ZIP_OVERHEAD)
    print(p.name.ljust(30),str(len(data)).rjust(8),str(sizes[0]).rjust(8),str(sizes[1]).rjust(8),str(LIMIT-sizes[1]).rjust(10))
print('======================================\n')
