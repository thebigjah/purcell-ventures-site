"use client";

import { useEffect, useRef } from "react";

/**
 * BurningFuse — a Mission: Impossible style lit fuse.
 * A hot spark travels a winding path across the frame; the burnt trail glows
 * gold behind it while the unburnt fuse ahead stays dim. Embers flick off the
 * spark, and at the end a bright flare ignites at center before the loop resets.
 *
 * Self-contained, no props, no deps. Canvas 2D. Seamless ~5s loop.
 */
export default function BurningFuse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD = "#d4af37";
    const GOLD_LIGHT = "#e8c96a";
    const BG = "#0c0a08";

    const LOOP_MS = 5000;
    const BURN_FRAC = 0.78; // fraction of loop spent traveling; rest is flare + reset

    let width = 0;
    let height = 0;
    let dpr = 1;

    // The winding fuse path is defined in normalized [0..1] space and scaled to
    // the canvas each frame, so it stays responsive.
    type P = { x: number; y: number };
    const controlPts: P[] = [
      { x: -0.05, y: 0.72 },
      { x: 0.12, y: 0.4 },
      { x: 0.26, y: 0.78 },
      { x: 0.4, y: 0.32 },
      { x: 0.52, y: 0.66 },
      { x: 0.5, y: 0.5 }, // dip toward center
      { x: 0.64, y: 0.28 },
      { x: 0.78, y: 0.7 },
      { x: 0.9, y: 0.38 },
      { x: 1.05, y: 0.55 },
    ];

    // Sample a smooth Catmull-Rom curve through the control points into a dense
    // polyline with cumulative arc-length for even-speed travel.
    type Sample = { x: number; y: number; len: number };
    let samples: Sample[] = [];
    let totalLen = 0;

    const buildSamples = () => {
      samples = [];
      totalLen = 0;
      const segPerSpan = 26;
      const pts = controlPts;
      let prev: Sample | null = null;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? pts[i + 1];
        for (let s = 0; s < segPerSpan; s++) {
          const t = s / segPerSpan;
          const t2 = t * t;
          const t3 = t2 * t;
          const nx =
            0.5 *
            (2 * p1.x +
              (-p0.x + p2.x) * t +
              (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
              (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
          const ny =
            0.5 *
            (2 * p1.y +
              (-p0.y + p2.y) * t +
              (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
              (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
          const x = nx * width;
          const y = ny * height;
          if (prev) {
            totalLen += Math.hypot(x - prev.x, y - prev.y);
          }
          const sample: Sample = { x, y, len: totalLen };
          samples.push(sample);
          prev = sample;
        }
      }
    };

    // Find the point at a given arc-length distance along the polyline.
    const pointAtLen = (target: number): P => {
      if (samples.length === 0) return { x: 0, y: 0 };
      if (target <= 0) return { x: samples[0].x, y: samples[0].y };
      if (target >= totalLen)
        return { x: samples[samples.length - 1].x, y: samples[samples.length - 1].y };
      // binary search
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].len < target) lo = mid + 1;
        else hi = mid;
      }
      const a = samples[Math.max(0, lo - 1)];
      const b = samples[lo];
      const span = b.len - a.len || 1;
      const f = (target - a.len) / span;
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    };

    // Persistent embers shed from the spark.
    type Ember = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number; // 0..1 remaining
      size: number;
    };
    let embers: Ember[] = [];
    let lastSpawnLen = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSamples();
    };

    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // Draw the fuse path as a stroke up to `frac` (burnt+glowing) vs ahead (dim).
    const strokeUpTo = (fromLen: number, toLen: number, color: string, lineWidth: number, alpha: number) => {
      if (toLen <= fromLen) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        if (s.len < fromLen) continue;
        if (s.len > toLen) {
          // include the exact endpoint
          const end = pointAtLen(toLen);
          ctx.lineTo(end.x, end.y);
          break;
        }
        if (!started) {
          const start = pointAtLen(Math.max(fromLen, s.len));
          ctx.moveTo(start.x, start.y);
          started = true;
        }
        ctx.lineTo(s.x, s.y);
      }
      ctx.stroke();
      ctx.restore();
    };

    let raf = 0;
    let startTime = 0;
    let lastTime = 0;

    const frame = (now: number) => {
      if (!startTime) {
        startTime = now;
        lastTime = now;
      }
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      const elapsed = (now - startTime) % LOOP_MS;
      const phase = elapsed / LOOP_MS; // 0..1

      // burnProgress: 0..1 over the BURN_FRAC portion, then holds at 1.
      const travel = Math.min(1, phase / BURN_FRAC);
      // ease slightly for ticking-clock acceleration near the end
      const eased = travel < 1 ? travel : 1;
      const burnLen = eased * totalLen;

      // Clear with brand background (full opaque each frame for clean loop)
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // subtle vignette warmth
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.1,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vg.addColorStop(0, "rgba(40,28,10,0.35)");
      vg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      // 1) Unburnt fuse ahead — dim, thin.
      strokeUpTo(burnLen, totalLen, "#5a4a28", Math.max(1.4, height * 0.0035), 0.55);

      // 2) Burnt glowing trail behind — gold, with an outer soft glow pass.
      ctx.save();
      ctx.shadowColor = GOLD;
      ctx.shadowBlur = Math.max(8, height * 0.03);
      strokeUpTo(0, burnLen, GOLD, Math.max(2.2, height * 0.006), 0.9);
      ctx.restore();
      // hot inner line near the spark fades from light gold to gold
      strokeUpTo(Math.max(0, burnLen - totalLen * 0.18), burnLen, GOLD_LIGHT, Math.max(1.6, height * 0.004), 0.85);

      // 3) Spawn embers as the spark advances.
      if (travel < 1) {
        const tip = pointAtLen(burnLen);
        const advanced = burnLen - lastSpawnLen;
        if (advanced > 0) {
          const count = Math.min(4, Math.floor(advanced / Math.max(6, height * 0.02)) + (Math.random() < 0.4 ? 1 : 0));
          for (let i = 0; i < count; i++) {
            const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
            const spd = (0.6 + Math.random() * 1.6) * (height * 0.02);
            embers.push({
              x: tip.x + (Math.random() - 0.5) * 4,
              y: tip.y + (Math.random() - 0.5) * 4,
              vx: Math.cos(ang) * spd,
              vy: Math.sin(ang) * spd - height * 0.01,
              life: 1,
              size: 1 + Math.random() * 2.2,
            });
          }
          lastSpawnLen = burnLen;
        }
      }

      // 4) Update + draw embers.
      const dtSec = dt / 1000;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      embers = embers.filter((e) => {
        e.life -= dtSec * 1.3;
        if (e.life <= 0) return false;
        e.x += e.vx * dtSec;
        e.y += e.vy * dtSec;
        e.vy += height * 0.45 * dtSec; // gravity
        e.vx *= 0.98;
        const a = Math.max(0, e.life);
        ctx.globalAlpha = a * 0.9;
        ctx.fillStyle = a > 0.6 ? GOLD_LIGHT : GOLD;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (0.4 + a * 0.8), 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.restore();

      // 5) The spark itself — hot white core + gold glow — while traveling.
      if (travel < 1) {
        const tip = pointAtLen(burnLen);
        const flicker = 0.85 + Math.random() * 0.3;
        const r = Math.max(6, height * 0.018) * flicker;
        const grd = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, r * 2.4);
        grd.addColorStop(0, "rgba(255,255,250,1)");
        grd.addColorStop(0.25, GOLD_LIGHT);
        grd.addColorStop(0.6, GOLD);
        grd.addColorStop(1, "rgba(212,175,55,0)");
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();
        // bright core
        ctx.fillStyle = "#fffef8";
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, r * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6) Ignition flare at center once travel completes, fading before reset.
      if (phase >= BURN_FRAC) {
        const flarePhase = (phase - BURN_FRAC) / (1 - BURN_FRAC); // 0..1
        // quick rise, slow fall
        const intensity =
          flarePhase < 0.18
            ? flarePhase / 0.18
            : Math.max(0, 1 - (flarePhase - 0.18) / 0.82);
        const cx = width / 2;
        const cy = height / 2;
        const maxR = Math.hypot(width, height) * 0.55 * (0.5 + intensity * 0.7);
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        grd.addColorStop(0, `rgba(255,255,250,${0.95 * intensity})`);
        grd.addColorStop(0.18, `rgba(232,201,106,${0.85 * intensity})`);
        grd.addColorStop(0.45, `rgba(212,175,55,${0.5 * intensity})`);
        grd.addColorStop(1, "rgba(212,175,55,0)");
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        // radiant streaks
        const streaks = 12;
        ctx.translate(cx, cy);
        ctx.rotate(flarePhase * 0.6);
        for (let i = 0; i < streaks; i++) {
          ctx.rotate((Math.PI * 2) / streaks);
          const len = maxR * (0.4 + 0.6 * intensity);
          const grad2 = ctx.createLinearGradient(0, 0, len, 0);
          grad2.addColorStop(0, `rgba(255,250,235,${0.5 * intensity})`);
          grad2.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = grad2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(len, -height * 0.004 - 1);
          ctx.lineTo(len, height * 0.004 + 1);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // clear lingering embers as the loop resets
        if (flarePhase > 0.6) embers = [];
      }

      // Reset per-loop trackers at the wrap point.
      if (phase < 0.02) {
        lastSpawnLen = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

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
