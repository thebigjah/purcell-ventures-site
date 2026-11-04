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
  "title": "Three ways to work with AI: automation, augmentation and agency",
  "slug": "automation-augmentation-agency-explained",
  "description": "What automation, augmentation and agency mean in Anthropic's AI Fluency framework, with one small business example for each.",
  "category": "Guide",
  "lede": "Anthropic's AI Fluency framework names three ways a person can work with AI: automation, augmentation and agency. I completed 12 Anthropic Academy courses, including AI Fluency: Framework & Foundations, and I use these three terms when I plan work that involves AI.",
  "sections": [
    {
      "heading": "Automation for routine tasks",
      "paragraphs": [
        "In automation, AI carries out defined instructions. You know exactly what you want, you spell it out, and the tool does it. You do the planning before you send the prompt.",
        "A salon owner who pastes in a list of services with prices and asks for a clean table for the website is using automation. So is a contractor who pastes three paragraphs of job notes and asks for a five-line summary for the customer.",
        "Automation works best on tasks you could do yourself but would rather skip. You already know what the right answer looks like, so checking the result takes a quick read. Compare every price, name and date in the output with what you pasted in, because a model can change a number while it reformats the text."
      ]
    },
    {
      "heading": "Augmentation for decisions",
      "paragraphs": [
        "In augmentation, a person and AI think together. You start without a finished answer and work toward one over several turns of conversation.",
        "A restaurant owner deciding how to announce new hours might ask for five ways to word the notice, push back on the ones that sound stiff, add a detail about the reason for the change, and ask for a shorter version. A shop owner choosing a name for a new service might list ideas, ask the tool what each one suggests to a customer, and cut the list down together.",
        "You stay in charge of every decision here. The tool offers options and reasons, and you judge them. AI Fluency calls that judgment Discernment: deciding how useful an output actually is before you act on it."
      ]
    },
    {
      "heading": "Agency for repeated work",
      "paragraphs": [
        "In agency, a person sets AI up to do future tasks on their behalf. You do the setup once, and the AI handles each new case as it comes.",
        "I built COSMIC, a system of AI agents for my company's outreach. It finds local businesses whose websites have no https or a layout that does not fit a phone, checks each site and drafts the outreach email. I set those agents up once, and they now do that work on my behalf.",
        "For a small business, agency could mean a tool you configure to sort incoming emails into folders or to draft replies to common questions for you to approve. Agency needs the most careful setup of the three modes, because the AI acts without you watching each step. Give it narrow tasks, review what it produced on a regular schedule, and keep a person in the approval step for anything a customer will see."
      ]
    },
    {
      "heading": "How to pick the right mode for a task",
      "paragraphs": [
        "Start with automation. Pick one task you repeat every week that follows the same steps, such as formatting a menu update or summarizing job notes. Because you already know the right answer, a mistake in the output is easy to spot and cheap to fix.",
        "Move to augmentation for decisions where you want more options than you can come up with alone, such as wording a sensitive announcement or planning a seasonal promotion. Keep the final call yourself.",
        "Save agency for work you understand well enough to write down every step. If you cannot describe the job in a short list of instructions, the AI cannot carry it out on its own either."
      ]
    },
    {
      "heading": "The checks that apply in every mode",
      "paragraphs": [
        "Models can state wrong things confidently, so every name, number, date and quote in an output needs a check against a source before you use it. A model also knows only its training data up to a cutoff date plus what you give it, so supply your current prices, hours and policies in the prompt.",
        "Keep private data, passwords and customer details out of prompts unless your business has approved the tool and its settings for that data."
      ]
    }
  ],
  "faq": [
    [
      "Who created the AI Fluency framework?",
      "Anthropic teaches the AI Fluency framework in its Anthropic Academy courses. Professors Rick Dakan and Joseph Feller developed it with Anthropic."
    ],
    [
      "Do I need special software for these three modes?",
      "A standard chat tool such as Claude covers automation and augmentation. Agency usually involves a tool you configure to run on its own, such as an email sorting rule or a system of agents."
    ],
    [
      "Which task should I give AI first?",
      "Pick a weekly task that follows the same steps and whose correct result you already know, such as summarizing job notes for a customer."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/automation-augmentation-agency-explained" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/automation-augmentation-agency-explained" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="4 November 2026, 4 minute read"
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
        slug: "automation-augmentation-agency-explained",
        title: POST.title,
        description: POST.description,
        published: "2026-11-04",
      }} />
    </PostLayout>
  );
}
