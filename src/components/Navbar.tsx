"use client";

import Link from "next/link";

/** Minimal fixed top bar for legal/support pages. */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg/85 px-4 pb-3 backdrop-blur-md lg:px-14 lg:py-6"
      style={{ paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))" }}>
      <Link
        href="/"
        className="flex items-center p-1"
        aria-label="Clutch Picks home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-stacked.webp"
          alt="Clutch Picks"
          draggable={false}
          className="h-10 w-auto"
          style={{
            filter:
              "drop-shadow(0 6px 14px rgba(0,0,0,0.75)) drop-shadow(0 0 22px rgba(155,194,220,0.3))",
          }}
        />
      </Link>
      <Link
        href="/"
        className="retro-link p-1 font-serif text-[16px] text-l2 transition-colors hover:text-l1"
      >
        ← Back to site
      </Link>
    </header>
  );
}
