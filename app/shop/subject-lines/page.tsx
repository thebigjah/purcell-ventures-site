import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Prose, Note } from "@/app/components/ui";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata: Metadata = {
  title: "The Cold Email Subject Line Library, $9",
  description: "80 cold email subject lines in 8 categories, as a PDF and markdown files. $9 once.",
};

const PAYMENT_LINK = process.env.SUBJECT_LINES_PAYMENT_LINK || "#configure-stripe";

const CATEGORIES = [
  { name: "Direct", count: 10, sample: "Quick question about {{company}}" },
  { name: "Question", count: 10, sample: "How are you handling {{specificProblem}}?" },
  { name: "Referral", count: 10, sample: "{{referrer}} suggested I write" },
  { name: "Observation", count: 10, sample: "Noticed {{specificThing}} about {{company}}" },
  { name: "Local", count: 10, sample: "Another {{city}} business owner" },
  { name: "Value-first", count: 10, sample: "Free {{thingTheyNeed}} for {{company}}?" },
  { name: "Curiosity", count: 10, sample: "{{numberOrFact}}: context inside" },
  { name: "Time-bound", count: 10, sample: "Before {{realDeadline}}" },
];

export default function SubjectLinesPage() {
  return (
    <main>
      <RefTracker product="subject-lines" />
      <PageHero
        kicker="Shop: the Subject Line Library"
        title="80 cold email subject lines in 8 categories."
        lede="Each category has 10 subject lines. The download is an editable PDF with markdown files, and it arrives by email right after checkout."
        meta="$9 once. Checkout through Stripe, delivery by email, 30-day refund."
        actions={<BuyButton paymentLink={PAYMENT_LINK} product="subject-lines" price="$9" size="large" />}
      />

      <Section title="The 8 categories" intro="One sample from each. The full library has 10 in every category.">
        <Rows
          items={CATEGORIES.map((c) => ({
            name: c.name,
            line: <>&ldquo;{c.sample}&rdquo;</>,
            fig: `${c.count} lines`,
          }))}
        />
      </Section>

      <Section title="Also in the library">
        <Prose>
          <ul>
            <li><strong>20 subject lines to avoid</strong>, with the reason each one fails</li>
            <li><strong>A token replacement guide</strong> for filling in {`{{firstName}}, {{company}}, {{specificThing}}`}</li>
            <li><strong>An A/B testing matrix</strong> that pairs subject lines to test against each other in different niches</li>
            <li><strong>A mobile preview cheat sheet</strong> showing how subject lines look in iPhone Mail, Gmail on a phone and Outlook</li>
          </ul>
        </Prose>
        <div style={{ marginTop: 28 }}>
          <Note>
            The subject lines are also part of the larger <Link className="ui-link" href="/shop/cold-email-pack">Cold Email Mastery Pack ($29)</Link>, which adds more than 100 industry templates, reply-handling scripts, an AI scoring rubric and send schedules. If you want all of that, buy the pack and skip this one.
          </Note>
        </div>
      </Section>

      <Section title="Who it fits">
        <Rows
          items={[
            { name: "A good fit if", line: "You write cold emails and your subject lines get ignored. You want better opening lines and do not need a full template pack. You want to A/B test subject lines against each other." },
            { name: "Skip it if", line: "You want the full Cold Email Mastery Pack ($29), which includes this library. You do not send cold email. You want someone to run your outreach for you." },
          ]}
        />
      </Section>

      <Section title="80 subject lines in one PDF for $9" intro="Stripe sends the PDF to your email within 60 seconds.">
        <BuyButton paymentLink={PAYMENT_LINK} product="subject-lines" price="$9" size="small" />
      </Section>
    </main>
  );
}
