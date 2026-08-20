import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/api-guard";
import { getTool } from "@/lib/ai-tools";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const { slug } = await params;
    const tool = getTool(slug);
    if (!tool) {
      return NextResponse.json({ error: `Unknown tool: ${slug}` }, { status: 404 });
    }

    const input = await req.json();

    // Validate required fields
    for (const field of tool.fields) {
      if (field.required && !input[field.name]) {
        return NextResponse.json({ error: `${field.label} is required` }, { status: 400 });
      }
    }

    const userMessage = tool.buildUserMessage(input);

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: tool.maxTokens || 1500,
      system: tool.systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // For JSON-formatted tools, parse and validate
    if (tool.outputFormat.startsWith("json-")) {
      const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");
      try {
        const parsed = JSON.parse(cleaned);
        return NextResponse.json({ format: tool.outputFormat, data: parsed });
      } catch {
        return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
      }
    }

    return NextResponse.json({ format: tool.outputFormat, content: text.trim() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
