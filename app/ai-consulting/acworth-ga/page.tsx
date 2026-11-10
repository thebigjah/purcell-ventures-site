import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// City page on the same single-column PostLayout as the pillar. Acworth's version follows
// the lake season and the steady stream of new homeowners, since those set the repeated
// work for most businesses there. The LLC is registered in Acworth, and the page says so
// without claiming an office.

const PATH = "/ai-consulting/acworth-ga";

export default function AiConsultingAcworth() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Acworth", href: PATH },
      ]} />}
      kicker="Acworth, Georgia"
      title="AI consulting in Acworth"
      lede="AI training, automation and custom software for Acworth contractors, home service companies, marinas and downtown shops, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every job quoted per business after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I registered the company in Acworth in
        April 2025 and run it from Tuscaloosa. I train Acworth owners and staff to use AI tools
        on their own work, and I build automation and custom software for the tasks AI fits.
      </p>

      <h2>What does Acworth&rsquo;s economy mean for AI work?</h2>

      <p>
        Acworth sits on I-75 in north Cobb County, with Lake Acworth in town and Lake
        Allatoona next to it. In warm months the lakes bring boaters, swimmers, campers and day
        visitors to the marinas, boat rentals and campgrounds, and to the restaurants and shops
        downtown. New neighborhoods keep going up around the city, and roofers, plumbers,
        landscapers, cleaners and other home service companies follow the new houses.
      </p>

      <p>
        That gives Acworth businesses two kinds of pressure. Lake businesses get the same
        questions about rentals, hours, slips and weather every spring and summer, all at once.
        Contractors get calls from new homeowners who want a quote this week. A small office
        answers all of it, often with the owner doing the answering, and that repeated work is
        where AI helps a small business most.
      </p>

      <h2>What AI work fits Acworth businesses?</h2>

      <ul>
        <li>
          <strong>Contractors and home service companies.</strong> Replies to new leads, quote
          drafts from your own price list, follow-up messages and scheduling emails. The owner
          sets every price and every promise about the work.
        </li>
        <li>
          <strong>Marinas and boat rentals.</strong> Answers about slips, rental rates, hours,
          fuel and weather, plus booking confirmations. Staff keep safety calls and damage
          disputes.
        </li>
        <li>
          <strong>Restaurants and shops downtown.</strong> Posts with event and holiday hours,
          menus, product descriptions and replies to reviews.
        </li>
        <li>
          <strong>Lake houses, rentals and campgrounds.</strong> Booking messages, check-in
          details and answers to the guest questions that repeat every weekend.
        </li>
        <li>
          <strong>Real estate agents and builders.</strong> First drafts of listing
          descriptions, follow-ups with buyers and summaries of long documents. The agent checks
          every fact before it goes out.
        </li>
      </ul>

      <p>
        Contractor work usually ends in an <Link href="/ai-automation">AI automation</Link>,
        because each new lead gets the same steps: a reply, a quote and a follow-up. Lake
        businesses usually start with training before the season, so staff learn to draft
        answers fast and check them before they send.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        Safety calls on the water, weather cancellations, refunds, damage claims and the
        final price on a job stay with a person. So does any message where a wrong answer
        reaches a customer before someone can catch it, such as a post with the wrong hours on
        a holiday weekend.
      </p>

      <p>
        Customer data needs its own decision. Consumer and business plans of the same AI
        product can handle your data differently, so check the data and training settings
        before anyone pastes in customer information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email about the work your staff
        repeats. If AI or software fits, I propose a session or quote a build. If it does not
        fit, I tell you on that first call. I reply within one business day.
      </p>

      <p>
        The LLC&rsquo;s registration is in Acworth, but the company has no office to visit
        there. Training happens at your location, built around the tools your staff already
        use. Standard sessions need one to two weeks of notice, so book them in the quiet weeks
        before the season starts. Planning and builds run over phone and email.
      </p>

      <h2>What does AI consulting cost in Acworth?</h2>

      <p>
        I quote every job per business after a free call, because the price depends on the
        size of your team, how many systems the work touches and how much of it is training
        or building. An owner who runs most of the business alone fits a 1-on-1 session. A marina&rsquo;s front desk or a contractor&rsquo;s office fits small group training for 2 to 8 people, and a half-day workshop covers up to 20.
      </p>

      <p>
        Custom software and automation get a written quote after the first conversation. The 
        <Link href="/ai-cost-calculator">AI cost calculator</Link> shows whether training pays
        for itself, using your team size, hourly cost and hours of manual work.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A builder or service company that needs a large team, a
        signed enterprise MSA or support around the clock should hire a bigger firm, and I will
        say so on the first call.
      </p>

      <p>
        If a free tool or software you already own covers the need, I show you how to set it
        up yourself, since that costs you less.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I grew up in nearby Kennesaw and study at the University of Alabama. I write the
        code, run the sessions and answer the email. I also built COSMIC, a station of 57 AI
        agents in 17 rooms that handles proposals, site audits, security checks, research and
        outreach for the company. The <Link href="/team">team page</Link> lists what each agent
        does and what it may not do.
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
        is trying to do. The <Link href="/ai-readiness">AI readiness test</Link> scores your team
        out of 30 in about three minutes and asks for no email.
      </p>

      <p>
        Prices and services in full: <Link href="/ai-consulting">AI consulting</Link>. Nearby
        in Georgia: <Link href="/ai-consulting/kennesaw-ga">Kennesaw</Link> and{" "}
        <Link href="/ai-consulting/marietta-ga">Marietta</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <ServiceSchema />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
