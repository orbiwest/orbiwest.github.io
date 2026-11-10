from pathlib import Path
from bs4 import BeautifulSoup
import re,json
root=Path(__file__).resolve().parent
issues=[]
for p in root.rglob('*.html'):
 t=p.read_text(errors='ignore'); s=BeautifulSoup(t,'html.parser'); rel=str(p.relative_to(root))
 refresh=s.find('meta',attrs={'http-equiv':lambda v:v and v.lower()=='refresh'})
 if refresh: continue
 if len(s.find_all('h1'))!=1: issues.append((rel,'h1-count'))
 if not s.find('meta',attrs={'http-equiv':'Content-Security-Policy'}): issues.append((rel,'csp-meta-missing'))
 if re.search(r'\son[a-z]+\s*=',t,re.I): issues.append((rel,'inline-handler'))
 for img in s.find_all('img'):
  if img.get('alt') is None: issues.append((rel,'img-alt'))
  if not img.get('width') or not img.get('height'): issues.append((rel,'img-dimensions:'+img.get('src','')))
 for a in s.find_all('a'):
  href=a.get('href','')
  if href.startswith('/') and not href.startswith('//'):
   ref=href.split('#',1)[0].split('?',1)[0]
   if not ref or ref=='/': target=root/'index.html'
   elif ref.endswith('/'): target=root/ref.lstrip('/')/'index.html'
   else: target=root/ref.lstrip('/')
   if not target.exists(): issues.append((rel,'broken:'+ref))
print(json.dumps({'issues':issues,'count':len(issues)},indent=2))
raise SystemExit(1 if issues else 0)
