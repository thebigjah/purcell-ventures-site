"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHero, Note } from "@/app/components/ui";
import s from "../_demo/demo.module.css";
import { ToolsKicker, AboutTool } from "../_demo/parts";
import FaqBlock, { type QA } from "@/app/components/FaqBlock";

interface FAQ {
  question: string;
  answer: string;
}

// Questions about this tool, shown on the page and sent as FAQPage schema.
const QA: QA[] = [
  ["What does the AI FAQ builder write?",
   "It writes 6 to 10 questions phrased the way customers ask them, each with an answer of one to three sentences. It works from your business name, two to four sentences on what you do and optional topic hints."],
  ["Should I put private details in the description?",
   "No. The description goes to an AI model to write the answers, so leave out anything private. The tool needs no account."],
  ["How do I add the FAQ to my website?",
   "Copy the result as Markdown, HTML or JSON and paste it into your website builder. Read each answer first and fix anything it gets wrong, especially prices and promises."],
];

const ABOUT = [
  {
    h: "Who the FAQ builder is for",
    p: [
      "Business owners who answer the same customer questions on the phone every week and have never written them down. Give it the business name, two to four sentences on what you do, and optional topic hints such as warranty or payment methods.",
      "It writes 6 to 10 questions phrased the way customers ask them, each with an answer of one to three sentences. The set covers cost, how the work happens, why a customer can trust you, what sets you apart, and the edge cases people ask about.",
    ],
  },
  {
    h: "What it replaces",
    p: [
      "Writing an FAQ page from a blank document, or copying a generic one that does not fit your business. The answers are drafts written from your description. Read each one and fix anything it gets wrong before it goes on your site, especially prices and promises.",
    ],
  },
  {
    h: "How setup works",
    p: [
      "There is no account. Fill in the form and choose Write the FAQs. Your description is sent to an AI model to write the answers, so leave out anything private. Copy the result as Markdown, HTML or JSON and paste it into your website builder.",
    ],
  },
  {
    h: "The version on your own website",
    p: [
      <>The AI FAQ Builder, running on your site, is in the Growth plan, which I quote for your business after a free call. The Full Service plan adds an AI chatbot trained on your business that answers questions 24 hours a day. <Link href="/digital#pricing">Compare the plans</Link>.</>,
    ],
  },
];

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
              <span className={s.help}>Leave this blank for general FAQs, or list the topics your customers ask about.</span>
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
                If an answer is off, add detail to the description and run it again. The tool works from your wording, so include the questions your customers ask most.
              </Note>
            </div>
          </section>
        )}

        <p className="ui-small ui-muted" style={{ marginTop: 48 }}>
          The FAQ builder is part of the Purcell Ventures digital add-ons. It runs on Claude Haiku 4.5.
        </p>
      </div>
      <AboutTool sections={ABOUT} />
      <div className="no-print"><FaqBlock qa={QA} /></div>
    </main>
  );
}
