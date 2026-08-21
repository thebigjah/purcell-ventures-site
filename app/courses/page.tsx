"use client";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const COURSES = [
  {
    roman: "I.",
    href: "/courses/college-apps",
    title: "The College Application Playbook",
    desc: "34 acceptances. $530,384 in scholarships. 98 schools researched. The exact process, building your list, writing essays, chasing scholarships, and maximizing your offer.",
    price: "$297",
    stats: [
      { v: "34",    l: "Acceptances" },
      { v: "$530k", l: "Scholarships" },
      { v: "17",    l: "Lessons" },
    ],
  },
  {
    roman: "II.",
    href: "/courses/business-launch",
    title: "The Business Launch Playbook",
    desc: "From idea to LLC to first dollar. 7 modules, 26 lessons, and a full resource pack, every tool, decision, and shortcut from building Purcell Ventures at seventeen.",
    price: "$397",
    stats: [
      { v: "7",   l: "Modules" },
      { v: "26",  l: "Lessons" },
      { v: "LLC", l: "→ Revenue" },
    ],
  },
  {
    roman: "III.",
    href: "/courses/ai-automation",
    title: "Zero to Automated",
    desc: "8 modules. 25 lessons. Build the AI tools you actually need, email bots, content pipelines, lead scrapers, and personal AI assistants. Every tool taught is a tool I run.",
    price: "$397",
    stats: [
      { v: "8",   l: "Modules" },
      { v: "25",  l: "Lessons" },
      { v: "7",   l: "Code templates" },
    ],
  },
];


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Courses",
      "item": "https://purcellventures.co/courses"
    }
  ]
};

export default function CoursesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Purcell Ventures · Courses</div>
          <h1>
            Learn from someone <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>who just did it.</em>
          </h1>
          <p className="deck">
            No theory. No credentials theater. Just the actual process, documented, structured, and taught by someone who&apos;s been through it recently enough to remember every step.
          </p>
        </header>

        {/* Courses grid */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>Available <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>now</em></h2>
        </header>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {COURSES.map((c) => (
            <Link key={c.href} href={c.href} className="pv-card" style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "32px",
              alignItems: "center",
              padding: "36px 36px 32px",
              minHeight: "200px",
            }}>
              <span className="b3"></span><span className="b4"></span>
              <span className="pv-italic" style={{ fontSize: "56px", color: "var(--color-warm-accent)", lineHeight: 1, fontWeight: 400 }}>
                {c.roman}
              </span>
              <div>
                <div className="pv-mono-label" style={{ marginBottom: "10px", color: "var(--color-warm-accent)" }}>
                  Available now · Self-paced
                </div>
                <h2 style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                  fontSize: "26px", letterSpacing: "0.02em",
                  color: "var(--color-warm-text)", textTransform: "uppercase",
                  marginBottom: "12px", lineHeight: 1.15, margin: "0 0 12px",
                }}>
                  {c.title}
                </h2>
                <p className="pv-italic" style={{
                  fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.85,
                  lineHeight: 1.55, marginBottom: "16px", maxWidth: "640px",
                }}>
                  {c.desc}
                </p>
                <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                  {c.stats.map(s => (
                    <div key={s.l}>
                      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "18px", color: "var(--color-warm-accent)", letterSpacing: "-0.01em" }}>
                        {s.v}
                      </div>
                      <div className="pv-mono-label" style={{ marginTop: "2px", color: "var(--color-warm-text-light)" }}>
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", minWidth: "140px" }}>
                <div className="pv-mono-label" style={{ color: "var(--color-warm-text-light)" }}>From</div>
                <div style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                  fontSize: "44px", letterSpacing: "-0.02em",
                  color: "var(--color-warm-text)", lineHeight: 1,
                }}>
                  {c.price}
                </div>
                <span style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "var(--color-warm-accent)",
                  marginTop: "12px",
                }}>
                  View course →
                </span>
              </div>
            </Link>
          ))}
        </div>

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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Home</a>
      </footer>
    </div>
    </>
  );
}
