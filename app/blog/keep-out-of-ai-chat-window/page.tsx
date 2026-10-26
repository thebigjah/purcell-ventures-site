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
  "title": "What to keep out of an AI chat window when you run a business",
  "slug": "keep-out-of-ai-chat-window",
  "description": "Passwords, customer records and private details do not belong in an AI chat. Here is what to leave out and what to type instead.",
  "category": "Guide",
  "lede": "Anthropic's AI Fluency course gives a plain rule for business owners: keep private data, passwords and customer details out of prompts unless you have checked that the tool and its settings fit that kind of data. In a small business, that rule covers three groups of information: logins, customer records and private details about you and your staff.",
  "sections": [
    {
      "heading": "Where your words go",
      "paragraphs": [
        "When you type into a chat tool, the tool sends your text to the company that runs it. Depending on the tool and your plan, that company may store the conversation and may use it to train future models.",
        "You can check your own tool in a few minutes. In ChatGPT, open Settings, then Data controls, and look for the switch labeled Improve the model for everyone. In Claude, open Settings, then Privacy, and look for the switch labeled Help improve Claude. Turn the switch off if you do not want your chats used for training."
      ]
    },
    {
      "heading": "Passwords and login codes",
      "paragraphs": [
        "Never paste a password, a two-factor code or a recovery key into a chat. That covers the login for your website host, your domain registrar, your bank and your email. An AI tool needs none of them to help you.",
        "For a login problem, describe the problem in words. Write something like: my host shows an error when I try to reset my password, and the reset email never arrives. The AI can walk you through the usual causes without seeing the password."
      ]
    },
    {
      "heading": "Customer records and payment details",
      "paragraphs": [
        "Customer names, phone numbers, home addresses, card numbers and order histories are private to your customers. Keep them inside the systems where you already store them, such as your point of sale and your email.",
        "You can still get help with customer work. Before you paste, replace each real detail with a placeholder. Write [Customer] in place of a name, [Phone] in place of a number and [Order] in place of an order ID. The AI drafts the reply around the placeholders, and you type the real details into your own email program.",
        "Spreadsheets work the same way. For help with a formula, paste the column headings and two rows of made up data, then test the formula on a copy of your real file."
      ]
    },
    {
      "heading": "Private details about you and your staff",
      "paragraphs": [
        "Leave out Social Security numbers, tax IDs, bank account numbers, employee pay, health information and anything from a personnel file. A question about payroll software works fine with invented numbers.",
        "For a lease or a vendor agreement, remove the names, addresses and account numbers before you ask for a plain English summary. You can also copy out one clause by hand and ask what it means."
      ]
    },
    {
      "heading": "What you can paste freely",
      "paragraphs": [
        "Your public menu, your posted hours, the text on your website, a product description and a job listing you plan to publish are all fine to paste. So is a rough draft of a social media post or a question about how to word a refund policy.",
        "To decide, ask whether the text will appear on your website or your storefront window anyway. If it will, you can paste it."
      ]
    },
    {
      "heading": "A written rule for your team",
      "paragraphs": [
        "Pick one AI tool for the business and note which plan you pay for. Open its privacy settings and decide whether chats may go toward training. Then write a three line note for everyone who uses it: no passwords, no customer details, use placeholders. Pin it in your team chat or tape it next to the register.",
        "AI Fluency calls this skill Diligence. It is one of the framework's four skills, and it means taking responsibility for how you use AI and for what you do with its output."
      ]
    }
  ],
  "faq": [
    [
      "Where do I find my AI tool's data terms?",
      "Most AI companies publish a privacy policy and a page on how they use chats. Search the tool's name plus privacy policy, and read the section on training."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/keep-out-of-ai-chat-window" },
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
          { name: POST.title, href: "/blog/keep-out-of-ai-chat-window" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">{POST.category}, October 26, 2026, 3 min read</div>
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
            I help small businesses around Tuscaloosa set up AI tools and the rules for using
            them. If you want help writing yours, <Link href="/contact" style={link}>send me a message</Link>.
          </p>

          <PostFaq qa={POST.faq} />

          <PostByline post={{
            slug: "keep-out-of-ai-chat-window",
            title: POST.title,
            description: POST.description,
            published: "2026-10-26",
          }} />
        </article>
      </main>
    </div>
  );
}
