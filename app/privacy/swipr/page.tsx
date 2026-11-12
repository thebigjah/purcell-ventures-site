import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swipr Privacy Policy | Purcell Ventures",
  description: "How the Swipr mobile game app handles your data.",
  alternates: { canonical: "https://purcellventures.co/privacy/swipr" },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      "Swipr is a mobile app of short playable games, made by Purcell Ventures LLC. This policy covers the Swipr app on Android and iPhone. Questions go to elijah@purcellventures.co.",
    ],
  },
  {
    h: "What Swipr stores on your device",
    p: [
      "Swipr has no accounts and no sign-in. Your progress (levels cleared, streaks, best scores) and your game preferences are saved only on your device. We do not send them to our own servers, and uninstalling the app deletes them.",
    ],
  },
  {
    h: "Advertising",
    p: [
      "Swipr shows ads, including optional ads you can watch for a retry. Ads are served by Google AdMob. To show and measure ads, Google may collect your device's advertising ID, approximate location based on your IP address, device and app information, and how you interact with ads. Google's use of this data is described at https://policies.google.com/technologies/ads.",
      "On iPhone, ads do not use your advertising identifier to track you across other apps unless you allow it in an Apple prompt. On Android you can reset or delete your advertising ID in your device settings.",
    ],
  },
  {
    h: "Crash and performance data",
    p: [
      "If you opt in through your phone's settings, Apple and Google may share anonymous crash reports and performance data with us through App Store Connect and Google Play Console. We use them only to fix bugs.",
    ],
  },
  {
    h: "What we do not do",
    p: [
      "We do not sell your data. We do not collect your name, email address, contacts, photos or precise location. Swipr is not directed at children under 13, and we do not knowingly collect data from them.",
    ],
  },
  {
    h: "Beta testers",
    p: [
      "If you join the beta through Google Play or Apple TestFlight, those services share your tester email with us so we can manage the test. We use it only for the beta, and you can leave the test at any time.",
    ],
  },
  {
    h: "Changes",
    p: ["If this policy changes, we will update this page and the date below. Effective 12 November 2026."],
  },
];

export default function SwiprPrivacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold tracking-tight">Swipr Privacy Policy</h1>
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
