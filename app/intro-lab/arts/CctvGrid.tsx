"use client";

import { useEffect, useRef } from "react";

/**
 * CctvGrid — surveillance-room wall of nine gold-phosphor monitors.
 *
 * A 3x3 grid of security feeds glows on black: each cell runs its own
 * abstract wireframe scene (a walking dot, a sweeping radar, a creeping
 * tracked figure, a heartbeat pulse) under scanlines with a CAM label,
 * ticking timestamp and blinking REC dot. Periodically the room locks on
 * one feed — that cell ZOOMS to fill the whole frame, holds as "the
 * watched subject," then snaps back to the wall as a scanline rolls and
 * the panels flicker. Seamless loop.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 18000; // full cycle: three zoom passes fit cleanly

// One "zoom pass" sub-cycle within the loop (3 passes per loop).
const PASS_MS = LOOP_MS / 3;
// Within a pass (fractions): grid view -> zoom in -> hold -> snap back.
const ZOOM_IN_START = 0.46;
const ZOOM_IN_END = 0.58;
const HOLD_END = 0.86;
const SNAP_END = 0.94;
// remainder of pass: settled grid

// easing helpers
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeInCubic = (t: number) => t * t * t;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

type Cell = { col: number; row: number; scene: number; seed: number; cam: number };

export default function CctvGrid() {
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

    // Seeded pseudo-random for grain + flickery readouts
    let seed = 90210;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    // deterministic per-cell hash (stable across frames)
    const hash = (n: number) => {
      let x = (n * 374761393 + 668265263) & 0x7fffffff;
      x = (x ^ (x >> 13)) * 1274126177;
      return ((x & 0x7fffffff) % 100000) / 100000;
    };

    // The nine cells. scene 0..3 cycle; each gets a stable seed + cam id.
    const cells: Cell[] = [];
    const camNos = [4, 7, 2, 9, 1, 6, 3, 8, 5];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const i = r * 3 + c;
        cells.push({ col: c, row: r, scene: i % 4, seed: i, cam: camNos[i] });
      }
    }

    // which cell is the "watched subject" each pass — deterministic, varied
    const watchedFor = (pass: number) => {
      const picks = [4, 0, 8, 2, 6, 1, 7, 3, 5];
      return picks[pass % picks.length];
    };

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    const pad2 = (n: number) => (n < 10 ? "0" + n : "" + n);

    // ---- draw one feed's scene into a clipped rect [x,y,w,h] ----
    // local time `lt` (seconds) drives motion; `flick` 0..1 brightness mult.
    function drawScene(
      x: number,
      y: number,
      w: number,
      h: number,
      scene: number,
      cellSeed: number,
      lt: number,
      bright: number
    ) {
      const cx = x + w / 2;
      const cy = y + h / 2;
      const s = Math.min(w, h);
      ctx!.save();
      ctx!.beginPath();
      ctx!.rect(x, y, w, h);
      ctx!.clip();

      // feed background — faint warm wash + perspective floor grid
      const wash = ctx!.createRadialGradient(cx, cy, 0, cx, cy, s * 0.8);
      wash.addColorStop(0, "rgba(30,24,10,0.55)");
      wash.addColorStop(1, "rgba(8,6,4,0.2)");
      ctx!.fillStyle = wash;
      ctx!.fillRect(x, y, w, h);

      ctx!.globalCompositeOperation = "lighter";
      ctx!.strokeStyle = GOLD_AMBER;
      ctx!.lineWidth = Math.max(0.5, s * 0.004);

      if (scene === 0) {
        // WALKER — a figure dot tracing an eased patrol path with a trail.
        ctx!.globalAlpha = 0.18 * bright;
        // floor lines
        ctx!.beginPath();
        for (let i = 1; i <= 4; i++) {
          const fy = y + h * (0.45 + i * 0.12);
          ctx!.moveTo(x, fy);
          ctx!.lineTo(x + w, fy);
        }
        ctx!.stroke();
        const a = lt * 0.7 + cellSeed;
        const fx = cx + Math.sin(a) * w * 0.32 + Math.sin(a * 2.3) * w * 0.06;
        const fy = cy + Math.cos(a * 0.8) * h * 0.22;
        // trail
        for (let k = 6; k >= 0; k--) {
          const ta = a - k * 0.08;
          const tx = cx + Math.sin(ta) * w * 0.32 + Math.sin(ta * 2.3) * w * 0.06;
          const ty = cy + Math.cos(ta * 0.8) * h * 0.22;
          ctx!.globalAlpha = (0.5 * (1 - k / 7)) * bright;
          ctx!.fillStyle = GOLD;
          ctx!.beginPath();
          ctx!.arc(tx, ty, s * 0.012 * (1 - k / 10), 0, Math.PI * 2);
          ctx!.fill();
        }
        // figure (head + body wedge)
        ctx!.globalAlpha = 0.95 * bright;
        setGlow(s * 0.06, GOLD_LIGHT);
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.beginPath();
        ctx!.arc(fx, fy - s * 0.03, s * 0.028, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.moveTo(fx, fy - s * 0.01);
        ctx!.lineTo(fx - s * 0.03, fy + s * 0.06);
        ctx!.lineTo(fx + s * 0.03, fy + s * 0.06);
        ctx!.closePath();
        ctx!.fill();
        clearGlow();
      } else if (scene === 1) {
        // RADAR — rotating sweep with fading afterglow wedge + blips.
        const rad = s * 0.4;
        ctx!.globalAlpha = 0.16 * bright;
        ctx!.strokeStyle = GOLD_AMBER;
        for (let i = 1; i <= 3; i++) {
          ctx!.beginPath();
          ctx!.arc(cx, cy, (rad * i) / 3, 0, Math.PI * 2);
          ctx!.stroke();
        }
        ctx!.beginPath();
        ctx!.moveTo(cx - rad, cy);
        ctx!.lineTo(cx + rad, cy);
        ctx!.moveTo(cx, cy - rad);
        ctx!.lineTo(cx, cy + rad);
        ctx!.stroke();
        // sweep wedge (radial fan, portable — no conic gradient needed)
        const ang = (lt * 1.4 + cellSeed) % (Math.PI * 2);
        ctx!.globalAlpha = 0.5 * bright;
        for (let k = 0; k < 14; k++) {
          const aa = ang - k * 0.06;
          ctx!.strokeStyle = GOLD_LIGHT;
          ctx!.globalAlpha = (0.5 * (1 - k / 14)) * bright;
          ctx!.lineWidth = Math.max(0.6, s * 0.006);
          ctx!.beginPath();
          ctx!.moveTo(cx, cy);
          ctx!.lineTo(cx + Math.cos(aa) * rad, cy + Math.sin(aa) * rad);
          ctx!.stroke();
        }
        // blips
        setGlow(s * 0.05, GOLD_LIGHT);
        for (let b = 0; b < 3; b++) {
          const ba = cellSeed + b * 2.1;
          const br = rad * (0.3 + 0.6 * hash(cellSeed * 7 + b));
          const bx = cx + Math.cos(ba) * br;
          const by = cy + Math.sin(ba) * br;
          // light up as the sweep passes
          const da = Math.abs(((ang - ba) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2));
          const lit = clamp01(1 - da * 1.6);
          ctx!.globalAlpha = (0.2 + 0.75 * lit) * bright;
          ctx!.fillStyle = GOLD_LIGHT;
          ctx!.beginPath();
          ctx!.arc(bx, by, s * 0.014 * (0.6 + lit), 0, Math.PI * 2);
          ctx!.fill();
        }
        clearGlow();
      } else if (scene === 2) {
        // TRACKED FIGURE — a slow creeping dot inside a snapping bracket box.
        const a = lt * 0.5 + cellSeed * 1.7;
        const fx = cx + Math.sin(a) * w * 0.26 + Math.cos(a * 0.6) * w * 0.05;
        const fy = cy + Math.cos(a * 0.9) * h * 0.2;
        // grid floor
        ctx!.globalAlpha = 0.12 * bright;
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.beginPath();
        for (let i = -2; i <= 2; i++) {
          ctx!.moveTo(cx + i * w * 0.16, y);
          ctx!.lineTo(cx + i * w * 0.16, y + h);
        }
        ctx!.stroke();
        // tracking bracket box following figure with slight lag
        const la = a - 0.18;
        const bx = cx + Math.sin(la) * w * 0.26 + Math.cos(la * 0.6) * w * 0.05;
        const by = cy + Math.cos(la * 0.9) * h * 0.2;
        const bs = s * 0.13;
        ctx!.globalAlpha = 0.85 * bright;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(0.7, s * 0.006);
        const corner = bs * 0.45;
        const cps = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ];
        for (const [sx, sy] of cps) {
          const px = bx + sx * bs;
          const py = by + sy * bs;
          ctx!.beginPath();
          ctx!.moveTo(px, py + sy * corner);
          ctx!.lineTo(px, py);
          ctx!.lineTo(px - sx * corner, py);
          ctx!.stroke();
        }
        // the figure
        setGlow(s * 0.05, GOLD_LIGHT);
        ctx!.globalAlpha = 0.95 * bright;
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.beginPath();
        ctx!.arc(fx, fy, s * 0.03, 0, Math.PI * 2);
        ctx!.fill();
        clearGlow();
      } else {
        // PULSE — vitals heartbeat line scrolling across, with a moving cursor.
        ctx!.globalAlpha = 0.1 * bright;
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.beginPath();
        ctx!.moveTo(x, cy);
        ctx!.lineTo(x + w, cy);
        ctx!.stroke();
        ctx!.globalAlpha = 0.9 * bright;
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.lineWidth = Math.max(0.8, s * 0.008);
        setGlow(s * 0.04, GOLD);
        ctx!.beginPath();
        const span = w;
        const cur = ((lt * 0.5 + cellSeed) % 1) * span;
        for (let px = 0; px <= span; px += Math.max(1, s * 0.01)) {
          // distance behind the cursor (wrapped) -> beat shape
          let d = cur - px;
          if (d < 0) d += span;
          const beatT = (d / span) * 5; // 5 beats across
          const phase = (beatT % 1) * Math.PI * 2;
          let v = 0;
          const bt = beatT % 1;
          if (bt > 0.18 && bt < 0.32) {
            // QRS spike
            const k = (bt - 0.18) / 0.14;
            v = Math.sin(k * Math.PI) * (k < 0.5 ? 1 : -0.6) * h * 0.28;
          } else {
            v = Math.sin(phase) * h * 0.03;
          }
          const yy = cy - v;
          if (px === 0) ctx!.moveTo(x + px, yy);
          else ctx!.lineTo(x + px, yy);
        }
        ctx!.stroke();
        // bright cursor head
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.globalAlpha = bright;
        ctx!.beginPath();
        ctx!.arc(x + cur, cy, s * 0.018, 0, Math.PI * 2);
        ctx!.fill();
        clearGlow();
      }

      // per-feed scanlines
      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 0.06 * bright;
      ctx!.fillStyle = "#000";
      const lg = Math.max(2, s * 0.018);
      for (let yy = y; yy < y + h; yy += lg) {
        ctx!.fillRect(x, yy, w, lg * 0.5);
      }
      ctx!.restore();
      clearGlow();
    }

    // ---- draw the chrome (frame, labels, REC, timestamp) over a feed ----
    function drawChrome(
      x: number,
      y: number,
      w: number,
      h: number,
      cam: number,
      lt: number,
      blinkOn: boolean,
      bright: number,
      big: boolean
    ) {
      const m = big ? unit * 0.9 : Math.min(w, h) * 0.05;
      const fs = big ? unit * 2.4 : Math.min(w, h) * 0.07;

      // bezel
      ctx!.save();
      ctx!.strokeStyle = GOLD;
      ctx!.globalAlpha = 0.5 * bright;
      ctx!.lineWidth = Math.max(1, (big ? unit * 0.18 : Math.min(w, h) * 0.008));
      ctx!.strokeRect(x + 1, y + 1, w - 2, h - 2);
      // corner ticks
      ctx!.globalAlpha = 0.8 * bright;
      ctx!.strokeStyle = GOLD_LIGHT;
      const ct = Math.min(w, h) * (big ? 0.04 : 0.08);
      const cset = [
        [x, y, 1, 1],
        [x + w, y, -1, 1],
        [x + w, y + h, -1, -1],
        [x, y + h, 1, -1],
      ];
      ctx!.lineWidth = Math.max(1, (big ? unit * 0.22 : Math.min(w, h) * 0.012));
      for (const [px, py, sx, sy] of cset) {
        ctx!.beginPath();
        ctx!.moveTo(px + sx * ct, py);
        ctx!.lineTo(px, py);
        ctx!.lineTo(px, py + sy * ct);
        ctx!.stroke();
      }

      // CAM label (top-left)
      ctx!.font = `600 ${fs}px var(--font-dm-sans), monospace`;
      ctx!.textBaseline = "top";
      ctx!.textAlign = "left";
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.globalAlpha = 0.9 * bright;
      setGlow(fs * 0.4, GOLD);
      ctx!.fillText(`CAM 0${cam}`, x + m, y + m);
      clearGlow();

      // REC dot + label (top-right)
      ctx!.textAlign = "right";
      const recX = x + w - m;
      if (blinkOn) {
        ctx!.fillStyle = "#e0584a";
        setGlow(fs * 0.6, "#e0584a");
        ctx!.globalAlpha = 0.95 * bright;
        ctx!.beginPath();
        ctx!.arc(recX - fs * 2.0, y + m + fs * 0.5, fs * 0.32, 0, Math.PI * 2);
        ctx!.fill();
        clearGlow();
      }
      ctx!.fillStyle = GOLD;
      ctx!.globalAlpha = (blinkOn ? 0.9 : 0.4) * bright;
      ctx!.fillText("REC", recX, y + m);

      // ticking timestamp (bottom-left) — synthetic clock from lt
      const totalSec = lt + cam * 137;
      const hh = pad2(Math.floor((totalSec / 3600) % 24));
      const mm = pad2(Math.floor((totalSec / 60) % 60));
      const ss = pad2(Math.floor(totalSec % 60));
      const ms = pad2(Math.floor((totalSec * 100) % 100));
      ctx!.textAlign = "left";
      ctx!.textBaseline = "bottom";
      ctx!.font = `500 ${fs * 0.92}px var(--font-dm-sans), monospace`;
      ctx!.fillStyle = GOLD;
      ctx!.globalAlpha = 0.75 * bright;
      ctx!.fillText(`${hh}:${mm}:${ss}:${ms}`, x + m, y + h - m);

      // signal id (bottom-right)
      ctx!.textAlign = "right";
      ctx!.globalAlpha = 0.45 * bright;
      ctx!.fillStyle = GOLD_AMBER;
      ctx!.fillText(big ? "SECTOR // NW-ATL" : "LIVE", x + w - m, y + h - m);
      ctx!.restore();
      clearGlow();
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;
      const lt = (t - start) / 1000; // seconds for scene motion (monotonic-ish within loop)

      const pass = Math.floor(elapsed / PASS_MS);
      const pf = (elapsed % PASS_MS) / PASS_MS; // 0..1 within pass
      const watched = watchedFor(pass);

      // zoom factor 0 (grid) .. 1 (one cell fills frame)
      let zoom = 0;
      if (pf < ZOOM_IN_START) {
        zoom = 0;
      } else if (pf < ZOOM_IN_END) {
        zoom = easeInOut(clamp01((pf - ZOOM_IN_START) / (ZOOM_IN_END - ZOOM_IN_START)));
      } else if (pf < HOLD_END) {
        zoom = 1;
      } else if (pf < SNAP_END) {
        // snap back — quick easeIn for a "cut" feel
        zoom = 1 - easeInCubic(clamp01((pf - HOLD_END) / (SNAP_END - HOLD_END)));
      } else {
        zoom = 0;
      }

      // global flicker (CRT room hum) — occasional brightness dips
      const hum = 0.92 + 0.08 * Math.sin(elapsed * 0.02);
      const glitch =
        rnd() > 0.985 ? 0.7 + rnd() * 0.25 : 1; // rare hard flicker on whole wall

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      // grid geometry with small gutters
      const gutter = unit * 0.8;
      const gx0 = gutter;
      const gy0 = gutter;
      const gw = W - gutter * 2;
      const gh = H - gutter * 2;
      const cw = (gw - gutter * 2) / 3;
      const ch = (gh - gutter * 2) / 3;

      const cellRect = (c: Cell) => ({
        x: gx0 + c.col * (cw + gutter),
        y: gy0 + c.row * (ch + gutter),
        w: cw,
        h: ch,
      });

      const wc = cells[watched];
      const wr = cellRect(wc);

      // Interpolate the watched cell's rect toward full-frame as zoom rises.
      const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

      // draw all the non-watched cells first (fade as zoom rises)
      ctx!.save();
      for (let i = 0; i < cells.length; i++) {
        if (i === watched && zoom > 0.02) continue;
        const cell = cells[i];
        const r = cellRect(cell);
        const blinkOn = ((lt * 1.3 + cell.cam) % 1) < 0.6;
        // per-cell flicker (independent panels)
        const cf =
          0.85 +
          0.15 * Math.sin(lt * 6 + cell.seed * 2.3) +
          (hash(cell.seed * 11 + Math.floor(lt * 3)) > 0.96 ? -0.35 : 0);
        const bright = clamp01(cf) * hum * glitch * (1 - zoom * 0.9);
        if (bright <= 0.02) continue;
        drawScene(r.x, r.y, r.w, r.h, cell.scene, cell.seed * 3.1, lt, bright);
        drawChrome(r.x, r.y, r.w, r.h, cell.cam, lt, blinkOn, bright, false);
      }
      ctx!.restore();

      // draw the watched cell — its rect grows to fill the frame
      {
        const rx = lerp(wr.x, 0, zoom);
        const ry = lerp(wr.y, 0, zoom);
        const rw = lerp(wr.w, W, zoom);
        const rh = lerp(wr.h, H, zoom);
        const blinkOn = ((lt * 1.3 + wc.cam) % 1) < 0.6;
        const big = zoom > 0.5;
        // watched cell stays bright; tiny scan jitter while zoomed
        const jitter = zoom > 0.5 ? Math.sin(lt * 40) * unit * 0.15 * (rnd() > 0.9 ? 1 : 0) : 0;
        const bright = hum * glitch * (0.9 + 0.1 * zoom);
        drawScene(rx, ry + jitter, rw, rh, wc.scene, wc.seed * 3.1, lt, bright);
        drawChrome(rx, ry + jitter, rw, rh, wc.cam, lt, blinkOn, bright, big);

        // "SUBJECT ACQUIRED" banner during the hold
        if (zoom > 0.9 && pf < HOLD_END) {
          const inK = clamp01((zoom - 0.9) / 0.1);
          ctx!.save();
          ctx!.globalAlpha = 0.9 * inK;
          ctx!.fillStyle = GOLD_LIGHT;
          setGlow(unit * 1.2, GOLD);
          ctx!.font = `600 ${unit * 2.6}px var(--font-cinzel), serif`;
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          const blink = Math.sin(elapsed * 0.018) > -0.3 ? 1 : 0.4;
          ctx!.globalAlpha = 0.9 * inK * blink;
          ctx!.fillText("SUBJECT ACQUIRED", W / 2, H * 0.12);
          ctx!.restore();
          clearGlow();
        }
      }

      // ---- ZOOM transition flash + a hard cut line on snap-back ----
      if (pf >= ZOOM_IN_START && pf < ZOOM_IN_START + 0.04) {
        const k = clamp01((pf - ZOOM_IN_START) / 0.04);
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        ctx!.fillStyle = `rgba(232,201,106,${(1 - k) * 0.12})`;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }
      if (pf >= HOLD_END && pf < HOLD_END + 0.05) {
        const k = clamp01((pf - HOLD_END) / 0.05);
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        ctx!.fillStyle = `rgba(232,201,106,${(1 - k) * 0.14})`;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // ---- rolling scanline band sweeping the whole wall ----
      const rollY = (((elapsed / LOOP_MS) * 6) % 1) * (H + 120) - 60;
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const rg = ctx!.createLinearGradient(0, rollY - unit * 5, 0, rollY + unit * 5);
      rg.addColorStop(0, "rgba(212,175,55,0)");
      rg.addColorStop(0.5, "rgba(232,201,106,0.07)");
      rg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = rg;
      ctx!.fillRect(0, rollY - unit * 5, W, unit * 10);
      ctx!.restore();

      // ---- soft phosphor glow bloom over the wall ----
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const bloom = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.5,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.7
      );
      bloom.addColorStop(0, "rgba(212,175,55,0.05)");
      bloom.addColorStop(0.6, "rgba(138,106,32,0.03)");
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = bloom;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // ---- fine full-frame scanlines ----
      ctx!.save();
      ctx!.globalAlpha = 0.045;
      ctx!.fillStyle = "#000";
      const lineGap = Math.max(2, unit * 0.4);
      for (let y = 0; y < H; y += lineGap * 2) {
        ctx!.fillRect(0, y, W, lineGap);
      }
      ctx!.restore();

      // ---- vignette ----
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
      vg.addColorStop(0.72, "rgba(0,0,0,0.45)");
      vg.addColorStop(1, "rgba(0,0,0,0.95)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // ---- film grain ----
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      const grainN = Math.floor((W * H) / 2600);
      ctx!.fillStyle = "#fff";
      for (let i = 0; i < grainN; i++) {
        ctx!.fillRect(rnd() * W, rnd() * H, 1, 1);
      }
      ctx!.restore();

      raf = requestAnimationFrame(draw);
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
