import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Flame, Heart, Crown, Cake, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SHOWCASE_ITEMS = [
  {
    id: "diwali",
    title: "Diwali Twilight Splendor",
    occasion: "Diwali • Festival of Lights",
    tag: "FESTIVE LIGHTING",
    icon: Flame,
    accent: "#00bfa6",
    description: "Brass oil lamps, glowing marigold garlands, and soft twilight reflections. Real smile, zero distortion.",
    quote: "“The diyas cast a natural golden glow that looked like a high-budget film production.”",
    bgGradient: "from-[#00bfa6]/25 via-[#133838] to-[#0f2a2a]",
    specs: ["Warm Candlelit Bokeh", "Silk Texture Fidelity", "Authentic Cultural Decor"],
  },
  {
    id: "birthday",
    title: "Milestone 30th Soirée",
    occasion: "Milestone Birthday",
    tag: "COCKTAIL & CANDLELIGHT",
    icon: Cake,
    accent: "#00bfa6",
    description: "Midnight champagne reflections, floating helium balloons, and sparkling candle glow around the subject.",
    quote: "“Captured Maya’s genuine laughter in a setting more magical than any photoshoot could manage.”",
    bgGradient: "from-[#00bfa6]/25 via-[#122e2e] to-[#0f2a2a]",
    specs: ["Champagne Glass Reflections", "Festive Sparkler Trails", "Candid Facial Expression"],
  },
  {
    id: "wedding",
    title: "Royal Palace Sangeet",
    occasion: "Wedding & Celebrations",
    tag: "MAJESTIC HERITAGE",
    icon: Crown,
    accent: "#00bfa6",
    description: "Intricately embroidered festive attire, historic sandstone arches, and cascading jasmine garlands.",
    quote: "“Preserved every subtle nuance of my parents’ portraits with majestic historical architecture.”",
    bgGradient: "from-[#00bfa6]/25 via-[#143838] to-[#0f2a2a]",
    specs: ["Handcrafted Zari Embroidery", "Grand Archway Depth", "Authentic Royal Lighting"],
  },
  {
    id: "anniversary",
    title: "Silver Jubilee Reverie",
    occasion: "25th Anniversary",
    tag: "LANTERN REFLECTIONS",
    icon: Heart,
    accent: "#00bfa6",
    description: "Floating water lanterns drifting across a calm lake beneath a star-filled velvet sky with warm ambient intimacy.",
    quote: "“A poetic, timeless keepsake that looks like an oil painting brought to life.”",
    bgGradient: "from-[#00bfa6]/25 via-[#133838] to-[#0f2a2a]",
    specs: ["Water Ripple Reflections", "Bioluminescent Lantern Glow", "Intimate Dual Portrait"],
  },
  {
    id: "corporate",
    title: "Executive Work Milestone",
    occasion: "Corporate Achievement",
    tag: "COMPANY-WIDE GREETING",
    icon: Star,
    accent: "#00bfa6",
    description: "Contemporary glass atrium adorned with champagne gold streamers and personalized team appreciation accolades.",
    quote: "“Sent automatically via OneDrive on our VP's 5th work anniversary. Clean, respectful, and premium.”",
    bgGradient: "from-[#00bfa6]/25 via-[#122e2e] to-[#0f2a2a]",
    specs: ["OneDrive Automated Sync", "Vector Logo Incorporation", "Instant Email Dispatch"],
  },
];

export default function GallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".showcase-card");
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - 24,
        behavior: "smooth",
      });
      setActiveIndex(index);
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
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 overflow-hidden border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00bfa6]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>Masterpiece Gallery</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
            Curated celebratory <span className="italic text-[#00bfa6] font-semibold">atmospheres.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl">
            Each scene is dynamically illuminated to match the cultural, sentimental, or milestone
            relevance of your celebration.
          </p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous showcase card"
            className="w-11 h-11 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/70 dark:bg-[#143838]/70 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === SHOWCASE_ITEMS.length - 1}
            aria-label="Next showcase card"
            className="w-11 h-11 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 bg-white/70 dark:bg-[#143838]/70 flex items-center justify-center text-[#0f2a2a] dark:text-[#d9faf4] disabled:opacity-30 hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={(e) => {
          const container = e.currentTarget;
          const scrollLeft = container.scrollLeft;
          const cardWidth = 380;
          const newIndex = Math.round(scrollLeft / cardWidth);
          if (newIndex !== activeIndex && newIndex >= 0 && newIndex < SHOWCASE_ITEMS.length) {
            setActiveIndex(newIndex);
          }
        }}
        className="relative z-10 w-full overflow-x-auto scrollbar-hide px-6 sm:px-12 flex gap-6 pb-6 cursor-grab active:cursor-grabbing"
      >
        {SHOWCASE_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isCurrent = activeIndex === index;

          return (
            <div
              key={item.id}
              onClick={() => scrollToIndex(index)}
              className={`showcase-card shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] rounded-3xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[500px] shadow-xl ${
                isCurrent
                  ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_16px_40px_rgba(0,191,166,0.2)] scale-[1.01]"
                  : "bg-white/60 dark:bg-[#143838]/60 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50"
              }`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#00bfa6]/15 text-[#00bfa6]">
                    {item.tag}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#00bfa6]/10 flex items-center justify-center text-[#00bfa6]">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Title & Occasion */}
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#00bfa6] mb-4">
                  {item.occasion}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Specification Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
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
                <div className="p-4 rounded-2xl bg-[#d9faf4]/50 dark:bg-[#0f2a2a]/50 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 mb-6">
                  <p className="font-serif italic text-xs text-[#0f2a2a]/90 dark:text-[#d9faf4]/90 leading-relaxed">
                    {item.quote}
                  </p>
                </div>

                {/* Card Action */}
                <Link
                  to="/create"
                  className="w-full py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(0,191,166,0.5)] transition-all"
                >
                  <span>Synthesize Similar Scene</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicator Dots */}
      <div className="relative z-10 flex justify-center items-center gap-2 mt-8">
        {SHOWCASE_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Jump to showcase ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === i
                ? "w-8 bg-[#00bfa6]"
                : "w-2 bg-[#0f2a2a]/20 dark:bg-[#d9faf4]/20 hover:bg-[#00bfa6]/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
