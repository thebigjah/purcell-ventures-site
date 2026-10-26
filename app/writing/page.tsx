import { PageHero, Section, Prose } from "@/app/components/ui";

// Rebuilt on the page kit 26 Oct 2026 as a server component. The pieces open with
// <details>, so the full text is in the HTML and no JavaScript is needed. The page is kept
// out of search through robots metadata in layout.tsx, which replaced a client-side
// <meta> tag that crawlers could miss.
//
// "Injustice Scorned" (March 2025) was removed in the rebuild: it is a personal letter
// about a relationship, and public pages carry only what he would say introducing himself
// professionally. Its text is in the rebuild report if he wants it back.

interface Piece {
  title: string;
  date: string;
  category: "Poem" | "Essay" | "Prose";
  excerpt: string;
  full?: string;
}

const PIECES: Piece[] = [
  {
    title: "The Husks the Swine Did Eat",
    date: "January 2025",
    category: "Prose",
    excerpt:
      "I saw myself alone, outcast by my own volition, consigned to the filth the world had left to me. For seven days, I denied my flesh any gratification or nourishment, desperate to overcome my weakness, and in doing so, I uncovered the error of my mind.",
    full:
      "I saw myself alone, outcast by my own volition, consigned to the filth the world had left to me. For seven days, I denied my flesh any gratification or nourishment, desperate to overcome my weakness, and in doing so, I uncovered the error of my mind. In the earliest hours, my body ached and thundered with yearning. For sixty hours, I felt an unbearable deficit of my necessities. Then, a great and uncomfortable shift took place, my body ceased to hunger, even recoiling at the thought of food. But my naïve, unprepared mind found no such refuge beyond the third day's dusk. While my flesh was content in its deprivation, my mind saw the indulgences around me and whispered of pleasures I could still grasp. A voice, quiet yet insistent, would murmur: You've done your share, allow yourself just this much. For hours, this thought rang unsettled in my mind.\n\nYet in spite of all temptation, I persisted. One hundred sixty-eight hours proved to myself, and to the host above, that I had mastered my flesh. My victory became a celebration, shared with every soul in reach of my arms, and I found gratification in my newness. Lifting my eyes, I saw my Father's house resting just atop the horizon. I took a step toward it.\n\nI fell.\n\nI fell, and I fell, and I fell again. Only two steps closer to His home, and I was already on my knees. What wisdom had this deprivation given me? Would a wise man fall so many times upon the same path? The journey was simple, a line straight and narrow, but great serpents coiled into my vision, their fangs bared with intent to devour. Beneath me, to either side, lay the beasts of the farm. Were I to fall among them, there would be no distinction between us. I was filthy. And with every step toward my Father's house, I stumbled once more.\n\nWhat in me is so deeply wry that I find comfort in the floor caked with filth? What misshapen mind finds crooked contentment in the husks that the swine did eat? They have never satisfied my desires. Even under great pressure, even under the weight of temptation, the surrender I gave to the serpents only buried their fangs deeper beneath my skin. They promised me relief. They promised me something better. Instead, they left me with a grief far worse than the hunger of the flesh. Were I to starve another hundred days and nights, I would not feel a hunger as deep as the one I now have for the Lord.\n\nIn my immaturity, I assumed the snakes would retreat if ignored, that boredom would drive them away. Instead, they stood resolute and watchful, never ceasing in their hunt, waiting for me to stumble.\n\nI take a step toward His house.",
  },
  {
    title: "The Rebuking of Loki",
    date: "2024",
    category: "Prose",
    excerpt:
      "Why should Loki's arbiter cast such a foolish and negligent euphoria on my platonic mind? The minions of the entangler have imposed themselves upon me with intentions malicious and fruitless.",
    full:
      "Why should Loki's arbiter cast such a foolish and negligent euphoria on my platonic mind? The minions of the entangler have imposed themselves upon me with intentions malicious and fruitless. Chaos is their agent, and in sowing the seeds of discord they have deprived the soil of its nutrients. Loki has no need for sacrifices of the flesh, but he takes delight at the lighting of a pyre beneath your sanity. Even in spite of knowing your benign intention, those stricken with Loki's curse find their innocence to yield feelings belonging only to your reasoning's antithesis.\n\nWhy do you send out your ambassadors to tempt me, Loki? Why does a fractured heart or a severed trust satiate your hunger? Oh Thor, should I ever loathe myself so much as to stoop into the worship of that filth, I plead you strike my scalp with Mjolnir's full strength.\n\nLoki, in your godhood you have laid down virtue and integrity on the altar of greed and pleasure. Though I may be driven to madness by those who realize your corrupted teachings, no madness shall ever lead so close to Hel as you have erected your eclectic throne.",
  },
];

export default function WritingPage() {
  return (
    <main>
      <PageHero
        planet="courses"
        kicker="Writing"
        title="Prose I have written"
        lede="Reflections written for nobody in particular, rough on purpose. My polished writing is in the courses and the consulting decks."
      />

      {PIECES.map((piece) => (
        <Section key={piece.title} title={piece.title} intro={`${piece.category}, ${piece.date}`}>
          <Prose>
            <blockquote style={{ whiteSpace: "pre-line" }}>{piece.excerpt}</blockquote>
            {piece.full && (
              <details>
                <summary className="ui-link" style={{ cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center" }}>Read the full piece</summary>
                <blockquote style={{ whiteSpace: "pre-line", marginTop: 16 }}>{piece.full}</blockquote>
              </details>
            )}
          </Prose>
        </Section>
      ))}

      <Section>
        <Prose>
          <p className="ui-muted">
            I keep more fiction drafts, essays and short pieces in a notebook nobody but God has seen yet. These are the ones I have chosen to publish.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
