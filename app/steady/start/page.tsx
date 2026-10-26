"use client";

// Rebuilt on the page kit 26 Oct 2026. The submit logic is unchanged: the same
// localStorage log, the same CRM contact, the same prefilled email. Option values are the
// strings the CRM and the email receive, so they stay as they were.

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero, Section } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
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
    location: "Metro Atlanta (in-person OK)",
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
      alert("Add an email address or a phone number so I can reach you.");
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

    const subject = `Steady intake: ${form.name}`;
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
    <main>
      <PageHero
        planet="book"
        kicker="Steady, personal IT"
        title={submitted ? "Intake received" : "The Steady intake form"}
        lede={submitted
          ? "I logged your intake, and an email window should have opened with your details filled in. Press Send in that window and the email reaches me."
          : "The form takes five minutes. I read each one and reply within one business day with a recommended plan, or I tell you that you do not need me."}
        actions={<Link className="ui-link" href="/steady">Back to Steady</Link>}
      />

      {!submitted ? (
        <Section stack>
          <form onSubmit={submit} className="ui-narrow" style={{ display: "flex", flexDirection: "column", gap: 40, padding: 0, margin: 0 }}>
            <fieldset style={fieldset}>
              <legend style={legend}>About you</legend>
              <FormInput id="st-name" label="Your name" required value={form.name} onChange={(v) => update("name", v)} placeholder="Jane Doe" />
              <div style={twoCol}>
                <FormInput id="st-email" label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                <FormInput id="st-phone" label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="(770) 555-0100" />
              </div>
              <p className="ui-muted ui-small" style={{ margin: 0 }}>Pick whichever you prefer. I need at least one.</p>
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>Who the help is for</legend>
              <Select id="st-for" label="The person who needs help" value={form.helpFor} onChange={(v) => update("helpFor", v)} options={["Yourself", "A parent", "A grandparent", "Your spouse", "Your kid", "Other family member", "A friend"]} />
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>What is going on</legend>
              <div className="ui-field">
                <label htmlFor="st-situation">The problem, in your own words (required)</label>
                <textarea
                  id="st-situation"
                  required
                  rows={6}
                  value={form.situation}
                  onChange={(e) => update("situation", e.target.value)}
                  placeholder="For example: My mom got a new iPhone and only knows how to call and text. Or: I need medication reminders set up for my grandma. Or: My smart speaker has sat in the box for 3 months. Or: I want to learn ChatGPT for my small business."
                  style={{ resize: "vertical" }}
                />
              </div>
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>How soon</legend>
              <div style={choiceGrid} role="group" aria-label="How soon">
                {["Now (urgent)", "This week", "This month", "No rush"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={form.urgency === opt}
                    onClick={() => update("urgency", opt)}
                    className={`ui-btn${form.urgency === opt ? "" : " ui-btn--ghost"}`}
                    style={choiceBtn}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>How I should reach you</legend>
              <div style={choiceGrid} role="group" aria-label="How I should reach you">
                {["Email", "Phone", "Text", "Either"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={form.contactPreference === opt}
                    onClick={() => update("contactPreference", opt)}
                    className={`ui-btn${form.contactPreference === opt ? "" : " ui-btn--ghost"}`}
                    style={choiceBtn}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>Where you are</legend>
              <Select id="st-where" label="Your location" value={form.location} onChange={(v) => update("location", v)} options={["Metro Atlanta (in-person OK)", "Tuscaloosa (in-person OK)", "Georgia (remote)", "Elsewhere US (remote)", "Other"]} />
            </fieldset>

            <fieldset style={fieldset}>
              <legend style={legend}>How you found me</legend>
              <FormInput id="st-heard" label="Optional" value={form.hearAbout} onChange={(v) => update("hearAbout", v)} placeholder="Instagram, a friend, Google" />
            </fieldset>

            <div>
              <button type="submit" className="ui-btn">Send my intake</button>
              <p className="ui-muted ui-small" style={{ marginTop: 14 }}>
                The form opens an email to me when you submit it. If your email app does not open, the next screen shows my address and a button to try again.
              </p>
            </div>
          </form>
        </Section>
      ) : (
        <>
          <Section title="If the email window did not open">
            <div className="ui-prose">
              <p>Use the button below to open it again, or copy this address and send me the form contents.</p>
              <p><a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            </div>
            <div className="ui-hero__actions">
              <a href={mailtoLink} className="ui-btn">Open the email again</a>
            </div>
          </Section>

          <Section title="What happens next">
            <div className="ui-prose">
              <ol>
                <li>I read your intake, often within a few hours.</li>
                <li>I reply within one business day with a recommended plan, or I tell you that you do not need me.</li>
                <li>If Steady fits, we schedule the first session, in person in Tuscaloosa or metro Atlanta, or over video.</li>
                <li>If it does not, I point you to something that does.</li>
              </ol>
            </div>
            <div className="ui-hero__actions">
              <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", helpFor: "Yourself", situation: "", urgency: "This week", contactPreference: "Email", location: "Metro Atlanta (in-person OK)", hearAbout: "" }); }} className="ui-btn ui-btn--ghost">Submit another intake</button>
            </div>
          </Section>
        </>
      )}
    </main>
  );
}

function FormInput({ id, label, value, onChange, placeholder, type = "text", required = false }: { id: string; label?: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div className="ui-field">
      {label && <label htmlFor={id}>{label}{required && " (required)"}</label>}
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} />
    </div>
  );
}

function Select({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="ui-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

const fieldset: React.CSSProperties = { border: 0, padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 };
const legend: React.CSSProperties = { font: "600 21px/1.25 var(--font-display)", color: "var(--fg)", padding: 0, marginBottom: 14 };
const twoCol: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 };
const choiceGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 };
const choiceBtn: React.CSSProperties = { justifyContent: "center", minHeight: 48 };
