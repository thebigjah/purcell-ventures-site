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
          "/sales-rep",
          // /links was here until 22 Aug 2026. Removed on his explicit instruction.
          //
          // It is the hub page his bio links to, it names his external profiles, and a
          // live test in Search Console returned "Page cannot be crawled: Blocked by
          // robots.txt", which is why it sat in Discovered-not-indexed. Blocking it also
          // made its ProfilePage schema and its six outbound profile links inert, and
          // those links are the only thing on the site pointing a crawler at the
          // independent records of him that exist.
          //
          // /uses, /verses, /shop and /rep-portal were removed on 9 Nov 2026. /shop and
          // /rep-portal carry a robots noindex in their layouts, and a crawler blocked here
          // never reads that tag, so a blocked URL could still be indexed from links alone.
          // /writing stays blocked.
          "/free",
        ],
      },
    ],
    sitemap: "https://purcellventures.co/sitemap.xml",
  };
}
