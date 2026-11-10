import Link from "next/link";
import PillarReading from "@/app/components/PillarReading";
import Cite from "@/app/ai-small-business-statistics/Cite";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Pillar for the AI integration cluster, on the same PostLayout as /ai-consulting.
// Question H2s, each answered in the paragraph directly under it. Vendor features are
// described in general terms. The first-hand example is the PV CRM.

export default function AiIntegration() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Software", href: "/software" },
        { name: "AI integration for small business software", href: "/ai-integration" },
      ]} />}
      kicker="AI integration"
      title="AI integration for small business software"
      lede="How a small business connects AI to the email, accounting, CRM, website and phone tools it already pays for, and when a custom connection beats an off-the-shelf one."
      meta={<>Updated <time dateTime="2026-11-09">9 November 2026</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a student at the
        University of Alabama. I build AI features into software for small businesses, and I
        run my own sales on a CRM I wrote with AI features built in.
      </p>

      <h2>What does it mean to integrate AI into software I already use?</h2>

      <p>
        Integrating AI means a model reads from or writes to a system you already run, so
        nobody has to copy text into a chat window and paste the answer back. The model might
        sort incoming email, summarize a customer record, draft a quote from a form or answer
        questions on your website from your own documents.
      </p>

      <p>
        Among small employer firms that use AI, 44% had partly worked it into their business
        processes and 7% had fully integrated it <Cite k="sbcs" more />.
      </p>

      <p>There are three ways to get there, from least to most work.</p>

      <ul>
        <li>
          <strong>Turn on the AI already inside your software.</strong> Google Workspace,
          Microsoft 365, QuickBooks and most CRMs now ship their own AI features.
        </li>
        <li>
          <strong>Connect apps with a no-code tool</strong> such as Zapier or Make, which can
          pass a record to an AI model and send the result to another app.
        </li>
        <li>
          <strong>Build a custom integration</strong> that calls a model through its API and
          writes the result where your team works.
        </li>
      </ul>

      <h2>How does AI connect to Google Workspace, QuickBooks and a CRM?</h2>

      <p>
        Start with the AI features each product already includes, because they come with the
        vendor&apos;s data terms and need no setup. Google builds Gemini into Gmail, Docs and
        Sheets on business plans. Intuit has added AI features to QuickBooks. Most CRMs offer
        AI summaries and email drafts, often on their higher plans.
      </p>

      <p>
        The built-in features stop at the edge of each product. When the job crosses two
        systems, such as reading a Gmail thread and updating the matching CRM record, you need
        a connection between them. Google Workspace, QuickBooks Online and the major CRMs all
        publish APIs, so a developer or a no-code tool can join them.
      </p>

      <p>
        For accounting, start with read-only work: monthly summaries, overdue invoice lists
        and questions about spending. Keep anything that posts an entry or sends an invoice
        behind a person&apos;s approval.
      </p>

      <h2>Should I buy an AI tool off the shelf or build something custom?</h2>

      <p>
        Buy off the shelf when a product does the whole job and your data fits its format.
        Build custom when the job spans systems no product connects, when the paid tier you
        need costs more each year than a one-time build, or when the tool forces your team to
        keep a spreadsheet on the side.
      </p>

      <p>
        Small employer firms planning to start with AI named finding tools that fit their
        needs (54%) as their top challenge, and 43% of firms already using AI named adapting
        tools to their business <Cite k="sbcs" />.
      </p>

      <table>
        <thead>
          <tr>
            <td></td>
            <th scope="col">Built-in or off-the-shelf AI</th>
            <th scope="col">Custom integration</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Start time</th><td>Same day</td><td>Days to weeks</td></tr>
          <tr><th scope="row">Cost shape</th><td>A monthly fee per user or per plan</td><td>A one-time build, plus model usage and upkeep</td></tr>
          <tr><th scope="row">Fits</th><td>One product doing one job</td><td>Work that crosses two or more systems</td></tr>
          <tr><th scope="row">Data terms</th><td>Set by the vendor</td><td>Set by the model provider you choose</td></tr>
          <tr><th scope="row">Switching later</th><td>Depends on the vendor&apos;s export</td><td>Change the model in one setting</td></tr>
        </tbody>
      </table>

      <p>
        My own CRM is the custom case. The HubSpot features I needed would have cost $200 to
        $400 a month, so I built a CRM in a week instead, with AI features running on Claude.
        The post on{" "}
        <Link href="/blog/why-i-built-crm-from-scratch">why I built a CRM from scratch</Link>{" "}
        lists what that cost, what I gave up and when a business should not do the same.
      </p>

      <h2>How do I put AI on my website and phone line?</h2>

      <p>
        On a website, the common integration is a chatbot that answers from your own
        services, prices, hours and policies, with a handoff to a person when it does not know.
        On the phone, it is an AI voice tool that answers routine calls, or a text service
        that replies to missed calls and booking requests.
      </p>

      <p>
        The website version is the safer start, because every answer stays written down and
        you can read the log. I run an AI FAQ on client sites in the{" "}
        <Link href="/digital">Digital Growth plan</Link>, and an AI chatbot trained on the
        business in the Full Service plan. Phone and text work goes through custom
        integrations, which I quote per scope.
      </p>

      <h2>How do I get an AI to answer from my own business documents?</h2>

      <p>
        Give the model your documents at the moment it answers, and tell it to answer only
        from them. Developers call this retrieval: the system finds the passages that match
        the question and hands those passages to the model with the question. The quality of
        the answers depends on the quality of the documents.
      </p>

      <p>
        Clean the source first. Remove old price sheets, merge duplicate policies and write
        down the answers your staff give from memory. A chatbot that reads an outdated folder
        repeats the outdated answer with full confidence.
      </p>

      <h2>Is it safe to connect AI to my business data?</h2>

      <p>
        It can be, if you control three things: which data the model can see, what it
        may change, and what the provider does with what you send. Give every
        integration the smallest access that does the job, keep write access behind an
        approval step, and read the provider&apos;s data and training terms.
      </p>

      <p>
        Consumer and business plans of the same AI product can treat your data differently.
        The major model providers state that they do not train on data sent through their
        business APIs by default, and those terms change, so read the current version before
        you connect customer records.
      </p>

      <p>
        Connected AI adds one risk that plain software lacks. Text the model reads, such as a
        customer email or a web page, can contain instructions, and a model may follow them.
        An integration that reads outside text should never hold the power to send money,
        delete records or email customers without a person checking first. The{" "}
        <Link href="/blog/small-app-security-checklist">small app security checklist</Link>{" "}
        covers the rest.
      </p>

      <h2>How much does an AI integration cost?</h2>

      <p>
        At Purcell Ventures, every integration is quoted after a free call. The price depends
        on how many systems the work touches and how much the AI has to do. The monthly
        Digital plans with ready-made AI tools are quoted for your business the same way.
      </p>

      <p>
        Custom integrations also carry a running cost for model usage, charged per request.
        When I wrote about my CRM in May 2026, its AI features had cost $15 in API usage. The <Link href="/ai-cost-calculator">AI cost calculator</Link>{" "}
        puts a dollar figure on the manual hours an integration would replace, and the{" "}
        <Link href="/software">software page</Link> explains how I scope a build on a free
        30-minute call.
      </p>

      <PillarReading href="/ai-integration" />

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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me which tools you
        use and what you copy between them. I reply within one business day.
      </p>

      <p>
        Related guides: <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
        <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
        <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
        <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
        <Link href="/ai-design">AI in design for small businesses</Link>. The <Link href="/ai-glossary">AI glossary</Link> defines the terms, and{" "}
        <Link href="/ai-small-business-statistics">AI small business statistics</Link> lists the numbers with sources.
      </p>
    </PostLayout>
  );
}
