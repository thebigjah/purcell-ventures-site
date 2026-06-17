"use client";

/**
 * CoordinateStamps — Bourne-style surveillance intel overlay.
 *
 * A faint gold latitude/longitude graticule and drifting wireframe continents
 * crawl behind the frame while location + coordinate + timecode stamps snap on
 * with bracket ticks and a quick chromatic flicker, then fade — "34.0658° N ·
 * 84.6769° W", "ACWORTH GA", "PURCELL VENTURES", "EST 2026", live ticking
 * timecodes — as targeting reticles sweep, lock, and release across the grid.
 * Canvas-2D rendered for frame-accurate snapping, layered with CSS grain,
 * scanline, vignette and gold glow. Self-contained, seamless loop.
 */

import { useEffect, useRef } from "react";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const INK = "#0c0a08";
const MONO =
  '"DM Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';
const SERIF = 'var(--font-cinzel), Georgia, serif';

// Loop length in seconds — the whole composition repeats seamlessly.
const LOOP = 12;

type StampKind = "coord" | "place" | "brand" | "meta";

interface Stamp {
  kind: StampKind;
  // text lines (line 0 = primary, line 1 = optional sub-caption)
  lines: string[];
  // normalized anchor position 0..1 in the frame
  x: number;
  y: number;
  // when in the loop it appears / leaves, in [0,1)
  start: number;
  hold: number; // seconds visible at full opacity
  align: "left" | "center" | "right";
  scale: number; // relative type size
}

// Scripted stamps — staggered so the frame ticks with intel, never crowded.
const STAMPS: Stamp[] = [
  {
    kind: "brand",
    lines: ["PURCELL VENTURES"],
    x: 0.5,
    y: 0.5,
    start: 0.02,
    hold: 2.6,
    align: "center",
    scale: 1.0,
  },
  {
    kind: "coord",
    lines: ["34.0658° N · 84.6769° W", "FIX // ACQUIRED"],
    x: 0.2,
    y: 0.26,
    start: 0.08,
    hold: 1.5,
    align: "left",
    scale: 0.62,
  },
  {
    kind: "place",
    lines: ["ACWORTH GA", "ORIGIN POINT"],
    x: 0.78,
    y: 0.7,
    start: 0.16,
    hold: 1.5,
    align: "right",
    scale: 0.66,
  },
  {
    kind: "coord",
    lines: ["33.7490° N · 84.3880° W", "GRID // ATL-SE"],
    x: 0.74,
    y: 0.22,
    start: 0.24,
    hold: 1.3,
    align: "right",
    scale: 0.58,
  },
  {
    kind: "meta",
    lines: ["EST 2026", "SECURE CHANNEL"],
    x: 0.22,
    y: 0.74,
    start: 0.34,
    hold: 1.5,
    align: "left",
    scale: 0.6,
  },
  {
    kind: "coord",
    lines: ["33.4734° N · 86.9444° W", "VECTOR // TUSCALOOSA"],
    x: 0.5,
    y: 0.82,
    start: 0.46,
    hold: 1.4,
    align: "center",
    scale: 0.56,
  },
  {
    kind: "place",
    lines: ["NORTHWEST ATLANTA", "SECTOR SWEEP"],
    x: 0.26,
    y: 0.46,
    start: 0.56,
    hold: 1.4,
    align: "left",
    scale: 0.6,
  },
  {
    kind: "brand",
    lines: ["AI-FORWARD"],
    x: 0.72,
    y: 0.5,
    start: 0.64,
    hold: 1.4,
    align: "right",
    scale: 0.74,
  },
  {
    kind: "coord",
    lines: ["34.0658° N · 84.6769° W", "LOCK CONFIRMED"],
    x: 0.5,
    y: 0.3,
    start: 0.74,
    hold: 1.8,
    align: "center",
    scale: 0.6,
  },
  {
    kind: "meta",
    lines: ["CLASSIFIED // PV-0026", "EYES ONLY"],
    x: 0.78,
    y: 0.78,
    start: 0.84,
    hold: 1.4,
    align: "right",
    scale: 0.56,
  },
];

// Targeting reticles that sweep across, lock, and release.
interface Reticle {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  start: number;
  travel: number; // seconds of sweep
  hold: number; // seconds locked
}

