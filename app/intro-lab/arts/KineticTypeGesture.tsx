"use client";

/**
 * KineticTypeGesture — Saul Bass kinetic typography.
 *
 * On a hard 8s beat, spy phrases snap and slide into place: "CLASSIFIED" rams
 * in from the left under a wiping gold bar, "EYES ONLY" drops from the top and
 * a block wipes it clean, the title "PURCELL / VENTURES" assembles word-by-word
 * with a center bar-split reveal, and "EST 2026" rotates into a corner. Gold
 * blocks wipe across to reveal type, a percussive accent dash punches the beat,
 * everything held tight then cut — film grain, vignette, and a warm glow floor.
 * Pure CSS/SVG, self-contained, seamless 8s loop.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const INK = "#0c0a08";

const CINZEL = "var(--font-cinzel), Georgia, serif";
const DM = "var(--font-dm-sans), system-ui, sans-serif";

export default function KineticTypeGesture() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: INK,
        width: "100%",
        height: "100%",
      }}
    >
      <style>{css}</style>

      {/* warm vignette + gold glow floor */}
      <div className="ktg-vignette" aria-hidden />

      {/* the kinetic stage — scales to whichever viewport axis is smaller */}
      <div className="ktg-stage">
        {/* percussive beat accent — a dash that punches in on every downbeat */}
        <div className="ktg-beat" aria-hidden />

        {/* CLASSIFIED — rams in from the left under a wiping bar */}
        <div className="ktg-row ktg-row--classified">
          <span className="ktg-clip">
            <span className="ktg-word ktg-word--ram">CLASSIFIED</span>
            <span className="ktg-bar ktg-bar--ram" aria-hidden />
          </span>
        </div>

        {/* EYES ONLY — drops from the top, block wipes it clean */}
        <div className="ktg-row ktg-row--eyes">
          <span className="ktg-clip">
            <span className="ktg-word ktg-word--drop">EYES&nbsp;ONLY</span>
            <span className="ktg-bar ktg-bar--drop" aria-hidden />
          </span>
        </div>

        {/* PURCELL VENTURES — the title, assembled word-by-word, center-split reveal */}
        <div className="ktg-title">
          <span className="ktg-titleclip">
            <span className="ktg-titleword ktg-titleword--a">PURCELL</span>
            <span className="ktg-split ktg-split--a" aria-hidden />
          </span>
          <span className="ktg-titleclip">
            <span className="ktg-titleword ktg-titleword--b">VENTURES</span>
            <span className="ktg-split ktg-split--b" aria-hidden />
          </span>
          {/* hairline that draws under the locked title */}
          <span className="ktg-rule" aria-hidden />
        </div>

        {/* EST 2026 — rotates into the bottom corner */}
        <div className="ktg-est">
          <span className="ktg-word ktg-word--rotate">EST&nbsp;2026</span>
        </div>

        {/* sweeping side bars that frame the composition on the cut */}
        <div className="ktg-frame ktg-frame--top" aria-hidden />
        <div className="ktg-frame ktg-frame--bottom" aria-hidden />
      </div>

      {/* film grain */}
      <div className="ktg-grain" aria-hidden />
    </div>
  );
}

