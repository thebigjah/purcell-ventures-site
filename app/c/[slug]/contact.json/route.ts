import { CARDS, getCard } from "@/lib/cards";

// What the PV Card App Clip reads on an iPhone. Built once per card at deploy.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((c) => ({ slug: c.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const card = getCard((await params).slug);
  if (!card) return new Response("Not found", { status: 404 });
  return Response.json(card, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=86400" },
  });
}
