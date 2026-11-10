import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import cobb from "@/lib/research/cobb-2026-11-summary.json";

// City page on the same single-column PostLayout as the pillar. Marietta's version spends
// its length on two sets of data rules, export rules for the aerospace suppliers and patient
// privacy for the medical practices, since those decide AI work there.

const PATH = "/ai-consulting/marietta-ga";

export default function AiConsultingMarietta() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Marietta", href: PATH },
      ]} />}
      kicker="Marietta, Georgia"
      title="AI consulting in Marietta"
      lede="AI training, automation and custom software for Marietta aerospace suppliers, medical practices and businesses on the Square, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every job quoted per business after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I grew up in nearby Kennesaw. From
        Tuscaloosa, I train Marietta teams to use AI tools on their own work, and I build
        automation and custom software for the tasks AI fits.
      </p>

      <h2>What does Marietta&rsquo;s economy mean for AI work?</h2>

      <p>
        Marietta is the Cobb County seat, and a few large employers shape its economy.
        Lockheed Martin builds the C-130 Hercules at its Marietta plant, and machine shops,
        parts makers and engineering firms across the region supply it. Dobbins Air Reserve
        Base sits beside the plant. Wellstar Kennestone Hospital draws medical practices,
        clinics and labs to the streets around it. On and near Marietta Square, restaurants,
        shops, law offices and small firms serve residents, county workers and visitors.
      </p>

      <p>
        That mix gives Marietta two sets of data rules. Aerospace suppliers handle drawings
        and specs that export rules and contracts restrict. Medical practices handle patient
        information that federal privacy law protects. Both decide which work AI may touch
        before anyone opens a chat window.
      </p>

      <p>
        I checked {cobb.frame.marietta} business websites in Marietta for my{" "}
        <Link href="/research/cobb-county-small-business-websites-2026">
          study of {cobb.frame.total.toLocaleString("en-US")} small business websites across Cobb County
        </Link>{" "}
        in November 2026. Across the county, {cobb.frames.county.jsonld_org_or_localbusiness.pct_of_own_domain_pages} percent
        of the working sites on a business&rsquo;s own domain carried structured data that names the business and its type for search engines and AI tools.
      </p>

      <h2>What AI work fits Marietta businesses?</h2>

      <ul>
        <li>
          <strong>Aerospace suppliers and machine shops.</strong> First drafts of quotes from
          your own past jobs, purchase orders turned into entries in your order system, and job
          postings and routine letters. Restricted drawings and technical data stay out.
        </li>
        <li>
          <strong>Medical and dental practices.</strong> Appointment reminders and answers to
          the front-desk questions about hours, parking, forms and insurance that staff hear
          every day, written with no patient details in the tool.
        </li>
        <li>
          <strong>Law and accounting offices near the courthouse.</strong> First drafts of
          routine letters and engagement emails, and summaries of long documents. A licensed
          person reviews every draft before it leaves the office.
        </li>
        <li>
          <strong>Shops and restaurants on the Square.</strong> Posts for weekend events,
          product descriptions, menus and replies to reviews.
        </li>
        <li>
          <strong>Contractors and home service companies.</strong> Quote drafts from your price
          list, follow-up messages to new leads and scheduling emails.
        </li>
      </ul>

      <p>
        Office tasks that repeat on a schedule and follow the same steps make good{" "}
        <Link href="/ai-automation">AI automation</Link> candidates. Training usually comes
        first, so your team knows what the tools can and cannot do before anything runs on its
        own.
      </p>

      <h2>What stays out of AI tools in aerospace and healthcare?</h2>

      <p>
        Export-controlled technical data, classified information and anything your contract
        restricts stay out of general AI tools. Your contract and your compliance officer set
        that line, and the AI plan follows it. I build training and automation around the line
        your company already has, and I do not ask you to move it.
      </p>

      <p>
        Patient health information stays out of any AI tool your practice has not cleared
        under HIPAA, and diagnosis and treatment stay with a clinician. For every business,
        consumer and business plans of the same AI product can handle your data differently,
        so check the data and training settings first. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>{" "}
        for your own office.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email about the work your team
        repeats. If AI or software fits, I propose a session or quote a build. If it does not
        fit, I tell you on that first call. I reply within one business day.
      </p>

      <p>
        Training happens at your Marietta office, with examples from your own work. Standard
        sessions need one to two weeks of notice, and custom training needs more. Planning and
        builds run over phone and email, and each project ends with a takeaway guide or
        handoff your team can run without me.
      </p>

      <h2>What does AI consulting cost in Marietta?</h2>

      <p>
        I quote every job per business after a free call, because the price depends on the
        size of your team, how many systems the work touches and how much of it is training
        or building. A front desk of four fits small group training for 2 to 8 people. A whole practice or a supplier&rsquo;s office staff fits a half-day workshop for up to 20, and an owner working on their own tools fits a 1-on-1 session.
      </p>

      <p>
        Custom software and automation get a written quote after the first conversation. The 
        <Link href="/ai-cost-calculator">AI cost calculator</Link> shows whether training pays
        for itself, using your team size, hourly cost and hours of manual work.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person and does not run a cleared team. Work that needs one,
        or a large team, a signed enterprise MSA or support around the clock, belongs with a
        firm built for it. The same goes for any project that asks AI to make clinical
        decisions on its own. I will say so on the first call.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your office
        is trying to do. Before the call, the <Link href="/ai-readiness">AI readiness test</Link>{" "}
        scores your team out of 30 in about three minutes.
      </p>

      <p>
        Prices and services in full: <Link href="/ai-consulting">AI consulting</Link>. Nearby
        in Georgia: <Link href="/ai-consulting/kennesaw-ga">Kennesaw</Link> and{" "}
        <Link href="/ai-consulting/acworth-ga">Acworth</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
