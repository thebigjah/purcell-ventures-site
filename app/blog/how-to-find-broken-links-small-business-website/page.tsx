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
  "title": "How to find broken links on a small business website",
  "slug": "how-to-find-broken-links-small-business-website",
  "description": "Use Google Search Console's Pages report, a free link checker and your own phone to find broken links. Fix the Book now button before anything else.",
  "category": "Guide",
  "lede": "To find broken links on your site, open Google Search Console, go to Indexing, then Pages, and look for the Not found (404) row. Then tap every button on your own site from your phone. Start with Book now, because that button is where a ready customer actually books.",
  "sections": [
    {
      "heading": "Why one dead button matters more than a new look",
      "paragraphs": [
        "A redesign changes how your site looks. A Book now button that leads to an error page stops customers at the exact moment they decided to give you their business. They tap, they see a blank page or a 404 message, and they have nowhere to go next.",
        "You will rarely hear about it. The customer closes the tab and books with someone else. Your site can look great and still lose those people every day the button stays broken.",
        "That is why I check links before I talk about design with any owner. A new layout takes real time and money. A broken link usually takes minutes to fix, and once it works, customers can book again.",
        "Buttons break for ordinary reasons. You switch booking tools, your booking service changes its link format, you rename a page, or you delete an old promotion page that other pages still link to."
      ]
    },
    {
      "heading": "Start with Google Search Console",
      "paragraphs": [
        "Google Search Console is a free tool from Google that shows which pages on your site Google tried to load and could not. Go to search.google.com/search-console and add your website. Your site builder or web host will have a setting for verifying it, usually in the SEO or domain section.",
        "Once you are in, click Indexing in the left menu, then Pages. Scroll to the table called Why pages aren't indexed and look for a row that says Not found (404). Click that row to see the full list of dead addresses.",
        "This report shows what Google found while visiting your site, including old pages that other websites still link to. It does not test buttons that send people to another website, such as your booking page. The next two steps cover that."
      ]
    },
    {
      "heading": "Run a free link checker on every page",
      "paragraphs": [
        "The W3C Link Checker at validator.w3.org/checklink tests the links on your pages for free. Paste your home page address, check the box labeled Check linked documents recursively, and click Check. It reports every link that returns an error, including links to other websites.",
        "For a larger site, download Screaming Frog SEO Spider, which has a free version. Type your address in the bar at the top and click Start. When it finishes, open the Response Codes tab and set the filter to Client Error (4xx). That list shows every broken link and the page it sits on.",
        "Link checkers have one weak spot. Some booking buttons load through a script, and a checker can miss a problem there. Testing by hand catches what the tools miss."
      ]
    },
    {
      "heading": "Tap every important button on your phone",
      "paragraphs": [
        "Pick up your phone, turn off Wi-Fi so you use cellular data, and open your site in a private browsing window. In Safari, tap the tabs button and choose Private. In Chrome, tap the three dots and choose New Incognito tab. A private window matters because your browser may keep you signed in to your booking account, which can show you a working page that customers never see.",
        "Then tap each of these and confirm it does the right thing. Book now opens your live calendar. Call opens the dialer with your correct number. Directions opens a map at your real address. Menu, Order online and Services open current pages. Your contact form sends a test message that actually reaches your inbox.",
        "Do the same on a laptop. Write down anything that fails, along with the page it was on."
      ]
    },
    {
      "heading": "Check the links that live off your site",
      "paragraphs": [
        "Some customers never start on your website. They tap a link in your Google Business Profile, your Instagram bio or your Facebook page. Open each one and tap the website link and any booking or menu link. In your Google Business Profile, you can change these links from the Edit profile button.",
        "Scan every QR code you have printed, on menus, business cards, flyers and window signs. A QR code that points to a deleted page stays wrong until you either reprint it or set up a redirect."
      ]
    },
    {
      "heading": "Fix dead pages and set a monthly check",
      "paragraphs": [
        "For a broken button, log in to your booking service, copy the current public booking link, and paste it into the button's link setting in your site editor. Test it again on your phone right away.",
        "For a page you renamed or deleted, set up a 301 redirect from the old address to the closest page that still exists. On WordPress, the free Redirection plugin handles this. Squarespace, Wix and Shopify each have a URL redirects setting, and their help centers show where to find it.",
        "Then put a recurring reminder on your calendar for the first Monday of each month. Open the Search Console Pages report, tap Book now on your phone, and scan one QR code. That routine takes a few minutes and catches a dead button before it sits there for months."
      ]
    }
  ],
  "faq": [
    [
      "How do I find broken links on my website for free?",
      "Open Google Search Console, go to Indexing, then Pages, and look for the Not found (404) row. Then run the W3C Link Checker at validator.w3.org/checklink and finish by tapping every main button on your phone."
    ],
    [
      "Why should I test my Book now button in a private window?",
      "Your browser may keep you signed in to your booking account, which can show you a working page that customers never see. A private window shows the page the way a new customer sees it."
    ],
    [
      "What do I do about a page I deleted?",
      "Set up a 301 redirect from the old address to the closest page that still exists. WordPress sites can use the free Redirection plugin, and Squarespace, Wix and Shopify each have a URL redirects setting."
    ],
    [
      "How often should I check my site for broken links?",
      "Set a reminder for the first Monday of each month. On that day, check the Search Console Pages report, tap Book now on your phone and scan one of your printed QR codes."
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
  alternates: { canonical: "/blog/how-to-find-broken-links-small-business-website" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/how-to-find-broken-links-small-business-website",
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
        { name: POST.title, href: "/blog/how-to-find-broken-links-small-business-website" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="24 November 2026, 5 minute read"
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
        slug: "how-to-find-broken-links-small-business-website",
        title: POST.title,
        description: POST.description,
        published: "2026-11-24",
      }} />
    </PostLayout>
  );
}
