"use client";

import { useState, useEffect, useMemo } from "react";
import { PageHero, Figures } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { Field, ToolsKicker } from "../_demo/parts";

interface Expense {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  category: string;
  description: string;
  taxDeductible: boolean;
}

const CATEGORIES = ["Materials", "Tools", "Vehicle and fuel", "Subscriptions", "Marketing", "Office", "Meals", "Travel", "Insurance", "Other"];
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
  const monthTotal = filtered.reduce((sum, e) => sum + e.amount, 0);
  const monthDeductible = filtered.filter((e) => e.taxDeductible).reduce((sum, e) => sum + e.amount, 0);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((e) => map.set(e.category, (map.get(e.category) || 0) + e.amount));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  // The page has always promised a CSV at tax time. This writes the month on screen.
  function exportCsv() {
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = [
      ["Date", "Category", "Description", "Amount", "Tax deductible"].join(","),
      ...filtered.map((e) => [e.date, esc(e.category), esc(e.description), e.amount.toFixed(2), e.taxDeductible ? "Yes" : "No"].join(",")),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses-${monthFilter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main>
      <PageHero
        kicker={<ToolsKicker>Free tools: operations and finance</ToolsKicker>}
        title="Expense tracker"
        lede="Log expenses as they happen, filter by month and export a CSV at tax time. Everything stays on this device."
      />

      <div className={`ui-wrap ${s.body}`}>
        <div className={s.bar}>
          <label className="ui-field">
            <span className="ui-small ui-muted">Month</span>
            <input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
          </label>
          <div className={s.actions} style={{ marginTop: "auto" }}>
            {!adding && (
              <button type="button" onClick={() => setAdding(true)} className="ui-btn">Add an expense</button>
            )}
            <button type="button" onClick={exportCsv} disabled={filtered.length === 0} className={s.btn}>Export CSV</button>
          </div>
        </div>

        <div className={s.stats}>
          <Figures
            items={[
              [`$${monthTotal.toFixed(2)}`, "Month total"],
              [<span key="d" className={s.okText}>${monthDeductible.toFixed(2)}</span>, "Tax deductible"],
              [filtered.length, "Expenses this month"],
            ]}
          />
        </div>

        {byCategory.length > 0 && (
          <section style={{ marginBottom: 40, maxWidth: 640 }}>
            <h2 className={s.sub}>By category</h2>
            {byCategory.map(([cat, total]) => {
              const pct = monthTotal > 0 ? (total / monthTotal) * 100 : 0;
              return (
                <div key={cat} style={{ marginBottom: 14 }}>
                  <div className={s.spread}>
                    <span>{cat}</span>
                    <span className="ui-muted">${total.toFixed(2)} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className={s.track}><div className={s.fill} style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </section>
        )}

        {adding && (
          <div className={s.form}>
            <h3>New expense</h3>
            <div className={s.grid3}>
              <Field label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
              <Field label="Amount in dollars" type="number" value={String(form.amount)} onChange={(v) => setForm({ ...form, amount: Number(v) })} />
              <label className="ui-field">
                <span className="ui-small ui-muted">Category</span>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <Field className={s.full} label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="e.g., Home Depot, drill bits for Tuesday's job" />
              <label className={`${s.check} ${s.full}`}>
                <input type="checkbox" checked={form.taxDeductible} onChange={(e) => setForm({ ...form, taxDeductible: e.target.checked })} />
                Tax-deductible business expense
              </label>
            </div>
            <div className={s.actions}>
              <button type="button" onClick={add} className="ui-btn">Add</button>
              <button type="button" onClick={() => setAdding(false)} className="ui-btn ui-btn--ghost">Cancel</button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className={s.empty}>No expenses logged for {monthFilter}.</p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th className={s.num}>Amount</th>
                  <th><span className="sr-only">Remove</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{e.date}</td>
                    <td>
                      {e.category}
                      {e.taxDeductible && <span className={`ui-small ${s.okText}`} style={{ display: "block" }}>Tax deductible</span>}
                    </td>
                    <td className="ui-muted">{e.description || "None"}</td>
                    <td className={s.num} style={{ fontWeight: 600 }}>${e.amount.toFixed(2)}</td>
                    <td className={s.num}>
                      <button type="button" onClick={() => remove(e.id)} className={`${s.btn} ${s.btnDanger}`}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
