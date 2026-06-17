"use client";

import { useEffect, useRef } from "react";

/**
 * ChromaticAberration — Purcell Ventures motion asset
 * Chromatic aberration / intercepted-signal plate. A central gold panopticon
 * "PV" eye sits on near-black, its edges fringed by an RGB channel-split
 * (cyan / magenta / gold) that breathes in and out. Periodic digital glitch
 * jolts tear the frame — horizontal slice displacement, scanline shear,
 * signal-loss flicker — then snap and recover, with a constant VHS edge wobble,
 * subtle barrel distortion, film grain and a heavy vignette.
 *
 * Self-contained: canvas-2d only (no WebGL), no deps, no props. Seamless loop.
 */
export default function ChromaticAberration() {
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
    let R = 0; // base mark radius (responsive vmin)

    // Offscreen "mark" buffer — the pure gold artwork is drawn here once per
    // frame, then composited three times (R / G / B) with per-channel offsets.
    const mark = document.createElement("canvas");
    const mctx = mark.getContext("2d");
    // Channel-isolation buffer used to tint the mark per RGB channel.
    const chan = document.createElement("canvas");
    const cctx = chan.getContext("2d");

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
      R = Math.min(W, H) * 0.26;

      mark.width = Math.floor(W * dpr);
      mark.height = Math.floor(H * dpr);
      chan.width = mark.width;
      chan.height = mark.height;
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Helpers ----
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    // deterministic pseudo-random keyed to a number (stable per glitch frame)
    const hash = (n: number) => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    // ---- Grain (pre-rendered tile) ----
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
        img.data[i + 3] = 16;
      }
      gctx.putImageData(img, 0, 0);
    }

    // ---- Draw the gold panopticon "PV" mark into a target ctx (device px) ----
    // Drawn in white/gold; channel tinting happens at composite time.
    const drawMark = (
      g: CanvasRenderingContext2D,
      t: number,
      breathe: number
    ) => {
      g.save();
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      g.translate(cx, cy);

      // gentle living rotation of the outer schematic
      const spin = t * Math.PI * 2 * 0.06;
      const irisPulse = 1 + Math.sin(t * Math.PI * 2 * 2) * 0.04 + breathe * 0.05;

      g.lineCap = "round";
      g.lineJoin = "round";
      g.strokeStyle = `rgba(${GOLD_LIGHT}, 0.95)`;
      g.fillStyle = `rgba(${GOLD_LIGHT}, 0.95)`;

      // ---- Outer panopticon ring (almond eye outline) ----
      g.save();
      g.beginPath();
      const eyeW = R * 1.55;
      const eyeH = R * 0.92;
      // upper lid
      g.moveTo(-eyeW, 0);
      g.quadraticCurveTo(0, -eyeH, eyeW, 0);
      // lower lid
      g.quadraticCurveTo(0, eyeH, -eyeW, 0);
      g.lineWidth = 2.4;
      g.stroke();
      g.restore();

      // ---- Concentric amphitheater rings ----
      g.save();
      g.rotate(spin);
      const rings = [1.0, 0.78, 0.56];
      for (let i = 0; i < rings.length; i++) {
        g.beginPath();
        g.arc(0, 0, R * rings[i], 0, Math.PI * 2);
        g.lineWidth = 1.4;
        g.stroke();
      }
      // radial cell dividers (panopticon cells)
      const spokes = 18;
      for (let s = 0; s < spokes; s++) {
        const a = (s / spokes) * Math.PI * 2;
        g.beginPath();
        g.moveTo(Math.cos(a) * R * 0.56, Math.sin(a) * R * 0.56);
        g.lineTo(Math.cos(a) * R * 1.0, Math.sin(a) * R * 1.0);
        g.lineWidth = 0.9;
        g.stroke();
      }
      g.restore();

      // ---- Iris + pupil (the watching core) ----
      g.beginPath();
      g.arc(0, 0, R * 0.5 * irisPulse, 0, Math.PI * 2);
      g.lineWidth = 1.6;
      g.stroke();

      // glowing pupil core
      const pr = R * 0.2 * irisPulse;
      const core = g.createRadialGradient(0, 0, 0, 0, 0, pr * 2.2);
      core.addColorStop(0, `rgba(${GOLD_LIGHT}, 1)`);
      core.addColorStop(0.45, `rgba(${GOLD}, 0.85)`);
      core.addColorStop(1, "rgba(0,0,0,0)");
      g.beginPath();
      g.arc(0, 0, pr * 2.2, 0, Math.PI * 2);
      g.fillStyle = core;
      g.fill();
      g.beginPath();
      g.arc(0, 0, pr, 0, Math.PI * 2);
      g.fillStyle = `rgba(${GOLD_LIGHT}, 1)`;
      g.fill();

      // ---- The "PV" monogram seated over the eye ----
      g.fillStyle = `rgba(${GOLD_LIGHT}, 0.95)`;
      g.strokeStyle = `rgba(${GOLD_LIGHT}, 0.95)`;
      g.font = `700 ${Math.floor(R * 0.62)}px var(--font-cinzel), Georgia, serif`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.globalAlpha = 0.9;
      // slight letterspacing by drawing P and V apart
      const lx = R * 0.34;
      g.fillText("P", -lx, -R * 0.02);
      g.fillText("V", lx, -R * 0.02);
      g.globalAlpha = 1;

      g.restore();
    };

    // ---- Composite one RGB channel of the mark with an offset ----
    // mode: which channel survives ("r" | "g" | "b")
    const blitChannel = (
      dx: number,
      dy: number,
      mode: "r" | "g" | "b",
      alpha: number
    ) => {
      if (!cctx) return;
      // 1) copy the mark into the channel buffer
      cctx.setTransform(1, 0, 0, 1, 0, 0);
      cctx.globalCompositeOperation = "source-over";
      cctx.clearRect(0, 0, chan.width, chan.height);
      cctx.drawImage(mark, 0, 0);
      // 2) isolate the channel by multiplying with a pure primary
      cctx.globalCompositeOperation = "multiply";
      cctx.fillStyle =
        mode === "r" ? "#ff0000" : mode === "g" ? "#00ff00" : "#0000ff";
      cctx.fillRect(0, 0, chan.width, chan.height);
      // 3) restore the mark's alpha mask (multiply kept color, not coverage)
      cctx.globalCompositeOperation = "destination-in";
      cctx.drawImage(mark, 0, 0);
      cctx.globalCompositeOperation = "source-over";

      // 4) additively composite into the main canvas with the channel offset
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(chan, dx * dpr, dy * dpr);
      ctx.restore();
    };

    // ---- Timing ----
    const LOOP = 8000; // ms — seamless period
    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 master timeline

      // ---- Breathing chromatic spread (always-on, sinusoidal => seamless) ----
      const breathe = (Math.sin(t * Math.PI * 2 * 2) + 1) * 0.5; // 0..1, 2 cycles
      // base RGB split magnitude in CSS px, scaled to size
      const baseSplit = (R * 0.018 + 1.5) * (0.6 + breathe * 0.9);

      // ---- Glitch scheduling — deterministic on the timeline => loops clean ----
      // Three jolts per loop at fixed phases; each is a short snap+recover.
      const jolts = [0.22, 0.55, 0.83];
      let glitch = 0; // 0..1 intensity
      let glitchSeed = 0;
      for (let j = 0; j < jolts.length; j++) {
        const span = 0.07;
        const local = (t - jolts[j]) / span;
        if (local >= 0 && local <= 1) {
          // fast attack, ragged sustain, snap recover
          const env = Math.pow(Math.sin(local * Math.PI), 0.5);
          if (env > glitch) {
            glitch = env;
            glitchSeed = j * 97.3 + Math.floor(local * 11);
          }
        }
      }

      // VHS edge wobble (continuous, sinusoidal)
      const wobble = Math.sin(t * Math.PI * 2 * 3) * (R * 0.01) +
        Math.sin(t * Math.PI * 2 * 7) * (R * 0.004);

      // ---- Background ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // faint base vignette glow behind the mark
      const bgGlow = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.2,
        cx,
        cy,
        Math.max(W, H) * 0.6
      );
      bgGlow.addColorStop(0, `rgba(${GOLD}, ${0.07 + breathe * 0.04})`);
      bgGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      // ---- Render the gold mark to the offscreen buffer ----
      if (mctx) drawMark(mctx, t, breathe);

      // ---- RGB channel split composite ----
      // Cyan (G+B) leads one way, magenta-ish red leads the other, gold center.
      const sx = baseSplit + glitch * R * 0.12;
      const sy = wobble * 0.5 + glitch * (hash(glitchSeed + 5) - 0.5) * R * 0.05;

      // signal-loss flicker on the core during jolts
      const lossFlicker =
        glitch > 0 && hash(glitchSeed * 1.7 + Math.floor(t * 240)) < glitch * 0.35
          ? 0.35
          : 1;

      // Red channel pushed left, Blue pushed right => classic aberration.
      blitChannel(-sx, -sy, "r", 0.95 * lossFlicker);
      blitChannel(0, 0, "g", 0.98 * lossFlicker); // green roughly centered (the gold body)
      blitChannel(sx, sy, "b", 0.95 * lossFlicker);
      // extra warm gold pass dead-center to keep brand color reading as gold
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.5 * lossFlicker;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // tint the centered mark gold via a multiply pass in the channel buffer
      if (cctx) {
        cctx.setTransform(1, 0, 0, 1, 0, 0);
        cctx.globalCompositeOperation = "source-over";
        cctx.clearRect(0, 0, chan.width, chan.height);
        cctx.drawImage(mark, 0, 0);
        cctx.globalCompositeOperation = "multiply";
        cctx.fillStyle = "#d4af37";
        cctx.fillRect(0, 0, chan.width, chan.height);
        cctx.globalCompositeOperation = "destination-in";
        cctx.drawImage(mark, 0, 0);
        cctx.globalCompositeOperation = "source-over";
        ctx.drawImage(chan, 0, 0);
      }
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // ---- Horizontal slice displacement + scanline tearing during jolts ----
      if (glitch > 0.02) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // device px for clean slice copies
        const sliceCount = 5 + Math.floor(glitch * 8);
        for (let s = 0; s < sliceCount; s++) {
          const r1 = hash(glitchSeed + s * 3.3);
          const r2 = hash(glitchSeed + s * 7.7 + 1);
          const r3 = hash(glitchSeed + s * 2.1 + 2);
          if (r1 > 0.55) {
            const sliceY = Math.floor(r2 * canvas.height);
            const sliceH = Math.floor((4 + r3 * 26) * dpr);
            const shift = Math.floor((r1 - 0.5) * glitch * R * 0.9 * dpr);
            if (sliceH > 0 && sliceY + sliceH <= canvas.height) {
              ctx.drawImage(
                canvas,
                0,
                sliceY,
                canvas.width,
                sliceH,
                shift,
                sliceY,
                canvas.width,
                sliceH
              );
            }
          }
        }
        // bright tearing scanlines
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = "lighter";
        const lines = 3 + Math.floor(glitch * 4);
        for (let l = 0; l < lines; l++) {
          const ly = hash(glitchSeed + l * 13.1) * H;
          const lh = 1 + hash(glitchSeed + l * 5.5) * 2;
          ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${0.12 + glitch * 0.2})`;
          ctx.fillRect(0, ly, W, lh);
        }
        ctx.globalCompositeOperation = "source-over";
      }

      // ---- Constant fine scanlines (CRT / intercepted feel) ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#000";
      const scanGap = 3;
      for (let y = 0; y < H; y += scanGap) {
        ctx.fillRect(0, y, W, 1);
      }
      ctx.globalAlpha = 1;

      // ---- Subtle barrel distortion vignette (darkened bowed corners) ----
      const barrel = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.6,
        cx,
        cy,
        Math.max(W, H) * 0.62
      );
      barrel.addColorStop(0, "rgba(0,0,0,0)");
      barrel.addColorStop(0.7, "rgba(0,0,0,0.18)");
      barrel.addColorStop(1, "rgba(0,0,0,0.9)");
      ctx.fillStyle = barrel;
      ctx.fillRect(0, 0, W, H);

      // ---- Film grain ----
      if (gctx) {
        ctx.globalAlpha = 0.55;
        ctx.globalCompositeOperation = "overlay";
        const ox = (Math.random() * GS) | 0;
        const oy = (Math.random() * GS) | 0;
        for (let y = -oy; y < H; y += GS) {
          for (let x = -ox; x < W; x += GS) {
            ctx.drawImage(grain, x, y);
          }
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      // ---- Signal-loss full-frame flicker (brief black/roll on hard jolts) ----
      if (glitch > 0.6 && hash(glitchSeed + Math.floor(t * 300)) < 0.18) {
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, W, H);
      }

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
