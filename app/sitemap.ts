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
    { url: `${BASE}/case-studies`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // About + personal depth
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/now`,     lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/uses`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/verses`,  lastModified: now, changeFrequency: "monthly", priority: 0.5 },
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
