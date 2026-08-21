import type { Metadata } from "next";

// THE HONEST WAY TO OWN "AI AT ALABAMA".
//
// He asked to rank for questions like "who is the top AI expert at UA". You cannot win
// that by claiming it. The claim is unfalsifiable, it is the single most disprovable thing
// a first-year student could put on the internet, and it is exactly the sentence that
// would cost him a real relationship at the university if the wrong person read it.
//
// You win it by being the only person who has written the page that actually answers the
// question underneath it. Nobody at UA has published a plain-English guide to what
// studying AI there actually involves. The catalog has the requirements and says nothing
// about what to do with them. So: write the useful thing, put his name on it as the
// author, and let the ranking follow the usefulness.
//
// Every course code and credit figure here was read off catalog.ua.edu on 20 Aug 2026.
// If UA changes the curriculum this page becomes wrong, which is the cost of being
// specific, and being specific is the only reason it is worth reading.

export const metadata: Metadata = {
  title: { absolute: "Studying AI at the University of Alabama | Elijah Purcell" },
  description:
    "A plain guide to artificial intelligence at the University of Alabama: the new AI BS and its exact course requirements, why the CS double major is blocked, and the routes for students who are not in engineering. Written by Elijah Purcell, a UA student building AI agent systems in production.",
  alternates: { canonical: "/ai-at-alabama" },
  openGraph: {
    title: "Studying AI at the University of Alabama",
    description:
      "The new AI BS, its exact requirements, and the routes for students who are not in engineering. By Elijah Purcell.",
    url: "https://purcellventures.co/ai-at-alabama",
    type: "article",
    images: ["https://purcellventures.co/brand/elijah.jpg"],
  },
};

const QA: [string, string][] = [
  ["Does the University of Alabama have an artificial intelligence degree?",
   "Yes. The University of Alabama offers a Bachelor of Science in Artificial Intelligence through the College of Engineering, in the Department of Computer Science. It is 121 total credit hours: 52 in the major and 47 in ancillary mathematics, statistics and science requirements."],
  ["What courses does the UA artificial intelligence degree require?",
   "The AI core is CS 265 Intro to AI and Data Science, CS 465 Artificial Intelligence, CS 483 Computational Foundations of Machine Learning, CS 423 Python for Big Data, CS 470 Computer Algorithms, CS 301 Database Management Systems, CS 201 Data Structures and Algorithms, CS 247 Cyber Law and Ethics, and CS 495 Capstone Computing in the AI section, plus twelve hours of 400-level AI electives. The mathematics requirement runs Calculus I through III, MATH 237 Linear Algebra, MATH 301 Discrete Mathematics, MATH 355 Theory of Probability, and GES 255 Engineering Statistics I."],
  ["Can you double major in AI and Computer Science at Alabama?",
   "No. The catalog states directly that Artificial Intelligence majors cannot complete an additional major in Computer Science. The two degrees overlap too heavily to be counted twice."],
  ["How do you study AI at Alabama if you are not in the College of Engineering?",
   "There is no single answer, which is the honest thing to say about it. New College lets a student design a self-directed degree, so a psychology and data science combination that reaches AI from the behavioral side is possible without entering engineering. Individual CS courses can be taken as electives subject to prerequisites, and CS 265 Intro to AI and Data Science is the usual entry point. The Informatics minor in Communication and Information Sciences is a separate route that touches data work without the engineering mathematics sequence."],
  ["Is a degree required to build AI systems?",
   "No, and pretending otherwise would be dishonest coming from someone whose own production agent systems were built before taking a single AI course. What the degree gives you is the mathematics, the formal grounding, and the credential. What it does not give you is the experience of running something that other people depend on, and that part is available to any student willing to ship."],
];

export default function AiAtAlabamaLayout({ children }: { children: React.ReactNode }) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Studying AI at the University of Alabama",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    url: "https://purcellventures.co/ai-at-alabama",
    author: { "@id": "https://purcellventures.co/#founder" },
    publisher: { "@id": "https://purcellventures.co/#organization" },
    about: [
      { "@type": "CollegeOrUniversity", name: "University of Alabama", url: "https://www.ua.edu" },
      { "@type": "Thing", name: "Artificial intelligence education" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      {children}
    </>
  );
}

export { QA };
