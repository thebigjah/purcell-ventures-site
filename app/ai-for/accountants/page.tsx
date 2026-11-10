import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "accountants";

export default function AiForAccountants() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for accountants"
      lede="Where AI helps an accounting or tax practice with document intake, engagement letters and tax-season questions, the confidentiality limits on client data, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for an accounting firm?</h2>

      <p>
        AI handles three office jobs well in an accounting or tax practice: building document
        checklists for each kind of client, drafting engagement letters and routine client
        emails, and answering the same tax-season questions about deadlines, fees and the
        portal. Each job repeats every season, and none of them needs AI to see a
        client&apos;s return.
      </p>

      <p>
        A fourth job fits most firms: summarizing a long IRS notice or a new rule into plain
        notes for staff. A preparer checks every summary against the source before anyone acts
        on it, and the notice itself carries no client identifiers when it goes into the tool.
      </p>

      <h2>How does AI help with client document intake?</h2>

      <p>
        AI can draft a checklist for each client type, such as a salaried
        household, a sole proprietor, a rental property owner or a small partnership, and
        write the first request email and two follow-ups in your firm&apos;s voice.
      </p>

      <p>
        Write the checklists once in a general AI tool with no client names in them, then
        load the finished text into your practice management system or client portal. The
        client data stays in the system your firm already secures.
      </p>

      <h2>Can AI draft engagement letters and client emails?</h2>

      <p>
        Yes, as first drafts. Give the tool your own engagement letter template and the facts
        of the job: the services, the tax years, the fee and the deadline. It returns a clean
        draft in a minute, and the same method works for extension notices and missing-form
        requests. The preparer who owns the engagement reads the scope and terms line by line
        before anyone signs.
      </p>

      <h2>Can AI answer tax-season questions for clients?</h2>

      <p>
        For questions about your firm, yes. A website chatbot or FAQ page can tell a client
        when you need their documents, how the portal works, what a return costs to start,
        how extensions work at your office and when you are open. Your staff write every
        answer, and the tool repeats only those answers.
      </p>

      <p>
        Questions about one client&apos;s taxes go to a preparer. The bot collects a name and
        the question, and a person replies. That handoff keeps tax advice with your
        preparers and client details out of the chatbot.
      </p>

      <h2>What should an accounting firm not hand to AI?</h2>

      <p>
        Keep tax positions, return review, signatures and anything about a specific
        client&apos;s finances with your preparers. A model will quote a deduction limit or a
        filing rule in a confident tone, and it can be a year out of date or simply wrong.
      </p>

      <ul>
        <li><strong>Tax advice.</strong> A preparer answers every question about one client&apos;s taxes.</li>
        <li><strong>Return preparation and review.</strong> Your tax software and your staff handle both.</li>
        <li><strong>Client records.</strong> They stay in your portal and practice software.</li>
        <li><strong>Signatures and filings.</strong> The responsible preparer signs and files.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Accounting firm task</th>
            <th scope="col">AI role</th>
            <th scope="col">Preparer&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Document checklists</th><td>Drafts one per client type</td><td>Loads them into the portal</td></tr>
          <tr><th scope="row">Engagement letters</th><td>Drafts from your template</td><td>Checks scope and fees and signs</td></tr>
          <tr><th scope="row">Tax-season FAQ</th><td>Answers firm questions from a written list</td><td>Handles questions about one client</td></tr>
          <tr><th scope="row">Notice summaries</th><td>Summarizes in plain words</td><td>Checks against the source</td></tr>
          <tr><th scope="row">Tax advice</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What confidentiality rules apply to AI in an accounting firm?</h2>

      <p>
        Tax preparers work under federal rules on taxpayer data. Section 7216 of the Internal
        Revenue Code limits how a preparer may use or disclose return information, and the
        IRS expects professional preparers to keep a written information security plan, as
        its Publication 4557 explains. CPAs also answer to their own professional and state
        board rules. This is general information, and your counsel or professional body can
        confirm what applies to your firm.
      </p>

      <p>
        In practice, a firm approves its AI tools in writing, uses business plans with
        training on firm data turned off, and keeps returns, Social Security numbers and bank
        details out of any tool it has not approved.
      </p>

      <h2>What can Purcell Ventures set up for an accounting firm?</h2>

      <p>
        I can train your preparers and admin staff, add a firm FAQ and booking to your
        website, or build a small tool around your own checklists and templates. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on checklist
          and letter drafting and a staff AI rule, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder for deadline, fee and portal questions, or an AI
          chatbot trained on your firm and branded online booking for client meetings. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that builds each client&apos;s checklist from last year&apos;s list of
          forms, is quoted after a free call.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your firm in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the staff hours saved in tax season cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers reminders and follow-ups
        in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
