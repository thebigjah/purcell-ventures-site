import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import PostHowTo from "@/app/components/PostHowTo";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/claim-your-google-listing" },
  title: { absolute: "Claiming your own Google listing: a twenty-minute job, by Elijah Purcell" },
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
            Agencies write most guides to this and want to manage it for you. I
            wrote this one so you can do it yourself. It takes twenty minutes and it is
            free.
          </p>

          <p>
            In my audit, this mattered more than a website for many of the businesses. I audited 121 independent businesses near the University of Alabama. Of those, 27 had a website
            that answered and 23 had opening hours recorded anywhere a machine could read
            them.{" "}
            <Link href="/blog/121-businesses-near-campus">The other 98 had no
            hours a machine could read</Link>.
          </p>

          <h2>What it is</h2>

          <p>
            A Google Business Profile is the panel that appears beside search results with
            your name, hours, phone, photos, reviews and a map. It is also what puts you in
            the map section at the top of a "near me" search.
          </p>

          <p>
            Your business may already have one that Google generated without you. So claim
            the profile before you create one.
          </p>

          <h2>Step by step</h2>

          <h3>1. Existing listings</h3>
          <p>
            If a panel appears, look for "Own this business?" or "Claim this business."
            Start there. Creating a second profile for a business that already has one is
            the most common way people end up with a duplicate, and Google may suppress
            duplicates.
          </p>

          <h3>2. The login at business.google.com</h3>
          <p>
            Use an email address you will still control in five years. Avoid an employee's
            personal account or an address at a domain you may drop. This login is the key
            to the listing, and getting it back after losing it is slow and hard.
          </p>

          <h3>3. Category is the field that matters most</h3>
          <p>
            Your primary category does more to determine which searches you appear in than
            anything else on the form. Be specific. "Barber shop" beats "hair salon" if you
            are a barber. You can add secondary categories afterwards, and you should, but
            the primary one matters most.
          </p>

          <h3>4. Address, and how to hide it</h3>
          <p>
            If customers come to you, enter the address and show it.
          </p>
          <p>
            If you work from home or go to the customer, choose the option that says you
            deliver goods and services to customers, set a service area, and <strong>hide the
            address</strong>. Google supports this explicitly. Otherwise your home address
            goes on a public map, so decide on purpose whether to show it.
          </p>

          <h3>5. Hours, including the ones you forget</h3>
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
            Say what you do, where, and for whom, in plain sentences. No keyword stuffing:
            Google does not rank on it, and readers who see a keyword-stuffed paragraph
            judge the business by it.
          </p>

          <h2>Reviews</h2>

          <p>
            A listing with recent reviews gives a searcher more to go on than one with none.
          </p>

          <p>Ask out loud when a customer says the work was good.</p>

          <Note tone="warn">
            <strong>Three things that get a listing suspended.</strong> Paying for reviews or
            offering a discount for one. Writing them yourself or having staff and family do
            it. Keyword-stuffing the business name field, so "Joe's Barbers" becomes "Joe's
            Barbers Best Haircut Tuscaloosa."
          </Note>

          <p>
            Reply to every review in a sentence or two. A complaint with no reply reads as
            agreement. A calm reply gives readers your side.
          </p>

          <h2>Once a month, five minutes</h2>

          <ul>
            <li>Are the hours still right, including next month's holiday?</li>
            <li>Any reviews to reply to?</li>
            <li>Add one photo.</li>
            <li>Check the "suggested edits" section. Anybody can suggest a change to your listing, including a competitor, and Google sometimes applies them.</li>
          </ul>

          <p>
            Other people can change your listing, and a
            monthly check is how you find out someone marked you permanently closed.
          </p>

          <h2>When to get help</h2>

          <p>
            Most owners do not need help.
          </p>

          <p>
            Help is worth it for a duplicate listing you
            cannot merge, a suspension you do not understand, or multiple locations. If you
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
            { name: "Complete verification", text: "Google verifies by postcard, phone, email or video depending on the business. Postcard takes up to two weeks. Do not create a second listing while waiting." },
            { name: "Add photos", text: "Exterior including the sign, interior, and the work itself. Phone photos are fine." },
            { name: "Write a plain description", text: "Say what you do, where, and for whom. No keyword stuffing: it does not affect ranking and readers judge the business by it." },
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
