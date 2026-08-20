import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  title: "Why I built a CRM from scratch instead of paying HubSpot | Purcell Ventures Blog",
  description: "HubSpot starts at $50/mo and rapidly hits $200+/mo with features I actually need. So I built ours in a week. Here's the math, the tradeoffs, and when you should NOT do this.",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion · May 25, 2026 · 5 min read</div>
          <h1>
            Why I built a CRM <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>from scratch</em> instead of paying $1,200/yr for HubSpot
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>When I decided to build a sales operation at Purcell Ventures, the obvious move was HubSpot. Everyone uses HubSpot. The free tier exists. Why reinvent the wheel?</p>

          <p>I evaluated HubSpot for two days. Then I built our own CRM in a week. Here&apos;s the math.</p>

          <h2 style={head}>The HubSpot pricing reality</h2>
          <p>HubSpot has a free tier. That&apos;s the hook. But the free tier excludes:</p>

          <ul>
            <li>Custom properties beyond 5 — at $50/mo (Starter)</li>
            <li>Workflow automation — at $890/mo (Marketing Hub Pro)</li>
            <li>Pipeline forecasting — at $720/mo (Sales Hub Pro)</li>
            <li>Custom reports — at $50/mo+</li>
            <li>API access beyond rate limits — at $720/mo</li>
          </ul>

          <p>For our actual needs — multi-rep visibility + AI-assisted next steps + custom contact stages + activity timeline + email templates with tokens — we&apos;d be at $200-$400/mo. That&apos;s $2,400-$4,800/yr.</p>

          <h2 style={head}>What I built instead</h2>
          <p>One week of focused work on what I needed: a CRM with 6 views (List, Kanban, Tasks, Stats, Coach, Reps), per-rep auth, AI-powered features specific to our workflow, and an activity log structured exactly for the conversations we have.</p>

          <p>Hard cost: ~$15 in Anthropic API usage (the AI features). That&apos;s it. No monthly subscription. Forever.</p>

          <h2 style={head}>Why the math actually works</h2>
          <p>The instinct is &quot;it&apos;ll take longer to maintain than HubSpot.&quot; That&apos;s true in theory and false in practice. Here&apos;s why:</p>

          <p><strong>1. We control feature scope.</strong> When HubSpot adds 47 features I don&apos;t need, the UI gets more complex. When I add a feature I do need, the UI gets exactly more complex by that one feature. Compounding clarity.</p>

          <p><strong>2. Bug fix latency is zero.</strong> If our CRM has a bug, I push a fix. If HubSpot has a bug affecting our workflow, we file a ticket and wait. The latency cost compounds.</p>

          <p><strong>3. Custom integrations are trivial.</strong> The Steady intake form auto-creates a CRM contact. The /sales-rep form does too. With HubSpot, that&apos;s either built-in (then you&apos;re paying $50/mo for it) or it requires Zapier ($30/mo) + API setup time.</p>

          <p><strong>4. AI features cost real money on third-party CRMs.</strong> HubSpot&apos;s AI features (Breeze) are tied to a $720/mo plan. Ours run on Claude Haiku at ~$0.001 per call. Same value, 1000x cost difference.</p>

          <h2 style={head}>What I gave up</h2>
          <p>Three things, honestly:</p>

          <p><strong>1. Polish.</strong> HubSpot looks more sophisticated. Our CRM looks like a small-team CRM, because that&apos;s what it is. If the goal was to impress investors, this would matter.</p>

          <p><strong>2. Mobile app.</strong> HubSpot has a real mobile app. We have a mobile-responsive web app, which is fine but not as smooth.</p>

          <p><strong>3. Ecosystem integrations.</strong> HubSpot integrates with hundreds of tools. We integrate with what we choose to integrate with. So far that&apos;s been enough.</p>

          <p>None of these gaps cost us deals. All of them save us money + control.</p>

          <h2 style={head}>When you should NOT do this</h2>
          <p>Be honest with yourself:</p>

          <ul>
            <li><strong>If you don&apos;t code:</strong> don&apos;t. HubSpot is fine. The build cost is your time × your skill.</li>
            <li><strong>If your team is &gt;10 people:</strong> the org-management features in real CRMs (permissions, audit logs, compliance) matter. Build cost goes way up.</li>
            <li><strong>If you need SOC 2 / HIPAA compliance:</strong> the compliance surface is huge. Pay HubSpot or similar.</li>
            <li><strong>If you have &gt;1,000 contacts and complex pipeline:</strong> the database side gets real.</li>
            <li><strong>If you don&apos;t enjoy maintenance work:</strong> it WILL want maintenance occasionally. If you hate that, pay for someone else to do it.</li>
          </ul>

          <h2 style={head}>When you SHOULD do this</h2>
          <ul>
            <li>You&apos;re solo or 2-3 person team</li>
            <li>You code (or have access to someone who does)</li>
            <li>Your workflow is non-standard and requires custom logic</li>
            <li>You care about owning your data</li>
            <li>You&apos;re going to spend a year+ on this business — the build cost amortizes</li>
            <li>You want to use AI in custom ways the SaaS CRMs don&apos;t support</li>
          </ul>

          <h2 style={head}>The hidden benefit nobody mentions</h2>
          <p>Building our own CRM forced us to know our sales process intimately. Every stage, every field, every report — we had to design it. That clarity is worth as much as the CRM itself.</p>

          <p>When you outsource the tool, you outsource the thinking behind it. We&apos;ve eaten our own dog food in the most literal way possible.</p>

          <h2 style={head}>What this looks like in our shop</h2>
          <p>We&apos;ve packaged the actual system prompts, the database schema reasoning, and the operational handbook into our <Link href="/shop/starter-kit" style={linkStyle}>$19 PV AI Starter Kit</Link>. The same prompts powering our CRM&apos;s AI features. Steal it, run it locally on your AI of choice.</p>

          <p>Or if you want us to build a custom CRM for your business, see <Link href="/software" style={linkStyle}>Custom Software</Link>. We&apos;ve done it for ourselves; doing it for you is just adapting the patterns.</p>

          <p style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            First draft written by our AI Content Generator. Edited and signed off by Elijah Purcell.
          </p>

        

          <PostByline post={{
            slug: "why-i-built-crm-from-scratch",
            title: "Why I built a CRM from scratch instead of paying $1,200/yr for HubSpot",
            description: "HubSpot starts at $50/mo and rapidly hits $200+/mo with features I actually need. So I built ours in a week. Here's the math, the tradeoffs, and when you should NOT do this.",
            published: "2026-05-25",
          }} />

        </article>

      </main>
    </div>
  );
}

const head: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginTop: "32px", marginBottom: "12px", fontWeight: 600 };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
