import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Prose } from "@/app/components/ui";
import { RefTracker } from "./RefTracker";
import { BuyButton } from "./BuyButton";

/**
 * /shop/starter-kit
 *
 * One-time $19 self-serve digital download. Stripe Checkout handles payment and
 * delivery. Env var: STARTER_KIT_PAYMENT_LINK = full Stripe Checkout URL.
 *
 * Affiliate tracking: ?ref=name in the URL captures the referrer and BuyButton appends
 * it to the Stripe URL. The closing button is a plain link to the same payment link
 * with no referral, as it was before the 26 Oct 2026 rebuild.
 */

export const metadata: Metadata = {
  title: "The PV AI Starter Kit, $19",
  description:
    "The Purcell Ventures sales and AI files: 24 AI tool prompts, the sales scripts, a contractor template, a CRM CSV and more than 50 email templates. $19 once.",
};

const PAYMENT_LINK = process.env.STARTER_KIT_PAYMENT_LINK || "#configure-stripe";

const KIT_CONTENTS = [
  {
    folder: "01-ai-prompts/",
    title: "24 production AI tool system prompts",
    items: ["FAQ Builder", "Content Generator", "Caption Generator", "Color Palette", "Brand Kit Builder", "Logo Concepts", "Business Card Copy", "Social Templates", "Review Response", "Email Composer", "SMS Composer", "Estimate Generator", "Cold Email Audit", "Hiring Job Posting", "Customer Persona Builder", "Pricing Page Audit", "Customer Onboarding Sequence", "Win-Back Email", "Meeting Agenda Generator", "About Page Writer", "Tagline Generator", "SOP Writer", "Lead Magnet Idea Generator", "The 8 internal sales-coach prompts"],
    blurb: "The Claude and GPT system prompts behind the Purcell Ventures AI tools. Paste them into the AI you use. Each prompt sets a quality bar, an output structure and ethical limits.",
  },
  {
    folder: "02-sales-scripts/",
    title: "5 closing frameworks and 3 follow-up schedules",
    items: ["Soft-close framework", "Demo-close framework", "Objection-handling framework", "Pilot Partner pitch script", "Final-touch and exit-permission script", "Follow-up schedule for days 1, 3 and 7", "Follow-up schedule for days 14 and 30", "Re-pitch after a 90-day pause"],
    blurb: "Word-for-word scripts from the rep handbook, with timing, what to listen for and when to escalate.",
  },
  {
    folder: "03-handbook/",
    title: "The full rep handbook, edited for resale",
    items: ["Onboarding flow", "Compensation tiers", "Ethical limits: the list of what a rep must never do", "Common objection responses", "Escalation rules", "A backup framework for the middle of a call", "A checklist for after every call"],
    blurb: "The handbook Purcell Ventures reps use, including the list of things a rep must never do to close a sale.",
  },
  {
    folder: "04-templates/",
    title: "Operating templates",
    items: ["1099 contractor agreement, with a guardian co-sign block for reps under 18", "CRM CSV template with 12 fields and 10 sample rows", "Email templates: cold outreach, day-3 follow-up, Pilot Partner pitch, final touch", "Steady comparison framework", "Pricing reference card"],
    blurb: "Edit your name and business into each template and it is ready to use.",
  },
  {
    folder: "05-cold-outreach/",
    title: "More than 50 cold outreach email templates",
    items: ["Cold openers by industry: salon, plumbing, dental, real estate, law, marketing, e-commerce, wellness, veterinary, accounting", "5 referral-based openers", "5 LinkedIn message scripts", "A subject line library of 40 tested options", "A token replacement guide"],
    blurb: "Cold outreach templates that give the prospect a specific reason for the email.",
  },
];

export default function StarterKitPage() {
  return (
    <main>
      <RefTracker product="starter-kit" />
      <PageHero
        kicker="Shop: the PV AI Starter Kit"
        title="My AI prompts, sales scripts and rep handbook for $19."
        lede="The Purcell Ventures AI Starter Kit has 24 AI tool prompts, 5 sales scripts, the rep handbook, more than 50 cold outreach templates, a 1099 contractor template and a CRM CSV. Every file is editable and yours to keep."
        meta="One-time download. Checkout through Stripe, delivery by email, 30-day refund."
        actions={<BuyButton paymentLink={PAYMENT_LINK} product="starter-kit" price="$19" size="large" />}
      />

      <Section title="What is inside" intro="One ZIP with 5 folders of markdown files and a PDF index.">
        <div className="ui-entries">
          {KIT_CONTENTS.map((s) => (
            <article className="ui-entry" key={s.folder}>
              <div>
                <h3>{s.title}</h3>
                <p className="ui-entry__org"><code>{s.folder}</code></p>
              </div>
              <div className="ui-entry__body">
                <p>{s.blurb}</p>
                <details>
                  <summary className="ui-link" style={{ cursor: "pointer", padding: "10px 0", minHeight: 44 }}>
                    Show {s.items.length} files
                  </summary>
                  <ul>
                    {s.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Who it fits">
        <Rows
          items={[
            {
              name: "A good fit if",
              line: (
                <>
                  You run a small business and want AI prompts you can paste in today. You are building a sales team and need scripts and a handbook. You are a freelancer or consultant pitching small businesses. You pay $200 a month for AI tools you do not use. You want to see how a working sales operation runs.
                </>
              ),
            },
            {
              name: "Skip it if",
              line: (
                <>
                  You want managed AI services (see <Link className="ui-link" href="/digital">Digital</Link>). You want software that does the work for you. You do not want to copy prompts into ChatGPT or Claude. You want a strategy book: this kit is scripts, prompts and templates.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="Refunds">
        <Prose>
          <p><strong>A 30-day money-back guarantee.</strong> Refunds go through Stripe.</p>
        </Prose>
      </Section>

      <Section title="One ZIP, bought once" intro="Stripe emails the download within 60 seconds of purchase. You do not need an account.">
        <a className="ui-btn" href={PAYMENT_LINK} style={{ minHeight: 48 }}>Buy the kit for $19</a>
      </Section>
    </main>
  );
}
