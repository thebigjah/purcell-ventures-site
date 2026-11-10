import { PageHero, Section, Faq, Rows, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import PageDates from "@/app/components/PageDates";

// Rebuilt on the page kit 26 Oct 2026 as a server component. The kit's Faq renders
// <details>, so every answer is in the HTML for crawlers, which is what the FAQPage schema
// below claims.
//
// Facts brought in line with the site in the rebuild: replies within one business day,
// how quotes work, and the courses, which are not finished and have a waitlist.

interface QA {
  q: string;
  a: string;
}

const FAQS: { label: string; qas: QA[] }[] = [
  {
    label: "Working with me",
    qas: [
      { q: "Who will I talk to?", a: "Me, Elijah Purcell. I handle your project myself from the first message to the final delivery." },
      { q: "How fast do you respond?", a: `I reply within one business day. If you need an answer sooner, call or text ${CONTACT.phone}.` },
      { q: "Where are you based?", a: "Tuscaloosa, Alabama. I formed and registered Purcell Ventures LLC in Acworth, Georgia, in April 2025, and I run it from Tuscaloosa, where I attend the University of Alabama. Local clients can meet me in person." },
      { q: "Do you take clients outside Tuscaloosa?", a: "For AI consulting, software, digital services and websites, yes, anywhere in the United States. For field work (gutter cleaning, pressure washing, lawn care), see Mantle Field Services, which serves metro Atlanta only." },
      // PRICING QUESTIONS. From 9 Nov 2026 Elijah quotes every business after a free call, so
      // these answers explain how a quote works and give no number.
      { q: "How much does a website cost?", a: "I quote every website for the business after a free call. The quote covers the build, the tooling around it and the monthly maintenance, and you see it in writing before any work starts." },
      { q: "How much does AI consulting cost?", a: "Every session is quoted for your business after a free call, based on group size, length and prep. That first conversation is free and often ends with me telling you the problem is smaller than you thought, or that AI is the wrong tool for it." },
      { q: "What is the best way to start?", a: `Email ${CONTACT.email} with one sentence about what you are trying to do. Describe the goal rather than the thing you think needs building. I will tell you whether I can help and what the work would look like.` },
    ],
  },
  {
    label: "AI consulting",
    qas: [
      { q: "Do I need tech experience to benefit from a session?", a: "No. I design most sessions for people who have never used AI tools, and I begin with what you already know." },
      { q: "What do participants need to bring?", a: "A laptop or tablet. I bring the setup, the demos, the exercises and a written guide you keep." },
      { q: "Can you come to our office?", a: "Yes. I come to your office, so the examples use your team's own work." },
      { q: "How is this different from using ChatGPT on my own?", a: "I show you prompting techniques, integrations and workflows chosen for your type of business, and you practice them on your own tasks during the session." },
      { q: "Will this lead to a sales pitch for your other services?", a: "Only if it fits. Consulting is a separate service. If I see something in your business I could build for you, I mention it once, outside the session." },
      { q: "How far in advance do I need to book?", a: "Usually 1 to 2 weeks for standard sessions. Custom trainings need more preparation, so reach out as early as you can." },
    ],
  },
  {
    label: "Digital services",
    qas: [
      { q: "How does the subscription work?", a: "You pick a tier: Starter, Growth or Full Service. I quote setup and the monthly cost for your business after a free call. After setup you pay the same amount each month with no contract, and you can cancel at any time. You reach every tool from one dashboard." },
      { q: "Can I mix and match tools from different tiers?", a: "Yes. The tiers are common starting points, and every account is custom. Tell me what you need and I will build that combination." },
      { q: "Will you migrate me off my existing tools?", a: "Yes. Most clients come from a mix of tools like Squarespace, Mailchimp and Google Forms. I move everything into one place during setup." },
      { q: "What happens if I cancel?", a: "Your data is yours. I export everything to you in standard formats, and there is no exit fee." },
    ],
  },
  {
    label: "Custom software",
    qas: [
      { q: "What kinds of projects do you take on?", a: "Web apps, mobile apps, AI integrations, browser extensions and automation tools. The best fit is a clear problem and one decision-maker. If your project is bigger than I can take on, I will say so and refer you to someone else." },
      { q: "What is the timeline for a small project?", a: "Most small projects ship 1 to 2 weeks after kickoff. Full apps take 3 to 8 weeks, depending on scope." },
      { q: "Do you write the code yourself?", a: "Yes. I work with Claude, Anthropic's AI, as a pair-programming partner, and I review and edit every line before it ships." },
      { q: "Can you maintain it after launch?", a: "Yes, either as a fixed-rate bug-fix retainer or as ongoing feature development. We decide what works for both of us at the end of the build." },
    ],
  },
  {
    label: "Courses",
    qas: [
      { q: "Are the courses available?", a: "Not yet. There are three courses, the waitlist is open, and I have not finished any of them. Ask me and I will send the material I have so far." },
      { q: "Will they be live or self-paced?", a: "Self-paced. I am planning every lesson as a video with a written takeaway, so you can work through a course in a weekend or over months." },
      { q: "Do I get lifetime access?", a: "Yes. One purchase covers the course and any future updates to its lessons." },
      { q: "Is there a refund policy?", a: "30 days. If the course does not help you, email me within 30 days for a full refund." },
      { q: "Can I message you while taking a course?", a: "Yes. Email me any time and I will reply within one business day." },
    ],
  },
  {
    label: "The company",
    qas: [
      { q: "Are you nineteen?", a: "Yes. I have been building production software for a year. Every portfolio project links to a live site, and the full record is at /resume." },
      { q: "What is the logo based on?", a: "Bentham's panopticon, turned around. In Bentham's prison design, a hidden guard can see every prisoner at all times. In the logo, PV sits at the center in plain view, because the company is the one that answers for its work." },
      { q: "Why is it called Ventures?", a: "The company runs several separate ventures: consulting, software, digital services, websites, Steady, and real estate as a planned division. I build and test each one on its own." },
      { q: "Who owns Mantle Field Services?", a: "I do. It is a sister brand to Purcell Ventures, with its own sales operation." },
    ],
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((section) =>
    section.qas.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <main>
      <PageHero
        kicker="Questions"
        title="The questions clients ask most"
        lede="Prices, response times, consulting sessions, digital services, custom software, the courses and the company. If your question is missing, email me."
        meta="Revised October 2026"
      />

      {FAQS.map((section) => (
        <Section key={section.label} title={section.label}>
          <Faq items={section.qas} />
        </Section>
      ))}

      <Section title="An FAQ for your business" intro="A free tool.">
        <Rows items={[{
          name: "The AI FAQ Builder",
          line: "Describe your business and it writes 6 to 10 questions and answers you can paste into your site.",
          fig: "Try the tool",
          href: "/digital/tools/faq-builder",
        }]} />
      </Section>

      <ClosingCall
        title="A question that is not here"
        line="Email me and I will answer it. I reply within one business day."
        button="Email me"
        href={`mailto:${CONTACT.email}`}
      />
      {/* After the hero: the hero must be the first child of <main> for the padding rule. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <PageDates path="/faq" />
    </main>
  );
}
