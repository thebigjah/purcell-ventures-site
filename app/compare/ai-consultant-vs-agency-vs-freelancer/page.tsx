import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";

// Comparison page, written 9 Nov 2026 for the buyer choosing who to hire for AI work.
// No PV prices: PV work is quoted per business (rule set 9 Nov 2026). Agencies,
// marketplace freelancers and marketplaces themselves are described by how they work and
// charge, with no dollar figures, because their rates vary and change.

const PATH = "/compare/ai-consultant-vs-agency-vs-freelancer";
const URL = `https://purcellventures.co${PATH}`;

export const metadata: Metadata = {
  title: { absolute: "AI consultant vs agency vs freelancer, Purcell Ventures" },
  description:
    "Who to hire for AI work: an independent AI consultant, an agency, a marketplace freelancer or doing it yourself. When each one fits and how each one charges.",
  alternates: { canonical: URL },
  openGraph: {
    title: "AI consultant vs agency vs freelancer",
    description: "Who to hire for AI work: an independent AI consultant, an agency, a marketplace freelancer or doing it yourself. When each one fits and how each one charges.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["What is the difference between an AI consultant and an AI agency?",
   "An independent consultant is one person who scopes, builds and supports the work. An agency is a team with separate people for sales, project management, design and engineering. The agency can run more work at once, and the consultant puts the person who scoped the job on the build."],
  ["Is it safe to hire an AI freelancer from a marketplace?",
   "It can be. Marketplaces show reviews and hold payment until you approve the work. Write the scope down, ask for the code and every login in your own name, and test the result on your real data before you release the final payment."],
  ["How much does an AI consultant cost at Purcell Ventures?",
   "Every project is quoted after a free call. The quote depends on the format of the training and how many people take part, or on the scope of the software build, from one tool or integration to a full application."],
  ["How do agencies and freelancers charge for AI work?",
   "Agencies usually charge a project fee or a monthly retainer, often with a minimum engagement. Freelancers on marketplaces charge hourly or a fixed price per job. Rates vary widely, so ask for a written quote and check current pricing with each one."],
  ["Should a small business do AI work itself first?",
   "Often, yes. A paid chat assistant and a few hours of practice cover drafting, summaries and research for most owners. Hire help when the job needs a connection between systems, a custom tool or training for a whole team."],
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
          { name: "AI consultant vs agency vs freelancer", href: PATH },
        ]} />}
        kicker="Comparisons"
        title="AI consultant vs agency vs freelancer"
        lede="Who to hire for AI work: an independent AI consultant, an agency, a freelancer from a marketplace, or nobody at all. When each one fits and how each one charges."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <table>
          <thead>
            <tr><td></td><th scope="col">Independent consultant</th><th scope="col">Agency</th><th scope="col">Marketplace freelancer</th><th scope="col">Do it yourself</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Who does the work</th><td>One person, start to finish</td><td>A team with a project manager</td><td>One person you found through a listing</td><td>You or a staff member</td></tr>
            <tr><th scope="row">How it charges</th><td>A quote per business after a free call</td><td>Project fees or retainers, often with a minimum. Check current pricing</td><td>Hourly or fixed price per job. Check current pricing</td><td>A tool subscription and your hours</td></tr>
            <tr><th scope="row">Best at</th><td>Scoping, small builds, team training</td><td>Large projects that need many skills at once</td><td>One clear task with a written spec</td><td>Drafting, summaries and research</td></tr>
            <tr><th scope="row">Weak at</th><td>Several large projects at the same time</td><td>Small jobs below their minimum</td><td>Vague goals and long support</td><td>Connecting systems and custom code</td></tr>
            <tr><th scope="row">Who you talk to</th><td>The person doing the work</td><td>Usually an account manager</td><td>The person doing the work</td><td>Nobody</td></tr>
            <tr><th scope="row">Support after launch</th><td>The same person, under an agreement</td><td>A support contract</td><td>Varies by freelancer</td><td>You</td></tr>
          </tbody>
        </table>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa, and I work as an
          independent AI consultant. Each of these four options is the right hire for some jobs,
          including jobs I would send to someone else.
        </p>

        <h2>When should you do it yourself?</h2>

        <p>
          Do it yourself when the job is learning a chat assistant. Drafting emails, summarizing
          documents, writing first drafts of posts and researching a question all fit in a paid
          ChatGPT or Claude plan and a few weeks of practice. Nobody needs to build anything.
        </p>

        <p>
          The <Link href="/compare/hire-ai-consultant-vs-do-it-yourself">do it yourself
          comparison</Link> covers this choice in more depth, and the{" "}
          <Link href="/ai-readiness">AI readiness test</Link> scores where your team stands in
          three minutes.
        </p>

        <h2>When is a marketplace freelancer the right call?</h2>

        <p>
          A freelancer from a marketplace fits a single task you can describe on one page. A
          script that moves data from one spreadsheet into another, a chatbot set up on a
          platform you already chose, or a prompt library for one job. The marketplace shows
          past reviews and holds the payment until you approve the work.
        </p>

        <p>
          The risk sits in what happens after delivery. A freelancer you found for one job may
          not be available when the tool breaks in six months. Before you hire, ask for the code,
          the setup notes and every account in your own name. Then test the result on your real
          data, with your real edge cases, before you release the last payment.
        </p>

        <h2>When is an agency worth it?</h2>

        <p>
          An agency earns its fee on a large project that needs several skills at the same
          time. A rebuild that touches design, a mobile app, a data system and a marketing
          launch fits that shape. An agency can staff each part, keep the work moving when one
          person is out, and sign a contract with terms your legal team expects.
        </p>

        <p>
          For a small business, the cost of that structure often outweighs the benefit. Agencies
          set minimum engagements, and part of every fee pays for account management and
          overhead. You will usually talk to an account manager, who passes your notes to the
          people building. If the job is one tool or one integration, you pay for capacity you
          will not use.
        </p>

        <h2>When does an independent consultant fit?</h2>

        <p>
          An independent consultant fits the middle: work too custom for a marketplace listing
          and too small for an agency minimum. The same person scopes the job, builds it and
          answers the phone when it breaks, so nothing gets lost between a salesperson and an
          engineer.
        </p>

        <p>
          The tradeoff is capacity. One person can run only so many projects at once, and a
          large build with a hard deadline may need a team. Ask any consultant what else is on
          their calendar and who covers the work if they are out.
        </p>

        <p>
          At Purcell Ventures I scope every project myself. The{" "}
          <Link href="/team">team page</Link> lists the AI agents that handle proposals, site
          audits and outreach, and what each one may not do.
        </p>

        <h2>What does each one cost?</h2>

        <p>
          Agencies usually charge a project fee or a monthly retainer, and many set a minimum
          engagement. Marketplace freelancers charge hourly or a fixed price per job, and some
          marketplaces add a client fee on top. Rates vary widely in both groups, so get a written
          quote and check current pricing with each one.
        </p>

        <p>
          Purcell Ventures quotes <Link href="/consulting">AI training</Link> and{" "}
          <Link href="/software">software</Link> builds per business. Each project starts with a
          free 30-minute discovery call, and the written quote follows it. The{" "}
          <Link href="/pricing-comparison">pricing comparison</Link> sets out how agencies,
          freelancers and do-it-yourself tools each charge.
        </p>

        <h2>What should you ask before you hire anyone?</h2>

        <ul>
          <li>Who does the work, and will I talk to that person directly?</li>
          <li>Who owns the code, the accounts and the data when the project ends?</li>
          <li>What does it cost each month after launch, for hosting, model usage and support?</li>
          <li>Who fixes it when it breaks, and how fast?</li>
          <li>Can you show me a tool you built that is still running today?</li>
        </ul>

        <p>
          The <Link href="/ai-cost-calculator">AI cost calculator</Link> shows how many hours a
          job costs your team now, which tells you how much any of these options can be worth.
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
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with the job you have in
          mind. If a freelancer, an agency or your own team fits it better, I will say so. I
          reply within one business day.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path={PATH} name="AI consultant vs agency vs freelancer" />
    </>
  );
}
