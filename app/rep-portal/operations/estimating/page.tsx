"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface Estimate {
  id: string;
  estimateNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientAddress: string;
  jobTitle: string;
  jobDescription: string;
  lineItems: LineItem[];
  taxRate: number;
  notes: string;
  exclusions: string;
  status: "Draft" | "Sent" | "Approved" | "Rejected" | "Expired";
  createdAt: string;
}

const KEY = "pv_ops_estimates_v1";

export default function PVEstimatingPage() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [editing, setEditing] = useState<Estimate | null>(null);
  const [view, setView] = useState<"list" | "edit" | "print">("list");

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setEstimates(JSON.parse(raw));
  }, []);

  function save(updated: Estimate[]) {
    setEstimates(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function newEstimate() {
    const num = `PV-${String(estimates.length + 1).padStart(4, "0")}-${new Date().getFullYear()}`;
    const e: Estimate = {
      id: crypto.randomUUID(),
      estimateNumber: num,
      date: new Date().toISOString().slice(0, 10),
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      clientName: "",
      clientCompany: "",
      clientEmail: "",
      clientAddress: "",
      jobTitle: "",
      jobDescription: "",
      lineItems: [{ id: crypto.randomUUID(), description: "", qty: 1, unitPrice: 0 }],
      taxRate: 0,
      notes: "",
      exclusions: "",
      status: "Draft",
      createdAt: new Date().toISOString(),
    };
    setEditing(e);
    setView("edit");
  }

  function saveEstimate() {
    if (!editing) return;
    const exists = estimates.find((e) => e.id === editing.id);
    if (exists) {
      save(estimates.map((e) => e.id === editing.id ? editing : e));
    } else {
      save([editing, ...estimates]);
    }
    setView("list");
    setEditing(null);
  }

  function deleteEstimate(id: string) {
    if (!confirm("Delete this estimate?")) return;
    save(estimates.filter((e) => e.id !== id));
  }

  function addLine() {
    if (!editing) return;
    setEditing({ ...editing, lineItems: [...editing.lineItems, { id: crypto.randomUUID(), description: "", qty: 1, unitPrice: 0 }] });
  }

  function updateLine(id: string, field: keyof LineItem, value: string | number) {
    if (!editing) return;
    setEditing({ ...editing, lineItems: editing.lineItems.map((l) => l.id === id ? { ...l, [field]: value } : l) });
  }

  function removeLine(id: string) {
    if (!editing) return;
    setEditing({ ...editing, lineItems: editing.lineItems.filter((l) => l.id !== id) });
  }

  const subtotal = useMemo(() => editing?.lineItems.reduce((s, l) => s + l.qty * l.unitPrice, 0) || 0, [editing]);
  const tax = useMemo(() => editing ? subtotal * (editing.taxRate / 100) : 0, [editing, subtotal]);
  const total = subtotal + tax;

  if (view === "edit" && editing) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>
            <button onClick={() => { setView("list"); setEditing(null); }} style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}>← Back to estimates</button>

            <header className="pv-page-head" style={{ marginTop: "16px" }}>
              <div className="pv-mono-label">Editing estimate · {editing.estimateNumber}</div>
              <h1>Estimate <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>builder</em></h1>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <Input label="Estimate #" value={editing.estimateNumber} onChange={(v) => setEditing({ ...editing, estimateNumber: v })} />
              <Input label="Date" type="date" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} />
              <Input label="Valid until" type="date" value={editing.validUntil} onChange={(v) => setEditing({ ...editing, validUntil: v })} />
            </div>

            <h3 style={sectionHead}>Client</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <Input label="Client name" value={editing.clientName} onChange={(v) => setEditing({ ...editing, clientName: v })} />
              <Input label="Company (optional)" value={editing.clientCompany} onChange={(v) => setEditing({ ...editing, clientCompany: v })} />
              <Input label="Email" type="email" value={editing.clientEmail} onChange={(v) => setEditing({ ...editing, clientEmail: v })} />
              <Input label="Address (optional)" value={editing.clientAddress} onChange={(v) => setEditing({ ...editing, clientAddress: v })} />
            </div>

            <h3 style={sectionHead}>Job</h3>
            <div style={{ marginBottom: "16px" }}>
              <Input label="Job title" value={editing.jobTitle} onChange={(v) => setEditing({ ...editing, jobTitle: v })} placeholder="e.g., Digital Growth setup + 6 months management" />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={inputLabel}>Job description</label>
              <textarea value={editing.jobDescription} onChange={(e) => setEditing({ ...editing, jobDescription: e.target.value })} style={{ ...fieldStyle, minHeight: "80px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }} placeholder="Scope summary, what we're building / delivering" />
            </div>

            <h3 style={sectionHead}>Line items</h3>
            <div style={{ marginBottom: "16px" }}>
              {editing.lineItems.map((l) => (
                <div key={l.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 100px 40px", gap: "8px", marginBottom: "8px", alignItems: "end" }}>
                  <Input label="Description" value={l.description} onChange={(v) => updateLine(l.id, "description", v)} />
                  <Input label="Qty" type="number" value={String(l.qty)} onChange={(v) => updateLine(l.id, "qty", Number(v) || 0)} />
                  <Input label="Unit $" type="number" value={String(l.unitPrice)} onChange={(v) => updateLine(l.id, "unitPrice", Number(v) || 0)} />
                  <div style={{ padding: "10px 12px", color: "var(--color-warm-accent)", fontWeight: 700, textAlign: "right", fontSize: "14px" }}>${(l.qty * l.unitPrice).toFixed(2)}</div>
                  <button onClick={() => removeLine(l.id)} style={{ padding: "10px", background: "transparent", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-light)", cursor: "pointer" }}>×</button>
                </div>
              ))}
              <button onClick={addLine} style={ghostBtn}>+ Add line</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "16px", marginBottom: "24px", padding: "16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
              <Input label="Tax rate (%)" type="number" value={String(editing.taxRate)} onChange={(v) => setEditing({ ...editing, taxRate: Number(v) || 0 })} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>Subtotal: <strong style={{ color: "var(--color-warm-text)" }}>${subtotal.toFixed(2)}</strong></div>
                <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>Tax: <strong style={{ color: "var(--color-warm-text)" }}>${tax.toFixed(2)}</strong></div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-accent)", fontWeight: 700, marginTop: "4px" }}>${total.toFixed(2)}</div>
              </div>
            </div>

            <h3 style={sectionHead}>Notes + Exclusions</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={inputLabel}>Notes (will appear on estimate)</label>
              <textarea value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} style={{ ...fieldStyle, minHeight: "60px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }} placeholder="e.g., 50% deposit due to start; payment terms net 14" />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={inputLabel}>Exclusions (NOT included, protects against scope creep)</label>
              <textarea value={editing.exclusions} onChange={(e) => setEditing({ ...editing, exclusions: e.target.value })} style={{ ...fieldStyle, minHeight: "60px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }} placeholder="e.g., Third-party software costs not included; custom integrations billed separately" />
            </div>

            <Select label="Status" value={editing.status} options={["Draft", "Sent", "Approved", "Rejected", "Expired"]} onChange={(v) => setEditing({ ...editing, status: v as Estimate["status"] })} />

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button onClick={saveEstimate} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save estimate</button>
              <button onClick={() => { setView("print"); }} style={ghostBtn}>Print preview</button>
              <button onClick={() => { setView("list"); setEditing(null); }} style={ghostBtn}>Cancel</button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "print" && editing) {
    return (
      <div style={{ minHeight: "100vh", background: "white", padding: "40px" }}>
        <style dangerouslySetInnerHTML={{ __html: `@media print { .no-print { display: none; } }` }} />
        <div className="no-print" style={{ marginBottom: "20px" }}>
          <button onClick={() => window.print()} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginRight: "8px" }}>Print / Save as PDF</button>
          <button onClick={() => setView("edit")} style={{ ...ghostBtn, color: "black", borderColor: "black" }}>← Back to edit</button>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto", color: "black", fontFamily: "var(--font-inter), sans-serif" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "20px", marginBottom: "20px" }}>
            <div>
              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", margin: 0, color: "black" }}>ESTIMATE</h1>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>{editing.estimateNumber}</div>
            </div>
            <div style={{ textAlign: "right", fontSize: "13px" }}>
              <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px" }}>Purcell Ventures LLC</strong>
              <div>Acworth, GA · Cobb County</div>
              <div>(205) 462-7839</div>
              <div>elijah@purcell-ventures.com</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px", fontSize: "13px" }}>
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>For</div>
              <div><strong>{editing.clientName}</strong></div>
              {editing.clientCompany && <div>{editing.clientCompany}</div>}
              {editing.clientAddress && <div>{editing.clientAddress}</div>}
              {editing.clientEmail && <div>{editing.clientEmail}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>Dates</div>
              <div>Issued: <strong>{editing.date}</strong></div>
              <div>Valid until: <strong>{editing.validUntil}</strong></div>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", marginBottom: "4px" }}>{editing.jobTitle}</h2>
          {editing.jobDescription && <p style={{ fontSize: "13px", marginBottom: "20px", color: "#444", lineHeight: 1.5 }}>{editing.jobDescription}</p>}

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid black" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
                <th style={{ textAlign: "right", padding: "8px", width: "60px" }}>Qty</th>
                <th style={{ textAlign: "right", padding: "8px", width: "100px" }}>Unit Price</th>
                <th style={{ textAlign: "right", padding: "8px", width: "100px" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {editing.lineItems.map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px" }}>{l.description}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>{l.qty}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>${l.unitPrice.toFixed(2)}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>${(l.qty * l.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={3} style={{ padding: "8px", textAlign: "right" }}>Subtotal</td><td style={{ textAlign: "right", padding: "8px" }}>${subtotal.toFixed(2)}</td></tr>
              {editing.taxRate > 0 && <tr><td colSpan={3} style={{ padding: "8px", textAlign: "right" }}>Tax ({editing.taxRate}%)</td><td style={{ textAlign: "right", padding: "8px" }}>${tax.toFixed(2)}</td></tr>}
              <tr style={{ borderTop: "2px solid black" }}><td colSpan={3} style={{ padding: "8px", textAlign: "right", fontWeight: 700, fontSize: "16px" }}>TOTAL</td><td style={{ textAlign: "right", padding: "8px", fontWeight: 700, fontSize: "16px" }}>${total.toFixed(2)}</td></tr>
            </tfoot>
          </table>

          {editing.notes && <div style={{ marginBottom: "16px" }}><strong>Notes:</strong><p style={{ fontSize: "12px", color: "#444" }}>{editing.notes}</p></div>}
          {editing.exclusions && <div style={{ marginBottom: "16px" }}><strong>NOT included (out of scope):</strong><p style={{ fontSize: "12px", color: "#444" }}>{editing.exclusions}</p></div>}

          <div style={{ marginTop: "40px", fontSize: "11px", color: "#888", textAlign: "center" }}>
            Thank you for the opportunity. Reply to elijah@purcell-ventures.com to approve or ask questions.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>
          <Link href="/rep-portal/operations" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All operations</Link>

          <header className="pv-page-head" style={{ marginTop: "16px" }}>
            <div className="pv-mono-label">PV Operations · Estimates</div>
            <h1>PV <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>estimates</em></h1>
            <p className="deck">Build professional estimates for PV clients. Line items, tax calc, exclusions section (protects against scope creep). Print to PDF, send to client.</p>
          </header>

          <button onClick={newEstimate} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginBottom: "24px" }}>+ New estimate</button>

          {estimates.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>No estimates yet. Click + New estimate to build your first one.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                  <th style={th}>Number</th>
                  <th style={th}>Date</th>
                  <th style={th}>Client</th>
                  <th style={th}>Job</th>
                  <th style={{ ...th, textAlign: "right" }}>Total</th>
                  <th style={th}>Status</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((e) => {
                  const t = e.lineItems.reduce((s, l) => s + l.qty * l.unitPrice, 0) * (1 + e.taxRate / 100);
                  const statusColor = e.status === "Approved" ? "#7aaa6a" : e.status === "Sent" ? "var(--color-warm-accent)" : e.status === "Rejected" ? "#e54a28" : "var(--color-warm-text-muted)";
                  return (
                    <tr key={e.id} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                      <td style={{ ...td, fontFamily: "var(--font-dm-sans), monospace", color: "var(--color-warm-accent)" }}>{e.estimateNumber}</td>
                      <td style={td}>{e.date}</td>
                      <td style={td}>{e.clientName}{e.clientCompany && <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)" }}>{e.clientCompany}</div>}</td>
                      <td style={td}>{e.jobTitle}</td>
                      <td style={{ ...td, textAlign: "right", fontWeight: 700, color: "var(--color-warm-accent)" }}>${t.toFixed(2)}</td>
                      <td style={{ ...td, color: statusColor, fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.status}</td>
                      <td style={{ ...td, textAlign: "right" }}>
                        <button onClick={() => { setEditing(e); setView("edit"); }} style={smallBtn}>Edit</button>
                        <button onClick={() => deleteEstimate(e.id)} style={{ ...smallBtn, color: "var(--color-warm-text-light)" }}>×</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

        </main>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) { return <div><label style={inputLabel}>{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} /></div>; }
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) { return <div><label style={inputLabel}>{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>; }
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700, marginTop: "24px" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "top" };
const smallBtn: React.CSSProperties = { padding: "4px 10px", background: "transparent", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", cursor: "pointer", fontSize: "11px", marginLeft: "4px", borderRadius: 0 };
