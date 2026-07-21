"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_STORE_URL } from "@/lib/site";
import { introDelay } from "./Loader";
import LedText from "./LedText";

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

function useCursorCoords() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setCoords({ x: e.clientX, y: e.clientY });
        frame = 0;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return coords;
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
 * mousemove, scroll) never re-renders the LED nav above. */
const EasternClock = memo(function EasternClock() {
  const time = useEasternClock();
  return <span className="p-2 tabular">ET {time}</span>;
});

const CursorCoords = memo(function CursorCoords() {
  const { x, y } = useCursorCoords();
  return (
    <span className="hidden p-2 tabular lg:inline">
      {pad(x, 4)} X {pad(y, 4)} Y
    </span>
  );
});

const ScrollPercent = memo(function ScrollPercent() {
  const pct = useScrollPercent();
  return <span className="p-2 tabular">Scroll {pad(pct, 3)}%</span>;
});

/** Brand mark: the real app icon, linking to the App Store. */
export function BrandIcon({ small = false }: { small?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/app-icon.webp"
      alt="Clutch Picks app icon"
      className={`rounded-[10px] border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
        small ? "h-9 w-9" : "h-10 w-10 lg:h-11 lg:w-11"
      }`}
      draggable={false}
    />
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
      className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between font-mono text-[13px]"
    >
      {/* Top bar — padded below the notch/status bar on phones */}
      <header
        className="flex items-center justify-between border-b border-line bg-bg/85 backdrop-blur-md px-4 pb-3 lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none lg:bg-gradient-to-b lg:from-bg/90 lg:via-bg/45 lg:to-transparent lg:px-14 lg:py-6"
        style={{ paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))" }}
      >
        {/* App icon + blue LED download, together on the left */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dotted-hover p-1.5 hover:scale-[1.04]"
            aria-label="Download Clutch Picks on the App Store"
          >
            <BrandIcon />
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dotted-hover dotted-hover-teal p-2 opacity-90 transition-opacity hover:opacity-100"
            aria-label="Download on the App Store"
          >
            <LedText text="DOWNLOAD" color="teal" height={15} />
          </a>
        </div>

        {/* Jumbotron nav (desktop) */}
        <nav className="pointer-events-auto hidden items-center gap-x-4 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="dotted-hover p-2 opacity-75 transition-opacity hover:opacity-100"
              aria-label={item.label}
            >
              <LedText text={item.label.toUpperCase()} height={15} />
            </a>
          ))}
        </nav>

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

      {/* Bottom bar — ambient data, hidden from assistive tech */}
      <div
        className="flex items-center justify-between bg-gradient-to-t from-bg/85 via-bg/40 to-transparent px-4 pt-4 text-xs uppercase tracking-[0.12em] text-l3 lg:px-14 lg:py-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      >
        <EasternClock />
        <CursorCoords />
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
            className="pointer-events-auto fixed inset-0 z-[70] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div
              className="flex items-center justify-between px-4 pb-3"
              style={{
                paddingTop: "max(0.75rem, calc(env(safe-area-inset-top) + 0.25rem))",
              }}
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="dotted-hover p-1.5"
                aria-label="Download Clutch Picks on the App Store"
              >
                <BrandIcon small />
              </a>
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

            <nav className="flex flex-1 flex-col justify-center gap-3 px-6">
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
                  className="dotted-hover w-fit p-3"
                  aria-label={item.label}
                >
                  <LedText text={item.label.toUpperCase()} height={26} />
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
                className="dotted-hover dotted-hover-teal mt-4 w-fit p-3"
                aria-label="Download on the App Store"
              >
                <LedText text="DOWNLOAD" color="teal" height={26} />
              </motion.a>
            </nav>

            <p
              className="px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-l4"
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
