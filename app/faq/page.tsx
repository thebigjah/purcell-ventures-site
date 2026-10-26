"use client";

import { useState } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface QA {
  q: string;
  a: string;
}

interface QSection {
  roman: string;
  label: string;
  qas: QA[];
}

const FAQS: QSection[] = [
  {
    roman: "I.",
    label: "Working with Elijah",
    qas: [
      {
        q: "Who will I talk to?",
        a: "Me, Elijah Purcell. I handle your project myself from the first message to the final delivery.",
      },
      {
        q: "How fast do you respond?",
        a: "Same day on email, usually within a few hours. If you need an answer urgently, call or text (205) 462-7839.",
      },
      {
        q: "Where are you based?",
        a: "Tuscaloosa, Alabama. Purcell Ventures LLC is registered in Acworth, Georgia, where it was formed in April 2025, and I run it from Tuscaloosa, where I attend the University of Alabama. Local clients can meet me in person.",
      },
      {
        q: "Do you take clients outside Tuscaloosa?",
        a: "For digital services, AI consulting and software, yes, anywhere in the United States. For field work (gutter cleaning, pressure washing, lawn care), see Mantle Field Services, which is Metro Atlanta only.",
      },
      // PRICING QUESTIONS. This page carried 26 questions and none of them contained the
      // words "cost", "price" or "how much", which is one of the most common query shapes
      // there is. An answer engine cannot quote a number that is not written down.
      {
        q: "How much does a website cost?",
        a: "For University of Alabama students and student-run businesses, $500, with an optional $25 a month to keep it maintained and updated. For other small businesses, ongoing digital service starts at $99 a month, which covers the site plus the tooling around it. Custom builds start at $1,500.",
      },
      {
        q: "How much does AI consulting cost?",
        a: "Sessions start at $125 per person. The first conversation is free and frequently ends with me telling you the problem is smaller than you thought, or that AI is the wrong tool for it.",
      },
      {
        q: "What's the best way to start?",
        a: "Email elijah@purcell-ventures.com with a one-sentence description of what you are trying to do. Describe the goal rather than the thing you think needs building. I'll tell you whether I can help and what the work would look like.",
      },
    ],
  },
  {
    roman: "II.",
    label: "AI Consulting",
    qas: [
      {
        q: "Do I need tech experience to benefit from a session?",
        a: "No. I design most sessions for people who have never used AI tools. I start from what you already know.",
      },
      {
        q: "What do participants need to bring?",
        a: "A laptop or tablet and a willingness to try things. I bring the setup, demos, exercises and a takeaway guide.",
      },
      {
        q: "Can you come to our office?",
        a: "Yes. I come to your office, so the examples use your team's own work.",
      },
      {
        q: "What's the difference between this and just using ChatGPT on my own?",
        a: "I show you prompting techniques, integrations and workflows chosen for your type of business, and you practice them on your own tasks during the session.",
      },
      {
        q: "Will this lead to a sales pitch for your other services?",
        a: "Only if it fits. Consulting is a separate service. If I see something in your business I could build for you, I'll mention it once, outside the session.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "Usually 1 to 2 weeks for standard sessions. Custom trainings need more prep time. Reach out as early as you can.",
      },
    ],
  },
  {
    roman: "III.",
    label: "Digital Services",
    qas: [
      {
        q: "How does the subscription work?",
        a: "Pick a tier: Starter ($99/mo + $400 setup), Growth ($179/mo + $700 setup) or Full Service ($279/mo + $1,000 setup). After setup you pay a flat monthly rate with no contract, and you can cancel at any time. You reach every tool from one dashboard.",
      },
      {
        q: "Can I mix and match tools from different tiers?",
        a: "Yes. The tiers are common starting points but every account is custom. Tell me what you need and I'll build that combination.",
      },
      {
        q: "Will you migrate me off my existing tools?",
        a: "Yes. Most clients are coming from a mix of tools like Squarespace, Mailchimp and Google Forms. I'll move everything into one place during setup.",
      },
      {
        q: "What happens if I cancel?",
        a: "Your data is yours. I export everything to you in standard formats, and there is no exit fee.",
      },
    ],
  },
  {
    roman: "IV.",
    label: "Custom Software",
    qas: [
      {
        q: "What kinds of projects do you take on?",
        a: "Web apps, mobile apps, AI integrations, browser extensions and automation tools. The best fit is a clear problem, one decision-maker and a budget between $1.5k and $15k. If your project is bigger, I'll say so and refer you to someone else.",
      },
      {
        q: "What's the timeline for a small project?",
        a: "Most $1.5k to $3.5k projects ship 1 to 2 weeks after kickoff. Full apps take 3 to 8 weeks, depending on scope.",
      },
      {
        q: "Do you write the code yourself?",
        a: "Yes. I work with Claude (Anthropic's AI) as a pair-programming partner, and I review and edit every line before it ships.",
      },
      {
        q: "Can you maintain it after launch?",
        a: "Yes, either as a fixed-rate bug-fix retainer or as ongoing feature development. We decide what works for both of us at the end of the build.",
      },
    ],
  },
  {
    roman: "V.",
    label: "Courses",
    qas: [
      {
        q: "Are the courses live or self-paced?",
        a: "Self-paced. Every lesson is a video with a written takeaway. You can work through a course in a weekend or stretch it over months.",
      },
      {
        q: "Do I get lifetime access?",
        a: "Yes. One purchase covers the course and any future updates to its lessons.",
      },
      {
        q: "Is there a refund policy?",
        a: "30 days. If the course doesn't deliver for you, email me within 30 days for a full refund.",
      },
      {
        q: "Can I message you while taking a course?",
        a: "Yes. Email anytime. I read everything.",
      },
    ],
  },
  {
    roman: "VI.",
    label: "About this company",
    qas: [
      {
        q: "Are you really nineteen?",
        a: "Yes. I've been building production software for a year. Every portfolio project links to a live site, and the full record is at /resume.",
      },
      {
        q: "What's the panopticon mark about?",
        a: "It inverts Bentham's prison design. In the original, a hidden watcher observes visible prisoners. The mark puts PV at the center as the visible party that answers for its work, with the structure radiating outward. The full explanation lives on the /about page under 'The Mark.'",
      },
      {
        q: "Why 'Ventures' and not 'agency' or 'studio'?",
        a: "Because the company runs several separate ventures: digital services, consulting, software and real estate. I build and test each one on its own.",
      },
      {
        q: "Who owns Mantle Field Services?",
        a: "I do. It's a sister brand to Purcell Ventures under the same LLC, with its own sales operation.",
      },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => prev === id ? null : id);

  // Structured data for Google's FAQ rich snippets
  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.flatMap(section =>
      section.qas.map(qa => ({
        "@type": "Question",
        "name": qa.q,
        "acceptedAnswer": { "@type": "Answer", "text": qa.a },
      }))
    ),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Reference page, revised May 2026</div>
          <h1>
            Common <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>questions.</em>
          </h1>
          <p className="deck">
            The questions clients ask me most often. If your question isn&apos;t here, email me. I&apos;ll answer it, then add it to this page so the next person doesn&apos;t have to ask.
          </p>
        </header>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {FAQS.map((section) => (
            <section key={section.label}>
              <header className="pv-section-head" style={{ padding: "24px 0 16px", marginBottom: "20px" }}>
                <span className="roman">{section.roman}</span>
                <h2>{section.label}</h2>
              </header>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {section.qas.map((item, i) => {
                  const id = `${section.label}-${i}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
                      <span className="b3"></span><span className="b4"></span>
                      <button
                        onClick={() => toggle(id)}
                        style={{
                          width: "100%", background: "none", border: "none", cursor: "pointer",
                          padding: "20px 28px",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          textAlign: "left", gap: "16px",
                          color: "var(--color-warm-text)",
                        }}
                      >
                        <span style={{
                          fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600,
                          letterSpacing: "0.02em", color: "var(--color-warm-text)",
                        }}>
                          {item.q}
                        </span>
                        <span style={{
                          fontFamily: "'Cinzel', serif", fontSize: "22px",
                          color: "var(--color-warm-accent)", flexShrink: 0,
                          transition: "transform 0.2s",
                          transform: isOpen ? "rotate(45deg)" : "none",
                        }}>
                          +
                        </span>
                      </button>
                      {/* Always in the DOM, hidden with CSS rather than conditionally
                          rendered. {isOpen && ...} meant a closed answer did not exist in
                          the HTML at all, so every crawler saw twenty-four questions and
                          no answers while the FAQPage schema claimed otherwise. Google
                          counts content hidden by CSS in an accordion; it cannot count
                          content that was never sent. */}
                      <div
                        id={`${id}-answer`}
                        hidden={!isOpen}
                        className="pv-italic"
                        style={{
                          padding: "0 28px 22px",
                          fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.88,
                          lineHeight: 1.6,
                          borderTop: "1px dashed var(--color-warm-border)", paddingTop: "16px",
                        }}
                      >
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Want this for your business, eat-own-dog-food CTA */}
        <section style={{
          marginTop: "64px",
          padding: "32px 36px",
          background: "var(--color-warm-bg-alt)",
          border: "2px solid var(--color-warm-accent)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "20px",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "8px" }}>
              For your business
            </div>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "var(--color-warm-text)", margin: "0 0 8px" }}>
              The AI FAQ Builder writes your FAQ.
            </h3>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5, maxWidth: "560px" }}>
              Tell us about your business. It writes 6 to 10 questions and answers you can paste into your site, and it is free.
            </p>
          </div>
          <a className="pv-btn-primary" href="/digital/tools/faq-builder">Try the tool</a>
        </section>

        {/* Closing band */}
        <section style={{
          marginTop: "32px",
          padding: "48px 36px",
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
            fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15,
          }}>
            Your question <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>not here?</em>
          </h2>
          <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com">
            Email me
          </a>
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
  );
}
