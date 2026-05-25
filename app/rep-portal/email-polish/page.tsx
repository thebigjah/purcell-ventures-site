"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

interface Polish {
  polished_subject: string;
  polished_body: string;
  what_changed: string[];
  subject_alternatives: string[];
  voice_notes: string;
}

export default function EmailPolishPage() {
  const [draft, setDraft] = useState("");
  const [scenario, setScenario] = useState("");
  const [polish, setPolish] = useState<Polish | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function run() {
    setError(null);
    setBusy(true);
    setPolish(null);
    try {
      const res = await fetch("/api/email-polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: draft.trim(), scenario: scenario.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setPolish(data.polish);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Email Polish</div>
            <h1>
              Sharpen <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>a draft.</em>
            </h1>
            <p className="deck">
              Paste your rough email. AI tightens it, suggests subject lines, tells you what changed — while keeping your voice. Use after you write, before you send.
            </p>
          </header>

          {/* Input */}
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={inputLabel}>Scenario / context (optional)</label>
                <input type="text" value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="e.g., 'Follow-up to Sarah after Tuesday call, she went silent'" style={fieldStyle} />
              </div>
              <div>
                <label style={inputLabel}>Your draft *</label>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Paste your rough draft. Include subject line if you have one. Don't sanitize — write how you'd write."
                  style={{ ...fieldStyle, minHeight: "240px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }}
                />
              </div>
              {error && (
                <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>{error}</div>
              )}
              <button onClick={run} disabled={busy} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
                {busy ? "Polishing…" : "Polish my draft"}
              </button>
            </div>
          </div>

          {/* Result */}
          {polish && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Polished subject */}
              <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, margin: 0 }}>Subject</h3>
                  <button onClick={() => copy(polish.polished_subject, "subject")} style={ghostBtn}>{copied === "subject" ? "✓ Copied" : "Copy"}</button>
                </div>
                <p style={{ margin: 0, fontSize: "16px", color: "var(--color-warm-text)", fontWeight: 600 }}>{polish.polished_subject}</p>
                {polish.subject_alternatives.length > 0 && (
                  <details style={{ marginTop: "10px" }}>
                    <summary style={{ cursor: "pointer", fontSize: "11px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>Subject alternatives</summary>
                    <ul style={{ paddingLeft: "20px", margin: "6px 0 0", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
                      {polish.subject_alternatives.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </details>
                )}
              </div>

              {/* Polished body */}
              <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, margin: 0 }}>Polished body</h3>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => copy(polish.polished_body, "body")} style={ghostBtn}>{copied === "body" ? "✓ Copied" : "Copy body"}</button>
                    <button onClick={() => copy(`Subject: ${polish.polished_subject}\n\n${polish.polished_body}`, "both")} style={ghostBtn}>{copied === "both" ? "✓ Copied" : "Copy both"}</button>
                  </div>
                </div>
                <pre style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, padding: "16px 18px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)" }}>{polish.polished_body}</pre>
              </div>

              {/* What changed */}
              {polish.what_changed.length > 0 && (
                <div style={{ padding: "14px 18px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px", marginTop: 0 }}>What I changed</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {polish.what_changed.map((c, i) => <li key={i} style={{ marginBottom: "4px" }}>{c}</li>)}
                  </ul>
                </div>
              )}

              {/* Voice note */}
              <div style={{ padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, fontStyle: "italic" }}>
                <strong style={{ color: "var(--color-warm-accent)", fontStyle: "normal" }}>Voice read:</strong> {polish.voice_notes}
              </div>
            </div>
          )}

          <p style={{ marginTop: "32px", fontSize: "11px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Different from <Link href="/digital/tools/email-composer" style={{ color: "var(--color-warm-accent)" }}>AI Email Composer</Link> (generates from scratch). Different from <Link href="/rep-portal/templates" style={{ color: "var(--color-warm-accent)" }}>Templates</Link> (saved go-to emails). This is for: you already wrote something, just need it sharper.
          </p>

        </main>
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "6px 12px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
