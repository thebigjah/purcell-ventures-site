import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/case-for-charging-19" },
  title: { absolute: "Why I charge $19 for the AI Starter Kit, by Elijah Purcell" },
  description: "Why I priced the PV AI Starter Kit at $19, what it does to how people buy, and what 200 sales would add up to.",
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
          { name: "Why I charge $19 for the AI Starter Kit", href: "/blog/case-for-charging-19" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Strategy, May 25, 2026, 4 min read</div>
          <h1>
            Why I charge <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$19</em> for the AI Starter Kit
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>I launched the <Link href="/shop/starter-kit" style={linkStyle}>PV AI Starter Kit</Link> for $19. It contains 24 AI prompts, 5 sales scripts, a rep handbook, 50+ cold outreach templates, a 1099 contractor agreement template, and a CRM CSV template.</p>

          <p>Courses and template bundles in this category often sell for hundreds of dollars. These are my reasons for pricing mine at $19.</p>

          <h2 style={head}>1. A low price lets me skip a sales funnel</h2>
          <p>At $497, I would need a sales funnel: a webinar, an email sequence and testimonials. I would have to build all of that before selling a single copy.</p>

          <p>At $19, I do not need one. Someone tries one of the free tools on the site and can buy the kit at the bottom of the page.</p>

          <p>The $19 price earns less per visit than a $497 price would. I expect repeat customers to close some of that gap, and I do not have the sales data yet to say how much.</p>

          <h2 style={head}>2. Some $19 buyers may buy the $179 service</h2>
          <p>Someone who has paid $19 has already bought from Purcell Ventures once. The second purchase is a smaller decision than the first.</p>

          <p>When they need the done-for-you version of one of my products (Digital Services $179/mo, Consulting $175/hr, Custom Software $1,500+), they already know how I work and what I deliver.</p>

          <h2 style={head}>3. Unit economics</h2>
          <p>The content in the $19 kit took about 40 hours of work. If I sell 100 copies, that is $1,900, or about $47 for each hour of build time. If I sell 1,000 copies, that is $19,000, or about $475 an hour, which is above my $175 hourly consulting rate.</p>

          <p>Each extra copy is a digital download and costs me nothing to deliver, so total sales matter more than margin per copy.</p>

          <h2 style={head}>4. A $19 purchase carries little risk</h2>
          <p>A $19 mistake costs the buyer little.</p>

          <p>That changes how people buy. At $19, the buyer is testing: <em>let&apos;s see if this is any good.</em> At $497, the buyer is justifying: <em>I have to prove to myself this was worth it.</em></p>

          <h2 style={head}>5. Agencies hide the contents until you pay. I list every file.</h2>
          <p>When you sell a $497 course, the customer can&apos;t see the contents until after they pay, so the sales page has to persuade them.</p>

          <p>When you sell a $19 kit, you can show people exactly what&apos;s inside. I list every file in the kit on the <Link href="/shop/starter-kit" style={linkStyle}>shop page</Link>, so the customer knows what they are getting before they buy.</p>

          <h2 style={head}>6. Cheap entry products force operational discipline</h2>
          <p>If I can&apos;t deliver $19 of value automatically, every time, with no effort per sale, my operations are not ready for a $497 product either.</p>

          <p>The kit is a test of my delivery pipeline. It has to deliver instantly through Stripe and need no support.</p>

          <h2 style={head}>What 200 sales would mean</h2>
          <p>If I sell 200 kits a year at $19, that is $3,800 toward the build time and 200 people who have bought from me once.</p>

          <p>If 10 of them became Digital Services customers at $179/mo for 12 months, that would add $21,480.</p>

          <p>The $19 kit will not cover my costs. I expect it to bring in customers for the paid services.</p>

          <h2 style={head}>What this means if you&apos;re selling something</h2>
          <p>If you sell at $97, $297, or $497, consider what a $19 version would look like. Use it alongside your main product as a low-cost first step.</p>

          <p>The hard part is giving up per-unit margin in exchange for more buyers.</p>

          <p style={{ marginTop: "32px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", borderLeft: "3px solid var(--color-warm-accent)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            I drafted this post with AI tools and edited it before publishing.
          </p>

          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-a-website-actually-costs" style={{ color: "var(--color-warm-accent)" }}>What a small business website costs, with the numbers</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/starting-a-business-at-alabama" style={{ color: "var(--color-warm-accent)" }}>Starting a business as a student at Alabama</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "case-for-charging-19",
            title: "Why I charge $19 for the AI Starter Kit",
            description: "Why I priced the PV AI Starter Kit at $19, what it does to how people buy, and what 200 sales would add up to.",
            published: "2026-05-25",
          }} />

        </article>

      </main>
    </div>
  );
}

const head: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginTop: "32px", marginBottom: "12px", fontWeight: 600 };
const linkStyle: React.CSSProperties = { color: "var(--color-warm-accent)", textDecoration: "underline", textUnderlineOffset: "2px" };
