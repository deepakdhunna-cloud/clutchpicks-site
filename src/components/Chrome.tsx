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

/** Brand wordmark: CLUTCH + the app's PICKS badge chip. */
export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span
        className={`font-sans font-black uppercase leading-none tracking-wide text-l1 font-wide ${
          small ? "text-sm" : "text-base"
        }`}
      >
        Clutch
      </span>
      <span
        className={`rounded-[5px] border-2 border-teal-deep bg-teal-dark px-1 py-px font-sans font-extrabold uppercase leading-none tracking-[0.18em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.7)] ${
          small ? "text-[8px]" : "text-[9px]"
        }`}
      >
        Picks
      </span>
    </span>
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
      aria-label="Site chrome"
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-4 lg:px-14 lg:py-6">
        <a
          href="#top"
          className="dotted-hover pointer-events-auto p-2"
          aria-label="Clutch Picks — back to top"
        >
          <Wordmark />
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

      {/* Bottom bar */}
      <footer className="flex items-center justify-between px-4 py-4 text-xs uppercase tracking-[0.12em] text-l3 lg:px-14 lg:py-6">
        <span className="p-2 tabular">ET {time}</span>
        <span className="hidden p-2 tabular lg:inline" aria-hidden="true">
          {pad(x, 4)} X {pad(y, 4)} Y
        </span>
        <span className="p-2 tabular">Scroll {pad(pct, 3)}%</span>
      </footer>
    </motion.div>
  );
}
