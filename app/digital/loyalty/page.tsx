"use client";

import { useState, useEffect } from "react";
import { PageHero, Figures } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { Field, ToolsKicker } from "../_demo/parts";

interface Customer {
  id: string;
  name: string;
  phone: string;
  punches: number;
  cap: number;
  redeemedCount: number;
  createdAt: string;
}

const KEY = "pv_loyalty_v1";

export default function LoyaltyPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", cap: 10 });
  const [defaultCap, setDefaultCap] = useState(10);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setCustomers(JSON.parse(raw));
  }, []);

  function save(updated: Customer[]) {
    setCustomers(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function add() {
    if (!form.name.trim()) return;
    const c: Customer = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      punches: 0,
      cap: form.cap || defaultCap,
      redeemedCount: 0,
      createdAt: new Date().toISOString(),
    };
    save([c, ...customers]);
    setAdding(false);
    setForm({ name: "", phone: "", cap: defaultCap });
  }

  function punch(id: string) {
    save(customers.map((c) => c.id === id ? { ...c, punches: Math.min(c.punches + 1, c.cap) } : c));
  }

  function redeem(id: string) {
    if (!confirm("Redeem this card? The punches reset to 0.")) return;
    save(customers.map((c) => c.id === id ? { ...c, punches: 0, redeemedCount: c.redeemedCount + 1 } : c));
  }

  function remove(id: string) {
    if (!confirm("Remove this customer?")) return;
    save(customers.filter((c) => c.id !== id));
  }

  const totalRedeemed = customers.reduce((sum, c) => sum + c.redeemedCount, 0);
  const totalPunches = customers.reduce((sum, c) => sum + c.punches + c.redeemedCount * c.cap, 0);

  return (
    <main>
      <PageHero
        kicker={<ToolsKicker>Free tools: customer management</ToolsKicker>}
        title="Loyalty punch card"
        lede="A digital punch card for repeat customers. Add a punch at each visit, and when a card is full the customer redeems the reward. Everything stays on this device."
      />

      <div className={`ui-wrap ${s.body}`}>
        <div className={s.stats}>
          <Figures items={[[customers.length, "Customers"], [totalPunches, "Total punches"], [totalRedeemed, "Rewards redeemed"]]} />
        </div>

        <div className={s.bar}>
          {!adding && (
            <button type="button" onClick={() => { setForm({ name: "", phone: "", cap: defaultCap }); setAdding(true); }} className="ui-btn">
              Add a customer
            </button>
          )}
          <label className="ui-field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <span className="ui-small ui-muted">Punches per card</span>
            <input type="number" value={defaultCap} onChange={(e) => setDefaultCap(Number(e.target.value) || 10)} style={{ width: 84 }} />
          </label>
        </div>

        {adding && (
          <div className={s.form}>
            <h3>New customer</h3>
            <div className={s.grid3}>
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Jane Doe" />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(770) 555-0100" />
              <Field label="Punches to a reward" type="number" value={String(form.cap)} onChange={(v) => setForm({ ...form, cap: Number(v) || defaultCap })} />
            </div>
            <div className={s.actions}>
              <button type="button" onClick={add} className="ui-btn">Add</button>
              <button type="button" onClick={() => setAdding(false)} className="ui-btn ui-btn--ghost">Cancel</button>
            </div>
          </div>
        )}

        {customers.length === 0 ? (
          <p className={s.empty}>No customers yet. Add one to start tracking punches.</p>
        ) : (
          <div className={s.list}>
            {customers.map((c) => {
              const filled = c.punches;
              const empty = c.cap - c.punches;
              const ready = filled >= c.cap;
              return (
                <article key={c.id} className={s.item}>
                  <div className={s.spread}>
                    <div>
                      <h3 className={s.itemName}>{c.name}</h3>
                      <p className={s.itemMeta}>
                        {c.phone || "No phone"}. {c.redeemedCount} {c.redeemedCount === 1 ? "reward" : "rewards"} redeemed.
                      </p>
                    </div>
                    <div className={s.actions} style={{ marginTop: 0 }}>
                      <button type="button" onClick={() => punch(c.id)} disabled={ready} className={s.btn}>Add a punch</button>
                      {ready && <button type="button" onClick={() => redeem(c.id)} className="ui-btn">Redeem</button>}
                      <button type="button" onClick={() => remove(c.id)} className={`${s.btn} ${s.btnDanger}`} aria-label={`Remove ${c.name}`}>Remove</button>
                    </div>
                  </div>
                  <div className={s.punches} aria-label={`${c.punches} of ${c.cap} punches`}>
                    {[...Array(filled)].map((_, i) => <span key={`f${i}`} className={`${s.punch} ${s.punchOn}`} />)}
                    {[...Array(Math.max(0, empty))].map((_, i) => <span key={`e${i}`} className={s.punch} />)}
                  </div>
                  <p className={`ui-small ${ready ? s.ready : "ui-muted"}`} style={{ margin: "8px 0 0" }}>
                    {ready ? "Card full. Ready to redeem." : `${c.punches} of ${c.cap}`}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
