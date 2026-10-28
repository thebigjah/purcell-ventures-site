"use client";

import { useMemo, useState } from "react";

export type Row = {
  name: string; what: string; category: string; pass1: string; blind: string; final: string;
  tier: string; resume: string; vision: string; last: string; commits: string; tests: string; url: string;
};

const TIER: Record<string, string> = { featured: "Featured", listed: "Listed", "index line": "Index", off: "Off" };
const GRADE_ORDER = ["Shipped", "Working", "In progress", "Started", "n/a", ""];
const TIER_ORDER = ["featured", "listed", "index line", "off"];

export default function ProgressTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [grade, setGrade] = useState("all");
  const cats = useMemo(() => Array.from(new Set(rows.map((r) => r.category))).sort(), [rows]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows
      .filter((r) => cat === "all" || r.category === cat)
      .filter((r) => grade === "all" || r.final === grade)
      .filter((r) => !needle || (r.name + " " + r.what).toLowerCase().includes(needle))
      .sort((a, b) =>
        TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) ||
        GRADE_ORDER.indexOf(a.final) - GRADE_ORDER.indexOf(b.final) ||
        a.name.localeCompare(b.name));
  }, [rows, q, cat, grade]);

  return (
    <section className="pt">
      <style dangerouslySetInnerHTML={{ __html: PT_CSS }} />
      <div className="pt-bar">
        <label>
          <span>Search</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or description" />
        </label>
        <label>
          <span>Category</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">All</option>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span>Final grade</span>
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="all">All</option>
            {GRADE_ORDER.slice(0, 4).map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
        <p className="pt-count">{shown.length} of {rows.length}</p>
      </div>
      <div className="pt-scroll">
        <table>
          <thead>
            <tr>
              <th>Project</th><th>Category</th><th>First grade</th><th>Blind grade</th><th>Final</th>
              <th>Portfolio</th><th>Résumé</th><th>Commits</th><th>Tests</th><th>Last activity</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.name + r.category}>
                <td className="pt-name">
                  {r.url && r.url.startsWith("http") ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a> : <b>{r.name}</b>}
                  {r.what && <span>{r.what}</span>}
                </td>
                <td>{r.category}</td>
                <td>{r.pass1}</td>
                <td>{r.blind || "Not graded"}</td>
                <td><b>{r.final}</b></td>
                <td>{TIER[r.tier] ?? r.tier}</td>
                <td>{r.resume === "include" ? "Yes" : "No"}</td>
                <td className="pt-num">{r.commits}</td>
                <td className="pt-num">{r.tests}</td>
                <td className="pt-num">{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const PT_CSS = `
.pt-bar { display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: end; margin-bottom: 16px; }
.pt-bar label { display: grid; gap: 4px; font-size: 14px; color: var(--muted); }
.pt-bar input, .pt-bar select { font: inherit; color: var(--fg); background: var(--surface); border: 1px solid var(--line); padding: 8px 10px; min-height: 40px; min-width: 0; }
.pt-bar input { width: min(320px, 80vw); }
.pt-count { margin: 0 0 10px auto; color: var(--muted); font-size: 14px; }
.pt-scroll { overflow-x: auto; border-top: 1px solid var(--line); }
.pt table { border-collapse: collapse; width: 100%; min-width: 1100px; font-size: 14px; }
.pt th { text-align: left; font-weight: 600; color: var(--muted); padding: 10px 12px 10px 0; border-bottom: 1px solid var(--line); white-space: nowrap; }
.pt td { padding: 10px 12px 10px 0; border-bottom: 1px solid var(--line-soft); vertical-align: top; }
.pt-name { min-width: 280px; max-width: 420px; }
.pt-name a, .pt-name b { display: block; font-weight: 600; color: var(--fg); }
.pt-name a { color: var(--gold-text); text-underline-offset: 3px; }
.pt-name span { display: block; color: var(--muted); line-height: 1.45; margin-top: 2px; }
.pt-num { font-variant-numeric: tabular-nums; white-space: nowrap; }
`;
