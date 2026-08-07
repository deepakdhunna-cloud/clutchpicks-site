import { SectionHeading } from "./ui";

const faqs = [
  {
    q: "Is Clutch Picks a gambling app?",
    a: "No. Clutch Picks does not accept bets, process wagers, or enable real-money transactions. All predictions and analysis are for entertainment and personal tracking only.",
  },
  {
    q: "Which leagues are covered?",
    a: "NBA, NFL, MLB, NHL, MLS, the Premier League, the Champions League, T20 cricket, ATP & WTA tennis, college football, and college basketball — eleven leagues on one board.",
  },
  {
    q: "What do I get for free?",
    a: "Live scores across all 11 leagues, daily schedules and game states, broadcast context, pick creation with personal tracking, the My Arena board, and analyst card basics.",
  },
  {
    q: "What does Clutch Pro add?",
    a: "Confidence-rated AI picks, the projection center with pick strength, 20-factor matchup context, Prep Mode slate ranking, and full pick history. $6.99/month after a 3-day trial.",
  },
  {
    q: "How are the AI picks made?",
    a: "A model reads live game state and 20+ matchup signals, then rates each pick with a confidence level and the reasoning behind it. Sports are unpredictable, so no guarantee of accuracy is made.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Manage or cancel the subscription in your App Store settings — the App Store confirms final terms before any purchase.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Questions"
          title="Answers,"
          accent="before you ask."
          align="center"
        />

        <div className="mt-12 border-t border-white/[0.08]">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                {f.q}
                <svg
                  className="faq-icon h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="faq-answer">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/55">
          Something else?{" "}
          <a href="/support" className="font-semibold text-[var(--color-electric)] hover:underline">
            Reach the support team
          </a>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
