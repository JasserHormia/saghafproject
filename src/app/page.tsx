"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollAnimations from "@/components/ScrollAnimations";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import CollectionSection from "@/components/CollectionSection";
import LifestyleBanner from "@/components/LifestyleBanner";
import StorySection from "@/components/StorySection";
import CloseUpGrid from "@/components/CloseUpGrid";
import CraftSection from "@/components/CraftSection";
import DuoImageBanner from "@/components/DuoImageBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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

      <div style={{ position: "relative", zIndex: 10, backgroundColor: "#0A0A0A" }}>
        <ScrollAnimations />
        <Navbar />
        <main style={{ backgroundColor: "#0A0A0A" }}>
          {/* Hero entrance fires once the preloader finishes */}
          <HeroSection start={!loading} />
          <FeaturesStrip />
          <CollectionSection />
          <LifestyleBanner />
          <StorySection />
          <CloseUpGrid />
          <CraftSection />
          <DuoImageBanner
            left={{ type: "video", src: "/assets/Perfumevideo1.mp4", poster: "/assets/perfume4.jpeg" }}
            right={{ type: "video", src: "/assets/Perfumevideo2.mp4", poster: "/assets/perfume5.jpeg" }}
            headline={
              <>
                An Olfactive{" "}
                <span style={{ color: "#8B2236" }}>Journey</span>
              </>
            }
            subtext="Every Shaghaf composition unfolds in three acts — a luminous opening, a beating heart, and a base that lingers long after."
            ctaText="Explore the Range"
            ctaLink="/products"
            textPosition="overlay-center"
            height="80vh"
            grayscale={false}
            preload="metadata"
          />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
