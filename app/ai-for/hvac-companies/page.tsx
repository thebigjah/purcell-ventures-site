import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "hvac-companies";

export default function AiForHvac() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for HVAC companies"
      lede="Where AI helps an HVAC company with after-hours calls, maintenance-plan reminders and estimates, what stays with a licensed technician, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software and
        train small business teams to use AI tools, and I run my own company with COSMIC, a
        station of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles
        outreach.
      </p>

      <h2>What can AI do for an HVAC company?</h2>

      <p>
        AI handles three HVAC jobs well: catching service requests that arrive after the
        office closes, reminding maintenance-plan customers when their tune-up is due, and
        turning a technician&apos;s rough notes into a clean estimate. Each one is writing or
        sorting work that repeats every week, and a person checks the result before money
        or safety rides on it.
      </p>

      <p>
        A fourth job fits most shops too: drafting replies to Google reviews. An owner reads
        each reply before it posts, and the free{" "}
        <Link href="/digital/tools/review-response">review response generator</Link> shows
        what a draft looks like.
      </p>

      <h2>How does AI capture after-hours HVAC calls?</h2>

      <p>
        A website chat or request form takes the name, address, equipment type and problem at
        any hour, then texts or emails the on-call tech. An AI voice service can do the same
        by phone. Either way, the tool collects details and a person decides who goes out and
        when.
      </p>

      <p>
        The tool needs three rules written down before it goes live: the questions it may
        answer, the words that send a caller straight to a person, and where each request
        lands. Gas smell, smoke, sparking or a carbon monoxide alarm belongs on that second
        list, with an instruction to leave the house and call 911 or the gas utility.
      </p>

      <p>
        Purcell Ventures does not sell a phone answering product. If you buy one elsewhere,
        call it yourself at 2 a.m. with a no-heat complaint and a gas-smell complaint before
        you trust it with customers.
      </p>

      <h2>How do I automate maintenance-plan reminders with AI?</h2>

      <p>
        Keep every plan customer, their equipment and their last visit date in one list, then
        send a text and an email a few weeks before each spring and fall tune-up with a link
        to book. The schedule needs no AI at all. AI helps with the wording: a short message
        that names the customer&apos;s system and season.
      </p>

      <p>
        Two cautions apply. Marketing texts need the customer&apos;s prior written consent
        under federal telemarketing rules, so collect it when they sign the plan. And a
        reminder list goes wrong without any warning when nobody updates it after each visit, so make the
        technician&apos;s job close-out the step that sets the next date.
      </p>

      <h2>Can AI write HVAC estimates from technician notes?</h2>

      <p>
        Yes, as a first draft. A tech types or dictates what they found, such as a failed
        capacitor, a dirty coil and a ten-year-old condenser, and a model writes a plain
        explanation with a line-item estimate in your format. The tech or owner checks
        every price, part number and model before it reaches the customer.
      </p>

      <p>
        The draft saves the evening hour a tech spends rewriting notes into sentences a
        homeowner can follow. It also makes repair-or-replace options easier to compare,
        because the model can lay out both in the same order each time.
      </p>

      <h2>What should an HVAC company not hand to AI?</h2>

      <p>
        Keep diagnosis, equipment sizing, safety calls and final prices with licensed people.
        A model cannot see the unit, read the gauges or run a load calculation on the house,
        and it will still answer with confidence. A wrong answer here costs a callback, a
        bad install or worse.
      </p>

      <ul>
        <li><strong>Equipment sizing.</strong> A Manual J load calculation or your own method, done by your staff.</li>
        <li><strong>Remote diagnosis.</strong> A bot can collect symptoms. It should never tell a customer what is wrong.</li>
        <li><strong>Refrigerant and gas work advice.</strong> Anything a customer might try themselves goes to a technician.</li>
        <li><strong>Final pricing and warranty terms.</strong> Drafts only, signed off by a person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">HVAC task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">After-hours requests</th><td>Collects details and alerts on-call staff</td><td>Decides dispatch and handles emergencies</td></tr>
          <tr><th scope="row">Tune-up reminders</th><td>Writes the message</td><td>Keeps the plan list current</td></tr>
          <tr><th scope="row">Estimates</th><td>Drafts from tech notes</td><td>Sets prices and checks each line</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Reads and posts it</td></tr>
          <tr><th scope="row">Sizing and diagnosis</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to HVAC customer data in AI tools?</h2>

      <p>
        Treat customer names, addresses, phone numbers and job notes as private, and keep
        card numbers, door codes, gate codes and alarm codes out of AI chats entirely. Use a
        business plan of your AI tool with training on your chats turned off. This is general
        information, and your own counsel can answer questions about your state.
      </p>

      <h2>What can Purcell Ventures set up for an HVAC company?</h2>

      <p>
        I can train your office and techs, add tools to your website, or build software for a
        gap your current system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on estimate
          drafts, reminder wording and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form and review request automation, or an AI
          chatbot trained on your business, online booking and a photo-to-quote estimate
          generator. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a tech-notes-to-estimate tool tied to your price book is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your shop in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers phone answering and
        follow-ups in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
