"use client";

import { useEffect, useRef } from "react";

/**
 * SceneFlashMontage — Mission: Impossible title-sequence energy.
 *
 * Subliminal gold-on-black imagery (explosion, reticle, face silhouette,
 * gears, a map) strobes on and off in quick rhythmic bursts while thin
 * metallic credit-style text lines wipe across the frame. Light leaks,
 * chromatic snap on the hard flashes, film grain and a vignette tie it
 * into one cinematic, seamlessly looping intro plate.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 9000; // full cycle — divides cleanly into the flash grid

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

// Flash kinds — drawn as bright gold-on-black abstractions.
type Kind = "explosion" | "reticle" | "face" | "gears" | "map";

interface Flash {
  start: number; // loop fraction 0..1
  dur: number; // loop fraction
  kind: Kind;
  side: -1 | 0 | 1; // horizontal bias for variety
  scale: number; // 0..1 size multiplier
  hard: boolean; // hard flashes get chromatic snap + light leak
}

// Hand-tuned rhythmic schedule. Overlaps are intentional (strobe stutter).
// Times are fractions of LOOP_MS; the sequence is built to loop seamlessly
// (nothing important hangs across the 1.0 -> 0 seam).
const FLASHES: Flash[] = [
  { start: 0.02, dur: 0.05, kind: "reticle", side: 0, scale: 0.7, hard: true },
  { start: 0.08, dur: 0.03, kind: "gears", side: -1, scale: 0.6, hard: false },
  { start: 0.12, dur: 0.045, kind: "map", side: 1, scale: 0.9, hard: false },
  { start: 0.165, dur: 0.025, kind: "face", side: 0, scale: 0.8, hard: false },
  { start: 0.205, dur: 0.06, kind: "explosion", side: 0, scale: 1.0, hard: true },
  { start: 0.275, dur: 0.03, kind: "gears", side: 1, scale: 0.5, hard: false },
  { start: 0.31, dur: 0.02, kind: "reticle", side: -1, scale: 0.5, hard: false },
  { start: 0.34, dur: 0.04, kind: "face", side: 1, scale: 0.85, hard: true },
  { start: 0.4, dur: 0.05, kind: "map", side: -1, scale: 0.8, hard: false },
  { start: 0.455, dur: 0.022, kind: "gears", side: 0, scale: 0.65, hard: false },
  { start: 0.49, dur: 0.065, kind: "explosion", side: 1, scale: 1.05, hard: true },
  { start: 0.565, dur: 0.03, kind: "reticle", side: 0, scale: 0.75, hard: false },
  { start: 0.6, dur: 0.025, kind: "face", side: -1, scale: 0.7, hard: false },
  { start: 0.635, dur: 0.04, kind: "map", side: 0, scale: 0.95, hard: false },
  { start: 0.685, dur: 0.03, kind: "gears", side: 1, scale: 0.6, hard: true },
  { start: 0.725, dur: 0.05, kind: "explosion", side: -1, scale: 0.9, hard: true },
  { start: 0.79, dur: 0.028, kind: "reticle", side: 1, scale: 0.6, hard: false },
  { start: 0.825, dur: 0.045, kind: "face", side: 0, scale: 0.9, hard: false },
  { start: 0.88, dur: 0.03, kind: "map", side: -1, scale: 0.7, hard: false },
  { start: 0.92, dur: 0.025, kind: "gears", side: 0, scale: 0.55, hard: false },
  { start: 0.955, dur: 0.035, kind: "reticle", side: 0, scale: 0.65, hard: true },
];

// Credit-style text lines that wipe across between the flashes.
const CREDITS = [
  { at: 0.0, dur: 0.2, text: "PURCELL VENTURES", sub: "A MOTION STUDY", y: 0.5, big: true },
  { at: 0.18, dur: 0.16, text: "DIRECTED BY INTENT", sub: "NO. 014", y: 0.34, big: false },
  { at: 0.36, dur: 0.16, text: "STORY · STRATEGY · SHIP", sub: "FIELD REPORT", y: 0.64, big: false },
  { at: 0.54, dur: 0.18, text: "BUILT IN THE OPEN", sub: "ACWORTH · GA", y: 0.42, big: false },
  { at: 0.74, dur: 0.16, text: "ALWAYS IN MOTION", sub: "EST. MMXXVI", y: 0.58, big: false },
  { at: 0.9, dur: 0.18, text: "PURCELL VENTURES", sub: "END OF REEL", y: 0.5, big: true },
];

export default function SceneFlashMontage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let start = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let unit = 1; // vmin in px

    const ro = new ResizeObserver(() => resize());
    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      unit = Math.min(W, H) / 100; // 1 vmin in px
    }
    resize();
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Seeded pseudo-random — deterministic flicker / grain.
    let seed = 90210;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    const tick = (v: number) => v * unit;

    // ---- Imagery drawers (centered at 0,0; caller translates/scales) ----

    function drawReticle(s: number, a: number) {
      ctx!.save();
      ctx!.globalAlpha = a;
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.lineWidth = Math.max(1, tick(0.4) * s);
      ctx!.lineCap = "round";
      const R = tick(22) * s;
      ctx!.beginPath();
      ctx!.arc(0, 0, R, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(0, 0, R * 0.6, 0, Math.PI * 2);
      ctx!.stroke();
      // crosshair + ticks
      const reach = R * 1.5;
      const gap = R * 0.2;
      ctx!.beginPath();
      ctx!.moveTo(-reach, 0);
      ctx!.lineTo(-gap, 0);
      ctx!.moveTo(gap, 0);
      ctx!.lineTo(reach, 0);
      ctx!.moveTo(0, -reach);
      ctx!.lineTo(0, -gap);
      ctx!.moveTo(0, gap);
      ctx!.lineTo(0, reach);
      ctx!.stroke();
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.beginPath();
      ctx!.arc(0, 0, Math.max(1, tick(0.7) * s), 0, Math.PI * 2);
      ctx!.fill();
      // graduations
      ctx!.lineWidth = Math.max(1, tick(0.25) * s);
      for (let i = 0; i < 24; i++) {
        const ang = (i / 24) * Math.PI * 2;
        const r0 = R * 0.82;
        const r1 = i % 6 === 0 ? R * 0.96 : R * 0.9;
        ctx!.beginPath();
        ctx!.moveTo(Math.cos(ang) * r0, Math.sin(ang) * r0);
        ctx!.lineTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawExplosion(s: number, a: number, prog: number) {
      // radial burst of tapered shards + a hot core
      ctx!.save();
      const R = tick(30) * s * (0.7 + prog * 0.6);
      // core glow
      ctx!.globalCompositeOperation = "lighter";
      const core = ctx!.createRadialGradient(0, 0, 0, 0, 0, R);
      core.addColorStop(0, `rgba(232,201,106,${a * 0.9})`);
      core.addColorStop(0.25, `rgba(212,175,55,${a * 0.5})`);
      core.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(0, 0, R, 0, Math.PI * 2);
      ctx!.fill();
      // shards
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.lineCap = "round";
      const rays = 22;
      for (let i = 0; i < rays; i++) {
        const ang = (i / rays) * Math.PI * 2 + prog * 0.4;
        const len = R * (0.7 + ((i * 137) % 60) / 100);
        ctx!.globalAlpha = a * (0.4 + ((i * 71) % 50) / 100);
        ctx!.lineWidth = Math.max(1, tick(0.55) * s);
        ctx!.beginPath();
        ctx!.moveTo(Math.cos(ang) * R * 0.25, Math.sin(ang) * R * 0.25);
        ctx!.lineTo(Math.cos(ang) * len, Math.sin(ang) * len);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawFace(s: number, a: number, side: number) {
      // profile silhouette of a head/shoulders as a glowing edge
      ctx!.save();
      ctx!.globalAlpha = a;
      ctx!.translate(side * tick(4), 0);
      const u = tick(1) * s;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = Math.max(1, tick(0.45) * s);
      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";
      ctx!.beginPath();
      // facing left profile, scaled in vmin-ish units
      ctx!.moveTo(8 * u, -34 * u); // top of head
      ctx!.bezierCurveTo(-14 * u, -34 * u, -20 * u, -16 * u, -18 * u, -6 * u); // forehead/brow
      ctx!.lineTo(-22 * u, -2 * u); // nose bridge
      ctx!.lineTo(-15 * u, 2 * u); // nose tip back
      ctx!.lineTo(-19 * u, 6 * u); // lip
      ctx!.lineTo(-14 * u, 12 * u); // chin
      ctx!.bezierCurveTo(-10 * u, 22 * u, 2 * u, 26 * u, 10 * u, 28 * u); // jaw to shoulder
      ctx!.lineTo(22 * u, 38 * u); // shoulder
      ctx!.stroke();
      // soft inner fill so it reads as a silhouette mass
      ctx!.globalAlpha = a * 0.16;
      ctx!.fillStyle = GOLD_AMBER;
      ctx!.beginPath();
      ctx!.moveTo(8 * u, -34 * u);
      ctx!.bezierCurveTo(-14 * u, -34 * u, -20 * u, -16 * u, -18 * u, -6 * u);
      ctx!.lineTo(-22 * u, -2 * u);
      ctx!.lineTo(-15 * u, 2 * u);
      ctx!.lineTo(-19 * u, 6 * u);
      ctx!.lineTo(-14 * u, 12 * u);
      ctx!.bezierCurveTo(-10 * u, 22 * u, 2 * u, 26 * u, 10 * u, 28 * u);
      ctx!.lineTo(22 * u, 38 * u);
      ctx!.lineTo(30 * u, 38 * u);
      ctx!.lineTo(30 * u, -34 * u);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function drawGears(s: number, a: number, prog: number) {
      ctx!.save();
      ctx!.globalAlpha = a;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = Math.max(1, tick(0.4) * s);
      const gear = (cx: number, cy: number, r: number, teeth: number, rot: number) => {
        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(rot);
        ctx!.beginPath();
        for (let i = 0; i < teeth; i++) {
          const a0 = (i / teeth) * Math.PI * 2;
          const a1 = ((i + 0.5) / teeth) * Math.PI * 2;
          const ro = r * 1.18;
          ctx!.lineTo(Math.cos(a0) * ro, Math.sin(a0) * ro);
          ctx!.lineTo(Math.cos(a0 + 0.06) * r, Math.sin(a0 + 0.06) * r);
          ctx!.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
          ctx!.lineTo(Math.cos(a1 + 0.06) * ro, Math.sin(a1 + 0.06) * ro);
        }
        ctx!.closePath();
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(0, 0, r * 0.45, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      };
      const base = tick(14) * s;
      gear(-base * 0.6, -base * 0.3, base, 12, prog * 3.0);
      gear(base * 0.95, base * 0.55, base * 0.7, 10, -prog * 3.8 + 0.3);
      gear(base * 0.2, -base * 1.1, base * 0.5, 8, prog * 4.5);
      ctx!.restore();
    }

    function drawMap(s: number, a: number, prog: number) {
      // abstract intel map: graticule + coastlines + route + pings
      ctx!.save();
      ctx!.globalAlpha = a;
      const w = tick(60) * s;
      const h = tick(40) * s;
      ctx!.translate(-w / 2, -h / 2);
      // graticule
      ctx!.strokeStyle = GOLD_AMBER;
      ctx!.globalAlpha = a * 0.5;
      ctx!.lineWidth = Math.max(1, tick(0.18) * s);
      const cols = 8;
      const rows = 5;
      ctx!.beginPath();
      for (let i = 0; i <= cols; i++) {
        ctx!.moveTo((i / cols) * w, 0);
        ctx!.lineTo((i / cols) * w, h);
      }
      for (let j = 0; j <= rows; j++) {
        ctx!.moveTo(0, (j / rows) * h);
        ctx!.lineTo(w, (j / rows) * h);
      }
      ctx!.stroke();
      // pseudo-coastline blobs (deterministic)
      ctx!.globalAlpha = a;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = Math.max(1, tick(0.35) * s);
      ctx!.lineJoin = "round";
      let cs = 7;
      const crnd = () => {
        cs = (cs * 1103515245 + 12345) & 0x7fffffff;
        return cs / 0x7fffffff;
      };
      for (let b = 0; b < 3; b++) {
        ctx!.beginPath();
        const cx = w * (0.2 + crnd() * 0.6);
        const cy = h * (0.2 + crnd() * 0.6);
        const pts = 9;
        for (let p = 0; p <= pts; p++) {
          const ang = (p / pts) * Math.PI * 2;
          const rr = tick(6) * s * (0.5 + crnd() * 0.9);
          const x = cx + Math.cos(ang) * rr;
          const y = cy + Math.sin(ang) * rr * 0.7;
          if (p === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.closePath();
        ctx!.stroke();
      }
      // animated dashed route
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.lineWidth = Math.max(1, tick(0.4) * s);
      ctx!.setLineDash([tick(1.4) * s, tick(1.2) * s]);
      ctx!.lineDashOffset = -prog * tick(20);
      ctx!.beginPath();
      ctx!.moveTo(w * 0.12, h * 0.78);
      ctx!.bezierCurveTo(w * 0.4, h * 0.3, w * 0.6, h * 0.85, w * 0.88, h * 0.22);
      ctx!.stroke();
      ctx!.setLineDash([]);
      // pings
      ctx!.fillStyle = GOLD_LIGHT;
      const pings = [
        [0.12, 0.78],
        [0.88, 0.22],
        [0.55, 0.55],
      ];
      for (const [fx, fy] of pings) {
        ctx!.beginPath();
        ctx!.arc(w * fx, h * fy, Math.max(1.4, tick(0.7) * s), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    function drawKind(kind: Kind, s: number, a: number, prog: number, side: number) {
      switch (kind) {
        case "reticle":
          drawReticle(s, a);
          break;
        case "explosion":
          drawExplosion(s, a, prog);
          break;
        case "face":
          drawFace(s, a, side);
          break;
        case "gears":
          drawGears(s, a, prog);
          break;
        case "map":
          drawMap(s, a, prog);
          break;
      }
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;
      const f = elapsed / LOOP_MS; // 0..1

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";

      // --- background: warm near-black with a faint breathing floor light ---
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);
      const floor = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.52,
        0,
        W * 0.5,
        H * 0.52,
        Math.max(W, H) * 0.7
      );
      const breathe = 0.16 + 0.06 * Math.sin(elapsed * 0.0009);
      floor.addColorStop(0, `rgba(40,32,14,${breathe})`);
      floor.addColorStop(0.55, "rgba(20,16,8,0.06)");
      floor.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = floor;
      ctx!.fillRect(0, 0, W, H);

      // --- resolve which flashes are active; track the strongest "hard" hit ---
      let hardFlash = 0; // 0..1 for chromatic snap + light leak this frame
      let frameFlashGlow = 0; // total brightness for additive bloom

      // We draw imagery in an additive pass for that metallic light feel.
      for (const fl of FLASHES) {
        // distance into this flash, accounting for loop wrap
        let d = f - fl.start;
        if (d < 0) d += 1;
        if (d > fl.dur) continue;
        const local = d / fl.dur; // 0..1 within flash

        // envelope: snap on, brief hold, snap off — with sub-frame stutter
        // so it reads as a film strobe rather than a smooth fade.
        let env = local < 0.18 ? easeOutCubic(local / 0.18) : 1 - easeInOut((local - 0.18) / 0.82);
        env = clamp01(env);
        // strobe stutter: drop a couple of intermediate frames
        const stut = Math.sin(local * Math.PI * (fl.hard ? 9 : 6));
        env *= 0.78 + 0.22 * (stut > -0.2 ? 1 : 0.45);
        if (env <= 0.01) continue;

        frameFlashGlow = Math.max(frameFlashGlow, env * fl.scale);
        if (fl.hard) hardFlash = Math.max(hardFlash, env);

        // position: biased by side, with slight deterministic vertical drift
        const cx = W * (0.5 + fl.side * 0.22);
        const cy = H * (0.5 + Math.sin(fl.start * 31.4) * 0.12);
        const baseScale =
          (Math.min(W, H) / 100) > 0 ? fl.scale * (0.85 + 0.3 * Math.min(W, H) / Math.max(W, H)) : fl.scale;

        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        ctx!.translate(cx, cy);
        // hard flashes get a tiny chromatic-aberration triple-draw (R/G/B split)
        if (fl.hard && env > 0.4) {
          const off = tick(0.6) * env;
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          // warm (red-ish) ghost
          ctx!.translate(-off, 0);
          ctx!.filter = "none";
          ctx!.globalAlpha = 1;
          ctx!.save();
          ctx!.globalAlpha = 0.5;
          ctx!.translate(0, 0);
          drawTinted(fl.kind, baseScale, env * 0.5, local, fl.side, "rgba(255,90,40,1)");
          ctx!.restore();
          ctx!.restore();
          ctx!.save();
          ctx!.translate(off, 0);
          drawTinted(fl.kind, baseScale, env * 0.5, local, fl.side, "rgba(40,140,255,1)");
          ctx!.restore();
        }
        // main gold draw
        drawKind(fl.kind, baseScale, env, local, fl.side);
        ctx!.restore();
      }

      // --- thin metallic credit lines wiping across ---
      drawCredits(f, elapsed);

      // --- light leak on hard flashes (diagonal warm streak) ---
      if (hardFlash > 0.05) {
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        const lx = W * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(elapsed * 0.004)));
        const lg = ctx!.createLinearGradient(lx - W * 0.4, 0, lx + W * 0.4, H);
        const la = hardFlash * 0.22;
        lg.addColorStop(0, "rgba(212,175,55,0)");
        lg.addColorStop(0.5, `rgba(232,201,106,${la})`);
        lg.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = lg;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // --- additive bloom wash tied to flash brightness ---
      if (frameFlashGlow > 0.02) {
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        const bg = ctx!.createRadialGradient(
          W * 0.5,
          H * 0.5,
          0,
          W * 0.5,
          H * 0.5,
          Math.max(W, H) * 0.55
        );
        const ba = frameFlashGlow * 0.1;
        bg.addColorStop(0, `rgba(232,201,106,${ba})`);
        bg.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = bg;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // --- hard white-gold frame flash on the biggest hits ---
      if (hardFlash > 0.6) {
        const fk = (hardFlash - 0.6) / 0.4;
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        ctx!.fillStyle = `rgba(232,201,106,${fk * 0.12})`;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // --- moving scanline band (projector sweep) ---
      const scanY = ((elapsed / LOOP_MS) * 3 * H) % (H + 80) - 40;
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const sg = ctx!.createLinearGradient(0, scanY - tick(8), 0, scanY + tick(8));
      sg.addColorStop(0, "rgba(212,175,55,0)");
      sg.addColorStop(0.5, "rgba(232,201,106,0.05)");
      sg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = sg;
      ctx!.fillRect(0, scanY - tick(8), W, tick(16));
      ctx!.restore();

      // --- fine horizontal scanlines overlay ---
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      ctx!.fillStyle = "#000";
      const lineGap = Math.max(2, tick(0.4));
      for (let y = 0; y < H; y += lineGap * 2) {
        ctx!.fillRect(0, y, W, lineGap);
      }
      ctx!.restore();

      // --- vignette ---
      ctx!.save();
      const vg = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.5,
        Math.min(W, H) * 0.28,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.72
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.74, "rgba(0,0,0,0.52)");
      vg.addColorStop(1, "rgba(0,0,0,0.96)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // --- film grain (procedural sparse dots), heavier on flash frames ---
      ctx!.save();
      ctx!.globalAlpha = 0.05 + frameFlashGlow * 0.04;
      const grainN = Math.floor((W * H) / 2400);
      ctx!.fillStyle = "#fff";
      for (let i = 0; i < grainN; i++) {
        const gx = rnd() * W;
        const gy = rnd() * H;
        ctx!.fillRect(gx, gy, 1, 1);
      }
      ctx!.restore();

      raf = requestAnimationFrame(draw);
    }

    // tinted ghost pass for chromatic snap — reuses geometry via shadow-color trick
    function drawTinted(
      kind: Kind,
      s: number,
      a: number,
      prog: number,
      side: number,
      tint: string
    ) {
      ctx!.save();
      // draw the kind, then recolor by compositing tint through it
      ctx!.globalAlpha = a;
      // Temporarily override the gold strokes/fills by globalCompositeOperation.
      // Simplest robust approach: draw geometry in the tint color directly.
      const prevGold = ctx!.strokeStyle;
      ctx!.strokeStyle = tint;
      ctx!.fillStyle = tint;
      // We re-run the kind drawers but they hardcode gold; so instead we apply
      // a tint by drawing into the same path with a colored multiply. To keep
      // this dependency-free and cheap, we just stamp a tinted soft copy.
      setGlow(tick(1.2), tint);
      drawKindMono(kind, s, a, prog, side, tint);
      clearGlow();
      ctx!.strokeStyle = prevGold;
      ctx!.restore();
    }

    // Monochrome variant of the imagery in an arbitrary color (for RGB split).
    function drawKindMono(
      kind: Kind,
      s: number,
      a: number,
      prog: number,
      side: number,
      color: string
    ) {
      ctx!.save();
      ctx!.globalAlpha = a;
      ctx!.strokeStyle = color;
      ctx!.fillStyle = color;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      const u = tick(1) * s;
      if (kind === "reticle") {
        const R = tick(22) * s;
        ctx!.lineWidth = Math.max(1, tick(0.4) * s);
        ctx!.beginPath();
        ctx!.arc(0, 0, R, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(-R * 1.5, 0);
        ctx!.lineTo(R * 1.5, 0);
        ctx!.moveTo(0, -R * 1.5);
        ctx!.lineTo(0, R * 1.5);
        ctx!.stroke();
      } else if (kind === "explosion") {
        const R = tick(30) * s * (0.7 + prog * 0.6);
        ctx!.lineWidth = Math.max(1, tick(0.5) * s);
        for (let i = 0; i < 16; i++) {
          const ang = (i / 16) * Math.PI * 2;
          ctx!.beginPath();
          ctx!.moveTo(0, 0);
          ctx!.lineTo(Math.cos(ang) * R, Math.sin(ang) * R);
          ctx!.stroke();
        }
      } else if (kind === "gears") {
        const base = tick(14) * s;
        ctx!.lineWidth = Math.max(1, tick(0.4) * s);
        ctx!.beginPath();
        ctx!.arc(0, 0, base, 0, Math.PI * 2);
        ctx!.stroke();
      } else if (kind === "map") {
        const w = tick(60) * s;
        const h = tick(40) * s;
        ctx!.lineWidth = Math.max(1, tick(0.3) * s);
        ctx!.strokeRect(-w / 2, -h / 2, w, h);
      } else if (kind === "face") {
        ctx!.translate(side * tick(4), 0);
        ctx!.lineWidth = Math.max(1, tick(0.45) * s);
        ctx!.beginPath();
        ctx!.moveTo(8 * u, -34 * u);
        ctx!.bezierCurveTo(-20 * u, -34 * u, -22 * u, -2 * u, -15 * u, 2 * u);
        ctx!.lineTo(-14 * u, 12 * u);
        ctx!.bezierCurveTo(-10 * u, 22 * u, 10 * u, 28 * u, 22 * u, 38 * u);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawCredits(f: number, elapsed: number) {
      for (const c of CREDITS) {
        let d = f - c.at;
        if (d < 0) d += 1;
        if (d > c.dur) continue;
        const local = d / c.dur; // 0..1

        // wipe-in from left, hold, wipe-out to right via a clip window
        const inE = easeOutCubic(clamp01(local / 0.22));
        const outE = easeInOut(clamp01((local - 0.78) / 0.22));
        const alpha = clamp01(inE) * (1 - clamp01(outE));
        if (alpha <= 0.01) continue;

        const cy = H * c.y;
        const fontPx = (c.big ? tick(5.2) : tick(3.4));
        const subPx = tick(1.7);

        // the sliding clip reveal (text appears under a moving gold edge)
        const revealX = W * (0.12 + 0.76 * easeOutCubic(clamp01(local / 0.42)));

        ctx!.save();
        // thin metallic rule line that slides across
        ctx!.globalCompositeOperation = "lighter";
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.globalAlpha = alpha * 0.9;
        ctx!.lineWidth = Math.max(1, tick(0.16));
        setGlow(tick(1.0), GOLD);
        const ruleY = cy + fontPx * 0.78;
        ctx!.beginPath();
        ctx!.moveTo(W * 0.12, ruleY);
        ctx!.lineTo(revealX, ruleY);
        ctx!.stroke();
        // a brighter leading nib on the rule
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.arc(revealX, ruleY, Math.max(1.2, tick(0.4)), 0, Math.PI * 2);
        ctx!.fill();
        clearGlow();

        // clip text to the revealed region so it "wipes" in under the rule
        ctx!.beginPath();
        ctx!.rect(0, cy - fontPx, revealX, fontPx * 2.4);
        ctx!.clip();

        ctx!.globalCompositeOperation = "source-over";
        ctx!.textAlign = "left";
        ctx!.textBaseline = "alphabetic";

        // main credit line — Cinzel, letterspaced via manual stamping
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.globalAlpha = alpha;
        setGlow(tick(0.8), GOLD);
        ctx!.font = `600 ${fontPx}px var(--font-cinzel), serif`;
        const tx = W * 0.13;
        // letter-spacing emulation
        const ls = c.big ? tick(0.9) : tick(0.5);
        stampSpaced(c.text, tx, cy, ls);
        clearGlow();

        // sub label — DM Sans, smaller, dimmer
        ctx!.fillStyle = GOLD;
        ctx!.globalAlpha = alpha * 0.7;
        ctx!.font = `500 ${subPx}px var(--font-dm-sans), sans-serif`;
        stampSpaced(c.sub, tx, cy - fontPx * 0.85, tick(0.6));
        ctx!.restore();
      }
    }

    // draw text with manual per-glyph spacing (for letterspaced credit feel)
    function stampSpaced(text: string, x: number, y: number, ls: number) {
      let cx = x;
      for (const ch of text) {
        ctx!.fillText(ch, cx, y);
        cx += ctx!.measureText(ch).width + ls;
      }
    }

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: BG,
        width: "100%",
        height: "100%",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
