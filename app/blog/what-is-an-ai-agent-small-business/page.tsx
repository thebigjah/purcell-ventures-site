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
  "title": "What is an AI agent? Small business jobs that suit one",
  "slug": "what-is-an-ai-agent-small-business",
  "description": "An AI agent is an AI tool that takes a goal and works through the steps itself using apps you connect. It fits repetitive, low-risk jobs you can review.",
  "category": "Guide",
  "lede": "An AI agent is an AI tool that takes a goal and works through the steps itself, using apps you connect to it, such as your email or a Google Sheet. The jobs that suit one come up every week and produce work you can check before a customer sees it.",
  "sections": [
    {
      "heading": "What an AI agent does",
      "paragraphs": [
        "Most people have used an AI chat tool such as ChatGPT or Claude. You type a request and it writes an answer. Then it waits for your next message.",
        "An agent keeps going after the first answer. You give it a goal. It plans the steps and carries them out with the tools you have connected. A tool here means access to a real account, such as your Gmail inbox or a Google Sheet.",
        "Say you connect an agent to the inbox that receives your website contact form and ask it to sort new messages. It can open each email, decide whether the message asks about pricing or scheduling, move it to a matching folder, and write a draft reply for you to read.",
        "A chat tool would only answer a question about one email you pasted into it. The agent works through the whole inbox on its own."
      ]
    },
    {
      "heading": "Where agents fit in Anthropic's AI Fluency framework",
      "paragraphs": [
        "Anthropic's AI Fluency framework describes three ways people work with AI. In automation, AI carries out instructions you define. In augmentation, you and the AI think through a problem together. In agency, you set the AI up to handle future tasks on your behalf.",
        "An agent belongs to that third group. You do the planning once, up front, and the agent repeats the work later while you do something else.",
        "The framework also asks you to decide whether AI should take part in a task at all, and if so, when and how. It calls that decision Delegation. For an agent, the answer depends on what happens when it gets a step wrong. If you can catch the mistake before a customer sees it, the job is a reasonable candidate."
      ]
    },
    {
      "heading": "Small business jobs that suit an agent",
      "paragraphs": [
        "The best first jobs come up every week and end in a draft. A draft gives you a chance to read the work before it reaches a customer.",
        "A salon owner could have an agent read tomorrow's appointments from the booking calendar and write a reminder text for each client. The owner reads the batch and sends them.",
        "A contractor could have an agent go through estimate requests in Gmail and copy each address and job description into a Google Sheet. The contractor checks the sheet before calling anyone back.",
        "A church office could give an agent the week's announcements along with last week's bulletin and ask for a new bulletin in the same layout. Someone on staff proofreads it before it goes to the printer.",
        "Each of these jobs ends with a person reading the result."
      ]
    },
    {
      "heading": "Jobs to keep doing yourself",
      "paragraphs": [
        "Anything that moves money should stay with a person. An agent can total up refunds or payroll hours for you, and you should still approve and send the payment yourself.",
        "Replies to upset customers should stay with a person too. An agent can write a first draft, and you should edit it and press send yourself.",
        "AI models can state wrong facts with full confidence. If an agent puts your hours or prices into a message, check them against your own website before the message goes out. You stay responsible for everything that leaves your business under your name."
      ]
    },
    {
      "heading": "How to give an agent good instructions",
      "paragraphs": [
        "Agents do better work when you give them context. Write down who the work is for, what a good result looks like, one past example you liked, and the limits the agent must stay inside.",
        "For the salon reminders, that could read: \"These texts go to existing clients. Keep each one short and friendly. Include the stylist's first name and the appointment time. Never offer a discount. Here is a reminder I sent last month.\"",
        "A model knows only what it learned in training, up to a cutoff date, plus what you give it. It has no way to know you changed your Saturday hours unless you tell it. Paste your current hours and prices into the instructions.",
        "Ask the agent to describe its plan before it acts, and read that plan before you let it run. If someone works on your website with a coding agent such as Claude Code, the same habits apply. They should keep a project file the agent reads every session, ask for a plan before changes, review every change, and run the site's tests afterward."
      ]
    },
    {
      "heading": "A first test you can run this week",
      "paragraphs": [
        "Pick one weekly job from your business that ends in a draft. Open a blank document and write instructions for it using the four parts from the section above.",
        "Test the agent on last week's emails or bookings, which you already handled. Compare its drafts with what you sent. Where they differ, change the instructions and run the test again.",
        "Before you connect any account, open the tool's settings page and read the section on data and privacy. Leave passwords and customer payment details out of every prompt unless you have confirmed the tool and its settings are cleared for that kind of data.",
        "Keep reading every draft the agent writes for the first several weeks. Once its drafts match what you would have written, you can decide how much checking the job still needs."
      ]
    }
  ],
  "faq": [
    [
      "Is an AI agent the same thing as a chatbot like ChatGPT?",
      "A chat tool answers one message and then waits for you. An agent takes a goal, plans the steps and carries them out through apps you connect, such as Gmail or Google Sheets."
    ],
    [
      "Which job should a small business give an agent first?",
      "Start with a job that comes up every week and ends in a draft you read before a customer sees it, such as appointment reminder texts or copying estimate requests into a spreadsheet."
    ],
    [
      "Should an AI agent handle refunds or angry customers?",
      "Keep payments and upset customers with a person. An agent can total the numbers or write a first draft, and you approve the payment or edit the reply and send it yourself."
    ],
    [
      "Does an AI agent know my current hours and prices?",
      "Only if you tell it. A model knows its training data up to a cutoff date plus what you put in its instructions, so paste in your current hours and prices and check its output against your website."
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
  alternates: { canonical: "/blog/what-is-an-ai-agent-small-business" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/what-is-an-ai-agent-small-business",
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
        { name: POST.title, href: "/blog/what-is-an-ai-agent-small-business" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="15 November 2026, 5 minute read"
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
        slug: "what-is-an-ai-agent-small-business",
        title: POST.title,
        description: POST.description,
        published: "2026-11-15",
      }} />
    </PostLayout>
  );
}
