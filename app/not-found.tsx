import type { Metadata } from "next";
import { PageHero, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// The root layout sets robots index,follow, and Next adds its own noindex to a 404, so the
// page carried both tags. Clearing robots here leaves only the noindex Next adds.
export const metadata: Metadata = {
  robots: null,
};

// The 404 page, rebuilt on the page kit 26 Oct 2026.
export default function NotFound() {
  return (
    <main>
      <PageHero
        kicker="404"
        title="This page does not exist"
        lede="You may have mistyped the address, or the page has moved. The links below cover the rest of the site."
        actions={<>
          <Button href="/">Home</Button>
          <Button href="/links" ghost>All links</Button>
          <Button href={`mailto:${CONTACT.email}`} ghost>Email Elijah</Button>
        </>}
      />
    </main>
  );
}
