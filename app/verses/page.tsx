import { PageHero, Section, Prose, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. Scripture is quoted verbatim from the NASB and
// cited as such. Do not edit the verse text for style.

const VERSES = [
  {
    ref: "Romans 8:28",
    text: "And we know that God causes all things to work together for good to those who love God, to those who are called according to His purpose.",
    why: "The verse I come back to when something has gone wrong. It admits that things hurt and refuses to let them be meaningless.",
  },
  {
    ref: "Matthew 5:10",
    text: "Blessed are those who have been persecuted for the sake of righteousness, for theirs is the kingdom of heaven.",
    why: "For the moments when doing the right thing costs something visible: public ridicule, lost friendships, lost ground. The kingdom is on the other side of those losses.",
  },
  {
    ref: "Romans 1:16",
    text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek.",
    why: "This verse rules out being cool about faith. The gospel is either the most embarrassing thing I believe or the most powerful, and no version of Christianity sits between the two.",
  },
  {
    ref: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.",
    why: "I lean on my own understanding by default, because I am analytical and I plan everything. Every day this verse hands the plan back to God.",
  },
  {
    ref: "Psalm 139:13",
    text: "For You formed my inward parts; You wove me in my mother's womb.",
    why: "The reason I take psychology and psychiatry seriously. God formed every patient I will eventually treat, and the work has to honor that.",
  },
];

export default function VersesPage() {
  return (
    <main>
      <PageHero
        planet="websites"
        kicker="Verses"
        title="Five verses I come back to"
        lede="I have marked these, memorized them and returned to them when life got hard. They are the convictions behind the work."
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
        line="If you are wrestling with one of these verses, email me. I have no pastoral training, and I have spent years wrestling with them myself."
        button="Email me"
        href={`mailto:${CONTACT.email}`}
      />
    </main>
  );
}
