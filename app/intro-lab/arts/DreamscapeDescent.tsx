"use client";

import { useEffect, useRef } from "react";

export default function DreamscapeDescent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0c0a08";
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);
    else window.addEventListener("resize", resize);

    const TWO_PI = Math.PI * 2;
    const GOLD = "212, 175, 55"; // #d4af37
    const GOLD_LIGHT = "232, 201, 106"; // #e8c96a

    // ------------------------------------------------------------------
    // SILHOUETTE MOTIFS. Each is drawn in a local space spanning roughly
    // [-1,1] x [-1,1], centred at origin, then placed/scaled by a layer.
    // All use the current ctx.fillStyle / strokeStyle so glow + color are
    // controlled by the caller.
    // ------------------------------------------------------------------

    // A reaching hand: palm + five tapering fingers, fingertips up.
    const drawHand = (t: number) => {
      ctx.beginPath();
      // wrist / palm base
      ctx.moveTo(-0.34, 0.95);
      ctx.bezierCurveTo(-0.5, 0.5, -0.46, 0.1, -0.38, -0.12);
      const fingers = [
        { x: -0.3, len: 0.62, w: 0.085 },
        { x: -0.12, len: 0.86, w: 0.092 },
        { x: 0.06, len: 0.98, w: 0.095 },
        { x: 0.24, len: 0.82, w: 0.09 },
      ];
      for (const f of fingers) {
        const tip = -0.12 - f.len;
        ctx.bezierCurveTo(
          f.x - f.w,
          tip + 0.18,
          f.x - f.w * 0.5,
          tip,
          f.x,
          tip
        );
        ctx.bezierCurveTo(
          f.x + f.w * 0.6,
          tip,
          f.x + f.w,
          tip + 0.2,
          f.x + f.w + 0.02,
          -0.1
        );
      }
      // thumb
      ctx.bezierCurveTo(0.5, 0.0, 0.6, 0.32, 0.46, 0.55);
      ctx.bezierCurveTo(0.4, 0.74, 0.2, 0.86, -0.34, 0.95);
      ctx.closePath();
      ctx.fill();
      // a faint shimmer line up the longest finger
      ctx.save();
      ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * TWO_PI);
      ctx.lineWidth = 0.02;
      ctx.beginPath();
      ctx.moveTo(0.06, -0.1);
      ctx.lineTo(0.06, -1.06);
      ctx.stroke();
      ctx.restore();
    };

    // A watching eye: almond outline, iris, pupil; lid slowly closes/opens.
    const drawEye = (t: number) => {
      const open = 0.55 + 0.45 * (0.5 + 0.5 * Math.cos(t * TWO_PI)); // blink
      ctx.beginPath();
      ctx.moveTo(-1, 0);
      ctx.quadraticCurveTo(0, -0.62 * open, 1, 0);
      ctx.quadraticCurveTo(0, 0.62 * open, -1, 0);
      ctx.fill();
      // iris (drawn darker by punching with background via separate fill)
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 0.3 * open + 0.05, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
      // iris ring + pupil glow back in gold
      ctx.beginPath();
      ctx.arc(0, 0, 0.3 * open + 0.05, 0, TWO_PI);
      ctx.lineWidth = 0.05;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 0.1, 0, TWO_PI);
      ctx.fill();
    };

    // A pistol silhouette, barrel pointing left.
    const drawGun = () => {
      ctx.beginPath();
      ctx.moveTo(-1.0, -0.18);
      ctx.lineTo(0.05, -0.18);
      ctx.lineTo(0.05, -0.05);
      ctx.lineTo(0.2, -0.05);
      ctx.lineTo(0.2, -0.2);
      ctx.lineTo(0.55, -0.2);
      ctx.lineTo(0.62, 0.05);
      ctx.lineTo(0.5, 0.55);
      ctx.lineTo(0.28, 0.55);
      ctx.lineTo(0.18, 0.12);
      ctx.lineTo(0.0, 0.12);
      // trigger guard
      ctx.lineTo(-0.05, 0.34);
      ctx.lineTo(-0.22, 0.34);
      ctx.lineTo(-0.2, 0.1);
      ctx.lineTo(-1.0, 0.06);
      ctx.closePath();
      ctx.fill();
      // muzzle highlight
      ctx.beginPath();
      ctx.arc(-1.0, -0.06, 0.06, 0, TWO_PI);
      ctx.fill();
    };

    // A rose: layered petals as overlapping arcs spiralling out.
    const drawRose = (t: number) => {
      const spin = t * 0.3;
      // outer petals
      for (let ring = 3; ring >= 1; ring--) {
        const r = ring * 0.28;
        const count = ring * 4 + 2;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * TWO_PI + spin + ring * 0.4;
          const px = Math.cos(a) * r * 0.6;
          const py = Math.sin(a) * r * 0.6;
          ctx.beginPath();
          ctx.ellipse(px, py, r * 0.42, r * 0.62, a + Math.PI / 2, 0, TWO_PI);
          ctx.globalAlpha *= 1; // keep
          ctx.fill();
        }
      }
      // bright core
      ctx.beginPath();
      ctx.arc(0, 0, 0.12, 0, TWO_PI);
      ctx.fill();
      // stem
      ctx.lineWidth = 0.04;
      ctx.beginPath();
      ctx.moveTo(0, 0.2);
      ctx.quadraticCurveTo(0.12, 0.7, 0.0, 1.15);
      ctx.stroke();
    };

    // Concentric water ripples expanding outward, phase from t.
    const drawRipple = (t: number) => {
      const rings = 5;
      for (let i = 0; i < rings; i++) {
        const phase = ((t + i / rings) % 1);
        const r = phase * 1.1;
        const a = (1 - phase) * 0.9;
        ctx.save();
        ctx.globalAlpha *= a;
        ctx.lineWidth = 0.035 * (1 - phase) + 0.008;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.34, 0, 0, TWO_PI);
        ctx.stroke();
        ctx.restore();
      }
    };

    type MotifKind = "hand" | "eye" | "gun" | "rose" | "ripple";
    const drawMotif = (kind: MotifKind, t: number) => {
      switch (kind) {
        case "hand":
          return drawHand(t);
        case "eye":
          return drawEye(t);
        case "gun":
          return drawGun();
        case "rose":
          return drawRose(t);
        case "ripple":
          return drawRipple(t);
      }
    };

    // ------------------------------------------------------------------
    // PARALLAX LAYERS. We descend: world scrolls UPWARD. Each layer owns a
    // vertical tile of normalized height TILE; motifs sit at fixed spots in
    // that tile and the tile repeats, so the scroll loops seamlessly with
    // period = TILE / speed. Depth controls speed, scale, blur, alpha.
    // ------------------------------------------------------------------
    const TILE = 2.2; // tile height in "screens"

    type Placed = {
      kind: MotifKind;
      x: number; // 0..1 across width
      y: number; // 0..TILE down the tile
      size: number; // base radius in screen-min units
      rot: number;
      spin: number; // self-anim speed
      flip: number;
    };

    type Layer = {
      depth: number; // 0 far .. 1 near
      speed: number; // screens per second
      blur: number;
      alpha: number;
      hue: string;
      items: Placed[];
    };

    const KINDS: MotifKind[] = ["hand", "eye", "gun", "rose", "ripple"];

    // Deterministic pseudo-random so layout is stable across resizes.
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    const makeLayer = (
      depth: number,
      speed: number,
      blur: number,
      alpha: number,
      count: number,
      hue: string
    ): Layer => {
      const items: Placed[] = [];
      for (let i = 0; i < count; i++) {
        items.push({
          kind: KINDS[Math.floor(rnd() * KINDS.length)],
          x: 0.1 + rnd() * 0.8,
          // spread evenly down the tile with jitter to avoid banding
          y: ((i + rnd() * 0.6) / count) * TILE,
          size: 0.1 + rnd() * 0.16,
          rot: (rnd() - 0.5) * 0.5,
          spin: 0.2 + rnd() * 0.8,
          flip: rnd() < 0.5 ? -1 : 1,
        });
      }
      return { depth, speed, blur, alpha, hue, items };
    };

    const layers: Layer[] = [
      makeLayer(0.15, 0.10, 7, 0.16, 7, GOLD), // far fog
      makeLayer(0.4, 0.20, 3.5, 0.4, 6, GOLD),
      makeLayer(0.7, 0.34, 1.4, 0.7, 5, GOLD_LIGHT),
      makeLayer(1.0, 0.5, 0, 0.95, 4, GOLD_LIGHT), // near, sharp
    ];

    let start = performance.now();

    const render = (now: number) => {
      const elapsed = (now - start) / 1000; // seconds

      // Trail / persistence wash toward background for dreamy motion blur.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(12, 10, 8, 0.30)";
      ctx.fillRect(0, 0, width, height);

      const minDim = Math.min(width, height);

      // Subtle descending vertical "shaft" glow down the centre — the light
      // at the bottom of the well you fall toward.
      const shaft = ctx.createRadialGradient(
        width * 0.5,
        height * 1.05,
        0,
        width * 0.5,
        height * 1.05,
        minDim * 1.1
      );
      shaft.addColorStop(0, "rgba(212,175,55,0.10)");
      shaft.addColorStop(0.5, "rgba(212,175,55,0.03)");
      shaft.addColorStop(1, "rgba(212,175,55,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = shaft;
      ctx.fillRect(0, 0, width, height);

      for (const layer of layers) {
        // scroll offset in screens (wraps over TILE -> seamless)
        const off = (elapsed * layer.speed) % TILE;
        const scale = 0.5 + layer.depth; // nearer = bigger
        ctx.save();
        ctx.filter = layer.blur > 0 ? `blur(${layer.blur}px)` : "none";
        ctx.globalCompositeOperation = "lighter";

        for (const it of layer.items) {
          // world y within tile, scrolled upward, wrapped to [0,TILE)
          let wy = it.y - off;
          wy = ((wy % TILE) + TILE) % TILE;
          // map tile-space (0..TILE) to screen with a slight overscan so
          // motifs are born below the frame and die above it.
          // We render across [−0.2, 1.2] screens vertically.
          // Convert: place 0 at bottom overscan, TILE spanning ~1.6 screens.
          const span = 1.7;
          const screenY = (1.15 - (wy / TILE) * span) * height;

          if (screenY < -0.35 * height || screenY > 1.35 * height) continue;

          const px = it.x * width;
          const sz = it.size * minDim * scale;

          // depth-fade: dim near top (dissolving into gold-black above) and
          // at very bottom (emerging from depth). Peak mid-screen.
          const ny = screenY / height; // 0 top .. 1 bottom
          let edgeFade = 1;
          if (ny < 0.18) edgeFade = Math.max(0, ny / 0.18);
          else if (ny > 0.82) edgeFade = Math.max(0, (1 - ny) / 0.18);
          const a = layer.alpha * edgeFade;
          if (a <= 0.003) continue;

          const t = (elapsed * it.spin + it.x * 3.1) % 1; // per-motif phase

          ctx.save();
          ctx.translate(px, screenY);
          ctx.scale(it.flip * sz, sz);
          ctx.rotate(it.rot);

          // GLOW PASS (wide, dim) then CORE PASS (bright) for cinematic bloom.
          ctx.fillStyle = `rgba(${layer.hue}, ${a * 0.5})`;
          ctx.strokeStyle = `rgba(${layer.hue}, ${a * 0.5})`;
          ctx.shadowColor = `rgba(${layer.hue}, ${a})`;
          ctx.shadowBlur = sz * 0.5;
          ctx.globalAlpha = 1;
          drawMotif(it.kind, t);

          // brighter core overlay
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${a * 0.85})`;
          ctx.strokeStyle = `rgba(${GOLD_LIGHT}, ${a * 0.85})`;
          drawMotif(it.kind, t);

          ctx.restore();
        }
        ctx.restore();
      }

      // ---- GRAIN: cheap animated film grain via sparse noise dots. ----
      ctx.globalCompositeOperation = "overlay";
      const grainCount = Math.floor((width * height) / 5500);
      for (let i = 0; i < grainCount; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        const g = Math.random();
        ctx.fillStyle = `rgba(${
          g > 0.5 ? "255,255,255" : "0,0,0"
        }, ${0.04 + Math.random() * 0.05})`;
        ctx.fillRect(gx, gy, 1.3, 1.3);
      }

      // ---- VIGNETTE: darken edges for depth. ----
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.46,
        minDim * 0.25,
        width * 0.5,
        height * 0.5,
        minDim * 0.85
      );
      vig.addColorStop(0, "rgba(12,10,8,0)");
      vig.addColorStop(0.7, "rgba(12,10,8,0.25)");
      vig.addColorStop(1, "rgba(12,10,8,0.82)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame((t) => {
      start = t;
      render(t);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      ctx.filter = "none";
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
