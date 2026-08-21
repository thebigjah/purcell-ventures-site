"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Row {
  category: string;
  pv: string;
  agency: string;
  freelancer: string;
  diy: string;
  pvWins?: boolean;
}

const DIGITAL_ROWS: Row[] = [
  { category: "Website build (multi-page, modern)", pv: "$400 setup + $99/mo", agency: "$5,000-15,000 + $200-500/mo hosting", freelancer: "$1,500-4,000 one-time", diy: "$0-29/mo (Wix/Squarespace)", pvWins: true },
  { category: "AI chatbot trained on your business", pv: "Included in Starter+", agency: "$2,000-5,000 build + $50-150/mo", freelancer: "$500-2,000 + you maintain it", diy: "Free with limits / $20/mo for premium" },
  { category: "Online booking system", pv: "Included in Growth+", agency: "$3,000 build + $0 (Calendly $12/mo separately)", freelancer: "$800-2,000 custom", diy: "$12-15/mo (Calendly/Acuity)" },
  { category: "Email marketing platform", pv: "Included in Growth+", agency: "$0 platform fee + $500-1,500/mo management", freelancer: "$300-800/mo retainer", diy: "$10-100/mo (Mailchimp/ConvertKit)" },
  { category: "CRM with pipeline tracking", pv: "Included in Full", agency: "$5,000 HubSpot setup + $150-1,800/mo", freelancer: "$1,000 setup + DIY", diy: "$0-50/user/mo (HubSpot free / Pipedrive)" },
  { category: "Social media scheduling", pv: "Included in Growth+", agency: "$1,500-3,000/mo full management", freelancer: "$500-1,500/mo content + posting", diy: "$15-99/mo (Buffer/Later)" },
  { category: "Review management + responses", pv: "Included in Growth+", agency: "$300-800/mo", freelancer: "Per-response", diy: "Manual / $30-100/mo tools" },
  { category: "Setup time to live", pv: "5-7 business days", agency: "8-16 weeks", freelancer: "2-6 weeks", diy: "Hours-to-weeks depending on you" },
  { category: "Maintenance + updates", pv: "Always included", agency: "Hourly $150-300", freelancer: "Hourly $50-150", diy: "Your time" },
  { category: "Direct access to the owner", pv: "Always (Elijah, same day)", agency: "Never (account managers)", freelancer: "Yes (one person)", diy: "N/A" },
];

const CONSULTING_ROWS: Row[] = [
  { category: "1-on-1 AI consulting (1 hour)", pv: "$175/hr (2-hr min)", agency: "$250-500/hr enterprise consulting", freelancer: "$100-200/hr Upwork-tier", diy: "Free (your time learning)" },
  { category: "Small group AI training (8 people)", pv: "$1,000 (8 × $125)", agency: "$3,000-8,000 corporate workshop", freelancer: "$800-2,000 group session", diy: "Free + group YouTube" },
  { category: "Half-day workshop (up to 20)", pv: "$2,500 flat", agency: "$8,000-25,000 corporate training", freelancer: "$2,000-5,000 group facilitator", diy: "N/A practical at this scale" },
  { category: "Comes to your office", pv: "Yes (Metro Atlanta) or remote", agency: "Yes with travel fees", freelancer: "Sometimes", diy: "—" },
  { category: "Curriculum customized to your industry", pv: "Always", agency: "Sometimes + add-on cost", freelancer: "Depends on freelancer", diy: "You do it" },
];

