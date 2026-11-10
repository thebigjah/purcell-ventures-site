import Link from "next/link";
import { postsForPillar } from "@/lib/post-pillars";

// The posts that belong to this guide, from lib/post-pillars.ts. Each post links up to its
// guide in PostByline, and this list links back down, so the cluster is joined both ways.
export default function PillarReading({ href }: { href: string }) {
  const posts = postsForPillar(href);
  if (posts.length === 0) return null;
  return (
    <>
      <h2>What else should I read on this?</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.href}>
            <Link href={p.href}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
