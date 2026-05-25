"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { isAdmin } from "@/lib/crm-storage";
import { getClickEvents, clearClickLog, type ClickEvent } from "@/lib/affiliate";

/**
 * Admin view of affiliate clicks.
 *
 * Reps share /shop/starter-kit?ref=luke-style URLs. Click events get logged
 * to localStorage on the buyer's browser. This view shows YOUR browser's
 * captured clicks (admin previewing) + provides URL builder for sharing.
 *
 * Once Firestore lands, clicks centralize server-side.
 */

const REPS = ["elijah", "luke", "jarod", "david", "mike"];
const PRODUCTS = [
  { slug: "starter-kit", label: "PV AI Starter Kit ($19)" },
  { slug: "cold-email-pack", label: "Cold Email Mastery Pack ($29)" },
  { slug: "shop", label: "Shop hub" },
];

export default function AffiliatesPage() {
  const [events, setEvents] = useState<ClickEvent[]>([]);
  const [ownerName, setOwnerName] = useState("");
  const [selectedRep, setSelectedRep] = useState(REPS[0]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEvents(getClickEvents());
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
  }, []);

  const admin = isAdmin(ownerName);
  if (!admin) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif" }}>Admin only</h1>
            <Link href="/rep-portal" style={{ color: "var(--color-warm-accent)" }}>← Back</Link>
          </main>
        </div>
      </div>
    );
  }

  const productPath = selectedProduct === "shop" ? "/shop" : `/shop/${selectedProduct}`;
  const shareURL = `https://purcellventures.co${productPath}?ref=${selectedRep}`;

  function copyURL() {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function reset() {
    if (!confirm("Clear all click events on this browser?")) return;
    clearClickLog();
    setEvents([]);
  }

  // Aggregate by ref
  const byRef = events.reduce((m, e) => {
    m.set(e.ref, (m.get(e.ref) || 0) + 1);
    return m;
  }, new Map<string, number>());
  const byProduct = events.reduce((m, e) => {
    m.set(e.product, (m.get(e.product) || 0) + 1);
    return m;
  }, new Map<string, number>());

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Admin · Affiliate Links</div>
            <h1>
              Share links + <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>track clicks.</em>
            </h1>
            <p className="deck">
              Build a share-able URL per rep + product. Stripe records the <code>client_reference_id</code> on each purchase so you can attribute commissions. Click counts are per-browser until Firestore lands.
            </p>
          </header>

          {/* URL Builder */}
          <section style={{ marginBottom: "32px", padding: "24px 28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
            <h3 style={sectionHead}>URL Builder</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={inputLabel}>Rep (referrer name)</label>
                <select value={selectedRep} onChange={(e) => setSelectedRep(e.target.value)} style={fieldStyle}>
                  {REPS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={inputLabel}>Product</label>
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} style={fieldStyle}>
                  {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <code style={{ flex: 1, padding: "12px 14px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", fontFamily: "var(--font-dm-sans), monospace", fontSize: "13px", color: "var(--color-warm-accent)", wordBreak: "break-all" }}>{shareURL}</code>
              <button onClick={copyURL} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>{copied ? "✓ Copied" : "Copy"}</button>
            </div>
            <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "12px", fontStyle: "italic", lineHeight: 1.6 }}>
              The rep shares this URL. When someone visits + buys, Stripe records the <code>client_reference_id</code> as their name. You see attribution in the Stripe dashboard. Commission paid manually based on tier (per <Link href="/rep-portal/pricing" style={{ color: "var(--color-warm-accent)" }}>Pricing reference</Link>).
            </p>
          </section>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            <Stat n={events.length} label="Click events (this browser)" />
            <Stat n={byRef.size} label="Unique referrers" />
            <Stat n={byProduct.size} label="Unique products" />
          </div>

          {/* By rep */}
          {byRef.size > 0 && (
            <section style={{ marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700 }}>Clicks by referrer</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {Array.from(byRef.entries()).sort((a, b) => b[1] - a[1]).map(([ref, count]) => (
                  <div key={ref} style={{ padding: "8px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text)" }}>
                    <strong style={{ color: "var(--color-warm-accent)" }}>{count}</strong> · {ref}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Events table */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, margin: 0 }}>Recent click events ({events.length})</h3>
            {events.length > 0 && <button onClick={reset} style={ghostBtn}>Clear all</button>}
          </div>
          {events.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No click events on this browser yet. When someone visits a /shop URL with ?ref=NAME, it logs here.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                  <th style={th}>When</th>
                  <th style={th}>Ref</th>
                  <th style={th}>Product</th>
                  <th style={th}>Source</th>
                </tr>
              </thead>
              <tbody>
                {events.slice().reverse().map((e, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                    <td style={{ ...td, fontFamily: "var(--font-dm-sans), monospace", fontSize: "11px", color: "var(--color-warm-text-muted)" }}>{new Date(e.timestamp).toLocaleString()}</td>
                    <td style={{ ...td, fontWeight: 700, color: "var(--color-warm-accent)" }}>{e.ref}</td>
                    <td style={td}>{e.product}</td>
                    <td style={{ ...td, color: "var(--color-warm-text-muted)" }}>{e.source || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </main>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{n}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700, marginTop: 0 };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "6px 12px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "middle" };
