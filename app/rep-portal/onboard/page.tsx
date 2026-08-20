"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { isAdmin } from "@/lib/crm-storage";

/**
 * Admin Onboarding Helper — for Elijah to set up a new rep.
 * Generates: password, env var line, welcome email, contractor agreement link.
 * Admin-only (checks cookie via isAdmin).
 */

type Tier = "Apprentice" | "Closer" | "Senior";

function generatePassword(length: number = 12): string {
  const charset = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += charset[Math.floor(Math.random() * charset.length)];
  }
  return out;
}

export default function OnboardPage() {
  const [ownerName, setOwnerName] = useState("");
  const [name, setName] = useState("");
  const [tier, setTier] = useState<Tier>("Apprentice");
  const [password, setPassword] = useState(generatePassword());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
  }, []);

  const admin = isAdmin(ownerName);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  if (!admin) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)" }}>Admin only</h1>
            <p style={{ color: "var(--color-warm-text-muted)" }}>This page is for admin onboarding new reps. If you should have access, ask Elijah.</p>
            <Link href="/rep-portal" style={{ color: "var(--color-warm-accent)" }}>← Back to dashboard</Link>
          </main>
        </div>
      </div>
    );
  }

  const envVarLine = name.trim() && password.trim() ? `${name.trim()}:${password.trim()}` : "";
  const greeting = `Hi ${name.split(" ")[0] || "there"},`;
  const welcomeBody = `${greeting}

You're officially on the Purcell Ventures sales team. Welcome.

Here's everything you need to start:

🔐 REP PORTAL LOGIN
  URL:      https://purcellventures.co/rep-portal/login
  Password: ${password || "(set above)"}
  (Your name is auto-detected from the password — no need to type it.)

📋 CONTRACTOR AGREEMENT
  Before your first sale, please sign and return:
  https://purcellventures.co/sales-rep
  (Look for the contractor agreement PDF link.)

📚 ESSENTIAL READING (10 min total)
  • Handbook:    https://purcellventures.co/rep-portal/handbook
  • Pricing:     https://purcellventures.co/rep-portal/pricing
  • Products:    https://purcellventures.co/rep-portal/products
  • Scripts:     https://purcellventures.co/rep-portal/scripts

🤖 WHEN YOU'RE STUCK MID-PITCH
  /rep-portal/ask — the AI assistant. Knows pricing, scripts, escalation rules. Type a question, get a tactical answer.

🎯 YOUR TIER: ${tier}
  ${tier === "Apprentice" ? "Start with Courses + Mantle (commission paid but doesn't count toward promotion). 5 course closes + 80% on the Closer quiz → Closer tier." : ""}${tier === "Closer" ? "You can sell Digital Services subscriptions. 5 Digital closes + co-pitch with me on a Custom Software deal → Senior tier." : ""}${tier === "Senior" ? "Full catalog access — Consulting + Custom Software included. You're at the top of the tier ladder." : ""}

📞 ONBOARDING CALL
  Let's do a 30-min call this week to walk through everything. Reply with 3 time windows that work.

Looking forward to working with you.

— Elijah
elijah@purcell-ventures.com
(205) 462-7839`;

  const mailtoLink = email ? `mailto:${email}?subject=${encodeURIComponent(`Welcome to Purcell Ventures sales — ${name}`)}&body=${encodeURIComponent(welcomeBody)}` : "";

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Admin · Rep Onboarding</div>
            <h1>
              Onboard a <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>new rep.</em>
            </h1>
            <p className="deck">
              Fill out their info → get a generated password, the env-var line to paste into Vercel, and a complete welcome email ready to send.
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

            {/* Inputs */}
            <section>
              <h3 style={sectionHead}>New rep info</h3>
              <FormInput label="Full name" required value={name} onChange={setName} placeholder="e.g., Luke Keebler" />
              <FormInput label="Email" type="email" value={email} onChange={setEmail} placeholder="luke@..." />
              <FormInput label="Phone" value={phone} onChange={setPhone} placeholder="(770) 555-..." />
              <div style={{ marginBottom: "16px" }}>
                <label style={inputLabel}>Starting tier</label>
                <select value={tier} onChange={(e) => setTier(e.target.value as Tier)} style={fieldStyle}>
                  <option>Apprentice</option>
                  <option>Closer</option>
                  <option>Senior</option>
                </select>
              </div>
              <FormInput label="Notes (optional)" value={notes} onChange={setNotes} placeholder="How you know them, deal pipeline, etc." />

              <div style={{ marginTop: "16px" }}>
                <label style={inputLabel}>Generated password</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} style={{ ...fieldStyle, fontFamily: "var(--font-dm-sans), monospace" }} />
                  <button onClick={() => setPassword(generatePassword())} style={ghostBtn}>↻ Regen</button>
                </div>
                <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", marginTop: "4px" }}>
                  Auto-generated. 12 chars, no ambiguous letters/numbers. Edit if you want.
                </p>
              </div>
            </section>

            {/* Outputs */}
            <section>
              <h3 style={sectionHead}>Step 1 · Add to Vercel env vars</h3>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "8px", lineHeight: 1.5 }}>
                Open <code style={code}>REP_PASSWORDS</code> on Vercel → add this entry (comma-separated with existing entries):
              </p>
              <div style={outputBox}>
                <code style={{ flex: 1, fontFamily: "var(--font-dm-sans), monospace", fontSize: "13px", color: "var(--color-warm-accent)", wordBreak: "break-all" }}>{envVarLine || "(enter name + password above)"}</code>
                {envVarLine && <button onClick={() => copy(envVarLine, "env")} style={ghostBtn}>{copied === "env" ? "✓" : "Copy"}</button>}
              </div>

              <h3 style={{ ...sectionHead, marginTop: "24px" }}>Step 2 · Send welcome email</h3>
              {email ? (
                <>
                  <div style={outputBox}>
                    <code style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{email}</code>
                    <a href={mailtoLink} className="pv-btn-primary" style={{ marginLeft: "auto" }}>Open in email</a>
                  </div>
                  <details style={{ marginTop: "12px" }}>
                    <summary style={{ cursor: "pointer", fontSize: "12px", color: "var(--color-warm-text-muted)", marginBottom: "8px" }}>Preview email body</summary>
                    <pre style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px", whiteSpace: "pre-wrap", fontSize: "12px", color: "var(--color-warm-text)", lineHeight: 1.6, maxHeight: "400px", overflowY: "auto" }}>{welcomeBody}</pre>
                    <button onClick={() => copy(welcomeBody, "body")} style={{ ...ghostBtn, marginTop: "8px" }}>{copied === "body" ? "✓ Copied" : "Copy body to clipboard"}</button>
                  </details>
                </>
              ) : (
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>Add their email above to generate the welcome message.</p>
              )}

              <h3 style={{ ...sectionHead, marginTop: "24px" }}>Step 3 · After they accept</h3>
              <ol style={{ paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
                <li>Add them as a contact in the <Link href="/rep-portal/crm" style={{ color: "var(--color-warm-accent)" }}>CRM</Link> so you can track their first deals</li>
                <li>Schedule the 30-min onboarding call</li>
                <li>Walk through the handbook + pricing reference live</li>
                <li>Watch them take the Google Form quiz</li>
                <li>Make sure they have signed the contractor agreement before first deal</li>
              </ol>
            </section>

          </div>

          <div style={{ marginTop: "48px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "10px" }}>Heads up · </strong>
            This tool helps you prep an onboarding — it does NOT auto-write to your Vercel env var (that requires the Vercel API). You still have to paste the env-var line manually. Future: integrate with Vercel API for one-click activation.
          </div>

        </main>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={inputLabel}>{label}{required && " *"}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} style={fieldStyle} />
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700, marginTop: 0 };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0, whiteSpace: "nowrap" };
const outputBox: React.CSSProperties = { display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "8px" };
const code: React.CSSProperties = { fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", color: "var(--color-warm-accent)", padding: "2px 6px", background: "var(--color-warm-bg-alt)" };
