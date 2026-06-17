"use client";

/**
 * RedactedDossier — Bourne-style classified intel sheet.
 *
 * Monospace dossier lines sit under gold/black redaction bars. On the ~6s loop,
 * staggered bars wipe away to REVEAL gold keywords (PURCELL / ACWORTH GA /
 * AI-FORWARD / CLASSIFIED), hold, then wipe back over them. A faint angled
 * "TOP SECRET" stamp sits in the corner, a thin scanline sweeps, film grain
 * flickers. Pure CSS + SVG, self-contained, seamless loop.
 */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const INK = "#0c0a08";

const MONO =
  '"DM Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';

// Each line: an array of tokens. `r` = redacted filler width (ch),
// `reveal` = a keyword that gets uncovered, with a stagger delay (0..1 of cycle).
type Token =
  | { t: "text"; v: string }
  | { t: "redact"; ch: number }
  | { t: "reveal"; v: string; delay: number };

const LINES: Token[][] = [
  [
    { t: "text", v: "SUBJECT // " },
    { t: "reveal", v: "PURCELL", delay: 0.04 },
    { t: "text", v: " " },
    { t: "redact", ch: 9 },
    { t: "redact", ch: 5 },
  ],
  [
    { t: "text", v: "ORIGIN  // " },
    { t: "redact", ch: 6 },
    { t: "reveal", v: "ACWORTH GA", delay: 0.12 },
    { t: "text", v: " " },
    { t: "redact", ch: 4 },
  ],
  [
    { t: "text", v: "PROFILE // " },
    { t: "redact", ch: 7 },
    { t: "reveal", v: "AI-FORWARD", delay: 0.2 },
    { t: "redact", ch: 6 },
  ],
  [
    { t: "text", v: "STATUS  // " },
    { t: "redact", ch: 5 },
    { t: "redact", ch: 8 },
    { t: "reveal", v: "CLASSIFIED", delay: 0.28 },
  ],
  [
    { t: "text", v: "NOTE    // " },
    { t: "redact", ch: 6 },
    { t: "redact", ch: 9 },
    { t: "redact", ch: 5 },
    { t: "redact", ch: 7 },
  ],
];

