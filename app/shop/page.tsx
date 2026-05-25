import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Shop — Purcell Ventures",
  description: "Self-serve digital products from Purcell Ventures: PV AI Starter Kit + Cold Email Mastery Pack. Instant download via Stripe.",
};

const PRODUCTS = [
  {
    href: "/shop/subject-lines",
    title: "Cold Email Subject Line Library",
    price: "$9",
    tagline: "80 tested subject lines across 8 categories",
    blurb: "10 per category — Direct, Question, Referral, Observation, Local, Value-First, Curiosity, Time-Bound. Plus 20 you should NEVER use.",
    bestFor: "Quick-win pricing. Anyone who needs better email hooks today.",
    sizing: "80 lines · 8 categories · PDF + markdown",
  },
  {
    href: "/shop/starter-kit",
    title: "PV AI Starter Kit",
    price: "$19",
    tagline: "Steal our entire sales + AI infrastructure",
    blurb: "24 production AI prompts + 5 sales scripts + full rep handbook + 50+ cold-outreach templates + contractor agreement + CRM CSV.",
    bestFor: "Small business owners, freelancers, consultants ready to add AI tools without paying agency prices.",
    sizing: "42 files · ZIP · markdown + PDF",
  },
  {
    href: "/shop/cold-email-pack",
    title: "Cold Email Mastery Pack",
    price: "$29",
    tagline: "100+ tested cold email templates",
    blurb: "10 industries · 80 subject lines · 30 reply-handling scripts · AI scoring rubric · 4 complete sequencing cadences + list-building playbook.",
    bestFor: "Anyone doing cold outreach who's tired of getting ignored. Reps, freelancers, founders filling a pipeline.",
    sizing: "200+ pieces of content · 6 folders",
  },
];

export default function ShopPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">Shop · Self-serve digital products</div>
          <h1>
            Take what we&apos;ve built. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Use it.</em>
          </h1>
          <p className="deck">
            Every product on this page is something we use internally at Purcell Ventures. Editable. Yours forever after purchase. Delivered instantly via email after Stripe checkout. 30-day refund on everything.
          </p>
        </header>

        {/* Bundle CTA */}
        <div style={{ marginBottom: "48px", padding: "28px 32px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px dashed var(--color-warm-accent)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px" }}>
            Bundle Deal — Save $9
          </div>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", margin: "0 0 8px", fontWeight: 700 }}>
            Get both kits for <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$39</em>
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
            Starter Kit ($19) + Cold Email Mastery Pack ($29) = <strong>$48 separately</strong>. Buy both today: <strong style={{ color: "var(--color-warm-accent)" }}>$39</strong>.
          </p>
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", margin: 0 }}>
            (Bundle requires Stripe Coupon — see <code>~/.claude/elijahbot/drafts/STRIPE-SETUP-STARTER-KIT.md</code> for setup. For now, buy each separately.)
          </p>
        </div>

        {/* Products grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "48px" }}>
          {PRODUCTS.map((p) => (
            <Link key={p.href} href={p.href} className="pv-card" style={{ padding: 0, overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: 0, fontWeight: 700 }}>{p.title}</h2>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", color: "var(--color-warm-accent)", fontWeight: 700 }}>{p.price}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-warm-accent)", margin: "0 0 12px", fontStyle: "italic" }}>{p.tagline}</p>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 16px", lineHeight: 1.6, flex: 1 }}>{p.blurb}</p>
                <div style={{ paddingTop: "12px", borderTop: "1px solid var(--color-warm-border)", fontSize: "11px", color: "var(--color-warm-text-light)" }}>
                  <div style={{ marginBottom: "4px" }}><strong style={{ color: "var(--color-warm-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>Best for:</strong> {p.bestFor}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans), monospace", marginTop: "8px" }}>{p.sizing}</div>
                </div>
                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--color-warm-border)", textAlign: "center" }}>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", color: "var(--color-warm-accent)", fontWeight: 700, letterSpacing: "0.05em" }}>See what&apos;s inside →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why */}
        <section style={{ marginBottom: "48px", padding: "28px 32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
            Why we ship our internal infrastructure as $19-$29 kits
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: "0 0 12px" }}>
            We could lock this stuff behind a $497 course. Most agencies would. We&apos;d rather make it cheap enough that anyone can grab it, validate it works, and then come back when they want the done-for-you version.
          </p>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0 }}>
            The kit-to-service funnel: try the kit, see it works, hire us to deploy + maintain a custom version. Or don&apos;t — keep using the kit. Both fine.
          </p>
        </section>

        {/* Want more */}
        <div style={{ textAlign: "center", padding: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
            Want a custom version of any of this?
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 20px", lineHeight: 1.6, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            We build, deploy, and maintain custom AI tools + sales infrastructure for businesses. Digital subscriptions start at $99/mo bundled.
          </p>
          <Link href="/digital" className="pv-btn-primary" style={{ marginRight: "12px" }}>See Digital Services</Link>
          <Link href="/how-we-work" className="pv-btn-ghost" style={{ background: "transparent" }}>How we work</Link>
        </div>

      </main>
    </div>
  );
}
