"use client";
// Full Print Marketing Suite, purcellventures.co/print
// Materials: door hanger, yard sign and EDDM postcard (Mantle Field Services) and rack card (Purcell Ventures digital)

import React, { useRef } from "react";
import Link from "next/link";
import { downloadPrintAsset } from "@/lib/printDownload";
import { CONTACT } from "@/lib/contact";

// Artwork colours. html2canvas renders these to PNG and does not resolve CSS variables,
// so the site tokens are written out here as plain values (globals.css :root).
// The mail side of the postcard is printed on cream stock, so it has its own paper palette.
const P = { paper: "#f0ebe2", rule: "#c0b0a0", mid: "#6a5a4a", ink: "#2e2416", faint: "#8a7a6a" };
const C = { bg: "#07060a", surface: "#171411", line: "#2a251e", fg: "#efe8d8", fg2: "#d9d0bc", muted: "#a69d8b", subtle: "#8a8270", gold: "#e3bd6a", goldDeep: "#b8862b" };

// ─── Dimensions ───────────────────────────────────────────────────────────────
// Door Hanger  3.5" by 8.5"  at 108px/in is 378 by 918
const DH_W = 378, DH_H = 918;
// Yard Sign    24" by 18"    at 30px/in  is 720 by 540
const YS_W = 720, YS_H = 540;
// EDDM Postcard 6.25" by 4.25" (mail side) at 101px/in is 630 by 432
const PC_W = 630, PC_H = 432;
// Rack Card    4" by 9"      at 68px/in  is 270 by 612
const RC_W = 270, RC_H = 612;

// ─── Contact Info ─────────────────────────────────────────────────────────────
const PHONE = CONTACT.phone;
const WORKS_WEB = "works.purcellventures.co";
const PV_WEB = "purcellventures.co";

const QR_WORKS = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://works.purcellventures.co&bgcolor=07060a&color=e3bd6a`;
const QR_PV_DIGITAL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://purcellventures.co/digital&bgcolor=07060a&color=e3bd6a`;
const QR_PV_BACK = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://purcellventures.co&bgcolor=07060a&color=e3bd6a`;

// ─── Shell Components ─────────────────────────────────────────────────────────

function DoorHangerShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: DH_W, height: DH_H, position: "relative", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

function YardSignShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: YS_W, height: YS_H, position: "relative", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

function PostcardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: PC_W, height: PC_H, position: "relative", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

function RackCardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: RC_W, height: RC_H, position: "relative", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

// ─── Shared SVG Primitives ────────────────────────────────────────────────────

function GhostPV({ w, h, opacity = 0.07 }: { w: number; h: number; opacity?: number }) {
  const size = Math.round(Math.min(w * 0.8, h * 0.5));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/mark-foil.svg" alt="" width={size} height={size}
      style={{ position: "absolute", left: (w - size) / 2, top: (h - size) / 2, opacity, pointerEvents: "none" }} />
  );
}

function GhostM({ w, h, opacity = 0.07 }: { w: number; h: number; opacity?: number }) {
  const fs = Math.round(Math.min(w * 0.58, h * 0.45));
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Clash Display', serif" fontSize={fs} fontWeight="700"
        fill={C.gold} opacity={opacity} letterSpacing="8">M</text>
    </svg>
  );
}

function Slash({ w, h, x1f = 0.62, x2f = 0.28, o1 = 0.22, o2 = 0.12 }: {
  w: number; h: number; x1f?: number; x2f?: number; o1?: number; o2?: number;
}) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={w * x1f} y1={0} x2={w * x2f} y2={h} stroke={C.gold} strokeWidth="1.5" opacity={o1} />
      <line x1={w * (x1f + 0.07)} y1={0} x2={w * (x2f + 0.07)} y2={h} stroke={C.gold} strokeWidth="0.75" opacity={o2} />
    </svg>
  );
}

// ─── Door hanger, Mantle Field Services ─────────────────────────────────────────────

