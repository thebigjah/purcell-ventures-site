import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import PostHowTo from "@/app/components/PostHowTo";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/claim-your-google-listing" },
  title: { absolute: "Claiming your own Google listing: a twenty-minute job" },
  description:
    "A step-by-step guide to claiming and filling out a Google Business Profile, written so you do not need to hire anybody. It covers what to put in every field, how to hide a home address, and the three things that get a listing suspended.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Claiming your own Google listing: a twenty-minute job", href: "/blog/claim-your-google-listing" },
      ]} />}
      kicker="Guide"
      title="Claiming your own Google listing"
      meta="20 August 2026, 8 minute read"
    >

          <p>
            Agencies write most guides to this, and they want to manage the listing for
            you. You can do it yourself in twenty minutes, and it is free.
          </p>

          <p>
            I audited 121 independent businesses near the University of Alabama. Of those, 27 had a website
            that answered and 23 had opening hours recorded anywhere a machine could read
            them.{" "}
            <Link href="/blog/121-businesses-near-campus">The other 98 had no
            hours a machine could read</Link>, and for many of them a claimed listing with
            hours would do more than a website.
          </p>

          <h2>What a Google Business Profile is</h2>

          <p>
            A Google Business Profile is the panel that appears beside search results with
            your name, hours, phone, photos, reviews and a map. It is also what puts you in
            the map section at the top of a "near me" search.
          </p>

          <p>
            Your business may already have one that Google generated without you, so check
            for it and claim it before you create a new one.
          </p>

          <h2>Step by step</h2>

          <h3>1. Checking for an existing listing</h3>
          <p>
            Search your business name on Google first. If a panel appears, look for "Own
            this business?" or "Claim this business" and start there. Creating a second profile for a business that already has one is
            the most common way people end up with a duplicate, and Google may suppress
            duplicates.
          </p>

          <h3>2. The login at business.google.com</h3>
          <p>
            Use an email address you will still control in five years. Avoid an employee's
            personal account or an address at a domain you may drop. This login controls
            the listing, and getting it back after losing it is slow and hard.
          </p>

          <h3>3. Primary category</h3>
          <p>
            Your primary category does more to determine which searches you appear in than
            anything else on the form, so be specific. If you are a barber, choose "Barber
            shop" over "hair salon." Add secondary categories afterwards as well.
          </p>

          <h3>4. Address and service area</h3>
          <p>
            If customers come to you, enter the address and show it.
          </p>
          <p>
            If you work from home or go to the customer, choose the option that says you
            deliver goods and services to customers, set a service area, and <strong>hide the
            address</strong>, which Google supports. If you skip this, your home address
            goes on a public map.
          </p>

          <h3>5. Regular and holiday hours</h3>
          <p>
            Enter regular hours, then special hours for holidays. Wrong hours send customers
            to a closed business. Put a reminder in your calendar for the week before every
            holiday.
          </p>

          <h3>6. Verification</h3>
          <p>
            Google will verify by postcard, phone, email or video depending on your business
            type, and{" "}
            <a href="https://support.google.com/business/answer/7107242" rel="noopener">Google decides which method you get</a>. Video verification means recording a short walkthrough
            showing your signage, your equipment and your address. Have those visible before
            you start recording.
          </p>
          <p>
            A postcard takes up to two weeks. Do not create a second listing while you wait.
          </p>

          <h3>7. Photos</h3>
          <p>
            Add the exterior including your sign, so people recognise the building, then the
            interior and the work itself. Phone photos are fine.
          </p>

          <h3>8. The description</h3>
          <p>
            Say what you do, where, and for whom, in plain sentences. Skip keyword stuffing,
            because Google does not rank on it, and readers who see a keyword-stuffed
            paragraph judge the business by it.
          </p>

          <h2>Reviews</h2>

          <p>
            A listing with recent reviews gives a searcher more to go on than one with none.
          </p>

          <p>When a customer tells you the work was good, ask them to leave a review.</p>

          <Note tone="warn">
            <strong>Three things get a listing suspended:</strong> paying for reviews or
            offering a discount for one, writing reviews yourself or having staff and family
            write them, and keyword-stuffing the business name field, so "Joe's Barbers"
            becomes "Joe's Barbers Best Haircut Tuscaloosa."
          </Note>

          <p>
            Reply to every review in a sentence or two. Readers take an unanswered complaint
            as true, and a calm reply gives them your side.
          </p>

          <h2>A five-minute monthly check</h2>

          <ul>
            <li>Check that the hours are still right, including next month&apos;s holiday.</li>
            <li>Reply to any new reviews.</li>
            <li>Add one photo.</li>
            <li>Check the "suggested edits" section. Anybody can suggest a change to your listing, including a competitor, and Google sometimes applies them.</li>
          </ul>

          <p>
            The monthly check is also how you would find out that someone marked you
            permanently closed.
          </p>

          <h2>When to get help</h2>

          <p>
            Most owners can do all of this without help. Help is worth paying for when you
            have a duplicate listing you
            cannot merge, a suspension you do not understand, or several locations. If you
            are near the University of Alabama and stuck on one of those, ask me and I will
            tell you what I would do:{" "}
            <a href="mailto:elijah@purcell-ventures.com">elijah@purcell-ventures.com</a>.
          </p>

          <p>
            The rest of the self-check is in{" "}
            <Link href="/blog/is-your-business-invisible">Is your business invisible?</Link>.
          </p>

          <PostHowTo
            name="Claim and set up a Google Business Profile"
            description="How a small business owner claims a Google Business Profile and fills it out properly, without hiring anybody."
            totalTime="PT20M"
            supply={["A business name", "A phone number you answer", "An email address you will still control in five years"]}
            steps={[
            { name: "Search your business name first", text: "If a panel already appears beside the search results, look for the option to claim the business and start there. Creating a second profile for a business that already has one produces a duplicate, and Google may suppress duplicates." },
            { name: "Go to business.google.com", text: "Use an email address you will still control in five years. Avoid an employee's personal account or a domain you may drop, because that login is the key to the listing." },
            { name: "Choose the primary category carefully", text: "The primary category does more to determine which searches you appear in than any other field. Be specific, then add secondary categories afterwards." },
            { name: "Set the address, or hide it", text: "If customers come to you, show the address. If you work from home or travel to customers, choose the service-area option and hide the address so it does not appear on a public map." },
            { name: "Enter regular and holiday hours", text: "Add special hours for holidays and set a calendar reminder for the week before each one." },
            { name: "Complete verification", text: "Google verifies by postcard, phone, email or video depending on the business. A postcard takes up to two weeks. Do not create a second listing while waiting." },
            { name: "Add photos", text: "Add the exterior including the sign, then the interior and the work itself. Phone photos are fine." },
            { name: "Write a plain description", text: "Say what you do, where, and for whom. Skip keyword stuffing, because it does not affect ranking and readers judge the business by it." },
          ]}
          />

          <PostFaq qa={[
            ["How long does Google Business Profile verification take?",
             "It depends on the method. Postcard verification takes up to two weeks. Phone, email and video verification are faster. Video means recording a short walkthrough showing your signage, your equipment and your address, so have those visible before you start. Do not create a second listing while you are waiting for a postcard."],
          ]} />

          <PostByline post={{
            slug: "claim-your-google-listing",
            title: "Claiming your own Google listing: a twenty-minute job",
            description: "A step-by-step guide to claiming and filling out a Google Business Profile, written so you do not need to hire anybody.",
            published: "2026-08-20",
          }} />

    </PostLayout>
  );
}
