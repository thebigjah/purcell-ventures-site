"use client";

import { useEffect, useRef } from "react";

/**
 * RackFocus — Purcell Ventures motion asset
 * A cinematic depth-of-field pull between two gold subjects: a foreground
 * targeting reticle and the background "PURCELL VENTURES" wordmark (Cinzel).
 * Focus racks from a sharp reticle over a creamy bokeh wordmark, pulls until
 * the wordmark snaps crisp and the reticle melts to blur, holds the beat,
 * then racks back to loop — with focus-breathing, dust motes drifting through
 * the light, film grain and a heavy vignette for a real lens feel.
 *
 * Self-contained: canvas-2d + CSS filter blur only (no WebGL), no deps, no props.
 */
export default function RackFocus() {
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
    let MIN = 0; // min dimension (vmin reference)

    // ---- Offscreen layers (drawn sharp, then blurred via ctx.filter) ----
    const wordLayer = document.createElement("canvas");
    const wctx = wordLayer.getContext("2d");
    const retLayer = document.createElement("canvas");
    const rctx = retLayer.getContext("2d");

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
      MIN = Math.min(W, H);

      // size the offscreen layers to match (device pixels), reset transforms
      for (const lc of [wordLayer, retLayer]) {
        lc.width = Math.floor(W * dpr);
        lc.height = Math.floor(H * dpr);
      }
      drawWordLayer();
      drawReticleLayer();
    };

    // ---- Easing ----
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

    // ---- Background wordmark (Cinzel), pre-rendered sharp to its own layer ----
    // The blur is applied at composite time so the bokeh stays creamy.
    const drawWordLayer = () => {
      if (!wctx) return;
      wctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wctx.clearRect(0, 0, W, H);

      const fontPx = Math.max(20, MIN * 0.118);
      const tracking = fontPx * 0.14; // letter-spacing in px
      wctx.font = `600 ${fontPx}px var(--font-cinzel), Cinzel, Georgia, serif`;
      wctx.textBaseline = "middle";

      const line1 = "PURCELL";
      const line2 = "VENTURES";
      const lineGap = fontPx * 1.06;

      // measure for tracked centering
      const trackedWidth = (s: string) => {
        let w = 0;
        for (let i = 0; i < s.length; i++) {
          w += wctx.measureText(s[i]).width + tracking;
        }
        return w - tracking;
      };
      const drawTracked = (s: string, y: number) => {
        const total = trackedWidth(s);
        let x = cx - total / 2;
        for (let i = 0; i < s.length; i++) {
          const ch = s[i];
          wctx.fillText(ch, x, y);
          x += wctx.measureText(ch).width + tracking;
        }
      };

      // soft warm wash behind the type for depth
      const wash = wctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        MIN * 0.75
      );
      wash.addColorStop(0, `rgba(${GOLD},0.05)`);
      wash.addColorStop(1, "rgba(12,10,8,0)");
      wctx.fillStyle = wash;
      wctx.fillRect(0, 0, W, H);

      // engraved fill: vertical gradient gives the gold a metallic sheen
      const sheen = wctx.createLinearGradient(0, cy - fontPx, 0, cy + fontPx);
      sheen.addColorStop(0, `rgba(${GOLD_LIGHT},0.96)`);
      sheen.addColorStop(0.5, `rgba(${GOLD},0.9)`);
      sheen.addColorStop(1, `rgba(150,112,30,0.92)`);
      wctx.fillStyle = sheen;
      wctx.shadowColor = `rgba(${GOLD},0.5)`;
      wctx.shadowBlur = fontPx * 0.18;

      drawTracked(line1, cy - lineGap / 2);
      drawTracked(line2, cy + lineGap / 2);
      wctx.shadowBlur = 0;

      // hairline rule + dot flanks between the words for a crest feel
      const ruleY = cy;
      const ruleHalf = trackedWidth(line2) / 2 + fontPx * 0.14;
      wctx.strokeStyle = `rgba(${GOLD},0.45)`;
      wctx.lineWidth = Math.max(1, fontPx * 0.012);
      wctx.beginPath();
      wctx.moveTo(cx - ruleHalf, ruleY);
      wctx.lineTo(cx - ruleHalf + fontPx * 0.5, ruleY);
      wctx.moveTo(cx + ruleHalf - fontPx * 0.5, ruleY);
      wctx.lineTo(cx + ruleHalf, ruleY);
      wctx.stroke();
    };

    // ---- Foreground targeting reticle, pre-rendered sharp to its own layer ----
    const drawReticleLayer = () => {
      if (!rctx) return;
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rctx.clearRect(0, 0, W, H);
      rctx.save();
      rctx.translate(cx, cy);
      rctx.lineCap = "round";
      rctx.lineJoin = "round";

      const R = MIN * 0.34; // outer ring radius
      const stroke = (a: number, w: number) => {
        rctx.strokeStyle = `rgba(${GOLD_LIGHT},${a})`;
        rctx.lineWidth = w;
      };

      // faint inner halo so the reticle reads as glass-lit
      const halo = rctx.createRadialGradient(0, 0, R * 0.1, 0, 0, R * 1.25);
      halo.addColorStop(0, `rgba(${GOLD},0.06)`);
      halo.addColorStop(1, "rgba(12,10,8,0)");
      rctx.fillStyle = halo;
      rctx.beginPath();
      rctx.arc(0, 0, R * 1.25, 0, Math.PI * 2);
      rctx.fill();

      rctx.shadowColor = `rgba(${GOLD},0.6)`;
      rctx.shadowBlur = R * 0.04;

      // outer ring with broken arcs (gunsight)
      const drawArcs = (rad: number, gaps: number, w: number, a: number) => {
        stroke(a, w);
        const segCount = 4;
        for (let s = 0; s < segCount; s++) {
          const a0 = (s / segCount) * Math.PI * 2 + gaps;
          const a1 = ((s + 1) / segCount) * Math.PI * 2 - gaps;
          rctx.beginPath();
          rctx.arc(0, 0, rad, a0, a1);
          rctx.stroke();
        }
      };
      drawArcs(R, 0.22, Math.max(1.5, R * 0.012), 0.92);
      drawArcs(R * 0.7, 0.34, Math.max(1, R * 0.009), 0.7);

      // full thin inner ring
      stroke(0.55, Math.max(1, R * 0.006));
      rctx.beginPath();
      rctx.arc(0, 0, R * 0.46, 0, Math.PI * 2);
      rctx.stroke();

      // tick marks around the outer ring
      const ticks = 60;
      for (let k = 0; k < ticks; k++) {
        const ang = (k / ticks) * Math.PI * 2;
        const major = k % 5 === 0;
        const t0 = R * (major ? 1.06 : 1.04);
        const t1 = R * (major ? 1.14 : 1.085);
        stroke(major ? 0.8 : 0.4, major ? Math.max(1.2, R * 0.01) : Math.max(0.8, R * 0.006));
        rctx.beginPath();
        rctx.moveTo(Math.cos(ang) * t0, Math.sin(ang) * t0);
        rctx.lineTo(Math.cos(ang) * t1, Math.sin(ang) * t1);
        rctx.stroke();
      }

      // crosshairs with a center gap (don't cross the pip)
      const gap = R * 0.14;
      const reach = R * 1.18;
      stroke(0.85, Math.max(1.2, R * 0.0095));
      const axis = (dx: number, dy: number) => {
        rctx.beginPath();
        rctx.moveTo(dx * gap, dy * gap);
        rctx.lineTo(dx * reach, dy * reach);
        rctx.stroke();
      };
      axis(1, 0);
      axis(-1, 0);
      axis(0, 1);
      axis(0, -1);

      // small range-stadia ticks on the horizontal axis
      stroke(0.6, Math.max(1, R * 0.008));
      for (let s = 1; s <= 3; s++) {
        const x = (s / 3) * R * 0.4;
        const h = R * 0.05 * (4 - s);
        for (const sx of [-1, 1]) {
          rctx.beginPath();
          rctx.moveTo(sx * x, -h);
          rctx.lineTo(sx * x, h);
          rctx.stroke();
        }
      }

      // center pip with a glowing core
      const core = rctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.06);
      core.addColorStop(0, `rgba(${GOLD_LIGHT},0.95)`);
      core.addColorStop(0.5, `rgba(${GOLD},0.6)`);
      core.addColorStop(1, "rgba(12,10,8,0)");
      rctx.fillStyle = core;
      rctx.beginPath();
      rctx.arc(0, 0, R * 0.06, 0, Math.PI * 2);
      rctx.fill();

      rctx.restore();
    };

    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // Fonts may load after first paint — redraw the wordmark when ready.
    let fontWatch = 0;
    const anyDoc = document as unknown as { fonts?: { ready?: Promise<unknown> } };
    if (anyDoc.fonts && anyDoc.fonts.ready) {
      anyDoc.fonts.ready.then(() => {
        drawWordLayer();
      });
    }
    // belt-and-suspenders: a couple of early redraws to catch late font swap
    fontWatch = window.setTimeout(() => drawWordLayer(), 350);

    // ---- Dust motes drifting through the light (in the bokeh plane) ----
    type Mote = {
      x: number; // 0..1 of W
      y: number; // 0..1 of H
      z: number; // depth 0..1 (1 = nearer reticle plane)
      vx: number;
      vy: number;
      ph: number;
      sz: number;
    };
    const MOTE_COUNT = 54;
    const motes: Mote[] = [];
    for (let i = 0; i < MOTE_COUNT; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.00003,
        vy: -(0.000015 + Math.random() * 0.00004),
        ph: Math.random() * Math.PI * 2,
        sz: 0.6 + Math.random() * 2.4,
      });
    }

    // ---- Grain (pre-rendered tile) ----
    const grain = document.createElement("canvas");
    const GS = 140;
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
        img.data[i + 3] = 14; // subtle
      }
      gctx.putImageData(img, 0, 0);
    }

    // Draw a pre-rendered sharp layer with a given blur + scale (focus-breathing).
    const compositeLayer = (
      layer: HTMLCanvasElement,
      blurPx: number,
      alpha: number,
      scale: number
    ) => {
      if (alpha <= 0.002) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.filter = blurPx > 0.05 ? `blur(${blurPx}px)` : "none";
      // scale about center for subtle focus-breathing
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      // layer is in device pixels; undo dpr to draw it 1:1 into CSS space
      ctx.drawImage(layer, 0, 0, W, H);
      ctx.restore();
      ctx.filter = "none";
    };

    // ---- Timing (ms) ----
    const LOOP = 11000;
    let raf = 0;
    const start = performance.now();
    let last = start;

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 master timeline

      // ---- Focus parameter f: 0 = reticle sharp, 1 = wordmark sharp ----
      // hold reticle (0.00-0.16), rack to wordmark (0.16-0.40),
      // hold wordmark (0.40-0.64), rack back (0.64-0.88), hold reticle (0.88-1.0)
      let f: number;
      if (t < 0.16) f = 0;
      else if (t < 0.4) f = easeInOut(seg(t, 0.16, 0.4));
      else if (t < 0.64) f = 1;
      else if (t < 0.88) f = 1 - easeInOut(seg(t, 0.64, 0.88));
      else f = 0;

      // Max bokeh blur scales with frame so it stays creamy on big screens.
      const MAXB = MIN * 0.028;
      // reticle is sharp when f=0; wordmark sharp when f=1
      const retBlur = f * MAXB; // grows as focus leaves it
      const wordBlur = (1 - f) * MAXB * 1.15; // slightly creamier far bokeh

      // focus-breathing: the plane coming INTO focus swells a hair, the one
      // leaving shrinks — the classic lens "breathing" tell.
      const retScale = 1 + (1 - f) * 0.012 - f * 0.006;
      const wordScale = 1 + f * 0.018 - (1 - f) * 0.004;

      // brightness: the focused subject blooms a touch brighter
      const retAlpha = 0.62 + (1 - f) * 0.38;
      const wordAlpha = 0.5 + f * 0.5;

      // ---- Background ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // warm depth haze, brighter behind whichever subject is in focus
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, MIN * 0.85);
      haze.addColorStop(0, `rgba(40,30,14,${0.16 + f * 0.1})`);
      haze.addColorStop(0.55, `rgba(18,13,7,0.12)`);
      haze.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // ---- Wordmark (background plane) ----
      compositeLayer(wordLayer, wordBlur, wordAlpha, wordScale);

      // ---- Dust motes (drift in the light, bokeh-blurred by their depth) ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -0.02) m.y = 1.02;
        if (m.x < -0.02) m.x = 1.02;
        if (m.x > 1.02) m.x = -0.02;

        const px = m.x * W;
        const py = m.y * H;
        // a mote's sharpness follows the focus plane it sits in
        const planeFocus = m.z; // near reticle (z->1) sharp at f=0
        const blurAmt = Math.abs(f - (1 - planeFocus)); // 0 = sharp
        const size = m.sz * (1 + blurAmt * 5) * (MIN / 700 + 0.4);
        const twinkle = 0.5 + 0.5 * Math.sin(m.ph + now * 0.0012);
        const a = (0.06 + planeFocus * 0.1) * twinkle * (1 - blurAmt * 0.7);
        if (a <= 0.004) continue;
        const g = ctx.createRadialGradient(px, py, 0, px, py, size);
        g.addColorStop(0, `rgba(${GOLD_LIGHT},${a})`);
        g.addColorStop(0.5, `rgba(${GOLD},${a * 0.45})`);
        g.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";

      // ---- Reticle (foreground plane) ----
      compositeLayer(retLayer, retBlur, retAlpha, retScale);

      // ---- Bloom kiss when each subject snaps into focus ----
      const snapWord = f > 0.92 ? (f - 0.92) / 0.08 : 0;
      const snapRet = f < 0.08 ? (0.08 - f) / 0.08 : 0;
      const snap = Math.max(snapWord, snapRet);
      if (snap > 0.001) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const r = Math.max(W, H) * 0.6;
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        bloom.addColorStop(0, `rgba(${GOLD_LIGHT},${snap * 0.06})`);
        bloom.addColorStop(0.4, `rgba(${GOLD},${snap * 0.03})`);
        bloom.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.globalAlpha = 1;

      // ---- Film grain overlay ----
      if (gctx) {
        ctx.globalAlpha = 0.5;
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

      // ---- Vignette ----
      const ev = ctx.createRadialGradient(
        cx,
        cy,
        MIN * 0.32,
        cx,
        cy,
        Math.max(W, H) * 0.78
      );
      ev.addColorStop(0, "rgba(0,0,0,0)");
      ev.addColorStop(0.7, "rgba(0,0,0,0.42)");
      ev.addColorStop(1, "rgba(0,0,0,0.9)");
      ctx.fillStyle = ev;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fontWatch);
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