function DoorHangerFront() {
  return (
    <DoorHangerShell style={{ background: C.bg }}>
      <GhostM w={DH_W} h={DH_H} />
      <Slash w={DH_W} h={DH_H} x1f={0.65} x2f={0.22} />

      {/* Hole circle */}
      <div style={{
        position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
        width: 46, height: 46, borderRadius: "50%",
        border: `1.5px dashed ${C.gold}45`, background: "transparent",
      }} />

      {/* All content below hole */}
      <div style={{ position: "absolute", top: 84, left: 28, right: 28, bottom: 28, display: "flex", flexDirection: "column" }}>

        {/* Top rule */}
        <div style={{ height: "1px", background: `${C.gold}22`, marginBottom: "20px" }} />

        {/* Wordmark */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "28px", fontWeight: 700, color: C.gold, lineHeight: 1 }}>Mantle</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "13px", fontWeight: 400, color: C.gold, marginTop: "3px", opacity: 0.82 }}>Field Services</div>
        </div>

        <div style={{ height: "1px", background: `${C.gold}18`, marginBottom: "22px" }} />

        {/* Services */}
        <div style={{ display: "flex", flexDirection: "column", gap: "13px", flex: 1 }}>
          {[
            { name: "Gutter cleaning", desc: "Full flush and debris removal" },
            { name: "Pressure washing", desc: "Driveways, siding and decks" },
            { name: "Lawn care", desc: "Mow, edge and trim" },
          ].map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
              <div style={{ width: "4px", height: "4px", background: C.gold, borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.fg, fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: "0.02em" }}>{s.name}</div>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "2px" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: `${C.gold}18`, margin: "22px 0 16px" }} />

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "14px", fontWeight: 700, color: C.gold, letterSpacing: "0.08em" }}>Free quote</div>
          <div style={{ fontSize: "9px", color: C.muted, letterSpacing: "0.14em", fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "3px" }}>I reply within one business day</div>
        </div>

        {/* Phone */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "19px", fontWeight: 700, color: C.fg, letterSpacing: "0.04em" }}>{PHONE}</div>
        </div>

        <div style={{ height: "1px", background: `${C.gold}15`, marginBottom: "12px" }} />

        {/* URL */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: C.subtle, letterSpacing: "0.12em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{WORKS_WEB}</div>
        </div>
      </div>
    </DoorHangerShell>
  );
}

function DoorHangerBack() {
  return (
    <DoorHangerShell style={{ background: C.bg }}>
      <GhostM w={DH_W} h={DH_H} opacity={0.10} />
      <Slash w={DH_W} h={DH_H} x1f={0.65} x2f={0.22} o1={0.13} o2={0.07} />

      {/* Hole circle */}
      <div style={{
        position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
        width: 46, height: 46, borderRadius: "50%",
        border: `1.5px dashed ${C.gold}45`, background: "transparent",
      }} />

      {/* Centered content block below hole */}
      <div style={{
        position: "absolute", top: 84, left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 28px 28px", gap: "20px",
      }}>
        {/* Offer badge */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "11px", color: C.gold, opacity: 0.8, marginBottom: "8px" }}>First service</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "52px", fontWeight: 700, color: C.gold, lineHeight: 0.9 }}>10%</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "20px", fontWeight: 400, color: C.gold, marginTop: "4px" }}>off</div>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.08em", fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "8px" }}>on your first visit</div>
        </div>

        <div style={{ height: "1px", width: "100%", background: `${C.gold}20` }} />

        {/* Phone */}
        <div style={{ fontFamily: "'Clash Display', serif", fontSize: "18px", fontWeight: 700, color: C.fg, letterSpacing: "0.04em", textAlign: "center" }}>{PHONE}</div>

        {/* QR */}
        <img src={QR_WORKS} width={110} height={110} alt="QR code" style={{ display: "block", borderRadius: "4px" }} />

        <div style={{ height: "1px", width: "100%", background: `${C.gold}14` }} />

        {/* URL */}
        <div style={{ fontSize: "9px", color: C.subtle, letterSpacing: "0.12em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{WORKS_WEB}</div>
      </div>
    </DoorHangerShell>
  );
}

// ─── Yard sign, Mantle Field Services ────────────────────────────────────────────────

