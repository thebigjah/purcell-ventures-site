"use client";

import { useEffect, useRef } from "react";

/**
 * CrosshairTrackLock — Bourne-style surveillance targeting.
 *
 * A precise reticle hunts across the frame on an eased, organic path while
 * range/coordinate digits flicker beside it. It SNAPS onto the center point:
 * four corner brackets converge inward with a hard tick, a confirm pulse
 * flares, the lock holds, then releases and resumes hunting. Seamless loop.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 7600; // full cycle

// Phase boundaries within one loop (fractions of LOOP_MS)
const HUNT_END = 0.62; // hunting until here
const SNAP_END = 0.70; // brackets converge + tick
const HOLD_END = 0.88; // locked, holding
// release -> resume hunting until 1.0

// easing helpers
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

// A smooth wandering path for the hunt — sum of sines, deterministic.
function huntPos(p: number) {
  // p: 0..1 progress through the hunting portion
  const a = p * Math.PI * 2;
  const x =
    0.5 +
    0.30 * Math.sin(a * 1.0 + 0.4) +
    0.10 * Math.sin(a * 2.3 + 1.1) +
    0.05 * Math.sin(a * 4.1 + 2.0);
  const y =
    0.5 +
    0.24 * Math.cos(a * 1.3 + 0.9) +
    0.09 * Math.sin(a * 2.7 + 0.2) +
    0.04 * Math.cos(a * 3.9 + 1.5);
  return { x: clamp01(x), y: clamp01(y) };
}

export default function CrosshairTrackLock() {
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

    // Seeded pseudo-random for stable-but-flickery digit readouts
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    // persistent flicker buffers (so digits change at a believable cadence)
    let lastFlick = -1;
    let digA = "0000";
    let digB = "0000";
    let digRange = "000";

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;
      const f = elapsed / LOOP_MS; // 0..1

      // --- determine target position + lock progress ---
      let cx: number;
      let cy: number;
      let locked = 0; // 0 hunting .. 1 fully locked
      let centerTarget = { x: 0.5, y: 0.5 };

      if (f < HUNT_END) {
        const hp = f / HUNT_END; // 0..1 over hunt
        const pos = huntPos(hp);
        cx = pos.x;
        cy = pos.y;
      } else if (f < SNAP_END) {
        // snapping from last hunt pos toward center
        const k = (f - HUNT_END) / (SNAP_END - HUNT_END);
        const from = huntPos(1);
        const e = easeOutCubic(clamp01(k));
        cx = from.x + (centerTarget.x - from.x) * e;
        cy = from.y + (centerTarget.y - from.y) * e;
        locked = e;
      } else if (f < HOLD_END) {
        cx = centerTarget.x;
        cy = centerTarget.y;
        locked = 1;
      } else {
        // release: ease back out into a fresh hunt start
        const k = (f - HOLD_END) / (1 - HOLD_END);
        const e = easeInOut(clamp01(k));
        const to = huntPos(0); // loop seamlessly back to hunt start
        cx = centerTarget.x + (to.x - centerTarget.x) * e;
        cy = centerTarget.y + (to.y - centerTarget.y) * e;
        locked = 1 - e;
      }

      const px = cx * W;
      const py = cy * H;

      // --- background wash ---
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      // subtle radial floor light so it isn't a flat black
      const floor = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.5,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.7
      );
      floor.addColorStop(0, "rgba(40,32,14,0.22)");
      floor.addColorStop(0.55, "rgba(20,16,8,0.08)");
      floor.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = floor;
      ctx!.fillRect(0, 0, W, H);

      // --- moving scan grid (surveillance feel), parallax with reticle ---
      ctx!.save();
      ctx!.globalAlpha = 0.10;
      ctx!.strokeStyle = GOLD_AMBER;
      ctx!.lineWidth = 1;
      const grid = Math.max(W, H) / 12;
      const offX = (px * 0.04) % grid;
      const offY = (py * 0.04) % grid;
      ctx!.beginPath();
      for (let gx = -grid + offX; gx < W + grid; gx += grid) {
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, H);
      }
      for (let gy = -grid + offY; gy < H + grid; gy += grid) {
        ctx!.moveTo(0, gy);
        ctx!.lineTo(W, gy);
      }
      ctx!.stroke();
      ctx!.restore();

      // --- crosshair geometry scale ---
      const R = unit * 14; // reticle radius
      const tick = (v: number) => v * unit;

      // breathing micro-jitter while hunting (surveillance handheld)
      const jitterAmt = (1 - locked) * tick(0.5);
      const jx = Math.sin(elapsed * 0.013) * jitterAmt + Math.sin(elapsed * 0.041) * jitterAmt * 0.4;
      const jy = Math.cos(elapsed * 0.017) * jitterAmt + Math.cos(elapsed * 0.037) * jitterAmt * 0.4;
      const RX = px + jx;
      const RY = py + jy;

      // --- reticle ring (thin glowing stroke) ---
      ctx!.save();
      ctx!.lineCap = "round";

      // outer faint ring
      setGlow(tick(1.4), GOLD);
      ctx!.strokeStyle = GOLD;
      ctx!.globalAlpha = 0.85;
      ctx!.lineWidth = Math.max(1, tick(0.28));
      ctx!.beginPath();
      ctx!.arc(RX, RY, R, 0, Math.PI * 2);
      ctx!.stroke();

      // rotating inner dashed ring
      const rot = elapsed * 0.0006 * Math.PI * 2;
      ctx!.globalAlpha = 0.55;
      ctx!.lineWidth = Math.max(1, tick(0.22));
      ctx!.setLineDash([tick(2.2), tick(2.4)]);
      ctx!.beginPath();
      ctx!.arc(RX, RY, R * 0.72, rot, rot + Math.PI * 2);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // gap-segmented mid ring (4 arcs)
      ctx!.globalAlpha = 0.7;
      ctx!.lineWidth = Math.max(1, tick(0.3));
      for (let i = 0; i < 4; i++) {
        const a0 = i * (Math.PI / 2) + Math.PI / 8 - rot * 0.5;
        const a1 = a0 + Math.PI / 4;
        ctx!.beginPath();
        ctx!.arc(RX, RY, R * 0.9, a0, a1);
        ctx!.stroke();
      }

      // crosshair lines with center gap
      const gap = R * 0.32;
      const reach = R * 1.55;
      ctx!.globalAlpha = 0.9;
      ctx!.lineWidth = Math.max(1, tick(0.26));
      ctx!.beginPath();
      ctx!.moveTo(RX - reach, RY);
      ctx!.lineTo(RX - gap, RY);
      ctx!.moveTo(RX + gap, RY);
      ctx!.lineTo(RX + reach, RY);
      ctx!.moveTo(RX, RY - reach);
      ctx!.lineTo(RX, RY - gap);
      ctx!.moveTo(RX, RY + gap);
      ctx!.lineTo(RX, RY + reach);
      ctx!.stroke();

      // graduated tick marks along the axes
      ctx!.globalAlpha = 0.5;
      ctx!.lineWidth = Math.max(1, tick(0.18));
      for (let i = 1; i <= 3; i++) {
        const d = gap + ((reach - gap) * i) / 3.4;
        const tl = tick(0.9);
        ctx!.beginPath();
        ctx!.moveTo(RX + d, RY - tl);
        ctx!.lineTo(RX + d, RY + tl);
        ctx!.moveTo(RX - d, RY - tl);
        ctx!.lineTo(RX - d, RY + tl);
        ctx!.moveTo(RX - tl, RY + d);
        ctx!.lineTo(RX + tl, RY + d);
        ctx!.moveTo(RX - tl, RY - d);
        ctx!.lineTo(RX + tl, RY - d);
        ctx!.stroke();
      }

      // center aim dot
      clearGlow();
      setGlow(tick(2.2), GOLD_LIGHT);
      ctx!.globalAlpha = 0.95;
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.beginPath();
      ctx!.arc(RX, RY, Math.max(1.2, tick(0.55)), 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
      clearGlow();

      // --- corner brackets (converge inward on snap) ---
      // bracket spread: wide while hunting, slams to "locked" radius on snap.
      let spread: number;
      let bAlpha: number;
      if (f < HUNT_END) {
        spread = R * 2.6;
        bAlpha = 0.35;
      } else if (f < SNAP_END) {
        const k = (f - HUNT_END) / (SNAP_END - HUNT_END);
        const e = easeOutBack(clamp01(k));
        spread = R * (2.6 - 1.35 * e);
        bAlpha = 0.35 + 0.6 * clamp01(k);
      } else if (f < HOLD_END) {
        spread = R * 1.25;
        bAlpha = 0.95;
      } else {
        const k = (f - HOLD_END) / (1 - HOLD_END);
        const e = easeInOut(clamp01(k));
        spread = R * (1.25 + 1.35 * e);
        bAlpha = 0.95 - 0.6 * e;
      }

      const bLen = R * 0.55;
      ctx!.save();
      setGlow(tick(1.6), GOLD_LIGHT);
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.globalAlpha = bAlpha;
      ctx!.lineWidth = Math.max(1, tick(0.34));
      ctx!.lineCap = "round";
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (const [sx, sy] of corners) {
        const bx = RX + sx * spread;
        const by = RY + sy * spread;
        ctx!.beginPath();
        ctx!.moveTo(bx, by + sy * bLen);
        ctx!.lineTo(bx, by);
        ctx!.lineTo(bx - sx * bLen, by);
        ctx!.stroke();
      }
      ctx!.restore();
      clearGlow();

      // --- confirm pulse (right at the lock tick) ---
      if (f >= HUNT_END && f < SNAP_END + 0.06) {
        const k = clamp01((f - SNAP_END + 0.02) / 0.08);
        if (f >= SNAP_END - 0.005) {
          const pr = R * (1 + easeOutCubic(k) * 2.4);
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          setGlow(tick(2.4), GOLD_LIGHT);
          ctx!.strokeStyle = GOLD_LIGHT;
          ctx!.globalAlpha = (1 - k) * 0.85;
          ctx!.lineWidth = Math.max(1, tick(0.5) * (1 - k * 0.7));
          ctx!.beginPath();
          ctx!.arc(RX, RY, pr, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.restore();
          clearGlow();
        }
      }

      // brief full-frame confirm flash + LOCK label
      if (f >= SNAP_END - 0.004 && f < HOLD_END) {
        const tk = (f - (SNAP_END - 0.004)) / (HOLD_END - (SNAP_END - 0.004));
        // flash
        const flashK = clamp01(tk / 0.07);
        if (tk < 0.07) {
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          ctx!.fillStyle = `rgba(232,201,106,${(1 - flashK) * 0.14})`;
          ctx!.fillRect(0, 0, W, H);
          ctx!.restore();
        }
        // LOCK label near reticle
        const labelAlpha =
          tk < 0.12 ? clamp01(tk / 0.12) : tk > 0.85 ? clamp01((1 - tk) / 0.15) : 1;
        ctx!.save();
        setGlow(tick(1.6), GOLD_LIGHT);
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.globalAlpha = labelAlpha * 0.95;
        ctx!.font = `600 ${tick(2.6)}px var(--font-dm-sans), monospace`;
        ctx!.textBaseline = "middle";
        ctx!.textAlign = "left";
        // blink during hold
        const blink = Math.sin(elapsed * 0.02) > -0.4 ? 1 : 0.35;
        ctx!.globalAlpha = labelAlpha * 0.95 * blink;
        ctx!.fillText("● TARGET LOCK", RX + R * 1.35, RY - R * 1.35);
        ctx!.restore();
        clearGlow();
      }

      // --- flickering range / coordinate readouts beside the reticle ---
      // update digits on a cadence
      if (lastFlick < 0 || elapsed - lastFlick > 70 || elapsed < lastFlick) {
        lastFlick = elapsed;
        const lk = locked;
        // when locked, digits stabilize toward a fixed solved value
        const jitterDigit = () => Math.floor(rnd() * 10);
        if (lk > 0.85) {
          digA = "47.821";
          digB = "12.309";
          digRange = "0142";
        } else {
          digA = `${jitterDigit()}${jitterDigit()}.${jitterDigit()}${jitterDigit()}${jitterDigit()}`;
          digB = `${jitterDigit()}${jitterDigit()}.${jitterDigit()}${jitterDigit()}${jitterDigit()}`;
          digRange = `${(800 + Math.floor(rnd() * 900)).toString()}`;
        }
      }

      ctx!.save();
      ctx!.font = `500 ${tick(2.0)}px var(--font-dm-sans), monospace`;
      ctx!.textBaseline = "top";
      ctx!.fillStyle = GOLD;
      setGlow(tick(0.8), GOLD);
      const labelX = RX + R * 1.35;
      const labelY = RY + R * 0.55;
      ctx!.globalAlpha = 0.85;
      ctx!.textAlign = "left";
      // keep readout on-screen if reticle hugs right edge
      const flip = labelX > W - tick(26);
      const lx = flip ? RX - R * 1.35 : labelX;
      ctx!.textAlign = flip ? "right" : "left";
      ctx!.fillText(`LAT  ${digA}`, lx, labelY);
      ctx!.fillText(`LON  ${digB}`, lx, labelY + tick(2.8));
      ctx!.globalAlpha = 0.6;
      ctx!.fillStyle = GOLD_LIGHT;
      ctx!.fillText(`RNG ${digRange}m`, lx, labelY + tick(5.6));
      ctx!.restore();
      clearGlow();

      // --- moving scanline band ---
      const scanY = ((elapsed / LOOP_MS) * 2.5 * H) % (H + 80) - 40;
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const sg = ctx!.createLinearGradient(0, scanY - tick(6), 0, scanY + tick(6));
      sg.addColorStop(0, "rgba(212,175,55,0)");
      sg.addColorStop(0.5, "rgba(232,201,106,0.06)");
      sg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = sg;
      ctx!.fillRect(0, scanY - tick(6), W, tick(12));
      ctx!.restore();

      // fine horizontal scanlines overlay
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      ctx!.fillStyle = "#000";
      const lineGap = Math.max(2, tick(0.4));
      for (let y = 0; y < H; y += lineGap * 2) {
        ctx!.fillRect(0, y, W, lineGap);
      }
      ctx!.restore();

      // --- bloom pass: redraw the bright reticle core blurred & added ---
      // (cheap bloom: a soft radial behind the center)
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const bloom = ctx!.createRadialGradient(RX, RY, 0, RX, RY, R * 1.4);
      const bloomA = 0.10 + locked * 0.18;
      bloom.addColorStop(0, `rgba(232,201,106,${bloomA})`);
      bloom.addColorStop(0.5, `rgba(212,175,55,${bloomA * 0.4})`);
      bloom.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(RX, RY, R * 1.4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      // --- vignette ---
      ctx!.save();
      const vg = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.5,
        Math.min(W, H) * 0.3,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.72
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.75, "rgba(0,0,0,0.5)");
      vg.addColorStop(1, "rgba(0,0,0,0.95)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // --- film grain (procedural sparse dots) ---
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      const grainN = Math.floor((W * H) / 2600);
      ctx!.fillStyle = "#fff";
      for (let i = 0; i < grainN; i++) {
        const gx = rnd() * W;
        const gy = rnd() * H;
        ctx!.fillRect(gx, gy, 1, 1);
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
