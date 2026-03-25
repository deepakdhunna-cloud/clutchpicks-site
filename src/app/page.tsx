"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leagues from "@/components/Leagues";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <PageWrapper>
        <main className="overflow-x-hidden max-w-[100vw]">
          <Navbar delay={splashDone} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={splashDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Hero />
            <Leagues />
            <Features />
            <HowItWorks />
            <Pricing />
            <CTA />
            <Footer />
          </motion.div>
        </main>
      </PageWrapper>
    </>
  );
}
