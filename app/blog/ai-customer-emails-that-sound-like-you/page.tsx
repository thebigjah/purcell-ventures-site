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
  "title": "Using AI to draft customer emails that sound like you",
  "slug": "ai-customer-emails-that-sound-like-you",
  "description": "How a small business owner can have AI draft customer emails in their own voice, and the review step to run before each one goes out.",
  "category": "Guide",
  "lede": "I built COSMIC, a system of AI agents that runs my company's outreach. It drafts every outreach email, and it scores every draft for clear, specific writing before anything can send. A small business owner can borrow the same two ideas for customer email: let AI write the first draft, and put every draft through a review before it goes out.",
  "sections": [
    {
      "heading": "Give the AI the facts of the situation",
      "paragraphs": [
        "Start each request with what happened and what the email needs to do. For example: a customer ordered a birthday cake for Saturday, our oven broke, and we can have the cake ready Sunday at noon or refund the deposit. Write a reply that apologizes, offers both options and asks which one she prefers.",
        "Use placeholders for private details. Write [Customer] for the name and [Order] for the order number, then fill those in yourself in your email program."
      ]
    },
    {
      "heading": "Paste a sample of your own writing",
      "paragraphs": [
        "Find two or three emails you wrote to customers that you liked. Paste one into the prompt and add: match the tone, length and greeting of this email.",
        "A sample gives the AI your real habits: how you open, whether you use first names, how long your sentences run and how you sign off. Adjectives such as warm or professional give it much less to work with."
      ]
    },
    {
      "heading": "Set limits that match how you talk",
      "paragraphs": [
        "List the words and moves you never use. Common ones include stock opening pleasantries, apologies for any inconvenience, exclamation marks in every sentence and phrases such as we value your business.",
        "Add a length limit, such as under 100 words, so the AI keeps the reply short."
      ]
    },
    {
      "heading": "Ask for two versions",
      "paragraphs": [
        "Ask the AI for two drafts of the same reply, one shorter and one with more detail. Pick the one that fits the customer, or take a sentence from each.",
        "For a complaint, ask for a version that states what went wrong in one sentence and what you will do about it in the next. Customers who write in upset want to know the next step, and that structure puts it near the top."
      ]
    },
    {
      "heading": "The review step",
      "paragraphs": [
        "Read every draft before you send it, and check four things.",
        "First, check every fact. Confirm the date, time, price, order details and any policy the email mentions against your own records. AI models can state wrong things confidently, and a wrong pickup time causes a real problem for a real customer.",
        "Second, check the promises. Delete any offer you did not approve, such as a discount, a free item or a delivery time.",
        "Third, read it out loud. If a sentence sounds like something you would never say at your counter, rewrite it in your own words.",
        "Fourth, check the name and the greeting. Make sure every placeholder now holds the right customer's details."
      ]
    },
    {
      "heading": "Why the review stays with you",
      "paragraphs": [
        "Anthropic's AI Fluency framework calls this Diligence, one of its four skills for working with AI. Diligence means taking responsibility for how you use AI and for what you do with its output. Your customer reads the email as coming from you, so you own every sentence in it, including the ones the AI drafted.",
        "Save the prompts that produce good drafts in a document, labeled by situation: late order, refund request, booking change. Each prompt you save cuts the setup time for the next email of that kind."
      ]
    }
  ],
  "faq": [
    [
      "Can AI answer customer emails without me reading them?",
      "Read each draft before it sends. You are responsible for every promise and fact in an email that goes out under your name."
    ],
    [
      "How do I make AI emails sound less generic?",
      "Paste one of your own past emails and ask the AI to match its tone, length and greeting, then list the phrases you never use."
    ],
    [
      "What should I check in an AI drafted email?",
      "The facts, any promises or offers, how it sounds read aloud, and that every placeholder holds the right customer's details."
    ]
  ]
};

// One [anchor](/path) per paragraph becomes a Link: the cluster pillar link (blog.py LINK_MD).
function linked(t: string) {
  const m = t.match(/^([\s\S]*?)\[([^\]]+)\]\((\/[a-z0-9\/-]*)\)([\s\S]*)$/);
  if (!m) return t;
  return <>{m[1]}<Link href={m[3]}>{m[2]}</Link>{m[4]}</>;
}

export const metadata = {
  alternates: { canonical: "/blog/ai-customer-emails-that-sound-like-you" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/ai-customer-emails-that-sound-like-you",
    type: "article",
    images: ["/opengraph-image"],
  },
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/ai-customer-emails-that-sound-like-you" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="10 November 2026, 3 minute read"
    >
      <p>{POST.lede}</p>

      {POST.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((t, i) => <p key={i}>{linked(t)}</p>)}
        </section>
      ))}

      <p>
        I check small business websites around Tuscaloosa for problems like these. If you
        want me to look at yours, <Link href="/contact">send me the address</Link>.
      </p>

      <PostFaq qa={POST.faq} />

      <PostByline post={{
        slug: "ai-customer-emails-that-sound-like-you",
        title: POST.title,
        description: POST.description,
        published: "2026-11-10",
      }} />
    </PostLayout>
  );
}
