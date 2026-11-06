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
  "title": "Why your business site loads slowly on a phone, and how to test it for free",
  "slug": "slow-site-on-phone-causes-free-tests",
  "description": "The three usual reasons a small business site loads slowly on a phone, oversized photos, extra plugins and slow hosting, and the free tools that measure it.",
  "category": "Guide",
  "lede": "A customer who looks you up on a phone often has a weak signal, a small screen and one free hand. A site that feels fine on your office computer can take much longer to load for that person. I build and fix websites for local businesses around Tuscaloosa, and the usual causes of a slow site fall into three groups: oversized photos, too many plugins and slow hosting. Here is how to measure your own site with free tools and what each cause looks like.",
  "sections": [
    {
      "heading": "Measure your site with PageSpeed Insights",
      "paragraphs": [
        "Google offers a free tool called PageSpeed Insights at pagespeed.web.dev. Paste in your home page address and press Analyze. The report opens on the Mobile tab, which is the one that matters for customers on phones.",
        "Look at Largest Contentful Paint first. It measures how long the biggest piece of the page, usually a photo or a headline, takes to appear. Google rates 2.5 seconds or less as good. If your site has enough visitors, the top of the report also shows data from real Chrome users. Below that, a lab test lists specific problems under headings such as Diagnostics.",
        "Run the test on your home page and on your busiest inner page, such as the menu or the services page. Write down the Largest Contentful Paint for each so you can compare after any fix."
      ]
    },
    {
      "heading": "Cause one: photos far larger than the screen",
      "paragraphs": [
        "A photo straight from a modern phone camera can be several megabytes and thousands of pixels wide. A phone screen shows it at a few hundred pixels wide. When a site serves the full file, every visitor downloads data they never see.",
        "PageSpeed Insights flags this under items such as Properly size images or Improve image delivery. To fix it, resize each photo to roughly the largest width it appears on your site, then compress it. Squoosh, a free tool at squoosh.app, does both in the browser and can save the file as WebP, a format that most browsers support and that usually comes out smaller than a JPEG.",
        "If your site runs on WordPress, an image optimization plugin can resize and compress photos as you upload them. Pick one plugin for this job and remove any others that overlap."
      ]
    },
    {
      "heading": "Cause two: plugins and add-ons that load on every page",
      "paragraphs": [
        "Each plugin, chat widget, social feed or slideshow can add its own scripts and styles. Many of them load on every page, including pages that never use them. A site with a long list of plugins makes a phone download and run all of that code before the page settles.",
        "In the PageSpeed report, look for items about unused JavaScript and render-blocking requests. The details often name the plugin or service that added the file.",
        "Open your plugin list and deactivate anything you no longer use. Then deactivate one plugin at a time, run PageSpeed Insights again, and note whether the score moves. Back up the site before you start so you can restore it if a page breaks."
      ]
    },
    {
      "heading": "Cause three: hosting that responds slowly",
      "paragraphs": [
        "Before a page can load, your hosting server has to answer the request. On a crowded shared hosting plan, that first answer can take a long time no matter how small your photos are.",
        "PageSpeed Insights flags a slow server response in its list of problems, and the field data section shows a measure called Time to First Byte. A free tool called WebPageTest at webpagetest.org shows the same thing as the first bar in its waterfall chart.",
        "If the server response stays slow after you fix photos and plugins, ask your host whether your plan includes caching and whether a faster plan or a content delivery network is available. Some hosts turn on caching with one setting in the control panel."
      ]
    },
    {
      "heading": "Fix in this order",
      "paragraphs": [
        "Start with photos, because resizing them takes no technical skill and often makes the largest change. Move to plugins next, testing after each change. Look at hosting last, since it may involve a new plan or a move.",
        "Run PageSpeed Insights again after each step and compare the new Largest Contentful Paint with the number you wrote down. That record shows you which change made the difference."
      ]
    }
  ],
  "faq": [
    [
      "How can I test my website speed for free?",
      "Paste your page address into PageSpeed Insights at pagespeed.web.dev and read the Mobile tab. WebPageTest at webpagetest.org is another free option that shows how each file loads."
    ],
    [
      "What is a good Largest Contentful Paint time?",
      "Google rates a Largest Contentful Paint of 2.5 seconds or less as good. It measures how long the largest photo or block of text on the page takes to appear."
    ],
    [
      "Why do photos slow down a small business website?",
      "Photos from a phone camera can be several megabytes and far wider than a phone screen. Resize each photo to the width it appears on the site and compress it, for example with the free tool Squoosh."
    ],
    [
      "Do WordPress plugins slow down a site?",
      "Each plugin can add scripts and styles that load on every page. Deactivate plugins you no longer use, then test speed again after each change."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/slow-site-on-phone-causes-free-tests" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/slow-site-on-phone-causes-free-tests" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="6 November 2026, 4 minute read"
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
        slug: "slow-site-on-phone-causes-free-tests",
        title: POST.title,
        description: POST.description,
        published: "2026-11-06",
      }} />
    </PostLayout>
  );
}
