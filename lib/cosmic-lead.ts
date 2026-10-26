// Every site form hands its lead to COSMIC through this one call.
//
// The project has no RESEND_API_KEY on Vercel, and the booking and waitlist routes returned
// before their ntfy fallback when the key was missing, so until 26 Oct 2026 no form lead
// reached anyone. The lead now goes to the site's ntfy topic as JSON tagged "pvlead".
// ~/bh6/site_leads.py polls that topic every comms pass, files the lead, hands it to
// Quentin and texts Elijah. ntfy keeps messages 12 hours, and comms runs every 15 minutes.

export async function sendLead(kind: string, fields: Record<string, string | undefined>): Promise<boolean> {
  const topic = process.env.NTFY_TOPIC;
  const clean: Record<string, string> = { kind };
  for (const [k, v] of Object.entries(fields)) if (v) clean[k] = String(v).slice(0, 2000);
  if (!topic) {
    console.error("[LEAD NOT DELIVERED] NTFY_TOPIC not set", clean);
    return false;
  }
  const who = clean.name || clean.email || clean.contact || "someone";
  try {
    const res = await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: {
        Title: `PV lead, ${kind}: ${who}`.replace(/[^\x20-\x7E]/g, " ").slice(0, 80),
        Tags: "pvlead",
        Priority: "high",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clean),
    });
    if (!res.ok) console.error("[LEAD NOT DELIVERED] ntfy", res.status, clean);
    return res.ok;
  } catch (e) {
    console.error("[LEAD NOT DELIVERED] ntfy", e, clean);
    return false;
  }
}
