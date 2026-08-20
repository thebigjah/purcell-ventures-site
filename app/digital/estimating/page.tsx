"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

interface Estimate {
  id: string;
  estimateNumber: string;
  clientName: string;
  clientContact: string;
  clientAddress: string;
  jobName: string;
  jobLocation: string;
  date: string;
  validUntil: string;
  lineItems: LineItem[];
  taxRate: number; // percentage
  notes: string;
  status: "Draft" | "Sent" | "Accepted" | "Declined";
  createdAt: string;
}

const KEY = "pv_estimates_v1";

function emptyEstimate(): Estimate {
  const today = new Date().toISOString().slice(0, 10);
  const valid = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return {
    id: crypto.randomUUID(),
    estimateNumber: `EST-${Date.now().toString().slice(-6)}`,
    clientName: "",
    clientContact: "",
    clientAddress: "",
    jobName: "",
    jobLocation: "",
    date: today,
    validUntil: valid,
    lineItems: [{ id: crypto.randomUUID(), description: "", qty: 1, rate: 0 }],
    taxRate: 0,
    notes: "",
    status: "Draft",
    createdAt: new Date().toISOString(),
  };
}

export default function EstimatingPage() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [editing, setEditing] = useState<Estimate | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setEstimates(JSON.parse(raw));
  }, []);

  function save(updated: Estimate[]) {
    setEstimates(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function newEstimate() {
    setEditing(emptyEstimate());
  }

  function saveEstimate() {
    if (!editing) return;
    const exists = estimates.find((e) => e.id === editing.id);
    if (exists) {
      save(estimates.map((e) => e.id === editing.id ? editing : e));
    } else {
      save([editing, ...estimates]);
    }
    setEditing(null);
  }

  function deleteEstimate(id: string) {
    if (!confirm("Delete this estimate?")) return;
    save(estimates.filter((e) => e.id !== id));
  }

  function addLineItem() {
    if (!editing) return;
    setEditing({ ...editing, lineItems: [...editing.lineItems, { id: crypto.randomUUID(), description: "", qty: 1, rate: 0 }] });
  }

  function updateLineItem(id: string, patch: Partial<LineItem>) {
    if (!editing) return;
    setEditing({
      ...editing,
      lineItems: editing.lineItems.map((li) => li.id === id ? { ...li, ...patch } : li),
    });
  }

  function removeLineItem(id: string) {
    if (!editing) return;
    setEditing({ ...editing, lineItems: editing.lineItems.filter((li) => li.id !== id) });
  }

  function calcTotals(est: Estimate) {
    const subtotal = est.lineItems.reduce((s, li) => s + li.qty * li.rate, 0);
    const tax = subtotal * (est.taxRate / 100);
    return { subtotal, tax, total: subtotal + tax };
  }

  function printEstimate() {
    window.print();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .pv-phi-field, .no-print { display: none !important; }
          .print-only-page { background: white !important; color: black !important; padding: 20px !important; }
          .print-only-page h1, .print-only-page h2, .print-only-page h3 { color: black !important; }
          .print-only-page * { color: black !important; }
        }
      ` }} />
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>
        <div className="no-print">
          <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All tools</Link>
        </div>

        {!editing && (
          <>
            <header className="pv-page-head no-print">
              <div className="pv-mono-label">Operations · Estimating</div>
              <h1>
                Online <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>estimating</em>
              </h1>
              <p className="deck">
                Build job quotes with line items, labor, materials. Print or save as PDF to send. Stays on this device.
              </p>
            </header>

            <div className="no-print" style={{ marginBottom: "24px" }}>
              <button onClick={newEstimate} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ New estimate</button>
            </div>

            {estimates.length === 0 ? (
              <p className="no-print" style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No estimates yet.</p>
            ) : (
              <div className="no-print" style={{ display: "grid", gap: "12px" }}>
                {estimates.map((e) => {
                  const totals = calcTotals(e);
                  return (
                    <div key={e.id} style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", gap: "12px", alignItems: "baseline", flexWrap: "wrap" }}>
                          <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", color: "var(--color-warm-text)" }}>{e.estimateNumber}</strong>
                          <span style={{ fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>{e.status}</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>
                          {e.clientName || "No client"} · {e.jobName || "No job"} · {e.date}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-accent)" }}>${totals.total.toFixed(2)}</div>
                        <button onClick={() => setEditing(e)} style={btn("ghost")}>Open</button>
                        <button onClick={() => deleteEstimate(e.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "16px" }}>×</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {editing && (
          <div className="print-only-page">
            <div className="no-print" style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <button onClick={() => setEditing(null)} style={btn("ghost")}>← Cancel</button>
              <div style={{ display: "flex", gap: "8px" }}>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Estimate["status"] })} style={selectStyle}>
                  <option>Draft</option><option>Sent</option><option>Accepted</option><option>Declined</option>
                </select>
                <button onClick={printEstimate} style={btn("ghost")}>Print / Save PDF</button>
                <button onClick={saveEstimate} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save</button>
              </div>
            </div>

            <header style={{ borderBottom: "2px solid var(--color-warm-accent)", paddingBottom: "20px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0 }}>ESTIMATE</h1>
                  <div style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "14px", color: "var(--color-warm-accent)", marginTop: "4px" }}>{editing.estimateNumber}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-text)" }}>Purcell Ventures LLC</div>
                  <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>Acworth, GA · Cobb County</div>
                  <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>(205) 462-7839 · elijah@purcell-ventures.com</div>
                </div>
              </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <h3 style={sectionHead}>Bill to</h3>
                <Input label="Client name" value={editing.clientName} onChange={(v) => setEditing({ ...editing, clientName: v })} placeholder="e.g., Jane Doe" />
                <Input label="Contact" value={editing.clientContact} onChange={(v) => setEditing({ ...editing, clientContact: v })} placeholder="email or phone" />
                <Input label="Address" value={editing.clientAddress} onChange={(v) => setEditing({ ...editing, clientAddress: v })} placeholder="street, city, state" />
              </div>
              <div>
                <h3 style={sectionHead}>Job</h3>
                <Input label="Job name" value={editing.jobName} onChange={(v) => setEditing({ ...editing, jobName: v })} placeholder="e.g., Water heater install" />
                <Input label="Job location" value={editing.jobLocation} onChange={(v) => setEditing({ ...editing, jobLocation: v })} placeholder="if different from client address" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <Input label="Date" type="date" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} />
                  <Input label="Valid until" type="date" value={editing.validUntil} onChange={(v) => setEditing({ ...editing, validUntil: v })} />
                </div>
              </div>
            </div>

            <h3 style={sectionHead}>Line items</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                  <th style={th}>Description</th>
                  <th style={{ ...th, width: "80px", textAlign: "right" }}>Qty</th>
                  <th style={{ ...th, width: "100px", textAlign: "right" }}>Rate</th>
                  <th style={{ ...th, width: "120px", textAlign: "right" }}>Amount</th>
                  <th style={{ ...th, width: "40px" }}></th>
                </tr>
              </thead>
              <tbody>
                {editing.lineItems.map((li) => {
                  const amount = li.qty * li.rate;
                  return (
                    <tr key={li.id} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                      <td style={{ padding: "8px" }}>
                        <input type="text" value={li.description} onChange={(e) => updateLineItem(li.id, { description: e.target.value })} placeholder="e.g., Labor — install" style={{ ...inputStyle, padding: "6px 8px" }} />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input type="number" value={li.qty} onChange={(e) => updateLineItem(li.id, { qty: Number(e.target.value) })} style={{ ...inputStyle, padding: "6px 8px", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input type="number" value={li.rate} onChange={(e) => updateLineItem(li.id, { rate: Number(e.target.value) })} style={{ ...inputStyle, padding: "6px 8px", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "8px", textAlign: "right", color: "var(--color-warm-text)", fontWeight: 600 }}>${amount.toFixed(2)}</td>
                      <td className="no-print" style={{ padding: "8px", textAlign: "center" }}>
                        <button onClick={() => removeLineItem(li.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", fontSize: "16px" }}>×</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={addLineItem} className="no-print" style={btn("ghost")}>+ Add line</button>

            {(() => {
              const t = calcTotals(editing);
              return (
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: "300px" }}>
                    <Row label="Subtotal" value={`$${t.subtotal.toFixed(2)}`} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--color-warm-border)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "var(--color-warm-text-muted)", fontSize: "14px" }}>Tax</span>
                        <input type="number" value={editing.taxRate} onChange={(e) => setEditing({ ...editing, taxRate: Number(e.target.value) })} style={{ ...inputStyle, padding: "4px 6px", width: "50px", fontSize: "12px", textAlign: "right" }} />
                        <span style={{ color: "var(--color-warm-text-muted)", fontSize: "13px" }}>%</span>
                      </div>
                      <span style={{ color: "var(--color-warm-text)" }}>${t.tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "2px solid var(--color-warm-accent)", marginTop: "4px" }}>
                      <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)" }}>Total</strong>
                      <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)" }}>${t.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div style={{ marginTop: "32px" }}>
              <h3 style={sectionHead}>Notes / scope / exclusions</h3>
              <textarea
                value={editing.notes}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                placeholder="Optional: include scope notes, exclusions, payment terms, warranty info"
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              />
            </div>

            <p style={{ marginTop: "32px", fontSize: "11px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
              This estimate is valid through {editing.validUntil}. Final pricing may vary based on on-site assessment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "2px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--color-warm-border)" }}>
      <span style={{ color: "var(--color-warm-text-muted)", fontSize: "14px" }}>{label}</span>
      <span style={{ color: "var(--color-warm-text)" }}>{value}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 10px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const selectStyle: React.CSSProperties = { padding: "6px 10px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "12px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", margin: "0 0 12px", fontWeight: 700 };
const th: React.CSSProperties = { padding: "10px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-accent)" };

function btn(kind: "primary" | "ghost"): React.CSSProperties {
  return {
    padding: "8px 14px",
    border: kind === "primary" ? "none" : "1px solid var(--color-warm-border)",
    background: "transparent",
    color: "var(--color-warm-text-muted)",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontFamily: "var(--font-dm-sans), sans-serif",
    cursor: "pointer",
    fontWeight: 700,
    borderRadius: 0,
  };
}
