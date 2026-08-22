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
          // /links was here until 22 Aug 2026. Removed on his explicit instruction.
          //
          // It is the hub page his bio links to, it names his external profiles, and a
          // live test in Search Console returned "Page cannot be crawled: Blocked by
          // robots.txt", which is why it sat in Discovered-not-indexed. Blocking it also
          // made its ProfilePage schema and its six outbound profile links inert, and
          // those links are the only thing on the site pointing a crawler at the
          // independent records of him that exist.
          //
          // /uses, /verses and /writing stay blocked. Those were separate decisions and he
          // did not ask for them.
          "/uses",
          "/shop",
          "/free",
        ],
      },
    ],
    sitemap: "https://purcellventures.co/sitemap.xml",
  };
}
