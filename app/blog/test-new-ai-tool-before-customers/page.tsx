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
  "title": "How to test a new AI tool before customers see it",
  "slug": "test-new-ai-tool-before-customers",
  "description": "Run the tool on 20 past customer messages, grade every reply against your own records, and launch only if it makes zero factual errors. Here is how.",
  "category": "Guide",
  "lede": "Pick 20 customer messages your business already answered, run them through the AI tool, and have staff grade every reply against your records. Launch only if the batch has zero factual errors and no more than two replies that need a full rewrite. After that, a person reads every reply before it goes out.",
  "sections": [
    {
      "heading": "Pull a test batch from your own inbox",
      "paragraphs": [
        "I completed 12 Anthropic Academy courses, including AI Fluency: Framework & Foundations, and I use that framework when I help a business try a new AI tool. It names four skills: Delegation, Description, Discernment and Diligence. Each step in this post lines up with one of them.",
        "Delegation means deciding whether, when and how AI should take part in a task. A test batch answers that question with your own messages. Open your email, Facebook Messenger, Google Business Profile messages or text history and copy 20 customer questions your staff already answered.",
        "Mix the easy ones, such as hours and parking, with the hard ones, such as refunds, reschedules and quote requests. Include the question that always confuses a new hire. Paste your staff's real reply next to each one. Those replies become your answer key.",
        "Delete names, phone numbers, email addresses and street addresses before you paste anything into the tool. Write \"Customer A\" in their place. Keep customer details out of prompts unless the tool's terms and your account settings allow that data. Open the Privacy or Data controls page in the tool's settings and read it before you start."
      ]
    },
    {
      "heading": "Give the tool your facts in writing",
      "paragraphs": [
        "A model knows only its training data up to a cutoff date plus what you put in front of it. It has never seen your price list or your cancellation policy. You have to supply them.",
        "Write a one-page fact sheet. Include your hours, your services and prices, your cancellation and refund policy, your address and parking, the services you do not offer, and the situations where a person should take over.",
        "Then write the instructions. AI Fluency calls this Description: stating the goal clearly enough to get useful output. Tell the tool who reads the replies and what a good reply looks like. Paste one past reply you liked as an example. Add rules such as \"Keep replies under 100 words,\" \"Never quote a price that is not on the fact sheet\" and \"If you are unsure, say a staff member will follow up.\""
      ]
    },
    {
      "heading": "Grade every reply with one checklist",
      "paragraphs": [
        "Set up a spreadsheet with five columns: customer question, staff reply, AI reply, pass or fail, and notes. Run all 20 questions and paste each AI reply into its row.",
        "This step is Discernment, which AI Fluency defines as judging how useful an output actually is. A reply fails if it states a wrong hour, price, policy or name. It also fails if it promises a service you do not offer, skips the question the customer asked, repeats private information, or needs a full rewrite before you would send it. A reply passes if you would send it as written or after changing a few words.",
        "Check every fact against the fact sheet or your booking system. Models can state wrong things with full confidence, so a friendly, polished reply can still carry the wrong closing time. Ask the person who usually answers these messages to do the grading, since they know which details customers ask about most."
      ]
    },
    {
      "heading": "Set the pass mark before you run the test",
      "paragraphs": [
        "Write your rule at the top of the spreadsheet before the first reply comes back. The rule I recommend: zero factual errors and no more than two full rewrites out of 20. One wrong price fails the whole batch, because a customer who sees that price will expect you to honor it.",
        "If the batch fails, read the notes column. When a fail traces to a fact missing from your sheet, add the fact. When the tool ignored a clear instruction, write that down, because it may mean the tool does not fit this job.",
        "Then run a fresh batch of 20 different questions. Rerunning the same 20 only shows the tool can answer those 20. Launch only after a fresh batch meets the pass mark."
      ]
    },
    {
      "heading": "Launch with a person reading every reply",
      "paragraphs": [
        "Once the tool passes, find the auto-reply or auto-send option in its settings and turn it off. Use draft mode if the tool offers one. A staff member reads each draft, fixes it, and clicks send.",
        "AI Fluency calls this Diligence: owning responsibility for how you use AI and what you do with its output. Customers see your business name on every reply, so the person who clicks send owns that reply.",
        "Keep the spreadsheet open for the first month. Log every draft your staff had to correct, with a short note on why. Pick one day a week to read the log. If the same mistake shows up twice, add the missing fact or rule to your sheet.",
        "Your first step this week: open your inbox and copy 20 past customer questions into a new spreadsheet."
      ]
    }
  ],
  "faq": [
    [
      "How many messages should I use to test an AI tool?",
      "Use 20 past customer messages that your staff already answered, mixing simple questions like hours with harder ones like refunds. If the tool fails, test a new set of 20 so the retest covers questions it has not seen."
    ],
    [
      "Is it safe to paste customer messages into an AI tool?",
      "Remove names, phone numbers, email addresses and street addresses first. Keep customer details out entirely unless the tool's terms and your account settings allow that kind of data, which you can confirm on its Privacy or Data controls page."
    ],
    [
      "What score should an AI tool need before customers see its replies?",
      "Zero factual errors and no more than two replies out of 20 that need a full rewrite. A single wrong price, hour or policy fails the batch."
    ],
    [
      "Should an AI tool send customer replies on its own?",
      "Keep auto-send turned off and have a staff member read and edit each draft before it goes out, even after the tool passes your test. Log the corrections for the first month and update your fact sheet when a mistake repeats."
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
  alternates: { canonical: "/blog/test-new-ai-tool-before-customers" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/test-new-ai-tool-before-customers",
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
        { name: POST.title, href: "/blog/test-new-ai-tool-before-customers" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="16 November 2026, 5 minute read"
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
        slug: "test-new-ai-tool-before-customers",
        title: POST.title,
        description: POST.description,
        published: "2026-11-16",
      }} />
    </PostLayout>
  );
}
