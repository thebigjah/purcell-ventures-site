import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates from "@/app/components/PageDates";
import { pageDates, formatDate } from "@/lib/page-dates";
import { CONTACT } from "@/lib/contact";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { QA, PATH, PUBLISHED } from "./layout";

// The visible Updated line and the Article dateModified in layout.tsx read the same value.
const DATES = pageDates(PATH, PUBLISHED)!;

// The worked example is this site's own file, read at build time, so the excerpt on the
// page always matches what /llms.txt serves. It runs from the top of the file to the end of
// the first link section.
const OWN = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
const EXCERPT = (() => {
  const lines = OWN.split("\n");
  const h2 = lines.reduce<number[]>((acc, l, i) => (l.startsWith("## ") ? [...acc, i] : acc), []);
  return lines.slice(0, h2[1] ?? lines.length).join("\n").trimEnd();
})();

// Statewide sample of the Alabama study: own-domain home pages, and how many of them served
// a valid llms.txt.
const AL = summary.frames.statewide;
const AL_N = AL.llms_txt.n;
const AL_BASE = AL.own_domain_pages;
const AL_PCT = AL.llms_txt.pct_of_own_domain_pages;

export default function LlmsTxtPage() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI websites", href: "/ai-websites" },
        { name: "What is llms.txt?", href: PATH },
      ]} />}
      kicker="AI search and websites"
      title="What is llms.txt?"
      lede="llms.txt is a Markdown file at the root of a website that gives AI tools a short summary of the site and a list of links to its most useful pages. Jeremy Howard of Answer.AI proposed it on 3 September 2024."
      meta={<>Updated <time dateTime={DATES.modified}>{formatDate(DATES.modified)}</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <p>
        The file loads at an address such as yourdomain.com/llms.txt. A person can read it in
        a browser, and a language model can read it without parsing menus, scripts and
        layout. It names the site, says in a line or two what the site is, and lists the pages
        that answer the questions people ask, each with a short note.
      </p>

      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build sites with AI
        answers in mind, and this site publishes its own{" "}
        <a href="/llms.txt">llms.txt</a>, which appears below as the worked example.
      </p>

      <h2>Who proposed llms.txt?</h2>

      <p>
        Jeremy Howard, co-founder of Answer.AI, proposed llms.txt in{" "}
        <a href="https://www.answer.ai/posts/2024-09-03-llmstxt.html" target="_blank" rel="noopener noreferrer">a post dated 3 September 2024</a>.
        The specification lives at{" "}
        <a href="https://llmstxt.org/" target="_blank" rel="noopener noreferrer">llmstxt.org</a>,
        which states the idea in one sentence: &ldquo;We propose adding a /llms.txt markdown
        file to websites to provide LLM-friendly content.&rdquo; The current text of the spec
        is version 2.
      </p>

      <p>
        Howard has also said what the file is for. In a Bluesky reply on 20 January 2026 he
        wrote: &ldquo;llms.txt has nothing to do with SEO. It&apos;s basically a pre-written
        CLAUDE.md/AGENTS.md file to help people using stuff like Cursor and Claude Code use
        your site/product. It&apos;s not used for training LLMs.&rdquo;
      </p>

      <h2>What goes in an llms.txt file?</h2>

      <p>The spec sets out the parts in this order.</p>

      <ol>
        <li>An H1 with the name of the site or project. This is the only required part.</li>
        <li>A blockquote with a short summary that a reader needs to understand the rest of the file.</li>
        <li>Optional paragraphs or lists with more detail, with no headings.</li>
        <li>
          Sections under H2 headings, each a list of links. Each line holds a Markdown link,{" "}
          <code>[name](url)</code>, and can add a colon and a note about the page.
        </li>
        <li>
          By convention, a section headed <code>## Optional</code> for links an AI tool can
          skip when it needs a shorter context.
        </li>
      </ol>

      <h2>What is the difference between llms.txt and llms-full.txt?</h2>

      <p>
        llms.txt is an index: a summary and links. llms-full.txt puts the full text of the
        pages in one file, so a tool can read the whole site without following a single link.
      </p>

      <p>
        The llmstxt.org spec does not define llms-full.txt. Mintlify, a documentation
        platform,{" "}
        <a href="https://www.mintlify.com/blog/simplifying-docs-with-llms-txt" target="_blank" rel="noopener noreferrer">announced automatic llms.txt and llms-full.txt files</a>{" "}
        for the documentation sites it hosts on 20 November 2024, the earliest use of the
        name I could find. The original Answer.AI post described two expanded files under
        other names, llms-ctx.txt and llms-ctx-full.txt. This site publishes both an llms.txt
        and an <a href="/llms-full.txt">llms-full.txt</a>.
      </p>

      <h2>What has Google said about llms.txt?</h2>

      <p>
        Google Search ignores it. Google&apos;s Search Central guide,{" "}
        <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer">Optimizing your website for generative AI features on Google Search</a>,
        says: &ldquo;You don&apos;t need to create new machine readable files, AI text files,
        markup, or Markdown to appear in Google Search.&rdquo; On llms.txt files made for other
        services, it adds: &ldquo;Doing so will neither harm nor help your site&apos;s
        visibility or rankings in Google Search, as Google Search ignores them.&rdquo;
      </p>

      <p>
        John Mueller of Google Search Relations put it more bluntly in a{" "}
        <a href="https://bsky.app/profile/johnmu.com/post/3lrshm4gggs2v" target="_blank" rel="noopener noreferrer">Bluesky post on 17 June 2025</a>:
        &ldquo;FWIW no AI system currently uses llms.txt.&rdquo; That was his view in June 2025.
        Howard&apos;s own description points the file at coding assistants such as Cursor and
        Claude Code, and Google Search still ignores it.
      </p>

      <p>
        For a small business, that settles the order of work. Make the pages themselves say
        plainly what you do, where and for whom, because that is what Google and every
        assistant read. Add an llms.txt after that, for the tools that use it.
      </p>

      <h2>How do I write an llms.txt file?</h2>

      <ol>
        <li>Start with an H1 that holds the name of the business.</li>
        <li>
          Write a blockquote of one to three lines: what the business does, where, and for
          whom. Use the same sentence your home page uses.
        </li>
        <li>
          Group the pages that matter under H2 headings such as Services, Guides and
          Contact. Put one Markdown link on each line, with a colon and a short note on what
          the page answers.
        </li>
        <li>Put secondary links, such as social profiles, under <code>## Optional</code>.</li>
        <li>
          Save it as plain text at the root of the domain, so it loads at
          yourdomain.com/llms.txt, and update it when you add or remove a page.
        </li>
        <li>
          Open the address in a browser and confirm you see plain text. A server that answers
          that address with an HTML page has no usable llms.txt.
        </li>
      </ol>

      <h2>What does a real llms.txt look like?</h2>

      <p>
        This is the top of the file this site serves at{" "}
        <a href="/llms.txt">purcellventures.co/llms.txt</a>, up to the end of its first link
        section. The H1 names the company, the blockquote states what it is and where, and
        the first H2 section gives facts about the founder, then links to the pages that
        answer who and what.
      </p>

      <pre style={{ whiteSpace: "pre-wrap" }}><code>{EXCERPT}</code></pre>

      <p>
        The rest of the file lists the service pages, guides, research, free tools and
        writing, and ends with an Optional section of profile links.
      </p>

      <h2>How many Alabama small business websites have an llms.txt file?</h2>

      <p>
        About one in {Math.round(AL_BASE / AL_N)}. In the{" "}
        <Link href="/research/alabama-small-business-websites-2026">Purcell Ventures check of Alabama small business websites</Link>{" "}
        on 9 November 2026, {AL_N} of the {AL_BASE} home pages on a business&apos;s own
        domain in the statewide sample ({AL_PCT}%) served an llms.txt file that passed the
        test: status 200, plain text, and a Markdown heading or quote line. Many of those
        sites get the file from their website platform or an SEO plugin.
      </p>

      <p>
        The free <Link href="/ai-visibility-check">AI visibility check</Link> reads your
        robots.txt, llms.txt and home page and lists what to fix. The wider guide is{" "}
        <Link href="/ai-websites">AI websites for small businesses</Link>, and the{" "}
        <Link href="/ai-glossary#llms-txt">AI glossary</Link> defines the terms.
      </p>

      <h2>Common questions</h2>

      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}

      <h2>How do I get help with mine?</h2>

      <p>
        Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with your site&apos;s address.
        I reply within one business day, and I quote any work after a free call.
      </p>

      <PageDates path={PATH} name="What is llms.txt?" />
    </PostLayout>
  );
}
