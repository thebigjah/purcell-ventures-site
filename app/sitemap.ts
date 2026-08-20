import { MetadataRoute } from "next";

const BASE = "https://purcellventures.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    // Home — top priority
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Division pages — high priority, what the business card links to
    { url: `${BASE}/digital`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/consulting`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/software`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Booking + case studies — conversion paths
    { url: `${BASE}/consulting/book`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/ai-readiness`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ai-cost-calculator`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // The reporting series. An author byline on a piece ABOUT other people, in a named
    // place, is an entity signal no amount of self-description produces, and it is the
    // only page here that also generates conversations with prospects.
    { url: `${BASE}/blog/tuscaloosa-small-business-online`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // The name-query pages. /who exists specifically to be the answer to
    // "who is Elijah Purcell", and it is the highest-priority page on the site for
    // that query, so it outranks the division pages here on purpose.
    { url: `${BASE}/who`,  lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // About + personal depth
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/now`,     lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/uses`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/verses`,  lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/writing`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/links`,   lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/faq`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resume`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Courses — discoverable
    { url: `${BASE}/courses`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/courses/college-apps`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/courses/business-launch`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/courses/ai-automation`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Field services redirect
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
