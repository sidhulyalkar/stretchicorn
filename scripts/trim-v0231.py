from pathlib import Path
p=Path('src/04-ui-input.js')
s=p.read_text()
s=s.replace("FIRST FLIGHT • LEARN THE LIVING SCAR","FIRST FLIGHT • LEARN THE SCAR")
s=s.replace("txt('ESC / TOP-RIGHT TO SKIP PRACTICE',W/2,608,9,'#747e80','center');","")
s=s.replace("THE SCAR IS MOVEMENT, WEAPON, AND SECOND LIFE.","SCAR = MOVE + WEAPON + SECOND LIFE.")
p.write_text(s)
