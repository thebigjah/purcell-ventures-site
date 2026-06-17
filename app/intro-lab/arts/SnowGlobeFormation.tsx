"use client";

import { useEffect, useRef } from "react";

/**
 * SnowGlobeFormation — Purcell Ventures motion asset
 * A swirl of gold motes drifting in warm black slowly converge and coalesce
 * into the panopticon eye (concentric iris + pupil), settling into place with a
 * soft shimmer and bloom, holding briefly, then dispersing back into a gentle
 * parallax drift to loop seamlessly.
 *
 * Self-contained: canvas-2d only (no WebGL), no deps, no props.
 */
export default function SnowGlobeFormation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ---- Brand palette ----
    const GOLD = "212, 175, 55"; // #d4af37
    const GOLD_LIGHT = "232, 201, 106"; // #e8c96a

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let R = 0; // base radius (responsive vmin)

    // ---- Easing helpers ----
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t: number) => t * t * t;
    const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
    const TAU = Math.PI * 2;

    // ---- Particle model ----
    // Each particle has a wandering "drift" state (orbit + noise) and a fixed
    // "target" on the panopticon-eye form. We blend between them by a per-phase
    // coalesce factor c (0 = drift, 1 = formed). Depth layers give parallax/blur.
    type P = {
      // drift orbit params
      orbR: number; // orbit radius fraction of R
      orbA: number; // base angle
      orbSpeed: number; // angular speed
      bobAmp: number; // radial bob amplitude
      bobPhase: number;
      bobSpeed: number;
      // target on the formed shape (relative to center, in px-fraction of R)
      tx: number;
      ty: number;
      // appearance / depth
      depth: number; // 0 (far, small/blurred) .. 1 (near, crisp)
      size: number;
      twPhase: number; // twinkle phase
      twSpeed: number;
      settleDelay: number; // 0..1 stagger for converge/disperse
      light: boolean; // use lighter gold accent
    };

    const PARTICLES: P[] = [];

    // Build the panopticon-eye target point cloud.
    const buildTargets = (): { x: number; y: number; w: number }[] => {
      const pts: { x: number; y: number; w: number }[] = [];
      // Concentric rings (the amphitheater cells) — weight = density bias
      const rings = [
        { r: 1.0, n: 90, w: 1.0 },
        { r: 0.82, n: 74, w: 0.95 },
        { r: 0.64, n: 58, w: 0.9 },
        { r: 0.46, n: 42, w: 0.85 },
        { r: 0.3, n: 30, w: 0.85 },
      ];
      rings.forEach((ring) => {
        for (let i = 0; i < ring.n; i++) {
          const a = (i / ring.n) * TAU + (Math.random() - 0.5) * 0.04;
          const jitter = 1 + (Math.random() - 0.5) * 0.02;
          pts.push({
            x: Math.cos(a) * ring.r * jitter,
            y: Math.sin(a) * ring.r * jitter,
            w: ring.w,
          });
        }
      });
      // Radial spokes (cell dividers) — sparse points between inner & outer ring
      const NUM_SPOKES = 24;
      for (let s = 0; s < NUM_SPOKES; s++) {
        const a = (s / NUM_SPOKES) * TAU;
        for (let k = 0; k <= 5; k++) {
          const rr = 0.3 + (1.0 - 0.3) * (k / 5);
          pts.push({ x: Math.cos(a) * rr, y: Math.sin(a) * rr, w: 0.7 });
        }
      }
      // Iris ring (bright)
      for (let i = 0; i < 46; i++) {
        const a = (i / 46) * TAU;
        pts.push({ x: Math.cos(a) * 0.2, y: Math.sin(a) * 0.2, w: 1.2 });
      }
      // Pupil — dense glowing core disc
      for (let i = 0; i < 60; i++) {
        const a = Math.random() * TAU;
        const r = Math.sqrt(Math.random()) * 0.085;
        pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, w: 1.5 });
      }
      return pts;
    };

    const buildParticles = () => {
      PARTICLES.length = 0;
      const targets = buildTargets();
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        const depth = Math.random();
        PARTICLES.push({
          orbR: 0.25 + Math.random() * 0.95, // drift across a wide swirl
          orbA: Math.random() * TAU,
          orbSpeed: (0.04 + Math.random() * 0.06) * (Math.random() < 0.5 ? 1 : -1),
          bobAmp: 0.04 + Math.random() * 0.12,
          bobPhase: Math.random() * TAU,
          bobSpeed: 0.3 + Math.random() * 0.8,
          tx: t.x,
          ty: t.y,
          depth,
          size: (0.6 + depth * 1.7) * (0.85 + t.w * 0.5),
          twPhase: Math.random() * TAU,
          twSpeed: 1.5 + Math.random() * 2.5,
          settleDelay: Math.random(),
          light: t.w >= 1.2 || Math.random() < 0.18,
        });
      }
    };

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
      R = Math.min(W, H) * 0.36; // vmin-relative
    };
    resize();
    buildParticles();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
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
        img.data[i + 3] = 13;
      }
      gctx.putImageData(img, 0, 0);
    }

    // ---- Timing (ms) ----
    const LOOP = 12000;
    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 master timeline
      const time = now * 0.001; // seconds, for continuous drift/twinkle

      // Phase windows:
      //  0.00-0.36  converge  (motes swirl inward, coalesce into the eye)
      //  0.36-0.60  hold      (formed, breathing shimmer + bloom)
      //  0.60-0.90  disperse  (motes drift back out into the swirl)
      //  0.90-1.00  free drift (pure swirl, seamless wrap into converge)
      const pConverge = easeInOut(seg(t, 0.0, 0.36));
      const pDisperse = easeIn(seg(t, 0.6, 0.9));
      // coalesce factor 0..1..0 across the loop
      const formed = clamp01(pConverge - pDisperse);

      // breathe shimmer/bloom strongest mid-hold
      const holdT = seg(t, 0.36, 0.6);
      const bloom = Math.sin(holdT * Math.PI) * (holdT > 0 && holdT < 1 ? 1 : 0);

      // gentle global swirl rotation (continuous, no seam)
      const swirl = time * 0.06;

      // ---- Background + warm radial vignette ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0c0a08";
      ctx.fillRect(0, 0, W, H);

      const vg = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.1,
        cx,
        cy,
        Math.max(W, H) * 0.78
      );
      vg.addColorStop(0, "rgba(30,24,12,0.5)");
      vg.addColorStop(0.5, "rgba(14,11,7,0.22)");
      vg.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "lighter";

      // Draw far-to-near for correct parallax/blur layering
      // (sort once is overkill per-frame; iterate and let depth drive size/alpha)
      for (let i = 0; i < PARTICLES.length; i++) {
        const p = PARTICLES[i];

        // --- DRIFT position (swirling orbit + radial bob) ---
        const a = p.orbA + swirl * (0.5 + p.depth) + time * p.orbSpeed;
        const bob =
          Math.sin(time * p.bobSpeed + p.bobPhase) * p.bobAmp;
        const dr = (p.orbR + bob) * R;
        const dx = Math.cos(a) * dr;
        const dy = Math.sin(a) * dr * 0.92; // slight vertical squash = depth

        // --- TARGET position on the formed eye ---
        const tx = p.tx * R;
        const ty = p.ty * R;

        // per-particle staggered coalesce so it "settles" rather than snaps
        const stagger = 0.18;
        const localForm = clamp01(
          (formed - p.settleDelay * stagger) / (1 - stagger)
        );
        const lf = easeOut(localForm);

        // blended position
        const x = dx + (tx - dx) * lf;
        const y = dy + (ty - dy) * lf;

        // --- appearance ---
        const twinkle = 0.55 + 0.45 * Math.sin(time * p.twSpeed + p.twPhase);
        // settled particles pulse with the bloom shimmer
        const shimmer = 1 + bloom * lf * 0.5 * Math.sin(time * 6 + p.twPhase);
        const depthAlpha = 0.32 + p.depth * 0.55;
        // formed particles get brighter & crisper
        const alpha = clamp01(depthAlpha * (0.65 + 0.6 * lf) * twinkle);

        const baseSize = p.size * (0.7 + p.depth * 0.6);
        // blurred far motes render as soft halos; settled motes tighten up
        const blur = (1 - p.depth) * 2.2 * (1 - lf * 0.7);
        const size = baseSize * shimmer + blur * 0.6;

        const col = p.light ? GOLD_LIGHT : GOLD;

        // soft glow halo via radial gradient
        const halo = size * (2.6 + (1 - lf) * 1.4);
        const g = ctx.createRadialGradient(x, y, 0, x, y, halo);
        g.addColorStop(0, `rgba(${col},${alpha})`);
        g.addColorStop(0.4, `rgba(${col},${alpha * 0.35})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, halo, 0, TAU);
        ctx.fill();

        // crisp bright core (only meaningful when near/settled)
        const coreA = alpha * (0.5 + lf * 0.5) * (0.4 + p.depth * 0.6);
        if (coreA > 0.04) {
          ctx.fillStyle = `rgba(${GOLD_LIGHT},${clamp01(coreA)})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, size * 0.55), 0, TAU);
          ctx.fill();
        }
      }

      // --- coalesced bloom flash over the eye during hold ---
      if (bloom > 0.001) {
        const b = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.25);
        b.addColorStop(0, `rgba(${GOLD_LIGHT},${bloom * 0.22})`);
        b.addColorStop(0.4, `rgba(${GOLD},${bloom * 0.1})`);
        b.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = b;
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.25, 0, TAU);
        ctx.fill();

        // pupil hot core
        const pc = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.22);
        pc.addColorStop(0, `rgba(${GOLD_LIGHT},${bloom * 0.5})`);
        pc.addColorStop(1, "rgba(12,10,8,0)");
        ctx.fillStyle = pc;
        ctx.beginPath();
        ctx.arc(0, 0, R * 0.22, 0, TAU);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

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

      // ---- Edge vignette (depth) ----
      const ev = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.85,
        cx,
        cy,
        Math.max(W, H) * 0.72
      );
      ev.addColorStop(0, "rgba(0,0,0,0)");
      ev.addColorStop(1, "rgba(0,0,0,0.74)");
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
