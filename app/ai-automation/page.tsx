import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Pillar for the AI automation cluster, on the same PostLayout as /ai-consulting and
// /ai-design. Question H2s, each answered in the paragraph directly under it. The
// first-hand evidence is COSMIC, described the way /agentic-ai describes it.

export default function AiAutomation() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Software", href: "/software" },
        { name: "AI automation for small businesses", href: "/ai-automation" },
      ]} />}
      kicker="AI automation"
      title="AI automation for small businesses"
      lede="Which tasks a small business should hand to software first, what AI phone answering and booking can do, and which work should stay with a person."
      meta={<>Updated <time dateTime="2026-11-09">9 November 2026</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a student at the
        University of Alabama. I build automations for small businesses, and my own company
        runs on 57 AI agents that I built and supervise. Most of what follows comes from
        running that system every day.
      </p>

      <h2>What is AI automation, and how is it different from regular automation?</h2>

      <p>
        Regular automation moves information along fixed rules: when a form arrives, add a
        row to a sheet and send an email. AI automation adds a language model to one or more
        steps, so the system can read a message, sort it, draft a reply or pull details out of
        a document. The rules still decide what happens next.
      </p>

      <p>
        An AI agent goes one step further. It gets a goal and a set of tools and picks its own
        steps. Agents need more supervision, and most small business tasks do not need one.
        The page on <Link href="/agentic-ai">autonomous AI agent systems</Link> covers where
        agents earn their cost.
      </p>

      <h2>Which task should a small business automate first?</h2>

      <p>
        Automate first the task that happens most often, follows the same steps each time,
        and causes harm when someone forgets it. For most service businesses that is
        follow-up: replying to new leads, chasing quotes that went quiet, and reminding
        customers about invoices and appointments.
      </p>

      <p>Three questions sort a task list quickly.</p>

      <ol>
        <li>Does it happen more than once a week?</li>
        <li>Could you write the steps on one page for a new hire?</li>
        <li>If the task runs wrong once, can you catch it before a customer does?</li>
      </ol>

      <p>
        A task that passes all three is a good first automation. A task that fails the third
        question needs a person to approve each result, at least at the start. The post on{" "}
        <Link href="/blog/five-workflows-no-code">five workflows you can automate this week</Link>{" "}
        walks through quote follow-ups, onboarding emails and invoice reminders with free or
        low-cost tools.
      </p>

      <h2>Can AI answer the phone and book appointments?</h2>

      <p>
        Yes, for routine calls. AI voice tools can answer, give hours and prices, take a
        message and book into a connected calendar. They handle a caller with an unusual
        problem poorly, and an upset caller worse. Set one up with a script, a short list of
        questions it may answer, and a transfer to a person for everything else.
      </p>

      <p>
        Booking is the easier half. An online booking page tied to your real calendar takes
        appointments at any hour and sends reminders without any AI at all. I add branded
        online booking and an AI chatbot trained on your business to sites on the{" "}
        <Link href="/digital">Digital Full Service plan</Link>, at $279 a month. Purcell
        Ventures does not sell a phone answering product.
      </p>

      <p>
        Before paying for any AI receptionist, check what happens to the calls it takes. If
        the calendar is not connected and nobody calls the leads back, the tool records missed
        business in more detail. The post on{" "}
        <Link href="/blog/why-most-ai-tools-waste-money">why some AI tools waste money</Link>{" "}
        works through that case.
      </p>

      <h2>How do I automate follow-ups with leads and unpaid invoices?</h2>

      <p>
        Send every new lead an immediate reply and a notice to the owner, then schedule
        follow-ups on fixed days until the lead answers. Most invoicing tools, including
        QuickBooks and Stripe, can send payment reminders on a schedule once you switch the
        feature on. The setup takes an afternoon.
      </p>

      <p>
        On the Site Care plus Lead Ops plan for <Link href="/sites">websites I build</Link>,
        leads from the site form reach the owner by text and email within 60 seconds. AI helps
        most with the follow-up message itself. A model can draft a reply that mentions what
        the customer asked about, and a person can approve it in a few seconds. Fully
        automatic replies should stay short and factual.
      </p>

      <h2>Can I automate asking customers for Google reviews?</h2>

      <p>
        Yes. Send every customer the same review request a day or two after the job, with a
        direct link to your Google review form. Ask every customer. Google&apos;s review
        policies prohibit asking only the customers you expect to be happy, a practice called
        review gating.
      </p>

      <p>
        Review request automation is part of the{" "}
        <Link href="/digital">Digital Growth plan</Link> at $179 a month, and the Marketing
        Partner website plan sends a request after each job. Replying to reviews is a good
        place for AI drafts, as long as an owner reads each reply before it posts.
      </p>

      <h2>Should I use Zapier or Make, or pay for a custom automation?</h2>

      <p>
        Use Zapier or Make when both apps appear on their connection lists and the task has a
        handful of steps. Pay for a custom automation when the data needs cleaning first, the
        task needs a model to read or write text, or the monthly task count costs more than a
        one-time build.
      </p>

      <table>
        <thead>
          <tr>
            <td></td>
            <th scope="col">Zapier or Make</th>
            <th scope="col">Custom automation</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Setup</th><td>You click steps together in a browser</td><td>A developer writes and tests code</td></tr>
          <tr><th scope="row">Cost shape</th><td>Monthly subscription that grows with task volume</td><td>One-time build, plus hosting and upkeep</td></tr>
          <tr><th scope="row">Fits</th><td>Two or three apps with standard connections</td><td>Messy data, AI steps, apps with no ready connection</td></tr>
          <tr><th scope="row">When it breaks</th><td>The platform emails you about failed runs</td><td>Depends on the checks the developer built</td></tr>
          <tr><th scope="row">Who can change it</th><td>Anyone on your team with the login</td><td>The developer, or anyone who can read the code</td></tr>
        </tbody>
      </table>

      <p>
        The <Link href="/ai-cost-calculator">AI cost calculator</Link> shows how many hours a
        task costs your team each year, which tells you how much a build is worth before you
        ask anyone for a quote.
      </p>

      <h2>What should a business never hand to an AI automation?</h2>

      <p>
        Keep with a person anything that moves money, makes a legal or medical promise,
        refuses a customer, or speaks for the business in a dispute. An automation can draft
        those messages and queue them, and a person should send them.
      </p>

      <p>
        Also keep out anything that runs so rarely that nobody would notice it broke. A yearly
        task automated in January will fail silently the following January after a password
        or form changes.
      </p>

      <h2>What happens when an automation breaks?</h2>

      <p>
        Most automations fail without an error message. A login expires or a form field changes name, and the
        task stops while every dashboard still looks normal. The fix is a check that compares
        what the automation did against what it should have done, sent to a person who reads
        it.
      </p>

      <p>
        I learned this on my own system. One pipeline reported that it had sent quotes when it
        had sent none, because the code caught its own error and carried on. The fix was a
        count: quotes sent had to match quotes expected, or the run failed loudly.
      </p>

      <h2>How does Purcell Ventures use automation in its own work?</h2>

      <p>
        I run COSMIC, a station of 57 AI agents in 17 rooms that handles proposals, site
        audits, security checks, research and outreach for the company. Each agent is a
        Claude session with a narrow set of tools and a written charter, and each reports one
        rank up a chain that ends with me.
      </p>

      <p>
        Two rules from that system carry over to any small business automation. An agent that
        sends anything to a customer needs a check before it sends, and an agent that marks
        work done needs a second check whose job is to catch a false &quot;done.&quot; The{" "}
        <Link href="/team">team page</Link> lists every agent and the actions each one may not
        take.
      </p>

      <h2>How much does AI automation cost?</h2>

      <p>
        At Purcell Ventures, I quote automation per project after a free conversation,
        because the price depends on how many systems it touches. Small software projects run
        $1,500 to $3,500. Monthly plans that include ready-made automations start at $179, with
        a one-time setup fee of $650 to $1,000.
      </p>

      <table>
        <thead>
          <tr>
            <th scope="col">Option</th>
            <th scope="col">Price</th>
            <th scope="col">Fits</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Digital Growth plan</th><td>$179 a month, setup $650 to $1,000</td><td>Review requests, an AI FAQ on your site, scheduling tools</td></tr>
          <tr><th scope="row">Digital Full Service plan</th><td>$279 a month, setup $650 to $1,000</td><td>AI chatbot, online booking, email and text campaigns</td></tr>
          <tr><th scope="row">Custom automation</th><td>Quoted per project</td><td>A repeated task across your own systems</td></tr>
          <tr><th scope="row">Small software project</th><td>$1,500 to $3,500</td><td>One tool or one integration</td></tr>
          <tr><th scope="row">Zero to Automated course</th><td>$397 at launch</td><td>Owners who want to build their own</td></tr>
        </tbody>
      </table>

      <p>
        I am still recording the{" "}
        <Link href="/courses/ai-automation">Zero to Automated course</Link>, and the waitlist
        is open.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with the task you want off
        your plate. The first conversation is free, and I reply within one business day.
      </p>

      <p>
        Related guides: <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
        <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
        <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
        <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
        <Link href="/ai-design">AI in design for small businesses</Link>. The <Link href="/ai-glossary">AI glossary</Link> defines the terms, and{" "}
        <Link href="/ai-small-business-statistics">AI small business statistics</Link> lists the numbers with sources.
      </p>
    </PostLayout>
  );
}
