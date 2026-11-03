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
  "title": "What a contact page needs so customers reach you on the first try",
  "slug": "contact-page-that-reaches-you",
  "description": "The four parts of a local business contact page that let customers reach you on the first try, and how to test each one from your own phone.",
  "category": "Guide",
  "lede": "A customer who opens your contact page wants to call you, find you or send you a question. Every part of the page should make one of those three things quick. I build and fix websites for local businesses around Tuscaloosa, and this is the list I would use to check a contact page: a phone number you can tap, hours written as text, a full address with a map link, and one form that lands in an inbox someone reads.",
  "sections": [
    {
      "heading": "Make the phone number a tap-to-call link",
      "paragraphs": [
        "On a phone, a tap-to-call link opens the dialer with your number already filled in. The customer taps once and the call starts. Without the link, they have to memorize the number or copy it by hand.",
        "The link is one line of code. Your web person wraps the number in a tel: link that includes the country code, such as tel:+12055550123 for a number in the 205 area code. Most site builders, including Squarespace, Wix and WordPress, let you add it as a regular link with tel: in place of a web address.",
        "To test it, open your contact page on your own phone and tap the number. If the dialer opens, it works. If the phone only highlights the text, the number is plain text. If you cannot highlight it at all, the number is part of an image, and a phone cannot read or dial a number inside a picture."
      ]
    },
    {
      "heading": "Write your hours as text and keep them current",
      "paragraphs": [
        "Put your hours on the page in plain text, one line per day or one line per group of days. Text hours load fast, read well on a small screen and stay easy to edit.",
        "Match them to your Google Business Profile. A customer who sees two different closing times has to call to find out which one is right, and some will skip the call.",
        "Add a line for exceptions before they happen, such as holiday closures or a home game Saturday when you open late. Then set a reminder to remove the line after the date passes."
      ]
    },
    {
      "heading": "Give the full address and a map link",
      "paragraphs": [
        "Write out the street address, suite number, city, state and ZIP code. Link the address to Google Maps so a tap on a phone opens directions. If your entrance is around the back or parking is limited, add one sentence that says where to park and which door to use.",
        "If you work at your customers' locations, such as a plumber or a mobile detailer, list the towns you serve instead of a street address. Customers then know right away whether you come to them."
      ]
    },
    {
      "heading": "Use one form that reaches a person",
      "paragraphs": [
        "Keep the form short: name, a phone number or email, and a message box. Each extra field gives a customer one more reason to stop before they press send.",
        "The form has to send to an inbox someone checks every business day. If a past web designer set up the form, it may still send to their address or to an old email account. Ask whoever manages the site where form messages go, and change it to an address you read.",
        "Test it yourself. Fill out the form with a message such as test from the owner, send it, and check that it arrives. Look in your spam folder too. Repeat the test after any change to the site, because a theme update or a new plugin can change how the form sends mail."
      ]
    },
    {
      "heading": "Run the whole check from your phone",
      "paragraphs": [
        "The full check takes about five minutes. Open the contact page on your phone over cell data. Tap the phone number and confirm the dialer opens. Read the hours and compare them with your Google Business Profile. Tap the address and confirm the map shows your front door. Send a test message through the form and find it in your inbox.",
        "Write down anything that failed and send that list to whoever manages your site. Each of these fixes is small, and each one removes a step between a customer and your business."
      ]
    }
  ],
  "faq": [
    [
      "What is a tap-to-call link?",
      "A tap-to-call link wraps your phone number in a tel: link, so tapping the number on a phone opens the dialer with the number filled in. Without it, a customer has to type or copy the number by hand."
    ],
    [
      "How do I know if my contact form works?",
      "Send a test message through the form yourself and check that it arrives in an inbox you read every business day. Check your spam folder as well, and repeat the test after any update to the site."
    ],
    [
      "Should my contact page list a street address if I work at customers' homes?",
      "List the towns you serve instead. Customers learn right away whether you come to them, and you keep your home address off the internet."
    ],
    [
      "Where should my business hours appear?",
      "Write them as plain text on your contact page and make them match your Google Business Profile exactly, including holiday closures."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/contact-page-that-reaches-you" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/contact-page-that-reaches-you" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="3 November 2026, 4 minute read"
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
        slug: "contact-page-that-reaches-you",
        title: POST.title,
        description: POST.description,
        published: "2026-11-03",
      }} />
    </PostLayout>
  );
}
