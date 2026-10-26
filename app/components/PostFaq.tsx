// FAQPage SCHEMA FOR THE GUIDES, WHICH IS THE AEO HALF.
//
// A blog post is a wall of prose. An assistant answering a question wants a string it can
// lift, attributed, with a question attached. FAQPage is the format that does that, and it
// costs nothing except discipline about the answers.
//
// The discipline: every answer here has to be genuinely answered in the body of the page
// it sits on. Schema that promises an answer the page does not contain is the structured
// data equivalent of a misleading headline, and Google treats it as one.

interface Props {
  /** [question, answer]. The answer must be self-contained: a model quoting it gets no context. */
  qa: [string, string][];
  heading?: string;
}

export default function PostFaq({ qa, heading = "Questions" }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="ui-postfaq">
        <h2>{heading}</h2>
        {qa.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </section>
    </>
  );
}
