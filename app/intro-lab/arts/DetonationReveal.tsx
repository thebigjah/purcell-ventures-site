"use client";

import { useEffect, useRef } from "react";

/**
 * DetonationReveal — a Mission: Impossible title-beat detonation.
 *
 * A dark charged frame draws a breath of anticipation as a tight gold core
 * pulses and flickers at center. Then a DETONATION: a hard bloom of gold light,
 * an expanding shockwave ring, and motion-blurred debris/sparks blasting
 * outward. The blast settles, embers fall and fade, smoke drifts up, and the
 * frame re-charges before looping seamlessly.
 *
 * Self-contained, no props, no deps. Canvas 2D (no WebGL). ~6s seamless loop.
 */
export default function DetonationReveal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD = "#d4af37";
    const GOLD_LIGHT = "#e8c96a";
    const BG = "#0c0a08";

    const LOOP_MS = 6000;
    // Phase boundaries within the loop (fractions of LOOP_MS).
    const CHARGE_END = 0.36; // anticipation build
    const BLAST_AT = 0.36; // detonation instant
    const FLASH_END = 0.46; // hard bloom flash fades
    const SETTLE_END = 0.86; // debris + embers + smoke settle
    // remainder (0.86..1.0): re-charge / fade back to dark

    let width = 0;
    let height = 0;
    let dpr = 1;
    let diag = 1;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInQuad = (t: number) => t * t;

    // ---- Particle systems (seeded once per detonation) ----
    type Debris = {
      ang: number;
      speed: number; // px/sec at full throttle
      dist: number; // current distance from center
      size: number;
      hot: number; // 0..1 how white-hot
      drag: number;
      gravity: number;
      tumble: number;
    };
    type Ember = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number; // remaining 0..1
      size: number;
    };
    type Smoke = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      grow: number;
      life: number;
    };

    let debris: Debris[] = [];
    let embers: Ember[] = [];
    let smoke: Smoke[] = [];
    let seededLoop = -1; // which loop index we've seeded particles for

    const seedDetonation = () => {
      debris = [];
      embers = [];
      smoke = [];
      const debrisCount = Math.round(rand(70, 95));
      for (let i = 0; i < debrisCount; i++) {
        const ang = Math.random() * Math.PI * 2;
        debris.push({
          ang,
          speed: rand(0.35, 1.0) * diag,
          dist: 0,
          size: rand(1.2, 4.2),
          hot: rand(0.4, 1),
          drag: rand(1.6, 3.2),
          gravity: rand(0.05, 0.18) * diag,
          tumble: rand(-6, 6),
        });
      }
      const smokeCount = 14;
      for (let i = 0; i < smokeCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = rand(0.04, 0.13) * diag;
        smoke.push({
          x: width / 2 + Math.cos(a) * diag * 0.02,
          y: height / 2 + Math.sin(a) * diag * 0.02,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - diag * 0.03,
          r: rand(0.04, 0.09) * diag,
          grow: rand(0.06, 0.14) * diag,
          life: 1,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      diag = Math.hypot(width, height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Film grain (procedural, cheap; refreshed on an offscreen tile) ----
    const grainCanvas = document.createElement("canvas");
    const grainSize = 128;
    grainCanvas.width = grainSize;
    grainCanvas.height = grainSize;
    const gctx = grainCanvas.getContext("2d");
    const regenGrain = () => {
      if (!gctx) return;
      const img = gctx.createImageData(grainSize, grainSize);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = 120 + Math.random() * 135;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    };
    regenGrain();

    let raf = 0;
    let startTime = 0;
    let lastTime = 0;
    let grainTick = 0;

    const frame = (now: number) => {
      if (!startTime) {
        startTime = now;
        lastTime = now;
      }
      const dt = Math.min(48, now - lastTime);
      lastTime = now;
      const dtSec = dt / 1000;

      const total = now - startTime;
      const loopIndex = Math.floor(total / LOOP_MS);
      const elapsed = total % LOOP_MS;
      const phase = elapsed / LOOP_MS; // 0..1

      const cx = width / 2;
      const cy = height / 2;

      // Seed a fresh detonation exactly once per loop, just before the blast.
      if (loopIndex !== seededLoop && phase < BLAST_AT) {
        seededLoop = loopIndex;
        seedDetonation();
      }

      // ---------- Background ----------
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // Warm radial vignette floor (always present, intensifies during charge).
      let charge = 0;
      if (phase < CHARGE_END) charge = easeInQuad(phase / CHARGE_END);
      else charge = 1;

      const baseVg = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.7);
      baseVg.addColorStop(0, `rgba(40,28,10,${0.25 + charge * 0.25})`);
      baseVg.addColorStop(0.6, "rgba(20,14,6,0.12)");
      baseVg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = baseVg;
      ctx.fillRect(0, 0, width, height);

      // ---------- PHASE: CHARGE (anticipation) ----------
      if (phase < BLAST_AT) {
        const t = phase / CHARGE_END; // 0..1
        // A tight pulsing gold core that flickers and tightens before the blast.
        const flicker = 0.7 + Math.random() * 0.3;
        const breathe = 0.5 + 0.5 * Math.sin(t * Math.PI * 6);
        const coreR =
          diag * (0.012 + 0.02 * t) * (0.7 + breathe * 0.5) * flicker;
        const intensity = (0.35 + 0.65 * easeInQuad(t)) * flicker;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4);
        core.addColorStop(0, `rgba(255,255,250,${0.9 * intensity})`);
        core.addColorStop(0.25, `rgba(232,201,106,${0.7 * intensity})`);
        core.addColorStop(0.6, `rgba(212,175,55,${0.35 * intensity})`);
        core.addColorStop(1, "rgba(212,175,55,0)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR * 4, 0, Math.PI * 2);
        ctx.fill();

        // Charging filaments crackling inward as the blast nears.
        if (t > 0.45) {
          const fc = Math.round((t - 0.45) * 14);
          ctx.lineWidth = Math.max(1, diag * 0.0012);
          for (let i = 0; i < fc; i++) {
            const a = Math.random() * Math.PI * 2;
            const r0 = coreR * rand(5, 11);
            const r1 = coreR * rand(1.5, 3);
            const jx = Math.cos(a) * r0 + rand(-8, 8);
            const jy = Math.sin(a) * r0 + rand(-8, 8);
            const g = ctx.createLinearGradient(
              cx + Math.cos(a) * r1,
              cy + Math.sin(a) * r1,
              cx + jx,
              cy + jy
            );
            g.addColorStop(0, `rgba(232,201,106,${0.5 * intensity})`);
            g.addColorStop(1, "rgba(212,175,55,0)");
            ctx.strokeStyle = g;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
            ctx.lineTo(cx + jx, cy + jy);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // ---------- PHASE: DETONATION (blast + after) ----------
      if (phase >= BLAST_AT) {
        const tBlast = (phase - BLAST_AT) / (1 - BLAST_AT); // 0..1 over rest
        const blastSec = tBlast * (LOOP_MS * (1 - BLAST_AT)) / 1000;

        // --- Hard bloom flash (very short, percussive) ---
        if (phase < FLASH_END) {
          const ft = (phase - BLAST_AT) / (FLASH_END - BLAST_AT); // 0..1
          // Snap up, fast decay.
          const flash = ft < 0.12 ? ft / 0.12 : Math.pow(1 - (ft - 0.12) / 0.88, 1.6);
          const maxR = diag * (0.5 + flash * 0.45);
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
          fg.addColorStop(0, `rgba(255,255,252,${0.98 * flash})`);
          fg.addColorStop(0.16, `rgba(245,228,170,${0.85 * flash})`);
          fg.addColorStop(0.4, `rgba(212,175,55,${0.45 * flash})`);
          fg.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = fg;
          ctx.fillRect(0, 0, width, height);

          // Anamorphic light streaks (horizontal + radiant spokes).
          ctx.translate(cx, cy);
          const spokes = 16;
          for (let i = 0; i < spokes; i++) {
            ctx.rotate((Math.PI * 2) / spokes);
            const len = maxR * (0.5 + flash * 0.7);
            const lg = ctx.createLinearGradient(0, 0, len, 0);
            lg.addColorStop(0, `rgba(255,250,235,${0.5 * flash})`);
            lg.addColorStop(1, "rgba(212,175,55,0)");
            ctx.fillStyle = lg;
            const w = diag * 0.0035 + 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(len, -w);
            ctx.lineTo(len, w);
            ctx.closePath();
            ctx.fill();
          }
          // Wide horizontal anamorphic flare bar.
          const barLen = maxR * 1.6;
          const bg = ctx.createLinearGradient(-barLen, 0, barLen, 0);
          bg.addColorStop(0, "rgba(232,201,106,0)");
          bg.addColorStop(0.5, `rgba(255,250,235,${0.6 * flash})`);
          bg.addColorStop(1, "rgba(232,201,106,0)");
          ctx.fillStyle = bg;
          ctx.fillRect(-barLen, -(diag * 0.004 + 1), barLen * 2, diag * 0.008 + 2);
          ctx.restore();
        }

        // --- Shockwave ring(s) expanding outward ---
        if (tBlast < 0.7) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const drawRing = (delay: number, thickK: number) => {
            const rt = (tBlast - delay) / (0.7 - delay);
            if (rt <= 0 || rt > 1) return;
            const eased = easeOutCubic(rt);
            const ringR = eased * diag * 0.62;
            const alpha = (1 - rt) * 0.85;
            const thick = (diag * 0.02 * thickK) * (1 - rt * 0.5) + 1.5;
            ctx.strokeStyle = `rgba(232,201,106,${alpha})`;
            ctx.lineWidth = thick;
            ctx.beginPath();
            ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
            ctx.stroke();
            // bright leading edge
            ctx.strokeStyle = `rgba(255,250,240,${alpha * 0.7})`;
            ctx.lineWidth = Math.max(1, thick * 0.3);
            ctx.beginPath();
            ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
            ctx.stroke();
          };
          drawRing(0, 1);
          drawRing(0.08, 0.55);
          ctx.restore();
        }

        // --- Debris streaks blasting outward (motion-blur trails) ---
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (const p of debris) {
          // Velocity decays with drag; integrate distance.
          const v = p.speed * Math.exp(-p.drag * blastSec);
          p.dist += v * dtSec;
          // gravity sag on the angle's vertical component, grows over time.
          const sag = p.gravity * blastSec * blastSec * 6;
          const hx = cx + Math.cos(p.ang) * p.dist;
          const hy = cy + Math.sin(p.ang) * p.dist + sag;
          // tail points back toward where it came from (motion blur length ~ speed)
          const tail = Math.min(diag * 0.12, v * 0.06 + p.size * 3);
          const tx = hx - Math.cos(p.ang) * tail;
          const ty = hy - Math.sin(p.ang) * tail - p.gravity * blastSec * 2;

          // fade as it travels out and as blast settles
          const travelFade = Math.max(0, 1 - p.dist / (diag * 0.62));
          const timeFade = Math.max(0, 1 - tBlast / 0.85);
          const a = travelFade * timeFade;
          if (a <= 0.01) continue;

          const hotMix = p.hot * Math.max(0, 1 - tBlast / 0.5);
          const headCol =
            hotMix > 0.5
              ? `rgba(255,250,238,${a})`
              : `rgba(232,201,106,${a})`;
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0, "rgba(212,175,55,0)");
          g.addColorStop(1, headCol);
          ctx.strokeStyle = g;
          ctx.lineWidth = p.size * (0.5 + a * 0.8);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();

          // hot head dot
          ctx.fillStyle = headCol;
          ctx.beginPath();
          ctx.arc(hx, hy, p.size * (0.5 + hotMix * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // --- Smoke drifting up from the blast site ---
        if (tBlast > 0.04) {
          ctx.save();
          for (const s of smoke) {
            s.x += s.vx * dtSec;
            s.y += s.vy * dtSec;
            s.vy -= diag * 0.01 * dtSec; // buoyancy upward
            s.vx *= 0.99;
            s.r += s.grow * dtSec;
            // smoke fades in then out across settle window
            const lifeT = Math.min(1, tBlast / 0.85);
            const env = Math.sin(Math.min(1, lifeT) * Math.PI); // 0..1..0
            const a = env * 0.16;
            if (a <= 0.005) continue;
            const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
            sg.addColorStop(0, `rgba(60,48,28,${a})`);
            sg.addColorStop(0.6, `rgba(30,24,14,${a * 0.6})`);
            sg.addColorStop(1, "rgba(12,10,8,0)");
            ctx.fillStyle = sg;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // --- Embers: spawn at blast, then fall and fade ---
        if (phase >= BLAST_AT && phase < FLASH_END && embers.length < 60) {
          const burst = 60;
          for (let i = 0; i < burst; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = rand(0.08, 0.45) * diag;
            embers.push({
              x: cx,
              y: cy,
              vx: Math.cos(a) * sp,
              vy: Math.sin(a) * sp,
              life: rand(0.6, 1),
              size: rand(0.8, 2.6),
            });
          }
        }
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        embers = embers.filter((e) => {
          e.life -= dtSec * 0.42;
          if (e.life <= 0) return false;
          e.x += e.vx * dtSec;
          e.y += e.vy * dtSec;
          e.vy += diag * 0.22 * dtSec; // gravity
          e.vx *= 0.985;
          e.vy *= 0.992;
          const a = Math.max(0, e.life);
          const flick = 0.7 + Math.random() * 0.3;
          ctx.globalAlpha = a * 0.9 * flick;
          ctx.fillStyle = a > 0.6 ? GOLD_LIGHT : GOLD;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * (0.4 + a * 0.7), 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        ctx.restore();

        // --- Lingering afterglow at center, cooling as it settles ---
        if (tBlast < 0.9) {
          const glow = Math.max(0, 1 - tBlast / 0.9);
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.22);
          ag.addColorStop(0, `rgba(212,175,55,${0.3 * glow})`);
          ag.addColorStop(0.5, `rgba(170,120,40,${0.14 * glow})`);
          ag.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = ag;
          ctx.beginPath();
          ctx.arc(cx, cy, diag * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Clear particles before loop wraps so the recharge starts clean.
        if (phase > SETTLE_END) {
          if (embers.length) {
            // fade-driven; they'll empty naturally, but hard-cap near wrap
            if (phase > 0.97) embers = [];
          }
          if (phase > 0.97) {
            debris = [];
            smoke = [];
          }
        }
      }

      // ---------- Bloom-ish soft pass (cheap): re-draw a blurred warm wash ----------
      // (Approximated via an additive radial wash keyed to overall brightness.)

      // ---------- Film grain overlay ----------
      grainTick += dt;
      if (grainTick > 50) {
        regenGrain();
        grainTick = 0;
      }
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.globalCompositeOperation = "overlay";
      const pattern = ctx.createPattern(grainCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // ---------- Cinematic vignette (darkened edges) ----------
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        diag * 0.25,
        cx,
        cy,
        diag * 0.62
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

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
