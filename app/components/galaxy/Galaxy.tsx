"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MAP } from "./map";
import { starD } from "./star";
import { MAP_ARRIVAL_KEY } from "../MapPlanet";

// THE HOMEPAGE NEBULA.
//
// The scene itself (scene.js) is the prototype he locked on 26 Oct, unchanged except for
// a teardown so it survives client-side navigation. This component owns the page around
// it: the hero text, the loader, the strip of pages when a system is open, and what a
// planet click does on the real site, which is fly to the planet and then open that page,
// where the same planet sits at the top with the content beneath it.

type Page = { name: string; href: string; price?: string; children?: number; tex?: string };
type Sys = { id: string; name: string; href: string; line: string; planets: Page[]; belt?: { name: string; count: number; href: string } };

const ASSETS = {
  nebulaWide: "/galaxy/nebula-wide.jpg",
  nebulaTall: "/galaxy/nebula-tall.jpg",
  nebulaWideBlur: "/galaxy/nebula-wide-blur.jpg",
  nebulaTallBlur: "/galaxy/nebula-tall-blur.jpg",
  gasBlue: "/galaxy/gas-blue.jpg",
  gasRust: "/galaxy/gas-rust.jpg",
  planet: "/galaxy/planet-rim.jpg",
  blackhole: "/galaxy/blackhole.jpg",
  star: "/galaxy/star-gold.jpg",
  planets: Object.fromEntries(
    ["websites", "pricing", "portfolio", "casestudies", "digital", "tools", "consulting", "book", "software", "steady", "courses", "company", "blog"].map((k) => [k, `/galaxy/planets/${k}.jpg`]),
  ),
};

function ease(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function Galaxy({ children }: { children: ReactNode }) {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const loaderStar = useRef<SVGPathElement>(null);
  const sceneRef = useRef<{ destroy: () => void; back: () => void; selectPlanet: (h: string, n?: boolean) => void } | null>(null);
  const [sys, setSys] = useState<Sys | null>(null);
  const [opening, setOpening] = useState<Page | null>(null);
  const [loader, setLoader] = useState<"on" | "out" | "gone">("on");

  // Loader: the Ratchet mark on black until the scene's textures are in, then half a second out.
  useEffect(() => {
    let on = true;
    const t0 = performance.now();
    const tick = () => {
      if (!on) return;
      const t = performance.now() - t0;
      const step = Math.floor(t / 1400), f = Math.min(1, (t % 1400) / 700);
      loaderStar.current?.setAttribute("d", starD(-(step + ease(f)) * 60));
      requestAnimationFrame(tick);
    };
    tick();
    return () => { on = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    const phone = window.matchMedia("(max-width:760px)").matches;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = new Promise((r) => setTimeout(r, 700));
    import("./scene").then(({ createGalaxy }) => {
      if (!alive || !stageRef.current || !labelsRef.current) return;
      const g = createGalaxy(stageRef.current, {
        map: MAP,
        phone,
        reducedMotion: rm,
        labelsRoot: labelsRef.current,
        starD,
        assets: ASSETS,
        onFocus(s: Sys | null) { setSys(s); },
        // The comet (the blog) opens its page directly. Until 26 Oct this handler was
        // never passed, so clicking the comet did nothing.
        onOpen(p: Page) { setOpening(p); setTimeout(() => router.push(p.href), 500); },
        onPlanet(p: Page | null) {
          if (!p) { setOpening(null); return; }
          setOpening(p);
          try { sessionStorage.setItem(MAP_ARRIVAL_KEY, p.href.split("#")[0]); } catch {}
          setTimeout(() => router.push(p.href), 1100);
        },
      });
      sceneRef.current = g;
      Promise.all([g.ready, hold]).then(() => {
        if (!alive) return;
        setLoader("out");
        setTimeout(() => setLoader("gone"), 380);
      });
    }).catch(() => setLoader("gone"));
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") sceneRef.current?.back(); };
    window.addEventListener("keydown", esc);
    return () => {
      alive = false;
      window.removeEventListener("keydown", esc);
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, [router]);

  const pick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    sceneRef.current?.selectPlanet(href, true);
  };

  return (
    <div className={`gx-home${opening ? " gx-opening" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: GX_CSS }} />
      {loader !== "gone" && (
        <div className={`gx-loader${loader === "out" ? " is-out" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 800 800">
            <defs>
              <linearGradient id="gxlf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7a5a22" /><stop offset=".5" stopColor="#c0913a" /><stop offset="1" stopColor="#8c6a27" /></linearGradient>
              <clipPath id="gxlhx"><path d="M400 40 L88.231 220 L88.231 580 L400 760 L711.769 580 L711.769 220Z" /></clipPath>
            </defs>
            <path d="M400 40 L88.231 220 L88.231 580 L400 760 L711.769 580 L711.769 220Z" fill="url(#gxlf)" />
            <g clipPath="url(#gxlhx)"><path ref={loaderStar} fill="#000" d={starD(0)} /></g>
          </svg>
        </div>
      )}

      <div className="gx-top" id="top">
        <div className="gx-stage" ref={stageRef}><div className="gx-labels" ref={labelsRef} /></div>
        <div className="gx-vig" aria-hidden="true" />
        <div className="gx-hero">{children}</div>
        <p className="gx-hint">Click any light to open it.</p>
        <a className="gx-cue" href="#what">Scroll <span /></a>

        <aside className={`gx-strip${sys && !opening ? " is-open" : ""}`} aria-live="polite">
          <button type="button" className="ui-btn ui-btn--ghost gx-back" onClick={() => sceneRef.current?.back()}>Back to the map</button>
          {sys && (
            <>
              <div><h2>{sys.name}</h2><p className="gx-line">{sys.line}</p></div>
              <ul>
                {sys.planets.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} onClick={(e) => pick(e, p.href)}>
                      <b>{p.name}</b>
                      <small>{p.price || (p.children ? `${p.children} ${p.children === 1 ? "page" : "pages"}` : " ")}</small>
                    </Link>
                  </li>
                ))}
                {sys.belt && (
                  <li><Link href={sys.belt.href}><b>{sys.belt.name}</b><small>{sys.belt.count} tools</small></Link></li>
                )}
              </ul>
            </>
          )}
        </aside>

        <div className={`gx-opening-line${opening ? " is-on" : ""}`} aria-live="polite">
          {opening && <><h2>{opening.name}</h2><p>{opening.price || "Opening the page"}</p></>}
        </div>
      </div>
    </div>
  );
}

