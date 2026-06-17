"use client";

import { useEffect, useRef } from "react";

/**
 * Film Grain + Dust — an authentic analog celluloid TEXTURE plate.
 *
 * A reusable overlay asset: heavy animated film grain over a dark warm field,
 * drifting dust specks, the odd hair/scratch streaking down the frame, subtle
 * gate weave (frame jitter), projector brightness flicker, and warm gold
 * light-leaks blooming in from the edges. Mostly dark with bright grain so it
 * reads standalone yet layers cleanly over anything.
 *
 * Pure canvas-2d (no WebGL). Grain is synthesised into a small offscreen
 * buffer each frame and stretched up — that's what gives it real photographic
 * tooth instead of the smooth gradients of a procedural look. Seamless ~6s
 * loop for the periodic events; grain itself is continuously fresh so the
 * texture never visibly repeats. Cleanup on unmount.
 */
export default function FilmGrainDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const LOOP = 6; // seconds — period of the scheduled events (leaks/scratches)
    let dpr = 1;
    let w = 0;
    let h = 0;

    // Offscreen grain buffer — kept small for real photographic tooth + speed.
    const grain = document.createElement("canvas");
    const gctx = grain.getContext("2d");
    let gw = 0;
    let gh = 0;
    let gImg: ImageData | null = null;

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

      // Grain buffer ~ half the longest CSS edge → coarse, filmic grain.
      const scale = 0.5;
      gw = Math.max(1, Math.floor((w * scale) | 0));
      gh = Math.max(1, Math.floor((h * scale) | 0));
      grain.width = gw;
      grain.height = gh;
      if (gctx) gImg = gctx.createImageData(gw, gh);
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
    // deterministic pseudo-random from a seed
    const rng = (s: number) => {
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    // --- Dust specks: each drifts slowly and flickers in/out over the loop ----
    type Dust = {
      x: number; // 0..1
      y: number; // 0..1
      vx: number;
      vy: number;
      r: number; // px radius
      phase: number; // when in loop it's visible
      life: number; // visible fraction
      dark: number; // 0 = bright mote, 1 = dark speck on the gate
    };
    let dust: Dust[] = [];
    const seedDust = () => {
      const COUNT = Math.max(18, Math.min(46, Math.floor((w * h) / 30000)));
      dust = [];
      for (let i = 0; i < COUNT; i++) {
        const r = (k: number) => rng(i * 5.31 + k * 2.17 + 0.7);
        dust.push({
          x: r(1),
          y: r(2),
          vx: (r(3) - 0.5) * 0.04,
          vy: (r(4) - 0.5) * 0.04,
          r: 0.6 + r(5) * 2.4,
          phase: r(6),
          life: 0.18 + r(7) * 0.4,
          dark: r(8) > 0.45 ? 1 : 0,
        });
      }
    };
    seedDust();

    // --- Hairs / scratches: vertical-ish lines that streak down occasionally --
    type Streak = {
      kind: 0 | 1; // 0 = thin straight scratch, 1 = wobbly hair
      x: number; // 0..1 base column
      win0: number; // appears at this loop fraction
      win1: number; // gone by this loop fraction
      sway: number; // horizontal wobble amplitude (hair)
      freq: number; // wobble frequency
      bright: number; // 0..1
      thick: number; // px
    };
    let streaks: Streak[] = [];
    const seedStreaks = () => {
      streaks = [];
      const N = 5;
      for (let i = 0; i < N; i++) {
        const r = (k: number) => rng(i * 17.7 + k * 3.91 + 4.2);
        const start = r(1);
        streaks.push({
          kind: r(2) > 0.55 ? 1 : 0,
          x: 0.06 + r(3) * 0.88,
          win0: start,
          win1: start + 0.05 + r(4) * 0.12, // brief visit, a few frames
          sway: 4 + r(5) * 14,
          freq: 2 + r(6) * 4,
          bright: 0.4 + r(7) * 0.5,
          thick: r(2) > 0.55 ? 0.8 + r(8) * 1.6 : 0.6 + r(8) * 0.8,
        });
      }
    };
    seedStreaks();

    // --- Light-leaks: warm gold blooms from edges, a couple per loop ----------
    type Leak = {
      edge: 0 | 1 | 2 | 3; // top/right/bottom/left
      along: number; // 0..1 position along that edge
      win0: number;
      win1: number;
      size: number; // reach as fraction of min(w,h)
      strength: number;
    };
    let leaks: Leak[] = [];
    const seedLeaks = () => {
      leaks = [];
      const N = 3;
      for (let i = 0; i < N; i++) {
        const r = (k: number) => rng(i * 23.3 + k * 6.13 + 9.9);
        const start = r(1);
        leaks.push({
          edge: (Math.floor(r(2) * 4) % 4) as 0 | 1 | 2 | 3,
          along: 0.2 + r(3) * 0.6,
          win0: start,
          win1: start + 0.28 + r(4) * 0.22, // slow bloom + fade
          size: 0.45 + r(5) * 0.5,
          strength: 0.1 + r(6) * 0.14,
        });
      }
    };
    seedLeaks();

    // wrap-aware window test → 0..1 envelope, seamless across the loop seam
    const windowEnv = (t: number, a: number, b: number) => {
      // normalise so the window [a,b) can straddle the 0/1 seam
      let len = b - a;
      if (len <= 0) len += 1;
      let lt = t - a;
      if (lt < 0) lt += 1;
      if (lt > len) return 0;
      const f = lt / len; // 0..1 across the window
      const s = Math.sin(Math.PI * f);
      return s * s; // 0 at edges, 1 at middle → no pop in/out
    };

    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = ((now - start) / 1000) % LOOP;
      const gt = elapsed / LOOP; // 0..1 loop time
      const tSec = (now - start) / 1000;

      // ---- 1. Warm near-black field with a gentle center warmth ------------
      const base = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.72
      );
      base.addColorStop(0, "#13100b");
      base.addColorStop(0.6, "#0e0b08");
      base.addColorStop(1, "#0c0a08");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // ---- 2. Synthesise a fresh grain frame into the offscreen buffer -----
      if (gctx && gImg) {
        const d = gImg.data;
        // a frame seed that advances ~quickly so grain crawls like real stock
        const fseed = Math.floor(tSec * 26) * 2654435761;
        for (let i = 0, p = 0; i < gw * gh; i++, p += 4) {
          // cheap hash per pixel+frame → white noise
          let n = (i * 374761393 + fseed) | 0;
          n = (n ^ (n >>> 13)) * 1274126177;
          n = (n ^ (n >>> 16)) >>> 0;
          const v = n / 4294967295; // 0..1
          // bias toward mid so grain reads as bright tooth, not full white
          const lum = 90 + v * 165; // 90..255
          // warm the grain very slightly (gold-leaning highlights)
          d[p] = Math.min(255, lum + 6);
          d[p + 1] = lum;
          d[p + 2] = Math.max(0, lum - 18);
          d[p + 3] = 255;
        }
        gctx.putImageData(gImg, 0, 0);

        // gate weave: tiny sub-pixel translation of the whole grain plate
        const weaveX = Math.sin(tSec * 5.7) * 1.1 + Math.sin(tSec * 2.3) * 0.6;
        const weaveY = Math.cos(tSec * 4.9) * 1.0 + Math.sin(tSec * 1.7) * 0.5;

        // brightness flicker: subtle projector lamp instability
        const flicker =
          0.16 +
          0.05 * Math.sin(tSec * 11.0) +
          0.03 * Math.sin(tSec * 27.0) +
          0.02 * Math.sin(tSec * 3.3);

        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = Math.max(0.08, flicker);
        ctx.drawImage(
          grain,
          weaveX - 2,
          weaveY - 2,
          w + 4,
          h + 4
        );
        ctx.restore();
      }

      // ---- 3. Dust specks (bright motes + dark gate specks) -----------------
      ctx.save();
      for (let i = 0; i < dust.length; i++) {
        const m = dust[i];
        const env = windowEnv(gt, m.phase, (m.phase + m.life) % 1);
        if (env <= 0.001) continue;
        // slow drift, wrapped
        let dx = m.x + m.vx * gt;
        let dy = m.y + m.vy * gt;
        dx -= Math.floor(dx);
        dy -= Math.floor(dy);
        const px = dx * w;
        const py = dy * h;
        const r = m.r;
        if (m.dark) {
          // dark speck riding on the gate
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = env * 0.5;
          ctx.fillStyle = "#080705";
        } else {
          // bright warm mote
          ctx.globalCompositeOperation = "screen";
          ctx.globalAlpha = env * 0.6;
          ctx.fillStyle = "rgba(230,205,140,1)";
        }
        ctx.beginPath();
        ctx.arc(px, py, r, 0, TWO_PI);
        ctx.fill();
      }
      ctx.restore();

      // ---- 4. Hairs / scratches streaking down ------------------------------
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        const env = windowEnv(gt, s.win0, s.win1 % 1);
        if (env <= 0.001) continue;
        const baseX = s.x * w;
        ctx.globalAlpha = env * s.bright;
        ctx.strokeStyle = "rgba(236,222,180,1)";
        ctx.lineWidth = s.thick;
        ctx.beginPath();
        if (s.kind === 0) {
          // straight scratch — slight jitter from gate weave
          const jx = Math.sin(tSec * 9 + i) * 0.8;
          ctx.moveTo(baseX + jx, -4);
          ctx.lineTo(baseX + jx, h + 4);
        } else {
          // wobbly hair — sinusoidal sway down the frame, animated
          const SEG = 18;
          for (let k = 0; k <= SEG; k++) {
            const yy = (k / SEG) * (h + 8) - 4;
            const xx =
              baseX +
              Math.sin((yy / h) * s.freq * Math.PI + tSec * 3 + i) * s.sway;
            if (k === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // ---- 5. Warm gold light-leaks blooming from edges --------------------
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const minD = Math.min(w, h);
      for (let i = 0; i < leaks.length; i++) {
        const l = leaks[i];
        const env = windowEnv(gt, l.win0, l.win1 % 1);
        if (env <= 0.001) continue;
        let cx = 0;
        let cy = 0;
        if (l.edge === 0) {
          cx = l.along * w;
          cy = -minD * 0.08;
        } else if (l.edge === 1) {
          cx = w + minD * 0.08;
          cy = l.along * h;
        } else if (l.edge === 2) {
          cx = l.along * w;
          cy = h + minD * 0.08;
        } else {
          cx = -minD * 0.08;
          cy = l.along * h;
        }
        const reach = minD * l.size;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, reach);
        const a = env * l.strength;
        g.addColorStop(0, `rgba(214,175,55,${(a * 1.0).toFixed(3)})`);
        g.addColorStop(0.45, `rgba(196,150,46,${(a * 0.45).toFixed(3)})`);
        g.addColorStop(1, "rgba(180,130,40,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();

      // ---- 6. Soft vignette so the plate frames cleanly when overlaid ------
      const vig = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        minD * 0.32,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.72
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

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
