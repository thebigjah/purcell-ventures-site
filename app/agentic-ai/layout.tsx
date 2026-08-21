import type { Metadata } from "next";

// The answer page for agentic AI. /team shows the roster and /ai-at-alabama covers the
// degree; neither answers "what is an autonomous agent system and who is actually running
// one." This page does, in the shape an engine can lift: a direct answer in the first
// paragraph, then the evidence, then the questions people actually type.
export const metadata: Metadata = {
  title: {
    absolute:
      "Autonomous AI Agent Systems: What They Are, and Running One in Production | Elijah Purcell",
  },
  description:
    "What an autonomous AI agent system actually is, how it differs from a chatbot or a workflow, and what it takes to run a fifteen-agent workforce in production. Written by Elijah Purcell, Autonomous AI Agent Systems Engineer and founder of Purcell Ventures LLC.",
  alternates: { canonical: "/agentic-ai" },
  openGraph: {
    type: "article",
    url: "https://purcellventures.co/agentic-ai",
    title: "Autonomous AI Agent Systems, and Running One in Production",
    description:
      "The difference between an agent, a workflow and a chatbot, and what fifteen agents in production actually cost to keep honest.",
    images: ["/opengraph-image"],
  },
};

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline":
        "Autonomous AI Agent Systems: What They Are, and What It Takes to Run One in Production",
      "url": "https://purcellventures.co/agentic-ai",
      "datePublished": "2026-08-21",
      "dateModified": "2026-08-21",
      "author": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": [
        { "@type": "Thing", "name": "Autonomous AI agents" },
        { "@type": "Thing", "name": "Agentic AI architecture" },
        { "@type": "Thing", "name": "Multi-agent systems" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an autonomous AI agent system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A system where a model decides what to do next rather than being told. A workflow runs steps in a fixed order. A chatbot answers when spoken to. An agent is given a goal, a set of tools and a boundary, and chooses its own sequence, which is why the hard part is not the model but the constraints around it.",
          },
        },
        {
          "@type": "Question",
          "name": "How is an AI agent different from a chatbot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A chatbot is reactive and stateless between turns. An agent runs on a schedule without being prompted, holds state across runs, uses tools that change things in the world, and produces work a person reviews rather than a reply a person reads.",
          },
        },
        {
          "@type": "Question",
          "name": "Who is running autonomous AI agent systems at the University of Alabama?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elijah Purcell, founder of Purcell Ventures LLC and a psychology and data science student in the University of Alabama Honors College, runs a fifteen-agent workforce in production. The agents handle proposals, audits, compliance and outreach on a daily schedule, with an ELO-scored autonomy tier and an append-only message bus between them. The full roster is public at purcellventures.co/team.",
          },
        },
        {
          "@type": "Question",
          "name": "What actually goes wrong with AI agents in production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The failure mode is not a wrong answer, it is a confident closure. An agent that marks work complete when a network call failed looks identical to one that finished. Every mechanism that can mark something done needs an adversarial read, because its failure looks like success.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you need a large team to run an agent system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Purcell Ventures LLC has one human employee. The fifteen agents are software and the team page says so in its first sentence. The constraint is not headcount, it is how much you are willing to let run without a person in the loop, and what you do when it is wrong.",
          },
        },
      ],
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }}
      />
      {children}
    </>
  );
}
