import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Flame, Heart, Crown, Cake, Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_ITEMS = [
  {
    id: "diwali",
    title: "Diwali Twilight Splendor",
    occasion: "Diwali • Festival of Lights",
    tag: "FESTIVE LIGHTING",
    icon: Flame,
    accent: "#00bfa6",
    description:
      "Handcrafted brass diyas, glowing marigold garlands, and golden twilight reflections. The subject's genuine smile is preserved with silk garment textures and authentic festive ambiance.",
    quote: "“The diyas cast a natural golden glow that looked like a high-budget film production.”",
    specs: ["Warm Candlelit Bokeh", "Silk Texture Fidelity", "Authentic Cultural Decor"],
  },
  {
    id: "birthday",
    title: "Milestone 30th Soirée",
    occasion: "Milestone Birthday",
    tag: "COCKTAIL & CANDLELIGHT",
    icon: Cake,
    accent: "#00bfa6",
    description:
      "Midnight champagne reflections, floating helium balloons, and sparkling candle glow around the subject. Candor, natural laughter, and celebratory energy locked in 4K resolution.",
    quote: "“Captured Maya’s genuine laughter in a setting more magical than any photoshoot could manage.”",
    specs: ["Champagne Glass Reflections", "Festive Sparkler Trails", "Candid Facial Expression"],
  },
  {
    id: "wedding",
    title: "Royal Palace Sangeet",
    occasion: "Wedding & Celebrations",
    tag: "MAJESTIC HERITAGE",
    icon: Crown,
    accent: "#00bfa6",
    description:
      "Intricately embroidered festive sherwani or lehenga, historic sandstone arches, and cascading jasmine garlands. Royal architecture with studio-grade depth and ray-traced lighting.",
    quote: "“Preserved every subtle nuance of my parents’ portraits with majestic historical architecture.”",
    specs: ["Handcrafted Zari Embroidery", "Grand Archway Depth", "Authentic Royal Lighting"],
  },
  {
    id: "anniversary",
    title: "Silver Jubilee Reverie",
    occasion: "25th Anniversary",
    tag: "LANTERN REFLECTIONS",
    icon: Heart,
    accent: "#00bfa6",
    description:
      "Floating water lanterns drifting across a calm lake beneath a star-filled velvet sky with warm ambient intimacy. A poetic, timeless portrait that feels like an heirloom oil painting.",
    quote: "“A poetic, timeless keepsake that looks like an oil painting brought to life.”",
    specs: ["Water Ripple Reflections", "Bioluminescent Lantern Glow", "Intimate Dual Portrait"],
  },
  {
    id: "corporate",
    title: "Executive Work Milestone",
    occasion: "Corporate Achievement",
    tag: "COMPANY-WIDE GREETING",
    icon: Star,
    accent: "#00bfa6",
    description:
      "Contemporary glass atrium adorned with champagne gold streamers and personalized team appreciation accolades. Respectful, executive-ready, and automated seamlessly via OneDrive.",
    quote: "“Sent automatically via OneDrive on our VP's 5th work anniversary. Clean, respectful, and premium.”",
    specs: ["OneDrive Automated Sync", "Vector Logo Incorporation", "Instant Email Dispatch"],
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const offset = window.innerWidth < 640 ? 40 : 120;
        return -Math.max(0, trackWidth - window.innerWidth + offset);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.5, track.scrollWidth - window.innerWidth + 400)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              SHOWCASE_ITEMS.length - 1,
              Math.max(0, Math.round(progress * (SHOWCASE_ITEMS.length - 1)))
            );
            setActiveIndex(idx);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
    }, sectionRef);

    // Refresh ScrollTrigger after slight delay to ensure layout is measured accurately
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      // Fallback if not pinned
      setActiveIndex(index);
      return;
    }

    const totalSteps = SHOWCASE_ITEMS.length - 1;
    const targetProgress = Math.max(0, Math.min(1, index / totalSteps));
    const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);

    const lenis = (window as unknown as { __lenis?: { scrollTo: (pos: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(SHOWCASE_ITEMS.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#00bfa6]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div className="min-h-screen w-full flex flex-col justify-between py-12 sm:py-16">
        {/* Header Container */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
              <Sparkles size={13} className="text-[#00bfa6]" />
              <span>Masterpiece Gallery</span>
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
              Curated celebratory <span className="italic text-[#00bfa6] font-semibold">atmospheres.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl">
              Scroll down to glide through each festive environment, lighting style, and cultural attire.
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs font-bold text-[#00bfa6] bg-[#00bfa6]/15 px-3 py-1 rounded-full">
              0{activeIndex + 1} / 0{SHOWCASE_ITEMS.length}
            </span>

            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous showcase card"
              className="w-10 h-10 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/80 dark:bg-[#143838]/80 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === SHOWCASE_ITEMS.length - 1}
              aria-label="Next showcase card"
              className="w-10 h-10 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/80 dark:bg-[#143838]/80 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scroll-Driven Horizontal Card Track */}
        <div className="relative z-10 w-full overflow-hidden my-auto py-4">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 pl-6 sm:pl-16 lg:pl-24 pr-16 sm:pr-28 lg:pr-36 w-max will-change-transform"
          >
            {SHOWCASE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isCurrent = activeIndex === index;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToIndex(index)}
                  className={`showcase-card shrink-0 w-[300px] sm:w-[380px] lg:w-[420px] rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[480px] sm:min-h-[500px] shadow-xl cursor-pointer ${
                    isCurrent
                      ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_16px_40px_rgba(0,191,166,0.22)] scale-[1.01]"
                      : "bg-white/70 dark:bg-[#143838]/60 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50 hover:bg-white/90 dark:hover:bg-[#143838]/80"
                  }`}
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#00bfa6]/15 text-[#00bfa6]">
                        {item.tag}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isCurrent
                            ? "bg-[#00bfa6] text-[#0f2a2a]"
                            : "bg-[#00bfa6]/10 text-[#00bfa6]"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Title & Occasion */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#00bfa6] mb-3 sm:mb-4">
                      {item.occasion}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed mb-4 sm:mb-6 font-normal">
                      {item.description}
                    </p>

                    {/* Specification Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {item.specs.map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-lg bg-[#d9faf4]/80 dark:bg-[#0f2a2a]/80 text-[#0f2a2a]/80 dark:text-[#d9faf4]/80 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Quote Box */}
                    <div className="p-4 rounded-2xl bg-[#d9faf4]/50 dark:bg-[#0f2a2a]/50 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 mb-5">
                      <p className="font-serif italic text-xs text-[#0f2a2a]/90 dark:text-[#d9faf4]/90 leading-relaxed">
                        {item.quote}
                      </p>
                    </div>

                    {/* Card Action */}
                    <Link
                      to="/create"
                      className="w-full py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(0,191,166,0.5)] transition-all hover:scale-[1.01]"
                    >
                      <span>Synthesize Similar Scene</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer: Indicator Dots & Scroll Progress Hint */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {SHOWCASE_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to showcase ${i + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === i
                    ? "w-8 bg-[#00bfa6]"
                    : "w-2 bg-[#0f2a2a]/20 dark:bg-[#d9faf4]/20 hover:bg-[#00bfa6]/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6] animate-pulse" />
            <span>Scroll vertically to glide horizontally through gallery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
