import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Flame, Heart, Crown, Cake, Star, CheckCircle } from "lucide-react";
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
    accentGlow: "from-[#00bfa6]/25 to-transparent",
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
    accentGlow: "from-[#00bfa6]/20 to-transparent",
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
    accentGlow: "from-[#00bfa6]/25 to-transparent",
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
    accentGlow: "from-[#00bfa6]/20 to-transparent",
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
    accentGlow: "from-[#00bfa6]/20 to-transparent",
  },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center+=80",
        end: "bottom center-=80",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const activeItem = SHOWCASE_ITEMS[activeIndex] || SHOWCASE_ITEMS[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="gallery"
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00bfa6]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>Masterpiece Gallery</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
            Curated celebratory <span className="italic text-[#00bfa6] font-semibold">atmospheres.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl">
            Scroll down to explore how different festive lighting, cultural attire, and environments
            transform the portrait while keeping true facial likeness intact.
          </p>
        </div>

        {/* 2-Column Scroll-Driven Layout (Like Process Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Scrolling Celebration Occasion Cards */}
          <div className="lg:col-span-6 space-y-6">
            {SHOWCASE_ITEMS.map((item, idx) => {
              const isCurrent = activeIndex === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_16px_40px_rgba(0,191,166,0.18)] scale-[1.01]"
                      : "bg-white/50 dark:bg-[#143838]/40 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50 hover:bg-white/80 dark:hover:bg-[#143838]/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs tracking-widest text-[#00bfa6] font-bold uppercase px-2.5 py-1 rounded-full bg-[#00bfa6]/15">
                      {item.tag}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isCurrent
                          ? "bg-[#00bfa6] text-[#0f2a2a]"
                          : "bg-[#0f2a2a]/5 dark:bg-[#d9faf4]/10 text-[#0f2a2a] dark:text-[#d9faf4]"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#00bfa6] mb-3">
                    {item.occasion}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>

                  {/* Specification tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                    {item.specs.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 text-[#0f2a2a]/80 dark:text-[#d9faf4]/80 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Showcase Stage */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl p-7 sm:p-9 bg-white dark:bg-[#143838] border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between">
              {/* Soft Ambient Inner Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#00bfa6]/15 rounded-full blur-[90px] pointer-events-none" />

              {/* Stage Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00bfa6] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#0f2a2a]/80 dark:text-[#d9faf4]/80 font-bold">
                    Atmosphere In Focus
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#00bfa6]/15 text-[#00bfa6] font-bold">
                  {activeIndex + 1} OF {SHOWCASE_ITEMS.length}
                </span>
              </div>

              {/* Dynamic Showcase Display */}
              <div className="my-6 space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 flex items-center justify-center text-[#00bfa6]">
                    <ActiveIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#0f2a2a] dark:text-[#d9faf4]">
                      {activeItem.title}
                    </h4>
                    <p className="text-xs text-[#00bfa6] font-semibold">{activeItem.occasion}</p>
                  </div>
                </div>

                {/* Atmospheric Simulation Details */}
                <div className="p-5 rounded-2xl bg-[#d9faf4]/50 dark:bg-[#0f2a2a]/50 border border-[#00bfa6]/25">
                  <p className="font-serif italic text-sm text-[#0f2a2a] dark:text-[#d9faf4] leading-relaxed">
                    {activeItem.quote}
                  </p>
                </div>

                {/* Key Quality Indicators */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                    <span className="text-[10px] font-mono text-[#00bfa6] uppercase block font-bold">Resolution</span>
                    <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">4K Ultra-HD (300 DPI)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                    <span className="text-[10px] font-mono text-[#00bfa6] uppercase block font-bold">Identity Match</span>
                    <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">Biometric Facial Lock</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {activeItem.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-xs text-[#0f2a2a]/80 dark:text-[#d9faf4]/80">
                      <CheckCircle size={14} className="text-[#00bfa6]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Bottom Action */}
              <div className="pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {SHOWCASE_ITEMS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const target = itemRefs.current[idx];
                        if (target) {
                          const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, opts: { offset: number }) => void } }).__lenis;
                          if (lenis) lenis.scrollTo(target, { offset: -90 });
                          else target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeIndex === idx
                          ? "w-8 bg-[#00bfa6]"
                          : "w-2 bg-[#0f2a2a]/20 dark:bg-[#d9faf4]/20 hover:bg-[#00bfa6]/60"
                      }`}
                      aria-label={`Jump to atmosphere ${idx + 1}`}
                    />
                  ))}
                </div>

                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_20px_rgba(0,191,166,0.35)] hover:shadow-[0_0_28px_rgba(0,191,166,0.6)] transition-all hover:scale-105"
                >
                  <span>Synthesize Scene</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
