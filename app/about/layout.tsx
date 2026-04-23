import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Elijah Purcell | Founder of Purcell Ventures LLC",
  description:
    "Elijah Purcell is an entrepreneur, AI consultant, and software developer based in Acworth, Georgia. Founder of Purcell Ventures LLC. 34 college acceptances, $505k+/yr in scholarships. Enrolling University of Alabama Honors College, Fall 2026.",
  keywords: [
    "Elijah Purcell", "Elijah Purcell founder", "Purcell Ventures founder",
    "AI consultant Georgia", "entrepreneur Acworth Georgia", "Elijah Purcell entrepreneur",
    "Purcell Ventures LLC founder", "University of Alabama 2026", "Elijah Purcell bio",
  ],
  openGraph: {
    title: "About Elijah Purcell — Founder of Purcell Ventures LLC",
    description:
      "Entrepreneur, AI consultant, and software developer from Acworth, GA. 34 college acceptances, $505k+/yr in scholarships. Founder of Purcell Ventures LLC.",
    url: "https://purcellventures.co/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elijah Purcell — Founder, Purcell Ventures LLC",
    description: "Entrepreneur, AI consultant, software developer. Acworth, GA. Enrolling University of Alabama Fall 2026.",
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
      "givenName": "Elijah",
      "familyName": "Purcell",
      "jobTitle": "Founder & CEO",
      "description": "Entrepreneur, AI consultant, and software developer based in Acworth, Georgia. Founder of Purcell Ventures LLC — a multi-division company offering digital services, AI consulting, custom software, and owner-operated field services. Received 34 college acceptances totaling over $505,000 per year in scholarships. Enrolling at the University of Alabama Honors College in Fall 2026.",
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
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://twitter.com/elijahpurcell",
        "https://purcellventures.co/resume",
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elijah Purcell is an entrepreneur, AI consultant, and software developer based in Acworth, Georgia. He is the founder and CEO of Purcell Ventures LLC, a multi-division company offering digital services, AI consulting, custom software development, and owner-operated field services. He received 34 college acceptances with over $505,000 per year in scholarships and is enrolling at the University of Alabama Honors College in Fall 2026.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Purcell Ventures LLC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is a Georgia-based multi-division company founded by Elijah Purcell. Its divisions include: Digital Services (websites, AI tools, CRM, booking systems for small businesses), AI Consulting (hands-on team training and workshops), Custom Software Development (mobile apps, web apps, AI integrations), and Purcell Works (owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta).",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Purcell Ventures located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is based in Acworth, Georgia. Field services (Purcell Works) serve the Metro Atlanta area including Kennesaw, Marietta, Acworth, Canton, and Woodstock. Digital services and AI consulting are available nationwide.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I contact Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Elijah Purcell by email at elijah@purcell-ventures.com or by phone at (770) 280-5319.",
          },
        },
      ],
    },
  ],
};

export default function AboutLayout({ children }: { children: ReactNode }) {
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
