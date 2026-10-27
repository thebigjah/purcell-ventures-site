import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

// Written by the daily blog engine (~/blog-engine), held overnight for Elijah's veto.

const TITLE = "How to start using AI in your business this week: three safe first tasks";
const DESCRIPTION = "Three low-risk ways a small business owner can start using AI this week, plus the checks to run on every answer before a customer sees it.";

export const metadata = {
  alternates: { canonical: "/blog/start-using-ai-this-week-three-safe-first-tasks" },
  title: { absolute: TITLE },
  description: DESCRIPTION,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: TITLE, href: "/blog/start-using-ai-this-week-three-safe-first-tasks" },
      ]} />}
      kicker="Guide"
      title={TITLE}
      meta="25 October 2026, 5 minute read"
    >
      <p>
        You can start using AI in your business this week with one free account. The safest
        way to begin is with small writing jobs where you already know what a good answer
        looks like. I completed 12 Anthropic Academy courses, including AI Fluency:
        Framework &amp; Foundations. The steps I recommend come from that course.
      </p>

      <h2>Setting up your account before you type anything</h2>
      <p>
        Pick one tool. ChatGPT, Claude and Gemini all have free plans that can handle these
        tasks. Sign up with your business email so your work stays separate from
        your personal chats.
      </p>
      <p>
        Next, open the privacy settings. In ChatGPT, go to Settings, then Data Controls, and
        find the switch for Improve the model for everyone. In Claude, go to Settings, then
        Privacy, and find Help improve Claude. Turn these off if you want to keep your chats
        out of model training.
      </p>
      <p>
        Then set one rule for yourself. Keep customer names, phone numbers, card details,
        health information and passwords out of every prompt unless you have approved the
        tool and its settings for that kind of data. A dental office or a salon with client
        notes should treat this rule as fixed.
      </p>

      <h2>Choosing tasks you can check yourself</h2>
      <p>
        First decide whether AI should do the task at all. For a first week, I pick tasks
        where you can spot a wrong answer quickly, a mistake costs little to fix, and the
        work takes time you would rather spend with customers.
      </p>
      <p>
        Short writing drafts meet all three conditions. Bookkeeping, legal questions and anything
        involving a customer&apos;s private records fail them, so leave those alone for now.
      </p>

      <h2>Task one: drafting replies to your Google reviews</h2>
      <p>
        Open your Google Business Profile, go to Reviews, and copy the text of one review.
        Paste it into the AI tool with a prompt like this: &quot;Write a short, friendly reply to
        this review for my barbecue restaurant in Tuscaloosa. Thank the customer, mention the
        dish they named, and keep it under four sentences. Do not offer discounts or
        refunds.&quot;
      </p>
      <p>
        Read the draft side by side with the review. Delete anything the customer never
        said, and remove any promise you did not make. Then paste your edited version into
        the Reply box in Google Business Profile
        and post it.
      </p>

      <h2>Task two: rewriting one page of your website</h2>
      <p>
        Pick the page you like least, often the services page or the about page, and copy its
        text into the tool. This task works best as a back-and-forth where you and the tool
        work on the page together.
      </p>
      <p>
        Good output depends on clear instructions and context, so tell the tool four things:
        who reads the page, what a good result looks like, an example you like, and your
        limits. For example: &quot;This page is for first-time customers looking for a tattoo
        shop in Tuscaloosa. A good result explains our booking process in one read. Here is a
        paragraph from our FAQ page whose tone I like. Keep every price and policy exactly as
        written. Before you rewrite, ask me three questions about anything unclear.&quot;
      </p>
      <p>Answer its questions, read the rewrite, and keep only the parts that sound like you.</p>

      <h2>Task three: writing this week&apos;s customer update</h2>
      <p>
        Pick one piece of news, such as your Thanksgiving hours or a new service. Write the
        facts yourself first: dates, times, address and
        phone number.
      </p>
      <p>
        A model knows only its training data up to a cutoff date plus what you put in front
        of it. It cannot know your hours for this November unless you paste them in. Give it
        your exact facts and ask for a short email and a Facebook post in plain language.
      </p>

      <h2>How to check every result before you use it</h2>
      <p>
        Models can state wrong things with full confidence, so I
        check every fact, name, number and quote against a source before I use it.
      </p>
      <p>
        Compare every date, time, price and phone number with your own records, such as your
        booking calendar, your price list or the hours on your Google Business Profile.
        Delete claims you cannot back up, such as &quot;best in town&quot; or &quot;fastest service.&quot; Read
        the draft out loud and change any sentence you would never say to a customer.
      </p>
      <p>
        You are responsible for how you use AI and what you do with its output. Your business
        name goes on every reply and post, so you approve each one yourself. When a prompt
        works well, save it in a note on your phone. Once you trust a few saved prompts, you
        can set up a Project in Claude or ChatGPT with saved instructions so it can handle
        similar tasks for you later.
      </p>
      <p>
        Your first step this week: open Google Business Profile, copy your most recent
        review, and draft a reply with the prompt above.
      </p>

      <p>
        I help small businesses around Tuscaloosa start using AI. If you want help choosing
        your first tasks, <Link href="/contact">send me a message</Link>.
      </p>

      <PostByline post={{
        slug: "start-using-ai-this-week-three-safe-first-tasks",
        title: TITLE,
        description: DESCRIPTION,
        published: "2026-10-25",
      }} />
    </PostLayout>
  );
}
