import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-black uppercase font-wide mb-4 text-center"
          >
            Clutch Support
          </h1>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Have a question or need help? Contact our support team at{" "}
            <a
              href="mailto:support@clutchpicksapp.com"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@clutchpicksapp.com
            </a>
          </p>

          <div className="glass-card rounded-2xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-coral)]/10 mb-6">
              <svg
                className="w-8 h-8 text-[var(--color-coral)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl text-white font-semibold mb-3">
              Email Clutch Support
            </h2>
            <p className="text-[var(--color-text-muted)] mb-3">
              The button below opens your email app. Include a brief description and, if
              relevant, the sign-in method or account email you can safely identify.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Never send passwords, verification codes, or full payment-card details.
            </p>
            <a
              href="mailto:support@clutchpicksapp.com?subject=Clutch%20Picks%20Support%20Request"
              className="inline-flex w-full items-center justify-center py-3.5 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black font-semibold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(122,157,184,0.3)] transition-all duration-300"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
