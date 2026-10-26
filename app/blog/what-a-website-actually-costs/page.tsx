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
  title: { absolute: "What a small business website costs | Elijah Purcell" },
  description:
    "Price ranges and what drives them. Why one small business site gets quotes of $400 and $15,000, what a monthly subscription includes, the ongoing costs quotes leave out, and how to judge whether a quote is fair.",
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

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What a website costs", href: "/blog/what-a-website-actually-costs" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business, August 20, 2026, 8 min read</div>
          <h1>
            What a small business website{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>costs</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Ask three providers what a website costs and you will get $400, $4,000 and
            $15,000, for sites that can look alike to a customer. Here is what drives
            that spread, with my own numbers on the page so you
            can see where I sit.
          </p>

          <h2 style={H2}>The three things you buy</h2>

          <p>
            The first is design, meaning somebody decides what the site looks like. This
            ranges from picking a template to creating a visual identity, and it drives
            much of the spread.
          </p>

          <p>
            The second is the build, which turns that design into a working site. A site
            with bookings, payments and accounts takes about ten times the work of a
            five-page brochure site.
          </p>

          <p>
            The third is content, meaning the words and photographs. Quotes often leave
            this out, and it is the item that most often stalls a project for months, because the provider is waiting on the client and the client thought it
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
                <tr><td style={{ ...td, fontWeight: 700 }}>Free to $50/mo</td><td style={td}>You build it on a site builder. A workable option for many businesses, and your time is the cost.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$400 to $1,500 once</td><td style={td}>A template configured for you. Somebody else does the work, the design is not original, and this is where most small business sites should probably land.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$1,500 to $5,000 once</td><td style={td}>Custom build. Original layout, your content structure, functionality beyond pages. My custom software work starts at $1,500 and a substantial build runs to $5,000.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$99 to $279/mo</td><td style={td}>A subscription covers the site and somebody maintaining it. My digital tiers run $99, $179 and $279 a month. No large upfront number, and you are renting rather than owning the arrangement.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>$10,000 and up</td><td style={td}>Original design, multiple specialists, strategy, photography. Useful work, rarely needed by a barber shop.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={H2}>The costs quotes leave out</h2>

          <p>
            These continue after the invoice is paid. A quote that omits them is less
            complete, and the costs still arrive.
          </p>

          <ul style={{ paddingLeft: "1.1rem" }}>
            <li style={{ marginBottom: "9px" }}>A domain costs roughly $12 to $20 a year. Register it in your name.</li>
            <li style={{ marginBottom: "9px" }}>Hosting runs from free to about $20 a month for a site this size. Free tiers exist and are adequate for small sites.</li>
            <li style={{ marginBottom: "9px" }}>Email at your domain costs a few dollars per user per month. It is worth paying for, because customers notice the address.</li>
            <li style={{ marginBottom: "9px" }}>Changes cause the most disputes. Every site needs edits, and if the price of edits is not agreed in writing it becomes an argument in month four.</li>
            <li style={{ marginBottom: "9px" }}>Your own time goes to photographs, copy, decisions and feedback, and it is more than most clients expect.</li>
          </ul>

          <h2 style={H2}>How to judge whether a quote is fair</h2>

          <p>
            A $10,000 site can be good value and a $500 site can be a waste. Judge a quote
            by what it includes.
          </p>

          <p>
            A fair quote, even an expensive one, is itemised. It says
            what happens after launch. It states who owns the domain, the hosting and the
            code. It has a date. It says what is not included.
          </p>

          <p>
            An overpriced quote gives one number with no breakdown, charges monthly fees with
            no defined scope, leaves the domain with the provider, does not say what a change
            costs, and pushes you to decide this week.
          </p>

          <h2 style={H2}>What is a customer worth to you?</h2>

          <p>
            Work out what one customer is worth, and how many extra customers would make the
            site pay for itself.
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
            of them my recommendation is the free option first.{" "}
            <Link href="/blog/is-your-business-invisible" style={link}>The self-check is
            here</Link>.
          </p>


          <PostByline post={{
            slug: "what-a-website-actually-costs",
            title: "What a small business website costs",
            description: "Price ranges and what drives them, the ongoing costs quotes leave out, and how to judge whether a quote is fair.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
