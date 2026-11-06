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
  "title": "Why an AI tool needs your business facts before it writes about you",
  "slug": "tell-ai-about-your-business",
  "description": "What a language model can know about a local business, what it has to guess, and the one-page brief that supplies the facts.",
  "category": "Guide",
  "lede": "A model knows only its training data up to a cutoff date plus what you put in front of it. Your current prices, hours and return policy are rarely in that training data. A draft that mentions them will contain guesses unless you type the facts into the chat.",
  "sections": [
    {
      "heading": "What the model knows and what it lacks",
      "paragraphs": [
        "A language model learns from a large body of text collected up to a cutoff date. After that date, it learns nothing new on its own. If your business had public web pages before the cutoff, the model may have picked up pieces of them, and it has no way to know what you changed since.",
        "Your current prices, this month's hours, your refund rules, the name of your manager and the services you added last spring are missing from the model's training data. When a prompt asks about them and the chat does not contain them, the model fills in with typical details for a business like yours. The model writes those guesses in the same confident tone it uses for real facts."
      ]
    },
    {
      "heading": "Write a one-page business brief",
      "paragraphs": [
        "Put your facts in a short document, a business brief. Write it once, keep it in a file on your computer, and paste it at the top of any chat about your business.",
        "A useful brief covers the business name, address and service area, your hours, what you sell with current prices, who your customers are, your policies on refunds, deposits and cancellations, and the phone number and email customers should use.",
        "Add a few lines about how you write. Say whether you use first names, whether you sign emails with your own name, and which words you never use. Paste in one email or post you wrote that you liked, so the tool has an example to match."
      ]
    },
    {
      "heading": "Tell it the goal for each task",
      "paragraphs": [
        "The brief covers the business. Each request still needs its own instructions.",
        "For each task, say who the output is for, what a good result looks like and your limits. A prompt might read: Using the brief above, write a reply to a customer who asked whether we take walk-ins on Saturday. Keep it to three sentences and include our phone number.",
        "That request gives the tool the audience, the facts it needs and the length, so it has fewer details to guess."
      ]
    },
    {
      "heading": "Save the brief where the tool can reuse it",
      "paragraphs": [
        "Some AI tools let you store background information so you do not have to paste it every time. Claude offers Projects, where you can add documents and instructions that apply to every chat inside that project. ChatGPT offers custom instructions that apply across your chats.",
        "Whichever tool you use, update the brief the same day you change a price, an hour or a policy. An old brief puts outdated facts into every draft."
      ]
    },
    {
      "heading": "Leave private details out of the brief",
      "paragraphs": [
        "A brief should hold facts you would put on your website. Keep passwords, bank details, customer names and customer records out of it unless your business has approved the tool and its settings for that data.",
        "Then check what comes back. Read every name, price, date and policy in a draft against your brief before you send it, because the tool can still mix up two facts you gave it."
      ]
    }
  ],
  "faq": [
    [
      "Can an AI tool look up my business on its own?",
      "Some tools can search the web, and they still miss details you never published, such as deposit rules or a new price you have not posted yet."
    ],
    [
      "Does a business brief work with every AI chat tool?",
      "Any chat tool reads text you paste in. Tools with saved instructions, such as Claude Projects, spare you the step of pasting it each time."
    ],
    [
      "How long should a business brief be?",
      "One page fits most small businesses. Include the facts a customer would ask about and a short note on how you write."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/tell-ai-about-your-business" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/tell-ai-about-your-business" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="6 November 2026, 3 minute read"
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
        slug: "tell-ai-about-your-business",
        title: POST.title,
        description: POST.description,
        published: "2026-11-06",
      }} />
    </PostLayout>
  );
}
