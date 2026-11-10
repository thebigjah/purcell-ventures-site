// The places the company serves, carried once on the sitewide Organization node in
// app/layout.tsx. This used to ride on a second ProfessionalService node that reused the
// Organization @id on each service page, which gave crawlers two different type lists for
// one entity. Merged into the one node on 9 Nov 2026.
//
// Georgia is listed because the LLC is registered there (Acworth). The Alabama cities,
// Kennesaw, Marietta, Acworth and Chattanooga each have a city page under /ai-consulting.

const AL = { "@type": "State", name: "Alabama" };
const GA = { "@type": "State", name: "Georgia" };
const TN = { "@type": "State", name: "Tennessee" };

export const SERVICE_AREA = [
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
  { "@type": "AdministrativeArea", name: "Metro Atlanta" },
  { "@type": "Country", name: "United States" },
];
