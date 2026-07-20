"use client";

import { SUPPORT_EMAIL } from "@/lib/site";
import DownloadButton from "./DownloadButton";
import { Fade, MaskLines } from "./Reveal";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/clutchpicksapp" },
  { label: "TikTok", href: "https://tiktok.com/@clutchpicksapp" },
  { label: "X", href: "https://x.com/clutchpicksapp" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
];

/** Full-viewport footer — giant staggered statement, download, legal. */
export default function FooterCta() {
  const lineClass =
    "font-sans text-[10.5svw] font-black uppercase leading-[0.94] font-wide lg:text-[6.5svw]";
  return (
    <footer
      id="download"
      className="relative z-10 flex min-h-svh w-full flex-col justify-center px-4 pb-28 pt-24 lg:px-14 lg:pb-32"
    >
      {/* Giant staggered statement — one row per grid, like the reference */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12">
          <MaskLines
            className="col-span-12 text-left md:col-span-8 md:col-start-2"
            lineClassName={lineClass}
            lines={["Win the"]}
          />
        </div>
        <div className="grid grid-cols-12">
          <MaskLines
            className="col-span-12 text-right md:col-span-9 md:col-start-4"
            lineClassName={lineClass}
            lines={["moments"]}
            delay={0.1}
          />
        </div>
        <div className="grid grid-cols-12">
          <MaskLines
            className="col-span-12 text-center md:col-span-10 md:col-start-2"
            lineClassName={lineClass}
            lines={[
              <span key="m" className="text-teal">
                that matter
              </span>,
            ]}
            delay={0.2}
          />
        </div>
      </div>

      {/* Download row */}
      <Fade className="mt-14 flex flex-col items-center gap-6" delay={0.25}>
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/app-icon.webp"
            loading="lazy"
            alt=""
            className="h-14 w-14 rounded-[14px] border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          />
          <DownloadButton size="large" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-l4">
          Free on the App Store · iOS 15.1+ · Sign in with Apple
        </p>
      </Fade>

      {/* Bottom block */}
      <div className="mt-20 flex flex-col gap-4 lg:mt-24">
        <div className="flex flex-col justify-between gap-2 font-mono text-[13px] uppercase tracking-[0.1em] lg:flex-row lg:items-center">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="dotted-hover w-fit p-2 text-l2 transition-colors hover:text-l1"
          >
            {SUPPORT_EMAIL}
          </a>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dotted-hover p-2 text-l2 transition-colors hover:text-l1"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-l3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-1">
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="dotted-hover p-2 transition-colors hover:text-l2"
              >
                {l.label}
              </a>
            ))}
          </div>
          <span className="p-2">© 2026 Clutch Picks LLC. All rights reserved.</span>
        </div>

        <p className="max-w-4xl px-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-l3">
          All predictions are AI-generated for entertainment purposes only —
          not gambling advice. Clutch Picks does not accept wagers, process
          betting payments, or facilitate real-money betting of any kind.
          Ages 13+.
        </p>
      </div>
    </footer>
  );
}
