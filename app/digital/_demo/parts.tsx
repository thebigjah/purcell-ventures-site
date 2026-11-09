import Link from "next/link";
import type { ReactNode } from "react";

/** A labelled text, number, date or time input on the kit's .ui-field styles. */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`ui-field${className ? ` ${className}` : ""}`}>
      <span className="ui-small ui-muted">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

/** The hero kicker on the demo pages: a plain link back to the tools index. */
export function ToolsKicker({ children = "Free tools" }: { children?: ReactNode }) {
  return (
    <Link href="/digital/tools" className="ui-gold" style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

/**
 * Plain prose under a free tool: who it is for, what it replaces, how setup works and
 * what the paid version adds. Rendered on the server with the page, so the text is there
 * before any script runs. Hidden when printing, so a printed estimate stays clean.
 */
export function AboutTool({ sections }: { sections: { h: string; p: ReactNode[] }[] }) {
  return (
    <div className="ui-wrap no-print" style={{ paddingBottom: 88 }}>
      <div className="ui-prose">
        {/* Flat h2 and p children, so the kit's `.ui-prose > * + *` spacing applies. */}
        {sections.flatMap((sec) => [
          <h2 key={sec.h}>{sec.h}</h2>,
          ...sec.p.map((t, i) => <p key={`${sec.h}-${i}`}>{t}</p>),
        ])}
      </div>
    </div>
  );
}
