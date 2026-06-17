"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GunBarrelWalk — the iconic 007 opener, in Purcell Ventures gold.
 *
 * A white dot tracks across black, a gold iris chases it, snaps open into a
 * rifled gun-barrel (concentric rings + spiral grooves), a silhouette walks
 * in and turns to face the lens, a flash fires, gold "blood" washes down the
 * lens, and the whole thing resets and loops forever.
 *
 * Pure CSS keyframes + SVG. No deps, no WebGL. Responsive via vmin/%.
 */

const LOOP_MS = 5600;

export default function GunBarrelWalk() {
  const [phase, setPhase] = useState(0); // forces keyframe restart per loop
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    let mounted = true;

    const tick = (t: number) => {
      if (!mounted) return;
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      if (elapsed >= LOOP_MS) {
        startRef.current = t;
        setPhase((p) => p + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      startRef.current = 0;
    };
  }, []);

  const GOLD = "#d4af37";
  const GOLD_LIGHT = "#e8c96a";
  const BG = "#0c0a08";

  return (
    <div
      key={phase}
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
      <style>{css(GOLD, GOLD_LIGHT)}</style>

      {/* Handheld drift wrapper — everything inside breathes slightly */}
      <div className="gbw-drift">
        {/* Tracking dot that the barrel chases across the screen */}
        <div className="gbw-trackdot" />

        {/* The gun-barrel iris: chases the dot, then snaps open + centers */}
        <div className="gbw-barrel">
          <svg
            className="gbw-barrel-svg"
            viewBox="-100 -100 200 200"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="gbw-ringGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={GOLD_LIGHT} />
                <stop offset="55%" stopColor={GOLD} />
                <stop offset="100%" stopColor="#8a6f1f" />
              </radialGradient>
              <filter id="gbw-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="gbw-lensClip">
                <circle cx="0" cy="0" r="92" />
              </clipPath>
            </defs>

            {/* Outer barrel rim */}
            <g filter="url(#gbw-glow)">
              <circle
                cx="0"
                cy="0"
                r="92"
                fill="none"
                stroke="url(#gbw-ringGrad)"
                strokeWidth="6"
                opacity="0.95"
              />
              {/* Concentric rifling rings */}
              {[78, 64, 50, 38].map((r, i) => (
                <circle
                  key={r}
                  cx="0"
                  cy="0"
                  r={r}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={1.4 - i * 0.15}
                  opacity={0.5 - i * 0.07}
                />
              ))}

              {/* Spiral grooves (rifling) — radial spokes rotating slowly */}
              <g className="gbw-rifling">
                {Array.from({ length: 24 }).map((_, i) => {
                  const a = (i / 24) * Math.PI * 2;
                  const x1 = Math.cos(a) * 36;
                  const y1 = Math.sin(a) * 36;
                  const x2 = Math.cos(a) * 90;
                  const y2 = Math.sin(a) * 90;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={GOLD}
                      strokeWidth="0.7"
                      opacity="0.22"
                    />
                  );
                })}
              </g>

              {/* The closed iris that snaps open: a filled disc that shrinks */}
              <circle className="gbw-iris" cx="0" cy="0" r="92" fill={BG} />

              {/* Crosshair reticle */}
              <g className="gbw-reticle" stroke={GOLD_LIGHT} strokeWidth="0.8" opacity="0.55">
                <line x1="-92" y1="0" x2="-44" y2="0" />
                <line x1="44" y1="0" x2="92" y2="0" />
                <line x1="0" y1="-92" x2="0" y2="-44" />
                <line x1="0" y1="44" x2="0" y2="92" />
              </g>

              {/* Bright aim dot at center */}
              <circle className="gbw-aimdot" cx="0" cy="0" r="2.6" fill={GOLD_LIGHT} />
            </g>

            {/* The silhouette figure — walks in, turns, fires. Clipped to lens. */}
            <g clipPath="url(#gbw-lensClip)">
              <g className="gbw-figure">
                {/* simple walking-man silhouette built from body + legs */}
                <ellipse cx="0" cy="-34" rx="11" ry="13" fill="#000" />
                <path
                  d="M -13 -22 Q 0 -28 13 -22 L 16 22 Q 0 30 -16 22 Z"
                  fill="#000"
                />
                {/* legs */}
                <g className="gbw-legs">
                  <path d="M -6 20 L -9 64 L -2 64 L 0 24 Z" fill="#000" />
                  <path d="M 6 20 L 9 64 L 2 64 L 0 24 Z" fill="#000" />
                </g>
                {/* arm raised (the gun) on turn */}
                <path className="gbw-arm" d="M 6 -20 L 30 -8 L 33 -3 L 8 -14 Z" fill="#000" />
              </g>
            </g>

            {/* Muzzle flash */}
            <circle className="gbw-flash" cx="0" cy="0" r="92" fill={GOLD_LIGHT} />
          </svg>
        </div>

        {/* Gold "blood" wash dripping down the lens */}
        <div className="gbw-blood" />
      </div>

      {/* Vignette + grain overlays */}
      <div className="gbw-vignette" />
      <div className="gbw-grain" />
    </div>
  );
}

