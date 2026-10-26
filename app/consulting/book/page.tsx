"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero, Section, Facts } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. The booking logic is unchanged: the same state,
// the same three steps, the same localStorage copy and the same POST to /api/booking.
// The ids below are what the API receives, so they stay as they were. Only the labels
// shown to the visitor changed.

const SESSION_TYPES = [
  { id: "ai-basics",        label: "AI basics for business",           duration: "2 hours",   tag: "Introductory" },
  { id: "chatgpt-workflow", label: "ChatGPT in your workflow",         duration: "3 hours",   tag: "Hands-on" },
  { id: "ai-marketing",     label: "AI for marketing and social media", duration: "2.5 hours", tag: "Marketing" },
  { id: "automation",       label: "Automating your business",         duration: "4 hours",   tag: "Half day" },
  { id: "custom",           label: "Custom team training",             duration: "Length set by you", tag: "Custom" },
];

const FORMAT = [
  { id: "1on1",      label: "1-on-1",      rate: "$175 an hour" },
  { id: "group",     label: "Small group", rate: "$125 a person" },
  { id: "workshop",  label: "Workshop",    rate: "$2,500 flat, up to 20 people" },
  { id: "corporate", label: "Corporate",   rate: "Quoted for the job" },
];

interface Booking {
  id: string;
  sessionType: string;
  format: string;
  datePreference: string;
  timePreference: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  groupSize: string;
  notes: string;
  status: string;
  createdAt: string;
}

async function saveBooking(booking: Omit<Booking, "id" | "status" | "createdAt">) {
  // Keep a localStorage copy as a fallback / personal log
  try {
    const existing: Booking[] = JSON.parse(localStorage.getItem("pv_bookings") || "[]");
    existing.unshift({ ...booking, id: Date.now().toString(), status: "New", createdAt: new Date().toISOString() });
    localStorage.setItem("pv_bookings", JSON.stringify(existing));
  } catch {
    // localStorage might be full or disabled, that's fine, the email is the real channel
  }
  // Real delivery: POST to the booking API which emails via Resend
  try {
    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
  } catch (err) {
    console.error("Booking submit failed:", err);
  }
}

const STEPS = ["Session", "Logistics", "Contact"];

