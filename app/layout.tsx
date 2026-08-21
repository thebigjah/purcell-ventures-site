import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, DM_Sans } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0a08",
};

export const metadata: Metadata = {
  // NO alternates.canonical HERE. A canonical declared in the root layout is
  // inherited by every page that does not override it, which on 20 August 2026 had
  // fourteen pages telling Google they were duplicates of /blog. Adding it back the
  // same evening put forty-three pages on the homepage. The home page declares its
  // own in app/page.tsx. Every other page declares its own.
  metadataBase: new URL("https://purcellventures.co"),
  title: {
    default: "Purcell Ventures | Elijah Purcell, Founder | Software and AI for Small Business",
    template: "%s | Purcell Ventures",
  },
  description:
    "Built by one operator for the small businesses who move first. Digital services from $99/mo, hands-on AI consulting, custom software. Founded by Elijah Purcell, a University of Alabama student, and operated from Tuscaloosa.",
  keywords: [
    "AI consulting", "digital services for small business", "custom software development",
    "business AI training", "website management", "Purcell Ventures", "Elijah Purcell",
  ],
  authors: [{ name: "Elijah Purcell", url: "https://purcellventures.co" }],
  creator: "Elijah Purcell",
  publisher: "Purcell Ventures LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purcellventures.co",
    siteName: "Purcell Ventures",
    title: "Purcell Ventures | Elijah Purcell, Founder | Software and AI for Small Business",
    description:
      "Built by one operator for the small businesses who move first. Digital services, AI consulting, and custom software.",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purcell Ventures | Elijah Purcell, Founder | Software and AI for Small Business",
    description:
      "Built by one operator for the small businesses who move first. Digital services, AI consulting, and custom software.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://purcellventures.co/#website",
      "url": "https://purcellventures.co",
      "name": "Purcell Ventures",
      "description": "Digital services, AI consulting, and custom software. Founded by Elijah Purcell.",
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://purcellventures.co/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://purcellventures.co/#organization",
      "name": "Purcell Ventures LLC",
      "legalName": "Purcell Ventures LLC",
      "url": "https://purcellventures.co",
      "logo": {
        "@type": "ImageObject",
        "url": "https://purcellventures.co/opengraph-image",
        "width": 1200,
        "height": 630,
      },
      "description": "Multi-division company offering digital services, AI consulting, and custom software development. Founded by Elijah Purcell in Georgia.",
      "foundingDate": "2025-04-08",
      // A logged-out ChatGPT answer on 20 Aug 2026 volunteered that an older New York
      // LLC shares this company name. Stating the distinguishing fact here means an
      // assistant does not have to hedge about which company it found.
      "disambiguatingDescription":
        "The Purcell Ventures LLC registered in Georgia, control number 25075361, formed 8 April 2025 by Elijah Purcell. Not the older, unrelated Purcell Ventures LLC registered in New York.",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "Georgia Secretary of State control number",
        "value": "25075361",
      },
      "foundingLocation": {
        "@type": "Place",
        "name": "Acworth, Georgia, USA",
      },
      "email": "elijah@purcell-ventures.com",
      "telephone": "+12054627839",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Acworth",
        "addressRegion": "GA",
        "addressCountry": "US",
      },
      // THE COMPANY'S OWN PROFILES, NOT HIS. This array previously listed his personal
      // LinkedIn, GitHub and Instagram, which asserts that the company is those accounts.
      // It is not. The LinkedIn company page is verified live (200) before being listed;
      // the Yelp listing exists but returns 403 to a non-browser request, so it stays out
      // until it can be checked properly rather than being asserted on faith.
      "sameAs": [
        "https://www.linkedin.com/company/138853899/",
        "https://github.com/thebigjah",
        "https://ua-today.vercel.app",
        "https://purcellventures.co/who"],
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "employee": { "@id": "https://purcellventures.co/#founder" },
      "knowsAbout": [
        "Web development for small business", "Custom software development",
        "AI consulting", "Autonomous AI agent systems", "Business process automation",
        "Search engine optimization",
      ],
      "areaServed": [
        { "@type": "City", "name": "Tuscaloosa" },
        { "@type": "City", "name": "Acworth" },
        { "@type": "AdministrativeArea", "name": "Metro Atlanta" },
        { "@type": "Country", "name": "United States" },
      ],
      "slogan": "Built by one operator for the small businesses who move first.",
      // One human. The fifteen agents are software and the team page says so in its first
      // sentence, so the count here stays honest rather than flattering.
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 1 },
    },
    {
      "@type": "Person",
      "@id": "https://purcellventures.co/#founder",
      "name": "Elijah Purcell",
      "image": "https://purcellventures.co/brand/elijah.jpg",
      "givenName": "Elijah",
      "familyName": "Purcell",
      "jobTitle": "Autonomous AI Agent Systems Engineer",
      "description": "Founder of Purcell Ventures LLC, a Georgia software company, and a psychology and data science student at the University of Alabama Honors College, Class of 2030, on a pre-med track toward psychiatry. Based in Tuscaloosa, Alabama. Builds and operates autonomous AI agent systems.",
      "worksFor": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co",
      "email": "elijah@purcell-ventures.com",
      "telephone": "+12054627839",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tuscaloosa",
        "addressRegion": "AL",
        "addressCountry": "US",
      },
      // DISAMBIGUATION, WHICH IS THE WHOLE FIGHT.
      //
      // schema.org has a property built for exactly this situation, where two entities
      // share a name and a reader needs one sentence to tell them apart.
      //
      // The names here come from Google in a real browser on 20 Aug 2026, not from a
      // search API, and the two disagreed. The API returned a Duke Energy HR business
      // partner in the top three; Google returns him nowhere in the top twenty. Who
      // actually ranks: a campus pastor at Liberty Church in Pensacola at position two, a
      // Farragut High linebacker recruit in Knoxville, and an amateur boxer in Brisbane.
      // Naming a competitor who does not rank is useless, and naming the wrong one makes
      // the page look like it is guessing.
      "disambiguatingDescription":
        "The Elijah Purcell who founded Purcell Ventures LLC and studies psychology and data science at the University of Alabama in Tuscaloosa. Not the campus pastor at Liberty Church in Pensacola, Florida, not the Farragut High School football recruit in Knoxville, Tennessee, and not the amateur boxer in Brisbane, Australia.",
      "birthDate": "2007-08",
      "nationality": { "@type": "Country", "name": "United States" },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "University of Alabama",
        "url": "https://www.ua.edu",
      },
      "affiliation": {
        "@type": "CollegeOrUniversity",
        "name": "University of Alabama Honors College",
        "url": "https://honors.ua.edu",
      },
      "homeLocation": { "@type": "Place", "name": "Tuscaloosa, Alabama" },
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Autonomous AI Agent Systems Engineer",
          "description":
            "Builds and operates autonomous AI agent systems in production: a fifteen-agent workforce handling proposals, audits, compliance and outreach on a schedule, with an ELO-scored autonomy tier and an append-only message bus between agents.",
          "occupationLocation": { "@type": "City", "name": "Tuscaloosa" },
        },
        {
          "@type": "Occupation",
          "name": "Software company founder",
          "occupationLocation": { "@type": "City", "name": "Tuscaloosa" },
        },
        {
          "@type": "Occupation",
          "name": "Psychology and data science student, pre-med",
          "occupationLocation": { "@type": "City", "name": "Tuscaloosa" },
        },
      ],
      // Dated, because an undated award reads as a present-tense fact to a person
      // skimming and to a model summarising alike.
      "award": [
        "Christian Character Award, Grove Christian School (2024)",
        "Steadfast Award, Grove Christian School (2023)",
      ],
      "knowsAbout": [
        "Autonomous AI agent systems", "Agentic AI architecture", "Multi-agent systems",
        "AI for mental health care", "AI in healthcare administration",
        "Artificial Intelligence", "AI consulting", "Large language model evaluation",
        "Web development for small business", "Custom software development",
        "Software engineering", "Psychology", "Data science",
        "Search engine optimization",
      ],
      // Every profile he controls, listed identically here and in the rel="me" links in
      // the footer. Two independent assertions that agree is what merges four profiles
      // into one entity rather than leaving four strangers who share a name.
      "sameAs": [
        "https://www.linkedin.com/in/theelijahpurcell",
        "https://github.com/thebigjah",
        "https://www.instagram.com/theelijahpurcell/",
        "https://purcellventures.co/who",
        "https://purcellventures.co/resume",
        "https://ua-today.vercel.app/about.html"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cinzel.variable} ${dmSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SiteNav />
        {children}
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
