import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// City page on the same single-column PostLayout as the pillar. Kennesaw's version splits
// its length between storefront work, the order and shipping work of the I-75 manufacturers,
// and founders around Kennesaw State.

const PATH = "/ai-consulting/kennesaw-ga";

export default function AiConsultingKennesaw() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Kennesaw", href: PATH },
      ]} />}
      kicker="Kennesaw, Georgia"
      title="AI consulting in Kennesaw"
      lede="AI training, automation and custom software for Kennesaw shops, small manufacturers, distributors and student founders, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every job quoted per business after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I grew up in Kennesaw. I now run the
        company from Tuscaloosa, train Kennesaw teams to use AI tools on their own work, and
        build automation and custom software for the tasks AI fits.
      </p>

      <h2>What does Kennesaw&rsquo;s economy mean for AI work?</h2>

      <p>
        Kennesaw sits on I-75 in Cobb County, northwest of Atlanta. Kennesaw State University
        fills the city with students and faculty, and its students start companies of their
        own. Town Center at Cobb and the stores and restaurants along Barrett Parkway draw
        shoppers from across the county. Along the interstate, small manufacturers, machine
        shops, distributors and warehouses ship parts and goods up and down the corridor.
      </p>

      <p>
        Each of those groups repeats a different kind of work. Stores and restaurants answer
        the same customer questions all day. Manufacturers and distributors move the same
        order and shipping details between systems every week. Student founders try to do the
        work of a full team with one or two people. Repeated work like that is where AI helps
        a small business most.
      </p>

      <h2>What AI work fits Kennesaw businesses?</h2>

      <ul>
        <li>
          <strong>Shops and restaurants on Barrett Parkway.</strong> Product descriptions,
          posts with holiday and sale hours, replies to reviews, and answers to the questions
          about stock, returns and hours that staff hear every day. Staff handle returns and
          complaints.
        </li>
        <li>
          <strong>Small manufacturers and machine shops.</strong> First drafts of quotes from
          your own past jobs, purchase orders that arrive by email turned into entries in your
          order system, and a simple lookup for parts or job status.
        </li>
        <li>
          <strong>Distributors and logistics companies.</strong> Shipping notices, tracking
          updates and order data moved between a customer&rsquo;s portal and your own system,
          so nobody types the same numbers twice.
        </li>
        <li>
          <strong>Student founders and Kennesaw State spinouts.</strong> Training on ChatGPT,
          Claude and Gemini for the emails, quotes, posts and research a founder does alone, and
          a first version of the software a new company needs.
        </li>
        <li>
          <strong>Apartment complexes near campus.</strong> Answers to the questions every
          leasing office hears at the start of each semester: move-in dates, parking, pets and
          subleases. Staff keep lease decisions and deposit disputes.
        </li>
      </ul>

      <p>
        The order and shipping work usually becomes an{" "}
        <Link href="/ai-automation">AI automation</Link>, because the same data moves on the
        same schedule every week. The customer questions usually start with training, so staff
        learn to draft answers fast and check them before they send.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        The final price on a quote, quality and safety sign-offs on the shop floor, refunds
        and complaints stay with a person. So does any message where a wrong answer reaches a
        customer before someone can catch it. Drawings and specs a customer sent under a
        confidentiality agreement stay out of AI tools unless the agreement allows it.
      </p>

      <p>
        Customer data needs its own decision. Consumer and business plans of the same AI
        product can handle your data differently, so check the data and training settings
        before anyone pastes in customer or employee information. Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email. You tell me what takes up your
        week, and I tell you whether training, automation or custom software fits, or that none
        of them does. I reply within one business day.
      </p>

      <p>
        Training happens at your location in Kennesaw, built around the tools your staff
        already use. Standard sessions need one to two weeks of notice, and custom training
        needs more. Planning and builds run over phone and email, and each project ends with a
        takeaway guide or handoff your team can run without me.
      </p>

      <h2>What does AI consulting cost in Kennesaw?</h2>

      <p>
        I quote every job per business after a free call, because the price depends on the
        size of your team, how many systems the work touches and how much of it is training
        or building. A founder working alone fits a 1-on-1 session. A store&rsquo;s managers or a shop&rsquo;s front office fit small group training for 2 to 8 people, and a half-day workshop covers up to 20.
      </p>

      <p>
        Custom software and automation get a written quote after the first conversation. The 
        <Link href="/ai-cost-calculator">AI cost calculator</Link> shows whether training pays
        for itself, using your team size, hourly cost and hours of manual work.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A manufacturer or retail chain that needs a large team,
        a signed enterprise MSA or support around the clock should hire a bigger firm, and I
        will say so on the first call.
      </p>

      <p>
        If a free tool or software you already own covers the need, I show you how to set it
        up yourself, since that costs you less.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I grew up in Kennesaw, formed the LLC in Acworth in April 2025, and now study at
        the University of Alabama. I write the code, run the sessions and answer the email. I
        also built COSMIC, a station of 57 AI agents in 17 rooms that handles proposals, site
        audits, security checks, research and outreach for the company. The{" "}
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
        Prices and services in full: <Link href="/ai-consulting">AI consulting</Link>. Nearby
        in Georgia: <Link href="/ai-consulting/marietta-ga">Marietta</Link> and{" "}
        <Link href="/ai-consulting/acworth-ga">Acworth</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <ServiceSchema />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
