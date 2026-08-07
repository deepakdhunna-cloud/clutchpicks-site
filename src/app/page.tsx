"use client";

import PageWrapper from "@/components/PageWrapper";
import Background from "@/components/Background";
import Loader from "@/components/Loader";
import Chrome from "@/components/Chrome";
import Hero from "@/components/Hero";
import Board from "@/components/Board";
import Bumper from "@/components/Bumper";
import Engine from "@/components/Engine";
import Leagues from "@/components/Leagues";
import Pricing from "@/components/Pricing";
import StickyStatement from "@/components/StickyStatement";
import FooterCta from "@/components/FooterCta";

/**
 * One continuous broadcast: sign-on → the promise (hero) → the product
 * (board) → the proof (engine room) → the coverage (leagues) → the
 * offer (pricing) → sign-off. Bumpers rejoin segments; the chrome's
 * channel OSD tracks the scroll like flipping through the network.
 */
export default function Home() {
  return (
    <PageWrapper>
      <Background />
      <Loader />
      <Chrome />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <Board />
        <Bumper next="The Engine Room" note="50,000 simulations per game" />
        <Engine />
        <Leagues />
        <Bumper next="Tonight's Matchup" note="Free vs Clutch Pro" />
        <Pricing />
        <StickyStatement />
      </main>
      <FooterCta />
    </PageWrapper>
  );
}
