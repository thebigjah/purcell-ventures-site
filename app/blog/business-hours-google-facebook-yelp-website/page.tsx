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
  "title": "Business hours on Google, Facebook, Yelp and your website",
  "slug": "business-hours-google-facebook-yelp-website",
  "description": "Keep your business hours identical on Google, Facebook, Yelp and your website. Here is where each setting lives and a monthly routine to keep them in sync.",
  "category": "Guide",
  "lede": "Your business hours need to say the same thing on Google, Facebook, Yelp and your website, because customers trust whichever one they find first. Keep one master list of your hours, update your own site first, and copy those exact hours into every other listing on the same day.",
  "sections": [
    {
      "heading": "What happens when your hours disagree",
      "paragraphs": [
        "A customer who wants a haircut at 6 p.m. on a Tuesday does one quick search. They might land on your Google listing, your Facebook Page, your Yelp page or your own website. They read the hours on that one page and make their plan. They have no reason to check a second place.",
        "If that page says you close at 7 and you really close at 5, they drive over and find a locked door. That person remembers the wasted trip. Some of them leave a review about it on the same page that gave them the wrong hours.",
        "The reverse hurts you too. If Facebook says you close at 5 and you stay open until 7, the evening customer picks another shop and you never hear about it.",
        "Google also lets the public suggest edits to your Business Profile, including your hours, and Google can apply those suggestions. When your listings disagree with each other, customers have more reason to suggest a change, and the change they suggest might be wrong."
      ]
    },
    {
      "heading": "Write one master list first",
      "paragraphs": [
        "Before you touch any profile, open a note on your phone or a single document and write out your hours exactly the way you want customers to read them. Include every day of the week, your opening and closing times, and the days you stay closed.",
        "Add a second part for anything that changes your schedule: holidays, inventory days, summer hours, or home football weekends if you open late or close early for them. Write the dates next to each one.",
        "Then write down who has the login for Google, Facebook, Yelp and your website. When I help a local business fix its hours, this list is the first thing I ask for. If the only person with the Facebook or Yelp password no longer works for you, start recovering that account this week, before you need to change your hours in a hurry."
      ]
    },
    {
      "heading": "Where to change your hours on each site",
      "paragraphs": [
        "Start with your own website. Hours tend to show up in more than one spot, such as the footer, the Contact page, the homepage and a booking widget. Open each page in your browser, press Ctrl+F (Command+F on a Mac), and search for your closing time so you catch every copy.",
        "For Google, sign in with the account that manages your Business Profile, search your business name on Google, and click Edit profile. Open Hours, set each day, and save. The Special hours option sits in the same area.",
        "On Facebook, switch into your Page, open the About tab, find Hours, and click the pencil icon to edit them.",
        "For Yelp, log in at biz.yelp.com, open Business information, and edit Hours. Yelp has its own Special hours setting for specific dates.",
        "If you have claimed your listing in Apple Business Connect, update your hours there too. Apple Maps comes as the default map app on every iPhone, so plenty of customers will see that listing before any of the others."
      ]
    },
    {
      "heading": "Enter holiday hours ahead of time",
      "paragraphs": [
        "Holidays cause a lot of hour mix-ups. Your regular hours stay correct, and the one-day change never makes it to every listing.",
        "Google and Yelp both let you enter Special hours for a specific date, and both switch back to your regular hours once that date passes. On Facebook, post an update on your Page about the holiday schedule. On your website, add a short line near the top of the homepage with the dates and times.",
        "Enter all of your holiday hours in one sitting. Mid-November works well for this. Add Thanksgiving, Christmas Eve, Christmas Day, New Year's Eve and New Year's Day now, while you have your calendar in front of you."
      ]
    },
    {
      "heading": "A monthly check that keeps them in sync",
      "paragraphs": [
        "Pick one day each month, such as the first Monday, and put it on your calendar with a reminder.",
        "On that day, open a private browsing window so you see what a customer sees. Search your business name on Google, then open your Facebook Page, your Yelp page and your own website. Hold your master list next to each one and compare every day of the week, one by one.",
        "In your Google Business Profile, look for a notice that Google updated your profile. Review any change it made from a public suggestion and reject the ones that are wrong.",
        "Fix anything that disagrees with your master list. Work in the same order every time: website, then Google, then Facebook, then Yelp. Following the same order makes it easy to notice when you skipped one.",
        "Before you close the window, look at next month on your calendar. If a holiday or a closure is coming, enter the special hours now while you still have every account open."
      ]
    }
  ],
  "faq": [
    [
      "Which listing should I update first when my hours change?",
      "Update your own website first, then copy the exact same hours into Google Business Profile, Facebook and Yelp on the same day. Working in the same order every time makes it easy to spot a listing you skipped."
    ],
    [
      "How do I set holiday hours on Google?",
      "Sign in to the account that manages your Business Profile, search your business name on Google, click Edit profile, open Hours, and add Special hours for the date. Google goes back to your regular hours after that date passes."
    ],
    [
      "How often should I check my business hours online?",
      "Check once a month on a set day, such as the first Monday. Open a private browsing window, look at Google, Facebook, Yelp and your website, and compare each one against your master list of hours."
    ],
    [
      "What should I do if I cannot log in to my Facebook or Yelp page?",
      "Start recovering the account this week, before you need to change your hours in a hurry. Try the password reset first, and if the login belonged to a former employee, follow that platform's steps for regaining access to a business page."
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
  alternates: { canonical: "/blog/business-hours-google-facebook-yelp-website" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/business-hours-google-facebook-yelp-website",
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
        { name: POST.title, href: "/blog/business-hours-google-facebook-yelp-website" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="17 November 2026, 5 minute read"
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
        slug: "business-hours-google-facebook-yelp-website",
        title: POST.title,
        description: POST.description,
        published: "2026-11-17",
      }} />
    </PostLayout>
  );
}
