"use client";
// Invoicing, purcellventures.co/invoicing
// Private tool, create, manage, and track invoices. localStorage.

import { useState, useEffect } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";

interface LineItem { description: string; qty: number; rate: number; }
interface Invoice {
  id: string; number: string; client: string; clientEmail: string; clientPhone: string;
  division: string; items: LineItem[]; notes: string;
  issueDate: string; dueDate: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  createdAt: string;
}

const DIVISIONS = ["Purcell Ventures Digital Services", "Purcell Ventures Consulting", "Purcell Ventures Custom Software", "Mantle Field Services"];
const STATUS_COLORS: Record<string, string> = { Draft: "var(--subtle)", Sent: "var(--gold-text)", Paid: "var(--ok)", Overdue: "var(--danger)" };

function total(items: LineItem[]) { return items.reduce((s, i) => s + i.qty * i.rate, 0); }
function fmt(iso: string) { try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch { return iso; } }
function inv$(n: number) { return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function nextNumber(invoices: Invoice[]) {
  const year = new Date().getFullYear();
  const count = invoices.filter(i => i.number.startsWith(`PV-${year}`)).length + 1;
  return `PV-${year}-${String(count).padStart(3, "0")}`;
}

const BLANK_ITEM: LineItem = { description: "", qty: 1, rate: 0 };


const CSS = `
.tool { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); }
.tool__bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px var(--gutter); border-bottom: 1px solid var(--line); }
.tool__brand { display: inline-flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; font: 600 17px/1 var(--font-display); min-height: 44px; }
.tool__bar a.tool__home { color: var(--muted); font-size: 14px; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
.tool__bar a.tool__home:hover { color: var(--gold-text); }
.tool__main { max-width: 1000px; margin: 0 auto; padding: 40px var(--gutter) 80px; }
.tool h1 { font: 600 clamp(28px, 5vw, 40px)/1.1 var(--font-display); margin: 0 0 8px; }
.tool h2 { font: 600 24px/1.2 var(--font-display); margin: 0; }
.tool__sub { color: var(--muted); margin: 0; }
.inv-top { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; }
.inv-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 28px; }
.inv-stat { padding: 20px 0; }
.inv-stat + .inv-stat { padding-left: 20px; border-left: 1px solid var(--line); }
.inv-stat b { display: block; font: 600 28px/1 var(--font-display); }
.inv-stat span { display: block; color: var(--muted); font-size: 14px; margin-top: 4px; }
.inv-empty { padding: 40px 0; color: var(--muted); }
.inv-scroll { overflow-x: auto; }
.inv-table { width: 100%; border-collapse: collapse; min-width: 640px; }
.inv-table th { text-align: left; padding: 10px 12px 10px 0; color: var(--muted); font-weight: 500; font-size: 14px; border-bottom: 1px solid var(--line); }
.inv-table td { padding: 14px 12px 14px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
.inv-table tbody tr { cursor: pointer; }
.inv-table tbody tr:hover td { background: var(--surface); }
.inv-status { font-weight: 700; font-size: 14px; }
.inv-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 18px; background: transparent; border: 1px solid var(--line); color: var(--fg-2); font: 600 15px/1 var(--font-body); cursor: pointer; text-decoration: none; }
.inv-btn:hover { border-color: var(--gold); color: var(--gold-text); }
.inv-btn--del:hover { border-color: var(--danger); color: var(--danger); }
.inv-btn--go { background: var(--gold); border-color: var(--gold); color: #0c0a08; }
.inv-btn--go:hover { background: var(--gold-hover); border-color: var(--gold-hover); color: #0c0a08; }
.inv-btn:disabled { opacity: .5; cursor: not-allowed; }
.inv-nav { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.inv-nav h2 { flex: 1 1 auto; }
.inv-acts { display: flex; flex-wrap: wrap; gap: 8px; }
.inv-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 24px; margin-bottom: 28px; }
.inv-f label, .inv-lab { display: block; font-size: 14px; color: var(--muted); font-weight: 500; margin-bottom: 6px; }
.inv-in { width: 100%; box-sizing: border-box; background: var(--surface); color: var(--fg); border: 1px solid #3a332a; padding: 12px 14px; font: 400 16px/1.4 var(--font-body); border-radius: 0; }
.inv-in:focus { outline: none; border-color: var(--gold); }
.inv-lines { border-top: 1px solid var(--line); margin-bottom: 28px; }
.inv-line { display: grid; grid-template-columns: minmax(0, 1fr) 80px 110px 44px; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--line); align-items: center; }
.inv-line--head { color: var(--muted); font-size: 14px; padding: 8px 0; }
.inv-x { min-height: 44px; background: none; border: 0; color: var(--danger); cursor: pointer; font: 600 15px/1 var(--font-body); }
.inv-x:disabled { opacity: .4; cursor: not-allowed; }
.inv-foot { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
.inv-add { background: none; border: 0; color: var(--gold-text); cursor: pointer; font: 600 15px/1 var(--font-body); min-height: 44px; padding: 0; }
.inv-sum { font: 600 22px/1 var(--font-display); }
.inv-doc { border: 1px solid var(--line); background: var(--surface); padding: 36px 40px; }
.inv-doc__top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 32px; }
.inv-doc__top .r { text-align: right; }
.inv-doc__name { font: 600 22px/1.1 var(--font-display); color: var(--gold-text); margin-bottom: 6px; }
.inv-doc__num { font: 600 24px/1.1 var(--font-display); }
.inv-doc p { margin: 0; color: var(--muted); font-size: 15px; }
.inv-bill { margin-bottom: 28px; }
.inv-bill b { display: block; color: var(--fg); font-size: 17px; }
.inv-dline { display: grid; grid-template-columns: minmax(0, 1fr) 70px 100px 110px; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
.inv-dline--head { color: var(--muted); font-size: 14px; }
.inv-total { display: flex; justify-content: flex-end; align-items: baseline; gap: 24px; padding: 16px 0; }
.inv-total b { font: 600 26px/1 var(--font-display); color: var(--gold-text); }
.inv-notes { margin-top: 12px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 15px; line-height: 1.6; }
@media (max-width: 860px) {
  .inv-grid { grid-template-columns: minmax(0, 1fr); }
  .inv-doc { padding: 24px 18px; }
  .inv-doc__top .r { text-align: left; }
  .inv-stat + .inv-stat { padding-left: 12px; }
  .inv-stat b { font-size: 22px; }
  .inv-line { grid-template-columns: minmax(0, 1fr) 64px 84px 44px; }
  .inv-dline { grid-template-columns: minmax(0, 1fr) 44px 78px 90px; font-size: 14px; }
}
`;

export default function InvoicingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [selected, setSelected] = useState<Invoice | null>(null);

  // Create form state
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [items, setItems] = useState<LineItem[]>([{ ...BLANK_ITEM }]);
  const [notes, setNotes] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    setInvoices(JSON.parse(localStorage.getItem("pv_invoices") || "[]"));
  }, []);

  const saveInvoices = (updated: Invoice[]) => {
    setInvoices(updated);
    localStorage.setItem("pv_invoices", JSON.stringify(updated));
  };

  const createInvoice = () => {
    const inv: Invoice = {
      id: Date.now().toString(),
      number: nextNumber(invoices),
      client, clientEmail, clientPhone, division,
      items: items.filter(i => i.description.trim()),
      notes, issueDate, dueDate,
      status: "Draft",
      createdAt: new Date().toISOString(),
    };
    saveInvoices([inv, ...invoices]);
    setSelected(inv);
    setView("detail");
    // Reset form
    setClient(""); setClientEmail(""); setClientPhone(""); setNotes("");
    setItems([{ ...BLANK_ITEM }]);
    setIssueDate(new Date().toISOString().split("T")[0]);
    const d = new Date(); d.setDate(d.getDate() + 14);
    setDueDate(d.toISOString().split("T")[0]);
  };

  const updateStatus = (id: string, status: Invoice["status"]) => {
    const updated = invoices.map(i => i.id === id ? { ...i, status } : i);
    saveInvoices(updated);
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const deleteInvoice = (id: string) => {
    saveInvoices(invoices.filter(i => i.id !== id));
    setView("list");
    setSelected(null);
  };

  const setItem = (idx: number, patch: Partial<LineItem>) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, ...patch } : item));
  };

  const totals = invoices.reduce((a, inv) => {
    if (inv.status === "Paid") a.paid += total(inv.items);
    else if (inv.status !== "Draft") a.outstanding += total(inv.items);
    return a;
  }, { paid: 0, outstanding: 0 });

  return (
    <div className="tool">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="tool__bar">
        <Link href="/" className="tool__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="" width={32} height={32} />
          Purcell Ventures
        </Link>
        <Link href="/" className="tool__home">Home</Link>
      </div>
      <main className="tool__main">
        <div className="inv-top">
          <div>
            <h1>Invoicing</h1>
            <p className="tool__sub">Create and track invoices. Stored in this browser.</p>
          </div>
          {view !== "create" && <button onClick={() => setView("create")} className="inv-btn inv-btn--go">New invoice</button>}
        </div>

        {view === "list" && (
          <>
            <div className="inv-stats">
              {[
                { label: "Total invoices", value: invoices.length.toString() },
                { label: "Outstanding", value: inv$(totals.outstanding) },
                { label: "Paid", value: inv$(totals.paid) },
              ].map(item => (
                <div key={item.label} className="inv-stat"><b>{item.value}</b><span>{item.label}</span></div>
              ))}
            </div>

            {invoices.length === 0 ? (
              <p className="inv-empty">No invoices yet. Select New invoice to create the first one.</p>
            ) : (
              <div className="inv-scroll">
                <table className="inv-table">
                  <thead>
                    <tr>{["Invoice number", "Client", "Division", "Amount", "Due", "Status"].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id} onClick={() => { setSelected(inv); setView("detail"); }}>
                        <td className="ui-gold">{inv.number}</td>
                        <td>{inv.client}</td>
                        <td className="ui-muted">{inv.division}</td>
                        <td>{inv$(total(inv.items))}</td>
                        <td className="ui-muted" style={{ whiteSpace: "nowrap" }}>{fmt(inv.dueDate)}</td>
                        <td><span className="inv-status" style={{ color: STATUS_COLORS[inv.status] }}>{inv.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {view === "create" && (
          <div>
            <div className="inv-nav">
              <button onClick={() => setView("list")} className="inv-btn">Back</button>
              <h2>New invoice</h2>
            </div>

            <div className="inv-grid">
              <div className="inv-f"><label>Client name (required)</label><input className="inv-in" placeholder="Business or person name" value={client} onChange={e => setClient(e.target.value)} /></div>
              <div className="inv-f"><label>Division</label><select className="inv-in" value={division} onChange={e => setDivision(e.target.value)}>{DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              <div className="inv-f"><label>Client email</label><input className="inv-in" placeholder="email@example.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} /></div>
              <div className="inv-f"><label>Client phone</label><input className="inv-in" placeholder="(xxx) xxx-xxxx" value={clientPhone} onChange={e => setClientPhone(e.target.value)} /></div>
              <div className="inv-f"><label>Issue date</label><input type="date" className="inv-in" value={issueDate} onChange={e => setIssueDate(e.target.value)} /></div>
              <div className="inv-f"><label>Due date</label><input type="date" className="inv-in" value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
            </div>

            <div className="inv-lab">Line items</div>
            <div className="inv-lines">
              <div className="inv-line inv-line--head"><span>Description</span><span>Qty</span><span>Rate</span><span /></div>
              {items.map((item, idx) => (
                <div key={idx} className="inv-line">
                  <input className="inv-in" aria-label="Description" placeholder="Service description" value={item.description} onChange={e => setItem(idx, { description: e.target.value })} />
                  <input className="inv-in" aria-label="Quantity" type="number" min="1" value={item.qty} onChange={e => setItem(idx, { qty: parseFloat(e.target.value) || 1 })} />
                  <input className="inv-in" aria-label="Rate" type="number" min="0" step="0.01" placeholder="0.00" value={item.rate || ""} onChange={e => setItem(idx, { rate: parseFloat(e.target.value) || 0 })} />
                  <button className="inv-x" aria-label="Remove item" onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))} disabled={items.length === 1}>Remove</button>
                </div>
              ))}
              <div className="inv-foot">
                <button className="inv-add" onClick={() => setItems(p => [...p, { ...BLANK_ITEM }])}>Add item</button>
                <div className="inv-sum">{inv$(total(items))}</div>
              </div>
            </div>

            <div className="inv-f" style={{ marginBottom: 28 }}>
              <label>Notes and terms</label>
              <textarea className="inv-in" style={{ resize: "vertical", minHeight: 80 }} placeholder="Payment terms, a thank-you note" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            <button className="inv-btn inv-btn--go" onClick={createInvoice} disabled={!client.trim() || items.every(i => !i.description.trim())}>Create invoice</button>
          </div>
        )}

        {view === "detail" && selected && (
          <div>
            <div className="inv-nav">
              <button onClick={() => setView("list")} className="inv-btn">All invoices</button>
              <h2>{selected.number}</h2>
              <span className="inv-status" style={{ color: STATUS_COLORS[selected.status] }}>{selected.status}</span>
              <div className="inv-acts">
                {selected.status !== "Paid" && <button className="inv-btn" onClick={() => updateStatus(selected.id, "Paid")}>Mark paid</button>}
                {selected.status === "Draft" && <button className="inv-btn" onClick={() => updateStatus(selected.id, "Sent")}>Mark sent</button>}
                <button className="inv-btn inv-btn--del" onClick={() => deleteInvoice(selected.id)}>Delete</button>
              </div>
            </div>

            <div className="inv-doc">
              <div className="inv-doc__top">
                <div>
                  <div className="inv-doc__name">Purcell Ventures</div>
                  <p>{selected.division}</p>
                  <p>{CONTACT.email}, {CONTACT.phone}</p>
                </div>
                <div className="r">
                  <div className="inv-doc__num">{selected.number}</div>
                  <p style={{ marginTop: 6 }}>Issued {fmt(selected.issueDate)}</p>
                  <p>Due {fmt(selected.dueDate)}</p>
                </div>
              </div>

              <div className="inv-bill">
                <p>Bill to</p>
                <b>{selected.client}</b>
                {selected.clientEmail && <p>{selected.clientEmail}</p>}
                {selected.clientPhone && <p>{selected.clientPhone}</p>}
              </div>

              <div className="inv-dline inv-dline--head"><span>Description</span><span>Qty</span><span>Rate</span><span>Amount</span></div>
              {selected.items.map((item, i) => (
                <div key={i} className="inv-dline">
                  <span>{item.description}</span>
                  <span className="ui-muted">{item.qty}</span>
                  <span className="ui-muted">{inv$(item.rate)}</span>
                  <span>{inv$(item.qty * item.rate)}</span>
                </div>
              ))}
              <div className="inv-total"><span className="ui-muted">Total</span><b>{inv$(total(selected.items))}</b></div>

              {selected.notes && <div className="inv-notes"><b>Notes:</b> {selected.notes}</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
