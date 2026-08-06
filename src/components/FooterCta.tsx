"use client";

import { SUPPORT_EMAIL } from "@/lib/site";
import DownloadButton from "./DownloadButton";
import StripeMark from "./StripeMark";
import { Fade, MaskLines } from "./Reveal";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/clutchpicksapp/" },
  { label: "TikTok", href: "https://www.tiktok.com/@clutchpicksapp" },
  { label: "X (Twitter)", href: "https://x.com/clutchpicksapp" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Support", href: "/support" },
];

/** Full-viewport sign-off — the "Good buy." moment, ours. */
export default function FooterCta() {
  return (
    <footer
      id="download"
      className="relative z-10 flex min-h-svh w-full flex-col justify-center px-4 pb-28 pt-24 lg:px-14 lg:pb-32"
    >
      {/* Sign-off statement */}
      <div className="text-center">
        <MaskLines
          className="glow-serif-strong animate-glow-breathe font-serif text-[16svw] font-semibold leading-[1.02] tracking-tight lg:text-[11svw]"
          lines={["Good Picks."]}
        />
        <Fade delay={0.18}>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-l2 sm:text-xl">
            Signing off — take the board with you,
            <br className="hidden sm:block" /> and win the moments that matter.
          </p>
        </Fade>
      </div>

      {/* Download row */}
      <Fade className="mt-12 flex flex-col items-center gap-6" delay={0.25}>
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
        <p className="font-led text-base tracking-[0.1em] text-l4">
          FREE ON THE APP STORE · IOS 15.1+ · SIGN IN WITH APPLE
        </p>
      </Fade>

      {/* Contact blocks — the studio sign-off card */}
      <div className="mx-auto mt-20 grid w-full max-w-4xl grid-cols-1 gap-10 border-t border-line pt-10 text-center sm:grid-cols-3 lg:mt-24">
        <Fade className="flex flex-col items-center gap-3">
          <span className="font-led text-base tracking-[0.14em] text-l4">
            SUPPORT DESK
          </span>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="retro-link font-serif text-lg text-l1"
          >
            {SUPPORT_EMAIL}
          </a>
        </Fade>
        <Fade className="flex flex-col items-center gap-3" delay={0.06}>
          <span className="font-led text-base tracking-[0.14em] text-l4">
            FOLLOW THE ACTION
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-link font-serif text-lg text-l1"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Fade>
        <Fade className="flex flex-col items-center gap-3" delay={0.12}>
          <span className="font-led text-base tracking-[0.14em] text-l4">
            THE FINE PRINT
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="retro-link font-serif text-lg text-l1"
              >
                {l.label}
              </a>
            ))}
          </div>
        </Fade>
      </div>

      {/* Bottom block */}
      <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <StripeMark size={16} />
          <span className="font-serif text-[15px] italic text-l3">
            © 2026 Clutch Picks LLC. All rights reserved.
          </span>
        </div>
        <p className="max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-l3">
          All predictions are AI-generated for entertainment purposes only —
          not gambling advice. Clutch Picks does not accept wagers, process
          betting payments, or facilitate real-money betting of any kind.
          Ages 13+.
        </p>
      </div>
    </footer>
  );
}
