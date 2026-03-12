"use client";
// Full Print Marketing Suite — purcellventures.co/print
// Materials: Door Hanger · Yard Sign · EDDM Postcard (Purcell Works) + Rack Card (PV Digital)

import React, { useRef } from "react";
import { downloadPrintAsset } from "@/lib/printDownload";

// ─── Dimensions ───────────────────────────────────────────────────────────────
// Door Hanger  3.5" × 8.5"  @ 108px/in → 378 × 918
const DH_W = 378, DH_H = 918;
// Yard Sign    24" × 18"    @ 30px/in  → 720 × 540
const YS_W = 720, YS_H = 540;
// EDDM Postcard 6.25" × 4.25" (mail side) @ ~101px/in → 630 × 432
const PC_W = 630, PC_H = 432;
// Rack Card    4" × 9"      @ 68px/in  → 270 × 612
const RC_W = 270, RC_H = 612;

// ─── Contact Info ─────────────────────────────────────────────────────────────
const PHONE = "(770) 280-5319";
const WORKS_WEB = "works.purcellventures.co";
const PV_WEB = "purcellventures.co";

const QR_WORKS = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://works.purcellventures.co&bgcolor=0c0a08&color=d4af37`;
const QR_PV_DIGITAL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://purcellventures.co/digital&bgcolor=0c0a08&color=d4af37`;
const QR_PV_BACK = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://purcellventures.co&bgcolor=0c0a08&color=d4af37`;

// ─── Shell Components ─────────────────────────────────────────────────────────

function DoorHangerShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: DH_W, height: DH_H, position: "relative", overflow: "hidden", borderRadius: "8px", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", ...style }}>
      {children}
    </div>
  );
}

function YardSignShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: YS_W, height: YS_H, position: "relative", overflow: "hidden", borderRadius: "8px", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", ...style }}>
      {children}
    </div>
  );
}

function PostcardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: PC_W, height: PC_H, position: "relative", overflow: "hidden", borderRadius: "8px", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", ...style }}>
      {children}
    </div>
  );
}

function RackCardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: RC_W, height: RC_H, position: "relative", overflow: "hidden", borderRadius: "8px", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", ...style }}>
      {children}
    </div>
  );
}

// ─── Shared SVG Primitives ────────────────────────────────────────────────────

function GhostPV({ w, h, opacity = 0.07 }: { w: number; h: number; opacity?: number }) {
  const fs = Math.round(Math.min(w * 0.58, h * 0.45));
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif" fontSize={fs} fontWeight="700"
        fill="#d4af37" opacity={opacity} letterSpacing="8">PV</text>
    </svg>
  );
}

function GhostPW({ w, h, opacity = 0.07 }: { w: number; h: number; opacity?: number }) {
  const fs = Math.round(Math.min(w * 0.58, h * 0.45));
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif" fontSize={fs} fontWeight="700"
        fill="#d4af37" opacity={opacity} letterSpacing="8">PW</text>
    </svg>
  );
}

function Slash({ w, h, x1f = 0.62, x2f = 0.28, o1 = 0.22, o2 = 0.12 }: {
  w: number; h: number; x1f?: number; x2f?: number; o1?: number; o2?: number;
}) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={w * x1f} y1={0} x2={w * x2f} y2={h} stroke="#d4af37" strokeWidth="1.5" opacity={o1} />
      <line x1={w * (x1f + 0.07)} y1={0} x2={w * (x2f + 0.07)} y2={h} stroke="#d4af37" strokeWidth="0.75" opacity={o2} />
    </svg>
  );
}

// ─── DOOR HANGER — Purcell Works ─────────────────────────────────────────────

