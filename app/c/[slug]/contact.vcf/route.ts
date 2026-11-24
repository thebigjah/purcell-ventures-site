import { readFile } from "node:fs/promises";
import path from "node:path";
import { CARDS, fullName, getCard, toVCard } from "@/lib/cards";

// The vCard the web card saves, photo included. Android opens it in Contacts.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((c) => ({ slug: c.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const card = getCard((await params).slug);
  if (!card) return new Response("Not found", { status: 404 });
  let photo: string | undefined;
  if (card.photo) {
    photo = (await readFile(path.join(process.cwd(), "public", card.photo))).toString("base64");
  }
  const file = fullName(card).replace(/[^A-Za-z0-9]+/g, "-");
  return new Response(toVCard(card, photo), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${file}.vcf"`,
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
