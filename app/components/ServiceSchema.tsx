// The company as a ProfessionalService with the places it serves, on each service page.
//
// It reuses the Organization @id from app/layout.tsx on purpose. A new @id would declare
// a second business on every service page. The same @id adds a type and a service area
// to the one entity the rest of the graph already points at, and each page's own Service
// node reaches it through `provider`.
//
// Georgia is listed because the LLC is registered there (Acworth). The Alabama cities are
// the service area chosen for these pages on 9 Nov 2026. Kennesaw, Marietta and Acworth
// joined the same day with their own city pages under /ai-consulting, and so did
// Chattanooga, Tennessee.

const ORG = "https://purcellventures.co/#organization";
const AL = { "@type": "State", name: "Alabama" };
const GA = { "@type": "State", name: "Georgia" };
const TN = { "@type": "State", name: "Tennessee" };

const AREA = [
  ...["Tuscaloosa", "Birmingham", "Huntsville", "Montgomery", "Mobile", "Auburn"].map((name) => ({
    "@type": "City",
    name,
    containedInPlace: AL,
  })),
  AL,
  ...["Kennesaw", "Marietta", "Acworth"].map((name) => ({
    "@type": "City",
    name,
    containedInPlace: GA,
  })),
  GA,
  { "@type": "City", name: "Chattanooga", containedInPlace: TN },
];

const LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG,
  name: "Purcell Ventures LLC",
  url: "https://purcellventures.co",
  areaServed: AREA,
};

export default function ServiceSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />;
}
