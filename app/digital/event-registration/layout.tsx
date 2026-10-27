import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free event registration and check-in tool, Purcell Ventures" },
  description: "Create an event, collect RSVPs and check guests in at the door. Free, no signup, and events stay on your device.",
  alternates: { canonical: "/digital/event-registration" },
  openGraph: { title: "Free event registration and check-in tool, Purcell Ventures", description: "Create an event, collect RSVPs and check guests in at the door. Free, no signup, and events stay on your device.", url: "https://purcellventures.co/digital/event-registration", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
