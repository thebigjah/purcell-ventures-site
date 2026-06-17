"use client";

import { useEffect, useRef } from "react";

/**
 * AnamorphicFlare — cinematic anamorphic lens flare.
 *
 * A wide horizontal gold streak sweeps slowly across a dark frame: bright bloom
 * core, secondary flare circles tracking the optical axis, chromatic-aberration
 * fringing, soft halation, film grain and vignette. Drifts out, re-enters, loops.
 */
export default function AnamorphicFlare() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Brand palette
    const NEAR_BLACK = "#0c0a08";

    const setSize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, w);
      height = Math.max(1, h);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => setSize());
      if (canvas.parentElement) ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", setSize);
    }

    // Pre-rendered film grain tile (cheap, scrolled per frame)
    const grainSize = 160;
    const grain = document.createElement("canvas");
    grain.width = grainSize;
    grain.height = grainSize;
    const gctx = grain.getContext("2d");
    if (gctx) {
      const img = gctx.createImageData(grainSize, grainSize);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    }

    // Eased, seamless loop parameter. easeInOutSine keeps motion buttery.
    const LOOP_MS = 14000;
    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const start = performance.now();

    const render = (now: number) => {
      const elapsed = (now - start) % LOOP_MS;
      const t = elapsed / LOOP_MS; // 0..1 seamless
      const w = width;
      const h = height;
      const cy = h * 0.5;

      // Flare horizontal center travels left->right across and out, then the
      // loop wrap re-enters it from the left. The streak is wider than the
      // frame so the sweep reads continuous.
      const travel = easeInOutSine(t);
      // map to span from off-left to off-right
      const cx = -w * 0.35 + travel * (w * 1.7);

      // Slow vertical bob for "hand-held lens" life
      const bob = Math.sin(t * Math.PI * 2) * h * 0.018;
      const axisY = cy + bob;

      // Optical axis direction (gentle tilt) toward frame center.
      const tilt = -0.06; // radians, subtle

      // Intensity breathes — brightest mid-sweep, soft at edges.
      const edgeFade = Math.sin(Math.PI * t); // 0 at loop seam, 1 mid
      const intensity = 0.35 + 0.65 * edgeFade;

      // ---- Base frame ----
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = NEAR_BLACK;
      ctx.fillRect(0, 0, w, h);

      // Faint warm ambient gradient so black isn't dead flat
      const amb = ctx.createRadialGradient(cx, axisY, 0, cx, axisY, Math.max(w, h) * 0.9);
      amb.addColorStop(0, "rgba(40, 30, 12, 0.55)");
      amb.addColorStop(0.5, "rgba(20, 15, 7, 0.25)");
      amb.addColorStop(1, "rgba(12, 10, 8, 0)");
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, w, h);

      // Everything glowing is additive
      ctx.globalCompositeOperation = "lighter";

      // ---- Soft halation wash around the core ----
      const halo = ctx.createRadialGradient(cx, axisY, 0, cx, axisY, h * 0.85);
      halo.addColorStop(0, `rgba(232, 201, 106, ${0.10 * intensity})`);
      halo.addColorStop(0.4, `rgba(212, 175, 55, ${0.05 * intensity})`);
      halo.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      // ---- The wide horizontal anamorphic streak ----
      // Built as a tall-but-thin additive bar with chromatic fringes.
      ctx.save();
      ctx.translate(cx, axisY);
      ctx.rotate(tilt);

      const streakLen = w * 1.6;
      const coreThick = Math.max(2.2, h * 0.006);

      const drawStreak = (
        color: string,
        thickness: number,
        lengthScale: number,
        alpha: number
      ) => {
        const len = streakLen * lengthScale;
        const grad = ctx.createLinearGradient(-len / 2, 0, len / 2, 0);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.5, color.replace("ALPHA", String(alpha * intensity)));
        grad.addColorStop(1, "rgba(0,0,0,0)");
        const vgrad = ctx.createLinearGradient(0, -thickness, 0, thickness);
        // We fake vertical falloff by stacking a radial-ish gradient via fillRect
        // with the linear color, then multiply by a soft vertical mask below.
        ctx.fillStyle = grad;
        ctx.save();
        // vertical soft mask using a clip gradient approximation:
        const maskSteps = 14;
        for (let i = 0; i < maskSteps; i++) {
          const f = i / (maskSteps - 1); // 0..1
          const yy = (f - 0.5) * 2 * thickness;
          const soft = Math.exp(-Math.pow((f - 0.5) * 3.2, 2)); // gaussian
          ctx.globalAlpha = soft;
          ctx.fillRect(-len / 2, yy - thickness / maskSteps, len, (2 * thickness) / maskSteps + 1);
        }
        ctx.restore();
        void vgrad;
      };

      // Chromatic aberration: warm gold core flanked by faint cooler/red fringes
      drawStreak("rgba(255, 90, 70, ALPHA)", coreThick * 2.4, 0.98, 0.22); // red fringe (low)
      drawStreak("rgba(120, 170, 255, ALPHA)", coreThick * 2.2, 0.96, 0.16); // blue fringe
      drawStreak("rgba(212, 175, 55, ALPHA)", coreThick * 2.0, 1.0, 0.55); // gold body
      drawStreak("rgba(232, 201, 106, ALPHA)", coreThick * 1.0, 1.0, 0.85); // bright gold
      drawStreak("rgba(255, 248, 224, ALPHA)", coreThick * 0.45, 0.9, 0.95); // white-hot center line

      ctx.restore();

      // ---- Bright bloom core ----
      const coreR = Math.max(8, h * 0.05) * (0.85 + 0.3 * edgeFade);
      const core = ctx.createRadialGradient(cx, axisY, 0, cx, axisY, coreR * 3.2);
      core.addColorStop(0, `rgba(255, 250, 232, ${0.95 * intensity})`);
      core.addColorStop(0.18, `rgba(232, 201, 106, ${0.8 * intensity})`);
      core.addColorStop(0.45, `rgba(212, 175, 55, ${0.32 * intensity})`);
      core.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // Tiny ultra-bright pinpoint
      const pin = ctx.createRadialGradient(cx, axisY, 0, cx, axisY, coreR * 0.6);
      pin.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`);
      pin.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = pin;
      ctx.fillRect(0, 0, w, h);

      // ---- Secondary flare elements along the optical axis ----
      // Axis runs from the core through frame center to the opposite side.
      const fcx = w * 0.5;
      const fcy = h * 0.5;
      const ax = fcx - cx;
      const ay = fcy - axisY;

      // Ghost spec: position factor along axis (negative = before core),
      // radius, alpha, hue.
      const ghosts: Array<[number, number, string, number]> = [
        [-0.55, 0.9, "rgba(232, 201, 106, A)", 0.10],
        [0.35, 1.4, "rgba(212, 175, 55, A)", 0.14],
        [0.7, 0.55, "rgba(255, 240, 200, A)", 0.18],
        [1.0, 2.2, "rgba(212, 175, 55, A)", 0.08],
        [1.35, 0.8, "rgba(180, 200, 255, A)", 0.07], // cool ghost (CA)
        [1.7, 1.1, "rgba(232, 201, 106, A)", 0.10],
        [2.15, 0.45, "rgba(255, 250, 230, A)", 0.13],
        [2.5, 1.6, "rgba(212, 175, 55, A)", 0.06],
      ];

      const baseGhost = Math.max(6, h * 0.028);
      for (let i = 0; i < ghosts.length; i++) {
        const [pos, rscale, color, a] = ghosts[i];
        const gx = cx + ax * pos;
        const gy = axisY + ay * pos;
        const gr = baseGhost * rscale;
        const ga = a * intensity;

        // soft disc with a faint ring edge (iris ghost)
        const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        gg.addColorStop(0, color.replace("A", String(ga * 0.55)));
        gg.addColorStop(0.72, color.replace("A", String(ga * 0.32)));
        gg.addColorStop(0.92, color.replace("A", String(ga * 0.7)));
        gg.addColorStop(1, color.replace("A", "0"));
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
      }

      // A couple of tiny tracking dots (hexagonal-iris feel, drawn as small bright points)
      const dotCount = 5;
      for (let i = 0; i < dotCount; i++) {
        const pos = -0.3 + (i / (dotCount - 1)) * 2.6;
        const gx = cx + ax * pos;
        const gy = axisY + ay * pos;
        const dr = Math.max(1.5, h * 0.004);
        const dg = ctx.createRadialGradient(gx, gy, 0, gx, gy, dr * 4);
        dg.addColorStop(0, `rgba(255, 245, 215, ${0.5 * intensity})`);
        dg.addColorStop(1, "rgba(255, 245, 215, 0)");
        ctx.fillStyle = dg;
        ctx.beginPath();
        ctx.arc(gx, gy, dr * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- Vertical anamorphic bloom spike off the core (subtle) ----
      ctx.save();
      ctx.translate(cx, axisY);
      const spikeH = h * 0.5;
      const spikeGrad = ctx.createLinearGradient(0, -spikeH, 0, spikeH);
      spikeGrad.addColorStop(0, "rgba(232, 201, 106, 0)");
      spikeGrad.addColorStop(0.5, `rgba(232, 201, 106, ${0.10 * intensity})`);
      spikeGrad.addColorStop(1, "rgba(232, 201, 106, 0)");
      ctx.fillStyle = spikeGrad;
      ctx.fillRect(-Math.max(1, h * 0.003), -spikeH, Math.max(2, h * 0.006), spikeH * 2);
      ctx.restore();

      // ---- Post: grain (subtle, scrolling) ----
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.05;
      const ox = (t * 320) % grainSize;
      const oy = (t * 180) % grainSize;
      for (let y = -grainSize; y < h + grainSize; y += grainSize) {
        for (let x = -grainSize; x < w + grainSize; x += grainSize) {
          ctx.drawImage(grain, x - ox, y - oy);
        }
      }
      ctx.globalAlpha = 1;

      // ---- Post: vignette ----
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.25,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.72
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", setSize);
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
