"use client";
// QR code hub, purcellventures.co/qr
// All brand URLs as downloadable high-res QR codes (1000 by 1000 px)

import React from "react";
import { CONTACT } from "@/lib/contact";

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
      { name: "Digital services", data: "https://purcellventures.co/digital",     desc: "purcellventures.co/digital" },
      { name: "Consulting",       data: "https://purcellventures.co/consulting",  desc: "purcellventures.co/consulting" },
      { name: "Custom software",  data: "https://purcellventures.co/software",    desc: "purcellventures.co/software" },
      { name: "Mantle Field Services", data: "https://mantle-field-site.vercel.app", desc: "mantle-field-site.vercel.app" },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "Call or text",  data: `tel:${CONTACT.phoneE164}`, desc: CONTACT.phone },
      { name: "Email",        data: `mailto:${CONTACT.email}`, desc: CONTACT.email },
      { name: "vCard",        data: `BEGIN:VCARD\nVERSION:3.0\nFN:Elijah Purcell\nORG:Purcell Ventures\nTITLE:Founder/CEO\nTEL:${CONTACT.phoneE164}\nEMAIL:${CONTACT.email}\nURL:https://purcellventures.co\nEND:VCARD`, desc: "Save contact" },
    ],
  },
  {
    label: "Internal tools",
    items: [
      { name: "Sales playbook", data: "https://purcellventures.co/digital/playbook", desc: "purcellventures.co/digital/playbook" },
      { name: "Business finder", data: "https://purcellventures.co/digital/finder",  desc: "purcellventures.co/digital/finder" },
      { name: "Business cards",  data: "https://purcellventures.co/business-cards",  desc: "purcellventures.co/business-cards" },
      { name: "Print materials", data: "https://purcellventures.co/print",           desc: "purcellventures.co/print" },
    ],
  },
];

// ─── QR URL helpers ───────────────────────────────────────────────────────────

function qrUrl(data: string, size: number, dark = true) {
  // The QR service takes bare hex. These are --gold-text, --bg and --fg.
  const fg = dark ? "e3bd6a" : "07060a";
  const bg = dark ? "07060a" : "efe8d8";
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

  const btn: React.CSSProperties = {
    minHeight: 44, padding: "0 14px", fontSize: 14, fontWeight: 500, cursor: "pointer",
    borderRadius: 0, fontFamily: "var(--font-body)",
  };

  return (
    <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrUrl(data, 200, dark)} width={160} height={160} alt={`QR code for ${name}`} style={{ display: "block" }} />

      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>{name}</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 2, overflowWrap: "anywhere" }}>{desc}</div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[true, false].map(d => (
          <button
            key={String(d)}
            onClick={() => setDark(d)}
            aria-pressed={dark === d}
            style={{
              ...btn,
              background: dark === d ? "var(--gold)" : "none",
              color: dark === d ? "var(--bg)" : "var(--muted)",
              border: dark === d ? "1px solid var(--gold)" : "1px solid var(--line)",
            }}
          >
            {d ? "Dark" : "Light"}
          </button>
        ))}
      </div>

      <button
        onClick={handleDownload}
        disabled={loading}
        style={{ ...btn, width: "100%", background: "none", border: "1px solid var(--line)", color: loading ? "var(--subtle)" : "var(--fg-2)", cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Downloading" : "Download 1000 by 1000"}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QrPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--font-body)", padding: "48px var(--gutter)", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <header style={{ marginBottom: 48 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="" width={44} height={44} style={{ display: "block", marginBottom: 16 }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 600, margin: "0 0 10px" }}>QR code hub</h1>
          <p style={{ fontSize: 16, color: "var(--fg-2)", margin: 0, maxWidth: 560 }}>
            1000 by 1000 pixel downloads in dark or light, ready for stickers, cards and print.
          </p>
        </header>

        {CATEGORIES.map(cat => (
          <section key={cat.label} style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, margin: "0 0 20px" }}>{cat.label}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))", gap: 24 }}>
              {cat.items.map(item => (
                <QrCard key={item.name} {...item} />
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
