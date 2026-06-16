"use client";
/**
 * SiteFX — a site-wide "wow" motion/effects layer. Pure visual enhancement,
 * added once in layout.tsx; it touches NO page content. Four parts:
 *   1. Preloader  — a branded Cinzel intro gate (once per session)
 *   2. Cursor     — a custom gold ring cursor that reacts to interactive els (desktop only)
 *   3. Ambient    — a subtle gold particle/filament field over warm-black (screen blend)
 *   4. Reveal     — cinematic scroll reveals auto-applied to sections + cards
 * All progressive-enhanced (no JS / reduced-motion / touch → graceful), brand gold #d4af37.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { PanopticonMark } from "./PanopticonMark";

const GOLD = "#d4af37";

/* ── 1. Intro — spy opening-credits sequence: shader bg + 7 timed scenes + gun-barrel iris ── */
const PV_VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
const PV_FRAG = `precision highp float;
uniform vec2 u_res; uniform float u_time; uniform float u_intensity;
float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.02+vec2(11.3,7.7); a*=0.5; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy; vec2 p=uv; p.x*=u_res.x/u_res.y;
  float t=u_time*0.045;
  vec2 q=vec2(fbm(p*1.6+vec2(0.0,t)),fbm(p*1.6+vec2(5.2,-t)));
  vec2 r=vec2(fbm(p*1.6+3.0*q+vec2(1.7,9.2)+t*0.5),fbm(p*1.6+3.0*q+vec2(8.3,2.8)-t*0.4));
  float f=fbm(p*1.7+3.2*r);
  vec2 lp=vec2(0.5*(u_res.x/u_res.y)+sin(u_time*0.45)*0.18,0.34);
  float d=distance(p,lp); float glow=smoothstep(0.95,0.0,d);
  vec3 nearBlack=vec3(0.047,0.039,0.031),amber=vec3(0.35,0.22,0.06),gold=vec3(0.831,0.686,0.216),goldLight=vec3(0.91,0.79,0.42);
  float field=f+0.18*r.x+0.12*q.y;
  vec3 col=nearBlack;
  col=mix(col,amber,smoothstep(0.35,0.85,field)*0.85);
  col=mix(col,gold,smoothstep(0.62,1.05,field)*0.65*(0.4+glow));
  col+=goldLight*pow(glow,2.2)*0.55;
  float fil=smoothstep(0.78,0.82,fbm(p*3.0+r*2.0+t*1.2));
  col+=gold*fil*0.12*glow;
  float vig=smoothstep(1.25,0.25,distance(uv,vec2(0.5)));
  col*=0.55+0.45*vig;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.015;
  col*=u_intensity;
  gl_FragColor=vec4(col,1.0);
}`;

