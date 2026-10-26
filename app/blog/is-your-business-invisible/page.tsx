import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import PostHowTo from "@/app/components/PostHowTo";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/is-your-business-invisible" },
  title: { absolute: "Is your business invisible online? A ten-minute self-check, by Elijah Purcell" },
  description:
    "Seven checks a small business owner can run on their own business in ten minutes, with no tools and no account, to find out what a customer with a phone sees. Built from an audit of 121 businesses near the University of Alabama.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
const H3 = { fontSize: "17px", fontWeight: 700, margin: "28px 0 6px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const box: React.CSSProperties = {
  background: "rgba(0,0,0,0.22)", borderTop: "2px solid rgba(212,175,55,0.4)",
  padding: "16px 18px", margin: "14px 0 8px", fontSize: "15px",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Is your business invisible online? A ten-minute self-check", href: "/blog/is-your-business-invisible" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide, August 20, 2026, The Tuscaloosa Storefront Project</div>
          <h1>
            Is your business{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>invisible</em> online?
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            These seven checks take about ten minutes and need no tools or account. At the
            end you will know what somebody standing on the sidewalk with a phone sees when
            they look for you.
          </p>

          <p>
            I built this after auditing every independent business within 2500 metres of the
            Quad in Tuscaloosa. There were 121. Twenty-seven had a website that answered.
            Twenty-three had opening hours recorded anywhere a machine could read them.{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>The numbers are here</Link>.
          </p>

          <p>
            You can do all of this without buying anything, from me or anyone else. Most of
            the fixes are free and take an afternoon.
          </p>

          <h2 style={H2}>Do this first: use a phone that is not yours</h2>

          <p>
            Borrow one, or open a private window and sign out of everything. Your own phone
            has visited your website and remembers your searches, so it shows you results a
            new customer will not see. Every check below depends on starting clean.
          </p>

          <h2 style={H2}>The seven checks</h2>

          <h3 style={H3}>1. Search your business name plus your town</h3>
          <p>
            Add the town to the name: "Joe's Barbers Tuscaloosa." Look at the first result. If it is a
            directory site you have never logged into, a Facebook page you stopped updating,
            or a competitor, that is the answer to the whole question and you can stop
            reading and go fix it.
          </p>
          <div style={box}>
            <strong>What good looks like:</strong> a box on the right with your name, hours,
            phone and a map. That box is a Google Business Profile. It is free.
          </div>

          <h3 style={H3}>2. Search what you sell, plus your town</h3>
          <p>
            "Barber Tuscaloosa." "Ramen near me." Do you appear in the first ten results, or
            in the map section at the top? A new customer runs this search because they do
            not know your name yet.
          </p>

          <h3 style={H3}>3. Are your hours right, everywhere?</h3>
          <p>
            Check Google, Facebook and whatever directory came up in check one. If the hours
            are wrong, somebody drives over and finds a locked door. Include holiday hours
            and the days you close early.
          </p>
          <div style={box}>
            <strong>The figure that surprised me:</strong> of 121 businesses near campus,
            twenty-three had hours a machine could read. For the rest, "are they open right
            now" is only answerable by standing in front of the door.
          </div>

          <h3 style={H3}>4. Tap your own phone number</h3>
          <p>
            On the phone that is not yours, find your number online and tap it. Check that
            it dials and reaches the number you answer, and not a landline in the back that
            rings out.
          </p>
          <p>
            While you are there, look for a way to reach you other than a phone call. Some
            customers prefer to text or fill in a form, so offer one.
          </p>

          <h3 style={H3}>5. Open your own website on the phone</h3>
          <p>
            Time how long it takes to load. Try to read it without pinching to zoom. Then
            look for the hours, the address and the phone number, and note whether you had
            to scroll past a picture of a building to get to them.
          </p>
          <p>
            If your site was built more than about six years ago, it was probably designed
            for a desktop and adapted for a phone afterwards. If your site has analytics,
            check what share of visitors come from phones.
          </p>

          <h3 style={H3}>6. Look at your reviews, and at the last one you replied to</h3>
          <p>
            Recent reviews with replies matter more than a five-star average. If the newest
            review is three years old, it looks as if nothing has happened since. A complaint
            with no response reads as agreement.
          </p>
          <p>
            Do not pay for reviews, offer discounts for them or write them yourself. Google
            and the other platforms ban this and can remove the listing.
          </p>

          <h3 style={H3}>7. Search your own name in quotes</h3>
          <p>
            If you are the business, people also search the owner&apos;s name. Put your name
            in quotation marks and see who else has it. You may be competing with somebody
            who shares your name, and if so, everything you publish should say your town and
            your trade so a search engine can tell you apart.
          </p>

          <h2 style={H2}>What to fix first</h2>

          <p>In this order:</p>

          <ol style={{ paddingLeft: "1.15rem" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Claim your Google Business Profile and put the hours in it.</strong>{" "}
              Free, about twenty minutes at{" "}
              <a href="https://business.google.com" style={link}>business.google.com</a>.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Fix the phone number and add one non-phone way to reach you.</strong>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Ask five recent happy customers for a review.</strong> Ask without
              offering anything in return.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Then work on the website.</strong>
            </li>
          </ol>

          <h2 style={H2}>When you do not need a website</h2>

          <p>
            I build websites, so read this with that in mind.
          </p>

          <p>
            If you have a queue out the door, if you are booked three weeks ahead, if your
            customers are the same forty people they have been for a decade, a website may
            add little. Fix the listing and the hours and go back to work.
          </p>

          <p>
            A site pays off when people need to see the work before they call, when you need
            bookings without a phone call, when you are competing with a chain that outranks
            you, or when you need a page you control. If none of those apply, skip it for now.
          </p>

          <h2 style={H2}>If you are near campus</h2>

          <p>
            I am writing about independent businesses around the University of Alabama, one
            at a time. Who runs it, how long it has been there, what it does well, and what
            a student trying to find it runs into. That is{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>the Storefront Project</Link>,
            and being featured is free.
          </p>

          <p>
            Twenty minutes at your place:{" "}
            <a href="tel:+12054627839" style={link}>(205) 462-7839</a> or{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
          </p>

          <PostHowTo
            name="Check whether your business is findable online"
            description="Seven checks a small business owner can run on their own business in about ten minutes, with no tools and no account."
            totalTime="PT10M"
            supply={["A phone that is not yours, or a private browser window signed out of everything"]}
            steps={[
            { name: "Use a phone that is not yours", text: "Your own phone has visited your website and knows your business. It shows results a new customer will not see, and every check after this one depends on starting clean." },
            { name: "Search your business name plus your town", text: "If the first result is a directory you never logged into, an abandoned social page, or a competitor, that is the answer to the whole question." },
            { name: "Search what you sell plus your town", text: "A customer who does not know your name runs this search." },
            { name: "Check your hours everywhere", text: "Google, social pages, and any directory that appeared in the first check. Include holiday hours and early closures." },
            { name: "Tap your own phone number", text: "Find your number online and tap it. Check that it dials and reaches the number you answer. Then look for a way to reach you other than a phone call." },
            { name: "Open your own website on the phone", text: "Check how long it takes to load, whether you can read it without zooming, and whether you can find hours, address and phone without scrolling past a photograph." },
            { name: "Look at your reviews and your replies", text: "Recency matters as much as rating. A complaint with no reply reads as agreement. Never pay for a review and never write one yourself." },
            { name: "Search your own name in quotes", text: "If you are the business, people also search the owner's name. See who else shares your name, and if somebody does, make sure everything you publish names your town and your trade." },
          ]}
          />

          <PostFaq qa={[
            ["Why is my business not showing up on Google Maps?",
             "The most common reason is that nobody has claimed the Google Business Profile. Google may have created a listing without you, in which case you claim it instead of creating a new one. Creating a second listing for a business that already has one produces a duplicate, and Google can hide duplicates."],
          ]} />

          <PostByline post={{
            slug: "is-your-business-invisible",
            title: "Is your business invisible online? A ten-minute self-check",
            description: "Seven checks a small business owner can run on their own business in ten minutes, with no tools and no account.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
