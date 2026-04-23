"use client";
// Invoicing — purcellventures.co/invoicing
// Private tool — create, manage, and track invoices. localStorage.

import { useState, useEffect } from "react";

interface LineItem { description: string; qty: number; rate: number; }
interface Invoice {
  id: string; number: string; client: string; clientEmail: string; clientPhone: string;
  division: string; items: LineItem[]; notes: string;
  issueDate: string; dueDate: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  createdAt: string;
}

const DIVISIONS = ["Purcell Ventures — Digital Services", "Purcell Ventures — Consulting", "Purcell Ventures — Custom Software", "Purcell Works — Field Services"];
const STATUS_COLORS: Record<string, string> = { Draft: "#524d45", Sent: "#d4af37", Paid: "#4a9a6a", Overdue: "#9a4a4a" };

function total(items: LineItem[]) { return items.reduce((s, i) => s + i.qty * i.rate, 0); }
function fmt(iso: string) { try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch { return iso; } }
function inv$(n: number) { return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function nextNumber(invoices: Invoice[]) {
  const year = new Date().getFullYear();
  const count = invoices.filter(i => i.number.startsWith(`PV-${year}`)).length + 1;
  return `PV-${year}-${String(count).padStart(3, "0")}`;
}

const BLANK_ITEM: LineItem = { description: "", qty: 1, rate: 0 };

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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 13px", background: "#141210",
    border: "1px solid #2e2820", borderRadius: "6px",
    color: "#f5f0e0", fontSize: "13px", fontFamily: "Inter, sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  const totals = invoices.reduce((a, inv) => {
    if (inv.status === "Paid") a.paid += total(inv.items);
    else if (inv.status !== "Draft") a.outstanding += total(inv.items);
    return a;
  }, { paid: 0, outstanding: 0 });

  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px" }}>Purcell Ventures — Private</div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "#f5f0e0", marginBottom: "4px" }}>Invoicing</h1>
            <p style={{ fontSize: "14px", color: "#524d45" }}>Create, track, and manage invoices</p>
          </div>
          {view !== "create" && (
            <button onClick={() => setView("create")} style={{ padding: "12px 22px", background: "#d4af37", color: "#0c0a08", fontWeight: 700, fontSize: "13px", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
              + New Invoice
            </button>
          )}
        </div>

        {view === "list" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#2e2820", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
              {[
                { label: "Total Invoices", value: invoices.length.toString() },
                { label: "Outstanding", value: inv$(totals.outstanding) },
                { label: "Paid", value: inv$(totals.paid) },
              ].map(item => (
                <div key={item.label} style={{ padding: "22px 24px", background: "#0d0c0a" }}>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#f5f0e0", fontFamily: "'Cinzel', Georgia, serif" }}>{item.value}</div>
                  <div style={{ fontSize: "12px", color: "#524d45", marginTop: "2px" }}>{item.label}</div>
                </div>
              ))}
            </div>

            {invoices.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#3a3530", border: "1px solid #2e2820", borderRadius: "8px" }}>
                No invoices yet. Click "New Invoice" to create your first one.
              </div>
            ) : (
              <div style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2e2820" }}>
                      {["Invoice #", "Client", "Division", "Amount", "Due", "Status", ""].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, i) => (
                      <tr key={inv.id} style={{ borderBottom: i < invoices.length - 1 ? "1px solid #1a1816" : "none", cursor: "pointer" }}
                        onClick={() => { setSelected(inv); setView("detail"); }}>
                        <td style={{ padding: "13px 16px", fontSize: "12px", color: "#d4af37", fontWeight: 700 }}>{inv.number}</td>
                        <td style={{ padding: "13px 16px", fontSize: "13px", color: "#f5f0e0", fontWeight: 600 }}>{inv.client}</td>
                        <td style={{ padding: "13px 16px", fontSize: "11px", color: "#6a6458" }}>{inv.division.split("—")[1]?.trim()}</td>
                        <td style={{ padding: "13px 16px", fontSize: "13px", color: "#c8bfb0", fontWeight: 600 }}>{inv$(total(inv.items))}</td>
                        <td style={{ padding: "13px 16px", fontSize: "11px", color: "#524d45", whiteSpace: "nowrap" }}>{fmt(inv.dueDate)}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: STATUS_COLORS[inv.status], background: `${STATUS_COLORS[inv.status]}18`, padding: "3px 9px", borderRadius: "20px" }}>{inv.status}</span>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ fontSize: "12px", color: "#3a3530" }}>→</span>
                        </td>
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
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <button onClick={() => setView("list")} style={{ padding: "8px 16px", background: "none", border: "1px solid #2e2820", borderRadius: "6px", color: "#524d45", fontSize: "12px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>← Back</button>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700 }}>New Invoice</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Client Name *</div>
                <input style={inputStyle} placeholder="Business or person name" value={client} onChange={e => setClient(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Division</div>
                <select style={{ ...inputStyle, appearance: "none" }} value={division} onChange={e => setDivision(e.target.value)}>
                  {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Client Email</div>
                <input style={inputStyle} placeholder="email@example.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Client Phone</div>
                <input style={inputStyle} placeholder="(xxx) xxx-xxxx" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Issue Date</div>
                <input type="date" style={inputStyle} value={issueDate} onChange={e => setIssueDate(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Due Date</div>
                <input type="date" style={inputStyle} value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
            </div>

            {/* Line items */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "12px" }}>Line Items</div>
              <div style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 28px", gap: "0", borderBottom: "1px solid #2e2820", padding: "10px 16px" }}>
                  {["Description", "Qty", "Rate", ""].map(h => (
                    <div key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45" }}>{h}</div>
                  ))}
                </div>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 28px", gap: "8px", padding: "10px 16px", borderBottom: idx < items.length - 1 ? "1px solid #1a1816" : "none", alignItems: "center" }}>
                    <input style={{ ...inputStyle, padding: "7px 10px" }} placeholder="Service description" value={item.description} onChange={e => setItem(idx, { description: e.target.value })} />
                    <input style={{ ...inputStyle, padding: "7px 10px" }} type="number" min="1" value={item.qty} onChange={e => setItem(idx, { qty: parseFloat(e.target.value) || 1 })} />
                    <input style={{ ...inputStyle, padding: "7px 10px" }} type="number" min="0" step="0.01" placeholder="0.00" value={item.rate || ""} onChange={e => setItem(idx, { rate: parseFloat(e.target.value) || 0 })} />
                    <button onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))} disabled={items.length === 1} style={{ background: "none", border: "none", color: "#6a3a3a", cursor: "pointer", fontSize: "16px", padding: "0" }}>×</button>
                  </div>
                ))}
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #2e2820" }}>
                  <button onClick={() => setItems(p => [...p, { ...BLANK_ITEM }])} style={{ fontSize: "12px", color: "#d4af37", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>+ Add item</button>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#f5f0e0", fontFamily: "'Cinzel', Georgia, serif" }}>{inv$(total(items))}</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Notes / Terms</div>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "72px" }} placeholder="Payment terms, thank you note, etc." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            <button onClick={createInvoice} disabled={!client.trim() || items.every(i => !i.description.trim())} style={{
              padding: "13px 32px", background: "#d4af37", color: "#0c0a08", fontWeight: 700, fontSize: "14px",
              border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif",
            }}>Create Invoice →</button>
          </div>
        )}

        {view === "detail" && selected && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
              <button onClick={() => setView("list")} style={{ padding: "8px 16px", background: "none", border: "1px solid #2e2820", borderRadius: "6px", color: "#524d45", fontSize: "12px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>← All Invoices</button>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, flex: 1 }}>{selected.number}</h2>
              <span style={{ fontSize: "11px", fontWeight: 700, color: STATUS_COLORS[selected.status], background: `${STATUS_COLORS[selected.status]}18`, padding: "4px 12px", borderRadius: "20px" }}>{selected.status}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {selected.status !== "Paid" && <button onClick={() => updateStatus(selected.id, "Paid")} style={{ padding: "8px 16px", background: "#4a9a6a20", border: "1px solid #4a9a6a40", color: "#4a9a6a", fontSize: "12px", fontWeight: 700, borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Mark Paid</button>}
                {selected.status === "Draft" && <button onClick={() => updateStatus(selected.id, "Sent")} style={{ padding: "8px 16px", background: "#d4af3715", border: "1px solid #d4af3730", color: "#d4af37", fontSize: "12px", fontWeight: 700, borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Mark Sent</button>}
                <button onClick={() => deleteInvoice(selected.id)} style={{ padding: "8px 16px", background: "none", border: "1px solid #3a2020", color: "#6a3a3a", fontSize: "12px", fontWeight: 600, borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Delete</button>
              </div>
            </div>

            {/* Invoice preview */}
            <div style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "10px", padding: "36px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#d4af37", marginBottom: "4px" }}>Purcell Ventures</div>
                  <div style={{ fontSize: "12px", color: "#6a6458" }}>{selected.division}</div>
                  <div style={{ fontSize: "12px", color: "#6a6458" }}>elijah@purcell-ventures.com · (770) 280-5319</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#f5f0e0" }}>{selected.number}</div>
                  <div style={{ fontSize: "12px", color: "#6a6458", marginTop: "4px" }}>Issued: {fmt(selected.issueDate)}</div>
                  <div style={{ fontSize: "12px", color: "#6a6458" }}>Due: {fmt(selected.dueDate)}</div>
                </div>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "8px" }}>Bill To</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#f5f0e0" }}>{selected.client}</div>
                {selected.clientEmail && <div style={{ fontSize: "12px", color: "#6a6458" }}>{selected.clientEmail}</div>}
                {selected.clientPhone && <div style={{ fontSize: "12px", color: "#6a6458" }}>{selected.clientPhone}</div>}
              </div>

              <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #2e2820", marginBottom: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 110px", padding: "10px 16px", borderBottom: "1px solid #2e2820", background: "#141210" }}>
                  {["Description", "Qty", "Rate", "Amount"].map(h => (
                    <div key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45" }}>{h}</div>
                  ))}
                </div>
                {selected.items.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 110px", padding: "12px 16px", borderBottom: i < selected.items.length - 1 ? "1px solid #1a1816" : "none" }}>
                    <div style={{ fontSize: "13px", color: "#f5f0e0" }}>{item.description}</div>
                    <div style={{ fontSize: "13px", color: "#8a8070" }}>{item.qty}</div>
                    <div style={{ fontSize: "13px", color: "#8a8070" }}>{inv$(item.rate)}</div>
                    <div style={{ fontSize: "13px", color: "#c8bfb0", fontWeight: 600 }}>{inv$(item.qty * item.rate)}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "flex-end", padding: "14px 16px", borderTop: "1px solid #2e2820" }}>
                  <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#524d45", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Total</span>
                    <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#d4af37" }}>{inv$(total(selected.items))}</span>
                  </div>
                </div>
              </div>

              {selected.notes && (
                <div style={{ padding: "14px 16px", background: "#141210", borderRadius: "6px", fontSize: "12px", color: "#6a6458", lineHeight: 1.65 }}>
                  <span style={{ fontWeight: 700, color: "#524d45" }}>Notes: </span>{selected.notes}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      <div style={{ height: "64px" }} />
    </div>
  );
}
