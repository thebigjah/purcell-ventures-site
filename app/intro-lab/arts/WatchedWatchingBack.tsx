"use client";

import { useEffect, useRef } from "react";

/**
 * WatchedWatchingBack — "The watched watching back" (#40, brand).
 *
 * A field of small gold targeting reticles / eye-shapes scattered across a
 * warm near-black ground. Each one blinks on its own clock and slowly rotates
 * /tracks, as if a grid of independent watchers were sweeping the frame.
 *
 * On the ~6s loop they all slide and converge inward, aligning toward center,
 * while a single large iris — concentric gold rings — "opens": rings expand,
 * a pupil dilates, the whole eye blinks awake. Then everything resets outward
 * and the loop repeats seamlessly. You are watched by many; they resolve into
 * one all-seeing eye.
 *
 * Canvas-2d, self-contained, no deps, no WebGL. Responsive (sizes off vmin).
 */
export default function WatchedWatchingBack() {
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

    const LOOP = 6000; // ms — one full cycle
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Logical dimensions (CSS pixels) and devicePixelRatio handling.
    let W = 0;
    let H = 0;
    let dpr = 1;
    let unit = 1; // 1vmin in px — everything scales off this

    // A scattered watcher reticle.
    type Watcher = {
      // home position as fraction of min(W,H) offset from center, in "units"
      hx: number;
      hy: number;
      size: number; // base radius in units
      rotSpeed: number; // radians per loop
      rotPhase: number;
      blinkPhase: number; // 0..1 offset into its own blink cycle
      blinkRate: number; // blinks per loop
      kind: 0 | 1; // 0 = reticle, 1 = eye-slit
      driftPhase: number;
    };

    let watchers: Watcher[] = [];

    // Deterministic pseudo-random so layout is stable across resizes.
    const buildWatchers = () => {
      let seed = 1337;
      const rnd = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };

      const span = Math.min(W, H);
      const countBase = span < 520 ? 26 : span < 900 ? 40 : 56;

      watchers = [];
      // Scatter on a jittered ring/grid pattern around center, avoiding the
      // dead-center where the great eye will open.
      for (let i = 0; i < countBase; i++) {
        // polar-ish placement biased to fill the frame
        const ang = rnd() * Math.PI * 2;
        const radFrac = 0.18 + Math.pow(rnd(), 0.7) * 0.62; // 0.18..0.80 of half-span
        const halfUnits = (span / unit) * 0.5;
        const r = radFrac * halfUnits;
        const hx = Math.cos(ang) * r + (rnd() - 0.5) * 6;
        const hy = Math.sin(ang) * r * 0.92 + (rnd() - 0.5) * 6;

        watchers.push({
          hx,
          hy,
          size: 1.5 + rnd() * 2.4,
          rotSpeed: (rnd() - 0.5) * Math.PI * 2.2,
          rotPhase: rnd() * Math.PI * 2,
          blinkPhase: rnd(),
          blinkRate: 1 + Math.floor(rnd() * 3),
          kind: rnd() > 0.45 ? 0 : 1,
          driftPhase: rnd() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      unit = Math.min(W, H) / 100; // 1vmin
      buildWatchers();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Easing helpers.
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

    // Draw a small targeting reticle centered at (0,0), already translated.
    const drawReticle = (
      s: number,
      open: number, // 0 closed .. 1 fully open (acts as alpha + brackets)
      lit: number // brightness 0..1
    ) => {
      if (open <= 0.02) return;
      const col = lit > 0.66 ? GOLD_LIGHT : GOLD;
      ctx.globalAlpha = 0.25 + 0.65 * open * (0.5 + 0.5 * lit);
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(0.6, 0.32 * unit);
      ctx.lineCap = "round";

      // outer broken ring
      ctx.beginPath();
      const gap = 0.5; // radians gap per quadrant
      for (let q = 0; q < 4; q++) {
        const a0 = q * (Math.PI / 2) + gap / 2;
        const a1 = (q + 1) * (Math.PI / 2) - gap / 2;
        ctx.arc(0, 0, s, a0, a1);
        // moveTo break between arcs
        const nx = Math.cos((q + 1) * (Math.PI / 2) + gap / 2) * s;
        const ny = Math.sin((q + 1) * (Math.PI / 2) + gap / 2) * s;
        ctx.moveTo(nx, ny);
      }
      ctx.stroke();

      // crosshair ticks
      const t = s * 1.35;
      const inner = s * 0.55;
      ctx.beginPath();
      ctx.moveTo(inner, 0);
      ctx.lineTo(t, 0);
      ctx.moveTo(-inner, 0);
      ctx.lineTo(-t, 0);
      ctx.moveTo(0, inner);
      ctx.lineTo(0, t);
      ctx.moveTo(0, -inner);
      ctx.lineTo(0, -t);
      ctx.stroke();

      // center pip
      ctx.globalAlpha = (0.4 + 0.6 * lit) * open;
      ctx.fillStyle = GOLD_HOT;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.5, 0.18 * unit) * (0.6 + open), 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw an eye-slit watcher centered at (0,0).
    const drawEyeSlit = (s: number, open: number, lit: number) => {
      if (open <= 0.02) return;
      const col = lit > 0.66 ? GOLD_LIGHT : GOLD;
      const w = s * 1.7;
      const h = s * (0.15 + 0.95 * open); // lid opening
      ctx.globalAlpha = 0.3 + 0.6 * open * (0.5 + 0.5 * lit);
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(0.6, 0.3 * unit);

      // almond outline (two quadratic arcs)
      ctx.beginPath();
      ctx.moveTo(-w, 0);
      ctx.quadraticCurveTo(0, -h, w, 0);
      ctx.quadraticCurveTo(0, h, -w, 0);
      ctx.stroke();

      // iris
      if (open > 0.25) {
        ctx.globalAlpha = (open - 0.25) * 1.2 * (0.5 + 0.5 * lit);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(0, 0, Math.min(h * 0.85, s * 0.7), 0, Math.PI * 2);
        ctx.fill();
        // pupil
        ctx.globalAlpha = (open - 0.25) * 1.4;
        ctx.fillStyle = BG;
        ctx.beginPath();
        ctx.arc(0, 0, Math.min(h * 0.45, s * 0.34), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw the great central iris that "opens" on convergence.
    const drawGreatEye = (cx: number, cy: number, open: number, dilate: number) => {
      if (open <= 0.001) return;
      const baseR = Math.min(W, H) * 0.36;
      const ringCount = 5;

      // soft gold bloom behind it
      ctx.globalAlpha = 0.5 * open;
      const bloom = ctx.createRadialGradient(
        cx,
        cy,
        baseR * 0.05,
        cx,
        cy,
        baseR * (0.6 + 0.6 * open)
      );
      bloom.addColorStop(0, "rgba(255,243,207,0.55)");
      bloom.addColorStop(0.3, "rgba(232,201,106,0.32)");
      bloom.addColorStop(0.7, "rgba(212,175,55,0.10)");
      bloom.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * (0.6 + 0.6 * open), 0, Math.PI * 2);
      ctx.fill();

      // concentric rings expand outward as the eye opens
      for (let i = 0; i < ringCount; i++) {
        const frac = (i + 1) / ringCount;
        const r = baseR * frac * (0.35 + 0.65 * easeInOut(clamp01(open * 1.1 - i * 0.07)));
        if (r <= 0) continue;
        ctx.globalAlpha = open * (0.85 - i * 0.1);
        ctx.strokeStyle = i % 2 === 0 ? GOLD : GOLD_LIGHT;
        ctx.lineWidth = Math.max(0.7, (0.5 - i * 0.06) * unit);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // radial cells / spokes (panopticon radial divisions)
      const spokes = 24;
      ctx.globalAlpha = open * 0.5;
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = Math.max(0.5, 0.12 * unit);
      const rIn = baseR * 0.22;
      const rOut = baseR * (0.4 + 0.55 * easeInOut(open));
      for (let i = 0; i < spokes; i++) {
        const a = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn);
        ctx.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
        ctx.stroke();
      }

      // iris disc
      const irisR = baseR * 0.32 * (0.3 + 0.7 * easeInOut(open));
      ctx.globalAlpha = open;
      const irisGrad = ctx.createRadialGradient(
        cx,
        cy,
        irisR * 0.1,
        cx,
        cy,
        irisR
      );
      irisGrad.addColorStop(0, "rgba(232,201,106,0.35)");
      irisGrad.addColorStop(0.7, "rgba(212,175,55,0.55)");
      irisGrad.addColorStop(1, "rgba(120,95,30,0.7)");
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = open * 0.9;
      ctx.strokeStyle = GOLD_LIGHT;
      ctx.lineWidth = Math.max(0.8, 0.28 * unit);
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      ctx.stroke();

      // pupil — dilates with `dilate`
      const pupilR = irisR * (0.18 + 0.5 * dilate);
      ctx.globalAlpha = open;
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilR, 0, Math.PI * 2);
      ctx.fill();
      // pupil rim
      ctx.globalAlpha = open;
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = Math.max(0.6, 0.14 * unit);
      ctx.beginPath();
      ctx.arc(cx, cy, pupilR, 0, Math.PI * 2);
      ctx.stroke();
      // catchlight
      ctx.globalAlpha = open * 0.85;
      ctx.fillStyle = GOLD_HOT;
      ctx.beginPath();
      ctx.arc(
        cx - pupilR * 0.35,
        cy - pupilR * 0.35,
        Math.max(0.6, pupilR * 0.18),
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      // Loop progress 0..1. For reduced motion, freeze near the scatter state.
      const p = reduce ? 0.12 : ((now - start) % LOOP) / LOOP;

      const cx = W / 2;
      const cy = H / 2;

      // background wash
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      const wash = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(W, H) * 0.72
      );
      wash.addColorStop(0, "#15110b");
      wash.addColorStop(0.5, "#100d09");
      wash.addColorStop(1, BG);
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, W, H);

      // Phase map across the loop:
      //  0.00–0.45  scattered, watching, slow inward drift begins
      //  0.45–0.70  rapid converge + align toward center
      //  0.55–0.85  great eye opens, pupil dilates
      //  0.85–1.00  reset: eye closes, watchers spring back outward
      const converge = easeInOut(clamp01((p - 0.18) / 0.5)); // 0..1 pull to center
      const reset = easeInOut(clamp01((p - 0.86) / 0.14)); // 0..1 fling back out
      // net inward factor: 1 = home (scattered), 0 = at center
      const inward = 1 - converge * (1 - reset) - 0 * reset;
      const pull = clamp01(inward + reset * (1 - inward)); // ensure springs back

      // watchers fade as the great eye takes over
      const eyeOpen = easeInOut(clamp01((p - 0.5) / 0.32)) * (1 - reset);
      const dilate = easeInOut(clamp01((p - 0.62) / 0.22)) * (1 - reset);
      const watcherFade = clamp01(1 - eyeOpen * 1.25);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < watchers.length; i++) {
        const wch = watchers[i];
        // position interpolates between scattered home and a tight ring at center
        const homeX = cx + wch.hx * unit;
        const homeY = cy + wch.hy * unit;
        // small idle drift while scattered
        const driftA = wch.driftPhase + p * Math.PI * 2;
        const drift = (1 - converge) * 1.4 * unit;
        const hx = homeX + Math.cos(driftA) * drift;
        const hy = homeY + Math.sin(driftA * 1.3) * drift;

        // converged target: a neat ring just outside the great eye
        const ringAng = (i / watchers.length) * Math.PI * 2;
        const ringR = Math.min(W, H) * 0.42;
        const tx = cx + Math.cos(ringAng) * ringR;
        const ty = cy + Math.sin(ringAng) * ringR;

        const x = hx + (tx - hx) * converge * (1 - reset);
        const y = hy + (ty - hy) * converge * (1 - reset);

        // rotation: free while scattered, snaps to face center when converged
        const faceCenter = Math.atan2(cy - y, cx - x);
        const freeRot = wch.rotPhase + wch.rotSpeed * p;
        const rot = freeRot + (faceCenter - freeRot) * converge;

        // independent blink — eyelid open value 0..1
        const bp = (wch.blinkPhase + p * wch.blinkRate) % 1;
        // mostly open, quick blink dip near bp≈0.5
        let lid = 1;
        const d = Math.abs(bp - 0.5);
        if (d < 0.06) lid = d / 0.06; // closing/opening window
        const open = lid * watcherFade;

        // brightness flickers as it "scans"
        const lit = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(freeRot * 2 + i));

        if (open <= 0.02) continue;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        const s = wch.size * unit * (0.85 + 0.3 * converge);
        if (wch.kind === 0) drawReticle(s, open, lit);
        else drawEyeSlit(s, open, lit);
        ctx.restore();
      }

      // The single great eye at center.
      drawGreatEye(cx, cy, eyeOpen, dilate);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // scanning sweep line that crosses during convergence (tension)
      if (!reduce) {
        const sweepP = clamp01((p - 0.2) / 0.4);
        if (sweepP > 0 && sweepP < 1) {
          const sy = sweepP * H;
          ctx.globalAlpha = 0.12 * Math.sin(sweepP * Math.PI);
          ctx.strokeStyle = GOLD_LIGHT;
          ctx.lineWidth = Math.max(0.6, 0.15 * unit);
          ctx.beginPath();
          ctx.moveTo(0, sy);
          ctx.lineTo(W, sy);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // vignette
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(W, H) * 0.3,
        cx,
        cy,
        Math.max(W, H) * 0.72
      );
      vig.addColorStop(0, "rgba(12,10,8,0)");
      vig.addColorStop(0.65, "rgba(12,10,8,0.35)");
      vig.addColorStop(1, "rgba(12,10,8,0.95)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      if (!reduce) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    if (reduce) {
      // render a single frozen frame
      cancelAnimationFrame(raf);
      render(start + LOOP * 0.12);
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
