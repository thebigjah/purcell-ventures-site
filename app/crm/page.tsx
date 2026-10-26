"use client";
// CRM, purcellventures.co/crm
// Reads leads, bookings, and newsletter subs from localStorage.
// Private tool.

import { useState, useEffect } from "react";
import Link from "next/link";

const LEAD_STATUSES = ["New", "Contacted", "Proposal Sent", "Closed Won", "Closed Lost", "Pass"];
const STATUS_COLORS: Record<string, string> = {
  "New": "var(--gold-text)", "Contacted": "var(--ok)", "Proposal Sent": "var(--fg-2)",
  "Closed Won": "var(--ok)", "Closed Lost": "var(--danger)", "Pass": "var(--subtle)",
};

interface Lead {
  id: string; name: string; business: string; phone: string; email: string;
  service: string; message: string; status: string; notes: string;
  followUp: string; createdAt: string;
}
interface Booking {
  id: string; sessionType: string; format: string; datePreference: string;
  timePreference: string; name: string; business: string; email: string;
  phone: string; groupSize: string; notes: string; status: string; createdAt: string;
}
interface Subscriber {
  id: string; name: string; email: string; businessType: string; createdAt: string;
}

function fmt(iso: string) {
  try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch { return iso; }
}

const CSS = `
.tool { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); }
.tool__bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px var(--gutter); border-bottom: 1px solid var(--line); }
.tool__brand { display: inline-flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; font: 600 17px/1 var(--font-display); min-height: 44px; }
.tool__bar a.tool__home { color: var(--muted); font-size: 14px; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
.tool__bar a.tool__home:hover { color: var(--gold-text); }
.tool__main { max-width: 1100px; margin: 0 auto; padding: 40px var(--gutter) 80px; }
.tool h1 { font: 600 clamp(28px, 5vw, 40px)/1.1 var(--font-display); margin: 0 0 8px; }
.tool__sub { color: var(--muted); margin: 0 0 32px; }
.crm-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 28px; }
.crm-stat { padding: 20px 0; }
.crm-stat + .crm-stat { padding-left: 20px; border-left: 1px solid var(--line); }
.crm-stat b { display: block; font: 600 32px/1 var(--font-display); }
.crm-stat span { display: block; color: var(--muted); font-size: 14px; margin-top: 4px; }
.crm-stat em { display: block; font-style: normal; color: var(--gold-text); font-size: 14px; margin-top: 4px; }
.crm-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.crm-tab { min-height: 44px; padding: 0 16px; background: transparent; border: 1px solid var(--line); color: var(--muted); font: 600 15px/1 var(--font-body); cursor: pointer; }
.crm-tab:hover { color: var(--fg); border-color: var(--gold); }
.crm-tab[aria-pressed="true"] { color: var(--gold-text); border-color: var(--gold); }
.crm-h { font: 600 22px/1.2 var(--font-display); margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
.crm-empty { padding: 40px 0; color: var(--muted); }
.crm-list { display: flex; flex-direction: column; }
.crm-row { border-bottom: 1px solid var(--line); }
.crm-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; padding: 12px 0; cursor: pointer; min-height: 44px; }
.crm-name { flex: 1 1 200px; min-width: 0; font-weight: 700; }
.crm-name small { font-weight: 400; color: var(--muted); font-size: 14px; margin-left: 8px; }
.crm-meta { color: var(--muted); font-size: 14px; }
.crm-status { min-height: 44px; padding: 0 10px; background: var(--surface); border: 1px solid var(--line); font: 600 14px/1 var(--font-body); cursor: pointer; }
.crm-toggle { color: var(--subtle); font-size: 14px; min-width: 44px; text-align: right; background: none; border: 0; cursor: pointer; font-family: var(--font-body); min-height: 44px; }
.crm-body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; padding: 4px 0 20px; }
.crm-dl { display: flex; flex-direction: column; gap: 8px; font-size: 15px; color: var(--fg-2); overflow-wrap: anywhere; }
.crm-dl b { color: var(--muted); font-weight: 500; }
.crm-col { display: flex; flex-direction: column; gap: 12px; }
.crm-lab { display: block; font-size: 14px; color: var(--muted); margin-bottom: 4px; }
.crm-in { width: 100%; box-sizing: border-box; background: var(--surface); color: var(--fg); border: 1px solid var(--line); padding: 10px 12px; font: 400 16px/1.4 var(--font-body); border-radius: 0; }
.crm-in:focus { outline: none; border-color: var(--gold); }
.crm-act { display: flex; flex-wrap: wrap; gap: 8px; }
.crm-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 16px; background: transparent; border: 1px solid var(--line); color: var(--fg-2); font: 600 15px/1 var(--font-body); text-decoration: none; cursor: pointer; }
.crm-btn:hover { border-color: var(--gold); color: var(--gold-text); }
.crm-btn--del:hover { border-color: var(--danger); color: var(--danger); }
.crm-scroll { overflow-x: auto; }
.crm-table { width: 100%; border-collapse: collapse; min-width: 560px; }
.crm-table th { text-align: left; padding: 10px 12px 10px 0; color: var(--muted); font-weight: 500; font-size: 14px; border-bottom: 1px solid var(--line); }
.crm-table td { padding: 10px 12px 10px 0; border-bottom: 1px solid var(--line); font-size: 15px; vertical-align: middle; }
@media (max-width: 860px) {
  .crm-body { grid-template-columns: minmax(0, 1fr); }
  .crm-stat + .crm-stat { padding-left: 12px; }
  .crm-stat b { font-size: 26px; }
}
`;

