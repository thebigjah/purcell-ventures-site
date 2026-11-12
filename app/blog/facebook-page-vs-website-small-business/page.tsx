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
  "title": "Facebook page vs website: what a small business needs",
  "slug": "facebook-page-vs-website-small-business",
  "description": "A Facebook page covers hours, messages and reviews, but it misses search and visitors without Facebook. Here is when a one-page website makes sense.",
  "category": "Guide",
  "lede": "A Facebook page can carry your hours, phone number, photos, messages and reviews. It leaves out three things: search, visitors who have no Facebook account, and control of your own information. A one-page site makes sense once customers tell you they could not find your hours, menu or prices.",
  "sections": [
    {
      "heading": "What a Facebook page already handles",
      "paragraphs": [
        "A Facebook page gives you a free place to list your address and phone number, answer customer messages, share photos and collect recommendations.",
        "Before you spend anything on a website, make sure the page itself is complete. Open your page, go to the About tab and check the contact info and hours. Then look at the action button under your cover photo. Set it to Call now, Send message or Book now, whichever matches how customers reach you.",
        "If your regulars all follow you there and you rarely need strangers to find you, the page may cover what you need for now."
      ]
    },
    {
      "heading": "Who a Facebook page leaves out",
      "paragraphs": [
        "Some of your customers have no Facebook account, and some stay logged out on purpose. Facebook often shows those visitors a sign-in box once they start scrolling, and some of them close the tab right there.",
        "Check this yourself. On a computer, open a private window. In Chrome, click File, then New Incognito Window. In Safari, click File, then New Private Window. Paste in your page's address and scroll the way a stranger would. Note whether you can still read your hours and phone number after the sign-in box appears."
      ]
    },
    {
      "heading": "What Google shows when someone searches for you",
      "paragraphs": [
        "A new customer may start on Google, with a search such as your business name plus hours, or a service plus Tuscaloosa.",
        "Your Facebook posts slide down the page as you add new ones, so last month's price change ends up under this week's photos. A menu or price list you post as a photo holds words that search engines may not read at all. A menu you type onto a web page holds text that Google, screen readers and translation tools can all use.",
        "Run two searches this week in a private window. First, search your business name plus the word hours and see whether the top results show your current hours. Second, copy one sentence from a recent post, put it in quotation marks and search for it. If Google returns nothing, a searcher has no way to reach that post from Google."
      ]
    },
    {
      "heading": "What you give up when Facebook holds everything",
      "paragraphs": [
        "Facebook sets the layout, the rules and the login. If the one person who manages the page loses access to their personal account, or Facebook locks that account, the business can lose its page along with it.",
        "Open your page, go to Settings, then Page setup, then Page access. Confirm that at least one other person you trust has full control, so a single locked account cannot shut you out.",
        "A Facebook page also cannot give you an email address at your own domain, such as hello@yourbusiness.com, and it limits how you can lay out a booking form, a price list or a menu."
      ]
    },
    {
      "heading": "Signs a one-page site makes sense for you",
      "paragraphs": [
        "You answer the same question in Messenger again and again, such as your prices, your hours on holidays or where to park.",
        "A customer tells you they searched and found an old phone number, the wrong hours or a different business instead of yours.",
        "Your Google Business Profile has an empty website field, or that field points to your Facebook page. To check, search your business name on Google while signed in, click Edit profile, then Contact.",
        "You want online booking, a quote request form or a business email address.",
        "For the cost side, get a written quote for the domain, hosting and build. Then write down what one new customer usually spends with you. If a few new customers in a year would cover the quote, the math favors the site."
      ]
    },
    {
      "heading": "What to put on one page",
      "paragraphs": [
        "A one-page site can hold everything a new customer needs before they call. When I build one, I put the business name, address, phone number and hours near the top as plain text, so search engines and phones can read them. A tap on the phone number starts a call.",
        "Below that I add the services or menu as text, with prices if the owner lists them, a few photos, a map of the location, and a button to call, book or send a message. A link to the Facebook page lets people keep following updates there.",
        "Once the site goes live, add its address in two places. In your Google Business Profile, open Edit profile, then Contact, then Website. On Facebook, open your page's About tab and fill in the website field. Each one then sends people to the other."
      ]
    }
  ],
  "faq": [
    [
      "Is a Facebook page enough for a small business?",
      "It can be enough for a business whose customers already follow the page and rarely look it up on Google. Test it by opening the page in a private browser window and searching your business name plus hours. If either test turns up missing or outdated details, the page alone leaves gaps."
    ],
    [
      "Can people without Facebook see my business page?",
      "They can usually see part of it, and Facebook often covers the page with a sign-in box as they scroll. Open the page in a private or incognito window to see exactly what a logged-out visitor gets."
    ],
    [
      "What should a one-page business website include?",
      "Your business name, address, phone number and hours as plain text, your services or menu with prices if you share them, a few photos, a map, and a button to call, book or message. Link the site from your Google Business Profile and your Facebook page."
    ],
    [
      "Should I delete my Facebook page once I have a website?",
      "Keep it. Customers still message you, follow your updates and leave recommendations there. Add your website address to the page's About tab so people can move between the two."
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
  alternates: { canonical: "/blog/facebook-page-vs-website-small-business" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/facebook-page-vs-website-small-business",
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
        { name: POST.title, href: "/blog/facebook-page-vs-website-small-business" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="12 November 2026, 5 minute read"
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
        slug: "facebook-page-vs-website-small-business",
        title: POST.title,
        description: POST.description,
        published: "2026-11-12",
      }} />
    </PostLayout>
  );
}
