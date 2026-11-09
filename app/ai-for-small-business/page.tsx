import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Pillar for the AI for small business cluster, on the same PostLayout as /ai-consulting.
// Question H2s, each answered in the paragraph directly under it. Where a live post already
// answers a cluster question, this page gives the short answer and links to the post.

export default function AiForSmallBusiness() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Consulting", href: "/consulting" },
        { name: "AI for small business", href: "/ai-for-small-business" },
      ]} />}
      kicker="AI for small business"
      title="AI for small business"
      lede="Where a small business owner can start with AI safely, how to check what it produces, what to tell staff and customers, and where AI spending goes to waste."
      meta={<>Updated <time dateTime="2026-11-09">9 November 2026</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. I train small business teams to use AI
        tools, build AI software for them, and run my own company with AI agents. I have
        completed 12 Anthropic Academy courses, including AI Fluency: Framework and
        Foundations.
      </p>

      <h2>What can a small business owner use AI for each day?</h2>

      <p>
        AI does two jobs well: it writes first drafts, and it sorts or summarizes large
        amounts of text. For an owner that means replies to email and reviews, website and
        social copy, quotes from notes, summaries of long documents and answers to the same
        customer questions. A person still checks each result before it goes out.
      </p>

      <p>
        AI makes poor decisions. It can state a wrong answer in the same confident tone as a
        right one, so treat it as a fast assistant whose work you review, and keep pricing,
        hiring and legal calls with a person.
      </p>

      <h2>What are three safe first tasks for AI in a small business?</h2>

      <p>
        The safest first tasks are writing jobs where you already know what a good answer
        looks like: replies to your Google reviews, a rewrite of one page of your website, and
        this week&apos;s update to customers. You can judge each result yourself, and nothing
        reaches a customer until you send it.
      </p>

      <p>
        Before you type anything, sign up with your business email and turn off the setting
        that lets the provider train on your chats. ChatGPT, Claude and Gemini all offer
        free plans that handle these tasks. The post on{" "}
        <Link href="/blog/start-using-ai-this-week-three-safe-first-tasks">three safe first tasks</Link>{" "}
        gives the steps and the prompts for each one.
      </p>

      <h2>How do I check whether an AI answer is accurate?</h2>

      <p>
        Check four things against a source you trust before an AI answer reaches a customer:
        names, numbers, quotes and dates. A wrong one of these does the most damage when it
        goes out under your business name.
      </p>

      <ul>
        <li><strong>Names.</strong> People, products, suppliers and places, checked against their own websites.</li>
        <li><strong>Numbers.</strong> Prices, phone numbers, measurements and totals, checked against your records.</li>
        <li><strong>Quotes.</strong> Anything in quotation marks, traced to where the person said it.</li>
        <li><strong>Dates.</strong> Deadlines, laws and prices, since a model knows only its training data up to a cutoff.</li>
      </ul>

      <p>
        The post on{" "}
        <Link href="/blog/check-ai-answer-before-using">how to check an AI answer before you use it</Link>{" "}
        turns those four checks into a routine your staff can repeat.
      </p>

      <h2>Does my small business need an AI use policy for employees?</h2>

      <p>
        Yes, once more than one person uses AI tools for work. A one-page policy names the
        approved tools, lists the information that never goes into a chat, says who checks AI
        output before customers see it, and states whether staff should mention AI use to
        customers.
      </p>

      <p>The information that stays out of every chat window:</p>

      <ul>
        <li>Passwords, login codes and API keys.</li>
        <li>Customer records, card numbers and payment details.</li>
        <li>Private details about staff, such as pay, health and reviews.</li>
      </ul>

      <p>
        Business plans of the major AI tools give an owner admin controls and different data
        terms from personal accounts, which makes the policy easier to enforce. The post on{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the AI chat window</Link>{" "}
        covers each category and a sample rule for your team.
      </p>

      <h2>Do I have to tell customers when I use AI?</h2>

      <p>
        No US law requires a small business to label every AI-drafted email or post. Laws
        against deceptive advertising still apply to what the text claims, and some states
        require a bot to identify itself in certain sales conversations. A chatbot on your
        website should say it is a bot, and a reply sent under a person&apos;s name should be
        one that person read.
      </p>

      <p>
        This is general information, and a business in a regulated field such as health care,
        law or finance should ask its own counsel.
      </p>

      <h2>Where does AI waste a small business&apos;s money?</h2>

      <p>
        AI wastes money when it attaches to a process that was already broken. An AI
        receptionist that books appointments into a calendar nobody checks, or captures leads
        nobody calls back, works as designed and still earns nothing. Fix the process first,
        then add the tool.
      </p>

      <p>Three questions to answer before any AI purchase:</p>

      <ol>
        <li>Is time the bottleneck? Name the hours per week the tool saves.</li>
        <li>Where does the output go? If it lands in a tool you have not set up, set that up first.</li>
        <li>Who reviews the output? Name the person before you buy.</li>
      </ol>

      <p>
        The post on{" "}
        <Link href="/blog/why-most-ai-tools-waste-money">why some small business AI tools waste your money</Link>{" "}
        works through each question with an example.
      </p>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Good use of AI?</th>
            <th>What a person still does</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Review replies</strong></td><td>Yes</td><td>Reads each reply before it posts</td></tr>
          <tr><td><strong>Website and social copy</strong></td><td>Yes, from your own facts</td><td>Checks names, prices and claims</td></tr>
          <tr><td><strong>Summaries of long documents</strong></td><td>Yes</td><td>Opens the source before acting on a summary</td></tr>
          <tr><td><strong>Customer chat on your site</strong></td><td>Yes, with written answers and a handoff</td><td>Reads the log and handles handoffs</td></tr>
          <tr><td><strong>Pricing and quotes</strong></td><td>Drafts only</td><td>Sets the price and signs off</td></tr>
          <tr><td><strong>Hiring, firing and legal replies</strong></td><td>No</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>Which AI subscriptions are worth paying for?</h2>

      <p>
        One paid plan of a general assistant such as ChatGPT, Claude or Gemini covers most of
        what a small team needs, and a business plan adds the admin and data controls a staff
        policy depends on. Pay for a specialized AI tool only after it passes the three
        questions above.
      </p>

      <p>
        Watch for AI features added to software you already pay for. Many products now bundle
        AI into a higher tier, and the upgrade can cost more than the general assistant that
        does the same drafting.
      </p>

      <h2>Will AI replace employees at a small business?</h2>

      <p>
        In a small business, AI takes over tasks such as drafting and sorting, and those tasks
        rarely make up a whole job. The time it frees can go to customer work that needs a
        person. Whether it leads to fewer hires depends on how the owner uses that time.
      </p>

      <h2>How do I know if my business is ready for AI?</h2>

      <p>
        A business is ready if it has work that repeats each week, information already kept
        in a digital tool, and one person who will own the change. The{" "}
        <Link href="/ai-readiness">AI readiness test</Link> scores your team out of 30 in 10
        questions, takes about three minutes and asks for no email.
      </p>

      <p>
        For a team that wants hands-on help, <Link href="/consulting">AI training</Link>{" "}
        costs $175 an hour for 1-on-1 sessions, $125 a person for groups of 2 to 8, and $2,500
        for a half-day workshop for up to 20 people.
      </p>

      <h2>How does AI fit my trade?</h2>

      <p>
        Each trade hands AI different jobs. An HVAC company drafts estimates from tech
        notes, a dental office sends recall reminders, a church cuts sermon clips, and a law
        firm keeps legal advice away from any bot. The trade guides in{" "}
        <Link href="/ai-for">AI for small business by trade</Link> cover twelve businesses,
        from plumbers and roofers to restaurants, salons and auto repair shops.
      </p>

      <h2>Where can I look up AI terms and survey numbers?</h2>

      <p>
        The <Link href="/ai-glossary">AI glossary for small business owners</Link> defines 57
        terms, from token and context window to AEO and GPTBot, each with an example from a
        small business. <Link href="/ai-small-business-statistics">AI in small business
        statistics</Link> gathers survey figures on adoption, uses, barriers and AI search, each
        with its source and date. In fall 2025, for example, the Federal Reserve&apos;s Small
        Business Credit Survey found 46% of small employer firms using AI.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your team
        spends its week on. The first conversation is free, and I reply within one business
        day.
      </p>

      <p>
        Related guides: <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
        <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
        <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
        <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
        <Link href="/ai-design">AI in design for small businesses</Link>.{" "}
        <Link href="/ai-for">By trade</Link>: guides for twelve kinds of small business. The <Link href="/ai-glossary">AI glossary</Link> defines the terms, and{" "}
        <Link href="/ai-small-business-statistics">AI small business statistics</Link> lists the numbers with sources.
      </p>
    </PostLayout>
  );
}
