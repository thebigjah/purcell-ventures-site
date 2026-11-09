import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// City page on the same single-column PostLayout as the pillar. Huntsville's version
// spends its length on contract data rules, since that is what decides AI work there.

const PATH = "/ai-consulting/huntsville-al";

export default function AiConsultingHuntsville() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Huntsville", href: PATH },
      ]} />}
      kicker="Huntsville, Alabama"
      title="AI consulting in Huntsville"
      lede="AI training, automation and custom software for Huntsville contractors, engineering firms and local businesses, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="1-on-1 sessions $175 an hour. Team workshops $2,500 for up to 20 people. Training happens at your office."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. From Tuscaloosa, I train Huntsville
        teams to use AI tools on their own work, and I build automation and custom software
        for the tasks AI fits.
      </p>

      <h2>What does Huntsville&rsquo;s economy mean for AI work?</h2>

      <p>
        Huntsville runs on aerospace and defense. Redstone Arsenal holds Army commands and
        NASA&rsquo;s Marshall Space Flight Center, and Cummings Research Park holds engineering
        firms, defense contractors and technology companies. Around them work the
        subcontractors, staffing firms and service businesses that support that work, plus the
        restaurants, contractors and shops that serve the people who live there.
      </p>

      <p>
        Teams in Huntsville work in technical software every day, so learning an AI tool takes
        them little time. The harder question comes from the contract. Many government
        contracts limit where data can go, and those limits decide which work AI may touch
        before anyone opens a chat window.
      </p>

      <h2>What AI work fits Huntsville companies?</h2>

      <ul>
        <li>
          <strong>Proposal and capture teams.</strong> Turning a long solicitation into a
          summary and a compliance checklist, and drafting standard sections from your own
          approved past text. A person writes the technical approach and checks every
          requirement against the source.
        </li>
        <li>
          <strong>Small contractors and subcontractors.</strong> Moving timesheet, invoice and
          project data between the systems a prime contractor or agency requires and the
          tools your office uses, so nobody types the same numbers twice.
        </li>
        <li>
          <strong>Staffing and recruiting firms.</strong> First drafts of job postings,
          interview scheduling emails and summaries that compare a résumé to a job
          description. A recruiter makes every hiring decision.
        </li>
        <li>
          <strong>Engineering and technology firms.</strong> Internal tools for the cases where
          the software you can buy forces your team to work around it, such as a request
          tracker or a parts lookup.
        </li>
        <li>
          <strong>Local service businesses.</strong> Answers to the customer questions that
          repeat, booking messages and review replies.
        </li>
      </ul>

      <p>
        Office tasks that repeat on a schedule and follow the same steps make good{" "}
        <Link href="/ai-automation">AI automation</Link> candidates. Training usually comes
        first, so your team knows what the tools can and cannot do before anything runs on its
        own.
      </p>

      <h2>What stays out of AI tools on defense work?</h2>

      <p>
        Controlled, classified and export-controlled information stays out of general AI
        tools. Your contract and your security officer set that line, and the AI plan follows
        it. I build training and automation around the line your company already has, and
        I do not ask you to move it.
      </p>

      <p>
        Data rules matter for unrestricted work too. Consumer and business plans of the same
        AI product can handle your data differently, so check the data and training settings
        before anyone pastes in customer or employee information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>{" "}
        for your own company.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email about the work your team
        repeats. If AI or software fits, I propose a session or quote a build. If it does not
        fit, I tell you on that first call. I reply within one business day.
      </p>

      <p>
        Training happens at your Huntsville office, with examples from your own work. Standard
        sessions need one to two weeks of notice, and custom training needs more. Planning and
        builds run over phone and email, and each project ends with a takeaway guide or
        handoff your team can run without me.
      </p>

      <h2>What does AI consulting cost in Huntsville?</h2>

      <p>
        A 1-on-1 session costs $175 an hour, with a two-hour minimum recommended. Small group
        training costs $125 a person for 2 to 8 people, and a half-day workshop costs $2,500
        flat for up to 20 people. A proposal team of five fits the small group rate. A whole
        program office fits the workshop.
      </p>

      <p>
        Small software projects run $1,500 to $3,500, and full applications run $5,000 to
        $15,000 and up. I quote automation per project after the first conversation. The{" "}
        <Link href="/ai-cost-calculator">AI cost calculator</Link> shows whether training pays
        for itself, using your team size, hourly cost and hours of manual work.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person and does not run a cleared team. Work that needs one,
        or a large team, a signed enterprise MSA or support around the clock, belongs with a
        firm built for it. I will say so on the first call.
      </p>

      <p>
        If a free tool or software you already own covers the need, I show you how to set it
        up yourself, since that costs you less.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I write the code, run the sessions and answer the email. I also built COSMIC, a
        station of 57 AI agents in 17 rooms that handles proposals, site audits, security
        checks, research and outreach for the company. The page on{" "}
        <Link href="/agentic-ai">autonomous AI agent systems</Link> covers how the agents work
        and what goes wrong with them in daily use.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your team is
        trying to do. The <Link href="/ai-readiness">AI readiness test</Link> scores your team
        out of 30 in about three minutes and asks for no email.
      </p>

      <p>
        Statewide prices and services: <Link href="/ai-consulting">AI consulting in Alabama</Link>.
        Other cities: <Link href="/ai-consultant-tuscaloosa">Tuscaloosa</Link>,{" "}
        <Link href="/ai-consulting/birmingham-al">Birmingham</Link>,{" "}
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
