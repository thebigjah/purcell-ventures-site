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
