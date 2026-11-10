import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Single-column PostLayout, same as /ai-consulting. Each H2 is a question a buyer asks and
// the paragraph under it answers first. No dollar figures anywhere: see layout.tsx.

const PATH = "/ai-consulting-cost";
const URL = `https://purcellventures.co${PATH}`;

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: QA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function AiConsultingCost() {
  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "AI consulting", href: "/ai-consulting" },
          { name: "Cost", href: PATH },
        ]} />}
        kicker="AI consulting"
        title="How is AI consulting priced for a small business?"
        lede="Consultants usually price AI consulting for a small business in one of six ways: hourly, per person trained, per workshop, as a fixed-fee project, as a monthly retainer or per software seat. Within any model, the price depends on the scope, the team size, the number of sessions, whether you need a custom build, travel and the support you want afterward."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <p>
          Purcell Ventures quotes each business after a free first call, using the same six
          factors. I am Elijah Purcell, and I run Purcell Ventures LLC from Tuscaloosa, Alabama. I write
          every quote myself and I do the work myself, so the person on the first call is the
          person who prices the job.
        </p>

        <h2>What drives the quote?</h2>

        <p>
          Six things move the price of AI consulting for any business, with any consultant.
        </p>

        <ul>
          <li>
            <strong>Scope.</strong> The number of tasks, tools and systems the work touches.
            One workflow for one person costs less than a change across the whole business.
          </li>
          <li>
            <strong>Team size.</strong> More people means more preparation, more questions and
            more practice time. The cost per person usually falls as the group grows.
          </li>
          <li>
            <strong>Number of sessions.</strong> One session covers the basics. A program of
            several sessions lets your team practice between them and come back with real
            problems.
          </li>
          <li>
            <strong>Training or a custom build.</strong> Training teaches your team to use tools
            you already have. A custom build adds new software, so it takes more hours and
            costs more.
          </li>
          <li>
            <strong>Travel.</strong> I come to your office in Tuscaloosa or metro Atlanta, or
            train remotely. With any consultant farther away, ask whether travel time appears on
            the bill.
          </li>
          <li>
            <strong>Ongoing support.</strong> Help after launch, updates and maintenance cost
            more than a single handoff, and they save you from fixing things alone.
          </li>
        </ul>

        <h2>How do the common pricing models work?</h2>

        <p>
          You will see six common pricing models, and each one shifts the cost of extra time
          or extra people in a different way.
        </p>

        <ul>
          <li>
            <strong>Hourly.</strong> You pay for the time used. It suits open questions and one
            person working on their own problems. Ask for an estimate of the hours before you
            start, since the total has no ceiling.
          </li>
          <li>
            <strong>Per-person training.</strong> One rate for each person in the room. The
            total is easy to predict, and it grows with every person you add.
          </li>
          <li>
            <strong>Workshop.</strong> A flat fee for a set block of time and a cap on
            headcount. The cost per person falls as more of your team attends.
          </li>
          <li>
            <strong>Fixed-fee project.</strong> The consultant writes the scope and sets the
            price before any work starts. You know the cost up front, and changes to the scope
            cost extra.
          </li>
          <li>
            <strong>Retainer.</strong> A set fee each month for ongoing work or availability.
            Check which tasks and hours the fee covers and how you cancel.
          </li>
          <li>
            <strong>Per-seat software.</strong> A monthly charge for each user of a tool. The
            bill grows with your team, so count who needs a seat before you buy.
          </li>
        </ul>

        <h2>Which model fits which job?</h2>

        <table>
          <thead>
            <tr><th scope="col">The job</th><th scope="col">The usual model</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">One owner learning AI tools</th><td>Hourly</td></tr>
            <tr><th scope="row">A small team that works closely together</th><td>Per-person training</td></tr>
            <tr><th scope="row">All-hands training or a company event</th><td>Workshop</td></tr>
            <tr><th scope="row">An automation or a custom tool</th><td>Fixed-fee project</td></tr>
            <tr><th scope="row">Updates and support after launch</th><td>Retainer</td></tr>
            <tr><th scope="row">An off-the-shelf AI tool for your staff</th><td>Per-seat software</td></tr>
          </tbody>
        </table>

        <p>
          My quotes follow the same logic. I pick the model that fits the job and tell you on
          the first call if a free tool already covers it.
        </p>

        <h2>How do I estimate whether it pays back?</h2>

        <p>
          Compare the quote with the hours your team would get back. The free{" "}
          <Link href="/ai-cost-calculator">AI cost calculator</Link> does the math with five
          numbers from your own business.
        </p>

        <ol>
          <li><strong>Team size:</strong> the people whose work you want to speed up.</li>
          <li><strong>Average hourly cost per person:</strong> salary plus benefits and overhead.</li>
          <li><strong>Repeatable manual work per person, per week:</strong> drafting, data entry, scheduling and formatting.</li>
          <li><strong>Share of that work AI could automate:</strong> a slider from 20% to 80%.</li>
          <li><strong>Your training cost:</strong> the quote you received.</li>
        </ol>

        <p>
          The calculator multiplies weekly manual hours by team size, the automation share and
          4.33 weeks to get hours saved each month. It multiplies those hours by the hourly cost
          for a dollar figure, then divides the quote by that monthly figure to give the payback
          period. Set the automation share low at first, since revisions and interruptions eat
          into the savings. A long payback period tells you to skip the work or start smaller.
        </p>

        <h2>What does a cheap option miss?</h2>

        <p>
          A chat assistant subscription and free tutorials teach one person to draft and
          summarize. They leave several jobs undone.
        </p>

        <ul>
          <li>Written rules for which customer data stays out of AI tools.</li>
          <li>The same habits across a whole team, instead of one person who figured it out.</li>
          <li>Connections between the apps you already pay for.</li>
          <li>Someone who checks the output on your real work and catches wrong answers.</li>
          <li>Support after the session, when the first odd case comes up.</li>
        </ul>

        <p>
          If drafting and summarizing are all you need, the cheap option is enough, and I will
          tell you so on the first call.
        </p>

        <h2>What should I ask before paying anyone?</h2>

        <ol>
          <li>Who does the work: the person on the call, or someone else?</li>
          <li>What does the quote include, and what costs extra?</li>
          <li>Is the scope written down before work starts?</li>
          <li>Who owns the code and the prompts when the job ends?</li>
          <li>What happens to my customer data during the work?</li>
          <li>How does my team run things after you leave?</li>
          <li>How do I cancel any monthly part of the deal?</li>
          <li>Do I need to hire anyone for this at all?</li>
        </ol>

        <p>
          My answers: I do the work myself, you own the code, and every training session ends
          with a takeaway guide for your team. The{" "}
          <Link href="/compare/ai-consultant-vs-agency-vs-freelancer">consultant, agency and
          freelancer comparison</Link> covers who to hire, and{" "}
          <Link href="/compare/hire-ai-consultant-vs-do-it-yourself">hiring a consultant or
          doing it yourself</Link> covers whether to hire at all.
        </p>

        <h2>Common questions</h2>

        {QA.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p style={{ marginTop: 6 }}>{a}</p>
          </div>
        ))}

        <h2>How do I get a quote?</h2>

        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with your team size and the
          work you want to speed up. The first conversation is free, and I reply within one
          business day. More on <Link href="/ai-consulting">AI consulting in Alabama</Link>.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <PageDates path={PATH} name="How is AI consulting priced for a small business?" />
    </>
  );
}
