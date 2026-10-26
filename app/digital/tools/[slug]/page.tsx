"use client";

import { useState, use } from "react";
import { PageHero, Button, Note } from "@/app/components/ui";
import { getTool, type AIToolField } from "@/lib/ai-tools";
import s from "../../_demo/demo.module.css";
import { ToolsKicker } from "../../_demo/parts";

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

interface FaqData {
  faqs: { question: string; answer: string }[];
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
      <main>
        <PageHero
          kicker={<ToolsKicker />}
          title="Tool not found"
          lede="No tool lives at this address. The full list is on the tools page."
          actions={<Button href="/digital/tools">See all the tools</Button>}
        />
      </main>
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
        setError(data.error || "The tool did not return a result. Try again.");
        setBusy(false);
        return;
      }
      setResult(data);
    } catch {
      setError("The request did not reach the server. Check your connection and try again.");
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
    <main>
      <PageHero kicker={<ToolsKicker>Free AI tools</ToolsKicker>} title={tool.name} lede={tool.description} />

      <div className={`ui-wrap ${s.body}`}>
        <div style={{ maxWidth: 760 }}>
          <form
            className={s.form}
            onSubmit={(e) => { e.preventDefault(); if (!busy) generate(); }}
          >
            <div className={s.grid}>
              {tool.fields.map((field) => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={input[field.name] || ""}
                  onChange={(v) => setInput((prev) => ({ ...prev, [field.name]: v }))}
                />
              ))}
              {error && <p className={s.error} role="alert">{error}</p>}
              <div>
                <button type="submit" disabled={busy} className={`ui-btn ${s.primary}`}>
                  {busy ? "Writing the result" : "Run the tool"}
                </button>
              </div>
            </div>
          </form>

          {result && (
            <section className={s.output} aria-live="polite">
              <div className={s.spread} style={{ marginBottom: 16, alignItems: "center" }}>
                <h2 className={s.sub} style={{ margin: 0 }}>Result</h2>
                <button type="button" onClick={copy} className={`${s.btn} ${copied ? s.btnOn : ""}`}>{copied ? "Copied" : "Copy the result"}</button>
              </div>

              {result.format === "json-palette" && <PaletteDisplay data={result.data as PaletteData} />}
              {result.format === "json-faqs" && <FaqDisplay data={result.data as FaqData} />}
              {result.format === "json-list" && <JSONDisplay data={result.data} />}
              {(result.format === "markdown" || result.format === "plain") && (
                <pre className={s.result}>{result.content}</pre>
              )}

              <div style={{ marginTop: 24 }}>
                <Note>If the result misses, change your inputs above and run it again. Each run starts fresh.</Note>
              </div>
            </section>
          )}
        </div>

        {/* The Starter Kit upsell sits on every tool page. */}
        <section style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid var(--line)", maxWidth: 760 }}>
          <h2 className={s.sub} style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>The PV AI Starter Kit: all 24 prompts for $19</h2>
          <p className="ui-muted" style={{ margin: 0 }}>
            The kit has 24 AI prompts, this one included, plus 5 sales scripts, the full rep handbook, 50+ cold-outreach templates, a contractor agreement and a CRM file in CSV. Every file is editable. It costs $19 once and downloads right away.
          </p>
          <div className={s.actions} style={{ marginTop: 24 }}>
            <Button href="/shop/starter-kit">See the Starter Kit</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

function FieldInput({ field, value, onChange }: { field: AIToolField; value: string; onChange: (v: string) => void }) {
  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(e.target.value),
    placeholder: field.placeholder,
  };

  return (
    <label className="ui-field">
      <span className="ui-small ui-muted">{field.label}{field.required && " (required)"}</span>
      {field.type === "textarea" && <textarea {...common} rows={4} />}
      {field.type === "text" && <input type="text" {...common} />}
      {field.type === "number" && <input type="number" {...common} />}
      {field.type === "select" && (
        <select {...common}>
          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {field.helpText && <span className={s.help}>{field.helpText}</span>}
    </label>
  );
}

function PaletteDisplay({ data }: { data: PaletteData }) {
  if (!data?.palette) return <JSONDisplay data={data} />;
  return (
    <div>
      <div className={s.swatches}>
        {data.palette.map((c, i) => (
          <div key={i}>
            {/* The swatch colour comes from the model's output, so it stays an inline value. */}
            <div className={s.swatch} style={{ background: c.hex }} />
            <p className={s.swatchName}>{c.name}</p>
            <p className={s.swatchHex}>{c.hex}</p>
            <p className={s.swatchText}><strong style={{ color: "var(--fg-2)" }}>{c.role}.</strong> {c.useFor}</p>
          </div>
        ))}
      </div>
      {data.voice && (
        <div style={{ marginTop: 28 }}>
          <Note>{data.voice}</Note>
        </div>
      )}
    </div>
  );
}

function FaqDisplay({ data }: { data: FaqData }) {
  if (!data?.faqs) return <JSONDisplay data={data} />;
  return (
    <div className="ui-faq">
      {data.faqs.map((f, i) => (
        <details key={i} open={i < 3}>
          <summary>{f.question}</summary>
          <div>{f.answer}</div>
        </details>
      ))}
    </div>
  );
}

function JSONDisplay({ data }: { data: unknown }) {
  return <pre className={`${s.result} ${s.resultCode}`}>{JSON.stringify(data, null, 2)}</pre>;
}
// generateStaticParams is not available on a "use client" page. Dynamic rendering is fine
// for 26 tools. The page metadata comes from layout.tsx in this folder.
