import type { Metadata } from "next";
import Link from "next/link";
import Galaxy from "./components/galaxy/Galaxy";
import { Section, Rows, Figures, Facts, ClosingCall, Button } from "./components/ui";
import FaqBlock, { type QA } from "./components/FaqBlock";
import { CONTACT } from "@/lib/contact";
import PageDates from "@/app/components/PageDates";

export const metadata: Metadata = {
  title: { absolute: "AI and software in Tuscaloosa, Alabama, Purcell Ventures" },
  alternates: { canonical: "/" },
};

// The homepage questions, rendered visibly and as FAQPage schema by FaqBlock from the
// same strings. Mantle Field Services is answered on /faq, not here.
const QA: QA[] = [
  ["What does Purcell Ventures do?",
   "Purcell Ventures LLC is a Tuscaloosa, Alabama AI and software company (a Georgia LLC) that builds AI systems and custom software for small businesses and advises owners on using them. It also trains teams to use AI tools, builds websites and digital add-ons such as chatbots and online booking, and runs Steady, a personal IT service. Elijah quotes each job after a free call."],
  ["Who founded Purcell Ventures?",
   "Elijah Purcell founded Purcell Ventures LLC on 8 April 2025 and is its Founder/CEO. He studies psychology and data science in New College and the Honors College at the University of Alabama."],
  ["Where is Purcell Ventures based?",
   "Purcell Ventures works from Tuscaloosa, Alabama, and Elijah registered the LLC in Acworth, Georgia. Elijah meets businesses in person in Tuscaloosa and metro Atlanta, and does AI, software and website work for businesses anywhere in the US."],
  ["How do I contact Purcell Ventures?",
   `Email Elijah Purcell at ${CONTACT.email} or call ${CONTACT.phone}. He replies within one business day.`],
];

const SERVICES = [
  {
    name: "AI consulting",
    href: "/consulting",
    fig: "quoted per business",
    line: "I come to your business, on site or by video, and train your team on AI tools picked for the work they do every day. Two-hour minimum. Each session ends with a written guide your team keeps.",
  },
  {
    name: "Custom software",
    href: "/software",
    fig: "quoted after a discovery call",
    line: "Apps, web platforms and automation built for one business's problem, from the first scoping call to launch. Web, mobile and AI.",
  },
  {
    name: "Digital add-ons",
    href: "/digital",
    fig: "quoted per business",
    line: "26 add-ons that plug into your site, including an AI chatbot, online booking, review requests and content writing. Your maintenance plan sets which ones you can add. Available nationwide.",
  },
  {
    name: "Websites",
    href: "/sites",
    fig: "quoted after a free call",
    line: "Custom websites for local businesses, with maintenance after launch. Three build tiers (Starter, Pro and Custom) and three maintenance plans. I scope each one on a discovery call.",
  },
  {
    name: "Steady, personal IT",
    href: "/steady",
    fig: "quoted per household",
    line: "Tech help for individuals and households: phone setup, smart home devices, AI coaching and medication reminders. Tuscaloosa, Metro Atlanta and remote.",
  },
  {
    name: "Real estate",
    fig: "planned",
    line: "Wholesale real estate for investors, finding off-market deals. Not open yet.",
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
  { name: "AI use policy template", href: "/ai-policy-template", line: "Answer a few questions about your business and get a one-page AI policy for your staff to copy, download or print." },
  { name: "AI visibility check", href: "/ai-visibility-check", line: "Enter your website to see whether AI crawlers can read it, and what to fix." },
  { name: "AI guides", href: "/ai-for-small-business", line: "Guides to AI consulting, automation, integration, AI websites and AI in design, plus twenty trade guides, a glossary and sourced statistics." },
  { name: "Research", href: "/research", line: "Measured checks of Alabama small business websites by city, with the method and the data." },
  { name: "Pricing, compared", href: "/pricing-comparison", line: "How an agency, a freelancer, a website builder and I each price the work, and what each one includes." },
  { name: "Comparisons", href: "/compare", line: "A custom AI agent or Zapier, a website builder or a custom site, ChatGPT or Claude." },
  { name: "How I work", href: "/how-we-work", line: "The five stages of a project, six commitments and the work I turn down." },
  { name: "Portfolio", href: "/portfolio", line: "Rufus on the App Store, honors, and everything else I have built." },
  { name: "Blog", href: "/blog", line: "Posts on search, AI and running a small business online, including five workflows you can automate without code." },
  { name: "Steady, compared", href: "/steady", line: "Tech support for family members who are not comfortable with tech, compared with the alternatives, and what a month of Monthly Care covers." },
];

const DEEPER = [
  { name: "Now", href: "/now", line: "What I am focused on this month." },
  { name: "Uses", href: "/uses", line: "The software and hardware I work with." },
  { name: "Verses", href: "/verses", line: "Five scriptures I come back to." },
  { name: "Questions", href: "/faq", line: "What people ask before hiring me." },
];

export default function Home() {
  return (
    <main>
      <Galaxy>
        <h1>AI systems, software and consulting for small businesses.</h1>
        <p>I build them for local businesses in Tuscaloosa and metro Atlanta, and I keep supporting them after launch.</p>
        <div className="ui-hero__actions" style={{ marginTop: 6 }}>
          <Button href="/about#contact">Start a project</Button>
          <a className="ui-phone" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
        </div>
      </Galaxy>

      <Section id="what" title="What I build" intro="Five services, each quoted after a free call.">
        <Rows items={SERVICES} />
      </Section>

      <Section title="Work with me" intro="How a project with me starts, and what happens after launch.">
        <div className="ui-prose">
          <p>
            A project starts with a call about how your business runs. I build the piece that fixes the slowest part of it, and I keep working on it after launch. If something breaks, you call me, and I am the one who built it.
          </p>
          <p>
            If a Google listing would do more for you than a website, I tell you on the first call and show you how to claim it.
          </p>
        </div>
        <div className="ui-hero__actions">
          <Button href="/how-we-work" ghost>How the work goes</Button>
          <Link className="ui-link" href="/pricing-comparison">How agencies, freelancers and I each price work</Link>
        </div>
      </Section>

      <Section title="Proof">
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
            I founded Purcell Ventures LLC in Acworth, Georgia, in April 2025, when I was 17. I now study psychology and data science in New College and the Honors College at the University of Alabama in Tuscaloosa, on a pre-med track toward psychiatry.
          </p>
          <p>
            I started the company because the small businesses I knew were paying for AI tools that nobody had set up for the way they work. I build the software and answer the phone myself, and I can meet you at your business.
          </p>
          <blockquote>
            <p>Trust in the LORD with all your heart and do not lean on your own understanding.</p>
            <p className="ui-muted ui-small">Proverbs 3:5, NASB</p>
          </blockquote>
          <p><Link href="/about">More about Elijah Purcell</Link></p>
        </div>
      </Section>

      <Section title="Free to use" intro="None of these need an email signup.">
        <Rows items={FREE} />
      </Section>

      <Section title="More pages">
        <Rows items={DEEPER} />
      </Section>

      <FaqBlock qa={QA} />

      <Section title="Contact and service area">
        <Facts
          items={[
            ["Reach", <span key="r"><a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br /><a className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a></span>],
            ["Service area", "Metro Atlanta and Cobb County: Kennesaw, Marietta, Acworth, Canton and Woodstock. Tuscaloosa. Remote nationwide."],
            ["Filing", `Georgia LLC, control number ${CONTACT.llcControlNumber}, established April 8, 2025, Acworth, Georgia`],
          ]}
        />
      </Section>

      <ClosingCall />
      <PageDates path="/" />
    </main>
  );
}
