import os,json
from playwright.sync_api import sync_playwright
S=os.path.dirname(os.path.abspath(__file__))
paths=[l.strip() for l in open(S+'/paths.txt') if l.strip()]
out=[]
JS="""()=>{const q=s=>[...document.querySelectorAll(s)];
return {desc:(document.querySelector('meta[name=description]')||{}).content||'',
ogt:(document.querySelector('meta[property="og:title"]')||{}).content||'',
ogd:(document.querySelector('meta[property="og:description"]')||{}).content||'',
attrs:[...new Set(q('[aria-label],[placeholder],img[alt],[title]').flatMap(e=>[e.getAttribute('aria-label'),e.getAttribute('placeholder'),e.getAttribute('alt'),e.getAttribute('title')]).filter(Boolean))],
hidden:[...new Set(q('details:not([open]) > *:not(summary)').map(e=>e.innerText||e.textContent).filter(Boolean))]}}"""
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':900})
    for path in paths:
        pg=ctx.new_page()
        try:
            r=pg.goto('http://localhost:4311'+path,timeout=45000,wait_until='networkidle'); pg.wait_for_timeout(500)
            st=r.status if r else None; title=pg.title(); txt=pg.inner_text('body'); m=pg.evaluate(JS)
            txt+= '\n'+'\n'.join(pg.evaluate("()=>[...document.querySelectorAll('details:not([open])')].map(d=>d.textContent)"))
            slug=(path.strip('/') or 'home').replace('/','__')
            open(f'{S}/text/{slug}.txt','w').write(f'URL: {path}\nSTATUS: {st}\nTITLE: {title}\nDESC: {m["desc"]}\nOGT: {m["ogt"]}\nOGD: {m["ogd"]}\nATTRS: '+' | '.join(m['attrs'])+'\n\n'+txt)
            pg.screenshot(path=f'{S}/shots/{slug}.png',full_page=False)
            out.append({'path':path,'status':st,'title':title,'final':pg.url})
        except Exception as e: out.append({'path':path,'error':str(e)[:160]})
        pg.close()
    b.close()
json.dump(out,open(S+'/index.json','w'),indent=1)
print(sum(1 for o in out if o.get('status')==200),'ok of',len(out)); print([o for o in out if o.get('status')!=200])
