"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  notes: string;
  checkedIn: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  attendees: Attendee[];
}

const KEY = "pv_events_v1";

export default function EventRegistrationPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventForm, setEventForm] = useState({ name: "", date: "", time: "", location: "", capacity: 25, description: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", phone: "", notes: "" });

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setEvents(JSON.parse(raw));
  }, []);

  function save(updated: Event[]) {
    setEvents(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function addEvent() {
    if (!eventForm.name.trim()) return;
    const e: Event = { id: crypto.randomUUID(), ...eventForm, attendees: [] };
    save([e, ...events]);
    setCreatingEvent(false);
    setEventForm({ name: "", date: "", time: "", location: "", capacity: 25, description: "" });
  }

  function deleteEvent(id: string) {
    if (!confirm("Delete this event and all RSVPs?")) return;
    save(events.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function register(eventId: string) {
    if (!registerForm.name.trim() || !registerForm.email.trim()) return;
    const a: Attendee = { id: crypto.randomUUID(), ...registerForm, registeredAt: new Date().toISOString(), checkedIn: false };
    save(events.map((e) => e.id === eventId ? { ...e, attendees: [...e.attendees, a] } : e));
    setRegisterForm({ name: "", email: "", phone: "", notes: "" });
  }

  function toggleCheckIn(eventId: string, attendeeId: string) {
    save(events.map((e) => e.id === eventId ? { ...e, attendees: e.attendees.map((a) => a.id === attendeeId ? { ...a, checkedIn: !a.checkedIn } : a) } : e));
  }

  function removeAttendee(eventId: string, attendeeId: string) {
    if (!confirm("Remove this attendee?")) return;
    save(events.map((e) => e.id === eventId ? { ...e, attendees: e.attendees.filter((a) => a.id !== attendeeId) } : e));
  }

  const selected = events.find((e) => e.id === selectedId);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>
        <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All tools</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Booking · Event Registration</div>
          <h1>
            Event <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>RSVPs</em>
          </h1>
          <p className="deck">
            Create events. Collect RSVPs. Check people in at the door. Stays on this device.
          </p>
        </header>

        {!selected && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>Your events ({events.length})</h2>
              {!creatingEvent && <button onClick={() => setCreatingEvent(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Event</button>}
            </div>

            {creatingEvent && (
              <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px" }}>
                  <Input label="Event name *" value={eventForm.name} onChange={(v) => setEventForm({ ...eventForm, name: v })} placeholder="e.g., AI for Small Business Workshop" />
                  <Input label="Date" type="date" value={eventForm.date} onChange={(v) => setEventForm({ ...eventForm, date: v })} />
                  <Input label="Time" type="time" value={eventForm.time} onChange={(v) => setEventForm({ ...eventForm, time: v })} />
                  <Input label="Location" value={eventForm.location} onChange={(v) => setEventForm({ ...eventForm, location: v })} placeholder="e.g., 123 Main St, Marietta" />
                  <Input label="Capacity" type="number" value={String(eventForm.capacity)} onChange={(v) => setEventForm({ ...eventForm, capacity: Number(v) })} />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Input label="Description" value={eventForm.description} onChange={(v) => setEventForm({ ...eventForm, description: v })} placeholder="What's the event about?" />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button onClick={addEvent} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Create</button>
                  <button onClick={() => setCreatingEvent(false)} className="pv-btn-ghost" style={{ cursor: "pointer", background: "transparent" }}>Cancel</button>
                </div>
              </div>
            )}

            {events.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "40px", fontStyle: "italic" }}>No events yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {events.map((e) => (
                  <div key={e.id} className="pv-card" style={{ cursor: "pointer" }} onClick={() => setSelectedId(e.id)}>
                    <span className="b3"></span><span className="b4"></span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>{e.name}</h3>
                        <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
                          {e.date} {e.time && `at ${e.time}`} · {e.location || "TBD"} · {e.attendees.length}/{e.capacity} registered
                        </div>
                        {e.description && <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "8px 0 0", lineHeight: 1.5 }}>{e.description}</p>}
                      </div>
                      <button onClick={(ev) => { ev.stopPropagation(); deleteEvent(e.id); }} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "16px" }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selected && (
          <>
            <button onClick={() => setSelectedId(null)} style={{ marginBottom: "16px", background: "transparent", border: "none", color: "var(--color-warm-text-muted)", cursor: "pointer", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", padding: 0 }}>← All events</button>

            <header className="pv-page-head">
              <div className="pv-mono-label">{selected.date} {selected.time}</div>
              <h1>{selected.name}</h1>
              <p className="deck">{selected.location} · {selected.attendees.length} / {selected.capacity} registered · {selected.attendees.filter((a) => a.checkedIn).length} checked in</p>
            </header>

            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 16px" }}>RSVP</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <Input label="Name *" value={registerForm.name} onChange={(v) => setRegisterForm({ ...registerForm, name: v })} />
                <Input label="Email *" type="email" value={registerForm.email} onChange={(v) => setRegisterForm({ ...registerForm, email: v })} />
                <Input label="Phone" value={registerForm.phone} onChange={(v) => setRegisterForm({ ...registerForm, phone: v })} />
                <div style={{ gridColumn: "1 / -1" }}>
                  <Input label="Notes (dietary, accessibility, etc.)" value={registerForm.notes} onChange={(v) => setRegisterForm({ ...registerForm, notes: v })} />
                </div>
              </div>
              <button onClick={() => register(selected.id)} className="pv-btn-primary" style={{ marginTop: "16px", border: "none", cursor: "pointer" }} disabled={selected.attendees.length >= selected.capacity}>
                {selected.attendees.length >= selected.capacity ? "Capacity reached" : "Register"}
              </button>
            </div>

            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 16px" }}>Attendees ({selected.attendees.length})</h3>
            {selected.attendees.length === 0 ? (
              <p style={{ color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>No RSVPs yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "8px" }}>
                {selected.attendees.map((a) => (
                  <div key={a.id} style={{ padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: `1px solid ${a.checkedIn ? "#7aaa6a" : "var(--color-warm-border)"}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600, fontSize: "15px" }}>{a.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{a.email} · {a.phone || "no phone"}</div>
                      {a.notes && <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", marginTop: "4px" }}>{a.notes}</div>}
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => toggleCheckIn(selected.id, a.id)} style={{ padding: "6px 10px", border: `1px solid ${a.checkedIn ? "#7aaa6a" : "var(--color-warm-border)"}`, background: "transparent", color: a.checkedIn ? "#7aaa6a" : "var(--color-warm-text-muted)", cursor: "pointer", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>
                        {a.checkedIn ? "✓ In" : "Check in"}
                      </button>
                      <button onClick={() => removeAttendee(selected.id, a.id)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "16px" }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
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
