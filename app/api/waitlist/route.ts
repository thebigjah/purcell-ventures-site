import { NextRequest, NextResponse } from "next/server";

const COURSE_NAMES: Record<string, string> = {
  "college-apps":    "The College Application Playbook",
  "business-launch": "The Business Launch Playbook",
  "ai-automation":   "Zero to Automated",
};

export async function POST(req: NextRequest) {
  let email: string, course: string;
  try {
    ({ email, course } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!email || !course) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — log and return ok so the UI still shows success
    console.warn("RESEND_API_KEY not set — waitlist signup not delivered:", email, course);
    return NextResponse.json({ ok: true });
  }

  const courseName = COURSE_NAMES[course] ?? course;
  const timestamp  = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Purcell Ventures <onboarding@resend.dev>",
      to:   ["elijah@purcell-ventures.com"],
      subject: `Waitlist: ${courseName}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;background:#faf8f4;padding:32px;border:1px solid #e0d8c4">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#b8941e;margin-bottom:12px">
            Purcell Ventures · Course Waitlist
          </div>
          <h2 style="color:#0c0a08;margin:0 0 18px 0;font-family:Cinzel,Georgia,serif;font-size:22px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;border-bottom:1px solid #d4af37;padding-bottom:14px">
            New signup <em style="color:#d4af37;font-weight:400">received.</em>
          </h2>
          <p style="font-size:16px;color:#0c0a08;margin:0 0 8px 0;font-family:Georgia,serif;font-style:italic">
            <strong style="font-family:Cinzel,Georgia,serif;font-style:normal">${email}</strong> joined the waitlist for
            <strong style="font-family:Cinzel,Georgia,serif;font-style:normal;color:#b8941e">${courseName}</strong>.
          </p>
          <p style="font-size:11px;color:#7a6a52;margin:20px 0 0 0;letter-spacing:0.18em;text-transform:uppercase">
            ${timestamp} ET · ${course}
          </p>
        </div>
      `,
    }),
  });

  const resendOk = res.ok;
  if (!resendOk) console.error("Resend error:", await res.text());

  // ntfy fallback so course-waitlist signups never get lost
  const ntfyTopic = process.env.NTFY_TOPIC;
  if (ntfyTopic) {
    try {
      await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: "POST",
        headers: {
          Title: `Waitlist: ${courseName}`.replace(/[^\x20-\x7E]/g, " ").slice(0, 80),
          Priority: "default",
          Tags: "books,bell",
          "Content-Type": "text/plain; charset=utf-8",
        },
        body: `${email}\nCourse: ${courseName}\n${timestamp} ET`,
      });
    } catch (e) {
      console.warn("ntfy fallback failed", e);
    }
  }

  return NextResponse.json({ ok: true, delivered: resendOk });
}
