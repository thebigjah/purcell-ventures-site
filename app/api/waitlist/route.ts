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
      subject: `New waitlist signup — ${courseName}`,
      html: `
        <p style="font-family:sans-serif;font-size:15px;">
          <strong>${email}</strong> joined the waitlist for <strong>${courseName}</strong>.
        </p>
        <p style="font-family:sans-serif;font-size:13px;color:#666;">
          Time: ${timestamp} ET<br>
          Course: ${course}
        </p>
      `,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    // Still return ok to the user — don't show an error for a waitlist signup
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
