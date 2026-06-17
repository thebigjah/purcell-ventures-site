"use client";

import { useEffect, useRef } from "react";

/**
 * Light Through Glass — caustics.
 * Wavering gold caustic light drifting across a dark frame: the rippling
 * refracted networks you see at the bottom of a pool or through cut crystal.
 * Slow undulating filaments of bright gold and pooled blooms that swell and
 * dissolve.
 *
 * Pure canvas-2d, NO WebGL. The caustic field is the interference of several
 * drifting sinusoidal wave-fronts (each phase a multiple of 2π/LOOP so the
 * whole field returns exactly to its start) sampled on a low-res buffer,
 * sharpened into bright veins, blurred soft, tinted gold, then composited with
 * a chromatic core-glow, vignette and faint grain. Seamless ~12s loop forever,
 * cleanup on unmount.
 */
export default function LightThroughGlass() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const LOOP = 12; // seconds — seamless period
    let dpr = 1;
    let w = 0;
    let h = 0;

    // Low-res offscreen buffer where the caustic field is computed, then
    // scaled up (with smoothing) onto the visible canvas — this is what gives
    // the soft, blurred, organic light without per-pixel work at full res.
    const field = document.createElement("canvas");
    const fctx = field.getContext("2d");
    let img: ImageData | null = null;
    let buf: Uint8ClampedArray | null = null;
    let fw = 0;
    let fh = 0;

    const grain = document.createElement("canvas");
    const gctx = grain.getContext("2d");

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Field resolution: small for performance, the upscale blur does the
      // smoothing. Cap so big screens stay cheap.
      const scale = 150 / Math.max(w, h);
      fw = Math.max(48, Math.min(170, Math.round(w * scale)));
      fh = Math.max(48, Math.min(170, Math.round(h * scale)));
      field.width = fw;
      field.height = fh;
      if (fctx) {
        img = fctx.createImageData(fw, fh);
        buf = img.data;
      }

      // Pre-bake a static grain tile.
      grain.width = 160;
      grain.height = 160;
      if (gctx) {
        const gimg = gctx.createImageData(160, 160);
        const gd = gimg.data;
        for (let i = 0; i < gd.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          gd[i] = v;
          gd[i + 1] = v;
          gd[i + 2] = v;
          gd[i + 3] = 255;
        }
        gctx.putImageData(gimg, 0, 0);
      }
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    const TWO_PI = Math.PI * 2;

    // Drifting wave-fronts. Each contributes a travelling sinusoid; the field
    // is their sum. Their swirl drift comes from a slowly rotating direction.
    // Every temporal term is k*(2π)*t so t=0 and t=1 are identical → seamless.
    type Wave = {
      fx: number; // spatial frequency x
      fy: number; // spatial frequency y
      tk: number; // integer temporal cycles over the loop
      amp: number;
      // slow direction wobble (also integer-cycle for seamlessness)
      wob: number;
      wk: number;
      ph: number; // static phase offset
    };
    const waves: Wave[] = [
      { fx: 2.1, fy: 1.3, tk: 1, amp: 1.0, wob: 0.5, wk: 1, ph: 0.0 },
      { fx: 1.4, fy: 2.4, tk: 1, amp: 0.9, wob: 0.6, wk: 1, ph: 1.7 },
      { fx: 3.0, fy: 2.0, tk: 2, amp: 0.7, wob: 0.4, wk: 1, ph: 3.3 },
      { fx: 2.6, fy: 3.3, tk: 2, amp: 0.6, wob: 0.7, wk: 2, ph: 0.9 },
      { fx: 4.2, fy: 3.0, tk: 3, amp: 0.45, wob: 0.5, wk: 1, ph: 4.1 },
      { fx: 1.0, fy: 1.0, tk: 1, amp: 0.8, wob: 0.3, wk: 1, ph: 2.2 },
    ];

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const gt = (((now - start) / 1000) % LOOP) / LOOP; // 0..1 loop time
      const a = gt * TWO_PI;

      if (!fctx || !img || !buf) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // Precompute each wave's current animated direction/phase so the inner
      // pixel loop stays light.
      const n = waves.length;
      const kx = new Float32Array(n);
      const ky = new Float32Array(n);
      const tp = new Float32Array(n);
      const amp = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const wv = waves[i];
        // direction slowly rotates over the loop
        const rot = wv.wob * Math.sin(a * wv.wk + wv.ph);
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        kx[i] = (wv.fx * cos - wv.fy * sin) * TWO_PI;
        ky[i] = (wv.fx * sin + wv.fy * cos) * TWO_PI;
        tp[i] = a * wv.tk + wv.ph; // travelling phase
        amp[i] = wv.amp;
      }

      // Aspect so the pattern doesn't stretch on wide frames.
      const ar = fw / fh;

      let idx = 0;
      for (let y = 0; y < fh; y++) {
        const v = y / fh; // 0..1
        for (let x = 0; x < fw; x++) {
          const u = (x / fw) * ar;

          // Sum of travelling sinusoids → interference field.
          let s = 0;
          for (let i = 0; i < n; i++) {
            s += Math.sin(kx[i] * u + ky[i] * v + tp[i]) * amp[i];
          }
          // Normalize to ~ -1..1 then fold into bright caustic veins.
          s /= 4.45;
          // |.| gives the characteristic bright crease where wavefronts cross.
          let c = 1 - Math.abs(s);
          // sharpen: high power → thin bright filaments, dark pools between.
          c = c * c;
          c = c * c * c; // ^6
          // a touch of lift so pools aren't dead black
          let bright = c * 1.35 + 0.015;
          if (bright > 1) bright = 1;

          // Gold tint: warm channel ramp. Highlights push toward light gold
          // (#e8c96a), mids sit on brand gold (#d4af37).
          const r = bright * 232;
          const g = bright * (bright * 201 + (1 - bright) * 175);
          const b = bright * (bright * 106 + (1 - bright) * 55) * 0.92;

          buf[idx] = r;
          buf[idx + 1] = g;
          buf[idx + 2] = b;
          buf[idx + 3] = 255;
          idx += 4;
        }
      }
      fctx.putImageData(img, 0, 0);

      // --- Composite to screen -------------------------------------------
      // Warm near-black base.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0c0a08";
      ctx.fillRect(0, 0, w, h);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Layer 1 — soft, slightly displaced wide bloom (the diffuse pooled
      // light). Drawn large and additive so the field reads as glow.
      ctx.globalCompositeOperation = "lighter";
      const sway = Math.sin(a) * (w * 0.02);
      const swayV = Math.cos(a * 0.5 + 1.3) * (h * 0.02);
      ctx.globalAlpha = 0.55;
      ctx.drawImage(
        field,
        -w * 0.06 + sway,
        -h * 0.06 + swayV,
        w * 1.12,
        h * 1.12
      );

      // Layer 2 — crisp pass for the bright filaments themselves.
      ctx.globalAlpha = 0.9;
      ctx.drawImage(field, 0, 0, w, h);

      // Layer 3 — chromatic gold halo around the brightest mass: a breathing
      // radial that drifts, adding depth + that "light source behind glass".
      const cx = w * (0.5 + 0.12 * Math.sin(a + 0.6));
      const cy = h * (0.5 + 0.1 * Math.cos(a * 0.7));
      const breath = 0.1 + 0.06 * (0.5 + 0.5 * Math.sin(a * 2));
      const halo = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(w, h) * 0.6
      );
      halo.addColorStop(0, `rgba(232,201,106,${breath.toFixed(3)})`);
      halo.addColorStop(0.4, `rgba(212,175,55,${(breath * 0.5).toFixed(3)})`);
      halo.addColorStop(1, "rgba(212,175,55,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      // --- Vignette ------------------------------------------------------
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(
        w * 0.5,
        h * 0.48,
        Math.min(w, h) * 0.2,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.72
      );
      vig.addColorStop(0, "rgba(12,10,8,0)");
      vig.addColorStop(0.7, "rgba(12,10,8,0.35)");
      vig.addColorStop(1, "rgba(12,10,8,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // --- Grain ---------------------------------------------------------
      if (gctx) {
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.05;
        // jitter the tile each frame so grain shimmers like film
        const ox = -((Math.random() * 160) | 0);
        const oy = -((Math.random() * 160) | 0);
        for (let gx = ox; gx < w; gx += 160) {
          for (let gy = oy; gy < h; gy += 160) {
            ctx.drawImage(grain, gx, gy);
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
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
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0c0a08",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
