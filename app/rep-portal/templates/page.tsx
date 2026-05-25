"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  tags: string[];
  createdAt: string;
  useCount: number;
}

const KEY = "pv_email_templates_v1";

const STARTER_TEMPLATES: Omit<Template, "id" | "createdAt" | "useCount">[] = [
  {
    name: "Day-3 follow-up after quote",
    subject: "Quick follow-up on {{service}}",
    body: `Hi {{firstName}},

Wanted to bump my earlier note about {{service}} for {{company}} — no pressure, just wanted to make sure it didn't get buried.

A few quick things in case useful:
• [Specific point 1 from your conversation]
• [Specific point 2]

Happy to schedule a 15-min call if you want to talk through it, or if you're a 'not right now' that's totally fine — just text NO and I'll move on.

— {{repName}}`,
    tags: ["follow-up", "warm"],
  },
  {
    name: "Cold outreach — local business",
    subject: "Quick question about {{company}}",
    body: `Hi {{firstName}},

I run Purcell Ventures — we build digital tools for small businesses in Atlanta. I noticed {{company}} and had a quick thought.

[Specific observation about their business — website, hours, social presence, something concrete]

We help businesses like yours add [chatbot / booking / CRM / etc.] for $99-279/mo. It's not for everyone but if it's interesting, I'd love to grab 15 minutes.

If not, no worries — just delete this. Take care.

— {{repName}}
Purcell Ventures`,
    tags: ["cold-outreach", "intro"],
  },
  {
    name: "Pilot Partner pitch (Digital tier)",
    subject: "Pilot Partner spot for {{company}}?",
    body: `Hi {{firstName}},

I mentioned the Pilot Partner program on our call — wanted to put the details in writing.

We just launched our Digital Services tiers and have 3 Pilot Partner spots left across all of them. If you're a fit:
• 30% off setup
• 30% off first 6 months
• Locked-in price for that 6 months
• In exchange: a 2-3 sentence testimonial at month 2, case-study rights (anonymous if you want), one referral intro within 6 months

Standard Digital {{tier}}: {{standardPrice}}
Pilot Partner: {{pilotPrice}}

If you want one of those spots, let me know this week — once they're gone they're gone, and the next 3 prospects pay standard.

— {{repName}}`,
    tags: ["pilot-partner", "close"],
  },
  {
    name: "Final touch — going silent",
    subject: "Last bump — yes/no/move-on",
    body: `Hi {{firstName}},

Last touch on this. If now's not the right time for {{service}}, just text NO and I'll stop pestering — totally fine.

If you want to keep talking, give me a window this week or next.

Either is fine.

— {{repName}}`,
    tags: ["follow-up", "exit"],
  },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editing, setEditing] = useState<Template | null>(null);
  const [seedAsked, setSeedAsked] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const loaded = JSON.parse(raw);
        setTemplates(loaded);
        if (loaded.length === 0) setSeedAsked(true);
      } catch { /* ignore */ }
    } else {
      setSeedAsked(true);
    }
  }, []);

  function save(updated: Template[]) {
    setTemplates(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }

  function seed() {
    const seeded: Template[] = STARTER_TEMPLATES.map((t) => ({
      ...t,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      useCount: 0,
    }));
    save(seeded);
    setSeedAsked(false);
  }

  function startNew() {
    setEditing({ id: crypto.randomUUID(), name: "", subject: "", body: "", tags: [], createdAt: new Date().toISOString(), useCount: 0 });
  }

  function saveEditing() {
    if (!editing) return;
    if (!editing.name.trim()) { alert("Template needs a name."); return; }
    const exists = templates.find((t) => t.id === editing.id);
    if (exists) {
      save(templates.map((t) => t.id === editing.id ? editing : t));
    } else {
      save([editing, ...templates]);
    }
    setEditing(null);
  }

  function deleteTemplate(id: string) {
    if (!confirm("Delete this template?")) return;
    save(templates.filter((t) => t.id !== id));
  }

  function copyTemplate(t: Template) {
    const full = `Subject: ${t.subject}\n\n${t.body}`;
    navigator.clipboard.writeText(full);
    // Increment use count
    save(templates.map((x) => x.id === t.id ? { ...x, useCount: x.useCount + 1 } : x));
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function openMailto(t: Template) {
    const mailto = `mailto:?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
    window.location.href = mailto;
    save(templates.map((x) => x.id === t.id ? { ...x, useCount: x.useCount + 1 } : x));
  }

  // Highlight tokens like {{firstName}} in the preview
  function renderBody(body: string) {
    const parts = body.split(/(\{\{[^}]+\}\})/g);
    return parts.map((p, i) =>
      p.match(/^\{\{[^}]+\}\}$/) ? (
        <span key={i} style={{ background: "rgba(212, 175, 55, 0.18)", color: "var(--color-warm-accent)", padding: "1px 4px", fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px" }}>{p}</span>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Email Templates</div>
            <h1>
              Your <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>library.</em>
            </h1>
            <p className="deck">
              Save the emails you send over and over. Use {`{{tokens}}`} like {`{{firstName}}, {{company}}, {{service}}`} as placeholders — fill in when you send. Pairs with the <Link href="/digital/tools/email-composer" style={{ color: "var(--color-warm-accent)" }}>AI Email Composer</Link> for one-off drafts.
            </p>
          </header>

          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            <button onClick={startNew} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ New template</button>
            {seedAsked && templates.length === 0 && (
              <button onClick={seed} style={ghostBtn}>Seed with 4 starter templates</button>
            )}
          </div>

          {editing && (
            <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 16px", fontWeight: 600 }}>{templates.find((t) => t.id === editing.id) ? "Edit template" : "New template"}</h3>
              <div style={{ display: "grid", gap: "12px" }}>
                <FormInput label="Template name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} placeholder="e.g., 'Day-3 follow-up after quote'" />
                <FormInput label="Subject line" value={editing.subject} onChange={(v) => setEditing({ ...editing, subject: v })} placeholder="e.g., 'Quick follow-up on {{service}}'" />
                <div>
                  <label style={inputLabel}>Body</label>
                  <textarea value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} placeholder="Use {{firstName}}, {{company}}, {{service}}, {{repName}} as placeholders" style={{ ...fieldStyle, minHeight: "240px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }} />
                  <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "4px", fontStyle: "italic" }}>Tokens: <code style={code}>{`{{firstName}}`}</code> <code style={code}>{`{{lastName}}`}</code> <code style={code}>{`{{company}}`}</code> <code style={code}>{`{{service}}`}</code> <code style={code}>{`{{tier}}`}</code> <code style={code}>{`{{standardPrice}}`}</code> <code style={code}>{`{{pilotPrice}}`}</code> <code style={code}>{`{{repName}}`}</code></p>
                </div>
                <FormInput label="Tags (comma-separated)" value={editing.tags.join(", ")} onChange={(v) => setEditing({ ...editing, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} placeholder="e.g., follow-up, warm" />
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button onClick={saveEditing} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save</button>
                <button onClick={() => setEditing(null)} style={ghostBtn}>Cancel</button>
              </div>
            </div>
          )}

          {templates.length === 0 && !seedAsked && (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>No templates yet. Click + New template to add your first.</p>
          )}

          {templates.length > 0 && (
            <div style={{ display: "grid", gap: "12px" }}>
              {templates.sort((a, b) => b.useCount - a.useCount).map((t) => (
                <div key={t.id} style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>{t.name}</h3>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {t.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: "10px", padding: "2px 8px", background: "var(--color-warm-bg)", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", letterSpacing: "0.1em" }}>{tag}</span>
                        ))}
                        {t.useCount > 0 && <span style={{ fontSize: "10px", color: "var(--color-warm-accent)", letterSpacing: "0.1em", padding: "2px 8px" }}>Used {t.useCount}×</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button onClick={() => copyTemplate(t)} style={{ ...ghostBtn, padding: "6px 12px", fontSize: "10px" }}>{copiedId === t.id ? "✓ Copied" : "Copy"}</button>
                      <button onClick={() => openMailto(t)} style={{ ...ghostBtn, padding: "6px 12px", fontSize: "10px" }}>Open in email</button>
                      <button onClick={() => setEditing(t)} style={{ ...ghostBtn, padding: "6px 12px", fontSize: "10px" }}>Edit</button>
                      <button onClick={() => deleteTemplate(t.id)} style={{ ...ghostBtn, padding: "6px 12px", fontSize: "10px", color: "#e54a28", borderColor: "#e54a28" }}>×</button>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "10px", fontWeight: 600 }}>
                    Subject: <span style={{ color: "var(--color-warm-text)" }}>{renderBody(t.subject)}</span>
                  </div>
                  <pre style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, padding: "12px 16px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)" }}>{renderBody(t.body)}</pre>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={inputLabel}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} />
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const code: React.CSSProperties = { fontFamily: "var(--font-dm-sans), monospace", fontSize: "10px", color: "var(--color-warm-accent)", padding: "1px 4px", background: "var(--color-warm-bg-alt)" };
