"use client";

import { useEffect, useRef } from "react";

/**
 * SatelliteZoom — orbital recon punch-down.
 *
 * A relentless dolly-zoom plunges from orbit to a single rooftop: a gold
 * wireframe globe gives way to a continent outline, then a city street grid,
 * then building blocks, then one rooftop where a crosshair snaps to lock.
 * HUD altitude/coordinate readouts tick down the whole descent, targeting
 * brackets frame the frame, gridlines streak past — then it resets to orbit
 * and loops seamlessly. Canvas-2D only, no deps, no WebGL.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const GOLD_AMBER = "#8a6a20";
const BG = "#0c0a08";

const LOOP_MS = 11000; // full orbit-to-ground descent

// easing helpers
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function SatelliteZoom() {
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
    let unit = 1; // vmin in px

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

    // seeded pseudo-random for grain + flicker
    let seed = 90210;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    function setGlow(blur: number, color: string) {
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = color;
    }
    function clearGlow() {
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    }

    // ---- deterministic "world" geometry, all in normalized 0..1 space ----
    // The target rooftop sits slightly off-center so the descent has parallax.
    const TX = 0.5; // target final center (in normalized world that zooms toward this point)
    const TY = 0.5;

    // continent silhouette — a closed blobby polygon (normalized to a -1..1 box)
    const continent: [number, number][] = (() => {
      const pts: [number, number][] = [];
      const n = 26;
      let s = 7;
      const r2 = () => {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        return s / 0x7fffffff;
      };
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rad = 0.55 + 0.28 * Math.sin(a * 3 + 1) + 0.16 * Math.sin(a * 5 + 2) + (r2() - 0.5) * 0.18;
        pts.push([Math.cos(a) * rad, Math.sin(a) * rad * 0.82]);
      }
      return pts;
    })();

    // city street grid — irregular but deterministic line offsets
    const streetsV = Array.from({ length: 13 }, (_, i) => (i / 12 - 0.5) * 1.7 + (((i * 53) % 17) / 17 - 0.5) * 0.06);
    const streetsH = Array.from({ length: 11 }, (_, i) => (i / 10 - 0.5) * 1.4 + (((i * 71) % 13) / 13 - 0.5) * 0.06);

    // building blocks — deterministic footprints in normalized -1..1 city space
    const blocks: { x: number; y: number; w: number; h: number; tone: number }[] = (() => {
      const arr: { x: number; y: number; w: number; h: number; tone: number }[] = [];
      let s = 4242;
      const r = () => {
        s = (s * 1664525 + 1013904223) & 0x7fffffff;
        return s / 0x7fffffff;
      };
      for (let i = 0; i < 64; i++) {
        const gx = Math.floor(r() * 12);
        const gy = Math.floor(r() * 10);
        const cell = 0.142;
        const pad = 0.018 + r() * 0.02;
        arr.push({
          x: -0.85 + gx * cell + pad,
          y: -0.7 + gy * cell + pad,
          w: cell - pad * 2,
          h: cell - pad * 2,
          tone: 0.4 + r() * 0.6,
        });
      }
      return arr;
    })();

    // HUD digit state
    let lastFlick = -1;
    let hudCoordA = "00.0000";
    let hudCoordB = "00.0000";

    function draw(t: number) {
      if (!running) return;
      if (!start) start = t;
      const elapsed = (t - start) % LOOP_MS;
      const f = elapsed / LOOP_MS; // 0..1

      // ----- master zoom curve -----
      // We model an exponential punch-down: "altitude" goes from orbit (far)
      // to rooftop (near). Use a continuous log-scale so layers cross-fade as
      // we plunge. zoom = world units per screen; bigger = further out.
      // Ease so it accelerates into the descent then eases at the lock.
      const descend = f < 0.9 ? easeInCubic(f / 0.9) * 0.92 : 0.92; // hold near end
      // exponential scale: from 1 (whole globe in view) down to ~0.012 (rooftop)
      const SCALE_FAR = 1.0;
      const SCALE_NEAR = 0.014;
      const logScale = lerp(Math.log(SCALE_FAR), Math.log(SCALE_NEAR), descend);
      const scale = Math.exp(logScale); // current "view half-width" in world units

      // reset flash window for seamless loop
      const resetK = f > 0.93 ? clamp01((f - 0.93) / 0.07) : 0;

      // ---- background ----
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      const cxp = W * 0.5;
      const cyp = H * 0.5;
      const viewR = Math.min(W, H) * 0.5; // px radius that maps to `scale` world units

      // world->screen: a point (wx,wy) near target (TX,TY mapped to 0) projects
      // toward center as we zoom. We treat target as origin of world; everything
      // is drawn relative to it and divided by `scale`.
      const w2sx = (wx: number) => cxp + (wx / scale) * viewR;
      const w2sy = (wy: number) => cyp + (wy / scale) * viewR;
      const w2s = (wx: number) => (wx / scale) * viewR; // length

      // subtle radial floor light
      const floor = ctx!.createRadialGradient(cxp, cyp, 0, cxp, cyp, Math.max(W, H) * 0.7);
      floor.addColorStop(0, "rgba(40,32,14,0.20)");
      floor.addColorStop(0.55, "rgba(20,16,8,0.07)");
      floor.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = floor;
      ctx!.fillRect(0, 0, W, H);

      // layer opacity helper: each layer lives in a scale band, fades in/out.
      // returns 0..1 alpha based on how close `scale` is to band [near,far].
      const bandAlpha = (near: number, far: number) => {
        // full alpha inside band, fade across a margin on each side (log space)
        const ls = Math.log(scale);
        const ln = Math.log(near);
        const lf = Math.log(far);
        const margin = 0.9;
        if (ls > lf + margin || ls < ln - margin) return 0;
        let a = 1;
        if (ls > lf) a = Math.min(a, 1 - (ls - lf) / margin);
        if (ls < ln) a = Math.min(a, 1 - (ln - ls) / margin);
        return clamp01(a);
      };

      // ============ LAYER 1: GLOBE / continent (orbit) ============
      const aGlobe = bandAlpha(0.42, 1.0);
      if (aGlobe > 0.01) {
        // globe sits centered; its radius shrinks as we zoom (it's at world scale ~1)
        const globeWorldR = 0.9;
        const gr = w2s(globeWorldR);
        ctx!.save();
        ctx!.globalAlpha = aGlobe;

        // latitude/longitude wireframe sphere
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.lineWidth = Math.max(1, unit * 0.18);
        setGlow(unit * 1.2, GOLD);

        // outer disc
        ctx!.globalAlpha = aGlobe * 0.85;
        ctx!.strokeStyle = GOLD;
        ctx!.beginPath();
        ctx!.arc(cxp, cyp, gr, 0, Math.PI * 2);
        ctx!.stroke();

        // longitudes (rotating slowly)
        const rot = elapsed * 0.00018 * Math.PI * 2;
        ctx!.globalAlpha = aGlobe * 0.4;
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.lineWidth = Math.max(1, unit * 0.12);
        for (let i = 0; i < 7; i++) {
          const phase = (i / 7) * Math.PI + rot;
          const sx = Math.abs(Math.cos(phase));
          ctx!.beginPath();
          ctx!.ellipse(cxp, cyp, gr * sx, gr, 0, 0, Math.PI * 2);
          ctx!.stroke();
        }
        // latitudes
        for (let i = 1; i < 6; i++) {
          const lat = (i / 6 - 0.5) * Math.PI;
          const ry = Math.sin(lat) * gr;
          const rx = Math.cos(lat) * gr;
          ctx!.beginPath();
          ctx!.ellipse(cxp, cyp + ry, rx, rx * 0.18, 0, 0, Math.PI * 2);
          ctx!.stroke();
        }

        // continent silhouette filled toward the target, growing as we approach
        ctx!.globalAlpha = aGlobe;
        setGlow(unit * 0.8, GOLD);
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.lineWidth = Math.max(1, unit * 0.2);
        ctx!.beginPath();
        const contScale = w2s(0.5); // continent is ~0.5 world units across, centered on target
        continent.forEach(([px, py], i) => {
          const sx = cxp + px * contScale;
          const sy = cyp + py * contScale;
          if (i === 0) ctx!.moveTo(sx, sy);
          else ctx!.lineTo(sx, sy);
        });
        ctx!.closePath();
        ctx!.stroke();
        ctx!.globalAlpha = aGlobe * 0.08;
        ctx!.fillStyle = GOLD;
        ctx!.fill();
        ctx!.restore();
        clearGlow();
      }

      // ============ LAYER 2: continent regional grid (mid-high) ============
      const aRegion = bandAlpha(0.14, 0.5);
      if (aRegion > 0.01) {
        ctx!.save();
        ctx!.globalAlpha = aRegion * 0.5;
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.lineWidth = 1;
        setGlow(unit * 0.4, GOLD_AMBER);
        // coarse region grid centered on target
        const regSpan = 0.6;
        const regN = 8;
        ctx!.beginPath();
        for (let i = 0; i <= regN; i++) {
          const o = (i / regN - 0.5) * regSpan;
          const sx = w2sx(o);
          const sy = w2sy(o);
          ctx!.moveTo(sx, 0);
          ctx!.lineTo(sx, H);
          ctx!.moveTo(0, sy);
          ctx!.lineTo(W, sy);
        }
        ctx!.stroke();
        ctx!.restore();
        clearGlow();
      }

      // ============ LAYER 3: CITY STREET GRID ============
      const aCity = bandAlpha(0.05, 0.2);
      if (aCity > 0.01) {
        ctx!.save();
        ctx!.globalAlpha = aCity * 0.7;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(1, unit * 0.1);
        setGlow(unit * 0.5, GOLD);
        ctx!.beginPath();
        for (const v of streetsV) {
          const sx = w2sx(v * 0.18);
          ctx!.moveTo(sx, 0);
          ctx!.lineTo(sx, H);
        }
        for (const h of streetsH) {
          const sy = w2sy(h * 0.18);
          ctx!.moveTo(0, sy);
          ctx!.lineTo(W, sy);
        }
        ctx!.stroke();
        // a couple of bright "arterials"
        ctx!.globalAlpha = aCity * 0.9;
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.lineWidth = Math.max(1, unit * 0.2);
        ctx!.beginPath();
        ctx!.moveTo(w2sx(streetsV[6] * 0.18), 0);
        ctx!.lineTo(w2sx(streetsV[6] * 0.18), H);
        ctx!.moveTo(0, w2sy(streetsH[5] * 0.18));
        ctx!.lineTo(W, w2sy(streetsH[5] * 0.18));
        ctx!.stroke();
        ctx!.restore();
        clearGlow();
      }

      // ============ LAYER 4: BUILDING BLOCKS ============
      const aBlocks = bandAlpha(0.02, 0.08);
      if (aBlocks > 0.01) {
        ctx!.save();
        const blockSpan = 0.09; // building field spans ~0.09 world units near target
        for (const b of blocks) {
          const sx = w2sx(b.x * blockSpan);
          const sy = w2sy(b.y * blockSpan);
          const sw = w2s(b.w * blockSpan);
          const sh = w2s(b.h * blockSpan);
          if (sx + sw < -50 || sx > W + 50 || sy + sh < -50 || sy > H + 50) continue;
          ctx!.globalAlpha = aBlocks * (0.06 + b.tone * 0.06);
          ctx!.fillStyle = GOLD;
          ctx!.fillRect(sx, sy, sw, sh);
          ctx!.globalAlpha = aBlocks * (0.4 + b.tone * 0.5);
          ctx!.strokeStyle = GOLD;
          ctx!.lineWidth = Math.max(1, unit * 0.08);
          ctx!.strokeRect(sx, sy, sw, sh);
        }
        ctx!.restore();
      }

      // ============ LAYER 5: TARGET ROOFTOP (the single building) ============
      const aRoof = bandAlpha(0.014, 0.04);
      if (aRoof > 0.01) {
        ctx!.save();
        const roofSpan = 0.022;
        const rx = w2sx(-0.5 * roofSpan);
        const ry = w2sy(-0.5 * roofSpan);
        const rw = w2s(roofSpan);
        const rh = w2s(roofSpan);
        // rooftop slab
        ctx!.globalAlpha = aRoof * 0.12;
        ctx!.fillStyle = GOLD;
        ctx!.fillRect(rx, ry, rw, rh);
        ctx!.globalAlpha = aRoof * 0.95;
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.lineWidth = Math.max(1, unit * 0.16);
        setGlow(unit * 0.8, GOLD_LIGHT);
        ctx!.strokeRect(rx, ry, rw, rh);
        // rooftop detail — HVAC/skylight rectangles
        ctx!.globalAlpha = aRoof * 0.6;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(1, unit * 0.1);
        ctx!.strokeRect(rx + rw * 0.15, ry + rh * 0.18, rw * 0.28, rh * 0.22);
        ctx!.strokeRect(rx + rw * 0.55, ry + rh * 0.55, rw * 0.3, rh * 0.3);
        ctx!.beginPath();
        ctx!.moveTo(rx, ry + rh * 0.5);
        ctx!.lineTo(rx + rw, ry + rh * 0.5);
        ctx!.stroke();
        ctx!.restore();
        clearGlow();
      }

      // ============ STREAKING GRIDLINES (motion lines past the lens) ============
      // radial streaks emanating from center, intensity grows with descent speed.
      {
        const speed = f < 0.9 ? (3 * Math.pow(f / 0.9, 2)) : 0; // proportional to zoom velocity
        const streakA = clamp01(speed * 0.5) * (1 - resetK);
        if (streakA > 0.01) {
          ctx!.save();
          ctx!.globalCompositeOperation = "lighter";
          ctx!.strokeStyle = GOLD_LIGHT;
          ctx!.lineCap = "round";
          const N = 28;
          for (let i = 0; i < N; i++) {
            const ang = (i / N) * Math.PI * 2 + (i % 3) * 0.4;
            const r0 = viewR * (0.35 + (rnd() * 0.4));
            const len = viewR * (0.25 + rnd() * 0.5) * clamp01(speed);
            const x0 = cxp + Math.cos(ang) * r0;
            const y0 = cyp + Math.sin(ang) * r0;
            const x1 = cxp + Math.cos(ang) * (r0 + len);
            const y1 = cyp + Math.sin(ang) * (r0 + len);
            const g = ctx!.createLinearGradient(x0, y0, x1, y1);
            g.addColorStop(0, "rgba(232,201,106,0)");
            g.addColorStop(1, `rgba(232,201,106,${streakA * 0.5})`);
            ctx!.strokeStyle = g;
            ctx!.lineWidth = Math.max(1, unit * 0.12);
            ctx!.beginPath();
            ctx!.moveTo(x0, y0);
            ctx!.lineTo(x1, y1);
            ctx!.stroke();
          }
          ctx!.restore();
        }
      }

      // ============ CROSSHAIR LOCK (snaps as we reach rooftop) ============
      const lockF = clamp01((f - 0.78) / 0.12); // begins emerging at 0.78
      if (lockF > 0.01) {
        const e = easeOutBack(lockF);
        const R = unit * 12;
        ctx!.save();
        ctx!.lineCap = "round";
        setGlow(unit * 1.4, GOLD_LIGHT);

        // reticle ring
        ctx!.strokeStyle = GOLD_LIGHT;
        ctx!.globalAlpha = lockF * 0.9;
        ctx!.lineWidth = Math.max(1, unit * 0.26);
        ctx!.beginPath();
        ctx!.arc(cxp, cyp, R, 0, Math.PI * 2);
        ctx!.stroke();

        // crosshair lines with gap
        const gap = R * 0.34;
        const reach = R * 1.7;
        ctx!.beginPath();
        ctx!.moveTo(cxp - reach, cyp);
        ctx!.lineTo(cxp - gap, cyp);
        ctx!.moveTo(cxp + gap, cyp);
        ctx!.lineTo(cxp + reach, cyp);
        ctx!.moveTo(cxp, cyp - reach);
        ctx!.lineTo(cxp, cyp - gap);
        ctx!.moveTo(cxp, cyp + gap);
        ctx!.lineTo(cxp, cyp + reach);
        ctx!.stroke();

        // center dot
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.beginPath();
        ctx!.arc(cxp, cyp, Math.max(1.2, unit * 0.5), 0, Math.PI * 2);
        ctx!.fill();

        // converging corner brackets
        const spread = R * (2.6 - 1.3 * e);
        const bLen = R * 0.6;
        ctx!.globalAlpha = lockF * 0.95;
        ctx!.lineWidth = Math.max(1, unit * 0.32);
        const corners = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ];
        for (const [sx, sy] of corners) {
          const bx = cxp + sx * spread;
          const by = cyp + sy * spread;
          ctx!.beginPath();
          ctx!.moveTo(bx, by + sy * bLen);
          ctx!.lineTo(bx, by);
          ctx!.lineTo(bx - sx * bLen, by);
          ctx!.stroke();
        }
        ctx!.restore();
        clearGlow();

        // lock confirm pulse + label once basically locked
        if (lockF > 0.9 && f < 0.93) {
          const blink = Math.sin(elapsed * 0.02) > -0.3 ? 1 : 0.4;
          ctx!.save();
          setGlow(unit * 1.4, GOLD_LIGHT);
          ctx!.fillStyle = GOLD_LIGHT;
          ctx!.globalAlpha = 0.95 * blink;
          ctx!.font = `600 ${unit * 2.4}px var(--font-dm-sans), monospace`;
          ctx!.textBaseline = "middle";
          ctx!.textAlign = "left";
          ctx!.fillText("● TARGET ACQUIRED", cxp + R * 1.5, cyp - R * 1.5);
          ctx!.restore();
          clearGlow();
        }
      }

      // ============ HUD: altitude / coordinates ticking down ============
      {
        // altitude derived from scale: orbit ~ 35,786 km down to ~30 m
        const altKm = scale * 38000; // approximate readout
        let altStr: string;
        if (altKm > 1) altStr = `${altKm.toFixed(altKm > 100 ? 0 : 1)} KM`;
        else altStr = `${Math.max(8, Math.round(altKm * 1000))} M`;

        // flicker coords on a cadence, stabilizing near lock
        if (lastFlick < 0 || elapsed - lastFlick > 90 || elapsed < lastFlick) {
          lastFlick = elapsed;
          if (lockF > 0.85) {
            hudCoordA = "34.0653";
            hudCoordB = "84.6766";
          } else {
            const d = () => Math.floor(rnd() * 10);
            hudCoordA = `3${d()}.${d()}${d()}${d()}${d()}`;
            hudCoordB = `8${d()}.${d()}${d()}${d()}${d()}`;
          }
        }

        ctx!.save();
        const pad = unit * 4;
        ctx!.textBaseline = "top";
        setGlow(unit * 0.7, GOLD);

        // top-left block
        ctx!.fillStyle = GOLD;
        ctx!.globalAlpha = 0.85 * (1 - resetK * 0.6);
        ctx!.font = `500 ${unit * 1.9}px var(--font-dm-sans), monospace`;
        ctx!.textAlign = "left";
        ctx!.fillText("ORBITAL RECON // LIVE", pad, pad);
        ctx!.globalAlpha = 0.6;
        ctx!.font = `500 ${unit * 1.6}px var(--font-dm-sans), monospace`;
        ctx!.fillText(`LAT ${hudCoordA}  N`, pad, pad + unit * 3);
        ctx!.fillText(`LON ${hudCoordB}  W`, pad, pad + unit * 5.4);

        // top-right altitude (big, ticking)
        ctx!.textAlign = "right";
        ctx!.fillStyle = GOLD_LIGHT;
        ctx!.globalAlpha = 0.9 * (1 - resetK * 0.6);
        ctx!.font = `600 ${unit * 3.2}px var(--font-dm-sans), monospace`;
        ctx!.fillText(altStr, W - pad, pad);
        ctx!.globalAlpha = 0.55;
        ctx!.font = `500 ${unit * 1.5}px var(--font-dm-sans), monospace`;
        ctx!.fillText("ALTITUDE", W - pad, pad + unit * 4);

        // bottom-left descent bar
        const barW = unit * 30;
        const barH = unit * 0.8;
        const bx = pad;
        const by = H - pad - barH;
        ctx!.globalAlpha = 0.4;
        ctx!.strokeStyle = GOLD_AMBER;
        ctx!.lineWidth = 1;
        ctx!.strokeRect(bx, by, barW, barH);
        ctx!.globalAlpha = 0.85;
        ctx!.fillStyle = GOLD;
        ctx!.fillRect(bx, by, barW * descend, barH);
        ctx!.globalAlpha = 0.6;
        ctx!.fillStyle = GOLD;
        ctx!.textBaseline = "bottom";
        ctx!.textAlign = "left";
        ctx!.font = `500 ${unit * 1.5}px var(--font-dm-sans), monospace`;
        ctx!.fillText("DESCENT", bx, by - unit * 0.8);

        // bottom-right status
        ctx!.textAlign = "right";
        ctx!.globalAlpha = 0.6;
        ctx!.fillStyle = lockF > 0.85 ? GOLD_LIGHT : GOLD;
        ctx!.fillText(lockF > 0.5 ? "LOCK ENGAGED" : "TRACKING…", W - pad, H - pad);
        ctx!.restore();
        clearGlow();
      }

      // ============ static targeting brackets framing the whole frame ============
      {
        ctx!.save();
        const m = unit * 3.5;
        const len = unit * 5;
        ctx!.globalAlpha = 0.5;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(1, unit * 0.2);
        ctx!.lineCap = "round";
        setGlow(unit * 0.6, GOLD);
        const cs = [
          [m, m, 1, 1],
          [W - m, m, -1, 1],
          [W - m, H - m, -1, -1],
          [m, H - m, 1, -1],
        ];
        for (const [x, y, dx, dy] of cs) {
          ctx!.beginPath();
          ctx!.moveTo(x + dx * len, y);
          ctx!.lineTo(x, y);
          ctx!.lineTo(x, y + dy * len);
          ctx!.stroke();
        }
        ctx!.restore();
        clearGlow();
      }

      // ============ moving scanline band ============
      {
        const scanY = ((elapsed / LOOP_MS) * 4 * H) % (H + 80) - 40;
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        const sg = ctx!.createLinearGradient(0, scanY - unit * 6, 0, scanY + unit * 6);
        sg.addColorStop(0, "rgba(212,175,55,0)");
        sg.addColorStop(0.5, "rgba(232,201,106,0.05)");
        sg.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = sg;
        ctx!.fillRect(0, scanY - unit * 6, W, unit * 12);
        ctx!.restore();
      }

      // fine horizontal scanlines overlay
      ctx!.save();
      ctx!.globalAlpha = 0.045;
      ctx!.fillStyle = "#000";
      const lineGap = Math.max(2, unit * 0.4);
      for (let y = 0; y < H; y += lineGap * 2) {
        ctx!.fillRect(0, y, W, lineGap);
      }
      ctx!.restore();

      // ============ center bloom (lens hotspot, grows toward lock) ============
      {
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        const br = viewR * 0.5;
        const bloomA = 0.06 + lockF * 0.16;
        const bloom = ctx!.createRadialGradient(cxp, cyp, 0, cxp, cyp, br);
        bloom.addColorStop(0, `rgba(232,201,106,${bloomA})`);
        bloom.addColorStop(0.5, `rgba(212,175,55,${bloomA * 0.4})`);
        bloom.addColorStop(1, "rgba(212,175,55,0)");
        ctx!.fillStyle = bloom;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // ============ reset white-out flash for seamless loop ============
      if (resetK > 0) {
        ctx!.save();
        ctx!.globalCompositeOperation = "lighter";
        // flare up then the next frame starts at orbit again
        const flA = Math.sin(resetK * Math.PI) * 0.22;
        ctx!.fillStyle = `rgba(232,201,106,${flA})`;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }

      // ============ vignette ============
      ctx!.save();
      const vg = ctx!.createRadialGradient(
        cxp,
        cyp,
        Math.min(W, H) * 0.28,
        cxp,
        cyp,
        Math.max(W, H) * 0.72
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.72, "rgba(0,0,0,0.5)");
      vg.addColorStop(1, "rgba(0,0,0,0.96)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();

      // ============ film grain ============
      ctx!.save();
      ctx!.globalAlpha = 0.05;
      const grainN = Math.floor((W * H) / 2600);
      ctx!.fillStyle = "#fff";
      for (let i = 0; i < grainN; i++) {
        ctx!.fillRect(rnd() * W, rnd() * H, 1, 1);
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
