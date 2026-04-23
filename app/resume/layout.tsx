import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell — Resume & Scholarship Record",
  keywords: [
    "Elijah Purcell", "Elijah Purcell resume", "Purcell Ventures founder",
    "University of Alabama 2026", "scholarship recipient", "high school entrepreneur",
  ],
  openGraph: {
    title: "Elijah Purcell — Resume & Scholarship Record",
    description:
      "34 college acceptances, $505k+/yr in scholarships. Founder of Purcell Ventures LLC. Enrolled at University of Alabama Honors College, Fall 2026.",
    url: "https://purcellventures.co/resume",
    type: "profile",
  },
  twitter: {
    title: "Elijah Purcell — Resume & Scholarship Record",
    description:
      "34 acceptances, $505k+/yr scholarships. Founder of Purcell Ventures LLC. Enrolling University of Alabama Fall 2026.",
  },
  alternates: { canonical: "https://purcellventures.co/resume" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://purcellventures.co/#founder",
  "name": "Elijah Purcell",
  "jobTitle": "Founder & CEO",
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
    "Artificial Intelligence", "Software Engineering", "Digital Marketing",
    "Business Management", "Web Development", "AI Consulting",
  ],
  "sameAs": ["https://www.linkedin.com/in/elijah-purcell-5128a9256"],
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
