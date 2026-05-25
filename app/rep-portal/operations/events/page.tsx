"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkedIn: boolean;
  registeredAt: string;
  notes: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  rsvps: RSVP[];
  createdAt: string;
  status: "Upcoming" | "Past" | "Cancelled";
}

const KEY = "pv_ops_events_v1";

export default function PVEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [eventForm, setEventForm] = useState({ name: "", date: new Date().toISOString().slice(0, 10), time: "18:00", location: "", capacity: 20, description: "" });
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", phone: "", notes: "" });

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setEvents(JSON.parse(raw));
  }, []);

  function save(updated: Event[]) {
    setEvents(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function createEvent() {
    if (!eventForm.name.trim()) return;
    const e: Event = { id: crypto.randomUUID(), ...eventForm, rsvps: [], createdAt: new Date().toISOString(), status: "Upcoming" };
    save([e, ...events]);
    setCreating(false);
    setEventForm({ name: "", date: new Date().toISOString().slice(0, 10), time: "18:00", location: "", capacity: 20, description: "" });
  }

  function addRsvp(eventId: string) {
    if (!rsvpForm.name.trim()) return;
    save(events.map((e) => e.id === eventId ? { ...e, rsvps: [...e.rsvps, { id: crypto.randomUUID(), ...rsvpForm, checkedIn: false, registeredAt: new Date().toISOString() }] } : e));
    setRsvpForm({ name: "", email: "", phone: "", notes: "" });
  }

  function toggleCheckIn(eventId: string, rsvpId: string) {
    save(events.map((e) => e.id === eventId ? { ...e, rsvps: e.rsvps.map((r) => r.id === rsvpId ? { ...r, checkedIn: !r.checkedIn } : r) } : e));
  }

  function removeRsvp(eventId: string, rsvpId: string) {
    if (!confirm("Remove this RSVP?")) return;
    save(events.map((e) => e.id === eventId ? { ...e, rsvps: e.rsvps.filter((r) => r.id !== rsvpId) } : e));
  }

  function updateEventStatus(eventId: string, status: Event["status"]) {
    save(events.map((e) => e.id === eventId ? { ...e, status } : e));
  }

  function deleteEvent(eventId: string) {
    if (!confirm("Delete this event and all RSVPs?")) return;
    save(events.filter((e) => e.id !== eventId));
    if (activeEventId === eventId) setActiveEventId(null);
  }

  function exportEventRSVPs(event: Event) {
    const headers = ["name", "email", "phone", "checkedIn", "registeredAt", "notes"];
    const rows = event.rsvps.map((r) => [r.name, r.email, r.phone, r.checkedIn, r.registeredAt, `"${(r.notes || "").replace(/"/g, '""')}"`].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.name.replace(/\s+/g, "-")}-rsvps.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const activeEvent = activeEventId ? events.find((e) => e.id === activeEventId) : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <Link href="/rep-portal/operations" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All operations</Link>

          <header className="pv-page-head" style={{ marginTop: "16px" }}>
            <div className="pv-mono-label">PV Operations · Events</div>
            <h1>PV <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>events</em></h1>
            <p className="deck">Workshops, open houses, AI training sessions. RSVPs in, check-in at the door, export attendee list for follow-up.</p>
          </header>

          {!activeEvent && (
            <>
              <button onClick={() => setCreating(!creating)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginBottom: "20px" }}>
                {creating ? "Cancel" : "+ Create event"}
              </button>

              {creating && (
                <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <Input label="Event name" value={eventForm.name} onChange={(v) => setEventForm({ ...eventForm, name: v })} placeholder="e.g., AI for Small Business Workshop" />
                    <Input label="Date" type="date" value={eventForm.date} onChange={(v) => setEventForm({ ...eventForm, date: v })} />
                    <Input label="Time" type="time" value={eventForm.time} onChange={(v) => setEventForm({ ...eventForm, time: v })} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <Input label="Location" value={eventForm.location} onChange={(v) => setEventForm({ ...eventForm, location: v })} placeholder="e.g., Cobb County Library Marietta branch" />
                    <Input label="Capacity" type="number" value={String(eventForm.capacity)} onChange={(v) => setEventForm({ ...eventForm, capacity: Number(v) || 0 })} />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={inputLabel}>Description</label>
                    <textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} style={{ ...fieldStyle, minHeight: "60px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }} placeholder="Workshop description, what attendees will learn, who should come..." />
                  </div>
                  <button onClick={createEvent} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Create event</button>
                </div>
              )}

              {events.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>No events yet. Create your first workshop or open house.</p>
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {events.map((e) => (
                    <div key={e.id} onClick={() => setActiveEventId(e.id)} style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>{e.name}</h3>
                          <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
                            {e.date} at {e.time} · {e.location || "no location set"}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-accent)", fontWeight: 700 }}>{e.rsvps.length} / {e.capacity}</div>
                          <div style={{ fontSize: "10px", color: "var(--color-warm-text-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{e.rsvps.filter((r) => r.checkedIn).length} checked in</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeEvent && (
            <>
              <button onClick={() => setActiveEventId(null)} style={{ ...ghostBtn, marginBottom: "16px" }}>← Back to events</button>

              <div style={{ marginBottom: "24px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 6px", fontWeight: 700 }}>{activeEvent.name}</h2>
                <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "12px" }}>{activeEvent.date} at {activeEvent.time} · {activeEvent.location}</div>
                {activeEvent.description && <p style={{ fontSize: "13px", color: "var(--color-warm-text)", margin: 0, lineHeight: 1.6 }}>{activeEvent.description}</p>}
                <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                  <button onClick={() => exportEventRSVPs(activeEvent)} style={ghostBtn}>Export RSVPs CSV</button>
                  <select value={activeEvent.status} onChange={(e) => updateEventStatus(activeEvent.id, e.target.value as Event["status"])} style={{ ...fieldStyle, width: "auto" }}>
                    <option>Upcoming</option><option>Past</option><option>Cancelled</option>
                  </select>
                  <button onClick={() => deleteEvent(activeEvent.id)} style={{ ...ghostBtn, color: "#e54a28", borderColor: "#e54a28" }}>Delete event</button>
                </div>
              </div>

              <h3 style={sectionHead}>Add RSVP</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "8px", alignItems: "end", marginBottom: "24px" }}>
                <Input label="Name" value={rsvpForm.name} onChange={(v) => setRsvpForm({ ...rsvpForm, name: v })} />
                <Input label="Email" type="email" value={rsvpForm.email} onChange={(v) => setRsvpForm({ ...rsvpForm, email: v })} />
                <Input label="Phone" value={rsvpForm.phone} onChange={(v) => setRsvpForm({ ...rsvpForm, phone: v })} />
                <button onClick={() => addRsvp(activeEvent.id)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", padding: "10px 16px" }}>+ Add</button>
              </div>

              <h3 style={sectionHead}>Attendees ({activeEvent.rsvps.length}, {activeEvent.rsvps.filter((r) => r.checkedIn).length} checked in)</h3>
              {activeEvent.rsvps.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No RSVPs yet.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                      <th style={{ ...th, width: "60px" }}>Check-in</th>
                      <th style={th}>Name</th>
                      <th style={th}>Email</th>
                      <th style={th}>Phone</th>
                      <th style={th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeEvent.rsvps.map((r) => (
                      <tr key={r.id} style={{ borderBottom: "1px solid var(--color-warm-border)", background: r.checkedIn ? "rgba(122, 170, 106, 0.04)" : undefined }}>
                        <td style={td}><input type="checkbox" checked={r.checkedIn} onChange={() => toggleCheckIn(activeEvent.id, r.id)} style={{ accentColor: "#7aaa6a", width: "20px", height: "20px" }} /></td>
                        <td style={{ ...td, fontWeight: 600 }}>{r.name}</td>
                        <td style={{ ...td, fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{r.email || "—"}</td>
                        <td style={{ ...td, fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{r.phone || "—"}</td>
                        <td style={{ ...td, textAlign: "right" }}><button onClick={() => removeRsvp(activeEvent.id, r.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer" }}>×</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) { return <div><label style={inputLabel}>{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} /></div>; }
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700, marginTop: "24px" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "middle" };
