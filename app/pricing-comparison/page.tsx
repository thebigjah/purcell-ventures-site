import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section, Rows, Button, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. Server component now: nothing on the page needed
// state. Every row, range and footnote from the old tables is here, with ranges written
// "5,000 to 15,000" and "/mo" spelled out.

interface Row {
  category: string;
  pv: string;
  agency: string;
  freelancer: string;
  diy: string;
}

const DIGITAL_ROWS: Row[] = [
  { category: "Website build, multi-page and modern", pv: "$650 setup and $99 a month", agency: "$10,000 and up", freelancer: "$1,500 to $5,000 for a custom build", diy: "Free to $50 a month on a builder such as Wix or Squarespace, or $400 to $1,500 once for a template set up for you" },
  { category: "AI chatbot trained on your business", pv: "Included from Starter up", agency: "$2,000 to $5,000 to build, plus $50 to $150 a month", freelancer: "$500 to $2,000, and you maintain it", diy: "Free with limits, or $20 a month for premium" },
  { category: "Online booking system", pv: "Included from Growth up", agency: "$3,000 to build, with Calendly at $12 a month on top", freelancer: "$800 to $2,000 custom", diy: "$12 to $15 a month (Calendly or Acuity)" },
  { category: "Email marketing platform", pv: "Included from Growth up", agency: "No platform fee, plus $500 to $1,500 a month for management", freelancer: "$300 to $800 a month retainer", diy: "$10 to $100 a month (Mailchimp or ConvertKit)" },
  { category: "CRM with pipeline tracking", pv: "Included in Full Service", agency: "$5,000 HubSpot setup, plus $150 to $1,800 a month", freelancer: "$1,000 setup, then you run it", diy: "$0 to $50 a user a month (HubSpot free or Pipedrive)" },
  { category: "Social media scheduling", pv: "Included from Growth up", agency: "$1,500 to $3,000 a month for full management", freelancer: "$500 to $1,500 a month for content and posting", diy: "$15 to $99 a month (Buffer or Later)" },
  { category: "Review management and responses", pv: "Included from Growth up", agency: "$300 to $800 a month", freelancer: "Charged per response", diy: "Manual, or $30 to $100 a month in tools" },
  { category: "Time from setup to live", pv: "7 to 10 business days for Starter, 14 to 21 for Pro", agency: "8 to 16 weeks", freelancer: "2 to 6 weeks", diy: "Hours to weeks, depending on you" },
  { category: "Maintenance and updates", pv: "Included", agency: "$150 to $300 an hour", freelancer: "$50 to $150 an hour", diy: "Your time" },
  { category: "Direct access to the owner", pv: "Yes. I reply within one business day", agency: "Usually through an account manager", freelancer: "Yes, one person", diy: "Not applicable" },
];

const CONSULTING_ROWS: Row[] = [
  { category: "1-on-1 AI consulting, 1 hour", pv: "$175 an hour, two-hour minimum", agency: "$250 to $500 an hour for enterprise consulting", freelancer: "$100 to $200 an hour at Upwork rates", diy: "Free, paid in your time learning" },
  { category: "Small group AI training, 8 people", pv: "$1,000 (8 × $125)", agency: "$3,000 to $8,000 for a corporate workshop", freelancer: "$800 to $2,000 for a group session", diy: "Free, watching YouTube as a group" },
  { category: "Half-day workshop, up to 20 people", pv: "$2,500 flat", agency: "$8,000 to $25,000 for corporate training", freelancer: "$2,000 to $5,000 for a group facilitator", diy: "Not practical at this scale" },
  { category: "Comes to your office", pv: "Yes, in Tuscaloosa and metro Atlanta, or remote", agency: "Yes, with travel fees", freelancer: "Sometimes", diy: "Not applicable" },
  { category: "Curriculum built for your industry", pv: "Yes", agency: "Sometimes, at extra cost", freelancer: "Depends on the freelancer", diy: "You build it" },
];

const CUSTOM_SOFTWARE_ROWS: Row[] = [
  { category: "Small project, a single tool or script", pv: "$1,500 to $3,500", agency: "$8,000 to $25,000 minimum engagement", freelancer: "$2,000 to $8,000", diy: "$0, plus weeks of your time" },
  { category: "Full mobile or web app", pv: "$5,000 to $15,000 and up", agency: "$25,000 to $150,000 and up", freelancer: "$10,000 to $50,000", diy: "Months, and it takes significant skill" },
  { category: "AI integration", pv: "Included in the scope", agency: "A specialty add-on from $5,000", freelancer: "Depends on skill", diy: "Self-taught" },
  { category: "Code ownership and transfer", pv: "Yours", agency: "Contracts often restrict the source code", freelancer: "Usually yours", diy: "Yours" },
  { category: "Owner on the build call", pv: "Yes. I scope it myself", agency: "Usually a project manager", freelancer: "One person, sometimes with contractors", diy: "Not applicable" },
  { category: "Discovery call before you commit", pv: "Free, 30 minutes", agency: "Free, often with a sales pitch", freelancer: "Usually free", diy: "Not applicable" },
];

