"use client";

import { useState } from "react";
import { PageHero, Note } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { ToolsKicker } from "../_demo/parts";

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
      setError("Add the business name and a description first.");
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
        setError(data.error || "The FAQs did not generate. Try again.");
        setBusy(false);
        return;
      }
      setFaqs(data.faqs || []);
    } catch {
      setError("The request did not reach the server. Check your connection and try again.");
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
    <main>
      <PageHero
        kicker={<ToolsKicker />}
        title="FAQ builder"
        lede="Describe your business and the builder writes 6 to 10 questions and answers, phrased the way customers ask them, ready to paste onto your site."
      />

      <div className={`ui-wrap ${s.body}`}>
        <div className={s.form} style={{ maxWidth: 760 }}>
          <div className={s.grid}>
            <label className="ui-field">
              <span className="ui-small ui-muted">Business name (required)</span>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g., Bob's Plumbing" />
            </label>
            <label className="ui-field">
              <span className="ui-small ui-muted">What the business does, in 2 to 4 sentences (required)</span>
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="e.g., Family-owned residential plumbing in metro Atlanta since 1995. Service calls, water heater installs, drain cleaning and full re-pipes. Licensed and insured, with emergency calls answered around the clock."
                rows={5}
              />
            </label>
            <label className="ui-field">
              <span className="ui-small ui-muted">Topic hints, separated by commas (optional)</span>
              <input
                type="text"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="e.g., emergency calls, warranty, after-hours pricing, payment methods"
              />
              <span className={s.help}>Leave this blank for general FAQs. Hints steer the answers toward the topics your customers ask about.</span>
            </label>
            {error && <p className={s.error}>{error}</p>}
            <div>
              <button type="button" onClick={generate} disabled={busy} className={`ui-btn ${s.primary}`}>
                {busy ? "Writing your FAQs" : "Write the FAQs"}
              </button>
            </div>
          </div>
        </div>

        {faqs.length > 0 && (
          <section>
            <div className={s.spread} style={{ marginBottom: 20 }}>
              <h2 className={s.sub} style={{ margin: 0 }}>Your FAQs ({faqs.length})</h2>
              <div className={s.actions} style={{ marginTop: 0 }}>
                <button type="button" onClick={() => copyAs("markdown")} className={s.btn}>
                  {copied === "markdown" ? "Copied" : "Copy as Markdown"}
                </button>
                <button type="button" onClick={() => copyAs("html")} className={s.btn}>
                  {copied === "html" ? "Copied" : "Copy as HTML"}
                </button>
                <button type="button" onClick={() => copyAs("json")} className={s.btn}>
                  {copied === "json" ? "Copied" : "Copy as JSON"}
                </button>
              </div>
            </div>

            <div className="ui-faq">
              {faqs.map((f, i) => (
                <details key={i} open={i < 3}>
                  <summary>{f.question}</summary>
                  <div>{f.answer}</div>
                </details>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <Note>
                If an answer misses, edit the description above and run it again. The model works from your wording, so add the questions your customers ask most.
              </Note>
            </div>
          </section>
        )}

        <p className="ui-small ui-muted" style={{ marginTop: 48 }}>
          The FAQ builder is part of the Purcell Ventures digital add-ons. It runs on Claude Haiku 4.5.
        </p>
      </div>
    </main>
  );
}
