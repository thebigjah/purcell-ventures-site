import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "med-spas";

export default function AiForMedSpas() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for med spas"
      lede="Where AI helps a med spa with booking, consult intake and aftercare from approved templates, the medical and HIPAA cautions around client data, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a med spa?</h2>

      <p>
        AI handles three front-desk jobs well in a med spa: booking appointments and answering
        general questions about services, collecting the basic details for a consultation, and
        sending aftercare instructions that your medical director has already written and
        approved. Each job repeats every day, and a licensed provider makes every clinical
        call.
      </p>

      <p>
        A fourth job fits most practices: drafting captions and replies to Google reviews. A
        reply must never confirm that the reviewer is a client or mention their treatment, so
        a person reads each draft before it posts.
      </p>

      <h2>How does AI help with med spa booking?</h2>

      <p>
        A branded booking page tied to each provider&apos;s calendar can book a facial, a
        laser session or a consultation at any hour, with the length and room rules you set
        for each service. A website chatbot can answer what a service is, how long it takes,
        what it costs to start and how to prepare, from answers your team writes.
      </p>

      <p>
        Set the rule that a first injectable or laser treatment starts with a consultation.
        The booking page can enforce it, and a provider decides at the consult whether the
        client is a good candidate.
      </p>

      <h2>Can AI handle med spa consultation intake?</h2>

      <p>
        Partly. A booking form can collect a name, contact details, the treatment of interest
        and the times that work. AI can help rewrite a long paper intake packet into plain
        questions and draft the welcome email that links to it.
      </p>

      <p>
        The health history itself, including medications, allergies, pregnancy and past
        procedures, belongs in a system built for health data, with the right agreement in
        place. A licensed provider reviews it before any treatment. A general chatbot never
        collects it.
      </p>

      <h2>How should a med spa use AI for aftercare instructions?</h2>

      <p>
        Your medical director writes and approves the aftercare for each treatment: what to
        avoid, what is normal, and which signs mean the client should call right away. AI can
        help format that text into a clean email or text and schedule it after each visit.
        The wording stays exactly as approved.
      </p>

      <p>
        A model asked to write aftercare from scratch will produce instructions that sound
        right and may be wrong for your products and protocols. Every message should also
        tell the client how to reach the practice after hours, and to call 911 for an
        emergency.
      </p>

      <h2>What should a med spa not hand to AI?</h2>

      <p>
        Keep candidacy, dosing, treatment plans, side effects and anything about a specific
        client with your licensed providers. A model will answer a question about swelling
        after filler in a confident tone, and a wrong answer there can hurt someone.
      </p>

      <ul>
        <li><strong>Symptoms after a treatment.</strong> The bot alerts a provider at once and gives no advice.</li>
        <li><strong>Candidacy and dosing.</strong> A licensed provider decides at the consult.</li>
        <li><strong>Health history and photos.</strong> They stay in a system built for health data.</li>
        <li><strong>New aftercare text.</strong> Your medical director writes and approves it.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Med spa task</th>
            <th scope="col">AI role</th>
            <th scope="col">Provider&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Booking</th><td>Books by your service rules</td><td>Sets the rules and the consult step</td></tr>
          <tr><th scope="row">Consult intake</th><td>Collects contact and scheduling details</td><td>Reviews health history</td></tr>
          <tr><th scope="row">Aftercare</th><td>Formats and sends approved text</td><td>Writes and approves it</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Removes client details and posts it</td></tr>
          <tr><th scope="row">Clinical questions</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What HIPAA and medical cautions apply to AI in a med spa?</h2>

      <p>
        HIPAA applies to covered entities, which include health care providers that send
        certain transactions electronically, such as insurance claims. Whether that includes
        your med spa depends on how it operates and bills, and state privacy and medical
        practice laws can apply either way. States also set their own rules on who may
        perform and supervise injectables and lasers. This is general information, and your
        counsel can confirm your setup.
      </p>

      <p>
        A simple staff rule covers most of the risk: treat every client&apos;s health details
        and treatment photos as protected, keep them out of consumer AI chats, and let AI work
        only on templates and general answers.
      </p>

      <h2>What can Purcell Ventures set up for a med spa?</h2>

      <p>
        I can train your front desk, add booking and general FAQ tools to your website that
        hold no health information, or build a small tool for a gap your software leaves. Each
        route has a published price on its own page, and the first conversation about which
        one fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on captions,
          review replies and a staff AI rule: $175 an hour 1-on-1, $125 a person for groups of
          2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder for general service questions at $179 a month, or an AI chatbot
          trained on your services and branded online booking at $279 a month. Setup is $650
          to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> runs
          $1,500 to $3,500, scoped around where health data may and may not go.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your practice in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the front-desk hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and reminders in
        more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