function ComparisonTable({ rows }: { rows: Row[] }) {
  return (
    <div className="ui-prose" style={{ maxWidth: "none", overflowX: "auto" }}>
      <table style={{ minWidth: 820, display: "table" }}>
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
              <td className="ui-gold">{r.pv}</td>
              <td>{r.agency}</td>
              <td>{r.freelancer}</td>
              <td>{r.diy}</td>
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
        title="My prices next to agency, freelancer and DIY prices."
        lede="I publish my prices here beside typical prices from agencies, freelancers and do-it-yourself tools. The competitor figures are typical 2026 ranges for each category."
        meta="Websites from $650 setup and $99 a month. Consulting from $125 a person. Custom software from $1,500."
      />

      <Section stack title="Digital services" intro="Subscription tools that plug into your site.">
        <ComparisonTable rows={DIGITAL_ROWS} />
        <Footnote>
          Year-one cost of ownership: my Growth plan is <strong className="ui-gold">$2,848</strong> (700 setup + 179 × 12). The agency equivalent runs $30,000 to $80,000 bundled. Freelancers run $5,000 to $12,000, plus your time connecting the tools.
        </Footnote>
      </Section>

      <Section stack title="AI consulting">
        <ComparisonTable rows={CONSULTING_ROWS} />
        <Footnote>
          Workshop math: $2,500 for 20 people = <strong className="ui-gold">$125 a person</strong>. Enterprise training typically costs $400 to $1,500 a person.
        </Footnote>
      </Section>

      <Section stack title="Custom software">
        <ComparisonTable rows={CUSTOM_SOFTWARE_ROWS} />
        <Footnote>
          Custom software has the widest price spread. A $25,000 agency project and a $5,000 project from me can produce the same working app. Agencies charge more to cover overhead and project managers.
        </Footnote>
      </Section>

      <Section title="Why I can charge less">
        <Rows
          items={[
            { name: "Low overhead", line: "I do the work myself, and I am recruiting commissioned sales reps. No office and no middle management." },
            { name: "Reusable systems", line: "I start digital services sites from templates I adapt to each client, instead of building from scratch." },
            { name: "AI in my workflow", line: "I use AI for first drafts of code, content and structure, and I review every output." },
            { name: "Long-term clients", line: "A $99 a month subscriber who stays 3 years pays $3,564 over that time." },
            { name: "The owner on the call", line: "Most agencies pay a sales team 15 to 25% commission, an account manager and a project manager, plus margin. I am recruiting commissioned sales reps, and I am on every important call." },
          ]}
        />
      </Section>

      <Section title="When to hire someone else" intro="I point you elsewhere in these cases.">
        <Rows
          items={[
            { name: "A platform for 50 or more people with enterprise compliance, such as SOC 2 or HIPAA", line: "Hire a big agency (Accenture, Deloitte Digital) or a firm that specializes in your industry. I cannot take on that much compliance work." },
            { name: "A $200 to $500 monthly budget and a need for a website only", line: "Squarespace or Wix with a built-in template. You do not need me if you do not need AI tools, booking, a CRM or ongoing maintenance." },
            { name: "A retail point-of-sale system, or inventory at scale", line: "Shopify POS or Square. Those tools do this better than I do." },
            { name: "No idea where to start", line: <>Take the free <Link className="ui-link" href="/ai-readiness">AI readiness test</Link> first. If you score in the bottom tier, save your money and read for 6 months before you buy anything from anyone.</> },
          ]}
        />
      </Section>

      <Section title="The AI cost calculator" intro="A free tool for the return on AI spending.">
        <p className="ui-muted" style={{ marginTop: 0, maxWidth: "var(--measure)" }}>
          Enter your team size, hourly rate and current manual hours. The calculator shows a projected return and a payback period.
        </p>
        <div className="ui-hero__actions">
          <Button href="/ai-cost-calculator">Open the calculator</Button>
        </div>
      </Section>

      <ClosingCall
        title="A free first conversation"
        line={<>The first 30-minute conversation is free. I tell you which tier fits, or whether you need me at all. I reply within one business day. See <Link className="ui-link" href="/how-we-work">how I work</Link>.</>}
        button="Email Elijah"
        href={`mailto:${CONTACT.email}?subject=First%20conversation`}
      />
    </main>
  );
}
