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
  "title": "One-page website for a local business: what to include",
  "slug": "one-page-website-local-business-what-to-include",
  "description": "A one-page website needs your services, area, hours, phone, address, reviews and a booking button. It can skip blogs, team bios and long about pages.",
  "category": "Guide",
  "lede": "A one-page website for a local service business needs six things on one scroll: what you do, where you do it, how to call or book, your services, proof from real customers, and your hours and address. You can leave out blogs, staff bios, long histories and pop-ups.",
  "sections": [
    {
      "heading": "Start with what you do and where",
      "paragraphs": [
        "The top of the page is the part every visitor sees. I put four things there: your business name, one sentence that says what you do, the town or area you serve, and one button.",
        "Write that sentence with the words your customers type into Google. Hair salon in Northport tells a visitor more than a clever tagline. Someone who lands on your page should know at a glance whether you do the job they need.",
        "Pick one button for the main action. A restaurant might use Order online. A contractor might use Call for a quote. On phones, the call button needs a tel: link so one tap opens the dialer. Ask whoever runs your site to set the link as tel: followed by your number."
      ]
    },
    {
      "heading": "List your services in plain words",
      "paragraphs": [
        "Next comes a short list of what you offer. Use the names customers use. A dentist might list cleanings, fillings, crowns and emergency visits. A tattoo shop might list custom pieces, flash, cover-ups and touch-ups.",
        "Give each service one or two sentences. If you post prices, keep them current. If prices change from job to job, tell customers how to get a quote, such as calling you or texting you a photo.",
        "Keep every service as real text on the page. Google reads text. It cannot read words inside a picture of your flyer, and neither can a customer who zooms in on a small phone screen."
      ]
    },
    {
      "heading": "Show proof from real customers",
      "paragraphs": [
        "Add a few short reviews from real customers. Include the first name and the service they got, such as Maria, color and cut. Ask the customer before you quote them by name.",
        "You can also link to your Google Business Profile so visitors can read every review there. In your profile, open Ask for reviews to copy a direct link you can use on your site.",
        "Use your own photos. A picture of your actual dining room, your chair, or a deck you finished tells visitors what they will get. Phone photos shot in daylight work fine. Skip stock photos of smiling strangers."
      ]
    },
    {
      "heading": "Put hours, address and phone in text",
      "paragraphs": [
        "Place your hours, street address and phone number near the bottom of the page in plain text. Repeat the phone number at the top so nobody has to scroll to call you.",
        "Match all three to your Google Business Profile exactly. If your profile says Suite B and your website leaves it out, fix one so they agree. A customer who sees two different sets of hours has to guess which one to trust.",
        "Add a map. On a computer, open Google Maps, search your business, click Share, then Embed a map, and copy the code into your site. Squarespace has a Map block and Wix has a Google Maps element, and both only need your address.",
        "When you set holiday hours in Google, update the website the same day."
      ]
    },
    {
      "heading": "What a one-page site can leave out",
      "paragraphs": [
        "A blog. A blog helps when you will write for it on a schedule. An empty blog with one old post makes a business look closed.",
        "A bio for every staff member. One line about the owner and a photo is enough for most shops.",
        "A long history section. Two or three sentences about who you are and how long you have served the area will do.",
        "Pop-ups, auto-playing video and image sliders. Each one slows the page down or hides your phone number behind something the visitor has to close first.",
        "Embedded social media feeds. Link to your Instagram or Facebook page with a small icon instead. A live feed adds load time and sends people away from your booking button."
      ]
    },
    {
      "heading": "Check your page on your own phone this week",
      "paragraphs": [
        "Open your site on your phone with Wi-Fi turned off. That shows you what customers see on cellular data.",
        "Then check four things. Confirm a stranger could tell what you do from the top of the page. Tap the phone number and make sure the dialer opens. Compare your hours to your Google Business Profile. Tap every button and make sure each one goes somewhere that works.",
        "Next, paste your web address into PageSpeed Insights at pagespeed.web.dev and look at the mobile results. If it flags large images, resize them before you upload them again.",
        "Fix whatever failed first. Everything else on this list can wait until next week."
      ]
    }
  ],
  "faq": [
    [
      "Is a one-page website enough for a small local business?",
      "For many local service businesses, yes. If customers mainly need to know what you do, where you are, your hours and how to call or book, one organized page covers all of it. You can add pages later for things like a full menu or a portfolio."
    ],
    [
      "What should go at the top of a one-page website?",
      "Put your business name, one sentence that says what you do, the area you serve, and one button for the main action, such as Call now or Book online. Repeat your phone number there so visitors can call without scrolling."
    ],
    [
      "Should my website hours match my Google Business Profile?",
      "Yes. Your hours, address and phone number should match your Google Business Profile exactly. When the two disagree, customers have to guess which one is right."
    ],
    [
      "Do I need a blog on a one-page website?",
      "No. Skip the blog unless you will post to it on a schedule. An empty blog with one old post makes a business look inactive."
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
  alternates: { canonical: "/blog/one-page-website-local-business-what-to-include" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/one-page-website-local-business-what-to-include",
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
        { name: POST.title, href: "/blog/one-page-website-local-business-what-to-include" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="14 November 2026, 4 minute read"
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
        slug: "one-page-website-local-business-what-to-include",
        title: POST.title,
        description: POST.description,
        published: "2026-11-14",
      }} />
    </PostLayout>
  );
}
