"use client";

import { useEffect, useRef } from "react";

/**
 * BulletThroughGlass — an extreme slow-motion impact, frozen in time.
 * A gold round drives through a glass pane at center: radial fractures race
 * outward, the pane bursts into hundreds of gold-glinting shards that hang
 * suspended mid-air and drift apart, light flaring off each facet — then the
 * whole event silently reverses and the pane reforms, looping seamlessly.
 * Layered with depth-sorted faux-3D shards, bloom, motion-blur on the bullet,
 * vignette, and animated film grain.
 */
export default function BulletThroughGlass() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // ---- Brand palette ----
    const BG = "#0c0a08";
    const GOLD = "212,175,55"; // #d4af37
    const GOLD_LIGHT = "232,201,106"; // #e8c96a
    const HOT = "255,247,219"; // near-white gold core

    // ---- Sizing / DPR ----
    let dpr = 1;
    let W = 0; // css px
    let H = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---- Seeded RNG so the shatter pattern is stable across frames ----
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    // ---- Easing ----
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t: number) => t * t * t;

    // ---- Pane geometry (world units, centered on origin) ----
    // Pane lives in the X/Y plane at z=0; bullet flies along +Z toward viewer.
    const PANE_HW = 300; // half-width
    const PANE_HH = 190; // half-height
    const IMPACT = { x: 0, y: 0 }; // impact point at pane center

    // ---- Build the shatter mosaic ----
    // Seed points: a dense cluster near impact, sparser toward the edges, so the
    // pane fragments into many small shards at the hole and large plates at rim.
    type Shard = {
      // polygon verts (world XY on the pane plane), centroid-relative
      verts: { x: number; y: number }[];
      cx: number; // centroid (world)
      cy: number;
      dist: number; // distance from impact (drives shatter timing)
      // suspended-drift target offsets (world)
      dx: number;
      dy: number;
      dz: number;
      // spin axis/amount for the drift
      rot: number;
      spin: number;
      glint: number; // phase of facet glint
      shade: number; // 0..1 base metalness
    };

    let shards: Shard[] = [];
    let cracks: { a: number; reach: number; jag: number[] }[] = [];

    const buildShatter = () => {
      seed = 1337;
      shards = [];
      // Generate seed sites with radial bias toward impact.
      const sites: { x: number; y: number }[] = [];
      const N = 150;
      for (let i = 0; i < N; i++) {
        // r^1.7 spreads sparser outward; angle uniform.
        const rr = Math.pow(rnd(), 0.55);
        const ang = rnd() * Math.PI * 2;
        const radius = rr * Math.hypot(PANE_HW, PANE_HH) * 1.02;
        let x = IMPACT.x + Math.cos(ang) * radius;
        let y = IMPACT.y + Math.sin(ang) * radius * (PANE_HH / PANE_HW);
        x = Math.max(-PANE_HW, Math.min(PANE_HW, x));
        y = Math.max(-PANE_HH, Math.min(PANE_HH, y));
        sites.push({ x, y });
      }

      // Cheap Voronoi-ish: for each site, build a small irregular polygon by
      // clipping a jittered ring against neighbor half-planes (approximation).
      for (let i = 0; i < sites.length; i++) {
        const s = sites[i];
        // local cell radius scaled by distance from impact (smaller near hole)
        const d = Math.hypot(s.x - IMPACT.x, s.y - IMPACT.y);
        const cell =
          14 + (d / Math.hypot(PANE_HW, PANE_HH)) * 46 + rnd() * 10;
        const sidesN = 5 + Math.floor(rnd() * 3);
        const verts: { x: number; y: number }[] = [];
        const a0 = rnd() * Math.PI * 2;
        for (let k = 0; k < sidesN; k++) {
          const a = a0 + (k / sidesN) * Math.PI * 2 + (rnd() - 0.5) * 0.5;
          const rr = cell * (0.6 + rnd() * 0.7);
          verts.push({ x: Math.cos(a) * rr, y: Math.sin(a) * rr });
        }
        // skip the very-center hole region (the bullet punched it out)
        if (d < 26) continue;
        // drift direction: outward + slight random, plus pop toward viewer
        const ddir = Math.atan2(s.y, s.x) + (rnd() - 0.5) * 0.8;
        const dmag = 26 + (1 - d / Math.hypot(PANE_HW, PANE_HH)) * 70 + rnd() * 24;
        shards.push({
          verts,
          cx: s.x,
          cy: s.y,
          dist: d,
          dx: Math.cos(ddir) * dmag,
          dy: Math.sin(ddir) * dmag,
          dz: 40 + (1 - d / Math.hypot(PANE_HW, PANE_HH)) * 150 + rnd() * 50,
          rot: (rnd() - 0.5) * 2.4,
          spin: (rnd() - 0.5) * 1.6,
          glint: rnd() * Math.PI * 2,
          shade: 0.35 + rnd() * 0.5,
        });
      }
      // sort by distance so near-impact shards animate first (used as timing)
      shards.sort((a, b) => a.dist - b.dist);

      // radial cracks emanating from impact
      cracks = [];
      const C = 11;
      for (let i = 0; i < C; i++) {
        const a = (i / C) * Math.PI * 2 + (rnd() - 0.5) * 0.3;
        const jag: number[] = [];
        for (let j = 0; j < 8; j++) jag.push((rnd() - 0.5) * 0.4);
        cracks.push({
          a,
          reach: 0.6 + rnd() * 0.4,
          jag,
        });
      }
    };
    buildShatter();

    // ---- Faux-3D projection (gentle perspective; viewer at +Z) ----
    const FOCAL = 620;
    const CAM_Z = 640;
    const project = (x: number, y: number, z: number) => {
      const depth = CAM_Z - z; // shards pop toward viewer (z up) => nearer
      const persp = FOCAL / Math.max(60, depth);
      const scale = Math.min(W, H) / 720;
      // subtle camera dolly drift for life
      return {
        sx: W / 2 + x * persp * scale,
        sy: H / 2 + y * persp * scale,
        scale: persp * scale,
        depth,
      };
    };

    // ---- Timeline (ms) — fully reversible for a seamless loop ----
    // Phases: approach -> impact/crack -> burst -> suspended drift (hold) ->
    //         reverse drift -> reform -> hold pristine -> reverse approach.
    const T_APPROACH = 1700;
    const T_BURST = 1400;
    const T_DRIFT = 2600;
    const T_HOLD = 1500;
    const HALF = T_APPROACH + T_BURST + T_DRIFT + T_HOLD;
    const PERIOD = HALF * 2; // forward then mirror-reverse

    let raf = 0;
    let start = performance.now();

    const drawGlow = (
      sx: number,
      sy: number,
      radius: number,
      rgb: string,
      a: number
    ) => {
      if (radius <= 0 || a <= 0) return;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(0.5, `rgba(${rgb},${a * 0.34})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now: number) => {
      let t = (now - start) % PERIOD;
      // Mirror the second half so the animation plays forward then exactly
      // backward — guarantees a seamless, hitch-free loop.
      let phaseTime = t;
      if (t > HALF) phaseTime = PERIOD - t; // reversed timeline
      const tSec = (now - start) / 1000;

      // Resolve phase progress (0..1 within sub-phase) and a global "shatter"
      // amount: 0 = pristine pane, 1 = fully burst & drifted.
      let approach: number; // 0..1 bullet approach (0 far, 1 at pane)
      let crackAmt = 0; // 0..1 crack propagation
      let burst = 0; // 0..1 shards lifted off pane
      let drift = 0; // 0..1 shards drifted apart & glinting

      if (phaseTime < T_APPROACH) {
        approach = easeIn(phaseTime / T_APPROACH);
      } else if (phaseTime < T_APPROACH + T_BURST) {
        approach = 1;
        const p = (phaseTime - T_APPROACH) / T_BURST;
        crackAmt = easeOut(Math.min(1, p * 1.6));
        burst = easeInOut(p);
      } else if (phaseTime < T_APPROACH + T_BURST + T_DRIFT) {
        approach = 1;
        crackAmt = 1;
        burst = 1;
        drift = easeInOut((phaseTime - T_APPROACH - T_BURST) / T_DRIFT);
      } else {
        approach = 1;
        crackAmt = 1;
        burst = 1;
        drift = 1;
      }

      // ---- Background wash ----
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      const bgGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.72
      );
      bgGrad.addColorStop(0, "rgba(44,34,18,0.5)");
      bgGrad.addColorStop(0.45, "rgba(20,16,10,0.36)");
      bgGrad.addColorStop(1, "rgba(12,10,8,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const center = project(0, 0, 0);

      ctx.globalCompositeOperation = "lighter";

      // ---- The intact / fracturing pane (visible when shards still seated) ----
      const paneCohesion = 1 - burst; // 1 pristine -> 0 fully burst
      if (paneCohesion > 0.001) {
        const tl = project(-PANE_HW, -PANE_HH, 0);
        const br = project(PANE_HW, PANE_HH, 0);
        // faint glass body — a cool gold-tinted sheen
        const pg = ctx.createLinearGradient(tl.sx, tl.sy, br.sx, br.sy);
        const sheen = 0.06 * paneCohesion;
        pg.addColorStop(0, `rgba(${GOLD},${sheen})`);
        pg.addColorStop(0.5, `rgba(${HOT},${sheen * 1.4})`);
        pg.addColorStop(1, `rgba(${GOLD},${sheen})`);
        ctx.fillStyle = pg;
        ctx.fillRect(tl.sx, tl.sy, br.sx - tl.sx, br.sy - tl.sy);
        // border highlight
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},${0.18 * paneCohesion})`;
        ctx.lineWidth = Math.max(0.6, 1.2 * center.scale);
        ctx.strokeRect(tl.sx, tl.sy, br.sx - tl.sx, br.sy - tl.sy);

        // ---- Radial crack network racing outward from impact ----
        if (crackAmt > 0) {
          for (const c of cracks) {
            ctx.beginPath();
            const p0 = project(IMPACT.x, IMPACT.y, 0);
            ctx.moveTo(p0.sx, p0.sy);
            const maxR = Math.hypot(PANE_HW, PANE_HH) * c.reach;
            const segs = c.jag.length;
            const grow = crackAmt;
            let perp = c.a + Math.PI / 2;
            for (let j = 1; j <= segs; j++) {
              const f = (j / segs) * grow;
              const r = maxR * f;
              const off = c.jag[j - 1] * r * 0.4;
              const wx =
                IMPACT.x + Math.cos(c.a) * r + Math.cos(perp) * off;
              const wy =
                IMPACT.y + Math.sin(c.a) * r + Math.sin(perp) * off;
              const p = project(wx, wy, 0);
              ctx.lineTo(p.sx, p.sy);
            }
            const ca = 0.5 * crackAmt * paneCohesion;
            ctx.strokeStyle = `rgba(${HOT},${ca})`;
            ctx.lineWidth = Math.max(0.5, 1.3 * center.scale);
            ctx.stroke();
            // concentric stress rings
          }
          // concentric crack rings around impact
          for (let ri = 0; ri < 3; ri++) {
            const rr =
              (40 + ri * 46) * (0.5 + crackAmt);
            ctx.beginPath();
            for (let s = 0; s <= 40; s++) {
              const a = (s / 40) * Math.PI * 2;
              const jit = Math.sin(a * 6 + ri) * 4;
              const p = project(
                Math.cos(a) * (rr + jit),
                Math.sin(a) * (rr + jit),
                0
              );
              if (s === 0) ctx.moveTo(p.sx, p.sy);
              else ctx.lineTo(p.sx, p.sy);
            }
            ctx.strokeStyle = `rgba(${GOLD_LIGHT},${0.22 * crackAmt * paneCohesion})`;
            ctx.lineWidth = Math.max(0.4, 0.9 * center.scale);
            ctx.stroke();
          }
        }
      }

      // ---- Collect shard sprites (seated -> lifted -> drifted) ----
      type SP = {
        pts: { x: number; y: number }[];
        sx: number;
        sy: number;
        depth: number;
        scale: number;
        glint: number;
        shade: number;
      };
      const sprites: SP[] = [];
      const nShards = shards.length;
      for (let i = 0; i < nShards; i++) {
        const sh = shards[i];
        // Stagger burst by distance from impact: near shards lift first.
        const order = i / nShards; // already dist-sorted
        const localBurst = Math.max(
          0,
          Math.min(1, (burst - order * 0.55) / 0.45)
        );
        const lb = easeOut(localBurst);
        // current world position = seated centroid + drift*lift
        const liftT = lb * (0.35 + 0.65 * drift);
        const wx = sh.cx + sh.dx * liftT;
        const wy = sh.cy + sh.dy * liftT;
        const wz = sh.dz * lb * (0.5 + 0.5 * drift);
        const rot = sh.rot * liftT + sh.spin * drift;
        const cr = Math.cos(rot);
        const srot = Math.sin(rot);
        // foreshorten as shard tumbles (fake 3D facet via x-scale)
        const facet = 0.55 + 0.45 * Math.abs(Math.cos(rot * 1.3 + sh.glint));

        const cp = project(wx, wy, wz);
        const pts: { x: number; y: number }[] = [];
        for (const v of sh.verts) {
          const rx = (v.x * cr - v.y * srot) * facet;
          const ry = v.x * srot + v.y * cr;
          const p = project(wx + rx, wy + ry, wz);
          pts.push({ x: p.sx, y: p.sy });
        }
        sprites.push({
          pts,
          sx: cp.sx,
          sy: cp.sy,
          depth: cp.depth,
          scale: cp.scale,
          glint: sh.glint,
          shade: sh.shade,
        });
      }
      // painter's algorithm: far first
      sprites.sort((a, b) => b.depth - a.depth);

      for (const sp of sprites) {
        if (sp.pts.length < 3) continue;
        // metallic facet fill — angle-of-rotation gives the glint flash
        const glintWave =
          0.5 + 0.5 * Math.sin(tSec * 1.6 + sp.glint + (sp.sx + sp.sy) * 0.01);
        const lit = sp.shade * (0.5 + 0.5 * glintWave);
        ctx.beginPath();
        ctx.moveTo(sp.pts[0].x, sp.pts[0].y);
        for (let i = 1; i < sp.pts.length; i++)
          ctx.lineTo(sp.pts[i].x, sp.pts[i].y);
        ctx.closePath();
        const fg = ctx.createLinearGradient(
          sp.sx - 16 * sp.scale,
          sp.sy - 16 * sp.scale,
          sp.sx + 16 * sp.scale,
          sp.sy + 16 * sp.scale
        );
        fg.addColorStop(0, `rgba(${GOLD},${0.16 + lit * 0.3})`);
        fg.addColorStop(0.5, `rgba(${GOLD_LIGHT},${0.2 + lit * 0.45})`);
        fg.addColorStop(1, `rgba(120,92,30,${0.12 + lit * 0.2})`);
        ctx.fillStyle = fg;
        ctx.fill();
        // facet edge highlight
        ctx.strokeStyle = `rgba(${HOT},${0.12 + glintWave * 0.5 * sp.shade})`;
        ctx.lineWidth = Math.max(0.4, 0.8 * sp.scale);
        ctx.stroke();
        // sharp specular glint at facet center on the wave peak
        if (glintWave > 0.82) {
          drawGlow(
            sp.sx,
            sp.sy,
            10 * sp.scale * (glintWave - 0.82) * 6,
            HOT,
            0.6 * sp.shade
          );
        }
      }

      // ---- The bullet: a motion-blurred gold round on the flight axis ----
      // It travels from far (-z behind pane, small) toward the viewer, passing
      // through the pane at the burst moment.
      const bz = -260 + approach * 520; // behind pane -> through -> toward cam
      const bulletThrough = approach >= 0.999 && burst < 1;
      {
        const nose = project(0, 0, bz + 30);
        const tail = project(0, 0, bz - 130); // motion-blur trail behind
        // motion-blur streak
        const sg = ctx.createLinearGradient(tail.sx, tail.sy, nose.sx, nose.sy);
        sg.addColorStop(0, `rgba(${GOLD},0)`);
        sg.addColorStop(0.6, `rgba(${GOLD},${0.12 * (0.4 + approach)})`);
        sg.addColorStop(1, `rgba(${GOLD_LIGHT},${0.28 * (0.4 + approach)})`);
        ctx.strokeStyle = sg;
        ctx.lineWidth = Math.max(2, 16 * nose.scale);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tail.sx, tail.sy);
        ctx.lineTo(nose.sx, nose.sy);
        ctx.stroke();

        // bullet body (ogive) — only meaningfully visible before full burst
        const bodyAlpha = 1 - drift; // fades once it has fully passed through
        if (bodyAlpha > 0.02) {
          const rNose = 13 * nose.scale;
          const rBody = 18 * nose.scale;
          const bc = project(0, 0, bz);
          const bg = ctx.createRadialGradient(
            bc.sx - rBody * 0.4,
            bc.sy - rBody * 0.4,
            0,
            bc.sx,
            bc.sy,
            rBody * 1.6
          );
          bg.addColorStop(0, `rgba(${HOT},${bodyAlpha})`);
          bg.addColorStop(0.4, `rgba(${GOLD_LIGHT},${0.95 * bodyAlpha})`);
          bg.addColorStop(1, `rgba(94,74,22,${0.85 * bodyAlpha})`);
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.ellipse(bc.sx, bc.sy, rBody, rNose, 0, 0, Math.PI * 2);
          ctx.fill();
          // hot nose
          drawGlow(nose.sx, nose.sy, rNose * 2.4, GOLD_LIGHT, 0.8 * bodyAlpha);
          drawGlow(nose.sx, nose.sy, rNose * 0.9, HOT, bodyAlpha);
        }
      }

      // ---- Impact flash: blooms at the moment of penetration ----
      const flash = bulletThrough
        ? Math.max(0, 1 - Math.abs(burst - 0.18) * 5)
        : 0;
      if (flash > 0) {
        drawGlow(center.sx, center.sy, 160 * center.scale, HOT, 0.55 * flash);
        drawGlow(center.sx, center.sy, 70 * center.scale, GOLD_LIGHT, 0.8 * flash);
        // quick spark spray
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2 + tSec;
          const rr = 20 + flash * 80;
          const p = project(Math.cos(a) * rr, Math.sin(a) * rr, 20);
          drawGlow(p.sx, p.sy, 6 * center.scale, HOT, 0.7 * flash);
        }
      }

      ctx.globalCompositeOperation = "source-over";

      // ---- Vignette ----
      const vg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.26,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.74
      );
      vg.addColorStop(0, "rgba(12,10,8,0)");
      vg.addColorStop(0.6, "rgba(12,10,8,0.34)");
      vg.addColorStop(0.85, "rgba(12,10,8,0.82)");
      vg.addColorStop(1, "rgba(12,10,8,0.98)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ---- Film grain ----
      const gAlpha = 0.05;
      const step = 3;
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const n = Math.random();
          if (n > 0.86) {
            ctx.fillStyle = `rgba(255,247,219,${gAlpha * (n - 0.86) * 7})`;
            ctx.fillRect(x, y, step, step);
          }
        }
      }
      ctx.restore();

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      // Single representative frozen frame: shards suspended mid-drift.
      start = performance.now() - (T_APPROACH + T_BURST + T_DRIFT * 0.55);
      frame(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
