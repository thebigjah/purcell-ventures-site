"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────
// FAQ schema (unchanged — important for SEO)
// ──────────────────────────────────────────────────────────────
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Purcell Ventures do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC is a Georgia-based multi-division company. We build custom websites and provide ongoing maintenance partnership (Sites division), offer tier-gated digital add-ons like AI chatbots and booking systems (Digital Add-Ons division), do hands-on AI consulting and team training, and build custom software (apps, platforms, AI integrations). Field services (gutter cleaning, pressure washing, lawn care) are run separately under our Mantle Field Services brand.",
      },
    },
    {
      "@type": "Question",
      "name": "Who founded Purcell Ventures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC was founded by Elijah Purcell in April 2025. He is a psychology and data science student at the University of Alabama Honors College and lives in Tuscaloosa, Alabama. The company is registered in Georgia.",
      },
    },
    {
      "@type": "Question",
      "name": "Where is Purcell Ventures based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purcell Ventures LLC is based in Acworth, Georgia. Digital services and AI consulting are available nationwide. Field services run under our separate Mantle Field Services brand, serving Metro Atlanta: Kennesaw, Marietta, Acworth, Canton, and Woodstock.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I contact Purcell Ventures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact Elijah Purcell directly at elijah@purcell-ventures.com or by phone at (205) 462-7839.",
      },
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Divisions (preserved from prior homepage + specs added)
// ──────────────────────────────────────────────────────────────
type Division = {
  slug: string;
  roman: string;
  label: string;
  tagline: string;
  status: "live" | "coming";
  href: string | null;
  span: "span-7" | "span-5" | "span-6";
  specs: { label: string; value: string; muted?: boolean }[];
};

const DIVISIONS: Division[] = [
  {
    slug: "sites",
    roman: "I.",
    label: "Sites",
    tagline:
      "Custom websites and ongoing partnership for local businesses. Three build tiers, three maintenance tiers, scoped on a discovery call.",
    status: "live",
    href: "/sites",
    span: "span-7",
    specs: [
      { label: "Status",      value: "Accepting" },
      { label: "Tiers",       value: "Starter · Pro · Custom" },
      { label: "Maintenance", value: "Three levels",   muted: true },
      { label: "Pricing",     value: "Discovery call", muted: true },
    ],
  },
  {
    slug: "digital",
    roman: "II.",
    label: "Digital Add-Ons",
    tagline:
      "A catalog of add-ons that layer onto your site. AI chatbots, booking, review automation, content generation, and more. Tier-gated by your maintenance level.",
    status: "live",
    href: "/digital",
    span: "span-5",
    specs: [
      { label: "Status",   value: "Accepting" },
      { label: "Catalog",  value: "22 add-ons" },
      { label: "Pricing",  value: "Discovery call", muted: true },
      { label: "Reach",    value: "Nationwide",     muted: true },
    ],
  },
  {
    slug: "consulting",
    roman: "III.",
    label: "AI Consulting",
    tagline:
      "I come to your business and walk your team through the AI tools that will actually change how they work. Hands-on. Same-day results.",
    status: "live",
    href: "/consulting",
    span: "span-6",
    specs: [
      { label: "Status",   value: "Accepting" },
      { label: "From",     value: "$125 / person" },
      { label: "Format",   value: "On-site / Virtual", muted: true },
      { label: "Minimum",  value: "2 hr",              muted: true },
    ],
  },
  {
    slug: "software",
    roman: "IV.",
    label: "Custom Software",
    tagline:
      "Apps, platforms, and automation tools scoped and built around your exact problem — from idea to launch.",
    status: "live",
    href: "/software",
    span: "span-6",
    specs: [
      { label: "Status",    value: "Accepting" },
      { label: "Pricing",   value: "Discovery call" },
      { label: "Portfolio", value: "12 shipped",        muted: true },
      { label: "Scope",     value: "Web / Mobile / AI", muted: true },
    ],
  },
  {
    slug: "steady",
    roman: "V.",
    label: "Steady — Personal IT",
    tagline:
      "Personal tech help for individuals + households. For when you're the family tech person and need to hand the job off. AI coaching, phone setup, smart home, medication reminders.",
    status: "live",
    href: "/steady",
    span: "span-6",
    specs: [
      { label: "Status",    value: "Accepting" },
      { label: "From",      value: "$79 / mo" },
      { label: "One-off",   value: "$99 / session", muted: true },
      { label: "Reach",     value: "Atlanta + remote", muted: true },
    ],
  },
  {
    slug: "realestate",
    roman: "VI.",
    label: "Real Estate",
    tagline:
      "Wholesale real estate — finding off-market deals for investors. Sister channel, opens 2026.",
    status: "coming",
    href: null,
    span: "span-6",
    specs: [
      { label: "Status",   value: "Pending",     muted: true },
      { label: "Opens",    value: "2026" },
      { label: "Model",    value: "Wholesale",   muted: true },
      { label: "Focus",    value: "Off-market",  muted: true },
    ],
  },
];

