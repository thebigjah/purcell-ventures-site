"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Five workflows you can automate this week without writing co", href: "/blog/five-workflows-no-code" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Practical · May 24, 2026 · 4 min read</div>
          <h1>Five workflows you can automate this week without writing code</h1>
          <p className="deck">
            The five workflows I see small business owners burn the most time on. Each is automatable with off-the-shelf tools in under two hours. No code required.
          </p>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
          <p>
            Most small business owners I work with don&apos;t need AI strategy. They need ten hours back in their week. Here are five places to find them, ranked by how fast you can ship the fix.
          </p>

          <h2 style={h2}>1. Email follow-ups for quotes you sent and forgot</h2>
          <p>
            You quoted a client, they didn&apos;t respond, and now it&apos;s been eleven days and you can&apos;t remember if you followed up. This is the single biggest revenue leak I see — and it&apos;s fixable in 45 minutes with any modern email tool.
          </p>
          <p>
            Set up a sequence in Gmail (via the &quot;Schedule send&quot; feature) or in a free Zapier+Sheets combo. Day three: a one-line bump. Day eight: an honest &quot;hey, last touch — yes or no is fine.&quot; Day thirty: a 90-day pickup. That&apos;s it. You&apos;ll close 15-25% more of your quoted deals just by not forgetting.
          </p>

          <h2 style={h2}>2. New customer onboarding emails</h2>
          <p>
            Every time someone buys, you send roughly the same three emails: welcome + confirmation + here&apos;s-what-happens-next. Most owners write these from scratch every time. The fix: write them once, set them on a delay, never think about it again.
          </p>
          <p>
            ConvertKit, MailerLite, even Gmail&apos;s built-in templates all do this for free or close to it. The time you spend setting up the sequence pays back the first week.
          </p>

          <h2 style={h2}>3. Invoice + payment reminders</h2>
          <p>
            If you&apos;re manually sending invoices and chasing payments, stop. Stripe + a simple invoicing tool handles this entirely. The customer gets the invoice, gets reminded at 7 / 14 / 30 days, and pays via card link. You stop being a debt collector.
          </p>
          <p>
            We use Stripe + a custom workflow on the back end of Purcell Ventures invoices. Setup took 90 minutes. We&apos;ve been paid faster every month since.
          </p>

          <h2 style={h2}>4. Lead capture forms that actually notify you</h2>
          <p>
            Your contact form sits there collecting submissions in a database you never check. By the time you reply, the lead has bought from someone else. This is fixable in twenty minutes with Zapier or n8n: form submission → Slack DM or text message → you call back within an hour.
          </p>
          <p>
            The companies that win in services right now are the ones that respond inside 60 minutes. Form-to-text is the cheapest way to be that company.
          </p>

          <h2 style={h2}>5. Social media posting (the calendar, not the writing)</h2>
          <p>
            Writing social posts is the hard part. Scheduling them is the easy part — and it&apos;s the part most owners trip on. They write four posts in a burst, then disappear from social for three weeks because they don&apos;t want to log in and post manually.
          </p>
          <p>
            Schedule a month&apos;s posts in one sitting using Buffer, Later, or Meta&apos;s built-in scheduler. AI can draft the captions in minutes (our <Link href="/digital/tools/caption-generator" style={{ color: "var(--color-warm-accent)" }}>Caption Generator</Link> spits out five versions per post). You write the prompts, AI does the typing, the tool does the posting. You touch it once a month.
          </p>

          <h2 style={h2}>The pattern</h2>
          <p>
            None of these are about AI being clever. They&apos;re about taking a thing you already do manually and putting it on a schedule so you don&apos;t have to remember. The leverage isn&apos;t intelligence — it&apos;s patience-at-scale.
          </p>

          <p>
            If any of these feel impossible at your current setup, that&apos;s usually the symptom of a deeper problem — your tools don&apos;t talk to each other. That&apos;s a different conversation. <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>Book a consulting session</Link> if you want to walk through what your stack should look like.
          </p>
        


          <PostFaq qa={[
            ["What can a small business automate without writing code?",
             "Five things, each doable in under two hours with off-the-shelf tools: follow-ups on quotes you sent and forgot, new customer onboarding emails, and three more. Most owners do not need an AI strategy, they need ten hours back in the week."],
            ["How do I automate quote follow-ups?",
             "A three-touch sequence built with scheduled send in Gmail or a free Zapier and Sheets combination. Day three, a one-line bump. Day eight, an honest last touch where yes or no is fine. Day thirty, a ninety-day pickup. It takes about forty-five minutes to set up and closes 15 to 25 per cent more of your quoted deals purely by not forgetting."],
          ]} />

          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-a-website-actually-costs" style={{ color: "var(--color-warm-accent)" }}>What a website actually costs, and when not to buy one</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/claim-your-google-listing" style={{ color: "var(--color-warm-accent)" }}>Claiming the Google listing, which usually matters more</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "five-workflows-no-code",
            title: "Five workflows you can automate this week without writing code | Elijah Purcell",
            description: "The five workflows I see small business owners burn the most time on. Each is automatable with off-the-shelf tools in under two hours. No code required.",
            published: "2026-05-24",
          }} />

        </article>

        <footer style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
          First draft written by our <Link href="/digital/tools/content-generator" style={{ color: "var(--color-warm-accent)" }}>AI Content Generator</Link>. Edited and signed off by Elijah Purcell. — Purcell Ventures
        </footer>

      </main>
    </div>
  );
}

const h2: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "var(--color-warm-accent)", marginTop: "36px", marginBottom: "16px", lineHeight: 1.3 };
