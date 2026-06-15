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
import { useEffect, useRef, useState } from "react";

const GOLD = "#d4af37";

/* ── 1. Preloader ─────────────────────────────────────────────── */
function Preloader() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pv_entered")) { setShow(false); return; }
    const t1 = setTimeout(() => setLeaving(true), 1500);
    const t2 = setTimeout(() => { setShow(false); sessionStorage.setItem("pv_entered", "1"); }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (!show) return null;
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0c0a08",
      display: "grid", placeItems: "center", transition: "opacity 0.7s ease",
      opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : "auto",
    }}>
      <div style={{ textAlign: "center", animation: "pvFxUp 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", color: "#f5f0e0", fontWeight: 700,
          fontSize: "clamp(22px, 5vw, 38px)", letterSpacing: "0.34em", paddingLeft: "0.34em",
        }}>PURCELL VENTURES</div>
        <div style={{ position: "relative", height: 1, width: 220, maxWidth: "60vw", margin: "20px auto 14px", background: "rgba(212,175,55,0.18)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, animation: "pvFxSweep 1.5s ease-in-out forwards" }} />
        </div>
        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase" }}>Entering the Studio</div>
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
  return (<><Preloader /><Cursor /><Ambient /><Reveal /></>);
}
