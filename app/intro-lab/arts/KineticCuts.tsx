"use client";

import { useEffect, useRef } from "react";

/**
 * KineticCuts — Bourne-edit energy. Beat-synced HARD jump-cuts between abstract
 * gold fragments: a slashing line, a reticle, a coordinate readout, a running
 * silhouette, an eye, a barrel. Each fragment SLAMS on for a fraction of a
 * second with a black flash between cuts, accelerating then settling. Each cut
 * carries a brief directional motion-blur smear + chromatic (R/B) snap, with
 * film grain, bloom and vignette throughout. Seamless infinite loop.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

// easing helpers
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

// Fragment identities, drawn abstractly in gold.
type Frag = "slash" | "reticle" | "coords" | "runner" | "eye" | "barrel";

// The cut score. Each entry = one hard cut. `dur` is a base weight; the loop
// accelerates (durations shrink) toward the climax then settles back so the
// final cut flows seamlessly into the first. Anchors give each slam a spatial
// origin so the directional motion-blur smear reads as a real edit jolt.
type Beat = { frag: Frag; dur: number; ax: number; ay: number };
const SCORE: Beat[] = [
  // settle-in (slower, breathing)
  { frag: "eye", dur: 1.55, ax: 0.5, ay: 0.46 },
  { frag: "slash", dur: 1.0, ax: 0.2, ay: 0.7 },
  { frag: "coords", dur: 1.2, ax: 0.62, ay: 0.36 },
  { frag: "reticle", dur: 0.95, ax: 0.5, ay: 0.5 },
  // accelerate — percussive
  { frag: "runner", dur: 0.78, ax: 0.38, ay: 0.58 },
  { frag: "barrel", dur: 0.7, ax: 0.5, ay: 0.5 },
  { frag: "slash", dur: 0.55, ax: 0.78, ay: 0.32 },
  { frag: "eye", dur: 0.5, ax: 0.32, ay: 0.4 },
  { frag: "reticle", dur: 0.42, ax: 0.66, ay: 0.6 },
  { frag: "coords", dur: 0.38, ax: 0.4, ay: 0.66 },
  // climax — machine-gun
  { frag: "barrel", dur: 0.3, ax: 0.5, ay: 0.5 },
  { frag: "slash", dur: 0.28, ax: 0.3, ay: 0.3 },
  { frag: "runner", dur: 0.3, ax: 0.68, ay: 0.55 },
  { frag: "reticle", dur: 0.26, ax: 0.46, ay: 0.46 },
  { frag: "eye", dur: 0.3, ax: 0.55, ay: 0.5 },
  { frag: "slash", dur: 0.26, ax: 0.72, ay: 0.66 },
  { frag: "barrel", dur: 0.28, ax: 0.4, ay: 0.42 },
  // settle-out — decelerate back toward the opening tempo (seamless)
  { frag: "coords", dur: 0.55, ax: 0.58, ay: 0.4 },
  { frag: "runner", dur: 0.85, ax: 0.45, ay: 0.6 },
  { frag: "reticle", dur: 1.15, ax: 0.5, ay: 0.5 },
];

// Per-cut wall-clock budget. Total loop ≈ SCORE durations * UNIT_MS.
const UNIT_MS = 360;
const BLACK_FRAC = 0.16; // fraction of each cut spent on the black flash
const SMEAR_FRAC = 0.34; // fraction (after black) carrying motion-blur smear

export default function KineticCuts() {
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

    // Precompute cumulative cut timeline.
    const cuts = SCORE.map((b) => b.dur * UNIT_MS);
    const starts: number[] = [];
    let acc = 0;
    for (const c of cuts) {
      starts.push(acc);
      acc += c;
    }
    const LOOP_MS = acc;

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

    // Seeded pseudo-random for stable-but-flickery readouts + grain.
    let seed = 90187;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    // grain uses its own walking seed so it shimmers every frame
    let grainSeed = 24681;
    const grnd = () => {
      grainSeed = (grainSeed * 1103515245 + 12345) & 0x7fffffff;
      return grainSeed / 0x7fffffff;
    };

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    const tk = (v: number) => v * unit;

    // ---- Fragment renderers. Each draws an abstract gold mark centered on
    // (cx,cy), at scale s (px), with stroke intensity `ink` (0..1) and a small
    // deterministic per-cut seed for internal variation. ----

    function drawSlash(cx: number, cy: number, s: number, ink: number, idx: number) {
      // a diagonal slashing line with a few parallel ghost strokes
      const ang = (idx % 2 === 0 ? -1 : 1) * (Math.PI / 4 + (idx * 0.13) % 0.3);
      const len = s * 1.7;
      const dx = Math.cos(ang) * len;
      const dy = Math.sin(ang) * len;
      ctx!.save();
      ctx!.lineCap = "round";
      for (let g = 2; g >= 0; g--) {
        const off = g * tk(1.6) * (idx % 2 === 0 ? 1 : -1);
        const a = ink * (g === 0 ? 1 : 0.28 - g * 0.07);
        ctx!.globalAlpha = a;
        setGlow(tk(2.0), g === 0 ? GOLD_LIGHT : GOLD);
        ctx!.strokeStyle = g === 0 ? GOLD_LIGHT : GOLD;
        ctx!.lineWidth = Math.max(1, tk(g === 0 ? 0.9 : 0.4));
        ctx!.beginPath();
        ctx!.moveTo(cx - dx / 2 - dy * 0.02 + off, cy - dy / 2 + dx * 0.02 + off);
        ctx!.lineTo(cx + dx / 2 - dy * 0.02 + off, cy + dy / 2 + dx * 0.02 + off);
        ctx!.stroke();
      }
      // bright nick at the leading tip
      ctx!.globalAlpha = ink;
      setGlow(tk(3), GOLD_LIGHT);
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.beginPath();
      ctx!.arc(cx + dx / 2, cy + dy / 2, Math.max(1.3, tk(0.7)), 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
      clearGlow();
    }

    function drawReticle(cx: number, cy: number, s: number, ink: number, idx: number) {
      const R = s * 0.62;
      ctx!.save();
      ctx!.lineCap = "round";
      setGlow(tk(2), GOLD);
      ctx!.strokeStyle = GOLD;
      ctx!.globalAlpha = ink * 0.9;
      ctx!.lineWidth = Math.max(1, tk(0.4));
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.stroke();
      // segmented inner ring (4 arcs), rotated per cut
      const rot = idx * 0.7;
      ctx!.lineWidth = Math.max(1, tk(0.5));
      for (let i = 0; i < 4; i++) {
        const a0 = i * (Math.PI / 2) + Math.PI / 8 + rot;
        ctx!.beginPath();
        ctx!.arc(cx, cy, R * 0.7, a0, a0 + Math.PI / 4);
        ctx!.stroke();
      }
      // crosshair with center gap
      const gap = R * 0.34;
      const reach = R * 1.4;
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.globalAlpha = ink;
      ctx!.lineWidth = Math.max(1, tk(0.36));
      ctx!.beginPath();
      ctx!.moveTo(cx - reach, cy);
      ctx!.lineTo(cx - gap, cy);
      ctx!.moveTo(cx + gap, cy);
      ctx!.lineTo(cx + reach, cy);
      ctx!.moveTo(cx, cy - reach);
      ctx!.lineTo(cx, cy - gap);
      ctx!.moveTo(cx, cy + gap);
      ctx!.lineTo(cx, cy + reach);
      ctx!.stroke();
      // center dot
      setGlow(tk(3), GOLD_LIGHT);
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.beginPath();
      ctx!.arc(cx, cy, Math.max(1.2, tk(0.6)), 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
      clearGlow();
    }

    function drawCoords(cx: number, cy: number, s: number, ink: number, idx: number) {
      // a monospaced coordinate / dossier readout block
      const fs = s * 0.2;
      ctx!.save();
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "left";
      setGlow(tk(1.2), GOLD);
      const lines = [
        `${(40 + (idx * 7) % 50).toString().padStart(2, "0")}.${Math.floor(rnd() * 9000 + 1000)}`,
        `${(70 + (idx * 11) % 40).toString().padStart(2, "0")}.${Math.floor(rnd() * 9000 + 1000)}`,
        `REF ${(idx * 1373 % 9999).toString().padStart(4, "0")}`,
        `SEC // ${["ALPHA", "BRAVO", "DELTA", "ECHO"][idx % 4]}`,
      ];
      const lh = fs * 1.5;
      const x0 = cx - s * 0.55;
      const y0 = cy - lh * 1.5;
      // ledger rule lines behind text
      ctx!.globalAlpha = ink * 0.25;
      ctx!.strokeStyle = GOLD_AMBER;
      ctx!.lineWidth = 1;
      for (let i = 0; i < lines.length; i++) {
        ctx!.beginPath();
        ctx!.moveTo(x0, y0 + i * lh + lh * 0.55);
        ctx!.lineTo(x0 + s * 1.1, y0 + i * lh + lh * 0.55);
        ctx!.stroke();
      }
      // a couple "redacted" gold bars
      ctx!.globalAlpha = ink * 0.85;
      ctx!.fillStyle = GOLD_AMBER;
      ctx!.fillRect(x0 + s * 0.5, y0 + lh * 0.18, s * 0.5, fs * 0.8);
      ctx!.fillRect(x0 + s * 0.2, y0 + lh * 2.18, s * 0.35, fs * 0.8);
      // text
      ctx!.font = `600 ${fs}px var(--font-dm-sans), monospace`;
      for (let i = 0; i < lines.length; i++) {
        ctx!.fillStyle = i === 0 ? GOLD_LIGHT : GOLD;
        ctx!.globalAlpha = ink * (i === 0 ? 1 : 0.8);
        ctx!.fillText(lines[i], x0, y0 + i * lh);
      }
      ctx!.restore();
      clearGlow();
    }

    function drawRunner(cx: number, cy: number, s: number, ink: number, idx: number) {
      // abstract running silhouette: a gold figure mid-stride (stick-form,
      // weighted strokes) leaning into motion.
      const flip = idx % 2 === 0 ? 1 : -1;
      const h = s * 1.5;
      ctx!.save();
      ctx!.translate(cx, cy + h * 0.1);
      ctx!.scale(flip, 1);
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      setGlow(tk(2.2), GOLD);
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.globalAlpha = ink;
      const lw = Math.max(2, tk(1.1));
      ctx!.lineWidth = lw;
      const u = h / 8;
      // lean forward
      const lean = u * 0.6;
      // head
      ctx!.beginPath();
      ctx!.arc(lean * 1.4, -u * 3.4, u * 0.7, 0, Math.PI * 2);
      ctx!.fill();
      // torso
      ctx!.beginPath();
      ctx!.moveTo(lean * 1.2, -u * 2.7);
      ctx!.lineTo(lean * 0.2, -u * 0.4);
      ctx!.stroke();
      // arms (driving)
      ctx!.beginPath();
      ctx!.moveTo(lean * 0.9, -u * 2.1);
      ctx!.lineTo(lean * 2.3, -u * 1.2);
      ctx!.moveTo(lean * 0.9, -u * 2.1);
      ctx!.lineTo(lean * -1.0, -u * 1.4);
      ctx!.stroke();
      // legs (split stride)
      ctx!.beginPath();
      ctx!.moveTo(lean * 0.2, -u * 0.4);
      ctx!.lineTo(lean * 1.8, u * 1.9);
      ctx!.moveTo(lean * 0.2, -u * 0.4);
      ctx!.lineTo(lean * -1.4, u * 1.6);
      ctx!.stroke();
      // motion streaks trailing behind
      ctx!.globalAlpha = ink * 0.4;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = Math.max(1, tk(0.4));
      setGlow(0, "transparent");
      for (let i = 0; i < 3; i++) {
        const yy = -u * 2 + i * u * 1.5;
        ctx!.beginPath();
        ctx!.moveTo(-u * 2.2 - i * u, yy);
        ctx!.lineTo(-u * 0.6, yy);
        ctx!.stroke();
      }
      ctx!.restore();
      clearGlow();
    }

    function drawEye(cx: number, cy: number, s: number, ink: number, idx: number) {
      // an almond eye: outer lid arcs, iris ring, pupil, glint.
      const w = s * 1.2;
      const h = s * 0.62;
      ctx!.save();
      ctx!.lineCap = "round";
      setGlow(tk(2), GOLD);
      ctx!.strokeStyle = GOLD;
      ctx!.globalAlpha = ink;
      ctx!.lineWidth = Math.max(1, tk(0.55));
      // upper lid
      ctx!.beginPath();
      ctx!.moveTo(cx - w / 2, cy);
      ctx!.quadraticCurveTo(cx, cy - h, cx + w / 2, cy);
      // lower lid
      ctx!.quadraticCurveTo(cx, cy + h, cx - w / 2, cy);
      ctx!.stroke();
      // iris
      const ir = h * 0.92;
      const gaze = ((idx % 3) - 1) * w * 0.12; // glance varies per cut
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.lineWidth = Math.max(1, tk(0.6));
      ctx!.beginPath();
      ctx!.arc(cx + gaze, cy, ir, 0, Math.PI * 2);
      ctx!.stroke();
      // radial iris fibers
      ctx!.globalAlpha = ink * 0.5;
      ctx!.lineWidth = Math.max(1, tk(0.25));
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx!.beginPath();
        ctx!.moveTo(cx + gaze + Math.cos(a) * ir * 0.45, cy + Math.sin(a) * ir * 0.45);
        ctx!.lineTo(cx + gaze + Math.cos(a) * ir * 0.95, cy + Math.sin(a) * ir * 0.95);
        ctx!.stroke();
      }
      // pupil
      ctx!.globalAlpha = ink;
      setGlow(tk(2.5), GOLD_LIGHT);
      ctx!.fillStyle = "#1a1208";
      ctx!.beginPath();
      ctx!.arc(cx + gaze, cy, ir * 0.42, 0, Math.PI * 2);
      ctx!.fill();
      // glint
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.beginPath();
      ctx!.arc(cx + gaze - ir * 0.18, cy - ir * 0.18, Math.max(1, tk(0.55)), 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
      clearGlow();
    }

    function drawBarrel(cx: number, cy: number, s: number, ink: number, idx: number) {
      // looking down a gun barrel: concentric rings of rifling + a bright
      // muzzle eye at center. Classic Bond cold-open geometry, abstracted.
      const R = s * 0.78;
      ctx!.save();
      const spin = idx * 0.5;
      // rifling grooves (spiral-ish radial ticks)
      ctx!.globalAlpha = ink * 0.7;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = Math.max(1, tk(0.4));
      setGlow(tk(1.5), GOLD);
      const grooves = 16;
      for (let i = 0; i < grooves; i++) {
        const a = (i / grooves) * Math.PI * 2 + spin;
        ctx!.beginPath();
        ctx!.moveTo(cx + Math.cos(a) * R * 0.5, cy + Math.sin(a) * R * 0.5);
        ctx!.lineTo(cx + Math.cos(a + 0.18) * R, cy + Math.sin(a + 0.18) * R);
        ctx!.stroke();
      }
      // concentric rings
      for (let i = 0; i < 3; i++) {
        ctx!.globalAlpha = ink * (0.85 - i * 0.2);
        ctx!.lineWidth = Math.max(1, tk(0.5 - i * 0.1));
        ctx!.strokeStyle = i === 0 ? GOLD_LIGHT : GOLD;
        ctx!.beginPath();
        ctx!.arc(cx, cy, R * (1 - i * 0.16), 0, Math.PI * 2);
        ctx!.stroke();
      }
      // bright muzzle core
      ctx!.globalAlpha = ink;
      setGlow(tk(4), GOLD_LIGHT);
      const core = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 0.4);
      core.addColorStop(0, GOLD_LIGHT);
      core.addColorStop(0.5, GOLD);
      core.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 0.4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
      clearGlow();
    }

    function drawFrag(
      frag: Frag,
      cx: number,
      cy: number,
      s: number,
      ink: number,
      idx: number
    ) {
      switch (frag) {
        case "slash":
          return drawSlash(cx, cy, s, ink, idx);
        case "reticle":
          return drawReticle(cx, cy, s, ink, idx);
        case "coords":
          return drawCoords(cx, cy, s, ink, idx);
        case "runner":
          return drawRunner(cx, cy, s, ink, idx);
        case "eye":
          return drawEye(cx, cy, s, ink, idx);
        case "barrel":
          return drawBarrel(cx, cy, s, ink, idx);
      }
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;

      // locate the active cut
      let idx = 0;
      for (let i = 0; i < starts.length; i++) {
        if (elapsed >= starts[i]) idx = i;
        else break;
      }
      const beat = SCORE[idx];
      const cutDur = cuts[idx];
      const local = (elapsed - starts[idx]) / cutDur; // 0..1 within this cut

      // --- background: hard black base ---
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      // The black flash: the opening slice of each cut is (near) pure black,
      // so fragments SLAM in after darkness — the percussive jump-cut beat.
      const inBlack = local < BLACK_FRAC;
      const blackK = inBlack ? 1 : 0;

      // appearance envelope after the black flash
      const aliveT = clamp01((local - BLACK_FRAC) / (1 - BLACK_FRAC)); // 0..1
      // slam in fast (easeOutBack-ish punch), hold, then a tiny pre-cut dip
      const slam = easeOutBack(clamp01(aliveT / 0.18));
      const settle = aliveT < 0.18 ? slam : 1 - (aliveT - 0.18) * 0.12;
      const ink = inBlack ? 0 : clamp01(settle) * 0.95 + 0.05;

      if (!inBlack) {
        // subtle radial floor light so the gold sits in depth, not flat black
        const floor = ctx!.createRadialGradient(
          W * 0.5,
          H * 0.5,
          0,
          W * 0.5,
          H * 0.5,
          Math.max(W, H) * 0.7
        );
        floor.addColorStop(0, "rgba(40,32,14,0.20)");
        floor.addColorStop(0.55, "rgba(20,16,8,0.06)");
        floor.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = floor;
        ctx!.fillRect(0, 0, W, H);

        // fragment placement + scale (vmin based, responsive)
        const baseS = unit * 26;
        // tiny handheld jitter that decays as the cut settles
        const jitter = (1 - clamp01(aliveT / 0.3)) * tk(1.2);
        const jx = Math.sin(elapsed * 0.06) * jitter;
        const jy = Math.cos(elapsed * 0.07) * jitter;
        const cx = beat.ax * W + jx;
        const cy = beat.ay * H + jy;

        // overshoot scale on the slam, then settle to 1
        const sScale = 0.86 + 0.18 * clamp01(slam);
        const s = baseS * sScale;

        // --- motion-blur smear: during the slam window, redraw the fragment a
        // few times offset along the entry vector with falloff alpha. Reads as
        // a directional edit jolt. ---
        const smear = clamp01(1 - aliveT / SMEAR_FRAC); // 1 -> 0
        if (smear > 0.02) {
          // entry direction from the anchor toward center of frame
          const dirx = (0.5 - beat.ax);
          const diry = (0.5 - beat.ay);
          const dlen = Math.hypot(dirx, diry) || 1;
          const ux = dirx / dlen;
          const uy = diry / dlen;
          const reach = tk(10) * smear;
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          const ghosts = 5;
          for (let g = 1; g <= ghosts; g++) {
            const gf = g / ghosts;
            ctx!.globalAlpha = smear * (0.22 * (1 - gf));
            drawFrag(
              beat.frag,
              cx - ux * reach * gf,
              cy - uy * reach * gf,
              s,
              0.6,
              idx
            );
          }
          ctx!.restore();
        }

        // --- chromatic snap: on the slam, split a red + blue ghost of the
        // fragment, offset opposite each other; the split collapses to zero as
        // the cut settles. ---
        const chroma = clamp01(1 - aliveT / 0.42);
        if (chroma > 0.02) {
          const off = tk(0.9) * chroma + tk(0.3);
          // Draw offset red + blue silhouette ghosts that read as RGB fringing
          // against the crisp center copy.
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          ctx!.translate(off, 0);
          ctx!.globalAlpha = chroma * 0.35;
          drawFragTint(beat.frag, cx, cy, s, idx, "rgba(255,70,50,0.9)");
          ctx!.translate(-2 * off, 0);
          drawFragTint(beat.frag, cx, cy, s, idx, "rgba(60,120,255,0.9)");
          ctx!.restore();
        }

        // --- crisp center copy of the fragment ---
        drawFrag(beat.frag, cx, cy, s, ink, idx);

        // --- bloom pass behind the fragment ---
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        const bloomR = s * 1.1;
        const bloom = ctx!.createRadialGradient(cx, cy, 0, cx, cy, bloomR);
        const bloomA = 0.1 + clamp01(slam) * 0.14;
        bloom.addColorStop(0, `rgba(232,201,106,${bloomA})`);
        bloom.addColorStop(0.5, `rgba(212,175,55,${bloomA * 0.4})`);
        bloom.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = bloom;
        ctx!.beginPath();
        ctx!.arc(cx, cy, bloomR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        // --- impact flash on the very first frames after black (the "slam") ---
        const flashK = clamp01(1 - aliveT / 0.1);
        if (flashK > 0.02) {
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          ctx!.fillStyle = `rgba(232,201,106,${flashK * 0.12})`;
          ctx!.fillRect(0, 0, W, H);
          ctx!.restore();
        }
      }

      // --- horizontal datamosh sliver on the cut boundary (edit artifact) ---
      if (!inBlack && aliveT < 0.14) {
        const bands = 3;
        ctx!.save();
        for (let i = 0; i < bands; i++) {
          const by = rnd() * H;
          const bh = tk(0.8 + rnd() * 2);
          const shift = (rnd() - 0.5) * tk(6) * (1 - aliveT / 0.14);
          // copy a thin band of the current canvas, offset horizontally
          try {
            ctx!.drawImage(canvas!, 0, by * dpr, W * dpr, bh * dpr, shift, by, W, bh);
          } catch {
            /* ignore drawImage edge cases */
          }
        }
        ctx!.restore();
      }

      // --- residual black-flash overlay (darkens the gap between cuts) ---
      if (blackK > 0) {
        ctx!.save();
        ctx!.fillStyle = `rgba(0,0,0,${0.92})`;
        ctx!.fillRect(0, 0, W, H);
        // a single bright seam of gold tearing the darkness — keeps the black
        // alive rather than dead, and telegraphs the incoming slam.
        const seamY = H * (0.2 + (idx % 5) * 0.15);
        const seamK = clamp01(local / BLACK_FRAC);
        ctx!.globalCompositeOperation = "lighter";
        ctx!.globalAlpha = (1 - Math.abs(seamK - 0.5) * 2) * 0.5;
        const seam = ctx!.createLinearGradient(0, seamY - tk(1), 0, seamY + tk(1));
        seam.addColorStop(0, "rgba(212,175,55,0)");
        seam.addColorStop(0.5, "rgba(232,201,106,0.8)");
        seam.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = seam;
        const seamW = W * seamK;
        ctx!.fillRect(W / 2 - seamW / 2, seamY - tk(1), seamW, tk(2));
        ctx!.restore();
      }

      // --- moving scanline band (surveillance feed) ---
      const scanY = ((elapsed / LOOP_MS) * 4 * H) % (H + 80) - 40;
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const sg = ctx!.createLinearGradient(0, scanY - tk(6), 0, scanY + tk(6));
      sg.addColorStop(0, "rgba(212,175,55,0)");
      sg.addColorStop(0.5, "rgba(232,201,106,0.05)");
      sg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = sg;
      ctx!.fillRect(0, scanY - tk(6), W, tk(12));
      ctx!.restore();

      // fine horizontal scanlines overlay (CRT feed)
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      ctx!.fillStyle = "#000";
      const lineGap = Math.max(2, tk(0.4));
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
      vg.addColorStop(0.72, "rgba(0,0,0,0.5)");
      vg.addColorStop(1, "rgba(0,0,0,0.96)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // --- film grain (procedural, shimmering every frame) ---
      ctx!.save();
      ctx!.globalAlpha = inBlack ? 0.08 : 0.055;
      const grainN = Math.floor((W * H) / 2400);
      ctx!.fillStyle = "#fff";
      for (let i = 0; i < grainN; i++) {
        const gx = grnd() * W;
        const gy = grnd() * H;
        ctx!.fillRect(gx, gy, 1, 1);
      }
      ctx!.restore();

      raf = requestAnimationFrame(draw);
    }

    // tinted ghost renderer for the chromatic snap — draws a simplified
    // silhouette of the fragment in a given color so we get color fringing
    // without rewriting every renderer to take a color arg.
    function drawFragTint(
      frag: Frag,
      cx: number,
      cy: number,
      s: number,
      idx: number,
      color: string
    ) {
      ctx!.save();
      ctx!.strokeStyle = color;
      ctx!.fillStyle = color;
      ctx!.globalAlpha = ctx!.globalAlpha;
      clearGlow();
      ctx!.lineWidth = Math.max(1, tk(0.6));
      ctx!.lineCap = "round";
      switch (frag) {
        case "slash": {
          const ang = (idx % 2 === 0 ? -1 : 1) * (Math.PI / 4);
          const len = s * 1.7;
          ctx!.beginPath();
          ctx!.moveTo(cx - Math.cos(ang) * len * 0.5, cy - Math.sin(ang) * len * 0.5);
          ctx!.lineTo(cx + Math.cos(ang) * len * 0.5, cy + Math.sin(ang) * len * 0.5);
          ctx!.stroke();
          break;
        }
        case "reticle":
        case "barrel": {
          ctx!.beginPath();
          ctx!.arc(cx, cy, s * (frag === "barrel" ? 0.78 : 0.62), 0, Math.PI * 2);
          ctx!.stroke();
          break;
        }
        case "eye": {
          const w = s * 1.2;
          const h = s * 0.62;
          ctx!.beginPath();
          ctx!.moveTo(cx - w / 2, cy);
          ctx!.quadraticCurveTo(cx, cy - h, cx + w / 2, cy);
          ctx!.quadraticCurveTo(cx, cy + h, cx - w / 2, cy);
          ctx!.stroke();
          break;
        }
        case "runner": {
          ctx!.beginPath();
          ctx!.arc(cx + s * 0.1, cy - s * 0.6, s * 0.13, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(cx + s * 0.08, cy - s * 0.5);
          ctx!.lineTo(cx, cy + s * 0.1);
          ctx!.stroke();
          break;
        }
        case "coords": {
          ctx!.globalAlpha *= 0.6;
          ctx!.fillRect(cx - s * 0.55, cy - s * 0.3, s * 1.1, tk(0.6));
          ctx!.fillRect(cx - s * 0.55, cy, s * 0.8, tk(0.6));
          break;
        }
      }
      ctx!.restore();
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
