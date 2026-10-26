import type { Metadata } from "next";
import { PageHero, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Field services moved to Mantle",
  description:
    "Gutter cleaning, pressure washing and lawn care now run under Mantle Field Services, which Purcell Ventures still owns.",
};

const MANTLE_URL = "https://mantle-field-site.vercel.app";

export default function ServicesMovedPage() {
  return (
    <main>
      <PageHero
        kicker="Field services moved"
        title="Field services are now Mantle Field Services"
        lede="Gutter cleaning, pressure washing and lawn care now run under their own brand, Mantle Field Services. Purcell Ventures LLC still owns it, from Acworth, Georgia."
        actions={<>
          <Button href={MANTLE_URL}>Visit Mantle Field Services</Button>
          <Button href={`tel:${CONTACT.phoneE164}`} ghost>{CONTACT.phone}</Button>
        </>}
      />
    </main>
  );
}
