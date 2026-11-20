import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Wand2,
} from "lucide-react";
import { emitActiveCardTheme } from "./WishesBackgroundAnimation";

interface HeroCardItem {
  id: string;
  title: string;
  occasion: string;
  subtitle: string;
  image: string;
  cardBg: string;
  accentColor: string;
  floatingBadge?: {
    text: string;
    bg: string;
    textCol: string;
    position: "left" | "right";
  };
}

const CAROUSEL_CARDS: HeroCardItem[] = [
  {
    id: "diwali",
    title: "Diwali Twilight",
    occasion: "Festival of Lights",
    subtitle: "Warm brass diyas & marigold garlands",
    image: "/people/family.jpg",
    cardBg: "from-[#FF5A52] to-[#D93830]",
    accentColor: "#FF5A52",
    floatingBadge: {
      text: "Diwali Glow ✨",
      bg: "bg-[#FF5A52]",
      textCol: "text-white",
      position: "left",
    },
  },
  {
    id: "beach",
    title: "Coastal Reverie",
    occasion: "Anniversary Getaway",
    subtitle: "Tropical sunset & ocean horizon",
    image: "/themes/beach.jpg",
    cardBg: "from-[#38BDF8] to-[#0284C7]",
    accentColor: "#38BDF8",
    floatingBadge: {
      text: "Sunset Vibe 🌴",
      bg: "bg-[#38BDF8]",
      textCol: "text-[#0f2a2a]",
      position: "left",
    },
  },
  {
    id: "birthday",
    title: "30th Milestone",
    occasion: "Candlelit Soirée",
    subtitle: "Sparklers & candid laughter in 4K",
    image: "/people/friends.jpg",
    cardBg: "from-[#F5B24A] to-[#D97706]",
    accentColor: "#F5B24A",
    floatingBadge: {
      text: "99.8% Likeness",
      bg: "bg-[#F5B24A]",
      textCol: "text-[#0f2a2a]",
      position: "left",
    },
  },
  {
    id: "wedding",
    title: "Royal Sangeet",
    occasion: "Palace Celebration",
    subtitle: "Grand arches & ray-traced festive light",
    image: "/themes/luxury-hotel.jpg",
    cardBg: "from-[#00bfa6] to-[#0d9488]",
    accentColor: "#00bfa6",
    floatingBadge: {
      text: "4K Studio Print",
      bg: "bg-[#00bfa6]",
      textCol: "text-[#0f2a2a]",
      position: "right",
    },
  },
  {
    id: "corporate",
    title: "Team Milestone",
    occasion: "5th Work Anniversary",
    subtitle: "Automated OneDrive roster greeting",
    image: "/people/colleagues.jpg",
    cardBg: "from-[#A78BFA] to-[#7C3AED]",
    accentColor: "#A78BFA",
    floatingBadge: {
      text: "Auto-Synced 🚀",
      bg: "bg-[#A78BFA]",
      textCol: "text-[#0f2a2a]",
      position: "right",
    },
  },
  {
    id: "mountain",
    title: "Alpine Retreat",
    occasion: "Adventure Milestone",
    subtitle: "Emerald peaks & crystal lake reflection",
    image: "/themes/mountain.jpg",
    cardBg: "from-[#14B8A6] to-[#0F766E]",
    accentColor: "#14B8A6",
    floatingBadge: {
      text: "Pure Nature 🏔️",
      bg: "bg-[#14B8A6]",
      textCol: "text-[#0f2a2a]",
      position: "right",
    },
  },
  {
    id: "travel",
    title: "Global Journey",
    occasion: "Bon Voyage Wish",
    subtitle: "Worldwide celebration & flight horizon",
    image: "/themes/travel.jpg",
    cardBg: "from-[#FB7185] to-[#E11D48]",
    accentColor: "#FB7185",
    floatingBadge: {
      text: "Bon Voyage ✈️",
      bg: "bg-[#FB7185]",
      textCol: "text-white",
      position: "right",
    },
  },
];