// A full-width choice: the kit button, filled when chosen, outlined when not.
const choiceStyle = { width: "100%", justifyContent: "space-between", textAlign: "left" as const, minHeight: 56, flexWrap: "wrap" as const };
const disabledStyle = (on: boolean) => (on ? undefined : { opacity: 0.4, cursor: "not-allowed" });
const twoUp = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 };

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState("");
  const [format, setFormat] = useState("");
  const [datePreference, setDatePreference] = useState("");
  const [timePreference, setTimePreference] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await saveBooking({ sessionType, format, datePreference, timePreference, name, business, email, phone, groupSize, notes });
    setSubmitted(true);
  };

  const step1Done = !!sessionType;
  const step2Done = !!format && !!datePreference;
  const step3Done = !!name && !!phone;

  return (
    <main>
      <PageHero
        planet="book"
        kicker="AI consulting"
        title="Session booking"
        lede="Three short steps. I reply within one business day to confirm the details."
        meta={submitted ? undefined : `Step ${step} of 3: ${STEPS[step - 1]}`}
      />

      {submitted ? (
        <Section title="Request received">
          <div className="ui-prose">
            <p>I will contact you within one business day to confirm the session and settle the details.</p>
            <p>
              <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <br />
              <a className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
            </p>
          </div>
          <div className="ui-hero__actions">
            <Link className="ui-btn ui-btn--ghost" href="/consulting">Back to consulting</Link>
          </div>
        </Section>
      ) : step === 1 ? (
        <Section title="Five sessions" intro="Pick the closest session. I adjust it to your business.">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SESSION_TYPES.map((s) => {
              const isActive = sessionType === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSessionType(s.id)}
                  className={`ui-btn${isActive ? "" : " ui-btn--ghost"}`}
                  style={choiceStyle}
                >
                  <span>{s.label}</span>
                  <span style={{ fontWeight: 400 }}>{s.tag}, {s.duration}</span>
                </button>
              );
            })}
          </div>
          <div className="ui-hero__actions">
            <button type="button" className="ui-btn" onClick={() => setStep(2)} disabled={!step1Done} style={disabledStyle(step1Done)}>
              Next: logistics
            </button>
          </div>
        </Section>
      ) : step === 2 ? (
        <Section title="Logistics" intro="Format, group size and timing.">
          <p className="ui-muted ui-small" style={{ margin: "0 0 10px" }}>Format</p>
          <div style={{ ...twoUp, gap: 10 }}>
            {FORMAT.map((f) => {
              const isActive = format === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFormat(f.id)}
                  className={`ui-btn${isActive ? "" : " ui-btn--ghost"}`}
                  style={choiceStyle}
                >
                  <span>{f.label}</span>
                  <span style={{ fontWeight: 400 }}>{f.rate}</span>
                </button>
              );
            })}
          </div>

          {(format === "group" || format === "workshop" || format === "corporate") && (
            <div className="ui-field" style={{ marginTop: 24 }}>
              <label htmlFor="bk-size">Group size, as a rough count</label>
              <input id="bk-size" placeholder="For example, 8 people" value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
            </div>
          )}

          <div style={{ ...twoUp, marginTop: 24 }}>
            <div className="ui-field">
              <label htmlFor="bk-date">Date preference</label>
              <input id="bk-date" placeholder="For example, any Tuesday in April" value={datePreference} onChange={(e) => setDatePreference(e.target.value)} />
            </div>
            <div className="ui-field">
              <label htmlFor="bk-time">Time of day</label>
              <input id="bk-time" placeholder="For example, mornings or after 2pm" value={timePreference} onChange={(e) => setTimePreference(e.target.value)} />
            </div>
          </div>

          <div className="ui-hero__actions">
            <button type="button" className="ui-btn ui-btn--ghost" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="ui-btn" onClick={() => setStep(3)} disabled={!step2Done} style={disabledStyle(step2Done)}>
              Next: contact
            </button>
          </div>
        </Section>
      ) : (
        <Section title="Contact details" intro="How I reach you to confirm.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={twoUp}>
              <div className="ui-field">
                <label htmlFor="bk-name">Your name (required)</label>
                <input id="bk-name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="ui-field">
                <label htmlFor="bk-biz">Business name</label>
                <input id="bk-biz" value={business} onChange={(e) => setBusiness(e.target.value)} />
              </div>
            </div>
            <div style={twoUp}>
              <div className="ui-field">
                <label htmlFor="bk-phone">Phone number (required)</label>
                <input id="bk-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="ui-field">
                <label htmlFor="bk-email">Email</label>
                <input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="ui-field">
              <label htmlFor="bk-notes">Anything else I should know</label>
              <textarea
                id="bk-notes"
                rows={4}
                style={{ resize: "vertical" }}
                placeholder="The tools you use, or a specific problem"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <p className="ui-muted ui-small" style={{ margin: "0 0 10px" }}>Your booking</p>
            <Facts
              items={[
                ["Session", SESSION_TYPES.find((s) => s.id === sessionType)?.label],
                ["Format", FORMAT.find((f) => f.id === format)?.label],
                ...(groupSize ? ([["Group size", groupSize]] as [string, string][]) : []),
                ["Date", datePreference],
                ...(timePreference ? ([["Time", timePreference]] as [string, string][]) : []),
              ]}
            />
          </div>

          <div className="ui-hero__actions">
            <button type="button" className="ui-btn ui-btn--ghost" onClick={() => setStep(2)}>Back</button>
            <button type="button" className="ui-btn" onClick={handleSubmit} disabled={!step3Done} style={disabledStyle(step3Done)}>
              Request booking
            </button>
          </div>
        </Section>
      )}
    </main>
  );
}
