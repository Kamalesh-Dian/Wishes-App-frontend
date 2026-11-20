import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import CinematicNavbar from "../components/home/CinematicNavbar";
import CustomCursor from "../components/home/CustomCursor";
import WishesBackgroundAnimation from "../components/home/WishesBackgroundAnimation";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import GallerySection from "../components/home/GallerySection";
import FeaturesSection from "../components/home/FeaturesSection";
import PricingSection from "../components/home/PricingSection";
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

    // Make lenis globally accessible for navbar smooth scrolling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

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
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] selection:bg-[#00bfa6]/30 selection:text-[#0f2a2a] dark:selection:text-[#d9faf4] transition-colors duration-300 antialiased">
      {/* Subtle Film Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 film-grain opacity-25 mix-blend-multiply dark:mix-blend-screen"
        aria-hidden="true"
      />

      {/* Ambient background glows */}
      <div
        className="fixed top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#00bfa6]/15 via-[#00bfa6]/5 to-transparent blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Cursor & Card-Reactive Floating Balloons, Confetti & Wish Phrases Background */}
      <WishesBackgroundAnimation />

      {/* Floating Glassmorphic Header Navigation */}
      <CinematicNavbar />

      {/* Main Cinematic Scroll Sequence */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <HowItWorksSection />
        <GallerySection />
        <FeaturesSection />
        <PricingSection />
        <CorporateWishesSection />
        <CTASection />
      </main>
    </div>
  );
}
