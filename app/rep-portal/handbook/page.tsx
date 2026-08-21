"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

const SECTIONS = [
  {
    id: "who-we-are",
    roman: "I.",
    title: "Who we are",
    body: (
      <>
        <p><strong>Purcell Ventures LLC</strong> is a Georgia-based company founded by Elijah Purcell. Four divisions plus a sister brand:</p>
        <ul>
          <li><strong>Digital Services</strong> — managed websites + AI tools + 25+ modules</li>
          <li><strong>AI Consulting</strong> — hands-on team training</li>
          <li><strong>Custom Software</strong> — apps, web platforms, automation</li>
          <li><strong>Steady — Personal IT</strong> — household / individual tech help</li>
          <li><strong>Mantle Field Services (sister brand)</strong> — gutter, pressure washing, lawn care in Metro Atlanta</li>
        </ul>
        <p>We&apos;re not an agency. We&apos;re not a freelancer. We&apos;re a real company with infrastructure, processes, and standards. Clients deal directly with the owner. That&apos;s a feature, not a limitation.</p>
        <p><strong>What we believe (the part that shapes how you sell):</strong></p>
        <ul>
          <li><strong>Honesty over closing.</strong> If a client doesn&apos;t need our product, we tell them.</li>
          <li><strong>Respect over urgency.</strong> No manufactured FOMO, no fear-selling.</li>
          <li><strong>The work is the witness.</strong> A great client outcome speaks louder than any pitch.</li>
        </ul>
      </>
    ),
  },
  {
    id: "tiers",
    roman: "II.",
    title: "What you can sell: by tier",
    body: (
      <>
        <table>
          <thead><tr><th>Tier</th><th>Services available</th><th>Promotion gate</th></tr></thead>
          <tbody>
            <tr><td><strong>Apprentice</strong></td><td>Mantle Field Services + Courses</td><td>5+ Course closes (Mantle doesn&apos;t count) + 80% on Closer quiz</td></tr>
            <tr><td><strong>Closer</strong></td><td>+ Digital Services (Starter / Growth / Full)</td><td>5+ Digital closes + co-pitch with Elijah on a Custom deal</td></tr>
            <tr><td><strong>Senior</strong></td><td>+ AI Consulting + Custom Software</td><td>Final tier</td></tr>
          </tbody>
        </table>
        <p><strong>Apprentice rule:</strong> Mantle pays commission but doesn&apos;t count toward promotion. Sales of physical services don&apos;t train you for the subscription pitch.</p>
      </>
    ),
  },
  {
    id: "pricing",
    roman: "III.",
    title: "Pricing reference",
    body: (
      <>
        <p>For current pricing across all divisions, including Pilot Partner offer terms and your commission per close, see the <Link href="/rep-portal/pricing" style={{ color: "var(--color-warm-accent)" }}>Pricing Reference page</Link>. That&apos;s the single source of truth, when prices change, that page changes first.</p>
      </>
    ),
  },
  {
    id: "pilot",
    roman: "IV.",
    title: "Pilot Partner pitch (Digital tiers)",
    body: (
      <>
        <p>The setup: we&apos;re filling our first 3 Pilot Partner spots per Digital tier. Once they&apos;re gone, prices go to standard for everyone after.</p>
        <p><strong>Verbal pitch (memorize the rhythm):</strong></p>
        <blockquote style={{ borderLeft: "3px solid var(--color-warm-accent)", paddingLeft: "16px", fontStyle: "italic" }}>
          &ldquo;Here&apos;s the deal. We just launched these tiers, and right now I have <strong>3 Pilot Partner spots left across all of them.</strong> I want to fill them with the right businesses, not just the first three to say yes. If you&apos;re a fit, here&apos;s what that means for you: <strong>30% off the setup, 30% off your first 6 months.</strong> After that you transition to standard pricing, but you&apos;ll be paying what&apos;s still well under most agencies. What I need from you: at the 60-day mark, a short testimonial — 2 to 3 sentences. Right to use your business as a case study, anonymous if you prefer. And one introduction within 6 months to another business owner you respect. Doesn&apos;t have to result in a sale. Just an intro. That&apos;s the trade.&rdquo;
        </blockquote>
        <p><strong>What the pitch is NOT:</strong></p>
        <ul>
          <li>NOT &ldquo;limited time only, sign today!&rdquo; (manufactured urgency)</li>
          <li>NOT &ldquo;the price will go up tomorrow&rdquo; — it&apos;s &ldquo;the price will go up after 3 closes&rdquo;</li>
          <li>NOT bait-and-switch — Pilot price is real, lock period is real, standard price after IS standard</li>
        </ul>
      </>
    ),
  },
  {
    id: "rules",
    roman: "V.",
    title: "Hard rules (auto-firing offenses)",
    body: (
      <>
        <p>A rep is dismissed immediately for any of these:</p>
        <ol>
          <li><strong>Lying to a prospect</strong> about pricing, deliverables, timelines, or PV&apos;s history</li>
          <li><strong>Promising work that hasn&apos;t been approved</strong> by Elijah (especially Custom Software)</li>
          <li><strong>Accepting cash, gifts, or side payments</strong> from prospects in exchange for discounts or favors</li>
          <li><strong>Using high-pressure tactics:</strong> false urgency, guilt-trips, fear-selling, bait-and-switch</li>
          <li><strong>Misrepresenting yourself</strong> as PV staff vs commissioned salesperson when asked</li>
          <li><strong>Sharing pricing publicly</strong> outside of pitches (Pilot Partner rates not for social/email blasts)</li>
          <li><strong>Bypassing the CRM</strong> to keep deals off the books</li>
        </ol>
        <p>We trust reps. Trust is verified by behavior, not assumed.</p>
      </>
    ),
  },
  {
    id: "escalation",
    roman: "VI.",
    title: "Escalation: when to loop Elijah in",
    body: (
      <>
        <p><strong>Loop Elijah immediately:</strong></p>
        <ul>
          <li>Custom Software inquiry of any size — Senior reps only, Elijah on call before commitment</li>
          <li>Any deal where the prospect wants to negotiate below Pilot Partner rates</li>
          <li>Any Consulting deal over $2,000</li>
          <li>Any prospect claiming existing PV history (past customer, referral, etc.), verify</li>
          <li>Any prospect from a competitor&apos;s customer base, judgment call, ask first</li>
        </ul>
        <p><strong>How to escalate:</strong></p>
        <p>Text Elijah at <strong>(205) 462-7839</strong>: &ldquo;Got a [SERVICE] prospect, [BUDGET], decision timeline [X]. Need 5 min before I quote.&rdquo;</p>
        <p>Don&apos;t escalate via email, too slow. Don&apos;t escalate in front of the prospect. Don&apos;t use the chatbot (<Link href="/rep-portal/ask" style={{ color: "var(--color-warm-accent)" }}>Ask</Link>) as a substitute for escalation on high-value deals.</p>
      </>
    ),
  },
  {
    id: "payouts",
    roman: "VII.",
    title: "Commission + payouts",
    body: (
      <>
        <p>Commission paid the <strong>1st of each month</strong> via Zelle, PayPal, or direct deposit. Pays for closes from the prior month, after the 30-day clawback window has cleared.</p>
        <p><strong>1099 issued at year-end</strong> if total commission exceeds $600.</p>
        <p><strong>Clawback rules:</strong></p>
        <ul>
          <li>Client cancels in first 30 days: commission fully reversed</li>
          <li>Pilot Partner cancels before month 6: 30% of commission clawed back (split risk with rep)</li>
          <li>Terminated for cause (any Hard Rule violation): all unpaid commission forfeited</li>
        </ul>
      </>
    ),
  },
  {
    id: "tools",
    roman: "VIII.",
    title: "Tools you'll use",
    body: (
      <>
        <ul>
          <li><strong>Shared Airtable CRM</strong> — track every prospect and conversation (Elijah provides login)</li>
          <li><strong>Your own <Link href="/rep-portal/deals" style={{ color: "var(--color-warm-accent)" }}>Deals page</Link></strong> in the rep portal, log every prospect + close. Commission paid on what&apos;s logged.</li>
          <li><strong>PV site + Mantle site</strong> — show prospects what they&apos;d be getting</li>
          <li><strong><Link href="/digital/tools" style={{ color: "var(--color-warm-accent)" }}>Live demo tools</Link></strong> — show prospects the working version of what you&apos;re pitching (FAQ Builder, Color Palette, Content Generator, etc.)</li>
          <li><strong>Sales materials Drive folder</strong> — pitch decks, brochures, contracts (Elijah provides)</li>
          <li><strong><Link href="/rep-portal/ask" style={{ color: "var(--color-warm-accent)" }}>Ask AI</Link></strong> — mid-pitch question? Drop it in. Knows pricing, scripts, escalation rules.</li>
        </ul>
        <p>You&apos;re 1099, phone bill and gas costs are your own, but deductible. We&apos;ll send a year-end summary of closed deals to make tax season easier.</p>
      </>
    ),
  },
];

