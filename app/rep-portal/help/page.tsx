"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
const tipStyle: React.CSSProperties = { fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic", padding: "10px 14px", background: "rgba(212, 175, 55, 0.04)", borderLeft: "3px solid var(--color-warm-accent)", marginTop: "12px" };
const subhead: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-accent)", fontWeight: 600, marginTop: "20px", marginBottom: "10px" };
const codeStyle: React.CSSProperties = { fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", padding: "1px 6px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-accent)" };

interface HelpSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: HelpSection[] = [
  {
    id: "first-day",
    title: "I. Your first day — what to do",
    body: (
      <>
        <p>Welcome to the rep portal. In your first hour:</p>
        <ol>
          <li><strong>Read the <Link href="/rep-portal/handbook" style={linkStyle}>Handbook</Link>.</strong> 10 minutes. Especially the Hard Rules (§5) and the Pilot Partner pitch (§4). Don&apos;t skim — the handbook is the contract.</li>
          <li><strong>Bookmark the <Link href="/rep-portal/pricing" style={linkStyle}>Pricing reference</Link>.</strong> This is the source of truth for every number you quote. When prices change here, you change.</li>
          <li><strong>Take the quiz</strong> (Elijah sent you the link separately). 14/18 to pass + 6/10 on ethics.</li>
          <li><strong>Sign the contractor agreement</strong> Elijah will send you after the quiz.</li>
          <li><strong>30-min onboarding call</strong> with Elijah — bring questions.</li>
          <li><strong>Add your first prospect</strong> to the <Link href="/rep-portal/crm" style={linkStyle}>CRM</Link>. Even if they&apos;re cold, log them. Commission gets paid on what&apos;s logged here.</li>
        </ol>
      </>
    ),
  },
  {
    id: "daily-rhythm",
    title: "II. The daily rhythm — what to do every day",
    body: (
      <>
        <ol>
          <li><strong>Open the <Link href="/rep-portal" style={linkStyle}>Dashboard</Link>.</strong> Look at overdue tasks + today&apos;s tasks at the top. Handle overdue FIRST.</li>
          <li><strong>Run the <Link href="/rep-portal/crm" style={linkStyle}>AI Deal Coach</Link></strong> (CRM → Coach view). It tells you the 3-5 contacts that need attention TODAY and exactly what to do.</li>
          <li><strong>Work through your <Link href="/rep-portal/calendar" style={linkStyle}>Calendar</Link>.</strong> Overdue → Today → Tomorrow → This week. Check off tasks as you finish them.</li>
          <li><strong>Log every conversation.</strong> Every call, email, meeting — log it on the contact&apos;s detail page. Activity log = your memory + your commission proof.</li>
          <li><strong>Set the next follow-up date</strong> when you log an activity. If you don&apos;t, the contact rots silently.</li>
        </ol>
      </>
    ),
  },
  {
    id: "log-call",
    title: "III. How to log a call (or any activity)",
    body: (
      <>
        <ol>
          <li>Open the contact in the <Link href="/rep-portal/crm" style={linkStyle}>CRM</Link>.</li>
          <li>In the &quot;Log activity&quot; box at the top of the activity timeline, pick the type (call, email, SMS, meeting, note).</li>
          <li>Write what happened in <strong>1-2 sentences</strong>. Be specific: &quot;Called Jane, left voicemail&quot; not &quot;tried Jane.&quot;</li>
          <li>Add an <strong>outcome</strong> if there&apos;s a specific result: &quot;Scheduled callback Tuesday 2pm&quot; / &quot;Asked me to email proposal&quot; / &quot;Pass — no budget.&quot;</li>
          <li>Click Log. The activity is timestamped + permanent.</li>
          <li><strong>Update the stage</strong> if the conversation moved the deal. (Dropdown in the contact header.)</li>
          <li><strong>Set or update the next follow-up date</strong> in the contact details.</li>
        </ol>
        <p style={tipStyle}>⭐ <strong>Pro tip:</strong> Log activities IMMEDIATELY after they happen, not at end-of-day. Memory degrades. Specifics fade.</p>
      </>
    ),
  },
  {
    id: "ai-tools",
    title: "IV. Using the AI tools (CRM-side)",
    body: (
      <>
        <p>Every contact detail page has four AI tools. Use them in this order on a new or returning contact:</p>
        <ol>
          <li><strong>AI Prospect Research</strong> — click before your FIRST call with a new contact. It generates likely pain points + service fit + opening line + discovery questions. Reads from the data you&apos;ve entered + industry knowledge.</li>
          <li><strong>Where are we (Conversation Summary)</strong> — click when you RETURN to a contact after &gt;3 days away. 5-line catch-up. Cached on the contact (re-runs on demand).</li>
          <li><strong>Suggest next step</strong> — click when you&apos;re unsure what to do next. AI looks at the stage + activity history + last touch + notes and recommends specific action with timing.</li>
          <li><strong>AI Deal Coach (CRM → Coach view)</strong> — once a day. Higher-level. Ranks your whole pipeline + says what&apos;s urgent + what&apos;s dead.</li>
        </ol>
        <p style={tipStyle}>⭐ <strong>Real-world flow:</strong> Monday morning → Deal Coach → identifies 3 priorities → open priority #1 → Conversation Summary (catch up) → Next Step (what to do) → do it → log the activity.</p>
      </>
    ),
  },
  {
    id: "templates",
    title: "V. Using email templates",
    body: (
      <>
        <p>Templates save you from rewriting the same email 50 times.</p>
        <ol>
          <li>Go to <Link href="/rep-portal/templates" style={linkStyle}>Templates</Link>.</li>
          <li>Click &quot;Seed with 4 starter templates&quot; (or build your own with + New template).</li>
          <li>Templates use tokens like <code style={codeStyle}>{`{{firstName}}`}</code>, <code style={codeStyle}>{`{{company}}`}</code>, <code style={codeStyle}>{`{{service}}`}</code> as placeholders.</li>
          <li>On any <Link href="/rep-portal/crm" style={linkStyle}>contact detail page</Link>, use the &quot;📧 Use email template&quot; dropdown. The template opens in your email client with tokens auto-filled.</li>
          <li>Edit before sending (always — never send a template straight). Activity log captures the template you used.</li>
        </ol>
        <p style={tipStyle}>⭐ <strong>Pairs with:</strong> the <Link href="/digital/tools/email-composer" style={linkStyle}>AI Email Composer</Link> for one-off emails you don&apos;t need to save.</p>
      </>
    ),
  },
  {
    id: "health-score",
    title: "VI. How to read the Health Score",
    body: (
      <>
        <p>Each contact has a 0-100 health score visible in the CRM list view + detail page. Color-coded:</p>
        <ul>
          <li><strong style={{ color: "#4a9a6a" }}>80-100 (Hot/Won)</strong> — recent activity, advanced stage. Keep momentum.</li>
          <li><strong style={{ color: "#7aaa6a" }}>60-79 (Warm)</strong> — engaged but not closing yet. Keep touching weekly.</li>
          <li><strong style={{ color: "#e8b968" }}>40-59 (Cooling)</strong> — gone 1-2 weeks silent. Reach out THIS WEEK or risk losing it.</li>
          <li><strong style={{ color: "#e54a28" }}>1-39 (Cold)</strong> — likely dead. Either rekindle with a specific reason or mark Closed Lost.</li>
        </ul>
        <p>Hover over the score badge to see the reasoning (e.g., &quot;14d since touch · stage Qualified · 5 activities logged&quot;).</p>
        <p style={tipStyle}>⭐ <strong>How it&apos;s calculated:</strong> Stage base + recency bonus/penalty + overdue follow-up penalty + engagement bonus (activity count) + notes bonus.</p>
      </>
    ),
  },
  {
    id: "escalation",
    title: "VII. When to escalate to Elijah (and how)",
    body: (
      <>
        <p>You handle most things solo. Escalate to Elijah for any of these:</p>
        <ul>
          <li><strong>Custom Software inquiry</strong> — ANY size. Elijah scopes, you close. Never quote yourself.</li>
          <li><strong>Negotiation below Pilot Partner rates</strong> — don&apos;t discount on your own authority.</li>
          <li><strong>Consulting deal over $2,000</strong></li>
          <li><strong>Prospect claiming existing PV history</strong> (past customer, referral) — verify before you commit.</li>
          <li><strong>Prospect from a competitor&apos;s customer base</strong> — judgment call.</li>
          <li><strong>Anything you&apos;re unsure about</strong> — trust your instinct that something needs a second opinion.</li>
        </ul>
        <p><strong>How:</strong></p>
        <ol>
          <li>Text Elijah at <strong>(205) 462-7839</strong></li>
          <li>Format: <em>&quot;Got a [SERVICE] prospect, [BUDGET], decision timeline [X]. Need 5 min before I quote.&quot;</em></li>
          <li>Don&apos;t escalate in front of the prospect.</li>
          <li>Don&apos;t use the AI Ask bot as a substitute for escalation on high-value deals.</li>
        </ol>
      </>
    ),
  },
  {
    id: "common-workflows",
    title: "VIII. Common workflows — step by step",
    body: (
      <>
        <h4 style={subhead}>A. Cold outreach to a new prospect</h4>
        <ol>
          <li>Add them to CRM as Lead.</li>
          <li>Run AI Prospect Research → get opening line + discovery questions.</li>
          <li>Use a cold-outreach email template (Templates page).</li>
          <li>Log the email as activity. Set next follow-up date 3-5 days out.</li>
        </ol>

        <h4 style={subhead}>B. Following up on a quote that went silent</h4>
        <ol>
          <li>Open the contact. Run &quot;Where are we&quot; summary. Read the vibe.</li>
          <li>Run &quot;Suggest next step&quot; — usually it&apos;ll say specifically how to follow up.</li>
          <li>Use the &quot;Day-3 follow-up&quot; template (if you seeded the starters).</li>
          <li>Set next follow-up for 5-7 days from now. If they go silent again, &quot;final touch&quot; template.</li>
        </ol>

        <h4 style={subhead}>C. Demo a tool live during a call</h4>
        <ol>
          <li>Pull up the <Link href="/rep-portal/demo-tools" style={linkStyle}>Demo Tools launcher</Link>.</li>
          <li>Pick the tool that matches their pain.</li>
          <li>Open in new tab. Use their actual business name + 1-sentence description.</li>
          <li>Watch their reaction. Then: &quot;Want this branded + integrated into your own site?&quot;</li>
        </ol>

        <h4 style={subhead}>D. Importing existing prospects from a spreadsheet</h4>
        <ol>
          <li>In CRM toolbar, click &quot;Import CSV.&quot;</li>
          <li>CSV should have headers: firstName, lastName, email, phone, company, service, source (any subset).</li>
          <li>Confirm count → import. Duplicates are skipped by email.</li>
          <li>All imported contacts are tagged &quot;csv-import&quot; for easy filtering.</li>
        </ol>

        <h4 style={subhead}>E. End of day — closing out</h4>
        <ol>
          <li>Update any contacts where you had activity today (log it).</li>
          <li>Set next follow-up dates on anything you touched.</li>
          <li>Check tomorrow&apos;s calendar — if there&apos;s prep work, do it now.</li>
          <li>Close laptop.</li>
        </ol>
      </>
    ),
  },
  {
    id: "stuck",
    title: "IX. When you&apos;re stuck — order of operations",
    body: (
      <>
        <ol>
          <li><strong>Check the <Link href="/rep-portal/handbook" style={linkStyle}>Handbook</Link></strong> — is your question covered there?</li>
          <li><strong>Check the <Link href="/rep-portal/scripts" style={linkStyle}>Scripts</Link></strong> — is there an established close or follow-up framework?</li>
          <li><strong>Ask the <Link href="/rep-portal/ask" style={linkStyle}>AI assistant</Link></strong> — type the question. Tactical answers with pricing + scripts.</li>
          <li><strong>Run AI Next-Step on the specific contact</strong> — situational coaching.</li>
          <li><strong>Text Elijah</strong> — if none of the above resolved it.</li>
        </ol>
      </>
    ),
  },
];