export default function CRMPage() {
  const [tab, setTab] = useState<"leads" | "bookings" | "newsletter">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [editFollowUp, setEditFollowUp] = useState<Record<string, string>>({});

  useEffect(() => {
    setLeads(JSON.parse(localStorage.getItem("pv_leads") || "[]"));
    setBookings(JSON.parse(localStorage.getItem("pv_bookings") || "[]"));
    setSubs(JSON.parse(localStorage.getItem("pv_newsletter") || "[]"));
  }, []);

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, ...patch } : l);
      localStorage.setItem("pv_leads", JSON.stringify(updated));
      return updated;
    });
  };

  const updateBooking = (id: string, patch: Partial<Booking>) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, ...patch } : b);
      localStorage.setItem("pv_bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteLead = (id: string) => {
    setLeads(prev => { const u = prev.filter(l => l.id !== id); localStorage.setItem("pv_leads", JSON.stringify(u)); return u; });
  };
  const deleteBooking = (id: string) => {
    setBookings(prev => { const u = prev.filter(b => b.id !== id); localStorage.setItem("pv_bookings", JSON.stringify(u)); return u; });
  };
  const deleteSub = (id: string) => {
    setSubs(prev => { const u = prev.filter(s => s.id !== id); localStorage.setItem("pv_newsletter", JSON.stringify(u)); return u; });
  };

  const statusStyle = (s: string): React.CSSProperties => ({ color: STATUS_COLORS[s] || "var(--fg)" });

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
        <h1>CRM</h1>
        <p className="tool__sub">Leads, bookings and newsletter subscribers in one place. Private to this browser.</p>

        <div className="crm-stats">
          {[
            { label: "Leads", count: leads.length, hot: leads.filter(l => l.status === "New").length },
            { label: "Bookings", count: bookings.length, hot: bookings.filter(b => b.status === "New").length },
            { label: "Subscribers", count: subs.length, hot: 0 },
          ].map(item => (
            <div key={item.label} className="crm-stat">
              <b>{item.count}</b>
              <span>{item.label}</span>
              {item.hot > 0 && <em>{item.hot} new</em>}
            </div>
          ))}
        </div>

        <div className="crm-tabs">
          <button className="crm-tab" aria-pressed={tab === "leads"} onClick={() => setTab("leads")}>Leads ({leads.length})</button>
          <button className="crm-tab" aria-pressed={tab === "bookings"} onClick={() => setTab("bookings")}>Bookings ({bookings.length})</button>
          <button className="crm-tab" aria-pressed={tab === "newsletter"} onClick={() => setTab("newsletter")}>Newsletter ({subs.length})</button>
        </div>

        {tab === "leads" && (
          <div>
            <h2 className="crm-h">Leads</h2>
            {leads.length === 0 ? (
              <p className="crm-empty">No leads yet. Submissions from the quote forms will appear here.</p>
            ) : (
              <div className="crm-list">
                {leads.map(lead => (
                  <div key={lead.id} className="crm-row">
                    <div className="crm-head" onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                      <div className="crm-name">
                        {lead.name}
                        {lead.business && <small>{lead.business}</small>}
                      </div>
                      <span className="crm-meta">{lead.service?.split("(")[0].trim()}</span>
                      <span className="crm-meta">{fmt(lead.createdAt)}</span>
                      <select
                        className="crm-status"
                        value={lead.status}
                        aria-label="Lead status"
                        onChange={e => { e.stopPropagation(); updateLead(lead.id, { status: e.target.value }); }}
                        onClick={e => e.stopPropagation()}
                        style={statusStyle(lead.status)}
                      >
                        {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span className="crm-toggle">{expanded === lead.id ? "Close" : "Open"}</span>
                    </div>

                    {expanded === lead.id && (
                      <div className="crm-body">
                        <div className="crm-dl">
                          <div><b>Phone:</b> {lead.phone || "none"}</div>
                          <div><b>Email:</b> {lead.email || "none"}</div>
                          <div><b>Service:</b> {lead.service}</div>
                          {lead.message && <div><b>Message:</b> {lead.message}</div>}
                        </div>
                        <div className="crm-col">
                          <div>
                            <label className="crm-lab">Follow-up date</label>
                            <input type="date" className="crm-in"
                              value={editFollowUp[lead.id] ?? lead.followUp}
                              onChange={e => setEditFollowUp(p => ({ ...p, [lead.id]: e.target.value }))}
                              onBlur={() => { if (editFollowUp[lead.id] !== undefined) updateLead(lead.id, { followUp: editFollowUp[lead.id] }); }}
                            />
                          </div>
                          <div>
                            <label className="crm-lab">Notes</label>
                            <textarea className="crm-in" style={{ resize: "vertical", minHeight: 72 }}
                              placeholder="Add notes"
                              value={editNotes[lead.id] ?? lead.notes}
                              onChange={e => setEditNotes(p => ({ ...p, [lead.id]: e.target.value }))}
                              onBlur={() => { if (editNotes[lead.id] !== undefined) updateLead(lead.id, { notes: editNotes[lead.id] }); }}
                            />
                          </div>
                          <div className="crm-act">
                            <a href={`tel:${lead.phone}`} className="crm-btn">Call</a>
                            <a href={`sms:${lead.phone}`} className="crm-btn">Text</a>
                            <button onClick={() => deleteLead(lead.id)} className="crm-btn crm-btn--del">Delete</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            <h2 className="crm-h">Consulting bookings</h2>
            {bookings.length === 0 ? (
              <p className="crm-empty">No bookings yet. Submissions from /consulting/book will appear here.</p>
            ) : (
              <div className="crm-list">
                {bookings.map(b => (
                  <div key={b.id} className="crm-row">
                    <div className="crm-head" onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
                      <div className="crm-name">
                        {b.name}
                        {b.business && <small>{b.business}</small>}
                      </div>
                      <span className="crm-meta">{b.format}</span>
                      <span className="crm-meta">{fmt(b.createdAt)}</span>
                      <select
                        className="crm-status"
                        value={b.status}
                        aria-label="Booking status"
                        onChange={e => { e.stopPropagation(); updateBooking(b.id, { status: e.target.value }); }}
                        onClick={e => e.stopPropagation()}
                        style={statusStyle(b.status)}
                      >
                        {["New", "Confirmed", "Completed", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span className="crm-toggle">{expanded === b.id ? "Close" : "Open"}</span>
                    </div>
                    {expanded === b.id && (
                      <div className="crm-body">
                        <div className="crm-dl">
                          <div><b>Session:</b> {b.sessionType}</div>
                          <div><b>Format:</b> {b.format}{b.groupSize ? `, ${b.groupSize}` : ""}</div>
                          <div><b>Date preference:</b> {b.datePreference}</div>
                          {b.timePreference && <div><b>Time preference:</b> {b.timePreference}</div>}
                          <div><b>Phone:</b> {b.phone}</div>
                          <div><b>Email:</b> {b.email || "none"}</div>
                          {b.notes && <div><b>Notes:</b> {b.notes}</div>}
                        </div>
                        <div className="crm-col">
                          <div className="crm-act">
                            <a href={`tel:${b.phone}`} className="crm-btn">Call</a>
                            <a href={`sms:${b.phone}`} className="crm-btn">Text</a>
                            <button onClick={() => deleteBooking(b.id)} className="crm-btn crm-btn--del">Delete</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "newsletter" && (
          <div>
            <h2 className="crm-h">Newsletter subscribers</h2>
            {subs.length === 0 ? (
              <p className="crm-empty">No subscribers yet. Signups from /newsletter will appear here.</p>
            ) : (
              <div className="crm-scroll">
                <table className="crm-table">
                  <thead>
                    <tr>
                      {["Name", "Email", "Business type", "Date", ""].map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map(s => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td className="ui-gold">{s.email}</td>
                        <td className="ui-muted">{s.businessType || "none"}</td>
                        <td className="ui-muted" style={{ whiteSpace: "nowrap" }}>{fmt(s.createdAt)}</td>
                        <td><button onClick={() => deleteSub(s.id)} className="crm-btn crm-btn--del">Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