const RETICLES: Reticle[] = [
  { fromX: 0.1, fromY: 0.85, toX: 0.5, toY: 0.5, start: 0.0, travel: 1.1, hold: 1.2 },
  { fromX: 0.9, fromY: 0.15, toX: 0.78, toY: 0.7, start: 0.3, travel: 0.9, hold: 1.0 },
  { fromX: 0.15, fromY: 0.2, toX: 0.26, toY: 0.46, start: 0.52, travel: 0.8, hold: 1.0 },
  { fromX: 0.85, fromY: 0.9, toX: 0.5, toY: 0.3, start: 0.72, travel: 1.0, hold: 1.3 },
];

// Wireframe "continent" blobs — abstract gold landmasses, drawn as closed
// polylines in normalized coords. Intentionally stylized, not geographic.
const LANDMASSES: number[][][] = [
  [
    [0.08, 0.3], [0.16, 0.22], [0.24, 0.26], [0.3, 0.2], [0.36, 0.28],
    [0.34, 0.38], [0.4, 0.46], [0.34, 0.54], [0.26, 0.5], [0.2, 0.58],
    [0.14, 0.5], [0.1, 0.4],
  ],
  [
    [0.56, 0.16], [0.66, 0.12], [0.76, 0.18], [0.82, 0.14], [0.9, 0.22],
    [0.86, 0.32], [0.78, 0.36], [0.72, 0.3], [0.64, 0.34], [0.58, 0.26],
  ],
  [
    [0.5, 0.62], [0.6, 0.58], [0.68, 0.64], [0.74, 0.6], [0.8, 0.7],
    [0.74, 0.8], [0.64, 0.82], [0.56, 0.76], [0.52, 0.7],
  ],
];