// ──────────────────────────────────────────────────────────────
// Courses (kept from prior homepage)
// ──────────────────────────────────────────────────────────────
const COURSES = [
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
];

// ──────────────────────────────────────────────────────────────
// Phi Array generator — phyllotaxis (golden angle 137.508°)
// ──────────────────────────────────────────────────────────────
function generatePhiDots(cx = 600, cy = 800, n = 380, spread = 26): string {
  const golden = Math.PI * (3 - Math.sqrt(5));
  let s = "";
  for (let i = 0; i < n; i++) {
    const r = spread * Math.sqrt(i);
    const t = i * golden;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    const dot = 1.4 + (i / n) * 0.6;
    const op = 0.12 + 0.7 * (1 - i / n);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${dot.toFixed(2)}" opacity="${op.toFixed(2)}"/>`;
  }
  return s;
}

export default function Home() {
  const phiRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (phiRef.current) {
      phiRef.current.innerHTML = generatePhiDots();
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", position: "relative", overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* Page-local styles for the things that need media queries / mask-image / hover */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pv-phi-field {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 50% 60% at 50% 50%, transparent 0%, transparent 35%, black 90%);
          -webkit-mask-image: radial-gradient(ellipse 50% 60% at 50% 50%, transparent 0%, transparent 35%, black 90%);
        }
        .pv-phi-field svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.35; }

        .pv-wordmark .purcell {
          font-family: 'Cinzel', Georgia, serif;
          font-weight: 700;
          font-size: clamp(40px, 7vw, 88px);
          color: var(--color-warm-text);
          letter-spacing: 0.42em;
          line-height: 1;
          padding-left: 0.42em;
        }
        .pv-wordmark .rule {
          height: 1px; background: var(--color-warm-accent);
          margin: 18px auto; max-width: 60%;
          position: relative;
        }
        .pv-wordmark .rule::before, .pv-wordmark .rule::after {
          content: ""; position: absolute; top: -3px;
          width: 7px; height: 7px;
          border: 1px solid var(--color-warm-accent);
          transform: rotate(45deg);
        }
        .pv-wordmark .rule::before { left: -4px; }
        .pv-wordmark .rule::after { right: -4px; }
        .pv-wordmark .ventures {
          font-family: 'Cinzel', Georgia, serif;
          font-weight: 400;
          font-size: clamp(18px, 3vw, 38px);
          color: var(--color-warm-accent);
          letter-spacing: 0.58em;
          line-height: 1;
          padding-left: 0.58em;
        }

        .pv-report {
          background: var(--color-warm-bg-alt);
          border: 1px solid var(--color-warm-border);
          padding: 36px 32px 28px;
          position: relative;
          display: flex; flex-direction: column;
          text-decoration: none; color: inherit;
          transition: border-color 0.2s, transform 0.2s;
        }
        .pv-report:hover { border-color: var(--color-warm-accent); transform: translateY(-2px); }
        .pv-report::before, .pv-report::after,
        .pv-report .b3, .pv-report .b4 {
          content: ""; position: absolute; width: 14px; height: 14px;
          border: 1.5px solid var(--color-warm-accent);
        }
        .pv-report::before { top: 6px; left: 6px; border-right: none; border-bottom: none; }
        .pv-report::after  { top: 6px; right: 6px; border-left: none; border-bottom: none; }
        .pv-report .b3 { bottom: 6px; left: 6px; border-right: none; border-top: none; display: block; }
        .pv-report .b4 { bottom: 6px; right: 6px; border-left: none; border-top: none; display: block; }

        .pv-italic { font-family: Georgia, 'Times New Roman', serif; font-style: italic; }

        @media (max-width: 900px) {
          .pv-phi-field {
            mask-image: radial-gradient(ellipse 90% 60% at 50% 50%, transparent 0%, transparent 35%, black 100%);
            -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 50%, transparent 0%, transparent 35%, black 100%);
          }
          .pv-phi-field svg { opacity: 0.30; }

          /* Wordmark scales up on mobile, doesn't collapse */
          .pv-wordmark .purcell { font-size: 48px !important; letter-spacing: 0.32em !important; padding-left: 0.32em !important; }
          .pv-wordmark .ventures { font-size: 20px !important; letter-spacing: 0.42em !important; padding-left: 0.42em !important; }

          /* Meta strip: 2x2 with internal rules preserved */
          .pv-meta-strip { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
          .pv-meta-strip > div { padding: 12px 16px !important; border-right: 1px solid var(--color-warm-border) !important; }
          .pv-meta-strip > div:nth-child(2n) { border-right: none !important; }
          .pv-meta-strip > div:nth-child(1), .pv-meta-strip > div:nth-child(2) {
            border-bottom: 1px solid var(--color-warm-border) !important;
          }

          /* Hero: stack vertically but italic stays oversized */
          .pv-hero { grid-template-columns: 1fr !important; gap: 24px !important; padding: 56px 24px 48px !important; }
          .pv-hero-statement { max-width: none !important; font-size: 44px !important; line-height: 1.08 !important; }

          /* Section head: bigger Roman + ornamental divider above */
          .pv-section-head { grid-template-columns: auto 1fr !important; gap: 16px !important; padding: 56px 24px 20px !important; align-items: center !important; }
          .pv-section-head .roman-mobile-big { font-size: 64px !important; }
          .pv-section-head > span:last-child { display: none !important; }

          .pv-section-divider {
            display: block !important;
            text-align: center;
            padding: 28px 24px 0;
            font-family: 'Cinzel', Georgia, serif;
            color: var(--color-warm-accent);
            font-size: 16px;
            letter-spacing: 0.6em;
            opacity: 0.7;
          }

          /* Reports stack with stronger card identity */
          .pv-reports { grid-template-columns: 1fr !important; padding: 20px 24px 64px !important; gap: 20px !important; }
          .pv-report-span-7, .pv-report-span-5, .pv-report-span-6 { grid-column: span 1 !important; }
          .pv-report {
            padding: 44px 28px 28px !important;
            border-top: 3px solid var(--color-warm-accent) !important;
          }
          .pv-report-roman {
            font-size: 36px !important;
            margin: 0 0 12px !important;
          }

          /* Founder: vertical stack but verse gets a pulled-out band */
          .pv-founder { grid-template-columns: 1fr !important; gap: 28px !important; padding: 64px 24px !important; }
          .pv-founder-verse {
            text-align: center !important;
            padding: 24px 20px !important;
            border-top: 1px solid var(--color-warm-border) !important;
            border-bottom: 1px solid var(--color-warm-border) !important;
            margin: 0 -4px !important;
          }

          /* Contact: 2 columns, cleaner */
          .pv-contact { grid-template-columns: 1fr 1fr !important; gap: 28px !important; padding: 48px 24px 24px !important; }
        }

        @media (max-width: 480px) {
          .pv-meta-strip { grid-template-columns: 1fr !important; }
          .pv-meta-strip > div {
            border-right: none !important;
            border-bottom: 1px solid var(--color-warm-border) !important;
            padding: 10px 16px !important;
          }
          .pv-meta-strip > div:last-child { border-bottom: none !important; }
          .pv-hero-statement { font-size: 36px !important; }
          .pv-contact { grid-template-columns: 1fr !important; }
        }

        /* Hide the desktop ornamental divider, show on mobile */
        .pv-section-divider { display: none; }
        .pv-mono-link, .pv-mono-link-text {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 12px; letter-spacing: 0.04em;
          color: var(--color-warm-text); text-decoration: none; display: block;
          margin-bottom: 4px;
        }
        .pv-mono-link:hover { color: var(--color-warm-accent); }
      ` }} />

      {/* Phi vignette background — fixed, masked, parallax-style */}
      <div className="pv-phi-field" aria-hidden="true">
        <svg viewBox="0 0 1200 1600" preserveAspectRatio="xMidYMid slice">
          <g ref={phiRef} fill="#d4af37"></g>
        </svg>
      </div>

      {/* Visually-hidden H1 for SEO + accessibility */}
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        Purcell Ventures: sites, digital add-ons, AI consulting and custom software, founded by Elijah Purcell
      </h1>

      {/* Wordmark masthead */}
      <section style={{
        position: "relative", zIndex: 5,
        padding: "80px 36px 56px", textAlign: "center",
        borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <div className="pv-wordmark" style={{ display: "inline-block" }}>
          <div className="purcell">PURCELL</div>
          <div className="rule"></div>
          <div className="ventures">VENTURES</div>
        </div>
      </section>

      {/* Meta strip */}
      <div
        className="pv-meta-strip"
        style={{
          position: "relative", zIndex: 5,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          padding: "18px 36px",
          borderBottom: "1px solid var(--color-warm-border)",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}
      >
        <MetaCell label="Founded" value="April · MMXXV" />
        <MetaCell label="Divisions" value="05 active · 01 pending" gold />
        <MetaCell label="Charter" value="Domestic LLC · Georgia" />
        <MetaCell label="Principal" value="Elijah Brent Purcell" last />
      </div>

      {/* Hero italic statement */}
      <section
        className="pv-hero"
        style={{
          position: "relative", zIndex: 5,
          padding: "96px 36px 64px",
          display: "grid", gridTemplateColumns: "1fr 9fr 2fr",
          alignItems: "start", gap: "36px",
        }}
      >
        <div /> {/* spacer */}
        <p
          className="pv-italic pv-hero-statement"
          style={{
            fontSize: "clamp(36px, 6vw, 84px)",
            lineHeight: 1.05, letterSpacing: "-0.005em",
            color: "var(--color-warm-text)",
            maxWidth: "22ch",
            margin: 0,
          }}
        >
          Built by{" "}
          <span style={{ fontStyle: "normal", fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, letterSpacing: 0 }}>
            one
          </span>{" "}
          operator for the{" "}
          <em style={{ color: "var(--color-warm-accent)" }}>small businesses</em>{" "}
          who move first.
        </p>
        <div
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--color-warm-text-light)",
            textAlign: "right",
            borderTop: "1px solid var(--color-warm-border)",
            paddingTop: "12px",
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "var(--color-warm-text)", display: "block", fontWeight: 500 }}>04.08.2025</strong>
          Filed Georgia SOS
          <strong style={{ color: "var(--color-warm-text)", display: "block", fontWeight: 500, marginTop: "6px" }}>Est. 2025</strong>
          Acworth · Cobb Co.
        </div>
      </section>

      {/* Mobile-only ornamental divider above the Divisions section */}
      <div className="pv-section-divider" aria-hidden="true">✦ &nbsp; I &nbsp; ✦</div>

      {/* Divisions section head */}
      <header
        className="pv-section-head"
        style={{
          position: "relative", zIndex: 5,
          padding: "64px 36px 28px",
          display: "grid", gridTemplateColumns: "1fr 8fr 3fr",
          gap: "36px", alignItems: "baseline",
          borderBottom: "1px solid var(--color-warm-border)",
        }}
      >
        <span className="roman-mobile-big" style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 400, fontSize: "48px", lineHeight: 1, color: "var(--color-warm-accent)" }}>
          I.
        </span>
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
          fontSize: "28px", letterSpacing: "0.04em",
          color: "var(--color-warm-text)", textTransform: "uppercase",
          margin: 0,
        }}>
          The Divisions{" "}
          <em className="pv-italic" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--color-warm-accent)", marginLeft: "10px" }}>
            at present
          </em>
        </h2>
        <span style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)",
          textAlign: "right",
        }}>
          05 active · 01 pending
        </span>
      </header>

      {/* Report cards — asymmetric 12-col */}
      <section
        className="pv-reports"
        style={{
          position: "relative", zIndex: 5,
          padding: "32px 36px 32px",
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
        }}
      >
        {DIVISIONS.map((d) => (
          <ReportCard key={d.slug} division={d} />
        ))}
      </section>

      {/* Founder block — softened from preview, no "FILED BY" framing */}
      <section
        className="pv-founder"
        style={{
          position: "relative", zIndex: 5,
          padding: "80px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          display: "grid", gridTemplateColumns: "2fr 4fr 2fr",
          gap: "56px", alignItems: "start",
        }}
      >
        <div>
          <div style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-warm-accent)",
            borderTop: "2px solid var(--color-warm-accent)",
            paddingTop: "12px", marginBottom: "24px",
          }}>
            About
          </div>
          <h4 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "32px", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            lineHeight: 1.05, margin: 0,
          }}>
            Elijah Brent{" "}
            <em className="pv-italic" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--color-warm-accent)" }}>
              Purcell
            </em>
          </h4>
        </div>
        <div>
          <p className="pv-italic" style={{
            fontSize: "19px", lineHeight: 1.55,
            color: "var(--color-warm-text)", opacity: 0.92,
            marginBottom: "18px", marginTop: 0,
          }}>
            Nineteen years old. Founded Purcell Ventures LLC in April 2025, in Acworth,
            Georgia, at seventeen. Now a psychology and data science student at the
            University of Alabama Honors College in Tuscaloosa, on a pre-med track toward
            psychiatry. <a href="/who" style={{ color: "var(--color-warm-accent)" }}>More
            about Elijah Purcell</a>.
          </p>
          <p className="pv-italic" style={{
            fontSize: "19px", lineHeight: 1.55,
            color: "var(--color-warm-text)", opacity: 0.92,
            marginBottom: "18px",
          }}>
            I built Purcell Ventures because the small businesses I knew were being sold the same{" "}
            <em style={{ color: "var(--color-warm-accent)" }}>generic AI solutions</em>{" "}
            by firms that did not understand them.
          </p>
          <p className="pv-italic" style={{
            fontSize: "19px", lineHeight: 1.55,
            color: "var(--color-warm-text)", opacity: 0.92,
            margin: 0,
          }}>
            One operator. Four divisions. Same person who answers the phone, builds the software, and walks into your storefront.
          </p>
        </div>
        <div
          className="pv-founder-verse"
          style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 400,
            fontSize: "13px", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-warm-accent)",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-warm-border)",
            textAlign: "right", lineHeight: 1.8,
          }}
        >
          Trust in the Lord with all your heart<br />
          and lean not on your own understanding.
          <em className="pv-italic" style={{
            fontWeight: 400, textTransform: "none", letterSpacing: 0,
            color: "var(--color-warm-text)", opacity: 0.7,
            fontSize: "15px", display: "block", marginTop: "6px",
          }}>
            — Proverbs 3:5
          </em>
        </div>
      </section>

      {/* Mobile-only ornamental divider above the Courses section */}
      <div className="pv-section-divider" aria-hidden="true">✦ &nbsp; II &nbsp; ✦</div>

      {/* Courses — kept from prior homepage, styling consistent */}
      <section className="pv-section-head" style={{
        position: "relative", zIndex: 5,
        maxWidth: "1080px", margin: "0 auto", padding: "80px 36px 48px",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 8fr 3fr", gap: "36px", alignItems: "baseline",
          paddingBottom: "20px", borderBottom: "1px solid var(--color-warm-border)",
          marginBottom: "32px",
        }}>
          <span className="roman-mobile-big" style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 400, fontSize: "48px", lineHeight: 1, color: "var(--color-warm-accent)" }}>
            II.
          </span>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "28px", letterSpacing: "0.04em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            margin: 0,
          }}>
            Courses{" "}
            <em className="pv-italic" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--color-warm-accent)", marginLeft: "10px" }}>
              available now
            </em>
          </h2>
          <Link href="/courses" style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--color-warm-text-light)", textAlign: "right", textDecoration: "none",
          }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {COURSES.map((c) => (
            <Link key={c.href} href={c.href} className="pv-report" style={{ minHeight: "260px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
                color: "var(--color-warm-accent)", marginBottom: "8px",
              }}>
                Available now
              </div>
              <h3 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "22px", letterSpacing: "0.02em",
                color: "var(--color-warm-text)", textTransform: "uppercase",
                margin: "0 0 14px", lineHeight: 1.15,
              }}>
                {c.title}
              </h3>
              <p className="pv-italic" style={{
                fontSize: "14.5px", lineHeight: 1.55,
                color: "var(--color-warm-text)", opacity: 0.85,
                marginBottom: "24px", flex: 1,
              }}>
                {c.desc}
              </p>
              <div style={{
                marginTop: "auto", paddingTop: "14px",
                borderTop: "1px dashed var(--color-warm-border)",
                display: "flex", alignItems: "baseline", justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 800,
                  fontSize: "22px", letterSpacing: "-0.02em",
                  color: "var(--color-warm-text)",
                }}>
                  {c.price}
                </span>
                <span style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "var(--color-warm-accent)",
                }}>
                  View course →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Personal-depth strip: links to /now /uses /verses /writing /faq */}
      <section style={{
        position: "relative", zIndex: 5,
        padding: "56px 36px 40px",
        borderTop: "1px solid var(--color-warm-border)",
      }}>
        <header className="pv-section-head" style={{ marginBottom: "20px", padding: "0 0 14px" }}>
          <span className="roman">III.</span>
          <h2>Going <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>deeper</em></h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
          {[
            { href: "/now",     label: "/now",     desc: "What I'm focused on right now." },
            { href: "/uses",    label: "/uses",    desc: "My working stack — every tool in production." },
            { href: "/verses",  label: "Verses",   desc: "Five scriptures I come back to." },
            { href: "/writing", label: "Writing",  desc: "Selected original prose." },
            { href: "/faq",     label: "FAQ",      desc: "Common questions, answered." },
          ].map(item => (
            <Link key={item.href} href={item.href} className="pv-card" style={{
              padding: "20px 22px 18px", display: "block",
            }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "16px", letterSpacing: "0.04em",
                color: "var(--color-warm-text)", marginBottom: "6px",
              }}>
                {item.label}
              </div>
              <p className="pv-italic" style={{
                fontSize: "13.5px", color: "var(--color-warm-text)", opacity: 0.82,
                lineHeight: 1.5, margin: 0,
              }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Open Resources — surfacing free + transparent content */}
      <section
        style={{
          position: "relative", zIndex: 5,
          padding: "72px 36px 32px",
          borderTop: "1px solid var(--color-warm-border)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700 }}>Open Resources</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>Free. No email required.</span>
          </div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 12px" }}>
            Use anything <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>now.</em>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 32px", maxWidth: "640px" }}>
            We publish the tools, the math, the process, and the writing. No gated downloads. If we&apos;re right for your business, you&apos;ll know before any conversation.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
            <ResourceCard href="/digital/tools" label="17 free tools" body="AI FAQ Builder, content generator, palette tool, brand kit, logo concepts, review responder, estimate generator, and more — running with our Anthropic key." />
            <ResourceCard href="/ai-readiness" label="AI Readiness Test" body="10 questions. Tier-scored. Concrete next steps for where your business actually is." />
            <ResourceCard href="/ai-cost-calculator" label="Cost Calculator" body="Plug in team size + hourly rate + manual hours. Get a payback projection in 30 seconds." />
            <ResourceCard href="/pricing-comparison" label="Pricing, compared" body="Our prices next to typical agency, freelancer, and DIY tools. No spin." />
            <ResourceCard href="/how-we-work" label="How we work" body="5-stage process. 6 commitments. When we say no. Read this before signing anything." />
            <ResourceCard href="/portfolio" label="Portfolio" body="12 shipped projects. Web apps, mobile apps, AI tools, internal systems." />
            <ResourceCard href="/blog" label="Blog" body="Five workflows you can automate without code. Why most AI tools waste money." />
            <ResourceCard href="/steady" label="Steady — Personal IT" body="Tech support for non-tech-savvy family. Comparison vs alternatives + what a Monthly Care month actually looks like." />
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section
        className="pv-contact"
        style={{
          position: "relative", zIndex: 5,
          padding: "56px 36px 28px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "36px",
          borderTop: "1px solid var(--color-warm-border)",
        }}
      >
        <ContactBlock title="Reach">
          <a className="pv-mono-link" href="mailto:elijah@purcell-ventures.com">elijah@purcell-ventures.com</a>
          <a className="pv-mono-link" href="tel:+12054627839">(770) 280·5319</a>
        </ContactBlock>
        <ContactBlock title="Service Area">
          <p style={{ margin: 0 }}>Metro Atlanta · Cobb County</p>
          <p style={{ margin: 0 }}>Kennesaw · Marietta · Acworth · Canton · Woodstock</p>
          <span style={{ color: "var(--color-warm-text-light)", fontSize: "13px" }}>Remote nationwide</span>
        </ContactBlock>
        <ContactBlock title="Sister">
          <a href="https://mantle-field-site.vercel.app" style={{ color: "var(--color-warm-text)", textDecoration: "none", display: "block", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "15.5px" }}>
            Mantle Field Services
          </a>
          <span style={{ color: "var(--color-warm-text-light)", fontSize: "13px" }}>Metro Atlanta only</span>
        </ContactBlock>
        <ContactBlock title="Filings">
          <p className="pv-mono-link-text">Control № 25075361</p>
          <p className="pv-mono-link-text">Domestic LLC · GA</p>
          <span style={{ color: "var(--color-warm-text-light)", fontSize: "13px" }}>Established April 8, 2025</span>
        </ContactBlock>
      </section>

      {/* Colophon footer */}
      <footer
        style={{
          position: "relative", zIndex: 5,
          padding: "24px 36px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)",
        }}
      >
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <a href="/about" style={footerLink}>About</a>
          <a href="/how-we-work" style={footerLink}>How we work</a>
          <a href="/portfolio" style={footerLink}>Portfolio</a>
          <a href="/blog" style={footerLink}>Blog</a>
          <a href="/digital/tools" style={footerLink}>Tools</a>
          <a href="/pricing-comparison" style={footerLink}>Pricing</a>
          <a href="/resume" style={footerLink}>Resume</a>
          <a href="mailto:elijah@purcell-ventures.com" style={footerLink}>Contact</a>
        </div>
      </footer>

    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Helpers added in the 2026-05-24 workshop expansion
// ──────────────────────────────────────────────────────────────
function ResourceCard({ href, label, body }: { href: string; label: string; body: string }) {
  return (
    <Link href={href} style={{
      display: "block",
      padding: "18px 20px",
      background: "var(--color-warm-bg-alt)",
      border: "1px solid var(--color-warm-border)",
      textDecoration: "none",
      transition: "border-color 0.15s",
      borderRadius: 0,
    }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", color: "var(--color-warm-accent)", marginBottom: "6px", fontWeight: 600 }}>{label} →</div>
      <p style={{ margin: 0, fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.55 }}>{body}</p>
    </Link>
  );
}

const footerLink: React.CSSProperties = { color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" };

// ──────────────────────────────────────────────────────────────
// Small reusable cells
// ──────────────────────────────────────────────────────────────
function MetaCell({ label, value, gold, last }: { label: string; value: string; gold?: boolean; last?: boolean }) {
  return (
    <div style={{
      padding: "0 18px",
      borderRight: last ? "none" : "1px solid var(--color-warm-border)",
    }}>
      <span style={{ display: "block", color: "var(--color-warm-text-light)", marginBottom: "4px", fontSize: "9px" }}>
        {label}
      </span>
      <span style={{ color: gold ? "var(--color-warm-accent)" : "var(--color-warm-text)" }}>
        {value}
      </span>
    </div>
  );
}

function ReportCard({ division }: { division: Division }) {
  const Inner = (
    <>
      <span className="b3"></span><span className="b4"></span>
      <span className="pv-report-roman" style={{
        fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
        fontSize: "22px", color: "var(--color-warm-accent)",
        margin: "16px 0 6px", display: "block", lineHeight: 1,
      }}>
        {division.roman}
      </span>
      <h3 style={{
        fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
        fontSize: "26px", letterSpacing: "0.03em",
        color: "var(--color-warm-text)", textTransform: "uppercase",
        margin: "0 0 18px", lineHeight: 1.1,
      }}>
        {division.label}
      </h3>
      <p style={{
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: "15.5px", lineHeight: 1.55,
        color: "var(--color-warm-text)", opacity: 0.85,
        marginBottom: "28px", margin: "0 0 28px",
      }}>
        {division.tagline}
      </p>
      <div style={{
        marginTop: "auto", paddingTop: "16px",
        borderTop: "1px dashed var(--color-warm-border)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase",
      }}>
        {division.specs.map((s) => (
          <div key={s.label} style={{ lineHeight: 1.5 }}>
            <span style={{ color: "var(--color-warm-text-light)", display: "block", marginBottom: "2px", fontSize: "8.5px" }}>
              {s.label}
            </span>
            <span style={{ color: s.muted ? "var(--color-warm-text-muted)" : "var(--color-warm-accent)" }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  const className = `pv-report pv-report-${division.span}`;
  const style = { gridColumn: division.span === "span-7" ? "span 7" : division.span === "span-5" ? "span 5" : "span 6" };

  return division.status === "live" && division.href ? (
    <a href={division.href} className={className} style={style}>{Inner}</a>
  ) : (
    <div className={className} style={style}>{Inner}</div>
  );
}

function ContactBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 style={{
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-accent)",
        borderTop: "1px solid var(--color-warm-accent)",
        paddingTop: "10px", marginBottom: "14px", margin: "0 0 14px",
      }}>
        {title}
      </h5>
      <div style={{
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: "15.5px", lineHeight: 1.55,
        color: "var(--color-warm-text)",
      }}>
        {children}
      </div>
    </div>
  );
}