function YardSignFront() {
  return (
    <YardSignShell style={{ background: C.bg }}>
      <GhostM w={YS_W} h={YS_H} opacity={0.06} />
      <Slash w={YS_W} h={YS_H} x1f={0.64} x2f={0.36} o1={0.20} o2={0.10} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "36px 60px", gap: "0",
      }}>
        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "64px", fontWeight: 700, color: C.gold, lineHeight: 1, letterSpacing: "0.04em" }}>Mantle</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "28px", fontWeight: 400, color: C.gold, marginTop: "3px", opacity: 0.85 }}>Field Services</div>
        </div>

        {/* Services row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          {["Gutters", "Pressure washing", "Lawn care"].map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <div style={{ width: "3px", height: "3px", background: `${C.gold}60`, borderRadius: "50%" }} />}
              <div style={{ fontSize: "14px", color: C.fg2, letterSpacing: "0.07em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{s}</div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ height: "1px", width: "260px", background: `${C.gold}28`, marginBottom: "14px" }} />

        {/* Phone, very large */}
        <div style={{ fontFamily: "'Clash Display', serif", fontSize: "46px", fontWeight: 700, color: C.fg, letterSpacing: "0.05em", marginBottom: "10px" }}>{PHONE}</div>

        {/* URL */}
        <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.14em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{WORKS_WEB}</div>
      </div>
    </YardSignShell>
  );
}

// ─── EDDM postcard, Mantle Field Services ───────────────────────────────────────────

function PostcardFront() {
  return (
    <PostcardShell style={{ background: C.bg }}>
      <GhostM w={PC_W} h={PC_H} opacity={0.06} />
      <Slash w={PC_W} h={PC_H} x1f={0.60} x2f={0.30} o1={0.18} o2={0.09} />

      {/* Left column */}
      <div style={{ position: "absolute", top: 28, left: 28, bottom: 28, width: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "9px", color: C.gold, marginBottom: "10px", opacity: 0.8 }}>Mantle Field Services</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "24px", fontWeight: 700, color: C.fg, lineHeight: 1.2 }}>Gutters, pressure washing</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "24px", fontWeight: 700, color: C.gold, lineHeight: 1.2 }}>and lawn care.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { name: "Gutter cleaning", desc: "Full flush and debris removal" },
            { name: "Pressure washing", desc: "Driveways, siding and decks" },
            { name: "Lawn care", desc: "Mow, edge and trim" },
          ].map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ width: "3px", height: "3px", background: C.gold, borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: C.gold, fontFamily: "'Satoshi', system-ui, sans-serif" }}>{s.name}</div>
                <div style={{ fontSize: "9.5px", color: C.muted, fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "1px" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ height: "1px", background: `${C.gold}22`, marginBottom: "10px" }} />
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "16px", fontWeight: 700, color: C.fg }}>{PHONE}</div>
          <div style={{ fontSize: "9px", color: C.subtle, letterSpacing: "0.08em", fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "3px" }}>{WORKS_WEB}</div>
        </div>
      </div>

      {/* Right column, before/after placeholders */}
      <div style={{ position: "absolute", top: 28, right: 28, bottom: 28, width: 258, display: "flex", flexDirection: "column", gap: "10px" }}>
        {["Before", "After"].map(label => (
          <div key={label} style={{
            flex: 1, background: C.surface, border: `1px solid ${C.line}`, borderRadius: "5px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px",
          }}>
            <div style={{ fontSize: "8px", fontWeight: 700, color: C.line, letterSpacing: "0.16em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{label}</div>
            <div style={{ width: "28px", height: "1px", background: C.line }} />
          </div>
        ))}
      </div>
    </PostcardShell>
  );
}

