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
  "title": "What happens when your business domain lapses, and how to keep it renewed",
  "slug": "business-domain-lapse-renewal",
  "description": "When a domain registration expires, your site and email stop working and the name can go back on sale. Here is how to keep yours renewed.",
  "category": "Guide",
  "lede": "I build and fix websites for local businesses around Tuscaloosa through my company, Purcell Ventures. Every one of those sites depends on a domain name, the address customers type to reach it. A business never owns a domain outright. It registers the name through a company called a registrar for one year or more at a time, and the business has to renew it before it expires. When the renewal fails, the website and every email address on that domain stop working.",
  "sections": [
    {
      "heading": "What happens on the expiration date",
      "paragraphs": [
        "When a registration expires, the registrar usually points the domain to a parking page, so customers who type your address see an ad page or a notice in place of your site. Email sent to addresses on that domain stops arriving.",
        "Most registrars then hold the domain for a period during which the original owner can still renew it. After that, many registrars move the domain into a redemption period, when recovery is still possible but usually costs an extra fee. The length of each period and the fees vary by registrar and by the ending of the domain, such as .com or .net. Your registrar's renewal terms list the exact numbers."
      ]
    },
    {
      "heading": "Who can buy it next",
      "paragraphs": [
        "Once those periods end, the registry releases the name, and anyone can register it. Some registrars also auction expiring domains before release.",
        "A domain that once belonged to a working business still receives visits from old links, business directories and saved bookmarks. Domain investors watch for names like that. A new owner can point your old address at ads, at an unrelated site or at a page offering to sell the name back to you."
      ]
    },
    {
      "heading": "Find out who your registrar is and when the domain expires",
      "paragraphs": [
        "Go to lookup.icann.org and type your domain. The result shows the registrar's name and the expiration date. Write both down.",
        "Then log in to the registrar's website. If nobody at the business knows the login, use the registrar's account recovery page. A former web designer or employee may hold the account, and the sooner you find out, the more time you have to move it into your own name."
      ]
    },
    {
      "heading": "Four settings that keep it renewed",
      "paragraphs": [
        "Turn on auto renew in the registrar's dashboard. With auto renew on, the registrar charges the card on file before the expiration date.",
        "Check the card on file. Auto renew does nothing if the card has expired or the bank declines it. Put a reminder on your calendar a month before the card's expiration date to update it with the registrar.",
        "Update the contact email on the account to an address you read every day. Registrars send renewal notices and failed payment warnings to that address. If it points to an old employee's inbox, nobody sees the warning.",
        "Renew for several years at a time if your registrar allows it. A longer registration gives you more room before the next renewal date."
      ]
    },
    {
      "heading": "Lock the domain while you are in the account",
      "paragraphs": [
        "Most registrars offer a setting called registrar lock or transfer lock. It blocks anyone from moving the domain to another registrar without first unlocking it from your account. Turn it on and leave it on unless you plan a transfer."
      ]
    }
  ],
  "faq": [
    [
      "How do I check when my domain expires?",
      "Type your domain at lookup.icann.org. The result lists the expiration date and the registrar."
    ],
    [
      "Can I get my domain back after it expires?",
      "Often, if you act during the registrar's grace or redemption period. Call your registrar right away, because the window closes and the redemption fee can be high."
    ],
    [
      "Does my business email depend on the domain?",
      "Yes. Any address that ends in your domain stops receiving mail when the registration lapses."
    ],
    [
      "Who should own the registrar account?",
      "The business owner, in the business's name, with an email address the owner reads. A designer can have their own access without holding the account."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/business-domain-lapse-renewal" },
  title: { absolute: "What happens when your business domain lapses" },
  description: POST.description,
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/business-domain-lapse-renewal",
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
        { name: POST.title, href: "/blog/business-domain-lapse-renewal" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="9 November 2026, 3 minute read"
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
        slug: "business-domain-lapse-renewal",
        title: POST.title,
        description: POST.description,
        published: "2026-11-09",
      }} />
    </PostLayout>
  );
}
