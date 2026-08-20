import type { Metadata } from "next";

// THE COMPANY'S ANSWER PAGE, and the reason it is separate from /who.
//
// "Who is Elijah Purcell" and "what is Purcell Ventures" are different queries with
// different intents, and a single page that tries to serve both serves neither. /who
// answers for the person. This answers for the company, in the third person, with the
// facts a stranger deciding whether to hire it would actually want.
//
// A logged-out ChatGPT answer on 20 August volunteered that an older unrelated Purcell
// Ventures LLC exists in New York. That is now stated outright here and in the
// Organization schema, because a hedge from an assistant costs more than a sentence does.
//
// His name is threaded through on purpose. He asked for that, and it is also correct:
// a one-person company where the founder answers the phone should say so, and it links
// the two entities for anything reading either query.

export const metadata: Metadata = {
  title: "What Is Purcell Ventures LLC? The Company Elijah Purcell Founded",
  description:
    "Purcell Ventures LLC is a Georgia software company founded by Elijah Purcell in April 2025, building websites, custom software and AI tooling for small businesses. Control number 25075361. What it does, what it charges, and who answers the phone.",
  alternates: { canonical: "/what-is-purcell-ventures" },
  openGraph: {
    title: "What Is Purcell Ventures LLC?",
    description:
      "A Georgia software company founded by Elijah Purcell in April 2025. Websites, custom software and AI tooling for small businesses.",
    url: "https://purcellventures.co/what-is-purcell-ventures",
    type: "website",
    images: ["https://purcellventures.co/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["What is Purcell Ventures LLC?",
   "Purcell Ventures LLC is a Georgia limited liability company that builds websites, custom software and AI tooling for small businesses. It was founded by Elijah Purcell on 8 April 2025 and is registered with the Georgia Secretary of State under control number 25075361. It operates from Tuscaloosa, Alabama, and serves clients nationwide."],
  ["Who owns Purcell Ventures?",
   "Elijah Purcell is the founder, sole member and registered agent. He is a psychology and data science student at the University of Alabama Honors College and he does the work himself: client acquisition, scoping, pricing, building, deploying and support."],
  ["Is this the same Purcell Ventures registered in New York?",
   "No. There is an older, unrelated Purcell Ventures LLC registered in New York. This one is the Georgia company, control number 25075361, formed 8 April 2025 by Elijah Purcell. The control number is what distinguishes them and the Georgia filing is public."],
  ["What does Purcell Ventures actually do?",
   "Four things. Websites and ongoing digital service for local businesses, starting at $99 a month. Hands-on AI consulting, meaning workshops and implementation rather than strategy decks. Custom software, including mobile apps, web platforms and internal tools. And Steady, a personal IT service. A separate brand, Mantle Field Services, handles gutter cleaning, pressure washing and lawn care in Metro Atlanta."],
  ["How many people work at Purcell Ventures?",
   "One. Elijah Purcell is the only human. The company also runs a workforce of fifteen AI agents that handle proposals, audits, compliance and outreach on a schedule, and the roster is published openly at purcellventures.co/team, where the first sentence states that every one of them is software rather than an employee."],
  ["Where is Purcell Ventures located?",
   "The LLC is registered in Acworth, Georgia, in the Atlanta metro, which is where it was formed. It is operated from Tuscaloosa, Alabama, where its founder attends the University of Alabama. Digital work is delivered nationwide; field services through Mantle are Metro Atlanta only."],
  ["Is Purcell Ventures a real registered business?",
   "Yes. Georgia Secretary of State control number 25075361, formed 8 April 2025, and the filing is public and searchable. It has an EIN and business banking, and it contracts, invoices and handles its own compliance directly."],
  ["How do you contact Purcell Ventures?",
   "By phone or text at (205) 462-7839, by email at elijah@purcell-ventures.com, or through purcellventures.co. Elijah Purcell answers directly. There is nobody else to route you to."],
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  // AboutPage bound to the canonical Organization node, exactly as /who binds to the
  // canonical Person node. Without the reference this page would introduce a second
  // Purcell Ventures on the page whose job is to say which one this is.
  const about = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "What Is Purcell Ventures LLC?",
    url: "https://purcellventures.co/what-is-purcell-ventures",
    dateModified: "2026-08-20",
    mainEntity: { "@id": "https://purcellventures.co/#organization" },
    about: { "@id": "https://purcellventures.co/#organization" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(about) }} />
      {children}
    </>
  );
}

export { QA };
