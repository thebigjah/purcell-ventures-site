import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "veterinary-clinics";

export default function AiForVeterinaryClinics() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for veterinary clinics"
      lede="Where AI helps a veterinary clinic with appointment reminders, vaccine recalls and new-client intake, the record and privacy cautions, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a veterinary clinic?</h2>

      <p>
        AI handles three front-desk jobs well in a veterinary clinic: writing appointment
        reminders, writing vaccine and wellness recall messages, and turning new-client
        paperwork into a clean online form. Each job repeats every week, and none of them
        needs AI to read a pet&apos;s chart.
      </p>

      <p>
        A fourth job fits most clinics: drafting replies to Google reviews and captions for
        photos that owners agree to share. A person reads each draft before it posts, and the
        free <Link href="/digital/tools/review-response">review response generator</Link>{" "}
        shows what a draft looks like.
      </p>

      <h2>How does AI help with veterinary appointment reminders?</h2>

      <p>
        Your practice management software already knows every booked visit, so let it send
        the reminders. AI helps with the words: a confirmation when the owner books, a
        reminder the day before with what to bring, and a note for surgery or dental
        appointments about fasting, which your veterinarians write and approve.
      </p>

      <p>
        Write the templates in a general AI tool with no client or pet names in them, then
        load the finished text into the system that sends. Marketing texts need the
        client&apos;s prior written consent under federal telemarketing rules, so collect it on
        the intake form.
      </p>

      <h2>How can AI help with vaccine recalls?</h2>

      <p>
        Recalls for rabies, distemper combinations, heartworm tests and annual exams run on
        dates your software tracks. The schedule needs no AI. AI helps write a short first
        notice, a second nudge for owners who did not book, and a note for pets overdue by
        several months, each with a link to book.
      </p>

      <p>
        Keep the medical content fixed. Which vaccines a pet needs, and how often, depends on
        the species, age, lifestyle and local law, and your veterinarians decide it. The
        message tells the owner what is due and how to book, and the exam room handles the
        rest.
      </p>

      <h2>Can AI handle new-client intake for a vet clinic?</h2>

      <p>
        AI can help a clinic rewrite its paper intake packet into a shorter online form with
        plain questions about the pet, past care, current medications and the reason for the
        visit, and draft the welcome email that links to it. The form should live in your
        practice software or a form tool that feeds it, and the veterinary team reads the
        history before the visit.
      </p>

      <h2>What should a veterinary clinic not hand to AI?</h2>

      <p>
        Keep triage, diagnoses, medication questions and anything about a specific pet with
        your veterinarians and technicians. A model will tell an owner in a confident tone
        that a dog that ate chocolate will be fine, and a wrong answer there can cost an
        animal its life. A bot should route those questions to a person every time.
      </p>

      <ul>
        <li><strong>Symptoms and emergencies.</strong> The bot gives the clinic or emergency hospital number and alerts staff.</li>
        <li><strong>Diagnoses and treatment plans.</strong> A veterinarian decides them.</li>
        <li><strong>Medications and refills.</strong> A veterinarian approves every prescription.</li>
        <li><strong>Euthanasia and end-of-life care.</strong> A person handles every conversation.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Veterinary clinic task</th>
            <th scope="col">AI role</th>
            <th scope="col">Veterinary team&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Appointment reminders</th><td>Writes the templates</td><td>Approves prep instructions</td></tr>
          <tr><th scope="row">Vaccine recalls</th><td>Writes the message series</td><td>Decides what each pet needs</td></tr>
          <tr><th scope="row">New-client forms</th><td>Rewrites the questions</td><td>Reads the history before the visit</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Removes client details and posts it</td></tr>
          <tr><th scope="row">Medical questions</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy and record rules apply to AI in a vet clinic?</h2>

      <p>
        HIPAA protects human health information, so it does not cover pet medical records.
        Many states have their own rules on the confidentiality of veterinary records, and
        state rules on the veterinarian-client-patient relationship govern who may diagnose
        and prescribe. This is general information, and your state veterinary board or
        counsel can confirm what applies to your clinic.
      </p>

      <p>
        A simple staff rule covers most of the risk: AI tools draft templates and general
        answers, and client names, addresses, payment details and medical records stay in your
        practice management software.
      </p>

      <h2>What can Purcell Ventures set up for a veterinary clinic?</h2>

      <p>
        I can train your front desk, add booking and FAQ tools to your website that hold no
        medical records, or build a small tool for a gap your software leaves. Each route has
        a published price on its own page, and the first conversation about which one fits is
        free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on reminder
          wording, review replies and a staff AI rule: $175 an hour 1-on-1, $125 a person for
          groups of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder for hours, services and new-client questions at $179 a month, or an
          AI chatbot trained on your clinic and branded online booking at $279 a month. Setup
          is $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as an online intake form that matches your practice software&apos;s fields, runs
          $1,500 to $3,500.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your clinic in ten
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
