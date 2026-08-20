"use client";
// QR Code Hub — purcellventures.co/qr
// All brand URLs as downloadable high-res QR codes (1000×1000px)

import React from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

// ─── QR items ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: "Brand",
    items: [
      { name: "Homepage",        data: "https://purcellventures.co",             desc: "purcellventures.co" },
      { name: "Mantle Field Services", data: "https://mantle-field-site.vercel.app", desc: "mantle-field-site.vercel.app" },
    ],
  },
  {
    label: "Services",
    items: [
      { name: "Digital Services", data: "https://purcellventures.co/digital",     desc: "purcellventures.co/digital" },
      { name: "Consulting",       data: "https://purcellventures.co/consulting",  desc: "purcellventures.co/consulting" },
      { name: "Custom Software",  data: "https://purcellventures.co/software",    desc: "purcellventures.co/software" },
      { name: "Mantle Field Services", data: "https://mantle-field-site.vercel.app", desc: "mantle-field-site.vercel.app" },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "Call / Text",  data: "tel:+12054627839",                         desc: "(205) 462-7839" },
      { name: "Email",        data: "mailto:elijah@purcell-ventures.com",        desc: "elijah@purcell-ventures.com" },
      { name: "vCard",        data: "BEGIN:VCARD\nVERSION:3.0\nFN:Elijah Purcell\nORG:Purcell Ventures\nTEL:+12054627839\nEMAIL:elijah@purcell-ventures.com\nURL:https://purcellventures.co\nEND:VCARD", desc: "Save contact" },
    ],
  },
  {
    label: "Internal Tools",
    items: [
      { name: "Sales Playbook", data: "https://purcellventures.co/digital/playbook", desc: "purcellventures.co/digital/playbook" },
      { name: "Business Finder", data: "https://purcellventures.co/digital/finder",  desc: "purcellventures.co/digital/finder" },
      { name: "Business Cards",  data: "https://purcellventures.co/business-cards",  desc: "purcellventures.co/business-cards" },
      { name: "Print Materials", data: "https://purcellventures.co/print",           desc: "purcellventures.co/print" },
    ],
  },
];

// ─── QR URL helpers ───────────────────────────────────────────────────────────

function qrUrl(data: string, size: number, dark = true) {
  const fg = dark ? "d4af37" : "0c0a08";
  const bg = dark ? "0c0a08" : "f5f0e0";
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&color=${fg}&bgcolor=${bg}&margin=16`;
}

// ─── Download ─────────────────────────────────────────────────────────────────

async function downloadQr(name: string, data: string, dark: boolean) {
  const url = qrUrl(data, 1000, dark);
  const res = await fetch(url);
  const blob = await res.blob();
  const a = document.createElement("a");
  const theme = dark ? "Dark" : "Light";
  a.download = `QR-${name.replace(/\s+/g, "-")}-${theme}.png`;
  a.href = URL.createObjectURL(blob);
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 60000);
}

// ─── QR Card ─────────────────────────────────────────────────────────────────

function QrCard({ name, data, desc }: { name: string; data: string; desc: string }) {
  const [dark, setDark] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await downloadQr(name, data, dark);
    setLoading(false);
  };

  return (
    <div style={{
      background: "#0f0d0b", border: "1px solid #2e2820", borderRadius: "10px",
      padding: "24px", display: "flex", flexDirection: "column", gap: "16px",
      alignItems: "center",
    }}>
      {/* QR preview */}
      <div style={{ borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrUrl(data, 200, dark)}
          width={160} height={160}
          alt={`QR for ${name}`}
          style={{ display: "block" }}
        />
      </div>

      {/* Info */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.04em" }}>{name}</div>
        <div style={{ fontSize: "10px", color: "#524d45", marginTop: "4px", fontFamily: "monospace" }}>{desc}</div>
      </div>

      {/* Theme toggle */}
      <div style={{ display: "flex", gap: "6px" }}>
        {[true, false].map(d => (
          <button
            key={String(d)}
            onClick={() => setDark(d)}
            style={{
              padding: "4px 12px", fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: "4px", fontFamily: "Inter, sans-serif",
              background: dark === d ? "#d4af37" : "none",
              color: dark === d ? "#0c0a08" : "#524d45",
              border: dark === d ? "1px solid #d4af37" : "1px solid #2e2820",
              transition: "all 0.15s",
            }}
          >
            {d ? "Dark" : "Light"}
          </button>
        ))}
      </div>

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={loading}
        style={{
          width: "100%", padding: "8px 0", background: "none",
          border: "1px solid #2e2820", color: loading ? "#3a3530" : "#8a8070",
          fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", cursor: loading ? "wait" : "pointer",
          borderRadius: "4px", fontFamily: "Inter, sans-serif",
        }}
      >
        {loading ? "Downloading..." : "↓ Download 1000×1000"}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QrPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden", fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5, maxWidth: "1100px", margin: "0 auto" }}>

        <header className="pv-page-head" style={{ marginBottom: "48px" }}>
          <div className="pv-mono-label">Internal · QR Code Hub</div>
          <h1 style={{ margin: 0 }}>
            QR <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Hub.</em>
          </h1>
          <p className="deck">
            1000×1000 px downloads · Dark or light · Ready for stickers, cards, and print.
          </p>
        </header>

        {CATEGORIES.map(cat => (
          <div key={cat.label} style={{ marginBottom: "56px" }}>
            <header className="pv-section-head" style={{ marginBottom: "24px", padding: "20px 0 14px" }}>
              <span className="roman">§</span>
              <h2>{cat.label}</h2>
            </header>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px" }}>
              {cat.items.map(item => (
                <QrCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
