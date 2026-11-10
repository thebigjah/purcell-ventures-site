import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "flooring-companies";

export default function AiForFlooring() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for flooring companies"
      lede="Where AI helps a flooring company with estimates, quote follow-ups, showroom questions and review replies, what stays with the estimator and installer, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software and
        train small business teams to use AI tools. My own company runs on COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a flooring company?</h2>

      <p>
        AI handles four flooring jobs well: writing estimates from the measurements your
        estimator takes, following up on open quotes, answering the same showroom and product
        questions, and drafting replies to Google reviews. Each one is writing or sorting work
        that repeats every week, and a person checks the result before it reaches a customer.
      </p>

      <p>
        None of these jobs needs a new system on day one. A general assistant such as ChatGPT,
        Claude or Gemini can draft all four from your own notes, prices and product list.
      </p>

      <h2>How does AI write a flooring estimate from measurements?</h2>

      <p>
        The estimator records room dimensions, the product, the subfloor condition and any
        stairs or transitions. A model turns those notes into a written estimate in your
        format, with square footage, waste allowance, removal, prep and install as separate
        lines. The estimator checks each figure before the customer sees it.
      </p>

      <p>
        Give the model your own price sheet and your own waste rules for each product type,
        such as plank, tile on a diagonal or patterned carpet. Without them it will invent a
        number that looks right. The free{" "}
        <Link href="/digital/tools/estimate-generator">estimate generator</Link> shows what a
        first draft looks like.
      </p>

      <h2>How do I follow up on flooring quotes with AI?</h2>

      <p>
        Keep every open quote in one list with the date sent, then send a short follow-up on
        fixed days until the customer answers. AI writes a message that names the room and
        the product the customer picked. A scheduling tool or CRM sends it, and the owner
        calls anyone who replies.
      </p>

      <p>
        Flooring quotes often sit while a homeowner compares samples or waits on a move-in
        date. A follow-up that offers to bring more samples or hold an install slot gives
        them a reason to answer, and the AI draft makes that easy to send every time.
      </p>

      <h2>Can AI answer showroom and product questions?</h2>

      <p>
        Yes, for the questions you already answer every week: which lines you carry, how to
        clean luxury vinyl, whether you install on stairs, your service area and how to book
        a measure. Write those answers down first, then a website chatbot or a staff member
        with an AI assistant can give them at any hour.
      </p>

      <p>
        Questions about one specific floor go to a person. A bot cannot see cupping, a
        moisture problem or an uneven slab, and a confident wrong answer there leads to a
        failed install.
      </p>

      <h2>What should a flooring company not hand to AI?</h2>

      <p>
        Keep measuring, subfloor and moisture calls, product recommendations for a specific
        room, and final pricing with your estimator and installers. A model cannot see the
        job site, and manufacturer warranties depend on install conditions only your crew can
        check. AI drafts the paperwork around those decisions.
      </p>

      <ul>
        <li><strong>Measurements.</strong> Taken on site by a person, never estimated from a photo.</li>
        <li><strong>Moisture and subfloor calls.</strong> Tested and judged by your crew.</li>
        <li><strong>Warranty terms.</strong> Copied from the manufacturer, never written fresh by a model.</li>
        <li><strong>Final price.</strong> Set and signed off by the owner or estimator.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Flooring task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Estimates</th><td>Drafts from measurements and your price sheet</td><td>Measures, prices and checks each line</td></tr>
          <tr><th scope="row">Quote follow-ups</th><td>Writes each message</td><td>Keeps the quote list current and calls replies</td></tr>
          <tr><th scope="row">Showroom questions</th><td>Answers from your written answers</td><td>Handles questions about a specific floor</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Reads and posts it</td></tr>
          <tr><th scope="row">Moisture and subfloor</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to flooring customer data in AI tools?</h2>

      <p>
        Treat customer names, addresses, phone numbers and job notes as private, and keep card
        numbers, lockbox codes and alarm details out of AI chats entirely. Use a business plan
        of your AI tool with training on your chats turned off. This is general information,
        and your own counsel can answer questions about your state.
      </p>

      <p>
        Follow-up texts that market to a customer need their prior written consent under
        federal telemarketing rules, so collect it on the quote form.
      </p>

      <h2>What can Purcell Ventures set up for a flooring company?</h2>

      <p>
        I can train your office and estimators, add tools to your website, or build software
        for a gap your current system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on estimate
          drafts, follow-up wording and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form, an AI FAQ builder and review request automation, or an AI chatbot trained on your business, online booking for measures and a
          photo-to-quote estimate generator. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a measurements-to-estimate tool tied to your price sheet is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your company in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers follow-ups and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
