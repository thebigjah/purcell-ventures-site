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
  "title": "How to find out who controls your domain, hosting and website login",
  "slug": "who-controls-your-domain-hosting-and-login",
  "description": "How a local business owner can find out who holds the domain, hosting and site login today, and how to move all three into the owner's own name.",
  "category": "Business",
  "lede": "Three accounts decide who controls a business website: the domain registration, the hosting and the login for the site itself. Whoever holds those accounts can renew, change or take down your site. Here is how to find out who holds each one today and how to move all three into your own name.",
  "sections": [
    {
      "heading": "Find your domain registrar",
      "paragraphs": [
        "Owners often find out who holds these accounts only when a designer moves away or a renewal email goes to an old address. I build and fix websites for local businesses around Tuscaloosa. Your domain is the address customers type, such as yourshop.com. You rent it from a company called a registrar, such as GoDaddy, Namecheap, Squarespace or Cloudflare.",
        "Go to lookup.icann.org, the free lookup tool from ICANN, the organization that coordinates domain names. Type in your domain. The result lists the registrar, the date the registration expires and the name servers. The owner's name and email often show as redacted for privacy, which is normal.",
        "Write down the registrar and the expiration date. Then log in to that registrar with the account you think holds the domain. If you cannot find the domain in any account you control, someone else holds it."
      ]
    },
    {
      "heading": "Find your hosting company",
      "paragraphs": [
        "Hosting is the server that stores your site's files and sends them to visitors. The name servers from the ICANN lookup show where your domain's settings live, and they often point to the hosting company. Names that include wixdns, squarespacedns or a host's brand name the company directly.",
        "If you use an all-in-one builder such as Wix or Squarespace, the builder is also your host. If the name servers point to Cloudflare or to your registrar, the host sits one step further along, and your web designer or the registrar's DNS settings page can tell you which company it is."
      ]
    },
    {
      "heading": "Find who holds the site login",
      "paragraphs": [
        "The site login is the account you use to edit pages. For WordPress, the login page usually sits at your domain followed by /wp-admin. For Wix and Squarespace, it is the account on the builder's own website.",
        "Try to log in. If you can, open the user list and look at every account with administrator access. If you cannot, use the forgot password link and note which email address receives the reset message. That address belongs to whoever controls the site."
      ]
    },
    {
      "heading": "Why each account belongs in your name",
      "paragraphs": [
        "The person who holds the domain account controls where your address points and whether it renews. If a renewal fails because the card on file expired or the reminder went to a former employee, the domain can lapse, and after the registrar's grace period anyone can register it.",
        "The same goes for hosting and the site login. A designer who holds them can do good work for years, and you still depend on that person to make any change or to hand the accounts over if the arrangement ends. Holding the accounts yourself lets you bring in help on your own schedule."
      ]
    },
    {
      "heading": "Move the accounts into your name",
      "paragraphs": [
        "Create one business email address you will keep for years, such as one on your own domain or a dedicated Gmail account. Use it for the registrar, the host and the site login.",
        "Ask whoever holds each account to transfer ownership to you or to add you as the owner and then remove themselves. Registrars and hosts each have a documented process for moving an account or a domain to a new owner. For the site login, ask for an administrator account in your name.",
        "Once you have access, turn on auto-renew for the domain, put a current card on file and turn on two-step verification for each account. Store every login in a password manager and keep a note of the registrar, host and expiration date where someone you trust can find it."
      ]
    }
  ],
  "faq": [
    [
      "How do I find out who my domain registrar is?",
      "Type your domain into lookup.icann.org. The result shows the registrar, the expiration date and the name servers. The owner's contact details often show as redacted for privacy."
    ],
    [
      "How can I tell which company hosts my website?",
      "Check the name servers in the ICANN lookup, which often point to the host. If you use Wix or Squarespace, the builder is your host. Otherwise your web designer or your registrar's DNS settings can tell you."
    ],
    [
      "Why should a business owner hold the website logins?",
      "The holder of the domain, hosting and site login controls renewals and changes. Holding them in your own name lets you renew on time and bring in help whenever you choose."
    ],
    [
      "What should I do after I get access to my domain?",
      "Turn on auto-renew, put a current card on file, turn on two-step verification and store the login in a password manager."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/who-controls-your-domain-hosting-and-login" },
  title: { absolute: "Who controls your domain, hosting and website login" },
  description: POST.description,
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/who-controls-your-domain-hosting-and-login",
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
        { name: POST.title, href: "/blog/who-controls-your-domain-hosting-and-login" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="7 November 2026, 4 minute read"
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
        slug: "who-controls-your-domain-hosting-and-login",
        title: POST.title,
        description: POST.description,
        published: "2026-11-07",
      }} />
    </PostLayout>
  );
}
