"use client";

import { useState, useEffect } from "react";
import { PageHero } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { Field, ToolsKicker } from "../_demo/parts";

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
    if (!confirm("Delete this event and all its RSVPs?")) return;
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
  const full = selected ? selected.attendees.length >= selected.capacity : false;

  return (
    <main>
      {!selected ? (
        <PageHero
          kicker={<ToolsKicker>Free tools: booking and scheduling</ToolsKicker>}
          title="Event registration"
          lede="Create an event, collect RSVPs and check guests in at the door. Your events save only on your device."
        />
      ) : (
        <PageHero
          kicker={
            <button type="button" onClick={() => setSelectedId(null)} className="ui-gold" style={{ background: "none", border: 0, padding: 0, font: "inherit", cursor: "pointer", minHeight: 44 }}>
              All events
            </button>
          }
          title={selected.name}
          lede={`${selected.location || "Location to be set"}. ${selected.attendees.length} of ${selected.capacity} registered, ${selected.attendees.filter((a) => a.checkedIn).length} checked in.`}
          meta={[selected.date, selected.time].filter(Boolean).join(" at ") || undefined}
        />
      )}

      <div className={`ui-wrap ${s.body}`}>
        {!selected && (
          <>
            <div className={s.spread} style={{ marginBottom: 24 }}>
              <h2 className={s.sub} style={{ margin: 0 }}>Your events ({events.length})</h2>
              {!creatingEvent && <button type="button" onClick={() => setCreatingEvent(true)} className="ui-btn">Create an event</button>}
            </div>

            {creatingEvent && (
              <div className={s.form}>
                <h3>New event</h3>
                <div className={s.grid3}>
                  <Field label="Event name (required)" value={eventForm.name} onChange={(v) => setEventForm({ ...eventForm, name: v })} placeholder="e.g., AI for Small Business Workshop" />
                  <Field label="Date" type="date" value={eventForm.date} onChange={(v) => setEventForm({ ...eventForm, date: v })} />
                  <Field label="Time" type="time" value={eventForm.time} onChange={(v) => setEventForm({ ...eventForm, time: v })} />
                  <Field label="Location" value={eventForm.location} onChange={(v) => setEventForm({ ...eventForm, location: v })} placeholder="e.g., 123 Main St, Marietta" />
                  <Field label="Capacity" type="number" value={String(eventForm.capacity)} onChange={(v) => setEventForm({ ...eventForm, capacity: Number(v) })} />
                  <Field className={s.full} label="Description" value={eventForm.description} onChange={(v) => setEventForm({ ...eventForm, description: v })} placeholder="What the event covers" />
                </div>
                <div className={s.actions}>
                  <button type="button" onClick={addEvent} className="ui-btn">Create</button>
                  <button type="button" onClick={() => setCreatingEvent(false)} className="ui-btn ui-btn--ghost">Cancel</button>
                </div>
              </div>
            )}

            {events.length === 0 ? (
              <p className={s.empty}>No events yet.</p>
            ) : (
              <div className={s.list}>
                {events.map((e) => (
                  <article key={e.id} className={`${s.item} ${s.clickable}`} onClick={() => setSelectedId(e.id)}>
                    <div className={s.spread}>
                      <div>
                        <h3 className={s.itemName}>{e.name}</h3>
                        <p className={s.itemMeta}>
                          {e.date || "No date"}{e.time && ` at ${e.time}`}, {e.location || "location to be set"}. {e.attendees.length} of {e.capacity} registered.
                        </p>
                        {e.description && <p className="ui-muted" style={{ margin: "8px 0 0" }}>{e.description}</p>}
                      </div>
                      <div className={s.actions} style={{ marginTop: 0 }}>
                        <button type="button" onClick={() => setSelectedId(e.id)} className={s.btn}>Open</button>
                        <button type="button" onClick={(ev) => { ev.stopPropagation(); deleteEvent(e.id); }} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {selected && (
          <>
            <div className={s.form}>
              <h3>RSVP</h3>
              <div className={s.grid3}>
                <Field label="Name (required)" value={registerForm.name} onChange={(v) => setRegisterForm({ ...registerForm, name: v })} />
                <Field label="Email (required)" type="email" value={registerForm.email} onChange={(v) => setRegisterForm({ ...registerForm, email: v })} />
                <Field label="Phone" value={registerForm.phone} onChange={(v) => setRegisterForm({ ...registerForm, phone: v })} />
                <Field className={s.full} label="Notes, such as dietary or accessibility needs" value={registerForm.notes} onChange={(v) => setRegisterForm({ ...registerForm, notes: v })} />
              </div>
              <div className={s.actions}>
                <button type="button" onClick={() => register(selected.id)} className="ui-btn" disabled={full}>
                  {full ? "This event is full" : "Register"}
                </button>
              </div>
            </div>

            <h2 className={s.sub}>Attendees ({selected.attendees.length})</h2>
            {selected.attendees.length === 0 ? (
              <p className={s.empty}>No RSVPs yet.</p>
            ) : (
              <div className={s.list}>
                {selected.attendees.map((a) => (
                  <article key={a.id} className={s.item}>
                    <div className={s.spread}>
                      <div>
                        <h3 className={s.itemName} style={{ fontSize: 19 }}>{a.name}</h3>
                        <p className={s.itemMeta}>{a.email}, {a.phone || "no phone"}</p>
                        {a.notes && <p className="ui-muted ui-small" style={{ margin: "4px 0 0" }}>{a.notes}</p>}
                      </div>
                      <div className={s.actions} style={{ marginTop: 0 }}>
                        <button type="button" onClick={() => toggleCheckIn(selected.id, a.id)} className={`${s.btn} ${a.checkedIn ? s.btnOk : ""}`}>
                          {a.checkedIn ? "Checked in" : "Check in"}
                        </button>
                        <button type="button" onClick={() => removeAttendee(selected.id, a.id)} className={`${s.btn} ${s.btnDanger}`}>Remove</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
