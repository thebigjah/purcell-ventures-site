"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScsnKqYgNWbJe3wD9ju3jRkToOf7Eiu4ecjCV-b99XemX59gQ/viewform";

const COMMISSION = [
  { tier: "Apprentice", sells: "Courses and Mantle Field Services", earn: "15% on every close", path: "Promoted to Closer after 5 course closes and 80% on the quiz" },
  { tier: "Closer", sells: "Adds Digital Services subscriptions", earn: "20%, plus a flat $100, $150 or $200 per Digital tier", path: "Promoted to Senior after 5 Digital closes and a co-pitch with Elijah" },
  { tier: "Senior", sells: "Adds AI Consulting and Custom Software", earn: "20% on Consulting, 15% on Custom Software", path: "Final tier" },
];

const SERVICES = [
  {
    division: "Digital Services",
    blurb: "Managed websites and AI tools for small businesses, billed monthly in three tiers.",
    tiers: [
      { name: "Starter", setup: "$400 setup", price: "$99/mo", note: "Site, AI chatbot and lead form" },
      { name: "Growth",  setup: "$700 setup", price: "$179/mo", note: "Starter plus booking, email, social and reviews" },
      { name: "Full",    setup: "$1,000 setup", price: "$279/mo", note: "Growth plus CRM, invoicing and AI content" },
    ],
  },
  {
    division: "AI Consulting",
    blurb: "AI training for business teams, held at their office.",
    tiers: [
      { name: "1-on-1",      setup: "", price: "$175/hr", note: "2-hr minimum recommended" },
      { name: "Small Group", setup: "", price: "$125/person", note: "2 to 8 people, 2-hr minimum" },
      { name: "Workshop",    setup: "", price: "$2,500 flat", note: "Up to 20 people, half-day" },
      { name: "Corporate",   setup: "", price: "Custom quote", note: "Larger teams, multi-session" },
    ],
  },
  {
    division: "Custom Software",
    blurb: "Apps, web platforms and automation, priced per deal. Senior reps only. Elijah scopes the project and the rep closes.",
    tiers: [
      { name: "Small project", setup: "", price: "$1,500 to $3,500", note: "Scripts, simple tools" },
      { name: "Full app",      setup: "", price: "$5,000 to $15,000", note: "Mobile/web applications" },
      { name: "Retainer",      setup: "", price: "Custom", note: "Ongoing engagement" },
    ],
  },
  {
    division: "Courses",
    blurb: "Pre-recorded video courses. They cost less than the services and take less time to close.",
    tiers: [
      { name: "College Apps",       setup: "", price: "$297",   note: "17 lessons" },
      { name: "Business Launch",    setup: "", price: "$397",   note: "26 lessons" },
      { name: "Zero to Automated",  setup: "", price: "$397 self-paced, $1,297 with coaching, $2,997 1:1", note: "25 lessons, 8 modules" },
    ],
  },
];

const ETHICS = [
  { rule: "Tell them when they don't need it", detail: "If a prospect doesn't need our product, we tell them. We do not lie to close a sale." },
  { rule: "No fake urgency", detail: "We don't invent deadlines, sell on fear, or claim limited spots we don't have." },
  { rule: "Sell only what we can deliver", detail: "If we can't build it or can't build it on time, you don't promise it." },
];

const AUTO_REJECTS = [
  "Picking the 'accept the cash bribe' answer (B2)",
  "Picking the 'close anyway when they don't need it' answer (B5)",
  "Scoring below 6/10 on the ethics section regardless of total",
  "Free response under 50 words",
  "Free response that's plagiarized or obviously AI-written",
];

const PROCESS = [
  { step: "1", label: "Take the application + quiz", detail: "20 to 30 minutes. The quiz covers product knowledge, ethics and judgment." },
  { step: "2", label: "Elijah reviews within 7 days", detail: "You get an email either way, interview invite or polite no." },
  { step: "3", label: "20-minute phone interview", detail: "A conversation about whether the role fits you." },
  { step: "4", label: "Contractor agreement + handbook", detail: "1099 contractor relationship. Standard terms. Parent co-signs if you're under 18." },
  { step: "5", label: "30-minute onboarding call + materials drop", detail: "You get access to the rep portal: product encyclopedia, pricing, scripts, CRM." },
  { step: "6", label: "Start selling", detail: "Work on your own schedule. Commission paid on the 1st of each month, after the 30-day clawback window." },
];

