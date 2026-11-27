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
  "title": "Using AI to find what your website is missing",
  "slug": "using-ai-to-find-what-your-website-is-missing",
  "description": "Paste your real customer questions and your site's text into an AI chat tool and ask which questions the site never answers. Then check each gap yourself.",
  "category": "Guide",
  "lede": "An AI chat tool can compare the questions your customers actually ask with the words on your website and list what the site never answers. You collect the questions, paste in your page text, and then check every gap it reports against your own business before you change anything.",
  "sections": [
    {
      "heading": "Collect the questions customers already ask",
      "paragraphs": [
        "Before you open any AI tool, gather the questions people send you. Look through your Facebook Page inbox, your Instagram direct messages, your email, and the reviews on your Google Business Profile. Ask whoever answers your phone to write down every question callers ask for one week.",
        "Copy each question in the customer's own words. A salon client might type \"do you do color on curly hair\" while your site says \"texture services.\" The AI can only catch that mismatch if you keep the original wording.",
        "Remove names, phone numbers, email addresses and order details before you paste anything. Keep customer details out of your prompts unless your business has approved the tool and its settings for that kind of data."
      ]
    },
    {
      "heading": "Paste in the text your site shows today",
      "paragraphs": [
        "A chat tool knows what it learned before its training cutoff date, plus whatever you put in front of it. It may never have read your site, or it may remember an older version. Paste the current text yourself.",
        "Open each main page: home, services or menu, pricing, about, and contact. Select the text on the page, copy it, and paste it into one document. Type the page name above each block so the AI can tell you where an answer lives.",
        "Add your Google Business Profile description and your hours to the same document. Customers see those in search results, so they count as part of what you tell people."
      ]
    },
    {
      "heading": "Tell the AI exactly what to send back",
      "paragraphs": [
        "Anthropic's AI Fluency framework calls this step Description: stating your goal clearly enough that the tool can give you useful output. A loose request such as \"what is my website missing\" gets a loose list of marketing tips.",
        "Here is a prompt a tattoo shop could use: \"I run a tattoo shop in Tuscaloosa. Below are questions customers sent us, then the text of every page on our website. For each question, name the page that answers it and quote the exact sentence. If no page answers it, write NO ANSWER. Do not suggest new wording yet.\"",
        "Naming your type of business helps the tool read your industry's terms correctly. Asking for an exact quote gives you a fast way to check its work. Holding off on rewrites keeps the first answer short enough to review in one sitting."
      ]
    },
    {
      "heading": "Check every answer against your own pages",
      "paragraphs": [
        "AI tools can state wrong things with full confidence. A tool might tell you your pricing page covers deposits when the page says nothing about them.",
        "For each quote the AI gives you, open that page and press Ctrl+F on Windows or Command+F on a Mac. Search for a few words from the quote. If the sentence does not appear, treat that question as a gap.",
        "Then review every NO ANSWER item yourself. Your site may answer the question in different words that the tool missed. Mark each item as a real gap or already handled, and you end up with a short list you can trust."
      ]
    },
    {
      "heading": "Fill the gaps customers hit most",
      "paragraphs": [
        "Start with the questions you hear most often and the ones that stop someone from booking. Common examples include parking, payment methods, walk-in policy, deposits and accepted insurance plans.",
        "Put each answer where a customer would look for it. Parking and directions go on the contact page. Prices and deposits go on the services or menu page. A frequently asked questions page helps too, as long as the main pages also carry the most important answers.",
        "You can ask the AI to draft a short answer for each gap. Type in the real facts yourself, such as your actual deposit policy or the insurance plans you accept, and read the draft out loud before you publish it. Your business publishes that page, so you decide the final wording and you confirm every fact."
      ]
    },
    {
      "heading": "Keep the question list going",
      "paragraphs": [
        "Make a note on your phone called \"customer questions\" and add to it whenever someone asks something your staff had to explain. Have your front desk do the same.",
        "Run the comparison again with the new page text whenever you change your menu, prices, hours or services. Set a calendar reminder for the first Monday of each January as well, so the check still happens in a year with no big changes.",
        "This week, copy ten real customer questions from your inbox and reviews into that note. That gives you everything you need for your first comparison."
      ]
    }
  ],
  "faq": [
    [
      "Can I give the AI my website address instead of pasting the text?",
      "Some tools can open a web page and some cannot, and a tool may work from an older copy of your site. Pasting the current text from each page gives it exactly what customers see today."
    ],
    [
      "Is it safe to paste customer messages into an AI tool?",
      "Strip out names, phone numbers, email addresses and order details first and keep only the question. Paste customer details only if your business has approved the tool and its settings for that kind of data."
    ],
    [
      "What if the AI says a page answers a question but I cannot find the answer?",
      "Open the page and search for words from the quoted sentence with Ctrl+F or Command+F. If the sentence does not appear, the tool got it wrong, so add that question to your list of gaps."
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
  alternates: { canonical: "/blog/using-ai-to-find-what-your-website-is-missing" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/using-ai-to-find-what-your-website-is-missing",
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
        { name: POST.title, href: "/blog/using-ai-to-find-what-your-website-is-missing" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="27 November 2026, 4 minute read"
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
        slug: "using-ai-to-find-what-your-website-is-missing",
        title: POST.title,
        description: POST.description,
        published: "2026-11-27",
      }} />
    </PostLayout>
  );
}