function css(GOLD: string, GOLD_LIGHT: string) {
  return `
  .gbw-drift {
    position: absolute;
    inset: 0;
    animation: gbw-drift 5.6s ease-in-out infinite;
    transform-origin: center;
  }
  @keyframes gbw-drift {
    0%   { transform: translate(0, 0) rotate(0deg); }
    20%  { transform: translate(0.5%, -0.4%) rotate(-0.25deg); }
    45%  { transform: translate(-0.4%, 0.3%) rotate(0.2deg); }
    70%  { transform: translate(0.3%, 0.4%) rotate(-0.15deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  /* Tracking dot crossing the screen, fades as barrel takes over */
  .gbw-trackdot {
    position: absolute;
    top: 50%;
    left: 0;
    width: 1.4vmin;
    height: 1.4vmin;
    margin-top: -0.7vmin;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 1.6vmin 0.5vmin rgba(255,255,255,0.7), 0 0 3vmin 1vmin ${GOLD_LIGHT};
    animation: gbw-track 5.6s linear infinite;
    will-change: transform, opacity;
  }
  @keyframes gbw-track {
    0%   { transform: translateX(-6vmin); opacity: 0; }
    4%   { opacity: 1; }
    /* sweep across to center */
    20%  { transform: translateX(50vw); opacity: 1; }
    /* settle dead center */
    24%  { transform: translateX(50vw); opacity: 1; }
    28%  { opacity: 0; }
    100% { transform: translateX(50vw); opacity: 0; }
  }

  /* Barrel chases the dot then snaps to center + scales to fullbleed */
  .gbw-barrel {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 78vmin;
    height: 78vmin;
    margin: -39vmin 0 0 -39vmin;
    animation: gbw-barrel-move 5.6s ease-out infinite;
    will-change: transform, opacity;
  }
  @keyframes gbw-barrel-move {
    0%   { transform: translateX(-58vw) scale(0.12); opacity: 0; }
    5%   { opacity: 1; }
    /* chase the dot rightward, small */
    18%  { transform: translateX(0) scale(0.16); opacity: 1; }
    /* arrive center, snap open big */
    26%  { transform: translateX(0) scale(1); opacity: 1; }
    92%  { transform: translateX(0) scale(1); opacity: 1; }
    100% { transform: translateX(0) scale(1); opacity: 0; }
  }

  /* The iris disc shrinks to reveal the barrel interior */
  .gbw-iris {
    transform-origin: center;
    animation: gbw-iris 5.6s ease-out infinite;
  }
  @keyframes gbw-iris {
    0%, 24% { transform: scale(1); opacity: 1; }
    32%     { transform: scale(0); opacity: 1; }
    100%    { transform: scale(0); opacity: 1; }
  }

  .gbw-rifling { transform-origin: center; animation: gbw-spin 5.6s linear infinite; }
  @keyframes gbw-spin {
    0%, 26% { transform: rotate(0deg); opacity: 0; }
    32%     { opacity: 1; }
    100%    { transform: rotate(40deg); opacity: 1; }
  }

  .gbw-reticle, .gbw-aimdot {
    transform-origin: center;
    animation: gbw-reveal 5.6s ease-out infinite;
  }
  @keyframes gbw-reveal {
    0%, 28% { opacity: 0; }
    34%     { opacity: 1; }
    78%     { opacity: 1; }
    84%     { opacity: 0; }
    100%    { opacity: 0; }
  }

  /* Figure walks in from left, settles center, then turn pulse */
  .gbw-figure {
    transform-origin: center;
    animation: gbw-walkin 5.6s ease-out infinite;
    will-change: transform, opacity;
  }
  @keyframes gbw-walkin {
    0%, 32%  { transform: translateX(-70px) scale(1.05); opacity: 0; }
    38%      { opacity: 0.95; }
    /* walk to center */
    58%      { transform: translateX(0) scale(1); opacity: 1; }
    /* the turn-to-face: slight squash/rotate */
    66%      { transform: translateX(0) scale(1, 1.02) rotate(0deg); opacity: 1; }
    70%      { transform: translateX(0) scaleX(0.6); opacity: 1; }
    74%      { transform: translateX(0) scaleX(1.04); opacity: 1; }
    80%      { transform: translateX(0) scale(1); opacity: 1; }
    84%      { opacity: 0; }
    100%     { opacity: 0; }
  }

  /* Legs alternate while walking, freeze on turn */
  .gbw-legs { transform-origin: 0px 20px; animation: gbw-stride 0.42s ease-in-out infinite; }
  @keyframes gbw-stride {
    0%, 100% { transform: skewX(-8deg); }
    50%      { transform: skewX(8deg); }
  }

  /* Gun-arm raises on the turn */
  .gbw-arm { transform-origin: 6px -20px; animation: gbw-aim 5.6s ease-out infinite; }
  @keyframes gbw-aim {
    0%, 70% { transform: rotate(40deg) scale(0.7); opacity: 0; }
    74%     { transform: rotate(0deg) scale(1); opacity: 1; }
    82%     { transform: rotate(0deg) scale(1); opacity: 1; }
    84%     { opacity: 0; }
    100%    { opacity: 0; }
  }

  /* Muzzle flash blast */
  .gbw-flash {
    transform-origin: center;
    animation: gbw-flash 5.6s ease-out infinite;
    mix-blend-mode: screen;
  }
  @keyframes gbw-flash {
    0%, 81% { opacity: 0; transform: scale(0.2); }
    82%     { opacity: 0.95; transform: scale(1); }
    86%     { opacity: 0; transform: scale(1.1); }
    100%    { opacity: 0; }
  }

  /* Gold blood washing down the lens after the shot */
  .gbw-blood {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 78vmin;
    height: 78vmin;
    margin: -39vmin 0 0 -39vmin;
    border-radius: 50%;
    overflow: hidden;
    pointer-events: none;
    background:
      linear-gradient(180deg,
        rgba(232,201,106,0.0) 0%,
        rgba(212,175,55,0.85) 22%,
        rgba(212,175,55,0.95) 55%,
        rgba(138,111,31,0.98) 100%);
    -webkit-mask: radial-gradient(circle at 50% 50%, #000 0 49%, transparent 50%);
            mask: radial-gradient(circle at 50% 50%, #000 0 49%, transparent 50%);
    transform: translateY(-100%);
    animation: gbw-blood 5.6s ease-in infinite;
    will-change: transform, opacity;
    opacity: 0;
  }
  @keyframes gbw-blood {
    0%, 84% { transform: translateY(-100%); opacity: 0; }
    85%     { transform: translateY(-100%); opacity: 1; }
    /* drips down to fill the lens */
    98%     { transform: translateY(0%); opacity: 1; }
    100%    { transform: translateY(0%); opacity: 0; }
  }

  /* Heavy cinematic vignette */
  .gbw-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 50% 50%,
        rgba(0,0,0,0) 38%,
        rgba(0,0,0,0.55) 72%,
        rgba(0,0,0,0.95) 100%);
  }

  /* Film grain */
  .gbw-grain {
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    opacity: 0.07;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    animation: gbw-grain 0.5s steps(4) infinite;
  }
  @keyframes gbw-grain {
    0%   { transform: translate(0, 0); }
    25%  { transform: translate(-3%, 2%); }
    50%  { transform: translate(2%, -3%); }
    75%  { transform: translate(-2%, -2%); }
    100% { transform: translate(0, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .gbw-drift, .gbw-grain { animation-duration: 0.001s; animation-iteration-count: 1; }
  }
  `;
}
