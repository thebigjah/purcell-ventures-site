"use client";
/**
 * SiteFX — site-wide "wow" layer (visual only, no page content touched):
 *   1. IntroSequence — a 3D spy opening-credits journey (ThreeScene) that flies
 *      through a rifled gold tunnel, orbits a bullet-time burst, the gold fluid
 *      washes past the lens, then arrives clean on the panopticon mark + wordmark
 *      + founder credit + scroll-to-enter, opening into the site via a gun-barrel iris.
 *   2. Cursor  — custom gold ring cursor (desktop)
 *   3. Ambient — subtle gold particle field (screen blend)
 *   4. Reveal  — cinematic scroll reveals auto-applied to sections + cards
 * Progressive-enhanced: no-JS / reduced-motion / no-WebGL / touch all degrade gracefully.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { PanopticonMark } from "./PanopticonMark";
import { ThreeScene } from "./ThreeScene";

const GOLD = "#d4af37";
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ── 1. Intro — 3D spy opening-credits journey ─────────────────── */
function IntroSequence() {
  const [active, setActive] = useState(true);
  const [arrived, setArrived] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [run3d, setRun3d] = useState(false);

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined") sessionStorage.setItem("pv_entered", "1");
    setLeaving(true);
    setTimeout(() => setActive(false), 1000);
  }, []);
  const onArrive = useCallback(() => setArrived(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pv_entered")) { setActive(false); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setArrived(true);
      const t = setTimeout(dismiss, 2400); return () => clearTimeout(t);
    }
    setRun3d(true);
    const safety = setTimeout(() => setArrived(true), 11000); // if onArrive never fires (no webgl)
    return () => clearTimeout(safety);
  }, [dismiss]);

  // dismiss on first scroll/click once arrived
  useEffect(() => {
    if (!arrived) return;
    const go = () => dismiss();
    const opt = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", go, opt); window.addEventListener("touchmove", go, opt);
    window.addEventListener("click", go, { once: true }); window.addEventListener("keydown", go, { once: true });
    return () => {
      window.removeEventListener("wheel", go); window.removeEventListener("touchmove", go);
      window.removeEventListener("click", go); window.removeEventListener("keydown", go);
    };
  }, [arrived, dismiss]);

  if (!active) return null;
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0c0a08", overflow: "hidden",
      clipPath: leaving ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
      transition: "clip-path 1s cubic-bezier(0.76,0,0.24,1)",
    }}>
      {run3d && <ThreeScene onArrive={onArrive} dim={arrived} />}

      {/* film grain texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05, mixBlendMode: "overlay", backgroundImage: GRAIN, animation: "pvGrain 0.5s steps(4) infinite" }} />

      {/* lock overlay — fades in clean after the camera arrives */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: arrived ? "auto" : "none", opacity: arrived ? 1 : 0, transition: "opacity 1s ease 0.25s" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(12,10,8,0.55) 28%, rgba(12,10,8,0.93) 76%)" }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 26, animation: arrived ? "pvMarkIn 1.1s cubic-bezier(0.16,1,0.3,1) both" : undefined }}>
            <PanopticonMark size={148} cfg={{ numGroups: 8, includeFlankers: true, numRings: 10, ringFadeToCenter: true }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.3em", fontFamily: "var(--font-cinzel), serif", color: "#f5f0e0", fontWeight: 700, fontSize: "clamp(22px, 5vw, 42px)", letterSpacing: "0.18em", textShadow: "0 2px 34px rgba(0,0,0,0.9)" }}>
            <span style={{ animation: arrived ? "pvSpyHit 0.6s 0.2s both" : undefined }}>PURCELL</span>
            <span style={{ animation: arrived ? "pvSpyHit 0.6s 0.4s both" : undefined }}>VENTURES</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: "var(--font-dm-sans), monospace", color: GOLD, fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", animation: arrived ? "pvFxUp 0.6s 0.7s both" : undefined }}>Elijah Purcell · Founder</div>
          <div style={{ marginTop: 26, fontFamily: "var(--font-dm-sans), sans-serif", color: "#c4b89e", fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase", textShadow: "0 1px 18px rgba(0,0,0,0.9)", animation: "pvFxPulse 2s 1s ease-in-out infinite" }}>Scroll to enter ↓</div>
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
      if (r.top < innerHeight * 0.92) { el.classList.add("pv-in"); continue; }
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
