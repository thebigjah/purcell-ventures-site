import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA, schema } from "./layout";

// Statewide pillar for the AI consulting cluster, built on the same single-column
// PostLayout as /ai-consultant-tuscaloosa. Each H2 is a question a business owner asks,
// and the paragraph under it answers in its first two or three sentences so an answer
// engine can lift it whole.

export default function AiConsultingAlabama() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Consulting", href: "/consulting" },
        { name: "AI consulting in Alabama", href: "/ai-consulting" },
      ]} />}
      kicker="Alabama"
      title="AI consulting in Alabama"
      lede="AI consulting, automation and custom software for Alabama businesses, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta={<>Updated <time dateTime="2026-11-09">9 November 2026</time>. 1-on-1 sessions $175 an hour. Team workshops $2,500 for up to 20 people.</>}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I work from Tuscaloosa with owners and
        teams across Alabama who want to know where AI fits in their business, and then I
        build the parts that fit.
      </p>

      <h2>What does an AI consultant do for an Alabama business?</h2>

      <p>
        An AI consultant looks at the work your business repeats every week and sorts it into
        three piles: work an AI tool or automation can take over, work that needs custom
        software, and work that should stay with a person. Then the consultant trains your
        team or builds the system.
      </p>

      <p>My own work falls into three kinds of jobs.</p>

      <ul>
        <li>
          <strong>Training.</strong> Showing your team how to use tools such as ChatGPT,
          Claude and Gemini on their own email, documents and customer questions. The session
          list is on the <Link href="/consulting">consulting page</Link>.
        </li>
        <li>
          <strong>Automation.</strong> Connecting the apps you already pay for so a repeated
          manual task runs on a schedule, with a person checking the result.
        </li>
        <li>
          <strong>Custom software.</strong> Building a tool your business needs when nothing
          off the shelf does the job. More on the <Link href="/software">software page</Link>.
        </li>
      </ul>

      <h2>How much does AI consulting cost?</h2>

      <p>
        At Purcell Ventures, a 1-on-1 session costs $175 an hour, small group training costs
        $125 a person, and a half-day workshop costs $2,500 flat for up to 20 people. Small
        software projects run $1,500 to $3,500. I quote automation work per project after a
        free conversation, because the price depends on how many systems it touches.
      </p>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
            <th>Fits</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>1-on-1 consulting</strong></td><td>$175 an hour, two-hour minimum recommended</td><td>One owner or manager working on their own tools and problems</td></tr>
          <tr><td><strong>Small group training</strong></td><td>$125 a person, 2 to 8 people</td><td>A team that works closely together</td></tr>
          <tr><td><strong>Half-day workshop</strong></td><td>$2,500 flat, up to 20 people</td><td>All-hands training or a company event</td></tr>
          <tr><td><strong>Small software project</strong></td><td>$1,500 to $3,500</td><td>One tool, one integration or one internal app</td></tr>
          <tr><td><strong>Full application</strong></td><td>$5,000 to $15,000 and up</td><td>A larger system with several users and features</td></tr>
          <tr><td><strong>AI automation</strong></td><td>Quoted per project</td><td>A repeated manual task that follows the same steps</td></tr>
        </tbody>
      </table>

      <p>
        To check whether a session pays for itself, the{" "}
        <Link href="/ai-cost-calculator">AI cost calculator</Link> takes your team size,
        hourly cost and hours of manual work, and shows the payback in dollars and hours.
      </p>

      <h2>Is my business ready for AI consulting?</h2>

      <p>
        Most businesses are ready if they have work that repeats, information already kept in
        some digital tool, and one person who will own the change. You do not need technical
        staff. The <Link href="/ai-readiness">AI readiness test</Link> scores your team out of
        30 in 10 questions, takes about three minutes and asks for no email.
      </p>

      <p>
        Work that suits AI includes first drafts of emails, quotes and posts, answers to the
        same customer questions, sorting incoming forms and requests, moving the same
        information between systems, and summaries of long documents.
      </p>

      <p>
        Work that suits AI less includes decisions that carry legal or medical
        responsibility, anything where a wrong answer reaches a customer before a person can
        catch it, and work done so rarely that the setup takes longer than the task.
      </p>

      <p>
        Customer data needs its own decision. Consumer and business plans of the same AI
        product can handle your data differently, so check the data and training settings
        before anyone pastes in customer information. I cover{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>{" "}
        in every session.
      </p>

      <h2>Do I need training, automation or custom software?</h2>

      <p>
        Training fits when your team already has the right software and needs to use AI tools
        well. Automation fits when a task repeats on a schedule and follows the same steps each
        time. Custom software fits when the tool you need does not exist, or the version you
        can buy forces your team to work around it.
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Training</th>
            <th>Automation</th>
            <th>Custom software</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>What changes</strong></td><td>Your team uses AI tools on its own work</td><td>A task runs without a person doing it each time</td><td>A new tool built around how you work</td></tr>
          <tr><td><strong>A sign you need it</strong></td><td>Staff use ChatGPT for one-off questions only</td><td>Someone copies the same information between apps every week</td><td>Your team keeps spreadsheets to cover gaps in its software</td></tr>
          <tr><td><strong>Who runs it afterward</strong></td><td>Your team</td><td>The automation, with your team checking results</td><td>Your team, with support agreed in the quote</td></tr>
          <tr><td><strong>What it costs here</strong></td><td>$125 a person to $2,500 a workshop</td><td>Quoted per project</td><td>From $1,500</td></tr>
        </tbody>
      </table>

      <h2>How does a consulting project with Purcell Ventures work?</h2>

      <p>
        It starts with a free conversation by phone or email about what your team spends its
        time on. If AI or software fits, I propose a session or quote a build. If it does not
        fit, I tell you on that first call.
      </p>

      <ol>
        <li>A free first conversation about the work your team repeats.</li>
        <li>A session plan or a written quote for the build.</li>
        <li>The training session at your location, or the build.</li>
        <li>A takeaway guide or handoff, so your team can run what we set up.</li>
      </ol>

      <p>
        If an off-the-shelf chatbot or a free tool covers what you need, I show you how to set
        it up yourself, since that costs you less.
      </p>

      <h2>Do you work with businesses outside Tuscaloosa?</h2>

      <p>
        Yes. I work with businesses across Alabama and do digital work for businesses anywhere
        in the US. Training sessions run at your location, and planning and builds work over
        phone and email. Owners in Birmingham, Huntsville, Montgomery, Mobile and Auburn start
        the same way, with a free call.
      </p>

      <p>
        Businesses in Tuscaloosa can also meet in person. The{" "}
        <Link href="/ai-consultant-tuscaloosa">AI consultant in Tuscaloosa</Link> page covers
        local work.
      </p>

      <h2>AI consulting by city</h2>

      <h3>Alabama</h3>

      <ul>
        <li><Link href="/ai-consultant-tuscaloosa">Tuscaloosa</Link>: local businesses near the University of Alabama, with in-person meetings.</li>
        <li><Link href="/ai-consulting/birmingham-al">Birmingham</Link>: medical practices, law and accounting firms, banks and engineering offices.</li>
        <li><Link href="/ai-consulting/huntsville-al">Huntsville</Link>: defense contractors, proposal teams, staffing firms and engineering companies.</li>
        <li><Link href="/ai-consulting/montgomery-al">Montgomery</Link>: firms that work with state government, automotive suppliers and businesses near Maxwell.</li>
        <li><Link href="/ai-consulting/mobile-al">Mobile</Link>: freight forwarders, logistics and marine firms, and Gulf Coast hospitality.</li>
        <li><Link href="/ai-consulting/auburn-al">Auburn</Link>: restaurants, shops, student housing and young founders.</li>
      </ul>

      <h3>Georgia</h3>

      <p>
        I registered Purcell Ventures LLC in Acworth, Georgia, and I grew up in Kennesaw.
        Training for metro Atlanta teams runs at your location, the same way it does in Alabama.
      </p>

      <ul>
        <li><Link href="/ai-consulting/kennesaw-ga">Kennesaw</Link>: shops on Barrett Parkway, small manufacturers and distributors along I-75, and Kennesaw State founders.</li>
        <li><Link href="/ai-consulting/marietta-ga">Marietta</Link>: aerospace suppliers, medical practices and businesses on Marietta Square.</li>
        <li><Link href="/ai-consulting/acworth-ga">Acworth</Link>: contractors, home service companies, marinas and lake businesses.</li>
      </ul>

      <h3>Tennessee</h3>

      <ul>
        <li><Link href="/ai-consulting/chattanooga-tn">Chattanooga</Link>: startups, automotive suppliers, freight companies, hotels and medical offices.</li>
      </ul>

      <h2>When is AI consulting the wrong purchase?</h2>

      <p>
        AI consulting is the wrong purchase when the real problem is a broken process, missing
        records or software your team owns and never set up. It is also the wrong purchase
        when a free tool already covers the need. In those cases I say so and point you to the
        cheaper fix.
      </p>

      <p>
        Purcell Ventures is one person. If you need a large team, a signed enterprise MSA or
        support around the clock, I am the wrong fit, and I will tell you on the first call.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        Purcell Ventures LLC is a one-person company run by me, Elijah Purcell, a student in
        New College and the Honors College at the University of Alabama. The person you meet
        with is the person who writes the code and answers your email.
      </p>

      <p>
        I also built and run COSMIC, a station of 57 AI agents in 17 rooms that handles
        proposals, site audits, security checks, research and outreach for the company. The
        page on <Link href="/agentic-ai">autonomous AI agent systems</Link> explains how the
        agents work and what goes wrong with them in production. The{" "}
        <Link href="/team">team page</Link> lists what each agent does and what it is not
        allowed to do.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what you are trying
        to do. The first conversation is free, and I reply within one business day.
      </p>

      <p>
        Related: <Link href="/consulting">AI training sessions and prices</Link> and{" "}
        <Link href="/who">Who is Elijah Purcell</Link>.
      </p>

      <p>
        Related guides: <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
        <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
        <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
        <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
        <Link href="/ai-design">AI in design for small businesses</Link>. The <Link href="/ai-glossary">AI glossary</Link> defines the terms, and{" "}
        <Link href="/ai-small-business-statistics">AI small business statistics</Link> lists the numbers with sources.
      </p>
    </PostLayout>
  );
}
