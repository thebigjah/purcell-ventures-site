import { notFound } from "next/navigation";
import { PageHero, Section, Prose, Button } from "@/app/components/ui";
import FaqBlock from "@/app/components/FaqBlock";
import { AI_TOOLS, getTool } from "@/lib/ai-tools";
import { getToolGuide } from "@/lib/tool-guides";
import s from "../../_demo/demo.module.css";
import { ToolsKicker } from "../../_demo/parts";
import ToolRunner from "./ToolRunner";

// Every tool page prerenders, so the guide text is in the HTML a crawler reads.
export function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const guide = getToolGuide(slug);

  return (
    <main>
      <PageHero kicker={<ToolsKicker>Free AI tools</ToolsKicker>} title={tool.name} lede={guide?.intro ?? tool.description} />

      <div className={`ui-wrap ${s.body}`}>
        <ToolRunner slug={slug} />
      </div>

      {guide && (
        <>
          <Section title="How to use it">
            <Prose>
              <ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            </Prose>
          </Section>

          <Section title="Examples" intro="Sample inputs written for this page, with the kind of result the tool returns.">
            <Prose>
              {guide.examples.map((ex) => (
                <div key={ex.label}>
                  <h3>{ex.label}</h3>
                  <p><strong>Input.</strong> {ex.input}</p>
                  <p><strong>What to expect.</strong> {ex.output}</p>
                </div>
              ))}
            </Prose>
          </Section>

          <Section title="Check the draft before you use it">
            <Prose>
              <ul>{guide.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            </Prose>
          </Section>

          <Section title="When to skip this tool">
            <Prose>
              <ul>{guide.avoid.map((a) => <li key={a}>{a}</li>)}</ul>
            </Prose>
          </Section>

          <FaqBlock qa={guide.faqs} />
        </>
      )}

      {/* The Starter Kit upsell sits on every tool page. */}
      <div className={`ui-wrap ${s.body}`}>
        <section style={{ paddingTop: 40, borderTop: "1px solid var(--line)", maxWidth: 760 }}>
          <h2 className={s.sub} style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>The PV AI Starter Kit: all 24 prompts for $19</h2>
          <p className="ui-muted" style={{ margin: 0 }}>
            The kit has 24 AI prompts, this one included, plus 5 sales scripts, the full rep handbook, 50+ cold-outreach templates, a contractor agreement and a CRM file in CSV. Every file is editable. It costs $19 once and downloads right away.
          </p>
          <div className={s.actions} style={{ marginTop: 24 }}>
            <Button href="/shop/starter-kit">See the Starter Kit</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
