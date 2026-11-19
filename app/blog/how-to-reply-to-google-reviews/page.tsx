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
  "title": "How to reply to Google reviews as a small business",
  "slug": "how-to-reply-to-google-reviews",
  "description": "Reply to every Google review from your Business Profile, thank good reviewers by name, and answer bad ones calmly with one fix. The next customer reads both.",
  "category": "Guide",
  "lede": "Reply to every Google review, good or bad, from your Google Business Profile. Thank happy customers with a specific detail, and answer unhappy ones calmly with one concrete next step. Your reply sits under the review for anyone to read, so you are writing for the next customer as much as the reviewer.",
  "sections": [
    {
      "heading": "Why your replies matter to the next customer",
      "paragraphs": [
        "When someone looks up your business on Google Search or Google Maps, your reviews appear next to your hours, phone number and photos. Each reply you write shows up under the review with the label \"Response from the owner.\" Anyone comparing you with another shop can read it.",
        "When I help local owners around Tuscaloosa clean up their Google Business Profile, one of the first things I check is whether anyone answers the reviews. A calm reply to an unhappy customer shows a reader how you handle a problem. That is exactly what a first-time customer wants to know before they call.",
        "Google also notifies the reviewer when you reply. A thank-you reaches the person who wrote it, and an upset customer gets a direct way to reach you."
      ]
    },
    {
      "heading": "Where to find the reply button",
      "paragraphs": [
        "Sign in to the Google account that manages your Business Profile. Search your exact business name on Google. Your profile tools appear at the top of the results. Click \"Read reviews,\" find the review, and click \"Reply.\"",
        "On your phone, open the Google Maps app, tap your profile picture, and tap \"Your Business Profile.\" Open the reviews tab and tap \"Reply\" under any review. You can edit or delete a reply later from the same place.",
        "If none of these tools show up, the account you signed in with probably lacks access. Ask whoever created the profile to add you under Business Profile settings, then \"People and access.\""
      ]
    },
    {
      "heading": "How to reply to a good review",
      "paragraphs": [
        "Keep it short and specific. Thank the person by name if their Google name shows one, mention the detail they mentioned, and stop. For a salon, a reply might read: \"Thanks, Maria. Glad the color came out the way you pictured it. See you next time.\"",
        "Write a fresh sentence for each review, even if it is a short one. When the same copy-and-paste thank-you appears under every review, readers notice and the replies start to look automated.",
        "Reviews with stars and no text deserve a reply too. One line works: \"Thanks for the five stars, Dana. We appreciate you.\""
      ]
    },
    {
      "heading": "How to reply to a bad review",
      "paragraphs": [
        "Wait until you can write calmly. Draft the reply in your phone's notes app, step away for an hour, then read it again before you post it.",
        "Then follow four steps. Thank the person for telling you. Name the specific problem they described without arguing about it. Say what you will do about it. Give them a direct way to reach you, such as the shop's phone number and the name of the person to ask for.",
        "Here is an example for a restaurant: \"James, thank you for telling us about the long wait on Friday night. You should have had your food much sooner. I want to hear more and make this right. Please call the restaurant and ask for me, Tasha.\"",
        "If the review gets a fact wrong, correct it once and politely in a single sentence. Arguing in public makes you look worse to the next reader, even when you are right.",
        "If a review breaks Google's rules, such as spam, hateful language or a review from someone who never visited, report it. Click the three-dot menu on the review and choose \"Report review.\" Google decides whether to remove it, so post a calm reply while you wait."
      ]
    },
    {
      "heading": "What to leave out of every reply",
      "paragraphs": [
        "Leave out private details. Skip order numbers, appointment dates and anything about a customer's account. Health offices such as dentists should never confirm in a reply that the reviewer is a patient. A safe reply reads: \"We would like to talk with you directly. Please call our office manager at the main number.\"",
        "Leave out rewards for reviews. Google's review policy forbids offering discounts, freebies or anything else in exchange for a review or for changing one. You can still fix the problem privately for an upset customer, as long as you do not ask them to edit or remove what they wrote.",
        "Leave out sales pitches and long lists of your services or city names. Readers skip past them, and they make a sincere reply read like an ad."
      ]
    },
    {
      "heading": "A review routine you can start this week",
      "paragraphs": [
        "Turn on review alerts first. In your Business Profile, open the settings menu, choose \"Notifications,\" and make sure the customer reviews option is on. Google will then email you when a new review comes in.",
        "Next, set a recurring reminder on your phone for one morning a week, such as Monday at 9. Open your reviews and reply to anything new.",
        "This week, start with the reviews that have no reply yet. If you have a backlog, answer the negative ones first, since a reader deciding whether to call will look for how you handled problems. Then work through the positive ones a few at a time until every review has a reply."
      ]
    }
  ],
  "faq": [
    [
      "Should I reply to Google reviews that have only stars and no text?",
      "Yes. A one-line thank-you that uses the reviewer's name is enough, and it shows the next customer that you read every review."
    ],
    [
      "Can I delete a bad Google review?",
      "You cannot delete a customer's review yourself. If the review breaks Google's rules, such as spam or hateful language, click the three-dot menu on it and choose \"Report review,\" then post a calm reply while Google decides whether to remove it."
    ],
    [
      "Can I offer a discount to someone who left a bad review?",
      "You can fix the problem privately, as long as you do not offer a discount or anything else in exchange for changing or removing the review. Google's review policy forbids incentives for reviews."
    ],
    [
      "How often should I check my Google reviews?",
      "Turn on review email notifications in your Business Profile settings, then set a weekly reminder to reply to anything new. Reply to an upset customer once you can write calmly."
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
  alternates: { canonical: "/blog/how-to-reply-to-google-reviews" },
  title: { absolute: POST.title },
  description: POST.description,
  // Without its own openGraph a post inherits the blog index's "Blog by Elijah Purcell" as
  // og:title, which is what LinkedIn and Medium showed for every post until 9 Nov 2026.
  openGraph: {
    title: POST.title,
    description: POST.description,
    url: "/blog/how-to-reply-to-google-reviews",
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
        { name: POST.title, href: "/blog/how-to-reply-to-google-reviews" },
      ]} />}
      kicker={POST.category}
      title={POST.title}
      meta="19 November 2026, 5 minute read"
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
        slug: "how-to-reply-to-google-reviews",
        title: POST.title,
        description: POST.description,
        published: "2026-11-19",
      }} />
    </PostLayout>
  );
}
