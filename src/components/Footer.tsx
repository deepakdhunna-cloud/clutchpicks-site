import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/site";

/** Compact footer for legal/support pages. */
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line px-4 py-12 lg:px-14">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 font-mono text-[11px] uppercase tracking-[0.1em] text-l4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/privacy-policy" className="transition-colors hover:text-l2">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-l2">
            Terms
          </Link>
          <Link href="/support" className="transition-colors hover:text-l2">
            Support
          </Link>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="transition-colors hover:text-l2"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
        <p className="leading-relaxed">
          All predictions are AI-generated for entertainment purposes only —
          not gambling advice. Clutch Picks does not accept wagers, process
          betting payments, or facilitate real-money betting of any kind.
          Ages 13+.
        </p>
        <p>© 2026 Clutch Picks LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
