from pathlib import Path
p=Path('scripts/apply-v024.py')
s=p.read_text()
old='''def subf(s,name,next_name,new):
    p=rf"function {name}\\\\([^\\\\n]*?\\\\)\\\\{{.*?\\\\}}\\\\nfunction {next_name}\\\\("
    r=new+"\\nfunction "+next_name+"("
    s,n=re.subn(p,r,s,count=1,flags=re.S)
    if n!=1: raise SystemExit('replace failed '+name)
    return s
'''
new='''def subf(s,name,next_name,new):
    a=s.find('function '+name+'(')
    b=s.find('\\nfunction '+next_name+'(',a)
    if a<0 or b<0: raise SystemExit('replace failed '+name)
    return s[:a]+new+s[b:]
'''
if old not in s: raise SystemExit('subf seam missing')
p.write_text(s.replace(old,new,1))
