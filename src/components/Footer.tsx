import { SUPPORT_EMAIL } from "@/lib/site";
import { AppStoreButton } from "./ui";

const productLinks = [
  { label: "Live board", href: "/#live" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Support", href: "/support" },
  { label: "Email support", href: `mailto:${SUPPORT_EMAIL}` },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/clutchpicksapp/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@clutchpicksapp",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.84 4.84 0 01-3.77-1.78V6.69h3.77z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/clutchpicksapp",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] pb-10 pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Clutch Picks"
              width={3352}
              height={523}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Live scores, matchup context, and confidence-rated picks across 11
              leagues — in one focused board.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Clutch Picks on ${social.name}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/60 transition hover:border-[var(--color-electric)]/40 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <h3 className="scoreboard-type text-sm uppercase tracking-[0.18em] text-white/55">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal and support">
            <h3 className="scoreboard-type text-sm uppercase tracking-[0.18em] text-white/55">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get the app */}
          <div>
            <h3 className="scoreboard-type text-sm uppercase tracking-[0.18em] text-white/55">
              Get the app
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Free on iOS. Pro unlocks the full AI read.
            </p>
            <div className="mt-4">
              <AppStoreButton variant="ghost" size="md" label="App Store" />
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-14 border-t border-white/[0.06] pt-8 text-center">
          <p className="mx-auto mb-3 max-w-2xl text-xs leading-relaxed text-white/50">
            All predictions and analysis provided by Clutch Picks are for
            entertainment and informational purposes only. Sports outcomes are
            inherently unpredictable and no guarantee of accuracy is made.
          </p>
          <p className="mx-auto max-w-3xl text-xs leading-relaxed text-white/50">
            Clutch Picks does not facilitate, promote, or condone gambling,
            wagering, or betting of any kind. This app does not accept bets,
            process wagers, or enable real-money transactions. All features,
            predictions, and content are intended solely for entertainment and
            personal tracking purposes. Users are responsible for complying with
            all applicable laws in their jurisdiction.
          </p>
          <p className="mt-6 text-xs text-white/45">
            &copy; 2026 Clutch Picks LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
