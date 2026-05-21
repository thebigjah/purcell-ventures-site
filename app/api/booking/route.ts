import { NextRequest, NextResponse } from "next/server";

const SESSION_LABELS: Record<string, string> = {
  "ai-basics":        "AI Basics for Business (2 hrs)",
  "chatgpt-workflow": "ChatGPT in Your Workflow (3 hrs)",
  "ai-marketing":     "AI for Marketing & Social Media (2.5 hrs)",
  "automation":       "Automating Your Business (4 hrs)",
  "custom":           "Custom Team Training",
};

const FORMAT_LABELS: Record<string, string> = {
  "1on1":      "1-on-1 ($175/hr)",
  "group":     "Small Group ($125/person)",
  "workshop":  "Workshop ($2,500 flat, up to 20)",
  "corporate": "Corporate / Custom (quote)",
};

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const {
    sessionType = "",
    format = "",
    datePreference = "",
    timePreference = "",
    name = "",
    business = "",
    email = "",
    phone = "",
    groupSize = "",
    notes = "",
  } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — booking not delivered:", { name, email, phone, sessionType, format });
    return NextResponse.json({ ok: true });
  }

  const sessionLabel = SESSION_LABELS[sessionType] ?? sessionType ?? "(not specified)";
  const formatLabel  = FORMAT_LABELS[format] ?? format ?? "(not specified)";
  const timestamp    = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;background:#faf8f4;padding:32px;border:1px solid #e0d8c4">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#b8941e;margin-bottom:12px;font-family:Inter,system-ui,sans-serif">
        Purcell Ventures · Consulting Booking
      </div>
      <h2 style="color:#0c0a08;margin:0 0 18px 0;font-family:Cinzel,Georgia,serif;font-size:24px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;border-bottom:1px solid #d4af37;padding-bottom:14px">New booking <em style="color:#d4af37;font-weight:400">submitted.</em></h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
        <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${escape(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Business</td><td style="padding:8px 0">${escape(business) || "(not given)"}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0;font-weight:600"><a href="tel:${escape(phone)}">${escape(phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${escape(email)}">${escape(email) || "(not given)"}</a></td></tr>
        <tr><td colspan="2" style="padding:16px 0 4px 0;border-top:1px solid #ddd"></td></tr>
        <tr><td style="padding:8px 0;color:#666">Session</td><td style="padding:8px 0;font-weight:600">${escape(sessionLabel)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Format</td><td style="padding:8px 0">${escape(formatLabel)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Group size</td><td style="padding:8px 0">${escape(groupSize) || "(not given)"}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Date pref</td><td style="padding:8px 0">${escape(datePreference) || "(not given)"}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Time pref</td><td style="padding:8px 0">${escape(timePreference) || "(not given)"}</td></tr>
        ${notes ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Notes</td><td style="padding:8px 0;white-space:pre-wrap">${escape(notes)}</td></tr>` : ""}
        <tr><td colspan="2" style="padding:16px 0 4px 0;border-top:1px solid #ddd"></td></tr>
        <tr><td style="padding:8px 0;color:#999;font-size:12px" colspan="2">Submitted ${escape(timestamp)} ET</td></tr>
      </table>
      <p style="margin-top:24px;font-size:13px;color:#666">Reply within 4 hours to maximize close rate.</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Purcell Ventures Bookings <onboarding@resend.dev>",
      to:   ["elijah@purcell-ventures.com"],
      reply_to: email || undefined,
      subject: `Booking: ${name}${business ? ` (${business})` : ""} - ${sessionLabel}`,
      html,
    }),
  });

  const resendOk = res.ok;
  if (!resendOk) {
    console.error("Resend error:", await res.text());
  }

  // ntfy fallback — never lose a booking even if Resend is missing/down
  const ntfyTopic = process.env.NTFY_TOPIC;
  if (ntfyTopic) {
    try {
      const ntfyBody = `${name} · ${phone}${email ? " · " + email : ""}\n${sessionLabel} (${formatLabel})${business ? "\nBusiness: " + business : ""}${groupSize ? "\nGroup: " + groupSize : ""}${datePreference ? "\nDate pref: " + datePreference : ""}${notes ? "\nNotes: " + notes : ""}`;
      const safeTitle = `PV booking: ${name}`.replace(/[^\x20-\x7E]/g, " ").slice(0, 80);
      await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: "POST",
        headers: {
          Title: safeTitle,
          Priority: "high",
          Tags: "moneybag,bell",
          "Content-Type": "text/plain; charset=utf-8",
        },
        body: ntfyBody,
      });
    } catch (e) {
      console.warn("ntfy fallback failed", e);
    }
  }

  return NextResponse.json({ ok: true, delivered: resendOk });
}

function escape(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
