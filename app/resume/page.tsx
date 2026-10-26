import type { Metadata } from "next";
import PrintButton from "./print/PrintButton";
import { ResumeDocument, RESUME_CSS } from "./ResumeDocument";

// The résumé as a sheet of paper on the site, the same document /resume/print prints.
// He asked for the PDF look on 26 Oct 2026, so the web version no longer has its own layout.

export const metadata: Metadata = {
  title: "Elijah Purcell, résumé",
  description:
    "Résumé of Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data science student at the University of Alabama Honors College: shipped software, AI agent systems, client work, education and awards.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="rw">
      <style dangerouslySetInnerHTML={{ __html: RESUME_CSS + WEB_CSS }} />
      <div className="rw-bar">
        <h1>Résumé</h1>
        <div className="rw-bar__actions">
          <PrintButton />
        </div>
      </div>
      <div className="rw-sheet rp">
        <ResumeDocument />
      </div>
    </main>
  );
}

const WEB_CSS = `
.rw { padding-block: 40px 96px; padding-left: var(--gutter); padding-right: var(--gutter-r); background: radial-gradient(ellipse at 50% 0%, rgba(184,134,43,.08), rgba(7,6,10,0) 55%), var(--bg); }
.rw-bar { max-width: 8.5in; margin: 0 auto 20px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.rw-bar h1 { font: 600 clamp(28px, 4vw, 40px)/1.05 var(--font-display); margin: 0; }
.rw-bar button { font: 600 15px/1 var(--font-body); min-height: 44px; padding: 0 20px; background: var(--gold); color: #111; border: 0; cursor: pointer; }
.rw-bar button:hover { background: var(--gold-text); }
.rw-sheet { max-width: 8.5in; margin: 0 auto; min-height: 0; border: 1px solid rgba(239,232,216,.14); }
.rw-sheet .rp-page { padding: 0.6in 0.65in; }
@media (max-width: 640px) { .rw-sheet .rp-page { padding: 24px 18px 32px; } .rw-sheet { font-size: 10pt; } }
@media print {
  header.nav, footer.foot, .chat-btn, .chat-panel, .rw-bar { display: none !important; }
  body, .page, .rw { background: #fff !important; padding: 0 !important; }
  .rw-sheet { border: 0; max-width: none; }
  .rw-sheet .rp-page { padding: 0; }
}`;
