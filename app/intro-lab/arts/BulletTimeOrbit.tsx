"use client";

import { useEffect, useRef } from "react";

/**
 * BulletTimeOrbit — a Matrix "bullet-time" frozen moment.
 * A suspended gold bullet hangs mid-flight with a frozen ring of debris shards
 * orbiting it in faux-3D space, while the CAMERA arcs a full 360° around the
 * scene (canvas-2d pseudo-3D projection with perspective + parallax). Motion-blur
 * ripple lines trail through the air to imply time has stopped. Layered with
 * depth-fade, bloom, vignette, and animated film grain. Seamless 360° loop.
 */
export default function BulletTimeOrbit() {
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

    // ---- The frozen scene: a 3D point cloud, fixed in world space ----
    // Camera orbits this cloud. Points never move (time is stopped); only the
    // camera angle advances, producing the bullet-time sweep.
    type Shard = {
      x: number; // world coords (centered on bullet)
      y: number;
      z: number;
      size: number;
      hue: number; // 0..1 -> darker..lighter gold
      twinkle: number;
    };

    const FOCAL = 520; // perspective focal length (px-ish, scaled to view)
    const shards: Shard[] = [];
    const RING_R = 230; // radius of frozen debris ring
    const N_RING = 64;
    for (let i = 0; i < N_RING; i++) {
      const a = (i / N_RING) * Math.PI * 2;
      // Ring lies in a slightly tilted plane for depth.
      const wobble = Math.sin(a * 5) * 26 + (Math.random() - 0.5) * 34;
      const r = RING_R + wobble;
      const tilt = 0.42; // plane tilt
      const x = Math.cos(a) * r;
      const yFlat = Math.sin(a) * r;
      const y = yFlat * Math.cos(tilt) + (Math.random() - 0.5) * 40;
      const z = yFlat * Math.sin(tilt) + (Math.random() - 0.5) * 60;
      shards.push({
        x,
        y,
        z,
        size: 1.4 + Math.random() * 4.6,
        hue: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
      });
    }
    // Scattered dust filling the volume for parallax depth.
    const N_DUST = 90;
    for (let i = 0; i < N_DUST; i++) {
      const rr = 60 + Math.random() * 360;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      shards.push({
        x: Math.cos(a) * Math.cos(b) * rr,
        y: Math.sin(b) * rr,
        z: Math.sin(a) * Math.cos(b) * rr,
        size: 0.5 + Math.random() * 1.8,
        hue: Math.random() * 0.6,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    // Bullet body: a short streak of points along the flight axis (the X axis),
    // so as the camera arcs we see it elongate and foreshorten convincingly.
    type BulletNode = { x: number; y: number; z: number; w: number };
    const bullet: BulletNode[] = [];
    const BULLET_LEN = 150;
    const BULLET_SEGS = 26;
    for (let i = 0; i <= BULLET_SEGS; i++) {
      const t = i / BULLET_SEGS; // 0 tail -> 1 nose
      // Ogive-ish profile: fat middle, pointed nose, flat tail.
      const profile =
        t < 0.62 ? 0.55 + t * 0.6 : Math.max(0.02, 1 - (t - 0.62) * 2.55);
      bullet.push({
        x: (t - 0.5) * BULLET_LEN,
        y: 0,
        z: 0,
        w: profile * 26,
      });
    }

    // ---- Projection ----
    let camRot = 0; // azimuth around Y axis (the loop driver)
    const camElev = 0.16; // fixed slight elevation so the ring reads as a disc

    const project = (x: number, y: number, z: number) => {
      // Rotate world by -camRot about Y (camera orbits -> world spins opposite).
      const cr = Math.cos(camRot);
      const sr = Math.sin(camRot);
      const rx = x * cr - z * sr;
      let rz = x * sr + z * cr;
      // Elevation tilt about X.
      const ce = Math.cos(camElev);
      const se = Math.sin(camElev);
      const ry = y * ce - rz * se;
      rz = y * se + rz * ce;
      const camZ = 560; // camera distance from scene center
      const depth = camZ + rz;
      const persp = FOCAL / Math.max(40, depth);
      const scale = Math.min(W, H) / 620; // fit to viewport
      return {
        sx: W / 2 + rx * persp * scale,
        sy: H / 2 + ry * persp * scale,
        scale: persp * scale,
        depth,
      };
    };

    // ---- Ripple lines (time-frozen shockwave arcs) baked in world space ----
    const ripples = Array.from({ length: 5 }, (_, i) => ({
      r: 120 + i * 78,
      seg: 90 + i * 12,
      phase: i * 1.3,
    }));

    // ---- Animation loop ----
    let raf = 0;
    let start = performance.now();
    const PERIOD = 17000; // ms for a full 360° camera arc (seamless)

    const drawGlow = (
      sx: number,
      sy: number,
      radius: number,
      rgb: string,
      a: number
    ) => {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(0.5, `rgba(${rgb},${a * 0.35})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now: number) => {
      const elapsed = (now - start) % PERIOD;
      const tNorm = elapsed / PERIOD; // 0..1
      camRot = tNorm * Math.PI * 2;
      const tSec = (now - start) / 1000;

      // Background wash — warm near-black with a faint radial lift.
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      const bgGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.7
      );
      bgGrad.addColorStop(0, "rgba(40,32,18,0.55)");
      bgGrad.addColorStop(0.45, "rgba(20,16,10,0.4)");
      bgGrad.addColorStop(1, "rgba(12,10,8,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      // ---- Frozen ripple shockwave arcs (motion-blur ripple lines) ----
      for (const rip of ripples) {
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= rip.seg; s++) {
          const a = (s / rip.seg) * Math.PI * 2;
          // Ripple sits in the ring plane (tilted), gently undulating.
          const undul = Math.sin(a * 7 + rip.phase) * 10;
          const r = rip.r + undul;
          const tilt = 0.42;
          const wx = Math.cos(a) * r;
          const flat = Math.sin(a) * r;
          const wy = flat * Math.cos(tilt);
          const wz = flat * Math.sin(tilt);
          const p = project(wx, wy, wz);
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else ctx.lineTo(p.sx, p.sy);
        }
        const shimmer = 0.05 + 0.04 * (0.5 + 0.5 * Math.sin(tSec * 0.8 + rip.phase));
        ctx.strokeStyle = `rgba(${GOLD},${shimmer})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ---- Collect all projected sprites, sort by depth (painter's algo) ----
      type Sprite = {
        sx: number;
        sy: number;
        scale: number;
        depth: number;
        size: number;
        rgb: string;
        alpha: number;
      };
      const sprites: Sprite[] = [];
      for (const sh of shards) {
        const p = project(sh.x, sh.y, sh.z);
        if (p.depth < 60) continue;
        const tw = 0.65 + 0.35 * Math.sin(tSec * 1.4 + sh.twinkle);
        // Depth fade: nearer = brighter.
        const df = Math.max(0.12, Math.min(1, (FOCAL / p.depth) * 1.1));
        const rgb = sh.hue > 0.5 ? GOLD_LIGHT : GOLD;
        sprites.push({
          sx: p.sx,
          sy: p.sy,
          scale: p.scale,
          depth: p.depth,
          size: Math.max(0.4, sh.size * p.scale * 1.1),
          rgb,
          alpha: Math.min(0.95, 0.5 * df * tw + 0.12),
        });
      }
      sprites.sort((a, b) => b.depth - a.depth);

      for (const sp of sprites) {
        // Soft bloom halo.
        drawGlow(sp.sx, sp.sy, sp.size * 5.5, sp.rgb, sp.alpha * 0.5);
        // Core.
        ctx.fillStyle = `rgba(${sp.rgb},${sp.alpha})`;
        ctx.beginPath();
        ctx.arc(sp.sx, sp.sy, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- The suspended bullet (drawn as a depth-sorted ribbon) ----
      const projBullet = bullet.map((n) => ({ n, p: project(n.x, n.y, n.z) }));

      const drawBullet = () => {
        // Trailing motion-blur streak behind the bullet (frozen vapor trail).
        const tail = project(-BULLET_LEN * 1.9, 0, 0);
        const nose = project(BULLET_LEN * 0.62, 0, 0);
        const streakGrad = ctx.createLinearGradient(
          tail.sx,
          tail.sy,
          nose.sx,
          nose.sy
        );
        streakGrad.addColorStop(0, `rgba(${GOLD},0)`);
        streakGrad.addColorStop(0.7, `rgba(${GOLD},0.10)`);
        streakGrad.addColorStop(1, `rgba(${GOLD_LIGHT},0.22)`);
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = Math.max(1, 10 * nose.scale);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tail.sx, tail.sy);
        ctx.lineTo(nose.sx, nose.sy);
        ctx.stroke();

        // Build the bullet silhouette as two offset rails (top/bottom of profile).
        const topPts: { x: number; y: number }[] = [];
        const botPts: { x: number; y: number }[] = [];
        // Offset the profile perpendicular to the screen-projected axis.
        for (const { n } of projBullet) {
          const pc = project(n.x, n.y - n.w, n.z);
          const pf = project(n.x, n.y + n.w, n.z);
          topPts.push({ x: pc.sx, y: pc.sy });
          botPts.push({ x: pf.sx, y: pf.sy });
        }
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y);
        for (let i = 1; i < topPts.length; i++)
          ctx.lineTo(topPts[i].x, topPts[i].y);
        for (let i = botPts.length - 1; i >= 0; i--)
          ctx.lineTo(botPts[i].x, botPts[i].y);
        ctx.closePath();

        // Metallic gold fill across the body.
        const bc = project(0, 0, 0);
        const bg = ctx.createLinearGradient(
          bc.sx,
          bc.sy - 30 * bc.scale,
          bc.sx,
          bc.sy + 30 * bc.scale
        );
        bg.addColorStop(0, "rgba(120,92,30,0.95)");
        bg.addColorStop(0.4, `rgba(${GOLD_LIGHT},0.98)`);
        bg.addColorStop(0.52, "rgba(255,247,219,1)");
        bg.addColorStop(0.62, `rgba(${GOLD},0.98)`);
        bg.addColorStop(1, "rgba(94,74,22,0.95)");
        ctx.fillStyle = bg;
        ctx.fill();

        // Rim light along the top rail.
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y);
        for (let i = 1; i < topPts.length; i++)
          ctx.lineTo(topPts[i].x, topPts[i].y);
        ctx.strokeStyle = "rgba(255,247,219,0.85)";
        ctx.lineWidth = Math.max(0.6, 1.4 * bc.scale);
        ctx.stroke();

        // Hot nose bloom.
        drawGlow(nose.sx, nose.sy, 26 * nose.scale, GOLD_LIGHT, 0.9);
        drawGlow(nose.sx, nose.sy, 10 * nose.scale, "255,247,219", 1);
      };

      // The bullet is the focal subject — drawn over the additive cloud so it
      // reads as the held centerpiece regardless of camera angle. "lighter"
      // compositing keeps the surrounding shard bloom feathering around it.
      drawBullet();

      ctx.globalCompositeOperation = "source-over";

      // ---- Vignette ----
      const vg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.28,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.72
      );
      vg.addColorStop(0, "rgba(12,10,8,0)");
      vg.addColorStop(0.6, "rgba(12,10,8,0.35)");
      vg.addColorStop(0.85, "rgba(12,10,8,0.82)");
      vg.addColorStop(1, "rgba(12,10,8,0.98)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ---- Film grain (procedural, cheap) ----
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
      // Render a single representative frozen frame.
      start = performance.now() - PERIOD * 0.18;
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
