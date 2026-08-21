"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { loadContacts, upsertContact, addActivity, type Contact, type Stage } from "@/lib/crm-storage";

interface Recap {
  outcome: string;
  key_points: string[];
  objections_raised: string[];
  they_committed_to: string[];
  we_committed_to: string[];
  next_action: {
    what: string;
    when: string;
    channel: string;
  };
  vibe: string;
  stage_change_suggested: string;
  stage_change_reason: string;
  estimated_value_update: number | null;
}

export default function CallRecapPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [recap, setRecap] = useState<Recap | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const selectedContact = contactId ? contacts.find((c) => c.id === contactId) : null;

  async function run() {
    setError(null);
    setBusy(true);
    setRecap(null);
    setSaved(false);
    try {
      const res = await fetch("/api/call-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notes: notes.trim(),
          contactName: selectedContact ? [selectedContact.firstName, selectedContact.lastName].filter(Boolean).join(" ") : null,
          currentStage: selectedContact?.stage,
          currentValue: selectedContact?.estimatedValue,
          service: selectedContact?.service,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setRecap(data.recap);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  function saveToContact() {
    if (!recap || !selectedContact) return;

    // Build the structured description
    const description = `Call recap: ${recap.outcome}`;
    const outcome = [
      recap.key_points.length > 0 ? `Key: ${recap.key_points.join(" · ")}` : null,
      recap.objections_raised.length > 0 ? `Objections: ${recap.objections_raised.join(" · ")}` : null,
      recap.we_committed_to.length > 0 ? `We owe: ${recap.we_committed_to.join(" · ")}` : null,
      recap.they_committed_to.length > 0 ? `They owe: ${recap.they_committed_to.join(" · ")}` : null,
      `Next: ${recap.next_action.what} (${recap.next_action.when}, ${recap.next_action.channel})`,
      `Vibe: ${recap.vibe}`,
    ].filter(Boolean).join(" | ");

    addActivity(selectedContact.id, {
      type: "call",
      date: new Date().toISOString(),
      description,
      outcome,
    });

    // Optionally apply stage change + value update
    const updated = { ...selectedContact };
    const STAGES_VALID: Stage[] = ["Lead", "Contacted", "Qualified", "Quoted", "Negotiation", "Closed Won", "Closed Lost"];
    if (recap.stage_change_suggested !== "no-change" && STAGES_VALID.includes(recap.stage_change_suggested as Stage)) {
      updated.stage = recap.stage_change_suggested as Stage;
      if (updated.stage === "Closed Won" || updated.stage === "Closed Lost") {
        updated.closedAt = new Date().toISOString();
      }
    }
    if (recap.estimated_value_update && recap.estimated_value_update > 0) {
      updated.estimatedValue = recap.estimated_value_update;
    }
    upsertContact(updated);
    setSaved(true);
    setContacts(loadContacts());
  }

  const vibeColor = recap ? (
    recap.vibe === "hot" ? "#e54a28" :
    recap.vibe === "warm" ? "#7aaa6a" :
    recap.vibe === "neutral" ? "var(--color-warm-text-muted)" :
    recap.vibe === "cool" ? "#e8b968" :
    "#6a4a4a"
  ) : "var(--color-warm-text)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Call Recap</div>
            <h1>
              Just hung up. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Now what?</em>
            </h1>
            <p className="deck">
              Dump your messy notes. AI structures them into outcome + key points + commitments + next action. One-click save to the contact&apos;s activity log + auto-apply suggested stage change.
            </p>
          </header>

          {/* Input */}
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={inputLabel}>Which contact did you just call? (optional but recommended)</label>
                <select value={contactId} onChange={(e) => setContactId(e.target.value)} style={fieldStyle}>
                  <option value="">— Not yet (just structure the notes) —</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {[c.firstName, c.lastName].filter(Boolean).join(" ") || "(unnamed)"} {c.company && `· ${c.company}`} · {c.stage}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={inputLabel}>Your notes from the call *</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type or paste, abbreviations, fragments, scribbles all fine. AI will structure. Example: 'Sarah called back, ok w/ $179/mo but wants to skip setup fee. Mentioned a competitor — Greenleaf? Said decision by Friday. Sounded enthusiastic.'"
                  style={{ ...fieldStyle, minHeight: "180px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }}
                />
              </div>
              {error && (
                <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>{error}</div>
              )}
              <button onClick={run} disabled={busy} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
                {busy ? "Structuring…" : "Structure my notes"}
              </button>
            </div>
          </div>

          {/* Result */}
          {recap && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Outcome + Vibe */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "center", padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: `2px solid ${vibeColor}` }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: vibeColor, fontWeight: 700, marginBottom: "6px", marginTop: 0 }}>Outcome</h3>
                  <p style={{ margin: 0, fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{recap.outcome}</p>
                </div>
                <div style={{ textAlign: "center", minWidth: "80px" }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: vibeColor, lineHeight: 1, textTransform: "uppercase" }}>{recap.vibe}</div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase", color: vibeColor, marginTop: "2px" }}>Vibe</div>
                </div>
              </div>

              {/* Key points + Objections */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {recap.key_points.length > 0 && (
                  <RecapList title="Key points" color="var(--color-warm-accent)" items={recap.key_points} />
                )}
                {recap.objections_raised.length > 0 && (
                  <RecapList title="Objections raised" color="#e54a28" items={recap.objections_raised} />
                )}
              </div>

              {/* Commitments side-by-side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {recap.we_committed_to.length > 0 && (
                  <RecapList title="WE committed to" color="#9b7fd4" items={recap.we_committed_to} />
                )}
                {recap.they_committed_to.length > 0 && (
                  <RecapList title="THEY committed to" color="#7aaa6a" items={recap.they_committed_to} />
                )}
              </div>

              {/* Next action, big and prominent */}
              <div style={{ padding: "20px 24px", background: "rgba(212, 175, 55, 0.06)", border: "2px solid var(--color-warm-accent)" }}>
                <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>Next Action</h3>
                <p style={{ margin: "0 0 8px", fontSize: "17px", color: "var(--color-warm-text)", lineHeight: 1.5, fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600 }}>{recap.next_action.what}</p>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
                  <strong style={{ color: "var(--color-warm-accent)" }}>When:</strong> {recap.next_action.when} &nbsp;·&nbsp;
                  <strong style={{ color: "var(--color-warm-accent)" }}>Channel:</strong> {recap.next_action.channel}
                </p>
              </div>

              {/* Stage change + value */}
              {(recap.stage_change_suggested !== "no-change" || recap.estimated_value_update) && (
                <div style={{ padding: "14px 18px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px", marginTop: 0 }}>Suggested updates</h3>
                  {recap.stage_change_suggested !== "no-change" && (
                    <p style={{ margin: "0 0 4px", fontSize: "13px", color: "var(--color-warm-text)" }}>
                      <strong>Stage → {recap.stage_change_suggested}</strong> · <em style={{ color: "var(--color-warm-text-muted)" }}>{recap.stage_change_reason}</em>
                    </p>
                  )}
                  {recap.estimated_value_update && (
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--color-warm-text)" }}>
                      <strong>Value → ${recap.estimated_value_update.toLocaleString()}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Save action */}
              {selectedContact && !saved && (
                <button onClick={saveToContact} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", padding: "12px", fontSize: "14px" }}>
                  Log this to {[selectedContact.firstName, selectedContact.lastName].filter(Boolean).join(" ") || "contact"} + apply suggested updates
                </button>
              )}
              {saved && (
                <div style={{ padding: "14px 18px", background: "rgba(122, 170, 106, 0.1)", border: "2px solid #7aaa6a", textAlign: "center", color: "#7aaa6a", fontSize: "14px", fontWeight: 600 }}>
                  ✓ Saved to activity log. Stage + value applied. <Link href={`/rep-portal/crm/${selectedContact?.id}`} style={{ color: "#7aaa6a", textDecoration: "underline" }}>Open contact</Link>
                </div>
              )}
              {!selectedContact && (
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic", textAlign: "center" }}>
                  No contact selected. Copy what you need or pick a contact above to save automatically.
                </p>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function RecapList({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div style={{ padding: "14px 18px", background: "var(--color-warm-bg-alt)", border: `1px solid ${color}` }}>
      <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
        {items.map((it, i) => <li key={i} style={{ marginBottom: "4px" }}>{it}</li>)}
      </ul>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
