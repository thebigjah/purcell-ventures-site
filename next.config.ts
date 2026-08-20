import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // THE NFC CARD LIVES HERE NOW, AND THE REASON IS PHYSICAL.
    //
    // The tap card was deployed as its own Vercel project, which gave it two problems that
    // only matter once the URL is printed onto something you cannot edit.
    //
    // First, that project sits behind Vercel Authentication, so every route including the
    // vCard itself returns a 302 to an SSO login. A tag pointing there hands a stranger a
    // sign-in page.
    //
    // Second, and worse, it had no custom domain, so the only URL was
    // tap-4t77dunlv-elijahs-projects-7ec74190.vercel.app. That hostname is tied to a
    // specific deployment. Writing it to a physical tag guarantees a dead tag the next
    // time anything is deployed, and a tag cannot be patched: it is in someone's wallet.
    //
    // purcellventures.co is already public, already has the domain, and is already the
    // thing he wants people to see. So the card is served from here, and the URL to write
    // to the tags is purcellventures.co/card. Next does not serve index.html for a
    // directory under public/, hence these rewrites.
    return [
      { source: "/card", destination: "/card/index.html" },
      { source: "/card/hire", destination: "/card/hire/index.html" },
      { source: "/card/campus", destination: "/card/campus/index.html" },
      { source: "/card/rep", destination: "/card/rep/index.html" },
    ];
  },
};

export default nextConfig;
