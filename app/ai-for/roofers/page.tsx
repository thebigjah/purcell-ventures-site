import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "roofers";

export default function AiForRoofers() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for roofers"
      lede="Where AI helps a roofing company write inspection reports, sort storm-season leads and draft insurance paperwork, what stays with the inspector on the roof, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software and
        train small business teams to use AI tools, and I run my own company with COSMIC, a
        station of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles
        outreach.
      </p>

      <h2>What can AI do for a roofing company?</h2>

      <p>
        AI handles three roofing jobs well: turning an inspector&apos;s photos and notes into
        a written inspection report, sorting the rush of requests after a storm, and drafting
        the paperwork around an insurance claim. Each one is writing or sorting work, and a
        person who has stood on the roof checks the result.
      </p>

      <p>
        A fourth job fits most roofers too: drafting replies to Google reviews and short
        follow-ups on open quotes. The owner reads each one before it goes out.
      </p>

      <h2>How does AI write a roof inspection report?</h2>

      <p>
        The inspector takes photos and records what they found on each slope: lifted
        shingles, cracked boots, soft decking, damaged flashing. A model turns those notes
        into a report in your format, with each photo labeled and placed next to the finding
        it supports. The inspector reads the whole report before the homeowner gets it.
      </p>

      <p>
        Give the model only what the inspector wrote. If you ask it to describe a photo on its
        own, it will name damage that may not be there, or miss damage that is.
      </p>

      <h2>How do I sort storm-season roofing leads with AI?</h2>

      <p>
        After a hail or wind event, a website form or chat collects the address, the problem
        and whether water is coming in right now. AI sorts each request by urgency and by your
        service area, drafts a reply with the next open inspection day, and flags active
        leaks for a tarp crew. A person sets the schedule.
      </p>

      <p>
        Write the rules first: which ZIP codes you serve, what counts as urgent, and what the
        reply promises. A tool that books more inspections than your crews can reach makes the
        week worse, so tie it to the real calendar.
      </p>

      <h2>Can AI draft roofing insurance claim paperwork?</h2>

      <p>
        Yes, as drafts a person checks. AI can write the inspection summary, a numbered photo
        log and a plain letter that explains to the homeowner what happens next. It cannot
        decide what a claim should include, and each insurer sets its own requirements, so
        your staff follow the carrier&apos;s instructions.
      </p>

      <p>
        Keep every statement in the paperwork tied to something the inspector saw. A draft
        that overstates damage puts the homeowner and your company at risk, and state rules on
        how contractors take part in claims vary.
      </p>

      <h2>What should a roofer not hand to AI?</h2>

      <p>
        Keep damage calls, repair-or-replace decisions, claim strategy and final prices with
        people. A model cannot walk the roof, test the decking or feel a soft spot, and it
        will judge a photo with confidence anyway. A wrong judgment here costs a homeowner a
        roof or costs you a dispute.
      </p>

      <ul>
        <li><strong>Damage judgment from photos.</strong> AI organizes photos. The inspector decides what they show.</li>
        <li><strong>Repair or replace.</strong> Decided by your inspector and the owner.</li>
        <li><strong>What a claim should include.</strong> Your staff follow the carrier, and AI writes no claim advice.</li>
        <li><strong>Final pricing and warranty terms.</strong> Drafts only, signed off by a person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Roofing task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Inspection reports</th><td>Writes up the inspector&apos;s notes and photos</td><td>Inspects the roof and checks the report</td></tr>
          <tr><th scope="row">Storm-season leads</th><td>Sorts by urgency and area, drafts replies</td><td>Sets the inspection schedule</td></tr>
          <tr><th scope="row">Claim paperwork</th><td>Drafts summaries, photo logs and letters</td><td>Checks every line and follows the carrier</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Reads and posts it</td></tr>
          <tr><th scope="row">Damage calls</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to roofing customer data in AI tools?</h2>

      <p>
        Treat customer names, addresses, phone numbers, photos of the home and inspection notes
        as private. Keep card numbers, policy numbers, claim numbers and gate or alarm codes
        out of consumer AI chats. Use a business plan with training on your chats turned off.
        This is general information, and your own counsel can answer questions about your state.
      </p>

      <p>
        Storm-season texts that market to a homeowner need their prior written consent under
        federal telemarketing rules, so collect it on the request form.
      </p>

      <h2>What can Purcell Ventures set up for a roofing company?</h2>

      <p>
        I can train your office and inspectors, add tools to your website, or build software
        for a gap your current system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on inspection
          write-ups, claim paperwork drafts and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form and review request automation, or an AI
          chatbot trained on your business with online booking for inspections. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a notes-and-photos-to-report tool in your format is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your company in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers lead follow-up and
        review requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
