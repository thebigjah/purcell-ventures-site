import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/is-your-business-invisible" },
  title: "Is your business invisible online? A ten-minute self-check | Elijah Purcell",
  description:
    "Seven checks a small business owner can run on their own business in ten minutes, with no tools and no account, to find out what a customer with a phone actually sees. Built from an audit of 121 businesses near the University of Alabama.",
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

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide · August 20, 2026 · The Tuscaloosa Storefront Project</div>
          <h1>
            Is your business{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>invisible</em> online?
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Seven checks. Ten minutes. No tools, no account, nothing to install. At the end
            you will know what somebody standing on the sidewalk with a phone actually sees
            when they look for you.
          </p>

          <p>
            I built this after auditing every independent business within 2500 metres of the
            Quad in Tuscaloosa. There were 121. Twenty-seven had a website that answered.
            Twenty-three had opening hours recorded anywhere a machine could read them.{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>The numbers are here</Link>.
          </p>

          <p>
            None of what follows requires buying anything, including from me. Most of the
            fixes are free and take an afternoon.
          </p>

          <h2 style={H2}>Do this first: use a phone that is not yours</h2>

          <p>
            Borrow one, or open a private window and sign out of everything. Your own phone
            has been to your website. It knows your business. It will show you a version of
            reality that no new customer will ever see, and if you skip this step every
            check below will lie to you.
          </p>

          <h2 style={H2}>The seven checks</h2>

          <h3 style={H3}>1. Search your business name plus your town</h3>
          <p>
            Not just the name. "Joe's Barbers Tuscaloosa." What comes back first? If it is a
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
            in the map section at the top? This is the search a new customer actually runs,
            because they do not know your name yet. Almost every business owner checks
            number one and never checks number two.
          </p>

          <h3 style={H3}>3. Are your hours right, everywhere?</h3>
          <p>
            Check Google, check Facebook, check whatever directory came up in check one.
            Wrong hours are worse than no hours: somebody drives over and finds a locked
            door, and that is the last time they try. Holiday hours count. So does the day
            you close early.
          </p>
          <div style={box}>
            <strong>The figure that surprised me:</strong> of 121 businesses near campus,
            twenty-three had hours a machine could read. For the rest, "are they open right
            now" is only answerable by standing in front of the door.
          </div>

          <h3 style={H3}>4. Tap your own phone number</h3>
          <p>
            On the phone that is not yours, find your number online and tap it. Does it
            dial? Does it reach you? Is it the number you actually answer, or the landline
            in the back that rings out?
          </p>
          <p>
            While you are there: does anything online give someone a way to reach you that
            is not a phone call? A lot of people under thirty will not call a stranger. If
            the only path is a phone call, you are choosing not to hear from them.
          </p>

          <h3 style={H3}>5. Open your own website on the phone</h3>
          <p>
            Three questions, in order. Does it load in under about three seconds. Can you
            read it without pinching to zoom. Can you find the hours, the address and the
            phone number without scrolling past a picture of a building.
          </p>
          <p>
            If your site was built more than about six years ago, it was probably designed
            for a desktop and adapted for a phone afterwards. Most of your visitors are on
            the phone.
          </p>

          <h3 style={H3}>6. Look at your reviews, and at the last one you replied to</h3>
          <p>
            You do not need five stars. You need recent ones and you need replies. A
            three-year-old review is a signal that nothing has happened since. A complaint
            with no response reads as agreement.
          </p>
          <p>
            Never pay for a review, never offer a discount for one, and never write one
            yourself. Every platform can detect it and the penalty is losing the listing,
            which is worse than having no reviews at all.
          </p>

          <h3 style={H3}>7. Search your own name in quotes</h3>
          <p>
            If you are the business, people search you and not just the shop. Put your name
            in quotation marks and see who else has it. You may be competing with somebody
            who shares your name, and if so, everything you publish should say your town and
            your trade so a search engine can tell you apart.
          </p>

          <h2 style={H2}>What to fix first</h2>

          <p>In this order, because this is the order that pays.</p>

          <ol style={{ paddingLeft: "1.15rem" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Claim your Google Business Profile and put the hours in it.</strong>{" "}
              Free, about twenty minutes at{" "}
              <a href="https://business.google.com" style={link}>business.google.com</a>. For
              most local businesses this single step is worth more than a website, and it is
              the one almost nobody has done.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Fix the phone number and add one non-phone way to reach you.</strong>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Ask five recent happy customers for a review.</strong> Just ask. No
              incentive.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Then, and only then, worry about the website.</strong>
            </li>
          </ol>

          <h2 style={H2}>When you do not need a website</h2>

          <p>
            I build websites, so read this with that in mind.
          </p>

          <p>
            If you have a queue out the door, if you are booked three weeks ahead, if your
            customers are the same forty people they have been for a decade, a website will
            not change your business. Fix the listing, fix the hours, and go back to work.
          </p>

          <p>
            A site earns its keep when people need to see the work before they call, when
            you need bookings without a phone call, when you are competing with a chain that
            outranks you, or when you need somewhere for people to land that you actually
            control. If none of those are true for you, you have my honest answer.
          </p>

          <h2 style={H2}>If you are near campus</h2>

          <p>
            I am writing about independent businesses around the University of Alabama, one
            at a time. Who runs it, how long it has been there, what it does well, and what
            a student trying to find it runs into. That is{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>the Storefront Project</Link>,
            and being featured costs nothing and does not require buying anything.
          </p>

          <p>
            Twenty minutes at your place:{" "}
            <a href="tel:+12054627839" style={link}>(205) 462-7839</a> or{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
          </p>

          <PostFaq qa={[
            ["How do I check if my business shows up on Google?",
             "Borrow a phone that is not yours, or open a private window signed out of everything, and search your business name plus your town. Your own phone has visited your website and will show you results no new customer sees. Then search what you sell plus your town, because that is the search somebody who does not know your name actually runs."],
            ["Why is my business not showing up on Google Maps?",
             "The most common reason is that the Google Business Profile has never been claimed. Google may have generated a listing without you, in which case you claim it rather than create a new one. Creating a second listing for a business that already has one produces a duplicate, and duplicates get suppressed."],
            ["Does my small business actually need a website?",
             "Not always. If you have a queue out the door, are booked weeks ahead, and your customers are the same people they have been for years, a website will not change your business. A site earns its keep when people need to see the work before calling, when you want bookings without a phone call, when a chain outranks you, or when you need somewhere you control. Fix the Google listing and the hours first either way."],
            ["What should a small business fix first online?",
             "In order: claim the Google Business Profile and put accurate hours in it, fix the phone number and add one way to reach you that is not a phone call, ask five recent happy customers for a review, and only then think about the website. The listing is free and takes about twenty minutes and for most local businesses it outperforms a new site."],
            ["Are wrong opening hours online really a problem?",
             "Wrong hours are worse than no hours. Somebody drives over, finds a locked door, and does not try again. Holiday hours and early closures count. In an audit of 121 independent businesses near the University of Alabama, only 23 had opening hours recorded anywhere a machine could read them."],
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
