import type { Metadata } from "next";

// The answer page for agentic AI. /team shows the roster and /ai-at-alabama covers the
// degree; neither answers "what is an autonomous agent system and who is actually running
// one." This page does, in the shape an engine can lift: a direct answer in the first
// paragraph, then the evidence, then the questions people actually type.
export const metadata: Metadata = {
  title: {
    absolute:
      "Autonomous AI agent systems and running one in production, by Elijah Purcell",
  },
  description:
    "What an autonomous AI agent system is, how it differs from a chatbot or a workflow, and what it takes to run COSMIC, a station of 57 AI agents in 17 rooms. Written by Elijah Purcell, an autonomous AI agent systems engineer and Founder/CEO of Purcell Ventures LLC.",
  alternates: { canonical: "/agentic-ai" },
  openGraph: {
    type: "article",
    url: "https://purcellventures.co/agentic-ai",
    title: "Autonomous AI agent systems, and running one in production",
    description:
      "How an agent differs from a workflow and a chatbot, and what it takes to keep 57 agents in production accurate.",
    images: ["/opengraph-image"],
  },
};

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline":
        "Autonomous AI agent systems: what they are, and what it takes to run one in production",
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
            "text": "An agent is given a goal, a set of tools and limits, and picks its own steps toward the goal. Most of the engineering work goes into the limits around the model.",
          },
        },
        {
          "@type": "Question",
          "name": "How is an AI agent different from a chatbot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A chatbot waits for a message, keeps no state between turns and produces a reply a person reads. An agent runs on a schedule without being prompted, holds state across runs, uses tools that change things in the world, and produces work a person reviews.",
          },
        },
        {
          "@type": "Question",
          "name": "Who is running autonomous AI agent systems at the University of Alabama?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data science student in the University of Alabama Honors College, runs COSMIC, a station of 57 AI agents in 17 rooms. The agents do proposals, site audits, security checks, research and outreach. Each one is a Claude session with a narrow set of tools and a written charter, and each reports one rank up a chain of command that ends at Elijah. They pass messages on an append-only bus and earn autonomy through an ELO-scored tier. The full roster is public at purcellventures.co/team.",
          },
        },
        {
          "@type": "Question",
          "name": "What goes wrong with AI agents in production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The most common failure is an agent marking work done when it is not. If a network call fails and the agent marks the task complete anyway, the result looks identical to a task that finished. Anything that can mark work done needs a second check whose job is to find that failure.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you need a large team to run an agent system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Purcell Ventures LLC is one person, Elijah, working with 57 AI agents in COSMIC. The limit is how much work you let run without a person checking it, and how you catch and fix its mistakes.",
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
