"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl tracking-wider mb-4 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Clutch Support
          </h1>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Have a question or need help? Fill out the form below or email us at{" "}
            <a
              href="mailto:support@clutchpicksapp.com"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@clutchpicksapp.com
            </a>
          </p>

          {submitted ? (
            <div className="glass-card rounded-2xl p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-green)]/10 mb-6">
                <svg
                  className="w-8 h-8 text-[var(--color-green)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl text-white font-semibold mb-3">
                Thank you for reaching out!
              </h2>
              <p className="text-[var(--color-text-muted)]">
                We will get back to you as soon as possible!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 sm:p-10 space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-[var(--color-text-muted)] mb-2"
                  >
                    First Name <span className="text-[var(--color-coral)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-[var(--color-bg)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-coral)] transition-colors"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-[var(--color-text-muted)] mb-2"
                  >
                    Last Name <span className="text-[var(--color-coral)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-[var(--color-bg)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-coral)] transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[var(--color-text-muted)] mb-2"
                >
                  Email <span className="text-[var(--color-coral)]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-[var(--color-bg)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-coral)] transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-[var(--color-text-muted)] mb-2"
                >
                  Phone <span className="text-[var(--color-text-muted)]/50">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-[var(--color-bg)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-coral)] transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Notes / Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-[var(--color-text-muted)] mb-2"
                >
                  Notes / Message{" "}
                  <span className="text-[var(--color-text-muted)]/50">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-[var(--color-bg)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-coral)] transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black font-semibold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(232,147,106,0.3)] transition-all duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
