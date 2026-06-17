"use client";

import { useEffect, useRef } from "react";

/**
 * Roses to Blood — Bond-motif title art.
 * A gold rose blooms open petal-layer by petal-layer; at full bloom a
 * crimson corruption seeps from the center, a single bleed-drip runs down,
 * the rose wilts closed, then re-blooms gold to loop. Slow, elegant, ominous.
 *
 * Pure canvas-2d. Layered petal whorls (gradient-shaded bezier petals),
 * soft bloom glow, grain, vignette, and an eased seamless ~14s loop.
 * Forever, cleanup on unmount.
 */
export default function RosesToBlood() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const LOOP = 14; // seconds — seamless period
    let dpr = 1;
    let w = 0;
    let h = 0;

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
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    // --- Grain texture (tiled, generated once) ------------------------------
    const grainSize = 140;
    const grain = document.createElement("canvas");
    grain.width = grainSize;
    grain.height = grainSize;
    const gctx = grain.getContext("2d");
    if (gctx) {
      const img = gctx.createImageData(grainSize, grainSize);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    }
    const grainPattern = gctx ? ctx.createPattern(grain, "repeat") : null;

    const TWO_PI = Math.PI * 2;
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    // smootherstep — silky eased transitions
    const smooth = (t: number) => {
      t = clamp01(t);
      return t * t * t * (t * (t * 6 - 15) + 10);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // --- Petal whorl layout -------------------------------------------------
    // Each petal: which whorl ring it lives in, its angle, and a deterministic
    // size/curl wiggle so the rose reads organic rather than mechanical.
    type Petal = {
      ring: number; // 0 = inner ... RINGS-1 = outer
      ringT: number; // 0..1 position of this ring (inner→outer)
      angle: number; // radial placement
      len: number; // length factor
      width: number; // half-width factor
      curl: number; // tip curl bias
      wob: number; // per-petal wobble seed
      bloomDelay: number; // 0..1 — when in the bloom this petal opens
    };

    const rng = (s: number) => {
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const RINGS: number = 5;
    const petals: Petal[] = [];
    let seed = 0;
    for (let r = 0; r < RINGS; r++) {
      const ringT = RINGS === 1 ? 0 : r / (RINGS - 1);
      // more petals further out, like a real rose
      const countF = 2 + Math.round(ringT * 4); // 2..6 (per ring)
      const count = r === 0 ? 3 : countF + r;
      const baseRot = rng(r * 7.3 + 1.1) * TWO_PI;
      for (let i = 0; i < count; i++) {
        const a = baseRot + (i / count) * TWO_PI;
        const jit = (rng(seed * 3.7 + 2.2) - 0.5) * (0.5 / count) * TWO_PI;
        petals.push({
          ring: r,
          ringT,
          angle: a + jit,
          len: 0.78 + rng(seed * 1.9 + 4.4) * 0.35,
          width: 0.7 + rng(seed * 2.3 + 5.5) * 0.4,
          curl: 0.6 + rng(seed * 5.1 + 6.6) * 0.7,
          wob: rng(seed * 8.8 + 7.7) * TWO_PI,
          // inner rings open first, outer last — layered unfurl
          bloomDelay: ringT * 0.6 + rng(seed * 4.2 + 3.3) * 0.12,
        });
        seed++;
      }
    }
    // draw inner rings last (on top) for proper overlap
    petals.sort((a, b) => a.ring - b.ring);

    // --- Phase envelope -----------------------------------------------------
    // One loop: bloom(gold) → corrupt(crimson seep + drip) → wilt(close) → reset
    // Returns eased controls for the whole scene at loop time g (0..1).
    const phases = (g: number) => {
      // bloom: 0.00–0.40 open ; hold 0.40–0.50
      // corrupt: 0.42–0.74 crimson seeps + drip falls
      // wilt: 0.74–1.00 closes back to bud, gold restored at the seam
      const bloom = smooth((g - 0.0) / 0.4); // 0→1 openness during bloom
      const holdWilt = 1 - smooth((g - 0.74) / 0.26); // 1→0 closing
      const open = g < 0.74 ? bloom : holdWilt; // overall openness 0..1
      const corrupt = smooth((g - 0.42) / 0.3) * (1 - smooth((g - 0.84) / 0.16));
      // drip: emerges mid-corruption, falls, fades before wilt completes
      const drip = clamp01((g - 0.5) / 0.34);
      return { open, corrupt: clamp01(corrupt), drip };
    };

    // Draw a single petal as a curled, gradient-shaded leaf shape.
    const drawPetal = (
      cx: number,
      cy: number,
      baseR: number,
      scale: number,
      p: Petal,
      open: number,
      corrupt: number,
      breathe: number
    ) => {
      // openness pushes petals outward + tilts them flatter as they unfurl
      const unfurl = clamp01((open - p.bloomDelay) / 0.4);
      const e = smooth(unfurl);
      if (e <= 0.001) return;

      const wob = Math.sin(breathe * TWO_PI + p.wob) * 0.04;
      const ang = p.angle + wob * (0.4 + p.ringT);
      // petals start clustered at center (closed bud), splay outward as e→1
      const reach = baseR * (0.16 + p.ringT * 0.9) * lerp(0.18, 1, e) * scale;
      const len = baseR * 0.42 * p.len * lerp(0.3, 1, e) * scale;
      const halfW = baseR * 0.26 * p.width * lerp(0.45, 1, e) * scale;

      const ox = cx + Math.cos(ang) * reach;
      const oy = cy + Math.sin(ang) * reach;

      // local frame
      const dx = Math.cos(ang);
      const dy = Math.sin(ang);
      const nx = -dy;
      const ny = dx;

      // tip curls inward when closing (low e) — gives the wilt its droop
      const curlBack = lerp(0.5, 1.0, e) * p.curl;
      const tipX = ox + dx * len * curlBack;
      const tipY = oy + dy * len * curlBack;

      // control points for two bezier sides meeting at the tip
      const c1x = ox + nx * halfW + dx * len * 0.35;
      const c1y = oy + ny * halfW + dy * len * 0.35;
      const c2x = ox - nx * halfW + dx * len * 0.35;
      const c2y = oy - ny * halfW + dy * len * 0.35;

      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.quadraticCurveTo(c1x, c1y, tipX, tipY);
      ctx.quadraticCurveTo(c2x, c2y, ox, oy);
      ctx.closePath();

      // shading: gradient from petal base (deeper) to tip (lit gold edge).
      // corruption mixes crimson in, strongest at the center rings.
      const corr = corrupt * (1.15 - p.ringT * 0.85); // inner rings bleed first
      const cc = clamp01(corr);

      // gold palette
      const baseGold = mix(168, 124, 40, 110, 18, 20, cc); // deep base
      const midGold = mix(212, 175, 55, 150, 22, 24, cc);
      const litGold = mix(232, 201, 106, 198, 40, 42, cc);

      const grad = ctx.createLinearGradient(ox, oy, tipX, tipY);
      grad.addColorStop(0, rgb(baseGold, 0.42 + 0.28 * e));
      grad.addColorStop(0.5, rgb(midGold, 0.78 * e + 0.12));
      grad.addColorStop(1, rgb(litGold, 0.92 * e));
      ctx.fillStyle = grad;
      ctx.fill();

      // crisp lit edge along the tip side for definition
      ctx.lineWidth = Math.max(0.5, baseR * 0.006 * scale);
      ctx.strokeStyle = rgb(
        mix(245, 222, 150, 150, 30, 34, cc),
        0.28 * e
      );
      ctx.stroke();
    };

    // color mix helpers
    const mix = (
      r1: number,
      g1: number,
      b1: number,
      r2: number,
      g2: number,
      b2: number,
      t: number
    ): [number, number, number] => [
      Math.round(lerp(r1, r2, t)),
      Math.round(lerp(g1, g2, t)),
      Math.round(lerp(b1, b2, t)),
    ];
    const rgb = (c: [number, number, number], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const g = (((now - start) / 1000) % LOOP) / LOOP; // 0..1 loop time
      const { open, corrupt, drip } = phases(g);
      const breathe = g;

      const cx = w * 0.5;
      const cy = h * 0.52;
      const baseR = Math.min(w, h) * 0.42;
      const scale = 1;

      // --- Background: warm near-black with a center glow that shifts to blood
      const bgCore = mix(26, 19, 11, 34, 8, 9, corrupt);
      const bg = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(w, h) * 0.8
      );
      bg.addColorStop(0, rgb(bgCore, 1));
      bg.addColorStop(0.55, "rgba(14,11,7,1)");
      bg.addColorStop(1, "#0c0a08");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // --- Soft bloom halo behind the rose (gold → crimson) -------------------
      ctx.globalCompositeOperation = "lighter";
      const haloA = (0.1 + 0.16 * smooth(open)) * (1 - corrupt * 0.3);
      const haloCol = mix(212, 175, 55, 150, 18, 20, corrupt);
      const halo = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        baseR * (0.6 + open * 0.9)
      );
      halo.addColorStop(0, rgb(haloCol, haloA));
      halo.addColorStop(0.6, rgb(haloCol, haloA * 0.4));
      halo.addColorStop(1, rgb(haloCol, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // --- Petals (outer first → inner last on top) ---------------------------
      for (let i = 0; i < petals.length; i++) {
        drawPetal(cx, cy, baseR, scale, petals[i], open, corrupt, breathe);
      }

      // --- Inner crimson seep: a wet dark heart that grows with corruption ----
      if (corrupt > 0.001) {
        const seepR = baseR * (0.1 + 0.34 * smooth(open)) * (0.4 + corrupt);
        const seep = ctx.createRadialGradient(cx, cy, 0, cx, cy, seepR);
        seep.addColorStop(0, rgb([90, 7, 10], 0.85 * corrupt));
        seep.addColorStop(0.45, rgb([110, 15, 18], 0.6 * corrupt));
        seep.addColorStop(1, rgb([110, 15, 18], 0));
        ctx.fillStyle = seep;
        ctx.beginPath();
        ctx.arc(cx, cy, seepR, 0, TWO_PI);
        ctx.fill();

        // glossy wet highlight on the bleed
        const spec = ctx.createRadialGradient(
          cx - seepR * 0.22,
          cy - seepR * 0.26,
          0,
          cx - seepR * 0.22,
          cy - seepR * 0.26,
          seepR * 0.5
        );
        spec.addColorStop(0, rgb([220, 120, 110], 0.22 * corrupt));
        spec.addColorStop(1, rgb([220, 120, 110], 0));
        ctx.fillStyle = spec;
        ctx.beginPath();
        ctx.arc(cx, cy, seepR, 0, TWO_PI);
        ctx.fill();
      }

      // --- The single blood drip running down ---------------------------------
      if (drip > 0.001 && corrupt > 0.05) {
        const dripStartY = cy + baseR * 0.12;
        const dripLen = baseR * 1.05;
        const headY = dripStartY + smooth(drip) * dripLen;
        const fade = drip < 0.85 ? 1 : 1 - (drip - 0.85) / 0.15;
        const dripA = corrupt * fade;

        // thin trail with a swelling teardrop head
        const trailW = baseR * 0.018;
        const trail = ctx.createLinearGradient(0, dripStartY, 0, headY);
        trail.addColorStop(0, rgb([110, 15, 18], 0));
        trail.addColorStop(0.5, rgb([120, 14, 16], 0.55 * dripA));
        trail.addColorStop(1, rgb([130, 12, 14], 0.85 * dripA));
        ctx.fillStyle = trail;
        ctx.beginPath();
        ctx.moveTo(cx - trailW, dripStartY);
        ctx.lineTo(cx + trailW, dripStartY);
        ctx.lineTo(cx + trailW * 0.7, headY);
        ctx.lineTo(cx - trailW * 0.7, headY);
        ctx.closePath();
        ctx.fill();

        // teardrop head
        const headR = baseR * (0.02 + 0.022 * smooth(drip));
        const head = ctx.createRadialGradient(
          cx - headR * 0.3,
          headY - headR * 0.3,
          0,
          cx,
          headY,
          headR
        );
        head.addColorStop(0, rgb([200, 70, 60], 0.95 * dripA));
        head.addColorStop(0.5, rgb([140, 14, 16], 0.95 * dripA));
        head.addColorStop(1, rgb([110, 10, 12], 0.4 * dripA));
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(cx, headY, headR, 0, TWO_PI);
        ctx.fill();
      }

      // --- Center pip / bud highlight (keeps the heart of the rose alive) -----
      const pipR = baseR * 0.07 * (0.6 + smooth(open) * 0.6);
      const pipCol = mix(245, 220, 150, 180, 30, 32, corrupt);
      const pip = ctx.createRadialGradient(cx, cy, 0, cx, cy, pipR);
      pip.addColorStop(0, rgb(pipCol, 0.5 * (1 - corrupt * 0.6)));
      pip.addColorStop(1, rgb(pipCol, 0));
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = pip;
      ctx.beginPath();
      ctx.arc(cx, cy, pipR, 0, TWO_PI);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // --- Film grain ---------------------------------------------------------
      if (grainPattern) {
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.globalCompositeOperation = "overlay";
        // jitter the grain origin each frame so it shimmers
        const jx = (Math.random() * grainSize) | 0;
        const jy = (Math.random() * grainSize) | 0;
        ctx.translate(-jx, -jy);
        ctx.fillStyle = grainPattern;
        ctx.fillRect(jx, jy, w + grainSize, h + grainSize);
        ctx.restore();
      }

      // --- Vignette -----------------------------------------------------------
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(w, h) * 0.32,
        cx,
        cy,
        Math.max(w, h) * 0.72
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.66)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

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
