"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

interface Coaching {
  overall_grade: string;
  what_works: string[];
  what_doesnt: string[];
  missing_elements: string[];
  tightened_version: string;
  delivery_notes: string[];
  anticipated_objections: string[];
}

export default function PitchCoachPage() {
  const [pitch, setPitch] = useState("");
  const [scenario, setScenario] = useState("");
  const [service, setService] = useState("");
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedTightened, setCopiedTightened] = useState(false);

  async function run() {
    setError(null);
    setBusy(true);
    setCoaching(null);
    try {
      const res = await fetch("/api/pitch-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch: pitch.trim(), scenario: scenario.trim(), service: service.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setCoaching(data.coaching);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  function copyTightened() {
    if (!coaching) return;
    navigator.clipboard.writeText(coaching.tightened_version);
    setCopiedTightened(true);
    setTimeout(() => setCopiedTightened(false), 1500);
  }

  function adoptTightened() {
    if (!coaching) return;
    setPitch(coaching.tightened_version);
    setCoaching(null);
  }

  const gradeColor = coaching ? (
    coaching.overall_grade === "A" ? "#4a9a6a" :
    coaching.overall_grade === "B" ? "#7aaa6a" :
    coaching.overall_grade === "C" ? "#e8b968" :
    coaching.overall_grade === "D" ? "#c2754a" :
    "#e54a28"
  ) : "var(--color-warm-text)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Pitch Coach</div>
            <h1>
              Sharpen <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>your pitch.</em>
            </h1>
            <p className="deck">
              Paste your pitch script. AI grades it, calls out what&apos;s strong + what&apos;s weak, and returns a tightened rewrite in your voice. Use between calls to get sharper before the next one.
            </p>
          </header>

          {/* Input */}
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={inputLabel}>Scenario</label>
                  <input type="text" value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="e.g., 'Cold call to a salon owner'" style={fieldStyle} />
                </div>
                <div>
                  <label style={inputLabel}>Service being pitched</label>
                  <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g., Digital Growth $179/mo" style={fieldStyle} />
                </div>
              </div>
              <div>
                <label style={inputLabel}>Your pitch script *</label>
                <textarea
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Paste exactly what you plan to say. Don't sanitize it, the more authentic the input, the more useful the critique."
                  style={{ ...fieldStyle, minHeight: "220px", resize: "vertical", fontFamily: "var(--font-inter), sans-serif" }}
                />
              </div>
              {error && (
                <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>{error}</div>
              )}
              <button onClick={run} disabled={busy} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
                {busy ? "Coaching…" : "Critique my pitch"}
              </button>
            </div>
          </div>

          {/* Result */}
          {coaching && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Grade */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "20px", alignItems: "center", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: `2px solid ${gradeColor}` }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "72px", fontWeight: 700, color: gradeColor, lineHeight: 1 }}>{coaching.overall_grade}</div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: gradeColor, marginTop: "4px", fontWeight: 700 }}>Overall</div>
                </div>
                <div>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Grade reflects: clarity, specificity, ethical posture, ask-and-listen balance, anticipation of objections, fit between your service and the scenario. <strong style={{ color: "var(--color-warm-text)" }}>C is average, most first-draft pitches grade C-D. Iteration is the point.</strong>
                  </p>
                </div>
              </div>

              {/* What works + What doesn't */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "16px 18px", background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7aaa6a", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>What works</h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {coaching.what_works.map((w, i) => <li key={i} style={{ marginBottom: "6px" }}>{w}</li>)}
                  </ul>
                </div>
                <div style={{ padding: "16px 18px", background: "rgba(229, 74, 40, 0.06)", border: "1px solid #e54a28" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e54a28", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>What doesn&apos;t</h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {coaching.what_doesnt.map((w, i) => <li key={i} style={{ marginBottom: "6px" }}>{w}</li>)}
                  </ul>
                </div>
              </div>

              {/* Missing elements */}
              {coaching.missing_elements.length > 0 && (
                <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Missing, should be in this pitch</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {coaching.missing_elements.map((m, i) => <li key={i} style={{ marginBottom: "4px" }}>{m}</li>)}
                  </ul>
                </div>
              )}

              {/* Tightened version */}
              <div style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "2px solid #7aaa6a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#7aaa6a", fontWeight: 600, margin: 0 }}>Tightened version</h3>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={copyTightened} style={{ ...ghostBtn, color: "#7aaa6a", borderColor: "#7aaa6a" }}>{copiedTightened ? "✓ Copied" : "Copy"}</button>
                    <button onClick={adoptTightened} style={{ ...ghostBtn, background: "#7aaa6a", color: "var(--color-warm-bg)", borderColor: "#7aaa6a" }}>Use this as new pitch</button>
                  </div>
                </div>
                <pre style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, padding: "16px 18px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)" }}>{coaching.tightened_version}</pre>
              </div>

              {/* Delivery notes */}
              {coaching.delivery_notes.length > 0 && (
                <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Delivery notes — HOW to say it</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {coaching.delivery_notes.map((n, i) => <li key={i} style={{ marginBottom: "6px" }}>{n}</li>)}
                  </ul>
                </div>
              )}

              {/* Anticipated objections */}
              {coaching.anticipated_objections.length > 0 && (
                <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>If this lands, expect these objections</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {coaching.anticipated_objections.map((o, i) => <li key={i} style={{ marginBottom: "6px" }}>{o}</li>)}
                  </ul>
                  <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>Pre-rehearse responses in <Link href="/rep-portal/objections" style={{ color: "var(--color-warm-accent)" }}>Objections</Link>.</p>
                </div>
              )}
            </div>
          )}

          <p style={{ marginTop: "32px", fontSize: "11px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Pairs with: <Link href="/rep-portal/scripts" style={{ color: "var(--color-warm-accent)" }}>Scripts</Link> (proven frameworks) + <Link href="/rep-portal/objections" style={{ color: "var(--color-warm-accent)" }}>Objections</Link> (mid-call responses) + <Link href="/rep-portal/templates" style={{ color: "var(--color-warm-accent)" }}>Templates</Link> (reusable emails).
          </p>

        </main>
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "15px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
