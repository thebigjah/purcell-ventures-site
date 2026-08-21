"use client";

import { useState, useEffect } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

// noindex, keep personal writing out of search engines

interface Piece {
  roman: string;
  title: string;
  date: string;
  category: "POEM" | "ESSAY" | "PROSE";
  excerpt: string;
  full?: string;
}

const PIECES: Piece[] = [
  {
    roman: "I.",
    title: "The Husks the Swine Did Eat",
    date: "January 2025",
    category: "PROSE",
    excerpt:
      "I saw myself alone, outcast by my own volition, consigned to the filth the world had left to me. For seven days, I denied my flesh any gratification or nourishment, desperate to overcome my weakness, and in doing so, I uncovered the error of my mind.",
    full:
      "I saw myself alone, outcast by my own volition, consigned to the filth the world had left to me. For seven days, I denied my flesh any gratification or nourishment, desperate to overcome my weakness, and in doing so, I uncovered the error of my mind. In the earliest hours, my body ached and thundered with yearning. For sixty hours, I felt an unbearable deficit of my necessities. Then, a great and uncomfortable shift took place, my body ceased to hunger, even recoiling at the thought of food. But my naïve, unprepared mind found no such refuge beyond the third day's dusk. While my flesh was content in its deprivation, my mind saw the indulgences around me and whispered of pleasures I could still grasp. A voice, quiet yet insistent, would murmur: You've done your share, allow yourself just this much. For hours, this thought rang unsettled in my mind.\n\nYet in spite of all temptation, I persisted. One hundred sixty-eight hours proved to myself, and to the host above, that I had mastered my flesh. My victory became a celebration, shared with every soul in reach of my arms, and I found gratification in my newness. Lifting my eyes, I saw my Father's house resting just atop the horizon. I took a step toward it.\n\nI fell.\n\nI fell, and I fell, and I fell again. Only two steps closer to His home, and I was already on my knees. What wisdom had this deprivation given me? Would a wise man fall so many times upon the same path? The journey was simple, a line straight and narrow, but great serpents coiled into my vision, their fangs bared with intent to devour. Beneath me, to either side, lay the beasts of the farm. Were I to fall among them, there would be no distinction between us. I was filthy. And with every step toward my Father's house, I stumbled once more.\n\nWhat in me is so deeply wry that I find comfort in the floor caked with filth? What misshapen mind finds crooked contentment in the husks that the swine did eat? They have never satisfied my desires. Even under great pressure, even under the weight of temptation, the surrender I gave to the serpents only buried their fangs deeper beneath my skin. They promised me relief. They promised me something better. Instead, they left me with a grief far worse than the hunger of the flesh. Were I to starve another hundred days and nights, I would not feel a hunger as deep as the one I now have for the Lord.\n\nIn my immaturity, I assumed the snakes would retreat if ignored, that boredom would drive them away. Instead, they stood resolute and watchful, never ceasing in their hunt, waiting for me to stumble.\n\nI take a step toward His house.",
  },
  {
    roman: "II.",
    title: "The Rebuking of Loki",
    date: "2024",
    category: "PROSE",
    excerpt:
      "Why should Loki's arbiter cast such a foolish and negligent euphoria on my platonic mind? The minions of the entangler have imposed themselves upon me with intentions malicious and fruitless.",
    full:
      "Why should Loki's arbiter cast such a foolish and negligent euphoria on my platonic mind? The minions of the entangler have imposed themselves upon me with intentions malicious and fruitless. Chaos is their agent, and in sowing the seeds of discord they have deprived the soil of its nutrients. Loki has no need for sacrifices of the flesh, but he takes delight at the lighting of a pyre beneath your sanity. Even in spite of knowing your benign intention, those stricken with Loki's curse find their innocence to yield feelings belonging only to your reasoning's antithesis.\n\nWhy do you send out your ambassadors to tempt me, Loki? Why does a fractured heart or a severed trust satiate your hunger? Oh Thor, should I ever loathe myself so much as to stoop into the worship of that filth, I plead you strike my scalp with Mjolnir's full strength.\n\nLoki, in your godhood you have laid down virtue and integrity on the altar of greed and pleasure. Though I may be driven to madness by those who realize your corrupted teachings, no madness shall ever lead so close to Hel as you have erected your eclectic throne.",
  },
  {
    roman: "III.",
    title: "Injustice Scorned",
    date: "March 2025",
    category: "PROSE",
    excerpt:
      "The singular flaw in your personality is that you might find me desirable too. You are impossibly capable where I am only curious, kind where I am indifferent.",
    full:
      "The singular flaw in your personality is that you might find me desirable too. You are impossibly capable where I am only curious, kind where I am indifferent. It had never occurred to me to act as though we didn't belong together. In your absence, I wonder if I will ever be whole again because in my every interaction with a new person, I must come to terms with how insufferably boring all the sundry is compared to you. Every voice I meet is muted, every gaze a dull reflection. No one else is bold enough to exist in full color.\n\nThat's what I am resigned to now, a mechanism for missing you, and with every repetition, I get better at performing that function. I am unsure that I may ever be exceptional outside of you, and I fear that the memory of me will be tainted by the uncanny insincerity of a fraction pretending to be an entirety.\n\nI've taken out a great loan from the universe, and grief is the debt that love incurs. In any world, is there one where you would be so reckless as to love me? Where you would be reckless enough to become something imperfect and real, to stoop down to meet me in a world that doesn't deserve you? In a universe rife with injustices, I'm asking that you grant me this one underserved miracle: for someone like you to love someone like me.",
  },
];