const GX_CSS = `
.gx-top{position:relative;height:100dvh;min-height:560px;overflow:hidden;background:var(--bg)}
.gx-stage{position:absolute;inset:0;z-index:0}
.gx-stage::after{content:"";position:absolute;left:0;right:0;bottom:0;height:38%;background:linear-gradient(rgba(7,6,10,0),rgba(7,6,10,.5) 50%,var(--bg));pointer-events:none;z-index:1}
.gx-labels{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2}
.gx-label{position:absolute;left:0;top:0;white-space:nowrap;font:700 13px/1 var(--font-body);letter-spacing:.02em;color:#e8c777;opacity:.92;transition:opacity .4s,color .2s;text-shadow:0 1px 10px #000,0 0 2px #000}
.gx-label.gx-core{font:600 15px/1 var(--font-display);letter-spacing:.06em;color:#d2b26c}
.gx-label.gx-hot{color:#fff0c8}
.gx-label.gx-dim{opacity:.25}
.gx-label.gx-hide{opacity:0 !important}
.gx-label.gx-planet{opacity:0;font-weight:400;color:#efe8d8}
.gx-label.gx-planet.gx-show{opacity:.95}
.gx-vig{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse at 50% 42%,rgba(7,6,10,0) 28%,rgba(7,6,10,.55) 62%,rgba(7,6,10,.92) 100%);opacity:0;transition:opacity .8s}
.gx-planet .gx-vig{opacity:1}
.gx-hero{position:absolute;left:0;top:0;bottom:0;z-index:4;display:flex;flex-direction:column;justify-content:center;gap:18px;padding-block:110px 56px;padding-left:var(--gutter);padding-right:var(--gutter-r);width:min(600px,100%);pointer-events:none;background:linear-gradient(90deg,rgba(7,6,10,.82),rgba(7,6,10,.55) 70%,rgba(7,6,10,0));transition:opacity .4s}
.gx-hero>*{pointer-events:auto}
.gx-hero h1{font:600 clamp(34px,5.2vw,62px)/1.04 var(--font-display);margin:0;letter-spacing:-.01em}
.gx-hero p{margin:0;max-width:44ch;color:#cfc6b2;font-size:18px}
.gx-hint{position:absolute;z-index:4;bottom:max(16px,env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);color:var(--muted);font-size:14px;white-space:nowrap;margin:0;transition:opacity .4s}
.gx-cue{position:absolute;z-index:4;right:calc(var(--gutter-r) + 76px);bottom:max(18px,env(safe-area-inset-bottom,0px));color:#cfc6b2;font-size:14px;text-decoration:none;display:flex;align-items:center;gap:8px;transition:opacity .4s}
.gx-cue span{display:inline-block;width:1px;height:34px;background:#cfc6b2;opacity:.6}
.gx-focused .gx-hero,.gx-focused .gx-hint,.gx-focused .gx-cue{opacity:0;pointer-events:none}
.gx-focused .gx-hero>*{pointer-events:none}
.gx-strip{position:absolute;z-index:6;left:0;right:0;bottom:0;padding-block:18px max(18px,env(safe-area-inset-bottom,0px));padding-left:var(--gutter);padding-right:var(--gutter-r);background:linear-gradient(rgba(7,6,10,0),rgba(7,6,10,.9) 30%);transform:translateY(110%);transition:transform .5s cubic-bezier(.2,.7,.2,1);display:grid;grid-template-columns:minmax(0,280px) minmax(0,1fr);gap:10px 40px;align-items:end}
.gx-strip.is-open{transform:none}
.gx-strip h2{font:600 30px/1.05 var(--font-display);margin:0}
.gx-line{margin:6px 0 0;color:#cfc6b2;font-size:15px;max-width:34ch}
.gx-strip ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;row-gap:14px}
.gx-strip li{padding:0 22px;border-left:1px solid rgba(239,232,216,.18)}
.gx-strip li:first-child{padding-left:0;border-left:0}
.gx-strip li a{display:block;text-decoration:none;color:var(--fg)}
.gx-strip li a b{display:block;font:600 19px/1.15 var(--font-display);transition:color .2s}
.gx-strip li a small{display:block;color:#b3a98f;font-size:13px;margin-top:3px}
.gx-strip li a:hover b{color:#f0d79a}
.gx-back{grid-column:1/-1;justify-self:start;margin-bottom:4px}
.gx-opening-line{position:absolute;z-index:6;left:var(--gutter);bottom:max(28px,env(safe-area-inset-bottom,0px));opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s}
.gx-opening-line.is-on{opacity:1;transform:none}
.gx-opening-line h2{font:600 clamp(28px,4vw,46px)/1.05 var(--font-display);margin:0}
.gx-opening-line p{margin:6px 0 0;color:#cfc6b2}
.gx-loader{position:fixed;inset:0;z-index:200;background:#000;display:flex;align-items:center;justify-content:center;transition:opacity .35s ease}
.gx-loader svg{width:min(34vw,160px);height:auto;transition:opacity .15s ease}
.gx-loader.is-out{opacity:0;pointer-events:none;transition-delay:.15s}
.gx-loader.is-out svg{opacity:0}
@media (max-width:760px){
  .gx-hero{width:100%;justify-content:flex-end;gap:12px;padding-bottom:72px;background:linear-gradient(0deg,rgba(7,6,10,.94) 50%,rgba(7,6,10,0))}
  .gx-hero h1{font-size:clamp(30px,8.6vw,38px)}
  .gx-hero p{font-size:16px}
  .gx-hint,.gx-cue{display:none}
  .gx-hero{background:linear-gradient(0deg,rgba(7,6,10,.96) 38%,rgba(7,6,10,.7) 62%,rgba(7,6,10,0));padding-bottom:40px}
  .gx-strip{grid-template-columns:1fr;max-height:60dvh;overflow:auto;gap:8px}
  .gx-strip h2{font-size:24px}
  .gx-strip ul{flex-direction:column;row-gap:0}
  .gx-strip li{padding:10px 0;border-left:0;border-top:1px solid rgba(239,232,216,.14)}
  .gx-strip li:first-child{border-top:0;padding-top:0}
  .gx-label{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.gx-hint,.gx-cue span{display:none}}`;
