import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leagues from "@/components/Leagues";
import LiveIntelligence from "@/components/LiveIntelligence";
import Features from "@/components/Features";
import WhyDifferent from "@/components/WhyDifferent";
import HowItWorks from "@/components/HowItWorks";
import AnalystProof from "@/components/AnalystProof";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Leagues />
        <LiveIntelligence />
        <Features />
        <WhyDifferent />
        <HowItWorks />
        <AnalystProof />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
