"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

interface ObjectionResult {
  objection_read: string;
  responses: Array<{
    strategy: string;
    approach: string;
    exact_words: string;
    when_to_use: string;
  }>;
  what_not_to_do: string[];
  if_they_still_object_after_this: string;
}

const COMMON_OBJECTIONS = [
  "It's too expensive",
  "We already have a website",
  "We use HubSpot / Salesforce already",
  "I need to think about it",
  "Send me more info and I'll get back to you",
  "Can you do it cheaper?",
  "Why not just hire a freelancer for $30/hr?",
  "I don't have time right now",
  "We tried AI tools before and they didn't work",
  "What if I cancel after a month?",
];

export default function ObjectionsPage() {
  const [objection, setObjection] = useState("");
  const [context, setContext] = useState("");
  const [service, setService] = useState("");
  const [result, setResult] = useState<ObjectionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  async function run() {
    if (!objection.trim()) {
      setError("Paste what the prospect said.");
      return;
    }
    setError(null);
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/objection-handler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objection: objection.trim(), context: context.trim(), service: service.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setResult(data.handler);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  function copyResponse(idx: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  function loadCommon(s: string) {
    setObjection(s);
    setResult(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Objection Handler</div>
            <h1>
              They said <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>what?</em>
            </h1>
            <p className="deck">
              Paste the objection a prospect just gave you. AI returns 3 distinct response strategies, agree-and-pivot, clarifying-question, direct-pushback, with word-for-word language. Pick the one that fits the moment.
            </p>
          </header>

          {/* Input */}
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={inputLabel}>What did they say? *</label>
                <textarea value={objection} onChange={(e) => setObjection(e.target.value)} placeholder="e.g., 'It's too expensive. We can't afford $179/month right now.'" style={{ ...fieldStyle, minHeight: "80px", resize: "vertical" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={inputLabel}>Service being discussed</label>
                  <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g., Digital Growth" style={fieldStyle} />
                </div>
                <div>
                  <label style={inputLabel}>Conversation context (optional)</label>
                  <input type="text" value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g., 'Toured their salon, owner is fence-sitting'" style={fieldStyle} />
                </div>
              </div>
              {error && (
                <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>{error}</div>
              )}
              <button onClick={run} disabled={busy} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
                {busy ? "Thinking…" : "Get 3 response strategies"}
              </button>
            </div>

            {/* Common objections quick-load */}
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--color-warm-border)" }}>
              <h4 style={{ fontSize: "10px", color: "var(--color-warm-accent)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Common objections (click to load)</h4>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {COMMON_OBJECTIONS.map((o) => (
                  <button key={o} onClick={() => loadCommon(o)} style={{ padding: "5px 10px", background: "var(--color-warm-bg)", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", cursor: "pointer", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                    &ldquo;{o}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Diagnosis */}
              <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", borderLeft: "3px solid var(--color-warm-accent)" }}>
                <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px", marginTop: 0 }}>What they're really saying</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6, fontStyle: "italic" }}>{result.objection_read}</p>
              </div>

              {/* 3 responses */}
              {result.responses.map((r, i) => {
                const colors = ["#7aaa6a", "var(--color-warm-accent)", "#9b7fd4"];
                const color = colors[i] || "var(--color-warm-text)";
                return (
                  <div key={i} style={{ background: "var(--color-warm-bg-alt)", border: `1px solid ${color}`, padding: "20px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: color, margin: 0, fontWeight: 600 }}>
                        Option {i + 1} · {r.strategy}
                      </h3>
                      <button onClick={() => copyResponse(i, r.exact_words)} style={{ padding: "6px 12px", background: "transparent", color: color, border: `1px solid ${color}`, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 }}>
                        {copied === i ? "✓ Copied" : "Copy words"}
                      </button>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", marginBottom: "12px" }}>{r.approach}</p>
                    <blockquote style={{ margin: "0 0 12px", padding: "14px 18px", background: "var(--color-warm-bg)", borderLeft: `3px solid ${color}`, fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.7, fontStyle: "italic" }}>
                      &ldquo;{r.exact_words}&rdquo;
                    </blockquote>
                    <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--color-warm-text)" }}>When to use:</strong> {r.when_to_use}
                    </p>
                  </div>
                );
              })}

              {/* What not to do */}
              {result.what_not_to_do.length > 0 && (
                <div style={{ padding: "16px 20px", background: "rgba(229, 74, 40, 0.06)", border: "1px solid rgba(229, 74, 40, 0.3)" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e54a28", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Don't do these</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                    {result.what_not_to_do.map((w, i) => <li key={i} style={{ marginBottom: "4px" }}>{w}</li>)}
                  </ul>
                </div>
              )}

              {/* If they still object */}
              <div style={{ padding: "14px 18px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, fontStyle: "italic" }}>
                <strong style={{ color: "var(--color-warm-accent)", fontStyle: "normal", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "10px" }}>If they still object after this · </strong>
                {result.if_they_still_object_after_this}
              </div>
            </div>
          )}

          <p style={{ marginTop: "32px", fontSize: "11px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Pairs with the <Link href="/rep-portal/scripts" style={{ color: "var(--color-warm-accent)" }}>Scripts</Link> library + <Link href="/rep-portal/ask" style={{ color: "var(--color-warm-accent)" }}>Ask</Link> chatbot. Save the responses you use most as templates in <Link href="/rep-portal/templates" style={{ color: "var(--color-warm-accent)" }}>Templates</Link>.
          </p>

        </main>
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "15px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
