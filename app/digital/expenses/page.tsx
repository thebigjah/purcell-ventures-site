"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Expense {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  category: string;
  description: string;
  taxDeductible: boolean;
}

const CATEGORIES = ["Materials", "Tools", "Vehicle / Fuel", "Subscriptions", "Marketing", "Office", "Meals", "Travel", "Insurance", "Other"];
const KEY = "pv_expenses_v1";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: 0, category: CATEGORIES[0], description: "", taxDeductible: true });
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
    };
    save([e, ...expenses]);
    setAdding(false);
    setForm({ date: new Date().toISOString().slice(0, 10), amount: 0, category: CATEGORIES[0], description: "", taxDeductible: true });
  }

  function remove(id: string) {
    if (!confirm("Remove this expense?")) return;
    save(expenses.filter((x) => x.id !== id));
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
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 720px) {
          .expense-stats { grid-template-columns: 1fr !important; }
          .expense-form-row { grid-template-columns: 1fr !important; }
          .expense-table { font-size: 12px !important; }
          .expense-table td, .expense-table th { padding: 8px !important; }
        }
      ` }} />
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>
        <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All tools</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Operations · Expense Tracker</div>
          <h1>
            Expense <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>tracker</em>
          </h1>
          <p className="deck">
            Log expenses as they happen. Filter by month. Tax season is one CSV away. Stays on this device.
          </p>
        </header>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
          <input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} style={{ padding: "10px 14px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif" }} />
          {!adding && (
            <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Expense</button>
          )}
        </div>

        <div className="expense-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <Stat n={`$${monthTotal.toFixed(2)}`} label="Month total" />
          <Stat n={`$${monthDeductible.toFixed(2)}`} label="Tax-deductible" color="#7aaa6a" />
          <Stat n={filtered.length} label="Expense count" />
        </div>

        {byCategory.length > 0 && (
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px", marginBottom: "32px" }}>
            <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>Breakdown by category</h4>
            {byCategory.map(([cat, total]) => {
              const pct = monthTotal > 0 ? (total / monthTotal) * 100 : 0;
              return (
                <div key={cat} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ color: "var(--color-warm-text)" }}>{cat}</span>
                    <span style={{ color: "var(--color-warm-text-muted)" }}>${total.toFixed(2)} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", background: "var(--color-warm-bg)", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "var(--color-warm-accent)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {adding && (
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <Input label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
              <Input label="Amount $" type="number" value={String(form.amount)} onChange={(v) => setForm({ ...form, amount: Number(v) })} />
              <div>
                <label style={inputLabel}>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="e.g., Home Depot — drill bits for Tuesday's job" />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--color-warm-text)" }}>
                <input type="checkbox" checked={form.taxDeductible} onChange={(e) => setForm({ ...form, taxDeductible: e.target.checked })} />
                Tax-deductible business expense
              </label>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button onClick={add} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add</button>
              <button onClick={() => setAdding(false)} className="pv-btn-ghost" style={{ cursor: "pointer", background: "transparent" }}>Cancel</button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No expenses for {monthFilter}.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={th}>Date</th>
                <th style={th}>Category</th>
                <th style={th}>Description</th>
                <th style={{ ...th, textAlign: "right" }}>Amount</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={td}>{e.date}</td>
                  <td style={td}>{e.category} {e.taxDeductible && <span style={{ color: "#7aaa6a", fontSize: "10px", marginLeft: "4px" }}>•TAX</span>}</td>
                  <td style={{ ...td, color: "var(--color-warm-text-muted)", fontSize: "13px" }}>{e.description || "—"}</td>
                  <td style={{ ...td, textAlign: "right", fontWeight: 600, color: "var(--color-warm-text)" }}>${e.amount.toFixed(2)}</td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button onClick={() => remove(e.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "16px" }}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

function Stat({ n, label, color }: { n: string | number; label: string; color?: string }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: color || "var(--color-warm-accent)" }}>{n}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={inputLabel}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const th: React.CSSProperties = { padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" };
const td: React.CSSProperties = { padding: "12px", color: "var(--color-warm-text)" };
