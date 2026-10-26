import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Note } from "@/app/components/ui";

// /shop/cold-email-pack, rebuilt on the page kit 26 Oct 2026.
// The buy buttons are plain links to the Stripe payment link, with no referral tracking,
// as they were before the rebuild.

export const metadata: Metadata = {
  title: "Cold Email Mastery Pack, $29",
  description:
    "100 cold email templates for 10 industries, reply-handling scripts, an AI scoring rubric and a subject line library. $29 once.",
};

const PAYMENT_LINK = process.env.COLD_EMAIL_PACK_PAYMENT_LINK || "#configure-stripe";

const PACK_CONTENTS = [
  {
    folder: "01-templates-by-industry/",
    title: "100 cold email templates for 10 industries",
    blurb: "Salons and spas, plumbing and HVAC, dental, real estate, law, marketing agencies, e-commerce, wellness and fitness, veterinary, and accounting. 10 templates per industry, each labeled by goal: an introduction, a problem call-out, value first, a referral claim, reaching the decision-maker directly and others.",
    count: "100 templates",
  },
  {
    folder: "02-subject-lines/",
    title: "A subject line library: 80 options in 8 styles",
    blurb: "Direct, question, referral, observation, local, value-first, curiosity and time-bound, each labeled with open-rate context. It includes 20 subject lines to avoid and the reason for each.",
    count: "80 subject lines",
  },
  {
    folder: "03-reply-handling/",
    title: "Reply-handling scripts for 30 scenarios",
    blurb: "What to do when a prospect says \"too expensive\", \"I'm interested but\", \"send me more info\", \"we use a competitor\" or \"we don't need this\". Each scenario has 2 to 3 responses and when to use each.",
    count: "30 scenarios",
  },
  {
    folder: "04-ai-scoring-rubric/",
    title: "An AI email scoring rubric with a Claude or ChatGPT prompt",
    blurb: "A system prompt for Claude or ChatGPT that scores your draft emails from 0 to 100 on specificity, ethics, a clear ask, subject-line strength and how well the email answers objections in advance. The rubric criteria also come as a separate reference document.",
    count: "1 system prompt, 1 rubric document",
  },
  {
    folder: "05-sequencing-cadences/",
    title: "Email sequences: when to send what",
    blurb: "A cold sequence of 5 emails over 21 days and a warm sequence of 5 emails over 21 days. A sequence for leads who got a quote and went silent, and one for re-engaging after 90 days. Each sequence lists the emails, the timing and when to stop if nobody replies.",
    count: "4 sequences",
  },
  {
    folder: "06-list-building/",
    title: "A list-building playbook for finding prospects without buying lists",
    blurb: "10 free and 5 paid sources for prospect lists, how to enrich them, how to comply with CAN-SPAM and how to track them in a CRM. It also includes the Google search templates I use to find small business prospects in a city.",
    count: "1 playbook and a Google search library",
  },
];

export default function ColdEmailPackPage() {
  return (
    <main>
      <PageHero
        kicker="Shop: the Cold Email Mastery Pack"
        title="Cold email templates for 10 industries."
        lede="100 industry-specific templates, 80 subject lines, 30 reply-handling scripts, an AI scoring rubric and 4 email sequences. Purcell Ventures sales reps work from these templates."
        meta="One-time download, $29. Checkout through Stripe, download by email, 30-day refund."
        actions={<a className="ui-btn" href={PAYMENT_LINK} style={{ minHeight: 52, fontSize: 17, padding: "16px 28px" }}>Buy now for $29</a>}
      />

      <Section title="What is inside" intro="One ZIP with 6 folders of editable markdown files, more than 200 pieces of content in all.">
        <div className="ui-entries">
          {PACK_CONTENTS.map((s) => (
            <article className="ui-entry" key={s.folder}>
              <div>
                <h3>{s.title}</h3>
                <p className="ui-entry__org"><code>{s.folder}</code></p>
              </div>
              <span className="ui-entry__when">{s.count}</span>
              <div className="ui-entry__body"><p>{s.blurb}</p></div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Note>
            The <Link className="ui-link" href="/shop/bundle">Complete Pack</Link> has this pack, the PV AI Starter Kit and the Subject Line Library for $39, $18 less than buying all three. The Starter Kit adds AI tool prompts and the rep handbook to this pack.
          </Note>
        </div>
      </Section>

      <Section title="Who it fits">
        <Rows
          items={[
            {
              name: "A good fit if",
              line: "You send cold outreach or want to start. Emails you wrote from scratch get ignored. You are a freelancer or consultant who needs more prospects. You manage a sales team and want one template library for everyone. You pay for a tool like Apollo or Lemlist and want templates to use with it or in place of it.",
            },
            {
              name: "Skip it if",
              line: (
                <>
                  You only do inbound marketing. You do not want to email people you do not know. You want someone to run cold outreach for you, which I offer under <Link className="ui-link" href="/consulting">Consulting</Link>. You have never opened a CRM and do not want to start, since you need somewhere to send these from.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="How the price compares">
        <Rows
          items={[
            { name: "Apollo.io or Lemlist", fig: "$99 to $179 a month", line: "A subscription of $1,200 to $2,100 a year for sending software. This pack is templates, which you can use with those tools or without them." },
            { name: "A sales copywriter", fig: "$300 to $2,000", line: "To write 10 to 20 emails. This pack has 100 templates plus the scripts, rubric and sequences above." },
            { name: "A cold outreach course", fig: "$497 to $1,500", line: "For video lessons. This pack is templates you can send today." },
            { name: "This pack", fig: "$29 once", line: "You pay once and keep the files. Refunds within 30 days, processed through Stripe." },
          ]}
        />
      </Section>

      <Section title="Cold Email Mastery Pack, $29" intro="Stripe emails the download within 60 seconds of checkout. Refunds within 30 days.">
        <a className="ui-btn" href={PAYMENT_LINK} style={{ minHeight: 48 }}>Buy the pack for $29</a>
      </Section>
    </main>
  );
}
