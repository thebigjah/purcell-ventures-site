// HowTo SCHEMA FOR THE STEP-BY-STEP GUIDES.
//
// FAQPage answers a question. HowTo describes a procedure, which is a different shape and
// the one an assistant reaches for when somebody asks "how do I". Two of the guides on this
// site are literally numbered procedures, so they should say so in a format a machine reads
// rather than only in prose a machine has to infer from.
//
// It renders nothing. The steps are already visible in the body of the page, and repeating
// them below would be duplicate content on the same URL. This emits the machine-readable
// description of what is already there.

interface Props {
  name: string;
  description: string;
  totalTime?: string;   // ISO 8601 duration, for example PT20M
  supply?: string[];
  steps: { name: string; text: string }[];
}

export default function PostHowTo({ name, description, totalTime, supply, steps }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    ...(supply ? { supply: supply.map((s) => ({ "@type": "HowToSupply", name: s })) } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
