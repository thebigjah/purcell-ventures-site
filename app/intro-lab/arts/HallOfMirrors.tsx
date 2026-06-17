"use client";

import { useEffect, useRef } from "react";

/**
 * HallOfMirrors — Purcell Ventures motion asset.
 * The reverse-panopticon eye reflected infinitely into receding depth: nested
 * mirror frames shrink toward a vanishing point, each reflection shimmering and
 * slightly offset, with a slow parallax drift as if walking down the corridor.
 * One reflection occasionally glints brighter — the "real" one among the copies.
 *
 * Self-contained: canvas-2d only (no WebGL), no deps, no props. Seamless loop
 * achieved by scrolling a continuous depth value modulo the per-frame spacing,
 * so frames recycle at the vanishing point with no visible seam.
 */
export default function HallOfMirrors() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ---- Brand palette ----
    const GOLD = "212, 175, 55"; // #d4af37
    const GOLD_LIGHT = "232, 201, 106"; // #e8c96a
    const BG = "#0c0a08";

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let R = 0; // base eye radius (responsive vmin)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) * 0.34;
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Grain tile (pre-rendered) ----
    const grain = document.createElement("canvas");
    const GS = 150;
    grain.width = GS;
    grain.height = GS;
    const gctx = grain.getContext("2d");
    if (gctx) {
      const img = gctx.createImageData(GS, GS);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 13;
      }
      gctx.putImageData(img, 0, 0);
    }

    // ---- Recursion model ----
    // Each frame sits at an integer "slot" offset from a continuously scrolling
    // depth. scale = SHRINK^depth. As depth grows the frame is deeper/smaller.
    // We render from far (deep) to near so nearer frames overdraw farther ones.
    const SHRINK = 0.7; // per-step size ratio toward vanishing point
    const FRAMES = 16; // depth layers rendered
    const NUM_SPOKES = 24; // panopticon amphitheater cells

    // ---- Draw the panopticon eye at a given size + alpha into local space ----
    const drawEye = (
      size: number,
      alpha: number,
      shimmer: number, // 0..1 per-frame shimmer brightness
      glint: number, // 0..1 extra "real one" flare
      offX: number,
      offY: number
    ) => {
      if (alpha <= 0.004 || size < 0.8) return;
      const r = size;
      const a = alpha;

      ctx.save();
      ctx.translate(offX, offY);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";

      const baseBright = 0.55 + shimmer * 0.4 + glint * 0.5;
      const blur = (3 + shimmer * 6 + glint * 22) * (size / R);

      // concentric panopticon rings
      const RINGS = [1.0, 0.82, 0.64, 0.46, 0.3];
      for (let i = 0; i < RINGS.length; i++) {
        const rad = RINGS[i] * r;
        ctx.beginPath();
        ctx.arc(0, 0, rad, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(${GOLD},${0.4 + glint * 0.5})`;
        ctx.shadowBlur = blur;
        ctx.strokeStyle = `rgba(${i < 2 ? GOLD_LIGHT : GOLD},${
          a * baseBright * (i === 0 ? 1 : 0.78)
        })`;
        ctx.lineWidth = Math.max(0.5, (2.4 - i * 0.3) * (size / R));
        ctx.stroke();
      }

      // radial spokes between innermost and outermost ring
      const rInner = 0.3 * r;
      const rOuter = 1.0 * r;
      ctx.shadowBlur = blur * 0.6;
      for (let s = 0; s < NUM_SPOKES; s++) {
        const ang = (s / NUM_SPOKES) * Math.PI * 2;
        const cosA = Math.cos(ang);
        const sinA = Math.sin(ang);
        ctx.beginPath();
        ctx.moveTo(cosA * rInner, sinA * rInner);
        ctx.lineTo(cosA * rOuter, sinA * rOuter);
        ctx.strokeStyle = `rgba(${GOLD},${a * (0.32 + shimmer * 0.2)})`;
        ctx.lineWidth = Math.max(0.4, 0.9 * (size / R));
        ctx.stroke();
      }

      // iris tick ring
      const irisR = 0.2 * r;
      ctx.beginPath();
      ctx.arc(0, 0, irisR, 0, Math.PI * 2);
      ctx.shadowBlur = blur;
      ctx.strokeStyle = `rgba(${GOLD_LIGHT},${a * (0.6 + glint * 0.4)})`;
      ctx.lineWidth = Math.max(0.5, 1.2 * (size / R));
      ctx.stroke();

      // glowing pupil core
      const pupilR = 0.085 * r;
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, pupilR * 3);
      const coreBright = a * (0.85 + glint * 0.15);
      core.addColorStop(0, `rgba(${GOLD_LIGHT},${coreBright})`);
      core.addColorStop(0.45, `rgba(${GOLD},${a * 0.45})`);
      core.addColorStop(1, "rgba(12,10,8,0)");
      ctx.beginPath();
      ctx.arc(0, 0, pupilR * 3, 0, Math.PI * 2);
      ctx.shadowBlur = blur + glint * 18;
      ctx.shadowColor = `rgba(${GOLD_LIGHT},${0.8})`;
      ctx.fillStyle = core;
      ctx.fill();

      ctx.restore();
    };

    // ---- Draw a rectangular mirror frame at given size + alpha ----
    const drawFrame = (size: number, alpha: number, offX: number, offY: number) => {
      if (alpha <= 0.004 || size < 1) return;
      // frame is a touch wider than the eye, portrait-ish mirror
      const fw = size * 1.55;
      const fh = size * 2.0;
      ctx.save();
      ctx.translate(offX, offY);
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = `rgba(${GOLD},${alpha * 0.5})`;
      ctx.shadowBlur = 5 * (size / R);
      ctx.lineJoin = "miter";
      // outer + inner bevel lines for a "framed mirror" read
      ctx.strokeStyle = `rgba(${GOLD},${alpha * 0.5})`;
      ctx.lineWidth = Math.max(0.5, 2.2 * (size / R));
      ctx.strokeRect(-fw / 2, -fh / 2, fw, fh);
      ctx.strokeStyle = `rgba(${GOLD_LIGHT},${alpha * 0.35})`;
      ctx.lineWidth = Math.max(0.4, 1.0 * (size / R));
      const inset = size * 0.07;
      ctx.strokeRect(-fw / 2 + inset, -fh / 2 + inset, fw - inset * 2, fh - inset * 2);
      ctx.restore();
    };

    // ---- Timing ----
    const LOOP = 14000; // ms — slow corridor walk; depth advances exactly 1 slot
    const TWO_PI = Math.PI * 2;
    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 seamless
      const phase = t * TWO_PI;

      // Continuous depth scroll: advances by exactly 1 slot per loop so the
      // recursion recycles seamlessly (frame N becomes frame N-1's position).
      const depthScroll = t; // 0..1

      // ---- Background + vignette ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      const vg = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.05,
        cx,
        cy,
        Math.max(W, H) * 0.8
      );
      vg.addColorStop(0, "rgba(30,23,12,0.5)");
      vg.addColorStop(0.5, "rgba(14,11,7,0.2)");
      vg.addColorStop(1, "rgba(0,0,0,0.9)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ---- Parallax: the vanishing point sways slowly (walking gait) ----
      const vpX = cx + Math.sin(phase) * R * 0.1;
      const vpY = cy + Math.cos(phase * 0.7) * R * 0.06;

      // The "real" reflection: a glint sweeps inward through depth over the
      // loop, occasionally landing on a frame and flaring it brighter.
      const glintDepth = (t * FRAMES * 0.5) % FRAMES; // moves through frames

      ctx.save();
      ctx.translate(0, 0);

      // Render far -> near so nearer frames overdraw.
      for (let i = FRAMES - 1; i >= 0; i--) {
        // effective depth of this frame (fractional, scrolling toward viewer)
        const depth = i - depthScroll;
        if (depth < -0.001) continue; // passed the viewer; recycled
        const size = R * Math.pow(SHRINK, depth);
        if (size < 0.8) continue;

        // depth-based fade: far frames dimmer, plus near-edge fade-in as a
        // recycled frame emerges from depth and far-edge fade-out at the back.
        const depthFade = Math.pow(SHRINK, depth * 0.55); // brighter when near
        const emergeFade = Math.min(1, (FRAMES - 1 - depth) / 1.2); // back fade
        const nearFade = Math.min(1, depth / 0.25 + 0.0); // fade at viewer edge
        const alpha = depthFade * emergeFade * Math.min(1, nearFade + 0.15);

        // Each reflection slightly offset (hand-mirror imperfection) and the
        // whole stack converges toward the swaying vanishing point.
        const conv = 1 - Math.pow(SHRINK, depth); // 0 near -> 1 deep
        const ox = cx + (vpX - cx) * conv + Math.sin(phase * 1.3 + i * 0.9) * (size * 0.02);
        const oy = cy + (vpY - cy) * conv + Math.cos(phase * 1.1 + i * 1.4) * (size * 0.02);

        // Per-frame shimmer — each reflection breathes on its own phase.
        const shimmer = 0.5 + 0.5 * Math.sin(phase * 1.6 + i * 1.05);

        // Glint: how close this frame is to the traveling "real one" marker.
        const dGlint = Math.abs(((depth - glintDepth + FRAMES) % FRAMES));
        const glintProx = Math.max(0, 1 - dGlint / 0.6);
        const glint = glintProx * glintProx;

        // mirror frame behind the eye
        drawFrame(size, alpha * 0.85, ox, oy);
        // the eye reflection itself
        drawEye(size, alpha, shimmer, glint, ox, oy);
      }

      ctx.restore();
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      // ---- Central depth glow at the vanishing point (tunnel light) ----
      const tg = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, R * 0.9);
      const pulse = 0.18 + 0.07 * Math.sin(phase * 2);
      tg.addColorStop(0, `rgba(${GOLD_LIGHT},${pulse})`);
      tg.addColorStop(0.4, `rgba(${GOLD},${pulse * 0.35})`);
      tg.addColorStop(1, "rgba(12,10,8,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.arc(vpX, vpY, R * 0.9, 0, TWO_PI);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // ---- Film grain ----
      if (gctx) {
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = "overlay";
        const gox = (Math.random() * GS) | 0;
        const goy = (Math.random() * GS) | 0;
        for (let y = -goy; y < H; y += GS) {
          for (let x = -gox; x < W; x += GS) {
            ctx.drawImage(grain, x, y);
          }
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      // ---- Edge vignette (depth + focus) ----
      const ev = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.6,
        cx,
        cy,
        Math.max(W, H) * 0.7
      );
      ev.addColorStop(0, "rgba(0,0,0,0)");
      ev.addColorStop(1, "rgba(0,0,0,0.78)");
      ctx.fillStyle = ev;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
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
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
