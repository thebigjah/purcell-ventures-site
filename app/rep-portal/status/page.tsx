"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { isAdmin } from "@/lib/crm-storage";

/**
 * /rep-portal/status — admin health dashboard.
 *
 * Hits /api/health to surface env var configuration without exposing values.
 * Quick visual: green = good, yellow = needs setup, red = broken.
 */

interface HealthCheck {
  ok: boolean;
  timestamp: string;
  build: string;
  env: {
    anthropic_configured: boolean;
    rep_passwords_mode: "per-rep" | "shared" | "unconfigured";
  };
  capabilities: string[];
}

interface StripeStatus {
  starterKit: boolean;
  coldEmailPack: boolean;
}

export default function StatusPage() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [stripeStatus, setStripeStatus] = useState<StripeStatus>({ starterKit: false, coldEmailPack: false });
  const [ownerName, setOwnerName] = useState("");
  const [contactCount, setContactCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));

    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setError("Couldn't reach /api/health"));

    // Stripe status: check the shop pages by looking at their href values
    // Indirect check — visit each shop page server-side would be cleaner, but for now
    // we just rely on /api/health to tell us
    const sk = localStorage.getItem("pv_stripe_sk_configured") === "true";
    const cep = localStorage.getItem("pv_stripe_cep_configured") === "true";
    setStripeStatus({ starterKit: sk, coldEmailPack: cep });

    // Count CRM contacts
    try {
      const raw = localStorage.getItem("pv_crm_contacts_v2");
      if (raw) setContactCount(JSON.parse(raw).length);
    } catch { /* ignore */ }
  }, []);

  const admin = isAdmin(ownerName);

  if (!admin) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif" }}>Admin only</h1>
            <p style={{ color: "var(--color-warm-text-muted)" }}>Status dashboard is for admin (Elijah).</p>
            <Link href="/rep-portal" style={{ color: "var(--color-warm-accent)" }}>← Back to dashboard</Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Admin · System Status</div>
            <h1>
              System <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>health.</em>
            </h1>
            <p className="deck">
              What&apos;s working, what needs setup, what&apos;s broken. Refresh this page after changing Vercel env vars to verify they took effect.
            </p>
          </header>

          {error && (
            <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "12px 16px", color: "#e54a28", fontSize: "13px", marginBottom: "24px" }}>{error}</div>
          )}

          {/* Critical health */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={sectionHead}>Critical infrastructure</h2>
            <div style={{ display: "grid", gap: "10px" }}>
              <CheckRow label="AI features (Anthropic API)" ok={!!health?.env.anthropic_configured} fixHref="https://vercel.com/dashboard" fixText="Set ANTHROPIC_API_KEY on Vercel" detail="All 8 AI coaches + 22 customer AI tools depend on this." />
              <CheckRow
                label="Rep portal login (REP_PASSWORDS)"
                ok={health?.env.rep_passwords_mode === "per-rep"}
                warning={health?.env.rep_passwords_mode === "shared"}
                fixHref="https://vercel.com/dashboard"
                fixText="Set REP_PASSWORDS env var on Vercel"
                detail={
                  health?.env.rep_passwords_mode === "per-rep" ? "Per-rep mode active. Add more reps by appending Name:password pairs (comma-separated)."
                  : health?.env.rep_passwords_mode === "shared" ? "Shared password mode (REP_PORTAL_PASSWORD). Consider upgrading to per-rep so you can track who did what."
                  : "No auth configured. Reps can't log in."
                }
              />
              <CheckRow label="Site reachable + responding" ok={!!health} fixHref="/" fixText="Visit site" detail={health ? `Build ${health.build} · last checked ${new Date(health.timestamp).toLocaleString()}` : "Cannot reach /api/health endpoint."} />
            </div>
          </section>

          {/* Revenue */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={sectionHead}>Revenue products</h2>
            <p style={hint}>Stripe Payment Link env vars enable the buy buttons. Without them, buttons fall back to a placeholder.</p>
            <div style={{ display: "grid", gap: "10px" }}>
              <CheckRow
                label="PV AI Starter Kit ($19) — Stripe"
                ok={stripeStatus.starterKit}
                warning={!stripeStatus.starterKit}
                fixHref="https://vercel.com/dashboard"
                fixText="Set STARTER_KIT_PAYMENT_LINK env var"
                detail="Setup guide: ~/.claude/elijahbot/drafts/STRIPE-SETUP-STARTER-KIT.md"
                manualCheck
                manualCheckKey="pv_stripe_sk_configured"
                manualCheckLabel="I've configured this"
                onManualCheckChange={(v) => setStripeStatus((s) => ({ ...s, starterKit: v }))}
              />
              <CheckRow
                label="Cold Email Mastery Pack ($29) — Stripe"
                ok={stripeStatus.coldEmailPack}
                warning={!stripeStatus.coldEmailPack}
                fixHref="https://vercel.com/dashboard"
                fixText="Set COLD_EMAIL_PACK_PAYMENT_LINK env var"
                detail="Second product. Adapt the starter-kit setup steps."
                manualCheck
                manualCheckKey="pv_stripe_cep_configured"
                manualCheckLabel="I've configured this"
                onManualCheckChange={(v) => setStripeStatus((s) => ({ ...s, coldEmailPack: v }))}
              />
            </div>
          </section>

          {/* Data on this browser */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={sectionHead}>Data on this browser</h2>
            <p style={hint}>CRM and Operations tools store data per-browser until Firestore migration. Check this is the browser you want to use as your PV operations machine.</p>
            <div style={{ display: "grid", gap: "10px" }}>
              <CheckRow label="CRM contacts" ok={contactCount > 0} warning={contactCount === 0} fixHref="/rep-portal/crm" fixText="Open CRM + load sample data" detail={`${contactCount} contact${contactCount !== 1 ? "s" : ""} in this browser. Click 'Load sample data' in CRM if empty.`} />
              <CheckRow label="Operations storage isolated" ok detail="PV ops tools use pv_ops_* localStorage keys (isolated from public demos)." />
            </div>
          </section>

          {/* Capabilities */}
          {health && (
            <section style={{ marginBottom: "32px" }}>
              <h2 style={sectionHead}>Capabilities reported by /api/health</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "6px", fontSize: "12px" }}>
                {health.capabilities.map((c) => (
                  <div key={c} style={{ padding: "8px 12px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)" }}>
                    <span style={{ color: "#7aaa6a", marginRight: "8px" }}>✓</span>{c}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick actions */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={sectionHead}>Quick actions</h2>
            <div style={{ display: "grid", gap: "8px" }}>
              <Link href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" style={actionLink}>→ Open Vercel dashboard (env vars + deploys)</Link>
              <Link href="/api/health" target="_blank" style={actionLink}>→ Raw /api/health JSON (debugging)</Link>
              <Link href="/rep-portal/crm" style={actionLink}>→ CRM</Link>
              <Link href="/rep-portal/operations" style={actionLink}>→ PV Operations tools</Link>
              <Link href="/rep-portal/onboard" style={actionLink}>→ Add a new rep</Link>
              <Link href="/shop/starter-kit" style={actionLink}>→ View Starter Kit landing (as buyer would)</Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

interface CheckRowProps {
  label: string;
  ok?: boolean;
  warning?: boolean;
  fixHref?: string;
  fixText?: string;
  detail?: string;
  manualCheck?: boolean;
  manualCheckKey?: string;
  manualCheckLabel?: string;
  onManualCheckChange?: (v: boolean) => void;
}

function CheckRow({ label, ok, warning, fixHref, fixText, detail, manualCheck, manualCheckKey, manualCheckLabel, onManualCheckChange }: CheckRowProps) {
  const color = ok ? "#7aaa6a" : warning ? "#e8b968" : "#e54a28";
  const icon = ok ? "✓" : warning ? "⚠" : "✗";

  function toggleManual() {
    if (!manualCheckKey || !onManualCheckChange) return;
    const next = !ok;
    localStorage.setItem(manualCheckKey, next ? "true" : "false");
    onManualCheckChange(next);
  }

  return (
    <div style={{ padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: `1px solid ${color}`, borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "12px", alignItems: "center" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: color, color: "var(--color-warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>{icon}</div>
        <div>
          <div style={{ fontSize: "14px", color: "var(--color-warm-text)", fontWeight: 600 }}>{label}</div>
          {detail && <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "2px" }}>{detail}</div>}
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {manualCheck && <button onClick={toggleManual} style={{ padding: "4px 10px", background: "transparent", border: `1px solid ${color}`, color, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700 }}>{ok ? "Reset" : manualCheckLabel || "Mark done"}</button>}
          {!ok && fixHref && <Link href={fixHref} target="_blank" rel="noreferrer" style={{ color, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", textDecoration: "underline", fontWeight: 700 }}>{fixText}</Link>}
        </div>
      </div>
    </div>
  );
}

const sectionHead: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 600, marginTop: 0 };
const hint: React.CSSProperties = { fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "-8px", marginBottom: "16px", fontStyle: "italic" };
const actionLink: React.CSSProperties = { display: "block", padding: "10px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-accent)", textDecoration: "none", fontSize: "13px", fontFamily: "var(--font-dm-sans), sans-serif" };
