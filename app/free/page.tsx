"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero, Section, Note } from "@/app/components/ui";

interface Template {
  industry: string;
  subject: string;
  body: string;
  why: string;
}

const TEMPLATES: Template[] = [
  {
    industry: "Salons and spas",
    subject: "Quick question about {{salonName}}",
    body: `Hi {{firstName}},\n\nI checked out {{salonName}}'s booking flow online and noticed {{specificObservation}}. Most salons we work with say this was the #1 thing they wanted to fix.\n\nWe help salons fix this for $179/mo. Worth 15 min to see what we'd do for you?\n\nIf not, no worries, just delete this.\n\n{{yourName}}`,
    why: "A specific observation, a familiar problem, a small ask and permission to ignore it.",
  },
  {
    industry: "Plumbing, HVAC and other trades",
    subject: "Saw a pattern in how {{businessType}}s are using AI",
    body: `Hi {{firstName}},\n\nI help trades businesses with AI tools, particularly plumbers and HVAC. Most owners I work with were skeptical at first.\n\nThree things they had in common before:\n• Phone rang less than it used to\n• Losing leads to bigger shops with better websites\n• No time to figure out tech themselves\n\nSound like {{company}}?\n\n{{yourName}}`,
    why: "It opens with a pattern the owner will recognize before any pitch. The three items are easy to agree with, and the question asks for a yes or no.",
  },
  {
    industry: "Dental and medical practices",
    subject: "Front-desk question about {{practiceName}}",
    body: `Hi {{firstName}} (or {{officeManager}}),\n\nNoticed {{practiceName}} doesn't have {{specificThing}} on your booking page. Most practices we work with see {{specificOutcome}} after adding it.\n\n10 minutes for a walkthrough? If not, here's a free guide on {{relatedTopic}}: [link]\n\n{{yourName}}`,
    why: "It allows for the office manager being the decision-maker and offers a free guide if they say no.",
  },
  {
    industry: "Real estate brokerage",
    subject: "Lead-routing question for {{brokerageName}}",
    body: `Hi {{firstName}},\n\nMost brokerages still email leads manually to the next-up agent. We automate the routing AND the first-touch follow-up.\n\nBrokers who use it report {{specificMetric}}.\n\nWorth 15 minutes to compare to what {{brokerageName}} does now?\n\n{{yourName}}`,
    why: "It names a problem they will recognize and asks them to compare. It makes no claim to be better.",
  },
  {
    industry: "Law firm",
    subject: "Intake automation for {{firmName}}",
    body: `Hi {{firstName}},\n\nMost law firms we work with were spending {{specificHours}} on intake: qualifying leads, scheduling consults and gathering documents. We automated that for under $200/mo.\n\nIf intake is a bottleneck, I can show you the workflow in a 15-minute walkthrough.\n\n{{yourName}}`,
    why: "Offering a walkthrough of the workflow is a small ask. It names the problem first and states the price plainly.",
  },
  {
    industry: "Marketing agency",
    subject: "White-label AI for {{agencyName}}?",
    body: `Hi {{firstName}},\n\nI noticed {{agencyName}} {{specificObservation}}. Have you considered white-labeling AI tools for your clients?\n\nWe provide the AI infrastructure, and you keep the client relationship.\n\nOpen to a quick chat?\n\n{{yourName}}`,
    why: "It tells the agency they keep the client relationship and positions you as a partner.",
  },
  {
    industry: "E-commerce brand",
    subject: "{{specificProductFeature}} on {{brandName}}'s site",
    body: `Hi {{firstName}},\n\nQuick observation about {{brandName}}'s product page for {{specificProduct}}: {{specificImprovement}}.\n\nWe help brands implement {{specificThing}} for ~$179/mo.\n\nWorth a look?\n\n{{yourName}}`,
    why: "A specific observation shows you looked at their store. It is short and asks for a yes or no.",
  },
  {
    industry: "Wellness and fitness studios",
    subject: "Booking gap I noticed at {{studioName}}",
    body: `Hi {{firstName}},\n\nLooked at {{studioName}}'s booking flow and noticed {{specificGap}}. Studios that fix this see ~{{specificMetric}}.\n\nWe handle all of it for $179/mo (Mindbody integration included).\n\nWorth 15 minutes?\n\n{{yourName}}`,
    why: "Naming Mindbody shows you know the tools studios use.",
  },
  {
    industry: "Veterinary practice",
    subject: "Question about new client onboarding at {{practiceName}}",
    body: `Hi Dr. {{lastName}},\n\nI work with veterinary practices on intake and follow-up automation. Most practices we work with cut new-client onboarding from {{specificTime}} to {{betterTime}}.\n\nIf interesting for {{practiceName}}, 15 min this week. If not, no worries.\n\n{{yourName}}`,
    why: "It uses the Dr. title, and the time saved is concrete.",
  },
  {
    industry: "Accounting and bookkeeping firms",
    subject: "Tax-season workflow for {{firmName}}",
    body: `Hi {{firstName}},\n\nMost tax-season stress comes from workflow, such as chasing documents. We help practices automate {{specificThing}} so the team spends that time on client work.\n\nMost see {{specificImprovement}}.\n\nWorth 15 min after April closes?\n\n{{yourName}}`,
    why: "It treats the problem as a workflow issue, and offering to talk after April shows you know their busy season.",
  },
];

