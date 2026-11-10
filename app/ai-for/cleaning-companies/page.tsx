import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "cleaning-companies";

export default function AiForCleaningCompanies() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for cleaning companies"
      lede="Where AI helps a residential or commercial cleaning company with quote requests, scheduling and recurring reminders, the privacy cautions around home access, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams to use AI tools, and run my own company with COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a cleaning company?</h2>

      <p>
        AI handles three cleaning jobs well: turning photos and room counts into a clean quote
        request, writing the confirmations and reschedule notices that keep a schedule
        running, and reminding recurring clients what to expect before each visit. Each job
        repeats every week, and the owner sets the prices and decides which cleaner goes
        where.
      </p>

      <p>
        A fourth job fits most companies: drafting replies to Google reviews. The owner reads
        each reply before it posts, and the free{" "}
        <Link href="/digital/tools/review-response">review response generator</Link> shows
        what a draft looks like.
      </p>

      <h2>How does AI handle cleaning quote requests?</h2>

      <p>
        A website form asks for the address, the number of bedrooms and bathrooms, the square
        footage, pets, the type of clean and a few photos of the kitchen and bathrooms. AI can
        sort the request, flag missing details and draft a price from your own rate sheet for
        a standard recurring clean.
      </p>

      <p>
        A first deep clean, a move-out or an office after a renovation can take far longer than
        the photos suggest. Treat the AI price as a range for the client and send those jobs
        to the owner for a final number, by video call or a walk-through. The free{" "}
        <Link href="/digital/tools/estimate-generator">estimate generator</Link> shows what a
        draft estimate looks like.
      </p>

      <h2>Can AI help with cleaning schedules?</h2>

      <p>
        Scheduling software books recurring cleans, assigns cleaners and sends each crew its
        day. AI fits around it: drafting the confirmation a new client receives, the notice
        when a visit has to move, and a short crew note from the client&apos;s preferences,
        such as which rooms to skip or which products to avoid.
      </p>

      <p>
        Keep the decisions with the office. When a cleaner calls in sick at 7 a.m., a person
        decides which clients move and calls the ones who will mind. A tool can send the
        message once that decision exists.
      </p>

      <h2>How do recurring cleaning reminders work?</h2>

      <p>
        Your booking system already knows every weekly, biweekly and monthly visit, so let it
        send the reminder the day before. AI helps write the message: the arrival window, a
        note to secure pets, and what to pick up so the crew can clean the floors. A second
        template covers holidays and schedule changes.
      </p>

      <p>
        Marketing texts, such as a spring deep-clean offer, need the client&apos;s prior
        written consent under federal telemarketing rules. Ask for it on the booking form,
        and your texting provider can tell you how it handles opt-outs.
      </p>

      <h2>What should a cleaning company not hand to AI?</h2>

      <p>
        Keep final prices, chemical safety and complaints with people. A model will suggest a
        cleaning mix in a confident tone, and some household chemicals release toxic gas when
        combined, such as bleach with ammonia. Your cleaners follow the product label and the
        Safety Data Sheet, never a chatbot.
      </p>

      <ul>
        <li><strong>Final prices.</strong> The owner sets them for deep cleans and move-outs.</li>
        <li><strong>Chemical choices.</strong> Cleaners follow the label and the Safety Data Sheet.</li>
        <li><strong>Damage and complaints.</strong> The owner replies in person.</li>
        <li><strong>Home access details.</strong> They stay in your scheduling software.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Cleaning company task</th>
            <th scope="col">AI role</th>
            <th scope="col">Owner&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Quote requests</th><td>Sorts details and drafts a range</td><td>Sets the final price</td></tr>
          <tr><th scope="row">Schedule changes</th><td>Writes the client notice</td><td>Decides who moves</td></tr>
          <tr><th scope="row">Visit reminders</th><td>Writes the templates</td><td>Keeps the schedule current</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Edits and posts</td></tr>
          <tr><th scope="row">Chemical safety</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to cleaning client data in AI tools?</h2>

      <p>
        A cleaning company holds keys to people&apos;s homes. Treat door codes, alarm codes,
        key locations and notes about when a client travels as the most sensitive data you
        keep, and never paste them into an AI chat. Limit them in your software to the
        cleaners who need them for that visit. Federal workplace rules also require employers
        to give workers access to Safety Data Sheets for the chemicals they use. This is
        general information, and your own counsel can answer questions about your state.
      </p>

      <h2>What can Purcell Ventures set up for a cleaning company?</h2>

      <p>
        I can train your office staff, add quote, scheduling and booking tools to your
        website, or build software for a gap your booking app leaves. Each route has a
        published price on its own page, and the first conversation about which one fits is
        free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on quote
          replies, reminder wording and review replies: $175 an hour 1-on-1, $125 a person for
          groups of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form, a staff scheduler and review request automation at $179 a
          month, or a photo-to-quote estimate generator, an AI chatbot trained on your business
          and online booking at $279 a month. Setup is $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that turns client preferences into a crew note for each visit, runs
          $1,500 to $3,500.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your company in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the office hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and reminders in
        more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
