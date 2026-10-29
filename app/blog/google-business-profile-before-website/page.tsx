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
  "title": "Fix your Google Business Profile before you pay for website work",
  "slug": "google-business-profile-before-website",
  "description": "Your Google Business Profile can show your hours, phone and address right on the search page. Here are the fields to check first, at no cost.",
  "category": "Guide",
  "lede": "I build and fix websites for local businesses around Tuscaloosa through my company, Purcell Ventures. Before you spend money on a new site, open your Google Business Profile. When someone searches for a local business by name or looks it up on Google Maps, the profile panel can show the hours, phone number, address and reviews right on the results page. A customer can call you or get directions from that panel without opening your website. Editing the profile is free.",
  "sections": [
    {
      "heading": "Find and claim your profile",
      "paragraphs": [
        "Search for your business name and city on Google. If a panel for your business appears, look for a link that says Own this business or Claim this business. If you already manage it, sign in at business.google.com with the Google account you used to claim it.",
        "Google asks you to verify ownership before you can edit. The options depend on the business and can include a phone call, a text, an email, a video of your storefront or a postcard. Some of these finish in minutes and the postcard can take days, so start this step first."
      ]
    },
    {
      "heading": "Hours, including holiday hours",
      "paragraphs": [
        "Check the regular hours for every day of the week against the sign on your door. Then open the section for special hours and enter each holiday closure before the holiday arrives.",
        "If your hours change with the seasons, add a calendar reminder for each change date so you can update the profile that day."
      ]
    },
    {
      "heading": "Phone number and website link",
      "paragraphs": [
        "Call the phone number on your profile from another phone. It should ring a line that someone answers during business hours. Watch for an old number from a previous location or a personal cell phone nobody checks anymore.",
        "Open the website link from the profile. It should load your current site and start with https. If you move to a new web address, update this field the same day, because the old link will keep sending people to the old address."
      ]
    },
    {
      "heading": "Business name and category",
      "paragraphs": [
        "Type your business name exactly as it appears on your sign and your receipts. Google's guidelines tell owners to leave out extra keywords and city names, and a name stuffed with keywords can lead Google to suspend the profile.",
        "Your primary category tells Google what kind of business you run, and it affects which searches show your profile. Pick the most specific category that fits. A shop that only does tattoos should choose Tattoo shop. You can add secondary categories for other services."
      ]
    },
    {
      "heading": "Address or service area",
      "paragraphs": [
        "If customers come to you, enter the street address and move the map pin onto your actual entrance. In a shopping center, the default pin can land on the wrong side of the building.",
        "If you travel to customers, as a plumber or a mobile detailer does, you can hide your street address and list a service area. Choose the cities or counties you serve."
      ]
    },
    {
      "heading": "Why the profile comes first",
      "paragraphs": [
        "Your website only reaches people who click through to it. The profile can appear for people who search your name, people who search for your kind of business nearby and people who browse Google Maps. Once the hours, phone number and address on the profile are right, make sure your website shows the same ones, so a customer gets the same answer in both places."
      ]
    }
  ],
  "faq": [
    [
      "Does a Google Business Profile cost money?",
      "No. Claiming and editing a profile at business.google.com is free."
    ],
    [
      "Why did Google suspend my business profile?",
      "One common cause is a business name with added keywords or city names. Google's guidelines ask for the name you use on your sign."
    ],
    [
      "Can a business without a storefront have a profile?",
      "Yes. Service businesses can hide their street address and list the cities or counties they serve."
    ]
  ]
};

export const metadata = {
  alternates: { canonical: "/blog/google-business-profile-before-website" },
  title: { absolute: POST.title },
  description: POST.description,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: POST.title, href: "/blog/google-business-profile-before-website" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="29 October 2026, 3 minute read"
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
        slug: "google-business-profile-before-website",
        title: POST.title,
        description: POST.description,
        published: "2026-10-29",
      }} />
    </PostLayout>
  );
}
