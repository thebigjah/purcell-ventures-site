"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Customer {
  id: string;
  name: string;
  phone: string;
  punches: number;
  cap: number;
  redeemedCount: number;
  createdAt: string;
}

const KEY = "pv_loyalty_v1";

export default function LoyaltyPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", cap: 10 });
  const [defaultCap, setDefaultCap] = useState(10);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setCustomers(JSON.parse(raw));
  }, []);

  function save(updated: Customer[]) {
    setCustomers(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function add() {
    if (!form.name.trim()) return;
    const c: Customer = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      punches: 0,
      cap: form.cap || defaultCap,
      redeemedCount: 0,
      createdAt: new Date().toISOString(),
    };
    save([c, ...customers]);
    setAdding(false);
    setForm({ name: "", phone: "", cap: defaultCap });
  }

  function punch(id: string) {
    save(customers.map((c) => c.id === id ? { ...c, punches: Math.min(c.punches + 1, c.cap) } : c));
  }

  function redeem(id: string) {
    if (!confirm("Redeem this card? Resets punches to 0.")) return;
    save(customers.map((c) => c.id === id ? { ...c, punches: 0, redeemedCount: c.redeemedCount + 1 } : c));
  }

  function remove(id: string) {
    if (!confirm("Remove this customer?")) return;
    save(customers.filter((c) => c.id !== id));
  }

  const totalRedeemed = customers.reduce((s, c) => s + c.redeemedCount, 0);
  const totalPunches = customers.reduce((s, c) => s + c.punches + c.redeemedCount * c.cap, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>
        <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          ← All tools
        </Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Customer Management · Loyalty</div>
          <h1>
            Loyalty <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>punch card</em>
          </h1>
          <p className="deck">
            Digital punch card for repeat customers. Add a punch each visit. Hit the cap, redeem the reward. Stays on this device.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <Stat n={customers.length} label="Customers" />
          <Stat n={totalPunches} label="Total punches" />
          <Stat n={totalRedeemed} label="Rewards redeemed" />
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
          {!adding && (
            <button onClick={() => { setForm({ name: "", phone: "", cap: defaultCap }); setAdding(true); }} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>
              + New customer
            </button>
          )}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <label style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Default cap
            </label>
            <input type="number" value={defaultCap} onChange={(e) => setDefaultCap(Number(e.target.value) || 10)} style={{ width: "60px", padding: "8px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif" }} />
          </div>
        </div>

        {adding && (
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: "12px" }}>
              <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Jane Doe" />
              <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(770) 555-..." />
              <Input label="Cap" value={String(form.cap)} onChange={(v) => setForm({ ...form, cap: Number(v) || defaultCap })} type="number" />
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button onClick={add} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add</button>
              <button onClick={() => setAdding(false)} className="pv-btn-ghost" style={{ cursor: "pointer", background: "transparent" }}>Cancel</button>
            </div>
          </div>
        )}

        {customers.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>
            No customers yet. Add one to start tracking punches.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {customers.map((c) => {
              const filled = c.punches;
              const empty = c.cap - c.punches;
              const ready = filled >= c.cap;
              return (
                <div key={c.id} style={{ padding: "20px", background: "var(--color-warm-bg-alt)", border: `1px solid ${ready ? "var(--color-warm-accent)" : "var(--color-warm-border)"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>{c.name}</h3>
                      <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{c.phone || "No phone"} · {c.redeemedCount} reward(s) redeemed</div>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button onClick={() => punch(c.id)} disabled={ready} style={btn("primary")}>+ Punch</button>
                      {ready && <button onClick={() => redeem(c.id)} style={{ ...btn("primary"), background: "var(--color-warm-accent)", color: "var(--color-warm-bg)" }}>Redeem</button>}
                      <button onClick={() => remove(c.id)} style={btn("ghost")}>×</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[...Array(filled)].map((_, i) => <Dot key={`f${i}`} filled />)}
                    {[...Array(empty)].map((_, i) => <Dot key={`e${i}`} />)}
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "11px", color: ready ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {ready ? "Ready to redeem!" : `${c.punches} of ${c.cap}`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{n}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" }} />
    </div>
  );
}

function Dot({ filled = false }: { filled?: boolean }) {
  return <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: filled ? "var(--color-warm-accent)" : "transparent", border: `1.5px solid ${filled ? "var(--color-warm-accent)" : "var(--color-warm-border-light)"}` }} />;
}

function btn(kind: "primary" | "ghost"): React.CSSProperties {
  return {
    padding: "6px 12px", border: kind === "primary" ? "1px solid var(--color-warm-accent)" : "1px solid var(--color-warm-border)",
    background: "transparent", color: kind === "primary" ? "var(--color-warm-accent)" : "var(--color-warm-text-light)",
    fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
    fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700,
  };
}