function PostcardBack() {
  return (
    <PostcardShell style={{ background: P.paper }}>
      {/* EDDM Indicia box, top right */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        width: 118, height: 68, border: `1px solid ${P.rule}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px",
      }}>
        {["PRSRT STD", "ECRWSS EDDM", "US POSTAGE PAID", "", "RETAIL"].map((line, i) => (
          line === "" ?
            <div key={i} style={{ height: "1px", width: "80%", background: P.rule, margin: "2px 0" }} /> :
            <div key={i} style={{ fontSize: "7px", color: P.mid, fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: "0.06em" }}>{line}</div>
        ))}
      </div>

      {/* Return address, top left */}
      <div style={{ position: "absolute", top: 14, left: 18 }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: P.ink, fontFamily: "'Satoshi', system-ui, sans-serif" }}>Mantle Field Services</div>
        <div style={{ fontSize: "8px", color: P.mid, fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "1px" }}>{PHONE}</div>
        <div style={{ fontSize: "8px", color: P.mid, fontFamily: "'Satoshi', system-ui, sans-serif" }}>{WORKS_WEB}</div>
      </div>

      {/* Horizontal rule */}
      <div style={{ position: "absolute", top: 96, left: 14, right: 14, height: "1px", background: P.rule }} />

      {/* Address area, right side */}
      <div style={{
        position: "absolute", top: 110, right: 14, bottom: 14, width: 320,
        border: `1px dashed ${P.rule}`,
        display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 18px",
      }}>
        <div style={{ fontSize: "8.5px", color: P.faint, fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: "0.1em", marginBottom: "14px" }}>Local Postal Customer</div>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: "1px", background: P.rule, margin: "9px 0" }} />
        ))}
      </div>

      {/* Left content area */}
      <div style={{ position: "absolute", top: 110, left: 14, right: 358, bottom: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "6px 0" }}>
        <div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "20px", fontWeight: 700, color: P.ink }}>Mantle</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "9px", color: P.mid, marginTop: "2px" }}>Field Services</div>
        </div>
        <div>
          <div style={{ fontSize: "9.5px", fontWeight: 700, color: P.ink, fontFamily: "'Satoshi', system-ui, sans-serif", marginBottom: "4px" }}>Free quote</div>
          <div style={{ fontSize: "8.5px", color: P.mid, fontFamily: "'Satoshi', system-ui, sans-serif" }}>{PHONE}</div>
          <div style={{ fontSize: "8.5px", color: P.mid, fontFamily: "'Satoshi', system-ui, sans-serif" }}>{WORKS_WEB}</div>
        </div>
      </div>
    </PostcardShell>
  );
}

// ─── Rack card, Purcell Ventures digital ────────────────────────────────────

function RackCardFront() {
  return (
    <RackCardShell style={{ background: C.bg }}>
      <GhostPV w={RC_W} h={RC_H} opacity={0.07} />
      <Slash w={RC_W} h={RC_H} x1f={0.68} x2f={0.24} o1={0.20} o2={0.10} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "26px 22px" }}>
        {/* Wordmark */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "17px", fontWeight: 700, color: C.gold, lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "7.5px", fontWeight: 400, color: C.gold, marginTop: "2px", opacity: 0.82 }}>Ventures</div>
          <div style={{ height: "1px", background: `${C.gold}22`, margin: "10px 0" }} />
          <div style={{ fontSize: "10px", color: C.fg2, letterSpacing: "0.12em", fontFamily: "'Satoshi', system-ui, sans-serif", fontWeight: 600 }}>Digital services</div>
        </div>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", flex: 1 }}>
          {[
            { title: "Business website", desc: "Custom website that works on phones" },
            { title: "AI chatbot", desc: "Answers common customer questions" },
            { title: "Booking system", desc: "Online appointments, no phone needed" },
            { title: "Email marketing", desc: "Monthly campaigns, written for you" },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ width: "3px", height: "3px", background: C.gold, borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: C.fg, fontFamily: "'Satoshi', system-ui, sans-serif" }}>{item.title}</div>
                <div style={{ fontSize: "9px", color: C.muted, fontFamily: "'Satoshi', system-ui, sans-serif", marginTop: "1px" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: `${C.gold}15`, margin: "14px 0 10px" }} />

        {/* Price */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "8.5px", color: C.subtle, letterSpacing: "0.12em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>From</div>
          <div style={{ fontFamily: "'Clash Display', serif", fontSize: "24px", fontWeight: 700, color: C.gold, marginTop: "2px" }}>$99 a month</div>
        </div>

        {/* QR */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
          <img src={QR_PV_DIGITAL} width={88} height={88} alt="QR code" style={{ display: "block", borderRadius: "3px" }} />
          <div style={{ fontSize: "7.5px", color: C.subtle, letterSpacing: "0.1em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>purcellventures.co/digital</div>
        </div>
      </div>
    </RackCardShell>
  );
}

function RackCardBack() {
  return (
    <RackCardShell style={{ background: C.bg }}>
      <GhostPV w={RC_W} h={RC_H} opacity={0.10} />
      <Slash w={RC_W} h={RC_H} x1f={0.68} x2f={0.24} o1={0.12} o2={0.06} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "18px",
      }}>
        <div style={{ fontFamily: "'Clash Display', serif", fontSize: "10px", fontWeight: 700, color: C.gold, opacity: 0.8 }}>Purcell Ventures</div>
        <img src={QR_PV_BACK} width={120} height={120} alt="QR code" style={{ display: "block", borderRadius: "4px" }} />
        <div style={{ fontSize: "8.5px", color: C.subtle, letterSpacing: "0.14em", fontFamily: "'Satoshi', system-ui, sans-serif" }}>{PV_WEB}</div>
      </div>
    </RackCardShell>
  );
}


// ─── Download Component ───────────────────────────────────────────────────────

function MaterialSection({ title, subtitle, Front, Back, filenamePrefix, singleSide = false }: {
  title: string;
  subtitle: string;
  Front: React.ComponentType;
  Back?: React.ComponentType;
  filenamePrefix: string;
  singleSide?: boolean;
}) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const download = (ref: React.RefObject<HTMLDivElement | null>, filename: string) =>
    downloadPrintAsset(ref, filename);

  return (
    <div>
      <h3 className="pr-h3">{title}</h3>
      <p className="pr-sub">{subtitle}</p>
      <div className="pr-sides">
        <div className="pr-side">
          <p className="pr-lab">{singleSide ? "Design" : "Front"}</p>
          <div className="pr-art"><div ref={frontRef} style={{ display: "inline-block" }}><Front /></div></div>
          <button className="pr-btn" onClick={() => download(frontRef, singleSide ? filenamePrefix : `${filenamePrefix}-Front`)}>
            {singleSide ? "Download" : "Download front"}
          </button>
        </div>
        {!singleSide && Back && (
          <div className="pr-side">
            <p className="pr-lab">Back</p>
            <div className="pr-art"><div ref={backRef} style={{ display: "inline-block" }}><Back /></div></div>
            <button className="pr-btn" onClick={() => download(backRef, `${filenamePrefix}-Back`)}>Download back</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Printer Guide Data ───────────────────────────────────────────────────────

const PRINTER_GUIDE = [
  { material: "Business cards",    printer: "PrintingForLess.com",           cost: "$40 for 100",           finish: "Soft-touch matte",         notes: "Best dark card quality, reliable" },
  { material: "Door hangers",      printer: "PrintingForLess.com",           cost: "$60 for 250",           finish: "Soft-touch matte",         notes: "Same shop, same quality as cards" },
  { material: "Yard signs",        printer: "PrintingForLess.com",           cost: "$25 each",              finish: "Coroplast, no lamination", notes: "Order 5 to 10 to start and leave one at every job" },
  { material: "EDDM postcards",    printer: "USPS EDDM and PrintingForLess", cost: "$200 for 1,000 all in", finish: "Matte",                    notes: "Mail a whole zip code for $0.20 per house" },
  { material: "Rack cards",        printer: "PrintingForLess.com",           cost: "$30 for 100",           finish: "Matte",                    notes: "Batch with other orders to save shipping" },
  { material: "Vehicle decal",     printer: "Local vinyl shop",              cost: "$50 to $150",           finish: "Vinyl (removable)",        notes: "Cannot print here. Take the design to the shop" },
];

const CSS = `
.pr { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); }
.pr__bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px var(--gutter); border-bottom: 1px solid var(--line); }
.pr__brand { display: inline-flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; font: 600 17px/1 var(--font-display); min-height: 44px; }
.pr__home { color: var(--muted); font-size: 14px; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
.pr__home:hover { color: var(--gold-text); }
.pr__main { max-width: 1400px; margin: 0 auto; padding: 40px var(--gutter) 96px; }
.pr h1 { font: 600 clamp(28px, 5vw, 40px)/1.1 var(--font-display); margin: 0 0 8px; }
.pr__lede { color: var(--muted); margin: 0 0 56px; max-width: 60ch; }
.pr h2 { font: 600 24px/1.2 var(--font-display); margin: 0 0 32px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
.pr-group { margin-bottom: 80px; }
.pr-stack { display: flex; flex-direction: column; gap: 72px; }
.pr-h3 { font: 600 20px/1.2 var(--font-display); margin: 0 0 4px; }
.pr-sub { color: var(--muted); margin: 0 0 20px; font-size: 15px; }
.pr-sides { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; }
.pr-side { max-width: 100%; }
.pr-lab { color: var(--muted); font-size: 14px; margin: 0 0 8px; }
.pr-art { max-width: calc(100vw - 2 * var(--gutter)); overflow-x: auto; }
.pr-btn { margin-top: 12px; display: block; width: 100%; min-height: 44px; background: transparent; border: 1px solid #4a4236; color: var(--fg-2); font: 600 15px/1 var(--font-body); cursor: pointer; }
.pr-btn:hover { border-color: var(--gold); color: var(--gold-text); }
.pr-scroll { overflow-x: auto; }
.pr-table { width: 100%; border-collapse: collapse; min-width: 760px; }
.pr-table th { text-align: left; padding: 10px 16px 10px 0; color: var(--muted); font-weight: 500; font-size: 14px; border-bottom: 1px solid var(--line); }
.pr-table td { padding: 14px 16px 14px 0; border-bottom: 1px solid var(--line); font-size: 15px; color: var(--fg-2); vertical-align: top; }
.pr-table td:first-child { color: var(--fg); font-weight: 600; }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrintPage() {
  return (
    <div className="pr">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pr__bar">
        <Link href="/" className="pr__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="" width={32} height={32} />
          Purcell Ventures
        </Link>
        <Link href="/" className="pr__home">Home</Link>
      </div>

      <main className="pr__main">
        <h1>Print marketing suite</h1>
        <p className="pr__lede">Door hangers, yard signs, EDDM postcards and rack cards. Download each as a print-ready PNG.</p>

        <section className="pr-group">
          <h2>Mantle Field Services</h2>
          <div className="pr-stack">
            <MaterialSection
              title="Door hanger"
              subtitle="3.5 by 8.5 inches. Drop on doors near every job."
              Front={DoorHangerFront}
              Back={DoorHangerBack}
              filenamePrefix="MFS-DoorHanger"
            />
            <MaterialSection
              title="Yard sign"
              subtitle="24 by 18 inches. Leave at every job site for a week."
              Front={YardSignFront}
              filenamePrefix="MFS-YardSign"
              singleSide
            />
            <MaterialSection
              title="EDDM postcard"
              subtitle="6.25 by 9 inches. Direct mail to zip codes near jobs, $0.20 per house."
              Front={PostcardFront}
              Back={PostcardBack}
              filenamePrefix="MFS-Postcard"
            />
          </div>
        </section>

        <section className="pr-group">
          <h2>Purcell Ventures digital services</h2>
          <MaterialSection
            title="Rack card"
            subtitle="4 by 9 inches. Leave at networking events and hand to business owners."
            Front={RackCardFront}
            Back={RackCardBack}
            filenamePrefix="PV-RackCard"
          />
        </section>

        <section>
          <h2>Printer guide</h2>
          <div className="pr-scroll">
            <table className="pr-table">
              <thead>
                <tr>{["Material", "Printer", "Estimated cost", "Finish", "Notes"].map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {PRINTER_GUIDE.map(row => (
                  <tr key={row.material}>
                    <td>{row.material}</td><td>{row.printer}</td><td style={{ whiteSpace: "nowrap" }}>{row.cost}</td><td>{row.finish}</td><td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
