import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose, Facts } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import PageDates from "@/app/components/PageDates";

// Written from the code as it ran on 9 November 2026. Each section names the files it
// describes, so a change to any of them is a reason to reread this page:
//   forms        app/api/{contact,booking,waitlist,lead-capture}/route.ts, lib/cosmic-lead.ts
//   AI routes    app/api/{chat,ai-faq,ai-tools/[slug]}/route.ts, lib/api-guard.ts
//   site check   app/api/ai-visibility-check/route.ts
//   payments     lib/contact.ts (Payment Links), app/api/stripe-webhook/route.ts,
//                app/shop/starter-kit/BuyButton.tsx, lib/affiliate.ts
//   cookies      app/api/rep-auth/route.ts, middleware.ts
// The site loads no analytics or tracking script. Adding one means updating this page.

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "The Purcell Ventures site sends form details to Elijah and AI tool input to Anthropic, takes payments through Stripe and runs no analytics or ad tracking.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "9 November 2026";

export default function PrivacyPage() {
  return (
    <main>
      <PageDates path="/privacy" />
      <PageHero
        kicker="Purcell Ventures LLC"
        title="Privacy"
        lede="This page lists what the purcellventures.co website collects, where it goes and how to ask for a copy or a deletion. It describes the site as the code runs today."
        meta={`Last updated ${UPDATED}`}
      />

      <Section title="Forms" intro="These four forms send what you type to Elijah Purcell, who runs Purcell Ventures.">
        <Facts
          items={[
            ["Contact form on /digital", "Your name, business name, email or phone, what you need and the plan you picked."],
            ["Booking form on /consulting/book", "Your name, business, email, phone, group size, session type, format and notes."],
            ["Course waitlist", "Your email and the course you chose."],
            ["Free download on /free", "Your email and first name. For the cold email pack, the site can also email the pack to you through Resend, an email service."],
          ]}
        />
        <Prose>
          <p>
            The site passes each submission to ntfy.sh, a notification service, which carries it
            to Elijah&apos;s own lead records. ntfy.sh holds the message for up to 12 hours. The
            booking and waitlist forms can also email Elijah a notice through Resend. Elijah uses
            what you send to answer you and follow up. No form sends your details to an
            advertising platform.
          </p>
          <p>
            The Steady sign-up on /steady/start sends nothing to the site. It opens your own email
            app with a message addressed to Elijah, and you choose whether to send it.
          </p>
        </Prose>
      </Section>

      <Section title="AI tools and the chat window">
        <Prose>
          <p>
            The free tools on <Link href="/digital/tools">/digital/tools</Link>, the FAQ builder
            and the chat window send what you type to the Anthropic API, which writes the reply.
            Purcell Ventures does not save your input or the result. Anthropic handles each
            request under its own terms. Leave passwords, card numbers and health details out of
            these tools.
          </p>
          <p>
            To limit abuse, these tools count requests from each IP address for one minute. The
            count lives in the server&apos;s memory and the site does not save it.
          </p>
          <p>
            The check on <Link href="/ai-visibility-check">/ai-visibility-check</Link> fetches the
            web address you enter and returns its findings. It stores nothing.
          </p>
        </Prose>
      </Section>

      <Section title="Payments">
        <Prose>
          <p>
            Purchases run through Stripe checkout pages on stripe.com. Stripe collects your card
            details, and Purcell Ventures never sees your card number. After a purchase, Stripe
            tells this site your email address, the product, the amount and any referral code
            from the link you used. The server logs record the product, the amount and the
            referral code, with no email address. For the one
            product delivered as a Telegram channel, the site asks Telegram for an invite link
            labelled with the part of your email address before the @, then emails you that link
            through Resend.
          </p>
        </Prose>
      </Section>

      <Section title="Cookies and browser storage">
        <Prose>
          <p>
            The site sets cookies only for sales reps who sign in to the rep portal. The
            pv_rep_session cookie keeps a rep signed in, and the pv_rep_name cookie holds the
            rep&apos;s name. Both last 30 days. Visitors who never sign in get no cookies from
            this site.
          </p>
          <p>
            Some pages save data in your browser&apos;s local storage on your own device. The
            booking form, the Steady sign-up, the free download page and the newsletter page keep
            a copy of what you entered. The add-on demos keep the records you create, and the courses keep your
            lesson progress. A shop link with a referral code keeps that code, and the buy button
            adds it to the Stripe checkout link. Clearing this site&apos;s data in your browser
            removes all of it.
          </p>
        </Prose>
      </Section>

      <Section title="Analytics, tracking and hosting">
        <Prose>
          <p>
            The site loads no analytics, advertising or tracking scripts and no third-party
            pixels. Vercel hosts the site and handles every request, so Vercel&apos;s servers see
            your IP address and keep request logs. The business card, print and QR code pages
            load QR code images from api.qrserver.com, which also sees your IP address.
          </p>
        </Prose>
      </Section>

      <Section title="Your requests">
        <Prose>
          <p>
            Email <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> to
            ask what the site holds about you, to correct it or to have it deleted. Elijah answers
            these requests himself.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
