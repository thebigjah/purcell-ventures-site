"use client";

/**
 * PassportFlicker — Bourne-dossier identity scrubber.
 *
 * Abstract gold-on-black passport pages and ID cards (photo box, MRZ strip,
 * field rows, ink stamp, fingerprint) strobe past fast like a database
 * scrubbing through identities; chromatic flicker + a hard cut-flash punctuate
 * each swap. Roughly once per loop the scrub snaps to a HOLD on a redacted
 * "PURCELL" ID — it freezes, breathes, then flicks onward — all under a rolling
 * scanline, vignette, bloom and film grain. Canvas-2D, self-contained, seamless.
 */

import { useEffect, useRef } from "react";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c96a";
const INK = "#0c0a08";

const MONO =
  '"DM Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';
const SERIF =
  'var(--font-cinzel), "Cinzel", Georgia, "Times New Roman", serif';

// Loop length in ms. One full scrub-and-hold cycle.
const LOOP = 7200;

// --- timeline (fractions of LOOP) -------------------------------------------
// Fast scrub of many cards, one HOLD on the PURCELL card, then scrub onward.
const HOLD_START = 0.46;
const HOLD_END = 0.62;

// Each non-hold card shows for this fraction of the loop (fast strobe).
const FLICK = 0.034;

type Card = {
  kind: "passport" | "id";
  code: string; // top-left record id
  name: string; // field value
  field2: string;
  redactName?: boolean; // the PURCELL freeze card
  hold?: boolean;
};

// Deterministic pseudo-random so layout is stable per card index (no flicker
// from re-randomising every frame).
function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const FIRST = [
  "M. KORDA", "A. VESPER", "L. ABBOTT", "R. STILES", "N. CROSS",
  "D. HALE", "S. VANCE", "T. MERRICK", "E. KANE", "J. ROURKE",
  "P. SLOANE", "C. AYER", "B. DRAKE", "W. NOLAN", "G. PRICE",
];
const PLACES = [
  "ZURICH", "PARIS", "TANGIER", "NAPLES", "GOA", "BERLIN",
  "MOSCOW", "ATHENS", "LISBON", "MILAN", "ODESSA", "CAIRO",
];

