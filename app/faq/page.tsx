import { PageHero, Section, Faq, Rows, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026 as a server component. The kit's Faq renders
// <details>, so every answer is in the HTML for crawlers, which is what the FAQPage schema
// below claims.
//
// Facts brought in line with the site in the rebuild: replies within one business day,
// the consulting prices, and the courses, which are not finished and have a waitlist.

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
      { q: "Where are you based?", a: "Tuscaloosa, Alabama. Purcell Ventures LLC is registered in Acworth, Georgia, where I formed it in April 2025, and I run it from Tuscaloosa, where I attend the University of Alabama. Local clients can meet me in person." },
      { q: "Do you take clients outside Tuscaloosa?", a: "For websites, digital services, AI consulting and software, yes, anywhere in the United States. For field work (gutter cleaning, pressure washing, lawn care), see Mantle Field Services, which serves metro Atlanta only." },
      // PRICING QUESTIONS. An answer engine cannot quote a number that is not written down.
      { q: "How much does a website cost?", a: "Websites start at $650 setup and $99 a month, which covers the site plus the tooling around it. For University of Alabama students and student-run businesses, a site is $500, with an optional $25 a month to keep it maintained and updated. Custom builds start at $1,500." },
      { q: "How much does AI consulting cost?", a: "Group sessions start at $125 a person. One-on-one sessions are $175 an hour. A workshop for up to 20 people is $2,500 flat. The first conversation is free and often ends with me telling you the problem is smaller than you thought, or that AI is the wrong tool for it." },
      { q: "What is the best way to start?", a: `Email ${CONTACT.email} with one sentence about what you are trying to do. Describe the goal rather than the thing you think needs building. I will tell you whether I can help and what the work would look like.` },
    ],
  },
  {
    label: "AI consulting",
    qas: [
      { q: "Do I need tech experience to benefit from a session?", a: "No. I design most sessions for people who have never used AI tools, and I start from what you already know." },
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
      { q: "How does the subscription work?", a: "You pick a tier: Starter ($99 a month plus $650 setup), Growth ($179 a month plus $700 setup) or Full Service ($279 a month plus $1,000 setup). After setup you pay a flat monthly rate with no contract, and you can cancel at any time. You reach every tool from one dashboard." },
      { q: "Can I mix and match tools from different tiers?", a: "Yes. The tiers are common starting points, and every account is custom. Tell me what you need and I will build that combination." },
      { q: "Will you migrate me off my existing tools?", a: "Yes. Most clients come from a mix of tools like Squarespace, Mailchimp and Google Forms. I move everything into one place during setup." },
      { q: "What happens if I cancel?", a: "Your data is yours. I export everything to you in standard formats, and there is no exit fee." },
    ],
  },
  {
    label: "Custom software",
    qas: [
      { q: "What kinds of projects do you take on?", a: "Web apps, mobile apps, AI integrations, browser extensions and automation tools. The best fit is a clear problem, one decision-maker and a budget between $1,500 and $15,000. If your project is bigger, I will say so and refer you to someone else." },
      { q: "What is the timeline for a small project?", a: "Most $1,500 to $3,500 projects ship 1 to 2 weeks after kickoff. Full apps take 3 to 8 weeks, depending on scope." },
      { q: "Do you write the code yourself?", a: "Yes. I work with Claude, Anthropic's AI, as a pair-programming partner, and I review and edit every line before it ships." },
      { q: "Can you maintain it after launch?", a: "Yes, either as a fixed-rate bug-fix retainer or as ongoing feature development. We decide what works for both of us at the end of the build." },
    ],
  },
  {
    label: "Courses",
    qas: [
      { q: "Are the courses available?", a: "Not yet. There are three courses, the waitlist is open, and none is finished. Ask me and I will send the material I have so far." },
      { q: "Will they be live or self-paced?", a: "Self-paced. Every lesson is planned as a video with a written takeaway, so you can work through a course in a weekend or over months." },
      { q: "Do I get lifetime access?", a: "Yes. One purchase covers the course and any future updates to its lessons." },
      { q: "Is there a refund policy?", a: "30 days. If the course does not deliver for you, email me within 30 days for a full refund." },
      { q: "Can I message you while taking a course?", a: "Yes. Email me any time and I will reply within one business day." },
    ],
  },
  {
    label: "The company",
    qas: [
      { q: "Are you nineteen?", a: "Yes. I have been building production software for a year. Every portfolio project links to a live site, and the full record is at /resume." },
      { q: "What is the logo based on?", a: "Bentham's panopticon, turned around. In Bentham's prison design, a hidden guard watches prisoners who can always be seen. In the logo, PV sits at the center in plain view, because the company is the one that answers for its work." },
      { q: "Why is it called Ventures?", a: "The company runs several separate ventures: websites, digital services, consulting, software, Steady, and real estate as a planned division. I build and test each one on its own." },
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
    </main>
  );
}
