from pathlib import Path

readme = Path('README.md')
section_path = Path('.github/readme-scoring-section.md')
s = readme.read_text()
section = section_path.read_text().rstrip() + '\n\n'
start = '# Style is mastery, not victory\n'
end = '# Powerups and Lucky 13\n'
if s.count(start) != 1 or s.count(end) != 1:
    raise SystemExit('README scoring section markers drifted')
a = s.index(start)
b = s.index(end, a)
s = s[:a] + section + s[b:]
s = s.replace('**Gold Cob** | 2× Style scoring for six seconds |', '**Gold Cob** | 2× enemy-defeat Style for six seconds |')
readme.write_text(s)
