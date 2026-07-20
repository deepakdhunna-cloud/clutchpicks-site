"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { APP_STORE_URL } from "@/lib/site";

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

/** Brand mark: the real app icon, linking to the App Store. */
export function BrandIcon({ small = false }: { small?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/app-icon.png"
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
  const time = useEasternClock();
  const { x, y } = useCursorCoords();
  const pct = useScrollPercent();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.35, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between font-mono text-[13px]"
    >
      {/* Top bar */}
      <header className="flex items-center justify-between bg-gradient-to-b from-bg/85 via-bg/40 to-transparent px-4 py-4 lg:px-14 lg:py-6">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dotted-hover pointer-events-auto p-1.5 hover:scale-[1.04]"
          aria-label="Download Clutch Picks on the App Store"
        >
          <BrandIcon />
        </a>

        <nav className="pointer-events-auto hidden items-center gap-x-2 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="dotted-hover p-2 uppercase tracking-[0.1em] text-l2 transition-colors hover:text-l1"
            >
              {item.label}
            </a>
          ))}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dotted-hover dotted-hover-teal p-2 uppercase tracking-[0.1em] text-teal"
          >
            Download[↓]
          </a>
        </nav>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dotted-hover pointer-events-auto p-2 uppercase tracking-[0.1em] text-teal lg:hidden"
        >
          Get App
        </a>
      </header>

      {/* Bottom bar — ambient data, hidden from assistive tech */}
      <div
        className="flex items-center justify-between bg-gradient-to-t from-bg/85 via-bg/40 to-transparent px-4 py-4 text-xs uppercase tracking-[0.12em] text-l3 lg:px-14 lg:py-6"
        aria-hidden="true"
      >
        <span className="p-2 tabular">ET {time}</span>
        <span className="hidden p-2 tabular lg:inline">
          {pad(x, 4)} X {pad(y, 4)} Y
        </span>
        <span className="p-2 tabular">Scroll {pad(pct, 3)}%</span>
      </div>
    </motion.div>
  );
}
