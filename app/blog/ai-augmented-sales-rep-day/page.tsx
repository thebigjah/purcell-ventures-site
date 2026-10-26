import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/ai-augmented-sales-rep-day" },
  title: { absolute: "What a day looks like for an AI-augmented sales rep, by Elijah Purcell" },
  description: "An example Tuesday for a sales rep using AI prospect research, next-step coaching and conversation summaries inside a CRM, hour by hour.",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What a day looks like for an AI-augmented sales rep", href: "/blog/ai-augmented-sales-rep-day" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Process, May 25, 2026, 6 min read</div>
          <h1>
            What a day looks like for an <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>AI-augmented sales rep</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>People ask me what AI tools <em>change</em> in a sales rep&apos;s day. Here is what a day could look like for a rep using the tools in the rep portal I built at Purcell Ventures.</p>

          <p>This is an example day. Luke, the prospects and their businesses are invented. The tools and the steps are the ones the portal has.</p>

          <h2 style={head}>8:15 AM: Luke opens the dashboard</h2>
          <p>Luke logs into the rep portal. The dashboard shows three numbers at the top: <strong>2 tasks overdue, 4 due today, $12,400 in open pipeline.</strong> Overdue tasks show in red. He starts with those.</p>

          <h2 style={head}>8:18 AM: Luke checks the AI Deal Coach</h2>
          <p>He opens the <strong>Coach</strong> view in the CRM. The AI Deal Coach reads his pipeline of 23 open contacts and names the three deals to work today. It ranks them by stage, days since last touch and his notes.</p>

          <p>Top priority: <strong>Sarah Chen at Cherry Blossom Salon.</strong> The Coach says: &quot;Sarah quoted 5 days ago, then went silent. Her LinkedIn shows she posted yesterday about &apos;trying to grow without losing the family feel.&apos; That is an opening. Reach out today before the deal cools.&quot;</p>

          <h2 style={head}>8:22 AM: Luke opens Sarah&apos;s contact</h2>
          <p>Luke clicks into Sarah&apos;s contact and clicks <strong>&quot;Where are we?&quot;</strong> in the Conversation Summary panel. The AI reads the 8 entries in her activity timeline and writes a 5-line catch-up:</p>

          <ul>
            <li><strong>Where we are:</strong> Sarah owns a salon and got a Growth tier quote 5 days ago: $179/mo plus $700 setup.</li>
            <li><strong>Last meaningful action:</strong> Said &quot;let me think about it&quot; on the Tuesday call. Has not answered the day-3 follow-up.</li>
            <li><strong>What we owe them:</strong> Nothing. She owes us a reply.</li>
            <li><strong>What they owe us:</strong> A decision on Growth or the smaller Starter tier.</li>
            <li><strong>Status:</strong> <span style={{ color: "#e8b968" }}>Cooling</span>. She was interested when we quoted and has been silent for 5 days. This is the last good chance to reach her before she stops replying.</li>
          </ul>

          <h2 style={head}>8:25 AM: Luke asks for a next step</h2>
          <p>Luke clicks <strong>&quot;Suggest next step.&quot;</strong> The AI returns:</p>

          <p><strong>Primary:</strong> &quot;Send a short email that mentions her LinkedIn post about growth. Acknowledge the post and skip the pitch.&quot;</p>

          <p><strong>Suggested wording:</strong> <em>&quot;Saw your post about growing without losing the family feel. That is what the tier we talked about is built for. No pressure on the quote. I can send a 2-minute note on how 3 salons in a similar spot used it. Want me to send it, or are you stepping back from this for now? Either is fine.&quot;</em></p>

          <p><strong>Why it works:</strong> It shows he read her post, gives her an easy way to say no, and offers something specific (3 examples) with a small ask.</p>

          <p>Luke copies the wording, changes the salon details to fit, and sends it.</p>

          <h2 style={head}>8:30 AM: Luke sends a template email</h2>
          <p>Deal #2 is Mike at Patterson Plumbing, whose day-3 follow-up is due. Luke picks the saved template <strong>&quot;Day-3 follow-up after quote&quot;</strong> from the dropdown on Mike&apos;s contact page. The portal fills in the tokens (`firstName`, `company`, `service`) from Mike&apos;s record. He skims it and sends.</p>

          <h2 style={head}>9:00 AM: Cold outreach block</h2>
          <p>Luke sets aside an hour for new prospects. He opens the <strong>AI Email Polish</strong> tool and pastes a rough cold email he wrote yesterday. The tool returns:</p>

          <ul>
            <li>A shorter, edited version</li>
            <li>3 other subject lines (his was vague)</li>
            <li>Notes on what changed and why</li>
            <li>A &quot;voice read&quot; of &quot;Conversational, direct, doesn&apos;t over-explain&quot;, which matches how Luke writes</li>
          </ul>

          <p>He uses the edited version with one change and sends it to 8 prospects by hand.</p>

          <h2 style={head}>10:30 AM: A prospect calls back</h2>
          <p>Jane, who runs a vet office Luke emailed last week, calls. He opens her <strong>contact page</strong> on his phone and clicks <strong>&quot;Where are we?&quot;</strong> The summary reminds him what she said last time, so he can open with <em>&quot;Hi Jane. Last time we talked, you mentioned the front-desk team was getting buried in intake calls. Is that still happening?&quot;</em></p>

          <p>She says it is, and they book a discovery call.</p>

          <h2 style={head}>11:00 AM: Discovery call</h2>
          <p>Before a scheduled discovery call with an insurance agency, Luke clicks <strong>AI Prospect Research</strong>. The AI writes:</p>

          <ul>
            <li>Likely pain points (3 specific to insurance agencies)</li>
            <li>A service recommendation (Growth tier over Starter, because the agency has 12 employees)</li>
            <li>An opening line about problems insurance agencies commonly have</li>
            <li>5 discovery questions to ask</li>
            <li>3 red flags to watch for</li>
          </ul>

          <p>He goes into the call with a brief in hand. The call goes well and he books a follow-up.</p>

          <h2 style={head}>11:45 AM: Luke logs the call</h2>
          <p>Instead of typing notes by hand, Luke opens <strong>AI Call Recap</strong> and pastes his rough notes (&quot;Talked to Karen 30 min, big agency Pittsford area, current site is wix she hates, 12 employees, decision-maker w/ her business partner, said pricing felt fair, wants proposal by Friday, asked about HIPAA compliance&quot;).</p>

          <p>The AI sorts it into:</p>
          <ul>
            <li><strong>Outcome:</strong> Discovery call went well. Karen decides with her partner. Thinks the pricing is fair. Asked about HIPAA.</li>
            <li><strong>Key points:</strong> 12-employee insurance agency, Pittsford area, Wix site she dislikes</li>
            <li><strong>They committed to:</strong> A decision by Friday with her partner.</li>
            <li><strong>We committed to:</strong> Send the proposal and HIPAA compliance details by end of day Wednesday.</li>
            <li><strong>Next action:</strong> Email the proposal Wednesday with a HIPAA addendum.</li>
            <li><strong>Status:</strong> Interested. Suggests moving the stage to Qualified.</li>
          </ul>

          <p>Luke clicks &quot;Log this&quot; and the portal saves the activity to Karen&apos;s timeline, moves the stage forward and creates a follow-up task.</p>

          <h2 style={head}>1:00 PM: After lunch, Luke searches with Cmd+K</h2>
          <p>Luke needs a contact named &quot;Pamela&quot; and has forgotten her last name. He presses <strong>Cmd+K</strong> and types &quot;pam.&quot; Fuzzy search across all contacts finds her, and he clicks through to her page.</p>

          <h2 style={head}>2:00 PM: A prospect objects to the price</h2>
          <p>Mike at the plumbing shop emails back: <em>&quot;$179/mo is too expensive for where we are right now.&quot;</em></p>

          <p>Luke opens the <strong>AI Objection Handler</strong> and pastes the objection with some context. The AI returns 3 ways to respond:</p>

          <ul>
            <li><strong>Agree and pivot:</strong> Acknowledge the price, then walk through what the service would return</li>
            <li><strong>Clarifying question:</strong> &quot;Compared to what?&quot; to find the issue behind the price</li>
            <li><strong>Direct pushback:</strong> Answer the &quot;expensive&quot; point with specific math</li>
          </ul>

          <p>Luke picks the clarifying question because he cannot tell whether the problem is budget or whether Mike doubts the value. Mike&apos;s reply tells him which, and Luke answers that.</p>

          <h2 style={head}>4:00 PM: Luke closes out the day</h2>
          <p>Luke opens the <Link href="/rep-portal/calendar" style={linkStyle}>Calendar view</Link>, looks at tomorrow&apos;s tasks and reorders them. His <strong>Personal Metrics</strong> panel shows this month&apos;s closed deals, win rate and average deal size.</p>

          <p>The portal&apos;s tier ladder promotes a rep from Apprentice to Closer at 5 closes. He has 3.</p>

          <h2 style={head}>What changes compared with working without AI</h2>
          <p>The tools cut prep time on each task:</p>

          <ul>
            <li><strong>Catching up</strong> on a returning contact: reading a short summary instead of scrolling the whole timeline (Conversation Summary)</li>
            <li><strong>Call prep:</strong> a written brief before the call instead of researching from scratch (Prospect Research)</li>
            <li><strong>Call notes:</strong> rough notes turned into structured fields (Call Recap)</li>
            <li><strong>Email drafts:</strong> one edited version and subject lines instead of several rewrites (Email Polish)</li>
            <li><strong>Objections:</strong> 3 written options to choose from (Objection Handler)</li>
          </ul>

          <h2 style={head}>Limits</h2>
          <p>The rep still runs the call, listens and decides what to say. The AI removes prep work and drafts messages.</p>

          <p>AI tools do not fix weak conversations. Hire well first, then add AI.</p>

          <h2 style={head}>How to try this yourself</h2>
          <p>If you run sales for your business, or you are the whole sales team, start with the <Link href="/shop/starter-kit" style={linkStyle}>PV AI Starter Kit ($19)</Link>. It includes the AI tool prompts and sales scripts described above.</p>

          <p>If you want this set up and managed for you, see the <Link href="/digital" style={linkStyle}>Digital Services tiers</Link> ($99-$279/mo), or <Link href="/software" style={linkStyle}>Custom Software</Link> if you want a rep portal built for your business.</p>

          <p style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            I drafted this post with AI tools and edited it before publishing.
          </p>


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
            description: "An example Tuesday for a sales rep using AI prospect research, next-step coaching and conversation summaries inside a CRM, hour by hour.",
            published: "2026-05-25",
          }} />

        </article>

      </main>
    </div>
  );
}

const head: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginTop: "32px", marginBottom: "12px", fontWeight: 600 };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