function IntroSequence() {
  const [active, setActive] = useState(true);
  const [scene, setScene] = useState(1);   // 1..7 storyboard scenes
  const [leaving, setLeaving] = useState(false);
  const sh = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef(1);
  const intensity = useRef(0.25);

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined") sessionStorage.setItem("pv_entered", "1");
    setLeaving(true);
    setTimeout(() => setActive(false), 950);
  }, []);

  // scene timeline (slowed, opening-credits pacing)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pv_entered")) { setActive(false); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScene(7); sceneRef.current = 7; intensity.current = 0.85;
      const t = setTimeout(dismiss, 2000); return () => clearTimeout(t);
    }
    const marks: [number, number][] = [[2, 950], [3, 1950], [4, 2900], [5, 4000], [6, 4950], [7, 6200]];
    const timers = marks.map(([s, at]) => setTimeout(() => { setScene(s); sceneRef.current = s; }, at));
    const safety = setTimeout(dismiss, 13000);
    return () => { timers.forEach(clearTimeout); clearTimeout(safety); };
  }, [dismiss]);

  // dismiss on first scroll/click once we reach the lock
  useEffect(() => {
    if (scene < 6) return;
    const go = () => dismiss();
    const opt = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", go, opt); window.addEventListener("touchmove", go, opt);
    window.addEventListener("click", go, { once: true }); window.addEventListener("keydown", go, { once: true });
    return () => {
      window.removeEventListener("wheel", go); window.removeEventListener("touchmove", go);
      window.removeEventListener("click", go); window.removeEventListener("keydown", go);
    };
  }, [scene, dismiss]);

  // WebGL fluid-gold shader background — swells into the climax via u_intensity
  useEffect(() => {
    const c = sh.current; if (!c) return;
    let gl: WebGLRenderingContext | null = null;
    try { gl = (c.getContext("webgl") || c.getContext("experimental-webgl")) as WebGLRenderingContext | null; } catch { /* no webgl */ }
    if (!gl) return;
    const g = gl;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const resize = () => { c.width = Math.floor(innerWidth * dpr); c.height = Math.floor(innerHeight * dpr); g.viewport(0, 0, c.width, c.height); };
    const mk = (type: number, src: string) => { const s = g.createShader(type)!; g.shaderSource(s, src); g.compileShader(s); return s; };
    const prog = g.createProgram()!;
    g.attachShader(prog, mk(g.VERTEX_SHADER, PV_VERT));
    g.attachShader(prog, mk(g.FRAGMENT_SHADER, PV_FRAG));
    g.linkProgram(prog); g.useProgram(prog);
    const buf = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, "p"); g.enableVertexAttribArray(loc); g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
    const uRes = g.getUniformLocation(prog, "u_res"), uTime = g.getUniformLocation(prog, "u_time"), uInt = g.getUniformLocation(prog, "u_intensity");
    resize(); window.addEventListener("resize", resize);
    const start = performance.now(); let raf = 0;
    const targetFor = (s: number) => (s <= 2 ? 0.42 : s <= 4 ? 0.58 : s === 5 ? 0.82 : s === 6 ? 1.05 : 0.85);
    const frame = (now: number) => {
      intensity.current += (targetFor(sceneRef.current) - intensity.current) * 0.04;
      g.uniform2f(uRes, c.width, c.height); g.uniform1f(uTime, (now - start) / 1000); g.uniform1f(uInt, intensity.current);
      g.drawArrays(g.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  if (!active) return null;
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0c0a08", overflow: "hidden",
      clipPath: leaving ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
      transition: "clip-path 0.95s cubic-bezier(0.76,0,0.24,1)",
    }}>
      <canvas ref={sh} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      {/* film grain + vignette texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", animation: "pvGrain 0.5s steps(4) infinite" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 46%, transparent 40%, rgba(0,0,0,0.72) 100%)" }} />

      {/* SCENE 1 — ignition dot */}
      {scene <= 2 && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5f0e0", boxShadow: `0 0 16px 4px ${GOLD}`, animation: "pvDrift 1.2s ease-in-out both", opacity: scene === 1 ? 1 : 0, transition: "opacity 0.5s" }} />
      </div>}

      {/* SCENE 2 — barrel iris (rifled ring opening) */}
      {scene >= 2 && scene <= 3 && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: scene === 3 ? 0.4 : 1, transition: "opacity 0.6s" }}>
        <div style={{ width: "44vmin", height: "44vmin", borderRadius: "50%", border: `1px solid ${GOLD}`, boxShadow: `0 0 50px ${GOLD}55, inset 0 0 50px ${GOLD}33`, background: "conic-gradient(from 0deg, transparent, rgba(212,175,55,0.16), transparent, rgba(212,175,55,0.16), transparent)", animation: "pvIris 1.1s cubic-bezier(0.16,1,0.3,1) both, pvReticleSpin 7s linear infinite" }} />
      </div>}

      {/* SCENE 3 — bullet-time tracer */}
      {scene === 3 && <>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "32vw", height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, #fff)`, filter: `blur(0.6px) drop-shadow(0 0 7px ${GOLD})`, mixBlendMode: "screen", animation: "pvTracer 1s cubic-bezier(0.2,0.7,0.3,1) both" }} />
        <div style={{ position: "absolute", inset: 0, background: "#fff", mixBlendMode: "screen", opacity: 0, animation: "pvFlash 1s ease-out both" }} />
      </>}

      {/* SCENE 4 — dossier stamp */}
      {scene >= 3 && scene <= 5 && <div style={{ position: "absolute", left: "8%", bottom: "15%", fontFamily: "var(--font-dm-sans), monospace", color: "rgba(245,240,224,0.92)", fontSize: 11, letterSpacing: "0.16em", lineHeight: 2.3, opacity: scene === 4 || scene === 5 ? 1 : 0, transition: "opacity 0.5s" }}>
        {["PURCELL VENTURES", "34.0658° N · 84.6769° W", "EST. 2026 — ACWORTH GA", "AN AI-FORWARD STUDIO"].map((l, i) => (
          <div key={i} style={{ animation: `pvType 0.55s ${i * 0.18}s both`, color: i === 3 ? GOLD : undefined }}>{l}</div>
        ))}
      </div>}

      {/* SCENE 5 — crosshair lock */}
      {scene === 5 && <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <g style={{ transformOrigin: "50px 50px", animation: "pvConverge 0.75s cubic-bezier(0.76,0,0.24,1) both" }}>
          {[[50, 30, 50, 41], [50, 59, 50, 70], [30, 50, 41, 50], [59, 50, 70, 50]].map((c, i) => (
            <line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke={GOLD} strokeWidth="0.4" />
          ))}
          <circle cx="50" cy="50" r="13" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.3" strokeDasharray="1.5 2.5" />
        </g>
      </svg>}

      {/* SCENE 6/7 — the lock: panopticon mark + wordmark */}
      {scene >= 6 && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 26, animation: "pvMarkIn 1.1s cubic-bezier(0.16,1,0.3,1) both" }}>
            <PanopticonMark size={146} cfg={{ numGroups: 8, includeFlankers: true, numRings: 10, ringFadeToCenter: true }} />
          </div>
          {scene >= 7 && <>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.3em", fontFamily: "var(--font-cinzel), serif", color: "#f5f0e0", fontWeight: 700, fontSize: "clamp(22px, 5vw, 42px)", letterSpacing: "0.18em" }}>
              <span style={{ animation: "pvSpyHit 0.6s 0.05s both" }}>PURCELL</span>
              <span style={{ animation: "pvSpyHit 0.6s 0.24s both" }}>VENTURES</span>
            </div>
            <div style={{ marginTop: 24, fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase", animation: "pvFxPulse 2s 0.9s ease-in-out infinite" }}>Scroll to enter ↓</div>
          </>}
        </div>
      </div>}
    </div>
  );
}

