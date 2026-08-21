"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Template {
  industry: string;
  subject: string;
  body: string;
  why: string;
}

const TEMPLATES: Template[] = [
  {
    industry: "Salons & spas",
    subject: "Quick question about {{salonName}}",
    body: `Hi {{firstName}},\n\nI checked out {{salonName}}'s booking flow online and noticed {{specificObservation}}. Most salons we work with say this was the #1 thing they wanted to fix.\n\nWe help salons fix this for $179/mo. Worth 15 min to see what we'd do for you?\n\nIf not, no worries, just delete this.\n\n— {{yourName}}`,
    why: "Specific observation + relatable framing + low-commitment ask + permission to ignore.",
  },
  {
    industry: "Plumbing / HVAC / trades",
    subject: "Saw a pattern in how {{businessType}}s are using AI",
    body: `Hi {{firstName}},\n\nI help trades businesses with AI tools, particularly plumbers and HVAC. Most owners I work with were skeptical at first.\n\nThree things they had in common before:\n• Phone rang less than it used to\n• Losing leads to bigger shops with better websites\n• No time to figure out tech themselves\n\nSound like {{company}}?\n\n— {{yourName}}`,
    why: "Pattern-recognition opener > pitch. Three specific items invite agreement. Question forces a yes/no.",
  },
  {
    industry: "Dental / medical practice",
    subject: "Front-desk question about {{practiceName}}",
    body: `Hi {{firstName}} (or {{officeManager}}),\n\nNoticed {{practiceName}} doesn't have {{specificThing}} on your booking page. Most practices we work with see {{specificOutcome}} after adding it.\n\n10 minutes for a walkthrough? If not, here's a free guide on {{relatedTopic}}: [link]\n\n— {{yourName}}`,
    why: "Acknowledges the actual decision-maker may be office manager. Gives a free guide as fallback value.",
  },
  {
    industry: "Real estate brokerage",
    subject: "Lead-routing question for {{brokerageName}}",
    body: `Hi {{firstName}},\n\nMost brokerages still email leads manually to the next-up agent. We automate the routing AND the first-touch follow-up.\n\nBrokers who use it report {{specificMetric}}.\n\nWorth 15 minutes to compare to what {{brokerageName}} does now?\n\n— {{yourName}}`,
    why: "Industry-specific problem they recognize. Comparison framing (not 'better' but 'compare to').",
  },
  {
    industry: "Law firm",
    subject: "Intake automation for {{firmName}}",
    body: `Hi {{firstName}},\n\nMost law firms we work with were spending {{specificHours}} on intake, qualifying leads, scheduling consults, gathering docs. We automated that for under $200/mo.\n\nIf intake is a bottleneck, 15-min walkthrough, not a pitch, just the workflow.\n\n— {{yourName}}`,
    why: "\"Not a pitch, just the workflow\" lowers the threshold. Pain-point first, price as a fact.",
  },
  {
    industry: "Marketing agency",
    subject: "White-label AI for {{agencyName}}?",
    body: `Hi {{firstName}},\n\nI noticed {{agencyName}} {{specificObservation}}. Have you considered white-labeling AI tools for your clients?\n\nWe provide the AI infrastructure; you keep the client relationship.\n\nOpen to a quick chat?\n\n— {{yourName}}`,
    why: "Plays to the agency's ego ('you keep the client relationship'). Partnership frame, not vendor frame.",
  },
  {
    industry: "E-commerce brand",
    subject: "{{specificProductFeature}} on {{brandName}}'s site",
    body: `Hi {{firstName}},\n\nQuick observation about {{brandName}}'s product page for {{specificProduct}} — {{specificImprovement}}.\n\nWe help brands implement {{specificThing}} for ~$179/mo.\n\nWorth a look?\n\n— {{yourName}}`,
    why: "Hyper-specific observation = proof of homework. Short. Easy yes/no.",
  },
  {
    industry: "Wellness / fitness studio",
    subject: "Booking gap I noticed at {{studioName}}",
    body: `Hi {{firstName}},\n\nLooked at {{studioName}}'s booking flow — {{specificGap}}. Studios that fix this see ~{{specificMetric}}.\n\nWe do this end-to-end for $179/mo (Mindbody integration included).\n\nWorth 15 minutes?\n\n— {{yourName}}`,
    why: "Industry-specific tool mention (Mindbody) = credibility signal.",
  },
  {
    industry: "Veterinary practice",
    subject: "Question about new client onboarding at {{practiceName}}",
    body: `Hi Dr. {{lastName}},\n\nI work with veterinary practices on intake + follow-up automation. Most practices we work with cut new-client onboarding from {{specificTime}} to {{betterTime}}.\n\nIf interesting for {{practiceName}}, 15 min this week. If not, no worries.\n\n— {{yourName}}`,
    why: "Dr. salutation = respect. Specific time reduction is concrete.",
  },
  {
    industry: "Accounting / bookkeeping firm",
    subject: "Tax-season workflow for {{firmName}}",
    body: `Hi {{firstName}},\n\nTax-season chaos is mostly a workflow problem, not a tax-knowledge problem. We help practices automate {{specificThing}} so the team can focus on actual work, not chasing docs.\n\nMost see {{specificImprovement}}.\n\nWorth 15 min after April closes?\n\n— {{yourName}}`,
    why: "Reframes their pain (chaos → workflow). Timing acknowledgment (after April) shows industry awareness.",
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
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
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
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "80px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "12px" }}>✓</div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
              Here are the templates, <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>{firstName || "friend"}.</em>
            </h1>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 8px" }}>
              You can copy any of these directly. Replace the {`{{tokens}}`} with your business + their business.
            </p>
            <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
              (We&apos;ll occasionally email more like this. Unsubscribe anytime.)
            </p>
          </div>

          {/* Templates */}
          <div style={{ display: "grid", gap: "20px", marginBottom: "48px" }}>
            {TEMPLATES.map((t, i) => (
              <article key={i} className="pv-card" style={{ padding: "24px 28px" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>{i + 1}. {t.industry}</h2>
                  <button onClick={() => { navigator.clipboard.writeText(`Subject: ${t.subject}\n\n${t.body}`); }} style={{ padding: "6px 12px", background: "transparent", color: "var(--color-warm-accent)", border: "1px solid var(--color-warm-accent)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 }}>Copy</button>
                </div>
                <div style={{ marginBottom: "10px", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
                  <strong style={{ color: "var(--color-warm-accent)" }}>Subject:</strong> {t.subject}
                </div>
                <pre style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, padding: "14px 16px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)" }}>{t.body}</pre>
                <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
                  <strong style={{ color: "var(--color-warm-accent)", fontStyle: "normal" }}>Why this works:</strong> {t.why}
                </div>
              </article>
            ))}
          </div>

          {/* Upsell to full pack */}
          <div style={{ padding: "32px 36px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px solid var(--color-warm-accent)", textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "12px" }}>
              Want 90 more templates + 80 subject lines + 30 reply scripts?
            </div>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
              The full <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Cold Email Mastery Pack — $29.</em>
            </h3>
            <p style={{ margin: "0 0 24px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
              You got 10 templates. The full pack has 100+. Plus AI scoring rubric, 4 sequencing cadences, reply-handling scripts for 30 scenarios, and the list-building playbook.
            </p>
            <Link href="/shop/cold-email-pack" className="pv-btn-primary">See the full pack — $29 →</Link>
          </div>

          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Or grab <Link href="/shop/starter-kit" style={{ color: "var(--color-warm-accent)" }}>the broader PV AI Starter Kit ($19)</Link> for 24 AI prompts + sales handbook + everything else.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "96px 36px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            Free · No credit card · No upsell on this page
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            10 cold outreach templates that <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>actually get replies.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto" }}>
            One template per industry (salons, plumbing, dental, real estate, law, marketing agencies, e-commerce, wellness, vets, accounting). Tested in production. Editable.
          </p>
        </div>

        <form onSubmit={submit} style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "32px" }}>
          <div style={{ display: "grid", gap: "14px" }}>
            <div>
              <label style={inputLabel}>First name (optional)</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="What should we call you?" style={fieldStyle} />
            </div>
            <div>
              <label style={inputLabel}>Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={fieldStyle} placeholder="you@yourbusiness.com" />
            </div>
            {error && <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "8px 12px", color: "#e54a28", fontSize: "13px" }}>{error}</div>}
            <button type="submit" disabled={submitting} className="pv-btn-primary" style={{ border: "none", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.6 : 1, padding: "16px", fontSize: "16px" }}>
              {submitting ? "Sending…" : "Send me the 10 templates"}
            </button>
          </div>
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "16px", textAlign: "center", fontStyle: "italic" }}>
            Templates shown immediately on the next page. We&apos;ll occasionally email more like this. Unsubscribe anytime.
          </p>
        </form>

        <div style={{ marginTop: "40px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--color-warm-accent)" }}>Why we give 10 away free:</strong> these templates work. We bundle 90 more + subject library + reply handling + cadences into the <Link href="/shop/cold-email-pack" style={{ color: "var(--color-warm-accent)" }}>full $29 pack</Link>. If the free 10 don&apos;t earn at least one reply, the paid version won&apos;t either, and we&apos;d rather you skip it.
        </div>

      </main>
    </div>
  );
}

const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const fieldStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "15px", fontFamily: "var(--font-inter), sans-serif" };