const CUSTOM_SOFTWARE_ROWS: Row[] = [
  { category: "Small project (single tool/script)", pv: "$1,500-3,500", agency: "$8,000-25,000 minimum engagement", freelancer: "$2,000-8,000", diy: "$0 + weeks of your time" },
  { category: "Full mobile/web app", pv: "$5,000-15,000+", agency: "$25,000-150,000+", freelancer: "$10,000-50,000", diy: "Months + significant skill required" },
  { category: "AI integration", pv: "Included scope", agency: "Specialty add-on $5k+", freelancer: "Depends on skill", diy: "Self-taught" },
  { category: "Code ownership + transfer", pv: "Always 100% yours", agency: "Often source-code-restricted contracts", freelancer: "Usually yours", diy: "Yours" },
  { category: "Owner on the build call", pv: "Always (Elijah scopes)", agency: "Never (project manager)", freelancer: "One person + maybe contractors", diy: "—" },
  { category: "Discovery call before commitment", pv: "Free, 30 min", agency: "Free but high-pressure", freelancer: "Free usually", diy: "—" },
];

export default function PricingComparisonPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 720px) {
          .recommend-card { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      ` }} />
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1180px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">A Financial Comparison · Without spin</div>
          <h1>
            Pricing, <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>actually compared.</em>
          </h1>
          <p className="deck">
            Most agencies bury pricing on a &quot;contact us&quot; form. We don&apos;t. Here&apos;s our pricing next to the realistic market alternatives, agencies, freelancers, and DIY tools. Numbers are typical ranges as of 2026. No spin, no &quot;starting from&quot; tricks.
          </p>
        </header>

        <section style={{ marginBottom: "56px" }}>
          <h2 style={sectionHead}>Digital Services (subscription tools)</h2>
          <ComparisonTable rows={DIGITAL_ROWS} />
          <p style={footnote}>
            Digital total cost of ownership for year 1: <strong style={{ color: "var(--color-warm-accent)" }}>PV Growth ~$2,848</strong> (700 setup + 179×12) · <strong>Agency equivalent ~$30,000-80,000</strong> bundled · <strong>Freelancer ~$5,000-12,000 + your time stitching tools together</strong>.
          </p>
        </section>

        <section style={{ marginBottom: "56px" }}>
          <h2 style={sectionHead}>AI Consulting</h2>
          <ComparisonTable rows={CONSULTING_ROWS} />
          <p style={footnote}>
            Workshop math: PV $2,500 for 20 people = <strong style={{ color: "var(--color-warm-accent)" }}>$125/person</strong>. Enterprise training: typically $400-1,500/person. Your team learns the same things either way.
          </p>
        </section>

        <section style={{ marginBottom: "56px" }}>
          <h2 style={sectionHead}>Custom Software</h2>
          <ComparisonTable rows={CUSTOM_SOFTWARE_ROWS} />
          <p style={footnote}>
            Custom software is where the spread is widest. A $25k agency project and a $5k PV project can produce the same working app, the difference is the agency&apos;s overhead, project managers, and slide decks, not the code.
          </p>
        </section>

        {/* Why we can charge less */}
        <section style={{ marginBottom: "48px", padding: "32px 36px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h2 style={{ ...sectionHead, marginTop: 0 }}>Why we can charge less (and why that&apos;s sustainable)</h2>
          <ul style={{ paddingLeft: "24px", fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
            <li><strong>Solo operator, low overhead.</strong> No salespeople (well, now we have a few), no office, no middle management. Every dollar that&apos;s not building or supporting goes back into lower pricing.</li>
            <li><strong>Modular, reusable systems.</strong> Our Digital Services skeletons are templates we adapt, not bespoke builds from scratch. That cuts hours without cutting quality.</li>
            <li><strong>AI in our workflow.</strong> We use AI heavily for first drafts of code, content, and structure, then human-review every output. Speeds the work, doesn&apos;t reduce care.</li>
            <li><strong>Long-term relationships pay back.</strong> A $99/mo subscription customer who stays 3 years pays us $3,564. That&apos;s why we don&apos;t need to extract maximum value from each engagement.</li>
            <li><strong>Owner-direct, no commission stack.</strong> Most agencies pay a sales team 15-25% commission, an account manager, a project manager, plus margin. We pay sales reps a commission (now), but the owner is still on every important call.</li>
          </ul>
        </section>

        {/* When you should hire someone else */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={sectionHead}>When you should hire someone else (and who)</h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, marginBottom: "20px" }}>
            Not every prospect is a fit. Here&apos;s when we&apos;ll point you elsewhere:
          </p>
          <div style={{ display: "grid", gap: "12px" }}>
            <RecommendCard
              when="You need a 50+ person platform with enterprise compliance (SOC 2, HIPAA, etc.)"
              recommend="Big agency (Accenture, Deloitte Digital) or a specialized firm in your vertical. We're not built for that scale of compliance overhead."
            />
            <RecommendCard
              when="You have a $200-500 monthly budget and you JUST want a website"
              recommend="Squarespace or Wix with one of their built-in templates. PV is overkill if you don't need AI tools, booking, CRM, or ongoing maintenance."
            />
            <RecommendCard
              when="You want a one-time build with no ongoing relationship"
              recommend="Hire a freelancer through Upwork or Toptal. Our model is built on retainer relationships; one-and-done isn't where we shine."
            />
            <RecommendCard
              when="You need physical store-front retail POS / inventory at scale"
              recommend="Shopify POS or Square. Specialty tools beat our generalist approach here."
            />
            <RecommendCard
              when="Your problem is genuinely 'I'm overwhelmed and don't know where to start'"
              recommend="Take our free AI Readiness Test first. If you score in the bottom tier, save your money and read for 6 months before buying anything from anyone."
            />
          </div>
        </section>

        {/* ROI calculator CTA */}
        <div style={{ marginBottom: "32px", padding: "28px 32px", background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))", border: "1px solid var(--color-warm-accent)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 8px" }}>Want the math for YOUR business?</h3>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>
                Try our free AI Cost Calculator, plug in your team size, hourly rate, and current manual hours. Get a projected ROI + payback period in 30 seconds.
              </p>
            </div>
            <Link href="/ai-cost-calculator" className="pv-btn-primary">Open the calculator</Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>The math checks out?</h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Start with a free 30-min conversation. We&apos;ll honestly tell you which tier fits or whether you need us at all.
          </p>
          <Link href="/how-we-work" className="pv-btn-primary" style={{ marginRight: "12px" }}>See how we work</Link>
          <a href="mailto:elijah@purcell-ventures.com?subject=First%20conversation" className="pv-btn-ghost">Email Elijah</a>
        </div>

      </main>
    </div>
  );
}

function ComparisonTable({ rows }: { rows: Row[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "880px" }}>
        <thead>
          <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
            <th style={tableTh}>What you need</th>
            <th style={{ ...tableTh, background: "rgba(212, 175, 55, 0.1)", color: "var(--color-warm-accent)" }}>Purcell Ventures</th>
            <th style={tableTh}>Typical Agency</th>
            <th style={tableTh}>Freelancer</th>
            <th style={tableTh}>DIY</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
              <td style={{ ...tableTd, color: "var(--color-warm-text)", fontWeight: 600 }}>{r.category}</td>
              <td style={{ ...tableTd, background: "rgba(212, 175, 55, 0.04)", color: "var(--color-warm-accent)", fontWeight: 600 }}>{r.pv}</td>
              <td style={tableTd}>{r.agency}</td>
              <td style={tableTd}>{r.freelancer}</td>
              <td style={tableTd}>{r.diy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecommendCard({ when, recommend }: { when: string; recommend: string }) {
  return (
    <div className="recommend-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "18px 22px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
      <div>
        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, marginBottom: "6px" }}>If</div>
        <div style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{when}</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "6px" }}>Then</div>
        <div style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>{recommend}</div>
      </div>
    </div>
  );
}

const sectionHead: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 16px" };
const tableTh: React.CSSProperties = { padding: "12px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const tableTd: React.CSSProperties = { padding: "12px 14px", color: "var(--color-warm-text-muted)", verticalAlign: "top", lineHeight: 1.5 };
const footnote: React.CSSProperties = { marginTop: "16px", fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", lineHeight: 1.6, padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" };
