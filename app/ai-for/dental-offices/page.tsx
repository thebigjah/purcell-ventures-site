import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "dental-offices";

export default function AiForDental() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for dental offices"
      lede="Where AI helps a dental office with recall reminders, insurance questions and new-patient forms, the HIPAA cautions around patient data, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a dental office?</h2>

      <p>
        AI handles three front-desk jobs well in a dental office: writing recall and hygiene
        reminders, answering general insurance and billing questions from a list the office
        writes, and turning new-patient paperwork into clean online forms. Each job repeats
        every week, and none of them needs AI to see a patient&apos;s chart.
      </p>

      <p>
        A fourth job fits most practices: drafting replies to Google reviews. A reply must
        never confirm that the reviewer is a patient or mention their treatment, so a person
        reads each draft before it posts.
      </p>

      <h2>How does AI help with dental recall reminders?</h2>

      <p>
        Your practice management software already knows who is due for a cleaning, so let it
        send the reminders on schedule. AI helps with the words: a short, warm message for
        the six-month recall, a second nudge for patients who skipped, and a note for
        patients overdue by a year or more.
      </p>

      <p>
        Write the templates in a general AI tool with no patient names in them, then load the
        finished text into the system that sends. The patient data never leaves the software
        that already holds it. Text reminders also need the patient&apos;s consent on file, which
        an office can collect on the intake form.
      </p>

      <h2>Can AI answer dental insurance questions for patients?</h2>

      <p>
        Yes, for the general ones. A website chatbot can tell a caller which insurance plans
        you accept, whether you file claims for them, what payment options you offer and
        what to bring to a first visit. Your office writes every answer, and the bot gives
        only those answers.
      </p>

      <p>
        Questions about one patient&apos;s benefits, remaining coverage or a claim go to the
        front desk. The bot collects a name and a callback number, and a person follows up.
        That handoff keeps the chatbot away from protected health information.
      </p>

      <h2>Can AI handle new-patient forms?</h2>

      <p>
        AI can help an office rewrite its paper intake packet into a shorter online form with
        plain questions, and draft the welcome email that links to it. The form itself
        collects health history, so it has to live in a system built for patient data, with
        the right agreement in place.
      </p>

      <h2>What should a dental office not hand to AI?</h2>

      <p>
        Keep clinical answers, treatment plans, diagnoses and anything about a specific
        patient with your dentists and staff. A model will answer a question about tooth pain
        or antibiotics in a confident tone, and a wrong answer there can hurt someone. A bot
        should route those questions to a person every time.
      </p>

      <ul>
        <li><strong>Symptoms and pain.</strong> The bot offers an appointment and alerts staff. It gives no advice.</li>
        <li><strong>Treatment plans and estimates.</strong> Your team writes and explains them.</li>
        <li><strong>Patient records.</strong> They stay in your practice management system.</li>
        <li><strong>Medication questions.</strong> A dentist or pharmacist answers them.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Dental office task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Recall reminders</th><td>Writes the templates</td><td>Loads them into the sending system</td></tr>
          <tr><th scope="row">Insurance FAQ</th><td>Answers general questions from a written list</td><td>Handles questions about one patient</td></tr>
          <tr><th scope="row">New-patient forms</th><td>Rewrites the questions</td><td>Chooses a compliant form tool</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Removes any patient detail and posts it</td></tr>
          <tr><th scope="row">Clinical questions</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What HIPAA cautions apply to AI in a dental office?</h2>

      <p>
        Under HIPAA, a dental office can share patient health information with a vendor only
        when that vendor signs a business associate agreement. Most consumer AI chat accounts
        come with no such agreement, so patient names, charts, X-rays and insurance details
        stay out of them. This is general information, and your counsel can confirm your
        setup.
      </p>

      <p>
        A simple staff rule covers most of the risk: AI tools draft templates and general
        answers, and patient data stays in the systems your office already trusts with it.
      </p>

      <h2>What can Purcell Ventures set up for a dental office?</h2>

      <p>
        I can train your front desk, add patient-facing tools to your website that hold no
        health information, or build a small tool for a gap your software leaves. Each route
        has a published price on its own page, and the first conversation about which one
        fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on reminder
          wording, review replies and a staff AI rule: $175 an hour 1-on-1, $125 a person for
          groups of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder for insurance and first-visit questions at $179 a month, or an AI
          chatbot trained on your office and branded online booking at $279 a month. Setup is
          $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> runs
          $1,500 to $3,500, scoped around where patient data may and may not go.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your office in ten
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