export default function RedactedDossier() {
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

      {/* warm vignette + subtle gold floor glow */}
      <div className="rd-vignette" />

      {/* dossier sheet — scales with the smaller viewport axis so it fits tile or fullscreen */}
      <div className="rd-stage">
        <div className="rd-sheet">
          {/* header */}
          <div className="rd-header">
            <span className="rd-tag">DOSSIER</span>
            <span className="rd-ref">REF&nbsp;//&nbsp;PV-0026</span>
          </div>
          <div className="rd-rule" />

          {/* intel lines */}
          <div className="rd-body">
            {LINES.map((line, li) => (
              <div className="rd-line" key={li}>
                {line.map((tok, ti) => {
                  if (tok.t === "text") {
                    return (
                      <span className="rd-text" key={ti}>
                        {tok.v}
                      </span>
                    );
                  }
                  if (tok.t === "redact") {
                    return (
                      <span
                        className="rd-bar rd-bar--static"
                        key={ti}
                        style={{ width: `${tok.ch}ch` }}
                        aria-hidden
                      >
                        {" ".repeat(tok.ch)}
                      </span>
                    );
                  }
                  // reveal token: keyword under a wiping bar
                  return (
                    <span className="rd-reveal" key={ti}>
                      <span className="rd-keyword">{tok.v}</span>
                      <span
                        className="rd-bar rd-bar--wipe"
                        style={
                          {
                            ["--rd-delay" as string]: `${tok.delay * 6}s`,
                          } as React.CSSProperties
                        }
                        aria-hidden
                      />
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="rd-rule rd-rule--btm" />
          <div className="rd-footer">
            <span className="rd-blink">▌</span>
            <span className="rd-foot-text">DECRYPTING&nbsp;FEED…</span>
          </div>
        </div>

        {/* angled TOP SECRET stamp */}
        <div className="rd-stamp" aria-hidden>
          TOP&nbsp;SECRET
        </div>
      </div>

      {/* scanline sweep */}
      <div className="rd-scan" aria-hidden />
      {/* film grain */}
      <div className="rd-grain" aria-hidden />
    </div>
  );
}

const css = `
@keyframes rd-wipe {
  /* one full 6s cycle: bar starts covering, wipes off to reveal, holds, wipes back */
  0%   { transform: scaleX(1); transform-origin: right center; }
  18%  { transform: scaleX(1); transform-origin: right center; }
  34%  { transform: scaleX(0); transform-origin: right center; }
  62%  { transform: scaleX(0); transform-origin: left center; }
  80%  { transform: scaleX(1); transform-origin: left center; }
  100% { transform: scaleX(1); transform-origin: left center; }
}
@keyframes rd-keyglow {
  0%, 22%   { opacity: 0; text-shadow: none; }
  36%, 60%  { opacity: 1; text-shadow: 0 0 10px rgba(232,201,106,0.55), 0 0 22px rgba(212,175,55,0.3); }
  78%, 100% { opacity: 0; text-shadow: none; }
}
@keyframes rd-scan {
  0%   { transform: translateY(-20%); opacity: 0; }
  8%   { opacity: 0.5; }
  92%  { opacity: 0.5; }
  100% { transform: translateY(2400%); opacity: 0; }
}
@keyframes rd-grain {
  0%, 100% { transform: translate(0, 0); }
  20%  { transform: translate(-3%, 2%); }
  40%  { transform: translate(2%, -3%); }
  60%  { transform: translate(-2%, -2%); }
  80%  { transform: translate(3%, 1%); }
}
@keyframes rd-blink {
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0.15; }
}
@keyframes rd-stamp {
  0%, 100% { opacity: 0.10; }
  40%, 60% { opacity: 0.22; }
}
@keyframes rd-flicker {
  0%, 100% { opacity: 1; }
  47% { opacity: 0.97; }
  48% { opacity: 0.88; }
  49% { opacity: 1; }
}

.rd-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(120% 80% at 50% 34%, rgba(212,175,55,0.07), transparent 60%),
    radial-gradient(100% 100% at 50% 120%, rgba(212,175,55,0.10), transparent 55%),
    radial-gradient(140% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.72) 100%);
}

.rd-stage {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  /* scale the whole sheet relative to viewport so it reads at any size */
  font-size: clamp(7px, 2.6vmin, 20px);
  animation: rd-flicker 6s linear infinite;
}

.rd-sheet {
  position: relative;
  width: min(92%, 46em);
  padding: 1.6em 1.9em;
  background:
    linear-gradient(180deg, rgba(22,18,12,0.92), rgba(12,10,8,0.94));
  border: 1px solid rgba(212,175,55,0.28);
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.5),
    0 0 60px rgba(212,175,55,0.08),
    inset 0 0 40px rgba(0,0,0,0.5);
  border-radius: 2px;
}

.rd-header {
  display: flex; align-items: baseline; justify-content: space-between;
  font-family: var(--font-cinzel), Georgia, serif;
  letter-spacing: 0.22em;
}
.rd-tag {
  color: ${GOLD_LIGHT};
  font-size: 1.35em;
  text-shadow: 0 0 14px rgba(212,175,55,0.4);
}
.rd-ref {
  font-family: ${MONO};
  font-size: 0.78em; letter-spacing: 0.12em;
  color: rgba(212,175,55,0.55);
}

.rd-rule {
  height: 1px; margin: 0.7em 0 1.1em;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent);
}
.rd-rule--btm { margin: 1.1em 0 0.7em; }

.rd-body { display: flex; flex-direction: column; gap: 0.62em; }

.rd-line {
  font-family: ${MONO};
  font-size: 1em; line-height: 1.2;
  letter-spacing: 0.04em;
  white-space: nowrap;
  display: flex; align-items: center;
}

.rd-text { color: rgba(212,175,55,0.62); }

/* static (never-revealed) redaction bars */
.rd-bar {
  display: inline-block;
  height: 1.18em;
  border-radius: 1px;
}
.rd-bar--static {
  margin: 0 0.18em;
  background:
    repeating-linear-gradient(45deg,
      ${INK} 0, ${INK} 3px,
      rgba(40,32,18,0.95) 3px, rgba(40,32,18,0.95) 6px);
  box-shadow: inset 0 0 0 1px rgba(212,175,55,0.18);
}

/* reveal slot: keyword behind a wiping bar */
.rd-reveal {
  position: relative;
  display: inline-block;
  margin: 0 0.18em;
}
.rd-keyword {
  display: inline-block;
  color: ${GOLD_LIGHT};
  font-weight: 700;
  letter-spacing: 0.06em;
  opacity: 0;
  animation: rd-keyglow 6s ease-in-out infinite;
  animation-delay: var(--rd-delay, 0s);
}
.rd-bar--wipe {
  position: absolute; inset: -0.06em -0.12em;
  height: auto;
  background:
    linear-gradient(180deg, ${GOLD} 0%, #b8901f 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.18),
    0 0 8px rgba(212,175,55,0.25);
  transform-origin: right center;
  animation: rd-wipe 6s cubic-bezier(0.7, 0, 0.2, 1) infinite;
  animation-delay: var(--rd-delay, 0s);
}

.rd-footer {
  display: flex; align-items: center; gap: 0.5em;
  font-family: ${MONO};
  font-size: 0.8em; letter-spacing: 0.16em;
  color: rgba(212,175,55,0.5);
}
.rd-blink { color: ${GOLD_LIGHT}; animation: rd-blink 1s steps(1) infinite; }

.rd-stamp {
  position: absolute;
  right: 4%; top: 6%;
  transform: rotate(-16deg);
  font-family: var(--font-cinzel), Georgia, serif;
  font-size: 2.1em; font-weight: 700;
  letter-spacing: 0.14em;
  color: transparent;
  -webkit-text-stroke: 1.4px rgba(212,175,55,0.85);
  text-stroke: 1.4px rgba(212,175,55,0.85);
  padding: 0.12em 0.3em;
  border: 2.5px solid rgba(212,175,55,0.8);
  border-radius: 3px;
  opacity: 0.16;
  animation: rd-stamp 6s ease-in-out infinite;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(212,175,55,0.2);
}

.rd-scan {
  position: absolute; left: 0; right: 0; top: 0;
  height: 2.2%;
  background: linear-gradient(180deg,
    transparent, rgba(232,201,106,0.16) 45%, rgba(232,201,106,0.22) 50%, transparent);
  filter: blur(0.5px);
  animation: rd-scan 6s linear infinite;
  pointer-events: none;
}

.rd-grain {
  position: absolute; inset: -50%;
  pointer-events: none; opacity: 0.06;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>\
<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: rd-grain 0.6s steps(4) infinite;
  mix-blend-mode: overlay;
}

@media (prefers-reduced-motion: reduce) {
  .rd-bar--wipe, .rd-keyword, .rd-scan, .rd-grain, .rd-stamp, .rd-stage, .rd-blink {
    animation-duration: 12s;
  }
}
`;
