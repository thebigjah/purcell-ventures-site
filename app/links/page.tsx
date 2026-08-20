"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

interface LinkItem {
  href: string;
  label: string;
  desc?: string;
  badge?: string;
  external?: boolean;
}

const SECTIONS: { roman: string; label: string; items: LinkItem[] }[] = [
  {
    roman: "I.",
    label: "Work With Me",
    items: [
      { href: "/digital",        label: "Digital Services",  desc: "Websites, AI chatbots, booking, marketing. From $99/mo." },
      { href: "/consulting",     label: "AI Consulting",     desc: "Hands-on training for your team. From $125/person." },
      { href: "/software",       label: "Custom Software",   desc: "Apps, platforms, AI tools. From $1,500." },
      { href: "/consulting/book", label: "Book a Session →",  badge: "Direct booking" },
    ],
  },
  {
    roman: "I.5",
    label: "Free Tools",
    items: [
      { href: "/ai-readiness",       label: "AI Readiness Test",  desc: "10 questions, 3 minutes. Score your team's AI maturity, get calibrated next steps. No email capture." },
      { href: "/ai-cost-calculator", label: "AI Cost Calculator", desc: "Enter your team size and workload. See how fast an AI session pays back in dollars. Conservative math." },
    ],
  },
  {
    roman: "II.",
    label: "Learn From Me",
    items: [
      { href: "/courses/college-apps",    label: "College Application Playbook",  desc: "34 acceptances. $505k scholarships. $297." },
      { href: "/courses/business-launch", label: "Business Launch Playbook",      desc: "From idea to LLC to first dollar. $397." },
      { href: "/courses/ai-automation",   label: "Zero to Automated",             desc: "Build the AI tools you actually need. $397." },
    ],
  },
  {
    roman: "III.",
    label: "Personal",
    items: [
      { href: "/about",   label: "About",   desc: "Who I am, where I'm going, what the mark means." },
      { href: "/now",     label: "/now",    desc: "What I'm focused on right now." },
      { href: "/uses",    label: "/uses",   desc: "My working stack — every tool in active production." },
      { href: "/verses",  label: "Verses",  desc: "Five scriptures I come back to." },
      { href: "/writing", label: "Writing", desc: "Selected original prose." },
      { href: "/resume",  label: "Résumé",  desc: "Full record — education, work, awards, scholarships." },
    ],
  },
  {
    roman: "IV.",
    label: "Sister Brand",
    items: [
      { href: "https://mantle-field-site.vercel.app", label: "Mantle Field Services", desc: "Gutter cleaning, pressure washing, lawn care. Metro Atlanta only.", external: true },
    ],
  },
  {
    roman: "V.",
    label: "Reach Me",
    items: [
      { href: "mailto:elijah@purcell-ventures.com", label: "elijah@purcell-ventures.com", desc: "Same-day response. Email is best." },
      { href: "tel:+12054627839",                   label: "(770) 280·5319",              desc: "Call or text." },
      { href: "https://www.linkedin.com/in/elijah-purcell-5128a9256", label: "LinkedIn", external: true },
    ],
  },
];

export default function LinksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "56px 28px 96px" }}>

        {/* Page head */}
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.42em", textTransform: "uppercase",
            color: "var(--color-warm-accent)", marginBottom: "20px",
          }}>
            ✦ &nbsp; Purcell · Ventures &nbsp; ✦
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(36px, 7vw, 64px)",
            lineHeight: 0.98, letterSpacing: "0.02em",
            color: "var(--color-warm-text)", margin: "0 0 16px",
            textTransform: "uppercase",
          }}>
            Elijah Brent <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Purcell</em>
          </h1>
          <p className="pv-italic" style={{
            fontSize: "17px", color: "var(--color-warm-text)", opacity: 0.85,
            lineHeight: 1.5, maxWidth: "440px", margin: "0 auto",
          }}>
            Founder of Purcell Ventures. Operator, software builder, undergraduate-bound out of Acworth, Georgia.
          </p>
        </header>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {SECTIONS.map((section) => (
            <section key={section.label}>
              <div style={{
                display: "grid", gridTemplateColumns: "auto 1fr",
                gap: "16px", alignItems: "baseline",
                paddingBottom: "12px",
                borderBottom: "1px solid var(--color-warm-border)",
                marginBottom: "16px",
              }}>
                <span className="pv-italic" style={{ fontSize: "28px", color: "var(--color-warm-accent)", lineHeight: 1 }}>
                  {section.roman}
                </span>
                <h2 style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                  fontSize: "15px", letterSpacing: "0.32em",
                  color: "var(--color-warm-text)", textTransform: "uppercase",
                  margin: 0, lineHeight: 1,
                }}>
                  {section.label}
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="pv-card"
                    style={{
                      display: "block",
                      padding: "18px 22px 16px",
                      textDecoration: "none",
                    }}
                  >
                    <span className="b3"></span><span className="b4"></span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: item.desc ? "6px" : 0 }}>
                      <span style={{
                        fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                        fontSize: "15.5px", letterSpacing: "0.02em",
                        color: "var(--color-warm-text)",
                      }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span style={{
                          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                          fontSize: "9px", fontWeight: 700,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          padding: "3px 8px",
                          border: "1.5px solid var(--color-warm-accent)",
                          color: "var(--color-warm-accent)",
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="pv-italic" style={{
                        fontSize: "13.5px", color: "var(--color-warm-text)",
                        opacity: 0.82, lineHeight: 1.5, margin: 0,
                      }}>
                        {item.desc}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Closing colophon */}
        <footer style={{
          marginTop: "56px",
          textAlign: "center",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "9.5px", letterSpacing: "0.42em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)",
          lineHeight: 1.8,
        }}>
          <div style={{ marginBottom: "8px", color: "var(--color-warm-accent)", opacity: 0.7 }}>✦</div>
          <div>EST · April · MMXXV · Acworth, GA</div>
          <div style={{ marginTop: "6px" }}>Control № 25075361 · Domestic LLC</div>
        </footer>

      </main>
    </div>
  );
}
