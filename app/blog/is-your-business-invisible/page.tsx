import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { CONTACT } from "@/lib/contact";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import PostHowTo from "@/app/components/PostHowTo";

export const metadata = {
  alternates: { canonical: "/blog/is-your-business-invisible" },
  title: { absolute: "Is your business invisible online? A ten-minute self-check" },
  description:
    "Seven checks a small business owner can run on their own business in ten minutes, with no tools and no account, to find out what a customer with a phone sees, based on an audit of 121 businesses near the University of Alabama.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Is your business invisible online? A ten-minute self-check", href: "/blog/is-your-business-invisible" },
      ]} />}
      kicker="Guide"
      title="Is your business invisible online?"
      meta="20 August 2026, 7 minute read"
    >
      <p>
        These seven checks take ten minutes and need no tools or account. They show you
        what somebody standing on the sidewalk with a phone sees when they look for you.
      </p>

      <p>
        I put the checks together after auditing every independent business within 2500
        metres of the Quad in Tuscaloosa. Of the 121 I found, 27 had a website that
        answered, and 23 had opening hours recorded anywhere a machine could read them.{" "}
        <Link href="/blog/121-businesses-near-campus">The audit has the full numbers</Link>.
      </p>

      <p>
        You can do all of this without buying anything, from me or anyone else. Most of
        the fixes are free and take an afternoon.
      </p>

      <h2>Starting with a phone that is not yours</h2>

      <p>
        Borrow one, or open a private window and sign out of everything. Your own phone
        has visited your website and remembers your searches, so it shows you results a
        new customer will not see. Every check below depends on starting clean.
      </p>

      <h2>The seven checks</h2>

      <h3>1. Your business name plus your town</h3>
      <p>
        Add the town to the name: "Joe's Barbers Tuscaloosa." Look at the first result. If it is a
        directory site you have never logged into, a Facebook page you stopped updating,
        or a competitor, you have your answer, and fixing that comes before the other
        checks.
      </p>
      <Note>
        <strong>What good looks like:</strong> a box on the right with your name, hours,
        phone and a map. That box is a Google Business Profile, and it is free.
      </Note>

      <h3>2. What you sell, plus your town</h3>
      <p>
        Search something like "Barber Tuscaloosa" or "Ramen near me" and check whether
        you appear in the first ten results or in the map section at the top. A new
        customer runs this search because they do not know your name yet.
      </p>

      <h3>3. Your hours, everywhere they appear</h3>
      <p>
        Check Google, Facebook and whatever directory came up in check one. If the hours
        are wrong, somebody drives over and finds the business closed. Include holiday hours
        and the days you close early.
      </p>
      <Note>
        <strong>The figure that surprised me:</strong> of 121 businesses near campus,
        twenty-three had hours a machine could read. For the rest, "are they open right
        now" is only answerable by standing in front of the door.
      </Note>

      <h3>4. Your own phone number</h3>
      <p>
        On the phone that is not yours, find your number online and tap it. Check that
        it dials and reaches the number you answer, and not a landline in the back that
        rings out.
      </p>
      <p>
        While you are there, look for a way to reach you other than a phone call. Some
        customers prefer to text or fill in a form, so offer one.
      </p>

      <h3>5. Your own website on the phone</h3>
      <p>
        Time how long it takes to load. Try to read it without pinching to zoom. Then
        look for the hours, the address and the phone number, and note whether you had
        to scroll past a picture of a building to get to them.
      </p>
      <p>
        If your site was built more than six years ago, it was probably designed
        for a desktop and adapted for a phone afterwards. If your site has analytics,
        check what share of visitors come from phones.
      </p>

      <h3>6. Your reviews, and the last one you replied to</h3>
      <p>
        Recent reviews with replies matter more than a five-star average. If the newest
        review is three years old, it looks as if nothing has happened since. Readers
        take a complaint with no response as true.
      </p>
      <p>
        Do not pay for reviews, offer discounts for them or write them yourself. Google
        and the other platforms ban this and can remove the listing.
      </p>

      <h3>7. Your own name in quotes</h3>
      <p>
        If you are the business, people also search the owner&apos;s name. Put your name
        in quotation marks and see who else has it. You may be competing with somebody
        who shares your name, and if so, everything you publish should say your town and
        your trade so a search engine can tell you apart.
      </p>

      <h2>What to fix first</h2>

      <p>In this order:</p>

      <ol>
        <li>
          <strong>Claim your Google Business Profile and put the hours in it.</strong>{" "}
          It is free and takes twenty minutes at{" "}
          <a href="https://business.google.com">business.google.com</a>.
        </li>
        <li>
          <strong>Fix the phone number and add one non-phone way to reach you.</strong>
        </li>
        <li>
          <strong>Ask five recent happy customers for a review.</strong> Ask without
          offering anything in return.
        </li>
        <li>
          <strong>Then work on the website.</strong>
        </li>
      </ol>

      <h2>When you do not need a website</h2>

      <p>
        I build websites, so read this with that in mind.
      </p>

      <p>
        A website may add little if you already have a queue out the door, are booked
        three weeks ahead, or serve the same forty customers you have had for a decade.
        In that case, fix the listing and the hours and leave it there.
      </p>

      <p>
        A site pays off when people need to see the work before they call, when you need
        bookings without a phone call, when you are competing with a chain that outranks
        you, or when you need a page you control. If none of those apply, skip it for now.
      </p>

      <h2>If you are near campus</h2>

      <p>
        I am writing about independent businesses around the University of Alabama, one
        at a time. Each post covers who runs the business, how long it has been there, what it does well and what
        a student trying to find it runs into. The series is{" "}
        <Link href="/blog/tuscaloosa-small-business-online">the Storefront Project</Link>,
        and being featured is free.
      </p>

      <p>
        I can visit your place for twenty minutes. Call{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> or write to{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

<PostHowTo
            name="Check whether your business is findable online"
            description="Seven checks a small business owner can run on their own business in ten minutes, with no tools and no account."
            totalTime="PT10M"
            supply={["A phone that is not yours, or a private browser window signed out of everything"]}
            steps={[
            { name: "Use a phone that is not yours", text: "Your own phone has visited your website and knows your business. It shows results a new customer will not see, and every check after this one depends on starting clean." },
            { name: "Search your business name plus your town", text: "If the first result is a directory you never logged into, an abandoned social page, or a competitor, you have your answer, and fixing that comes first." },
            { name: "Search what you sell plus your town", text: "A customer who does not know your name runs this search." },
            { name: "Check your hours everywhere", text: "Check Google, your social pages and any directory that appeared in the first check. Include holiday hours and early closures." },
            { name: "Tap your own phone number", text: "Find your number online and tap it. Check that it dials and reaches the number you answer. Then look for a way to reach you other than a phone call." },
            { name: "Open your own website on the phone", text: "Check how long it takes to load, whether you can read it without zooming, and whether you can find hours, address and phone without scrolling past a photograph." },
            { name: "Look at your reviews and your replies", text: "Recent reviews with replies matter more than a five-star average, and readers take a complaint with no reply as true. Never pay for a review and never write one yourself." },
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


    </PostLayout>
  );
}
