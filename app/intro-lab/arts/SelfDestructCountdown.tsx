"use client";

import { useEffect, useRef } from "react";

/**
 * SelfDestructCountdown — Mission: Impossible self-destruct timer.
 *
 * A gold seven-segment clock ticks 00:05 → 00:00 above the spaced-caps line
 * "THIS MESSAGE WILL SELF-DESTRUCT". A thin progress ring depletes around the
 * display, the whole glow drifting gold → hot-red as zero nears while a hard
 * scanline sweeps and curling smoke creeps up from below. At 00:00 a white
 * blowout flash sears the frame, embers scatter, then the display cools back to
 * 00:05 and the loop repeats. Layered with film grain, vignette, bloom and an
 * eased ticking cadence. Self-contained, no props, no deps. Canvas 2D. ~6s loop.
 */
export default function SelfDestructCountdown() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD_LIGHT = "#e8c96a";
    const RED = "#e85d4a";
    const BG = "#0c0a08";

    const START_SEC = 5;
    const TICK_MS = 900; // per-second cadence (slightly stretched, tense)
    const COUNT_MS = START_SEC * TICK_MS; // 4500ms counting 5..0
    const FLASH_MS = 700; // burnout flash
    const COOL_MS = 900; // settle back to 00:05
    const LOOP_MS = COUNT_MS + FLASH_MS + COOL_MS; // ~6100ms

    let width = 0;
    let height = 0;
    let dpr = 1;

    // ----- film grain (static tile, scrolled each frame) -----
    let grain: HTMLCanvasElement | null = null;
    const buildGrain = () => {
      const g = document.createElement("canvas");
      const S = 160;
      g.width = S;
      g.height = S;
      const gc = g.getContext("2d");
      if (!gc) return;
      const img = gc.createImageData(S, S);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gc.putImageData(img, 0, 0);
      grain = g;
    };
    buildGrain();

    // ----- seven-segment geometry -----
    // segments: a(top) b(top-right) c(bot-right) d(bottom) e(bot-left) f(top-left) g(mid)
    const SEG: Record<string, boolean[]> = {
      // a, b, c, d, e, f, g
      "0": [true, true, true, true, true, true, false],
      "1": [false, true, true, false, false, false, false],
      "2": [true, true, false, true, true, false, true],
      "3": [true, true, true, true, false, false, true],
      "4": [false, true, true, false, false, true, true],
      "5": [true, false, true, true, false, true, true],
      "6": [true, false, true, true, true, true, true],
      "7": [true, true, true, false, false, false, false],
      "8": [true, true, true, true, true, true, true],
      "9": [true, true, true, true, false, true, true],
    };

    // Draw one seven-seg digit inside a box (x,y top-left, w,h). on-color vs off.
    const drawDigit = (
      ch: string,
      x: number,
      y: number,
      w: number,
      h: number,
      onColor: string,
      onAlpha: number,
      offColor: string,
    ) => {
      const segs = SEG[ch] ?? SEG["8"];
      const t = Math.max(2, w * 0.16); // segment thickness
      const ix = x;
      const iy = y;
      const cx2 = ix + w;
      const cy2 = iy + h / 2;
      const cyB = iy + h;
      const g = t * 0.5;

      // each segment as a chamfered bar (polygon)
      const horiz = (px: number, py: number, len: number) => {
        ctx.beginPath();
        ctx.moveTo(px + g, py - t / 2);
        ctx.lineTo(px + len - g, py - t / 2);
        ctx.lineTo(px + len, py);
        ctx.lineTo(px + len - g, py + t / 2);
        ctx.lineTo(px + g, py + t / 2);
        ctx.lineTo(px, py);
        ctx.closePath();
      };
      const vert = (px: number, py: number, len: number) => {
        ctx.beginPath();
        ctx.moveTo(px - t / 2, py + g);
        ctx.lineTo(px - t / 2, py + len - g);
        ctx.lineTo(px, py + len);
        ctx.lineTo(px + t / 2, py + len - g);
        ctx.lineTo(px + t / 2, py + g);
        ctx.lineTo(px, py);
        ctx.closePath();
      };

      const paths: [boolean, () => void][] = [
        [segs[0], () => horiz(ix, iy, w)], // a
        [segs[1], () => vert(cx2, iy, h / 2)], // b
        [segs[2], () => vert(cx2, cy2, h / 2)], // c
        [segs[3], () => horiz(ix, cyB, w)], // d
        [segs[4], () => vert(ix, cy2, h / 2)], // e
        [segs[5], () => vert(ix, iy, h / 2)], // f
        [segs[6], () => horiz(ix, cy2, w)], // g
      ];

      for (const [on, path] of paths) {
        path();
        if (on) {
          ctx.fillStyle = onColor;
          ctx.globalAlpha = onAlpha;
        } else {
          ctx.fillStyle = offColor;
          ctx.globalAlpha = 0.16;
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // measure overall clock layout: "0 0 : 0 0"
    const layoutClock = () => {
      const dh = Math.min(height * 0.26, width * 0.13);
      const dw = dh * 0.56;
      const gap = dw * 0.42;
      const colonW = dw * 0.5;
      const totalW = dw * 4 + gap * 3 + colonW * 2;
      const startX = (width - totalW) / 2;
      const startY = height * 0.34;
      return { dh, dw, gap, colonW, startX, startY };
    };

    // ----- smoke puffs -----
    type Puff = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number };
    let puffs: Puff[] = [];
    let lastPuff = 0;

    // ----- embers (burst at zero) -----
    type Ember = { x: number; y: number; vx: number; vy: number; life: number; size: number; hot: boolean };
    let embers: Ember[] = [];
    let burstDone = false;

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

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const mix = (c1: number[], c2: number[], t: number) =>
      `rgb(${Math.round(lerp(c1[0], c2[0], t))},${Math.round(lerp(c1[1], c2[1], t))},${Math.round(
        lerp(c1[2], c2[2], t),
      )})`;
    const GOLD_RGB = [212, 175, 55];
    const GOLDL_RGB = [232, 201, 106];
    const RED_RGB = [232, 93, 74];

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

      const elapsed = (now - startTime) % LOOP_MS;

      // phase determination
      const inCount = elapsed < COUNT_MS;
      const inFlash = !inCount && elapsed < COUNT_MS + FLASH_MS;
      const flashT = inFlash ? (elapsed - COUNT_MS) / FLASH_MS : elapsed < COUNT_MS ? 0 : 1;
      const coolT = !inCount && !inFlash ? (elapsed - COUNT_MS - FLASH_MS) / COOL_MS : 0;

      // seconds remaining + fractional tick within current second
      let secsLeft = START_SEC;
      let tickFrac = 0;
      if (inCount) {
        const elapsedSec = elapsed / TICK_MS; // 0..5
        secsLeft = Math.max(0, START_SEC - Math.floor(elapsedSec));
        tickFrac = elapsedSec - Math.floor(elapsedSec); // 0..1 within the second
      } else {
        secsLeft = 0;
      }

      // urgency 0..1 (drives gold->red and tension)
      const urgency = inCount ? 1 - secsLeft / START_SEC : 1;
      // ring depletion 0..1 (full at start)
      const ringRemain = inCount ? Math.max(0, 1 - elapsed / COUNT_MS) : 0;

      // color blend for the display glow
      const glowMix = Math.min(1, urgency * 1.05);
      const glowRGB = glowMix < 0.6 ? mix(GOLD_RGB, GOLDL_RGB, glowMix / 0.6) : mix(GOLDL_RGB, RED_RGB, (glowMix - 0.6) / 0.4);

      // tick "thud": brightness pop right after each second flip
      const tickPulse = inCount ? Math.max(0, 1 - tickFrac * 6) : 0;

      // ---- BACKGROUND ----
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      // warm radial wash behind the clock; tints red as urgency climbs
      const cx = width / 2;
      const cy = height * 0.42;
      const washR = Math.max(width, height) * 0.7;
      const wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, washR);
      const wIn = `rgba(${Math.round(lerp(60, 110, urgency))},${Math.round(lerp(42, 24, urgency))},${Math.round(
        lerp(14, 18, urgency),
      )},${0.4 + 0.25 * urgency + tickPulse * 0.12})`;
      wash.addColorStop(0, wIn);
      wash.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const { dh, dw, gap, colonW, startX, startY } = layoutClock();

      // ---- PROGRESS RING (depleting) ----
      const ringCx = width / 2;
      const ringCy = startY + dh / 2;
      const ringR = Math.min(width, height) * 0.34;
      ctx.save();
      // track
      ctx.beginPath();
      ctx.arc(ringCx, ringCy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,175,55,0.10)";
      ctx.lineWidth = Math.max(1.5, height * 0.004);
      ctx.stroke();
      // depleting arc — starts at top, sweeps clockwise, shrinks toward top
      const startAng = -Math.PI / 2;
      const endAng = startAng + Math.PI * 2 * ringRemain;
      ctx.beginPath();
      ctx.arc(ringCx, ringCy, ringR, startAng, endAng);
      ctx.strokeStyle = glowRGB;
      ctx.lineWidth = Math.max(2.5, height * 0.007);
      ctx.lineCap = "round";
      ctx.shadowColor = glowRGB;
      ctx.shadowBlur = Math.max(10, height * 0.03) * (0.6 + 0.5 * urgency + tickPulse);
      ctx.globalAlpha = 0.95;
      ctx.stroke();
      // leading dot
      if (ringRemain > 0.001) {
        const ex = ringCx + Math.cos(endAng) * ringR;
        const ey = ringCy + Math.sin(endAng) * ringR;
        ctx.beginPath();
        ctx.arc(ex, ey, Math.max(3, height * 0.008), 0, Math.PI * 2);
        ctx.fillStyle = "#fffef8";
        ctx.fill();
      }
      ctx.restore();

      // ---- CLOCK DIGITS ----
      // build digit string MM:SS -> "00:0X"
      const mm = "00";
      const ss = String(secsLeft).padStart(2, "0");
      const chars = [mm[0], mm[1], "colon", ss[0], ss[1]];

      const onAlpha = 0.92 * (0.82 + 0.18 * Math.sin(now * 0.02)) + tickPulse * 0.08; // faint flicker + tick pop
      const offColor = "rgba(80,60,28,1)";

      ctx.save();
      ctx.shadowColor = glowRGB;
      ctx.shadowBlur = Math.max(8, height * 0.022) * (0.7 + 0.6 * urgency + tickPulse * 0.8);

      let dx = startX;
      for (const c of chars) {
        if (c === "colon") {
          // blinking colon
          const blink = inCount ? (tickFrac < 0.5 ? 1 : 0.25) : 1;
          const r = Math.max(2.5, dw * 0.1);
          ctx.fillStyle = glowRGB;
          ctx.globalAlpha = Math.min(1, onAlpha) * blink;
          ctx.beginPath();
          ctx.arc(dx + colonW / 2, startY + dh * 0.32, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(dx + colonW / 2, startY + dh * 0.68, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          dx += colonW + gap;
        } else {
          drawDigit(c, dx, startY, dw, dh, glowRGB, Math.min(1, onAlpha), offColor);
          dx += dw + gap;
        }
      }
      ctx.restore();

      // ---- LABEL: THIS MESSAGE WILL SELF-DESTRUCT ----
      const labelY = startY + dh + height * 0.16;
      const fs = Math.max(9, Math.min(width * 0.022, height * 0.04));
      ctx.save();
      ctx.font = `600 ${fs}px var(--font-dm-sans), ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const labelText = "T H I S   M E S S A G E   W I L L   S E L F - D E S T R U C T";
      const labelPulse = 0.55 + 0.25 * urgency + tickPulse * 0.2 + 0.08 * Math.sin(now * 0.006);
      ctx.shadowColor = glowRGB;
      ctx.shadowBlur = Math.max(4, height * 0.012) * (0.8 + urgency);
      ctx.fillStyle = `rgba(${Math.round(lerp(232, 232, urgency))},${Math.round(lerp(201, 93, urgency))},${Math.round(
        lerp(106, 74, urgency),
      )},${labelPulse})`;
      // letter-spacing emulation already baked into the text spaces
      ctx.fillText(labelText, width / 2, labelY);
      ctx.restore();

      // ---- SMOKE (curling up from below) ----
      // spawn rate grows with urgency
      const spawnGap = lerp(420, 90, urgency);
      if (now - lastPuff > spawnGap && !inFlash) {
        lastPuff = now;
        const px = lerp(width * 0.2, width * 0.8, Math.random());
        puffs.push({
          x: px,
          y: height + 10,
          vx: (Math.random() - 0.5) * height * 0.01,
          vy: -(0.5 + Math.random() * 0.8) * height * 0.02,
          r: height * (0.04 + Math.random() * 0.05),
          life: 1,
          max: 1,
        });
      }
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      puffs = puffs.filter((p) => {
        p.life -= dtSec * 0.22;
        if (p.life <= 0) return false;
        p.x += p.vx * dt * 0.06 + Math.sin(now * 0.001 + p.y * 0.01) * 0.4;
        p.y += p.vy * dt * 0.06;
        p.vy *= 0.992;
        p.r += height * 0.012 * dtSec * 6;
        const a = p.life * p.life * (0.10 + 0.08 * urgency);
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const tint = urgency > 0.7;
        gr.addColorStop(0, tint ? `rgba(120,70,50,${a})` : `rgba(90,80,70,${a})`);
        gr.addColorStop(1, "rgba(20,16,12,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.restore();

      // ---- EMBER BURST at zero ----
      if (!inCount && !inFlash) burstDone = false; // reset for next loop (during cool)
      if (inFlash && !burstDone && flashT < 0.05) {
        burstDone = true;
        const ex = width / 2;
        const ey = ringCy;
        for (let i = 0; i < 70; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = (0.4 + Math.random() * 2.2) * height * 0.03;
          embers.push({
            x: ex + (Math.random() - 0.5) * dw,
            y: ey + (Math.random() - 0.5) * dh * 0.5,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - height * 0.01,
            life: 1,
            size: 1 + Math.random() * 3,
            hot: Math.random() < 0.5,
          });
        }
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      embers = embers.filter((e) => {
        e.life -= dtSec * 0.9;
        if (e.life <= 0) return false;
        e.x += e.vx * dtSec;
        e.y += e.vy * dtSec;
        e.vy += height * 0.6 * dtSec;
        e.vx *= 0.97;
        const a = Math.max(0, e.life);
        ctx.globalAlpha = a;
        ctx.fillStyle = e.hot ? "#fff3df" : a > 0.5 ? GOLD_LIGHT : RED;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (0.4 + a * 0.7), 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.restore();

      // ---- SCANLINE sweep (hard bright bar) ----
      if (!inFlash) {
        const scanY = ((now * 0.00018) % 1) * height;
        const band = Math.max(2, height * 0.012);
        const sg = ctx.createLinearGradient(0, scanY - band * 4, 0, scanY + band * 4);
        sg.addColorStop(0, "rgba(232,201,106,0)");
        sg.addColorStop(0.5, `rgba(255,245,220,${0.06 + 0.05 * urgency})`);
        sg.addColorStop(1, "rgba(232,201,106,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, scanY - band * 4, width, band * 8);
      }
      // fine horizontal CRT scanlines (subtle, constant)
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#000";
      const lineGap = Math.max(2, Math.round(height / 240));
      for (let y = 0; y < height; y += lineGap * 2) {
        ctx.fillRect(0, y, width, lineGap);
      }
      ctx.restore();

      // ---- BURNOUT FLASH at zero ----
      if (inFlash) {
        // hard rise, exponential fall to black-ish then cool reveals
        const rise = flashT < 0.12 ? flashT / 0.12 : 1;
        const fall = flashT < 0.12 ? 1 : Math.max(0, 1 - (flashT - 0.12) / 0.88);
        const intensity = rise * fall;
        const fl = ctx.createRadialGradient(cx, ringCy, 0, cx, ringCy, Math.hypot(width, height) * 0.75);
        fl.addColorStop(0, `rgba(255,255,252,${0.98 * intensity})`);
        fl.addColorStop(0.2, `rgba(255,236,200,${0.85 * intensity})`);
        fl.addColorStop(0.5, `rgba(232,93,74,${0.5 * intensity})`);
        fl.addColorStop(1, `rgba(40,8,4,${0.2 * intensity})`);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = fl;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // shockwave ring
        const sw = easeOutCubic(Math.min(1, flashT / 0.6));
        ctx.save();
        ctx.globalAlpha = (1 - sw) * 0.7;
        ctx.strokeStyle = "#ffe9c8";
        ctx.lineWidth = Math.max(2, height * 0.01 * (1 - sw));
        ctx.beginPath();
        ctx.arc(cx, ringCy, sw * Math.hypot(width, height) * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ---- COOL-DOWN dim overlay (display rebooting back to 00:05) ----
      if (coolT > 0 && coolT < 1) {
        // brief darkness then fade out as display returns
        const darkness = coolT < 0.4 ? 1 - coolT / 0.4 : 0;
        if (darkness > 0) {
          ctx.fillStyle = `rgba(8,6,4,${0.85 * darkness})`;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // ---- BLOOM (cheap): redraw a blurred copy of bright core via shadowed disc ----
      // (handled inline via shadowBlur above; add a soft central bloom that breathes)
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const bloomR = Math.min(width, height) * 0.4;
      const bg = ctx.createRadialGradient(cx, ringCy, 0, cx, ringCy, bloomR);
      bg.addColorStop(0, `rgba(${glowRGB.match(/\d+/g)?.join(",")},${0.05 + 0.06 * urgency + tickPulse * 0.05})`);
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // ---- VIGNETTE ----
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72,
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      // ---- FILM GRAIN (scrolled tile) ----
      if (grain) {
        ctx.save();
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.05 + 0.03 * urgency;
        const ox = (Math.random() * 160) | 0;
        const oy = (Math.random() * 160) | 0;
        for (let gx = -ox; gx < width; gx += 160) {
          for (let gy = -oy; gy < height; gy += 160) {
            ctx.drawImage(grain, gx, gy);
          }
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      puffs = [];
      embers = [];
      grain = null;
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
