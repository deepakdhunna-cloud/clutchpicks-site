"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadButton from "./DownloadButton";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar({ delay = true }: { delay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={delay ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#040608]/80 backdrop-blur-2xl border-b border-white/[0.06] py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row — Large centered logo with spotlight */}
        <div className="flex justify-center mb-3 relative">
          {/* Spotlight glow behind logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-[300px] h-[100px] rounded-full blur-[50px]"
              style={{
                background: "radial-gradient(ellipse, var(--color-coral) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          <a href="#" className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Clutch Picks"
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                scrolled ? "h-10 sm:h-12" : "h-14 sm:h-18 md:h-20"
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
        </div>

        {/* Bottom row — Nav links centered, download button right */}
        <div className="hidden md:flex items-center justify-center relative">
          {/* Centered pill nav */}
          <div className="flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.06] px-1.5 py-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-text-muted)] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Download button — absolute right */}
          <div className="absolute right-0">
            <DownloadButton size="small" />
          </div>
        </div>

        {/* Mobile — hamburger right-aligned */}
        <div className="flex md:hidden justify-end -mt-12">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-white"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#040608]/95 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-lg text-[var(--color-text-muted)] hover:text-white transition-colors py-3 border-b border-white/[0.04]"
                  style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.05em" }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-4 flex justify-center"
              >
                <DownloadButton size="small" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
