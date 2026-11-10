import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "real-estate-agents";

export default function AiForRealEstate() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for real estate agents"
      lede="Where AI helps a real estate agent with listing descriptions, lead follow-up and showing feedback, the fair housing and MLS cautions, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a real estate agent?</h2>

      <p>
        AI handles three jobs well for an agent: writing listing descriptions from the
        property facts, drafting fast replies and follow-ups to new leads, and summarizing
        showing feedback for sellers. Each is writing work that repeats with every listing,
        and the agent checks each result before a client or the public sees it.
      </p>

      <p>
        A fourth job fits most agents too: social posts and neighborhood updates written from
        your own notes. The free{" "}
        <Link href="/digital/tools/caption-generator">caption generator</Link> shows what a
        draft looks like.
      </p>

      <h2>How do I use AI to write listing descriptions?</h2>

      <p>
        Give the model the facts: bedrooms, baths, square footage, upgrades with their years,
        lot details and the features a buyer will notice first. Ask for a description in your
        MLS character limit and your own voice. Then check every claim against the listing
        data and your seller&apos;s disclosures.
      </p>

      <p>
        Models add details nobody gave them, such as a renovated kitchen or a quiet street.
        Each one becomes a claim in your name. Delete anything you cannot confirm, and keep
        the copy about the house rather than the buyer.
      </p>

      <h2>Can AI follow up with real estate leads?</h2>

      <p>
        Yes. When a lead comes in from your site or a portal, a CRM can send an immediate
        reply and alert you, then send follow-ups on fixed days until the lead answers. AI
        drafts messages that mention the home or area the lead asked about, and you approve
        them before they go.
      </p>

      <p>
        Texts and automated calls to leads carry federal consent rules, and the Do Not Call
        registry applies to cold outreach. Collect consent on your forms and check your
        brokerage&apos;s rules before you automate anything.
      </p>

      <h2>How can AI summarize showing feedback for sellers?</h2>

      <p>
        Paste the feedback from each showing agent into an AI tool and ask for a short weekly
        summary for your seller: what buyers liked, what they raised as concerns, and how
        often price came up. You check the summary against the original notes, then add your
        own advice on next steps.
      </p>

      <h2>What should a real estate agent not hand to AI?</h2>

      <p>
        Keep pricing, negotiation, contract terms, disclosures and fiduciary advice with the
        agent and the brokerage. A model cannot see the house or read the local market the
        way a comparative market analysis does, and it states a wrong number in the same
        tone as a right one.
      </p>

      <ul>
        <li><strong>List price and offers.</strong> You set and advise on them from real comparables.</li>
        <li><strong>Contracts and addenda.</strong> Your forms, your broker and, where needed, an attorney.</li>
        <li><strong>Disclosures.</strong> They come from the seller and the property records.</li>
        <li><strong>Questions about who lives in a neighborhood.</strong> Point buyers to public sources and let them decide.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Agent task</th>
            <th scope="col">AI role</th>
            <th scope="col">Agent&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Listing descriptions</th><td>Drafts from property facts</td><td>Checks claims and fair housing wording</td></tr>
          <tr><th scope="row">Lead follow-up</th><td>Drafts replies and follow-ups</td><td>Approves and collects consent</td></tr>
          <tr><th scope="row">Showing feedback</th><td>Summarizes notes for the seller</td><td>Checks it and adds advice</td></tr>
          <tr><th scope="row">Social posts</th><td>Drafts from your notes</td><td>Reads and posts</td></tr>
          <tr><th scope="row">Pricing and contracts</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What fair housing and MLS rules apply to AI copy?</h2>

      <p>
        The federal Fair Housing Act bars ads that state a preference for or against buyers
        by race, color, religion, sex, disability, familial status or national origin. AI
        copy can slip in steering words such as &quot;perfect for young families,&quot; so a
        person reads every line. This is general information, and your broker or a lawyer
        can answer questions about a specific listing.
      </p>

      <p>
        Your MLS sets its own rules on photos, remarks and claims, and some MLSs require a
        label on edited or virtually staged photos. Check them before you post AI-edited images or
        copy, and keep client financial details out of consumer AI chats.
      </p>

      <h2>What can Purcell Ventures set up for a real estate agent?</h2>

      <p>
        I can train you or your team, add lead and booking tools to your website, or build a
        small tool for a gap your CRM leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on listing
          copy, lead replies and fair housing checks, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI content generator trained on your brand and an AI FAQ builder, or
          an AI chatbot, online booking for showings and consultations and an email and SMS
          campaign system. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a showing feedback collector that drafts the seller summary is quoted after a free call.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your business in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers lead follow-up in more
        depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