export default function HelpPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .help-content p, .help-content li { line-height: 1.7; color: var(--color-warm-text); }
        .help-content p, .help-content ul, .help-content ol { margin-bottom: 14px; }
        .help-content li { margin-bottom: 6px; }
        .help-content strong { color: var(--color-warm-text); }
        .help-content h4 { color: var(--color-warm-accent); }
      ` }} />
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Help + How-To</div>
            <h1>
              How to <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>use this.</em>
            </h1>
            <p className="deck">
              Practical guide to every part of the rep portal. Read top to bottom on day one. Reference any section by clicking from the table of contents.
            </p>
          </header>

          {/* Table of contents */}
          <nav style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px 24px", marginBottom: "32px" }}>
            <div className="pv-mono-label" style={{ marginBottom: "10px" }}>Contents</div>
            <ol style={{ margin: 0, paddingLeft: "20px", columns: 2, columnGap: "32px" }}>
              {SECTIONS.map((s) => (
                <li key={s.id} style={{ marginBottom: "4px", listStyle: "none" }}>
                  <a href={`#${s.id}`} style={{ color: "var(--color-warm-text)", textDecoration: "none", fontSize: "13px" }}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="help-content">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} style={{ marginBottom: "48px", paddingBottom: "24px", borderBottom: "1px solid var(--color-warm-border)" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 16px" }}>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Question not covered here? Text Elijah at (205) 462-7839 — and we&apos;ll add the answer to this page so the next person doesn&apos;t have to ask.
          </p>

        </main>
      </div>
    </div>
  );
}