export default function PassportFlicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    let DPR = 1;
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    // ---- build the deck (stable) ----
    const scrub: Card[] = [];
    for (let i = 0; i < 26; i++) {
      scrub.push({
        kind: i % 3 === 0 ? "id" : "passport",
        code: "№ " + (740000 + Math.floor(rnd(i * 3.3) * 60000)).toString(),
        name: FIRST[i % FIRST.length],
        field2: PLACES[(i * 5) % PLACES.length],
      });
    }
    const purcell: Card = {
      kind: "id",
      code: "№ ████  CLASSIFIED",
      name: "PURCELL",
      field2: "ACWORTH GA",
      redactName: true,
      hold: true,
    };

    // ---- pre-rendered film grain tiles (cheap, cycled) ----
    const GRAIN_TILES = 3;
    const GRAIN_SIZE = 160;
    const grain: HTMLCanvasElement[] = [];
    for (let g = 0; g < GRAIN_TILES; g++) {
      const gc = document.createElement("canvas");
      gc.width = GRAIN_SIZE;
      gc.height = GRAIN_SIZE;
      const gx = gc.getContext("2d");
      if (gx) {
        const img = gx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = Math.random() * 26; // low alpha grain
        }
        gx.putImageData(img, 0, 0);
      }
      grain.push(gc);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = w;
      H = h;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---------- determine which card is showing for a given loop time -------
    // Returns { card, localT (0..1 within its slot), cut (0..1 freshness of cut),
    //   holding (bool), holdProg }
    const pickCard = (t: number) => {
      // t in 0..1 across loop
      if (t >= HOLD_START && t < HOLD_END) {
        const holdProg = (t - HOLD_START) / (HOLD_END - HOLD_START);
        return {
          card: purcell,
          cut: Math.max(0, 1 - (t - HOLD_START) / 0.02),
          holding: true,
          holdProg,
          idx: -1,
        };
      }
      // scrub region: everything outside the hold. Distribute scrub cards.
      // Two scrub passes: before hold and after hold.
      let localStart: number;
      let localEnd: number;
      if (t < HOLD_START) {
        localStart = 0;
        localEnd = HOLD_START;
      } else {
        localStart = HOLD_END;
        localEnd = 1;
      }
      const span = localEnd - localStart;
      const rel = (t - localStart) / span; // 0..1
      // accelerate then decelerate into the hold for a "settling" feel
      const slot = Math.floor(rel / (FLICK / span));
      const slotT = (rel / (FLICK / span)) % 1;
      const idx =
        (slot + (t < HOLD_START ? 0 : 13)) % scrub.length;
      return {
        card: scrub[idx],
        cut: Math.max(0, 1 - slotT / 0.35),
        holding: false,
        holdProg: 0,
        idx,
      };
    };

    // ------------------------------- draw one card ------------------------
    const drawCard = (
      card: Card,
      cx: number,
      cy: number,
      cw: number,
      ch: number,
      seed: number,
      holding: boolean,
      holdProg: number,
    ) => {
      ctx.save();
      ctx.translate(cx, cy);

      // subtle perspective wobble per card (kinetic)
      const tilt = holding ? 0 : (rnd(seed) - 0.5) * 0.05;
      ctx.rotate(tilt);

      const x = -cw / 2;
      const y = -ch / 2;

      // card body — warm near-black panel with gold hairline frame
      ctx.fillStyle = "#15110b";
      roundRect(ctx, x, y, cw, ch, 10);
      ctx.fill();

      // engraved guilloche-ish background lines
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, x, y, cw, ch, 10);
      ctx.clip();
      ctx.strokeStyle = "rgba(212,175,55,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 22; i++) {
        ctx.beginPath();
        const yy = y + (ch / 22) * i + (seed % 3);
        ctx.moveTo(x, yy);
        for (let xx = x; xx <= x + cw; xx += 14) {
          ctx.lineTo(xx, yy + Math.sin(xx * 0.05 + i + seed) * 3);
        }
        ctx.stroke();
      }
      ctx.restore();

      // outer frame
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.85;
      roundRect(ctx, x + 6, y + 6, cw - 12, ch - 12, 6);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const pad = Math.max(14, cw * 0.06);
      ctx.textBaseline = "top";

      // header: type + record code
      ctx.fillStyle = GOLD_LIGHT;
      ctx.font = `600 ${Math.round(ch * 0.05)}px ${MONO}`;
      ctx.fillText(
        card.kind === "passport" ? "PASSPORT" : "IDENTITY CARD",
        x + pad,
        y + pad,
      );
      ctx.fillStyle = "rgba(212,175,55,0.7)";
      ctx.font = `400 ${Math.round(ch * 0.042)}px ${MONO}`;
      ctx.fillText(card.code, x + pad, y + pad + ch * 0.075);

      // photo box (left)
      const pbw = cw * 0.26;
      const pbh = ch * 0.42;
      const pbx = x + pad;
      const pby = y + ch * 0.26;
      ctx.strokeStyle = "rgba(212,175,55,0.6)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(pbx, pby, pbw, pbh);
      // abstract gold silhouette inside
      ctx.save();
      ctx.beginPath();
      ctx.rect(pbx, pby, pbw, pbh);
      ctx.clip();
      const grd = ctx.createLinearGradient(pbx, pby, pbx, pby + pbh);
      grd.addColorStop(0, "rgba(212,175,55,0.30)");
      grd.addColorStop(1, "rgba(212,175,55,0.05)");
      ctx.fillStyle = grd;
      ctx.fillRect(pbx, pby, pbw, pbh);
      // head + shoulders silhouette
      ctx.fillStyle = "rgba(232,201,106,0.55)";
      const hcx = pbx + pbw / 2;
      const hcy = pby + pbh * 0.42;
      ctx.beginPath();
      ctx.arc(hcx, hcy, pbw * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        hcx,
        pby + pbh + pbw * 0.05,
        pbw * 0.42,
        pbh * 0.32,
        0,
        Math.PI,
        Math.PI * 2,
      );
      ctx.fill();
      // redaction bar across face on the PURCELL freeze
      if (card.redactName) {
        ctx.fillStyle = INK;
        ctx.fillRect(pbx, hcy - pbw * 0.1, pbw, pbw * 0.34);
        ctx.fillStyle = GOLD;
      }
      ctx.restore();

      // field rows (right of photo)
      const fx = pbx + pbw + pad * 0.7;
      let fy = pby;
      const lineH = ch * 0.095;
      const label = (lab: string, val: string, redact: boolean) => {
        ctx.fillStyle = "rgba(212,175,55,0.55)";
        ctx.font = `400 ${Math.round(ch * 0.034)}px ${MONO}`;
        ctx.fillText(lab, fx, fy);
        if (redact) {
          ctx.fillStyle = INK;
          const bw = ctx.measureText("XXXXXXXX").width;
          ctx.fillRect(fx, fy + ch * 0.04, bw, ch * 0.05);
          ctx.strokeStyle = "rgba(212,175,55,0.5)";
          ctx.lineWidth = 1;
          ctx.strokeRect(fx, fy + ch * 0.04, bw, ch * 0.05);
        } else {
          ctx.fillStyle = GOLD_LIGHT;
          ctx.font = `600 ${Math.round(ch * 0.05)}px ${MONO}`;
          ctx.fillText(val, fx, fy + ch * 0.038);
        }
        fy += lineH;
      };
      // On the freeze card, the surname slot reveals PURCELL after redaction flickers off.
      const revealName = card.redactName && holdProg > 0.32;
      ctx.fillStyle = "rgba(212,175,55,0.55)";
      ctx.font = `400 ${Math.round(ch * 0.034)}px ${MONO}`;
      ctx.fillText("SURNAME", fx, fy);
      if (card.redactName && !revealName) {
        ctx.fillStyle = INK;
        const bw = ctx.measureText("XXXXXXXXX").width;
        ctx.fillRect(fx, fy + ch * 0.04, bw, ch * 0.055);
        ctx.strokeStyle = "rgba(212,175,55,0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(fx, fy + ch * 0.04, bw, ch * 0.055);
      } else {
        ctx.fillStyle = GOLD_LIGHT;
        ctx.font = `700 ${Math.round(ch * 0.066)}px ${card.redactName ? SERIF : MONO}`;
        ctx.fillText(card.name, fx, fy + ch * 0.03);
      }
      fy += lineH * 1.1;
      label("ORIGIN", card.field2, false);
      label(
        "DOB",
        "•• ••• ••",
        !!card.redactName,
      );

      // stamp (rotated ring) bottom-right
      ctx.save();
      ctx.translate(x + cw - pad - cw * 0.13, y + ch - pad - ch * 0.13);
      ctx.rotate(-0.32 + (rnd(seed + 9) - 0.5) * 0.2);
      ctx.strokeStyle = "rgba(212,175,55,0.6)";
      ctx.lineWidth = 2;
      const sr = cw * 0.12;
      ctx.beginPath();
      ctx.arc(0, 0, sr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, sr * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(232,201,106,0.75)";
      ctx.font = `700 ${Math.round(sr * 0.42)}px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(card.redactName ? "SEAL" : "VISA", 0, 0);
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.restore();

      // fingerprint (small, bottom-left) — concentric arcs
      ctx.save();
      ctx.translate(pbx + pbw * 0.35, y + ch - pad - ch * 0.07);
      ctx.strokeStyle = "rgba(212,175,55,0.4)";
      ctx.lineWidth = 1;
      const fr = ch * 0.06;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, (fr / 5) * i, -0.4, Math.PI + 0.3 + i * 0.1);
        ctx.stroke();
      }
      ctx.restore();

      // MRZ machine-readable strip (bottom band)
      const mrzY = y + ch - pad - ch * 0.16;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(x + 6, mrzY, cw - 12, ch * 0.12);
      ctx.fillStyle = "rgba(212,175,55,0.85)";
      ctx.font = `500 ${Math.round(ch * 0.04)}px ${MONO}`;
      const mrz1 =
        (card.kind === "passport" ? "P<USA" : "I<USA") +
        card.name.replace(/[^A-Z]/g, "").padEnd(8, "<") +
        "<<" +
        FIRST[(seed + 2) % FIRST.length].replace(/[^A-Z]/g, "").padEnd(6, "<");
      const mrz2 =
        card.code.replace(/[^0-9]/g, "").padEnd(9, "<") +
        "USA<<<" +
        chunk(seed) +
        "<<<<<<<";
      clipText(ctx, mrz1.slice(0, 44), x + 12, mrzY + ch * 0.012, cw - 24);
      clipText(ctx, mrz2.slice(0, 44), x + 12, mrzY + ch * 0.06, cw - 24);

      ctx.restore();
    };

    // ------------------------------ render frame --------------------------
    const render = (now: number) => {
      const elapsed = (now - start) % LOOP;
      const t = elapsed / LOOP;

      // clear to ink
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, W, H);

      const sel = pickCard(t);
      const card = sel.card;
      const holding = sel.holding;

      // card geometry — responsive, centered, slight breathing on hold
      const ar = card.kind === "passport" ? 1.42 : 1.58;
      let cw = Math.min(W * 0.72, H * 0.72 * ar);
      let ch = cw / ar;
      if (ch > H * 0.7) {
        ch = H * 0.7;
        cw = ch * ar;
      }
      const breathe = holding ? 1 + Math.sin(sel.holdProg * Math.PI) * 0.012 : 1;
      cw *= breathe;
      ch *= breathe;

      // kinetic slide: each scrub card slides in fast from the side
      const slide = holding
        ? 0
        : (1 - sel.cut) * 0 + sel.cut * (rnd(sel.idx + 1) - 0.5) * W * 0.04;
      const cx = W / 2 + slide;
      const cy = H / 2;

      // depth: ghost of previous/next cards behind (motion blur stack)
      if (!holding) {
        for (let g = 2; g >= 1; g--) {
          const gidx = (sel.idx + g) % scrub.length;
          ctx.globalAlpha = 0.1 / g;
          drawCard(
            scrub[gidx],
            cx + g * W * 0.012,
            cy + g * 6,
            cw * (1 - g * 0.04),
            ch * (1 - g * 0.04),
            gidx + 100,
            false,
            0,
          );
        }
        ctx.globalAlpha = 1;
      }

      // chromatic flicker on a fresh cut: draw card offset in gold-warm / cool
      const cut = sel.cut;
      const seed = holding ? 999 : sel.idx;

      if (cut > 0.05 && !holding) {
        const off = cut * 6;
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.4 * cut;
        ctx.save();
        ctx.filter = "none";
        // warm ghost
        ctx.translate(off, 0);
        ctx.fillStyle = "rgba(232,201,106,0.0)";
        drawCardTint(ctx, cw, ch, cx, cy, "rgba(232,201,106,0.5)", off);
        ctx.restore();
        ctx.save();
        ctx.translate(-off, 0);
        drawCardTint(ctx, cw, ch, cx, cy, "rgba(120,90,30,0.5)", -off);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      // main card
      drawCard(card, cx, cy, cw, ch, seed, holding, sel.holdProg);

      // ---- cut flash (hard white-gold frame flash on each strobe) ----
      if (cut > 0.55 && !holding) {
        ctx.fillStyle = `rgba(232,201,106,${(cut - 0.55) * 0.5})`;
        ctx.fillRect(0, 0, W, H);
      }

      // ---- bloom: soft additive glow around bright center ----
      ctx.globalCompositeOperation = "screen";
      const bloom = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.55,
      );
      const bAmt = holding ? 0.14 + Math.sin(sel.holdProg * Math.PI) * 0.06 : 0.08;
      bloom.addColorStop(0, `rgba(212,175,55,${bAmt})`);
      bloom.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // ---- rolling scanline ----
      const scanY = ((now / 1400) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0, "rgba(212,175,55,0)");
      sg.addColorStop(0.5, "rgba(232,201,106,0.10)");
      sg.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 40, W, 80);

      // ---- fine horizontal scanlines (CRT) ----
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      for (let yy = 0; yy < H; yy += 3) {
        ctx.fillRect(0, yy, W, 1);
      }

      // ---- film grain (cycled tile) ----
      const gt = grain[(Math.floor(now / 60) % GRAIN_TILES + GRAIN_TILES) % GRAIN_TILES];
      ctx.globalAlpha = 0.5;
      const ox = (now * 0.07) % GRAIN_SIZE;
      const oy = (now * 0.05) % GRAIN_SIZE;
      for (let gx = -GRAIN_SIZE; gx < W; gx += GRAIN_SIZE) {
        for (let gy = -GRAIN_SIZE; gy < H; gy += GRAIN_SIZE) {
          ctx.drawImage(gt, gx - ox, gy - oy);
        }
      }
      ctx.globalAlpha = 1;

      // ---- vignette ----
      const vig = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.3,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.72,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ---- status HUD line (data, mono) ----
      ctx.fillStyle = "rgba(212,175,55,0.5)";
      ctx.font = `400 ${Math.max(9, H * 0.016)}px ${MONO}`;
      ctx.textBaseline = "bottom";
      const scanned = holding
        ? "MATCH FOUND — RECORD LOCKED"
        : "SCANNING DATABASE  " +
          (740000 + Math.floor(t * 600000)).toString() +
          " / 1.2M";
      ctx.fillText(scanned, W * 0.04, H * 0.96);
      // blinking REC dot
      if (Math.floor(now / 400) % 2 === 0) {
        ctx.fillStyle = holding ? GOLD_LIGHT : "rgba(220,60,40,0.9)";
        ctx.beginPath();
        ctx.arc(W * 0.04 - 8, H * 0.955 - 4, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.textBaseline = "top";

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        background: INK,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// helpers (module scope, no deps)
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function clipText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y - 2, maxW, 40);
  ctx.clip();
  ctx.fillText(text, x, y);
  ctx.restore();
}

function chunk(seed: number) {
  let s = "";
  for (let i = 0; i < 7; i++) {
    s += String.fromCharCode(48 + Math.floor(rndm(seed + i) * 10));
  }
  return s;
}

function rndm(seed: number) {
  const x = Math.sin(seed * 91.7 + 19.3) * 43758.5453;
  return x - Math.floor(x);
}

// tinted silhouette of the card frame for chromatic aberration ghosts
function drawCardTint(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  cx: number,
  cy: number,
  color: string,
  _off: number,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  roundRect(ctx, cx - cw / 2 + 6, cy - ch / 2 + 6, cw - 12, ch - 12, 6);
  ctx.stroke();
}
