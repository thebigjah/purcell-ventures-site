import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// City page on the same single-column PostLayout as the pillar. Montgomery's version is
// split between the firms around state government and the suppliers around the plant.

const PATH = "/ai-consulting/montgomery-al";

export default function AiConsultingMontgomery() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Montgomery", href: PATH },
      ]} />}
      kicker="Montgomery, Alabama"
      title="AI consulting in Montgomery"
      lede="AI training, automation and custom software for Montgomery firms, suppliers and local businesses, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="1-on-1 sessions $175 an hour. Team workshops $2,500 for up to 20 people. Training happens at your office."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I work from Tuscaloosa with Montgomery
        businesses that want a straight answer on where AI fits their work, and then I train
        the team or build the system.
      </p>

      <h2>What does Montgomery&rsquo;s economy mean for AI work?</h2>

      <p>
        Montgomery is the state capital, so state agencies sit there along with the
        associations, law firms, lobbying shops and vendors that work with them. Maxwell Air
        Force Base, home of Air University, brings Air Force families and the contractors who
        support the base. The Hyundai assembly plant ties a network of automotive suppliers,
        trucking companies and staffing firms to the region.
      </p>

      <p>
        Those groups run on two different kinds of paperwork. Firms around state government
        read and write: bills, rules, agency notices, bid responses and client memos.
        Suppliers move data: purchase orders, shipping notices, quality records and shift
        reports. AI helps with both, in different ways.
      </p>

      <h2>What AI work fits Montgomery businesses?</h2>

      <ul>
        <li>
          <strong>Associations, lobbying and government affairs firms.</strong> Summaries of
          bills, rules and agency notices, sorted by the issues each client follows, and first
          drafts of client updates. A person reads the source before anyone acts on a summary.
        </li>
        <li>
          <strong>Vendors bidding on state work.</strong> A checklist pulled from a long
          request for proposals, and first drafts of the standard sections you write for every
          bid, from your own approved past text.
        </li>
        <li>
          <strong>Automotive suppliers.</strong> Moving order, shipping and quality data
          between a customer portal and your own system so nobody retypes it, and drafting
          shift reports and supplier emails. Your quality team keeps every decision about part
          quality and safety.
        </li>
        <li>
          <strong>Trucking and staffing companies.</strong> Status emails to customers, job
          postings, interview scheduling and the same answers to the same applicant questions.
        </li>
        <li>
          <strong>Businesses near Maxwell.</strong> Military families move often and ask the
          same questions when they arrive. AI can draft answers about hours, services and
          lease terms, plus booking messages and review replies.
        </li>
      </ul>

      <p>
        The supplier work usually ends in an{" "}
        <Link href="/ai-automation">AI automation</Link>, because the same data moves on the
        same schedule every week. The government affairs work usually ends in training,
        because each document needs a person&rsquo;s judgment at the end.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        Legal advice, a position a client takes in public and any quality or safety sign-off
        stay with the person responsible for them. So does any message where a wrong answer
        reaches a customer or an agency before someone can catch it.
      </p>

      <p>
        Client and employee data needs its own decision. Consumer and business plans of the
        same AI product can handle your data differently, so check the data and training
        settings before anyone pastes in client information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email. You describe the work your team
        repeats, and I tell you whether training, automation or custom software fits, or that
        none of them does. I reply within one business day.
      </p>

      <p>
        Training happens at your Montgomery office or plant, built around the tools your team
        already uses. Standard sessions need one to two weeks of notice. Planning and builds
        run over phone and email, and each project ends with a takeaway guide or handoff so
        your team can run what we set up.
      </p>

      <h2>What does AI consulting cost in Montgomery?</h2>

      <p>
        A 1-on-1 session costs $175 an hour, with a two-hour minimum recommended. Small group
        training costs $125 a person for 2 to 8 people. A half-day workshop costs $2,500 flat
        for up to 20 people, which suits an association staff meeting or a supplier&rsquo;s
        office team.
      </p>

      <p>
        Small software projects run $1,500 to $3,500, and full applications run $5,000 to
        $15,000 and up. I quote automation per project, because the price depends on how many
        systems it touches. The <Link href="/ai-cost-calculator">AI cost calculator</Link>{" "}
        shows the payback for your own team size and hourly cost.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A state agency or a plant that needs a large team, a
        signed enterprise MSA or support around the clock should hire a bigger firm, and I will
        say so on the first call.
      </p>

      <p>
        AI consulting is also the wrong purchase when the real problem is a broken process or
        software your team owns and never set up. In those cases I point you to the cheaper
        fix.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I write the code, run the sessions and answer the email. I also built COSMIC, a
        station of 57 AI agents in 17 rooms that handles proposals, site audits, security
        checks, research and outreach for the company. The{" "}
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your team is
        trying to do. The <Link href="/ai-readiness">AI readiness test</Link> scores your team
        out of 30 in about three minutes and asks for no email.
      </p>

      <p>
        Statewide prices and services: <Link href="/ai-consulting">AI consulting in Alabama</Link>.
        Other cities: <Link href="/ai-consultant-tuscaloosa">Tuscaloosa</Link>,{" "}
        <Link href="/ai-consulting/birmingham-al">Birmingham</Link>,{" "}
        <Link href="/ai-consulting/huntsville-al">Huntsville</Link>,{" "}
        <Link href="/ai-consulting/mobile-al">Mobile</Link> and{" "}
        <Link href="/ai-consulting/auburn-al">Auburn</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <ServiceSchema />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
