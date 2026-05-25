import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/digital/playbook",
          "/digital/finder",
          "/crm",
          "/invoicing",
          "/newsletter",
          "/qr",
          "/business-cards",
          "/logos",
          "/consulting/book",
          "/writing",
          "/verses",
          "/sales-rep",
          "/rep-portal",
          "/links",
          "/uses",
          "/shop",
          "/free",
        ],
      },
    ],
    sitemap: "https://purcellventures.co/sitemap.xml",
  };
}
