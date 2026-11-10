import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";

// Comparison page, written 9 Nov 2026 for the owner deciding whether to learn AI tools
// alone or pay for help. No PV prices: PV work is quoted per business. Chat assistant
// plans are described by how they charge, with no dollar figures, since plans change.

const PATH = "/compare/hire-ai-consultant-vs-do-it-yourself";
const URL = `https://purcellventures.co${PATH}`;

export const metadata: Metadata = {
  title: { absolute: "Hire an AI consultant or do it yourself, Purcell Ventures" },
  description:
    "Should a small business learn AI tools itself or pay for help? When doing it yourself is enough, when a consultant pays back, and what each one costs you.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Hire an AI consultant or do it yourself",
    description: "Should a small business learn AI tools itself or pay for help? When doing it yourself is enough, when a consultant pays back, and what each one costs you.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["Can a small business learn AI tools without a consultant?",
   "Yes. Most owners can learn to draft, summarize and research with a paid chat assistant in a few weeks of regular use. The free tutorials and glossary on this site cover the basics. Paid help speeds up the learning and matters most when a whole team needs the same habits."],
  ["How long does it take to learn ChatGPT or Claude for business?",
   "Basic drafting takes an afternoon. Knowing when to trust the output and when to check it takes longer, and it comes from using the tool on your own work every day for a few weeks."],
  ["How much does AI training cost at Purcell Ventures?",
   "Pricing is quoted per business after a free call. Training comes as 1-on-1 sessions, small groups of 2 to 8 or a half-day workshop for up to 20 people, and the quote depends on the format and how many people take part."],
  ["When should a small business pay for AI help?",
   "Pay for help when the job needs two systems connected, a custom tool, written rules for staff about customer data, or the same training for several people at once. Those jobs cost more to get wrong alone than the help costs."],
  ["What does doing it yourself cost?",
   "A chat assistant subscription for each person who uses it, plus the hours you spend learning. Most assistants offer a free plan and paid plans per user. Prices change, so check current pricing on each company's site."],
];

const LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: QA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Page() {
  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Comparisons", href: "/compare" },
          { name: "Hire an AI consultant or do it yourself", href: PATH },
        ]} />}
        kicker="Comparisons"
        title="Hire an AI consultant or do it yourself"
        lede="When a small business should learn AI tools on its own, when paying for help saves money, and what each path costs in dollars and hours."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <table>
          <thead>
            <tr><td></td><th scope="col">Do it yourself</th><th scope="col">Hire a consultant</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">What you pay</th><td>A chat assistant plan per user. Check current pricing on their site</td><td>A quote for your business, for training or a build</td></tr>
            <tr><th scope="row">What it costs in time</th><td>Weeks of practice, mostly trial and error</td><td>A few hours of sessions, then practice</td></tr>
            <tr><th scope="row">Best for</th><td>One owner learning to draft, summarize and research</td><td>A team, a connection between systems, or a custom tool</td></tr>
            <tr><th scope="row">Data rules</th><td>You work them out yourself</td><td>Written with you for your business</td></tr>
            <tr><th scope="row">Risk</th><td>Wrong answers you do not catch, customer data in the wrong tool</td><td>Paying for help you did not need</td></tr>
            <tr><th scope="row">What you keep</th><td>Your own habits</td><td>Habits, written prompts and rules your staff can follow</td></tr>
          </tbody>
        </table>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa. I sell AI
          training and builds, and most owners should start on their own before they pay me or
          anyone else.
        </p>

        <h2>When is doing it yourself enough?</h2>

        <p>
          Doing it yourself is enough when one person wants help with writing and thinking.
          Drafting emails and quotes, turning notes into a clean summary, writing a first pass
          at a job post and researching a supplier all work in a paid chat assistant. Use it on
          real work every day for two or three weeks and you will know what it does well and
          where it makes things up.
        </p>

        <p>
          Three free resources on this site cover the first steps. The{" "}
          <Link href="/ai-for-small-business">AI for small business guide</Link> shows where to
          start safely and how to check what the tools produce. The{" "}
          <Link href="/ai-glossary">AI glossary</Link> explains terms like{" "}
          <Link href="/ai-glossary#hallucination">hallucination</Link> and{" "}
          <Link href="/ai-glossary#data-retention">data retention</Link> in plain words. The{" "}
          <Link href="/tutorials">tutorials</Link> walk through specific tasks.
        </p>

        <h2>When does paying for help save money?</h2>

        <p>
          Paying for help saves money when a mistake costs more than the help. Four kinds of
          jobs fit that test:
        </p>

        <ol>
          <li>A team of several people needs the same habits and the same rules, so the work looks consistent.</li>
          <li>Staff handle customer data, health records or financial details, and somebody needs to write down what may go into which tool.</li>
          <li>The job connects two systems, such as your inbox and your CRM, and needs code or an automation platform.</li>
          <li>You have tried on your own for a few months and the tools still sit unused.</li>
        </ol>

        <p>
          A tool nobody opens costs the subscription and returns nothing. A few hours of
          training on your own tasks can get a team through the first weeks, when a new tool is
          easiest to drop.
        </p>

        <h2>How do you tell which side you are on?</h2>

        <p>
          Take the free <Link href="/ai-readiness">AI readiness test</Link>. Ten questions score
          your team out of 30 and give you three next steps, with no email required. A low score
          on data rules points toward help. A high score on daily use points toward doing it
          yourself.
        </p>

        <p>
          Then run the <Link href="/ai-cost-calculator">AI cost calculator</Link>. It takes your
          team size, hourly cost and the hours spent on manual work, and shows how fast a
          training session pays back. If the payback runs longer than a few months, keep
          learning on your own.
        </p>

        <h2>What does each path cost?</h2>

        <p>
          Doing it yourself costs a chat assistant plan for each person who uses it, plus the
          hours spent learning. ChatGPT, Claude and Gemini each offer a free plan and paid plans
          per user, with business plans that add admin and data controls. Prices change, so
          check current pricing on each company&apos;s site.
        </p>

        <p>
          Purcell Ventures <Link href="/consulting">AI training</Link> comes as 1-on-1 sessions,
          groups of 2 to 8 or a half-day workshop for up to 20 people. Sessions use your own
          tasks and tools. If the job needs a build, I scope a{" "}
          <Link href="/software">software</Link> project with you. Every project is quoted after
          a free call.
        </p>

        <h2>What goes wrong with each path?</h2>

        <p>
          Doing it yourself goes wrong in two quiet ways. Someone pastes customer details into a
          free plan whose data terms nobody read, or someone sends an AI draft with a wrong fact
          because it sounded sure of itself. Both are easy to prevent with a one-page rule sheet
          and a habit of checking every number and name.
        </p>

        <p>
          Hiring help goes wrong when you pay for a polished session on generic examples and
          nobody uses the tools the next week. Ask any trainer to work on your own documents and
          to leave written prompts behind. Ask any builder who owns the accounts and the code
          when the job ends.
        </p>

        <h2>Can you do both?</h2>

        <p>
          Yes, and it is the path I recommend most often. Learn the chat assistant on your own
          for a few weeks, write down where you got stuck, then book a short session on those
          exact problems. You pay for two hours instead of ten, and the session answers
          questions you already have.
        </p>

        <p>
          If you are weighing who to hire, the{" "}
          <Link href="/compare/ai-consultant-vs-agency-vs-freelancer">consultant, agency and
          freelancer comparison</Link> covers that choice.
        </p>

        <h2>Common questions</h2>

        {QA.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p style={{ marginTop: 6 }}>{a}</p>
          </div>
        ))}

        <h2>How do I get in touch?</h2>

        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with what you have tried so
          far. If you can finish it on your own, I will say so. I reply within one business day.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path={PATH} name="Hire an AI consultant or do it yourself" />
    </>
  );
}
