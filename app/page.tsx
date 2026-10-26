import type { Metadata } from "next";
import Link from "next/link";
import Galaxy from "./components/galaxy/Galaxy";
import { Section, Rows, Figures, Facts, ClosingCall, Button } from "./components/ui";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// FAQ schema: the questions a search engine or an AI assistant is most likely to be asked
// about the company, answered in the same words the page uses.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Purcell Ventures do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Purcell Ventures LLC builds custom websites and maintains them, sells digital add-ons such as AI chatbots and online booking, trains business teams to use AI tools, builds custom software, and offers personal tech help for households through Steady. Field services such as gutter cleaning and pressure washing run separately under the Mantle Field Services brand.",
      },
    },
    {
      "@type": "Question",
      name: "Who founded Purcell Ventures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elijah Purcell founded Purcell Ventures LLC in April 2025 and is its Founder/CEO. He studies psychology and data science in the University of Alabama Honors College and lives in Tuscaloosa, Alabama. The company is registered in Georgia.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Purcell Ventures based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The LLC is registered in Acworth, Georgia, where Elijah formed it, and he runs it from Tuscaloosa, Alabama. Websites, digital add-ons and AI consulting are available nationwide. Mantle Field Services serves metro Atlanta: Kennesaw, Marietta, Acworth, Canton and Woodstock.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Purcell Ventures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Email Elijah Purcell at ${CONTACT.email} or call ${CONTACT.phone}.`,
      },
    },
  ],
};

const SERVICES = [
  {
    name: "Websites",
    href: "/sites",
    fig: "$400 setup, $99 a month",
    line: "Custom websites for local businesses, with maintenance after launch. Three build tiers (Starter, Pro and Custom) and three maintenance plans. I scope each one on a discovery call.",
  },
  {
    name: "Digital add-ons",
    href: "/digital",
    fig: "from $99 a month",
    line: "22 add-ons that plug into your site, including an AI chatbot, online booking, review requests and content writing. Your maintenance plan sets which ones you can add. Available nationwide.",
  },
  {
    name: "AI consulting",
    href: "/consulting",
    fig: "from $125 a person",
    line: "I come to your business, on site or by video, and train your team on AI tools picked for the work they do every day. Two-hour minimum. Each session ends with a written guide your team keeps.",
  },
  {
    name: "Custom software",
    href: "/software",
    fig: "scoped on a discovery call",
    line: "Apps, web platforms and automation built for one business's problem, from the first scoping call to launch. Web, mobile and AI.",
  },
  {
    name: "Steady, personal IT",
    href: "/steady",
    fig: "from $79 a month",
    line: "Tech help for individuals and households: phone setup, smart home devices, AI coaching and medication reminders. One-off sessions cost $99. Metro Atlanta and remote.",
  },
  {
    name: "Real estate",
    fig: "planned",
    line: "Wholesale real estate, finding off-market deals for investors. A sister channel that has not opened yet.",
  },
];

const COURSES = [
  {
    name: "The College Application Playbook",
    href: "/courses/college-apps",
    fig: "$297",
    line: "The process I used to earn 34 college acceptances: the school list, essays, financial aid and scholarship negotiation.",
  },
  {
    name: "The Business Launch Playbook",
    href: "/courses/business-launch",
    fig: "$397",
    line: "From an idea to an LLC to the first dollar. 7 modules, 26 lessons and a resource pack of templates and tools.",
  },
  {
    name: "Zero to Automated",
    href: "/courses/ai-automation",
    fig: "$397",
    line: "Email bots, YouTube pipelines, lead scrapers and personal AI assistants. 8 modules, 25 lessons and 7 code templates.",
  },
];

const FREE = [
  { name: "26 free AI tools", href: "/digital/tools", line: "An FAQ builder, content generator, palette tool, brand kit, logo concepts, review responder, estimate generator and more. No email signup." },
  { name: "AI readiness test", href: "/ai-readiness", line: "Ten questions that place your business in one of four tiers, each with next steps." },
  { name: "AI cost calculator", href: "/ai-cost-calculator", line: "Enter your team size, hourly rate and hours of manual work to see how long training takes to pay for itself." },
  { name: "Pricing, compared", href: "/pricing-comparison", line: "My prices next to typical agency, freelancer and do-it-yourself prices." },
  { name: "How we work", href: "/how-we-work", line: "The five-stage process, six commitments and the work I turn down." },
  { name: "Portfolio", href: "/portfolio", line: "17 projects: web apps, a mobile app, AI tools and internal systems." },
  { name: "Blog", href: "/blog", line: "Posts on search, AI and running a small business online, including five workflows you can automate without code." },
  { name: "Steady, compared", href: "/steady", line: "Tech support for family members who are not comfortable with tech, compared with the alternatives, and what a month of Monthly Care covers." },
];

