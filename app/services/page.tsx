import type { Metadata } from "next";
import { PageHero, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Field services moved to Mantle",
  description:
    "Gutter cleaning, pressure washing and lawn care run as Mantle Field Services, a sister brand Elijah Purcell owns.",
};

const MANTLE_URL = "https://mantle-field-site.vercel.app";

export default function ServicesMovedPage() {
  return (
    <main>
      <PageHero
        kicker="Field services moved"
        title="Field services are now Mantle Field Services"
        lede="Gutter cleaning, pressure washing and lawn care run as Mantle Field Services, a sister brand I own."
        actions={<>
          <Button href={MANTLE_URL}>Visit Mantle Field Services</Button>
          <Button href={`tel:${CONTACT.phoneE164}`} ghost>{CONTACT.phone}</Button>
        </>}
      />
    </main>
  );
}
