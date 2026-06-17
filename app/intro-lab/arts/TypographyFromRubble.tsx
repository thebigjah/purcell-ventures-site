"use client";

import { useEffect, useRef } from "react";

/**
 * TypographyFromRubble — a Kingsman "typography from rubble" title beat.
 *
 * A cloud of gold fragments and debris hurtles in from off-frame and assembles
 * in mid-air into a crisp "PURCELL VENTURES" wordmark (Cinzel), letters snapping
 * into place out of chaos with motion-blur on the inrush and a settling shimmer.
 * The wordmark holds proud, then detonates back into scattering fragments that
 * re-form to loop seamlessly.
 *
 * Self-contained, no props, no deps. Canvas 2D (no WebGL). ~7.2s seamless loop.
 */
export default function TypographyFromRubble() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BG = "#0c0a08";

    const LOOP_MS = 7200;
    // Phase boundaries within the loop (fractions of LOOP_MS).
    const ASSEMBLE_END = 0.34; // fragments rush in and snap into the wordmark
    const SNAP_AT = 0.34; // moment of crisp lock
    const HOLD_END = 0.66; // wordmark holds proud with a settling shimmer
    const EXPLODE_AT = 0.66; // detonates back into rubble
    // remainder (0.66..1.0): scatter + drift, looping back into assembly

    let width = 0;
    let height = 0;
    let dpr = 1;
    let diag = 1;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
    const easeInCubic = (t: number) => t * t * t;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    type Fragment = {
      // target (the resting pixel inside the wordmark)
      tx: number;
      ty: number;
      // a per-fragment scatter origin/destination (chaos point off toward an edge)
      ox: number;
      oy: number;
      ex: number;
      ey: number;
      size: number;
      hot: number; // 0..1 toward white-hot
      hue: number; // 0 = deep gold, 1 = light gold
      // staggering so letters snap in roughly left-to-right with jitter
      delay: number; // 0..1 fraction of assemble window
      spin: number;
      // settle shimmer params
      shA: number;
      shP: number;
    };

    let fragments: Fragment[] = [];
    let built = false;
    let lastBuildW = 0;
    let lastBuildH = 0;

    // ---- Build the wordmark target field by sampling rendered glyph pixels ----
    const buildFragments = () => {
      fragments = [];
      built = false;
      if (width < 2 || height < 2) return;

      // Offscreen text raster, sized to the live canvas.
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(width));
      off.height = Math.max(1, Math.round(height));
      const octx = off.getContext("2d");
      if (!octx) return;

      const cx = width / 2;
      const cy = height / 2;

      // Two stacked lines so the wordmark reads big on wide and tall frames.
      const lines = ["PURCELL", "VENTURES"];
      const family =
        'var(--font-cinzel), "Cinzel", "Trajan Pro", Georgia, serif';

      // Fit font size to width with generous tracking.
      const fitLine = (text: string, maxW: number, letterSpace: number) => {
        let fs = Math.min(height * 0.34, maxW);
        for (let i = 0; i < 24; i++) {
          octx.font = `600 ${fs}px ${family}`;
          let w = 0;
          for (const ch of text) w += octx.measureText(ch).width + letterSpace;
          w -= letterSpace;
          if (w <= maxW) break;
          fs *= maxW / w;
        }
        return fs;
      };

      const maxW = width * 0.84;
      const tracking = Math.max(2, width * 0.012);
      let fs = Math.min(
        fitLine(lines[0], maxW, tracking),
        fitLine(lines[1], maxW, tracking)
      );
      fs = Math.max(8, fs);

      octx.font = `600 ${fs}px ${family}`;
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";

      const lineGap = fs * 1.12;
      const totalH = lineGap * (lines.length - 1);

      // Draw each line letter-by-letter with manual tracking, centered.
      lines.forEach((text, li) => {
        let lineW = 0;
        for (const ch of text) lineW += octx.measureText(ch).width + tracking;
        lineW -= tracking;
        let x = cx - lineW / 2;
        const y = cy - totalH / 2 + li * lineGap;
        for (const ch of text) {
          octx.fillText(ch, x, y);
          x += octx.measureText(ch).width + tracking;
        }
      });

      // Sample the raster on a grid; each lit pixel becomes a fragment target.
      const img = octx.getImageData(0, 0, off.width, off.height);
      const data = img.data;
      // Step controls particle count: denser on small screens, capped overall.
      const targetCount = Math.min(2400, Math.max(700, (width * height) / 1400));
      // Estimate lit pixels by sampling coarsely first.
      let lit = 0;
      const coarse = 6;
      for (let y = 0; y < off.height; y += coarse) {
        for (let x = 0; x < off.width; x += coarse) {
          if (data[(y * off.width + x) * 4 + 3] > 80) lit++;
        }
      }
      lit = Math.max(1, lit);
      const litFull = lit * coarse * coarse;
      let step = Math.max(2, Math.round(Math.sqrt(litFull / targetCount)));

      const cx2 = width / 2;
      const cy2 = height / 2;

      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const a = data[(y * off.width + x) * 4 + 3];
          if (a < 80) continue;
          const tx = x + (Math.random() - 0.5) * step * 0.7;
          const ty = y + (Math.random() - 0.5) * step * 0.7;

          // Chaos origin: out beyond a frame edge, biased horizontally for a
          // sweeping inrush, with depth-ish variance baked into size/speed.
          const oa = rand(0, Math.PI * 2);
          const orad = diag * rand(0.55, 1.05);
          const ox = cx2 + Math.cos(oa) * orad * rand(1.0, 1.6);
          const oy = cy2 + Math.sin(oa) * orad;

          // Explosion destination: blast radially outward from its own target.
          const ea = Math.atan2(ty - cy2, tx - cx2) + rand(-0.5, 0.5);
          const erad = diag * rand(0.6, 1.15);
          const ex = tx + Math.cos(ea) * erad;
          const ey = ty + Math.sin(ea) * erad;

          // Left-to-right snap stagger keyed to horizontal position + jitter.
          const delay = Math.min(
            0.92,
            Math.max(0, (tx / width) * 0.55 + rand(-0.12, 0.16))
          );

          fragments.push({
            tx,
            ty,
            ox,
            oy,
            ex,
            ey,
            size: rand(0.9, 2.6),
            hot: rand(0, 1),
            hue: Math.random(),
            delay,
            spin: rand(-1, 1),
            shA: rand(0.5, 1.4),
            shP: rand(0, Math.PI * 2),
          });
        }
      }

      built = fragments.length > 0;
      lastBuildW = width;
      lastBuildH = height;
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
      // Rebuild the target field when geometry meaningfully changes.
      if (
        Math.abs(width - lastBuildW) > 4 ||
        Math.abs(height - lastBuildH) > 4 ||
        !built
      ) {
        buildFragments();
      }
    };

    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // Fonts may load after first paint; rebuild once they're ready.
    const docFonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (docFonts && docFonts.ready) {
      docFonts.ready.then(() => buildFragments()).catch(() => {});
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

    // Colour helper: blend deep gold -> light gold -> white-hot.
    const fragColor = (hue: number, hot: number, alpha: number) => {
      // base gold ramp
      let r: number, g: number, b: number;
      if (hue < 0.5) {
        const k = hue / 0.5;
        r = 196 + k * 16;
        g = 155 + k * 20;
        b = 45 + k * 10;
      } else {
        const k = (hue - 0.5) / 0.5;
        r = 212 + k * 24;
        g = 175 + k * 26;
        b = 55 + k * 51;
      }
      // mix toward white-hot
      r = r + (255 - r) * hot;
      g = g + (255 - g) * hot;
      b = b + (250 - b) * hot;
      return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
    };

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

      const total = now - startTime;
      const elapsed = total % LOOP_MS;
      const phase = elapsed / LOOP_MS; // 0..1

      const cx = width / 2;
      const cy = height / 2;

      // ---------- Background ----------
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // Warm radial floor, brightest while the wordmark is locked.
      let formed = 0; // 0 = scattered, 1 = fully formed
      if (phase < SNAP_AT) formed = easeOutQuint(phase / ASSEMBLE_END);
      else if (phase < HOLD_END) formed = 1;
      else formed = 1 - easeInCubic((phase - EXPLODE_AT) / (1 - EXPLODE_AT));

      const baseVg = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.72);
      baseVg.addColorStop(0, `rgba(48,34,12,${0.18 + formed * 0.26})`);
      baseVg.addColorStop(0.55, "rgba(22,15,6,0.12)");
      baseVg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = baseVg;
      ctx.fillRect(0, 0, width, height);

      if (built) {
        // Snap flash: a brief percussive bloom at the lock instant.
        let snapFlash = 0;
        const snapWin = 0.06;
        if (phase >= SNAP_AT - snapWin && phase <= SNAP_AT + snapWin) {
          const f = 1 - Math.abs(phase - SNAP_AT) / snapWin;
          snapFlash = Math.pow(Math.max(0, f), 1.4);
        }

        // Shimmer envelope through the hold: a travelling specular sweep.
        let holdT = 0;
        if (phase >= SNAP_AT && phase < HOLD_END) {
          holdT = (phase - SNAP_AT) / (HOLD_END - SNAP_AT);
        }
        const sweepX = cx + (holdT * 2 - 1) * width * 0.75; // L->R light bar
        const sweepW = width * 0.16 + 1;

        // Per-loop time used for shimmer oscillation (seconds).
        const tSec = total / 1000;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        for (const p of fragments) {
          // --- Position by phase ---
          let x: number, y: number;
          let alpha: number;
          let blur = 0; // motion-blur trail length
          let hotBoost = 0;

          if (phase < SNAP_AT) {
            // ASSEMBLE: ease from chaos origin to target, staggered by delay.
            const span = ASSEMBLE_END;
            const local = (phase - p.delay * span) / (span * (1 - p.delay));
            const t = Math.min(1, Math.max(0, local));
            const e = easeOutCubic(t);
            x = p.ox + (p.tx - p.ox) * e;
            y = p.oy + (p.ty - p.oy) * e;
            // motion blur proportional to remaining velocity (1 - e)
            blur = (1 - e) * diag * 0.16;
            alpha = 0.15 + 0.85 * easeOutCubic(t);
            hotBoost = (1 - e) * 0.5 * p.hot;
          } else if (phase < HOLD_END) {
            // HOLD: locked at target with a micro settle wobble + shimmer.
            x = p.tx;
            y = p.ty;
            // settle wobble decays right after snap
            const settle = Math.max(0, 1 - holdT / 0.18);
            const wob = settle * Math.sin(tSec * 22 + p.shP) * p.shA * 1.4;
            x += wob;
            y += Math.cos(tSec * 19 + p.shP) * settle * p.shA * 1.1;
            alpha = 0.95;
            // specular shimmer sweep + gentle twinkle
            const distSweep = Math.abs(p.tx - sweepX);
            const spec =
              distSweep < sweepW ? 1 - distSweep / sweepW : 0;
            const tw = 0.5 + 0.5 * Math.sin(tSec * 3 * p.shA + p.shP);
            hotBoost = spec * 0.9 + snapFlash * 0.8 + tw * 0.1;
          } else {
            // EXPLODE: blast outward from target toward scatter destination.
            const span = 1 - EXPLODE_AT;
            const t = Math.min(1, Math.max(0, (phase - EXPLODE_AT) / span));
            const e = easeInOutCubic(t);
            x = p.tx + (p.ex - p.tx) * e;
            y = p.ty + (p.ey - p.ty) * e;
            blur = easeOutCubic(t) * diag * 0.18 * (1 - t * 0.4);
            alpha = 0.95 * (1 - easeInCubic(t));
            hotBoost = (t < 0.25 ? (1 - t / 0.25) * 0.6 : 0) * p.hot;
          }

          if (alpha <= 0.02) continue;

          const hot = Math.min(1, p.hot * 0.25 + hotBoost);
          const sz = p.size * (0.7 + hot * 0.9);

          // --- Motion-blur streak (drawn as a tapered line behind the head) ---
          if (blur > 1.5) {
            let dx: number, dy: number;
            if (phase < SNAP_AT) {
              dx = p.tx - p.ox;
              dy = p.ty - p.oy;
            } else {
              dx = p.ex - p.tx;
              dy = p.ey - p.ty;
            }
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const trailLen = Math.min(blur, diag * 0.2);
            const tx2 = x - ux * trailLen;
            const ty2 = y - uy * trailLen;
            const g = ctx.createLinearGradient(tx2, ty2, x, y);
            g.addColorStop(0, fragColor(p.hue, 0, 0));
            g.addColorStop(1, fragColor(p.hue, hot, alpha * 0.8));
            ctx.strokeStyle = g;
            ctx.lineWidth = sz * 0.9;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(tx2, ty2);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          // --- Fragment head ---
          ctx.fillStyle = fragColor(p.hue, hot, alpha);
          if (hot > 0.4 || sz > 2) {
            // soft glow for hot/large fragments
            const gr = ctx.createRadialGradient(x, y, 0, x, y, sz * 2.4);
            gr.addColorStop(0, fragColor(p.hue, hot, alpha));
            gr.addColorStop(1, fragColor(p.hue, hot, 0));
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.arc(x, y, sz * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = fragColor(p.hue, Math.min(1, hot + 0.15), alpha);
          ctx.beginPath();
          ctx.arc(x, y, sz, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // --- Snap bloom: a hard centered flash + horizontal flare at lock ---
        if (snapFlash > 0.01) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const maxR = diag * (0.32 + snapFlash * 0.3);
          const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
          fg.addColorStop(0, `rgba(255,250,238,${0.6 * snapFlash})`);
          fg.addColorStop(0.3, `rgba(232,201,106,${0.3 * snapFlash})`);
          fg.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = fg;
          ctx.fillRect(0, 0, width, height);
          // wide anamorphic flare bar across the wordmark
          const barLen = width * 0.7;
          const bg = ctx.createLinearGradient(cx - barLen, cy, cx + barLen, cy);
          bg.addColorStop(0, "rgba(232,201,106,0)");
          bg.addColorStop(0.5, `rgba(255,250,235,${0.5 * snapFlash})`);
          bg.addColorStop(1, "rgba(232,201,106,0)");
          ctx.fillStyle = bg;
          const bh = diag * 0.006 + 1;
          ctx.fillRect(cx - barLen, cy - bh, barLen * 2, bh * 2);
          ctx.restore();
        }

        // --- Soft bloom wash keyed to "formed": makes the locked type glow ---
        if (formed > 0.05) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const ag = ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            diag * 0.34
          );
          ag.addColorStop(0, `rgba(212,175,55,${0.1 * formed})`);
          ag.addColorStop(0.6, `rgba(170,120,40,${0.05 * formed})`);
          ag.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = ag;
          ctx.beginPath();
          ctx.arc(cx, cy, diag * 0.34, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

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
