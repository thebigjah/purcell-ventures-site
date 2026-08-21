"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { upsertContact, emptyContact, addActivity } from "@/lib/crm-storage";

interface Intake {
  id: string;
  name: string;
  email: string;
  phone: string;
  helpFor: string; // Yourself / a parent / grandparent / spouse / other
  situation: string;
  urgency: string;
  contactPreference: string;
  location: string;
  hearAbout: string;
  submittedAt: string;
}

const KEY = "pv_steady_intakes_v1";

export default function SteadyStartPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    helpFor: "Yourself",
    situation: "",
    urgency: "This week",
    contactPreference: "Email",
    location: "Metro Atlanta",
    hearAbout: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mailtoLink, setMailtoLink] = useState("");
  const [allIntakes, setAllIntakes] = useState<Intake[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setAllIntakes(JSON.parse(raw));
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.situation.trim()) return;
    if (!form.email.trim() && !form.phone.trim()) {
      alert("Please add either an email or phone number so we can reach you.");
      return;
    }

    const intake: Intake = {
      id: crypto.randomUUID(),
      ...form,
      submittedAt: new Date().toISOString(),
    };
    const updated = [intake, ...allIntakes];
    localStorage.setItem(KEY, JSON.stringify(updated));
    setAllIntakes(updated);

    // Also auto-create a CRM contact so it shows up in the admin pipeline
    try {
      const nameParts = form.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const contact = emptyContact("Elijah"); // Steady intakes default-owned by Elijah (admin)
      contact.firstName = firstName;
      contact.lastName = lastName;
      contact.email = form.email;
      contact.phone = form.phone;
      contact.service = `Steady — ${form.helpFor}`;
      contact.source = `Steady intake form (${form.hearAbout || "direct"})`;
      contact.tags = ["steady", `urgency:${form.urgency.toLowerCase().replace(/\s+/g, "-")}`, `loc:${form.location.toLowerCase().split(" ")[0]}`];
      contact.estimatedValue = form.helpFor === "Yourself" ? 99 : 79; // rough first-touch estimate
      contact.notes = `Steady intake submitted ${new Date().toLocaleString()}.\n\nHelp for: ${form.helpFor}\nUrgency: ${form.urgency}\nContact pref: ${form.contactPreference}\nLocation: ${form.location}\n\nSituation:\n${form.situation}`;
      contact.nextFollowUp = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // tomorrow
      upsertContact(contact);
      addActivity(contact.id, {
        type: "note",
        date: new Date().toISOString(),
        description: "Auto-created from Steady intake form submission",
        outcome: `Urgency: ${form.urgency}. Reach out within 24hrs.`,
      });
    } catch (err) {
      // Don't block the user-visible submission flow if CRM write fails
      console.error("CRM auto-create failed:", err);
    }

    const subject = `Steady intake — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email || "(none)"}`,
      `Phone: ${form.phone || "(none)"}`,
      `Help for: ${form.helpFor}`,
      `Urgency: ${form.urgency}`,
      `Preferred contact: ${form.contactPreference}`,
      `Location: ${form.location}`,
      `Heard about us via: ${form.hearAbout || "(not specified)"}`,
      ``,
      `Situation:`,
      form.situation,
    ].join("\n");
    const mailto = `mailto:elijah@purcell-ventures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoLink(mailto);
    setSubmitted(true);

    // Auto-open mailto in same tab (most users have a default mail client)
    try {
      window.location.href = mailto;
    } catch {
      // ignore, fallback shown on screen
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/steady" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← Back to Steady</Link>

        {!submitted ? (
          <>
            <header className="pv-page-head" style={{ marginTop: "16px" }}>
              <div className="pv-mono-label">Steady · Start</div>
              <h1>
                Tell me <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>what&apos;s broken.</em>
              </h1>
              <p className="deck">
                Five minutes of form-filling. I read every one of these personally and reply within 24 hours with a recommended plan, or an honest &quot;you don&apos;t need me.&quot;
              </p>
            </header>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <section style={section}>
                <h3 style={sectionHead}>Who are you?</h3>
                <FormInput label="Your name" required value={form.name} onChange={(v) => update("name", v)} placeholder="e.g., Jane Doe" />
                <div style={twoCol}>
                  <FormInput label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                  <FormInput label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="(770) 555-..." />
                </div>
                <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", margin: "4px 0 0" }}>Pick whichever you prefer. At least one is required.</p>
              </section>

              <section style={section}>
                <h3 style={sectionHead}>Who is this help for?</h3>
                <Select value={form.helpFor} onChange={(v) => update("helpFor", v)} options={["Yourself", "A parent", "A grandparent", "Your spouse", "Your kid", "Other family member", "A friend"]} />
              </section>

              <section style={section}>
                <h3 style={sectionHead}>What&apos;s going on?</h3>
                <textarea
                  required
                  value={form.situation}
                  onChange={(e) => update("situation", e.target.value)}
                  placeholder="Examples: 'My mom got a new iPhone and can't figure out anything beyond calling and texting.' 'I need to set up medication reminders for my grandma.' 'I have a smart speaker sitting in the box for 3 months.' 'I want to learn how to use ChatGPT for my small business.'"
                  style={{ ...fieldStyle, minHeight: "140px", resize: "vertical" }}
                />
              </section>

              <section style={section}>
                <h3 style={sectionHead}>How soon?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {["Now (urgent)", "This week", "This month", "No rush"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("urgency", opt)}
                      style={pillBtn(form.urgency === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </section>

              <section style={section}>
                <h3 style={sectionHead}>How should I reach you?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {["Email", "Phone", "Text", "Either"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("contactPreference", opt)}
                      style={pillBtn(form.contactPreference === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </section>

              <section style={section}>
                <h3 style={sectionHead}>Where are you?</h3>
                <Select value={form.location} onChange={(v) => update("location", v)} options={["Metro Atlanta (in-person OK)", "Georgia (remote)", "Elsewhere US (remote)", "Other"]} />
              </section>

              <section style={section}>
                <h3 style={sectionHead}>How did you find me? (optional)</h3>
                <FormInput value={form.hearAbout} onChange={(v) => update("hearAbout", v)} placeholder="e.g., Instagram, referred by a friend, Google" />
              </section>

              <button type="submit" className="pv-btn-primary" style={{ border: "none", cursor: "pointer", padding: "16px 32px", fontSize: "12px" }}>
                Send my intake →
              </button>

              <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
                Your form opens an email to me when you hit submit. If your email client doesn&apos;t open automatically, you&apos;ll get a fallback button to copy the address.
              </p>
            </form>
          </>
        ) : (
          <>
            <header className="pv-page-head" style={{ marginTop: "16px" }}>
              <div className="pv-mono-label">Intake submitted</div>
              <h1>
                Got it. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Thanks.</em>
              </h1>
              <p className="deck">
                Your intake has been logged and an email window should have opened with your details prefilled. Hit Send in that window to send it to me.
              </p>
            </header>

            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "20px" }}>
              <h3 style={sectionHead}>If the email window didn&apos;t open:</h3>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6, marginBottom: "16px" }}>
                Click the button below to open it manually, or copy this email address and send me the form contents:
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "16px", color: "var(--color-warm-accent)", marginBottom: "16px" }}>
                elijah@purcell-ventures.com
              </p>
              <a href={mailtoLink} className="pv-btn-primary">Open email manually</a>
            </div>

            <div style={{ background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a", padding: "20px 24px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7aaa6a", fontWeight: 700, marginBottom: "12px" }}>
                What happens next
              </h3>
              <ol style={{ paddingLeft: "20px", margin: 0, lineHeight: 1.8, fontSize: "14px", color: "var(--color-warm-text)" }}>
                <li>I read your intake (usually within a few hours)</li>
                <li>I reply within 24 hours with a recommended plan, or an honest &quot;you don&apos;t need me&quot;</li>
                <li>If we&apos;re a fit, we schedule the first session (in-person Atlanta or remote video)</li>
                <li>If we&apos;re not, I&apos;ll point you to something that is</li>
              </ol>
            </div>

            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", helpFor: "Yourself", situation: "", urgency: "This week", contactPreference: "Email", location: "Metro Atlanta", hearAbout: "" }); }} style={ghostBtn}>Submit another intake</button>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text", required = false }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div>
      {label && <label style={inputLabel}>{label}{required && " *"}</label>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} style={fieldStyle} />
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

const section: React.CSSProperties = { background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "14px", fontWeight: 700, marginTop: 0 };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "15px", fontFamily: "var(--font-inter), sans-serif", marginBottom: "10px" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const twoCol: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" };
const ghostBtn: React.CSSProperties = { padding: "10px 18px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };

function pillBtn(active: boolean): React.CSSProperties {
  return {
    padding: "10px 14px",
    background: active ? "var(--color-warm-accent)" : "transparent",
    color: active ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
    border: `1px solid ${active ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "var(--font-dm-sans), sans-serif",
    cursor: "pointer",
    fontWeight: 700,
    borderRadius: 0,
    textAlign: "center",
  };
}
