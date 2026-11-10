import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "insurance-agents";

export default function AiForInsuranceAgents() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for insurance agents"
      lede="Where AI helps an insurance agency with quote requests, renewal reminders and policy questions, the licensing and privacy limits, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for an insurance agency?</h2>

      <p>
        AI handles three agency jobs well: collecting the details a quote needs before an
        agent picks up the file, writing renewal reminders that clients actually read, and
        answering general questions about the agency and common insurance terms. Each job
        repeats every week, and a licensed agent handles every quote, every coverage decision
        and every policy change.
      </p>

      <p>
        A fourth job fits most agencies: drafting replies to Google reviews. An agent reads each
        draft before it posts, and the free{" "}
        <Link href="/digital/tools/review-response">review response generator</Link> shows
        what a draft looks like.
      </p>

      <h2>How does AI handle insurance quote requests?</h2>

      <p>
        A website form or chatbot asks the questions your agents ask on every first call: the
        line of business, the vehicles and drivers, the home&apos;s age and roof, the current
        carrier and the renewal date. It sends a clean summary to the right agent at any
        hour. The agent runs the quote through the carrier and calls the client back.
      </p>

      <p>
        Write the question list for each line first, and decide which answers send the
        request straight to a person, such as a recent claim or a client who wants coverage
        that day.
      </p>

      <h2>How does AI help with renewal reminders?</h2>

      <p>
        Your agency management system knows every renewal date, so let it send the messages
        on schedule. AI helps with the words: a short note 60 days out, a review offer at 30
        days, and a final reminder before the policy renews. Each message invites the client
        to call before the date, and an agent handles the review itself.
      </p>

      <p>
        Write the templates in a general AI tool with no client names or policy numbers in
        them, then load the finished text into the system that sends. Marketing texts need the
        client&apos;s prior written consent under federal telemarketing rules, so ask for it on
        the application.
      </p>

      <h2>Can AI answer policy questions for clients?</h2>

      <p>
        For general ones, yes. A chatbot trained on answers your agency writes can explain
        what a deductible is, which carriers you represent, how to report a claim, where to
        find an ID card and when the office is open. It repeats your answers and nothing
        else.
      </p>

      <p>
        Questions about one client&apos;s own policy go to an agent. Whether the policy covers a loss,
        how much liability a family should carry and whether to drop a coverage all count as
        advice, and a licensed person gives it. The bot collects the question and a callback
        number.
      </p>

      <h2>What should an insurance agency not hand to AI?</h2>

      <p>
        Keep binding, premiums, coverage recommendations and claim decisions with licensed
        people. A model will tell a caller in a confident tone that the policy covers a flood, and
        that answer can leave a family uninsured and your agency facing a complaint.
      </p>

      <ul>
        <li><strong>Binding coverage.</strong> Only a licensed agent with binding authority from the carrier binds a policy.</li>
        <li><strong>Final premiums.</strong> The agent quotes them from the carrier&apos;s system.</li>
        <li><strong>Coverage advice.</strong> A licensed agent recommends limits and coverages.</li>
        <li><strong>Claims.</strong> The carrier decides them, and the agent helps the client through it.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Agency task</th>
            <th scope="col">AI role</th>
            <th scope="col">Agent&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Quote requests</th><td>Collects details for each line</td><td>Runs and presents the quote</td></tr>
          <tr><th scope="row">Renewal reminders</th><td>Writes the templates</td><td>Reviews the policy with the client</td></tr>
          <tr><th scope="row">Policy FAQ</th><td>Answers general questions from a written list</td><td>Answers questions about one policy</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Removes client details and posts it</td></tr>
          <tr><th scope="row">Binding and advice</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What licensing and privacy rules apply to AI in an insurance agency?</h2>

      <p>
        States require a license to sell, solicit or negotiate insurance, so a bot that
        recommends a policy steps into licensed work. Client financial and personal details
        also fall under privacy rules from the Gramm-Leach-Bliley Act and state insurance law,
        and carriers often add their own terms in the agency contract. This is general
        information, and your state insurance department and counsel govern your agency.
      </p>

      <p>
        A simple staff rule covers most of the risk: AI tools draft templates and general
        answers, and driver&apos;s license numbers, Social Security numbers, claim details and
        policy numbers stay in your agency management system.
      </p>

      <h2>What can Purcell Ventures set up for an insurance agency?</h2>

      <p>
        I can train your agents and service staff, add intake and FAQ tools to your website,
        or build a small tool around your own question lists. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on renewal
          wording, review replies and a staff AI rule, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder and review request automation, or an AI chatbot that
          collects quote details and an email and SMS campaign system. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as an intake form that turns answers into a summary in your format, is quoted after a free call.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your agency in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the service hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers follow-ups and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
