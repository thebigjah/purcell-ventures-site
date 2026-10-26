import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// Written by the daily blog engine (~/blog-engine), held overnight for Elijah's veto.

interface Data {
  title: string; slug: string; description: string; category: string;
  lede: string; sections: { heading: string; paragraphs: string[] }[];
  faq: [string, string][];
}

const POST: Data = {
  "title": "How to start using AI in your business this week: three safe first tasks",
  "slug": "start-using-ai-this-week-three-safe-first-tasks",
  "description": "Three low-risk ways a small business owner can start using AI this week, plus the checks to run on every answer before a customer sees it.",
  "category": "Guide",
  "lede": "You can start using AI in your business this week with one free account. The safest way to begin is with small writing jobs where you already know what a good answer looks like. I completed 12 Anthropic Academy courses, including AI Fluency: Framework & Foundations, and this post draws on that framework.",
  "sections": [
    {
      "heading": "Setting up your account before you type anything",
      "paragraphs": [
        "Pick one tool. ChatGPT, Claude and Gemini all have free plans that can handle the tasks in this post. Sign up with your business email so your work stays separate from your personal chats.",
        "Next, open the privacy settings. In ChatGPT, go to Settings, then Data Controls, and find the switch for Improve the model for everyone. In Claude, go to Settings, then Privacy, and find Help improve Claude. Turn these off if you want to keep your chats out of model training.",
        "Then set one rule for yourself. Keep customer names, phone numbers, card details, health information and passwords out of every prompt unless you have approved the tool and its settings for that kind of data. A dental office or a salon with client notes should treat this rule as fixed."
      ]
    },
    {
      "heading": "Choosing tasks you can check yourself",
      "paragraphs": [
        "First decide whether AI should do the task at all. For a first week, I pick tasks that pass three tests. You can spot a wrong answer quickly. A mistake costs little to fix. The task takes time you would rather spend with customers.",
        "Short writing drafts pass all three tests. Bookkeeping, legal questions and anything involving a customer's private records fail them, so leave those alone for now."
      ]
    },
    {
      "heading": "Task one: drafting replies to your Google reviews",
      "paragraphs": [
        "Open your Google Business Profile, go to Reviews, and copy the text of one review. Paste it into the AI tool with a prompt like this: \"Write a short, friendly reply to this review for my barbecue restaurant in Tuscaloosa. Thank the customer, mention the dish they named, and keep it under four sentences. Do not offer discounts or refunds.\"",
        "Here the AI follows instructions you wrote. Read the draft side by side with the review. Delete anything the customer never said, and remove any promise you did not make. Then paste your edited version into the Reply box in Google Business Profile and post it."
      ]
    },
    {
      "heading": "Task two: rewriting one page of your website",
      "paragraphs": [
        "Pick the page you like least, often the services page or the about page, and copy its text into the tool. This task works best as a back-and-forth where you and the tool work on the page together.",
        "Good output depends on clear instructions and context, so tell the tool four things: who reads the page, what a good result looks like, an example you like, and your limits. For example: \"This page is for first-time customers looking for a tattoo shop in Tuscaloosa. A good result explains our booking process in one read. Here is a paragraph from our FAQ page whose tone I like. Keep every price and policy exactly as written. Before you rewrite, ask me three questions about anything unclear.\"",
        "Answer its questions, read the rewrite, and keep only the parts that sound like you."
      ]
    },
    {
      "heading": "Task three: writing this week's customer update",
      "paragraphs": [
        "Pick one piece of news, such as your Thanksgiving hours, a new service, or a time change for Sunday services. Write the facts yourself first: dates, times, address and phone number.",
        "A model knows only its training data up to a cutoff date plus what you put in front of it. It cannot know your hours for this November unless you paste them in. Give it your exact facts and ask for a short email and a Facebook post in plain language."
      ]
    },
    {
      "heading": "How to check every result before you use it",
      "paragraphs": [
        "Next, check the output. Models can state wrong things with full confidence, so I check every fact, name, number and quote against a source before I use it.",
        "Compare every date, time, price and phone number with your own records, such as your booking calendar, your price list or the hours on your Google Business Profile. Delete claims you cannot back up, such as \"best in town\" or \"fastest service.\" Read the draft out loud and change any sentence you would never say to a customer.",
        "You are responsible for how you use AI and what you do with its output. Your business name goes on every reply and post, so you approve each one yourself. When a prompt works well, save it in a note on your phone. Once you trust a few saved prompts, you can set up a Project in Claude or ChatGPT with saved instructions so it can handle similar tasks for you later.",
        "Your first step this week: open Google Business Profile, copy your most recent review, and draft a reply with the prompt above."
      ]
    }
  ],
  "faq": []
};

export const metadata = {
  alternates: { canonical: "/blog/start-using-ai-this-week-three-safe-first-tasks" },
  title: { absolute: POST.title + ", by Elijah Purcell" },
  description: POST.description,
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: POST.title, href: "/blog/start-using-ai-this-week-three-safe-first-tasks" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">{POST.category}, October 25, 2026, 5 min read</div>
          <h1>{POST.title}</h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>
          <p style={{ fontSize: "18px" }}>{POST.lede}</p>

          {POST.sections.map((s) => (
            <section key={s.heading}>
              <h2 style={H2}>{s.heading}</h2>
              {s.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
            </section>
          ))}

          <p>
            I check small business websites around Tuscaloosa for problems like these. If you
            want me to look at yours, <Link href="/contact" style={link}>send me the address</Link>.
          </p>

          <PostByline post={{
            slug: "start-using-ai-this-week-three-safe-first-tasks",
            title: POST.title,
            description: POST.description,
            published: "2026-10-25",
          }} />
        </article>
      </main>
    </div>
  );
}
