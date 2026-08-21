"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

/**
 * The Playbook, single-page rep quick reference.
 *
 * The other rep portal pages (handbook, scripts, pricing, objections)
 * are deeper. This page is what a rep needs IN-CALL — collapsed,
 * scannable, no scrolling between pages.
 */

interface Section {
  id: string;
  title: string;
  emoji: string;
  color: string;
}

const SECTIONS: Section[] = [
  { id: "pricing", title: "Pricing cheat-sheet", emoji: "$", color: "var(--color-warm-accent)" },
  { id: "opening", title: "Opening lines (5)", emoji: "→", color: "#7aaa6a" },
  { id: "discovery", title: "Discovery questions (10)", emoji: "?", color: "#9b7fd4" },
  { id: "objections", title: "Top 10 objections + responses", emoji: "✗", color: "#e54a28" },
  { id: "closes", title: "Close frameworks (5)", emoji: "✓", color: "#7aaa6a" },
  { id: "escalation", title: "When to escalate to Elijah", emoji: "⚠", color: "#e8b968" },
  { id: "after", title: "After every call, checklist", emoji: "□", color: "var(--color-warm-text)" },
];

export default function PlaybookPage() {
  const [active, setActive] = useState<string>("pricing");

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Playbook</div>
            <h1>
              Everything you need <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>mid-call.</em>
            </h1>
            <p className="deck">
              The other pages are deep references. This page is what you need RIGHT NOW. Pricing, scripts, objection responses, escalation rules. Bookmark this single URL.
            </p>
          </header>

          {/* Section tabs */}
          <nav style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px", position: "sticky", top: "0", background: "var(--color-warm-bg)", padding: "8px 0", zIndex: 10, borderBottom: "1px solid var(--color-warm-border)" }}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  padding: "8px 14px",
                  background: active === s.id ? s.color : "transparent",
                  color: active === s.id ? "var(--color-warm-bg)" : s.color,
                  border: `1px solid ${s.color}`,
                  fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                  fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0,
                }}
              >
                {s.emoji} {s.title}
              </button>
            ))}
          </nav>

          {/* PRICING */}
          <section id="pricing" style={section}>
            <h2 style={sectionHead}>Pricing cheat-sheet</h2>
            <p style={tipNote}>Always quote these as standard FIRST. Pilot Partner only when you&apos;ve confirmed they qualify (commit + testimonial + referral). See <Link href="/rep-portal/pricing" style={linkStyle}>Pricing</Link> for full reference.</p>
            <div style={{ overflowX: "auto" }}>
              <table style={cheatTable}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                    <th style={th}>Tier</th>
                    <th style={th}>Standard</th>
                    <th style={th}>Pilot Partner</th>
                    <th style={th}>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={tr}><td style={td}><strong>Digital Starter</strong></td><td style={td}>$99/mo + $400 setup</td><td style={td}>$69/mo + $280 setup (6mo locked)</td><td style={td}>$40 + 10% recurring</td></tr>
                  <tr style={tr}><td style={td}><strong>Digital Growth</strong></td><td style={td}>$179/mo + $700 setup</td><td style={td}>$125/mo + $490 setup (6mo locked)</td><td style={td}>$70 + 10% recurring</td></tr>
                  <tr style={tr}><td style={td}><strong>Digital Full</strong></td><td style={td}>$279/mo + $1,000 setup</td><td style={td}>$195/mo + $700 setup (6mo locked)</td><td style={td}>$100 + 10% recurring</td></tr>
                  <tr style={tr}><td style={td}><strong>Consulting 1-on-1</strong></td><td style={td}>$175/hr (2hr min)</td><td style={td}>—</td><td style={td}>15% of total</td></tr>
                  <tr style={tr}><td style={td}><strong>Consulting Workshop</strong></td><td style={td}>$2,500 flat (≤20 ppl)</td><td style={td}>—</td><td style={td}>15% = $375</td></tr>
                  <tr style={tr}><td style={td}><strong>Custom Software</strong></td><td style={td}>$1,500–$15,000+</td><td style={td}>—</td><td style={td}>10% (Elijah closes)</td></tr>
                  <tr style={tr}><td style={td}><strong>College Apps Course</strong></td><td style={td}>$297 (one-time)</td><td style={td}>—</td><td style={td}>20% = $59</td></tr>
                  <tr style={tr}><td style={td}><strong>Steady Monthly Care</strong></td><td style={td}>$79/mo</td><td style={td}>—</td><td style={td}>$25 + $8/mo recurring</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* OPENING */}
          <section id="opening" style={section}>
            <h2 style={sectionHead}>Opening lines</h2>
            <div style={{ display: "grid", gap: "10px" }}>
              <Item title="Referral opening">&ldquo;Hi {`{firstName}`}, this is {`{repName}`} from Purcell Ventures. {`{Referrer}`} mentioned you might want to talk about [their pain point]. Got 60 seconds?&rdquo;</Item>
              <Item title="Cold opening, local biz">&ldquo;Hey {`{firstName}`}, I run digital tools for small businesses in {`{city}`} — saw {`{company}`} and had a quick thought. Worth 60 seconds?&rdquo;</Item>
              <Item title="Form-fill follow-up">&ldquo;Hi {`{firstName}`}, you filled out our form on Purcell Ventures last {`{day}`}. I&apos;m {`{repName}`} — wanted to follow up on what you were looking for. Got a minute?&rdquo;</Item>
              <Item title="In-person walk-in">&ldquo;I&apos;m {`{repName}`} — Purcell Ventures. I help businesses around here add AI tools without making it weird. Could I leave you a card?&rdquo;</Item>
              <Item title="LinkedIn DM">&ldquo;Hi {`{firstName}`} — saw your post about [specific thing]. We do this for businesses like {`{company}`} — happy to share what&apos;s worked. Open to a 15-min call?&rdquo;</Item>
            </div>
          </section>

          {/* DISCOVERY */}
          <section id="discovery" style={section}>
            <h2 style={sectionHead}>Discovery questions</h2>
            <p style={tipNote}>Ask 3-4 of these before pitching anything. The pitch lands harder when it&apos;s pointed at THEIR words.</p>
            <ol style={{ paddingLeft: "20px", margin: 0 }}>
              <li style={li}>&ldquo;What&apos;s the most repetitive thing in your week, the thing you wish someone else did?&rdquo;</li>
              <li style={li}>&ldquo;If your business doubled tomorrow, what would break first?&rdquo;</li>
              <li style={li}>&ldquo;What tool or process have you been meaning to set up for the last year and just haven&apos;t?&rdquo;</li>
              <li style={li}>&ldquo;Walk me through how a new customer finds you, start to finish.&rdquo;</li>
              <li style={li}>&ldquo;What do you spend the most time on each week that doesn&apos;t actually make you money?&rdquo;</li>
              <li style={li}>&ldquo;Who&apos;s currently handling your website / marketing / customer service / [relevant]? How&apos;s that working?&rdquo;</li>
              <li style={li}>&ldquo;If you could wave a wand and have ONE thing fixed in your business by tomorrow, what would it be?&rdquo;</li>
              <li style={li}>&ldquo;What&apos;s your honest reaction when someone says &lsquo;AI&rsquo;?&rdquo;</li>
              <li style={li}>&ldquo;Have you tried any AI tools? What worked, what didn&apos;t?&rdquo;</li>
              <li style={li}>&ldquo;Realistically, what&apos;s your budget for solving this — $50/mo or $500/mo range?&rdquo;</li>
            </ol>
          </section>

          {/* OBJECTIONS */}
          <section id="objections" style={section}>
            <h2 style={sectionHead}>Top 10 objections + quick responses</h2>
            <p style={tipNote}>For deeper / situational responses, use <Link href="/rep-portal/objections" style={linkStyle}>Objections AI</Link>. Below are baseline responses to memorize.</p>
            <div style={{ display: "grid", gap: "12px" }}>
              <Obj objection="It's too expensive" response="&ldquo;Compared to what? Let&apos;s look at the math, what are you currently paying or doing instead?&rdquo; (Pivot to value, not discount.)" />
              <Obj objection="We already have a website" response="&ldquo;Most businesses we work with had one too. The difference isn&apos;t the website, it&apos;s the AI tools running on it. What does yours do besides sit there?&rdquo;" />
              <Obj objection="We use HubSpot / Salesforce already" response="&ldquo;Those are CRMs. We&apos;re not replacing the CRM — we&apos;re adding AI that runs ON top of it (or beside it for small teams). Want to see?&rdquo;" />
              <Obj objection="I need to think about it" response="&ldquo;What specifically? If it&apos;s about whether this works in your industry, I can show you 3 examples in 5 minutes. If it&apos;s budget, let&apos;s figure that out now.&rdquo;" />
              <Obj objection="Send me more info" response="&ldquo;I will. But the proposal will be specific to YOUR business, so I need 10 minutes first to know what matters to you. When&apos;s good?&rdquo;" />
              <Obj objection="Can you do it cheaper?" response="&ldquo;Not on standard pricing — I&apos;d be undercutting our other clients. But if you can commit + give us a testimonial at month 2, we have a Pilot Partner spot at 30% off setup + 30% off first 6 months.&rdquo;" />
              <Obj objection="Why not just hire a freelancer for $30/hr?" response="&ldquo;Freelancers are great for one-time builds. We do ongoing, we maintain it, we update it, we ship new features. Math at month 6: us $1,800 (all-in maintained), freelancer $1,500 build + $0 maintenance = stale by month 3.&rdquo;" />
              <Obj objection="I don't have time right now" response="&ldquo;That&apos;s exactly the problem we solve. If you have 15 min later this week, I&apos;ll show you how to get 5 hours of your week back. When works?&rdquo;" />
              <Obj objection="We tried AI tools before and they didn't work" response="&ldquo;Which ones? — most generic tools fail because they&apos;re not fit to your business. We build for YOUR workflow specifically. What didn&apos;t work last time?&rdquo;" />
              <Obj objection="What if I cancel after a month?" response="&ldquo;You can. There&apos;s no contract, month-to-month. If we&apos;re not delivering value, you bail. We&apos;d rather have a happy client for 3 months than a stuck one for 12.&rdquo;" />
            </div>
          </section>

          {/* CLOSES */}
          <section id="closes" style={section}>
            <h2 style={sectionHead}>Close frameworks</h2>
            <div style={{ display: "grid", gap: "12px" }}>
              <Item title="The Specific-Date close">&ldquo;Great. We can have you live by [specific Friday]. I&apos;ll send the setup link in 5 minutes, what email do you want it at?&rdquo;</Item>
              <Item title="The Alternative-Choice close">&ldquo;Two ways to start — Growth at $179/mo with the full suite OR Starter at $99/mo to test the waters. Which fits where you are?&rdquo;</Item>
              <Item title="The Quiet close">After they&apos;ve seen value: pause. Let them ask &ldquo;so what do I do next?&rdquo; If they don&apos;t after 5 seconds — &ldquo;Should we get you set up?&rdquo;</Item>
              <Item title="The Pilot Partner close">&ldquo;We have 3 Pilot Partner spots left. 30% off setup, 30% off first 6 months, lock-in pricing, in exchange for a 2-sentence testimonial at month 2 + one referral within 6 months. Want one?&rdquo;</Item>
              <Item title="The Honest-No close">&ldquo;If now isn&apos;t right, text me NO and I&apos;ll stop. If we should keep talking, when&apos;s good?&rdquo; (Use ONLY after 3+ follow-ups.)</Item>
            </div>
          </section>

          {/* ESCALATION */}
          <section id="escalation" style={section}>
            <h2 style={sectionHead}>When to escalate to Elijah</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.8 }}>
              <li><strong>Custom Software</strong> — ANY size. Elijah scopes; you close.</li>
              <li><strong>Negotiation below Pilot Partner rates</strong> — don&apos;t discount on your own authority.</li>
              <li><strong>Consulting deal over $2,000</strong></li>
              <li><strong>Prospect claiming past PV history</strong> — verify before committing.</li>
              <li><strong>Anything you&apos;re unsure about</strong> — trust the instinct.</li>
            </ul>
            <p style={tipNote}><strong style={{ color: "var(--color-warm-accent)" }}>How:</strong> Text <strong>(205) 462-7839</strong>. Format: &ldquo;Got a [SERVICE] prospect, [BUDGET], decision [TIMELINE]. Need 5 min before I quote.&rdquo; Don&apos;t escalate in front of the prospect.</p>
          </section>

          {/* AFTER */}
          <section id="after" style={section}>
            <h2 style={sectionHead}>After every call, checklist</h2>
            <ol style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.9 }}>
              <li><strong>Log the call within 5 min.</strong> Use <Link href="/rep-portal/call-recap" style={linkStyle}>Call Recap</Link> if your notes are messy — AI structures them.</li>
              <li><strong>Update the stage</strong> on the contact if the deal moved (or didn&apos;t).</li>
              <li><strong>Set the next follow-up date.</strong> Always. No exceptions. Empty &quot;next follow-up&quot; field = contact rots.</li>
              <li><strong>If you committed to something, add it as a task.</strong> (Send proposal, send vendor list, etc.) Due date = when you said.</li>
              <li><strong>If you got a clear NO, mark Closed Lost</strong> with a note WHY — so we can re-pitch in 90 days with a new angle.</li>
              <li><strong>If you got a clear YES, send the next-step email within 60 min.</strong> Momentum compounds.</li>
            </ol>
          </section>

        </main>
      </div>
    </div>
  );
}

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
      <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{title}</div>
      <div style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6, fontStyle: "italic" }}>{children}</div>
    </div>
  );
}

function Obj({ objection, response }: { objection: string; response: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
      <div>
        <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#e54a28", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>They say</div>
        <div style={{ fontSize: "13px", color: "var(--color-warm-text)", fontStyle: "italic" }}>&ldquo;{objection}&rdquo;</div>
      </div>
      <div>
        <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7aaa6a", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>You say</div>
        <div style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: response.replace(/&ldquo;|&rdquo;/g, (m) => m === '&ldquo;' ? '"' : '"').replace(/&apos;/g, "'") }} />
      </div>
    </div>
  );
}

const section: React.CSSProperties = { marginBottom: "40px", scrollMarginTop: "120px" };
const sectionHead: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 12px" };
const tipNote: React.CSSProperties = { fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "16px", lineHeight: 1.6, padding: "10px 14px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)" };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const li: React.CSSProperties = { marginBottom: "8px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 };
const cheatTable: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "720px" };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700 };
const tr: React.CSSProperties = { borderBottom: "1px solid var(--color-warm-border)" };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)" };
