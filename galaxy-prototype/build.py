import base64,os,re
H=os.path.expanduser('~/pv-brand')
t=open('index2.tpl.html',encoding='utf-8').read()
def b64(p): return 'data:font/woff2;base64,'+base64.b64encode(open(p,'rb').read()).decode()
F=os.path.expanduser('~/.pv-cleanup-wt/public/fonts/')
t=t.replace('%%CLASH600%%',b64(F+'ClashDisplay-600.woff2')).replace('%%SAT400%%',b64(F+'Satoshi-400.woff2')).replace('%%SAT700%%',b64(F+'Satoshi-700.woff2'))
t=t.replace('%%STARCORE%%',open('star-core.js',encoding='utf-8').read())
data=open('data.js',encoding='utf-8').read().replace('export const MAP','const MAP')+'\nconst PAGES='+open('pages.json',encoding='utf-8').read()+';'
gal=open('galaxy2.js',encoding='utf-8').read().replace('export function createGalaxy','function createGalaxy')
t=t.replace('%%DATA%%',data).replace('%%GALAXY%%',gal)
open('index.html','w',encoding='utf-8').write(t); print(len(t))
