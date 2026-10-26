import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Field services moved to Mantle Field Services",
  description:
    "Gutter cleaning, pressure washing and lawn care run as Mantle Field Services, a sister brand Elijah Purcell owns.",
  alternates: { canonical: "https://mantle-field-site.vercel.app" },
  robots: { index: false, follow: true },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