const css = `
/* ---- timing helpers: every motion is on the same 8s percussive grid ---- */

/* CLASSIFIED: slam in from left, hold, snap out on cut */
@keyframes ktg-ram {
  0%   { transform: translateX(-130%); opacity: 0; }
  6%   { transform: translateX(6%);    opacity: 1; }
  9%   { transform: translateX(0);     opacity: 1; }
  78%  { transform: translateX(0);     opacity: 1; }
  84%  { transform: translateX(0);     opacity: 0; }
  100% { transform: translateX(-130%); opacity: 0; }
}
/* bar that wipes off CLASSIFIED left-to-right */
@keyframes ktg-ram-bar {
  0%, 4%   { transform: scaleX(1); transform-origin: left; }
  12%      { transform: scaleX(0); transform-origin: left; }
  80%      { transform: scaleX(0); transform-origin: right; }
  86%      { transform: scaleX(1); transform-origin: right; }
  100%     { transform: scaleX(1); transform-origin: right; }
}

/* EYES ONLY: drop from top */
@keyframes ktg-drop {
  0%, 10%  { transform: translateY(-130%); opacity: 0; }
  16%      { transform: translateY(8%);    opacity: 1; }
  19%      { transform: translateY(0);     opacity: 1; }
  78%      { transform: translateY(0);     opacity: 1; }
  84%      { transform: translateY(0);     opacity: 0; }
  100%     { transform: translateY(-130%); opacity: 0; }
}
/* block wipe top-to-bottom revealing EYES ONLY */
@keyframes ktg-drop-bar {
  0%, 14%  { transform: scaleY(1); transform-origin: top; }
  22%      { transform: scaleY(0); transform-origin: top; }
  80%      { transform: scaleY(0); transform-origin: bottom; }
  86%      { transform: scaleY(1); transform-origin: bottom; }
  100%     { transform: scaleY(1); transform-origin: bottom; }
}

/* title words rise + settle */
@keyframes ktg-titleword {
  0%, 26%  { transform: translateY(0.5em); opacity: 0; filter: blur(4px); }
  34%      { transform: translateY(0);     opacity: 1; filter: blur(0); }
  78%      { transform: translateY(0);     opacity: 1; filter: blur(0); }
  84%      { transform: translateY(0);     opacity: 0; filter: blur(2px); }
  100%     { transform: translateY(0.5em); opacity: 0; filter: blur(4px); }
}
/* center-split bar that opens to reveal each title word */
@keyframes ktg-split {
  0%, 28%  { transform: scaleX(1); }
  40%      { transform: scaleX(0); }
  80%      { transform: scaleX(0); }
  86%      { transform: scaleX(1); }
  100%     { transform: scaleX(1); }
}
/* hairline rule draws across under the locked title */
@keyframes ktg-rule {
  0%, 40%  { transform: scaleX(0); transform-origin: left; opacity: 0.9; }
  52%      { transform: scaleX(1); transform-origin: left; opacity: 0.9; }
  80%      { transform: scaleX(1); transform-origin: right; opacity: 0.9; }
  86%      { transform: scaleX(0); transform-origin: right; opacity: 0.9; }
  100%     { transform: scaleX(0); transform-origin: right; opacity: 0; }
}

/* EST 2026 rotates into corner */
@keyframes ktg-rotate {
  0%, 44%  { transform: rotate(-14deg) translateY(0.6em); opacity: 0; }
  54%      { transform: rotate(0deg)   translateY(0);     opacity: 1; }
  78%      { transform: rotate(0deg)   translateY(0);     opacity: 1; }
  84%      { transform: rotate(0deg)   translateY(0);     opacity: 0; }
  100%     { transform: rotate(-14deg) translateY(0.6em); opacity: 0; }
}

/* percussive accent dash — punches the downbeat */
@keyframes ktg-beat {
  0%, 3%   { transform: scaleX(0); opacity: 0; }
  5%       { transform: scaleX(1); opacity: 1; }
  8%       { transform: scaleX(1); opacity: 1; }
  30%      { transform: scaleX(1); opacity: 0.85; }
  79%      { transform: scaleX(1); opacity: 0.85; }
  85%      { transform: scaleX(0); opacity: 0; }
  100%     { transform: scaleX(0); opacity: 0; }
}

/* framing bars sweep in from the edges */
@keyframes ktg-frame-top {
  0%, 18%  { transform: translateX(-105%); }
  28%      { transform: translateX(0); }
  80%      { transform: translateX(0); }
  86%      { transform: translateX(105%); }
  100%     { transform: translateX(105%); }
}
@keyframes ktg-frame-bottom {
  0%, 18%  { transform: translateX(105%); }
  28%      { transform: translateX(0); }
  80%      { transform: translateX(0); }
  86%      { transform: translateX(-105%); }
  100%     { transform: translateX(-105%); }
}

/* texture + lighting */
@keyframes ktg-grain {
  0%, 100% { transform: translate(0, 0); }
  20%  { transform: translate(-3%, 2%); }
  40%  { transform: translate(2%, -3%); }
  60%  { transform: translate(-2%, -2%); }
  80%  { transform: translate(3%, 1%); }
}
@keyframes ktg-flicker {
  0%, 100% { opacity: 1; }
  4%  { opacity: 0.92; }
  5%  { opacity: 1; }
  84% { opacity: 0.94; }
  85% { opacity: 1; }
}
@keyframes ktg-glow {
  0%, 100% { opacity: 0.5; }
  6%, 54%  { opacity: 1; }
  85%      { opacity: 0.4; }
}

/* ---- layout ---- */

.ktg-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(120% 80% at 50% 42%, rgba(212,175,55,0.08), transparent 60%),
    radial-gradient(100% 100% at 50% 118%, rgba(212,175,55,0.12), transparent 55%),
    radial-gradient(140% 120% at 50% 50%, transparent 52%, rgba(0,0,0,0.78) 100%);
  animation: ktg-glow 8s ease-in-out infinite;
}

.ktg-stage {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0.7em;
  font-size: clamp(9px, 4.2vmin, 30px);
  animation: ktg-flicker 8s linear infinite;
}

/* percussive dash */
.ktg-beat {
  width: 2.4em; height: 0.18em;
  margin-bottom: 0.2em;
  background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD});
  box-shadow: 0 0 12px rgba(212,175,55,0.6);
  transform-origin: center;
  animation: ktg-beat 8s cubic-bezier(0.7, 0, 0.2, 1) infinite;
}

.ktg-row { line-height: 1; }
.ktg-clip {
  position: relative;
  display: inline-block;
  overflow: hidden;
  padding: 0.06em 0.04em;
}

.ktg-word {
  display: inline-block;
  font-family: ${DM};
  font-weight: 800;
  text-transform: uppercase;
}

/* CLASSIFIED */
.ktg-row--classified .ktg-word--ram {
  font-size: 1.05em;
  letter-spacing: 0.42em;
  color: ${GOLD_LIGHT};
  text-shadow: 0 0 16px rgba(212,175,55,0.4);
  animation: ktg-ram 8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
.ktg-bar { position: absolute; inset: 0; }
.ktg-bar--ram {
  background: linear-gradient(90deg, ${GOLD} 0%, #b8901f 100%);
  transform-origin: left;
  animation: ktg-ram-bar 8s cubic-bezier(0.7, 0, 0.2, 1) infinite;
}

/* EYES ONLY */
.ktg-row--eyes .ktg-word--drop {
  font-size: 0.62em;
  letter-spacing: 0.62em;
  color: ${GOLD};
  animation: ktg-drop 8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
.ktg-bar--drop {
  background: linear-gradient(180deg, ${GOLD_LIGHT} 0%, #b8901f 100%);
  transform-origin: top;
  animation: ktg-drop-bar 8s cubic-bezier(0.7, 0, 0.2, 1) infinite;
}

/* PURCELL VENTURES title */
.ktg-title {
  position: relative;
  display: flex; align-items: baseline; gap: 0.4em;
  margin: 0.15em 0 0.1em;
  padding-bottom: 0.34em;
}
.ktg-titleclip {
  position: relative;
  display: inline-block;
  overflow: hidden;
  padding: 0.04em 0.06em;
}
.ktg-titleword {
  display: inline-block;
  font-family: ${CINZEL};
  font-weight: 700;
  font-size: 1.7em;
  letter-spacing: 0.1em;
  color: ${GOLD_LIGHT};
  text-shadow: 0 0 22px rgba(212,175,55,0.35), 0 0 46px rgba(212,175,55,0.18);
}
.ktg-titleword--a { animation: ktg-titleword 8s cubic-bezier(0.16,1,0.3,1) infinite; }
.ktg-titleword--b { animation: ktg-titleword 8s cubic-bezier(0.16,1,0.3,1) infinite; animation-delay: 0.45s; }

.ktg-split {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, #b8901f, ${GOLD}, #b8901f);
  transform-origin: center;
}
.ktg-split--a { animation: ktg-split 8s cubic-bezier(0.7,0,0.2,1) infinite; }
.ktg-split--b { animation: ktg-split 8s cubic-bezier(0.7,0,0.2,1) infinite; animation-delay: 0.45s; }

.ktg-rule {
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent);
  box-shadow: 0 0 8px rgba(212,175,55,0.5);
  transform-origin: left;
  animation: ktg-rule 8s cubic-bezier(0.7,0,0.2,1) infinite;
}

/* EST 2026 */
.ktg-est { line-height: 1; }
.ktg-word--rotate {
  font-family: ${DM};
  font-weight: 700;
  font-size: 0.52em;
  letter-spacing: 0.5em;
  color: rgba(212,175,55,0.78);
  transform-origin: center;
  animation: ktg-rotate 8s cubic-bezier(0.16,1,0.3,1) infinite;
}

/* framing bars */
.ktg-frame {
  position: absolute; left: 0; right: 0;
  height: 0.16em;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent);
}
.ktg-frame--top {
  top: 16%;
  animation: ktg-frame-top 8s cubic-bezier(0.7,0,0.2,1) infinite;
}
.ktg-frame--bottom {
  bottom: 16%;
  animation: ktg-frame-bottom 8s cubic-bezier(0.7,0,0.2,1) infinite;
}

/* film grain */
.ktg-grain {
  position: absolute; inset: -50%;
  pointer-events: none; opacity: 0.07;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>\
<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: ktg-grain 0.6s steps(4) infinite;
  mix-blend-mode: overlay;
}

@media (prefers-reduced-motion: reduce) {
  .ktg-stage, .ktg-vignette, .ktg-grain,
  .ktg-word--ram, .ktg-bar--ram, .ktg-word--drop, .ktg-bar--drop,
  .ktg-titleword--a, .ktg-titleword--b, .ktg-split--a, .ktg-split--b,
  .ktg-rule, .ktg-word--rotate, .ktg-beat,
  .ktg-frame--top, .ktg-frame--bottom {
    animation-duration: 16s;
  }
}
`;
