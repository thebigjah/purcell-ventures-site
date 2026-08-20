import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// PRICES CHECKED AGAINST THE LIVE SERVICE PAGES BEFORE WRITING.
//
// A pricing post that contradicts the pricing pages is worse than no pricing post, because
// the reader finds the discrepancy and concludes something about the whole site. Every
// figure below was read off /digital, /software and /consulting.

export const metadata = {
  alternates: { canonical: "/blog/what-a-website-actually-costs" },
  title: "What a small business website actually costs | Elijah Purcell",
  description:
    "Real numbers and what drives them: why the same site is quoted at $400 and at $15,000, what a monthly subscription does and does not include, the ongoing costs nobody mentions, and how to tell an expensive quote from an overpriced one.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const td: React.CSSProperties = { padding: "10px 14px 10px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", verticalAlign: "top" };
const th: React.CSSProperties = { ...td, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, borderBottom: "2px solid rgba(212,175,55,0.3)" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What a website actually costs", href: "/blog/what-a-website-actually-costs" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 8 min read</div>
          <h1>
            What a small business website{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>actually</em> costs
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Ask three providers what a website costs and you will get $400, $4,000 and
            $15,000, all for something a customer could not tell apart from the outside.
            Here is what actually drives that spread, with my own numbers on the page so you
            can see where I sit.
          </p>

          <h2 style={H2}>The three things you are actually buying</h2>

          <p>
            <strong>Design.</strong> Somebody deciding what it looks like. This ranges from
            picking a template to originating a visual identity, and it is the single
            largest driver of the spread.
          </p>

          <p>
            <strong>Build.</strong> Turning that into a working site. A five-page brochure
            site and a site with bookings, payments and accounts are not the same job by an
            order of magnitude.
          </p>

          <p>
            <strong>Content.</strong> Words and photographs. This is the one everybody
            forgets when comparing quotes, and the one that most often stalls a project for
            months, because the provider is waiting on the client and the client thought it
            was included.
          </p>

          <h2 style={H2}>Roughly what each tier gets you</h2>

          <div style={{ overflowX: "auto", margin: "20px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
              <thead>
                <tr>
                  <th style={{ ...th, width: "26%" }}>Price</th>
                  <th style={th}>What that is</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ ...td, fontWeight: 700 }}>Free to $50/mo</td><td style={td}>You build it on a site builder. Real option, genuinely fine for a lot of businesses, and your time is the cost.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$400 to $1,500 once</td><td style={td}>A template configured for you. Somebody else does the work, the design is not original, and this is where most small business sites should probably land.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$1,500 to $5,000 once</td><td style={td}>Custom build. Original layout, your content structure, functionality beyond pages. My custom software work starts at $1,500 and a substantial build runs to $5,000.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$99 to $279/mo</td><td style={td}>Subscription: the site plus somebody maintaining it. My digital tiers run $99, $179 and $279 a month. No large upfront number, and you are renting rather than owning the arrangement.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$10,000 and up</td><td style={td}>Original design, multiple specialists, strategy, photography. Real work, and rarely what a barber shop needs.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={H2}>The costs nobody puts in the quote</h2>

          <p>
            These continue after the invoice is paid, and a quote that omits them is not
            cheaper, it is less complete.
          </p>

          <ul style={{ paddingLeft: "1.1rem" }}>
            <li style={{ marginBottom: "9px" }}><strong>Domain.</strong> Roughly $12 to $20 a year. Yours, in your name, always.</li>
            <li style={{ marginBottom: "9px" }}><strong>Hosting.</strong> Free to about $20 a month for a site this size. Genuinely free tiers exist and are adequate.</li>
            <li style={{ marginBottom: "9px" }}><strong>Email at your domain.</strong> A few dollars per user per month, and worth it. An address at your own domain reads differently to a customer.</li>
            <li style={{ marginBottom: "9px" }}><strong>Changes.</strong> The real one. Every site needs edits, and if that is not agreed in writing it becomes an argument in month four.</li>
            <li style={{ marginBottom: "9px" }}><strong>Your time.</strong> Photographs, copy, decisions, feedback. Always more than anyone expects.</li>
          </ul>

          <h2 style={H2}>Expensive is not the same as overpriced</h2>

          <p>
            A $10,000 site can be good value and a $500 site can be a waste. The question is
            not the number, it is what the number is attached to.
          </p>

          <p>
            <strong>Signs a quote is expensive and fair:</strong> it is itemised. It says
            what happens after launch. It states who owns the domain, the hosting and the
            code. It has a date. It says what is not included.
          </p>

          <p>
            <strong>Signs a quote is overpriced:</strong> one number and no breakdown.
            Monthly fees with no defined scope. The provider holds the domain. No mention of
            what a change costs. Pressure to decide this week.
          </p>

          <h2 style={H2}>The question that matters more than any of this</h2>

          <p>
            What is a customer worth to you, and how many extra ones would make the site pay
            for itself?
          </p>

          <p>
            If your average customer is worth $2,000, a $3,000 site needs to find you two
            over its lifetime and the decision is easy. If your average sale is $12 and your
            customers are the same regulars every week, no website at any price is the thing
            that changes your business, and you should{" "}
            <Link href="/blog/claim-your-google-listing" style={link}>claim your Google
            listing</Link> and go back to work.
          </p>

          <p>
            I audited 121 independent businesses near the University of Alabama, and for most
            of them the honest recommendation is the free one first.{" "}
            <Link href="/blog/is-your-business-invisible" style={link}>The self-check is
            here</Link>.
          </p>

          <PostFaq qa={[
            ["How much does a small business website cost?",
             "Realistically, a configured template runs $400 to $1,500 once, a custom build runs $1,500 to $5,000, and a monthly subscription that includes maintenance runs roughly $99 to $279 a month. Above $10,000 you are paying for original design work and multiple specialists, which is real but rarely what a small local business needs. Building it yourself on a site builder is free to about $50 a month and is a legitimate option."],
            ["What ongoing costs does a website have?",
             "A domain at roughly $12 to $20 a year, hosting from free to about $20 a month for a small site, email at your own domain at a few dollars per user per month, and the cost of changes. The last one is the one that causes arguments, because it is usually not agreed in writing before launch."],
            ["Why do website quotes vary so much?",
             "Three components move independently: design, ranging from picking a template to originating a visual identity; build, where a five-page brochure site and a site with bookings and payments differ by an order of magnitude; and content, meaning words and photographs, which is the item most often left out of a comparison and the one that most often stalls a project."],
            ["How do I know if a website quote is fair?",
             "Fair quotes are itemised, state what happens after launch, say who owns the domain, hosting and code, carry a date, and say what is not included. Warning signs are a single number with no breakdown, a monthly fee with no defined scope, the provider holding your domain, no stated price for changes, and pressure to decide within the week."],
            ["Does my business actually need a website?",
             "Work out what one customer is worth and how many extra the site would need to find to pay for itself. If a customer is worth $2,000 the maths is easy. If your average sale is small and your customers are the same regulars every week, claiming your Google Business Profile and fixing your hours will do more for you than a website at any price."],
          ]} />

          <PostByline post={{
            slug: "what-a-website-actually-costs",
            title: "What a small business website actually costs",
            description: "Real numbers and what drives them, the ongoing costs nobody mentions, and how to tell an expensive quote from an overpriced one.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
