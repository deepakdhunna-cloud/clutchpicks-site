"use client";

import Link from "next/link";
import { BrandIcon } from "./Chrome";
import { APP_STORE_URL } from "@/lib/site";

/** Minimal fixed top bar for legal/support pages. */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg/85 px-4 py-4 font-mono text-[13px] backdrop-blur-md lg:px-14 lg:py-6">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="dotted-hover p-1.5"
        aria-label="Download Clutch Picks on the App Store"
      >
        <BrandIcon small />
      </a>
      <Link
        href="/"
        className="dotted-hover p-2 uppercase tracking-[0.1em] text-l2 transition-colors hover:text-l1"
      >
        ← Back to site
      </Link>
    </header>
  );
}
