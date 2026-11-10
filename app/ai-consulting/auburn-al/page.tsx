import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";

// City page on the same single-column PostLayout as the pillar. Auburn's version follows
// the university calendar, since move-in, semesters and home games set the busy weeks
// for most businesses there. The UA student website rate is left off on purpose: it is
// for University of Alabama students only.

const PATH = "/ai-consulting/auburn-al";

export default function AiConsultingAuburn() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Auburn", href: PATH },
      ]} />}
      kicker="Auburn, Alabama"
      title="AI consulting in Auburn"
      lede="AI training, automation and custom software for Auburn restaurants, shops, student housing and young founders, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every project is quoted after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I work from Tuscaloosa with Auburn
        business owners who want to know which parts of their week AI can take, and then I
        train their staff or build the system.
      </p>

      <h2>What does Auburn&rsquo;s economy mean for AI work?</h2>

      <p>
        Auburn is a college town, and Auburn University sets its calendar. Move-in,
        graduation and home football weekends bring the busiest days of the year to
        restaurants, bars, shops, hotels and apartment complexes. Downtown around
        Toomer&rsquo;s Corner, the student housing at the edge of campus and the businesses in
        neighboring Opelika all serve that population.
      </p>

      <p>
        Tuscaloosa runs on the same kind of calendar, so I know how it shapes a small
        business. Staff turn over every year as students graduate. The same questions arrive in
        waves, every August and every game week. A small team has to answer all of them
        while the rush is on, and that repeated work is where AI helps a small business most.
      </p>

      <h2>What AI work fits Auburn businesses?</h2>

      <ul>
        <li>
          <strong>Apartment complexes and student housing.</strong> Answers to the questions
          every leasing office hears each move-in season: dates, parking, pets, subleases and
          what the lease covers. Staff keep lease decisions and deposit disputes.
        </li>
        <li>
          <strong>Restaurants and bars.</strong> Posts with game-day hours and specials, a
          first draft of the staff schedule for a home weekend, and replies to the reviews that
          follow it.
        </li>
        <li>
          <strong>Boutiques and shops.</strong> Product descriptions, captions and a month of
          social posts planned in one sitting, with the tone set by the owner.
        </li>
        <li>
          <strong>Student founders and new businesses.</strong> Training on ChatGPT, Claude and
          Gemini for the work a founder does alone: emails, quotes, posts and research.
        </li>
        <li>
          <strong>Hotels and short-term rentals.</strong> Booking messages and answers to
          guest questions for home football weekends and graduation.
        </li>
      </ul>

      <p>
        Staff turnover makes written guides matter more in Auburn than in most towns. Each
        training session ends with a takeaway guide, so next year&rsquo;s staff can pick up
        what this year&rsquo;s staff learned. Tasks that repeat on a schedule, such as posting
        hours or sending booking confirmations, can become an{" "}
        <Link href="/ai-automation">AI automation</Link> later.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        Refunds, complaints, lease disputes and anything a customer is upset about stay with
        a person. So does any message where a wrong answer reaches a customer before someone
        can catch it, such as a post with the wrong game-day hours.
      </p>

      <p>
        Customer data needs its own decision. Consumer and business plans of the same AI
        product can handle your data differently, so check the data and training settings
        before anyone pastes in resident or customer information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email. You tell me what takes up your
        week, and I tell you whether training, automation or custom software fits, or that
        none of them does. I reply within one business day.
      </p>

      <p>
        Training happens at your location in Auburn, built around the tools your staff already
        use. Standard sessions need one to two weeks of notice, so book them for the quiet
        weeks before move-in or before the season starts. Planning and builds run over phone
        and email.
      </p>

      <h2>What does AI consulting cost in Auburn?</h2>

      <p>
        I quote every Auburn business after a free call. Sessions run 1-on-1, as small group
        training for 2 to 8 people, or as a half-day workshop for up to 20. A 1-on-1 session suits an owner who runs most of the business alone. Small group training fits a leasing office or a restaurant&rsquo;s managers.
      </p>

      <p>
        Automation and custom software get a written quote once I know how many systems the
        work touches. The <Link href="/ai-cost-calculator">AI cost calculator</Link> takes your
        team size, hourly cost and hours of manual work and shows what that work costs you now.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A business that needs a large team, a signed
        enterprise MSA or support around the clock should hire a bigger firm, and I will say so
        on the first call.
      </p>

      <p>
        A small business often needs less than a consultant. If a free tool or the
        software you already pay for covers the need, I show you how to set it up yourself,
        since that costs you less.
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
        <Link href="/ai-consulting/mobile-al">Mobile</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
