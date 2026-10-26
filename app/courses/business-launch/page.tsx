import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero, Section, Figures, Rows, Tiers, Faq, Button, Note, Prose, Facts, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import WaitlistForm from "../WaitlistForm";

// THE BUSINESS LAUNCH PLAYBOOK, rebuilt on the page kit 26 Oct 2026.
//
// - The pay-in-full / payment-plan toggle is gone: each tier shows both prices at once.
// - Every enroll button points at #waitlist while the Lemon Squeezy account is not live.

type Lesson = { title: string; duration: string; format: string };
type Module = { title: string; totalMin: number; lessons: Lesson[] };

const MODULES: Module[] = [
  {
    title: "From idea to a tested concept", totalMin: 46,
    lessons: [
      { title: "Is your idea a business or a hobby?", duration: "11 min", format: "Camera" },
      { title: "Who your customer is: simple market research", duration: "13 min", format: "Camera and screen" },
      { title: "Testing demand before you spend a dollar", duration: "12 min", format: "Camera and screen" },
      { title: "Choosing a model: service, product, digital or a mix", duration: "10 min", format: "Camera" },
    ],
  },
  {
    title: "Legal setup and structure", totalMin: 42,
    lessons: [
      { title: "Sole proprietorship or LLC, and when each makes sense", duration: "9 min", format: "Camera" },
      { title: "Filing your LLC: a live walkthrough", duration: "14 min", format: "Screen share" },
      { title: "The EIN, the registered agent and the operating agreement", duration: "8 min", format: "Screen share" },
      { title: "Contracts that cover scope, payment and disputes", duration: "11 min", format: "Camera" },
    ],
  },
  {
    title: "Money, pricing and banking", totalMin: 47,
    lessons: [
      { title: "Opening a business bank account", duration: "10 min", format: "Screen share" },
      { title: "Pricing your offer: the math and the psychology", duration: "13 min", format: "Camera" },
      { title: "Invoicing, Stripe and collecting payment", duration: "11 min", format: "Screen share" },
      { title: "Taxes, bookkeeping and cash flow in year one", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    title: "Brand and presence", totalMin: 37,
    lessons: [
      { title: "Your brand: name, positioning and what you stand for", duration: "13 min", format: "Camera" },
      { title: "Your digital presence: a website, social accounts or both", duration: "12 min", format: "Camera and screen" },
      { title: "Your first piece of content that brings customers in", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    title: "Building and delivering the offer", totalMin: 31,
    lessons: [
      { title: "Defining what you sell and how you deliver it", duration: "10 min", format: "Camera" },
      { title: "Building your first deliverable", duration: "12 min", format: "Screen share" },
      { title: "Giving early customers more than they paid for, to build a reputation", duration: "9 min", format: "Camera" },
    ],
  },
  {
    title: "Getting your first customer", totalMin: 48,
    lessons: [
      { title: "Warm outreach to people you already know", duration: "11 min", format: "Camera" },
      { title: "Cold outreach scripts and follow-up", duration: "14 min", format: "Camera and screen" },
      { title: "The first sales conversation: what to say and when", duration: "12 min", format: "Camera" },
      { title: "Closing a sale without pressure", duration: "11 min", format: "Camera" },
    ],
  },
  {
    title: "Running it, growing it and the mental side", totalMin: 47,
    lessons: [
      { title: "The tools I run Purcell Ventures with", duration: "14 min", format: "Screen share" },
      { title: "Building a referral system from your first clients", duration: "11 min", format: "Camera" },
      { title: "Your first hire or your first automation", duration: "11 min", format: "Camera" },
      { title: "Fear, imposter syndrome and what keeps you going", duration: "11 min", format: "Camera" },
    ],
  },
];

const RESOURCES: [ReactNode, ReactNode][] = [
  ["Business model one-pager", "One page that defines what you are building, who it is for, how it makes money and how it differs from the competition. Used in Module 1."],
  ["Customer profile worksheet", "Questions that define your target customer: their problems, what makes them buy, their objections and where to find them. Used in lesson 1.2."],
  ["LLC filing checklist", "A checklist for forming an LLC in any state: articles, EIN, registered agent, operating agreement and bank account. Used in Module 2."],
  ["Pricing calculator", "A spreadsheet that works out your cost baseline and your floor price, tests different rates and projects revenue at different volumes. Used in lesson 3.2."],
  ["Brand positioning worksheet", "Questions that settle your name, positioning, tone and what you stand for in one sitting. Used in lesson 4.1."],
  ["Cold outreach script templates", "Outreach scripts for a service business, a product business and a general inquiry, with subject lines and follow-up emails. Used in lesson 6.2."],
];

const JOIN = <p style={{ marginTop: 18 }}><Button href="#waitlist" ghost>Join the waitlist</Button></p>;

const TIERS = [
  {
    name: "Self-paced",
    price: "$397, or 3 payments of $139",
    items: [
      "All 7 modules and 26 lessons",
      "Camera lessons, screen shares and written notes",
      "The full resource pack: 6 templates and worksheets",
      "The business model one-pager template",
      "The pricing calculator and cold outreach scripts",
      "Every lesson as it is released, and access for life",
    ],
    children: JOIN,
  },
  {
    name: "Coaching track",
    price: "$1,297, or 3 payments of $449",
    items: [
      "Everything in Self-paced",
      "Three monthly group Q&A sessions with me",
      "Recordings of every session",
      "Live feedback on your business, your offer and your pitch",
      "Access to the cohort community",
    ],
    children: JOIN,
  },
  {
    name: "One-on-one intensive",
    price: "$2,997, with payment plans available",
    items: [
      "Everything in the Coaching track",
      "Three hours one-on-one with me",
      "A review of your business plan and offer",
      "Sales strategy and pitch preparation",
      "Email me directly for 90 days",
    ],
    children: JOIN,
  },
];

const FAQS: { q: ReactNode; a: ReactNode }[] = [
  {
    q: "What kind of business is this for?",
    a: "Any kind. The course applies to a service business, a physical product, a digital product or a mix. My examples come from Purcell Ventures, which runs consulting, software, digital products and courses. Where the steps differ by type of business, I say so.",
  },
  {
    q: "I have no experience. Is this too advanced?",
    a: "No. The course assumes you start with nothing but an idea, and it walks through legal setup, banking, pricing and outreach from the beginning. I wrote it for people who have never done this and have no mentor who has.",
  },
  {
    q: "You are nineteen. Why take business advice from you?",
    a: "I founded Purcell Ventures at 17 and wrote down the tools, decisions and mistakes as I went. The course teaches the process I used while I still remember it clearly. I use the tools I recommend, and I made the mistakes I warn about.",
  },
  {
    q: "What is in the resource pack?",
    a: "Six templates and worksheets tied to specific lessons: a business model one-pager, a customer profile worksheet, an LLC filing checklist, a pricing calculator, a brand positioning worksheet and cold outreach script templates. The lessons that use them link to them, and every tier includes them.",
  },
  {
    q: "What if I already started a business?",
    a: "The money, legal, branding and sales modules still apply. People who start fast often skip the foundation and fix it later. The course helps you check what you set up correctly and what needs work, and you can move through the early modules quickly.",
  },
  {
    q: "How do the Coaching track and the one-on-one intensive differ?",
    a: "The Coaching track puts you in live group calls where you ask questions and I give feedback on your situation. The one-on-one intensive is private hours: we review your business plan and offer, work through your pitch and build your sales strategy together.",
  },
  {
    q: "I am still in high school and starting something. Is there anything else for me?",
    a: (
      <>
        The <Link className="ui-link" href="/courses/college-apps">College Application Playbook</Link> may help too. A business you started in high school gives you material for applications, essays and scholarship interviews.
      </>
    ),
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. If you start with Self-paced and want coaching, email me and I will credit what you paid toward the upgrade.",
  },
];

export default function BusinessLaunchPage() {
  return (
    <main>
      <PageHero
        planet="pricing"
        kicker="Course: The Business Launch Playbook"
        title="I started a company at 17. This course covers how."
        lede="I am Elijah Purcell. I founded Purcell Ventures at 17, and it now runs consulting, software, digital products and courses. The course walks through starting a business, from the idea to the legal entity to the first customer, with the tools and decisions I used."
        meta="Waitlist open. I am still recording the course."
        actions={<>
          <Button href="#waitlist">Join the waitlist</Button>
          <Button href="#curriculum" ghost>See what is inside</Button>
        </>}
      />

      <Section title="The course in numbers">
        <Figures
          items={[
            ["17", "My age when I founded the company"],
            ["7", "Modules"],
            ["26", "Lessons"],
            ["6", "Templates"],
          ]}
        />
      </Section>

      <Section title="Who it is for" intro="People with an idea and no roadmap.">
        <Rows
          items={[
            { name: "People with an idea and no roadmap", line: "You know what you want to build and not how to start. The course goes step by step: testing the idea, legal setup, pricing, the first customer and operations. It assumes no prior knowledge." },
            { name: "People already doing paid work on the side", line: "You have been taking paid work informally and want to make it official. The course covers LLC formation, banking and contracts." },
            { name: "Students starting something before they graduate", line: "A business you build in school shows on applications and in interviews. The course helps you set it up correctly from the start." },
            { name: "People leaving a job to work for themselves", line: "You have skills and want to sell them directly. For service businesses, consulting and freelancing, the course covers setup from the LLC to the first invoice and includes outreach scripts." },
          ]}
        />
      </Section>

      <Section
        id="curriculum"
        title="Seven modules, 26 lessons"
        intro="From an idea to an operating business. Camera lessons, screen shares of my tools and process, and written notes for every lesson. Planned length: 5 hours of video."
      >
        <Faq
          items={MODULES.map((m, i) => ({
            q: `Module ${i + 1}: ${m.title}, ${m.lessons.length} lessons, ${m.totalMin} min`,
            a: (
              <Prose>
                <ol>
                  {m.lessons.map((l) => (
                    <li key={l.title}>
                      {l.title} <span className="ui-muted ui-small">({l.format}, {l.duration})</span>
                    </li>
                  ))}
                </ol>
              </Prose>
            ),
          }))}
        />
      </Section>

      <Section title="Six templates and worksheets" intro="Every tier includes the full resource pack. The lessons that use each document link to it.">
        <Facts items={RESOURCES} />
      </Section>

      <Section title="What the course includes">
        <Rows
          items={[
            { name: "Built from my business", line: "Purcell Ventures runs consulting, software, digital products and courses. Every lesson is based on what I did, the tools I use and the mistakes I made." },
            { name: "Every decision documented", line: "Screen shares of the tools I use, the templates I built and the reasoning behind each decision." },
            { name: "Six documents to fill in", line: "The resource pack is six working documents: templates, a pricing calculator and outreach scripts. You fill them in and skip building them yourself." },
          ]}
        />
      </Section>

      <Section
        id="pricing"
        title="Pricing"
        intro="The course opens when recording is complete. Waitlist members get the early-access price."
      >
        <Tiers tiers={TIERS} />
        <div style={{ marginTop: 28 }}>
          <Note>Prices are in US dollars. Lemon Squeezy processes payments, and the access code arrives by email within 5 minutes of purchase.</Note>
        </div>
      </Section>

      <Section
        id="waitlist"
        title="The waitlist"
        intro="Waitlist members get the early-access price and hear first when the course opens. I send one email when enrollment opens."
      >
        <WaitlistForm course="business-launch" />
        <p className="ui-muted" style={{ marginTop: 20 }}>
          The course is not finished. Ask me and I will send the material I have so far:{" "}
          <a className="ui-link" href={`mailto:${CONTACT.email}?subject=Business%20Launch%20Playbook`}>{CONTACT.email}</a>.
        </p>
      </Section>

      <Section title="Questions">
        <Faq items={FAQS} />
        <p className="ui-muted" style={{ marginTop: 28 }}>
          Questions this page does not answer go to{" "}
          <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. I reply within one business day.
        </p>
      </Section>

      <ClosingCall
        title="One-on-one help"
        line="If you want me to look at your idea, your offer or your pitch, book a consulting session. I reply within one business day."
        button="See consulting"
        href="/consulting"
      />
    </main>
  );
}
