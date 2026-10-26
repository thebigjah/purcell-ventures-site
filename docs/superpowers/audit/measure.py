import os,json
from playwright.sync_api import sync_playwright
S=os.path.dirname(os.path.abspath(__file__))
SITES=[("lusion","https://lusion.co"),("activetheory","https://activetheory.net"),("igloo","https://www.igloo.inc"),("resn","https://resn.co.nz"),("locomotive","https://locomotive.ca/en"),("hellomonday","https://www.hellomonday.com"),("unseen","https://unseen.co"),("obys","https://obys.agency")]
JS="""()=>{const cs=e=>e?getComputedStyle(e):null;const pick=(sel)=>{const e=[...document.querySelectorAll(sel)].find(x=>x.getBoundingClientRect().height>0);if(!e)return null;const c=cs(e);return {font:c.fontFamily.split(',')[0],size:c.fontSize,weight:c.fontWeight,color:c.color,ls:c.letterSpacing,lh:c.lineHeight,tt:c.textTransform,text:(e.innerText||'').slice(0,80)}};
const b=cs(document.body);const canv=document.querySelectorAll('canvas').length;const fonts=[...new Set([...document.querySelectorAll('h1,h2,h3,p,a,button,span,li')].slice(0,400).map(e=>cs(e).fontFamily.split(',')[0].replace(/"/g,'')))];
const nav=document.querySelector('nav,header');const navc=nav?cs(nav):null;
return {bg:b.backgroundColor,color:b.color,bodyFont:b.fontFamily.split(',')[0],canvases:canv,fonts,h1:pick('h1'),h2:pick('h2'),p:pick('main p, p'),a:pick('nav a, header a'),button:pick('button, a[class*=btn], a[class*=button]'),nav:navc?{bg:navc.backgroundColor,pos:navc.position,h:nav.getBoundingClientRect().height}:null,
radii:[...new Set([...document.querySelectorAll('button,a,div')].slice(0,600).map(e=>cs(e).borderRadius).filter(r=>r&&r!=='0px'))].slice(0,8),
shadows:[...document.querySelectorAll('div,a,button')].slice(0,600).filter(e=>cs(e).boxShadow!=='none').length,
title:document.title,links:document.querySelectorAll('a').length,scrollH:document.documentElement.scrollHeight}}"""
res={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,url in SITES:
        for w,h in ((1280,800),(390,844)):
            ctx=b.new_context(viewport={'width':w,'height':h},user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",device_scale_factor=1)
            pg=ctx.new_page()
            try:
                pg.goto(url,timeout=60000,wait_until='domcontentloaded'); pg.wait_for_timeout(6000)
                pg.screenshot(path=f'{S}/{name}-{w}.png'); pg.mouse.wheel(0,900); pg.wait_for_timeout(1500); pg.screenshot(path=f'{S}/{name}-{w}-scrolled.png')
                res[f'{name}-{w}']=pg.evaluate(JS)
            except Exception as e: res[f'{name}-{w}']={'error':str(e)[:160]}
            ctx.close()
    b.close()
json.dump(res,open(S+'/measure.json','w'),indent=1)
for k,v in res.items(): print(k, v.get('error') or (v['bg'],v['bodyFont'],v['canvases'],(v['h1']or{}).get('font'),(v['h1']or{}).get('size'),v['fonts'][:4]))
