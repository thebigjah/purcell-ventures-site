import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

// Written by the daily blog engine (~/blog-engine), held overnight for Elijah's veto.

interface Data {
  title: string; slug: string; description: string; category: string;
  lede: string; sections: { heading: string; paragraphs: string[] }[];
  faq: [string, string][];
}

const POST: Data = {
  "title": "Four parts of a prompt that gets a usable answer",
  "slug": "prompt-usable-answer-first-time",
  "description": "The reader, the goal, an example and the limits: a four part prompt for local business writing, with a full example for a salon.",
  "category": "Guide",
  "lede": "Anthropic's AI Fluency framework names a skill called Description: stating your goal clearly enough that the AI can produce useful output. Courses in Anthropic Academy teach that better output comes from context, meaning who the work is for, what good looks like, an example and the constraints. A local business owner can use those four parts for posts, emails and signs.",
  "sections": [
    {
      "heading": "Name who the work is for",
      "paragraphs": [
        "An AI tool knows nothing about your customers unless you describe them. Ask it for a post about your bakery's new hours and it has to guess who will read it.",
        "Give it the reader in one sentence: \"The readers are regular customers who live near the shop and follow us on Facebook.\" That sentence tells the AI how formal to sound and what the reader already knows about you."
      ]
    },
    {
      "heading": "Say what you want",
      "paragraphs": [
        "State the task, the format and the length. The request \"write something about our hours\" leaves the format and length open. The request \"write a Facebook post of three sentences announcing that we now open at 7 AM on Saturdays\" states the platform, the length and the news.",
        "Type in every fact the AI needs. A model knows its training data up to a cutoff date plus whatever you put in front of it. It has no way to know your new hours, your prices or this week's special unless you include them."
      ]
    },
    {
      "heading": "Show an example",
      "paragraphs": [
        "Paste one piece of writing you already like, such as an old post, an email you sent a customer or a paragraph from your website. Then add: \"Match the tone and length of this example.\"",
        "Words like friendly and professional mean different things to different people. A real sample shows the AI how your business sounds."
      ]
    },
    {
      "heading": "Set the limits",
      "paragraphs": [
        "Limits are the rules the answer has to follow. For a small business, common limits include a word count, no prices, no emojis, no promised delivery times and no mention of a competitor.",
        "List the limits at the end of the prompt. If an answer breaks one, quote that rule back in your next message so the AI knows which part to change."
      ]
    },
    {
      "heading": "A full prompt for a real task",
      "paragraphs": [
        "Here is a prompt a salon owner could send to announce a holiday closure:",
        "\"Readers: our regular clients in Tuscaloosa who book through our website. Task: write a four sentence email saying we close December 24 through December 26 and reopen December 27 at 9 AM. Example: [paste last year's closure email]. Limits: under 80 words, no emojis, include our booking link and offer no discounts.\"",
        "Each part of that prompt answers a question the AI would otherwise guess at: who reads it, what it says, how it sounds and what it must avoid."
      ]
    },
    {
      "heading": "Fix a weak answer by fixing the prompt",
      "paragraphs": [
        "When an answer misses, look at which of the four parts it got wrong. A post that sounds stiff usually needs a better example. A post that runs long needs a word count in the limits. A post with a made up detail needs the real fact typed into the prompt.",
        "Add the missing part to your original prompt and save that version in a document. The next time you announce hours or a closure, you can paste the saved prompt, change the dates and send it."
      ]
    },
    {
      "heading": "Check the answer",
      "paragraphs": [
        "Before you send what the AI wrote, compare every date, name, price and link with your own records. Models can state wrong things confidently, and your customers will read the email as coming from you."
      ]
    }
  ],
  "faq": [
    [
      "Does AI know my business hours and prices?",
      "Only if you type them into the prompt, or the tool searches a source that lists them. Type them in to be safe."
    ],
    [
      "Where should I keep prompts that work?",
      "Save them in a document with a short label, such as holiday closure email, and change only the dates and details each time."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/prompt-usable-answer-first-time" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/prompt-usable-answer-first-time" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="8 November 2026, 3 minute read"
    >
      <p>{POST.lede}</p>

      {POST.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
        </section>
      ))}

      <p>
        I check small business websites around Tuscaloosa for problems like these. If you
        want me to look at yours, <Link href="/contact">send me the address</Link>.
      </p>

      <PostFaq qa={POST.faq} />

      <PostByline post={{
        slug: "prompt-usable-answer-first-time",
        title: POST.title,
        description: POST.description,
        published: "2026-11-08",
      }} />
    </PostLayout>
  );
}
