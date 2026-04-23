"use client";

import { useState } from "react";

const SESSION_TYPES = [
  { id: "ai-basics",        label: "AI Basics for Business",    duration: "2 hrs",     tag: "Intro" },
  { id: "chatgpt-workflow", label: "ChatGPT in Your Workflow",  duration: "3 hrs",     tag: "Hands-On" },
  { id: "ai-marketing",    label: "AI for Marketing & Social", duration: "2.5 hrs",   tag: "Marketing" },
  { id: "automation",      label: "Automating Your Business",  duration: "4 hrs",     tag: "Half-Day" },
  { id: "custom",          label: "Custom Team Training",       duration: "Flexible",  tag: "Custom" },
];

const FORMAT = [
  { id: "1on1",     label: "1-on-1",         rate: "$100/hr" },
  { id: "group",    label: "Small Group",    rate: "$55/person" },
  { id: "workshop", label: "Workshop",       rate: "$40/person" },
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

function saveBooking(booking: Omit<Booking, "id" | "status" | "createdAt">) {
  const existing: Booking[] = JSON.parse(localStorage.getItem("pv_bookings") || "[]");
  existing.unshift({ ...booking, id: Date.now().toString(), status: "New", createdAt: new Date().toISOString() });
  localStorage.setItem("pv_bookings", JSON.stringify(existing));
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

  const handleSubmit = () => {
    saveBooking({ sessionType, format, datePreference, timePreference, name, business, email, phone, groupSize, notes });
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", background: "#161412",
    border: "1px solid #2e2820", borderRadius: "6px",
    color: "#f5f0e0", fontSize: "14px", fontFamily: "Inter, sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  const step1Done = !!sessionType;
  const step2Done = !!format && !!datePreference;
  const step3Done = !!name && !!phone;

  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", gap: "16px", borderBottom: "1px solid #2e2820" }}>
        <a href="/consulting" style={{ fontSize: "12px", color: "#524d45", textDecoration: "none" }}>← Consulting</a>
        <span style={{ color: "#2e2820" }}>|</span>
        <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 700, color: "#f5f0e0" }}>Book a Session</span>
      </nav>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "56px 24px 80px" }}>

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
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "#d4af37", marginBottom: "16px" }}>You're booked.</div>
            <p style={{ fontSize: "15px", color: "#8a8070", lineHeight: 1.8, maxWidth: "440px", margin: "0 auto 32px" }}>
              Elijah will reach out within 24 hours to confirm and lock in the details.
            </p>
            <div style={{ fontSize: "13px", color: "#524d45" }}>elijah@purcell-ventures.com · (770) 280-5319</div>
            <a href="/consulting" style={{ display: "inline-block", marginTop: "24px", fontSize: "13px", color: "#d4af37", textDecoration: "none" }}>← Back to Consulting</a>
          </div>
        ) : step === 1 ? (
          <div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Pick a session.</h1>
            <p style={{ fontSize: "14px", color: "#8a8070", marginBottom: "28px" }}>Every session is customized to your business — this just tells me where to start.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
              {SESSION_TYPES.map(s => (
                <button key={s.id} onClick={() => setSessionType(s.id)} style={{
                  padding: "16px 20px", background: sessionType === s.id ? "#1e1a14" : "#0e0c0a",
                  border: `1px solid ${sessionType === s.id ? "#d4af37" : "#2e2820"}`,
                  borderRadius: "8px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>{s.label}</div>
                    <div style={{ fontSize: "12px", color: "#6a6458", marginTop: "2px" }}>{s.duration}</div>
                  </div>
                  <span style={{ fontSize: "11px", color: "#d4af37", background: "#d4af3715", padding: "3px 9px", borderRadius: "20px" }}>{s.tag}</span>
                  {sessionType === s.id && <span style={{ color: "#d4af37", fontSize: "16px" }}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} disabled={!step1Done} style={{
              padding: "13px 28px", background: step1Done ? "#d4af37" : "#1a1714",
              color: step1Done ? "#0c0a08" : "#3a3530", fontWeight: 700, fontSize: "14px",
              border: "none", borderRadius: "6px", cursor: step1Done ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif",
            }}>Next: Logistics →</button>
          </div>
        ) : step === 2 ? (
          <div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Logistics.</h1>
            <p style={{ fontSize: "14px", color: "#8a8070", marginBottom: "28px" }}>Format, size, and when works for you.</p>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "10px" }}>Format</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {FORMAT.map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)} style={{
                    padding: "14px 16px", background: format === f.id ? "#1e1a14" : "#0e0c0a",
                    border: `1px solid ${format === f.id ? "#d4af37" : "#2e2820"}`,
                    borderRadius: "7px", cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>{f.label}</div>
                    <div style={{ fontSize: "11px", color: "#6a6458", marginTop: "2px" }}>{f.rate}</div>
                  </button>
                ))}
              </div>
            </div>

            {(format === "group" || format === "workshop" || format === "corporate") && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "10px" }}>Approx. group size</div>
                <input style={inputStyle} placeholder="e.g. 8 people" value={groupSize} onChange={e => setGroupSize(e.target.value)} />
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "10px" }}>Date preference</div>
                <input style={inputStyle} placeholder="e.g. Any Tuesday in April" value={datePreference} onChange={e => setDatePreference(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#524d45", marginBottom: "10px" }}>Time of day</div>
                <input style={inputStyle} placeholder="e.g. Morning, after 2pm" value={timePreference} onChange={e => setTimePreference(e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={{ padding: "13px 20px", background: "none", border: "1px solid #2e2820", color: "#8a8070", fontWeight: 600, fontSize: "14px", borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>← Back</button>
              <button onClick={() => setStep(3)} disabled={!step2Done} style={{
                padding: "13px 28px", background: step2Done ? "#d4af37" : "#1a1714",
                color: step2Done ? "#0c0a08" : "#3a3530", fontWeight: 700, fontSize: "14px",
                border: "none", borderRadius: "6px", cursor: step2Done ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif",
              }}>Next: Contact Info →</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Last step.</h1>
            <p style={{ fontSize: "14px", color: "#8a8070", marginBottom: "28px" }}>How to reach you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input required style={inputStyle} placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} />
                <input style={inputStyle} placeholder="Business name" value={business} onChange={e => setBusiness(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input required style={inputStyle} placeholder="Phone number *" value={phone} onChange={e => setPhone(e.target.value)} />
                <input style={inputStyle} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} placeholder="Anything else I should know? (tools you use, specific pain points, etc.)" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            {/* Summary */}
            <div style={{ padding: "16px 20px", background: "#0e0c0a", border: "1px solid #2e2820", borderRadius: "8px", marginBottom: "24px", fontSize: "13px", color: "#8a8070", lineHeight: 2 }}>
              <span style={{ color: "#d4af37", fontWeight: 600 }}>Session:</span> {SESSION_TYPES.find(s => s.id === sessionType)?.label} · {FORMAT.find(f => f.id === format)?.label}
              {groupSize && <> · {groupSize}</>} · {datePreference}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(2)} style={{ padding: "13px 20px", background: "none", border: "1px solid #2e2820", color: "#8a8070", fontWeight: 600, fontSize: "14px", borderRadius: "6px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>← Back</button>
              <button onClick={handleSubmit} disabled={!step3Done} style={{
                padding: "13px 28px", background: step3Done ? "#d4af37" : "#1a1714",
                color: step3Done ? "#0c0a08" : "#3a3530", fontWeight: 700, fontSize: "14px",
                border: "none", borderRadius: "6px", cursor: step3Done ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", flex: 1,
              }}>Request Booking →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
