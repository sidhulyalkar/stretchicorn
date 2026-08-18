from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo
import struct, zlib

p=Path('dist/index.html')
out=Path('dist/stretchicorn-desktop-v0.20.7.zip')
data=p.read_bytes(); name=b'index.html'

# Zopfli is optional: when present we build a deterministic standards-compliant
# DEFLATE ZIP with better compression. The stdlib fallback is valid but may exceed 13,312 B.
try:
    from zopfli.zlib import compress
    raw=compress(data,numiterations=30)[2:-4]
    crc=zlib.crc32(data)&0xffffffff
    tm=0; dt=(1<<5)|1  # 1980-01-01, deterministic ZIP timestamp
    local=struct.pack('<IHHHHHIIIHH',0x04034b50,20,0,8,tm,dt,crc,len(raw),len(data),len(name),0)+name+raw
    central=struct.pack('<IHHHHHHIIIHHHHHII',0x02014b50,20,20,0,8,tm,dt,crc,len(raw),len(data),len(name),0,0,0,0,0,0)+name
    end=struct.pack('<IHHHHIIH',0x06054b50,0,0,1,1,len(central),len(local),0)
    out.write_bytes(local+central+end)
    method='zopfli'
except ImportError:
    zi=ZipInfo('index.html',(1980,1,1,0,0,0));zi.compress_type=ZIP_DEFLATED
    with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=9) as z:z.writestr(zi,data)
    method='zlib'
print(out,out.stat().st_size,'bytes',method)
