"use client";

import { useState } from "react";

const SERVICES = [
  "Digital Services (website, chatbot, booking, etc.)",
  "AI Consulting / Team Training",
  "Custom Software / App Development",
  "Field Services (gutters, pressure washing, lawn care)",
  "Not sure — just exploring",
];

interface Lead {
  id: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: string;
  notes: string;
  followUp: string;
  createdAt: string;
}

function saveLead(lead: Omit<Lead, "id" | "status" | "notes" | "followUp" | "createdAt">) {
  const existing: Lead[] = JSON.parse(localStorage.getItem("pv_leads") || "[]");
  existing.unshift({
    ...lead,
    id: Date.now().toString(),
    status: "New",
    notes: "",
    followUp: "",
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("pv_leads", JSON.stringify(existing));
}

export default function LeadCaptureForm({ title = "Get a Free Quote", subtitle = "We'll get back to you within 24 hours." }: {
  title?: string;
  subtitle?: string;
}) {
  const [form, setForm] = useState({ name: "", business: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveLead(form);
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", background: "var(--color-warm-card)",
    border: "1px solid var(--color-warm-border)", borderRadius: "6px",
    color: "var(--color-warm-text)", fontSize: "14px", fontFamily: "Inter, sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  if (submitted) return (
    <div style={{ padding: "40px 28px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border-light)", borderRadius: "10px", textAlign: "center" }}>
      <div style={{ fontSize: "28px", marginBottom: "12px" }}>✓</div>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>Got it.</div>
      <div style={{ fontSize: "14px", color: "var(--color-warm-text-muted)" }}>We'll be in touch within 24 hours. In the meantime: (770) 280-5319.</div>
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "10px" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "4px" }}>{title}</div>
      <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "24px" }}>{subtitle}</div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <input required style={inputStyle} placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} />
          <input style={inputStyle} placeholder="Business name (optional)" value={form.business} onChange={e => set("business", e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <input required style={inputStyle} placeholder="Phone number" value={form.phone} onChange={e => set("phone", e.target.value)} />
          <input style={inputStyle} placeholder="Email (optional)" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <select required style={{ ...inputStyle, appearance: "none" }} value={form.service} onChange={e => set("service", e.target.value)}>
          <option value="">What are you interested in?</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} placeholder="Anything else we should know? (optional)" value={form.message} onChange={e => set("message", e.target.value)} />
        <button type="submit" disabled={loading} style={{
          padding: "13px 24px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)",
          fontSize: "14px", fontWeight: 700, borderRadius: "6px", border: "none",
          cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          fontFamily: "Inter, sans-serif", letterSpacing: "0.02em",
        }}>
          {loading ? "Sending..." : "Send Request →"}
        </button>
      </form>
    </div>
  );
}
