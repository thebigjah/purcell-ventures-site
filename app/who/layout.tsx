import type { Metadata } from "next";

// THE ANSWER PAGE.
//
// "Who is Elijah Purcell" is a question query, and an AI Overview answers it by finding a
// page that literally answers it. He had no such page: the closest was an About page
// written in first person about a company. A search engine cannot lift "I'm 19 years old"
// out of a company page and present it as a fact about a named entity.
//
// So this page is written in the THIRD PERSON, states the name in the first sentence,
// and answers the sub-questions people actually ask alongside it. It exists to be quoted.

export const metadata: Metadata = {
  title: "Who Is Elijah Purcell? Founder of Purcell Ventures LLC",
  description:
    "Elijah Purcell is the teen founder of Purcell Ventures LLC, a Georgia software company, and a psychology and data science student at the University of Alabama Honors College on a pre-med track toward psychiatry.",
  alternates: { canonical: "https://purcellventures.co/who" },
  openGraph: {
    title: "Who Is Elijah Purcell?",
    description:
      "Teen founder of Purcell Ventures LLC. Psychology and data science at the University of Alabama, pre-med toward psychiatry. Builds autonomous AI agent systems.",
    url: "https://purcellventures.co/who",
    type: "profile",
    images: ["https://purcellventures.co/brand/elijah.jpg"],
  },
};

const QA: [string, string][] = [
  ["Who is Elijah Purcell?",
   "Elijah Purcell is the founder of Purcell Ventures LLC, a Georgia software company that builds websites and software for local businesses. He is a psychology and data science student at the University of Alabama Honors College, Class of 2030, on a pre-med track toward psychiatry. He founded the company at 17 and builds and operates autonomous AI agent systems that run the business day to day."],
  ["What does Elijah Purcell do?",
   "He designs and ships software end to end: websites for local businesses, mobile and web applications, and AI agent systems. He also works as an independent contractor with Mercor Intelligence, providing expertise to help improve models for a top AI lab."],
  ["What is Purcell Ventures LLC?",
   "Purcell Ventures LLC is a Georgia limited liability company founded by Elijah Purcell on 8 April 2025, control number 25075361. It builds websites, software and AI tooling for small businesses, and runs on a workforce of fifteen AI agents alongside its founder."],
  ["Where does Elijah Purcell study?",
   "He studies psychology and data science at the University of Alabama Honors College in Tuscaloosa, Alabama, Class of 2030, on a pre-med track toward psychiatry and research into AI in mental health."],
  ["How old is Elijah Purcell?",
   "He was born in August 2007 and turned 19 in August 2026. He founded Purcell Ventures LLC in April 2025, at 17."],
  ["Is Elijah Purcell the same person as the Elijah Purcell at Duke Energy?",
   "No. There are several people named Elijah Purcell. This one is the founder of Purcell Ventures LLC and a student at the University of Alabama in Tuscaloosa. He is not the human resources professional at Duke Energy, the football recruit in Knoxville, Tennessee, or any of the YouTube channels under that name."],
  ["How can I contact Elijah Purcell?",
   "By phone or text at (205) 462-7839, by email at elijah@purcell-ventures.com, or through purcellventures.co."],
  ["What did Elijah Purcell build?",
   "He built and runs UA Today, a campus events service for the University of Alabama that aggregates six separate sources into one page. He builds websites and software for local businesses through Purcell Ventures, including English Pruitt Photography. He also built and operates a fifteen-agent AI workforce that handles proposals, audits, compliance and outreach for the company; the roster is public at purcellventures.co/team."],
  ["Where is Elijah Purcell from?",
   "He grew up in Acworth, Georgia, in the Atlanta metro, and founded Purcell Ventures LLC there in April 2025. He moved to Tuscaloosa, Alabama in August 2026 to attend the University of Alabama."],
  ["What does Elijah Purcell write about?",
   "He writes about building software as a solo operator, about what AI agent systems actually do and where they fail, and about independent businesses near the University of Alabama in a reporting series called the Tuscaloosa Storefront Project. His writing is at purcellventures.co/blog."],
  ["Is Elijah Purcell a real company owner?",
   "Yes. Purcell Ventures LLC is registered with the Georgia Secretary of State, control number 25075361, formed 8 April 2025, and the filing is public. He is the sole member."],
  ["What is Elijah Purcell studying, and why that combination?",
   "Psychology and data science, on a pre-med track toward psychiatry. The combination is deliberate: he is interested in how AI can reduce the administrative load carried by mental health clinicians, which needs both the clinical side and the modelling side."],
  ["What faith does Elijah Purcell hold?",
   "He is a Christian. He leads worship as a bass-baritone vocalist and reads apologetics seriously, currently working through Lewis, Craig, McDowell and Tozer."],
];

export default function WhoLayout({ children }: { children: React.ReactNode }) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  // A ProfilePage declares what kind of page this is before a crawler reads a word, and
  // its mainEntity points at the canonical node rather than describing a fresh anonymous
  // person. Without the @id this page would introduce a second Elijah Purcell on the one
  // page whose entire job is to say there is only one.
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-08-20",
    mainEntity: { "@id": "https://purcellventures.co/#founder" },
    about: { "@id": "https://purcellventures.co/#founder" },
    url: "https://purcellventures.co/who",
    name: "Who Is Elijah Purcell?",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }}
      />
      {children}
    </>
  );
}

export { QA };
