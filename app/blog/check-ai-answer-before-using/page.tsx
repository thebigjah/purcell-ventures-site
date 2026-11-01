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
  "title": "How to check an AI answer before you use it",
  "slug": "check-ai-answer-before-using",
  "description": "A routine for checking the names, numbers, quotes and dates in an AI answer against a source before they reach customers.",
  "category": "Guide",
  "lede": "Anthropic's AI Fluency course names a skill called Discernment: judging how useful an AI output is before you rely on it. Models can state wrong things in the same confident tone they use for right things, so Discernment needs a routine. Before an AI answer goes into a customer email, a social post or your website, check its names, numbers, quotes and dates against a source you trust.",
  "sections": [
    {
      "heading": "Why a confident answer can still be wrong",
      "paragraphs": [
        "A language model writes the words most likely to come next, based on its training data. That process produces fluent sentences, and fluency says nothing about accuracy. A model can give you a wrong phone number for a supplier in the same tone it uses to give you a correct one.",
        "A model also knows only its training data up to a cutoff date, plus whatever you paste into the chat. Ask about a law that changed last month or a vendor's current price and it may answer from older information without telling you."
      ]
    },
    {
      "heading": "Names",
      "paragraphs": [
        "Check every person, business, product and place the answer names. Search each name and confirm it exists with the same spelling the answer uses.",
        "Pay extra attention to titles and roles. If the answer says a person is the director of a local agency, open that agency's website and find the staff page."
      ]
    },
    {
      "heading": "Numbers",
      "paragraphs": [
        "Treat every number as a claim that needs a source. That includes prices, tax rates, measurements, phone numbers, addresses and counts.",
        "For a business number, go to the organization that owns it. A sales tax rate comes from your state revenue department's website. A supplier's price comes from the supplier's current price sheet or a phone call. If you cannot find a source for a number, leave the number out."
      ]
    },
    {
      "heading": "Quotes",
      "paragraphs": [
        "AI models sometimes produce quotes that sound right and that nobody ever said. Before you use a quote, find it in its original place: the book, the speech, the interview or the article.",
        "Search the exact wording in quotation marks. If the only results are quote collection sites with no original source listed, drop the quote or rewrite the idea in your own words."
      ]
    },
    {
      "heading": "Dates",
      "paragraphs": [
        "Dates go wrong in two ways. The answer can give a wrong date for a past event, and it can treat old information as current because of its training cutoff.",
        "Check event dates on the organizer's own page. Check deadlines, such as a permit renewal or a filing date, on the agency's website. If your post mentions a day of the week, open a calendar and confirm the date falls on that day."
      ]
    },
    {
      "heading": "A routine you can repeat",
      "paragraphs": [
        "Print or copy the AI answer and highlight every name, number, quote and date. Check each highlighted item against a source and write the source next to it. Anything without a source gets cut or rewritten.",
        "The same framework also names Diligence, which means taking responsibility for what you publish when AI helped write it. The highlighted copy with sources written beside each item is the record of that responsibility."
      ]
    }
  ],
  "faq": [
    [
      "Can I ask the AI to check its own answer?",
      "You can, and it sometimes catches errors, but its second answer comes from the same model. Confirm facts against an outside source."
    ],
    [
      "Why does AI make up quotes?",
      "A model generates likely sounding text, so it can produce a quote in a famous person's style that the person never said."
    ],
    [
      "Does an AI tool know today's prices and rules?",
      "Its training data stops at a cutoff date. Some tools can search the web, and you should still confirm current prices and rules on the official source."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/check-ai-answer-before-using" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/check-ai-answer-before-using" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="30 October 2026, 3 minute read"
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
        slug: "check-ai-answer-before-using",
        title: POST.title,
        description: POST.description,
        published: "2026-10-30",
      }} />
    </PostLayout>
  );
}