function DoorHangerFront() {
  return (
    <DoorHangerShell style={{ background: "#0c0a08" }}>
      <GhostPW w={DH_W} h={DH_H} />
      <Slash w={DH_W} h={DH_H} x1f={0.65} x2f={0.22} />

      {/* Hole circle */}
      <div style={{
        position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
        width: 46, height: 46, borderRadius: "50%",
        border: "1.5px dashed #d4af3745", background: "#07060505",
      }} />

      {/* All content below hole */}
      <div style={{ position: "absolute", top: 84, left: 28, right: 28, bottom: 28, display: "flex", flexDirection: "column" }}>

        {/* Top rule */}
        <div style={{ height: "1px", background: "#d4af3722", marginBottom: "20px" }} />

        {/* Wordmark */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "12px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.32em", marginTop: "3px", opacity: 0.82 }}>WORKS</div>
        </div>

        <div style={{ height: "1px", background: "#d4af3718", marginBottom: "22px" }} />

        {/* Services */}
        <div style={{ display: "flex", flexDirection: "column", gap: "13px", flex: 1 }}>
          {[
            { name: "Gutter Cleaning", desc: "Full flush & debris removal" },
            { name: "Pressure Washing", desc: "Driveways, siding & decks" },
            { name: "Lawn Care", desc: "Mow, edge & trim" },
          ].map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
              <div style={{ width: "4px", height: "4px", background: "#d4af37", borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e0", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}>{s.name}</div>
                <div style={{ fontSize: "10px", color: "#6a6458", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "#d4af3718", margin: "22px 0 16px" }} />

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.08em" }}>Free Quote</div>
          <div style={{ fontSize: "9px", color: "#8a8070", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginTop: "3px" }}>Same Day Response</div>
        </div>

        {/* Phone */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "19px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.04em" }}>{PHONE}</div>
        </div>

        <div style={{ height: "1px", background: "#d4af3715", marginBottom: "12px" }} />

        {/* URL */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: "#524d45", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{WORKS_WEB}</div>
        </div>
      </div>
    </DoorHangerShell>
  );
}

function DoorHangerBack() {
  return (
    <DoorHangerShell style={{ background: "#0c0a08" }}>
      <GhostPW w={DH_W} h={DH_H} opacity={0.10} />
      <Slash w={DH_W} h={DH_H} x1f={0.65} x2f={0.22} o1={0.13} o2={0.07} />

      {/* Hole circle */}
      <div style={{
        position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
        width: 46, height: 46, borderRadius: "50%",
        border: "1.5px dashed #d4af3745", background: "#07060505",
      }} />

      {/* Centered content block below hole */}
      <div style={{
        position: "absolute", top: 84, left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 28px 28px", gap: "20px",
      }}>
        {/* Offer badge */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11px", color: "#d4af37", letterSpacing: "0.22em", opacity: 0.65, marginBottom: "8px" }}>FIRST SERVICE</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "52px", fontWeight: 700, color: "#d4af37", lineHeight: 0.9 }}>10%</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.14em", marginTop: "4px" }}>OFF</div>
          <div style={{ fontSize: "10px", color: "#6a6458", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginTop: "8px" }}>your first service</div>
        </div>

        <div style={{ height: "1px", width: "100%", background: "#d4af3720" }} />

        {/* Phone */}
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.04em", textAlign: "center" }}>{PHONE}</div>

        {/* QR */}
        <img src={QR_WORKS} width={110} height={110} alt="QR" style={{ display: "block", borderRadius: "4px" }} />

        <div style={{ height: "1px", width: "100%", background: "#d4af3714" }} />

        {/* URL */}
        <div style={{ fontSize: "9px", color: "#524d45", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{WORKS_WEB}</div>
      </div>
    </DoorHangerShell>
  );
}

// ─── YARD SIGN — Purcell Works ────────────────────────────────────────────────

function YardSignFront() {
  return (
    <YardSignShell style={{ background: "#0c0a08" }}>
      <GhostPW w={YS_W} h={YS_H} opacity={0.06} />
      <Slash w={YS_W} h={YS_H} x1f={0.64} x2f={0.36} o1={0.20} o2={0.10} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "36px 60px", gap: "0",
      }}>
        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "64px", fontWeight: 700, color: "#d4af37", lineHeight: 1, letterSpacing: "0.04em" }}>PURCELL</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.36em", marginTop: "3px", opacity: 0.85 }}>WORKS</div>
        </div>

        {/* Services row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          {["Gutters", "Pressure Washing", "Lawn Care"].map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <div style={{ width: "3px", height: "3px", background: "#d4af3760", borderRadius: "50%" }} />}
              <div style={{ fontSize: "14px", color: "#c8bfb0", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>{s}</div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ height: "1px", width: "260px", background: "#d4af3728", marginBottom: "14px" }} />

        {/* Phone — very large */}
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "46px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.05em", marginBottom: "10px" }}>{PHONE}</div>

        {/* URL */}
        <div style={{ fontSize: "11px", color: "#6a6458", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{WORKS_WEB}</div>
      </div>
    </YardSignShell>
  );
}

// ─── EDDM POSTCARD — Purcell Works ───────────────────────────────────────────

function PostcardFront() {
  return (
    <PostcardShell style={{ background: "#0c0a08" }}>
      <GhostPW w={PC_W} h={PC_H} opacity={0.06} />
      <Slash w={PC_W} h={PC_H} x1f={0.60} x2f={0.30} o1={0.18} o2={0.09} />

      {/* Left column */}
      <div style={{ position: "absolute", top: 28, left: 28, bottom: 28, width: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "9px", color: "#d4af37", letterSpacing: "0.30em", marginBottom: "10px", opacity: 0.6 }}>PURCELL WORKS</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "#f5f0e0", lineHeight: 1.2 }}>Your property.</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "#d4af37", lineHeight: 1.2 }}>Done right.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { name: "Gutter Cleaning", desc: "Full flush & debris removal" },
            { name: "Pressure Washing", desc: "Driveways, siding & decks" },
            { name: "Lawn Care", desc: "Mow, edge & trim" },
          ].map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ width: "3px", height: "3px", background: "#d4af37", borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#d4af37", fontFamily: "Inter, sans-serif" }}>{s.name}</div>
                <div style={{ fontSize: "9.5px", color: "#6a6458", fontFamily: "Inter, sans-serif", marginTop: "1px" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ height: "1px", background: "#d4af3222", marginBottom: "10px" }} />
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#f5f0e0" }}>{PHONE}</div>
          <div style={{ fontSize: "9px", color: "#524d45", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginTop: "3px" }}>{WORKS_WEB}</div>
        </div>
      </div>

      {/* Right column — before/after placeholders */}
      <div style={{ position: "absolute", top: 28, right: 28, bottom: 28, width: 258, display: "flex", flexDirection: "column", gap: "10px" }}>
        {["Before", "After"].map(label => (
          <div key={label} style={{
            flex: 1, background: "#171412", border: "1px solid #2e2820", borderRadius: "5px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px",
          }}>
            <div style={{ fontSize: "8px", fontWeight: 700, color: "#2e2820", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{label}</div>
            <div style={{ width: "28px", height: "1px", background: "#2e2820" }} />
          </div>
        ))}
      </div>
    </PostcardShell>
  );
}

