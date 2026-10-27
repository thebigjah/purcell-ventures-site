import { readFile } from "node:fs/promises";
import path from "node:path";
import { CONTACT } from "@/lib/contact";

// The contact card behind "Save to contacts" on /contact. Business details only: the
// Google Voice line and the business email. The NFC card at /card is a separate thing.
export const dynamic = "force-static";

export async function GET() {
  let photo = "";
  try {
    const jpg = await readFile(path.join(process.cwd(), "public/brand/elijah.jpg"));
    photo = `PHOTO;ENCODING=b;TYPE=JPEG:${jpg.toString("base64")}\r\n`;
  } catch {}
  const card =
    "BEGIN:VCARD\r\nVERSION:3.0\r\n" +
    "N:Purcell;Elijah;;;\r\nFN:Elijah Purcell\r\n" +   // no middle name: his call, 11 Sep 2026
    "ORG:Purcell Ventures LLC\r\nTITLE:Founder/CEO\r\n" +
    `TEL;TYPE=WORK,VOICE:${CONTACT.phoneE164}\r\n` +
    `EMAIL;TYPE=WORK:${CONTACT.email}\r\n` +
    "URL:https://purcellventures.co\r\n" +
    // Labelled so iOS and Android show "LinkedIn" rather than a bare "homepage" (his 11 Sep card change)
    "item1.URL:https://www.linkedin.com/in/theelijahpurcell\r\nitem1.X-ABLabel:LinkedIn\r\n" +
    "item2.URL:https://github.com/thebigjah\r\nitem2.X-ABLabel:GitHub\r\n" +
    "item3.URL:https://www.instagram.com/theelijahpurcell/\r\nitem3.X-ABLabel:Instagram\r\n" +
    photo +
    "END:VCARD\r\n";
  return new Response(card, {
    headers: {
      // Inline text/x-vcard is what makes iOS open its contact sheet. "attachment" filed the
      // card away in Files instead (the tap card learned this on 11 Sep 2026).
      "Content-Type": "text/x-vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="Elijah-Purcell.vcf"',
    },
  });
}
