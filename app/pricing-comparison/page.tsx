import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section, Rows, Button, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. Server component now: nothing on the page needed
// state.
//
// 9 Nov 2026: reworked to compare how each option prices the work and what it includes.
// Elijah quotes every business after a free call, so no Purcell Ventures price appears here.
// The agency and freelancer dollar ranges went too, because they had no source.

interface Row {
  category: string;
  pv: string;
  agency: string;
  freelancer: string;
  diy: string;
}

const DIGITAL_ROWS: Row[] = [
  { category: "How the price is set", pv: "Quoted for your business after a free call, with setup and the monthly cost written out", agency: "A proposal after a sales process, often with a retainer", freelancer: "A project fee or an hourly rate, set by each freelancer", diy: "The builder's published plan, plus your own time" },
  { category: "Website build, multi-page and modern", pv: "Built and maintained for you", agency: "Built by a team, maintenance billed separately", freelancer: "Built for you, maintenance up to you", diy: "You build it on Wix or Squarespace" },
  { category: "AI chatbot trained on your business", pv: "Included in Full Service", agency: "A separate build, often with a monthly fee", freelancer: "A separate build that you maintain", diy: "A chatbot tool you set up and train" },
  { category: "Online booking system", pv: "Included in Full Service", agency: "A custom build or a third-party tool", freelancer: "A custom build or a third-party tool", diy: "A booking tool such as Calendly or Acuity" },
  { category: "Email marketing platform", pv: "Included in Full Service", agency: "Managed for a monthly retainer", freelancer: "Managed for a monthly retainer", diy: "A tool such as Mailchimp or ConvertKit" },
  { category: "CRM with pipeline tracking", pv: "An add-on from the Digital catalog, on any plan", agency: "Usually a HubSpot setup with a license", freelancer: "Set up once, then you run it", diy: "A free or paid CRM you set up" },
  { category: "Social media scheduling", pv: "Post templates and captions from Starter, scheduled posting in Full Service", agency: "Full management for a monthly retainer", freelancer: "Content and posting for a monthly retainer", diy: "A scheduler such as Buffer or Later" },
  { category: "Review management and responses", pv: "Reply drafts from Starter, automatic review requests from Growth", agency: "Managed for a monthly fee", freelancer: "Charged per response", diy: "Manual, or a review tool" },
  { category: "Time from setup to live", pv: "7 to 10 business days for Starter, 14 to 21 for Pro", agency: "8 to 16 weeks", freelancer: "2 to 6 weeks", diy: "Hours to weeks, depending on you" },
  { category: "Maintenance and updates", pv: "Included", agency: "Billed by the hour", freelancer: "Billed by the hour", diy: "Your time" },
  { category: "Direct access to the owner", pv: "Yes. I reply within one business day", agency: "Usually through an account manager", freelancer: "Yes, one person", diy: "Not applicable" },
];

const CONSULTING_ROWS: Row[] = [
  { category: "How the price is set", pv: "Quoted for your business after a free call, based on group size, length and prep", agency: "A proposal for an engagement, often with a minimum", freelancer: "An hourly rate or a session fee", diy: "Free, paid in your time learning" },
  { category: "1-on-1 AI consulting", pv: "Yes, two-hour minimum recommended", agency: "Usually for enterprise clients", freelancer: "Yes, often through a marketplace", diy: "Not applicable" },
  { category: "Small group AI training, 2 to 8 people", pv: "Yes, two-hour minimum", agency: "Usually as a corporate workshop", freelancer: "Sometimes", diy: "Watching videos as a group" },
  { category: "Half-day workshop, up to 20 people", pv: "Yes", agency: "Yes, as corporate training", freelancer: "Sometimes, with a group facilitator", diy: "Not practical at this scale" },
  { category: "Comes to your office", pv: "Yes, in Tuscaloosa and metro Atlanta, or remote", agency: "Yes, with travel fees", freelancer: "Sometimes", diy: "Not applicable" },
  { category: "Curriculum built for your industry", pv: "Yes", agency: "Sometimes, at extra cost", freelancer: "Depends on the freelancer", diy: "You build it" },
];

const CUSTOM_SOFTWARE_ROWS: Row[] = [
  { category: "How the price is set", pv: "Quoted after a free 30-minute discovery call, with the scope in writing", agency: "A proposal after discovery, often with a minimum engagement", freelancer: "A fixed bid or an hourly rate", diy: "Your time, often weeks or months" },
  { category: "Small project, a single tool or script", pv: "Yes", agency: "Often below their minimum", freelancer: "Yes", diy: "Possible with time and skill" },
  { category: "Full mobile or web app", pv: "Yes", agency: "Yes, with a larger team", freelancer: "Yes, sometimes with contractors", diy: "Months, and it takes significant skill" },
  { category: "AI integration", pv: "Included in the scope", agency: "Often a specialty add-on", freelancer: "Depends on skill", diy: "Self-taught" },
  { category: "Code ownership and transfer", pv: "Yours", agency: "Contracts often restrict the source code", freelancer: "Usually yours", diy: "Yours" },
  { category: "Owner on the build call", pv: "Yes. I scope it myself", agency: "Usually a project manager", freelancer: "One person, sometimes with contractors", diy: "Not applicable" },
  { category: "Discovery call before you commit", pv: "Free, 30 minutes", agency: "Free, often with a sales pitch", freelancer: "Usually free", diy: "Not applicable" },
];