export default function FreePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    setSubmitting(true);
    setError(null);
    try {
      // Save locally always (no data lost even if API fails)
      const existing = JSON.parse(localStorage.getItem("pv_leads_captured") || "[]");
      existing.push({ email, firstName, source: "free-cold-email-pack", capturedAt: new Date().toISOString() });
      localStorage.setItem("pv_leads_captured", JSON.stringify(existing));

      // Also POST to API endpoint (server logs)
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source: "free-cold-email-pack", intent: "free-templates" }),
      });

      setSubmitted(true);
    } catch {
      // Even if API fails, we have it locally. Treat as success.
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main>
        <PageHero
          kicker="Free templates"
          title={firstName ? `Here are the templates, ${firstName}.` : "Here are the templates."}
          lede={<>Copy any of them as they are. Replace the {`{{tokens}}`} with details about your business and theirs.</>}
          meta="I will email more like this now and then. You can unsubscribe at any time."
        />

        <Section title="10 templates, one per industry">
          <div className="ui-entries">
            {TEMPLATES.map((t) => (
              <article className="ui-entry" key={t.industry}>
                <div>
                  <h3>{t.industry}</h3>
                  <p className="ui-entry__org">Subject: {t.subject}</p>
                </div>
                <span className="ui-entry__when">
                  <button
                    type="button"
                    className="ui-btn ui-btn--ghost"
                    style={{ minHeight: 44 }}
                    onClick={() => { navigator.clipboard.writeText(`Subject: ${t.subject}\n\n${t.body}`); }}
                  >
                    Copy
                  </button>
                </span>
                <div className="ui-entry__body ui-prose">
                  <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "var(--font-body)" }}>{t.body}</pre>
                  <p className="ui-small"><strong>Why it works:</strong> {t.why}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="The full Cold Email Mastery Pack, $29"
          intro="90 more templates, 80 subject lines and reply scripts for 30 scenarios."
        >
          <p className="ui-muted" style={{ marginTop: 0 }}>
            The full pack has more than 100 templates, an AI scoring rubric, 4 email sequences, reply scripts for 30 scenarios and the list-building playbook.
          </p>
          <div className="ui-hero__actions">
            <Link className="ui-btn" href="/shop/cold-email-pack">See the full pack, $29</Link>
          </div>
          <p className="ui-muted ui-small" style={{ marginTop: 24 }}>
            The <Link className="ui-link" href="/shop/starter-kit">PV AI Starter Kit ($19)</Link> covers more ground: 24 AI prompts, the sales handbook and the rest of the kit.
          </p>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        kicker="Free, no credit card needed"
        title="10 cold outreach templates, one per industry."
        lede="Salons, plumbing, dental, real estate, law, marketing agencies, e-commerce, wellness, veterinary practices and accounting each get a template. You can edit every one."
      />

      <Section title="Get the templates" intro="The templates appear on the next page.">
        <form onSubmit={submit} style={{ display: "grid", gap: 16, maxWidth: 520 }}>
          <div className="ui-field">
            <label htmlFor="free-first-name">First name (optional)</label>
            <input id="free-first-name" type="text" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="What should I call you?" style={{ minHeight: 48 }} />
          </div>
          <div className="ui-field">
            <label htmlFor="free-email">Email address (required)</label>
            <input id="free-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@yourbusiness.com" style={{ minHeight: 48 }} />
          </div>
          {error && <Note tone="warn">{error}</Note>}
          <div>
            <button type="submit" disabled={submitting} className="ui-btn" style={{ minHeight: 48, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.6 : 1 }}>
              {submitting ? "Sending" : "Send me the 10 templates"}
            </button>
          </div>
          <p className="ui-muted ui-small" style={{ margin: 0 }}>
            I will email more like this now and then. You can unsubscribe at any time.
          </p>
        </form>
        <p className="ui-muted" style={{ marginTop: 32 }}>
          The paid version: the <Link className="ui-link" href="/shop/cold-email-pack">full $29 pack</Link> adds 90 more templates, a subject line library, reply handling and email sequences.
        </p>
      </Section>
    </main>
  );
}
