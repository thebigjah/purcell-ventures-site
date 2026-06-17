"use client";

import { useEffect, useRef } from "react";

/**
 * BarrelIrisClose — the classic Bond circular iris wipe, in Purcell Ventures gold.
 *
 * A gold rifled-barrel-edged circle starts full-open (warm field within), then
 * irises CLOSED — shrinking smoothly to a tiny dot at center and to black — holds
 * black a beat, then irises back open to loop. The ring carries rifled grooves,
 * an inner glow, a slow rotation, plus grain + vignette. A reusable scene-wipe.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via devicePixelRatio + resize.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_DEEP = "#8a6f1f";
const BG = "#0c0a08";

const LOOP_MS = 5200;

/* cubic ease-in-out for buttery iris travel */
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function BarrelIrisClose() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mounted = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    // pre-baked static grain tile so we don't recompute noise every frame
    const grainTile = document.createElement("canvas");
    const grainSize = 140;
    grainTile.width = grainSize;
    grainTile.height = grainSize;
    const gctx = grainTile.getContext("2d");
    if (gctx) {
      const img = gctx.createImageData(grainSize, grainSize);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 18; // low alpha; blended via overlay
      }
      gctx.putImageData(img, 0, 0);
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();

    const draw = (now: number) => {
      if (!mounted) return;
      const elapsed = (now - start) % LOOP_MS;
      const p = elapsed / LOOP_MS; // 0..1 loop phase

      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.hypot(W, H) / 2; // fully covers viewport when open

      // --- IRIS APERTURE over the loop -------------------------------------
      // open(hold) -> close to dot -> hold black -> open back. Seamless at 0/1.
      // segments (fractions of loop):
      //   0.00-0.08  full open hold
      //   0.08-0.44  iris closes (eased)
      //   0.44-0.58  black hold (tiny dot fades)
      //   0.58-0.92  iris opens (eased)
      //   0.92-1.00  full open hold
      let aperture: number; // 0 = closed dot, 1 = fully open
      if (p < 0.08) {
        aperture = 1;
      } else if (p < 0.44) {
        const t = (p - 0.08) / 0.36;
        aperture = 1 - easeInOut(t);
      } else if (p < 0.58) {
        aperture = 0;
      } else if (p < 0.92) {
        const t = (p - 0.58) / 0.34;
        aperture = easeInOut(t);
      } else {
        aperture = 1;
      }

      // radius of the open lens; never quite zero so the dot is visible
      const minR = Math.min(W, H) * 0.012;
      const R = minR + aperture * (maxR * 1.06 - minR);

      // slow continuous barrel rotation, plus a slight twist as it closes
      const baseSpin = (now / 9000) * Math.PI * 2;
      const closeTwist = (1 - aperture) * 0.5;
      const spin = baseSpin + closeTwist;

      // ---- 1. black base ---------------------------------------------------
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // ---- 2. warm field revealed inside the iris -------------------------
      // clip to the lens circle, paint the within-field, then the barrel edge.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // warm interior glow — slightly off-center for depth
      const field = ctx.createRadialGradient(
        cx,
        cy - Math.min(W, H) * 0.04,
        0,
        cx,
        cy,
        Math.max(R, 1) * 1.1
      );
      field.addColorStop(0, "#1c150c");
      field.addColorStop(0.5, "#130f09");
      field.addColorStop(1, "#0a0806");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, W, H);

      // faint inner emblem dot at center to give the warm field life
      const coreA = Math.min(1, aperture * 1.4);
      if (coreA > 0.01) {
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
        core.addColorStop(0, `rgba(232,201,106,${0.16 * coreA})`);
        core.addColorStop(1, "rgba(232,201,106,0)");
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.restore();

      // ---- 3. the rifled gold barrel ring at the lens edge ----------------
      // ring thickness scales a little with radius so it reads at every size.
      const ringW = Math.max(2, R * 0.05);

      // outer glow halo
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const halo = ctx.createRadialGradient(
        cx,
        cy,
        Math.max(R - ringW * 2.5, 0),
        cx,
        cy,
        R + ringW * 2.2
      );
      halo.addColorStop(0, "rgba(212,175,55,0)");
      halo.addColorStop(0.72, `rgba(212,175,55,${0.10 + aperture * 0.06})`);
      halo.addColorStop(0.86, `rgba(232,201,106,${0.34 + aperture * 0.12})`);
      halo.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R + ringW * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // main gold ring with shaded gradient (light top, deep bottom)
      const ringGrad = ctx.createLinearGradient(cx, cy - R, cx, cy + R);
      ringGrad.addColorStop(0, GOLD_LIGHT);
      ringGrad.addColorStop(0.5, GOLD);
      ringGrad.addColorStop(1, GOLD_DEEP);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = ringW;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // bright inner highlight lip
      ctx.strokeStyle = `rgba(232,201,106,${0.5 + aperture * 0.3})`;
      ctx.lineWidth = Math.max(1, ringW * 0.22);
      ctx.beginPath();
      ctx.arc(cx, cy, R - ringW * 0.42, 0, Math.PI * 2);
      ctx.stroke();

      // concentric rifling rings just inside the rim
      ctx.lineWidth = Math.max(0.6, ringW * 0.1);
      for (let i = 0; i < 3; i++) {
        const rr = R - ringW * (0.9 + i * 0.55);
        if (rr <= 1) continue;
        ctx.strokeStyle = `rgba(212,175,55,${0.32 - i * 0.08})`;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // rifled grooves — radial teeth around the bore, rotating
      const grooves = 48;
      const gInner = R - ringW * 1.7;
      const gOuter = R - ringW * 0.15;
      if (gInner > 1) {
        ctx.lineWidth = Math.max(0.5, ringW * 0.12);
        for (let i = 0; i < grooves; i++) {
          const a = spin + (i / grooves) * Math.PI * 2;
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          ctx.strokeStyle = `rgba(232,201,106,${0.22 + (i % 2) * 0.12})`;
          ctx.beginPath();
          ctx.moveTo(cx + ca * gInner, cy + sa * gInner);
          ctx.lineTo(cx + ca * gOuter, cy + sa * gOuter);
          ctx.stroke();
        }
      }

      // ---- 4. vignette -----------------------------------------------------
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(W, H) * 0.32,
        cx,
        cy,
        maxR
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(0.72, "rgba(0,0,0,0.4)");
      vig.addColorStop(1, "rgba(0,0,0,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ---- 5. animated film grain -----------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.5;
      const ox = (Math.random() * grainSize) | 0;
      const oy = (Math.random() * grainSize) | 0;
      for (let x = -ox; x < W; x += grainSize) {
        for (let y = -oy; y < H; y += grainSize) {
          ctx.drawImage(grainTile, x, y);
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: BG,
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