function ComparisonTable({ rows }: { rows: Row[] }) {
  return (
    <div className="ui-prose pc-table" style={{ maxWidth: "none", overflowX: "auto" }}>
      <table style={{ display: "table" }}>
        <thead>
          <tr>
            <th scope="col">What you need</th>
            <th scope="col" className="ui-gold">Purcell Ventures</th>
            <th scope="col">Typical agency</th>
            <th scope="col">Freelancer</th>
            <th scope="col">Do it yourself</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.category}>
              <th scope="row">{r.category}</th>
              <td className="ui-gold" data-label="Purcell Ventures">{r.pv}</td>
              <td data-label="Typical agency">{r.agency}</td>
              <td data-label="Freelancer">{r.freelancer}</td>
              <td data-label="Do it yourself">{r.diy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Footnote({ children }: { children: ReactNode }) {
  return <p className="ui-muted" style={{ marginTop: 20, maxWidth: "var(--measure)" }}>{children}</p>;
}

export default function PricingComparisonPage() {
  return (
    <main>
      <PageHero
        planet="pricing"
        kicker="Pricing"
        title="How agencies, freelancers and I each price the work"
        lede="Each option sets its price a different way and includes different things. This page compares the method and what you get, so you know what to ask for."
        meta="I quote every business after a free call, with the scope in writing."
      />

      <Section stack title="Digital services" intro="Subscription tools that plug into your site.">
        <ComparisonTable rows={DIGITAL_ROWS} />
      </Section>

      <Section stack title="AI consulting">
        <ComparisonTable rows={CONSULTING_ROWS} />
      </Section>

      <Section stack title="Custom software">
        <ComparisonTable rows={CUSTOM_SOFTWARE_ROWS} />
        <Footnote>
          Custom software has the widest price spread of the three. Agencies carry overhead and project managers, and the quote reflects that. Ask any option for the scope in writing before you compare quotes.
        </Footnote>
      </Section>

      <Section title="What keeps my costs down">
        <Rows
          items={[
            { name: "Low overhead", line: "I do the work myself, with no office and no middle management." },
            { name: "Reusable systems", line: "I build client sites from templates I adapt to each business, instead of starting from scratch." },
            { name: "AI in my workflow", line: "I use AI for first drafts of code, content and structure, and I review every output." },
            { name: "Long-term clients", line: "Most of my work is maintenance for clients who stay, so I spend less time on sales." },
            { name: "The owner on the call", line: "Most agencies pay a sales team 15 to 25% commission, an account manager and a project manager, plus margin. I am recruiting commissioned sales reps, and I am on every important call." },
          ]}
        />
      </Section>

      <Section title="When to hire someone else" intro="In these cases I will send you to someone else.">
        <Rows
          items={[
            { name: "A platform for 50 or more people with enterprise compliance, such as SOC 2 or HIPAA", line: "Hire a big agency (Accenture, Deloitte Digital) or a firm that specializes in your industry. I cannot take on that much compliance work." },
            { name: "A small budget and a need for a website only", line: "Squarespace or Wix with a built-in template. You do not need me if you do not need AI tools, booking, a CRM or ongoing maintenance." },
            { name: "A retail point-of-sale system, or inventory at scale", line: "Shopify POS or Square. Those tools do this better than I do." },
            { name: "No idea where to start", line: <>Take the free <Link className="ui-link" href="/ai-readiness">AI readiness test</Link> first. If you score in the bottom tier, save your money and read for 6 months before you buy anything from anyone.</> },
          ]}
        />
      </Section>

      <Section title="The AI cost calculator" intro="A free tool that estimates the return on AI spending.">
        <p className="ui-muted" style={{ marginTop: 0, maxWidth: "var(--measure)" }}>
          Enter your team size, hourly rate and current manual hours. The calculator shows a projected return and a payback period.
        </p>
        <div className="ui-hero__actions">
          <Button href="/ai-cost-calculator">Open the calculator</Button>
        </div>
      </Section>

      <ClosingCall
        title="A free first conversation"
        line={<>The first 30-minute conversation is free. I tell you which option fits, quote it for your business, or tell you whether you need me at all. I reply within one business day. See <Link className="ui-link" href="/how-we-work">how I work</Link>.</>}
        button="Email Elijah"
        href={`mailto:${CONTACT.email}?subject=First%20conversation`}
      />
    </main>
  );
}
