import { NextRequest, NextResponse } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  const { className, text, dateFormatted, nextCampusDay, tomorrowFormatted } = await req.json();
  if (!className || !text || !dateFormatted)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const prompt =
`This is a teacher's lesson plan for the class "${className}".
Today is ${dateFormatted}.
Tomorrow is ${tomorrowFormatted || "the next day"}.
Next on-campus school day is ${nextCampusDay || "the next school day"} (school meets Monday/Wednesday/Friday only).

Teachers format lesson plans differently — some list work on the day assigned, some on the day due, some as "tomorrow's work". Account for all styles.

Scan the ENTIRE document and categorize tasks:

"must_do" — the student needs to act on this TODAY or TOMORROW:
- Due today or tomorrow
- Overdue
- Anything that must be PREPARED or BROUGHT to the next on-campus day (${nextCampusDay})
- Any quiz or test ON the next on-campus day (${nextCampusDay}) → write it as "Study for [topic] (quiz/test ${nextCampusDay})"

"should_do" — important but not urgent today:
- Due later this week or next week (not today/tomorrow)
- Ongoing projects worth making progress on
- Tests or quizzes more than one on-campus day away

Rules:
- Each task is one concise line. Include due date in parentheses if known, e.g. "Read Ch. 5 (due Wed)"
- Do not put the same task in both lists
- Do not invent tasks that aren't in the lesson plan
- If nothing applies, return an empty array

Return ONLY valid JSON (no markdown, no explanation):
{"must_do": ["task 1", "task 2"], "should_do": ["task 1"]}

LESSON PLAN:
${text.slice(0, 10000)}`;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json({ error: err.error?.message || `Groq error ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  const raw = data.choices[0].message.content.trim()
    .replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json({ must_do: parsed.must_do || [], should_do: parsed.should_do || [] });
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }
}
