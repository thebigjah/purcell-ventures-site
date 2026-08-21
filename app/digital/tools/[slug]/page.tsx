"use client";

import { useState, use } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { AI_TOOLS, getTool, type AIToolField } from "@/lib/ai-tools";

interface PaletteEntry {
  name: string;
  hex: string;
  role: string;
  useFor: string;
}

interface PaletteData {
  palette: PaletteEntry[];
  voice: string;
}

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = getTool(slug);

  const [input, setInput] = useState<Record<string, string>>(() => {
    if (!tool) return {};
    const init: Record<string, string> = {};
    tool.fields.forEach((f) => {
      init[f.name] = f.default !== undefined ? String(f.default) : "";
    });
    return init;
  });
  const [result, setResult] = useState<{ format: string; content?: string; data?: unknown } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!tool) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", padding: "40px" }}>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px" }}>Tool not found</h1>
        <Link href="/digital/tools" style={{ color: "var(--color-warm-accent)" }}>← Back to tools</Link>
      </div>
    );
  }

  async function generate() {
    setError(null);
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch(`/api/ai-tools/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Generation failed.");
        setBusy(false);
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    if (!result) return;
    const text = result.content || JSON.stringify(result.data, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/digital/tools" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          ← All tools
        </Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">{tool.category}</div>
          <h1>
            {tool.name.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>
              {tool.name.split(" ").slice(-1)[0]}
            </em>
          </h1>
          <p className="deck">{tool.description}</p>
        </header>

        {/* Input form */}
        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "28px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            {tool.fields.map((field) => (
              <FieldInput
                key={field.name}
                field={field}
                value={input[field.name] || ""}
                onChange={(v) => setInput((prev) => ({ ...prev, [field.name]: v }))}
              />
            ))}
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
              {busy ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>
                Output
              </h2>
              <button onClick={copy} style={copyBtn}>{copied ? "Copied!" : "Copy"}</button>
            </div>

            {result.format === "json-palette" && <PaletteDisplay data={result.data as PaletteData} />}
            {result.format === "json-list" && <JSONDisplay data={result.data} />}
            {(result.format === "markdown" || result.format === "plain") && (
              <pre style={{
                background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)",
                padding: "24px", whiteSpace: "pre-wrap", wordBreak: "break-word",
                fontFamily: result.format === "plain" ? "var(--font-inter), sans-serif" : "var(--font-dm-sans), monospace",
                fontSize: "14px", lineHeight: 1.7, color: "var(--color-warm-text)",
                maxHeight: "600px", overflowY: "auto",
              }}>{result.content}</pre>
            )}

            <div style={{ marginTop: "20px", padding: "14px 18px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--color-warm-text)" }}>Not quite right?</strong> Tweak your inputs above and regenerate. Each run is a fresh attempt.
            </div>
          </div>
        )}

        {/* Upsell to Starter Kit, appears on every tool page */}
        <Link href="/shop/starter-kit" style={{
          display: "block",
          marginTop: "48px",
          padding: "24px 28px",
          background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))",
          border: "1px solid var(--color-warm-accent)",
          textDecoration: "none",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "6px" }}>
                Like this prompt? Get all 23 — $19
              </div>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", fontWeight: 600, margin: "0 0 6px" }}>
                The PV AI Starter Kit
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.5 }}>
                23 production AI prompts (including this one), 5 sales scripts, full rep handbook, 50+ cold-outreach templates, contractor agreement, CRM CSV. Editable. Yours forever. $19 one-time, instant download.
              </p>
            </div>
            <span style={{
              padding: "12px 24px",
              background: "var(--color-warm-accent)",
              color: "var(--color-warm-bg)",
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "14px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}>
              See the kit →
            </span>
          </div>
        </Link>

      </main>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: AIToolField; value: string; onChange: (v: string) => void }) {
  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(e.target.value),
    placeholder: field.placeholder,
    style: {
      width: "100%", padding: "12px 14px",
      background: "var(--color-warm-bg)", color: "var(--color-warm-text)",
      border: "1px solid var(--color-warm-border)", borderRadius: 0,
      fontSize: "15px", fontFamily: "var(--font-inter), sans-serif",
    },
  };

  return (
    <div>
      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "6px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {field.label}{field.required && " *"}
      </label>
      {field.type === "textarea" && <textarea {...common} style={{ ...common.style, minHeight: "100px", resize: "vertical" }} />}
      {field.type === "text" && <input type="text" {...common} />}
      {field.type === "number" && <input type="number" {...common} />}
      {field.type === "select" && (
        <select {...common}>
          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {field.helpText && (
        <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "4px", fontStyle: "italic" }}>{field.helpText}</p>
      )}
    </div>
  );
}

function PaletteDisplay({ data }: { data: PaletteData }) {
  if (!data?.palette) return <pre>{JSON.stringify(data, null, 2)}</pre>;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        {data.palette.map((c, i) => (
          <div key={i} style={{ border: "1px solid var(--color-warm-border)", overflow: "hidden" }}>
            <div style={{ background: c.hex, height: "100px" }} />
            <div style={{ padding: "12px 14px", background: "var(--color-warm-bg-alt)" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", color: "var(--color-warm-accent)", marginTop: "2px" }}>{c.hex}</div>
              <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginTop: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.role}</div>
              <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "6px", lineHeight: 1.5 }}>{c.useFor}</div>
            </div>
          </div>
        ))}
      </div>
      {data.voice && (
        <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontStyle: "italic", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
          {data.voice}
        </div>
      )}
    </div>
  );
}

function JSONDisplay({ data }: { data: unknown }) {
  return (
    <pre style={{
      background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)",
      padding: "24px", whiteSpace: "pre-wrap", wordBreak: "break-word",
      fontFamily: "var(--font-dm-sans), monospace",
      fontSize: "13px", lineHeight: 1.6, color: "var(--color-warm-text)",
      maxHeight: "600px", overflowY: "auto",
    }}>{JSON.stringify(data, null, 2)}</pre>
  );
}

const copyBtn: React.CSSProperties = {
  padding: "6px 14px", background: "transparent", color: "var(--color-warm-text-muted)",
  border: "1px solid var(--color-warm-border)", fontSize: "10px", fontWeight: 700,
  letterSpacing: "0.2em", textTransform: "uppercase",
  fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", borderRadius: 0,
};
// Note: generateStaticParams removed because this is a "use client" page.
// Dynamic rendering is fine for the volume here; if static rendering matters
// later, split into a server-component shell + client interactivity wrapper.
