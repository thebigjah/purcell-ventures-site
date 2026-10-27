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
  "title": "A quick phone test for your business website",
  "slug": "quick-phone-test-business-website",
  "description": "Five checks to run on your own phone, from sideways scrolling to a tappable phone number, plus a way to preview other phone sizes in Chrome.",
  "category": "Guide",
  "lede": "I build and fix websites for local businesses around Tuscaloosa. You can check how your own site works on a phone with five quick tests, your phone and a pen.",
  "sections": [
    {
      "heading": "Step one: open the site as a customer",
      "paragraphs": [
        "Log out of your website's editor first, so you see the public page. Open your phone's browser, type your web address and wait for the page to load. Hold the phone upright.",
        "Now look for three things: your phone number, your hours and your address. Count the taps and scrolls each one takes, and write the counts down. You now have a baseline to compare against after any fix."
      ]
    },
    {
      "heading": "Step two: drag the page sideways",
      "paragraphs": [
        "Put your thumb on the middle of the page and drag left. If the whole page slides and you see a blank strip or cut off text on the right, something on the page is wider than the screen.",
        "A large photo, a wide table or an embedded map with a fixed width can cause it. In Wix, Squarespace and WordPress, you can set an image or block to fit the width of its container. Change the setting, reload the page on your phone and drag again."
      ]
    },
    {
      "heading": "Step three: read a paragraph without zooming",
      "paragraphs": [
        "Pick your menu or your list of services and try to read it at normal size. If you have to pinch and zoom, the page is showing the desktop layout shrunk down to phone width.",
        "Ask whoever manages your site to look for this line in the head of each page: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">. That line tells the phone's browser to lay the page out at the phone's width. Without it, the browser draws the desktop page and shrinks it."
      ]
    },
    {
      "heading": "Step four: tap every link with your thumb",
      "paragraphs": [
        "Tap each item in your menu with your thumb. If you hit the wrong link, the links are too small or too close together. Ask your web person to add space around each button and link.",
        "While you are there, tap your phone number. If it starts a call, the number works as a phone link. If nothing happens, a customer has to copy the number by hand. A phone link uses tel: followed by the digits, and your web person can add one in a minute."
      ]
    },
    {
      "heading": "Step five: find your hours from the home page",
      "paragraphs": [
        "Go back to the home page and look for your hours without opening the menu. If they only appear on a separate page, a customer has to tap through the menu to find them.",
        "A footer with the hours, phone number and address appears at the bottom of every page, so a customer can scroll down from any page and find all three. Ask your web person to add one if your site lacks it."
      ]
    },
    {
      "heading": "A second look from your computer",
      "paragraphs": [
        "To see your site at several phone sizes, open it in Google Chrome on a computer, right click the page and choose Inspect. In the panel that opens, click the icon that shows a phone and a tablet. Chrome redraws the page at phone width, and the menu at the top lets you pick different phone models.",
        "Repeat the test after every change to your site, and compare the tap counts with the ones you wrote down."
      ]
    }
  ],
  "faq": [
    [
      "Do I need special software to test my site on a phone?",
      "No. Your own phone covers the main checks, and Google Chrome on a computer can preview other phone sizes for free."
    ],
    [
      "Who should I ask to fix these problems?",
      "Whoever built or manages your site, or the support team of the website builder you use."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/quick-phone-test-business-website" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/quick-phone-test-business-website" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="27 October 2026, 3 minute read"
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
        slug: "quick-phone-test-business-website",
        title: POST.title,
        description: POST.description,
        published: "2026-10-27",
      }} />
    </PostLayout>
  );
}
