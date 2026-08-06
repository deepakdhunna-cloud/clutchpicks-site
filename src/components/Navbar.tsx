"use client";

import Link from "next/link";
import StripeMark from "./StripeMark";

/** Minimal fixed top bar for legal/support pages. */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg/85 px-4 pb-3 backdrop-blur-md lg:px-14 lg:py-6"
      style={{ paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))" }}>
      <Link
        href="/"
        className="flex items-center gap-3 p-1"
        aria-label="Clutch Picks home"
      >
        <StripeMark size={19} />
        <span className="glow-serif font-serif text-xl font-semibold italic tracking-tight">
          Clutch Picks
        </span>
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
