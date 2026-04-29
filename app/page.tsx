"use client";
import Link from "next/link";
import { PanopticonMark } from "@/app/components/PanopticonMark";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Purcell Ventures do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC is a Georgia-based multi-division company. We offer digital services for small businesses (websites, AI tools, CRM, booking from $75/mo), hands-on AI consulting and team training, custom software development (apps, platforms, AI integrations), and owner-operated field services (gutter cleaning, pressure washing, lawn care) in Metro Atlanta under the Purcell Works brand.",
      },
    },
    {
      "@type": "Question",
      "name": "Who founded Purcell Ventures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC was founded by Elijah Purcell, an entrepreneur and AI consultant based in Acworth, Georgia.",
      },
    },
    {
      "@type": "Question",
      "name": "Where is Purcell Ventures based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC is based in Acworth, Georgia. Digital services and AI consulting are available nationwide. Field services (Purcell Works) serve Metro Atlanta: Kennesaw, Marietta, Acworth, Canton, and Woodstock.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I contact Purcell Ventures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact Elijah Purcell directly at elijah@purcell-ventures.com or by phone at (770) 280-5319.",
      },
    },
  ],
};

const DIVISIONS = [
  {
    slug: "digital",
    label: "Digital Services",
    tagline: "Your full digital operation: website, AI tools, booking, and marketing. Built and managed for you. Starting at $75/mo.",
    status: "live" as const,
    href: "/digital",
  },
  {
    slug: "consulting",
    label: "AI Consulting",
    tagline: "I come to your business and walk your team through the AI tools that will actually change how they work. Hands-on. Same-day results.",
    status: "live" as const,
    href: "/consulting",
  },
  {
    slug: "software",
    label: "Custom Software",
    tagline: "Apps, platforms, and automation tools scoped and built around your exact problem — from idea to launch.",
    status: "live" as const,
    href: "/software",
  },
  {
    slug: "realestate",
    label: "Real Estate",
    tagline: "Wholesale real estate — finding off-market deals for investors.",
    status: "coming" as const,
    href: null,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", display: "flex", flexDirection: "column" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* Nav */}
      <nav style={{
        padding: "0 24px", height: "60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em" }}>
          Purcell <span style={{ color: "var(--color-warm-accent)" }}>Ventures</span>
        </span>
        <a href="mailto:elijah@purcell-ventures.com" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}
          className="hidden sm:block">
          elijah@purcell-ventures.com
        </a>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center w-full mx-auto px-6 py-12 sm:px-8 sm:py-20"
        style={{ maxWidth: "960px" }}>

        {/* Logo Mark */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
          <PanopticonMark size={140} color="var(--color-warm-accent)" bg="#0c0a08" cfg={{
            cellStyle: "outlined",
            pvSize: 70, pvClearR: 58,
            ringStart: 70, ringEnd: 116,
            numRings: 7,
            ringFadeToCenter: true,
          }} />
        </div>

        {/* Eyebrow */}
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Purcell Ventures LLC
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(40px, 8vw, 96px)", fontWeight: 700,
          lineHeight: 1.02, letterSpacing: "-0.02em",
          color: "var(--color-warm-text)", marginBottom: "24px",
        }}>
          Built to last.<br />
          <span style={{ color: "var(--color-warm-accent)" }}>Built to grow.</span>
        </h1>

        <p className="text-base sm:text-lg" style={{ color: "var(--color-warm-text-muted)", maxWidth: "480px", lineHeight: 1.75, marginBottom: "48px" }}>
          Purcell Ventures is a multi-division company founded by Elijah Purcell.
          We build software, serve local communities, and invest in real estate.
        </p>

        {/* Divisions */}
        <div className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: "1px", background: "var(--color-warm-border)" }}>
          {DIVISIONS.map((div) => (
            <div key={div.slug}
              style={{
                background: "var(--color-warm-bg)",
                padding: "28px 24px",
                position: "relative",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (div.status === "live") e.currentTarget.style.background = "var(--color-warm-card)";
              }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-warm-bg)"; }}
            >
              {/* Status badge */}
              <div style={{ marginBottom: "16px" }}>
                {div.status === "live" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-warm-accent)", display: "inline-block" }} />
                    Live
                  </span>
                ) : (
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-warm-text-light)" }}>
                    Coming Soon
                  </span>
                )}
              </div>

              <h2 style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: "22px", fontWeight: 600, marginBottom: "10px",
                color: div.status === "live" ? "var(--color-warm-text)" : "var(--color-warm-text-muted)",
              }}>
                {div.label}
              </h2>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "24px" }}>
                {div.tagline}
              </p>

              {div.status === "live" && div.href ? (
                <a href={div.href} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 600, color: "var(--color-warm-accent)",
                  textDecoration: "none",
                }}>
                  View Services <span style={{ fontSize: "16px" }}>→</span>
                </a>
              ) : (
                <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>In development</span>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Courses */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "48px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>
              Courses
            </p>
            <Link href="/courses" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.1 }}>
            Learn from someone who just did it.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
          {[
            {
              href: "/courses/college-apps",
              title: "The College Application Playbook",
              desc: "34 acceptances. $505,000+ in scholarships. The exact process — school list, essays, financial aid, and negotiation.",
              price: "$297",
            },
            {
              href: "/courses/business-launch",
              title: "The Business Launch Playbook",
              desc: "From idea to LLC to first dollar. 7 modules, 26 lessons, and a full resource pack of templates and tools.",
              price: "$397",
            },
            {
              href: "/courses/ai-automation",
              title: "Zero to Automated",
              desc: "Email bots, YouTube pipelines, lead scrapers, personal AI assistants. 8 modules, 25 lessons, 7 real code templates.",
              price: "$397",
            },
          ].map(c => (
            <Link key={c.href} href={c.href} style={{ textDecoration: "none", display: "block", background: "var(--color-warm-bg)", padding: "28px 24px", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--color-warm-card)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--color-warm-bg)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-warm-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Available Now</span>
              </div>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px", lineHeight: 1.2 }}>{c.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{c.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 800, color: "var(--color-warm-text)", letterSpacing: "-0.02em" }}>{c.price}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-warm-accent)", letterSpacing: "0.06em" }}>View Course →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>
          © {new Date().getFullYear()} Purcell Ventures LLC · Acworth, Georgia
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/about" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>About</a>
          <a href="/resume" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>Resume</a>
          <a href="mailto:elijah@purcell-ventures.com" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
