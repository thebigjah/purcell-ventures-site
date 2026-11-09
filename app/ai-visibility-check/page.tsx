"use client";

// The AI visibility check (9 Nov 2026). The visitor enters a URL, /api/ai-visibility-check
// fetches the home page, robots.txt and llms.txt, and this page prints the findings.
// Built on the page kit like /ai-readiness, with the same always-rendered explanation below
// the tool so the served HTML carries the full list of checks and the questions.

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Button, Faq } from "@/app/components/ui";
import { CHECKS, BOTS, type Report, type Status } from "@/lib/ai-visibility/checks";
import { QA } from "./faq";

const STATUS_LABEL: Record<Status, string> = {
  pass: "Passed",
  warn: "Worth fixing",
  fail: "Fix first",
  info: "Note",
};

const ORDER: Status[] = ["fail", "warn", "info", "pass"];

export default function AIVisibilityCheckPage() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  async function run(e: FormEvent) {
    e.preventDefault();
    if (!url.trim() || busy) return;
    setBusy(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/ai-visibility-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "The check failed. Try again.");
      else setReport(data as Report);
    } catch {
      setError("The check could not reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const sorted = report ? [...report.findings].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)) : [];

  return (
    <main>
      <PageHero
        planet="tools"
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Free AI tools", href: "/digital/tools" },
          { name: "AI visibility check", href: "/ai-visibility-check" },
        ]} />}
        kicker="Free, no account"
        title="AI visibility check"
        lede="Enter your business website. The check reads your home page the way an AI crawler does and lists what to fix, with the reason for each."
      />

      <Section stack>
        <form onSubmit={run} className="ui-field" style={{ maxWidth: 640 }}>
          <label htmlFor="avc-url">Your website address</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              id="avc-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="yourbusiness.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: "1 1 240px", minWidth: 0, minHeight: 48 }}
              required
            />
            <button type="submit" className="ui-btn" disabled={busy} style={{ minHeight: 48 }}>
              {busy ? "Checking..." : "Run the check"}
            </button>
          </div>
          <p className="ui-muted ui-small" style={{ margin: "4px 0 0" }}>
            The check takes up to 20 seconds. It reads three public files and stores nothing.
          </p>
        </form>

        {error && (
          <p role="alert" style={{ marginTop: 24, color: "var(--gold-text)" }}>{error}</p>
        )}
      </Section>

      {report && (
        <Section title="What the check found" intro={`${report.finalUrl}`}>
          <div className="ui-figures">
            <div className="ui-figure"><b>{report.counts.fail}</b><span>to fix first</span></div>
            <div className="ui-figure"><b>{report.counts.warn}</b><span>worth fixing</span></div>
            <div className="ui-figure"><b>{report.counts.pass}</b><span>passed</span></div>
          </div>

          <div className="ui-prose" style={{ marginTop: 32 }} aria-live="polite">
            {sorted.map((f) => (
              <div key={f.id} style={{ marginBottom: 28 }}>
                <p className="ui-small" style={{ margin: "0 0 2px", color: f.status === "pass" ? "var(--muted)" : "var(--gold-text)" }}>
                  {STATUS_LABEL[f.status]}
                </p>
                <h3 style={{ margin: "0 0 4px" }}>{f.label}</h3>
                <p style={{ margin: "0 0 6px" }}><strong>{f.found}</strong></p>
                {f.items && (
                  <ul style={{ margin: "0 0 6px" }}>
                    {f.items.map((it) => (
                      <li key={it.name}><strong>{it.name}</strong>: {it.note}</li>
                    ))}
                  </ul>
                )}
                {f.status !== "pass" && (
                  <p style={{ margin: 0 }}>
                    {f.advice} <Link href={f.link.href}>{f.link.text}</Link>.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="ui-hero__actions">
            <Button href="/ai-websites">Read the AI websites guide</Button>
            <Button href="/sites" ghost>See the website plans</Button>
          </div>
        </Section>
      )}

      <Section title="What the check looks at">
        <div className="ui-prose">
          <p>
            The check fetches three addresses on your site: the home page, /robots.txt and
            /llms.txt. It reads the home page as the server sends it, before any JavaScript
            runs, because many AI crawlers read pages that way.
          </p>
          {CHECKS.map((c) => (
            <div key={c.id}>
              <h3>{c.label}</h3>
              <p style={{ marginTop: 6 }}>
                {c.advice} <Link href={c.link.href}>{c.link.text}</Link>.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The five crawlers">
        <div className="ui-prose">
          <ul>
            {BOTS.map((b) => (
              <li key={b.token}><strong>{b.token}</strong>, from {b.owner}, {b.role}.</li>
            ))}
          </ul>
          <p>
            The check reads your robots.txt the way the crawlers do. A rule that names the crawler
            applies first, and a rule for every crawler applies when nothing names it.
          </p>
        </div>
      </Section>

      <Section title="Common questions">
        <Faq items={QA.map(([q, a]) => ({ q, a }))} />
      </Section>

      <Section title="Who built it">
        <div className="ui-prose">
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link> in
            Tuscaloosa, Alabama. I built it to run the checks from my{" "}
            <Link href="/ai-websites">AI websites guide</Link> on any site in one pass. If you want
            the fixes done for you, the <Link href="/sites">websites page</Link> lists the build
            tiers and the care plans.
          </p>
        </div>
      </Section>
    </main>
  );
}