export default function HeroSection() {
  // Continuously incrementing step counter for a true infinite circular loop
  const [step, setStep] = useState(3);
  const total = CAROUSEL_CARDS.length;
  const activeIndex = ((step % total) + total) % total;

  const selectCardIndex = (targetIdx: number) => {
    let diff = targetIdx - activeIndex;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    setStep((prev) => prev + diff);
  };

  // Continuous automatic infinite loop (never stops on hover)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            t: HTMLElement | string,
            opts: { offset: number; duration: number }
          ) => void;
        };
      }
    ).__lenis;
    const target = document.getElementById("how-it-works");
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Compute circular relative offset (-3 .. 0 .. +3) from activeIndex
  const getRelativeOffset = (index: number) => {
    let diff = index - activeIndex;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  // Sync background balloons, confetti & wish phrases with active center pop-up card
  useEffect(() => {
    const current = CAROUSEL_CARDS[activeIndex];
    if (current) {
      emitActiveCardTheme({
        id: current.id,
        title: current.title,
        occasion: current.occasion,
        accentColor: current.accentColor,
      });
    }
  }, [activeIndex]);

  return (
    <section
      aria-label="Wishes AI Hero"
      className="relative w-full min-h-screen flex items-center bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] pt-28 pb-16 sm:py-28 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[#00bfa6]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[480px] h-[480px] bg-[#FF5A52]/12 dark:bg-[#00bfa6]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Primary Actions */}
        <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="font-sans text-[clamp(2.35rem,4.6vw,4.3rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.06]">
            Turn one candid portrait into a{" "}
            <span className="text-[#00bfa6]">celebration</span>{" "}
            <span className="underline decoration-[#00bfa6]/80 decoration-wavy underline-offset-8">
              masterpiece.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-normal leading-relaxed">
            Upload a single photograph. Wishes AI stages festive night-market lanterns,
            royal wedding arches, and milestone soirées while preserving 100% of their true
            facial identity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(0,191,166,0.38)] hover:shadow-[0_12px_42px_rgba(0,191,166,0.6)] transition-all hover:scale-[1.03]"
            >
              <Sparkles size={17} className="text-[#0f2a2a]" />
              <span>Create Wish</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 bg-white/75 dark:bg-white/[0.06] text-[#0f2a2a] dark:text-[#d9faf4] text-sm font-semibold hover:border-[#FF5A52] hover:text-[#FF5A52] transition-all backdrop-blur-md cursor-pointer"
            >
              <Wand2 size={15} className="text-[#FF5A52]" />
              <span>Explore Process</span>
            </button>
          </div>
        </div>

        {/* Right Column: Continuous Infinite Loop Fanned Pop-Up Card Carousel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {/* Fanned Deck Stage */}
          <div className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center select-none">
            {CAROUSEL_CARDS.map((card, index) => {
              const offset = getRelativeOffset(index);
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              const isOuterEdge = absOffset >= 3;

              // Spacing and arc geometry matching the reference fanned pop-up deck
              const xStep =
                typeof window !== "undefined" && window.innerWidth < 640 ? 50 : 76;
              const translateX = offset * xStep;
              // Center card pops UP (-30px), side cards curve down along an arc
              const translateY = isCenter ? -30 : absOffset * 12 + (absOffset >= 2 ? 8 : 0);
              const scale = isCenter ? 1.15 : Math.max(0.75, 0.95 - absOffset * 0.06);
              const rotate = offset * 4;
              // Outer wrapping cards pass cleanly behind the deck (zIndex: 1) during loop wrap-around
              const zIndex = isOuterEdge ? 1 : 30 - absOffset * 6;
              const opacity = isOuterEdge ? 0.55 : 1 - absOffset * 0.07;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => selectCardIndex(index)}
                  onMouseEnter={() =>
                    emitActiveCardTheme({
                      id: card.id,
                      title: card.title,
                      occasion: card.occasion,
                      accentColor: card.accentColor,
                    })
                  }
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale,
                    rotate,
                    opacity,
                    zIndex,
                  }}
                  whileHover={{
                    y: isCenter ? -36 : translateY - 12,
                    scale: isCenter ? 1.18 : scale + 0.04,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                  }}
                  style={{ zIndex }}
                  className={`absolute w-[162px] h-[212px] sm:w-[202px] sm:h-[258px] rounded-[26px] p-2.5 bg-gradient-to-b ${card.cardBg} cursor-pointer transition-shadow duration-300 ${
                    isCenter
                      ? "shadow-[0_28px_60px_rgba(0,0,0,0.45)] ring-4 ring-white/85 dark:ring-[#d9faf4]/45"
                      : "shadow-[0_14px_30px_rgba(0,0,0,0.28)] hover:shadow-2xl"
                  }`}
                >
                  {/* Floating Speech-Bubble Callout Pill (Like Reference Image) */}
                  <AnimatePresence>
                    {(isCenter || offset === -2 || offset === 2) && card.floatingBadge && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.85 }}
                        animate={{
                          opacity: 1,
                          y: [0, -5, 0],
                          scale: 1,
                          rotate: offset < 0 ? -6 : offset > 0 ? 6 : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                          opacity: { duration: 0.25 },
                        }}
                        className={`absolute -top-9 ${
                          card.floatingBadge.position === "left" ? "left-2" : "right-2"
                        } z-40 px-3 py-1 rounded-full ${card.floatingBadge.bg} ${
                          card.floatingBadge.textCol
                        } text-[10px] font-mono font-extrabold tracking-wide shadow-lg whitespace-nowrap`}
                      >
                        {card.floatingBadge.text}
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 ${card.floatingBadge.bg}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Inner Image Frame */}
                  <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white dark:bg-[#091616] flex flex-col justify-between">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />

                    {/* Top Occasion Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-[8px] font-mono font-bold uppercase tracking-wider text-white">
                      {card.occasion}
                    </div>

                    {/* Center Pop-Up Card Bottom Frosted Overlay Bar */}
                    <div
                      className={`absolute bottom-2 left-2 right-2 rounded-2xl p-2.5 backdrop-blur-md transition-all duration-300 ${
                        isCenter
                          ? "bg-black/75 text-white opacity-100 translate-y-0"
                          : "bg-black/50 text-white/90 opacity-85"
                      }`}
                    >
                      <p className="font-sans text-xs sm:text-sm font-extrabold leading-tight truncate">
                        {card.title}
                      </p>
                      {isCenter && (
                        <p className="text-[10px] text-white/80 truncate mt-0.5">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
