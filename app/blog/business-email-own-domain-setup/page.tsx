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
  "title": "Business email at your own domain: why and how to set it up",
  "slug": "business-email-own-domain-setup",
  "description": "An address like you@yourbusiness.com shows customers the email comes from your business. Here is what setup takes: a domain, a mail host and DNS records.",
  "category": "Guide",
  "lede": "A customer sees the part after the @ before they read your message. An address at your own domain, like info@yourbusiness.com, matches your website and shows the email came from your business. Setting one up takes a domain you own, a mail host, and a few DNS records.",
  "sections": [
    {
      "heading": "What the customer sees in the from line",
      "paragraphs": [
        "When your email arrives in a customer's inbox, their mail app shows your name and your address. The address tells them who sent it. A message from info@yourbusiness.com matches the name on your sign, your website and your invoices.",
        "A free webmail address shows the provider's name after the @. Anyone can open a free account with your business name in it, so a customer has no easy way to tell your real account from a copy. That matters most when you send invoices, payment links or appointment changes, because scammers like to fake those emails.",
        "Your domain also keeps every reply, search and saved contact tied to your business name in the customer's inbox."
      ]
    },
    {
      "heading": "Who controls the address when someone leaves",
      "paragraphs": [
        "With a free account, whoever knows the password controls the inbox. If the person who set it up leaves, or loses access to the recovery phone number, you can lose years of customer messages.",
        "With your own domain, you hold the admin account. You can add a mailbox for a new hire, reset a password, or shut off a mailbox the day someone leaves. You can also send a former employee's mail to another person so customers still get an answer.",
        "I suggest role addresses like booking@, billing@ or info@ for anything customers save. The address stays the same when your staff changes."
      ]
    },
    {
      "heading": "The three pieces you need",
      "paragraphs": [
        "First, a domain. If you have a website, you probably own one already. Log in to the company where you bought it, such as GoDaddy, Namecheap, Squarespace Domains or Cloudflare, and confirm it renews on a card that still works. You can own a domain and use it for email even before you have a website.",
        "Second, a mail host. This service stores your mail and gives you an inbox. Google Workspace and Microsoft 365 are the two I set up most often. Both charge a monthly fee for each mailbox, and both include a calendar and file storage.",
        "Third, DNS records. These settings live at your domain company and tell the rest of the internet where to deliver your mail. The mail host gives you the exact values to copy in.",
        "Before you buy anything, check whether your website host already included email with your plan. You may have mailboxes waiting that nobody turned on."
      ]
    },
    {
      "heading": "Setting it up in Google Workspace or Microsoft 365",
      "paragraphs": [
        "In Google Workspace, you sign up with your domain, and the setup screens ask you to prove you own it. Google gives you a TXT record to paste into your DNS. After Google checks that record, the Activate Gmail step gives you the MX record that sends your mail to Google.",
        "In Microsoft 365, open the admin center, go to Settings, then Domains, and click Add domain. The setup screens cover the same two jobs: a TXT record to prove ownership, then an MX record and a few others for mail.",
        "If your domain sits at a company like GoDaddy, Cloudflare or Squarespace, both hosts can often add the records for you after you sign in to your domain account.",
        "Workspace mailboxes open in the same Gmail app you already use. Microsoft 365 mailboxes open in Outlook. Your phone's mail app can add either one.",
        "Before you switch, look at the MX records already in your DNS. Old MX records that point to another service can split your mail between two places. Remove them when your new host's setup screen tells you to."
      ]
    },
    {
      "heading": "Check that receiving servers trust your mail",
      "paragraphs": [
        "Mail servers look up three DNS records to decide whether a message really came from you. SPF lists the services allowed to send mail as your domain. DKIM adds a signature to each message. DMARC tells receiving servers what to do when a message fails those checks.",
        "Your mail host gives you the SPF and DKIM values. In the Google Admin console, turn on DKIM under Apps, then Google Workspace, then Gmail, then Authenticate email. In Microsoft 365, find it in the Microsoft Defender portal under Email authentication settings. For DMARC, add a TXT record named _dmarc and use the starter value from your mail host's help page.",
        "Now test it. Send an email from your new address to a personal Gmail account. Open it, click the three dots next to Reply, and choose Show original. Look at the lines for SPF, DKIM and DMARC. Each one should say PASS. A FAIL means the matching DNS record needs a fix.",
        "Your booking system, invoicing software or newsletter tool may also send mail in your name. Each one needs its own SPF entry or DKIM setup, and its help pages list the exact records."
      ]
    },
    {
      "heading": "Put the new address everywhere customers look",
      "paragraphs": [
        "Once mail arrives and the test passes, update every place a customer finds your email: your website contact page and footer, your Google Business Profile, your Facebook and Instagram pages, your invoices and estimates, your email signature, and your business cards when you reorder.",
        "Keep the old free account open and forward its mail to the new address. In Gmail, that option sits under Settings, See all settings, then Forwarding and POP/IMAP. Turn on the vacation responder in the old account with a short note that gives your new address, so regular customers update their contacts.",
        "Your task this week: open your Google Business Profile and your website contact page and read the email address on each. If it ends in a free provider, log in to your domain company and look for MX records. That tells you whether you already have mail set up or need to start with a mail host."
      ]
    }
  ],
  "faq": [
    [
      "Do I need a website to get email at my own domain?",
      "No. You need a domain and a mail host such as Google Workspace or Microsoft 365. You can add a website on the same domain later."
    ],
    [
      "Can I keep using the Gmail app with a business address?",
      "Yes. Google Workspace mailboxes open in the regular Gmail app and website. Microsoft 365 mailboxes open in Outlook, and your phone's mail app can add either one."
    ],
    [
      "How do I check that my business email is set up correctly?",
      "Send a message from your business address to a personal Gmail account, open it, click the three dots next to Reply and choose Show original. SPF, DKIM and DMARC should each say PASS."
    ],
    [
      "What should I do with my old free email address?",
      "Keep it open, forward its mail to your new address, and turn on a vacation responder that gives customers the new address. Close it only after you update your website, Google Business Profile and invoices."
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
  alternates: { canonical: "/blog/business-email-own-domain-setup" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/business-email-own-domain-setup",
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
        { name: POST.title, href: "/blog/business-email-own-domain-setup" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="21 November 2026, 5 minute read"
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
        slug: "business-email-own-domain-setup",
        title: POST.title,
        description: POST.description,
        published: "2026-11-21",
      }} />
    </PostLayout>
  );
}
