"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_STORE_URL } from "@/lib/site";
import { introDelay } from "./Loader";

const NAV = [
  { label: "Board", href: "#board" },
  { label: "Engine", href: "#engine" },
  { label: "Leagues", href: "#leagues" },
  { label: "Pricing", href: "#pricing" },
];

function useEasternClock() {
  const [time, setTime] = useState("--:--:-- --");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* The page is one broadcast — sections are channels, and the OSD in the
 * bottom bar tracks which one the viewer is tuned to. */
const CHANNEL_MAP = [
  { id: "top", ch: "01", label: "ON AIR" },
  { id: "board", ch: "02", label: "THE BOARD" },
  { id: "engine", ch: "03", label: "ENGINE ROOM" },
  { id: "leagues", ch: "04", label: "THE LEAGUES" },
  { id: "pricing", ch: "05", label: "PRICING" },
  { id: "signoff", ch: "06", label: "SIGN-OFF" },
  { id: "download", ch: "06", label: "SIGN-OFF" },
];

function useChannelSpy() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = CHANNEL_MAP.findIndex(
            (c) => c.id === (e.target as HTMLElement).id
          );
          if (i >= 0) setActive(i);
        }
      },
      /* a section is "tuned in" when it crosses the viewport's middle band */
      { rootMargin: "-45% 0px -54% 0px" }
    );
    CHANNEL_MAP.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return CHANNEL_MAP[active];
}

function useScrollPercent() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return pct;
}

const pad = (n: number, len: number) => String(n).padStart(len, "0");

/* Per-frame data lives in leaf components so state churn (clock ticks,
 * mousemove, scroll) never re-renders the nav above. */
const EasternClock = memo(function EasternClock() {
  const time = useEasternClock();
  return <span className="p-2 tabular">ET {time}</span>;
});

/** Channel stamp + a burst of static when the viewer changes channels. */
const ChannelOSD = memo(function ChannelOSD() {
  const { ch, label } = useChannelSpy();
  const [flash, setFlash] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 150);
    return () => clearTimeout(t);
  }, [ch, label]);

  return (
    <>
      <motion.span
        key={`${ch}-${label}`}
        initial={{ opacity: 0, scaleY: 2.1, filter: "brightness(2.4)" }}
        animate={{ opacity: 1, scaleY: 1, filter: "brightness(1)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="p-2 text-l2 tabular"
      >
        CH {ch} · {label}
      </motion.span>
      {flash && (
        <span
          className="static-flash fixed inset-0 z-[88]"
          style={{ backgroundImage: "url(/noise.png)" }}
          aria-hidden="true"
        />
      )}
    </>
  );
});

const ScrollPercent = memo(function ScrollPercent() {
  const pct = useScrollPercent();
  return <span className="p-2 tabular">Scroll {pad(pct, 3)}%</span>;
});

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Brand lockup — the real stacked wordmark, floodlit. */
function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#top"
      className="pointer-events-auto flex items-center p-1"
      aria-label="Clutch Picks — top of page"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-stacked.webp"
        alt="Clutch Picks"
        draggable={false}
        className={compact ? "h-10 w-auto" : "h-10 w-auto lg:h-[52px]"}
        style={{
          filter:
            "drop-shadow(0 6px 14px rgba(0,0,0,0.75)) drop-shadow(0 0 22px rgba(155,194,220,0.3))",
        }}
      />
    </a>
  );
}

/** Fixed header + footer chrome overlaying the scrolling page. */
export default function Chrome() {
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: introDelay(1.35), ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between"
    >
      {/* Top bar — padded below the notch/status bar on phones */}
      <header
        className="flex items-center justify-between border-b border-line bg-bg px-4 pb-3 lg:border-b-0 lg:bg-transparent lg:bg-gradient-to-b lg:from-bg/90 lg:via-bg/45 lg:to-transparent lg:px-14 lg:py-6"
        style={{ paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))" }}
      >
        <BrandLockup />

        {/* Serif nav (desktop) */}
        <nav className="pointer-events-auto hidden items-center gap-x-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="retro-link font-serif text-[17px] text-l2 transition-colors hover:text-l1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Get-the-app CTA (desktop) */}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto hidden items-center gap-2.5 p-1 lg:flex"
          aria-label="Download Clutch Picks on the App Store"
        >
          <AppleGlyph className="h-[17px] w-[17px] text-l1" />
          <span className="retro-link font-serif text-[17px] text-l1">
            Get the app
          </span>
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="dotted-hover pointer-events-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="h-[2px] w-5 rounded-full bg-l1" />
          <span className="h-[2px] w-5 rounded-full bg-l1" />
          <span className="h-[2px] w-5 rounded-full bg-l1" />
        </button>
      </header>

      {/* Bottom bar — ambient broadcast telemetry, hidden from assistive tech */}
      <div
        className="flex items-center justify-between bg-gradient-to-t from-bg/85 via-bg/40 to-transparent px-4 pt-4 font-led text-base tracking-[0.08em] text-l3 lg:px-14 lg:py-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      >
        <EasternClock />
        <ChannelOSD />
        <ScrollPercent />
      </div>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-0 z-[70] flex flex-col bg-bg lg:hidden"
          >
            <div
              className="flex items-center justify-between px-4 pb-3"
              style={{
                paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))",
              }}
            >
              <BrandLockup compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="dotted-hover relative flex h-11 w-11 items-center justify-center"
                aria-label="Close menu"
              >
                <span className="absolute h-[2px] w-6 rotate-45 rounded-full bg-l1" />
                <span className="absolute h-[2px] w-6 -rotate-45 rounded-full bg-l1" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-7 px-8">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => {
                      document
                        .querySelector(item.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 80);
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.06 }}
                  className="glow-serif w-fit font-serif text-4xl font-medium"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.06 + NAV.length * 0.06 }}
                className="mt-5 flex w-fit items-center gap-3"
              >
                <AppleGlyph className="h-6 w-6 text-pro" />
                <span className="glow-ice retro-link font-serif text-4xl font-medium italic">
                  Get the app
                </span>
              </motion.a>
            </nav>

            <p
              className="px-8 font-led text-base tracking-[0.08em] text-l4"
              style={{
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              }}
            >
              Free on the App Store · iOS 15.1+
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
