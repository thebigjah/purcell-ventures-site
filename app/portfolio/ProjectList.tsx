"use client";

import { useState } from "react";

// The filter is the one piece of real interactivity on /portfolio, so it lives here and
// the page itself stays a server component. Build details sit in a <details> element so
// every line is in the HTML a crawler reads, open or closed.

export type Category = "All" | "Web" | "AI tools" | "Mobile" | "Internal";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: Category[];
  techStack: string[];
  liveUrl?: string;
  status: "Live" | "Internal";
  detailLines: string[];
}

const CATEGORIES: Category[] = ["All", "Web", "AI tools", "Mobile", "Internal"];

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter projects" className="pf-chips" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`ui-btn${active === cat ? "" : " ui-btn--ghost"}`}
            style={{ minHeight: 44 }}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="ui-muted ui-small" aria-live="polite" style={{ margin: "0 0 20px" }}>
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="ui-entries">
        {visible.map((p) => (
          <article className="ui-entry" key={p.slug} id={p.slug}>
            <div>
              <h3>{p.title}</h3>
              <p className="ui-entry__org">{p.subtitle}</p>
            </div>
            <span className="ui-entry__when">{p.status}</span>
            <div className="ui-entry__body">
              <p>{p.description}</p>
              <details>
                <summary className="ui-link" style={{ cursor: "pointer", padding: "10px 0", minHeight: 44 }}>
                  Build details
                </summary>
                <ul>
                  {p.detailLines.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </details>
              {p.liveUrl && (
                <p>
                  <a className="ui-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit {p.liveUrl.replace(/^https:\/\//, "")}
                  </a>
                </p>
              )}
            </div>
            <p className="ui-entry__stack">{p.techStack.join(", ")}</p>
          </article>
        ))}
      </div>
    </>
  );
}
