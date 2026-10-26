import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/cosmic-lead";

// The /digital contact form. The lead goes to COSMIC (lib/cosmic-lead.ts).
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const { name = "", business = "", contact = "", need = "", plan = "", source = "" } = body;
  if (!name || !contact) {
    return NextResponse.json({ error: "Name and an email or phone are required" }, { status: 400 });
  }
  const ok = await sendLead("contact", { name, business, contact, need, plan, source });
  return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
}
