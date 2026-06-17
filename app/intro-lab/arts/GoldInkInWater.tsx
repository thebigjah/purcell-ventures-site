"use client";

import { useEffect, useRef } from "react";

/**
 * Gold Ink in Water — Casino Royale / Skyfall fluid title aesthetic.
 * Blooms of gold ink dispersing through black liquid: soft billowing
 * tendrils that expand, swirl, thin out, and fade, continuously.
 *
 * Pure canvas-2d. Layered soft radial gradients + curl-noise drift fake
 * the fluid dispersion. Seamless ~7s loop, forever, cleanup on unmount.
 */
export default function GoldInkInWater() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const LOOP = 7; // seconds — seamless period
    let dpr = 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    // --- Cheap value-noise curl field for organic drift ---------------------
    const NTAB = 256;
    const perm = new Uint8Array(NTAB * 2);
    for (let i = 0; i < NTAB; i++) perm[i] = i;
    for (let i = NTAB - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      const t = perm[i];
      perm[i] = perm[j];
      perm[j] = t;
    }
    for (let i = 0; i < NTAB; i++) perm[NTAB + i] = perm[i];

    const fade = (t: number) => t * t * (3 - 2 * t);
    const valNoise = (x: number, y: number) => {
      const xi = Math.floor(x) & 255;
      const yi = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      const aa = perm[perm[xi] + yi];
      const ab = perm[perm[xi] + yi + 1];
      const ba = perm[perm[xi + 1] + yi];
      const bb = perm[perm[xi + 1] + yi + 1];
      const u = fade(xf);
      const v = fade(yf);
      const top = aa + (ba - aa) * u;
      const bot = ab + (bb - ab) * u;
      return ((top + (bot - top) * v) / 255) * 2 - 1; // -1..1
    };

    // Curl of the noise field → divergence-free swirl, very fluid-looking.
    const curl = (x: number, y: number) => {
      const e = 0.55;
      const n1 = valNoise(x, y + e);
      const n2 = valNoise(x, y - e);
      const n3 = valNoise(x + e, y);
      const n4 = valNoise(x - e, y);
      return { cx: (n1 - n2) / (2 * e), cy: -(n3 - n4) / (2 * e) };
    };

    // --- Ink particles -------------------------------------------------------
    type P = {
      seed: number;
      bx: number; // birth x (0..1)
      by: number; // birth y (0..1)
      phase: number; // 0..1 offset into the loop when it blooms
      life: number; // fraction of loop it lives (so it overlaps neighbours)
      spread: number; // how far the tendril travels
      size: number; // base radius factor
      warm: number; // 0 = deep amber, 1 = bright gold
      drift: number; // angular bias
    };

    const rng = (s: number) => {
      // deterministic pseudo-random from a seed
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const COUNT = Math.max(34, Math.min(64, Math.floor((w * h) / 26000)));
    const parts: P[] = [];
    for (let i = 0; i < COUNT; i++) {
      const r = (k: number) => rng(i * 13.13 + k * 7.77 + 1.234);
      parts.push({
        seed: i * 9.17 + 2.5,
        bx: 0.12 + r(1) * 0.76,
        by: 0.14 + r(2) * 0.72,
        phase: r(3),
        life: 0.55 + r(4) * 0.35,
        spread: 60 + r(5) * 170,
        size: 0.5 + r(6) * 1.1,
        warm: r(7),
        drift: r(8) * Math.PI * 2,
      });
    }

    const TWO_PI = Math.PI * 2;
    // smooth bell that is 0 at t=0 and t=1 → guarantees seamless fade in/out
    const bell = (t: number) => {
      const s = Math.sin(Math.PI * t);
      return s * s; // 0..1..0
    };

    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = ((now - start) / 1000) % LOOP;
      const gt = elapsed / LOOP; // global loop time 0..1

      // Deep liquid base with a faint warm vignette glow at center.
      const base = ctx.createRadialGradient(
        w * 0.5,
        h * 0.52,
        0,
        w * 0.5,
        h * 0.52,
        Math.max(w, h) * 0.75
      );
      base.addColorStop(0, "#15110a");
      base.addColorStop(0.55, "#0e0b07");
      base.addColorStop(1, "#0c0a08");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        // local life time, wrapped — each particle blooms at its own phase
        let lt = gt - p.phase;
        if (lt < 0) lt += 1;
        // only alive during its life window
        const local = lt / p.life;
        if (local > 1) continue;

        const grow = local; // 0..1 dispersion progress
        const env = bell(local); // overall opacity envelope (seamless)

        // Curl-driven swirl: walk a few steps so each particle smears into
        // a billowing tendril rather than a static dot.
        const STEPS = 5;
        for (let s = 0; s < STEPS; s++) {
          const f = s / (STEPS - 1); // 0 = core, 1 = tail
          // tendril position: start at birth, sweep outward along curl flow
          const t = grow * (0.6 + f * 0.9);
          const cx0 = p.bx * w;
          const cy0 = p.by * h;
          const c = curl(
            p.bx * 3.0 + Math.cos(p.drift) * t * 1.4,
            p.by * 3.0 + Math.sin(p.drift) * t * 1.4
          );
          const ang = p.drift + c.cx * 2.2;
          const dist = p.spread * t;
          const px =
            cx0 +
            Math.cos(ang) * dist +
            c.cx * 26 * t -
            Math.cos(p.drift) * 4;
          const py =
            cy0 +
            Math.sin(ang) * dist +
            c.cy * 26 * t +
            // slight buoyant rise, like ink in still water
            -18 * grow;

          // radius grows as ink disperses; tail blobs are larger + softer
          const radius =
            (10 + grow * 90) * p.size * (0.55 + f * 0.85) + 6;

          // alpha: core brighter, tail fainter; fades as it thins out
          const tail = 1 - f * 0.7;
          const a = env * tail * (0.16 + 0.12 * (1 - grow));

          const g = ctx.createRadialGradient(px, py, 0, px, py, radius);
          // warm amber core → gold mid → transparent edge (no hard edges)
          const coreA = a;
          const midA = a * 0.55;
          if (p.warm > 0.5) {
            g.addColorStop(0, `rgba(232,201,106,${coreA.toFixed(3)})`);
            g.addColorStop(0.4, `rgba(212,175,55,${midA.toFixed(3)})`);
          } else {
            g.addColorStop(0, `rgba(212,175,55,${coreA.toFixed(3)})`);
            g.addColorStop(0.4, `rgba(168,124,40,${midA.toFixed(3)})`);
          }
          g.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, TWO_PI);
          ctx.fill();
        }
      }

      // A soft global gold haze that breathes with the loop for cohesion.
      const breath = 0.04 + 0.03 * (0.5 + 0.5 * Math.sin(gt * TWO_PI));
      const haze = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.6
      );
      haze.addColorStop(0, `rgba(212,175,55,${breath.toFixed(3)})`);
      haze.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0c0a08",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
