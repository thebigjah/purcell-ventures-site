import type { Metadata } from "next";
import { PageHero, Section, Prose } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// From the 17 Aug 2026 draft (bh6/legal-drafts), checked against the code on 1 Nov 2026: the chat and AI
// tools send what a visitor types to Anthropic, which the draft left out. No analytics package is installed.
export const metadata: Metadata = {
  title: "Privacy",
  description: "What purcellventures.co collects, why, who else sees it, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero kicker="Purcell Ventures LLC" title="Privacy" lede="Last updated 1 November 2026. This page says plainly what the site collects." />
      <Section title="What we collect">
        <Prose>
          <p>We only collect what you give us:</p>
          <ul>
            <li><strong>What you type into a form.</strong> Your name, email and message, so we can reply.</li>
            <li><strong>What you type into the chat or an AI tool.</strong> We send it to Anthropic, the company that runs the Claude model, so it can write the reply.</li>
            <li><strong>What a purchase requires.</strong> Our payment processor, Stripe, collects the billing details it needs. We never see or store your card number.</li>
          </ul>
          <p>The site has no analytics script, no advertising network and no tracking pixel.</p>
        </Prose>
      </Section>
      <Section title="Why">
        <Prose><p>To answer you, to run the tool you asked for, and to deliver what you paid for.</p></Prose>
      </Section>
      <Section title="Who else sees it">
        <Prose>
          <p>Stripe, for the parts of a purchase it handles. Anthropic, for what you type into the chat or an AI tool. Resend, our email provider, because a reply is an email. Vercel, which hosts the site and keeps standard server logs. We do not sell data and we do not share it for marketing.</p>
        </Prose>
      </Section>
      <Section title="How long we keep it">
        <Prose><p>We keep messages while a conversation is open, and we delete them when you ask. We keep purchase records as long as tax law requires, so those are the one thing we cannot delete on request.</p></Prose>
      </Section>
      <Section title="Your choices">
        <Prose><p>You can ask what we hold, ask for a copy, or ask us to delete it. Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. You do not need to give a reason.</p></Prose>
      </Section>
      <Section title="Children">
        <Prose><p>This site is not built for children under 13.</p></Prose>
      </Section>
    </>
  );
}
