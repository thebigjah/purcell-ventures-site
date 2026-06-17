"use client";

import { useEffect, useRef } from "react";

export default function VertigoSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
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
      // Reset persistence layer to background on resize.
      ctx.fillStyle = "#0c0a08";
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);
    else window.addEventListener("resize", resize);

    const LOOP = 8000; // ms, seamless period
    const TWO_PI = Math.PI * 2;
    let start = performance.now();

    // Rose / spirograph curve. We morph the petal ratio (k) smoothly and
    // periodically so the figure breathes between rose shapes. To keep the
    // 8s loop seamless, every time-driven quantity is a function of a phase
    // that returns to its start after exactly one LOOP.
    const SAMPLES = 1400;

    const render = (now: number) => {
      const elapsed = now - start;
      const phase = (elapsed % LOOP) / LOOP; // 0..1, seamless
      const ang = phase * TWO_PI;

      // Motion-blur / persistence: fade the previous frame toward black
      // instead of clearing. Low alpha => long glowing trails.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(12, 10, 8, 0.14)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);
      const radius = minDim * 0.42; // responsive (vmin-like)

      // Breathing petal parameter. k oscillates so the rose count morphs:
      // sweeping the effective number of petals up and down across the loop.
      // Using cosine of the loop phase keeps it perfectly periodic.
      const kBase = 4.0;
      const kSwing = 2.6;
      const k = kBase + kSwing * Math.cos(ang); // smoothly varies, returns home

      // A second, slow spirographic modulation adds interior detail that
      // also closes over the loop (integer multiple of the phase).
      const innerFreq = 7; // integer => seamless
      const innerAmp = 0.16 + 0.10 * Math.sin(ang); // breathes

      // Whole figure rotation: exactly one quarter turn per loop reads as
      // continuous drift; full TWO_PI would also loop but feels faster.
      const figureRot = ang * 0.5;

      // Self-drawing: the visible arc head sweeps around once per loop, so
      // the line appears to draw itself then seamlessly redraw.
      const headT = phase; // 0..1 leading edge position
      const tail = 0.62; // fraction of curve visible behind the head

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(figureRot);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.globalCompositeOperation = "lighter";

      const curveAt = (t: number) => {
        // t in 0..1 -> angle 0..2PI (closed rose)
        const a = t * TWO_PI;
        const rose = Math.cos(k * a);
        const inner = innerAmp * Math.sin(innerFreq * a);
        const rr = radius * (0.55 + 0.45 * rose + inner * 0.5);
        return { x: rr * Math.cos(a), y: rr * Math.sin(a) };
      };

      // Draw the trailing arc as a gradient of opacity from tail to head,
      // in a few layered passes for the glow.
      const drawPass = (lw: number, alpha: number, color: string) => {
        ctx.lineWidth = lw;
        ctx.strokeStyle = color;
        ctx.beginPath();
        const segs = SAMPLES;
        for (let i = 0; i <= segs; i++) {
          const frac = i / segs; // 0..1 along visible tail
          // position along curve: head minus a portion of tail
          let t = headT - (1 - frac) * tail;
          t = ((t % 1) + 1) % 1;
          const p = curveAt(t);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      };

      // Glow halo passes (wide, dim) -> core line (thin, bright).
      const lineScale = minDim / 700;
      drawPass(6.0 * lineScale, 0.06, "#d4af37");
      drawPass(3.0 * lineScale, 0.12, "#d4af37");
      drawPass(1.4 * lineScale, 0.55, "#e8c96a");
      drawPass(0.7 * lineScale, 0.9, "#f2dd9a");

      // A faint mirrored ghost of the full closed curve underneath gives the
      // hypnotic "complete pattern" sense while the head draws over it.
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = 0.8 * lineScale;
      ctx.strokeStyle = "#d4af37";
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const p = curveAt(i / SAMPLES);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.restore();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame((t) => {
      start = t;
      render(t);
    });

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
