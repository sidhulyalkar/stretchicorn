from hashlib import sha256
from pathlib import Path
from zipfile import ZIP_DEFLATED, BadZipFile, ZipFile
import json
import stat
import sys

LIMIT = 13 * 1024
DIST = Path('dist')
SOURCE = DIST / 'index.html'
VERSION = json.loads(Path('package.json').read_text())['version']
ARCHIVES = [DIST / f'stretchicorn-desktop-v{VERSION}.zip', DIST / 'stretchicorn-js13k.zip']
EXPECTED_NAME = 'index.html'
EXPECTED_TIME = (1980, 1, 1, 0, 0, 0)


def fail(message: str) -> None:
    print(f'FAIL: {message}', file=sys.stderr)
    raise SystemExit(1)


if not SOURCE.is_file():
    fail(f'missing built artifact: {SOURCE}')
source = SOURCE.read_bytes()
packages = []

for path in ARCHIVES:
    if not path.is_file():
        fail(f'missing competition archive: {path}')
    package = path.read_bytes()
    packages.append(package)
    if len(package) > LIMIT:
        fail(f'{path} is {len(package)} bytes; limit is {LIMIT}')

    try:
        with ZipFile(path) as archive:
            infos = archive.infolist()
            if len(infos) != 1:
                fail(f'{path} must contain exactly one entry, found {len(infos)}')
            info = infos[0]
            if info.filename != EXPECTED_NAME:
                fail(f'{path} entry must be root-level {EXPECTED_NAME!r}, found {info.filename!r}')
            if info.is_dir() or '/' in info.filename or '\\' in info.filename:
                fail(f'{path} must not contain a wrapper directory')
            if info.flag_bits & 0x1:
                fail(f'{path} must not be encrypted')
            mode = info.external_attr >> 16
            if stat.S_ISLNK(mode):
                fail(f'{path} must not contain symlinks')
            if info.compress_type != ZIP_DEFLATED:
                fail(f'{path} must use DEFLATE compression')
            if info.date_time != EXPECTED_TIME:
                fail(f'{path} has nondeterministic timestamp {info.date_time!r}')
            if info.extra or info.comment or archive.comment:
                fail(f'{path} contains nondeterministic ZIP metadata/comments')
            if archive.testzip() is not None:
                fail(f'{path} failed CRC validation')
            extracted = archive.read(info)
            if extracted != source:
                fail(f'{path}:{EXPECTED_NAME} differs from dist/index.html')
    except BadZipFile as exc:
        fail(f'{path} is not a valid ZIP: {exc}')

if packages[0] != packages[1]:
    fail('stable js13k alias differs byte-for-byte from the versioned release')

digest = sha256(packages[0]).hexdigest()
print(f'PASS: exact root-level {EXPECTED_NAME}; one-file deterministic ZIP; {len(packages[0])}/{LIMIT} bytes; sha256={digest}')
