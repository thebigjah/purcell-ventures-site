// Every NFC contact card, one entry per person.
//
// Three things read this list:
//   /c/<slug>               the web card, for Android and any phone without the App Clip
//   /c/<slug>/contact.vcf   the vCard file that page saves
//   /c/<slug>/contact.json  what the PV Card App Clip (~/pv-card) reads on an iPhone
//
// To add someone: add an entry, put a square photo at public/c/<slug>/photo.jpg, deploy,
// then write https://purcellventures.co/c/<slug> to their tag. No App Store update.
// Elijah's original tags say purcellventures.co/card, which the App Clip maps to "elijah".

export type Labeled = { label: string; value: string };

export type Card = {
  slug: string;
  givenName: string;
  familyName: string;
  organization?: string;
  jobTitle?: string;
  phones: Labeled[];
  emails: Labeled[];
  urls: Labeled[];
  address?: { street?: string; city?: string; state?: string; postalCode?: string; country?: string };
  /** Path under public/, square, at least 400 px. */
  photo?: string;
  /** The number "Text" opens. */
  textNumber?: string;
  /** The site the card links to after saving. */
  website?: string;
  /** Button colour on the web card and in the App Clip. */
  accent?: string;
};

export const CARDS: Card[] = [
  {
    slug: "elijah",
    givenName: "Elijah",
    familyName: "Purcell",
    organization: "Purcell Ventures LLC",
    jobTitle: "Founder/CEO",
    phones: [
      { label: "mobile", value: "+17702805319" },
      { label: "work", value: "+12054627839" },
    ],
    emails: [
      { label: "home", value: "elijahpurcell@gmail.com" },
      { label: "work", value: "elijah@purcellventures.co" },
    ],
    urls: [
      { label: "homepage", value: "https://purcellventures.co" },
      { label: "LinkedIn", value: "https://www.linkedin.com/in/theelijahpurcell" },
      { label: "GitHub", value: "https://github.com/thebigjah" },
      { label: "Instagram", value: "https://instagram.com/theelijahpurcell" },
    ],
    photo: "/c/elijah/photo.jpg",
    textNumber: "+17702805319",
    website: "https://purcellventures.co",
    accent: "#b8901f",
  },
];

export function getCard(slug: string): Card | undefined {
  return CARDS.find((c) => c.slug === slug);
}

export function fullName(c: Card) {
  return `${c.givenName} ${c.familyName}`.trim();
}

// vCard 3.0, the version iOS, Android and Outlook all import. Lines fold at 75 octets
// and end in CRLF, per RFC 2426, or some Android contact apps drop the photo.
function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
}

function fold(line: string) {
  const out: string[] = [];
  let rest = line;
  out.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length) {
    out.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  return out.join("\r\n");
}

const PHONE_TYPE: Record<string, string> = { mobile: "CELL", cell: "CELL", work: "WORK", home: "HOME", main: "MAIN" };
const EMAIL_TYPE: Record<string, string> = { work: "WORK", home: "HOME" };

export function toVCard(c: Card, photoBase64?: string) {
  const L: string[] = ["BEGIN:VCARD", "VERSION:3.0"];
  L.push(`N:${esc(c.familyName)};${esc(c.givenName)};;;`);
  L.push(`FN:${esc(fullName(c))}`);
  if (c.organization) L.push(`ORG:${esc(c.organization)}`);
  if (c.jobTitle) L.push(`TITLE:${esc(c.jobTitle)}`);
  c.phones.forEach((p, i) => {
    const t = PHONE_TYPE[p.label.toLowerCase()] ?? "VOICE";
    L.push(`TEL;TYPE=${t},VOICE${i === 0 ? ";TYPE=pref" : ""}:${p.value}`);
  });
  c.emails.forEach((e, i) => {
    const t = EMAIL_TYPE[e.label.toLowerCase()];
    L.push(`EMAIL;TYPE=INTERNET${t ? "," + t : ""}${i === 0 ? ";TYPE=pref" : ""}:${e.value}`);
  });
  let item = 0;
  for (const u of c.urls) {
    if (u.label === "homepage") L.push(`URL:${u.value}`);
    else {
      item += 1;
      L.push(`item${item}.URL:${u.value}`, `item${item}.X-ABLabel:${esc(u.label)}`);
    }
  }
  if (c.address) {
    const a = c.address;
    L.push(`ADR;TYPE=WORK:;;${esc(a.street ?? "")};${esc(a.city ?? "")};${esc(a.state ?? "")};${esc(a.postalCode ?? "")};${esc(a.country ?? "")}`);
  }
  if (photoBase64) L.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`);
  L.push("END:VCARD");
  return L.map(fold).join("\r\n") + "\r\n";
}
