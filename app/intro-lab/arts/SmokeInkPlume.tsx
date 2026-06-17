"use client";

import { useEffect, useRef } from "react";

export default function SmokeInkPlume() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    resize();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    const LOOP = 8000; // ms — seamless period

    // Pseudo-noise: layered sines, periodic in t so the loop is seamless.
    const curl = (x: number, y: number, t: number) => {
      const a = Math.sin(t) ;
      const b = Math.cos(t) ;
      const nx =
        Math.sin(y * 2.1 + a * 2.0) * 0.6 +
        Math.sin(y * 4.7 - b * 3.1 + x * 1.3) * 0.3 +
        Math.sin(y * 9.3 + a * 1.7) * 0.18;
      return nx;
    };

    // Persistent particle field. Each particle has a phase offset so the
    // overall field is statistically constant -> seamless loop.
    type P = {
      seed: number; // 0..1, stable identity
      bx: number; // base horizontal anchor (-1..1)
      speed: number; // life cycles per loop
      size: number;
      hue: number; // 0..1 toward lighter gold
      sway: number;
    };

    const COUNT = Math.max(
      70,
      Math.min(150, Math.floor((width * height) / 9000))
    );
    const rng = (() => {
      let s = 1337;
      return () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    })();

    const particles: P[] = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        seed: rng(),
        bx: (rng() * 2 - 1) * 0.18,
        speed: 1 + Math.floor(rng() * 2), // 1 or 2 cycles per loop
        size: 0.5 + rng() * 1.0,
        hue: rng(),
        sway: 0.5 + rng() * 1.5,
      });
    }

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const tNorm = elapsed / LOOP; // 0..1
      const tau = tNorm * Math.PI * 2;

      // Fade background — warm near-black, slight ambient floor glow.
      ctx.globalCompositeOperation = "source-over";
      const bg = ctx.createLinearGradient(0, 0, 0, height * dpr);
      bg.addColorStop(0, "#0c0a08");
      bg.addColorStop(0.78, "#0d0a07");
      bg.addColorStop(1, "#15100a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width * dpr, height * dpr);

      // Faint source ember at the base where smoke originates.
      const sx = width * 0.5 * dpr;
      const sy = height * 0.97 * dpr;
      const ember = ctx.createRadialGradient(
        sx,
        sy,
        0,
        sx,
        sy,
        Math.min(width, height) * 0.22 * dpr
      );
      ember.addColorStop(0, "rgba(212,175,55,0.18)");
      ember.addColorStop(0.5, "rgba(180,130,40,0.06)");
      ember.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = ember;
      ctx.fillRect(0, 0, width * dpr, height * dpr);

      // Smoke particles — additive, blurred radial blobs rising & dispersing.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // life phase: 0 at base, 1 at top. Periodic via seed offset.
        const phase = (tNorm * p.speed + p.seed) % 1;

        // Vertical position: bottom (1) -> top (0). Ease for slow drift.
        const rise = phase;
        const py = height * (0.98 - rise * 1.05);

        // Horizontal: base anchor + curl drift that widens as it rises.
        const spread = 0.04 + rise * 0.42;
        const cx =
          curl(p.bx + p.seed, rise * 2.0 + p.seed * 4, tau) * p.sway;
        const px =
          width * (0.5 + p.bx) +
          cx * width * spread +
          Math.sin(tau + p.seed * 6.28) * width * 0.01 * p.sway;

        // Fade in at birth, fade out near the top as it disperses.
        const fadeIn = Math.min(1, rise / 0.12);
        const fadeOut = Math.min(1, (1 - rise) / 0.5);
        const alpha = fadeIn * fadeOut;
        if (alpha <= 0.001) continue;

        // Grows as it rises (dispersing).
        const baseR =
          Math.min(width, height) * (0.018 + rise * 0.085) * p.size;
        const r = baseR * dpr;

        // Inner-lit gold glow; lighter toward warm amber for variety.
        const lit = 0.55 + Math.sin(tau * 2 + p.seed * 6.28) * 0.15;
        const coreA = 0.10 * alpha * lit;
        const cR = Math.floor(212 + p.hue * 20);
        const cG = Math.floor(170 + p.hue * 31);
        const cB = Math.floor(70 + p.hue * 36);

        const g = ctx.createRadialGradient(
          px * dpr,
          py * dpr,
          0,
          px * dpr,
          py * dpr,
          r
        );
        g.addColorStop(0, `rgba(${cR},${cG},${cB},${coreA})`);
        g.addColorStop(
          0.45,
          `rgba(${cR},${Math.floor(cG * 0.85)},${Math.floor(
            cB * 0.7
          )},${coreA * 0.5})`
        );
        g.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px * dpr, py * dpr, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle vignette to keep edges dark and luxurious.
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(
        width * 0.5 * dpr,
        height * 0.45 * dpr,
        Math.min(width, height) * 0.25 * dpr,
        width * 0.5 * dpr,
        height * 0.5 * dpr,
        Math.max(width, height) * 0.75 * dpr
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width * dpr, height * dpr);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0c0a08",
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
