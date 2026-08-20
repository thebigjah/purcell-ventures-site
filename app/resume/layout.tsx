import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell: Resume & Scholarship Record",
  keywords: [
    "Elijah Purcell", "Elijah Purcell resume", "Purcell Ventures founder",
    "University of Alabama 2026", "scholarship recipient", "high school entrepreneur",
  ],
  openGraph: {
    title: "Elijah Purcell: Resume & Scholarship Record",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC and a psychology and data science student at the University of Alabama Honors College. Full record of shipped software, AI agent systems, client work, education and awards.",
    url: "https://purcellventures.co/resume",
    type: "profile",
  },
  twitter: {
    title: "Elijah Purcell: Resume & Scholarship Record",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC and a psychology and data science student at the University of Alabama Honors College. Full record of shipped software, AI agent systems, client work, education and awards.",
  },
  alternates: { canonical: "https://purcellventures.co/resume" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://purcellventures.co/#founder",
  "name": "Elijah Purcell",
  "image": "https://purcellventures.co/brand/elijah.jpg",
  "jobTitle": "Founder & CEO",
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
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University of Alabama",
    "url": "https://www.ua.edu",
  },
  // The award list is not the lead. His rule, 20 Aug 2026: the scholarship total
  // belongs on the college-application course page and nowhere else, because a number
  // like that in a snippet says "impressive student" where the work says "ships software".
  "award": "Christian Character Award, Grove Christian School (2024)",
  "knowsAbout": [
    "Artificial Intelligence", "Software Engineering", "Digital Marketing",
    "Business Management", "Web Development", "AI Consulting",
  ],
  "sameAs": ["https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://github.com/thebigjah",
        "https://www.instagram.com/elijah_the_tall/"],
};

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
