import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PV Card Privacy Policy | Purcell Ventures",
  description: "How the PV Card app and App Clip handle your data.",
  alternates: { canonical: "https://purcellventures.co/privacy/pv-card" },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      "PV Card is an iPhone app and App Clip made by Purcell Ventures LLC. When you tap a contact card or open a card link, it shows that person's contact details on Apple's New Contact screen so you can save them. Questions go to elijah@purcellventures.co.",
    ],
  },
  {
    h: "What PV Card does with your contacts",
    p: [
      "PV Card does not read your contacts. It hands Apple's New Contact screen the details of the card you opened, and the contact is saved only if you tap Done. PV Card never sees the rest of your address book.",
    ],
  },
  {
    h: "What PV Card collects",
    p: [
      "Nothing about you. PV Card has no accounts, no analytics, no ads and no tracking. To show a card, it downloads that card's public details and photo from purcellventures.co over an encrypted connection. Like any website, our host keeps standard server logs of those requests, such as IP address and time, for security and to keep the site running.",
    ],
  },
  {
    h: "Crash and performance data",
    p: [
      "If you opt in through your iPhone's settings, Apple may share anonymous crash reports with us through App Store Connect. We use them only to fix bugs.",
    ],
  },
  {
    h: "Children",
    p: ["PV Card is not directed at children under 13, and we do not knowingly collect data from them."],
  },
  {
    h: "Changes",
    p: ["If this policy changes, we will update this page and the date below. Effective 24 November 2026."],
  },
];

export default function PVCardPrivacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold tracking-tight">PV Card Privacy Policy</h1>
      <p className="mt-2 text-sm text-neutral-500">Purcell Ventures LLC</p>
      {SECTIONS.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-xl font-semibold">{s.h}</h2>
          {s.p.map((t, i) => (
            <p key={i} className="mt-3 leading-relaxed">
              {t}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
