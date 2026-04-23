import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://purcellventures.co"),
  title: {
    default: "Purcell Ventures | Digital Services, AI Consulting & Custom Software",
    template: "%s | Purcell Ventures",
  },
  description:
    "Georgia-based company offering complete digital services, hands-on AI consulting, custom software development, and owner-operated field services. Founded by Elijah Purcell.",
  keywords: [
    "AI consulting", "digital services for small business", "custom software development",
    "business AI training", "website management", "Purcell Ventures", "Elijah Purcell",
    "gutter cleaning Kennesaw", "pressure washing Metro Atlanta",
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
      "Georgia-based company offering complete digital services, AI consulting, custom software, and owner-operated field services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purcell Ventures | Digital Services, AI Consulting & Custom Software",
    description:
      "Georgia-based company offering complete digital services, AI consulting, custom software, and field services.",
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
      "description": "Digital services, AI consulting, custom software, and field services. Founded by Elijah Purcell.",
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
      "description": "Multi-division company offering digital services, AI consulting, custom software development, and owner-operated field services. Founded by Elijah Purcell in Georgia.",
      "foundingDate": "2023",
      "foundingLocation": {
        "@type": "Place",
        "name": "Acworth, Georgia, USA",
      },
      "email": "elijah@purcell-ventures.com",
      "telephone": "+17702805319",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Acworth",
        "addressRegion": "GA",
        "addressCountry": "US",
      },
      "sameAs": [
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://twitter.com/elijahpurcell",
      ],
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 1 },
    },
    {
      "@type": "Person",
      "@id": "https://purcellventures.co/#founder",
      "name": "Elijah Purcell",
      "givenName": "Elijah",
      "familyName": "Purcell",
      "jobTitle": "Founder & CEO",
      "description": "Entrepreneur, AI consultant, and software developer based in Acworth, Georgia. Founder of Purcell Ventures LLC. Enrolling at University of Alabama Honors College, Fall 2026.",
      "worksFor": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co",
      "email": "elijah@purcell-ventures.com",
      "telephone": "+17702805319",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Acworth",
        "addressRegion": "GA",
        "addressCountry": "US",
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "University of Alabama",
        "url": "https://www.ua.edu",
      },
      "award": "34 college acceptances totaling $505,000+/year in scholarships",
      "knowsAbout": [
        "Artificial Intelligence", "AI Consulting", "Digital Marketing",
        "Web Development", "Business Technology", "Software Engineering",
        "Custom Software Development", "Small Business Automation",
      ],
      "sameAs": [
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://twitter.com/elijahpurcell",
        "https://purcellventures.co/resume",
      ],
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
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
