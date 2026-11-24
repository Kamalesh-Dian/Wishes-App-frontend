import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, type Transition } from "framer-motion";
import {
  Sun,
  Maximize2,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus,
  ShieldCheck,
  Check,
} from "lucide-react";

interface TechCardItem {
  id: string;
  tag: string;
  title: string;
  stat: string;
  statLabel: string;
  subTracks: string[];
  description: string;
  primaryAction: { label: string; link: string };
  secondaryAction: { label: string; link: string };
  techStrip: string[];
  gradientStyle: string;
  accentColor: string;
  statColor: string;
  badgeBg: string;
  icon: typeof Sun;
}

const TECH_CARDS: TechCardItem[] = [
  {
    id: "lighting",
    tag: "PHOTOMETRIC SYNTHESIS",
    title: "Atmospheric Scene Synthesis",
    stat: "99.8%",
    statLabel: "True Facial Geometry Lock",
    subTracks: [
      "Diwali Diya Light Bounce",
      "Subsurface Candle Scatter",
      "Studio Ray-Traced Shadow Mapping",
    ],
    description:
      "Calculates authentic light bounce from festive oil diyas, candle flames, chandeliers, or sunlit floral mandaps across skin and fabric textures without artificial plastic smoothing.",
    primaryAction: { label: "Explore Lighting Studio", link: "/create" },
    secondaryAction: { label: "View Showcase", link: "/#gallery" },
    techStrip: [
      "FLUX.1 PRO ENGINE",
      "RAY-TRACED PHOTOMETRICS",
      "BIOMETRIC MAPPING",
      "COLORSPACE REC.709",
    ],
    // Theme 1: Wishes AI Signature Radiant Teal & Obsidian Emerald
    gradientStyle:
      "bg-[radial-gradient(ellipse_at_top_left,#00bfa6_0%,#0f3e3a_35%,#091e1e_85%)] border-[#00bfa6]/40 text-[#d9faf4]",
    accentColor: "#00bfa6",
    statColor: "text-[#00bfa6]",
    badgeBg: "bg-[#00bfa6]/20 border-[#00bfa6]/40 text-[#d9faf4]",
    icon: Sun,
  },
  {
    id: "resolution",
    tag: "ULTRA-HIGH DEFINITION",
    title: "True 4K UHD Master Prints",
    stat: "300 DPI",
    statLabel: "Framed Canvas & Print Ready",
    subTracks: [
      "4096 × 2160 Ultra-HD",
      "Razor-Sharp Fabric Weave",
      "Gallery Canvas Export",
    ],
    description:
      "Every generation exports at razor-sharp 300 DPI resolution, primed for luxury digital invitations, 4K screen wallpapers, or physical framed canvas gallery keepsakes.",
    primaryAction: { label: "Export 4K Master", link: "/create" },
    secondaryAction: { label: "Print Specifications", link: "/create" },
    techStrip: [
      "4096×2160 RAW",
      "300 DPI MASTER",
      "ICC COLOR PROFILE",
      "PREMIUM CANVAS READY",
    ],
    // Theme 2: Wishes Coral Sunset & Warm Festive Gold
    gradientStyle:
      "bg-[radial-gradient(ellipse_at_top_left,#FF5A52_0%,#4a1f28_40%,#132422_85%)] border-[#FF5A52]/40 text-[#d9faf4]",
    accentColor: "#FF5A52",
    statColor: "text-[#FF5A52]",
    badgeBg: "bg-[#FF5A52]/20 border-[#FF5A52]/40 text-[#d9faf4]",
    icon: Maximize2,
  },
  {
    id: "automation",
    tag: "WORKPLACE AUTOMATION",
    title: "Automated Calendar Sync",
    stat: "9:00 AM",
    statLabel: "Zero-Touch Local Delivery",
    subTracks: [
      "OneDrive & Outlook Sync",
      "Microsoft 365 Cloud",
      "Bulk Excel Roster Pipeline",
    ],
    description:
      "Connect OneDrive, Outlook, or Excel rosters once. The system automatically creates and dispatches personalized celebration scenes at local 9:00 AM on employee birthdays.",
    primaryAction: { label: "Connect OneDrive", link: "/onedrive" },
    secondaryAction: { label: "Import Excel Roster", link: "/import" },
    techStrip: [
      "MICROSOFT 365",
      "ONEDRIVE CLOUD",
      "OUTLOOK DIRECT DISPATCH",
      "ENTERPRISE SLA",
    ],
    // Theme 3: Mint Frost & Deep Petroleum Cyan
    gradientStyle:
      "bg-[radial-gradient(ellipse_at_top_left,#2dd4bf_0%,#114545_35%,#0c2222_85%)] border-[#2dd4bf]/40 text-[#d9faf4]",
    accentColor: "#2dd4bf",
    statColor: "text-[#2dd4bf]",
    badgeBg: "bg-[#2dd4bf]/20 border-[#2dd4bf]/40 text-[#d9faf4]",
    icon: Calendar,
  },
  {
    id: "themes",
    tag: "CULTURAL HERITAGE",
    title: "Curated Festive Themes",
    stat: "100+",
    statLabel: "Handcrafted Cultural Presets",
    subTracks: [
      "Diwali Twilight Soirées",
      "Royal Wedding Mandaps",
      "Destination Milestones",
    ],
    description:
      "Over 100 handcrafted celebration presets including Diwali Twilight, Golden Anniversaries, Milestone Birthdays, and Destination Sangeet celebrations with authentic cultural attire.",
    primaryAction: { label: "Browse 100+ Themes", link: "/create" },
    secondaryAction: { label: "Preview Attire", link: "/#gallery" },
    techStrip: [
      "CULTURALLY AUTHENTIC",
      "DYNAMIC FABRIC STYLING",
      "HERITAGE COLOR PALETTES",
      "ALL CELEBRATIONS",
    ],
    // Theme 4: Royal Festive Dual Teal & Coral Amber
    gradientStyle:
      "bg-[radial-gradient(ellipse_at_top_left,#00bfa6_0%,#16403c_45%,#261924_100%)] border-[#00bfa6]/45 text-[#d9faf4]",
    accentColor: "#00bfa6",
    statColor: "text-[#00bfa6]",
    badgeBg: "bg-[#00bfa6]/20 border-[#00bfa6]/40 text-[#d9faf4]",
    icon: Layers,
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

export default function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalCards = TECH_CARDS.length;

  // Auto-cycle carousel every 7 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleSelectCard = (index: number) => {
    setCurrentIndex(index);
  };

  // Helper to determine spatial deck positioning for each card in the 3D diagonal stack
  const getCardLayoutProps = (cardIdx: number) => {
    // Relative offset: 0 = center/front, 1 = bottom-right, totalCards - 1 = top-left, others = hidden behind
    const offset = (cardIdx - currentIndex + totalCards) % totalCards;

    if (offset === 0) {
      // FRONT & CENTER ACTIVE CARD
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        zIndex: 30,
        opacity: 1,
        pointerEvents: "auto" as const,
        isInteractive: true,
        isCenter: true,
      };
    }

    if (offset === 1) {
      // BOTTOM-RIGHT PEEKING CARD (Diagonal step down and right)
      return {
        x: 58,
        y: 46,
        scale: 0.93,
        rotate: 2.8,
        zIndex: 20,
        opacity: 0.68,
        pointerEvents: "auto" as const,
        isInteractive: true,
        isCenter: false,
      };
    }

    if (offset === totalCards - 1) {
      // TOP-LEFT PEEKING CARD (Diagonal step up and left)
      return {
        x: -58,
        y: -46,
        scale: 0.93,
        rotate: -2.8,
        zIndex: 10,
        opacity: 0.68,
        pointerEvents: "auto" as const,
        isInteractive: true,
        isCenter: false,
      };
    }

    // CARDS HIDDEN BEHIND IN DECK (Preparing to shuffle in)
    return {
      x: 0,
      y: 75,
      scale: 0.86,
      rotate: 0,
      zIndex: 5,
      opacity: 0,
      pointerEvents: "none" as const,
      isInteractive: false,
      isCenter: false,
    };
  };

  return (
    <section
      id="features"
      className="relative z-10 w-full bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-24 select-none"
    >
      {/* Ambient Atmospheric Caustic Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00bfa6]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF5A52]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6] animate-pulse" />
              <span>Technology Architecture</span>
            </div>
            <h2 className="font-display text-[clamp(1.7rem,3.1vw,2.5rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-white leading-[1.08]">
              Engineered for genuine likeness, <span className="text-[#00bfa6]">atmospheric fidelity.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-white/70 leading-relaxed">
              Explore the four core proprietary engines powering neural identity preservation,
              lighting physics, ultra-high definition, and enterprise milestone dispatch.
            </p>
          </div>

          {/* Carousel Controls & Step Indicator */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Pill Navigation Selectors */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-[#0f2a2a]/10 dark:border-white/15 shadow-sm">
              {TECH_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "bg-[#00bfa6] text-[#0f2a2a] shadow-md scale-105"
                      : "text-[#0f2a2a]/60 dark:text-white/60 hover:text-[#0f2a2a] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Technology Card"
                className="w-11 h-11 rounded-full border border-[#0f2a2a]/15 dark:border-white/20 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#0f2a2a] dark:text-white flex items-center justify-center transition-all hover:scale-105 backdrop-blur-md cursor-pointer active:scale-95 shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Technology Card"
                className="w-11 h-11 rounded-full border border-transparent bg-[#00bfa6] hover:bg-[#00d5b9] text-[#0f2a2a] flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,191,166,0.35)] cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            DIAGONAL 3D STACKED DECK STAGE (Up-to-Bottom Diagonal Deck Changing)
           ===================================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full h-[540px] sm:h-[580px] md:h-[620px] flex items-center justify-center"
        >
          {TECH_CARDS.map((card, idx) => {
            const layout = getCardLayoutProps(idx);
            const offset = (idx - currentIndex + totalCards) % totalCards;

            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  x: layout.x,
                  y: layout.y,
                  scale: layout.scale,
                  rotate: layout.rotate,
                  zIndex: layout.zIndex,
                  opacity: layout.opacity,
                }}
                transition={springTransition}
                onClick={() => {
                  if (offset === 1) handleNext();
                  if (offset === totalCards - 1) handlePrev();
                }}
                className={`absolute w-[92%] sm:w-[94%] max-w-5xl h-[490px] sm:h-[530px] md:h-[560px] rounded-[32px] p-6 sm:p-10 md:p-12 border shadow-[0_25px_70px_-15px_rgba(15,42,42,0.45)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden cursor-pointer ${
                  card.gradientStyle
                } ${layout.isCenter ? "cursor-default" : "hover:opacity-85"}`}
                style={{
                  pointerEvents: layout.pointerEvents,
                }}
              >
                {/* Radiant Theme Ambient Caustic Flares */}
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/15 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-black/40 rounded-full blur-[80px] pointer-events-none" />

                {/* Top Header: Tag Pill & Stat Badge */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <Plus size={13} className="text-white shrink-0" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                      {card.tag}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none ${card.statColor}`}>
                      {card.stat}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono font-semibold text-white/80 mt-1 uppercase tracking-wider">
                      {card.statLabel}
                    </div>
                  </div>
                </div>

                {/* Center Content: Title, Tracks, and Description */}
                <div className="relative z-10 my-auto">
                  <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-4 sm:mb-6">
                    {card.title}
                  </h3>

                  {/* Horizontal Timeline / Sub-Tracks Track */}
                  <div className="hidden sm:flex items-center gap-6 py-3 border-y border-white/20 mb-6 overflow-x-auto scrollbar-hide text-white/90">
                    {card.subTracks.map((track, i) => (
                      <div key={i} className="flex items-center gap-2 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                          {track}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description & Action Buttons Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <p className="md:col-span-8 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal">
                      {card.description}
                    </p>

                    <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3 shrink-0">
                      <Link
                        to={card.primaryAction.link}
                        className="px-5 py-2.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-xs sm:text-sm hover:bg-[#00d5b9] shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95"
                      >
                        {card.primaryAction.label}
                      </Link>
                      <Link
                        to={card.secondaryAction.link}
                        className="px-4 py-2.5 rounded-full bg-black/35 backdrop-blur-md text-white border border-white/30 font-semibold text-xs sm:text-sm hover:bg-black/50 transition-all cursor-pointer"
                      >
                        {card.secondaryAction.label}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Ribbon Dock (Matching uploaded photo's bottom white ribbon dock) */}
                <div className="relative z-10 w-full mt-4 sm:mt-6 bg-white/95 dark:bg-[#0c2424]/95 text-slate-900 dark:text-[#d9faf4] py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-md border border-white/30 dark:border-[#00bfa6]/25">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#00bfa6]" />
                    <span className="text-[#0f2a2a] dark:text-[#d9faf4]">Engine Standard</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-700 dark:text-[#d9faf4]/80">
                    {card.techStrip.map((item, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <Check size={11} className="text-[#00bfa6]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Carousel Indicator Dots & Progress */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {TECH_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectCard(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#00bfa6]"
                  : "w-2 bg-[#0f2a2a]/20 dark:bg-white/25 hover:bg-[#00bfa6]/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
