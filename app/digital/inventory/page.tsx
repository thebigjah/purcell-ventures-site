"use client";

import { useState, useEffect } from "react";
import { PageHero, Figures, Note } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { Field, ToolsKicker } from "../_demo/parts";

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
  const inventoryValue = items.reduce((sum, i) => sum + i.qty * i.unitCost, 0);

  return (
    <main>
      <PageHero
        kicker={<ToolsKicker>Free tools: operations and finance</ToolsKicker>}
        title="Inventory tracker"
        lede="A product list with stock levels and low-stock alerts. Adjust quantities as you sell. Everything stays on this device."
      />

      <div className={`ui-wrap ${s.body}`}>
        <div className={s.stats}>
          <Figures
            items={[
              [items.length, "Items tracked"],
              [<span key="l" className={lowStock.length > 0 ? s.dangerText : undefined}>{lowStock.length}</span>, "Low-stock alerts"],
              [`$${inventoryValue.toFixed(2)}`, "Inventory value"],
            ]}
          />
        </div>

        {lowStock.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <Note tone="warn">
              <strong>Reorder soon ({lowStock.length}):</strong> {lowStock.map((i) => `${i.name} (${i.qty})`).join(", ")}
            </Note>
          </div>
        )}

        <div className={s.bar}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, SKU or category" aria-label="Search inventory" className={`ui-input ${s.grow}`} />
          {!adding && (
            <button type="button" onClick={() => setAdding(true)} className="ui-btn">Add an item</button>
          )}
        </div>

        {adding && (
          <div className={s.form}>
            <h3>{editingId ? "Edit item" : "New item"}</h3>
            <div className={s.grid3}>
              <Field label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} placeholder="e.g., PB-100" />
              <Field label="Name (required)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Premium drill bits, 1/4 in" />
              <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} placeholder="e.g., Tools" />
              <Field label="Quantity" type="number" value={String(form.qty)} onChange={(v) => setForm({ ...form, qty: Number(v) })} />
              <Field label="Reorder at" type="number" value={String(form.reorderAt)} onChange={(v) => setForm({ ...form, reorderAt: Number(v) })} />
              <Field label="Unit cost in dollars" type="number" value={String(form.unitCost)} onChange={(v) => setForm({ ...form, unitCost: Number(v) })} />
              <Field className={s.full} label="Notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="e.g., supplier contact or batch number" />
            </div>
            <div className={s.actions}>
              <button type="button" onClick={editingId ? update : add} className="ui-btn">{editingId ? "Save" : "Add"}</button>
              <button type="button" onClick={resetForm} className="ui-btn ui-btn--ghost">Cancel</button>
            </div>
          </div>
        )}

        {visible.length === 0 ? (
          <p className={s.empty}>
            {items.length === 0 ? "No items yet. Add one to start tracking inventory." : "No items match that search."}
          </p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table} style={{ minWidth: 680 }}>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className={s.num}>Quantity</th>
                  <th className={s.num}>Value</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((i) => {
                  const low = i.qty <= i.reorderAt;
                  return (
                    <tr key={i.id}>
                      <td className="ui-muted ui-small">{i.sku || "None"}</td>
                      <td style={{ fontWeight: 600 }}>{i.name}</td>
                      <td className="ui-muted">{i.category || "None"}</td>
                      <td className={s.num}>
                        <span className={s.qty}>
                          <button type="button" onClick={() => adjustQty(i.id, -1)} className={s.btn} aria-label={`One fewer ${i.name}`}>-</button>
                          <span className={`${s.qtyN} ${low ? s.dangerText : ""}`}>{i.qty}</span>
                          <button type="button" onClick={() => adjustQty(i.id, 1)} className={s.btn} aria-label={`One more ${i.name}`}>+</button>
                        </span>
                      </td>
                      <td className={`${s.num} ui-muted`}>${(i.qty * i.unitCost).toFixed(2)}</td>
                      <td className={s.num}>
                        <span className={s.actions} style={{ marginTop: 0, justifyContent: "flex-end", flexWrap: "nowrap" }}>
                          <button type="button" onClick={() => startEdit(i)} className={s.btn}>Edit</button>
                          <button type="button" onClick={() => remove(i.id)} className={`${s.btn} ${s.btnDanger}`}>Remove</button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
