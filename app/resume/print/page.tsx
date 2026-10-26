import Link from "next/link";
import type { Metadata } from "next";
import PrintButton from "./PrintButton";
import { ResumeDocument, RESUME_CSS } from "../ResumeDocument";

// The résumé alone on white paper, for printing. The content lives in ../ResumeDocument.

export const metadata: Metadata = {
  title: "Résumé, print version",
  description: "Print layout of Elijah Purcell's résumé.",
  alternates: { canonical: "/resume/print" },
  robots: { index: false, follow: true },
};

export default function ResumePrintPage() {
  return (
    <main className="rp">
      <style dangerouslySetInnerHTML={{ __html: RESUME_CSS }} />
      <div className="rp-bar">
        <Link href="/resume">Back to the site</Link>
        <PrintButton />
      </div>
      <ResumeDocument />
    </main>
  );
}
