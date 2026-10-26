import os,json,sys,re
from playwright.sync_api import sync_playwright
S=os.path.dirname(os.path.abspath(__file__))
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:4311'
out=sys.argv[2] if len(sys.argv)>2 else S+'/ledger.json'
paths=[l.strip() for l in open(S+'/paths.txt') if l.strip() and not l.strip().endswith(('.xml','.txt'))]
JS="""()=>{const T=e=>(e.innerText||e.textContent||'').replace(/\\s+/g,' ').trim();const q=s=>[...document.querySelectorAll(s)];
const m=n=>(document.querySelector(n)||{}).content||'';
return {title:document.title,desc:m('meta[name=description]'),
h:q('h1,h2,h3').map(e=>e.tagName.toLowerCase()+' '+T(e)).filter(x=>x.length>3),
links:[...new Set(q('a[href]').map(a=>{const h=a.getAttribute('href');return h+' :: '+T(a).slice(0,60)}))],
buttons:[...new Set(q('button,input[type=submit]').map(b=>T(b)||b.value||b.getAttribute('aria-label')||''))].filter(Boolean),
fields:q('input:not([type=hidden]):not([type=submit]),textarea,select').map(f=>(f.name||f.id||'')+' :: '+(f.placeholder||'')+' :: '+(f.labels&&f.labels[0]?T(f.labels[0]):'')),
prices:[...new Set((document.body.innerText.match(/\\$[0-9][0-9,]*(?:\\.[0-9]+)?(?:\\s*(?:\\/|a|per)\\s*\\w+)?/g)||[]))],
images:q('img').map(i=>(i.getAttribute('alt')||'')+' :: '+(i.getAttribute('src')||'').slice(0,80)),
words:document.body.innerText.split(/\\s+/).length}}"""
led={}
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':900})
    for path in paths:
        pg=ctx.new_page()
        try:
            r=pg.goto(base+path,timeout=45000,wait_until='networkidle'); pg.wait_for_timeout(400)
            d=pg.evaluate(JS); d['status']=r.status if r else None; d['final']=pg.url.replace(base,''); led[path]=d
        except Exception as e: led[path]={'error':str(e)[:160]}
        pg.close()
    b.close()
json.dump(led,open(out,'w'),indent=1)
n=sum(len(v.get('links',[]))+len(v.get('h',[]))+len(v.get('prices',[]))+len(v.get('fields',[]))+len(v.get('buttons',[])) for v in led.values())
print(len(led),'routes,',n,'ledger items ->',out)
