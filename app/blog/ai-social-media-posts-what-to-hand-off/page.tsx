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
  "title": "Using AI for your social media posts: what to hand off and what to write yourself",
  "slug": "ai-social-media-posts-what-to-hand-off",
  "description": "Which social media jobs a small business can give to an AI tool, which posts the owner should write, and how to check every draft before it goes up.",
  "category": "Guide",
  "lede": "A chat tool such as Claude or ChatGPT can turn a few lines of notes into a draft caption for Instagram or Facebook. That saves time for an owner who posts between customers. It also makes it easy to publish a wrong price or a promotion that ended last week. I completed 12 Anthropic Academy courses, including AI Fluency: Framework & Foundations, and this post uses that framework to sort social media work into the jobs AI can draft and the posts you should write yourself.",
  "sections": [
    {
      "heading": "Decide which jobs AI should draft",
      "paragraphs": [
        "AI Fluency starts with Delegation, which means deciding whether, when and how AI should take part in a task. For social media, I sort the work with one question: does this post need facts or feelings that only you can supply?",
        "These jobs suit an AI draft: turning your notes about an event into a caption, writing a short version for Instagram and a longer one for Facebook, listing post ideas from your calendar for the month, and giving you three wordings of one announcement so you can pick the best.",
        "Each of those jobs starts from information you already wrote down. The tool reshapes it, and you decide what goes up."
      ]
    },
    {
      "heading": "Put your facts in the prompt",
      "paragraphs": [
        "A model knows only its training data up to a cutoff date, plus whatever you type into the chat. It has no record of your hours, your menu, this weekend's special or the name of your new stylist. If you leave those out, the tool fills the space with general wording or with details that sound right and turn out wrong.",
        "AI Fluency calls the skill of stating your goal clearly Description. For a caption, a good description covers who the post is for, what you want them to do, the facts, an example and your limits. A prompt for a bakery might read: Write a Facebook caption for our regulars about pumpkin bread, available Friday and Saturday from 7 a.m. to noon. Keep it under 60 words, warm and plain, with no hashtags. Here is a past post I liked. Then paste the post.",
        "That prompt takes a minute to write. It saves you from rewriting a caption that guessed at your hours."
      ]
    },
    {
      "heading": "Write these posts yourself",
      "paragraphs": [
        "Some posts should come from you from the first word. A reply to an unhappy customer is one of them. That person wants to hear from the owner, and a polished paragraph from a chat tool can sound like a form letter at the worst moment.",
        "Posts about a specific customer or employee belong in this group too. Ask the person before you name them or share their photo, and write the post in your own words after they agree.",
        "The story of why you opened your business is the third. You lived it. A tool only has the summary you give it, so its version will carry less detail than yours."
      ]
    },
    {
      "heading": "Check every draft before you publish it",
      "paragraphs": [
        "Discernment is the AI Fluency term for judging how useful an output actually is. Models can state wrong things confidently, so I check every name, number and date in a draft against a source before I use it. For a business post, that source is your own calendar, price list or menu.",
        "Go through the draft line by line. Confirm that the weekday matches the date, because a tool can pair Friday with the wrong day of the month. Confirm the price, the address and the phone number. Delete any claim you could not back up if a customer asked about it, such as calling your shop the most popular in the county.",
        "Then read the caption out loud. If you would not say it to a customer at your counter, change the words until you would."
      ]
    },
    {
      "heading": "Keep customer details out of the chat window",
      "paragraphs": [
        "The last of the 4Ds is Diligence, which means owning responsibility for how you use AI and what you do with its output. A post goes out under your business name, so you answer for it whether you or a tool wrote the first draft.",
        "Diligence also covers what you type in. Keep customer names, phone numbers, order histories and passwords out of prompts unless your business has approved the tool and its settings for that kind of data. A caption almost never needs any of it."
      ]
    }
  ],
  "faq": [
    [
      "Can AI write all of my small business social media posts?",
      "An AI tool can draft most routine captions from your notes. Write replies to unhappy customers, posts about specific people and the story of your business yourself, and check every draft for names, dates and prices before you publish it."
    ],
    [
      "What should I put in a prompt for a social media caption?",
      "Give the tool the audience, what you want readers to do, the facts such as date, time and price, one example of a past post you liked, and your limits on length and hashtags."
    ],
    [
      "Is it safe to paste customer information into an AI tool?",
      "Keep customer names, phone numbers and order details out of the prompt unless your business has approved the tool and its settings for that data. A social media caption rarely needs them."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/ai-social-media-posts-what-to-hand-off" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/ai-social-media-posts-what-to-hand-off" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="2 November 2026, 4 minute read"
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
        slug: "ai-social-media-posts-what-to-hand-off",
        title: POST.title,
        description: POST.description,
        published: "2026-11-02",
      }} />
    </PostLayout>
  );
}
