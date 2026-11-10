"use client";

// The AI use policy template (9 Nov 2026). A short form on the left of the owner's
// decisions, and the policy text rendered live from policy.ts. Copy, Download and Print all
// use the same string. Nothing leaves the browser: no fetch, no storage, no analytics event.
// Built on the page kit like /ai-readiness and /ai-visibility-check, with the explanation
// above the tool so the served HTML answers the questions before any script runs.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Faq } from "@/app/components/ui";
import { QA } from "./faq";
import { buildPolicy, INDUSTRIES, TOOLS, type Industry, type PolicyInput } from "./policy";

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function AIPolicyTemplatePage() {
  const [input, setInput] = useState<PolicyInput>({
    business: "",
    owner: "",
    industry: "general",
    tools: [],
    otherTools: "",
    customerData: "no",
    reviewer: "",
    effective: "",
  });
  const [status, setStatus] = useState("");

  // Today's date fills in after hydration, so the server HTML and the first client render match.
  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setInput((p) => (p.effective ? p : { ...p, effective: iso }));
  }, []);

  const policy = useMemo(() => buildPolicy(input), [input]);

  function set<K extends keyof PolicyInput>(key: K, value: PolicyInput[K]) {
    setInput((p) => ({ ...p, [key]: value }));
    setStatus("");
  }

  function toggleTool(tool: string) {
    setInput((p) => ({
      ...p,
      tools: p.tools.includes(tool) ? p.tools.filter((t) => t !== tool) : TOOLS.filter((t) => t === tool || p.tools.includes(t)),
    }));
    setStatus("");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(policy);
      setStatus("Copied the policy text.");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = policy;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      setStatus(ok ? "Copied the policy text." : "Your browser blocked copying. Select the text and copy it by hand.");
    }
  }

  function download() {
    const blob = new Blob([policy], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `ai-use-policy${input.business.trim() ? "-" + slug(input.business) : ""}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    setStatus("Downloaded the policy as a text file.");
  }

  // Prints only the policy, from a hidden frame, so the site navigation and the form stay
  // off the paper and no pop-up window opens.
  function print() {
    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.position = "fixed";
    frame.style.width = "0";
    frame.style.height = "0";
    frame.style.border = "0";
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    if (!doc || !win) {
      document.body.removeChild(frame);
      return;
    }
    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>AI use policy</title>` +
        `<style>body{font:12pt/1.5 Georgia,serif;color:#000;background:#fff;margin:0.8in}pre{white-space:pre-wrap;font:inherit;margin:0}</style>` +
        `</head><body><pre>${escapeHtml(policy)}</pre></body></html>`,
    );
    doc.close();
    win.focus();
    win.print();
    setTimeout(() => document.body.removeChild(frame), 1000);
  }

  return (
    <main>
      <PageHero
        planet="tools"
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "AI for small business", href: "/ai-for-small-business" },
          { name: "AI policy template", href: "/ai-policy-template" },
        ]} />}
        kicker="Free, nothing stored"
        title="AI use policy template"
        lede="A one-page AI policy for your staff, filled in from a few answers about your business. Copy it, download it as a text file or print it."
      />

      <Section title="What is an AI use policy?">
        <div className="ui-prose">
          <p>
            An AI use policy is a short set of written rules for how staff use AI tools at work.
            It names the tools people may use, lists the information that never goes into them,
            and says who checks AI work before a customer sees it. Most small businesses fit it on
            one or two pages. It sits beside the rules you already keep for passwords, customer
            records and payments.
          </p>
        </div>
      </Section>

      <Section title="Does a small business need an AI use policy?">
        <div className="ui-prose">
          <p>
            Yes, once more than one person uses AI tools for work. Without written rules, each
            person decides alone what to paste into a chatbot, and one pasted customer record or
            password becomes a problem for the whole business. A written policy also gives every
            new hire the same rules on their first day, and gives the owner one answer to point to
            when someone asks whether they may use a tool.
          </p>
          <p>
            An owner who works alone can skip the signed document. The rules about customer data
            and checking AI answers still apply.
          </p>
        </div>
      </Section>

      <Section title="What should a small business AI policy cover?">
        <div className="ui-prose">
          <p>Eight parts cover most small businesses:</p>
          <ul>
            <li><strong>Purpose.</strong> Who the policy applies to and what it protects.</li>
            <li><strong>Approved tools.</strong> The AI tools staff may use, on business accounts.</li>
            <li>
              <strong>What never goes into an AI tool.</strong> Passwords, customer personal data,
              payment data, confidential client information and unreleased financials, plus the
              rules for your industry.
            </li>
            <li>
              <strong>Checking AI output.</strong> Names, numbers, quotes and dates, checked against
              a source you trust, and one named person who approves work before it goes public. The
              post on <Link href="/blog/check-ai-answer-before-using">how to check an AI answer
              before you use it</Link> walks through each check.
            </li>
            <li><strong>Disclosure.</strong> When to tell customers that AI helped write something they rely on.</li>
            <li><strong>New tools.</strong> Who approves a tool before anyone uses it for work.</li>
            <li><strong>Training.</strong> How staff learn the rules and sign the policy.</li>
            <li><strong>Review date.</strong> When the owner reads the policy again and updates it.</li>
          </ul>
        </div>
      </Section>

      <Section title="Your business details" intro="Everything stays in your browser. Closing the tab clears it.">
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 22, maxWidth: 720 }}>
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
            <div className="ui-field">
              <label htmlFor="ap-business">Business name</label>
              <input id="ap-business" type="text" autoComplete="organization" placeholder="Riverside Dental"
                value={input.business} onChange={(e) => set("business", e.target.value)} />
            </div>
            <div className="ui-field">
              <label htmlFor="ap-owner">Policy owner (name or role)</label>
              <input id="ap-owner" type="text" placeholder="Jane Smith"
                value={input.owner} onChange={(e) => set("owner", e.target.value)} />
            </div>
            <div className="ui-field">
              <label htmlFor="ap-industry">Industry</label>
              <select id="ap-industry" value={input.industry}
                onChange={(e) => set("industry", e.target.value as Industry)}>
                {INDUSTRIES.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
              </select>
            </div>
            <div className="ui-field">
              <label htmlFor="ap-reviewer">Who reviews AI output before it goes public</label>
              <input id="ap-reviewer" type="text" placeholder="The office manager"
                value={input.reviewer} onChange={(e) => set("reviewer", e.target.value)} />
            </div>
            <div className="ui-field">
              <label htmlFor="ap-effective">Effective date</label>
              <input id="ap-effective" type="date"
                value={input.effective} onChange={(e) => set("effective", e.target.value)} />
            </div>
          </div>

          <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
            <legend className="ui-muted" style={{ fontSize: 14, fontWeight: 500, padding: 0, marginBottom: 8 }}>
              Approved AI tools
            </legend>
            <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))" }}>
              {TOOLS.map((t) => {
                const on = input.tools.includes(t);
                return (
                  <label key={t} className={`ui-choice${on ? " is-on" : ""}`} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input type="checkbox" checked={on} onChange={() => toggleTool(t)} style={{ accentColor: "var(--gold)", width: 18, height: 18 }} />
                    {t}
                  </label>
                );
              })}
            </div>
            <div className="ui-field" style={{ marginTop: 12 }}>
              <label htmlFor="ap-other">Other tools, separated by commas</label>
              <input id="ap-other" type="text" placeholder="Grammarly, Canva Magic Write"
                value={input.otherTools} onChange={(e) => set("otherTools", e.target.value)} />
            </div>
          </fieldset>

          <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
            <legend className="ui-muted" style={{ fontSize: 14, fontWeight: 500, padding: 0, marginBottom: 8 }}>
              May staff enter customer data into an AI tool?
            </legend>
            <div style={{ display: "grid", gap: 8 }}>
              {([
                ["no", "No customer data at all"],
                ["anonymized", "Only after removing names and other details that identify the customer"],
              ] as const).map(([v, label]) => {
                const on = input.customerData === v;
                return (
                  <label key={v} className={`ui-choice${on ? " is-on" : ""}`} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input type="radio" name="ap-customer" value={v} checked={on} onChange={() => set("customerData", v)}
                      style={{ accentColor: "var(--gold)", width: 18, height: 18, flex: "none" }} />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </form>
      </Section>

      <Section title="Your AI use policy">
        <p className="ui-prose" style={{ margin: "0 0 20px" }}>
          This template is general information and not legal advice. If your business works in
          health care, law, finance or another regulated industry, have an attorney review the
          policy before you adopt it.
        </p>

        <div className="ui-hero__actions" style={{ marginTop: 0, marginBottom: 12 }}>
          <button type="button" className="ui-btn" onClick={copy}>Copy text</button>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={download}>Download .txt</button>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={print}>Print</button>
        </div>
        <p className="ui-muted ui-small" role="status" style={{ minHeight: 20, margin: "0 0 20px" }}>{status}</p>

        <pre
          id="ap-policy"
          style={{
            whiteSpace: "pre-wrap",
            overflowX: "auto",
            overflowWrap: "anywhere",
            font: "400 16px/1.65 var(--font-body)",
            color: "var(--fg-2)",
            margin: 0,
            maxWidth: "var(--measure)",
          }}
        >
          {policy}
        </pre>
      </Section>

      <Section title="Common questions">
        <Faq items={QA.map(([q, a]) => ({ q, a }))} />
      </Section>

      <Section title="Who built it">
        <div className="ui-prose">
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link> in
            Tuscaloosa, Alabama. I train small business teams to use AI tools and build AI
            software for them. The <Link href="/ai-for-small-business">AI for small business
            guide</Link> covers safe first tasks, checking AI answers and telling customers about
            AI. For help setting up the tools and the policy with your team, the{" "}
            <Link href="/consulting">consulting page</Link> explains how sessions work.
          </p>
        </div>
      </Section>
    </main>
  );
}
