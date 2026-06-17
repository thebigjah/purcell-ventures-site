"use client";

import { useEffect, useRef } from "react";

/**
 * MatchStrike — a Mission: Impossible style match strike.
 * Darkness, then a sudden spark-scratch streak rakes across the strip; a flare of
 * gold-white light blooms and swells, then settles into a flickering flame at center
 * that breathes warm gold light into the dark with thin smoke curling up. The flame
 * gutters to a dim ember, then the match re-strikes and the whole thing loops.
 *
 * Self-contained, no props, no deps. Canvas 2D (flame/light/smoke). Seamless ~7s loop.
 */
export default function MatchStrike() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ---- Brand palette ----
    const BG = "#0c0a08";
    const GOLD = "212,175,55"; // #d4af37
    const GOLD_LIGHT = "232,201,106"; // #e8c96a
    const WHITE = "255,250,238";

    // ---- Loop timing (ms) ----
    const LOOP_MS = 7000;
    // Phase boundaries as fractions of the loop:
    const T_DARK = 0.0; // pre-strike darkness
    const T_STRIKE = 0.05; // scratch streak begins
    const T_FLARE = 0.11; // ignition flare bloom peak window
    const T_SETTLE = 0.2; // flare collapses into steady flame
    const T_BURN_END = 0.78; // flame burns steady (breathing)
    const T_GUTTER = 0.9; // flame gutters down to ember
    // 0.9..1.0 -> ember fades to black, ready to re-strike

    let width = 0;
    let height = 0;
    let dpr = 1;

    // ---- Smoke particles ----
    type Smoke = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number; // 0..1 remaining
      seed: number;
      size: number;
    };
    let smoke: Smoke[] = [];

    // ---- Spark embers thrown off the strike scratch ----
    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    };
    let sparks: Spark[] = [];

    let lastLoopIndex = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
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

    // ---- Pre-baked film grain tile (cheap, reused) ----
    const grainCanvas = document.createElement("canvas");
    const GRAIN_SIZE = 160;
    grainCanvas.width = GRAIN_SIZE;
    grainCanvas.height = GRAIN_SIZE;
    const gctx = grainCanvas.getContext("2d");
    const buildGrain = () => {
      if (!gctx) return;
      const img = gctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    };
    buildGrain();

    // ---- Easing helpers ----
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInCubic = (t: number) => t * t * t;
    const smoothstep = (t: number) => {
      t = clamp01(t);
      return t * t * (3 - 2 * t);
    };

    // Deterministic-ish flicker via summed sines (per loop, stable-ish texture).
    const flickerAt = (time: number) =>
      0.72 +
      0.14 * Math.sin(time * 0.021) +
      0.08 * Math.sin(time * 0.053 + 1.3) +
      0.06 * Math.sin(time * 0.117 + 2.7);

    // Draw one soft radial light blob (additive).
    const radialBlob = (
      cx: number,
      cy: number,
      r: number,
      stops: Array<[number, string]>
    ) => {
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      for (const [pos, col] of stops) grd.addColorStop(pos, col);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let raf = 0;
    let startTime = 0;
    let lastTime = 0;

    const frame = (now: number) => {
      if (!startTime) {
        startTime = now;
        lastTime = now;
      }
      const dt = Math.min(48, now - lastTime);
      lastTime = now;
      const dtSec = dt / 1000;

      const absMs = now - startTime;
      const loopIndex = Math.floor(absMs / LOOP_MS);
      const elapsed = absMs % LOOP_MS;
      const phase = elapsed / LOOP_MS; // 0..1

      // Reset transient state at the top of each loop.
      if (loopIndex !== lastLoopIndex) {
        lastLoopIndex = loopIndex;
        smoke = [];
        sparks = [];
      }

      // Geometry: flame sits a touch below center so the glow + smoke read upward.
      const cx = width / 2;
      const cy = height * 0.56;
      const base = Math.min(width, height);

      // -------- Phase-driven scalars --------
      // strikeProg: 0..1 across the scratch streak window.
      const strikeProg = clamp01((phase - T_STRIKE) / (T_FLARE - T_STRIKE));
      // flareInt: ignition bloom — rises fast, decays into settle.
      let flareInt = 0;
      if (phase >= T_STRIKE && phase < T_SETTLE) {
        const fp = (phase - T_STRIKE) / (T_SETTLE - T_STRIKE); // 0..1
        // fast attack near the flare moment, long-ish decay
        flareInt = fp < 0.28 ? easeOutCubic(fp / 0.28) : Math.pow(1 - (fp - 0.28) / 0.72, 1.6);
      }
      flareInt = clamp01(flareInt);

      // flameLife: master flame presence (0 dark .. 1 full), gutter to ember.
      let flameLife = 0;
      if (phase >= T_STRIKE && phase < T_SETTLE) {
        flameLife = smoothstep((phase - T_STRIKE) / (T_SETTLE - T_STRIKE));
      } else if (phase >= T_SETTLE && phase < T_BURN_END) {
        flameLife = 1;
      } else if (phase >= T_BURN_END && phase < T_GUTTER) {
        flameLife = 1; // burning, but we'll add unsteadiness below
      } else if (phase >= T_GUTTER) {
        // gutter to ember to dark
        flameLife = Math.max(0, 1 - easeInCubic((phase - T_GUTTER) / (1 - T_GUTTER)));
      }

      // Gutter unsteadiness: in the final burn, the flame wavers harder.
      const gutterStress =
        phase >= T_BURN_END
          ? smoothstep((phase - T_BURN_END) / (1 - T_BURN_END))
          : 0;

      // Steady flicker + wind sway.
      const fl = flickerAt(elapsed) * (1 - gutterStress * 0.35) +
        gutterStress * 0.45 * (0.5 + 0.5 * Math.sin(elapsed * 0.31));
      const sway = Math.sin(elapsed * 0.0033) * 0.6 + Math.sin(elapsed * 0.011) * 0.35;
      const windX = sway * base * 0.012 * (1 + gutterStress * 1.4);

      // -------- 1) Clear to warm near-black --------
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // -------- 2) Ambient warm glow cast into the dark (breathing) --------
      const glowStrength = flameLife * (0.55 + fl * 0.45);
      if (glowStrength > 0.001) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const glowR = base * (0.42 + 0.1 * fl + flareInt * 0.5);
        radialBlob(cx + windX * 0.4, cy - base * 0.02, glowR, [
          [0, `rgba(${GOLD_LIGHT},${0.16 * glowStrength + flareInt * 0.25})`],
          [0.35, `rgba(${GOLD},${0.1 * glowStrength + flareInt * 0.16})`],
          [1, `rgba(${GOLD},0)`],
        ]);
        ctx.restore();
      }

      // -------- 3) The strike: scratch streak + thrown sparks --------
      if (phase >= T_STRIKE && phase < T_FLARE + 0.04) {
        // The match drags from lower-left up toward the ignition point.
        const x0 = cx - base * 0.26;
        const y0 = cy + base * 0.16;
        const x1 = cx;
        const y1 = cy;
        const headT = easeOutCubic(strikeProg);
        const hx = x0 + (x1 - x0) * headT;
        const hy = y0 + (y1 - y0) * headT;

        // bright scratch trail behind the head
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const trailGrad = ctx.createLinearGradient(x0, y0, hx, hy);
        trailGrad.addColorStop(0, `rgba(${GOLD},0)`);
        trailGrad.addColorStop(0.7, `rgba(${GOLD},${0.25 * (1 - strikeProg * 0.5)})`);
        trailGrad.addColorStop(1, `rgba(${WHITE},${0.7})`);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = Math.max(1.4, base * 0.004);
        ctx.lineCap = "round";
        ctx.shadowColor = `rgba(${GOLD_LIGHT},0.9)`;
        ctx.shadowBlur = base * 0.02;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        // hot head point
        radialBlob(hx, hy, base * 0.03, [
          [0, `rgba(${WHITE},0.95)`],
          [0.4, `rgba(${GOLD_LIGHT},0.6)`],
          [1, `rgba(${GOLD},0)`],
        ]);
        ctx.restore();

        // throw sparks off the head
        const spawn = 2 + ((Math.random() * 3) | 0);
        for (let i = 0; i < spawn; i++) {
          const ang = -Math.PI * 0.55 + (Math.random() - 0.5) * 2.4;
          const spd = (0.5 + Math.random() * 2.2) * base * 0.02;
          sparks.push({
            x: hx,
            y: hy,
            vx: Math.cos(ang) * spd + base * 0.01,
            vy: Math.sin(ang) * spd,
            life: 1,
            size: 0.6 + Math.random() * 1.8,
          });
        }
      }

      // -------- 4) Update + draw sparks --------
      if (sparks.length) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        sparks = sparks.filter((s) => {
          s.life -= dtSec * 1.8;
          if (s.life <= 0) return false;
          s.x += s.vx * dtSec;
          s.y += s.vy * dtSec;
          s.vy += base * 0.6 * dtSec; // gravity
          s.vx *= 0.97;
          const a = clamp01(s.life);
          ctx.globalAlpha = a;
          ctx.fillStyle = a > 0.55 ? `rgb(${WHITE})` : `rgb(${GOLD})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (0.4 + a * 0.9), 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        ctx.restore();
      }

      // -------- 5) The flame body --------
      if (flameLife > 0.001) {
        // Flame height/width scaled by life + flicker; flare puffs it bigger.
        const h = base * (0.12 + 0.05 * fl) * flameLife * (1 + flareInt * 1.1);
        const w = base * (0.035 + 0.01 * fl) * Math.max(0.4, flameLife) * (1 + flareInt * 0.6);
        const tipX = cx + windX;
        const tipY = cy - h;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // outer warm gold halo of the flame
        radialBlob(cx, cy - h * 0.35, w * 3.4, [
          [0, `rgba(${GOLD_LIGHT},${0.5 * flameLife})`],
          [0.5, `rgba(${GOLD},${0.22 * flameLife})`],
          [1, `rgba(${GOLD},0)`],
        ]);

        // teardrop flame shape (outer gold)
        const drawTeardrop = (
          topX: number,
          topY: number,
          baseX: number,
          baseY: number,
          halfW: number,
          fill: string
        ) => {
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.bezierCurveTo(
            topX + halfW * 0.7,
            topY + (baseY - topY) * 0.45,
            baseX + halfW,
            baseY - (baseY - topY) * 0.15,
            baseX,
            baseY
          );
          ctx.bezierCurveTo(
            baseX - halfW,
            baseY - (baseY - topY) * 0.15,
            topX - halfW * 0.7,
            topY + (baseY - topY) * 0.45,
            topX,
            topY
          );
          ctx.closePath();
          ctx.fillStyle = fill;
          ctx.fill();
        };

        const baseY = cy + h * 0.18;
        // outer gold flame
        drawTeardrop(tipX, tipY, cx, baseY, w, `rgba(${GOLD},${0.85 * flameLife})`);
        // mid light-gold flame
        drawTeardrop(
          tipX + windX * 0.2,
          tipY + h * 0.16,
          cx,
          baseY - h * 0.04,
          w * 0.62,
          `rgba(${GOLD_LIGHT},${0.9 * flameLife})`
        );
        // hot white-gold core
        drawTeardrop(
          tipX + windX * 0.3,
          tipY + h * 0.32,
          cx,
          baseY - h * 0.06,
          w * 0.32,
          `rgba(${WHITE},${0.92 * flameLife})`
        );

        // tiny intense seed of light at the wick
        radialBlob(cx + windX * 0.3, cy + h * 0.02, w * 0.6, [
          [0, `rgba(${WHITE},${0.95 * flameLife})`],
          [0.5, `rgba(${GOLD_LIGHT},${0.5 * flameLife})`],
          [1, `rgba(${GOLD},0)`],
        ]);

        ctx.restore();
      }

      // -------- 6) Ignition flare bloom (big swelling burst) --------
      if (flareInt > 0.002) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const fr = base * (0.25 + flareInt * 0.95);
        radialBlob(cx, cy, fr, [
          [0, `rgba(${WHITE},${0.9 * flareInt})`],
          [0.16, `rgba(${GOLD_LIGHT},${0.7 * flareInt})`],
          [0.45, `rgba(${GOLD},${0.4 * flareInt})`],
          [1, `rgba(${GOLD},0)`],
        ]);
        // a few radiant streaks at the peak
        ctx.translate(cx, cy);
        const streaks = 10;
        for (let i = 0; i < streaks; i++) {
          ctx.rotate((Math.PI * 2) / streaks + 0.0007 * elapsed);
          const len = fr * (0.7 + 0.5 * flareInt);
          const lg = ctx.createLinearGradient(0, 0, len, 0);
          lg.addColorStop(0, `rgba(${WHITE},${0.4 * flareInt})`);
          lg.addColorStop(1, `rgba(${GOLD},0)`);
          ctx.fillStyle = lg;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(len, -base * 0.003 - 1);
          ctx.lineTo(len, base * 0.003 + 1);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // -------- 7) Smoke: thin curl rising from the flame/ember --------
      // Spawn while there's flame, and a last wisp as it gutters out.
      const smokeRate = flameLife * (0.7 + gutterStress * 1.6) + (phase >= T_GUTTER ? 0.8 : 0);
      if (Math.random() < smokeRate * 0.9 && phase >= T_SETTLE) {
        smoke.push({
          x: cx + windX + (Math.random() - 0.5) * base * 0.01,
          y: cy - base * 0.1,
          vx: 0,
          vy: -base * (0.04 + Math.random() * 0.03),
          life: 1,
          seed: Math.random() * 1000,
          size: base * (0.012 + Math.random() * 0.01),
        });
      }
      if (smoke.length) {
        ctx.save();
        // smoke is subtractive-ish: drawn as soft dark-warm haze, lit faintly gold
        ctx.globalCompositeOperation = "screen";
        smoke = smoke.filter((p) => {
          p.life -= dtSec * 0.32;
          if (p.life <= 0) return false;
          const age = 1 - p.life;
          p.y += p.vy * dtSec;
          // curl: sideways drift grows with age
          p.x +=
            (Math.sin(age * 6 + p.seed) * base * 0.02 + windX * 0.4) * dtSec * 1.4;
          p.vy *= 0.995;
          const a = Math.sin(p.life * Math.PI) * 0.5; // fade in then out
          const r = p.size * (1 + age * 3.2);
          // faint gold-lit smoke near the flame, cooling to grey as it rises
          const lit = clamp01(1 - age * 1.4) * flameLife;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grd.addColorStop(0, `rgba(${GOLD},${0.06 * a * (0.4 + lit)})`);
          grd.addColorStop(0.5, `rgba(120,108,92,${0.05 * a})`);
          grd.addColorStop(1, "rgba(70,66,60,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        ctx.restore();
      }

      // -------- 8) Bloom pass (cheap): re-draw bright center softly enlarged --------
      if (flameLife > 0.2 || flareInt > 0.05) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.5;
        const br = base * (0.18 + flareInt * 0.6) * (0.7 + fl * 0.3);
        radialBlob(cx + windX, cy - base * 0.04, br, [
          [0, `rgba(${GOLD_LIGHT},${0.18 * (flameLife + flareInt)})`],
          [1, `rgba(${GOLD},0)`],
        ]);
        ctx.restore();
      }

      // -------- 9) Film grain (subtle, animated by tiling offset) --------
      ctx.save();
      ctx.globalAlpha = 0.045;
      ctx.globalCompositeOperation = "overlay";
      const ox = (Math.random() * GRAIN_SIZE) | 0;
      const oy = (Math.random() * GRAIN_SIZE) | 0;
      for (let gx = -ox; gx < width; gx += GRAIN_SIZE) {
        for (let gy = -oy; gy < height; gy += GRAIN_SIZE) {
          ctx.drawImage(grainCanvas, gx, gy);
        }
      }
      ctx.restore();

      // -------- 10) Vignette (darken edges for depth) --------
      const vg = ctx.createRadialGradient(
        cx,
        cy,
        base * 0.12,
        cx,
        cy,
        Math.max(width, height) * 0.78
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.6, "rgba(0,0,0,0.12)");
      vg.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = vg;
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
