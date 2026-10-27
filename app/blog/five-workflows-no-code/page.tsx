import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Five workflows you can automate this week without writing code", href: "/blog/five-workflows-no-code" },
      ]} />}
      kicker="Practical"
      title="Five workflows you can automate this week without writing code"
      meta="24 May 2026, 4 minute read"
    >
      <p>
        Most small business owners I work with want time back more than they want an AI strategy. These five tasks eat a lot of their week, and each one can be automated with off-the-shelf tools in under two hours.
      </p>

      <h2>Email follow-ups for quotes you sent and forgot</h2>
      <p>
        You quoted a client, they didn&apos;t respond, and now it&apos;s been eleven days and you can&apos;t remember if you followed up. Forgotten follow-ups lose sales, and you can fix it in 45 minutes with Gmail.
      </p>
      <p>
        Set up a sequence in Gmail (via the &quot;Schedule send&quot; feature) or in a free Zapier+Sheets combo. Send a one-line reminder on day three, a plain &quot;last touch, yes or no is fine&quot; on day eight, and a 90-day pickup note on day thirty.
      </p>

      <h2>New customer onboarding emails</h2>
      <p>
        Every time someone buys, you send the same three emails: welcome, confirmation and next steps. Most owners write these from scratch every time, when they could write them once and schedule them.
      </p>
      <p>
        ConvertKit, MailerLite and Gmail&apos;s built-in templates all do this, and the Gmail templates are free.
      </p>

      <h2>Invoice and payment reminders</h2>
      <p>
        If you&apos;re sending invoices and chasing payments by hand, Stripe plus an invoicing tool can send the invoices and reminders for you. The customer gets the invoice, gets reminded at 7, 14 and 30 days, and pays by card link.
      </p>
      <p>
        I use Stripe and a custom workflow for Purcell Ventures invoices, and setup took 90 minutes.
      </p>

      <h2>Lead forms that notify you</h2>
      <p>
        If your contact form collects submissions in a database you rarely check, a lead may buy from someone else before you reply. Zapier or n8n can fix this in twenty minutes: each form submission sends you a Slack message or text, so you can call back within an hour.
      </p>

      <h2>Social media posts on a schedule</h2>
      <p>
        Many owners write four posts in a burst, then go quiet on social media for three weeks because they don&apos;t want to log in and post by hand.
      </p>
      <p>
        Schedule a month&apos;s posts in one sitting using Buffer, Later, or Meta&apos;s built-in scheduler. AI can draft the captions in minutes (my <Link href="/digital/tools/caption-generator">Caption Generator</Link> writes five captions per post). You write the prompts and the tool publishes them.
      </p>

      <h2>What the five have in common</h2>
      <p>
        Each workflow takes a task you already do by hand and puts it on a schedule so you don&apos;t have to remember it.
      </p>

      <p>
        If any of these seem impossible with your current setup, your tools may not connect to each other. <Link href="/consulting">Book a consulting session</Link> if you want to work out which tools you need.
      </p>

      <Note>I drafted this post with <Link href="/digital/tools/content-generator">AI tools</Link> and edited it before publishing.</Note>

      <h2>Related reading</h2>

      <ul>
        <li><Link href="/blog/what-a-website-actually-costs">What a small business website costs, and when not to buy one</Link></li>
        <li><Link href="/blog/claim-your-google-listing">Claiming the Google listing, which usually matters more</Link></li>
      </ul>

<PostByline post={{
            slug: "five-workflows-no-code",
            title: "Five workflows you can automate this week without writing code",
            description: "Five tasks that eat a lot of a small business owner's week, and how to automate each one with off-the-shelf tools in under two hours.",
            published: "2026-05-24",
          }} />


    </PostLayout>
  );
}
