"use client";

import { useEffect, useRef } from "react";

/**
 * Silhouette Dancers — Maurice Binder Bond-title homage.
 * Elegant dark figure silhouettes glide through an abstract shimmering gold
 * field: sinuous flowing bezier forms turn and sway, layered with raking gold
 * light beams, drifting smoke, a shimmering particle haze, soft glow, vignette
 * and film grain. Figures fade in and out as light plays through them.
 *
 * Pure canvas-2d. Seamless infinite loop via a continuous phase clock (no hard
 * cut — all motion is periodic). Fills parent; responsive; cleans up on unmount.
 */
export default function SilhouetteDancers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ---- palette --------------------------------------------------------
    const GOLD = "212, 175, 55"; // #d4af37
    const GOLD_LIGHT = "232, 201, 106"; // #e8c96a
    const BG = "#0c0a08";

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- offscreen grain tile -------------------------------------------
    const grain = document.createElement("canvas");
    const GRAIN_SIZE = 128;
    grain.width = GRAIN_SIZE;
    grain.height = GRAIN_SIZE;
    const gctx = grain.getContext("2d");
    const renderGrain = () => {
      if (!gctx) return;
      const img = gctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    };
    renderGrain();

    // ---- particle haze (shimmering field) -------------------------------
    type Particle = { x: number; y: number; r: number; sp: number; ph: number };
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 70;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.4 + Math.random() * 1.8,
        sp: 0.2 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
      });
    }

    // ---- dancer definitions ---------------------------------------------
    // Each dancer is a flowing silhouette suggested by a closed bezier body
    // that sways. They drift across horizontally and loop seamlessly.
    type Dancer = {
      lane: number; // base vertical position 0..1
      scale: number;
      drift: number; // horizontal cycles per loop
      offset: number; // phase offset 0..1
      sway: number; // amplitude of body sway
      swaySpeed: number; // sway cycles per loop
      flip: number; // 1 or -1 orientation
      tone: number; // 0 dark .. light edge influence
    };
    const dancers: Dancer[] = [
      { lane: 0.62, scale: 1.15, drift: 1, offset: 0.0, sway: 0.16, swaySpeed: 2, flip: 1, tone: 0.0 },
      { lane: 0.5, scale: 1.55, drift: 1, offset: 0.34, sway: 0.22, swaySpeed: 2, flip: -1, tone: 0.0 },
      { lane: 0.7, scale: 0.85, drift: 1, offset: 0.66, sway: 0.13, swaySpeed: 3, flip: 1, tone: 0.0 },
      { lane: 0.45, scale: 1.0, drift: 1, offset: 0.18, sway: 0.18, swaySpeed: 2, flip: -1, tone: 0.0 },
    ];

    const TWO_PI = Math.PI * 2;
    const ease = (t: number) => 0.5 - 0.5 * Math.cos(t * TWO_PI); // smooth 0..1..0

    // Draws one sinuous silhouette (abstract flowing body) centred at (cx,cy).
    // `s` scales overall size; `sway` warps the spine; `t` is loop phase.
    const drawDancer = (
      cx: number,
      cy: number,
      s: number,
      sway: number,
      flip: number,
      phase: number,
      alpha: number,
      lightX: number
    ) => {
      const h = s * Math.min(width, height) * 0.62;
      const w = h * 0.34;
      const sw = Math.sin(phase * TWO_PI) * sway;
      const sw2 = Math.sin(phase * TWO_PI * 2 + 1.1) * sway * 0.7;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(flip, 1);

      // body fill: near-black silhouette with a faint warm core
      ctx.beginPath();
      // start at base (feet, pointed)
      ctx.moveTo(0, h * 0.5);
      // left side sweeping up the spine — hips, waist, shoulder
      ctx.bezierCurveTo(
        -w * (0.9 + sw),
        h * 0.22,
        -w * (1.15 + sw2),
        -h * 0.02,
        -w * (0.55 + sw),
        -h * 0.2
      );
      // shoulder + raised arm flowing outward
      ctx.bezierCurveTo(
        -w * (1.5 + sw),
        -h * 0.34,
        -w * (1.4 + sw2),
        -h * 0.46,
        -w * 0.18,
        -h * 0.4
      );
      // head suggestion (small arc) over the top
      ctx.bezierCurveTo(
        -w * 0.1,
        -h * 0.52,
        w * 0.1,
        -h * 0.52,
        w * 0.18,
        -h * 0.4
      );
      // right arm trailing / back
      ctx.bezierCurveTo(
        w * (1.3 + sw2),
        -h * 0.44,
        w * (1.45 + sw),
        -h * 0.3,
        w * (0.5 + sw),
        -h * 0.18
      );
      // right side back down spine to base
      ctx.bezierCurveTo(
        w * (1.1 + sw2),
        -h * 0.02,
        w * (0.85 + sw),
        h * 0.24,
        0,
        h * 0.5
      );
      ctx.closePath();

      // un-flip light gradient so the rim lands consistently
      const localLight = (lightX - cx) * flip;
      const grad = ctx.createLinearGradient(localLight < 0 ? -w * 1.6 : w * 1.6, 0, 0, 0);
      grad.addColorStop(0, `rgba(${GOLD_LIGHT}, ${0.5 * alpha})`); // lit rim
      grad.addColorStop(0.18, `rgba(${GOLD}, ${0.12 * alpha})`);
      grad.addColorStop(0.45, `rgba(20, 14, 8, ${0.96 * alpha})`);
      grad.addColorStop(1, `rgba(8, 6, 4, ${0.98 * alpha})`);

      ctx.shadowColor = `rgba(${GOLD}, ${0.35 * alpha})`;
      ctx.shadowBlur = 26 * s;
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    // ---- main loop ------------------------------------------------------
    const LOOP_MS = 24000; // seamless period
    let raf = 0;
    let start = performance.now();

    const render = (now: number) => {
      const elapsed = (now - start) % LOOP_MS;
      const t = elapsed / LOOP_MS; // 0..1 loop phase
      const ang = t * TWO_PI;

      // base wash
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // ---- abstract gold field (radial breathing core) ----
      const cx = width * 0.5 + Math.sin(ang) * width * 0.06;
      const cy = height * 0.46 + Math.cos(ang * 0.7) * height * 0.04;
      const fieldR = Math.max(width, height) * (0.55 + 0.08 * Math.sin(ang * 2));
      const field = ctx.createRadialGradient(cx, cy, 0, cx, cy, fieldR);
      field.addColorStop(0, `rgba(${GOLD}, 0.28)`);
      field.addColorStop(0.4, `rgba(${GOLD}, 0.10)`);
      field.addColorStop(0.75, `rgba(120, 86, 30, 0.05)`);
      field.addColorStop(1, "rgba(12, 10, 8, 0)");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, width, height);

      // ---- raking gold light beams (additive) ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const BEAMS = 5;
      const lightX = cx;
      for (let i = 0; i < BEAMS; i++) {
        const bp = (i / BEAMS + t * 0.5) % 1; // beams sweep over the loop
        const sweep = ease((bp + i * 0.13) % 1);
        const bx = width * (0.12 + 0.76 * sweep);
        const tilt = (i % 2 === 0 ? 1 : -1) * (0.18 + 0.1 * Math.sin(ang + i));
        const bw = Math.max(width, height) * (0.05 + 0.03 * Math.sin(ang * 2 + i));
        const intensity = 0.06 + 0.05 * Math.sin(ang * 2 + i * 1.7);

        ctx.save();
        ctx.translate(bx, -height * 0.1);
        ctx.rotate(tilt);
        const bg = ctx.createLinearGradient(0, 0, 0, height * 1.4);
        bg.addColorStop(0, `rgba(${GOLD_LIGHT}, ${Math.max(0, intensity)})`);
        bg.addColorStop(0.5, `rgba(${GOLD}, ${Math.max(0, intensity * 0.5)})`);
        bg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bg;
        ctx.fillRect(-bw, 0, bw * 2, height * 1.4);
        ctx.restore();
      }
      ctx.restore();

      // ---- drifting smoke (soft dark+gold blobs, multiply-ish) ----
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const SMOKE = 6;
      for (let i = 0; i < SMOKE; i++) {
        const sp = (t * (0.3 + i * 0.05) + i / SMOKE) % 1;
        const sx = ((i * 0.27 + sp * 0.5) % 1) * width;
        const sy = height * (0.2 + 0.6 * ((Math.sin(ang + i) + 1) / 2));
        const sr = Math.max(width, height) * (0.16 + 0.06 * Math.sin(ang * 1.3 + i));
        const a = 0.04 + 0.03 * Math.sin(ang * 2 + i * 2.1);
        const smoke = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
        smoke.addColorStop(0, `rgba(${GOLD}, ${Math.max(0, a)})`);
        smoke.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = smoke;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // ---- dancers ----
      for (const d of dancers) {
        const dp = (t * d.drift + d.offset) % 1;
        // glide across with a soft margin so entries/exits feel intentional
        const x = -width * 0.2 + dp * (width * 1.4);
        const y = height * d.lane + Math.sin((t * d.swaySpeed + d.offset) * TWO_PI) * height * 0.05;
        // fade in/out: visible in the middle, vanish at the edges + a light-play flicker
        const edgeFade = Math.sin(dp * Math.PI); // 0 at edges, 1 mid
        const lightPlay = 0.7 + 0.3 * Math.sin((t * 3 + d.offset) * TWO_PI);
        const alpha = Math.max(0, edgeFade) * lightPlay;
        if (alpha <= 0.01) continue;
        const swayPhase = (t * d.swaySpeed + d.offset) % 1;
        drawDancer(x, y, d.scale, d.sway, d.flip, swayPhase, alpha, lightX);
      }

      // ---- shimmering particle haze ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const py = (p.y + t * p.sp * 0.3) % 1;
        const px = (p.x + Math.sin(ang * p.sp + p.ph) * 0.02) % 1;
        const tw = 0.4 + 0.6 * ((Math.sin(ang * (1 + p.sp) + p.ph) + 1) / 2);
        const a = 0.5 * tw;
        const X = px * width;
        const Y = py * height;
        const R = p.r * (1 + 0.4 * tw);
        const pg = ctx.createRadialGradient(X, Y, 0, X, Y, R * 3);
        pg.addColorStop(0, `rgba(${GOLD_LIGHT}, ${a})`);
        pg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(X, Y, R * 3, 0, TWO_PI);
        ctx.fill();
      }
      ctx.restore();

      // ---- central soft glow bloom over everything ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, fieldR * 0.7);
      bloom.addColorStop(0, `rgba(${GOLD_LIGHT}, 0.08)`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // ---- vignette ----
      const vg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.25,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      // ---- film grain (animated, tiled, low alpha) ----
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.globalCompositeOperation = "overlay";
      const ox = Math.floor((Math.sin(ang * 13) * 0.5 + 0.5) * GRAIN_SIZE);
      const oy = Math.floor((Math.cos(ang * 11) * 0.5 + 0.5) * GRAIN_SIZE);
      for (let gx = -ox; gx < width; gx += GRAIN_SIZE) {
        for (let gy = -oy; gy < height; gy += GRAIN_SIZE) {
          ctx.drawImage(grain, gx, gy);
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0c0a08", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
