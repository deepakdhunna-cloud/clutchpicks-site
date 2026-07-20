"use client";

import PageWrapper from "@/components/PageWrapper";
import Loader from "@/components/Loader";
import Chrome from "@/components/Chrome";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Board from "@/components/Board";
import Engine from "@/components/Engine";
import Leagues from "@/components/Leagues";
import Pricing from "@/components/Pricing";
import StickyStatement from "@/components/StickyStatement";
import FooterCta from "@/components/FooterCta";

export default function Home() {
  return (
    <PageWrapper>
      <Loader />
      <Chrome />
      <main className="relative overflow-x-clip">
        <Hero />
        <Manifesto />
        <Board />
        <Engine />
        <Leagues />
        <Pricing />
        <StickyStatement />
        <FooterCta />
      </main>
    </PageWrapper>
  );
}