export default function SalesRepPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .sr-services { grid-template-columns: 1fr !important; }
          .sr-commission-band { grid-template-columns: 1fr !important; }
          .sr-process { grid-template-columns: 1fr !important; }
          .sr-ethics { grid-template-columns: 1fr !important; }
        }
        .sr-tier-row { display: grid; grid-template-columns: 110px 1fr 1fr; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--color-warm-border); font-size: 14px; }
        .sr-tier-row:last-child { border-bottom: none; }
        .sr-tier-name { font-family: 'Cinzel', Georgia, serif; color: var(--color-warm-accent); font-weight: 600; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
        .sr-tier-price { font-family: var(--font-dm-sans), system-ui, sans-serif; font-weight: 700; color: var(--color-warm-text); font-size: 14px; }
        .sr-tier-price small { font-weight: 400; color: var(--color-warm-text-muted); display: block; font-size: 11px; margin-top: 2px; letter-spacing: 0.04em; }
      ` }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Sales representative</div>
          <h1>
            We're hiring{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>
              sales reps.
            </em>
          </h1>
          <p className="deck">
            Commission-based. 1099 contractor. Work your own schedule. Sell digital services, AI consulting, custom software, and courses for a Georgia-based company that&apos;s small enough that you&apos;ll talk to the owner every week.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="pv-btn-primary" href={FORM_URL} target="_blank" rel="noreferrer">Take the application</a>
            <a className="pv-btn-ghost" href="#what">See what you&apos;d sell</a>
            <a className="pv-btn-ghost" href="#prep">Quiz prep</a>
          </div>
        </header>

        {/* Commission stats band */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>How <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>you earn</em></h2>
        </header>

        <div className="sr-commission-band" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {COMMISSION.map((c) => (
            <div key={c.tier} className="pv-card">
              <span className="b3"></span><span className="b4"></span>
              <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px" }}>
                {c.tier}
              </div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", marginBottom: "10px", lineHeight: 1.3 }}>
                {c.sells}
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-warm-text)", marginBottom: "12px", lineHeight: 1.5 }}>
                {c.earn}
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.5, fontStyle: "italic", borderTop: "1px solid var(--color-warm-border)", paddingTop: "10px" }}>
                <strong style={{ color: "var(--color-warm-text)", fontStyle: "normal", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>Promotion path</strong>
                <br />
                {c.path}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px", marginBottom: "48px", fontSize: "14px", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>What it can earn you</strong>
          <p style={{ margin: "10px 0 0" }}>
            A rep working 10 hours a week could earn about <strong>$300 to $500/mo at Apprentice</strong>, <strong>$1,000 to $1,500 at Closer</strong> and <strong>$2,000+ at Senior</strong>. These are projections from the commission rates above, not payouts a rep has received yet. Commission paid the 1st of each month, after a 30-day clawback window clears.
          </p>
        </div>

        {/* What we sell */}
        <header id="what" className="pv-section-head">
          <span className="roman">II.</span>
          <h2>What <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>you&apos;d sell</em></h2>
        </header>

        <div className="sr-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {SERVICES.map((svc) => (
            <div key={svc.division} className="pv-card">
              <span className="b3"></span><span className="b4"></span>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 8px", letterSpacing: "0.01em" }}>
                {svc.division}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 18px", lineHeight: 1.5 }}>
                {svc.blurb}
              </p>
              <div>
                {svc.tiers.map((t) => (
                  <div key={t.name} className="sr-tier-row">
                    <div className="sr-tier-name">{t.name}</div>
                    <div className="sr-tier-price">
                      {t.price}
                      {t.setup && <small>{t.setup}</small>}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.4 }}>
                      {t.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px", marginBottom: "48px", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--color-warm-text)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Also (low priority for reps):</strong>{" "}
          <strong>Mantle Field Services</strong>, our sister brand: gutter cleaning from $100, pressure washing from $75, lawn care from $50. The family runs most Mantle jobs. Reps rarely close them.
        </div>

        {/* Ethics */}
        <header className="pv-section-head">
          <span className="roman">III.</span>
          <h2>How <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>we sell</em></h2>
        </header>

        <p className="pv-italic" style={{ fontSize: "20px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.5, maxWidth: "640px", marginBottom: "28px" }}>
          We&apos;re a Christian business. Reps follow three selling rules:
        </p>

        <div className="sr-ethics" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {ETHICS.map((e) => (
            <div key={e.rule} className="pv-card">
              <span className="b3"></span><span className="b4"></span>
              <h4 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "var(--color-warm-accent)", margin: "0 0 12px", letterSpacing: "0.02em" }}>
                {e.rule}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>
                {e.detail}
              </p>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px", marginBottom: "48px", fontSize: "14px", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--color-warm-text)" }}>Concrete: when a prospect offers you cash to drop the price, you refuse, document, and tell Elijah. When a prospect doesn&apos;t need our full product, you redirect them to a smaller fit, even if it costs you the bigger commission. The quiz tests for this and the role doesn&apos;t work without it.</strong>
        </div>

        {/* Quiz prep */}
        <header id="prep" className="pv-section-head">
          <span className="roman">IV.</span>
          <h2>Quiz <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>prep</em></h2>
        </header>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text)", marginBottom: "20px", lineHeight: 1.6 }}>
          The application has a 20-minute quiz on product knowledge, ethics and customer fit. You can pass it without studying if you&apos;ve read this page.
        </p>

        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px", marginBottom: "24px" }}>
          <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--color-warm-accent)", margin: "0 0 14px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            What the quiz tests
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
            <li><strong>Section A: Service knowledge (5 × 1 pt)</strong>: do you know what we sell and what it costs?</li>
            <li><strong>Section B: Ethics scenarios (5 × 2 pt)</strong>: would you handle high-pressure or shady situations the right way?</li>
            <li><strong>Section C: Demographics (3 × 1 pt)</strong>: can you match the right service to the right customer?</li>
            <li><strong>Section D: Open response</strong>: 200 words on why you&apos;d represent Purcell Ventures specifically.</li>
          </ul>
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
            <strong style={{ color: "var(--color-warm-text)" }}>Pass:</strong> 14/18 on objective questions, at least 6/10 on Section B (ethics), and Elijah&apos;s approval of Section D.
          </div>
        </div>

        <div style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border-light)", padding: "24px", marginBottom: "48px" }}>
          <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 700, color: "#e54a28", margin: "0 0 14px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Auto-rejection triggers
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
            {AUTO_REJECTS.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>

        {/* Process */}
        <header className="pv-section-head">
          <span className="roman">V.</span>
          <h2>What <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>happens next</em></h2>
        </header>

        <div className="sr-process" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "48px" }}>
          {PROCESS.map((p) => (
            <div key={p.step} style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "var(--color-warm-accent)", lineHeight: 1, flexShrink: 0 }}>
                  {p.step}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--color-warm-text)", margin: "0 0 6px", letterSpacing: "0.01em" }}>
                    {p.label}
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    {p.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minor co-sign callout */}
        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px", marginBottom: "48px", fontSize: "14px", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>If you&apos;re under 18</strong>
          <p style={{ margin: "10px 0 0" }}>
            You can represent Purcell Ventures, but one of your parents or legal guardians has to co-sign the contractor agreement. Compensation routes through their account or a joint custodial account. You get the same handbook and commission structure as adult reps. Email Elijah directly before submitting so we can walk through it together: <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-accent)" }}>elijah@purcell-ventures.com</a>.
          </p>
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px" }}>
            Apply
          </h3>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", lineHeight: 1.6, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            The application and quiz take 20 to 30 minutes.
          </p>
          <a className="pv-btn-primary" href={FORM_URL} target="_blank" rel="noreferrer">Take the application</a>
        </div>

        {/* Footer note */}
        <p style={{ marginTop: "32px", fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
          Questions before applying? Email{" "}
          <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-text-muted)" }}>
            elijah@purcell-ventures.com
          </a>.
        </p>
      </main>
    </div>
  );
}
