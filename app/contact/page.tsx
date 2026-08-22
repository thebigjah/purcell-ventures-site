import { permanentRedirect } from "next/navigation";

// /contact returned 404. Nothing on the site links to it, so it was not a broken path in
// the navigation sense, but it is the single most-guessed URL on any business site: people
// type it directly, and a dead end there loses someone who was already trying to reach him.
//
// Done as its own route rather than a redirect in next.config.ts deliberately. This file
// cannot affect anything else on the site; an edit to the root config can.
//
// permanentRedirect, not redirect. `redirect()` issues a 307 (temporary), which was what
// this shipped as first and it contradicted the comment sitting above it. This will not
// change, and a 308 consolidates any link equity onto the real contact section rather than
// splitting it.
export default function ContactRedirect() {
  permanentRedirect("/about#contact");
}
