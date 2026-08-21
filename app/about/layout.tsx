import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Elijah Purcell | Founder of Purcell Ventures LLC",
  description:
    "Elijah Purcell is the founder of Purcell Ventures LLC, a Georgia software company building sites, software and AI tooling for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
  keywords: [
    "Elijah Purcell", "Elijah Purcell founder", "Purcell Ventures founder",
    "AI consultant Georgia", "entrepreneur Tuscaloosa Alabama", "Elijah Purcell entrepreneur",
    "Purcell Ventures LLC founder", "University of Alabama 2026", "Elijah Purcell bio",
  ],
  openGraph: {
    title: "About Elijah Purcell: Founder of Purcell Ventures LLC",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC, a Georgia software company building sites, software and AI tooling for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
    url: "https://purcellventures.co/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elijah Purcell: Founder, Purcell Ventures LLC",
    description: "Entrepreneur, AI consultant, software developer. Tuscaloosa, Alabama. University of Alabama Honors College, Class of 2030.",
  },
  alternates: { canonical: "https://purcellventures.co/about" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://purcellventures.co/about",
      "url": "https://purcellventures.co/about",
      "name": "About Elijah Purcell",
      "description": "Profile page for Elijah Purcell, Founder and CEO of Purcell Ventures LLC.",
      "mainEntity": { "@id": "https://purcellventures.co/#founder" },
      "about": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
    },
    {
      "@type": "Person",
      "@id": "https://purcellventures.co/#founder",
      "name": "Elijah Purcell",
      "image": "https://purcellventures.co/brand/elijah.jpg",
      "givenName": "Elijah",
      "familyName": "Purcell",
      "jobTitle": "Founder & CEO",
      "description": "Entrepreneur, AI consultant, and software developer based in Tuscaloosa, Alabama. Founder of Purcell Ventures LLC — a multi-division company offering digital services, AI consulting, and custom software development. Also founder of Mantle Field Services, a sister brand handling owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta. Student at the University of Alabama Honors College, Class of 2030, studying psychology and data science.",
      "worksFor": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co",
      "email": "elijah@purcell-ventures.com",
      "telephone": "+12054627839",
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
      "award": "Christian Character Award, Grove Christian School (2024)",
      "knowsAbout": [
        "Artificial Intelligence",
        "AI Consulting",
        "Digital Marketing",
        "Web Development",
        "Software Engineering",
        "Custom Software Development",
        "Small Business Automation",
        "Business Technology",
        "Gutter Cleaning",
        "Pressure Washing",
        "Lawn Care",
      ],
      "sameAs": [
        "https://www.linkedin.com/in/theelijahpurcell",
        "https://purcellventures.co/resume",
        "https://github.com/thebigjah",
        "https://www.instagram.com/elijah_the_tall/"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elijah Purcell is an entrepreneur, AI consultant, and software developer based in Tuscaloosa, Alabama. He is the founder and CEO of Purcell Ventures LLC, a multi-division company offering digital services, AI consulting, and custom software development. He also founded Mantle Field Services, a sister brand handling owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta. He is a student at the University of Alabama Honors College, having enrolled in Fall 2026.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Purcell Ventures LLC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is a Georgia-based multi-division company founded by Elijah Purcell. Its divisions include: Digital Services (websites, AI tools, CRM, booking systems for small businesses), AI Consulting (hands-on team training and workshops), and Custom Software Development (mobile apps, web apps, AI integrations). A sister brand, Mantle Field Services, handles owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Purcell Ventures located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is based in Acworth, Georgia. Digital services and AI consulting are available nationwide. Sister brand Mantle Field Services serves the Metro Atlanta area (Kennesaw, Marietta, Acworth, Canton, Woodstock) with gutter cleaning, pressure washing, and lawn care.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I contact Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Elijah Purcell by email at elijah@purcell-ventures.com or by phone at (205) 462-7839.",
          },
        },
      ],
    },
  ],
};


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Elijah Purcell",
      "item": "https://purcellventures.co/about"
    }
  ]
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
