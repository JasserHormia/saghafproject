"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollAnimations from "@/components/ScrollAnimations";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import CollectionSection from "@/components/CollectionSection";
import StorySection from "@/components/StorySection";
import CraftSection from "@/components/CraftSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Particle canvas is client-only and sits behind everything.
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Lock scroll while the preloader is on screen.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

      {/* Background particle layer (behind all content) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <ScrollAnimations />
        <Navbar />
        <main>
          {/* Hero entrance fires once the preloader finishes */}
          <HeroSection start={!loading} />
          <FeaturesStrip />
          <CollectionSection />
          <StorySection />
          <CraftSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
