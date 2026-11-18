import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import CinematicNavbar from "../components/home/CinematicNavbar";
import CustomCursor from "../components/home/CustomCursor";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import GallerySection from "../components/home/GallerySection";
import FeaturesSection from "../components/home/FeaturesSection";
import CorporateWishesSection from "../components/home/CorporateWishesSection";
import CTASection from "../components/home/CTASection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#F4F1EA] selection:bg-[#F5B24A]/30 selection:text-[#F4F1EA] overflow-x-hidden antialiased">
      {/* Subtle Film Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 film-grain opacity-30 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Ambient background glows */}
      <div
        className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#F5B24A]/10 via-[#2DD4BF]/5 to-transparent blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Header Navigation */}
      <CinematicNavbar />

      {/* Main Cinematic Scroll Sequence */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <HowItWorksSection />
        <GallerySection />
        <FeaturesSection />
        <CorporateWishesSection />
        <CTASection />
      </main>
    </div>
  );
}
