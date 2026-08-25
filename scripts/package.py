from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo
import json
import struct
import zlib

DIST = Path('dist')
SOURCE = DIST / 'index.html'
VERSION = json.loads(Path('package.json').read_text())['version']
VERSIONED = DIST / f'stretchicorn-desktop-v{VERSION}.zip'
LATEST = DIST / 'stretchicorn-js13k.zip'

data = SOURCE.read_bytes()
name = b'index.html'

# Zopfli is optional for local development. Release/CI installs the pinned
# compressor because the stdlib fallback may exceed the 13,312-byte ceiling.
try:
    from zopfli.zlib import compress

    raw = compress(data, numiterations=80)[2:-4]
    crc = zlib.crc32(data) & 0xffffffff
    tm = 0
    dt = (1 << 5) | 1
    local = struct.pack(
        '<IHHHHHIIIHH', 0x04034B50, 20, 0, 8, tm, dt, crc,
        len(raw), len(data), len(name), 0,
    ) + name + raw
    central = struct.pack(
        '<IHHHHHHIIIHHHHHII', 0x02014B50, 20, 20, 0, 8, tm, dt, crc,
        len(raw), len(data), len(name), 0, 0, 0, 0, 0, 0,
    ) + name
    end = struct.pack(
        '<IHHHHIIH', 0x06054B50, 0, 0, 1, 1,
        len(central), len(local), 0,
    )
    package = local + central + end
    method = 'zopfli'
except ImportError:
    import io

    buf = io.BytesIO()
    zi = ZipInfo('index.html', (1980, 1, 1, 0, 0, 0))
    zi.compress_type = ZIP_DEFLATED
    with ZipFile(buf, 'w', ZIP_DEFLATED, compresslevel=9) as archive:
        archive.writestr(zi, data)
    package = buf.getvalue()
    method = 'zlib'

DIST.mkdir(parents=True, exist_ok=True)
VERSIONED.write_bytes(package)
LATEST.write_bytes(package)
print(VERSIONED, len(package), 'bytes', method)
print(LATEST, len(package), 'bytes', method, '(stable download alias)')
