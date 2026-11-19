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
    image: "/showcase/diwali.webp",
    accent: "#FF5A52",
    description:
      "Handcrafted brass diyas, glowing marigold garlands, and golden twilight reflections. The subject's genuine smile is preserved with silk garment textures.",
    quote: "“The diyas cast a natural golden glow that looked like a high-budget film production.”",
    specs: ["Warm Candlelit Bokeh", "Silk Texture Fidelity", "Authentic Cultural Decor"],
  },
  {
    id: "birthday",
    title: "Milestone 30th Soirée",
    occasion: "30th Birthday • Celebration",
    tag: "COCKTAIL & CANDLELIGHT",
    icon: Cake,
    image: "/showcase/birthday.webp",
    accent: "#00bfa6",
    description:
      "Midnight champagne reflections, floating helium balloons, and sparkling candle glow around the subject. Candor and celebratory energy locked in 4K.",
    quote: "“Captured Maya’s genuine laughter in a setting more magical than any photoshoot could manage.”",
    specs: ["Champagne Reflections", "Festive Sparkler Trails", "Candid Expression Lock"],
  },
  {
    id: "wedding",
    title: "Royal Palace Sangeet",
    occasion: "Royal Wedding • Heritage",
    tag: "MAJESTIC HERITAGE",
    icon: Crown,
    image: "/showcase/wedding.webp",
    accent: "#FF5A52",
    description:
      "Intricately embroidered festive attire, historic sandstone arches, and cascading jasmine garlands with studio-grade depth and ray-traced lighting.",
    quote: "“Preserved every subtle nuance of my parents’ portraits with majestic historical architecture.”",
    specs: ["Zari Embroidery Detail", "Grand Archway Depth", "Authentic Royal Lighting"],
  },
  {
    id: "anniversary",
    title: "Silver Jubilee Reverie",
    occasion: "Silver Anniversary • 25 Years",
    tag: "LANTERN REFLECTIONS",
    icon: Heart,
    image: "/showcase/anniversary.webp",
    accent: "#00bfa6",
    description:
      "Floating water lanterns drifting across a calm lake beneath a star-filled velvet sky with warm ambient intimacy and timeless heirloom portraiture.",
    quote: "“A poetic, timeless keepsake that looks like an oil painting brought to life.”",
    specs: ["Water Ripple Reflections", "Bioluminescent Lanterns", "Intimate Dual Portrait"],
  },
  {
    id: "corporate",
    title: "Executive Work Milestone",
    occasion: "Corporate • Team Appreciation",
    tag: "COMPANY-WIDE GREETING",
    icon: Star,
    image: "/showcase/corporate.webp",
    accent: "#00bfa6",
    description:
      "Contemporary glass atrium adorned with warm celebration spotlights and personalized team accolades, automated seamlessly via OneDrive roster sync.",
    quote: "“Sent automatically via OneDrive on our VP's 5th work anniversary. Clean, respectful, and premium.”",
    specs: ["OneDrive Automated Sync", "Brand Logo Integration", "Instant 9:00 AM Dispatch"],
  },
];

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          let normalized = 0;
          if (p <= 0.12) {
            normalized = 0;
          } else if (p >= 0.88) {
            normalized = 1;
          } else {
            normalized = (p - 0.12) / 0.76;
          }

          const maxScroll = track.scrollWidth - window.innerWidth;
          gsap.set(track, { x: -normalized * Math.max(0, maxScroll) });

          const idx = Math.min(
            SHOWCASE_ITEMS.length - 1,
            Math.max(0, Math.round(normalized * (SHOWCASE_ITEMS.length - 1)))
          );
          setActiveIndex(idx);
        },
      });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollHeight = container.offsetHeight - window.innerHeight;

    const totalSteps = SHOWCASE_ITEMS.length - 1;
    const normalized = index / totalSteps;

    let targetP = 0;
    if (index === 0) {
      targetP = 0.05;
    } else if (index === totalSteps) {
      targetP = 0.95;
    } else {
      targetP = 0.12 + normalized * 0.76;
    }

    const targetScroll = containerTop + targetP * scrollHeight;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (pos: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
    setActiveIndex(index);
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
      ref={containerRef}
      className="relative w-full h-[240vh] bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-20"
    >
      {/* Background Night-Market Coral & Teal Glows */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#FF5A52]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[650px] h-[400px] bg-[#00bfa6]/12 rounded-full blur-[170px] pointer-events-none" />

      {/* Viewport Frame with Native CSS Sticky Positioning */}
      <div className="sticky top-0 h-screen max-h-screen w-full flex flex-col justify-between py-5 sm:py-7 lg:py-8 overflow-hidden">
        {/* Header Container */}
        <div className="max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF5A52] mb-1.5">
              <Sparkles size={13} className="text-[#FF5A52]" />
              <span>Showcase Gallery</span>
            </div>
            <h2 className="font-sans text-[clamp(1.85rem,3.6vw,3.1rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.08]">
              Curated celebratory <span className="text-[#00bfa6]">atmospheres.</span>
            </h2>
            <p className="mt-1 text-xs sm:text-[13px] text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl">
              Scroll down to glide through Diwali, 30th Birthday, Royal Wedding, Silver Anniversary, and Corporate scenes.
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs font-bold text-[#FF5A52] bg-[#FF5A52]/15 px-3 py-1 rounded-full">
              0{activeIndex + 1} / 0{SHOWCASE_ITEMS.length}
            </span>

            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous showcase card"
              className="w-9 h-9 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/80 dark:bg-[#143838]/80 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === SHOWCASE_ITEMS.length - 1}
              aria-label="Next showcase card"
              className="w-9 h-9 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/80 dark:bg-[#143838]/80 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scroll-Driven Horizontal Card Track */}
        <div className="w-full overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-7 pl-6 sm:pl-16 lg:pl-24 pr-6 sm:pr-16 lg:pr-24 w-max will-change-transform"
          >
            {SHOWCASE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isCurrent = activeIndex === index;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToIndex(index)}
                  className={`showcase-card group shrink-0 w-[305px] sm:w-[365px] lg:w-[405px] rounded-3xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer ${
                    isCurrent
                      ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_16px_40px_rgba(0,191,166,0.22)] scale-[1.01]"
                      : "bg-white/80 dark:bg-[#143838]/65 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50 hover:bg-white/95 dark:hover:bg-[#143838]/85"
                  }`}
                >
                  <div>
                    {/* Distinct Occasion Imagery Header */}
                    <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden mb-3.5 bg-[#091616] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                      <img
                        src={item.image}
                        alt={`${item.title} - ${item.occasion}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091616]/70 via-transparent to-transparent" />

                      {/* Top Floating Tag & Icon */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#091616]/85 text-[#d9faf4] border border-white/15 backdrop-blur-md">
                          {item.tag}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-md ${
                            isCurrent
                              ? "bg-[#FF5A52] text-white"
                              : "bg-[#091616]/80 text-[#00bfa6] border border-white/15"
                          }`}
                        >
                          <Icon size={13} />
                        </div>
                      </div>
                    </div>

                    {/* Title & Occasion Label */}
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-[#0f2a2a] dark:text-[#d9faf4]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF5A52] mb-2">
                      {item.occasion}
                    </p>

                    {/* Short Atmospheric Description */}
                    <p className="text-xs text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 leading-relaxed mb-3 font-normal line-clamp-2">
                      {item.description}
                    </p>

                    {/* Technical-Fidelity Specification Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.specs.map((spec) => (
                        <span
                          key={spec}
                          className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#d9faf4]/85 dark:bg-[#0f2a2a]/85 text-[#0f2a2a]/85 dark:text-[#d9faf4]/85 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Brief User Quote */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#d9faf4]/55 dark:bg-[#0f2a2a]/55 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 mb-3">
                      <p className="italic text-[11px] text-[#0f2a2a]/90 dark:text-[#d9faf4]/90 leading-snug">
                        {item.quote}
                      </p>
                    </div>

                    {/* Synthesize Similar Scene Action */}
                    <Link
                      to="/create"
                      className="w-full py-2.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(0,191,166,0.5)] transition-all hover:scale-[1.01]"
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
        <div className="max-w-6xl w-full mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            {SHOWCASE_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to showcase ${i + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === i
                    ? "w-8 bg-[#FF5A52]"
                    : "w-2 bg-[#0f2a2a]/20 dark:bg-[#d9faf4]/20 hover:bg-[#00bfa6]/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A52] animate-pulse" />
            <span>Scroll vertically to glide through celebration atmospheres</span>
          </div>
        </div>
      </div>
    </section>
  );
}