// Cubic ease helpers.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// A fast snap: overshoots slightly then settles — gives the "clack" feel.
const snapIn = (t: number) => {
  const c = 1.9;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export default function CoordinateStamps() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const startTime = performance.now();

    let W = 0;
    let H = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resize);

    // The minimum frame dimension drives type scale so it reads at any size.
    const vmin = () => Math.min(W, H);

    // ---- draw helpers -------------------------------------------------

    const drawGraticule = (t: number) => {
      // Drifting lat/long grid. Slight perspective squash gives "globe" feel.
      const drift = (t * 0.04) % 1; // slow continuous crawl
      const cols = 14;
      const rows = 9;
      const cellX = W / (cols - 2);
      const cellY = H / (rows - 2);
      ctx.save();
      ctx.lineWidth = 1;
      // vertical longitudes
      for (let i = -1; i < cols; i++) {
        const baseX = (i - drift) * cellX;
        // curvature: lines bow outward from center
        const cx = W / 2;
        const norm = (baseX - cx) / (W / 2);
        const alpha = 0.05 + 0.05 * Math.cos(norm * 1.2);
        ctx.strokeStyle = `rgba(212,175,55,${Math.max(0, alpha)})`;
        ctx.beginPath();
        for (let s = 0; s <= 12; s++) {
          const yy = (s / 12) * H;
          const yn = (yy - H / 2) / (H / 2);
          const bow = norm * 18 * (1 - yn * yn);
          const xx = baseX + bow;
          if (s === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
      // horizontal latitudes
      const vdrift = (t * 0.02) % 1;
      for (let j = -1; j < rows; j++) {
        const baseY = (j - vdrift) * cellY;
        const cy = H / 2;
        const norm = (baseY - cy) / (H / 2);
        const alpha = 0.05 + 0.045 * Math.cos(norm * 1.2);
        ctx.strokeStyle = `rgba(212,175,55,${Math.max(0, alpha)})`;
        ctx.beginPath();
        for (let s = 0; s <= 12; s++) {
          const xx = (s / 12) * W;
          const xn = (xx - W / 2) / (W / 2);
          const bow = norm * 14 * (1 - xn * xn);
          const yy = baseY + bow;
          if (s === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawLandmasses = (t: number) => {
      const drift = Math.sin(t * 0.18) * 0.012;
      const vdr = Math.cos(t * 0.13) * 0.01;
      ctx.save();
      ctx.lineWidth = 1.1;
      for (let m = 0; m < LANDMASSES.length; m++) {
        const poly = LANDMASSES[m];
        ctx.strokeStyle = "rgba(212,175,55,0.13)";
        ctx.beginPath();
        for (let p = 0; p < poly.length; p++) {
          const px = (poly[p][0] + drift) * W;
          const py = (poly[p][1] + vdr) * H;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        // faint vertex dots
        ctx.fillStyle = "rgba(232,201,106,0.18)";
        for (let p = 0; p < poly.length; p++) {
          const px = (poly[p][0] + drift) * W;
          const py = (poly[p][1] + vdr) * H;
          ctx.beginPath();
          ctx.arc(px, py, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const drawReticle = (r: Reticle, loopT: number) => {
      const local = loopT - r.start;
      const total = r.travel + r.hold + 0.5;
      if (local < 0 || local > total) return;
      let cx: number, cy: number, locked = false, fade = 1;
      if (local < r.travel) {
        const k = easeInOutCubic(local / r.travel);
        cx = (r.fromX + (r.toX - r.fromX) * k) * W;
        cy = (r.fromY + (r.toY - r.fromY) * k) * H;
      } else if (local < r.travel + r.hold) {
        cx = r.toX * W;
        cy = r.toY * H;
        locked = true;
      } else {
        cx = r.toX * W;
        cy = r.toY * H;
        locked = true;
        fade = 1 - (local - r.travel - r.hold) / 0.5;
      }
      const sz = vmin() * (locked ? 0.05 : 0.07);
      ctx.save();
      ctx.globalAlpha = Math.max(0, fade) * (locked ? 0.85 : 0.5);
      ctx.strokeStyle = locked ? GOLD_LIGHT : GOLD;
      ctx.lineWidth = locked ? 1.4 : 1.1;
      ctx.shadowColor = "rgba(212,175,55,0.5)";
      ctx.shadowBlur = locked ? 8 : 2;
      // bracket corners
      const g = sz * 0.42;
      const corner = (ox: number, oy: number, dx: number, dy: number) => {
        ctx.beginPath();
        ctx.moveTo(cx + ox, cy + oy + dy * g);
        ctx.lineTo(cx + ox, cy + oy);
        ctx.lineTo(cx + ox + dx * g, cy + oy);
        ctx.stroke();
      };
      corner(-sz, -sz, 1, 1);
      corner(sz, -sz, -1, 1);
      corner(-sz, sz, 1, -1);
      corner(sz, sz, -1, -1);
      // crosshair + center dot
      ctx.beginPath();
      ctx.moveTo(cx - sz * 0.3, cy);
      ctx.lineTo(cx + sz * 0.3, cy);
      ctx.moveTo(cx, cy - sz * 0.3);
      ctx.lineTo(cx, cy + sz * 0.3);
      ctx.stroke();
      if (locked) {
        ctx.fillStyle = GOLD_LIGHT;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
        ctx.fill();
        // rotating ranging ring
        const rot = loopT * 4;
        ctx.globalAlpha *= 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, sz * 0.7, rot, rot + Math.PI * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, sz * 0.7, rot + Math.PI, rot + Math.PI * 1.5);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawStamp = (s: Stamp, loopT: number, frameTick: number) => {
      // stamp lifecycle: snap-in (0.22s) -> hold -> fade-out (0.45s)
      const startT = s.start * LOOP;
      const inDur = 0.22;
      const outDur = 0.5;
      const local = loopT - s.start * LOOP;
      const total = inDur + s.hold + outDur;
      if (local < 0 || local > total) return;

      let opacity = 1;
      let snap = 1;
      if (local < inDur) {
        snap = snapIn(local / inDur);
        opacity = easeOutCubic(local / inDur);
      } else if (local > inDur + s.hold) {
        opacity = 1 - easeOutCubic((local - inDur - s.hold) / outDur);
      }
      if (opacity <= 0.001) return;

      const px = s.x * W;
      const py = s.y * H;
      const baseSize = vmin() * 0.034 * s.scale;
      const isBrand = s.kind === "brand";
      const font = isBrand ? SERIF : MONO;
      const lineGap = baseSize * 1.35;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.textBaseline = "middle";
      ctx.textAlign = s.align;

      // measure for bracket box
      ctx.font = `${isBrand ? "700 " : ""}${baseSize}px ${font}`;
      let maxW = 0;
      for (let i = 0; i < s.lines.length; i++) {
        const fs = i === 0 ? baseSize : baseSize * 0.62;
        ctx.font = `${isBrand && i === 0 ? "700 " : ""}${fs}px ${
          i === 0 ? font : MONO
        }`;
        const w = ctx.measureText(s.lines[i]).width;
        if (w > maxW) maxW = w;
      }
      const boxH =
        s.lines.length === 1 ? baseSize * 1.5 : lineGap + baseSize * 0.95;
      const padX = baseSize * 0.55;

      // anchor box left edge based on alignment
      let bx: number;
      if (s.align === "left") bx = px - padX;
      else if (s.align === "right") bx = px - maxW - padX;
      else bx = px - maxW / 2 - padX;
      const bw = maxW + padX * 2;
      const by = py - boxH / 2;

      // snap: the bracket grows from a sliver to full width
      const bracketProg = Math.min(1, (local / inDur) * 1.4);
      const drawW = bw * easeOutCubic(Math.min(1, bracketProg));

      // corner brackets
      ctx.strokeStyle = isBrand ? GOLD_LIGHT : GOLD;
      ctx.lineWidth = 1.3;
      ctx.shadowColor = "rgba(212,175,55,0.5)";
      ctx.shadowBlur = 6;
      const cl = Math.min(baseSize * 0.9, drawW * 0.45);
      // top-left
      ctx.beginPath();
      ctx.moveTo(bx, by + cl);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + cl, by);
      ctx.stroke();
      // top-right
      ctx.beginPath();
      ctx.moveTo(bx + drawW - cl, by);
      ctx.lineTo(bx + drawW, by);
      ctx.lineTo(bx + drawW, by + cl);
      ctx.stroke();
      // bottom-left
      ctx.beginPath();
      ctx.moveTo(bx, by + boxH - cl);
      ctx.lineTo(bx, by + boxH);
      ctx.lineTo(bx + cl, by + boxH);
      ctx.stroke();
      // bottom-right
      ctx.beginPath();
      ctx.moveTo(bx + drawW - cl, by + boxH);
      ctx.lineTo(bx + drawW, by + boxH);
      ctx.lineTo(bx + drawW, by + boxH - cl);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // text — primary line snaps with a brief chromatic split during snap-in
      const chroma = local < inDur ? (1 - local / inDur) * baseSize * 0.12 : 0;
      const flick =
        local < inDur && frameTick % 2 === 0 && local < inDur * 0.6 ? 0.5 : 1;

      for (let i = 0; i < s.lines.length; i++) {
        const fs = i === 0 ? baseSize : baseSize * 0.62;
        ctx.font = `${isBrand && i === 0 ? "700 " : ""}${fs}px ${
          i === 0 ? font : MONO
        }`;
        const ly =
          s.lines.length === 1 ? py : by + (i === 0 ? boxH * 0.34 : boxH * 0.72);
        let tx = px;
        if (s.align === "left") tx = bx + padX;
        else if (s.align === "right") tx = bx + bw - padX;

        if (i === 0) {
          if (chroma > 0.4) {
            ctx.save();
            ctx.globalAlpha = opacity * 0.5;
            ctx.fillStyle = "rgba(255,90,90,0.7)";
            ctx.fillText(s.lines[i], tx - chroma, ly);
            ctx.fillStyle = "rgba(90,160,255,0.7)";
            ctx.fillText(s.lines[i], tx + chroma, ly);
            ctx.restore();
          }
          ctx.globalAlpha = opacity * flick;
          ctx.fillStyle = isBrand ? GOLD_LIGHT : GOLD_LIGHT;
          ctx.shadowColor = "rgba(232,201,106,0.6)";
          ctx.shadowBlur = isBrand ? 14 : 8;
          ctx.fillText(s.lines[i], tx, ly);
          ctx.shadowBlur = 0;
          ctx.globalAlpha = opacity;
          if (isBrand) {
            // letterspace underline rule
            ctx.strokeStyle = "rgba(212,175,55,0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bx + padX * 0.5, by + boxH + baseSize * 0.18);
            ctx.lineTo(bx + bw - padX * 0.5, by + boxH + baseSize * 0.18);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = "rgba(212,175,55,0.62)";
          ctx.fillText(s.lines[i], tx, ly);
        }
      }
      ctx.restore();
    };

    // Persistent HUD timecode in a corner — ticks every frame.
    const drawTimecode = (loopT: number) => {
      const sz = vmin() * 0.026;
      ctx.save();
      ctx.font = `${sz}px ${MONO}`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      // running clock derived from loop time (frames at 24)
      const totalFrames = Math.floor(loopT * 24);
      const ff = totalFrames % 24;
      const ss = Math.floor(loopT) % 60;
      const mm = Math.floor(loopT / 60) % 60;
      const pad = (n: number) => String(n).padStart(2, "0");
      const tc = `${pad(mm)}:${pad(ss)}:${pad(ff)}`;
      ctx.fillStyle = "rgba(212,175,55,0.55)";
      const m = vmin() * 0.04;
      // blinking REC dot
      if (Math.floor(loopT * 2) % 2 === 0) {
        ctx.fillStyle = "rgba(232,201,106,0.9)";
        ctx.beginPath();
        ctx.arc(m + sz * 0.3, m + sz * 0.55, sz * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(212,175,55,0.6)";
      ctx.fillText(`REC  ${tc}`, m + sz * 1.0, m);
      // signal bars, bottom-left
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(212,175,55,0.5)";
      ctx.fillText("SIGNAL // ENCRYPTED", m, H - m - sz);
      // lat/long readout bottom-right, slowly scrubbing
      ctx.textAlign = "right";
      const lat = (34.0658 + Math.sin(loopT * 0.5) * 0.004).toFixed(4);
      const lon = (84.6769 + Math.cos(loopT * 0.5) * 0.004).toFixed(4);
      ctx.fillText(`${lat}° N  ${lon}° W`, W - m, H - m - sz);
      ctx.restore();
    };

    let frameTick = 0;
    const render = (now: number) => {
      if (!running) return;
      const elapsed = (now - startTime) / 1000;
      const loopT = elapsed % LOOP;
      const tnorm = loopT / LOOP;
      frameTick++;

      ctx.clearRect(0, 0, W, H);
      // base wash
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, W, H);

      drawGraticule(elapsed);
      drawLandmasses(elapsed);

      for (const r of RETICLES) drawReticle(r, loopT);
      for (const s of STAMPS) drawStamp(s, loopT, frameTick);

      drawTimecode(loopT);

      // edge sweep tick — a thin gold line strafes across once per loop
      const sweepX = easeInOutCubic(tnorm) * W;
      ctx.save();
      ctx.globalAlpha = 0.18;
      const grad = ctx.createLinearGradient(sweepX - 40, 0, sweepX + 40, 0);
      grad.addColorStop(0, "rgba(212,175,55,0)");
      grad.addColorStop(0.5, "rgba(232,201,106,0.9)");
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(sweepX - 40, 0, 80, H);
      ctx.restore();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      running = false;
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
        background: INK,
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
      />
      {/* gold floor glow + warm vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 50% 42%, rgba(212,175,55,0.06), transparent 60%)," +
            "radial-gradient(140% 120% at 50% 50%, transparent 52%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      {/* scanline drift */}
      <div className="cs-scan" aria-hidden />
      {/* film grain */}
      <div className="cs-grain" aria-hidden />
      <style>{css}</style>
    </div>
  );
}

const css = `
@keyframes cs-scan {
  0%   { transform: translateY(-12%); }
  100% { transform: translateY(112%); }
}
@keyframes cs-grain {
  0%, 100% { transform: translate(0, 0); }
  20%  { transform: translate(-3%, 2%); }
  40%  { transform: translate(2%, -3%); }
  60%  { transform: translate(-2%, -2%); }
  80%  { transform: translate(3%, 1%); }
}
.cs-scan {
  position: absolute; left: 0; right: 0; top: 0; height: 18%;
  pointer-events: none; opacity: 0.5;
  background: linear-gradient(180deg,
    transparent, rgba(232,201,106,0.05) 46%, rgba(232,201,106,0.08) 50%,
    rgba(232,201,106,0.05) 54%, transparent);
  animation: cs-scan 7s linear infinite;
}
.cs-grain {
  position: absolute; inset: -50%;
  pointer-events: none; opacity: 0.055;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>\
<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: cs-grain 0.6s steps(4) infinite;
  mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: reduce) {
  .cs-scan, .cs-grain { animation-duration: 14s; }
}
`;
