"use client";

import { useEffect, useRef } from "react";

/**
 * SlowPushIn — Purcell Ventures motion asset
 * A relentless cinematic dolly toward the gold "reverse panopticon" eye: it
 * emerges from deep darkness as a distant glint, growing inexorably as the
 * camera pushes in, the vignette tightening and dust motes drifting through
 * a shallow depth of field, until the eye fills the frame, holds an ominous
 * beat, then resets to the far distance and loops seamlessly.
 *
 * Self-contained: canvas-2d only (no WebGL), no deps, no props.
 */
export default function SlowPushIn() {
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
    };
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Easing ----
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

    // ---- Dust motes (drifting through depth-of-field) ----
    // depth z in (0,1]: small z = far/tiny/dim, large z = near/big/blurred
    type Mote = {
      ang: number; // angular position around center
      rad: number; // radial offset from center (fraction of MIN)
      z: number; // depth layer
      spin: number; // angular drift speed
      drift: number; // radial drift
      ph: number; // twinkle phase
    };
    const MOTE_COUNT = 64;
    const motes: Mote[] = [];
    const seedMotes = () => {
      motes.length = 0;
      for (let i = 0; i < MOTE_COUNT; i++) {
        motes.push({
          ang: Math.random() * Math.PI * 2,
          rad: 0.04 + Math.random() * 0.62,
          z: Math.random(),
          spin: (Math.random() - 0.5) * 0.00018,
          drift: (Math.random() - 0.5) * 0.00006,
          ph: Math.random() * Math.PI * 2,
        });
      }
    };
    seedMotes();

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

    // ---- The panopticon eye, drawn at a given pixel radius ----
    // Concentric amphitheater rings + radial cell dividers + iris + glowing
    // pupil. `R` is the outer radius in px; `bright` scales glow on approach.
    const RINGS = [
      { r: 1.0, w: 2.4 },
      { r: 0.82, w: 1.6 },
      { r: 0.64, w: 1.4 },
      { r: 0.46, w: 1.2 },
      { r: 0.3, w: 1.1 },
    ];
    const NUM_SPOKES = 24;

    const drawEye = (R: number, bright: number, alpha: number, wob: number) => {
      if (R < 0.4 || alpha <= 0.002) return;
      // line weights scale a touch with size so distant eye stays delicate
      const wScale = clamp01(R / (MIN * 0.42)) * 0.8 + 0.45;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const rOuter = RINGS[0].r * R;
      const rInner = RINGS[RINGS.length - 1].r * R;

      // soft amber halo behind the structure (depth + warmth)
      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, rOuter * 1.5);
      halo.addColorStop(0, `rgba(${GOLD},${0.12 + bright * 0.18})`);
      halo.addColorStop(0.5, `rgba(${GOLD},${0.05 + bright * 0.08})`);
      halo.addColorStop(1, "rgba(12,10,8,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, rOuter * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // concentric rings
      RINGS.forEach((ring, i) => {
        const rad = ring.r * R;
        // subtle breathing wobble so it feels alive as it nears
        const rr = rad * (1 + Math.sin(wob + i * 1.3) * 0.004);
        ctx.beginPath();
        ctx.arc(0, 0, rr, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(${GOLD},${0.4 + bright * 0.5})`;
        ctx.shadowBlur = (4 + bright * 16) * wScale;
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},${0.78})`;
        ctx.lineWidth = ring.w * wScale;
        ctx.stroke();
      });

      // radial cell dividers (amphitheater spokes)
      ctx.shadowBlur = (3 + bright * 10) * wScale;
      ctx.shadowColor = `rgba(${GOLD},${0.4 + bright * 0.4})`;
      for (let s = 0; s < NUM_SPOKES; s++) {
        const ang = (s / NUM_SPOKES) * Math.PI * 2 - Math.PI / 2;
        const cosA = Math.cos(ang);
        const sinA = Math.sin(ang);
        ctx.beginPath();
        ctx.moveTo(cosA * rInner, sinA * rInner);
        ctx.lineTo(cosA * rOuter, sinA * rOuter);
        ctx.strokeStyle = `rgba(${GOLD},${0.42})`;
        ctx.lineWidth = 1 * wScale;
        ctx.stroke();
      }

      // iris ring + schematic tick marks
      const irisR = 0.2 * R;
      ctx.beginPath();
      ctx.arc(0, 0, irisR, 0, Math.PI * 2);
      ctx.shadowBlur = (6 + bright * 16) * wScale;
      ctx.shadowColor = `rgba(${GOLD_LIGHT},${0.55 + bright * 0.4})`;
      ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.85)`;
      ctx.lineWidth = 1.3 * wScale;
      ctx.stroke();

      const ticks = 36;
      for (let k = 0; k < ticks; k++) {
        const a = (k / ticks) * Math.PI * 2 - Math.PI / 2;
        const t0 = irisR;
        const t1 = irisR + 0.035 * R;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * t0, Math.sin(a) * t0);
        ctx.lineTo(Math.cos(a) * t1, Math.sin(a) * t1);
        ctx.lineWidth = 0.8 * wScale;
        ctx.strokeStyle = `rgba(${GOLD},0.5)`;
        ctx.stroke();
      }

      // glowing pupil core (watches back)
      const pupilR = 0.085 * R;
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, pupilR * 2.6);
      core.addColorStop(0, `rgba(${GOLD_LIGHT},${0.85 + bright * 0.15})`);
      core.addColorStop(0.4, `rgba(${GOLD},${0.5 + bright * 0.3})`);
      core.addColorStop(1, "rgba(12,10,8,0)");
      ctx.beginPath();
      ctx.arc(0, 0, pupilR * 2.6, 0, Math.PI * 2);
      ctx.shadowBlur = (16 + bright * 30) * wScale;
      ctx.shadowColor = `rgba(${GOLD_LIGHT},0.85)`;
      ctx.fillStyle = core;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, pupilR, 0, Math.PI * 2);
      ctx.shadowBlur = 6 * wScale;
      ctx.lineWidth = 1.2 * wScale;
      ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.95)`;
      ctx.stroke();

      ctx.restore();
      ctx.shadowBlur = 0;
    };

    // ---- Timing (ms) ----
    const LOOP = 13000; // slow, relentless
    let raf = 0;
    let start = performance.now();
    let last = start;

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 master timeline

      // ---- Dolly curve ----
      // Push-in occupies 0.00–0.82 (eased, relentless), holds 0.82–0.92,
      // then a quick fade reset folds back to the distance over 0.92–1.00.
      const push = easeInOut(seg(t, 0.0, 0.82));
      // eye radius: distant glint -> fills frame (a touch past edge)
      const farR = MIN * 0.012;
      const nearR = MIN * 0.95;
      const eyeR = farR + (nearR - farR) * push;

      // brightness ramps as it nears (out of the dark)
      const bright = clamp01(push * 1.15);

      // seamless wrap: fade up from black at the start, down to black at the
      // very end so the reset to the distance is never seen as a jump-cut.
      const fadeIn = seg(t, 0.0, 0.05);
      const fadeOut = 1 - seg(t, 0.94, 1.0);
      const globalAlpha = Math.min(fadeIn, fadeOut);

      // eye opacity also rises out of darkness, dips slightly at the very near
      // hold (we are "inside" the glow), keeping the bloom dominant.
      const eyeAlpha = globalAlpha * (0.18 + 0.82 * clamp01(push * 1.4));

      // ---- Background ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // deep warm core glow that grows with the push (depth haze)
      const haze = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(W, H) * (0.25 + push * 0.55)
      );
      haze.addColorStop(0, `rgba(40,30,14,${0.18 + push * 0.34})`);
      haze.addColorStop(0.5, `rgba(18,13,7,${0.12 + push * 0.16})`);
      haze.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // ---- Dust motes (behind the eye, drifting in depth-of-field) ----
      // far motes only; near motes drawn after eye for parallax in front.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        m.ang += m.spin * dt;
        m.rad += m.drift * dt;
        if (m.rad < 0.03) m.rad = 0.66;
        if (m.rad > 0.7) m.rad = 0.04;

        // parallax: nearer motes (high z) sweep outward faster as we push in
        const par = 1 + push * (0.3 + m.z * 1.9);
        const r = m.rad * MIN * par;
        const mx = cx + Math.cos(m.ang) * r;
        const my = cy + Math.sin(m.ang) * r;

        // depth-of-field: focus band tracks toward the eye's plane; motes off
        // the focal plane (very near / very far) blur and dim.
        const focus = 0.35 + push * 0.35; // focal depth moves with dolly
        const blur = Math.abs(m.z - focus); // 0 = sharp
        const size = (0.5 + m.z * 2.6) * (1 + push * 1.2) * (1 + blur * 2.2);
        const twinkle = 0.5 + 0.5 * Math.sin(m.ph + now * 0.0011);
        const a =
          globalAlpha *
          (0.05 + m.z * 0.16) *
          twinkle *
          (1 - blur * 0.8);
        if (a <= 0.004) continue;

        const g = ctx.createRadialGradient(mx, my, 0, mx, my, size);
        g.addColorStop(0, `rgba(${GOLD_LIGHT},${a})`);
        g.addColorStop(0.5, `rgba(${GOLD},${a * 0.5})`);
        g.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";

      // ---- The eye, centered, growing relentlessly ----
      ctx.save();
      ctx.translate(cx, cy);
      // a near-imperceptible drift so the dolly feels handheld/inevitable
      const driftX = Math.sin(now * 0.00021) * MIN * 0.004 * push;
      const driftY = Math.cos(now * 0.00017) * MIN * 0.004 * push;
      ctx.translate(driftX, driftY);
      drawEye(eyeR, bright, eyeAlpha, now * 0.0016);
      ctx.restore();

      // ---- Bloom flare at full approach ----
      const nearHold = seg(t, 0.7, 0.9);
      if (nearHold > 0.001) {
        const bloomA = Math.sin(nearHold * Math.PI) * 0.5 + nearHold * 0.18;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const bloom = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          Math.max(W, H) * 0.7
        );
        bloom.addColorStop(0, `rgba(${GOLD_LIGHT},${globalAlpha * bloomA * 0.5})`);
        bloom.addColorStop(0.35, `rgba(${GOLD},${globalAlpha * bloomA * 0.2})`);
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

      // ---- Heavy vignette that TIGHTENS as we push in ----
      const vigInner = MIN * (0.55 - push * 0.34); // closes down on approach
      const vigOuter = Math.max(W, H) * (0.78 - push * 0.18);
      const ev = ctx.createRadialGradient(
        cx,
        cy,
        Math.max(1, vigInner),
        cx,
        cy,
        Math.max(vigInner + 1, vigOuter)
      );
      ev.addColorStop(0, "rgba(0,0,0,0)");
      ev.addColorStop(0.7, `rgba(0,0,0,${0.35 + push * 0.25})`);
      ev.addColorStop(1, `rgba(0,0,0,${0.82 + push * 0.16})`);
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