const DEEPER = [
  { name: "Now", href: "/now", line: "What I am focused on this month." },
  { name: "Uses", href: "/uses", line: "My working stack, every tool in production." },
  { name: "Verses", href: "/verses", line: "Five scriptures I come back to." },
  { name: "Writing", href: "/writing", line: "Essays and posts I have written." },
  { name: "Questions", href: "/faq", line: "What people ask before hiring me." },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <Galaxy>
        <h1>Websites, AI training and software for small businesses in Tuscaloosa and metro Atlanta.</h1>
        <p>Every light on this map is a page. Click one to see what it does for a business like yours, or scroll for the plain version.</p>
        <div className="ui-hero__actions" style={{ marginTop: 6 }}>
          <Button href="/about#contact">Start a project</Button>
          <a className="ui-phone" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
        </div>
      </Galaxy>

      <Section id="what" title="What I build" intro="Five services and one person answering the phone. The prices are the real ones.">
        <Rows items={SERVICES} />
      </Section>

      <Section title="Work with me" intro="How a project with me starts, and what happens after launch.">
        <div className="ui-prose">
          <p>
            Most owners I meet have been sold a website or an AI tool by someone who never came back. I work the other way. We start with a call about how your business runs, I build the piece that fixes the bottleneck, and I stay on it after launch. You can reach the person who built it at the number on this page.
          </p>
          <p>
            If what you need is a Google listing and not a website, I tell you that on the first call and show you how to claim it.
          </p>
        </div>
        <div className="ui-hero__actions">
          <Button href="/how-we-work" ghost>How the work goes</Button>
          <Link className="ui-link" href="/pricing-comparison">Prices next to agencies and freelancers</Link>
        </div>
      </Section>

      <Section title="Proof" intro="Everything here is live and checkable.">
        <Figures
          items={[
            ["17", "shipped projects in the portfolio"],
            ["33", "posts on the blog"],
            ["26", "free AI tools, no signup"],
            ["April 2025", "founded, in Georgia"],
          ]}
        />
        <div className="ui-hero__actions" style={{ marginTop: 32 }}>
          <Button href="/portfolio" ghost>See the portfolio</Button>
          <Link className="ui-link" href="/case-studies">Case studies</Link>
          <Link className="ui-link" href="/agentic-ai">The AI agents that run outreach</Link>
        </div>
      </Section>

      <Section title="Courses" intro="Three self-paced courses with the waitlist open. Ask me and I will send the material I have so far.">
        <Rows items={COURSES} />
        <p style={{ marginTop: 20 }}><Link className="ui-link" href="/courses">All courses</Link></p>
      </Section>

      <Section title="Elijah Brent Purcell" intro="Founder/CEO">
        <div className="ui-prose">
          <p>
            I am nineteen. I founded Purcell Ventures LLC in April 2025 in Acworth, Georgia, at seventeen. I now study psychology and data science in the University of Alabama Honors College in Tuscaloosa, on a pre-med track toward psychiatry.
          </p>
          <p>
            I started the company because the small businesses I knew were paying for AI tools that nobody had set up for the way they work. I answer the phone, build the software and come to your business in person.
          </p>
          <blockquote>
            <p>Trust in the LORD with all your heart and do not lean on your own understanding.</p>
            <p className="ui-muted ui-small">Proverbs 3:5, NASB</p>
          </blockquote>
          <p><Link href="/about">More about Elijah Purcell</Link></p>
        </div>
      </Section>

      <Section title="Free to use" intro="Every tool, calculator, process note and post below is open, with no email signup.">
        <Rows items={FREE} />
      </Section>

      <Section title="Going deeper">
        <Rows items={DEEPER} />
      </Section>

      <Section title="Where and who">
        <Facts
          items={[
            ["Reach", <span key="r"><a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br /><a className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a></span>],
            ["Service area", "Metro Atlanta and Cobb County: Kennesaw, Marietta, Acworth, Canton and Woodstock. Tuscaloosa. Remote nationwide."],
            ["Sister company", "Mantle Field Services, metro Atlanta only"],
            ["Filing", `Georgia LLC, control number ${CONTACT.llcControlNumber}, established April 8, 2025, Acworth, Georgia`],
          ]}
        />
      </Section>

      <ClosingCall />
    </main>
  );
}
