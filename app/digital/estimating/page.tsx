"use client";

import { useState, useEffect } from "react";
import { PageHero } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import s from "../_demo/demo.module.css";
import { Field, ToolsKicker } from "../_demo/parts";

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
    <main>
      {!editing && (
        <>
          <PageHero
            kicker={<ToolsKicker>Free tools: operations and finance</ToolsKicker>}
            title="Online estimating"
            lede="Build job quotes from line items for labor and materials, then print them or save them as a PDF to send. Estimates save only on your device."
          />

          <div className={`ui-wrap ${s.body} no-print`}>
            <div className={s.bar}>
              <button type="button" onClick={newEstimate} className="ui-btn">Start an estimate</button>
            </div>

            {estimates.length === 0 ? (
              <p className={s.empty}>No estimates yet.</p>
            ) : (
              <div className={s.list}>
                {estimates.map((e) => {
                  const totals = calcTotals(e);
                  return (
                    <article key={e.id} className={s.item}>
                      <div className={s.spread}>
                        <div>
                          <h3 className={s.itemName}>{e.estimateNumber} <span className="ui-small ui-gold" style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}>{e.status}</span></h3>
                          <p className={s.itemMeta}>{e.clientName || "No client"}, {e.jobName || "no job name"}, {e.date}</p>
                        </div>
                        <div className={s.actions} style={{ marginTop: 0 }}>
                          <span className={s.itemFig}>${totals.total.toFixed(2)}</span>
                          <button type="button" onClick={() => setEditing(e)} className={s.btn}>Open</button>
                          <button type="button" onClick={() => deleteEstimate(e.id)} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {editing && (
        <div className={`ui-wrap ${s.body} print-only-page`} style={{ paddingTop: 40 }}>
          <div className={`${s.bar} no-print`} style={{ justifyContent: "space-between" }}>
            <button type="button" onClick={() => setEditing(null)} className={s.btn}>Cancel</button>
            <div className={s.actions} style={{ marginTop: 0 }}>
              <label className="ui-field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <span className="ui-small ui-muted">Status</span>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Estimate["status"] })} style={{ minHeight: 44 }}>
                  <option>Draft</option><option>Sent</option><option>Accepted</option><option>Declined</option>
                </select>
              </label>
              <button type="button" onClick={printEstimate} className={s.btn}>Print or save as PDF</button>
              <button type="button" onClick={saveEstimate} className="ui-btn">Save</button>
            </div>
          </div>

          <header className={s.spread} style={{ borderBottom: "2px solid var(--gold)", paddingBottom: 20, marginBottom: 28 }}>
            <div>
              <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", margin: 0 }}>Estimate</h1>
              <p className="ui-gold" style={{ margin: "4px 0 0" }}>{editing.estimateNumber}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18 }}>Purcell Ventures LLC</p>
              <p className="ui-small ui-muted" style={{ margin: "4px 0 0" }}>{CONTACT.llcCity}, Cobb County, {CONTACT.llcRegion}</p>
              <p className="ui-small ui-muted" style={{ margin: 0 }}>{CONTACT.phone}, {CONTACT.email}</p>
            </div>
          </header>

          <div className={s.grid2} style={{ marginBottom: 32, gap: 28 }}>
            <div className={s.grid}>
              <h2 className={s.sub} style={{ margin: 0 }}>Bill to</h2>
              <Field label="Client name" value={editing.clientName} onChange={(v) => setEditing({ ...editing, clientName: v })} placeholder="e.g., Jane Doe" />
              <Field label="Contact" value={editing.clientContact} onChange={(v) => setEditing({ ...editing, clientContact: v })} placeholder="Email or phone" />
              <Field label="Address" value={editing.clientAddress} onChange={(v) => setEditing({ ...editing, clientAddress: v })} placeholder="Street, city, state" />
            </div>
            <div className={s.grid}>
              <h2 className={s.sub} style={{ margin: 0 }}>Job</h2>
              <Field label="Job name" value={editing.jobName} onChange={(v) => setEditing({ ...editing, jobName: v })} placeholder="e.g., Water heater install" />
              <Field label="Job location" value={editing.jobLocation} onChange={(v) => setEditing({ ...editing, jobLocation: v })} placeholder="If different from the client address" />
              <div className={s.grid2}>
                <Field label="Date" type="date" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} />
                <Field label="Valid until" type="date" value={editing.validUntil} onChange={(v) => setEditing({ ...editing, validUntil: v })} />
              </div>
            </div>
          </div>

          <h2 className={s.sub}>Line items</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className={s.num} style={{ width: 90 }}>Qty</th>
                  <th className={s.num} style={{ width: 120 }}>Rate</th>
                  <th className={s.num} style={{ width: 120 }}>Amount</th>
                  <th className="no-print" style={{ width: 100 }}><span className="sr-only">Remove</span></th>
                </tr>
              </thead>
              <tbody>
                {editing.lineItems.map((li) => {
                  const amount = li.qty * li.rate;
                  return (
                    <tr key={li.id}>
                      <td>
                        <input type="text" className="ui-input" value={li.description} onChange={(e) => updateLineItem(li.id, { description: e.target.value })} placeholder="e.g., Labor, install" aria-label="Description" />
                      </td>
                      <td>
                        <input type="number" className="ui-input" value={li.qty} onChange={(e) => updateLineItem(li.id, { qty: Number(e.target.value) })} style={{ textAlign: "right" }} aria-label="Quantity" />
                      </td>
                      <td>
                        <input type="number" className="ui-input" value={li.rate} onChange={(e) => updateLineItem(li.id, { rate: Number(e.target.value) })} style={{ textAlign: "right" }} aria-label="Rate" />
                      </td>
                      <td className={s.num} style={{ fontWeight: 600 }}>${amount.toFixed(2)}</td>
                      <td className="no-print">
                        <button type="button" onClick={() => removeLineItem(li.id)} className={`${s.btn} ${s.btnDanger}`}>Remove</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={`${s.actions} no-print`}>
            <button type="button" onClick={addLineItem} className={s.btn}>Add a line</button>
          </div>

          {(() => {
            const t = calcTotals(editing);
            return (
              <div style={{ marginTop: 28, marginLeft: "auto", width: "100%", maxWidth: 340 }}>
                <div className={s.spread} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="ui-muted">Subtotal</span>
                  <span>${t.subtotal.toFixed(2)}</span>
                </div>
                <div className={s.spread} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="ui-muted">Tax</span>
                    <input type="number" className="ui-input" value={editing.taxRate} onChange={(e) => setEditing({ ...editing, taxRate: Number(e.target.value) })} style={{ width: 76, padding: "8px 10px", textAlign: "right" }} aria-label="Tax rate in percent" />
                    <span className="ui-muted">%</span>
                  </label>
                  <span>${t.tax.toFixed(2)}</span>
                </div>
                <div className={s.spread} style={{ padding: "14px 0", borderTop: "2px solid var(--gold)", marginTop: 4 }}>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>Total</strong>
                  <strong className={s.itemFig}>${t.total.toFixed(2)}</strong>
                </div>
              </div>
            );
          })()}

          <div style={{ marginTop: 32 }}>
            <label className="ui-field">
              <span className={s.sub} style={{ margin: "0 0 6px", color: "var(--fg)", fontFamily: "var(--font-display)", fontWeight: 600 }}>Notes, scope and exclusions</span>
              <textarea
                value={editing.notes}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                placeholder="Optional: scope notes, exclusions, payment terms and warranty details"
                rows={5}
              />
            </label>
          </div>

          <p className="ui-small ui-muted" style={{ marginTop: 32 }}>
            This estimate is valid through {editing.validUntil}. Final pricing may change after an on-site assessment.
          </p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only-page { background: white !important; color: black !important; padding: 20px !important; }
          .print-only-page * { color: black !important; }
          .print-only-page input, .print-only-page textarea { border-color: gray !important; background: white !important; }
        }
      ` }} />
    </main>
  );
}
