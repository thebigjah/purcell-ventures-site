"use client";

import { useEffect, useRef } from "react";

/**
 * TelephotoCompression — watched-from-distance, through a long lens.
 *
 * Heavy creamy-gold bokeh orbs drift in a blurred foreground and background while
 * a sharp targeting reticle frames a small, in-focus subject compressed dead center;
 * heat-haze shimmer ripples the air and the lens breathes a slow focus-hunt, racking
 * the bokeh in and out of softness. Shallow DOF, grain, vignette — seamless loop.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 14000; // full focus-breathing cycle (slow, voyeuristic)

const TAU = Math.PI * 2;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

// Deterministic bokeh definition — generated once at mount.
type Bokeh = {
  bx: number; // base x in 0..1
  by: number; // base y in 0..1
  r: number; // radius in vmin units
  driftR: number; // drift amplitude in 0..1 space
  driftA: number; // drift angular speed
  driftP: number; // drift phase
  layer: number; // 0 = far/back, 1 = near/front
  hue: number; // 0..1 -> amber..light cream
  baseAlpha: number;
  twinkleP: number;
  twinkleS: number;
};

export default function TelephotoCompression() {
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
    let unit = 1; // 1 vmin in px

    // seeded RNG (stable bokeh field + grain)
    let seed = 99173;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    // Build the bokeh field once. Two layers: far (background) and near (foreground).
    const bokeh: Bokeh[] = [];
    const buildField = () => {
      bokeh.length = 0;
      // far layer — smaller, dimmer, more of them
      for (let i = 0; i < 16; i++) {
        bokeh.push({
          bx: rnd(),
          by: rnd(),
          r: 5 + rnd() * 9,
          driftR: 0.015 + rnd() * 0.03,
          driftA: (0.15 + rnd() * 0.35) * (rnd() < 0.5 ? 1 : -1),
          driftP: rnd() * TAU,
          layer: 0,
          hue: rnd(),
          baseAlpha: 0.1 + rnd() * 0.14,
          twinkleP: rnd() * TAU,
          twinkleS: 0.4 + rnd() * 1.2,
        });
      }
      // near layer — large creamy out-of-focus orbs hugging the edges/corners
      for (let i = 0; i < 9; i++) {
        // bias toward edges so the subject stays readable in the center
        const edge = rnd();
        let bx: number;
        let by: number;
        if (edge < 0.5) {
          bx = rnd() < 0.5 ? rnd() * 0.28 : 0.72 + rnd() * 0.28;
          by = rnd();
        } else {
          bx = rnd();
          by = rnd() < 0.5 ? rnd() * 0.26 : 0.74 + rnd() * 0.26;
        }
        bokeh.push({
          bx,
          by,
          r: 16 + rnd() * 22,
          driftR: 0.02 + rnd() * 0.05,
          driftA: (0.1 + rnd() * 0.28) * (rnd() < 0.5 ? 1 : -1),
          driftP: rnd() * TAU,
          layer: 1,
          hue: rnd(),
          baseAlpha: 0.16 + rnd() * 0.2,
          twinkleP: rnd() * TAU,
          twinkleS: 0.3 + rnd() * 0.9,
        });
      }
    };
    buildField();

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
      unit = Math.min(W, H) / 100;
    }
    resize();
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    // mix amber -> gold -> light cream by t (0..1)
    function creamColor(t: number, a: number) {
      // three-stop ramp toward creamy highlights
      let r: number, g: number, b: number;
      if (t < 0.5) {
        const k = t / 0.5;
        r = 138 + (212 - 138) * k;
        g = 106 + (175 - 106) * k;
        b = 32 + (55 - 32) * k;
      } else {
        const k = (t - 0.5) / 0.5;
        r = 212 + (244 - 212) * k;
        g = 175 + (228 - 175) * k;
        b = 55 + (170 - 55) * k;
      }
      return `rgba(${r | 0},${g | 0},${b | 0},${a})`;
    }

    // Draw one soft bokeh disc: ring-biased (donut-ish) like a real defocused highlight.
    function drawBokeh(
      x: number,
      y: number,
      r: number,
      hue: number,
      alpha: number,
      sharpness: number // 0 fully soft .. 1 crisper edge ring
    ) {
      const grad = ctx!.createRadialGradient(x, y, r * 0.05, x, y, r);
      // brighter rim = defocus signature
      const core = alpha * (0.55 + sharpness * 0.2);
      const rim = alpha * (0.85 + sharpness * 0.5);
      grad.addColorStop(0, creamColor(hue, core));
      grad.addColorStop(0.62, creamColor(hue, core * 0.85));
      grad.addColorStop(0.86, creamColor(Math.min(1, hue + 0.15), rim));
      grad.addColorStop(1, creamColor(hue, 0));
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, TAU);
      ctx!.fill();
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;
      const f = elapsed / LOOP_MS; // 0..1, loops seamlessly
      const phase = f * TAU; // for cyclic sines (use integer multiples => seamless)

      // ----- focus breathing: 0 = soft (hunting), 1 = momentary crisp lock -----
      // two soft peaks per loop so the lens "hunts" and resettles.
      const breathe = 0.5 - 0.5 * Math.cos(phase * 2); // 0..1, smooth, seamless
      const focus = Math.pow(breathe, 1.6); // bias toward soft
      // slow lens "rack" displacement (everything nudges as focus pulls)
      const rack = Math.sin(phase) * unit * 0.6;

      // ----- background wash -----
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      // warm depth floor — slightly off-center for compressed-perspective feel
      const floor = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.46,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.75
      );
      floor.addColorStop(0, "rgba(48,38,16,0.32)");
      floor.addColorStop(0.5, "rgba(24,19,9,0.12)");
      floor.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = floor;
      ctx!.fillRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H * 0.5;

      // ===== FAR bokeh layer (behind subject) =====
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const o of bokeh) {
        if (o.layer !== 0) continue;
        const dx = Math.cos(o.driftP + phase * o.driftA) * o.driftR;
        const dy = Math.sin(o.driftP + phase * o.driftA * 0.8) * o.driftR;
        const x = (o.bx + dx) * W;
        const y = (o.by + dy) * H + rack * 0.5;
        const twink = 0.75 + 0.25 * Math.sin(o.twinkleP + phase * o.twinkleS * 2);
        // far layer gets softer as focus pulls to the (mid) subject plane
        const a = o.baseAlpha * twink * (0.8 - focus * 0.25);
        drawBokeh(x, y, o.r * unit, o.hue, a, 0.1);
      }
      ctx!.restore();

      // ===== heat-haze shimmer band across the mid-field =====
      // vertical sinusoidal slabs sampled as translucent warm streaks (cheap mirage)
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const hazeBands = 7;
      for (let i = 0; i < hazeBands; i++) {
        const fy = i / (hazeBands - 1);
        const yy = cy + (fy - 0.5) * H * 0.42;
        const wobble =
          Math.sin(phase * 3 + i * 1.3) * unit * 1.6 +
          Math.sin(phase * 5 + i * 0.7) * unit * 0.8;
        const bandH = unit * 3.4;
        const g = ctx!.createLinearGradient(0, yy - bandH, 0, yy + bandH);
        const ha = 0.025 + 0.02 * (1 - focus); // shimmer stronger when soft
        g.addColorStop(0, "rgba(212,175,55,0)");
        g.addColorStop(0.5, `rgba(232,201,106,${ha})`);
        g.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = g;
        ctx!.save();
        ctx!.translate(wobble, 0);
        ctx!.fillRect(-unit * 4, yy - bandH, W + unit * 8, bandH * 2);
        ctx!.restore();
      }
      ctx!.restore();

      // ===== SUBJECT — small, compressed, in-focus silhouette dead center =====
      // a distant figure: shoulders + head, reading as "the watched."
      const subShimmerX = Math.sin(phase * 4) * unit * 0.5 * (1 - focus * 0.6);
      const sx = cx + subShimmerX;
      const sy = cy + rack * 0.3 + unit * 2;
      const subScale = unit * (1 + (1 - focus) * 0.04); // micro focus-bob
      // crispness of the subject tracks focus
      const subSharp = 0.35 + focus * 0.65;

      ctx!.save();
      // soft contact shadow / ground compression under subject
      const gsh = ctx!.createRadialGradient(sx, sy + subScale * 7.5, 0, sx, sy + subScale * 7.5, subScale * 9);
      gsh.addColorStop(0, "rgba(0,0,0,0.45)");
      gsh.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = gsh;
      ctx!.beginPath();
      ctx!.ellipse(sx, sy + subScale * 7.5, subScale * 8, subScale * 2.4, 0, 0, TAU);
      ctx!.fill();

      // subject body — backlit, warm-rimmed silhouette
      const bodyGrad = ctx!.createLinearGradient(sx, sy - subScale * 7, sx, sy + subScale * 8);
      bodyGrad.addColorStop(0, "rgba(30,24,12,0.96)");
      bodyGrad.addColorStop(1, "rgba(10,8,5,0.98)");
      ctx!.fillStyle = bodyGrad;
      ctx!.beginPath();
      const hw = subScale * 3.4; // half shoulder width
      const topY = sy - subScale * 6.4;
      // torso/shoulders
      ctx!.moveTo(sx - hw, sy + subScale * 8);
      ctx!.quadraticCurveTo(sx - hw, sy - subScale * 1.5, sx - subScale * 1.6, sy - subScale * 2.6);
      // neck
      ctx!.lineTo(sx - subScale * 0.95, sy - subScale * 3.6);
      // head left
      ctx!.quadraticCurveTo(sx - subScale * 2.2, sy - subScale * 4.0, sx - subScale * 2.0, topY + subScale * 1.4);
      ctx!.quadraticCurveTo(sx - subScale * 1.9, topY, sx, topY);
      ctx!.quadraticCurveTo(sx + subScale * 1.9, topY, sx + subScale * 2.0, topY + subScale * 1.4);
      ctx!.quadraticCurveTo(sx + subScale * 2.2, sy - subScale * 4.0, sx + subScale * 0.95, sy - subScale * 3.6);
      ctx!.lineTo(sx + subScale * 1.6, sy - subScale * 2.6);
      ctx!.quadraticCurveTo(sx + hw, sy - subScale * 1.5, sx + hw, sy + subScale * 8);
      ctx!.closePath();
      ctx!.fill();

      // warm rim-light on the silhouette (the "lit from behind" read) — crisper with focus
      ctx!.lineWidth = Math.max(0.6, unit * 0.18);
      ctx!.strokeStyle = creamColor(0.85, 0.5 * subSharp);
      setGlow(unit * 1.2 * subSharp, GOLD_LIGHT);
      ctx!.stroke();
      ctx!.restore();
      clearGlow();

      // ===== targeting reticle locked on the subject =====
      const R = unit * 9.5;
      const tick = (v: number) => v * unit;
      const rJit = (1 - focus) * unit * 0.4;
      const RX = sx + Math.sin(elapsed * 0.012) * rJit;
      const RY = sy - subScale * 1.5 + Math.cos(elapsed * 0.015) * rJit;

      ctx!.save();
      ctx!.lineCap = "round";
      const retAlpha = 0.5 + focus * 0.45;

      // thin outer ring
      setGlow(tick(1.0), GOLD);
      ctx!.strokeStyle = GOLD;
      ctx!.globalAlpha = retAlpha * 0.9;
      ctx!.lineWidth = Math.max(1, tick(0.22));
      ctx!.beginPath();
      ctx!.arc(RX, RY, R, 0, TAU);
      ctx!.stroke();

      // rotating dashed inner ring (slow, seamless via integer rotations)
      const rot = f * TAU; // exactly one rotation per loop -> seamless
      ctx!.globalAlpha = retAlpha * 0.5;
      ctx!.lineWidth = Math.max(1, tick(0.16));
      ctx!.setLineDash([tick(1.6), tick(2.0)]);
      ctx!.beginPath();
      ctx!.arc(RX, RY, R * 0.66, rot, rot + TAU);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // crosshair lines w/ center gap
      const gap = R * 0.34;
      const reach = R * 1.5;
      ctx!.globalAlpha = retAlpha * 0.85;
      ctx!.lineWidth = Math.max(1, tick(0.2));
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

      // corner brackets — tighten as focus locks
      const spread = R * (1.9 - focus * 0.55);
      const bLen = R * 0.5;
      setGlow(tick(1.2), GOLD_LIGHT);
      ctx!.strokeStyle = GOLD_LIGHT;
      ctx!.globalAlpha = (0.4 + focus * 0.5);
      ctx!.lineWidth = Math.max(1, tick(0.26));
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (const [qx, qy] of corners) {
        const bx = RX + qx * spread;
        const by = RY + qy * spread;
        ctx!.beginPath();
        ctx!.moveTo(bx, by + qy * bLen);
        ctx!.lineTo(bx, by);
        ctx!.lineTo(bx - qx * bLen, by);
        ctx!.stroke();
      }
      ctx!.restore();
      clearGlow();

      // tiny focus-confirm readout under reticle (blinks when locked)
      ctx!.save();
      ctx!.font = `500 ${tick(1.7)}px var(--font-dm-sans), monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "top";
      const blink = focus > 0.78 && Math.sin(elapsed * 0.02) > -0.3 ? 1 : 0.4;
      ctx!.globalAlpha = (0.35 + focus * 0.55) * blink;
      ctx!.fillStyle = focus > 0.78 ? GOLD_LIGHT : GOLD;
      setGlow(tick(0.7), GOLD);
      ctx!.fillText(focus > 0.78 ? "● IN FOCUS" : "FOCUS…", RX, RY + R * 1.5);
      ctx!.restore();
      clearGlow();

      // ===== NEAR foreground bokeh (in front of everything, biggest + softest) =====
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const o of bokeh) {
        if (o.layer !== 1) continue;
        const dx = Math.cos(o.driftP + phase * o.driftA) * o.driftR;
        const dy = Math.sin(o.driftP + phase * o.driftA * 0.7) * o.driftR;
        const x = (o.bx + dx) * W;
        const y = (o.by + dy) * H - rack;
        const twink = 0.7 + 0.3 * Math.sin(o.twinkleP + phase * o.twinkleS * 2);
        // foreground softest when subject is in focus (true shallow DOF)
        const a = o.baseAlpha * twink * (0.85 + focus * 0.35);
        // breathe their size a touch with the lens
        const rr = o.r * unit * (1 + (1 - focus) * 0.08);
        drawBokeh(x, y, rr, o.hue, a, 0.0);
      }
      ctx!.restore();

      // ===== bloom over the subject core =====
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const bloom = ctx!.createRadialGradient(sx, RY, 0, sx, RY, R * 2.2);
      const bA = 0.06 + focus * 0.12;
      bloom.addColorStop(0, `rgba(232,201,106,${bA})`);
      bloom.addColorStop(0.5, `rgba(212,175,55,${bA * 0.4})`);
      bloom.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(sx, RY, R * 2.2, 0, TAU);
      ctx!.fill();
      ctx!.restore();

      // ===== anamorphic-ish horizontal streak through subject (long-lens flare) =====
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const flareA = (0.05 + focus * 0.08);
      const fg = ctx!.createLinearGradient(sx - W * 0.4, RY, sx + W * 0.4, RY);
      fg.addColorStop(0, "rgba(212,175,55,0)");
      fg.addColorStop(0.5, `rgba(232,201,106,${flareA})`);
      fg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = fg;
      ctx!.fillRect(0, RY - unit * 0.5, W, unit * 1.0);
      ctx!.restore();

      // ===== vignette ===== (heavy — long-lens edge falloff)
      ctx!.save();
      const vg = ctx!.createRadialGradient(
        cx,
        cy,
        Math.min(W, H) * 0.22,
        cx,
        cy,
        Math.max(W, H) * 0.7
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.7, "rgba(0,0,0,0.45)");
      vg.addColorStop(1, "rgba(0,0,0,0.96)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // ===== film grain ===== (procedural sparse dots)
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      const grainN = Math.floor((W * H) / 2600);
      ctx!.fillStyle = "#fff";
      // reseed grain region each frame from the loop-stable seed so it shimmers
      let gseed = (seed ^ Math.floor(elapsed)) & 0x7fffffff;
      const grnd = () => {
        gseed = (gseed * 1103515245 + 12345) & 0x7fffffff;
        return gseed / 0x7fffffff;
      };
      for (let i = 0; i < grainN; i++) {
        ctx!.fillRect(grnd() * W, grnd() * H, 1, 1);
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
