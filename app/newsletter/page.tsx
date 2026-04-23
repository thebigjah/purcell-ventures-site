"use client";

import { useState } from "react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  businessType: string;
  createdAt: string;
}

function saveSubscriber(data: Omit<Subscriber, "id" | "createdAt">) {
  const existing: Subscriber[] = JSON.parse(localStorage.getItem("pv_newsletter") || "[]");
  if (existing.some(s => s.email === data.email)) return;
  existing.unshift({ ...data, id: Date.now().toString(), createdAt: new Date().toISOString() });
  localStorage.setItem("pv_newsletter", JSON.stringify(existing));
}

const BUSINESS_TYPES = [
  "Salon / Barber Shop", "Restaurant / Food", "HVAC / Plumbing / Trades",
  "Retail", "Healthcare / Wellness", "Real Estate",
  "Professional Services", "Other",
];

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveSubscriber({ name, email, businessType });
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "#141210",
    border: "1px solid #2e2820", borderRadius: "7px",
    color: "#f5f0e0", fontSize: "14px", fontFamily: "Inter, sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2e2820" }}>
        <a href="/" style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#f5f0e0", textDecoration: "none" }}>
          Purcell <span style={{ color: "#d4af37" }}>Ventures</span>
        </a>
        <a href="/" style={{ fontSize: "12px", color: "#524d45", textDecoration: "none" }}>← Home</a>
      </nav>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "16px" }}>Newsletter</p>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "20px" }}>
          AI for local business.<br />
          <span style={{ color: "#d4af37" }}>In plain English.</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#8a8070", lineHeight: 1.8, marginBottom: "48px", maxWidth: "480px" }}>
          Practical tools, honest takes, and real examples of how small businesses are using AI to save time and grow. No fluff. Once a week.
        </p>

        {/* What to expect */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {[
            { title: "Tool of the week", desc: "One AI tool, how to use it, how much it costs." },
            { title: "Real case studies", desc: "Actual businesses, actual results. Not hypotheticals." },
            { title: "Prompts you can use", desc: "Copy-paste prompts built for small business owners." },
            { title: "No spam. Ever.", desc: "One email per week. Unsubscribe anytime." },
          ].map(item => (
            <div key={item.title} style={{ padding: "18px 20px", background: "#0e0c0a", border: "1px solid #2e2820", borderRadius: "8px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginBottom: "6px" }}>{item.title}</div>
              <div style={{ fontSize: "12px", color: "#6a6458", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div style={{ padding: "40px 32px", background: "#0e0c0a", border: "1px solid #d4af3740", borderRadius: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#d4af37", marginBottom: "10px" }}>You're in.</div>
            <p style={{ fontSize: "14px", color: "#8a8070" }}>First issue lands next week. Talk soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input required style={inputStyle} placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} />
              <input required type="email" style={inputStyle} placeholder="Email address *" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <select style={{ ...inputStyle, appearance: "none" }} value={businessType} onChange={e => setBusinessType(e.target.value)}>
              <option value="">What type of business? (optional)</option>
              {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <button type="submit" disabled={loading} style={{
              padding: "14px 24px", background: "#d4af37", color: "#0c0a08",
              fontSize: "15px", fontWeight: 700, borderRadius: "7px", border: "none",
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              fontFamily: "Inter, sans-serif",
            }}>
              {loading ? "Subscribing..." : "Subscribe — It's Free →"}
            </button>
          </form>
        )}

        <p style={{ fontSize: "11px", color: "#3a3530", marginTop: "16px", textAlign: "center" }}>
          No spam. One email per week. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
