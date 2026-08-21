"use client";

import { useState } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const SESSION_TYPES = [
  { id: "ai-basics",        label: "AI Basics for Business",    duration: "2 hrs",     tag: "Intro" },
  { id: "chatgpt-workflow", label: "ChatGPT in Your Workflow",  duration: "3 hrs",     tag: "Hands-On" },
  { id: "ai-marketing",    label: "AI for Marketing & Social", duration: "2.5 hrs",   tag: "Marketing" },
  { id: "automation",      label: "Automating Your Business",  duration: "4 hrs",     tag: "Half-Day" },
  { id: "custom",          label: "Custom Team Training",       duration: "Flexible",  tag: "Custom" },
];

const FORMAT = [
  { id: "1on1",     label: "1-on-1",         rate: "$175/hr" },
  { id: "group",    label: "Small Group",    rate: "$125/person" },
  { id: "workshop", label: "Workshop",       rate: "$2,500 flat" },
  { id: "corporate",label: "Corporate",      rate: "Custom quote" },
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
    // localStorage might be full or disabled — that's fine, the email is the real channel
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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", background: "#161412",
    border: "1px solid #2e2820", borderRadius: 0,
    color: "#f5f0e0", fontSize: "14px", fontFamily: "Georgia, serif", fontStyle: "italic",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
    fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.28em", textTransform: "uppercase",
    color: "var(--color-warm-accent)",
    marginBottom: "10px",
  };

  const stepHeaderStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
    fontSize: "32px", letterSpacing: "0.02em",
    color: "var(--color-warm-text)", textTransform: "uppercase",
    marginBottom: "10px", lineHeight: 1.1,
  };

  const stepDeckStyle: React.CSSProperties = {
    fontFamily: "Georgia, serif", fontStyle: "italic",
    fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85,
    marginBottom: "28px",
  };

  const step1Done = !!sessionType;
  const step2Done = !!format && !!datePreference;
  const step3Done = !!name && !!phone;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden", fontFamily: "Inter, sans-serif" }}>
      <VignetteBackground />

      <div style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "56px 36px 96px" }}>

        {/* Editorial page-head */}
        <header className="pv-page-head" style={{ marginBottom: "40px" }}>
          <div className="pv-mono-label">Consulting · Booking</div>
          <h1 style={{ margin: 0 }}>
            Book a <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>session.</em>
          </h1>
          <p className="deck">
            Three short steps. I&apos;ll reach out within 24 hours to confirm.
          </p>
        </header>

        {/* Progress */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px" }}>
          {["Session", "Logistics", "Contact"].map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                  background: done ? "#d4af37" : active ? "#d4af3720" : "#1a1714",
                  border: `1px solid ${done || active ? "#d4af37" : "#2e2820"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700,
                  color: done ? "#0c0a08" : active ? "#d4af37" : "#524d45",
                }}>
                  {done ? "✓" : n}
                </div>
                <span style={{ fontSize: "12px", color: active ? "#f5f0e0" : "#524d45", fontWeight: active ? 600 : 400 }}>{label}</span>
                {i < 2 && <div style={{ flex: 1, height: "1px", background: done ? "#d4af37" : "#2e2820" }} />}
              </div>
            );
          })}
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "56px 24px" }}>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)", fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7 }}></div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "20px", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              You&apos;re <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>booked.</em>
            </div>
            <p className="pv-italic" style={{ fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, maxWidth: "460px", margin: "0 auto 32px" }}>
              Elijah will reach out within 24 hours to confirm and lock in the details.
            </p>
            <div className="pv-mono-label" style={{ marginBottom: "24px", color: "var(--color-warm-text-light)" }}>
              elijah@purcell-ventures.com · (205) 462-7839
            </div>
            <a href="/consulting" className="pv-btn-ghost">← Back to consulting</a>
          </div>
        ) : step === 1 ? (
          <div>
            <h1 style={stepHeaderStyle}>Pick a <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>session.</em></h1>
            <p style={stepDeckStyle}>Every session is customized to your business — this just tells me where to start.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {SESSION_TYPES.map(s => {
                const isActive = sessionType === s.id;
                return (
                  <button key={s.id} onClick={() => setSessionType(s.id)} style={{
                    padding: "18px 22px", background: isActive ? "#1e1a14" : "var(--color-warm-bg-alt)",
                    border: `1.5px solid ${isActive ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                    borderRadius: 0, cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "16px",
                    transition: "background 0.12s, border-color 0.12s",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.02em" }}>
                        {s.label}
                      </div>
                      <div className="pv-mono-label" style={{ marginTop: "6px", color: "var(--color-warm-text-light)", letterSpacing: "0.22em" }}>
                        {s.duration}
                      </div>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      fontSize: "10px", fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      padding: "4px 10px",
                      border: `1.5px solid ${isActive ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                      color: isActive ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)",
                    }}>
                      {s.tag}
                    </span>
                    {isActive && <span style={{ color: "var(--color-warm-accent)", fontSize: "18px" }}>✓</span>}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(2)} disabled={!step1Done}
              className={step1Done ? "pv-btn-primary" : ""}
              style={step1Done ? {} : {
                padding: "13px 32px", background: "#1a1714",
                color: "#3a3530", fontWeight: 700, fontSize: "11px",
                border: "none", borderRadius: 0, cursor: "not-allowed",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                letterSpacing: "0.28em", textTransform: "uppercase",
              }}
            >
              Next: Logistics →
            </button>
          </div>
        ) : step === 2 ? (
          <div>
            <h1 style={stepHeaderStyle}>Logistics.</h1>
            <p style={stepDeckStyle}>Format, size, and when works for you.</p>

            <div style={{ marginBottom: "28px" }}>
              <div style={labelStyle}>Format</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {FORMAT.map(f => {
                  const isActive = format === f.id;
                  return (
                    <button key={f.id} onClick={() => setFormat(f.id)} style={{
                      padding: "16px 18px",
                      background: isActive ? "#1e1a14" : "var(--color-warm-bg-alt)",
                      border: `1.5px solid ${isActive ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                      borderRadius: 0, cursor: "pointer", textAlign: "left",
                    }}>
                      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.02em" }}>
                        {f.label}
                      </div>
                      <div className="pv-mono-label" style={{ marginTop: "4px", color: isActive ? "var(--color-warm-accent)" : "var(--color-warm-text-light)" }}>
                        {f.rate}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {(format === "group" || format === "workshop" || format === "corporate") && (
              <div style={{ marginBottom: "24px" }}>
                <div style={labelStyle}>Approx. group size</div>
                <input style={inputStyle} placeholder="e.g. 8 people" value={groupSize} onChange={e => setGroupSize(e.target.value)} />
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              <div>
                <div style={labelStyle}>Date preference</div>
                <input style={inputStyle} placeholder="e.g. Any Tuesday in April" value={datePreference} onChange={e => setDatePreference(e.target.value)} />
              </div>
              <div>
                <div style={labelStyle}>Time of day</div>
                <input style={inputStyle} placeholder="e.g. Morning, after 2pm" value={timePreference} onChange={e => setTimePreference(e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} className="pv-btn-ghost">← Back</button>
              <button onClick={() => setStep(3)} disabled={!step2Done}
                className={step2Done ? "pv-btn-primary" : ""}
                style={step2Done ? {} : {
                  padding: "13px 32px", background: "#1a1714",
                  color: "#3a3530", fontWeight: 700, fontSize: "11px",
                  border: "none", borderRadius: 0, cursor: "not-allowed",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  letterSpacing: "0.28em", textTransform: "uppercase",
                }}
              >
                Next: Contact →
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 style={stepHeaderStyle}>Last <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>step.</em></h1>
            <p style={stepDeckStyle}>How to reach you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <input required style={inputStyle} placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} />
                <input style={inputStyle} placeholder="Business name" value={business} onChange={e => setBusiness(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <input required style={inputStyle} placeholder="Phone number *" value={phone} onChange={e => setPhone(e.target.value)} />
                <input style={inputStyle} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "96px" }} placeholder="Anything else I should know? (tools you use, specific pain points, etc.)" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            {/* Summary card with brass corners */}
            <div className="pv-card" style={{ padding: "18px 22px", marginBottom: "24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "8px" }}>Your booking</div>
              <div className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.92, lineHeight: 1.6 }}>
                <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontStyle: "normal", color: "var(--color-warm-accent)" }}>{SESSION_TYPES.find(s => s.id === sessionType)?.label}</strong>
                {" · "}{FORMAT.find(f => f.id === format)?.label}
                {groupSize && <> · {groupSize}</>}
                {" · "}{datePreference}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(2)} className="pv-btn-ghost">← Back</button>
              <button onClick={handleSubmit} disabled={!step3Done}
                className={step3Done ? "pv-btn-primary" : ""}
                style={step3Done ? { flex: 1 } : {
                  flex: 1, padding: "13px 32px", background: "#1a1714",
                  color: "#3a3530", fontWeight: 700, fontSize: "11px",
                  border: "none", borderRadius: 0, cursor: "not-allowed",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  letterSpacing: "0.28em", textTransform: "uppercase",
                }}
              >
                Request booking →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
