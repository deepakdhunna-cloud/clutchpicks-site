"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollProgress from "./ScrollProgress";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
];

const APP_STORE_URL = "https://apps.apple.com/us/app/clutch-picks/id6759183746";

export default function Navbar({ delay = true }: { delay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mount to avoid stutter with splash screen
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={delay ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden transition-all duration-500 bg-black ${
        scrolled
          ? "sm:bg-[#040608]/85 sm:backdrop-blur-2xl border-b border-white/[0.06]"
          : "sm:bg-transparent sm:border-b-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo — centered, large, no entrance animation (splash places it here) */}
        <div
          className={`flex justify-center relative overflow-hidden transition-all duration-500 ${
            scrolled ? "pt-3 pb-2" : "pt-5 pb-3"
          }`}
        >
          {/* Spotlight — soft dual glow from both sides (desktop only) */}
          <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "700px", height: "160px" }}>
            {/* Left glow */}
            <div
              className="absolute top-0 left-0 w-[55%] h-full"
              style={{
                filter: "blur(100px)",
                background: "radial-gradient(ellipse at 70% 50%, var(--color-coral), transparent 70%)",
                animation: "spotlight-left 4s ease-in-out infinite",
              }}
            />
            {/* Right glow */}
            <div
              className="absolute top-0 right-0 w-[55%] h-full"
              style={{
                filter: "blur(100px)",
                background: "radial-gradient(ellipse at 30% 50%, var(--color-teal), transparent 70%)",
                animation: "spotlight-right 4s ease-in-out infinite",
              }}
            />
          </div>

          <a href="/" className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Clutch Picks"
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled ? "h-8 sm:h-10" : "h-12 sm:h-14 md:h-16"
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
        </div>

        {/* Nav pill — same on mobile and desktop */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={delay ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`flex justify-center transition-all duration-500 ${
            scrolled ? "pb-3" : "pb-4"
          }`}
        >
          <div className="flex items-center gap-0.5 rounded-full bg-white/[0.03] border border-white/[0.07] px-1 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-[13px] font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-text-muted)] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}

            {/* Divider */}
            <div className="w-px h-4 bg-white/[0.08] mx-0.5 sm:mx-1" />

            {/* Download — inside the pill, with glow */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-teal)] opacity-25 blur-md animate-pulse-glow-ring" />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black text-[11px] sm:text-[13px] font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(122,157,184,0.4)]"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="relative z-10">Download</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress bar at bottom of navbar */}
      <ScrollProgress />
    </motion.nav>
  );
}
