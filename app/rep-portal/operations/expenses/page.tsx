"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";

interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  taxDeductible: boolean;
  paidBy: string;
}

const CATEGORIES = ["Materials", "Software / Subscriptions", "Anthropic API", "Vercel / Hosting", "Marketing / Ads", "Office", "Meals (client)", "Travel", "Insurance", "Legal / Accounting", "Mileage", "Other"];
const PAID_BY = ["Elijah personal", "PV business card", "PV bank ACH", "Other"];
const KEY = "pv_ops_expenses_v1";

export default function PVExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: 0, category: CATEGORIES[0], description: "", taxDeductible: true, paidBy: PAID_BY[0] });
  const [monthFilter, setMonthFilter] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setExpenses(JSON.parse(raw));
  }, []);

  function save(updated: Expense[]) {
    setExpenses(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function add() {
    if (!form.amount || form.amount <= 0) return;
    const e: Expense = {
      id: crypto.randomUUID(),
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      description: form.description.trim(),
      taxDeductible: form.taxDeductible,
      paidBy: form.paidBy,
    };
    save([e, ...expenses]);
    setAdding(false);
    setForm({ date: new Date().toISOString().slice(0, 10), amount: 0, category: CATEGORIES[0], description: "", taxDeductible: true, paidBy: PAID_BY[0] });
  }

  function remove(id: string) {
    if (!confirm("Remove this expense?")) return;
    save(expenses.filter((x) => x.id !== id));
  }

  function exportCSV() {
    const headers = ["date", "amount", "category", "description", "taxDeductible", "paidBy"];
    const rows = expenses.map((e) => [e.date, e.amount, e.category, `"${e.description.replace(/"/g, '""')}"`, e.taxDeductible, e.paidBy].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pv-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => expenses.filter((e) => e.date.startsWith(monthFilter)), [expenses, monthFilter]);
  const monthTotal = filtered.reduce((s, e) => s + e.amount, 0);
  const monthDeductible = filtered.filter((e) => e.taxDeductible).reduce((s, e) => s + e.amount, 0);
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((e) => map.set(e.category, (map.get(e.category) || 0) + e.amount));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <Link href="/rep-portal/operations" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All operations</Link>

          <header className="pv-page-head" style={{ marginTop: "16px" }}>
            <div className="pv-mono-label">PV Operations · Expenses</div>
            <h1>PV business <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>expenses</em></h1>
            <p className="deck">Track PV&apos;s actual operating expenses. Categories tuned for a software/services biz. Tax-deductible flag for end-of-year. Export CSV for your accountant.</p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            <Stat n={`$${monthTotal.toFixed(2)}`} label={`Total · ${monthFilter}`} />
            <Stat n={`$${monthDeductible.toFixed(2)}`} label="Tax-deductible" color="#7aaa6a" />
            <Stat n={filtered.length} label="Entries this month" />
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
            {!adding && <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Log expense</button>}
            <button onClick={exportCSV} style={ghostBtn}>Export CSV</button>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginLeft: "auto" }}>
              <label style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>Month</label>
              <input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} style={{ padding: "8px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif" }} />
            </div>
          </div>

          {adding && (
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <Input label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
                <Input label="Amount ($)" type="number" value={String(form.amount)} onChange={(v) => setForm({ ...form, amount: Number(v) || 0 })} />
                <Select label="Category" value={form.category} options={CATEGORIES} onChange={(v) => setForm({ ...form, category: v })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="e.g., Claude API May, ConvertKit subscription" />
                <Select label="Paid by" value={form.paidBy} options={PAID_BY} onChange={(v) => setForm({ ...form, paidBy: v })} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px", color: "var(--color-warm-text)" }}>
                <input type="checkbox" checked={form.taxDeductible} onChange={(e) => setForm({ ...form, taxDeductible: e.target.checked })} style={{ accentColor: "var(--color-warm-accent)" }} />
                Tax-deductible business expense
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={add} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add</button>
                <button onClick={() => setAdding(false)} style={ghostBtn}>Cancel</button>
              </div>
            </div>
          )}

          {byCategory.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700 }}>By category</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {byCategory.map(([cat, amt]) => (
                  <div key={cat} style={{ padding: "8px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text)" }}>
                    <strong style={{ color: "var(--color-warm-accent)" }}>${amt.toFixed(2)}</strong> · {cat}
                  </div>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No expenses logged for {monthFilter}.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "720px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                    <th style={th}>Date</th>
                    <th style={th}>Category</th>
                    <th style={th}>Description</th>
                    <th style={th}>Paid by</th>
                    <th style={{ ...th, textAlign: "right" }}>Amount</th>
                    <th style={{ ...th, textAlign: "center" }}>Tax-D</th>
                    <th style={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                      <td style={td}>{e.date}</td>
                      <td style={td}>{e.category}</td>
                      <td style={td}>{e.description || "—"}</td>
                      <td style={{ ...td, fontSize: "11px", color: "var(--color-warm-text-muted)" }}>{e.paidBy}</td>
                      <td style={{ ...td, textAlign: "right", fontWeight: 700, color: "var(--color-warm-accent)" }}>${e.amount.toFixed(2)}</td>
                      <td style={{ ...td, textAlign: "center" }}>{e.taxDeductible ? "✓" : "—"}</td>
                      <td style={{ ...td, textAlign: "right" }}><button onClick={() => remove(e.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer" }}>×</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function Stat({ n, label, color }: { n: string | number; label: string; color?: string }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: color || "var(--color-warm-accent)" }}>{n}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}
function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={inputLabel}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} />
    </div>
  );
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={inputLabel}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "top" };
