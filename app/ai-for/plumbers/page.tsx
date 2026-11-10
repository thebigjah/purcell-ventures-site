import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "plumbers";

export default function AiForPlumbers() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for plumbers"
      lede="Where AI helps a plumbing business sort emergency calls, write job summaries, follow up on quotes and answer reviews, what stays with a licensed plumber, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software and
        train small business teams to use AI tools, and COSMIC, a station of 57 AI agents in
        17 rooms, drafts proposals, audits sites and handles outreach for my own company.
      </p>

      <h2>What can AI do for a plumbing business?</h2>

      <p>
        AI handles four plumbing jobs well: sorting incoming calls and messages so emergencies
        reach the on-call plumber first, turning a plumber&apos;s notes into a job summary or
        invoice, following up on open quotes, and drafting replies to Google reviews. A person
        checks each result before it reaches a customer.
      </p>

      <p>
        All four are writing or sorting work that repeats every week. None of them asks the
        software to diagnose a leak, which is where AI tools fail.
      </p>

      <h2>How does AI triage emergency plumbing calls?</h2>

      <p>
        A website chat, text line or AI voice service collects the address, the problem and
        whether water is running right now. Messages that mention a burst pipe, flooding,
        sewage backup or no water at all go straight to the on-call plumber by text. Routine
        requests such as a slow drain wait for the morning schedule.
      </p>

      <p>
        Write the trigger words and the routing before the tool goes live, and include a
        line that tells a caller with a flooding problem to shut off the main water valve. A
        caller who smells gas near a water heater gets one instruction: leave the house and
        call 911 or the gas utility.
      </p>

      <p>
        Purcell Ventures does not sell a phone answering product. If you buy one elsewhere,
        call it yourself with a burst-pipe complaint and a clogged-sink complaint before you
        trust it with customers.
      </p>

      <h2>Can AI write plumbing job summaries from tech notes?</h2>

      <p>
        Yes, as a first draft. A plumber types or dictates what they found, such as a
        corroded supply line, a failed wax ring and an old shutoff valve, and a model writes
        a plain summary with parts and labor in your invoice format. The plumber checks every
        part, price and recommendation before it goes out.
      </p>

      <p>
        The draft saves the time a plumber spends each evening rewriting notes, and a
        customer who understands the repair is less likely to dispute the bill. Give the
        model your price book so it never guesses at a number.
      </p>

      <h2>How do I follow up on plumbing quotes with AI?</h2>

      <p>
        Keep every open quote for larger work, such as a water heater replacement or a
        repipe, in one list with the date sent. Send a short follow-up on fixed days until
        the customer answers. AI writes a message that names the job, a scheduling tool sends
        it, and the owner calls anyone who replies.
      </p>

      <p>
        Review replies follow the same pattern: AI drafts, the owner reads and posts. The
        free <Link href="/digital/tools/review-response">review response generator</Link>{" "}
        shows what a draft looks like.
      </p>

      <h2>What should a plumber not hand to AI?</h2>

      <p>
        Keep diagnosis, code questions, gas work, repair advice to customers and final prices
        with licensed people. A model cannot see the pipe, test the pressure or read your
        local plumbing code, and it answers wrong questions with the same confidence as right
        ones. A bad answer here floods a house.
      </p>

      <ul>
        <li><strong>Remote diagnosis.</strong> A bot can collect symptoms. It should never tell a customer what failed.</li>
        <li><strong>Do-it-yourself repair steps.</strong> Beyond the main shutoff, these go to a plumber.</li>
        <li><strong>Code and permit questions.</strong> Answered by your licensed staff from your local code.</li>
        <li><strong>Final pricing.</strong> Drafts only, signed off by a person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Plumbing task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Incoming calls and messages</th><td>Collects details and flags emergencies</td><td>Decides dispatch</td></tr>
          <tr><th scope="row">Job summaries</th><td>Drafts from tech notes</td><td>Checks parts, prices and advice</td></tr>
          <tr><th scope="row">Quote follow-ups</th><td>Writes each message</td><td>Keeps the list current and calls replies</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Reads and posts it</td></tr>
          <tr><th scope="row">Diagnosis and code</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to plumbing customer data in AI tools?</h2>

      <p>
        Treat customer names, addresses, phone numbers and job notes as private, and keep
        card numbers, door codes, gate codes and alarm codes out of AI chats entirely. Use a
        business plan of your AI tool with training on your chats turned off. This is general
        information, and your own counsel can answer questions about your state.
      </p>

      <p>
        Marketing texts, such as a drain-cleaning offer, need the customer&apos;s prior
        written consent under federal telemarketing rules.
      </p>

      <h2>What can Purcell Ventures set up for a plumbing business?</h2>

      <p>
        I can train your office and plumbers, add tools to your website, or build software for
        a gap your current system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on job
          summaries, follow-up wording and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form and review request automation, or an AI
          chatbot trained on your business with online booking. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a tool that routes after-hours messages to the on-call plumber is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your business in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers phone answering and
        follow-ups in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
