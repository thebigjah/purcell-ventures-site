"use client";

import { useEffect, useRef } from "react";

/**
 * DiegeticCredits — Purcell Ventures motion asset
 * Gold credit words live physically inside a moving 3D environment: they stand
 * etched into passing walls, slanted floor planes, and floating light shafts as
 * the camera dollies forward through warm depth fog, each surface sliding past
 * with true perspective parallax and catching a gold glint as it nears the lens,
 * then the corridor of words recycles from far depth so the dolly loops seamlessly.
 *
 * Self-contained: canvas-2d pseudo-3D only (no WebGL), no deps, no props.
 */
export default function DiegeticCredits() {
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
    let MIN = 0;

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

    // ---- Math helpers ----
    const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const smooth = (t: number) => {
      t = clamp01(t);
      return t * t * (3 - 2 * t);
    };

    // ---- Camera + scene depth ----
    // The world extends along +Z (into screen). Camera sits at z=0 and travels
    // forward at constant speed. The depth period LOOP is chosen so that when the
    // camera advances exactly one period, the scene is identical -> seamless loop.
    const NEAR = 60; // clip plane (closer = past the lens)
    const FAR = 2600; // fog-out distance
    const LOOP = 1300; // depth period (world units the camera covers per loop)
    const FOCAL = 0.9; // perspective strength (scaled by MIN)

    type Word = {
      text: string;
      font: "cinzel" | "dm";
      z: number; // base depth within [0, LOOP)
      // local placement in the perspective plane, in "vmin" fractions
      x: number; // horizontal offset from center axis (-0.6..0.6 of MIN)
      y: number; // vertical offset (-0.5..0.5 of MIN)
      size: number; // glyph height as fraction of MIN at z=ref
      slantX: number; // horizontal skew to suggest a turned wall/floor plane
      slantY: number; // vertical skew
      weight: number; // 0..1 brightness weighting
      tracking: number; // letter-spacing factor
    };

    // The corridor of credit words. Positions chosen so words alternate sides
    // and heights — reading like signage embedded on passing surfaces.
    const WORDS: Word[] = [
      { text: "PURCELL VENTURES", font: "cinzel", z: 120, x: -0.04, y: -0.06, size: 0.13, slantX: -0.32, slantY: 0.0, weight: 1.0, tracking: 0.16 },
      { text: "CLASSIFIED", font: "cinzel", z: 360, x: 0.34, y: 0.16, size: 0.11, slantX: 0.5, slantY: 0.08, weight: 0.82, tracking: 0.28 },
      { text: "EYES ONLY", font: "cinzel", z: 600, x: -0.36, y: -0.2, size: 0.1, slantX: -0.55, slantY: -0.06, weight: 0.78, tracking: 0.3 },
      { text: "EST 2026", font: "dm", z: 820, x: 0.06, y: 0.3, size: 0.075, slantX: 0.12, slantY: 0.42, weight: 0.62, tracking: 0.4 },
      { text: "CLASSIFIED", font: "cinzel", z: 1010, x: -0.3, y: 0.04, size: 0.105, slantX: -0.46, slantY: 0.0, weight: 0.7, tracking: 0.26 },
      { text: "EYES ONLY", font: "cinzel", z: 1180, x: 0.3, y: -0.26, size: 0.09, slantX: 0.5, slantY: -0.04, weight: 0.66, tracking: 0.3 },
    ];

    // Background light shafts (drifting volumetric beams) — depth-cued.
    type Shaft = { z: number; angle: number; reach: number; lift: number };
    const SHAFTS: Shaft[] = [
      { z: 280, angle: -0.5, reach: 1.1, lift: -0.3 },
      { z: 700, angle: 0.6, reach: 1.25, lift: 0.2 },
      { z: 1120, angle: -0.35, reach: 1.0, lift: -0.15 },
    ];

    // Floating dust motes drifting in the depth of field.
    type Mote = { z: number; x: number; y: number; r: number; ph: number };
    const MOTES: Mote[] = [];
    for (let i = 0; i < 70; i++) {
      MOTES.push({
        z: Math.random() * LOOP,
        x: (Math.random() - 0.5) * 1.4,
        y: (Math.random() - 0.5) * 1.2,
        r: 0.4 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
      });
    }

    // Project a world depth (relative to camera) + plane offset to screen.
    // relZ must be > 0 (in front of camera).
    const project = (relZ: number, ox: number, oy: number) => {
      const f = (FOCAL * MIN) / relZ;
      return { sx: cx + ox * MIN * f, sy: cy + oy * MIN * f, scale: f };
    };

    // Depth fog: how visible something at relZ is (0 invisible far, 1 near).
    const fogAlpha = (relZ: number) => {
      // fade in as it emerges from FAR, fade out hard as it passes NEAR lens
      const farFade = smooth((FAR - relZ) / (FAR * 0.55));
      const nearFade = smooth((relZ - NEAR) / 260);
      return clamp01(farFade) * clamp01(nearFade);
    };

    // ---- Offscreen grain tile ----
    const grain = document.createElement("canvas");
    const gctx = grain.getContext("2d");
    const GRAIN_SIZE = 140;
    grain.width = GRAIN_SIZE;
    grain.height = GRAIN_SIZE;
    const buildGrain = () => {
      if (!gctx) return;
      const img = gctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
    };
    buildGrain();

    // ---- Draw a single word "engraved" in perspective ----
    const drawWord = (w: Word, camZ: number) => {
      // relative depth, wrapped into the visible band
      let relZ = w.z - camZ;
      relZ = ((relZ % LOOP) + LOOP) % LOOP; // 0..LOOP ahead of camera
      if (relZ < NEAR || relZ > FAR) return;

      const a = fogAlpha(relZ);
      if (a <= 0.01) return;

      const p = project(relZ, w.x, w.y);
      const px = p.sx;
      const py = p.sy;
      const glyphH = w.size * MIN * p.scale;
      if (glyphH < 1.2) return;

      // Near-pass light catch: words brighten sharply as they near the lens.
      const nearness = smooth((1100 - relZ) / 1100);
      const lightCatch = smooth((900 - relZ) / 700);

      const fontFam =
        w.font === "cinzel"
          ? 'var(--font-cinzel), "Cinzel", Georgia, serif'
          : 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif';

      ctx.save();
      ctx.translate(px, py);
      // perspective skew: the word sits on a turned surface
      ctx.transform(1, w.slantY * (0.6 + nearness * 0.4), w.slantX * (0.55 + nearness * 0.45), 1, 0, 0);

      ctx.font = `${w.font === "cinzel" ? "600" : "500"} ${glyphH}px ${fontFam}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // letter-spacing emulation by manual glyph layout
      const tracking = glyphH * w.tracking;
      const chars = w.text.split("");
      let totalW = 0;
      const widths = chars.map((c) => {
        const cw = ctx.measureText(c).width;
        totalW += cw + tracking;
        return cw;
      });
      totalW -= tracking;
      let penX = -totalW / 2;

      const bright = w.weight * a;
      // soft outer glow (bloom) — stronger as it nears the lens
      const glow = (0.35 + lightCatch * 0.65) * bright;

      // shadow drop to seat the type onto its surface
      const seatA = 0.5 * a;

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        const cw = widths[i];
        const gx = penX + cw / 2;

        // engraved seat shadow (dark, offset down-right into the surface)
        ctx.fillStyle = `rgba(0,0,0,${seatA})`;
        ctx.fillText(c, gx + glyphH * 0.03, glyphH * 0.05);

        // gold body with a vertical light gradient (catches light at top)
        const grad = ctx.createLinearGradient(gx, -glyphH * 0.55, gx, glyphH * 0.55);
        const topMix = 0.5 + lightCatch * 0.5;
        grad.addColorStop(0, `rgba(${GOLD_LIGHT}, ${bright})`);
        grad.addColorStop(0.45, `rgba(${GOLD}, ${bright})`);
        grad.addColorStop(1, `rgba(${GOLD}, ${bright * (0.55 + topMix * 0.25)})`);
        ctx.fillStyle = grad;

        ctx.shadowColor = `rgba(${GOLD_LIGHT}, ${glow})`;
        ctx.shadowBlur = glyphH * (0.25 + lightCatch * 0.55);
        ctx.fillText(c, gx, 0);

        // specular highlight sweep — a brighter rim on the upper edge
        if (lightCatch > 0.15) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 244, 214, ${0.18 * lightCatch * a})`;
          ctx.fillText(c, gx, -glyphH * 0.02);
        }

        penX += cw + tracking;
      }
      ctx.restore();
    };

    // ---- Draw a drifting light shaft (volumetric beam) ----
    const drawShaft = (s: Shaft, camZ: number, time: number) => {
      let relZ = s.z - camZ;
      relZ = ((relZ % LOOP) + LOOP) % LOOP;
      if (relZ < NEAR || relZ > FAR) return;
      const a = fogAlpha(relZ) * 0.5;
      if (a <= 0.01) return;

      const drift = Math.sin(time * 0.0003 + s.z) * 0.04;
      const p = project(relZ, drift, s.lift);
      const len = s.reach * MIN * p.scale;
      const wd = 0.18 * MIN * p.scale;

      ctx.save();
      ctx.translate(p.sx, p.sy);
      ctx.rotate(s.angle + drift);
      const g = ctx.createLinearGradient(0, -len, 0, len);
      g.addColorStop(0, `rgba(${GOLD_LIGHT}, 0)`);
      g.addColorStop(0.5, `rgba(${GOLD}, ${a})`);
      g.addColorStop(1, `rgba(${GOLD_LIGHT}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(-wd * 0.25, -len);
      ctx.lineTo(wd * 0.25, -len);
      ctx.lineTo(wd, len);
      ctx.lineTo(-wd, len);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // ---- Draw a dust mote ----
    const drawMote = (m: Mote, camZ: number, time: number) => {
      let relZ = m.z - camZ;
      relZ = ((relZ % LOOP) + LOOP) % LOOP;
      if (relZ < NEAR || relZ > FAR) return;
      const a = fogAlpha(relZ) * 0.6;
      if (a <= 0.01) return;
      const sway = Math.sin(time * 0.0008 + m.ph) * 0.02;
      const p = project(relZ, m.x + sway, m.y + Math.cos(time * 0.0006 + m.ph) * 0.02);
      const r = m.r * p.scale * 0.9;
      if (r < 0.2) return;
      const tw = 0.5 + 0.5 * Math.sin(time * 0.004 + m.ph * 3);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${a * (0.4 + tw * 0.6)})`;
      ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // ---- Animation loop ----
    let raf = 0;
    let start = 0;
    const SPEED = LOOP / 22000; // world units per ms -> 22s per seamless loop

    const render = (now: number) => {
      if (!start) start = now;
      const time = now - start;
      const camZ = time * SPEED; // monotonic; everything wraps mod LOOP

      // base background with subtle warm depth wash
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // deep radial fog glow at the vanishing point (warm core of the corridor)
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, MIN * 0.85);
      core.addColorStop(0, "rgba(46, 34, 14, 0.9)");
      core.addColorStop(0.4, "rgba(26, 20, 10, 0.5)");
      core.addColorStop(1, "rgba(12, 10, 8, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, W, H);

      // additive layer for emissive elements
      ctx.globalCompositeOperation = "lighter";

      // light shafts (behind type)
      for (const s of SHAFTS) drawShaft(s, camZ, time);

      // depth-sorted draw of words + motes (far first)
      type Drawable = { relZ: number; kind: "word" | "mote"; ref: Word | Mote };
      const items: Drawable[] = [];
      for (const w of WORDS) {
        let rz = w.z - camZ;
        rz = ((rz % LOOP) + LOOP) % LOOP;
        items.push({ relZ: rz, kind: "word", ref: w });
      }
      for (const m of MOTES) {
        let rz = m.z - camZ;
        rz = ((rz % LOOP) + LOOP) % LOOP;
        items.push({ relZ: rz, kind: "mote", ref: m });
      }
      items.sort((a, b) => b.relZ - a.relZ);
      for (const it of items) {
        if (it.kind === "word") drawWord(it.ref as Word, camZ);
        else drawMote(it.ref as Mote, camZ, time);
      }

      ctx.globalCompositeOperation = "source-over";

      // soft horizon fog band to sink far type into haze
      const haze = ctx.createLinearGradient(0, cy - MIN * 0.5, 0, cy + MIN * 0.5);
      haze.addColorStop(0, "rgba(12,10,8,0.0)");
      haze.addColorStop(0.5, "rgba(20,15,8,0.12)");
      haze.addColorStop(1, "rgba(12,10,8,0.0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // cinematic vignette
      const vig = ctx.createRadialGradient(cx, cy, MIN * 0.32, cx, cy, MIN * 0.82);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(0.7, "rgba(0,0,0,0.28)");
      vig.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // film grain (re-seed every few frames, tile across frame)
      if ((time | 0) % 80 < 17) buildGrain();
      ctx.globalAlpha = 0.05;
      ctx.globalCompositeOperation = "overlay";
      const offX = (Math.random() * GRAIN_SIZE) | 0;
      const offY = (Math.random() * GRAIN_SIZE) | 0;
      for (let yy = -offY; yy < H; yy += GRAIN_SIZE) {
        for (let xx = -offX; xx < W; xx += GRAIN_SIZE) {
          ctx.drawImage(grain, xx, yy);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // ---- Cleanup ----
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
