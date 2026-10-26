"use client";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const COURSES = [
  {
    roman: "I.",
    href: "/courses/college-apps",
    title: "The College Application Playbook",
    desc: "I researched 98 schools, got 34 acceptances and $530,384 per year in scholarship offers. The course covers building a list, writing essays and applying for scholarships.",
    price: "$297",
    stats: [
      { v: "34",    l: "Acceptances" },
      { v: "$530,384", l: "Per year in offers" },
      { v: "17",    l: "Lessons" },
    ],
  },
  {
    roman: "II.",
    href: "/courses/business-launch",
    title: "The Business Launch Playbook",
    desc: "From idea to LLC to first customer. 7 modules, 26 lessons and a resource pack with the tools and decisions from starting Purcell Ventures at seventeen.",
    price: "$397",
    stats: [
      { v: "7",   l: "Modules" },
      { v: "26",  l: "Lessons" },
      { v: "6", l: "Templates" },
    ],
  },
  {
    roman: "III.",
    href: "/courses/ai-automation",
    title: "Zero to Automated",
    desc: "8 modules and 25 lessons. Build email bots, content pipelines, lead scrapers and a personal AI assistant. I run every tool the course teaches.",
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
          <div className="pv-mono-label">Purcell Ventures courses</div>
          <h1>
            Courses on things <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>I did recently.</em>
          </h1>
          <p className="deck">
            Each course documents a process I went through in the last two years, in the order I did it.
          </p>
        </header>

        {/* Courses grid */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>Waitlist <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>open</em></h2>
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
                  Waitlist open, self-paced
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
                  View course
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* The index page rendered 281 words for three courses priced $297 to $397. The
            cards carry the pitch; nothing carried the reasoning, which is the part a person
            deciding whether to buy actually wants and the part an engine can quote. */}
        <section style={{ maxWidth: "720px", margin: "72px auto 0", padding: "0 8px", fontSize: "16px", lineHeight: 1.75 }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "0 0 14px", color: "var(--color-warm-text)" }}>
            Why three courses
          </h2>
          <p>
            I only teach things I finished recently enough to remember the parts that went
            wrong. That leaves three: applying to college, starting a business and
            automating work with AI. I did each one in the last two years.
          </p>
          <p>
            The tradeoff: I do not have twenty years of perspective. These courses cover the
            current process, including steps that exist only because of how things work now.
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "36px 0 14px", color: "var(--color-warm-text)" }}>
            What each course includes
          </h2>
          <p>
            Each course is self-paced, with lifetime access and exercises in each lesson. The templates
            and documents I used come with every course. If a lesson tells you to send an
            email, the email is in there.
          </p>
          <p>
            Refunds: if the material does not match what the page says, ask and I will refund
            you.
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "36px 0 14px", color: "var(--color-warm-text)" }}>
            Who teaches them
          </h2>
          <p>
            I am Elijah Purcell, founder and CEO of{" "}
            <Link href="/about" style={{ color: "var(--color-warm-accent)" }}>Purcell Ventures LLC</Link>,
            and I build autonomous AI agent systems and study psychology and data science
            in the University of Alabama Honors College in Tuscaloosa. The{" "}
            <Link href="/who" style={{ color: "var(--color-warm-accent)" }}>short factual version</Link>{" "}
            has the record without the sales copy. If you need help rather than a course, see
            the{" "}
            <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>consulting page</Link>.
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
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>Home</a>
      </footer>
    </div>
    </>
  );
}
