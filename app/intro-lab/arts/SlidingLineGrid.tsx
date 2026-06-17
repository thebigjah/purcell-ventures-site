"use client";

import { useEffect, useRef } from "react";

/**
 * SlidingLineGrid — Saul Bass "North by Northwest" title-sequence architecture.
 *
 * Thin gold lines slide in from all four frame edges on precise eased timing
 * and lock into a modernist building elevation (a blueprint façade of mullions,
 * floor slabs and window bays), holding crisp for a beat with faint glow at the
 * intersections, then sliding back out and reassembling a DIFFERENT façade to
 * loop seamlessly.
 *
 * Canvas-2D only. No deps, no WebGL. Responsive via vmin-derived scale.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 9200; // one full assemble→hold→disassemble cycle

// Phase boundaries (fractions of LOOP_MS)
const IN_START = 0.0;
const IN_END = 0.34; // lines finished sliding in & locked
const HOLD_END = 0.62; // façade holds, crisp
const OUT_END = 0.94; // lines finished sliding out
// 0.94..1.0 = empty beat / re-seed for seamless reassembly

// ---- easing ----
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type Edge = "L" | "R" | "T" | "B";

// A line in the assembled façade. Defined in normalized [0,1] frame coords.
// orient "v" = vertical line (constant x, spans y0..y1); "h" = horizontal.
type FacadeLine = {
  orient: "v" | "h";
  pos: number; // x for vertical, y for horizontal
  a: number; // span start (normalized)
  b: number; // span end (normalized)
  edge: Edge; // which edge it slides in from / out to
  delay: number; // 0..1 stagger within the slide phase
  weight: number; // stroke weight multiplier (structural emphasis)
};

// Deterministic seeded RNG so each "design" is stable across frames.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// Build a modernist building-elevation grid as a set of sliding lines.
// `variant` (0..N) picks a different proportion system each loop.
function buildFacade(variant: number): FacadeLine[] {
  const rng = makeRng(101 + variant * 977);
  const lines: FacadeLine[] = [];

  // Façade bounding box (leaves margin so it reads as an object in frame).
  const left = 0.16 + rng() * 0.04;
  const right = 1 - left;
  const top = 0.12 + rng() * 0.05;
  const bottom = 1 - (0.1 + rng() * 0.04);

  // Number of bays / floors changes per variant for visual variety.
  const bays = 4 + (variant % 3); // vertical divisions
  const floors = 5 + ((variant + 1) % 4); // horizontal divisions

  // --- vertical mullions (slide in from top & bottom alternately) ---
  for (let i = 0; i <= bays; i++) {
    const x = left + ((right - left) * i) / bays;
    const structural = i === 0 || i === bays; // outer columns heavier
    lines.push({
      orient: "v",
      pos: x,
      a: top,
      b: bottom,
      edge: i % 2 === 0 ? "T" : "B",
      delay: (i / bays) * 0.6,
      weight: structural ? 1.6 : 1,
    });
  }

  // --- horizontal floor slabs (slide in from left & right alternately) ---
  for (let j = 0; j <= floors; j++) {
    const y = top + ((bottom - top) * j) / floors;
    const structural = j === 0 || j === floors; // roof + ground heavier
    lines.push({
      orient: "h",
      pos: y,
      a: left,
      b: right,
      edge: j % 2 === 0 ? "L" : "R",
      delay: (j / floors) * 0.6,
      weight: structural ? 1.6 : 1,
    });
  }

  // --- a few accent details: a recessed entry + a setback line ---
  // ground-floor entry (short verticals near center bottom)
  const cx = (left + right) / 2;
  const entryW = (right - left) / bays / 2;
  const groundY = top + ((bottom - top) * (floors - 1)) / floors;
  lines.push({
    orient: "v",
    pos: cx - entryW,
    a: groundY,
    b: bottom,
    edge: "B",
    delay: 0.7,
    weight: 0.8,
  });
  lines.push({
    orient: "v",
    pos: cx + entryW,
    a: groundY,
    b: bottom,
    edge: "B",
    delay: 0.74,
    weight: 0.8,
  });

  // a rooftop setback / parapet accent (variant-dependent)
  if (variant % 2 === 0) {
    const setback = top - 0.04;
    lines.push({
      orient: "h",
      pos: Math.max(0.05, setback),
      a: left + (right - left) * 0.2,
      b: right - (right - left) * 0.2,
      edge: "T",
      delay: 0.78,
      weight: 0.8,
    });
  } else {
    // a tall feature mullion offset to one side
    lines.push({
      orient: "v",
      pos: left + (right - left) * 0.5,
      a: top - 0.05,
      b: top,
      edge: "T",
      delay: 0.8,
      weight: 0.9,
    });
  }

  return lines;
}

export default function SlidingLineGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let start = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let unit = 1; // 1 vmin in px
    let loopCount = -1; // tracks which loop we're on to swap façade design
    let facade: FacadeLine[] = buildFacade(0);
    let nextFacade: FacadeLine[] = buildFacade(1);

    const grainRng = makeRng(9001);

    const ro = new ResizeObserver(() => resize());
    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      unit = Math.min(W, H) / 100;
    }
    resize();
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    // Where a line sits when fully "off-frame" (its slide origin), normalized.
    function offFrameOffset(edge: Edge): { dx: number; dy: number } {
      switch (edge) {
        case "L":
          return { dx: -1.3, dy: 0 };
        case "R":
          return { dx: 1.3, dy: 0 };
        case "T":
          return { dx: 0, dy: -1.3 };
        case "B":
          return { dx: 0, dy: 1.3 };
      }
    }

    // Draw one façade with a global progress for slide-in (pIn 0..1) and
    // slide-out (pOut 0..1, where 0 = locked, 1 = fully gone). Only one of the
    // two motions is active at a time (controlled by caller via flags).
    function drawFacade(
      lines: FacadeLine[],
      mode: "in" | "hold" | "out",
      p: number, // phase progress 0..1
      glowStrength: number
    ) {
      const STAGGER = 0.42; // portion of phase consumed by stagger spread
      for (const ln of lines) {
        // per-line local progress accounting for its delay stagger
        let lp: number;
        if (mode === "in") {
          const t0 = ln.delay * STAGGER;
          lp = clamp01((p - t0) / (1 - STAGGER));
          lp = easeOutBack(lp); // overshoot lock-in
        } else if (mode === "out") {
          const t0 = (1 - ln.delay) * STAGGER; // reverse the stagger going out
          lp = clamp01((p - t0) / (1 - STAGGER));
          lp = easeInCubic(lp);
        } else {
          lp = 1; // hold: fully assembled
        }

        // displacement: in => from off-frame (offset) to 0; out => 0 to off-frame
        const off = offFrameOffset(ln.edge);
        let dispScale: number;
        if (mode === "in") dispScale = 1 - clamp01(lp); // 1 off → 0 placed
        else if (mode === "out") dispScale = clamp01(lp); // 0 placed → 1 off
        else dispScale = 0;

        const dxN = off.dx * dispScale;
        const dyN = off.dy * dispScale;

        // fade the leading/trailing line tips for a softer entrance
        let alpha: number;
        if (mode === "in") alpha = clamp01(lp * 1.4);
        else if (mode === "out") alpha = clamp01(1 - lp * 1.1);
        else alpha = 1;
        if (alpha <= 0.001) continue;

        // resolve endpoints in pixels
        let x1: number;
        let y1: number;
        let x2: number;
        let y2: number;
        if (ln.orient === "v") {
          const x = ln.pos + dxN;
          x1 = x2 = x * W;
          y1 = (ln.a + dyN) * H;
          y2 = (ln.b + dyN) * H;
        } else {
          const y = ln.pos + dyN;
          y1 = y2 = y * H;
          x1 = (ln.a + dxN) * W;
          x2 = (ln.b + dxN) * W;
        }

        const lw = Math.max(1, unit * 0.22 * ln.weight);

        ctx!.save();
        ctx!.lineCap = "round";
        // faint glow only while assembled / near-assembled
        if (glowStrength > 0.01) {
          setGlow(unit * 1.0 * glowStrength, GOLD);
        }
        ctx!.strokeStyle = ln.weight > 1.2 ? GOLD_LIGHT : GOLD;
        ctx!.globalAlpha = alpha * (ln.weight > 1.2 ? 0.95 : 0.8);
        ctx!.lineWidth = lw;
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();
        ctx!.restore();
        clearGlow();

        // bright leading "head" dot while sliding (kinetic Saul Bass tip)
        if (mode === "in" && lp > 0.02 && lp < 0.92) {
          // leading tip of the sliding line (the edge it last cleared)
          const headX = ln.orient === "v" ? x1 : x2;
          const headY = ln.orient === "v" ? y2 : y1;
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          setGlow(unit * 1.8, GOLD_LIGHT);
          ctx!.fillStyle = GOLD_LIGHT;
          ctx!.globalAlpha = (1 - lp) * 0.8 * alpha;
          ctx!.beginPath();
          ctx!.arc(headX, headY, Math.max(1.2, unit * 0.45), 0, Math.PI * 2);
          ctx!.fill();
          ctx!.restore();
          clearGlow();
        }
      }
    }

    // glow dots at every locked intersection (computed from façade geometry)
    function drawIntersections(lines: FacadeLine[], strength: number) {
      if (strength <= 0.01) return;
      const verts = lines.filter((l) => l.orient === "v");
      const horz = lines.filter((l) => l.orient === "h");
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const v of verts) {
        for (const h of horz) {
          // intersection exists only if within both spans
          if (v.pos < h.a - 0.001 || v.pos > h.b + 0.001) continue;
          if (h.pos < v.a - 0.001 || h.pos > v.b + 0.001) continue;
          const ix = v.pos * W;
          const iy = h.pos * H;
          const r = unit * (0.9 + (v.weight + h.weight) * 0.25);
          const g = ctx!.createRadialGradient(ix, iy, 0, ix, iy, r);
          g.addColorStop(0, `rgba(232,201,106,${0.5 * strength})`);
          g.addColorStop(0.5, `rgba(212,175,55,${0.18 * strength})`);
          g.addColorStop(1, "rgba(212,175,55,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(ix, iy, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.restore();
    }

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const total = t - start;
      const elapsed = total % LOOP_MS;
      const f = elapsed / LOOP_MS;

      // detect a new loop → advance façade design so each loop differs
      const thisLoop = Math.floor(total / LOOP_MS);
      if (thisLoop !== loopCount) {
        loopCount = thisLoop;
        facade = nextFacade;
        nextFacade = buildFacade(thisLoop + 2);
      }

      // ---------- background ----------
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      // subtle warm floor light
      const floor = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.46,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.72
      );
      floor.addColorStop(0, "rgba(40,32,14,0.22)");
      floor.addColorStop(0.55, "rgba(20,16,8,0.08)");
      floor.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = floor;
      ctx!.fillRect(0, 0, W, H);

      // faint blueprint backdrop grid (depth layer, parallaxes slightly)
      ctx!.save();
      ctx!.globalAlpha = 0.06;
      ctx!.strokeStyle = GOLD_AMBER;
      ctx!.lineWidth = 1;
      const g = Math.max(W, H) / 16;
      const drift = (elapsed / LOOP_MS) * g * 0.5;
      ctx!.beginPath();
      for (let gx = -g + (drift % g); gx < W + g; gx += g) {
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, H);
      }
      for (let gy = -g + (drift % g); gy < H + g; gy += g) {
        ctx!.moveTo(0, gy);
        ctx!.lineTo(W, gy);
      }
      ctx!.stroke();
      ctx!.restore();

      // ---------- phase logic ----------
      let glowStrength = 0;
      if (f < IN_END) {
        // assembling
        const p = easeInOutCubic(clamp01((f - IN_START) / (IN_END - IN_START)));
        glowStrength = clamp01((f - (IN_END - 0.12)) / 0.12); // glow blooms near lock
        drawIntersections(facade, glowStrength * 0.7);
        drawFacade(facade, "in", p, glowStrength);
      } else if (f < HOLD_END) {
        // holding — crisp, full glow with a gentle breathing pulse
        const hp = (f - IN_END) / (HOLD_END - IN_END);
        const breathe = 0.85 + 0.15 * Math.sin(hp * Math.PI * 2);
        glowStrength = breathe;
        drawIntersections(facade, breathe);
        drawFacade(facade, "hold", 1, breathe);
      } else if (f < OUT_END) {
        // disassembling
        const p = clamp01((f - HOLD_END) / (OUT_END - HOLD_END));
        glowStrength = clamp01(1 - p * 2);
        drawIntersections(facade, glowStrength);
        drawFacade(facade, "out", p, glowStrength);
      } else {
        // empty beat — frame clears so next loop reassembles fresh (seamless)
        glowStrength = 0;
      }

      // ---------- moving scanline band (cinematic) ----------
      const scanY = (((elapsed / LOOP_MS) * 1.5) % 1) * (H + 80) - 40;
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      const sg = ctx!.createLinearGradient(0, scanY - unit * 6, 0, scanY + unit * 6);
      sg.addColorStop(0, "rgba(212,175,55,0)");
      sg.addColorStop(0.5, "rgba(232,201,106,0.05)");
      sg.addColorStop(1, "rgba(212,175,55,0)");
      ctx!.fillStyle = sg;
      ctx!.fillRect(0, scanY - unit * 6, W, unit * 12);
      ctx!.restore();

      // ---------- vignette ----------
      ctx!.save();
      const vg = ctx!.createRadialGradient(
        W * 0.5,
        H * 0.5,
        Math.min(W, H) * 0.32,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.74
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.74, "rgba(0,0,0,0.5)");
      vg.addColorStop(1, "rgba(0,0,0,0.95)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // ---------- film grain ----------
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      ctx!.fillStyle = "#fff";
      const grainN = Math.floor((W * H) / 2600);
      for (let i = 0; i < grainN; i++) {
        const gx = grainRng() * W;
        const gy = grainRng() * H;
        ctx!.fillRect(gx, gy, 1, 1);
      }
      ctx!.restore();

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
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
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
