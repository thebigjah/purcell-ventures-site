import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

// PRICES CHECKED AGAINST THE LIVE SERVICE PAGES BEFORE WRITING.
//
// A pricing post that contradicts the pricing pages is worse than no pricing post, because
// the reader finds the discrepancy and concludes something about the whole site. Every
// figure below was read off /digital, /software and /consulting.

export const metadata = {
  alternates: { canonical: "/blog/what-a-website-actually-costs" },
  title: { absolute: "What a small business website costs" },
  description:
    "Price ranges and what drives them. Why one small business site gets quotes of $400 and $15,000, what a monthly subscription includes, the ongoing costs quotes leave out, and how to judge whether a quote is fair.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "What a website costs", href: "/blog/what-a-website-actually-costs" },
      ]} />}
      kicker="Business"
      title="What a small business website costs"
      meta="20 August 2026, 8 minute read"
    >
      <p>
        Ask three providers what a website costs and you will get $400, $4,000 and $15,000,
        for sites that can look alike to a customer. The spread comes from three things you
        are paying for, and I include my own prices so you can compare.
      </p>

      <h2>What the price pays for</h2>

      <p>
        The first is design, which means deciding what the site looks like. It ranges from
        picking a template to creating a visual identity, and it drives much of the spread.
      </p>

      <p>
        The second is the build, which turns that design into a working site. A site with
        bookings, payments and accounts takes ten times the work of a five-page brochure
        site.
      </p>

      <p>
        The third is content, meaning the words and photographs. Quotes often leave this out,
        and it is the item that most often stalls a project for months, because the provider
        is waiting on the client and the client thought it was included.
      </p>

      <h2>What each price tier buys</h2>

      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>What that is</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Free to $50/mo</strong></td><td>You build it on a site builder. A workable option for many businesses, and your time is the cost.</td></tr>
          <tr><td><strong>$400 to $1,500 once</strong></td><td>A template configured for you. Somebody else does the work, the design is not original, and this tier fits most small business sites.</td></tr>
          <tr><td><strong>$1,500 to $5,000 once</strong></td><td>Custom build. Original layout, your content structure, functionality beyond pages. My custom software work starts at $1,500 and a substantial build runs to $5,000.</td></tr>
          <tr><td><strong>$99 to $279/mo</strong></td><td>A subscription covers the site and somebody maintaining it. My digital tiers run $99, $179 and $279 a month. There is no large upfront cost, and you rent the site instead of owning it.</td></tr>
          <tr><td><strong>$10,000 and up</strong></td><td>Original design, multiple specialists, strategy, photography. Useful work, rarely needed by a barber shop.</td></tr>
        </tbody>
      </table>

      <h2>The costs quotes leave out</h2>

      <p>
        These costs continue after you pay the invoice, whether or not the quote mentions
        them.
      </p>

      <ul>
        <li>A domain costs $12 to $20 a year. Register it in your name.</li>
        <li>Hosting runs from free to $20 a month for a site this size. Free tiers exist and are adequate for small sites.</li>
        <li>Email at your domain costs a few dollars per user per month. It is worth paying for, because customers notice the address.</li>
        <li>Changes cause the most disputes. Every site needs edits, and if the price of edits is not agreed in writing it becomes an argument in month four.</li>
        <li>Your own time goes to photographs, copy, decisions and feedback, and it is more than most clients expect.</li>
      </ul>

      <h2>How to judge whether a quote is fair</h2>

      <p>
        A $10,000 site can be good value and a $500 site can be a waste. Judge a quote by
        what it includes.
      </p>

      <p>
        A fair quote, even an expensive one, is itemised and dated. It says what happens
        after launch, who owns the domain, the hosting and the code, and what is not
        included.
      </p>

      <p>
        An overpriced quote gives one number with no breakdown, charges monthly fees with no
        defined scope, leaves the domain with the provider, does not say what a change
        costs, and pushes you to decide this week.
      </p>

      <h2>What a customer is worth to you</h2>

      <p>
        Work out what one customer is worth, and how many extra customers would make the
        site pay for itself.
      </p>

      <p>
        If your average customer is worth $2,000, a $3,000 site needs to find you two over
        its lifetime and the decision is easy. If your average sale is $12 and your
        customers are the same regulars every week, no website at any price changes your
        business, and you should{" "}
        <Link href="/blog/claim-your-google-listing">claim your Google listing</Link> and go
        back to work.
      </p>

      <p>
        I audited 121 independent businesses near the University of Alabama, and for most of
        them I recommend the free option first. My{" "}
        <Link href="/blog/is-your-business-invisible">ten-minute self-check</Link> shows
        where your business stands.
      </p>

      <PostByline post={{
        slug: "what-a-website-actually-costs",
        title: "What a small business website costs",
        description: "Price ranges and what drives them, the ongoing costs quotes leave out, and how to judge whether a quote is fair.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
