import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/why-i-built-crm-from-scratch" },
  title: { absolute: "Why I built a CRM from scratch instead of paying HubSpot, by Elijah Purcell" },
  description: "HubSpot starts at $50 a month, and the features I needed put it at $200 to $400 a month. I built my own CRM in a week instead. The costs, what I gave up, and when you should not do this.",
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
          { name: "Why I built a CRM from scratch instead of paying HubSpot", href: "/blog/why-i-built-crm-from-scratch" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion, May 25, 2026, 5 min read</div>
          <h1>
            Why I built a CRM <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>from scratch</em> instead of paying for HubSpot
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>When I set up sales at Purcell Ventures, HubSpot was the obvious choice, and it has a free tier.</p>

          <p>I evaluated HubSpot for two days and decided to build. The build took a week.</p>

          <h2 style={head}>HubSpot pricing</h2>
          <p>The free tier excludes the features below. These are the plan prices HubSpot listed when I wrote this post in May 2026. Their current prices are <a href="https://www.hubspot.com/pricing/sales" style={{ color: "var(--color-warm-accent)", textDecoration: "underline" }} rel="noopener">published here</a>.</p>

          <ul>
            <li>Custom properties beyond 5, at $50/mo (Starter)</li>
            <li>Workflow automation, at $890/mo (Marketing Hub Pro)</li>
            <li>Pipeline forecasting, at $720/mo (Sales Hub Pro)</li>
            <li>Custom reports, at $50/mo+</li>
            <li>API access beyond rate limits, at $720/mo</li>
          </ul>

          <p>I needed multi-rep visibility, AI-assisted next steps, custom contact stages, an activity timeline and email templates with tokens. That would have cost $200 to $400 a month, or $2,400 to $4,800 a year.</p>

          <h2 style={head}>What I built instead</h2>
          <p>One week of focused work produced a CRM with 6 views (List, Kanban, Tasks, Stats, Coach, Reps), per-rep auth, AI features specific to my workflow, and an activity log built around the sales conversations my reps and I have.</p>

          <p>The cost so far is $15 in Anthropic API usage for the AI features. There is no monthly subscription.</p>

          <h2 style={head}>Why the math works</h2>
          <p>The usual objection is that a custom CRM takes more upkeep than HubSpot. For me it has taken less, for four reasons.</p>

          <p><strong>1. I control feature scope.</strong> When HubSpot adds features I don&apos;t need, its interface gets more complex. When I add a feature, the interface grows by that one feature.</p>

          <p><strong>2. I push fixes myself.</strong> If my CRM has a bug, I fix it the same day. If HubSpot has a bug in my workflow, I file a ticket and wait.</p>

          <p><strong>3. Integrations are small jobs.</strong> The Steady intake form and the /sales-rep form both create a CRM contact automatically. With HubSpot, that is either a paid feature at $50 a month or a Zapier connection at $30 a month plus API setup time.</p>

          <p><strong>4. AI features cost extra on third-party CRMs.</strong> HubSpot&apos;s AI features (Breeze) are tied to a $720 a month plan. Mine run on Claude Haiku at $0.001 per call.</p>

          <h2 style={head}>What I gave up</h2>
          <p>Three things:</p>

          <p><strong>1. Polish.</strong> HubSpot looks more sophisticated. Mine looks like a small-team CRM, because that&apos;s what it is. It would matter if I needed to impress investors.</p>

          <p><strong>2. Mobile app.</strong> HubSpot has a native mobile app. Mine is a mobile-responsive web app, which works and is less smooth.</p>

          <p><strong>3. Ecosystem integrations.</strong> HubSpot integrates with hundreds of tools. Mine connects to the tools I choose to wire up. So far that has been enough.</p>

          <h2 style={head}>When you should not do this</h2>

          <ul>
            <li><strong>If you don&apos;t code:</strong> use HubSpot.</li>
            <li><strong>If your team has more than 10 people:</strong> you need the permissions, audit logs and compliance features that commercial CRMs ship with, and building them costs far more.</li>
            <li><strong>If you need SOC 2 or HIPAA compliance:</strong> pay HubSpot or a similar vendor, because meeting those standards yourself is a large project.</li>
            <li><strong>If you have more than 1,000 contacts and a complex pipeline:</strong> the database work grows.</li>
            <li><strong>If you don&apos;t enjoy maintenance work:</strong> it will need maintenance now and then. If you hate that, pay someone else to do it.</li>
          </ul>

          <h2 style={head}>When you should do this</h2>
          <ul>
            <li>You work alone or on a team of two or three</li>
            <li>You code (or have access to someone who does)</li>
            <li>Your workflow is non-standard and requires custom logic</li>
            <li>You care about owning your data</li>
            <li>You will run this business for a year or more, so the build cost spreads out</li>
            <li>You want to use AI in custom ways the SaaS CRMs don&apos;t support</li>
          </ul>

          <h2 style={head}>A side benefit</h2>
          <p>Building my own CRM forced me to learn my sales process in detail, because I had to design every stage and field.</p>

          <h2 style={head}>What this looks like in my shop</h2>
          <p>I packaged the system prompts, the reasoning behind the database schema and the operating handbook into the <Link href="/shop/starter-kit" style={linkStyle}>$19 PV AI Starter Kit</Link>. It includes the prompts behind my CRM&apos;s AI features, and the kit runs on any AI tool you choose.</p>

          <p>If you want me to build a custom CRM for your business, see <Link href="/software" style={linkStyle}>Custom Software</Link>. I would start from the patterns I used for my own.</p>

          <p style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            I drafted this post with AI tools and edited it before publishing.
          </p>

        


          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-one-operator-can-deliver" style={{ color: "var(--color-warm-accent)" }}>What one operator can deliver</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-you-should-own" style={{ color: "var(--color-warm-accent)" }}>What you should own when a project finishes</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "why-i-built-crm-from-scratch",
            title: "Why I built a CRM from scratch instead of paying for HubSpot",
            description: "HubSpot starts at $50 a month, and the features I needed put it at $200 to $400 a month. I built my own CRM in a week instead. The costs, what I gave up, and when you should not do this.",
            published: "2026-05-25",
          }} />

        </article>

      </main>
    </div>
  );
}

const head: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginTop: "32px", marginBottom: "12px", fontWeight: 600 };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
