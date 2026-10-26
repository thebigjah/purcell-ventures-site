"use client";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const BUILD_TIERS = [
  {
    roman: "i.",
    name: "Starter",
    tagline: "Single-page presence.",
    who: "Solo service providers. Caregivers, sole-prop doctors, single-truck trades. Businesses where your time, more than lead flow, limits growth.",
    what: [
      "One-page custom site with your branding",
      "Built mobile-first",
      "Google Business profile claimed and managed",
      "SSL with automatic renewal",
      "Contact form routed to your email",
    ],
    timeline: "Live in 7 to 10 business days",
  },
  {
    roman: "ii.",
    name: "Pro",
    tagline: "Multi-page business site.",
    who: "Crews and multi-employee shops. Trades, restaurants, professional services with capacity to scale.",
    what: [
      "Home, Services, Past Projects, Contact",
      "Lead form with SMS plus email routing",
      "Project gallery you update from your phone",
      "Google Business profile claimed and managed",
      "SSL with automatic renewal",
      "Integration with your existing CRM where applicable",
    ],
    timeline: "Live in 14 to 21 business days",
  },
  {
    roman: "iii.",
    name: "Custom",
    tagline: "Built to spec.",
    who: "E-commerce, online booking, multi-location, deep integrations, anything that needs discovery.",
    what: [
      "Discovery call required before scope",
      "Full scope and timeline written before any code",
      "Quoted per project, paid in phases",
      "Includes everything in Pro plus what your spec demands",
    ],
    timeline: "Scoped per project",
  },
];

const MAINTENANCE_TIERS = [
  {
    roman: "i.",
    name: "Site Care",
    tagline: "We host it and monitor uptime.",
    who: "If you mostly need hosting and someone watching for downtime.",
    what: [
      "Hosting, SSL, certificate auto-renewal",
      "Uptime monitoring",
      "One small content update per quarter",
      "Available to all Starter and Pro clients",
    ],
  },
  {
    roman: "ii.",
    name: "Site Care plus Lead Ops",
    tagline: "We maintain your site and route leads to you.",
    who: "Trades and service businesses that want monthly reports and updates without daily contact.",
    what: [
      "Everything in Site Care",
      "Lead form routed to SMS plus email within 60 seconds",
      "Monthly Google Business profile post drafted and published",
      "Monthly health email with traffic, fixes, and what is working",
      "One small content update per month",
      "Access to select add-ons from the Digital catalog",
    ],
  },
  {
    roman: "iii.",
    name: "Marketing Partner",
    tagline: "Part-time marketing on top of site care.",
    who: "Businesses where each new lead is worth a lot and the owner has no time to handle marketing.",
    what: [
      "Everything in Site Care plus Lead Ops",
      "Four Instagram posts per month scheduled through PV Social",
      "Review request automation to your customers after each job",
      "One AI-drafted blog post per month for search",
      "One to two Higgsfield-generated marketing visuals per month",
      "Quarterly fifteen-minute business health call",
      "Small content updates, up to one hour per month",
      "Full access to the Digital catalog of add-ons",
    ],
  },
];

const LOOM_CALLOUT = {
  title: "The Loom",
  desc: "Most of our clients meet us because we built their site before they ever called us. The Loom is the system we use to find a small business that would benefit from better web presence, research them, build them a preview, and reach out. If you found this page from a preview site we built for your business before we spoke, The Loom built it.",
  href: "https://the-loom-gold.vercel.app",
  cta: "See The Loom",
};

const WHY = [
  {
    title: "Registered in Georgia",
    desc: "Purcell Ventures LLC is registered in Acworth, Georgia. We work with businesses in metro Atlanta and remotely across the country. One person runs the company.",
  },
  {
    title: "One contact",
    desc: "When something breaks at nine on a Tuesday, you call Elijah, who built your site.",
  },
  {
    title: "SSL renews automatically",
    desc: "A site with an expired SSL certificate shows visitors a browser security warning. The maintenance tiers renew the certificate automatically.",
  },
  {
    title: "You own the site",
    desc: "You own the site, the content, and the domain. If you leave, we hand over the full source code and all assets with no penalty.",
  },
];

