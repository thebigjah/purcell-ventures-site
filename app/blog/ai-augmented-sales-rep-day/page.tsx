import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/ai-augmented-sales-rep-day" },
  title: { absolute: "What a day looks like for an AI-augmented sales rep | Elijah Purcell" },
  description: "A full Tuesday in the life of a rep using AI prospect research, AI next-step coaching, and conversation summary tools alongside a real CRM. Specific times, specific tasks, specific tools.",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What a day looks like for an AI-augmented sales rep", href: "/blog/ai-augmented-sales-rep-day" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Process · May 25, 2026 · 6 min read</div>
          <h1>
            What a day looks like for an <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>AI-augmented sales rep</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>I keep getting asked what AI tools actually <em>change</em> about a sales rep&apos;s day. Not in theory, in practice. So here&apos;s a real Tuesday, hour by hour, from one of our reps using the rep portal we&apos;ve built at Purcell Ventures.</p>

          <p>Names changed. Times rough. Tools and workflows are exactly what they did.</p>

          <h2 style={head}>8:15 AM — Open the dashboard</h2>
          <p>Luke logs into the rep portal. The dashboard shows him three things immediately: <strong>2 tasks overdue, 4 due today, $12,400 in open pipeline.</strong> The overdue tasks are color-coded red. He starts with those.</p>

          <h2 style={head}>8:18 AM — AI Deal Coach</h2>
          <p>Before he dives in, he clicks the <strong>Coach</strong> view in the CRM. The AI Deal Coach analyzes his whole pipeline (currently 23 open contacts) and surfaces the three deals he should work on TODAY. Not just by stage, by combination of stage, days-since-last-touch, and his notes.</p>

          <p>Top priority today: <strong>Sarah Chen at Cherry Blossom Salon.</strong> The Coach says: &quot;Sarah quoted 5 days ago, then went silent. Her LinkedIn shows she posted yesterday about &apos;trying to grow without losing the family feel&apos; — that&apos;s an opening. Reach out today before the deal cools.&quot;</p>

          <h2 style={head}>8:22 AM — Open Sarah&apos;s contact</h2>
          <p>Luke clicks into Sarah&apos;s contact. He clicks <strong>&quot;Where are we?&quot;</strong> in the Conversation Summary panel. AI reads the activity timeline (8 entries) and outputs a 5-line catch-up:</p>

          <ul>
            <li><strong>Where we are:</strong> Sarah&apos;s a salon owner who quoted Growth tier 5 days ago. Quote was $179/mo + $700 setup.</li>
            <li><strong>Last meaningful action:</strong> Said &quot;let me think about it&quot; on Tuesday call. Hasn&apos;t responded to Day-3 follow-up.</li>
            <li><strong>What WE owe them:</strong> Nothing, ball is in her court.</li>
            <li><strong>What THEY owe us:</strong> Decision on whether to start with Growth or step down to Starter.</li>
            <li><strong>Vibe read:</strong> <span style={{ color: "#e8b968" }}>Cooling</span>. Was warm when we quoted, now silent for 5 days. Last-touch territory before she goes cold.</li>
          </ul>

          <h2 style={head}>8:25 AM — Next-Step coaching</h2>
          <p>Luke clicks <strong>&quot;Suggest next step.&quot;</strong> AI returns:</p>

          <p><strong>Primary:</strong> &quot;Send a soft re-engagement email referencing her LinkedIn post about growth. Don&apos;t pitch, just acknowledge.&quot;</p>

          <p><strong>Exact words to use:</strong> <em>&quot;Saw your post about growing without losing the family feel, that&apos;s the exact thing the tier we talked about is built for. No pressure on the quote; I just wanted to send you a 2-min note about how 3 salons in similar spots used it. Want me to share, or are you stepping back from this for now? Either&apos;s fine.&quot;</em></p>

          <p><strong>Why it works:</strong> Acknowledges her post (shows attention), gives explicit permission to opt out (reduces pressure), offers specific value (3 case examples), low-stakes ask.</p>

          <p>Luke copies the language, edits the salon names to fit, sends in 90 seconds.</p>

          <h2 style={head}>8:30 AM — Use email template</h2>
          <p>For deal #2 (Mike at Patterson Plumbing — Day-3 follow-up due), Luke uses the saved template <strong>&quot;Day-3 follow-up after quote.&quot;</strong> Clicks the template dropdown on Mike&apos;s contact detail. AI fills in the tokens (`firstName`, `company`, `service`) from Mike&apos;s data. He skims, sends.</p>

          <p>Time spent on the second follow-up: 45 seconds.</p>

          <h2 style={head}>9:00 AM — Cold outreach block</h2>
          <p>Block of an hour for new prospects. Luke opens the <strong>AI Email Polish</strong> tool, pastes a rough cold email draft he wrote yesterday. The tool returns:</p>

          <ul>
            <li>Polished version — 30% shorter, sharper</li>
            <li>3 alternative subject lines (his was vague)</li>
            <li>Notes on what changed and why</li>
            <li>A &quot;voice read&quot;: &quot;Conversational, direct, doesn&apos;t over-explain&quot; — which matches Luke&apos;s style</li>
          </ul>

          <p>He adopts the polished version with one tweak. Sends to 8 prospects manually.</p>

          <h2 style={head}>10:30 AM — Prospect calls back</h2>
          <p>Jane Doe, a vet office Luke cold-emailed last week, calls. He hits the <strong>contact detail page</strong> on his phone (mobile-responsive), clicks <strong>&quot;Where are we?&quot;</strong> The AI summary gives him context in 4 seconds. He&apos;s able to say <em>&quot;Hi Jane! Last we talked, you mentioned the front-desk team was getting buried in intake calls, did that resolve, or is that still happening?&quot;</em></p>

          <p>Jane: &quot;You remembered that?&quot; — and immediately trusts him more. Hooks the discovery call.</p>

          <h2 style={head}>11:00 AM — Discovery call</h2>
          <p>Before the scheduled discovery call with a new prospect (insurance agency), Luke clicks <strong>AI Prospect Research</strong>. AI generates:</p>

          <ul>
            <li>Likely pain points (3 specific to insurance agencies)</li>
            <li>Service-fit recommendation (Growth tier, not Starter, agency has 12 employees)</li>
            <li>Opening line that references the agency&apos;s actual industry challenges</li>
            <li>5 discovery questions to ask</li>
            <li>3 red flags to watch for</li>
          </ul>

          <p>He goes into the call with a complete brief. Call goes well; he books a follow-up.</p>

          <h2 style={head}>11:45 AM — Log the call</h2>
          <p>Luke could type out notes manually. Instead, he opens <strong>AI Call Recap</strong>, dumps his messy notes (&quot;Talked to Karen 30 min, big agency Pittsford area, current site is wix she hates, ~12 employees, decision-maker w/ her business partner, said pricing felt fair, wants proposal by Friday, asked about HIPAA compliance&quot;).</p>

          <p>AI structures it into:</p>
          <ul>
            <li><strong>Outcome:</strong> Discovery call went well. Karen is decision-maker w/ partner. Sees pricing as fair. Asked about HIPAA.</li>
            <li><strong>Key points:</strong> 12-employee insurance agency · Pittsford area · Wix site she hates</li>
            <li><strong>They committed to:</strong> Decision by Friday with partner.</li>
            <li><strong>We committed to:</strong> Send proposal by EOD Wednesday + HIPAA compliance details.</li>
            <li><strong>Next action:</strong> Send proposal Wednesday with HIPAA addendum. Email channel.</li>
            <li><strong>Vibe:</strong> Warm. Suggest stage move to Qualified.</li>
          </ul>

          <p>Luke clicks &quot;Log this&quot; → activity is saved to Karen&apos;s timeline with structured data, stage automatically advances, follow-up task created. Total time for the recap: 90 seconds.</p>

          <h2 style={head}>1:00 PM — Lunch + Cmd+K</h2>
          <p>After lunch, Luke needs to find a specific contact named &quot;Pamela&quot; — he&apos;s forgotten her last name. Presses <strong>Cmd+K</strong>. Types &quot;pam.&quot; Fuzzy search across all contacts surfaces her instantly. Click → her detail page. Total time: 2 seconds.</p>

          <h2 style={head}>2:00 PM — Objection received</h2>
          <p>A prospect (Mike at the plumbing shop) emails back: <em>&quot;$179/mo is too expensive for where we are right now.&quot;</em></p>

          <p>Luke opens the <strong>AI Objection Handler</strong>, pastes the objection + context. AI returns 3 distinct response strategies:</p>

          <ul>
            <li><strong>Agree-and-Pivot:</strong> Acknowledge the price, redirect to ROI calculation</li>
            <li><strong>Clarifying-Question:</strong> &quot;Compared to what?&quot; — to surface the real issue</li>
            <li><strong>Direct-Pushback:</strong> Refute the &quot;expensive&quot; framing with specific math</li>
          </ul>

          <p>Luke picks the clarifying question (he&apos;s not sure if it&apos;s real budget or value perception). Replies, gets Mike&apos;s real concern, addresses it.</p>

          <h2 style={head}>4:00 PM — End-of-day close-out</h2>
          <p>Luke opens the <Link href="/rep-portal/calendar" style={linkStyle}>Calendar view</Link>. Sees tomorrow&apos;s tasks. Adjusts priorities. Checks his <strong>Personal Metrics</strong> on the dashboard: this month — $4,200 in closed deals, 60% win rate, $700 average deal size.</p>

          <p>His tier ladder rule says 5 closes promotes him from Apprentice to Closer. He has 3. He&apos;s on track.</p>

          <h2 style={head}>What changed vs. a non-AI workflow</h2>
          <p>This day used to take 9-10 hours. With AI augmentation it&apos;s 7 hours of higher-quality work. The compression isn&apos;t the point, the point is each interaction is sharper:</p>

          <ul>
            <li><strong>Catch-up time</strong> on returning contacts: 5 min → 30 seconds (Conversation Summary)</li>
            <li><strong>Cold call prep:</strong> 20 min → 90 seconds (Prospect Research)</li>
            <li><strong>Call notes:</strong> 10 min → 90 seconds + better structure (Call Recap)</li>
            <li><strong>Pitch tightening:</strong> 30 min (multiple drafts) → 5 min (Pitch Coach)</li>
            <li><strong>Objection responses:</strong> ad hoc → systematic with 3 strategies (Objection Handler)</li>
            <li><strong>What to work on next:</strong> intuition → AI-ranked priorities (Deal Coach)</li>
          </ul>

          <p>The result: more deals worked, each one with better preparation, less burn on the rep.</p>

          <h2 style={head}>What this isn&apos;t</h2>
          <p>The AI doesn&apos;t close the deal. The rep still has to actually be on the call, actually listen, actually be human. The AI removes prep burden + improves quality of each touch, it doesn&apos;t replace the rep.</p>

          <p>If your rep is bad at the actual conversation, AI tools won&apos;t fix that. They&apos;ll just make a bad rep more efficient at being bad. Hire the right person first; THEN augment with AI.</p>

          <h2 style={head}>How to try this yourself</h2>
          <p>If you have a sales operation (or you ARE the sales operation in your business), the easiest entry point is our <Link href="/shop/starter-kit" style={linkStyle}>PV AI Starter Kit ($19)</Link> — it includes the AI tool prompts and sales scripts described above.</p>

          <p>If you want this built and managed for your business, see our <Link href="/digital" style={linkStyle}>Digital Services tiers</Link> ($99-$279/mo) or <Link href="/software" style={linkStyle}>Custom Software</Link> for a fully tailored version.</p>

          <p style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            First draft written by our AI Content Generator. Edited and signed off by Elijah Purcell.
          </p>

        


          <PostFaq qa={[
            ["What does AI actually change about a salesperson's day?",
             "Concretely: a dashboard that opens on two overdue tasks, four due today and $12,400 in open pipeline; an AI deal coach that reads a whole pipeline of twenty-three open contacts and names the three worth working today by combining stage, days since last touch and the rep's own notes; and a conversation summary that reads an eight-entry activity timeline and returns five lines on where the deal stands."],
            ["How does an AI deal coach decide which deals to prioritise?",
             "Not by stage alone. It combines stage, days since the last touch, and the rep's notes, then surfaces a specific reason to act now. In the example it flagged a quote sent five days earlier that had gone silent, alongside a public post from the prospect that gave a natural opening."],
          ]} />

          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/cold-outreach-that-worked" style={{ color: "var(--color-warm-accent)" }}>The cold outreach that worked, and the version that did not</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/audit-every-business-in-your-town" style={{ color: "var(--color-warm-accent)" }}>How the prospect list gets built in an afternoon</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "ai-augmented-sales-rep-day",
            title: "What a day looks like for an AI-augmented sales rep",
            description: "A full Tuesday in the life of a rep using AI prospect research, AI next-step coaching, and conversation summary tools alongside a real CRM. Specific times, specific tasks, specific tools.",
            published: "2026-05-25",
          }} />

        </article>

      </main>
    </div>
  );
}

const head: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginTop: "32px", marginBottom: "12px", fontWeight: 600 };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
