"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * RiflingSpiral — looking down the inside of a rotating rifled gun barrel.
 * Gold spiral grooves twist inward toward a bright muzzle point at center.
 * The whole bore rotates slowly; heavy dark vignette; subtle film grain + glow.
 * Seamless ~5s rotation loop, CSS-driven (animations pause-safe + GPU friendly).
 */
export default function RiflingSpiral() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Number of rifling grooves around the bore.
  const GROOVES = 7;
  // Build one logarithmic-spiral groove as an SVG path, rotated by `offsetDeg`.
  const buildSpiral = (offsetDeg: number) => {
    const cx = 50;
    const cy = 50;
    const turns = 2.15; // how many times each groove wraps before the muzzle
    const maxR = 62; // start radius (off-frame edge)
    const minR = 1.4; // ends near the muzzle point
    const steps = 160;
    const growth = Math.log(maxR / minR);
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0 -> outer edge, 1 -> muzzle
      const ang =
        (offsetDeg * Math.PI) / 180 + t * turns * Math.PI * 2;
      const r = maxR * Math.exp(-growth * t);
      const x = cx + r * Math.cos(ang);
      const y = cy + r * Math.sin(ang);
      d += `${i === 0 ? "M" : "L"}${x.toFixed(3)} ${y.toFixed(3)} `;
    }
    return d.trim();
  };

  const grooves = Array.from({ length: GROOVES }, (_, i) =>
    buildSpiral((360 / GROOVES) * i)
  );
  // Land paths sit halfway between grooves (the raised metal between rifling).
  const lands = Array.from({ length: GROOVES }, (_, i) =>
    buildSpiral((360 / GROOVES) * i + 360 / GROOVES / 2)
  );

  const spinDur = "11s";
  const counterDur = "11s";

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
      {/* Faint cool steel sheen behind everything so the bore reads as metal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, #1c1813 0%, #120f0c 38%, #0c0a08 72%)",
        }}
      />

      {/* The rotating bore. Square via vmin so it stays circular in any box. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "142vmin",
          height: "142vmin",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: reduced
              ? undefined
              : `${uid}-spin ${spinDur} linear infinite`,
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <defs>
              {/* Groove glow */}
              <radialGradient id={`${uid}-gold`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff3cf" />
                <stop offset="14%" stopColor="#e8c96a" />
                <stop offset="55%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#5e4a16" />
              </radialGradient>
              <radialGradient id={`${uid}-land`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6b5a2c" />
                <stop offset="60%" stopColor="#352a14" />
                <stop offset="100%" stopColor="#171109" />
              </radialGradient>
              <filter
                id={`${uid}-blur`}
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="0.55" />
              </filter>
              <filter
                id={`${uid}-soft`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="1.6" />
              </filter>
            </defs>

            {/* Shadowed lands between the bright grooves (depth) */}
            <g
              fill="none"
              stroke={`url(#${uid}-land)`}
              strokeWidth={3.6}
              strokeLinecap="round"
              opacity={0.85}
            >
              {lands.map((d, i) => (
                <path key={`l${i}`} d={d} />
              ))}
            </g>

            {/* Soft wide glow pass under the grooves */}
            <g
              fill="none"
              stroke={`url(#${uid}-gold)`}
              strokeWidth={3.2}
              strokeLinecap="round"
              filter={`url(#${uid}-soft)`}
              opacity={0.5}
            >
              {grooves.map((d, i) => (
                <path key={`g-glow${i}`} d={d} />
              ))}
            </g>

            {/* Crisp bright grooves */}
            <g
              fill="none"
              stroke={`url(#${uid}-gold)`}
              strokeWidth={1.5}
              strokeLinecap="round"
              filter={`url(#${uid}-blur)`}
            >
              {grooves.map((d, i) => (
                <path key={`g${i}`} d={d} />
              ))}
            </g>

            {/* Inner highlight thread riding each groove */}
            <g
              fill="none"
              stroke="#fff6dc"
              strokeWidth={0.4}
              strokeLinecap="round"
              opacity={0.7}
            >
              {grooves.map((d, i) => (
                <path key={`gh${i}`} d={d} />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Bright muzzle point at the dead center — the light at the end of the bore.
          Counter-rotates very subtly so it shimmers rather than sits dead still. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "26vmin",
          height: "26vmin",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,247,219,0.95) 0%, rgba(232,201,106,0.7) 16%, rgba(212,175,55,0.35) 34%, rgba(212,175,55,0.08) 55%, rgba(212,175,55,0) 70%)",
          filter: "blur(0.4vmin)",
          mixBlendMode: "screen",
          animation: reduced
            ? undefined
            : `${uid}-pulse 5s ease-in-out infinite, ${uid}-counter ${counterDur} linear infinite`,
        }}
      />
      {/* Hot core */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "6vmin",
          height: "6vmin",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffffff 0%, #fff3cf 40%, rgba(232,201,106,0) 78%)",
          mixBlendMode: "screen",
          animation: reduced ? undefined : `${uid}-pulse 5s ease-in-out infinite`,
        }}
      />

      {/* Heavy spy-barrel vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 50%, rgba(12,10,8,0) 30%, rgba(12,10,8,0.45) 52%, rgba(12,10,8,0.9) 74%, #0c0a08 92%)",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          pointerEvents: "none",
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"
          ).replace(/%23/g, "%2523")}")`,
          backgroundSize: "160px 160px",
          animation: reduced ? undefined : `${uid}-grain 0.7s steps(4) infinite`,
        }}
      />

      <style>{`
        @keyframes ${uid}-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(${360 / GROOVES}deg); }
        }
        @keyframes ${uid}-counter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-${360 / GROOVES}deg); }
        }
        @keyframes ${uid}-pulse {
          0%, 100% { opacity: 0.82; }
          50%      { opacity: 1; }
        }
        @keyframes ${uid}-grain {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-3%, 2%); }
          50%  { transform: translate(2%, -4%); }
          75%  { transform: translate(-2%, -2%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