/* ── 2. Gold cursor (desktop, fine-pointer only) ──────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("pv-fx-cursor");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const rg = { x: pos.x, y: pos.y };
    let hover = false, raf = 0;
    const move = (e: MouseEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, input, textarea, select, [role=button], label");
    };
    const loop = () => {
      rg.x += (pos.x - rg.x) * 0.18; rg.y += (pos.y - rg.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rg.x}px, ${rg.y}px) scale(${hover ? 1.8 : 1})`;
        ring.current.style.opacity = hover ? "1" : "0.6";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", move); document.documentElement.classList.remove("pv-fx-cursor"); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: GOLD, zIndex: 9998, pointerEvents: "none", boxShadow: `0 0 8px ${GOLD}` }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 34, height: 34, marginLeft: -17, marginTop: -17, borderRadius: "50%", border: `1px solid ${GOLD}`, zIndex: 9998, pointerEvents: "none", transition: "opacity 0.2s, width 0.2s, height 0.2s" }} />
    </>
  );
}

/* ── 3. Ambient gold field (screen blend so it only adds light) ── */
function Ambient() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current; if (!c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      const n = coarse ? 26 : 60;
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.4 }));
    };
    resize(); addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]; const dx = p.x - q.x, dy = p.y - q.y; const d = Math.hypot(dx, dy);
          if (d < 150) { ctx.strokeStyle = `rgba(212,175,55,${0.10 * (1 - d / 150)})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = `rgba(232,201,106,0.55)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={cv} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", mixBlendMode: "screen", opacity: 0.5 }} />;
}

/* ── 4. Scroll reveals — auto-applied to sections + cards ──────── */
function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = "section, [class*='card' i], [class*='Card'], main > div > div";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel))
      .filter((el) => el.offsetHeight > 40 && el.offsetHeight < innerHeight * 1.8 && !el.dataset.pvSeen);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).classList.add("pv-in"); io.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    for (const el of els) {
      el.dataset.pvSeen = "1";
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) { el.classList.add("pv-in"); continue; } // already visible: no hide
      el.classList.add("pv-reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}

export default function SiteFX() {
  return (<><IntroSequence /><Cursor /><Ambient /><Reveal /></>);
}
