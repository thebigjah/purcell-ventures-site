import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import PostHowTo from "@/app/components/PostHowTo";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/claim-your-google-listing" },
  title: "Claim your Google listing yourself, in about twenty minutes | Elijah Purcell",
  description:
    "A step-by-step guide to claiming and filling out a Google Business Profile, written so you do not need to hire anybody. Including what to put in every field, how to hide a home address, and the three things that get a listing suspended.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
const H3 = { fontSize: "17px", fontWeight: 700, margin: "26px 0 6px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const warn: React.CSSProperties = {
  background: "rgba(0,0,0,0.24)", borderTop: "2px solid rgba(193,85,58,0.7)",
  padding: "16px 18px", margin: "18px 0", fontSize: "15px",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Claim your Google listing yourself, in about twenty minutes", href: "/blog/claim-your-google-listing" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide · August 20, 2026 · 8 min read</div>
          <h1>
            Claim your Google listing{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>yourself</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Most guides to this are written by agencies who would like to manage it for you.
            This one is written so you do not need anybody, including me. It takes about
            twenty minutes and it is free.
          </p>

          <p>
            For a lot of small local businesses this single thing is worth more than a
            website. I audited 121 independent businesses near the University of Alabama and
            twenty-three had opening hours recorded anywhere a machine could read them.{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>The rest are invisible
            to the question "are they open right now"</Link>.
          </p>

          <h2 style={H2}>What it is</h2>

          <p>
            A Google Business Profile is the panel that appears beside search results with
            your name, hours, phone, photos, reviews and a map. It is also what puts you in
            the map section at the top of a "near me" search.
          </p>

          <p>
            Your business may already have one that Google generated without you. That is
            why the first step is claiming rather than creating.
          </p>

          <h2 style={H2}>Step by step</h2>

          <h3 style={H3}>1. Search your business name first</h3>
          <p>
            If a panel appears, look for "Own this business?" or "Claim this business."
            Start there. Creating a second profile for a business that already has one is
            the most common way people end up with a duplicate, and duplicates get
            suppressed.
          </p>

          <h3 style={H3}>2. Go to business.google.com</h3>
          <p>
            Use an email address you will still control in five years. Not an employee's
            personal account, not an address at a domain you might drop. This login is the
            key to the listing and getting it back after losing it is genuinely painful.
          </p>

          <h3 style={H3}>3. Category is the field that matters most</h3>
          <p>
            Your primary category does more to determine which searches you appear in than
            anything else on the form. Be specific. "Barber shop" beats "hair salon" if you
            are a barber. You can add secondary categories afterwards, and you should, but
            the primary one is the load-bearing choice.
          </p>

          <h3 style={H3}>4. Address, and how to hide it</h3>
          <p>
            If customers come to you, enter the address and show it.
          </p>
          <p>
            If you work from home or go to the customer, choose the option that says you
            deliver goods and services to customers, set a service area, and <strong>hide the
            address</strong>. Google supports this explicitly. Otherwise your home address is
            on a public map, which is a decision you should make deliberately rather than by
            filling in a form.
          </p>

          <h3 style={H3}>5. Hours, including the ones you forget</h3>
          <p>
            Regular hours, then special hours for holidays. Wrong hours are worse than no
            hours: somebody drives over, finds a locked door, and does not come back. Put a
            reminder in your calendar for the week before every holiday.
          </p>

          <h3 style={H3}>6. Verification</h3>
          <p>
            Google will verify by postcard, phone, email or video depending on your business
            type. Video is increasingly common and it means recording a short walkthrough
            showing your signage, your equipment and your address. Have those visible before
            you start recording.
          </p>
          <p>
            A postcard takes about two weeks. Do not create a second listing while you wait.
          </p>

          <h3 style={H3}>7. Photos, more than you think</h3>
          <p>
            The exterior including your sign, so people recognise the building. The interior.
            The work itself. Ten real photos taken on a phone beat two professional ones,
            because the panel rotates them and freshness counts.
          </p>

          <h3 style={H3}>8. The description</h3>
          <p>
            Say what you do, where, and for whom, in plain sentences. No keyword stuffing:
            Google does not rank on it and a human reading a keyword-stuffed paragraph
            concludes something about you that you do not want them concluding.
          </p>

          <h2 style={H2}>Then the part that actually moves it: reviews</h2>

          <p>
            A listing with no reviews is a weak signal. A listing with recent ones is a
            strong one, and recency matters as much as the rating.
          </p>

          <p>Ask. Out loud, at the moment somebody says the work was good. That is it.</p>

          <div style={warn}>
            <strong>Three things that get a listing suspended.</strong> Paying for reviews or
            offering a discount for one. Writing them yourself or having staff and family do
            it. Keyword-stuffing the business name field, so "Joe's Barbers" becomes "Joe's
            Barbers Best Haircut Tuscaloosa." Every one of these is detectable and the
            penalty is losing the listing, which is worse than never having claimed it.
          </div>

          <p>
            Reply to reviews. All of them, briefly. A complaint with no reply reads as
            agreement, and a reply that is not defensive reads better than the complaint
            does.
          </p>

          <h2 style={H2}>Once a month, five minutes</h2>

          <ul style={{ paddingLeft: "1.1rem" }}>
            <li style={{ marginBottom: "8px" }}>Are the hours still right, including next month's holiday?</li>
            <li style={{ marginBottom: "8px" }}>Any reviews to reply to?</li>
            <li style={{ marginBottom: "8px" }}>Add one photo.</li>
            <li style={{ marginBottom: "8px" }}>Check the "suggested edits" section. Anybody can suggest a change to your listing, including a competitor, and Google sometimes applies them.</li>
          </ul>

          <p>
            That last one surprises people. Your listing is not entirely yours. Checking it
            occasionally is how you find out someone marked you permanently closed.
          </p>

          <h2 style={H2}>When to get help</h2>

          <p>
            Honestly: mostly you do not. This is a form and a verification and a habit.
          </p>

          <p>
            The cases where a second pair of hands earns its keep are a duplicate listing you
            cannot merge, a suspension you do not understand, or multiple locations. If you
            are near the University of Alabama and stuck on one of those, ask me and I will
            tell you what I would do:{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
            That is not a sales call, it is an answer.
          </p>

          <p>
            The rest of the self-check is{" "}
            <Link href="/blog/is-your-business-invisible" style={link}>here</Link>.
          </p>

          <PostHowTo
            name="Claim and set up a Google Business Profile"
            description="How a small business owner claims a Google Business Profile and fills it out properly, without hiring anybody."
            totalTime="PT20M"
            supply={["A business name", "A phone number you answer", "An email address you will still control in five years"]}
            steps={[
            { name: "Search your business name first", text: "If a panel already appears beside the search results, look for the option to claim the business and start there. Creating a second profile for a business that already has one produces a duplicate, and duplicates get suppressed." },
            { name: "Go to business.google.com", text: "Use an email address you will still control in five years. Not an employee's personal account and not an address at a domain you might drop, because that login is the key to the listing." },
            { name: "Choose the primary category carefully", text: "The primary category does more to determine which searches you appear in than any other field. Be specific, then add secondary categories afterwards." },
            { name: "Set the address, or hide it", text: "If customers come to you, show the address. If you work from home or travel to customers, choose the service-area option and hide the address so it does not appear on a public map." },
            { name: "Enter regular and holiday hours", text: "Wrong hours are worse than no hours. Add special hours for holidays and set a calendar reminder for the week before each one." },
            { name: "Complete verification", text: "Google verifies by postcard, phone, email or video depending on the business. Postcard takes about two weeks. Do not create a second listing while waiting." },
            { name: "Add ten real photos", text: "Exterior including the sign, interior, and the work itself. Ten phone photos beat two professional ones because the panel rotates them and freshness counts." },
            { name: "Write a plain description", text: "Say what you do, where, and for whom. No keyword stuffing: it does not affect ranking and it tells a human reader something you do not want them concluding." },
          ]}
          />

          <PostFaq qa={[
            ["How do I claim my Google Business Profile?",
             "Search your business name first. If a panel appears, look for the option to claim or own the business and start there. Otherwise go to business.google.com. Use an email address you will still control in five years, because that login is the key to the listing and recovering it later is genuinely painful."],
            ["How long does Google Business Profile verification take?",
             "It depends on the method. Postcard verification takes roughly two weeks. Phone, email and video verification are faster. Video means recording a short walkthrough showing your signage, your equipment and your address, so have those visible before you start. Do not create a second listing while you are waiting for a postcard."],
            ["Can I hide my home address on a Google Business Profile?",
             "Yes, and you should if you work from home. Choose the option saying you deliver goods and services to your customers, set a service area, and hide the address. Google supports this explicitly. Otherwise your home address appears on a public map attached to your business name."],
            ["What gets a Google Business Profile suspended?",
             "Three things account for most suspensions: paying for reviews or offering a discount in exchange for one, writing reviews yourself or having staff and family write them, and keyword stuffing the business name field with extra search terms. All three are detectable and the penalty is losing the listing."],
            ["Which Google Business Profile category should I choose?",
             "The primary category does more to determine which searches you appear in than any other field on the form, so be specific. Barber shop beats hair salon if you are a barber. Add secondary categories afterwards, but treat the primary one as the load-bearing choice."],
          ]} />

          <PostByline post={{
            slug: "claim-your-google-listing",
            title: "Claim your Google listing yourself, in about twenty minutes",
            description: "A step-by-step guide to claiming and filling out a Google Business Profile, written so you do not need to hire anybody.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
