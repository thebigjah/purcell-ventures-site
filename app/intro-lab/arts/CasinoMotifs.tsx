"use client";

import { useEffect, useRef } from "react";

/**
 * CasinoMotifs — a Saul-Bass / Casino Royale title-sequence in gold on black.
 * Bold flat-gold playing-card suits (spade, heart, diamond, club) deal across
 * the frame in rhythmic waves, casino chips slide in and stack with a settle
 * bounce, and a spinning roulette wheel rotates with a ball orbiting and
 * dropping into a pocket — all choreographed to a single looping beat. Layered
 * with warm radial glow, bloom, vignette, and procedural film grain. Seamless.
 */
export default function CasinoMotifs() {
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
    const GOLD_DEEP = "150,114,30";
    const HOT = "255,247,219";

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

    // ---- Timing ----
    // One full loop. Everything below is phased against tNorm (0..1) so the
    // last frame matches the first.
    const PERIOD = 14000; // ms
    let start = performance.now();
    let raf = 0;

    // ---- Easing helpers ----
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutBack = (t: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    // smooth 0->1->0 pulse over a [a,b] window of the loop
    const pulse = (t: number, a: number, b: number) => {
      if (t < a || t > b) return 0;
      const u = (t - a) / (b - a);
      return Math.sin(u * Math.PI);
    };
    // clamped ramp 0->1 over [a,b]
    const ramp = (t: number, a: number, b: number) =>
      t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a);

    // ---- Reference scale: art is composed in a virtual 1000-unit field,
    // then fit + centered to the viewport so it stays graphic at any size. ----
    const fit = () => {
      const s = Math.min(W, H) / 1000;
      return { s, ox: W / 2, oy: H / 2 };
    };

    // ============================================================
    //  SUIT PATH DRAWING (flat, bold, Saul-Bass silhouettes)
    //  Each draws centered at (0,0), unit ~radius r, in current fillStyle.
    // ============================================================
    const pathSpade = (r: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.95, r * 0.05, r * 0.6, r * 0.55, r * 0.16, r * 0.32);
      ctx.bezierCurveTo(r * 0.28, r * 0.55, r * 0.34, r * 0.7, r * 0.5, r * 0.95);
      ctx.lineTo(-r * 0.5, r * 0.95);
      ctx.bezierCurveTo(-r * 0.34, r * 0.7, -r * 0.28, r * 0.55, -r * 0.16, r * 0.32);
      ctx.bezierCurveTo(-r * 0.6, r * 0.55, -r * 0.95, r * 0.05, 0, -r);
      ctx.closePath();
    };
    const pathHeart = (r: number) => {
      ctx.beginPath();
      ctx.moveTo(0, r * 0.92);
      ctx.bezierCurveTo(r * 1.05, r * 0.18, r * 0.62, -r * 0.78, 0, -r * 0.18);
      ctx.bezierCurveTo(-r * 0.62, -r * 0.78, -r * 1.05, r * 0.18, 0, r * 0.92);
      ctx.closePath();
    };
    const pathDiamond = (r: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.34, -r * 0.42, r * 0.72, 0, r * 0.72, 0);
      ctx.bezierCurveTo(r * 0.72, 0, r * 0.34, r * 0.42, 0, r);
      ctx.bezierCurveTo(-r * 0.34, r * 0.42, -r * 0.72, 0, -r * 0.72, 0);
      ctx.bezierCurveTo(-r * 0.72, 0, -r * 0.34, -r * 0.42, 0, -r);
      ctx.closePath();
    };
    const pathClub = (r: number) => {
      const cr = r * 0.42;
      ctx.beginPath();
      ctx.arc(0, -r * 0.45, cr, 0, Math.PI * 2);
      ctx.arc(-r * 0.5, r * 0.12, cr, 0, Math.PI * 2);
      ctx.arc(r * 0.5, r * 0.12, cr, 0, Math.PI * 2);
      ctx.closePath();
      // stem
      ctx.moveTo(-r * 0.14, r * 0.1);
      ctx.bezierCurveTo(-r * 0.18, r * 0.55, -r * 0.34, r * 0.78, -r * 0.5, r * 0.95);
      ctx.lineTo(r * 0.5, r * 0.95);
      ctx.bezierCurveTo(r * 0.34, r * 0.78, r * 0.18, r * 0.55, r * 0.14, r * 0.1);
      ctx.closePath();
    };

    type SuitKind = 0 | 1 | 2 | 3;
    const drawSuit = (kind: SuitKind, r: number) => {
      if (kind === 0) pathSpade(r);
      else if (kind === 1) pathHeart(r);
      else if (kind === 2) pathDiamond(r);
      else pathClub(r);
      ctx.fill();
    };

    // Gold gradient fill for a motif (vertical metallic sheen).
    const goldFill = (cy: number, h: number, bright = 1) => {
      const g = ctx.createLinearGradient(0, cy - h, 0, cy + h);
      g.addColorStop(0, `rgba(${GOLD_LIGHT},${0.98 * bright})`);
      g.addColorStop(0.45, `rgba(${GOLD},${1 * bright})`);
      g.addColorStop(0.55, `rgba(${HOT},${bright})`);
      g.addColorStop(0.7, `rgba(${GOLD},${1 * bright})`);
      g.addColorStop(1, `rgba(${GOLD_DEEP},${0.95 * bright})`);
      return g;
    };

    const drawGlow = (
      sx: number,
      sy: number,
      radius: number,
      rgb: string,
      a: number
    ) => {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(0.5, `rgba(${rgb},${a * 0.32})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // ============================================================
    //  ROULETTE WHEEL
    // ============================================================
    const drawRoulette = (
      cx: number,
      cy: number,
      R: number,
      wheelAngle: number,
      ballAngle: number,
      ballR: number,
      hub: number // 0..1 hub bloom pulse
    ) => {
      const POCKETS = 18; // graphic, not literal 37
      ctx.save();
      ctx.translate(cx, cy);

      // Outer rim ring.
      ctx.lineWidth = R * 0.06;
      ctx.strokeStyle = `rgba(${GOLD},0.9)`;
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = R * 0.02;
      ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.7)`;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.965, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating pocket field.
      ctx.save();
      ctx.rotate(wheelAngle);
      const inner = R * 0.55;
      const outer = R * 0.93;
      for (let i = 0; i < POCKETS; i++) {
        const a0 = (i / POCKETS) * Math.PI * 2;
        const a1 = ((i + 1) / POCKETS) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(0, 0, outer, a0, a1);
        ctx.arc(0, 0, inner, a1, a0, true);
        ctx.closePath();
        // alternate filled gold / hollow (black) pockets
        ctx.fillStyle =
          i % 2 === 0 ? `rgba(${GOLD},0.92)` : `rgba(${GOLD_DEEP},0.18)`;
        ctx.fill();
        // pocket fret lines
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.55)`;
        ctx.lineWidth = R * 0.006;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a0) * inner, Math.sin(a0) * inner);
        ctx.lineTo(Math.cos(a0) * outer, Math.sin(a0) * outer);
        ctx.stroke();
      }
      ctx.restore();

      // Inner hub ring + spokes (rotating with the wheel, slight bloom pulse).
      ctx.save();
      ctx.rotate(-wheelAngle * 0.6);
      ctx.strokeStyle = `rgba(${GOLD},0.9)`;
      ctx.lineWidth = R * 0.02;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.5, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * R * 0.5, Math.sin(a) * R * 0.5);
        ctx.lineWidth = R * 0.014;
        ctx.strokeStyle = `rgba(${GOLD_LIGHT},0.7)`;
        ctx.stroke();
      }
      ctx.restore();

      // Center turret.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      drawGlow(0, 0, R * (0.26 + 0.06 * hub), GOLD_LIGHT, 0.55 + 0.35 * hub);
      ctx.restore();
      ctx.fillStyle = goldFill(0, R * 0.16);
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${HOT},${0.7 + 0.3 * hub})`;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.045, 0, Math.PI * 2);
      ctx.fill();

      // The ball: orbits on the track, with a hot trail.
      const bx = Math.cos(ballAngle) * ballR;
      const by = Math.sin(ballAngle) * ballR;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      // short trail
      const TR = 0.5;
      const grd = ctx.createLinearGradient(
        Math.cos(ballAngle - TR) * ballR,
        Math.sin(ballAngle - TR) * ballR,
        bx,
        by
      );
      grd.addColorStop(0, `rgba(${GOLD_LIGHT},0)`);
      grd.addColorStop(1, `rgba(${HOT},0.6)`);
      ctx.strokeStyle = grd;
      ctx.lineWidth = R * 0.05;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, 0, ballR, ballAngle - TR, ballAngle);
      ctx.stroke();
      drawGlow(bx, by, R * 0.16, HOT, 0.9);
      ctx.restore();
      ctx.fillStyle = `rgba(${HOT},1)`;
      ctx.beginPath();
      ctx.arc(bx, by, R * 0.045, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // ============================================================
    //  CHIP
    // ============================================================
    const drawChip = (
      cx: number,
      cy: number,
      r: number,
      spin: number, // perspective squash phase
      bright: number
    ) => {
      // Faux-3D: squash vertically to suggest a tilted disc spinning toward us.
      const sq = 0.42 + 0.58 * Math.abs(Math.cos(spin));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, sq);

      // edge thickness
      ctx.fillStyle = `rgba(${GOLD_DEEP},${0.9 * bright})`;
      ctx.beginPath();
      ctx.ellipse(0, r * 0.16, r, r, 0, 0, Math.PI * 2);
      ctx.fill();

      // face
      ctx.fillStyle = goldFill(0, r * 1.1, bright);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // outer ring
      ctx.lineWidth = r * 0.1;
      ctx.strokeStyle = `rgba(${GOLD_DEEP},${0.8 * bright})`;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2);
      ctx.stroke();

      // edge spots (the classic chip dashes)
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + spin * 0.2;
        ctx.fillStyle = `rgba(${HOT},${0.75 * bright})`;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92, r * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // inner emblem: tiny suit pip (near-black, cut into the gold face)
      ctx.fillStyle = "rgba(12,10,8,0.85)";
      const pip = ((Math.floor(spin) % 4) + 4) % 4;
      drawSuit(pip as SuitKind, r * 0.4);

      ctx.restore();
    };

    // ============================================================
    //  CHOREOGRAPHY
    // ============================================================
    // Dealing rows of suits: 4 suits sweep across the upper field in sequence.
    type Deal = {
      kind: SuitKind;
      y: number;
      r: number;
      tStart: number; // when it begins entering (0..1)
      tDur: number; // travel duration (fraction of loop)
      dir: number; // +1 L->R, -1 R->L
      flip: boolean; // does it flip on entry
    };
    const deals: Deal[] = [
      { kind: 0, y: -300, r: 88, tStart: 0.02, tDur: 0.5, dir: 1, flip: true },
      { kind: 1, y: -130, r: 78, tStart: 0.1, tDur: 0.5, dir: -1, flip: false },
      { kind: 2, y: 40, r: 78, tStart: 0.18, tDur: 0.5, dir: 1, flip: true },
      { kind: 3, y: 210, r: 88, tStart: 0.26, tDur: 0.5, dir: -1, flip: false },
    ];

    // Chip stack assembling at lower-left, then the whole composition gives way
    // to the roulette wheel emerging center for the back half of the loop.
    const NUM_CHIPS = 5;

    // ---- Main draw ----
    const frame = (now: number) => {
      const tNorm = ((now - start) % PERIOD) / PERIOD;
      const tSec = (now - start) / 1000;
      const { s, ox, oy } = fit();

      // Background: warm near-black with a faint radial lift.
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
      bgGrad.addColorStop(0, "rgba(46,36,18,0.5)");
      bgGrad.addColorStop(0.5, "rgba(20,16,10,0.34)");
      bgGrad.addColorStop(1, "rgba(12,10,8,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Map virtual field -> screen.
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);

      // ---------- PHASE A: deal suits (front half), then they fan off ----------
      // The deck-deal dominates 0..0.55; suits then drift & fade as the wheel
      // rises. We keep them gently present so the loop never feels empty.
      for (const d of deals) {
        // Looping travel: position eases across the field during its window,
        // and a faint "resting" ghost remains for rhythm.
        const local = ramp(tNorm, d.tStart, d.tStart + d.tDur);
        const eased = easeOutCubic(local);
        const span = 1400; // virtual travel width
        const x = d.dir * (-span / 2 + eased * span);

        // entry flip (rotate Y by faux scaleX)
        let rot = 0;
        let sx = 1;
        if (d.flip) {
          const fp = ramp(tNorm, d.tStart, d.tStart + 0.18);
          sx = Math.cos((1 - fp) * Math.PI); // -1 -> 1
          if (sx === 0) sx = 0.001;
        } else {
          rot = (1 - easeOutCubic(local)) * d.dir * 0.5;
        }

        // visibility envelope: appear during travel, soften after.
        const appear = ramp(tNorm, d.tStart, d.tStart + 0.06);
        const fade =
          tNorm > 0.62 ? 1 - ramp(tNorm, 0.62, 0.78) * 0.72 : 1;
        const alpha = appear * fade;
        if (alpha <= 0.01) continue;

        // settle bob
        const settle =
          local >= 1 ? Math.sin(tSec * 1.6 + d.y) * 6 : 0;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, d.y + settle);
        ctx.rotate(rot);
        ctx.scale(sx, 1);

        // bloom behind
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        drawGlow(0, 0, d.r * 2.2, GOLD, 0.28 * alpha);
        ctx.restore();

        // motif
        ctx.fillStyle = goldFill(0, d.r * 1.1);
        drawSuit(d.kind, d.r);

        // rim highlight stroke
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = `rgba(${HOT},${0.5 * alpha})`;
        drawSuit(d.kind, d.r);
        ctx.stroke();

        ctx.restore();
      }

      // ---------- Chip stack (slides in lower-left, settles, restacks) ----------
      // Chips fly in one by one and stack; the stack subtly breathes.
      const stackBaseX = -300;
      const stackBaseY = 330;
      for (let i = 0; i < NUM_CHIPS; i++) {
        const ci = i / NUM_CHIPS;
        const inAt = 0.08 + ci * 0.07;
        const inProg = ramp(tNorm, inAt, inAt + 0.16);
        if (inProg <= 0) continue;
        const e = easeOutBack(Math.min(1, inProg));
        const fromX = -800;
        const targetX = stackBaseX + Math.sin(i * 1.3) * 10;
        const x = fromX + (targetX - fromX) * easeOutCubic(Math.min(1, inProg));
        const targetY = stackBaseY - i * 42;
        const y = targetY - (1 - e) * 200; // drops into place
        const fade =
          tNorm > 0.64 ? 1 - ramp(tNorm, 0.64, 0.8) * 0.7 : 1;
        const spin = tSec * 0.5 + i;
        ctx.save();
        ctx.globalAlpha = Math.min(1, inProg) * fade;
        drawChip(x, y, 64, spin, 1);
        ctx.restore();
      }

      // A couple of chips also tumble across mid-frame for kinetic punctuation.
      for (let i = 0; i < 3; i++) {
        const phase = (tNorm + i * 0.33) % 1;
        const travel = pulse(phase, 0.0, 0.55);
        if (travel <= 0.01) continue;
        const x = -700 + easeInOutCubic(Math.min(1, phase / 0.55)) * 1400;
        const y = -260 + i * 230 + Math.sin(phase * Math.PI) * -120;
        ctx.save();
        ctx.globalAlpha = travel * 0.85;
        drawChip(x, y, 40, tSec * 3 + i * 2, 0.95);
        ctx.restore();
      }

      // ---------- ROULETTE WHEEL (rises center, back half) ----------
      // Wheel scales up from the center turret and dominates 0.5..1.0, then
      // recedes into the deal cycle to close the loop seamlessly.
      const wheelIn = ramp(tNorm, 0.42, 0.62);
      const wheelOut = 1 - ramp(tNorm, 0.9, 1.0); // shrink back to nothing by loop end
      const wheelPresence = Math.min(wheelIn, easeInOutCubic(wheelOut));
      if (wheelPresence > 0.01) {
        const we = easeOutCubic(wheelIn) * easeInOutCubic(wheelOut);
        const R = 250 * we;
        // Wheel decelerates as the ball drops — classic settle.
        const spinSpeed = 1 - 0.6 * ramp(tNorm, 0.7, 0.95);
        const wheelAngle = tSec * 1.1 * spinSpeed;
        // Ball orbits opposite, faster, spiraling inward then dropping.
        const ballPhase = ramp(tNorm, 0.46, 0.92);
        const ballSpin = -tSec * 3.4 * (1 - 0.7 * ballPhase);
        const trackOuter = R * 0.97;
        const trackInner = R * 0.6;
        const ballR =
          trackOuter - (trackOuter - trackInner) * easeInOutCubic(ballPhase);
        const hub = 0.5 + 0.5 * Math.sin(tSec * 2.0);

        ctx.save();
        ctx.globalAlpha = Math.min(1, wheelPresence + 0.0);
        drawRoulette(0, 0, R, wheelAngle, ballSpin, ballR, hub);
        ctx.restore();
      }

      ctx.restore(); // end virtual field transform

      // ---------- Global bloom sweep (a soft light bar crossing) ----------
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const sweepX = ((tNorm * 1.3) % 1) * (W + 400) - 200;
      const sweep = ctx.createLinearGradient(sweepX - 160, 0, sweepX + 160, 0);
      sweep.addColorStop(0, `rgba(${GOLD},0)`);
      sweep.addColorStop(0.5, `rgba(${GOLD_LIGHT},0.05)`);
      sweep.addColorStop(1, `rgba(${GOLD},0)`);
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // ---------- Vignette ----------
      const vg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.26,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.74
      );
      vg.addColorStop(0, "rgba(12,10,8,0)");
      vg.addColorStop(0.6, "rgba(12,10,8,0.32)");
      vg.addColorStop(0.85, "rgba(12,10,8,0.8)");
      vg.addColorStop(1, "rgba(12,10,8,0.98)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ---------- Film grain (procedural, cheap) ----------
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
      start = performance.now() - PERIOD * 0.55; // representative wheel frame
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
