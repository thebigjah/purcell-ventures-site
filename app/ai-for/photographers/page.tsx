import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "photographers";

export default function AiForPhotographers() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for photographers"
      lede="Where AI helps a photography business with inquiry replies, session prep guides and culling, what stays with the photographer, the client photo cautions, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams to use AI tools, and run my own company with COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a photographer?</h2>

      <p>
        AI handles three photography business jobs well: drafting replies to inquiries,
        writing a prep guide for each type of session, and speeding up the first pass of
        culling. Each job repeats with every booking, and the photographer checks every reply
        and makes every final pick.
      </p>

      <p>
        A fourth job fits most photographers: drafting captions and blog posts for a finished
        session. You edit each one before it posts, and the free{" "}
        <Link href="/digital/tools/caption-generator">caption generator</Link> shows what a
        draft looks like.
      </p>

      <h2>How does AI help with photography inquiry replies?</h2>

      <p>
        An inquiry often arrives at night, from a couple planning a wedding or a parent
        booking family photos. AI can draft a reply from your own packages, starting prices,
        travel policy and open dates, and ask the questions you always ask: the date, the
        location, the number of people and what the photos are for.
      </p>

      <p>
        Read every draft before it sends. A model will invent a package or quote last
        year&apos;s price in a confident tone, and a first reply sets the client&apos;s
        expectations for the whole job. Keep a current price sheet in one place and give the
        tool only that.
      </p>

      <h2>Can AI write session prep guides?</h2>

      <p>
        Yes, as first drafts. Give the tool your own advice for each session type: what to
        wear, what colors photograph well, when golden hour falls, what to bring for the kids
        and how the day will run. It returns a clean guide you can send as a PDF or email.
      </p>

      <p>
        Edit each guide so it sounds like you and matches how you shoot. A wedding timeline,
        a newborn session and a business headshot need very different advice, and the client
        should hear it in your voice.
      </p>

      <h2>How should photographers use AI for culling?</h2>

      <p>
        AI culling tools can sort a long shoot in minutes, flagging closed eyes, missed focus
        and near-duplicate frames. Use that as a first pass. The photographer still reviews
        every flagged frame and makes every final pick, since the tool cannot judge the
        moment, the story of the day or which cousin the bride most wants in the album.
      </p>

      <p>
        The same goes for AI editing. Use it for repetitive adjustments you would make anyway,
        and check every image before delivery. Tell clients if you use generative tools to
        add or remove anything that was not in the frame.
      </p>

      <h2>What should a photographer not hand to AI?</h2>

      <p>
        Keep final selections, contracts, pricing decisions and hard client conversations
        with you. A model can draft a contract clause that sounds correct and leaves out the
        terms that protect you.
      </p>

      <ul>
        <li><strong>Final picks.</strong> The photographer chooses every delivered image.</li>
        <li><strong>Contracts.</strong> You use your own contract, reviewed by counsel.</li>
        <li><strong>Custom quotes.</strong> You price unusual jobs yourself.</li>
        <li><strong>Complaints.</strong> You reply in person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Photography task</th>
            <th>AI role</th>
            <th>Photographer&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Inquiry replies</strong></td><td>Drafts from your price sheet</td><td>Checks and sends</td></tr>
          <tr><td><strong>Session prep guides</strong></td><td>Drafts one per session type</td><td>Edits in your voice</td></tr>
          <tr><td><strong>Culling</strong></td><td>Flags blinks, focus misses and duplicates</td><td>Makes every final pick</td></tr>
          <tr><td><strong>Captions and blog posts</strong></td><td>Drafts each one</td><td>Edits and posts with client permission</td></tr>
          <tr><td><strong>Contracts and final quotes</strong></td><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy and rights cautions apply to client photos in AI tools?</h2>

      <p>
        Under United States copyright law, the photographer usually owns the copyright in the
        images unless a contract says otherwise, and posting a recognizable person for
        advertising generally calls for their written release. Before you upload client
        photos to any AI tool, read its terms on storage and training, and choose tools that
        keep your uploads out of model training. This is general information, and your own
        counsel can answer questions about your contracts and state.
      </p>

      <p>
        Take extra care with photos of children, boudoir and maternity sessions, and any
        gallery a client marked private. Those images stay in your own storage unless the
        client agrees otherwise.
      </p>

      <h2>What can Purcell Ventures set up for a photographer?</h2>

      <p>
        I can train you and any assistants, add booking and inquiry tools to your website, or
        build software for a gap your studio app leaves. Each route has a published price on
        its own page, and the first conversation about which one fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on inquiry
          replies, prep guides and captions: $175 an hour 1-on-1, $125 a person for groups of 2
          to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> start
          with a caption generator and email and SMS composers at $99 a month. Growth adds an
          AI FAQ builder and an AI content generator trained on your brand at $179 a month. Full
          Service adds branded online booking and an AI chatbot trained on your business at
          $279 a month. Setup is $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that drafts each inquiry reply from your price sheet, runs $1,500 to
          $3,500.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your business in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and follow-ups in
        more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