export default function WritingPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // noindex meta tag, block search engines from indexing this personal writing
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">A Literary Index · Selected Pieces</div>
          <h1>
            Things I&apos;ve <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>written.</em>
          </h1>
          <p className="deck">
            Original poetry, prose, and reflections. I write nobody asks for. These pieces stay rough on purpose, the polished writing lives on the courses and the consulting decks; the raw stuff lives here.
          </p>
        </header>

        {/* Pieces */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {PIECES.map((piece) => {
            const isOpen = openSlug === piece.title;
            return (
              <article key={piece.title} className="pv-card" style={{ padding: "36px 36px 32px" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "24px", alignItems: "baseline", marginBottom: "20px" }}>
                  <span className="pv-italic" style={{ fontSize: "44px", color: "var(--color-warm-accent)", lineHeight: 1 }}>
                    {piece.roman}
                  </span>
                  <div>
                    <h2 style={{
                      fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                      fontSize: "22px", letterSpacing: "0.04em",
                      color: "var(--color-warm-text)", textTransform: "uppercase",
                      margin: "0 0 6px", lineHeight: 1.15,
                    }}>
                      {piece.title}
                    </h2>
                    <div className="pv-mono-label" style={{ color: "var(--color-warm-text-light)" }}>
                      {piece.category} · {piece.date}
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenSlug(isOpen ? null : piece.title)}
                    style={{
                      background: "transparent",
                      border: "1.5px solid var(--color-warm-border)",
                      color: "var(--color-warm-text-muted)",
                      padding: "8px 16px",
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      fontSize: "10px", fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      cursor: "pointer", borderRadius: 0,
                      transition: "border-color 0.12s, color 0.12s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-warm-accent)"; e.currentTarget.style.color = "var(--color-warm-accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-warm-border)"; e.currentTarget.style.color = "var(--color-warm-text-muted)"; }}
                  >
                    {isOpen ? "Close ↑" : "Read →"}
                  </button>
                </div>
                <blockquote className="pv-italic" style={{
                  fontSize: "17px", lineHeight: 1.6,
                  color: "var(--color-warm-text)", opacity: 0.92,
                  borderLeft: "3px solid var(--color-warm-accent)",
                  paddingLeft: "24px",
                  margin: 0,
                  whiteSpace: "pre-line",
                }}>
                  {isOpen ? piece.full : piece.excerpt}
                </blockquote>
              </article>
            );
          })}
        </div>

        {/* Closing */}
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
          }}></div>
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto", lineHeight: 1.55,
          }}>
            More fiction drafts, essays, and short pieces in a notebook nobody but God has seen yet. These three are the ones I&apos;ve chosen to publish.
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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Home</a>
      </footer>
    </div>
  );
}
