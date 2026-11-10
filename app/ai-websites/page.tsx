import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Pillar for the AI websites cluster, on the same PostLayout as /ai-consulting. It leads
// with AI findability, since websites are the last-listed PV service, and reaches builders
// and how pricing works near the end. Question H2s, each answered in the paragraph under it.

export default function AiWebsites() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Websites", href: "/sites" },
        { name: "AI websites for small businesses", href: "/ai-websites" },
      ]} />}
      kicker="AI search and websites"
      title="AI websites for small businesses"
      lede="How a small business gets ChatGPT and Google's AI answers to describe it correctly, what schema and llms.txt do, and when an AI website builder is enough."
      meta={<>Updated <time dateTime="2026-11-09">9 November 2026</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <p>
        Some customers now ask an AI assistant for a recommendation instead of scrolling
        search results. I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in
        Tuscaloosa, and I build sites with AI answers in mind, starting with this one. I have
        also audited 121 independent businesses near the University of Alabama.
      </p>

      <h2>How does a business show up in ChatGPT and Google AI answers?</h2>

      <p>
        An AI assistant describes a business from the pages it can read: your website, your
        Google Business Profile, directories and reviews. It shows up correctly when crawlers
        can reach those sources, the sources agree with each other, and state plainly what the business
        does, where it is and who it serves.
      </p>

      <ol>
        <li>Let search engines and AI crawlers index your site.</li>
        <li>
          Put one plain sentence on the site that names the business, what it does and the
          town it serves.
        </li>
        <li>
          Make your Google Business Profile, site and directories show the same name, phone
          number, address and hours.
        </li>
        <li>Answer the questions customers ask, under headings that are those questions.</li>
      </ol>

      <p>
        The post on{" "}
        <Link href="/blog/write-a-page-an-ai-will-quote">how to write a page an AI will quote</Link>{" "}
        explains the sentence shape an assistant can lift, with examples from this site.
      </p>

      <h2>How can I check what ChatGPT says about my business?</h2>

      <p>
        Open a private window, sign out, and ask a general question first, such as the best
        business of your type in your town, without naming yours. Then ask about your business
        by name, and then ask where the assistant got its answer. The sources it names are the
        pages to fix.
      </p>

      <p>
        When I ran the test on my own name, the answer quoted a page I had corrected that
        morning, in its old version. Assistants can repeat a stale source for weeks after you
        change it. The full test is in{" "}
        <Link href="/blog/can-ai-find-your-business">can an AI find your business</Link>.
      </p>

      <p>
        To see what an AI crawler reads on your own site, run the free{" "}
        <Link href="/ai-visibility-check">AI visibility check</Link>. It reads your robots.txt,
        llms.txt and home page and lists what to fix.
      </p>

      <p>
        For how Alabama small businesses do on these checks, by city, read the{" "}
        <Link href="/research/alabama-small-business-websites-2026">Alabama small business
        websites research</Link>.
      </p>

      <h2>What is the difference between SEO and generative engine optimization?</h2>

      <p>
        Search engine optimization helps a page rank in a list of links. Generative engine
        optimization helps an AI assistant pick a sentence from your page and repeat it in an
        answer. Most of the work overlaps, and the difference is in how the page states its
        facts.
      </p>

      <table>
        <thead>
          <tr>
            <td></td>
            <th scope="col">SEO</th>
            <th scope="col">Generative engine optimization</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">The result</th><td>A link in a ranked list</td><td>A sentence quoted or summarized in an answer</td></tr>
          <tr><th scope="row">What the page needs</th><td>Thorough coverage of a topic</td><td>Sentences that make sense on their own</td></tr>
          <tr><th scope="row">Local listings</th><td>Google Business Profile drives the map results</td><td>Listings feed the facts assistants repeat</td></tr>
          <tr><th scope="row">What hurts</th><td>Thin or copied pages</td><td>Vague marketing copy and sources that disagree</td></tr>
          <tr><th scope="row">Shared base</th><td colSpan={2}>A page that crawlers can reach and index</td></tr>
        </tbody>
      </table>

      <h2>Does schema markup help AI find my business?</h2>

      <p>
        Schema markup is a block of data in a page&apos;s code that labels facts such as the
        business name, address, hours and services. It helps machines read those facts
        without guessing. It helps only when the same facts appear in the visible page, and
        it cannot rescue a page that never states them.
      </p>

      <p>
        FAQ markup changed in 2026. Google stopped showing FAQ rich results in its search
        pages on 7 May 2026, and Bing and the crawlers behind AI assistants still read the
        markup. An FAQ section still matters because customers ask questions and assistants
        look for the matching answer.
      </p>

      <h2>What is an llms.txt file, and does my business need one?</h2>

      <p>
        An llms.txt file is a plain-text file at the root of a website that lists the main
        pages and what each one is for, written for AI systems to read. Adoption is not
        universal, and nobody can promise results from one. For a site with more than a few
        pages, it takes about twenty minutes and costs nothing.
      </p>

      <p>
        Writing one also forces you to describe each page in a sentence, which often shows
        which pages have no clear job. This site publishes one at purcellventures.co/llms.txt.
      </p>

      <h2>Should I block AI crawlers from my website?</h2>

      <p>
        Most local businesses should let them in. An assistant that cannot read your site
        describes your business from directories and reviews instead. Blocking makes sense for
        a business whose product is its writing or research, since that content is what the
        crawlers take.
      </p>

      <p>
        A site&apos;s robots.txt file controls crawlers by name, and some AI companies run
        separate crawlers for training and for live lookups. This site allows all crawlers on
        its public pages.
      </p>

      <h2>Will Google penalize my website for AI-written content?</h2>

      <p>
        Google has said it ranks content on whether it helps the reader, whoever or
        whatever wrote it. Its spam policies target pages mass-produced to rank with little value for
        a reader. A page that AI drafted, a person checked, and that states real facts about
        your business stays within those policies.
      </p>

      <h2>Are AI website builders good enough for a small business?</h2>

      <p>
        For a simple site the owner will keep updated, an AI builder from Wix, Squarespace or
        a similar company is often enough. A custom site fits when you need booking, payments,
        integrations with your other software, or full control of the code and structured
        data.
      </p>

      <table>
        <thead>
          <tr>
            <td></td>
            <th scope="col">AI website builder</th>
            <th scope="col">Custom site</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Who builds it</th><td>You, from a drafted template</td><td>A developer, to a written plan</td></tr>
          <tr><th scope="row">Cost shape</th><td>A monthly subscription</td><td>A build fee, then hosting and upkeep</td></tr>
          <tr><th scope="row">Structured data</th><td>Whatever the builder supports</td><td>Anything schema.org defines</td></tr>
          <tr><th scope="row">Integrations</th><td>The builder&apos;s app store</td><td>Your CRM, booking and other tools</td></tr>
          <tr><th scope="row">Leaving</th><td>Content export varies by builder</td><td>You keep the code, content and domain</td></tr>
        </tbody>
      </table>

      <p>
        Before you commit to a builder, confirm that you can edit page titles and
        descriptions, connect your own domain and export your content. The full{" "}
        <Link href="/compare/ai-website-builder-vs-custom-site">AI website builder vs custom
        site</Link> comparison covers cost over three years and what you own if you leave.
      </p>

      <h2>Is a chatbot on my website worth it?</h2>

      <p>
        A chatbot is worth it when customers ask the same questions often and you have written
        answers for it to use. It wastes money when nobody reads its log or follows up on the
        leads it collects. Online booking connected to your real calendar often does more for a
        service business than a chatbot.
      </p>

      <p>
        I add an AI FAQ to an existing site on the <Link href="/digital">Digital Growth plan</Link>,
        and an AI chatbot with online booking on the Full Service plan. Each plan is quoted for
        your business after a free call.
      </p>

      <h2>Should I redesign my website for AI search or fix the one I have?</h2>

      <p>
        Fix the one you have first. Most AI findability problems come from facts that are
        missing, unclear or different across sources, and you can correct them without a new
        design. Redesign when nobody can edit the site, loads slowly on a phone, or runs on a
        platform that blocks the changes above.
      </p>

      <h2>How much does an AI-ready website cost?</h2>

      <p>
        At Purcell Ventures I quote each build on a free discovery call. A single-page Starter
        site goes live in 7 to 10 business days and a multi-page Pro site in 14 to 21. You own
        the site, the content and the domain, and if you leave I hand over the source code and
        every asset.
      </p>

      <p>
        The <Link href="/sites">websites page</Link> lists the build tiers and the three care
        plans after launch. For price ranges across the whole market and the costs that quotes
        leave out, read{" "}
        <Link href="/blog/what-a-website-actually-costs">what a small business website costs</Link>.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with your site&apos;s address
        and what the AI assistants say about you. I reply within one business day.
      </p>

      <p>
        Related guides: <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
        <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
        <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
        <Link href="/ai-for-small-business">AI for small business</Link> and{" "}
        <Link href="/ai-design">AI in design for small businesses</Link>. The <Link href="/ai-glossary">AI glossary</Link> defines the terms, and{" "}
        <Link href="/ai-small-business-statistics">AI small business statistics</Link> lists the numbers with sources.
      </p>
    </PostLayout>
  );
}
