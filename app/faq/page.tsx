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
        q: "Who do I actually talk to?",
        a: "Me. Elijah Purcell. There's no team, no account manager, no handoff. You deal with the owner from the first message to the final delivery.",
      },
      {
        q: "How fast do you respond?",
        a: "Same day on email, usually within a few hours. If you need an answer urgently, call or text (770) 280·5319.",
      },
      {
        q: "Do you take clients outside Atlanta?",
        a: "For digital services, consulting, and software — yes, anywhere. For field work (gutter cleaning, pressure washing, lawn care), see Mantle Field Services — Metro Atlanta only.",
      },
      {
        q: "What's the best way to start?",
        a: "Email with a one-sentence description of what you need. I'll tell you honestly if I can help and what it would look like.",
      },
    ],
  },
  {
    roman: "II.",
    label: "AI Consulting",
    qas: [
      {
        q: "Do I need tech experience to benefit from a session?",
        a: "No. Most sessions are designed for people who've never used AI tools before. I meet you where you are and build from there.",
      },
      {
        q: "What do participants need to bring?",
        a: "A laptop or tablet and a willingness to try things. I'll handle everything else: setup, demos, exercises, and a takeaway guide.",
      },
      {
        q: "Can you come to our office?",
        a: "Yes. I come to you. Your office, your team, your environment. That context makes the session more relevant and the examples more useful.",
      },
      {
        q: "What's the difference between this and just using ChatGPT on my own?",
        a: "Most people use about 10% of what AI tools can do. I show you the other 90% — the prompting techniques, the integrations, the specific workflows that actually save time in your type of business.",
      },
      {
        q: "Will this lead to a sales pitch for your other services?",
        a: "Only if it makes sense. Consulting is its own thing. If I see something in your business I could build for you, I'll mention it. No pressure, no upsell baked into the session.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "Typically 1–2 weeks for standard sessions. Custom trainings need more prep time. Reach out as early as you can.",
      },
    ],
  },
  {
    roman: "III.",
    label: "Digital Services",
    qas: [
      {
        q: "How does the subscription work?",
        a: "Pick a tier (Starter / Growth / Full Service). Pay a one-time setup fee + a flat monthly rate. No contracts. Cancel anytime. All 25+ tools accessible from one dashboard.",
      },
      {
        q: "Can I mix and match tools from different tiers?",
        a: "Yes. The tiers are common starting points but every account is custom. Tell me what you actually need and I'll build the right combination.",
      },
      {
        q: "Will you migrate me off my existing tools?",
        a: "Yes. Most clients are coming from a patchwork of Squarespace + Mailchimp + Google Forms + something. I'll move everything into one place during setup.",
      },
      {
        q: "What happens if I cancel?",
        a: "Your data is yours. I export everything to you in standard formats. No data hostage, no exit fees.",
      },
    ],
  },
  {
    roman: "IV.",
    label: "Custom Software",
    qas: [
      {
        q: "What kinds of projects do you take on?",
        a: "Web apps, mobile apps, AI integrations, browser extensions, automation tools. Best fit: clear problem + a single decision-maker + budget between $1.5k and $15k. If your project is bigger, I'll tell you honestly and refer you out.",
      },
      {
        q: "What's the timeline for a small project?",
        a: "Most $1.5k–3.5k projects ship in 1–2 weeks from kickoff. Full apps run 3–8 weeks depending on scope.",
      },
      {
        q: "Do you write the code yourself?",
        a: "Yes. I work with Claude (Anthropic's AI) as a pair-programming partner, but every line that ships is reviewed and shaped by me. I own the work.",
      },
      {
        q: "Can you maintain it after launch?",
        a: "Yes — either as a fixed-bug-rate retainer or as ongoing feature development. We decide what works for both of us at the end of the build.",
      },
    ],
  },
  {
    roman: "V.",
    label: "Courses",
    qas: [
      {
        q: "Are the courses live or self-paced?",
        a: "Self-paced. Every lesson is a video + a written takeaway. You can work through a course in a weekend or stretch it over months.",
      },
      {
        q: "Do I get lifetime access?",
        a: "Yes. One purchase, forever. Including any future updates to that course's lessons.",
      },
      {
        q: "Is there a refund policy?",
        a: "30 days. If the course doesn't deliver for you, email me within 30 days for a full refund. No questions, no hard feelings.",
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
        q: "Wait — you're 18?",
        a: "Yes. I've been building production software for a year. The portfolio is real, the clients are real, and I'd rather earn your trust with the work than the age. The full record lives at /resume.",
      },
      {
        q: "What's the panopticon mark about?",
        a: "It's an inversion of Bentham's prison design — instead of a hidden watcher surveilling visible prisoners, the mark places PV at the center as the visible accountable party, with the structure radiating outward as accountability arms. The full explanation lives on the /about page under 'The Mark.'",
      },
      {
        q: "Why 'Ventures' and not 'agency' or 'studio'?",
        a: "Because it's a set of ventures, not a single business. Digital services, consulting, software, and real estate are different things being built and tested. 'Ventures' is accurate to what this actually is.",
      },
      {
        q: "Who owns Mantle Field Services?",
        a: "I do — it's a sister brand to Purcell Ventures, run under the same LLC umbrella but operated as its own service brand. Same owner, same standards, separate sales operations.",
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
          <div className="pv-mono-label">A Standing Reference · Last revised May 2026</div>
          <h1>
            Common <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>questions.</em>
          </h1>
          <p className="deck">
            Everything I get asked enough to put on paper. If your question isn&apos;t here — email me. I&apos;ll answer it, then add it to this page so the next person doesn&apos;t have to ask.
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
                      {isOpen && (
                        <div className="pv-italic" style={{
                          padding: "0 28px 22px",
                          fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.88,
                          lineHeight: 1.6,
                          borderTop: "1px dashed var(--color-warm-border)", paddingTop: "16px",
                        }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Closing band */}
        <section style={{
          marginTop: "64px",
          padding: "48px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}>
            ✦
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15,
          }}>
            Your question <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>not here?</em>
          </h2>
          <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com">
            Email me →
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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Home</a>
      </footer>
    </div>
  );
}
