import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "law-firms";

export default function AiForLawFirms() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for law firms"
      lede="Where AI helps a small law firm with intake and first drafts, the confidentiality limits that apply, why a bot never gives legal advice, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a small law firm?</h2>

      <p>
        AI handles three jobs well in a small firm: screening website and phone inquiries
        before an attorney calls back, writing first drafts of routine letters and documents,
        and summarizing long records. Each one saves attorney and staff time, and an attorney
        reviews every result before it reaches a client, a court or the other side.
      </p>

      <p>
        A fourth job fits the business side of most firms: drafting blog posts, practice-area
        pages and replies to reviews. Your state&apos;s advertising rules still apply to every
        word, and a reply to a review must never reveal anything about the reviewer&apos;s
        matter.
      </p>

      <h2>How can AI screen legal intake inquiries?</h2>

      <p>
        A website chat or intake form can collect a name, contact details, the practice area,
        the names of the other parties and any deadline, then route the inquiry to the right
        attorney. It tells the visitor that no attorney-client relationship exists yet and
        asks them to hold back confidential details until someone from the firm calls.
      </p>

      <p>
        The conflicts check stays with the firm. The intake tool gathers the names, and your
        own conflicts system and staff decide whether the firm can take the matter. Screening
        rules, such as practice areas you decline or counties you do not serve, belong in a
        written list the tool follows.
      </p>

      <h2>Can AI draft legal documents for attorney review?</h2>

      <p>
        Yes, as a starting point. A model can draft an engagement letter from your template, a
        demand letter from the facts you give it, or a summary of a deposition or a medical
        record. The attorney rewrites, checks every fact against the file, and signs the final
        version as their own work.
      </p>

      <p>
        Citations need a separate check. General AI models invent case names, quotes and
        citations that look real, and lawyers have faced court sanctions for filing them. Pull
        and read every authority in a trusted research service before a draft leaves the
        office.
      </p>

      <h2>Why should a law firm chatbot never give legal advice?</h2>

      <p>
        A chatbot that answers &quot;do I have a case&quot; or &quot;what should I do&quot;
        gives legal advice with no attorney behind it, and a visitor may rely on it. A
        firm&apos;s bot answers questions about the firm itself, such as practice areas,
        office hours and how consultations work, and sends every legal question to an
        attorney.
      </p>

      <h2>What should a law firm not hand to AI?</h2>

      <p>
        Keep legal judgment, client advice, conflicts decisions, deadlines and anything filed
        with a court with attorneys and staff. A model cannot weigh a client&apos;s goals or
        the local judge, and it states wrong law in the same confident tone as right law.
        Use it for drafts and summaries only.
      </p>

      <ul>
        <li><strong>Case evaluation.</strong> An attorney decides whether to take a matter and what it is worth.</li>
        <li><strong>Deadlines and docketing.</strong> Your calendaring system and staff own them.</li>
        <li><strong>Final filings.</strong> An attorney reads and signs every page.</li>
        <li><strong>Client communication on strategy.</strong> It comes from the attorney.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Law firm task</th>
            <th scope="col">AI role</th>
            <th scope="col">Attorney or staff role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Intake screening</th><td>Collects contact details, parties and dates</td><td>Runs conflicts and decides on the matter</td></tr>
          <tr><th scope="row">Routine letters</th><td>Drafts from a template and facts</td><td>Rewrites, checks and signs</td></tr>
          <tr><th scope="row">Record summaries</th><td>Summarizes long documents</td><td>Checks the summary against the source</td></tr>
          <tr><th scope="row">Research and citations</th><td>Suggests where to look</td><td>Reads every authority before citing it</td></tr>
          <tr><th scope="row">Legal advice</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What confidentiality limits apply to AI in a law firm?</h2>

      <p>
        A lawyer&apos;s duty of confidentiality covers client information typed into an AI
        tool, and the duty of competence covers knowing how that tool stores and uses it.
        The American Bar Association addressed generative AI in Formal Opinion 512 in July
        2024, and several state bars have issued their own guidance. This is general information,
        and your own bar&apos;s rules and ethics counsel govern your firm.
      </p>

      <p>
        In practice, a firm approves its AI tools in writing, uses business plans with
        training on firm data turned off, and keeps client confidences out of any tool it has
        not approved.
      </p>

      <h2>What can Purcell Ventures set up for a law firm?</h2>

      <p>
        I can train your attorneys and staff, add intake and FAQ tools to your website, or
        build a small tool around your own templates. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on drafting,
          summaries, citation checks and a firm AI policy, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder that answers questions about the firm, or an AI
          chatbot with intake questions and online consultation booking. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a template-to-draft tool for one document type is quoted after a free call.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your firm in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers intake follow-up in more
        depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
