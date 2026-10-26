import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/case-for-charging-19" },
  title: { absolute: "Why I charge $19 for the AI Starter Kit, by Elijah Purcell" },
  description: "Why I priced the PV AI Starter Kit at $19, what it does to how people buy, and what 200 sales would add up to.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Why I charge $19 for the AI Starter Kit", href: "/blog/case-for-charging-19" },
      ]} />}
      kicker="Strategy"
      title="Why I charge $19 for the AI Starter Kit"
      meta="25 May 2026, 4 minute read"
    >
      <p>I launched the <Link href="/shop/starter-kit">PV AI Starter Kit</Link> for $19. It contains 24 AI prompts, 5 sales scripts, a rep handbook, 50+ cold outreach templates, a 1099 contractor agreement template, and a CRM CSV template.</p>

      <p>Courses and template bundles in this category often sell for $97, $297 or $497, and I chose $19 on purpose.</p>

      <h2>A low price lets me skip a sales funnel</h2>
      <p>At $497, I would need a sales funnel: a webinar, an email sequence and testimonials. I would have to build all of that before selling a single copy.</p>

      <p>At $19 I do not need one. Someone tries one of the free tools on the site and can buy the kit at the bottom of the page.</p>

      <p>The $19 price earns less per visit than a $497 price would. I expect repeat customers to close some of that gap, and I do not have the sales data yet to say how much.</p>

      <h2>Some $19 buyers may buy a digital services plan</h2>
      <p>Someone who has paid $19 has already bought from Purcell Ventures once, which makes a second purchase an easier decision.</p>

      <p>When they need the done-for-you version of one of my products (Digital Services from $99 a month, Consulting $175 an hour, Custom Software from $1,500), they already know how I work and what I deliver.</p>

      <h2>Unit economics</h2>
      <p>The content in the $19 kit took 40 hours of work. If I sell 100 copies, that is $1,900, or $47.50 for each hour of build time. If I sell 1,000 copies, that is $19,000, or $475 an hour, which is above my $175 hourly consulting rate.</p>

      <p>Each extra copy is a digital download and costs me nothing to deliver, so total sales matter more than margin per copy.</p>

      <h2>A $19 purchase carries little risk</h2>
      <p>A buyer who picks the wrong kit loses $19, which changes how people buy. At $19, the buyer is testing: <em>let&apos;s see if this is any good.</em> At $497, the buyer is justifying: <em>I have to prove to myself this was worth it.</em></p>

      <h2>I list every file in the kit before anyone pays</h2>
      <p>When you sell a $497 course, the customer cannot see the contents until after they pay, so the sales page has to persuade them.</p>

      <p>When you sell a $19 kit, you can show people exactly what&apos;s inside. I list every file on the <Link href="/shop/starter-kit">shop page</Link>.</p>

      <h2>A $19 price tests my delivery pipeline</h2>
      <p>If I cannot deliver $19 of value automatically, every time, with no effort per sale, my operations are not ready for a $497 product either.</p>

      <p>The kit has to deliver instantly through Stripe and need no support.</p>

      <h2>What 200 sales would mean</h2>
      <p>If I sell 200 kits a year at $19, that is $3,800 toward the build time and 200 people who have bought from me once.</p>

      <p>If 10 of them became Digital Services customers at $179 a month for 12 months, that would add $21,480.</p>

      <p>The $19 kit will not cover my costs on its own. I expect most of its value to come from the customers it brings to the paid services.</p>

      <h2>If you sell a higher-priced product</h2>
      <p>If you sell at $97, $297, or $497, consider what a $19 version would look like. Use it alongside your main product as a low-cost first step.</p>

      <p>The hard part is giving up per-unit margin in exchange for more buyers.</p>

      <Note>I drafted this post with AI tools and edited it before publishing.</Note>

      <h2>Related reading</h2>

      <ul>
        <li><Link href="/blog/what-a-website-actually-costs">What a small business website costs, with the numbers</Link></li>
        <li><Link href="/blog/starting-a-business-at-alabama">Starting a business as a student at Alabama</Link></li>
      </ul>

<PostByline post={{
            slug: "case-for-charging-19",
            title: "Why I charge $19 for the AI Starter Kit",
            description: "Why I priced the PV AI Starter Kit at $19, what it does to how people buy, and what 200 sales would add up to.",
            published: "2026-05-25",
          }} />


    </PostLayout>
  );
}
