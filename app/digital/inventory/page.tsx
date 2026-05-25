"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Item {
  id: string;
  sku: string;
  name: string;
  category: string;
  qty: number;
  reorderAt: number;
  unitCost: number;
  notes: string;
}

const KEY = "pv_inventory_v1";

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Item, "id">>({ sku: "", name: "", category: "", qty: 0, reorderAt: 5, unitCost: 0, notes: "" });
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
    const i: Item = { id: crypto.randomUUID(), ...form };
    save([i, ...items]);
    resetForm();
  }

  function update() {
    if (!editingId) return;
    save(items.map((i) => i.id === editingId ? { ...i, ...form } : i));
    resetForm();
  }

  function resetForm() {
    setAdding(false);
    setEditingId(null);
    setForm({ sku: "", name: "", category: "", qty: 0, reorderAt: 5, unitCost: 0, notes: "" });
  }

  function startEdit(item: Item) {
    setForm({ sku: item.sku, name: item.name, category: item.category, qty: item.qty, reorderAt: item.reorderAt, unitCost: item.unitCost, notes: item.notes });
    setEditingId(item.id);
    setAdding(true);
  }

  function adjustQty(id: string, delta: number) {
    save(items.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i));
  }

  function remove(id: string) {
    if (!confirm("Remove this item?")) return;
    save(items.filter((i) => i.id !== id));
  }

  const visible = items.filter((i) =>
    !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = items.filter((i) => i.qty <= i.reorderAt);
  const inventoryValue = items.reduce((s, i) => s + i.qty * i.unitCost, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 720px) {
          .inv-stats { grid-template-columns: 1fr !important; }
          .inv-form-row { grid-template-columns: 1fr 1fr !important; }
        }
      ` }} />
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>
        <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All tools</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Operations · Inventory</div>
          <h1>
            Inventory <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>tracker</em>
          </h1>
          <p className="deck">
            Product list with stock levels + low-stock alerts. Adjust quantities as you sell. Stays on this device.
          </p>
        </header>

        <div className="inv-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <Stat n={items.length} label="SKUs tracked" />
          <Stat n={lowStock.length} label="Low stock alerts" color={lowStock.length > 0 ? "#e54a28" : undefined} />
          <Stat n={`$${inventoryValue.toFixed(2)}`} label="Inventory value" />
        </div>

        {lowStock.length > 0 && (
          <div style={{ background: "rgba(229, 74, 40, 0.08)", border: "1px solid #e54a28", padding: "16px 20px", marginBottom: "24px" }}>
            <strong style={{ color: "#e54a28", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Reorder soon ({lowStock.length})</strong>
            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
              {lowStock.map((i) => `${i.name} (${i.qty})`).join(" · ")}
            </p>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, SKU, or category…" style={{ flex: 1, minWidth: "200px", padding: "10px 14px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "14px" }} />
          {!adding && (
            <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Item</button>
          )}
        </div>

        {adding && (
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 16px" }}>{editingId ? "Edit item" : "New item"}</h3>
            <div className="inv-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "12px" }}>
              <Input label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} placeholder="e.g., PB-100" />
              <Input label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Premium drill bits 1/4in" />
              <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} placeholder="e.g., Tools" />
              <Input label="Quantity" type="number" value={String(form.qty)} onChange={(v) => setForm({ ...form, qty: Number(v) })} />
              <Input label="Reorder at" type="number" value={String(form.reorderAt)} onChange={(v) => setForm({ ...form, reorderAt: Number(v) })} />
              <Input label="Unit cost $" type="number" value={String(form.unitCost)} onChange={(v) => setForm({ ...form, unitCost: Number(v) })} />
              <div style={{ gridColumn: "1 / -1" }}>
                <Input label="Notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="e.g., Supplier contact, batch number, etc." />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button onClick={editingId ? update : add} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>{editingId ? "Save" : "Add"}</button>
              <button onClick={resetForm} className="pv-btn-ghost" style={{ cursor: "pointer", background: "transparent" }}>Cancel</button>
            </div>
          </div>
        )}

        {visible.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>
            {items.length === 0 ? "No items yet. Add one to start tracking inventory." : "No items match that search."}
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={th}>SKU</th>
                <th style={th}>Name</th>
                <th style={th}>Category</th>
                <th style={{ ...th, textAlign: "right" }}>Qty</th>
                <th style={{ ...th, textAlign: "right" }}>Value</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((i) => {
                const low = i.qty <= i.reorderAt;
                return (
                  <tr key={i.id} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                    <td style={{ ...td, fontFamily: "var(--font-dm-sans), monospace", color: "var(--color-warm-text-muted)", fontSize: "12px" }}>{i.sku || "—"}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{i.name}</td>
                    <td style={{ ...td, color: "var(--color-warm-text-muted)", fontSize: "13px" }}>{i.category || "—"}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <button onClick={() => adjustQty(i.id, -1)} style={qtyBtn}>−</button>
                        <span style={{ minWidth: "32px", textAlign: "center", color: low ? "#e54a28" : "var(--color-warm-text)", fontWeight: 700 }}>{i.qty}</span>
                        <button onClick={() => adjustQty(i.id, 1)} style={qtyBtn}>+</button>
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: "right", color: "var(--color-warm-text-muted)" }}>${(i.qty * i.unitCost).toFixed(2)}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button onClick={() => startEdit(i)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-muted)", cursor: "pointer", padding: "4px 8px", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Edit</button>
                      <button onClick={() => remove(i.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "16px" }}>×</button>
                    </td>
                  </tr>
                );
              })}
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
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" }} />
    </div>
  );
}

const th: React.CSSProperties = { padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" };
const td: React.CSSProperties = { padding: "12px", color: "var(--color-warm-text)" };
const qtyBtn: React.CSSProperties = { width: "28px", height: "28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text)", cursor: "pointer", borderRadius: 0, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 700 };
