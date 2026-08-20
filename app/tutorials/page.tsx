import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Tutorials: Purcell Ventures",
  description: "Short how-to guides for each AI tool. Step-by-step. Real examples. SEO-friendly. No login required.",
};

interface Tutorial {
  slug: string;
  category: "AI" | "Sales" | "Operations";
  title: string;
  blurb: string;
  toolLink: string;
  readTime: string;
}

const TUTORIALS: Tutorial[] = [
  {
    slug: "ai-faq-builder",
    category: "AI",
    title: "How to generate FAQ pages with AI in 60 seconds",
    blurb: "Walkthrough of the AI FAQ Builder tool. Includes example output for a salon, a plumbing company, and a dental practice.",
    toolLink: "/digital/tools/faq-builder",
    readTime: "3 min read",
  },
  {
    slug: "ai-content-generator",
    category: "AI",
    title: "Writing blog posts that aren't AI slop",
    blurb: "How to use the AI Content Generator to get usable first drafts. Three rules for editing AI output so it doesn't read like AI.",
    toolLink: "/digital/tools/ai-content-generator",
    readTime: "5 min read",
  },
  {
    slug: "ai-cold-email-audit",
    category: "AI",
    title: "How to audit your cold email before sending",
    blurb: "Paste your draft into the AI Cold Email Audit tool. Get a 0-100 score + top 3 improvements + a rewritten version. Use it for every send.",
    toolLink: "/digital/tools/cold-email-audit",
    readTime: "4 min read",
  },
  {
    slug: "ai-brand-kit-builder",
    category: "AI",
    title: "Generate a complete brand kit in 5 minutes",
    blurb: "From color palette to typography pairs to logo concepts. How to use the Brand Kit Builder tool for a new business identity.",
    toolLink: "/digital/tools/brand-kit-builder",
    readTime: "5 min read",
  },
  {
    slug: "ai-customer-persona",
    category: "AI",
    title: "Build a customer persona that actually drives decisions",
    blurb: "How to use the Customer Persona Builder to get a persona document your sales + marketing team will actually reference.",
    toolLink: "/digital/tools/customer-persona-builder",
    readTime: "4 min read",
  },
  {
    slug: "ai-pricing-audit",
    category: "Sales",
    title: "Audit your pricing page in 30 seconds",
    blurb: "Paste your URL. AI reviews pricing structure, social proof, CTA hierarchy. Common findings + how to fix.",
    toolLink: "/digital/tools/pricing-page-audit",
    readTime: "3 min read",
  },
  {
    slug: "ai-objection-handler",
    category: "Sales",
    title: "Handle objections like a senior closer",
    blurb: "Paste any objection. Get 3 response strategies (agree-and-pivot, clarifying-question, direct-pushback). Pick one + use it.",
    toolLink: "/rep-portal",
    readTime: "4 min read",
  },
  {
    slug: "ai-pitch-coach",
    category: "Sales",
    title: "Critique your own sales pitch",
    blurb: "Paste your pitch script. AI returns 8 dimensions of feedback + a rewritten version + 3 alternative angles. Practice tool.",
    toolLink: "/rep-portal",
    readTime: "5 min read",
  },
  {
    slug: "ai-call-recap",
    category: "Sales",
    title: "Turn 90 seconds of notes into a structured call recap",
    blurb: "Dump your post-call notes. AI structures into outcome, key points, what-they-committed, what-we-committed, next action, vibe read.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "ai-email-polish",
    category: "Sales",
    title: "Polish an email draft in 30 seconds",
    blurb: "Paste a rough email. AI returns a sharper version + alternative subject lines + notes on what changed and why.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "operations-loyalty",
    category: "Operations",
    title: "Set up a simple customer loyalty system",
    blurb: "How to use the loyalty tool to track punch cards / repeat customers. No barcode scanner needed.",
    toolLink: "/digital/loyalty",
    readTime: "4 min read",
  },
  {
    slug: "operations-estimating",
    category: "Operations",
    title: "Generate professional estimates in under 5 minutes",
    blurb: "Build line-item estimates with tax, exclusions, terms. Print-ready PDF output. Replace 30-minute Word doc creation.",
    toolLink: "/digital/estimating",
    readTime: "5 min read",
  },
];

export default function TutorialsPage() {
  const byCategory = TUTORIALS.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {} as Record<string, Tutorial[]>);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "920px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">How-to guides · 5-min reads</div>
          <h1>
            Tutorials <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>and walkthroughs.</em>
          </h1>
          <p className="deck">
            Short, specific how-to guides for our tools. Each tutorial: setup → step-by-step → real example output → common variations. No login required to read.
          </p>
        </header>

        {Object.entries(byCategory).map(([category, items]) => (
          <section key={category} style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-accent)", marginBottom: "20px", fontWeight: 600 }}>
              {category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {items.map((t) => (
                <Link key={t.slug} href={t.toolLink} style={{ textDecoration: "none" }}>
                  <article className="pv-card" style={{ padding: "24px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
                    <span className="b3"></span><span className="b4"></span>
                    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, marginBottom: "8px" }}>
                      {t.readTime}
                    </div>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", color: "var(--color-warm-text)", margin: "0 0 10px", fontWeight: 600, lineHeight: 1.3 }}>
                      {t.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: 0, flex: 1 }}>
                      {t.blurb}
                    </p>
                    <div style={{ marginTop: "16px", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>
                      Open tool →
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: "48px", padding: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 600 }}>
            Want done-for-you, not <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>do-it-yourself?</em>
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 20px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            These tutorials cover our free customer tools. For managed AI workflows that run without your daily attention, see Digital Services tiers.
          </p>
          <Link href="/digital" className="pv-btn-primary" style={{ marginRight: "8px" }}>See Digital Services →</Link>
          <Link href="/shop" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", fontSize: "14px" }}>Browse shop</Link>
        </div>

      </main>
    </div>
  );
}
