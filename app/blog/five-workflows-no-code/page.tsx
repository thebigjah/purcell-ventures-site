"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Five workflows you can automate this week without writing code", href: "/blog/five-workflows-no-code" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Practical, May 24, 2026, 4 min read</div>
          <h1>Five workflows you can automate this week without writing code</h1>
          <p className="deck">
            These five workflows take small business owners the most time. You can automate each one with off-the-shelf tools in under two hours.
          </p>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
          <p>
            Most small business owners I work with don&apos;t need an AI strategy. They need time back. Here are five places to find it, ordered by setup time.
          </p>

          <h2 style={h2}>1. Email follow-ups for quotes you sent and forgot</h2>
          <p>
            You quoted a client, they didn&apos;t respond, and now it&apos;s been eleven days and you can&apos;t remember if you followed up. This is a common revenue leak, and you can fix it in 45 minutes with Gmail.
          </p>
          <p>
            Set up a sequence in Gmail (via the &quot;Schedule send&quot; feature) or in a free Zapier+Sheets combo. Day three: a one-line bump. Day eight: a plain &quot;last touch, yes or no is fine.&quot; Day thirty: a 90-day pickup.
          </p>

          <h2 style={h2}>2. New customer onboarding emails</h2>
          <p>
            Every time someone buys, you send the same three emails: welcome, confirmation and next steps. Most owners write these from scratch every time. Write them once and schedule them.
          </p>
          <p>
            ConvertKit, MailerLite, even Gmail&apos;s built-in templates all do this for free or close to it.
          </p>

          <h2 style={h2}>3. Invoice and payment reminders</h2>
          <p>
            If you&apos;re sending invoices and chasing payments by hand, Stripe plus an invoicing tool can send the invoices and reminders for you. The customer gets the invoice, gets reminded at 7, 14 and 30 days, and pays by card link.
          </p>
          <p>
            I use Stripe and a custom workflow for Purcell Ventures invoices. Setup took 90 minutes.
          </p>

          <h2 style={h2}>4. Lead forms that notify you</h2>
          <p>
            Your contact form sits there collecting submissions in a database you never check. By the time you reply, the lead has bought from someone else. You can fix this in twenty minutes with Zapier or n8n: a form submission sends you a Slack message or text, and you call back within an hour.
          </p>

          <h2 style={h2}>5. Social media posting: the schedule</h2>
          <p>
            Most owners write posts but skip scheduling them. They write four posts in a burst, then disappear from social for three weeks because they don&apos;t want to log in and post manually.
          </p>
          <p>
            Schedule a month&apos;s posts in one sitting using Buffer, Later, or Meta&apos;s built-in scheduler. AI can draft the captions in minutes (our <Link href="/digital/tools/caption-generator" style={{ color: "var(--color-warm-accent)" }}>Caption Generator</Link> generates five captions per post). You write the prompts and schedule a month of posts in one sitting.
          </p>

          <h2 style={h2}>The pattern</h2>
          <p>
            Each workflow takes a task you already do by hand and puts it on a schedule so you don&apos;t have to remember it.
          </p>

          <p>
            If any of these feel impossible at your current setup, you may be using tools that do not connect to each other. <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>Book a consulting session</Link> if you want to work out which tools you need.
          </p>
        


          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-a-website-actually-costs" style={{ color: "var(--color-warm-accent)" }}>What a small business website costs, and when not to buy one</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/claim-your-google-listing" style={{ color: "var(--color-warm-accent)" }}>Claiming the Google listing, which usually matters more</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "five-workflows-no-code",
            title: "Five workflows you can automate this week without writing code, by Elijah Purcell",
            description: "These five workflows take small business owners the most time. You can automate each one with off-the-shelf tools in under two hours.",
            published: "2026-05-24",
          }} />

        </article>

        <footer style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
          I drafted this post with <Link href="/digital/tools/content-generator" style={{ color: "var(--color-warm-accent)" }}>AI tools</Link> and edited it before publishing.
        </footer>

      </main>
    </div>
  );
}

const h2: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "var(--color-warm-accent)", marginTop: "36px", marginBottom: "16px", lineHeight: 1.3 };
