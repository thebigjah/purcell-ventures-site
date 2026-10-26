import { PageHero, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// The 404 page, rebuilt on the page kit 26 Oct 2026.
export default function NotFound() {
  return (
    <main>
      <PageHero
        kicker="404"
        title="This page does not exist"
        lede="The address may be mistyped, or the page has moved. The links below cover the rest of the site."
        actions={<>
          <Button href="/">Home</Button>
          <Button href="/links" ghost>All links</Button>
          <Button href={`mailto:${CONTACT.email}`} ghost>Email Elijah</Button>
        </>}
      />
    </main>
  );
}
