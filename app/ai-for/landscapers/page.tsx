import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "landscapers";

export default function AiForLandscapers() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for landscapers"
      lede="Where AI helps a landscaping or lawn care company with quote requests from photos, crew scheduling and seasonal reminders, what stays with the crew lead, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a landscaping company?</h2>

      <p>
        AI handles three landscaping jobs well: turning yard photos and a short form into a
        clean quote request, writing the messages that go out when weather moves the
        schedule, and reminding customers when a seasonal service comes due. Each job repeats
        all season, and the owner or crew lead sets every price and every route.
      </p>

      <p>
        A fourth job fits most companies: drafting captions for before-and-after photos and
        replies to Google reviews. The owner reads each draft before it posts, and the free{" "}
        <Link href="/digital/tools/caption-generator">caption generator</Link> shows what a
        draft looks like.
      </p>

      <h2>How does AI handle landscaping quote requests from photos?</h2>

      <p>
        A website form asks for the address, the service, the rough size of the yard and three
        or four photos from the street and the back. AI can sort the request by service type,
        flag missing details and draft a starting estimate from your own price sheet for
        simple work, such as weekly mowing on a flat lot or a mulch refresh.
      </p>

      <p>
        Photos hide a lot: slopes, soft ground, roots, drainage, gate widths and buried
        lines. Treat the AI estimate as a range for the customer and a starting point for you.
        Hardscapes, grading, tree work and drainage jobs need a site visit before anyone
        names a price. The free{" "}
        <Link href="/digital/tools/estimate-generator">estimate generator</Link> shows what a
        draft estimate looks like.
      </p>

      <h2>Can AI help schedule landscaping crews?</h2>

      <p>
        Scheduling and routing software places recurring jobs on each crew&apos;s day. AI fits
        around it: drafting the text that goes to every customer on a route when rain pushes
        the day back, and turning a crew lead&apos;s voice notes into a short job summary for the
        office.
      </p>

      <p>
        Keep the decisions with people. The crew lead knows which yards flood, which gates
        stick and which customers need a call before the mowers arrive. A tool can send the
        message, and the lead decides whether the day moves.
      </p>

      <h2>How do seasonal service reminders work?</h2>

      <p>
        Landscaping runs on a calendar: spring cleanup, aeration and overseeding, summer
        mowing, leaf removal and winter prep. Your customer list and an email or texting tool
        can send each reminder on dates you set, with a link to book. The schedule needs no
        AI. AI helps write short messages that name the service and the season.
      </p>

      <p>
        Marketing texts need the customer&apos;s prior written consent under federal
        telemarketing rules, so ask for it on the quote form. Your texting provider can tell
        you how it handles consent and opt-outs.
      </p>

      <h2>What should a landscaping company not hand to AI?</h2>

      <p>
        Keep final prices, chemical treatments and safety calls with trained people. A model
        will recommend a herbicide and a mix rate in a confident tone, and a wrong answer can
        kill a lawn, harm a pet or break your state&apos;s rules.
      </p>

      <ul>
        <li><strong>Final prices.</strong> The owner or crew lead sets them, often after a site visit.</li>
        <li><strong>Chemical applications.</strong> Licensed staff follow the product label.</li>
        <li><strong>Tree and grading work.</strong> A trained person judges the risk on site.</li>
        <li><strong>Damage claims.</strong> The owner handles them in person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Landscaping task</th>
            <th>AI role</th>
            <th>Crew lead&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Quote requests</strong></td><td>Sorts photos and drafts a range</td><td>Sets the final price</td></tr>
          <tr><td><strong>Weather delays</strong></td><td>Writes the customer message</td><td>Decides whether the day moves</td></tr>
          <tr><td><strong>Seasonal reminders</strong></td><td>Writes the templates</td><td>Sets the dates per service</td></tr>
          <tr><td><strong>Captions and reviews</strong></td><td>Drafts each one</td><td>Edits and posts</td></tr>
          <tr><td><strong>Chemical treatments</strong></td><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What rules apply to landscaping customer data and AI?</h2>

      <p>
        Treat customer names, addresses, gate codes and payment details as private, and keep
        gate codes and alarm details out of AI chats entirely. Pesticide and herbicide work
        follows the product label and your state&apos;s applicator licensing rules, and no AI
        answer changes that. This is general information, and your state agriculture
        department or counsel can answer questions about your business.
      </p>

      <p>
        Photos need care too. Ask before a customer&apos;s house, car or house number appears in
        a post.
      </p>

      <h2>What can Purcell Ventures set up for a landscaping company?</h2>

      <p>
        I can train your office and crew leads, add quote and booking tools to your website,
        or build software for a gap your scheduling app leaves. Each route has a published
        price on its own page, and the first conversation about which one fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on quote
          replies, captions and reminder wording: $175 an hour 1-on-1, $125 a person for groups
          of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form and review request automation at $179 a month, or a
          photo-to-quote estimate generator, an AI chatbot trained on your business and online
          booking at $279 a month. Setup is $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that drafts the weather-delay text for every customer on a route,
          runs $1,500 to $3,500.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your company in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the office hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
