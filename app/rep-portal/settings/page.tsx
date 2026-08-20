"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { STAGES, type Stage } from "@/lib/crm-storage";

/**
 * Rep preferences — stored locally per browser.
 * When Firestore lands, these can sync per-rep across devices.
 */

interface RepSettings {
  displayName: string;          // override name shown in UI (defaults to cookie name)
  defaultStage: Stage;          // stage applied to new contacts
  defaultFollowUpDays: number;  // days from now to default the nextFollowUp field
  defaultService: string;       // pre-filled service field
  defaultEstimatedValue: number;
  showAIHints: boolean;         // auto-suggest next-step / summary on opening a contact
  compactMode: boolean;         // tighter spacing in CRM views
  notifyOverdue: boolean;       // future: when push notifications are wired
  defaultEmailSig: string;      // signature appended to template-generated emails
}

const KEY = "pv_rep_settings_v1";

const DEFAULTS: RepSettings = {
  displayName: "",
  defaultStage: "Lead",
  defaultFollowUpDays: 3,
  defaultService: "",
  defaultEstimatedValue: 0,
  showAIHints: false,
  compactMode: false,
  notifyOverdue: true,
  defaultEmailSig: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<RepSettings>(DEFAULTS);
  const [ownerName, setOwnerName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try { setSettings({ ...DEFAULTS, ...JSON.parse(raw) }); } catch { /* ignore */ }
    }
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
  }, []);

  function save() {
    localStorage.setItem(KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function reset() {
    if (!confirm("Reset all settings to defaults?")) return;
    setSettings(DEFAULTS);
    localStorage.removeItem(KEY);
  }

  function update<K extends keyof RepSettings>(key: K, value: RepSettings[K]) {
    setSettings({ ...settings, [key]: value });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Your Settings</div>
            <h1>
              Your <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>preferences.</em>
            </h1>
            <p className="deck">
              Stored locally on this browser. When the CRM moves to a shared backend, these sync across your devices.
            </p>
          </header>

          {/* Identity */}
          <section style={section}>
            <h3 style={sectionHead}>Identity</h3>
            <Field label="Display name override" hint={`Defaults to your login name (${ownerName || "not logged in"}). Override if you want a different name shown in activities + leaderboard.`}>
              <input type="text" value={settings.displayName} onChange={(e) => update("displayName", e.target.value)} placeholder={ownerName || "(your login name)"} style={fieldStyle} />
            </Field>
          </section>

          {/* New-contact defaults */}
          <section style={section}>
            <h3 style={sectionHead}>New-contact defaults</h3>
            <p style={hint}>When you add a new contact, these are pre-filled. Override per-contact as needed.</p>
            <Field label="Default stage">
              <select value={settings.defaultStage} onChange={(e) => update("defaultStage", e.target.value as Stage)} style={fieldStyle}>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Default follow-up days" hint="When you create a contact, the 'next follow-up' field defaults to N days from today.">
              <input type="number" min="0" max="30" value={settings.defaultFollowUpDays} onChange={(e) => update("defaultFollowUpDays", Number(e.target.value) || 0)} style={fieldStyle} />
            </Field>
            <Field label="Default service">
              <input type="text" value={settings.defaultService} onChange={(e) => update("defaultService", e.target.value)} placeholder="e.g., 'Digital Starter'" style={fieldStyle} />
            </Field>
            <Field label="Default estimated value ($)">
              <input type="number" min="0" value={settings.defaultEstimatedValue} onChange={(e) => update("defaultEstimatedValue", Number(e.target.value) || 0)} style={fieldStyle} />
            </Field>
          </section>

          {/* UI preferences */}
          <section style={section}>
            <h3 style={sectionHead}>UI preferences</h3>
            <Toggle
              label="Auto-suggest AI hints"
              hint="When you open a contact, automatically run the 'Where are we' summary if it&apos;s been > 7 days since the last AI summary. (Costs ~$0.001 per auto-run.)"
              checked={settings.showAIHints}
              onChange={(v) => update("showAIHints", v)}
            />
            <Toggle
              label="Compact mode"
              hint="Tighter spacing across CRM views — fit more on screen. (Not yet active — visual preference only for now.)"
              checked={settings.compactMode}
              onChange={(v) => update("compactMode", v)}
            />
          </section>

          {/* Notifications */}
          <section style={section}>
            <h3 style={sectionHead}>Notifications</h3>
            <Toggle
              label="Notify on overdue tasks"
              hint="Future: when push notifications + email are wired (Phase 2), get pinged when tasks go overdue. Currently just toggles a preference — no actual notifications yet."
              checked={settings.notifyOverdue}
              onChange={(v) => update("notifyOverdue", v)}
            />
          </section>

          {/* Email defaults */}
          <section style={section}>
            <h3 style={sectionHead}>Email defaults</h3>
            <Field label="Email signature" hint="Appended to template-generated emails. Use {{repName}} as token (resolves to your display name).">
              <textarea
                value={settings.defaultEmailSig}
                onChange={(e) => update("defaultEmailSig", e.target.value)}
                placeholder={`e.g.,\n— {{repName}}\nPurcell Ventures Sales Rep\n(205) 462-7839`}
                style={{ ...fieldStyle, minHeight: "100px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }}
              />
            </Field>
          </section>

          {/* Save bar */}
          <div style={{ position: "sticky", bottom: 0, background: "var(--color-warm-bg)", padding: "16px 0", borderTop: "1px solid var(--color-warm-border)", display: "flex", gap: "12px", alignItems: "center", marginTop: "32px" }}>
            <button onClick={save} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save settings</button>
            <button onClick={reset} style={ghostBtn}>Reset to defaults</button>
            {saved && <span style={{ fontSize: "13px", color: "#7aaa6a", fontStyle: "italic" }}>✓ Saved</span>}
            <Link href="/rep-portal" style={{ marginLeft: "auto", color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← Back to dashboard</Link>
          </div>

        </main>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={inputLabel}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "4px", fontStyle: "italic", lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ accentColor: "var(--color-warm-accent)", width: "18px", height: "18px" }} />
        <span style={{ fontSize: "14px", color: "var(--color-warm-text)", fontWeight: 600 }}>{label}</span>
      </label>
      {hint && <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "4px", marginLeft: "28px", fontStyle: "italic", lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

const section: React.CSSProperties = { marginBottom: "24px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginTop: 0, marginBottom: "16px", fontWeight: 700 };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const hint: React.CSSProperties = { fontSize: "12px", color: "var(--color-warm-text-muted)", marginBottom: "16px", marginTop: "-8px", fontStyle: "italic" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
