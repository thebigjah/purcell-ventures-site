"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";

interface Item {
  id: string;
  sku: string;
  name: string;
  category: string;
  qty: number;
  reorderAt: number;
  unitCost: number;
  supplier: string;
  notes: string;
  updatedAt: string;
}

const CATEGORIES = ["Software License", "Hardware", "Marketing Materials", "Business Cards / Print", "Office Supplies", "Stock for Mantle", "Other"];
const KEY = "pv_ops_inventory_v1";

export default function PVInventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Item, "id" | "updatedAt">>({ sku: "", name: "", category: CATEGORIES[0], qty: 0, reorderAt: 5, unitCost: 0, supplier: "", notes: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  function save(updated: Item[]) {
    setItems(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function add() {
    if (!form.name.trim()) return;
    const it: Item = { id: crypto.randomUUID(), ...form, sku: form.sku.trim() || form.name.trim().toUpperCase().replace(/\s+/g, "-").slice(0, 12), updatedAt: new Date().toISOString() };
    save([it, ...items]);
    setAdding(false);
    setForm({ sku: "", name: "", category: CATEGORIES[0], qty: 0, reorderAt: 5, unitCost: 0, supplier: "", notes: "" });
  }

  function adjust(id: string, delta: number) {
    save(items.map((it) => it.id === id ? { ...it, qty: Math.max(0, it.qty + delta), updatedAt: new Date().toISOString() } : it));
  }

  function remove(id: string) {
    if (!confirm("Remove this item?")) return;
    save(items.filter((x) => x.id !== id));
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((it) => it.sku.toLowerCase().includes(q) || it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q) || it.supplier.toLowerCase().includes(q));
  }, [items, search]);

  const lowStock = items.filter((it) => it.qty <= it.reorderAt);
  const totalValue = items.reduce((s, it) => s + it.qty * it.unitCost, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>
          <Link href="/rep-portal/operations" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All operations</Link>

          <header className="pv-page-head" style={{ marginTop: "16px" }}>
            <div className="pv-mono-label">PV Operations · Inventory</div>
            <h1>PV <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>inventory</em></h1>
            <p className="deck">Track PV&apos;s materials, supplies, and stock. Low-stock alerts. Categories tuned for software/services + Mantle field work.</p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            <Stat n={items.length} label="SKUs tracked" />
            <Stat n={lowStock.length} label="Low stock" color={lowStock.length > 0 ? "#e54a28" : "var(--color-warm-text-muted)"} />
            <Stat n={`$${totalValue.toFixed(2)}`} label="Total value" />
          </div>

          {lowStock.length > 0 && (
            <div style={{ marginBottom: "24px", padding: "12px 16px", background: "rgba(229, 74, 40, 0.06)", border: "1px solid #e54a28", fontSize: "13px", color: "var(--color-warm-text)" }}>
              <strong style={{ color: "#e54a28" }}>Reorder these:</strong> {lowStock.map((it) => `${it.name} (${it.qty})`).join(", ")}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
            {!adding && <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Add item</button>}
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SKU / name / category…" style={{ flex: 1, padding: "8px 12px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "14px" }} />
          </div>

          {adding && (
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <Input label="SKU (auto if blank)" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} placeholder="e.g., LOGO-001" />
                <Input label="Item name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Premium business cards (250-pack)" />
                <Select label="Category" value={form.category} options={CATEGORIES} onChange={(v) => setForm({ ...form, category: v })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", gap: "12px", marginBottom: "12px" }}>
                <Input label="Qty on hand" type="number" value={String(form.qty)} onChange={(v) => setForm({ ...form, qty: Number(v) || 0 })} />
                <Input label="Reorder at" type="number" value={String(form.reorderAt)} onChange={(v) => setForm({ ...form, reorderAt: Number(v) || 0 })} />
                <Input label="Unit cost ($)" type="number" value={String(form.unitCost)} onChange={(v) => setForm({ ...form, unitCost: Number(v) || 0 })} />
                <Input label="Supplier" value={form.supplier} onChange={(v) => setForm({ ...form, supplier: v })} placeholder="e.g., VistaPrint" />
              </div>
              <Input label="Notes (optional)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="e.g., 30 day delivery; use for new clients" />
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button onClick={add} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add</button>
                <button onClick={() => setAdding(false)} style={ghostBtn}>Cancel</button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No inventory items {search && "match search"}.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "880px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                    <th style={th}>SKU</th>
                    <th style={th}>Name</th>
                    <th style={th}>Category</th>
                    <th style={{ ...th, textAlign: "center" }}>Qty</th>
                    <th style={{ ...th, textAlign: "center" }}>Reorder at</th>
                    <th style={{ ...th, textAlign: "right" }}>Unit cost</th>
                    <th style={th}>Supplier</th>
                    <th style={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it) => {
                    const low = it.qty <= it.reorderAt;
                    return (
                      <tr key={it.id} style={{ borderBottom: "1px solid var(--color-warm-border)", background: low ? "rgba(229, 74, 40, 0.04)" : undefined }}>
                        <td style={{ ...td, fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", color: "var(--color-warm-accent)" }}>{it.sku}</td>
                        <td style={td}>{it.name}{it.notes && <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", marginTop: "2px" }}>{it.notes}</div>}</td>
                        <td style={{ ...td, fontSize: "12px" }}>{it.category}</td>
                        <td style={{ ...td, textAlign: "center", color: low ? "#e54a28" : "var(--color-warm-text)", fontWeight: 700, fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px" }}>{it.qty}</td>
                        <td style={{ ...td, textAlign: "center", color: "var(--color-warm-text-muted)" }}>{it.reorderAt}</td>
                        <td style={{ ...td, textAlign: "right" }}>${it.unitCost.toFixed(2)}</td>
                        <td style={{ ...td, fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{it.supplier || "—"}</td>
                        <td style={{ ...td, textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                            <button onClick={() => adjust(it.id, -1)} style={smallBtn}>−</button>
                            <button onClick={() => adjust(it.id, 1)} style={smallBtn}>+</button>
                            <button onClick={() => remove(it.id)} style={{ ...smallBtn, color: "var(--color-warm-text-light)" }}>×</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
function Stat({ n, label, color }: { n: string | number; label: string; color?: string }) { return <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}><div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 700, color: color || "var(--color-warm-accent)" }}>{n}</div><div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div></div>; }
function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) { return <div><label style={inputLabel}>{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} /></div>; }
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) { return <div><label style={inputLabel}>{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>; }
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "top" };
const smallBtn: React.CSSProperties = { padding: "4px 8px", background: "transparent", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", cursor: "pointer", fontSize: "13px", borderRadius: 0 };