export default function HandbookPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .handbook-content p, .handbook-content li {
          line-height: 1.7;
          color: var(--color-warm-text);
        }
        .handbook-content p, .handbook-content ul, .handbook-content ol {
          margin-bottom: 14px;
        }
        .handbook-content li {
          margin-bottom: 6px;
        }
        .handbook-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0 20px;
          font-size: 14px;
        }
        .handbook-content th, .handbook-content td {
          padding: 10px 14px;
          border: 1px solid var(--color-warm-border);
          text-align: left;
          vertical-align: top;
        }
        .handbook-content th {
          background: var(--color-warm-bg-alt);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-warm-accent);
        }
        .handbook-content blockquote {
          margin: 16px 0;
          color: var(--color-warm-text);
        }
        .handbook-content strong { color: var(--color-warm-text); }
      ` }} />
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Handbook v1.0</div>
            <h1>
              The <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>handbook.</em>
            </h1>
            <p className="deck">
              Everything you&apos;re expected to know about how we sell. Read it once, refer back as needed.
            </p>
          </header>

          {/* Table of contents */}
          <nav style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px 24px", marginBottom: "32px" }}>
            <div className="pv-mono-label" style={{ marginBottom: "10px" }}>Contents</div>
            <ol style={{ margin: 0, paddingLeft: "20px", columns: 2, columnGap: "32px" }}>
              {SECTIONS.map((s) => (
                <li key={s.id} style={{ marginBottom: "4px", listStyle: "none" }}>
                  <a href={`#${s.id}`} style={{ color: "var(--color-warm-text)", textDecoration: "none", fontSize: "14px" }}>
                    <span style={{ color: "var(--color-warm-accent)", marginRight: "8px", fontFamily: "'Cinzel', Georgia, serif" }}>{s.roman}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="handbook-content">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} style={{ marginBottom: "48px" }}>
                <header className="pv-section-head">
                  <span className="roman">{s.roman}</span>
                  <h2>{s.title}</h2>
                </header>
                {s.body}
              </section>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic", marginTop: "48px" }}>
            Handbook v1.0, last updated May 2026. Notify Elijah if anything here contradicts what you&apos;ve been told elsewhere.
          </p>
        </main>
      </div>
    </div>
  );
}
