import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Single-column PostLayout, same as /ai-consulting. Each H2 is a question a buyer asks and
// the paragraph under it answers first. Prices and their source pages are listed in the
// header of layout.tsx.

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
        title="How much does AI consulting cost for a small business?"
        lede="At Purcell Ventures, AI consulting costs $175 an hour for 1-on-1 work, $125 a person for a group of 2 to 8, or $2,500 flat for a half-day workshop with up to 20 people. Small custom software projects run $1,500 to $3,500. I quote automation per project after a free first conversation."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <p>
          I am Elijah Purcell, and I run Purcell Ventures LLC from Tuscaloosa, Alabama. I set
          the prices and I do the work myself.
        </p>

        <h2>What drives the price of AI consulting?</h2>

        <p>
          Four things move the price: the hours involved, the number of people trained, where
          the work happens, and whether you need training or a custom build.
        </p>

        <ul>
          <li>
            <strong>Hours.</strong> Hourly work grows with the time spent. A 1-on-1 session
            costs $175 an hour, and I recommend at least two hours.
          </li>
          <li>
            <strong>Group size.</strong> Per-person pricing grows with headcount, and a flat
            workshop price shrinks per person as more people attend. A $2,500 workshop for 20
            people works out to $125 a person.
          </li>
          <li>
            <strong>Travel.</strong> I come to your office in Tuscaloosa or metro Atlanta, or
            train remotely. For any consultant farther away, ask whether travel time appears on the
            bill.
          </li>
          <li>
            <strong>Training or a build.</strong> Training teaches your team to use tools you
            already have. A custom build adds new software, so it costs more and I price it
            per project.
          </li>
        </ul>

        <h2>What does Purcell Ventures charge?</h2>

        <p>
          I charge these rates today. Early clients pay lower rates than I will charge a year
          from now.
        </p>

        <table>
          <thead>
            <tr><th>Service</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>1-on-1 consulting</strong></td><td>$175 an hour, two-hour minimum recommended</td></tr>
            <tr><td><strong>Small group training, 2 to 8 people</strong></td><td>$125 a person, two-hour minimum</td></tr>
            <tr><td><strong>Half-day workshop, up to 20 people</strong></td><td>$2,500 flat</td></tr>
            <tr><td><strong>Corporate or custom training</strong></td><td>Quoted for the job</td></tr>
            <tr><td><strong>AI automation</strong></td><td>Quoted per project</td></tr>
            <tr><td><strong>Small software project</strong></td><td>$1,500 to $3,500</td></tr>
            <tr><td><strong>Full app</strong></td><td>$5,000 to $15,000 and up</td></tr>
            <tr><td><strong>Ongoing software work</strong></td><td>Quoted on the discovery call</td></tr>
            <tr><td><strong>Digital plans for your website</strong></td><td>Starter $99 a month, Growth $179 a month, Full Service $279 a month</td></tr>
            <tr><td><strong>Digital plan setup</strong></td><td>$650 to $1,000, one time</td></tr>
            <tr><td><strong>Website builds</strong></td><td>Quoted on the discovery call</td></tr>
          </tbody>
        </table>

        <p>
          The details sit on the <Link href="/consulting">consulting</Link>,{" "}
          <Link href="/software">software</Link>, <Link href="/digital">digital</Link> and{" "}
          <Link href="/sites">websites</Link> pages. Personal tech help for individuals and
          families, including a $129 ChatGPT crash course, is on{" "}
          <Link href="/steady">Steady</Link>. The{" "}
          <Link href="/pricing-comparison">pricing comparison</Link> shows a year-one example:
          the Growth plan comes to $2,798, which is $650 setup plus 12 months at $179.
        </p>

        <h2>How do the common pricing models work?</h2>

        <p>
          You will see six common pricing models, and each one shifts the cost of extra
          time or extra people in a different way.
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
            <strong>Half-day workshop.</strong> A flat fee for a set block of time and a cap on
            headcount. The cost per person falls as more of your team attends.
          </li>
          <li>
            <strong>Fixed-fee project.</strong> The consultant writes the scope and sets the
            price before any work starts. You know the cost up front, and changes to the scope
            cost extra.
          </li>
          <li>
            <strong>Monthly retainer.</strong> A set fee each month for ongoing work or
            availability. Check which tasks and hours the fee covers and how you cancel.
          </li>
          <li>
            <strong>Per-seat software.</strong> A monthly charge for each user of a tool. The
            bill grows with your team, so count who needs a seat before you buy.
          </li>
        </ul>

        <h2>How do I estimate whether it pays back?</h2>

        <p>
          Compare the price with the hours your team would get back. The free{" "}
          <Link href="/ai-cost-calculator">AI cost calculator</Link> does the math with five
          inputs.
        </p>

        <ol>
          <li><strong>Team size:</strong> the people whose work you want to speed up.</li>
          <li><strong>Average hourly cost per person:</strong> salary plus benefits and overhead.</li>
          <li><strong>Repeatable manual work per person, per week:</strong> drafting, data entry, scheduling and formatting.</li>
          <li><strong>Share of that work AI could automate:</strong> a slider from 20% to 80%.</li>
          <li><strong>Cost of the consulting session:</strong> the price the consultant gave you.</li>
        </ol>

        <p>
          The calculator multiplies weekly manual hours by team size, the automation share and
          4.33 weeks to get hours saved each month. It multiplies those hours by the hourly cost
          for a dollar figure, then divides the session cost by that monthly figure to give the
          payback period. Set the automation share low at first, since revisions and
          interruptions eat into the savings. A long payback period tells you to skip the
          session or start with a 1-on-1 hour.
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
          <li>What does the price include, and what costs extra?</li>
          <li>Is the scope written down before work starts?</li>
          <li>Who owns the code and the prompts when the job ends?</li>
          <li>What happens to my customer data during the work?</li>
          <li>How does my team run things after you leave?</li>
          <li>Can I cancel a monthly plan, and how?</li>
          <li>Do I need to hire anyone for this at all?</li>
        </ol>

        <p>
          My answers: I do the work myself, you own the code, every session ends with a
          takeaway guide, and digital plans have no contract. The{" "}
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
      <ServiceSchema />
      <PageDates path={PATH} name="How much does AI consulting cost for a small business?" />
    </>
  );
}
