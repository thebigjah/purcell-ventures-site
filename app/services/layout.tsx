import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Field Services have moved to Mantle Field Services",
  description:
    "Our gutter cleaning, pressure washing, and lawn care work is now run under our sister brand Mantle Field Services. Same owner, same standards. Visit mantlefield.com.",
  alternates: { canonical: "https://mantle-field-site.vercel.app" },
  robots: { index: false, follow: true },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
