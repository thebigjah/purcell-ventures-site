import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";

// City page on the same single-column PostLayout as the pillar. Mobile's version follows
// the two halves of its economy: shipping paperwork at the port and guest questions on
// the Gulf.

const PATH = "/ai-consulting/mobile-al";

export default function AiConsultingMobile() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Mobile", href: PATH },
      ]} />}
      kicker="Mobile, Alabama"
      title="AI consulting in Mobile"
      lede="AI training, automation and custom software for Mobile logistics firms, marine contractors and Gulf Coast hospitality, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every project is quoted after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I work from Tuscaloosa with Mobile
        businesses that want to know which of their daily tasks AI can take, and then I train
        their staff or build the system.
      </p>

      <h2>What does Mobile&rsquo;s economy mean for AI work?</h2>

      <p>
        Mobile is Alabama&rsquo;s port city. The Port of Mobile is the state&rsquo;s only
        deepwater port, and freight forwarders, customs brokers, trucking companies and
        warehouses work around it. Shipyards on the river build vessels for the Navy, and
        Airbus assembles airliners at Brookley. Along the Gulf, from Dauphin Island to the
        Baldwin County beaches across the bay, hotels, rentals, charters and restaurants run on
        tourism, with Mardi Gras and summer bringing the busiest weeks.
      </p>

      <p>
        That gives Mobile two kinds of repeated work. Logistics and marine firms push the
        same shipment and job data through several systems and several forms. Hospitality
        businesses answer the same guest questions every day, often at night and on
        weekends.
      </p>

      <h2>What AI work fits Mobile businesses?</h2>

      <ul>
        <li>
          <strong>Freight forwarders and customs brokers.</strong> Pulling the same fields from
          bills of lading, commercial invoices and packing lists into your own system, with a
          person checking each record before it goes to customs or a customer.
        </li>
        <li>
          <strong>Trucking and warehousing.</strong> Status emails to customers, dispatch notes
          turned into daily reports, and moving the same shipment details between tools so
          nobody types them twice.
        </li>
        <li>
          <strong>Marine and industrial contractors.</strong> Turning crew notes into daily
          reports, tracking certification and training dates, and drafting the routine emails
          that go to a yard or a general contractor.
        </li>
        <li>
          <strong>Hotels, rentals, charters and restaurants.</strong> Answers to the questions
          guests ask about check-in, parking, pets and cancellations, review replies and
          booking messages. Closure and rebooking messages for storm season can sit drafted
          and ready before the first warning.
        </li>
      </ul>

      <p>
        The shipping paperwork usually becomes an{" "}
        <Link href="/ai-automation">AI automation</Link>, since the same fields move from the
        same documents every day. The guest questions usually start with training, so staff
        learn to draft answers fast and check them before they send.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        Customs filings, safety decisions on a vessel or a job site, and refunds or complaints
        from an upset guest stay with a person. So does any message where a wrong answer
        reaches a customer or an agency before someone can catch it.
      </p>

      <p>
        Data needs its own decision. Consumer and business plans of the same AI product can
        handle your data differently, so check the data and training settings before anyone
        pastes in customer, shipment or guest information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email about the work your staff
        repeats. If AI or software fits, I propose a session or quote a build. If it does not
        fit, I tell you on that first call. I reply within one business day.
      </p>

      <p>
        Training happens at your location in Mobile, with examples taken from your own
        business. Standard sessions need one to two weeks of notice, so a hotel or rental team
        can book training for the slow weeks before the season starts. Planning and builds run
        over phone and email, and each project ends with a takeaway guide or handoff.
      </p>

      <h2>What does AI consulting cost in Mobile?</h2>

      <p>
        I quote every Mobile business after a free call. Sessions run 1-on-1, as small group
        training for 2 to 8 people, or as a half-day workshop for up to 20. Small group training fits a front desk or a dispatch office. The half-day workshop fits a larger crew.
      </p>

      <p>
        Automation and custom software get a written quote once I know how many systems the
        work touches. The <Link href="/ai-cost-calculator">AI cost calculator</Link> takes your
        team size, hourly cost and hours of manual work and shows what that work costs you now.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A port operator, shipyard or hotel chain that needs a
        large team, a signed enterprise MSA or support around the clock should hire a bigger
        firm, and I will say so on the first call.
      </p>

      <p>
        If the booking software or freight system you already pay for has a feature that
        covers the need, I show you how to turn it on yourself, since that costs you less.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your business
        is trying to do. The <Link href="/ai-readiness">AI readiness test</Link> scores your
        team out of 30 in about three minutes and asks for no email.
      </p>

      <p>
        Statewide services: <Link href="/ai-consulting">AI consulting in Alabama</Link>.
        Other cities: <Link href="/ai-consultant-tuscaloosa">Tuscaloosa</Link>,{" "}
        <Link href="/ai-consulting/birmingham-al">Birmingham</Link>,{" "}
        <Link href="/ai-consulting/huntsville-al">Huntsville</Link>,{" "}
        <Link href="/ai-consulting/montgomery-al">Montgomery</Link> and{" "}
        <Link href="/ai-consulting/auburn-al">Auburn</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
