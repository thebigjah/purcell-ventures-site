"use client";

import { useEffect, useRef } from "react";

/**
 * BoldMetaphor — "One bold metaphor" (Saul Bass #30, brand).
 *
 * The Purcell Ventures panopticon eye as a SINGLE powerful graphic that owns
 * the frame: a large concentric-ring iris with radial cell dividers and a
 * pupil at center — the reverse-panopticon all-seeing eye, fully formed and
 * alive. It watches. Rings slowly counter-rotate against each other, the iris
 * dilates and contracts as if breathing, a slow scan-glint sweeps across the
 * surface, and a soft gold bloom pulses in time with the dilation.
 *
 * Layered for cinema: warm-black ground, radial wash, additive bloom + glint,
 * fixed-noise grain texture, and a deep vignette. Canvas-2d, self-contained,
 * no deps, no WebGL. Responsive (everything scales off 1vmin). Seamless loop.
 */
export default function BoldMetaphor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD = "#d4af37";
    const GOLD_LIGHT = "#e8c96a";
    const GOLD_HOT = "#fff3cf";
    const BG = "#0c0a08";

    const LOOP = 9000; // ms — one full breath cycle
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let unit = 1; // 1vmin in px — everything scales off this

    // Pre-rendered grain tile (fixed noise — drawn cheaply each frame).
    let grain: HTMLCanvasElement | null = null;
    const buildGrain = () => {
      const g = document.createElement("canvas");
      const N = 160;
      g.width = N;
      g.height = N;
      const gc = g.getContext("2d");
      if (!gc) return;
      const img = gc.createImageData(N, N);
      let seed = 9973;
      const rnd = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      for (let i = 0; i < img.data.length; i += 4) {
        const v = rnd() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gc.putImageData(img, 0, 0);
      grain = g;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      unit = Math.min(W, H) / 100; // 1vmin
    };

    buildGrain();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Easing helpers.
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const TAU = Math.PI * 2;

    // Draw the concentric panopticon iris centered at (cx, cy).
    // `breath` 0..1 drives dilation; `spin` is the global rotation phase (rad);
    // `bloomK` 0..1 the bloom intensity; `glintA` 0..TAU the scan-glint angle.
    const drawEye = (
      cx: number,
      cy: number,
      breath: number,
      spin: number,
      bloomK: number,
      glintA: number
    ) => {
      const R = Math.min(W, H) * 0.42; // outer iris radius
      // dilation maps breath -> overall scale of iris contents (subtle)
      const dil = 0.92 + 0.1 * breath;

      // --- soft gold bloom behind the eye, pulsing with the breath ---
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      const bR = R * (1.05 + 0.35 * bloomK);
      const bloom = ctx.createRadialGradient(cx, cy, R * 0.04, cx, cy, bR);
      const bI = 0.22 + 0.5 * bloomK;
      bloom.addColorStop(0, `rgba(255,243,207,${0.55 * bI})`);
      bloom.addColorStop(0.28, `rgba(232,201,106,${0.42 * bI})`);
      bloom.addColorStop(0.62, `rgba(212,175,55,${0.16 * bI})`);
      bloom.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(cx, cy, bR, 0, TAU);
      ctx.fill();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(dil, dil);

      // --- concentric rings, counter-rotating in alternating directions ---
      const ringCount = 7;
      for (let i = 0; i < ringCount; i++) {
        const frac = (i + 1) / ringCount; // 0..1 outward
        const r = R * frac;
        const dir = i % 2 === 0 ? 1 : -1;
        const rot = spin * dir * (0.5 + frac * 0.8);

        ctx.save();
        ctx.rotate(rot);

        // ring stroke
        ctx.globalAlpha = 0.5 + 0.4 * (1 - frac);
        ctx.strokeStyle = i % 2 === 0 ? GOLD : GOLD_LIGHT;
        ctx.lineWidth = Math.max(0.7, (0.62 - i * 0.05) * unit);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, TAU);
        ctx.stroke();

        // radial cell dividers between this ring and the previous one
        // (the reverse-panopticon cells) — count grows outward
        const rInner = R * (i / ringCount);
        const cells = 10 + i * 4;
        ctx.globalAlpha = 0.28 + 0.18 * (1 - frac);
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = Math.max(0.4, 0.13 * unit);
        ctx.beginPath();
        for (let c = 0; c < cells; c++) {
          const a = (c / cells) * TAU;
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          ctx.moveTo(ca * rInner, sa * rInner);
          ctx.lineTo(ca * r, sa * r);
        }
        ctx.stroke();

        // faint dot at each outer cell node — gives the rings texture/depth
        if (i >= 2) {
          ctx.globalAlpha = 0.2 + 0.16 * (1 - frac);
          ctx.fillStyle = GOLD_LIGHT;
          const dotR = Math.max(0.4, 0.16 * unit);
          for (let c = 0; c < cells; c++) {
            const a = (c / cells) * TAU;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r, Math.sin(a) * r, dotR, 0, TAU);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // --- iris disc (gold gradient body) ---
      const irisR = R * 0.34;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const irisGrad = ctx.createRadialGradient(0, 0, irisR * 0.08, 0, 0, irisR);
      irisGrad.addColorStop(0, "rgba(232,201,106,0.42)");
      irisGrad.addColorStop(0.55, "rgba(212,175,55,0.5)");
      irisGrad.addColorStop(1, "rgba(96,74,22,0.78)");
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(0, 0, irisR, 0, TAU);
      ctx.fill();

      // iris fibers — fine radial strokes inside the disc
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = GOLD_LIGHT;
      ctx.lineWidth = Math.max(0.4, 0.1 * unit);
      const fibers = 60;
      ctx.beginPath();
      for (let f = 0; f < fibers; f++) {
        const a = (f / fibers) * TAU + spin * 0.4;
        const r0 = irisR * (0.42 + 0.08 * Math.sin(f * 12.9));
        ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
        ctx.lineTo(Math.cos(a) * irisR, Math.sin(a) * irisR);
      }
      ctx.stroke();

      // iris rim
      ctx.globalAlpha = 0.95;
      ctx.strokeStyle = GOLD_LIGHT;
      ctx.lineWidth = Math.max(0.8, 0.3 * unit);
      ctx.beginPath();
      ctx.arc(0, 0, irisR, 0, TAU);
      ctx.stroke();

      // --- pupil — dilates and contracts with the breath (the "watching") ---
      const pupilR = irisR * (0.3 + 0.42 * breath);
      const pupGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, pupilR);
      pupGrad.addColorStop(0, "#000000");
      pupGrad.addColorStop(0.8, "#000000");
      pupGrad.addColorStop(1, "#1a140a");
      ctx.fillStyle = pupGrad;
      ctx.beginPath();
      ctx.arc(0, 0, pupilR, 0, TAU);
      ctx.fill();
      // pupil rim
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = Math.max(0.6, 0.16 * unit);
      ctx.beginPath();
      ctx.arc(0, 0, pupilR, 0, TAU);
      ctx.stroke();

      // catchlight — a hot specular dot, sells the "living" eye
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.9;
      const cl = ctx.createRadialGradient(
        -pupilR * 0.38,
        -pupilR * 0.42,
        0,
        -pupilR * 0.38,
        -pupilR * 0.42,
        pupilR * 0.5
      );
      cl.addColorStop(0, GOLD_HOT);
      cl.addColorStop(1, "rgba(255,243,207,0)");
      ctx.fillStyle = cl;
      ctx.beginPath();
      ctx.arc(-pupilR * 0.38, -pupilR * 0.42, pupilR * 0.5, 0, TAU);
      ctx.fill();
      ctx.restore();

      // --- scan-glint: a soft bright wedge sweeping across the whole eye ---
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "lighter";
      const glintGrad = ctx.createRadialGradient(0, 0, R * 0.1, 0, 0, R * 1.02);
      glintGrad.addColorStop(0, "rgba(255,243,207,0)");
      glintGrad.addColorStop(0.6, "rgba(255,243,207,0.06)");
      glintGrad.addColorStop(1, "rgba(255,243,207,0.16)");
      ctx.rotate(glintA);
      ctx.globalAlpha = 0.85;
      // wedge clip so the glint reads as a sweeping band
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R * 1.02, -0.42, 0.42);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = glintGrad;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.02, 0, TAU);
      ctx.fill();
      ctx.restore();

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const start = performance.now();
    let grainPhase = 0;

    const render = (now: number) => {
      // freeze at a flattering breath state for reduced motion
      const p = reduce ? 0.3 : ((now - start) % LOOP) / LOOP;

      const cx = W / 2;
      const cy = H / 2;

      // background radial wash
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const wash = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(W, H) * 0.75
      );
      wash.addColorStop(0, "#171209");
      wash.addColorStop(0.5, "#100c08");
      wash.addColorStop(1, BG);
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, W, H);

      // breathing curve — smooth inhale/exhale, dwell at extremes (eased sine)
      const raw = 0.5 - 0.5 * Math.cos(p * TAU); // 0..1..0 over the loop
      const breath = easeInOut(raw); // pupil dilation 0..1
      const bloomK = 0.25 + 0.75 * raw; // bloom pulses with the breath

      // global slow rotation phase (one revolution per ~3 loops for outer set)
      const spin = p * TAU * 0.34;

      // scan-glint sweeps once per loop, slightly offset, eased so it lingers
      const glintA = easeInOut(p) * TAU - Math.PI;

      drawEye(cx, cy, breath, spin, bloomK, glintA);

      // --- grain overlay (fixed-noise texture, gently drifting) ---
      if (grain) {
        grainPhase = (grainPhase + 7) % 160;
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.05;
        const tile = grain.width;
        const ox = -((grainPhase * 1.3) % tile);
        const oy = -((grainPhase * 0.7) % tile);
        for (let x = ox; x < W; x += tile) {
          for (let y = oy; y < H; y += tile) {
            ctx.drawImage(grain, x, y);
          }
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      // --- vignette ---
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(W, H) * 0.28,
        cx,
        cy,
        Math.max(W, H) * 0.74
      );
      vig.addColorStop(0, "rgba(12,10,8,0)");
      vig.addColorStop(0.62, "rgba(12,10,8,0.4)");
      vig.addColorStop(1, "rgba(12,10,8,0.96)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      if (!reduce) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    if (reduce) {
      cancelAnimationFrame(raf);
      render(start + LOOP * 0.3);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
