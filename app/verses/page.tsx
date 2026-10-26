import { PageHero, Section, Prose, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. Scripture is quoted verbatim from the NASB and
// cited as such. Do not edit the verse text for style.

const VERSES = [
  {
    ref: "Romans 8:28",
    text: "And we know that God causes all things to work together for good to those who love God, to those who are called according to His purpose.",
    why: "I read this one when something has gone wrong. It tells me God can use a bad situation for good.",
  },
  {
    ref: "Matthew 5:10",
    text: "Blessed are those who have been persecuted for the sake of righteousness, for theirs is the kingdom of heaven.",
    why: "I read this one when doing the right thing costs me something, like a friendship or other people's respect.",
  },
  {
    ref: "Romans 1:16",
    text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek.",
    why: "This verse keeps me from playing down my faith to fit in.",
  },
  {
    ref: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.",
    why: "I am analytical and I plan everything, so I tend to trust my own reasoning first. This verse reminds me to trust God with the plan.",
  },
  {
    ref: "Psalm 139:13",
    text: "For You formed my inward parts; You wove me in my mother's womb.",
    why: "I am working toward psychiatry, and this verse is why I take that work seriously. God formed every patient I will treat.",
  },
];

export default function VersesPage() {
  return (
    <main>
      <PageHero
        planet="websites"
        kicker="Verses"
        title="Five verses I come back to"
        lede="Scriptures I have memorized and come back to often, with a note on why each one matters to me."
        meta="Updated May 2026. All quotations from the NASB."
      />

      {VERSES.map((v) => (
        <Section key={v.ref} title={v.ref} intro="NASB">
          <Prose>
            <blockquote>&ldquo;{v.text}&rdquo;</blockquote>
            <p>{v.why}</p>
          </Prose>
        </Section>
      ))}

      <ClosingCall
        title="Questions about one of these"
        line="If you want to talk about one of these verses, email me. I have no pastoral training, but I have spent years thinking about them."
        button="Email me"
        href={`mailto:${CONTACT.email}`}
      />
    </main>
  );
}
