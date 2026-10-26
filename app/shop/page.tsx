import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Shop: Purcell Ventures",
  description: "Self-serve digital products from Purcell Ventures: the PV AI Starter Kit, Cold Email Mastery Pack and Subject Line Library. Stripe emails the download after checkout.",
};

const PRODUCTS = [
  {
    href: "/shop/bundle",
    title: "The Complete Pack (all 3, bundled)",
    price: "$39",
    tagline: "All three products for $18 less than buying them separately",
    blurb: "Starter Kit, Cold Email Mastery Pack and Subject Line Library. 61 files in one ZIP.",
    bestFor: "Buyers who want all three.",
    sizing: "61 files in 3 folders, one Stripe checkout",
  },
  {
    href: "/shop/subject-lines",
    title: "Cold Email Subject Line Library",
    price: "$9",
    tagline: "80 subject lines in 8 categories",
    blurb: "10 per category: Direct, Question, Referral, Observation, Local, Value-First, Curiosity, Time-Bound. The library also lists 20 lines to avoid.",
    bestFor: "Anyone who wants better subject lines for cold email.",
    sizing: "80 lines in 8 categories, PDF and markdown",
  },
  {
    href: "/shop/starter-kit",
    title: "PV AI Starter Kit",
    price: "$19",
    tagline: "The AI prompts, sales scripts and templates we use",
    blurb: "24 AI prompts we use in production, 5 sales scripts, the full rep handbook, 50+ cold-outreach templates, a contractor agreement and a CRM CSV.",
    bestFor: "Small business owners, freelancers, consultants ready to add AI tools without paying agency prices.",
    sizing: "42 files in a ZIP, markdown and PDF",
  },
  {
    href: "/shop/cold-email-pack",
    title: "Cold Email Mastery Pack",
    price: "$29",
    tagline: "100 cold email templates",
    blurb: "Templates for 10 industries, 80 subject lines, 30 reply-handling scripts, an AI scoring rubric, 4 email sequences and a list-building playbook.",
    bestFor: "Reps, freelancers and founders sending cold email to local businesses.",
    sizing: "200+ files and templates in 6 folders",
  },
];

export default function ShopPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">Shop</div>
          <h1>
            Self-serve kits from <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Purcell Ventures</em>
          </h1>
          <p className="deck">
            We use each product on this page internally at Purcell Ventures. You can edit the files and keep them after you buy. Stripe emails the download after checkout, and a 30-day refund covers every product.
          </p>
        </header>

        {/* Bundle CTA */}
        <div style={{ marginBottom: "48px", padding: "28px 32px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px dashed var(--color-warm-accent)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px" }}>
            Bundle deal: save $18
          </div>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", margin: "0 0 8px", fontWeight: 700 }}>
            Get all three kits for <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$39</em>
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
            The Starter Kit ($19), Cold Email Mastery Pack ($29) and Subject Line Library ($9) cost <strong>$57 separately</strong>. Buy all three for <strong style={{ color: "var(--color-warm-accent)" }}>$39</strong>.
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
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", color: "var(--color-warm-accent)", fontWeight: 700, letterSpacing: "0.05em" }}>See what&apos;s inside</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why */}
        <section style={{ marginBottom: "48px", padding: "28px 32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
            Why we sell our internal templates as $9 to $29 kits
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: "0 0 12px" }}>
            We price the kits at $9 to $29 so small teams can try them before they hire us to set them up.
          </p>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0 }}>
            If you want us to build and maintain a custom version, contact us. If you don&apos;t, the kit keeps working on its own.
          </p>
        </section>

        {/* Want more */}
        <div style={{ textAlign: "center", padding: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>
            Custom versions
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 20px", lineHeight: 1.6, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            We build, deploy, and maintain custom AI tools and sales systems for businesses. Digital subscriptions start at $99/mo.
          </p>
          <Link href="/digital" className="pv-btn-primary" style={{ marginRight: "12px" }}>See Digital Services</Link>
          <Link href="/how-we-work" className="pv-btn-ghost" style={{ background: "transparent" }}>How we work</Link>
        </div>

      </main>
    </div>
  );
}
