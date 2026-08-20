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
  metadataBase: new URL("https://purcellventures.co"),
  title: {
    default: "Purcell Ventures | Digital Services, AI Consulting & Custom Software",
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
    title: "Purcell Ventures | Digital Services, AI Consulting & Custom Software",
    description:
      "Built by one operator for the small businesses who move first. Digital services, AI consulting, and custom software.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purcell Ventures | Digital Services, AI Consulting & Custom Software",
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
      "sameAs": [
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://github.com/thebigjah",
        "https://www.instagram.com/elijah_the_tall/"],
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 1 },
    },
    {
      "@type": "Person",
      "@id": "https://purcellventures.co/#founder",
      "name": "Elijah Purcell",
      "image": "https://purcellventures.co/brand/elijah.jpg",
      "givenName": "Elijah",
      "familyName": "Purcell",
      "jobTitle": "Founder & CEO",
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
      // share a name and a reader needs one sentence to tell them apart. A search for
      // "Elijah Purcell" on 20 Aug 2026 returned an HR business partner at Duke Energy in
      // positions one, three and four, a football recruit in Knoxville, and two unrelated
      // YouTube channels. Stating the difference outright is stronger than hoping the
      // other signals imply it.
      "disambiguatingDescription":
        "The Elijah Purcell who founded Purcell Ventures LLC and studies psychology and data science at the University of Alabama. Not the Elijah Purcell who works at Duke Energy, and not the high school football player.",
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
        "34 college acceptances totaling $505,000+/year in scholarship offers (2026)",
        "Christian Character Award, Grove Christian School (2024)",
        "Steadfast Award, Grove Christian School (2023)",
      ],
      "knowsAbout": [
        "Artificial Intelligence", "Autonomous AI agents", "AI Consulting",
        "Web Development", "Software Engineering", "Custom Software Development",
        "Small Business Automation", "Psychology", "Data Science",
        "AI in mental health care", "Search engine optimization",
      ],
      // Every profile he controls, listed identically here and in the rel="me" links in
      // the footer. Two independent assertions that agree is what merges four profiles
      // into one entity rather than leaving four strangers who share a name.
      "sameAs": [
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://github.com/thebigjah",
        "https://www.instagram.com/elijah_the_tall/",
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
