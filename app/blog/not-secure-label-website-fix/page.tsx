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
  "title": "What the \"Not secure\" label next to your website means, and how to fix it",
  "slug": "not-secure-label-website-fix",
  "description": "Why Chrome shows \"Not secure\" next to your business web address, and the steps to fix it on a typical small business host this week.",
  "category": "Guide",
  "lede": "Open your business website in Google Chrome and look at the left edge of the address bar. If you see the words \"Not secure,\" every customer who visits sees them too. I build and fix websites for local businesses around Tuscaloosa, and this label comes up often. The fix usually fits inside an afternoon. This post explains what the label means, why browsers show it, and how to clear it on the kind of hosting most small businesses use.",
  "sections": [
    {
      "heading": "What the label tells your visitors",
      "paragraphs": [
        "Every website address starts with either http or https. The s at the end stands for secure. When a site uses https, the browser and your web server scramble the information that passes between them. Someone on the same coffee shop Wi-Fi cannot read it.",
        "When a site uses plain http, that information travels as readable text. Chrome puts \"Not secure\" next to the address to warn the visitor. Safari, Firefox and Edge show their own warnings, and they show stronger ones on pages with a form.",
        "Click the label in Chrome and a small panel opens. It tells the visitor to avoid entering passwords or credit card numbers on the page. That message sits one click away from anyone who wonders whether your site is safe."
      ]
    },
    {
      "heading": "Why browsers show it on a site that sells nothing",
      "paragraphs": [
        "Owners often tell me their site has no checkout, so the warning should not matter. The browser has no way to know what your site sells. It shows the same label on a church homepage that it shows on a payment page.",
        "Your contact form, appointment request and newsletter signup all collect names, phone numbers and email addresses. Without https, that information travels as readable text. A customer who sees the warning right before typing their phone number has a reason to close the tab and call someone else.",
        "Google also uses https as a small signal when it ranks pages. I can't promise any change in search position from fixing it. Leaving the warning up does give visitors one more reason to leave."
      ]
    },
    {
      "heading": "What fixing it involves",
      "paragraphs": [
        "The fix has three parts. First, your site needs an SSL certificate. That is a small file on your web server that proves your site belongs to your domain and lets the browser use https.",
        "Second, your site needs to send every visitor to the https version, even if they type the old http address. Third, every image, script and link inside your pages needs to load over https too.",
        "Most hosts hand out free certificates from Let's Encrypt, a nonprofit certificate provider. A basic business site rarely needs a paid certificate. If your host offers to sell you one, ask whether they have a free option first."
      ]
    },
    {
      "heading": "Doing it on a cPanel host",
      "paragraphs": [
        "Many budget hosts give you a control panel called cPanel. Log in to your hosting account and open it.",
        "Find the Security section and click SSL/TLS Status. You will see a list of your domains, both with and without www. If any show a red warning, click Run AutoSSL. AutoSSL requests a free certificate and installs it for you. Give it a few minutes, then refresh the page.",
        "Next, go back to the cPanel home screen and click Domains. Find your domain in the list and turn on the toggle in the Force HTTPS Redirect column. That sends anyone who types the http address to the https version.",
        "If your host uses a different panel, search their help pages for \"free SSL\" and \"force HTTPS.\" The button names change from host to host. The two steps stay the same.",
        "If your site runs on Wix or Squarespace, the platform supplies the certificate once your domain connects. If you still see the warning there, compare your domain settings against their domain setup guide and contact their support."
      ]
    },
    {
      "heading": "WordPress and mixed content",
      "paragraphs": [
        "If your site runs on WordPress, log in and go to Settings, then General. Change both the WordPress Address (URL) and Site Address (URL) fields so they start with https. Click Save Changes. You may need to log in again afterward.",
        "Then check for mixed content. Mixed content happens when a page loads over https but pulls an image or script over plain http. Chrome may block those files or show a warning instead of the padlock.",
        "To find them, right-click the page in Chrome, choose Inspect, and click the Console tab. Any line that mentions Mixed Content names the file still loading over http. Edit that page or setting and change the address to https.",
        "Older sites with lots of posts can hold many of these links. A free plugin called Better Search Replace can swap your old http address for the https one across the whole database. Make a full backup before you run it."
      ]
    },
    {
      "heading": "Your checklist for this week",
      "paragraphs": [
        "Open your site in Chrome on your phone and on a computer. Look at the address bar on your homepage, your contact page and any page with a form.",
        "Type your address with www and without it. Then type it again starting with http:// and confirm the browser lands on the https version.",
        "Put a reminder on your calendar to check again in a few months. Free certificates renew on their own, but renewal can fail if someone changes your domain settings."
      ]
    }
  ],
  "faq": [
    [
      "What does \"Not secure\" mean next to my website address?",
      "It means your site loads over plain http instead of https. Information that visitors type into your site travels as readable text, so Chrome warns them. Adding an SSL certificate and redirecting to https removes the label."
    ],
    [
      "Do I need to pay for an SSL certificate?",
      "Most small business sites can use a free certificate from Let's Encrypt. Many hosts that use cPanel install one through the AutoSSL button under SSL/TLS Status. Ask your host about a free option before buying one."
    ],
    [
      "I installed a certificate but still see a warning. What now?",
      "Check two things. First, turn on Force HTTPS Redirect so visitors who type http land on https. Second, open Chrome's Inspect tool, click Console, and look for Mixed Content lines that point to images or scripts still loading over http."
    ],
    [
      "Does my site need https if it does not sell anything?",
      "Yes. Contact forms, booking requests and newsletter signups collect names, phone numbers and email addresses. Browsers show the warning on any http page regardless of what the site sells, and customers see it before they decide to reach out."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/not-secure-label-website-fix" },
  title: { absolute: POST.title + " | Elijah Purcell" },
  description: POST.description,
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: POST.title, href: "/blog/not-secure-label-website-fix" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">{POST.category} · October 24, 2026 · 5 min read</div>
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

          <PostFaq qa={POST.faq} />

          <PostByline post={{
            slug: "not-secure-label-website-fix",
            title: POST.title,
            description: POST.description,
            published: "2026-10-24",
          }} />
        </article>
      </main>
    </div>
  );
}
