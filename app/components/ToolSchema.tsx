// A free tool declared as a WebApplication, so search engines and AI answers can list it
// as a tool rather than an article. The provider is the one Organization @id from
// app/layout.tsx. Price 0 because every tool here is free to use with no account.

export default function ToolSchema({ name, path, description }: { name: string; path: string; description: string }) {
  const url = `https://purcellventures.co${path}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name,
    url,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any web browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": "https://purcellventures.co/#organization" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}
