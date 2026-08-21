"use client";

import { useState, useEffect } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

/**
 * Rep CRM v0.1, localStorage-backed (per-browser).
 *
 * Each rep tracks their own deals locally. Admin (Elijah) does NOT see
 * cross-rep deals here, that requires a shared backend (Firestore) which
 * lands in the next workshop. For now, reps screenshot or export their
 * deal list to share with Elijah for commission verification.
 */

const STATUSES = ["New", "Contacted", "Quoted", "Negotiating", "Closed Won", "Closed Lost"] as const;
type Status = (typeof STATUSES)[number];
const STATUS_COLORS: Record<Status, string> = {
  "New": "#d4af37",
  "Contacted": "#7aaa6a",
  "Quoted": "#9b7fd4",
  "Negotiating": "#e8b968",
  "Closed Won": "#4a9a6a",
  "Closed Lost": "#6a4a4a",
};

const SERVICES = [
  "Digital Starter ($99/mo)",
  "Digital Growth ($179/mo)",
  "Digital Full ($279/mo)",
  "Consulting 1-on-1 ($175/hr)",
  "Consulting Small Group ($125/person)",
  "Consulting Workshop ($2,500 flat)",
  "Custom Software ($1.5k+)",
  "Course - College Apps ($297)",
  "Course - Business Launch ($397)",
  "Course - Zero to Automated ($397+)",
  "Mantle (specify)",
];

interface Deal {
  id: string;
  prospect: string;
  contact: string;
  service: string;
  status: Status;
  commission: number;
  notes: string;
  createdAt: string;
  closedAt?: string;
}

const STORAGE_KEY = "pv_rep_deals_v1";

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ prospect: "", contact: "", service: SERVICES[0], status: "New" as Status, commission: 0, notes: "" });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setDeals(JSON.parse(raw));
  }, []);

  function save(updated: Deal[]) {
    setDeals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addDeal() {
    if (!form.prospect.trim()) return;
    const deal: Deal = {
      id: crypto.randomUUID(),
      prospect: form.prospect.trim(),
      contact: form.contact.trim(),
      service: form.service,
      status: form.status,
      commission: Number(form.commission) || 0,
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
    };
    save([deal, ...deals]);
    setAdding(false);
    setForm({ prospect: "", contact: "", service: SERVICES[0], status: "New", commission: 0, notes: "" });
  }

  function updateStatus(id: string, status: Status) {
    save(deals.map((d) => d.id === id ? { ...d, status, closedAt: status.startsWith("Closed") ? new Date().toISOString() : d.closedAt } : d));
  }

  function remove(id: string) {
    if (!confirm("Remove this deal?")) return;
    save(deals.filter((d) => d.id !== id));
  }

  const totalCommission = deals.filter((d) => d.status === "Closed Won").reduce((s, d) => s + d.commission, 0);
  const pipelineValue = deals.filter((d) => !d.status.startsWith("Closed")).reduce((s, d) => s + d.commission, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Your Deals · CRM v0.1</div>
            <h1>
              Your <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>pipeline.</em>
            </h1>
            <p className="deck">
              Track every prospect, every conversation, every close. Commission paid on what&apos;s logged here. Screenshot your Closed Won list at month-end to verify with Elijah.
            </p>
          </header>

          <div style={{ background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--color-warm-accent)", padding: "14px 18px", marginBottom: "32px", fontSize: "13px", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>v0.1 note</strong>
            <p style={{ margin: "6px 0 0" }}>
              This CRM stores your deals <strong>locally on this browser</strong>. Don&apos;t clear cookies/cache or you lose history. Next version (in development) syncs to a shared backend so Elijah sees your pipeline live.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{deals.length}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>Total deals</div>
            </div>
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-accent)" }}>${pipelineValue}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>Open pipeline ($)</div>
            </div>
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "#7aaa6a" }}>${totalCommission}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>Closed Won ($)</div>
            </div>
          </div>

          {/* Add button or form */}
          {!adding && (
            <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginBottom: "32px" }}>
              + New deal
            </button>
          )}

          {adding && (
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 16px" }}>New deal</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={inputLabel}>Prospect name *</label>
                  <input type="text" value={form.prospect} onChange={(e) => setForm({ ...form, prospect: e.target.value })} style={inputStyle} placeholder="e.g., Bob's Plumbing" />
                </div>
                <div>
                  <label style={inputLabel}>Contact (phone/email)</label>
                  <input type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} style={inputStyle} placeholder="bob@... or 770-555-..." />
                </div>
                <div>
                  <label style={inputLabel}>Service quoted</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={inputStyle}>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={inputLabel}>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Status })} style={inputStyle}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={inputLabel}>Expected commission ($)</label>
                  <input type="number" value={form.commission} onChange={(e) => setForm({ ...form, commission: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={inputLabel}>Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Last touched [date]. Said [X]. Next step [Y]." />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button onClick={addDeal} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add deal</button>
                <button onClick={() => setAdding(false)} className="pv-btn-ghost" style={{ cursor: "pointer", background: "transparent" }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Deals list */}
          {deals.length === 0 && !adding && (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>
              No deals yet. Click &quot;+ New deal&quot; to log your first prospect.
            </p>
          )}

          {deals.length > 0 && (
            <div>
              {deals.map((d) => (
                <div key={d.id} style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <strong style={{ color: "var(--color-warm-text)", fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px" }}>{d.prospect}</strong>
                        <span style={{ padding: "3px 10px", background: STATUS_COLORS[d.status] + "20", color: STATUS_COLORS[d.status], border: `1px solid ${STATUS_COLORS[d.status]}`, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>{d.status}</span>
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>{d.service} · {d.contact || "no contact"}</div>
                      {d.notes && <div style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.5, marginTop: "8px", fontStyle: "italic" }}>{d.notes}</div>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-accent)", fontWeight: 700 }}>${d.commission}</div>
                      <div style={{ fontSize: "10px", color: "var(--color-warm-text-light)", letterSpacing: "0.1em", marginTop: "2px" }}>{new Date(d.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                    <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value as Status)} style={{ ...inputStyle, padding: "6px 8px", fontSize: "12px" }}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => remove(d.id)} style={{ background: "transparent", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-light)", padding: "6px 12px", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  background: "var(--color-warm-bg)",
  color: "var(--color-warm-text)",
  border: "1px solid var(--color-warm-border)",
  borderRadius: 0,
  fontSize: "14px",
  fontFamily: "var(--font-inter), sans-serif",
};

const inputLabel: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--color-warm-accent)",
  marginBottom: "4px",
  fontFamily: "var(--font-dm-sans), sans-serif",
};
