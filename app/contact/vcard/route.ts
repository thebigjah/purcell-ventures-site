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
    "N:Purcell;Elijah;Brent;;\r\nFN:Elijah Purcell\r\n" +
    "ORG:Purcell Ventures LLC\r\nTITLE:Founder/CEO\r\n" +
    `TEL;TYPE=WORK,VOICE:${CONTACT.phoneE164}\r\n` +
    `EMAIL;TYPE=WORK:${CONTACT.email}\r\n` +
    "URL:https://purcellventures.co\r\n" +
    `ADR;TYPE=WORK:;;;${CONTACT.personCity};${CONTACT.personRegion};;USA\r\n` +
    photo +
    "END:VCARD\r\n";
  return new Response(card, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Elijah-Purcell.vcf"',
    },
  });
}
