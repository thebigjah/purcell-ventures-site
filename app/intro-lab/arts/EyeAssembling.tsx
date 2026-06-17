"use client";

import { useEffect, useRef } from "react";

/**
 * EyeAssembling — Purcell Ventures motion asset #39
 * The "reverse panopticon" all-seeing eye draws itself on, blueprint-style:
 * concentric gold rings sweep into being, radial cell-divider lines extend
 * outward, a central iris/pupil forms last, the whole eye breathes once and
 * blooms, then un-draws and re-assembles to loop seamlessly.
 *
 * Self-contained: canvas-2d only (no WebGL), no deps, no props.
 */
export default function EyeAssembling() {
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
    let R = 0; // base radius in px (responsive vmin)

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

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Easing ----
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    // sub-progress within a window [a,b] of a 0..1 timeline
    const seg = (t: number, a: number, b: number) =>
      clamp01((t - a) / (b - a));

    // ---- Ring definitions (concentric, panopticon) ----
    // r as fraction of R, line weight, draw-order slot
    const RINGS = [
      { r: 1.0, w: 2.4 },
      { r: 0.82, w: 1.6 },
      { r: 0.64, w: 1.4 },
      { r: 0.46, w: 1.2 },
      { r: 0.3, w: 1.1 },
    ];
    const NUM_SPOKES = 24; // radial cell dividers (amphitheater cells)

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

    // ---- Timing (ms) ----
    const LOOP = 9200;
    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP; // 0..1 master timeline

      // Phase windows on the master timeline:
      //  0.00-0.55  assemble (rings -> spokes -> iris -> pupil)
      //  0.55-0.72  breathe / awaken pulse + bloom
      //  0.72-1.00  un-draw + fade, reset
      const pAssemble = seg(t, 0.0, 0.55);
      const pBreathe = seg(t, 0.55, 0.72);
      const pUndraw = seg(t, 0.72, 1.0);

      // global fade so the loop wrap is seamless (fades to black at both ends)
      const fadeIn = seg(t, 0.0, 0.06);
      const fadeOut = 1 - seg(t, 0.93, 1.0);
      const globalAlpha = Math.min(fadeIn, fadeOut);

      // breathing scale + glow
      const breathePulse = Math.sin(pBreathe * Math.PI); // 0->1->0
      const scale = 1 + breathePulse * 0.045;
      const glow = breathePulse;

      // ---- Background with soft radial vignette ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      const vg = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.1,
        cx,
        cy,
        Math.max(W, H) * 0.75
      );
      vg.addColorStop(0, "rgba(28,22,12,0.55)");
      vg.addColorStop(0.5, "rgba(14,11,7,0.25)");
      vg.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ---- Center transform for breathing ----
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.globalAlpha = globalAlpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // un-draw retracts everything (eased)
      const reveal = pUndraw > 0 ? 1 - easeInOut(pUndraw) : 1;

      // ---------- 1. CONCENTRIC RINGS (draw-on) ----------
      // each ring gets a staggered window inside [0, 0.62] of assemble
      RINGS.forEach((ring, i) => {
        const slotA = i * 0.1;
        const slotB = slotA + 0.34;
        let prog = easeOut(seg(pAssemble, slotA, slotB));
        prog *= reveal;
        if (prog <= 0.001) return;

        const rad = ring.r * R;
        const sweep = prog * Math.PI * 2;
        // alternate sweep direction for a "machined" feel
        const dir = i % 2 === 0 ? 1 : -1;
        const a0 = -Math.PI / 2;

        ctx.beginPath();
        ctx.arc(0, 0, rad, a0, a0 + dir * sweep, dir < 0);

        const ringGlow = 6 + glow * 18;
        ctx.shadowColor = `rgba(${GOLD},${0.5 + glow * 0.4})`;
        ctx.shadowBlur = ringGlow;
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},${0.85})`;
        ctx.lineWidth = ring.w;
        ctx.stroke();

        // bright leading "draw head" while assembling
        if (prog < 1 && pUndraw === 0) {
          const hx = Math.cos(a0 + dir * sweep) * rad;
          const hy = Math.sin(a0 + dir * sweep) * rad;
          ctx.beginPath();
          ctx.arc(hx, hy, ring.w * 1.6, 0, Math.PI * 2);
          ctx.shadowBlur = 16;
          ctx.shadowColor = `rgba(${GOLD_LIGHT},0.9)`;
          ctx.fillStyle = `rgba(${GOLD_LIGHT},0.95)`;
          ctx.fill();
        }
      });

      // ---------- 2. RADIAL SPOKES (cell dividers extend outward) ----------
      // spokes window [0.32, 0.78] of assemble, staggered around the circle
      const rInner = RINGS[RINGS.length - 1].r * R; // innermost ring
      const rOuter = RINGS[0].r * R;
      ctx.shadowBlur = 4 + glow * 14;
      ctx.shadowColor = `rgba(${GOLD},${0.45 + glow * 0.4})`;
      for (let s = 0; s < NUM_SPOKES; s++) {
        const stagger = (s / NUM_SPOKES) * 0.22;
        let prog = easeOut(seg(pAssemble, 0.32 + stagger, 0.66 + stagger));
        prog *= reveal;
        if (prog <= 0.001) continue;

        const ang = (s / NUM_SPOKES) * Math.PI * 2 - Math.PI / 2;
        const cosA = Math.cos(ang);
        const sinA = Math.sin(ang);
        const len = rInner + (rOuter - rInner) * prog;

        ctx.beginPath();
        ctx.moveTo(cosA * rInner, sinA * rInner);
        ctx.lineTo(cosA * len, sinA * len);
        ctx.strokeStyle = `rgba(${GOLD},${0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ---------- 3. IRIS — fine inner cell ring + tick marks ----------
      const irisProg = easeOut(seg(pAssemble, 0.6, 0.86)) * reveal;
      if (irisProg > 0.001) {
        const irisR = 0.2 * R;
        ctx.beginPath();
        ctx.arc(0, 0, irisR, -Math.PI / 2, -Math.PI / 2 + irisProg * Math.PI * 2);
        ctx.shadowBlur = 8 + glow * 18;
        ctx.shadowColor = `rgba(${GOLD_LIGHT},${0.6 + glow * 0.4})`;
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.9)`;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // iris tick marks (schematic)
        const ticks = 36;
        for (let k = 0; k < ticks; k++) {
          const kp = clamp01(irisProg * ticks - k);
          if (kp <= 0) continue;
          const a = (k / ticks) * Math.PI * 2 - Math.PI / 2;
          const t0 = irisR;
          const t1 = irisR + 0.035 * R * kp;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * t0, Math.sin(a) * t0);
          ctx.lineTo(Math.cos(a) * t1, Math.sin(a) * t1);
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(${GOLD},0.6)`;
          ctx.stroke();
        }
      }

      // ---------- 4. PUPIL (forms last) ----------
      const pupilProg = easeOut(seg(pAssemble, 0.78, 1.0)) * reveal;
      if (pupilProg > 0.001) {
        const pupilR = 0.085 * R * pupilProg;
        // glowing filled core
        const core = ctx.createRadialGradient(0, 0, 0, 0, 0, pupilR * 2.4);
        core.addColorStop(0, `rgba(${GOLD_LIGHT},${0.9 * pupilProg + glow * 0.1})`);
        core.addColorStop(0.4, `rgba(${GOLD},${0.5 * pupilProg})`);
        core.addColorStop(1, "rgba(12,10,8,0)");
        ctx.beginPath();
        ctx.arc(0, 0, pupilR * 2.4, 0, Math.PI * 2);
        ctx.shadowBlur = 18 + glow * 30;
        ctx.shadowColor = `rgba(${GOLD_LIGHT},0.8)`;
        ctx.fillStyle = core;
        ctx.fill();

        // crisp pupil outline
        ctx.beginPath();
        ctx.arc(0, 0, pupilR, 0, Math.PI * 2);
        ctx.shadowBlur = 6;
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},${0.95})`;
        ctx.stroke();
      }

      // ---------- 5. AWAKEN BLOOM (radial flash on breathe) ----------
      if (glow > 0.001) {
        ctx.shadowBlur = 0;
        const bloom = ctx.createRadialGradient(0, 0, 0, 0, 0, rOuter * 1.3);
        bloom.addColorStop(0, `rgba(${GOLD_LIGHT},${glow * 0.28})`);
        bloom.addColorStop(0.45, `rgba(${GOLD},${glow * 0.12})`);
        bloom.addColorStop(1, "rgba(12,10,8,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.arc(0, 0, rOuter * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = bloom;
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.restore(); // end center transform
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // ---------- 6. FILM GRAIN OVERLAY ----------
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

      // ---------- 7. EDGE VIGNETTE (depth) ----------
      const ev = ctx.createRadialGradient(
        cx,
        cy,
        R * 0.9,
        cx,
        cy,
        Math.max(W, H) * 0.72
      );
      ev.addColorStop(0, "rgba(0,0,0,0)");
      ev.addColorStop(1, "rgba(0,0,0,0.72)");
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
