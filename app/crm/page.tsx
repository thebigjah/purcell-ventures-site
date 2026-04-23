"use client";
// CRM — purcellventures.co/crm
// Reads leads, bookings, and newsletter subs from localStorage
// Private tool — same style as /print

import { useState, useEffect } from "react";

const LEAD_STATUSES = ["New", "Contacted", "Proposal Sent", "Closed Won", "Closed Lost", "Pass"];
const STATUS_COLORS: Record<string, string> = {
  "New": "#d4af37", "Contacted": "#7aaa6a", "Proposal Sent": "#9b7fd4",
  "Closed Won": "#4a9a6a", "Closed Lost": "#6a4a4a", "Pass": "#524d45",
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

  const sectionLabel: React.CSSProperties = {
    fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
    color: "#d4af37", paddingBottom: "14px", borderBottom: "1px solid #2e2820", marginBottom: "20px",
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 18px", background: active ? "#d4af3715" : "none",
    border: `1px solid ${active ? "#d4af37" : "#2e2820"}`, borderRadius: "6px",
    color: active ? "#d4af37" : "#524d45", fontSize: "12px", fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  });

  const inputSmall: React.CSSProperties = {
    padding: "6px 10px", background: "#161412", border: "1px solid #2e2820",
    borderRadius: "4px", color: "#f5f0e0", fontSize: "12px", fontFamily: "Inter, sans-serif",
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px" }}>
            Purcell Ventures — Private
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>CRM</h1>
          <p style={{ fontSize: "14px", color: "#524d45" }}>Leads · Bookings · Newsletter — all in one place</p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#2e2820", marginBottom: "32px", borderRadius: "8px", overflow: "hidden" }}>
          {[
            { label: "Leads", count: leads.length, hot: leads.filter(l => l.status === "New").length },
            { label: "Bookings", count: bookings.length, hot: bookings.filter(b => b.status === "New").length },
            { label: "Subscribers", count: subs.length, hot: 0 },
          ].map(item => (
            <div key={item.label} style={{ padding: "24px 28px", background: "#0d0c0a" }}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#f5f0e0", fontFamily: "'Cinzel', Georgia, serif" }}>{item.count}</div>
              <div style={{ fontSize: "12px", color: "#524d45", marginTop: "2px" }}>{item.label}</div>
              {item.hot > 0 && <div style={{ fontSize: "11px", color: "#d4af37", marginTop: "6px" }}>{item.hot} new</div>}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          <button style={tabStyle(tab === "leads")} onClick={() => setTab("leads")}>Leads ({leads.length})</button>
          <button style={tabStyle(tab === "bookings")} onClick={() => setTab("bookings")}>Bookings ({bookings.length})</button>
          <button style={tabStyle(tab === "newsletter")} onClick={() => setTab("newsletter")}>Newsletter ({subs.length})</button>
        </div>

        {/* ── LEADS ──────────────────────────────────────────────────────── */}
        {tab === "leads" && (
          <div>
            <div style={sectionLabel}>Leads</div>
            {leads.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#3a3530", border: "1px solid #2e2820", borderRadius: "8px" }}>
                No leads yet. Submissions from the quote forms will appear here.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {leads.map(lead => (
                  <div key={lead.id} style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "8px", overflow: "hidden" }}>
                    <div
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                      style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#f5f0e0" }}>{lead.name}</span>
                        {lead.business && <span style={{ fontSize: "13px", color: "#6a6458", marginLeft: "8px" }}>· {lead.business}</span>}
                      </div>
                      <span style={{ fontSize: "11px", color: "#6a6458", flexShrink: 0 }}>{lead.service?.split("(")[0].trim()}</span>
                      <span style={{ fontSize: "10px", color: "#524d45", flexShrink: 0 }}>{fmt(lead.createdAt)}</span>
                      <select
                        value={lead.status}
                        onChange={e => { e.stopPropagation(); updateLead(lead.id, { status: e.target.value }); }}
                        onClick={e => e.stopPropagation()}
                        style={{ padding: "4px 8px", background: "#161412", border: `1px solid ${STATUS_COLORS[lead.status] || "#2e2820"}40`, borderRadius: "4px", color: STATUS_COLORS[lead.status] || "#f5f0e0", fontSize: "11px", fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer" }}
                      >
                        {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span style={{ color: "#3a3530", fontSize: "14px" }}>{expanded === lead.id ? "−" : "+"}</span>
                    </div>

                    {expanded === lead.id && (
                      <div style={{ borderTop: "1px solid #2e2820", padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ fontSize: "12px", color: "#524d45" }}><span style={{ color: "#8a8070" }}>Phone:</span> {lead.phone || "—"}</div>
                          <div style={{ fontSize: "12px", color: "#524d45" }}><span style={{ color: "#8a8070" }}>Email:</span> {lead.email || "—"}</div>
                          <div style={{ fontSize: "12px", color: "#524d45" }}><span style={{ color: "#8a8070" }}>Service:</span> {lead.service}</div>
                          {lead.message && <div style={{ fontSize: "12px", color: "#524d45" }}><span style={{ color: "#8a8070" }}>Message:</span> {lead.message}</div>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div>
                            <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "4px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Follow-up date</div>
                            <input type="date" style={inputSmall}
                              value={editFollowUp[lead.id] ?? lead.followUp}
                              onChange={e => setEditFollowUp(p => ({ ...p, [lead.id]: e.target.value }))}
                              onBlur={() => { if (editFollowUp[lead.id] !== undefined) updateLead(lead.id, { followUp: editFollowUp[lead.id] }); }}
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "4px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Notes</div>
                            <textarea style={{ ...inputSmall, resize: "vertical", minHeight: "60px" }}
                              placeholder="Add notes..."
                              value={editNotes[lead.id] ?? lead.notes}
                              onChange={e => setEditNotes(p => ({ ...p, [lead.id]: e.target.value }))}
                              onBlur={() => { if (editNotes[lead.id] !== undefined) updateLead(lead.id, { notes: editNotes[lead.id] }); }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <a href={`tel:${lead.phone}`} style={{ flex: 1, padding: "7px", background: "#d4af3715", border: "1px solid #d4af3730", borderRadius: "4px", color: "#d4af37", fontSize: "11px", fontWeight: 700, textAlign: "center", textDecoration: "none", letterSpacing: "0.06em" }}>Call</a>
                            <a href={`sms:${lead.phone}`} style={{ flex: 1, padding: "7px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "4px", color: "#8a8070", fontSize: "11px", fontWeight: 700, textAlign: "center", textDecoration: "none", letterSpacing: "0.06em" }}>Text</a>
                            <button onClick={() => deleteLead(lead.id)} style={{ padding: "7px 12px", background: "none", border: "1px solid #3a2020", borderRadius: "4px", color: "#6a3a3a", fontSize: "11px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Delete</button>
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

        {/* ── BOOKINGS ──────────────────────────────────────────────────── */}
        {tab === "bookings" && (
          <div>
            <div style={sectionLabel}>Consulting Bookings</div>
            {bookings.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#3a3530", border: "1px solid #2e2820", borderRadius: "8px" }}>
                No bookings yet. Submissions from /consulting/book will appear here.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {bookings.map(b => (
                  <div key={b.id} style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "8px", overflow: "hidden" }}>
                    <div
                      onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                      style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#f5f0e0" }}>{b.name}</span>
                        {b.business && <span style={{ fontSize: "13px", color: "#6a6458", marginLeft: "8px" }}>· {b.business}</span>}
                      </div>
                      <span style={{ fontSize: "11px", color: "#6a6458", flexShrink: 0 }}>{b.format}</span>
                      <span style={{ fontSize: "10px", color: "#524d45", flexShrink: 0 }}>{fmt(b.createdAt)}</span>
                      <select
                        value={b.status}
                        onChange={e => { e.stopPropagation(); updateBooking(b.id, { status: e.target.value }); }}
                        onClick={e => e.stopPropagation()}
                        style={{ padding: "4px 8px", background: "#161412", border: `1px solid ${STATUS_COLORS[b.status] || "#2e2820"}40`, borderRadius: "4px", color: STATUS_COLORS[b.status] || "#f5f0e0", fontSize: "11px", fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer" }}
                      >
                        {["New", "Confirmed", "Completed", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span style={{ color: "#3a3530", fontSize: "14px" }}>{expanded === b.id ? "−" : "+"}</span>
                    </div>
                    {expanded === b.id && (
                      <div style={{ borderTop: "1px solid #2e2820", padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#524d45" }}>
                          <div><span style={{ color: "#8a8070" }}>Session:</span> {b.sessionType}</div>
                          <div><span style={{ color: "#8a8070" }}>Format:</span> {b.format}{b.groupSize ? ` · ${b.groupSize}` : ""}</div>
                          <div><span style={{ color: "#8a8070" }}>Date pref:</span> {b.datePreference}</div>
                          {b.timePreference && <div><span style={{ color: "#8a8070" }}>Time pref:</span> {b.timePreference}</div>}
                          <div><span style={{ color: "#8a8070" }}>Phone:</span> {b.phone}</div>
                          <div><span style={{ color: "#8a8070" }}>Email:</span> {b.email || "—"}</div>
                          {b.notes && <div><span style={{ color: "#8a8070" }}>Notes:</span> {b.notes}</div>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <a href={`tel:${b.phone}`} style={{ flex: 1, padding: "7px", background: "#d4af3715", border: "1px solid #d4af3730", borderRadius: "4px", color: "#d4af37", fontSize: "11px", fontWeight: 700, textAlign: "center", textDecoration: "none" }}>Call</a>
                            <a href={`sms:${b.phone}`} style={{ flex: 1, padding: "7px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "4px", color: "#8a8070", fontSize: "11px", fontWeight: 700, textAlign: "center", textDecoration: "none" }}>Text</a>
                            <button onClick={() => deleteBooking(b.id)} style={{ padding: "7px 12px", background: "none", border: "1px solid #3a2020", borderRadius: "4px", color: "#6a3a3a", fontSize: "11px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Delete</button>
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

        {/* ── NEWSLETTER ───────────────────────────────────────────────── */}
        {tab === "newsletter" && (
          <div>
            <div style={sectionLabel}>Newsletter Subscribers</div>
            {subs.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#3a3530", border: "1px solid #2e2820", borderRadius: "8px" }}>
                No subscribers yet. Signups from /newsletter will appear here.
              </div>
            ) : (
              <div style={{ background: "#0d0c0a", border: "1px solid #2e2820", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2e2820" }}>
                      {["Name", "Email", "Business Type", "Date", ""].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s, i) => (
                      <tr key={s.id} style={{ borderBottom: i < subs.length - 1 ? "1px solid #1a1816" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#f5f0e0", fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#d4af37" }}>{s.email}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6a6458" }}>{s.businessType || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "11px", color: "#3a3530", whiteSpace: "nowrap" }}>{fmt(s.createdAt)}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <button onClick={() => deleteSub(s.id)} style={{ padding: "4px 10px", background: "none", border: "1px solid #3a2020", borderRadius: "4px", color: "#6a3a3a", fontSize: "10px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
      <div style={{ height: "64px" }} />
    </div>
  );
}
