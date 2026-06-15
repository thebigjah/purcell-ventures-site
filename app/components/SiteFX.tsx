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

/* ── 1. Intro sequence — load → pixel-stretch gold wave → logo → scroll-in ── */
function IntroSequence() {
  // phase: 0 loading · 1 wave · 2 brand · 3 leaving
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState(0);
  const cv = useRef<HTMLCanvasElement>(null);

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined") sessionStorage.setItem("pv_entered", "1");
    setPhase(3);
    setTimeout(() => setActive(false), 850);
  }, []);

  // timeline
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pv_entered")) { setActive(false); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      const t = setTimeout(dismiss, 1500);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setPhase(1), 750);
    const t2 = setTimeout(() => setPhase(2), 2150);
    const t3 = setTimeout(dismiss, 7000); // safety auto-dismiss
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [dismiss]);

  // dismiss on first scroll/click once we're on the brand screen
  useEffect(() => {
    if (phase !== 2) return;
    const go = () => dismiss();
    const opt = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", go, opt);
    window.addEventListener("touchmove", go, opt);
    window.addEventListener("click", go, { once: true });
    window.addEventListener("keydown", go, { once: true });
    return () => {
      window.removeEventListener("wheel", go); window.removeEventListener("touchmove", go);
      window.removeEventListener("click", go); window.removeEventListener("keydown", go);
    };
  }, [phase, dismiss]);

  // the pixel-stretch wave: slit-scan a gold panopticon-motif field with a travelling stretch
  useEffect(() => {
    if (phase < 1) return;
    const c = cv.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // offscreen brand-pattern source: gold radial glow + concentric rings + radial cells
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d")!;
    o.fillStyle = "#0c0a08"; o.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.42;
    const grad = o.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
    grad.addColorStop(0, "rgba(232,201,106,0.55)"); grad.addColorStop(0.45, "rgba(212,175,55,0.22)"); grad.addColorStop(1, "rgba(12,10,8,0)");
    o.fillStyle = grad; o.fillRect(0, 0, W, H);
    o.strokeStyle = "rgba(212,175,55,0.5)"; o.lineWidth = 1;
    for (let i = 1; i <= 10; i++) { o.globalAlpha = 0.12 + i * 0.045; o.beginPath(); o.arc(cx, cy, (R / 10) * i, 0, 7); o.stroke(); }
    o.globalAlpha = 1; o.fillStyle = "rgba(212,175,55,0.8)";
    for (let g = 0; g < 36; g++) { const a = (g / 36) * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; o.save(); o.translate(x, y); o.rotate(a); o.fillRect(-2, -14, 4, 28); o.restore(); }

    const slice = coarse ? 5 : 3, sigma = W * 0.06, amp = 1.9, DUR = 1350;
    let raf = 0, start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / DUR);
      const wp = (p * 1.4 - 0.2) * W; // wave x position sweeping L→R
      ctx.clearRect(0, 0, W, H);
      for (let x = 0; x < W; x += slice) {
        const d = x - wp; const gss = Math.exp(-(d * d) / (2 * sigma * sigma));
        const sc = 1 + amp * gss; const sh = H * sc;
        ctx.drawImage(off, x, 0, slice, H, x, (H - sh) / 2, slice, sh);
      }
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (!active) return null;
  const lock = phase >= 2;
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0c0a08", overflow: "hidden",
      clipPath: phase === 3 ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
      transition: "clip-path 0.85s cubic-bezier(0.76,0,0.24,1)",
    }}>
      {/* the signal — slit-scan gold wave */}
      <canvas ref={cv} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: lock ? 0 : phase === 1 ? 1 : 0, transition: "opacity 0.6s ease" }} />
      {/* surveillance vignette + scanline */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 48%, transparent 48%, rgba(0,0,0,0.74) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)", opacity: phase < 2 ? 1 : 0, animation: "pvScan 2.6s linear infinite" }} />

      {/* reticle — sweeps, then locks to center */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: phase === 3 ? 0 : 0.85, transition: "opacity 0.5s" }}>
        <g style={{ transformOrigin: "50px 50px", transition: "transform 0.85s cubic-bezier(0.76,0,0.24,1)", transform: lock ? "scale(0.4)" : "scale(1)" }}>
          <g style={{ transformOrigin: "50px 50px", animation: lock ? "none" : "pvReticleSpin 8s linear infinite" }}>
            <circle cx="50" cy="50" r="22" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.25" strokeDasharray="2 3" />
            <circle cx="50" cy="50" r="31" fill="none" stroke={GOLD} strokeOpacity="0.22" strokeWidth="0.2" />
          </g>
          <line x1="50" y1="34" x2="50" y2="43" stroke={GOLD} strokeWidth="0.3" />
          <line x1="50" y1="57" x2="50" y2="66" stroke={GOLD} strokeWidth="0.3" />
          <line x1="34" y1="50" x2="43" y2="50" stroke={GOLD} strokeWidth="0.3" />
          <line x1="57" y1="50" x2="66" y2="50" stroke={GOLD} strokeWidth="0.3" />
        </g>
      </svg>

      {/* phase 0/1: dossier telemetry */}
      <div style={{ position: "absolute", top: "12%", left: "8%", fontFamily: "var(--font-dm-sans), monospace", color: "rgba(212,175,55,0.82)", fontSize: 10, letterSpacing: "0.16em", lineHeight: 2.1, opacity: lock ? 0 : 1, transition: "opacity 0.4s" }}>
        {["> SECURE CHANNEL ESTABLISHED", "> NODE · ACWORTH GA 30101", "> DECRYPTING STUDIO ASSETS", "> CLEARANCE VERIFIED"].map((l, i) => (
          <div key={i} style={{ animation: `pvFxUp 0.4s ${0.15 + i * 0.24}s both` }}>{l}</div>
        ))}
      </div>

      {/* phase 2: brand lock */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: lock && phase < 3 ? 1 : 0, transition: "opacity 0.6s ease", pointerEvents: phase === 2 ? "auto" : "none" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22, animation: lock ? "pvFxUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : undefined }}>
            <PanopticonMark size={130} cfg={{ numGroups: 8, includeFlankers: true, numRings: 10, ringFadeToCenter: true }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.3em", fontFamily: "var(--font-cinzel), serif", color: "#f5f0e0", fontWeight: 700, fontSize: "clamp(22px, 5vw, 40px)", letterSpacing: "0.18em" }}>
            <span style={{ animation: lock ? "pvSpyHit 0.55s 0.15s both" : undefined }}>PURCELL</span>
            <span style={{ animation: lock ? "pvSpyHit 0.55s 0.34s both" : undefined }}>VENTURES</span>
          </div>
          <div style={{ marginTop: 18, fontFamily: "var(--font-dm-sans), monospace", color: GOLD, fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase", animation: lock ? "pvFxUp 0.5s 0.62s both" : undefined }}>Clearance Granted</div>
          <div style={{ marginTop: 26, fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase", animation: "pvFxPulse 2s 0.9s ease-in-out infinite" }}>Scroll to begin ↓</div>
        </div>
      </div>
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