function PostcardBack() {
  return (
    <PostcardShell style={{ background: "#f0ebe2" }}>
      {/* EDDM Indicia box — top right */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        width: 118, height: 68, border: "1px solid #b8a898",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px",
      }}>
        {["PRSRT STD", "ECRWSS EDDM", "US POSTAGE PAID", "", "RETAIL"].map((line, i) => (
          line === "" ?
            <div key={i} style={{ height: "1px", width: "80%", background: "#b8a898", margin: "2px 0" }} /> :
            <div key={i} style={{ fontSize: "7px", color: "#6a5a4a", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em" }}>{line}</div>
        ))}
      </div>

      {/* Return address — top left */}
      <div style={{ position: "absolute", top: 14, left: 18 }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#2e2416", fontFamily: "Inter, sans-serif" }}>Purcell Works</div>
        <div style={{ fontSize: "8px", color: "#6a5a4a", fontFamily: "Inter, sans-serif", marginTop: "1px" }}>{PHONE}</div>
        <div style={{ fontSize: "8px", color: "#6a5a4a", fontFamily: "Inter, sans-serif" }}>{WORKS_WEB}</div>
      </div>

      {/* Horizontal rule */}
      <div style={{ position: "absolute", top: 96, left: 14, right: 14, height: "1px", background: "#c8b8a8" }} />

      {/* Address area — right side */}
      <div style={{
        position: "absolute", top: 110, right: 14, bottom: 14, width: 320,
        border: "1px dashed #c0b0a0",
        display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 18px",
      }}>
        <div style={{ fontSize: "8.5px", color: "#b0a090", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Postal Patron — Local</div>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: "1px", background: "#c8b8a8", margin: "9px 0" }} />
        ))}
      </div>

      {/* Left content area */}
      <div style={{ position: "absolute", top: 110, left: 14, right: 358, bottom: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "6px 0" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#2e2416" }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "8px", letterSpacing: "0.30em", color: "#6a5a4a", marginTop: "2px" }}>WORKS</div>
        </div>
        <div>
          <div style={{ fontSize: "9.5px", fontWeight: 700, color: "#3a2e1a", fontFamily: "Inter, sans-serif", marginBottom: "4px" }}>Free Quote · Same Day</div>
          <div style={{ fontSize: "8.5px", color: "#6a5a4a", fontFamily: "Inter, sans-serif" }}>{PHONE}</div>
          <div style={{ fontSize: "8.5px", color: "#6a5a4a", fontFamily: "Inter, sans-serif" }}>{WORKS_WEB}</div>
        </div>
      </div>
    </PostcardShell>
  );
}

// ─── RACK CARD — Purcell Ventures Digital ────────────────────────────────────

function RackCardFront() {
  return (
    <RackCardShell style={{ background: "#0c0a08" }}>
      <GhostPV w={RC_W} h={RC_H} opacity={0.07} />
      <Slash w={RC_W} h={RC_H} x1f={0.68} x2f={0.24} o1={0.20} o2={0.10} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "26px 22px" }}>
        {/* Wordmark */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "7.5px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.30em", marginTop: "2px", opacity: 0.82 }}>VENTURES</div>
          <div style={{ height: "1px", background: "#d4af3722", margin: "10px 0" }} />
          <div style={{ fontSize: "10px", color: "#c8bfb0", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Digital Services</div>
        </div>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", flex: 1 }}>
          {[
            { title: "Business Website", desc: "Custom, mobile-ready, SEO-optimized" },
            { title: "AI Chatbot", desc: "Answers customers 24/7 automatically" },
            { title: "Booking System", desc: "Online appointments — no phone needed" },
            { title: "Email Marketing", desc: "Monthly campaigns, auto-generated" },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ width: "3px", height: "3px", background: "#d4af37", borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>{item.title}</div>
                <div style={{ fontSize: "9px", color: "#6a6458", fontFamily: "Inter, sans-serif", marginTop: "1px" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "#d4af3715", margin: "14px 0 10px" }} />

        {/* Price */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "8.5px", color: "#524d45", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Starting at</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>$75 / mo</div>
        </div>

        {/* QR */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
          <img src={QR_PV_DIGITAL} width={88} height={88} alt="QR" style={{ display: "block", borderRadius: "3px" }} />
          <div style={{ fontSize: "7.5px", color: "#524d45", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>purcellventures.co/digital</div>
        </div>
      </div>
    </RackCardShell>
  );
}

function RackCardBack() {
  return (
    <RackCardShell style={{ background: "#0c0a08" }}>
      <GhostPV w={RC_W} h={RC_H} opacity={0.10} />
      <Slash w={RC_W} h={RC_H} x1f={0.68} x2f={0.24} o1={0.12} o2={0.06} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "18px",
      }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "10px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.26em", opacity: 0.65 }}>PURCELL VENTURES</div>
        <img src={QR_PV_BACK} width={120} height={120} alt="QR" style={{ display: "block", borderRadius: "4px" }} />
        <div style={{ fontSize: "8.5px", color: "#524d45", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{PV_WEB}</div>
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

  const btnStyle: React.CSSProperties = {
    marginTop: "10px", padding: "8px 18px", background: "none",
    border: "1px solid #2e2820", color: "#8a8070", fontSize: "11px",
    fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer", borderRadius: "4px", display: "block", width: "100%",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#3a3530", marginBottom: "8px",
  };

  return (
    <div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#f5f0e0", marginBottom: "4px" }}>{title}</div>
      <div style={{ fontSize: "13px", color: "#524d45", marginBottom: "20px" }}>{subtitle}</div>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={labelStyle}>{singleSide ? "Design" : "Front"}</div>
          <div ref={frontRef} style={{ display: "inline-block" }}><Front /></div>
          <button style={btnStyle} onClick={() => download(frontRef, singleSide ? filenamePrefix : `${filenamePrefix}-Front`)}>
            ↓ Download {singleSide ? "" : "Front"}
          </button>
        </div>
        {!singleSide && Back && (
          <div>
            <div style={labelStyle}>Back</div>
            <div ref={backRef} style={{ display: "inline-block" }}><Back /></div>
            <button style={btnStyle} onClick={() => download(backRef, `${filenamePrefix}-Back`)}>↓ Download Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Printer Guide Data ───────────────────────────────────────────────────────

const PRINTER_GUIDE = [
  { material: "Business Cards",    printer: "PrintingForLess.com",        cost: "~$40 / 100",          finish: "Soft-touch matte",  notes: "Best dark card quality — reliable" },
  { material: "Door Hangers",      printer: "PrintingForLess.com",        cost: "~$60 / 250",          finish: "Soft-touch matte",  notes: "Same shop, same quality as cards" },
  { material: "Yard Signs",        printer: "PrintingForLess.com",        cost: "~$25 / ea",           finish: "Coroplast, no lam", notes: "Order 5–10 to start, leave at every job" },
  { material: "EDDM Postcards",    printer: "USPS EDDM + PrintingForLess",cost: "~$200 / 1,000 all-in",finish: "Matte",             notes: "Saturate a zip code — ~$0.20/house" },
  { material: "Rack Cards",        printer: "PrintingForLess.com",        cost: "~$30 / 100",          finish: "Matte",             notes: "Batch with other orders to save shipping" },
  { material: "Vehicle Decal",     printer: "Local vinyl shop",           cost: "$50–150",             finish: "Vinyl (removable)", notes: "Can't print here — take design to shop" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrintPage() {
  const sectionLabelStyle: React.CSSProperties = {
    fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
    textTransform: "uppercase", color: "#d4af37",
    paddingBottom: "16px", borderBottom: "1px solid #2e2820", marginBottom: "40px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 64px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px" }}>
          Purcell Ventures — Private
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>
          Print Marketing Suite
        </h1>
        <p style={{ fontSize: "14px", color: "#524d45" }}>
          Door hangers · Yard signs · EDDM postcards · Rack cards — download as print-ready PNG
        </p>
      </div>

      {/* ── Purcell Works Materials ───────────────────────────────────────────── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 80px" }}>
        <div style={sectionLabelStyle}>Purcell Works — Field Services</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "72px" }}>

          <MaterialSection
            title="Door Hanger"
            subtitle='3.5" × 8.5" — drop on doors in neighborhoods near every job'
            Front={DoorHangerFront}
            Back={DoorHangerBack}
            filenamePrefix="PW-DoorHanger"
          />

          <MaterialSection
            title="Yard Sign"
            subtitle='24" × 18" — leave at every job site for a week'
            Front={YardSignFront}
            filenamePrefix="PW-YardSign"
            singleSide
          />

          <MaterialSection
            title="EDDM Postcard"
            subtitle='6.25" × 9" — direct mail to zip codes near jobs (~$0.20 / house)'
            Front={PostcardFront}
            Back={PostcardBack}
            filenamePrefix="PW-Postcard"
          />

        </div>
      </div>

      {/* ── Purcell Ventures Digital Materials ──────────────────────────────── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 80px" }}>
        <div style={sectionLabelStyle}>Purcell Ventures — Digital Services</div>

        <MaterialSection
          title="Rack Card"
          subtitle='4" × 9" — leave at networking events, hand to business owners'
          Front={RackCardFront}
          Back={RackCardBack}
          filenamePrefix="PV-RackCard"
        />
      </div>

      {/* ── Printer Guide ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 0" }}>
        <div style={sectionLabelStyle}>Printer Guide</div>

        <div style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "10px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" }}>
            <thead>
              <tr>
                {["Material", "Printer", "Est. Cost", "Finish", "Notes"].map(h => (
                  <th key={h} style={{
                    textAlign: "left", fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#524d45", padding: "16px 20px 12px",
                    borderBottom: "1px solid #2e2820",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRINTER_GUIDE.map((row, i) => (
                <tr key={row.material} style={{ borderBottom: i < PRINTER_GUIDE.length - 1 ? "1px solid #1a1816" : "none" }}>
                  <td style={{ padding: "14px 20px", fontSize: "13px", color: "#f5f0e0", fontWeight: 600 }}>{row.material}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "#d4af37" }}>{row.printer}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "#c8bfb0", whiteSpace: "nowrap" }}>{row.cost}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "#8a8070" }}>{row.finish}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "#524d45" }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ height: "80px" }} />
    </div>
  );
}
