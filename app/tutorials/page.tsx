import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Tutorials: Purcell Ventures",
  description: "Short how-to guides for each Purcell Ventures AI tool, with example output. No login required.",
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
    title: "How to generate an FAQ page with the AI FAQ Builder",
    blurb: "Walkthrough of the AI FAQ Builder tool. Includes example output for a salon, a plumbing company, and a dental practice.",
    toolLink: "/digital/tools/faq-builder",
    readTime: "3 min read",
  },
  {
    slug: "ai-content-generator",
    category: "AI",
    title: "How to edit AI blog drafts",
    blurb: "How to use the AI Content Generator to get usable first drafts. Three rules for editing AI drafts.",
    toolLink: "/digital/tools/ai-content-generator",
    readTime: "5 min read",
  },
  {
    slug: "ai-cold-email-audit",
    category: "AI",
    title: "How to audit your cold email before sending",
    blurb: "Paste your draft into the AI Cold Email Audit tool. It returns a 0 to 100 score, the top 3 improvements and a rewritten version.",
    toolLink: "/digital/tools/cold-email-audit",
    readTime: "4 min read",
  },
  {
    slug: "ai-brand-kit-builder",
    category: "AI",
    title: "How to build a brand kit with the Brand Kit Builder",
    blurb: "How to use the Brand Kit Builder to get a color palette, typography pairs and logo concepts for a new business.",
    toolLink: "/digital/tools/brand-kit-builder",
    readTime: "5 min read",
  },
  {
    slug: "ai-customer-persona",
    category: "AI",
    title: "How to build a customer persona with the Customer Persona Builder",
    blurb: "How to use the Customer Persona Builder to write a persona document for your sales and marketing team.",
    toolLink: "/digital/tools/customer-persona-builder",
    readTime: "4 min read",
  },
  {
    slug: "ai-pricing-audit",
    category: "Sales",
    title: "How to audit your pricing page with the Pricing Audit tool",
    blurb: "Paste your URL and the tool reviews your pricing structure, social proof and calls to action. Includes common findings and how to fix them.",
    toolLink: "/digital/tools/pricing-page-audit",
    readTime: "3 min read",
  },
  {
    slug: "ai-objection-handler",
    category: "Sales",
    title: "Three response options for handling sales objections",
    blurb: "Paste an objection to get 3 response strategies: agree and pivot, ask a clarifying question, or push back directly.",
    toolLink: "/rep-portal",
    readTime: "4 min read",
  },
  {
    slug: "ai-pitch-coach",
    category: "Sales",
    title: "How to critique your own sales pitch",
    blurb: "Paste your pitch script. The tool returns feedback on 8 dimensions, a rewrite and 3 alternative angles.",
    toolLink: "/rep-portal",
    readTime: "5 min read",
  },
  {
    slug: "ai-call-recap",
    category: "Sales",
    title: "Turning 90 seconds of notes into a structured call recap",
    blurb: "Paste your post-call notes. The tool sorts them into outcome, key points, what they committed to, what we committed to, next action and a tone read.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "ai-email-polish",
    category: "Sales",
    title: "Polishing an email draft in 30 seconds",
    blurb: "Paste a rough email. The tool returns an edited version, alternative subject lines and notes on what changed and why.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "operations-loyalty",
    category: "Operations",
    title: "How to set up a simple customer loyalty system",
    blurb: "How to use the loyalty tool to track punch cards and repeat customers. No barcode scanner needed.",
    toolLink: "/digital/loyalty",
    readTime: "4 min read",
  },
  {
    slug: "operations-estimating",
    category: "Operations",
    title: "How to create line-item estimates with tax and terms",
    blurb: "Build line-item estimates with tax, exclusions and terms, and print them as a PDF.",
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
          <div className="pv-mono-label">How-to guides</div>
          <h1>
            Tutorials <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>and walkthroughs.</em>
          </h1>
          <p className="deck">
            Short how-to guides for our tools. Each one covers setup, the steps, an example output and common variations. No login required to read.
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
                      Open tool
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: "48px", padding: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 600 }}>
            We can do the work <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>for you.</em>
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 20px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            These tutorials cover our free customer tools. For AI workflows we set up and run for you, see the Digital Services tiers.
          </p>
          <Link href="/digital" className="pv-btn-primary" style={{ marginRight: "8px" }}>See Digital Services</Link>
          <Link href="/shop" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", fontSize: "14px" }}>Browse shop</Link>
        </div>

      </main>
    </div>
  );
}
