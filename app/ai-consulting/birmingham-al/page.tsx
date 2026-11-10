import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// City page on the same single-column PostLayout as the pillar. The sections follow the
// work Birmingham offices do, and each answer comes first under its question heading.

const PATH = "/ai-consulting/birmingham-al";

export default function AiConsultingBirmingham() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Birmingham", href: PATH },
      ]} />}
      kicker="Birmingham, Alabama"
      title="AI consulting in Birmingham"
      lede="AI training, automation and custom software for Birmingham practices, firms and offices, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every project is quoted after a free call. Training happens at your office."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I work from Tuscaloosa with Birmingham
        owners and office managers who want to know which parts of their work AI can take
        over. Then I train their teams or build the system.
      </p>

      <h2>Which Birmingham businesses get the most from AI?</h2>

      <p>
        Birmingham runs on healthcare, banking and professional services. The University of
        Alabama at Birmingham operates a large medical center, and clinics, specialty
        practices, billing companies and medical suppliers fill the city around it. Several banks
        have their headquarters downtown, and law, accounting, insurance and engineering
        firms serve all of them.
      </p>

      <p>
        Those businesses share one trait that matters for AI. Most of the workday goes to
        documents: intake forms, letters, contracts, reports, and the same answers to the same
        client questions. AI tools help most with document work, and document work also
        needs the most care, because it holds patient, client and account details.
      </p>

      <h2>What AI work fits a Birmingham office?</h2>

      <ul>
        <li>
          <strong>Medical and dental practices.</strong> Drafting appointment reminders,
          answering the front-desk questions about hours, parking, forms and insurance that
          staff hear every day, and sorting incoming requests so urgent ones reach a person
          first.
        </li>
        <li>
          <strong>Law, accounting and insurance firms.</strong> First drafts of routine
          letters and engagement emails, summaries of long documents, and checklists pulled
          from a file. A licensed person reviews every draft before it leaves the office.
        </li>
        <li>
          <strong>Banks, lenders and financial advisers.</strong> Training staff on which
          customer information can go into an AI tool, then putting AI to work on tasks that
          carry no customer data, such as internal memos, policy summaries and marketing copy.
        </li>
        <li>
          <strong>Engineering and construction firms.</strong> Moving the same project details
          between estimating, scheduling and billing tools, and turning field notes into daily
          reports.
        </li>
      </ul>

      <p>
        Most of these start as training. A team learns to use ChatGPT, Claude or Gemini on its
        own email and documents, and the tasks that repeat every week become candidates for an{" "}
        <Link href="/ai-automation">AI automation</Link> later.
      </p>

      <h2>What should stay with a person in healthcare and finance?</h2>

      <p>
        Decisions that carry legal or medical responsibility stay with a person. So does any
        message where a wrong answer reaches a patient or client before someone can catch it.
      </p>

      <p>
        The plan level of the AI tool matters too. Consumer and business plans of the same AI
        product can handle your data differently, so check the data and training settings
        before anyone pastes in patient or customer information. Every session I run covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email. You tell me what your team
        repeats every week, and I tell you whether training, automation or custom software
        fits, or none of them. I reply within one business day.
      </p>

      <p>
        Training happens at your Birmingham office. I come to you and build the session around
        the tools your staff already use, so they practice on their own email, forms and
        documents. Standard sessions need one to two weeks of notice. Planning and builds run
        over phone and email.
      </p>

      <h2>What does AI consulting cost in Birmingham?</h2>

      <p>
        I quote every Birmingham business after a free call. Sessions run 1-on-1, as small group
        training for 2 to 8 people, or as a half-day workshop for up to 20. A front desk or a small practice team fits small group training. A whole floor of a firm fits the half-day workshop.
      </p>

      <p>
        Automation and custom software get a written quote once I know how many systems the
        work touches. The <Link href="/ai-cost-calculator">AI cost calculator</Link> takes your
        team size, hourly cost and hours of manual work and shows what that work costs you now.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A hospital system or a bank that needs a large team, a
        signed enterprise MSA or support around the clock should hire a bigger firm, and I will
        say so on the first call. The same goes for any project that asks AI to make clinical
        or lending decisions on its own.
      </p>

      <p>
        If a free tool or software your office already pays for covers the need, I show you how
        to set it up yourself, since that costs you less.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I write the code, run the training sessions and answer the email. I also built
        COSMIC, a station of 57 AI agents in 17 rooms that handles proposals, site audits,
        security checks, research and outreach for the company. The{" "}
        <Link href="/team">team page</Link> lists what each agent does and what it may not do.
      </p>

      <h2>Common questions</h2>

      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}

      <h2>How do I get in touch?</h2>

      <p>
        Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your office
        is trying to do. Before the call, the <Link href="/ai-readiness">AI readiness test</Link>{" "}
        scores your team out of 30 in about three minutes.
      </p>

      <p>
        Statewide services: <Link href="/ai-consulting">AI consulting in Alabama</Link>.
        Other cities: <Link href="/ai-consultant-tuscaloosa">Tuscaloosa</Link>,{" "}
        <Link href="/ai-consulting/huntsville-al">Huntsville</Link>,{" "}
        <Link href="/ai-consulting/montgomery-al">Montgomery</Link>,{" "}
        <Link href="/ai-consulting/mobile-al">Mobile</Link> and{" "}
        <Link href="/ai-consulting/auburn-al">Auburn</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <ServiceSchema />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
