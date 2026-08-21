"use client";

import { useState } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface FAQ {
  question: string;
  answer: string;
}

export default function AIFaqBuilderPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"html" | "markdown" | "json" | null>(null);

  async function generate() {
    if (!businessName.trim() || !businessDescription.trim()) {
      setError("Business name + description are required.");
      return;
    }
    setError(null);
    setBusy(true);
    setFaqs([]);
    try {
      const topicsArr = topics.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch("/api/ai-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          businessDescription: businessDescription.trim(),
          topics: topicsArr,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Generation failed.");
        setBusy(false);
        return;
      }
      setFaqs(data.faqs || []);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function asMarkdown(): string {
    return faqs.map((f) => `### ${f.question}\n\n${f.answer}\n`).join("\n");
  }

  function asHTML(): string {
    return `<dl class="faq">\n${faqs.map((f) => `  <dt>${f.question}</dt>\n  <dd>${f.answer}</dd>`).join("\n")}\n</dl>`;
  }

  function copyAs(format: "html" | "markdown" | "json") {
    const text = format === "html" ? asHTML() : format === "markdown" ? asMarkdown() : JSON.stringify({ faqs }, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">Digital · AI FAQ Builder</div>
          <h1>
            FAQs <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>in a minute.</em>
          </h1>
          <p className="deck">
            Tell us about your business. Get back 6-10 customer-quality FAQ pairs you can drop straight onto your site.
          </p>
        </header>

        {/* Form */}
        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "28px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={inputLabel}>Business name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Bob's Plumbing"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={inputLabel}>What does the business do? * (2-4 sentences)</label>
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="e.g., Family-owned residential plumbing serving Metro Atlanta since 1995. Service calls, water heater installs, drain cleaning, and full re-pipes. Licensed, insured, 24/7 emergency response."
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              />
            </div>
            <div>
              <label style={inputLabel}>Topic hints (optional, comma-separated)</label>
              <input
                type="text"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="e.g., emergency calls, warranty, after-hours pricing, payment methods"
                style={inputStyle}
              />
              <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "4px", fontStyle: "italic" }}>
                Leave blank for general FAQs. Add hints to steer toward specific topics customers ask about.
              </p>
            </div>
            {error && (
              <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>
                {error}
              </div>
            )}
            <button
              onClick={generate}
              disabled={busy}
              className="pv-btn-primary"
              style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}
            >
              {busy ? "Generating…" : "Generate FAQs"}
            </button>
          </div>
        </div>

        {/* Results */}
        {faqs.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>
                Your FAQs ({faqs.length})
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => copyAs("markdown")} style={copyBtn}>
                  {copied === "markdown" ? "Copied!" : "Copy as Markdown"}
                </button>
                <button onClick={() => copyAs("html")} style={copyBtn}>
                  {copied === "html" ? "Copied!" : "Copy as HTML"}
                </button>
                <button onClick={() => copyAs("json")} style={copyBtn}>
                  {copied === "json" ? "Copied!" : "Copy as JSON"}
                </button>
              </div>
            </div>

            <div>
              {faqs.map((f, i) => (
                <details
                  key={i}
                  open={i < 3}
                  style={{ borderBottom: "1px solid var(--color-warm-border)", padding: "16px 0" }}
                >
                  <summary style={{ cursor: "pointer", fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-text)", fontWeight: 600, listStyle: "none" }}>
                    {f.question}
                  </summary>
                  <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>

            <div style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--color-warm-text)" }}>Not quite right?</strong> Edit your description above and regenerate. The model uses your wording, give it more specifics about your customers&apos; common confusions and it sharpens up.
            </div>
          </div>
        )}

        <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic", marginTop: "48px" }}>
          AI FAQ Builder · part of Purcell Ventures Digital Services. Built using Claude Haiku 4.5.
        </p>

      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--color-warm-bg)",
  color: "var(--color-warm-text)",
  border: "1px solid var(--color-warm-border)",
  borderRadius: 0,
  fontSize: "15px",
  fontFamily: "var(--font-inter), sans-serif",
};

const inputLabel: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--color-warm-accent)",
  marginBottom: "6px",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

const copyBtn: React.CSSProperties = {
  padding: "6px 12px",
  background: "transparent",
  color: "var(--color-warm-text-muted)",
  border: "1px solid var(--color-warm-border)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontFamily: "var(--font-dm-sans), sans-serif",
  cursor: "pointer",
  borderRadius: 0,
};