export default function SitesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .pv-sites-tiers, .pv-sites-maint, .pv-sites-why { grid-template-columns: 1fr !important; gap: 14px !important; }
          .pv-sites-loom { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      ` }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Editorial page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Sites</div>
          <h1>
            Custom websites and ongoing partnership for <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>local businesses.</em>
          </h1>
          <p className="deck">
            We build the site, write the plan for it, and keep working on it after launch. Maintenance covers hosting plus lead handling, monthly reports and updates, done by the people who built the site.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com?subject=Sites%20%E2%80%94%20Discovery%20Call">
              Book a 15-minute call
            </a>
            <a className="pv-btn-ghost" href="#what-we-build">See the tiers</a>
          </div>
        </header>

        {/* Build tiers */}
        <header className="pv-section-head" id="what-we-build">
          <span className="roman">I.</span>
          <h2>What we <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>build</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.82, lineHeight: 1.6, marginBottom: "28px", maxWidth: "720px" }}>
          Three build tiers. Each one ends with a published website. I quote prices on the discovery call because the right tier depends on what your business needs.
        </p>
        <div className="pv-sites-tiers" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {BUILD_TIERS.map((t) => (
            <div key={t.name} className="pv-card" style={{ padding: "32px 28px 28px", display: "flex", flexDirection: "column" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
                <span className="pv-italic" style={{ fontSize: "20px", color: "var(--color-warm-accent)", lineHeight: 1 }}>{t.roman}</span>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--color-warm-text)", textTransform: "uppercase", lineHeight: 1.1, margin: 0 }}>
                  {t.name}
                </h3>
              </div>
              <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-accent)", lineHeight: 1.4, marginBottom: "16px" }}>
                {t.tagline}
              </p>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text)", opacity: 0.82, lineHeight: 1.55, marginBottom: "18px" }}>
                <strong style={{ fontWeight: 600, color: "var(--color-warm-text)", display: "block", marginBottom: "6px", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Who it is for</strong>
                {t.who}
              </p>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "8px", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase" }}>What is included</div>
                <ul style={{ listStyle: "disc", padding: "0 0 0 18px", margin: 0 }}>
                  {t.what.map((item) => (
                    <li key={item} style={{ fontSize: "13.5px", color: "var(--color-warm-text)", opacity: 0.88, lineHeight: 1.55, position: "relative", marginBottom: "6px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px dashed var(--color-warm-border)" }}>
                <span className="pv-mono-label" style={{ fontSize: "9.5px" }}>{t.timeline}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance tiers */}
        <header className="pv-section-head">
          <span className="roman">II.</span>
          <h2>How we stay <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>involved</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.82, lineHeight: 1.6, marginBottom: "28px", maxWidth: "720px" }}>
          Hosting and updates continue after launch. Three maintenance tiers, each tied to how involved you want us to be. You can move between them as your business grows.
        </p>
        <div className="pv-sites-maint" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {MAINTENANCE_TIERS.map((t) => (
            <div key={t.name} className="pv-card" style={{ padding: "32px 28px 28px", display: "flex", flexDirection: "column" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
                <span className="pv-italic" style={{ fontSize: "20px", color: "var(--color-warm-accent)", lineHeight: 1 }}>{t.roman}</span>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--color-warm-text)", textTransform: "uppercase", lineHeight: 1.1, margin: 0 }}>
                  {t.name}
                </h3>
              </div>
              <p className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-accent)", lineHeight: 1.4, marginBottom: "16px" }}>
                {t.tagline}
              </p>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text)", opacity: 0.82, lineHeight: 1.55, marginBottom: "18px" }}>
                <strong style={{ fontWeight: 600, color: "var(--color-warm-text)", display: "block", marginBottom: "6px", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Who it is for</strong>
                {t.who}
              </p>
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "8px", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase" }}>What is included</div>
                <ul style={{ listStyle: "disc", padding: "0 0 0 18px", margin: 0 }}>
                  {t.what.map((item) => (
                    <li key={item} style={{ fontSize: "13.5px", color: "var(--color-warm-text)", opacity: 0.88, lineHeight: 1.55, position: "relative", marginBottom: "6px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* The Loom callout */}
        <header className="pv-section-head">
          <span className="roman">III.</span>
          <h2>How most of our clients <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>meet us</em></h2>
        </header>
        <div className="pv-sites-loom pv-card" style={{
          padding: "40px 36px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
          alignItems: "center",
          marginBottom: "64px",
        }}>
          <span className="b3"></span><span className="b4"></span>
          <div>
            <h3 style={{
              fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
              fontSize: "24px", letterSpacing: "0.02em",
              color: "var(--color-warm-text)", textTransform: "uppercase",
              margin: "0 0 14px", lineHeight: 1.1,
            }}>
              {LOOM_CALLOUT.title}
            </h3>
            <p className="pv-italic" style={{ fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
              {LOOM_CALLOUT.desc}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <a href={LOOM_CALLOUT.href} className="pv-btn-primary" style={{ display: "inline-block" }} target="_blank" rel="noopener noreferrer">
              {LOOM_CALLOUT.cta}
            </a>
          </div>
        </div>

        {/* Why us */}
        <header className="pv-section-head">
          <span className="roman">IV.</span>
          <h2>Why <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>us</em></h2>
        </header>
        <div className="pv-sites-why" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {WHY.map((w) => (
            <div key={w.title} className="pv-card" style={{ padding: "28px 28px 24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <h4 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "18px", letterSpacing: "0.02em",
                color: "var(--color-warm-accent)", textTransform: "uppercase",
                margin: "0 0 12px", lineHeight: 1.15,
              }}>
                {w.title}
              </h4>
              <p className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
                {w.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section style={{
          marginTop: "80px",
          padding: "56px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}></div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15,
          }}>
            Talk to Elijah about your <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>site.</em>
          </h2>
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "620px", margin: "0 auto 32px", lineHeight: 1.55,
          }}>
            Fifteen minutes. You tell me what your business does and what you wish your web presence did for you. I tell you which tier fits, what it would cost, and how long it would take.
          </p>
          <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com?subject=Sites%20%E2%80%94%20Discovery%20Call">
            Book a 15-minute call
          </a>
          <p className="pv-italic" style={{
            fontSize: "13.5px", color: "var(--color-warm-text-light)",
            marginTop: "20px",
          }}>
            Or email directly: <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-accent)" }}>elijah@purcell-ventures.com</a>
          </p>
        </section>

      </main>

      <footer style={{
        position: "relative", zIndex: 5,
        padding: "24px 36px",
        borderTop: "1px solid var(--color-warm-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-text-light)",
      }}>
        <span>© {new Date().getFullYear()} Purcell Ventures LLC, Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>All divisions</a>
      </footer>
    </div>
  );
}
