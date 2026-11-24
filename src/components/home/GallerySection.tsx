import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Plus,
  Film,
  SlidersHorizontal,
  Camera,
  Palette,
  Layers,
  Compass,
  Gift,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { emitActiveCardTheme } from "./WishesBackgroundAnimation";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseCardData {
  id: string;
  title: string;
  occasion: string;
  subtitle: string;
  image: string;
  bgTint: string;
  isEditorialInCascade?: boolean;
}

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: "diwali",
    title: "Diwali Twilight",
    occasion: "Festival of Lights",
    subtitle: "Warm brass diyas & marigold bokeh",
    image: "/showcase/Diwali.png",
    bgTint: "#F5E6D3",
  },
  {
    id: "editorial-birthday",
    title: "Where portrait meets celebration",
    occasion: "30th Milestone Soirée",
    subtitle:
      "Upload one candid photo and stage keepsakes worth staying up for.",
    image: "/showcase/Celebration.png",
    bgTint: "#F4F1EA",
    isEditorialInCascade: true,
  },
  {
    id: "wedding",
    title: "Royal Sangeet",
    occasion: "Palace Heritage",
    subtitle: "Sandstone arches & jasmine garlands",
    image: "/showcase/Sangeet.png",
    bgTint: "#D9E8E4",
  },
  {
    id: "corporate",
    title: "Team Milestone",
    occasion: "Work Anniversary",
    subtitle: "Automated OneDrive roster dispatch",
    image: "/showcase/Team.png",
    bgTint: "#E8DFD5",
  },
  {
    id: "mountain",
    title: "Alpine Retreat",
    occasion: "Adventure Wish",
    subtitle: "Emerald peaks & crystal lake horizon",
    image: "/showcase/Adventure.png",
    bgTint: "#CBEFE3",
  },
  {
    id: "beach",
    title: "Sunset Reverie",
    occasion: "Silver Anniversary",
    subtitle: "Tropical horizon & golden twilight",
    image: "/showcase/Anniversary.png",
    bgTint: "#FCD5B5",
  },
];

const FLOATING_TOOLS = [
  { icon: Film, x: "18%", y: "10%" },
  { icon: Camera, x: "4%", y: "42%" },
  { icon: SlidersHorizontal, x: "28%", y: "46%" },
  { icon: Compass, x: "46%", y: "58%" },
  { icon: Palette, x: "12%", y: "78%" },
  { icon: Layers, x: "34%", y: "84%" },
  { icon: Gift, x: "66%", y: "48%" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [progress, setProgress] = useState(0);
  const [slotMetrics, setSlotMetrics] = useState<
    { x: number; y: number; scaleX: number; scaleY: number }[]
  >([]);
  const [stageSize, setStageSize] = useState({ w: 1280, h: 800 });

  const BASE_CARD_W = 220;
  const BASE_CARD_H = 270;

  const measureSlots = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const centerX = stageRect.width / 2;
    const centerY = stageRect.height / 2;

    setStageSize({ w: stageRect.width, h: stageRect.height });

    const metrics = SHOWCASE_CARDS.map((_, idx) => {
      const el = slotRefs.current[idx];
      if (!el) {
        return { x: 200, y: 0, scaleX: 0.75, scaleY: 0.75 };
      }
      const r = el.getBoundingClientRect();
      const slotCenterX = r.left - stageRect.left + r.width / 2;
      const slotCenterY = r.top - stageRect.top + r.height / 2;
      return {
        x: slotCenterX - centerX,
        y: slotCenterY - centerY,
        scaleX: r.width / BASE_CARD_W,
        scaleY: r.height / BASE_CARD_H,
      };
    });

    setSlotMetrics(metrics);
  }, []);

  useEffect(() => {
    measureSlots();
    window.addEventListener("resize", measureSlots);
    const t = setTimeout(measureSlots, 300);
    return () => {
      window.removeEventListener("resize", measureSlots);
      clearTimeout(t);
    };
  }, [measureSlots]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Choreography timeline weights:
  // Stage 1 (0.00 -> 0.30): Cards rise from bottom into center stack over big headline
  // Stage 2 (0.30 -> 0.64): Cards spread left-to-right downward in a diagonal cascade
  // Stage 3 (0.64 -> 1.00): Cards arrange into the 3x2 Folder div on the right while Left Vision column reveals
  const riseT = smoothstep(0.0, 0.2, progress);
  const toCascadeT = smoothstep(0.26, 0.54, progress);
  const toFolderT = smoothstep(0.62, 0.92, progress);

  const stage1HeadlineOpacity = 1 - smoothstep(0.24, 0.38, progress);
  const stage3FolderOpacity = smoothstep(0.6, 0.78, progress);
  const editorialCardOverlayOpacity =
    smoothstep(0.28, 0.42, progress) * (1 - smoothstep(0.62, 0.76, progress));

  const isCompact = stageSize.w < 1024;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full h-[340vh] bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-20"
    >
      {/* Ambient Background Glows */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" ref={stageRef}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-[#00bfa6]/12 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[#FF5A52]/10 rounded-full blur-[160px] pointer-events-none" />

        {/* =====================================================================
            STAGE 1: BIG CENTERED EDITORIAL HEADLINE & SPEECH-BUBBLE TAGS
           ===================================================================== */}
        <div
          style={{
            opacity: stage1HeadlineOpacity,
            transform: `translateY(${lerp(0, -30, toCascadeT)}px) scale(${lerp(1, 0.96, toCascadeT)})`,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none select-none"
        >
          <div className="relative max-w-4xl w-full text-center mt-24 sm:mt-32">
            {/* Floating Speech-Bubble Tag Left (@maya) */}
            <div className="hidden sm:inline-flex items-center px-3.5 py-1 rounded-full bg-white dark:bg-[#d9faf4] text-[#0f2a2a] text-xs font-mono font-bold shadow-lg -rotate-12 mb-3 mr-64">
              @maya
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white dark:bg-[#d9faf4]" />
            </div>

            {/* Floating Pill Right */}
            <div className="hidden sm:inline-flex items-center px-3.5 py-1 rounded-full bg-[#A78BFA] text-[#0f2a2a] text-xs font-mono font-bold shadow-lg rotate-6 mb-3 ml-64">
              @arjun
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#A78BFA]" />
            </div>

            <h2 className="font-display text-[clamp(1.75rem,2.6vw,3.2rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#f4f1ea] leading-[1.18]">
              Whether you&apos;re crafting a personal keepsake{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#0f2a2a]/80 dark:text-[#f4f1ea]/85">
                / or celebrating milestones across your team
              </span>{" "}{" "}
              Wishes AI
              <br className="hidden sm:inline" /> connects portrait{" "}
              &amp; emotion.
            </h2>
          </div>
        </div>

        {/* =====================================================================
            STAGE 3: LEFT VISION COLUMN & RIGHT FOLDER-LIKE CONTAINER ("Collect / Studio")
           ===================================================================== */}
        <div
          style={{
            opacity: stage3FolderOpacity,
            pointerEvents: stage3FolderOpacity > 0.6 ? "auto" : "none",
          }}
          className="relative z-10 max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          {/* Left Column: Vision Headline, CTA & Floating Circular Tool Icons */}
          <div
            style={{
              transform: `translateY(${lerp(28, 0, toFolderT)}px)`,
            }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            <h2 className="font-sans text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#f4f1ea] leading-[1.08]">
              Our vision
              <br />
              for every kind of{" "}
              <span className="text-[#00bfa6]">celebration.</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed max-w-md">
              Every portrait holds a story. Wishes AI gives you a dedicated studio to stage
              the festive atmosphere, lock facial identity, and deliver 4K keepsakes straight
              from your browser.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#183f3f] border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 text-xs sm:text-sm font-bold text-[#0f2a2a] dark:text-[#f4f1ea] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all shadow-md"
              >
                <span>Explore Studio</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Scattered Floating Circular Tool Icons (Matching Reference Image 3 Bottom-Left) */}
            <div className="relative hidden sm:block w-full max-w-xs h-36 mt-6">
              {FLOATING_TOOLS.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={i}
                    style={{ left: tool.x, top: tool.y }}
                    className="absolute w-10 h-10 rounded-full bg-white/75 dark:bg-[#143838]/90 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 flex items-center justify-center text-[#0f2a2a]/75 dark:text-[#d9faf4]/80 shadow-md backdrop-blur-md transition-transform hover:scale-110 hover:text-[#00bfa6]"
                  >
                    <Icon size={15} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Folder-Like Div ("Collect" Header + "Studio" Tab + 3x2 Grid) */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-[30px] p-3 sm:p-4 bg-[#bfece4]/70 dark:bg-[#071515]/90 border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-2xl backdrop-blur-xl">
              {/* Top Bar Inside Outer Frame: "Collect" & "+ Create" Button */}
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <span className="font-sans text-xs sm:text-sm font-bold text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                  Collect
                </span>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#143838] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 text-[11px] font-bold text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-colors shadow-sm"
                >
                  <Plus size={12} className="text-[#00bfa6]" />
                  <span>Create</span>
                </Link>
              </div>

              {/* Sculpted Folder Tab Header ("Studio") */}
              <div className="relative">
                <div className="flex items-end">
                  <div className="relative z-10 px-6 py-2.5 rounded-t-2xl bg-white/95 dark:bg-[#112c2c] border-t border-l border-r border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 font-sans text-xs sm:text-sm font-bold text-[#0f2a2a] dark:text-[#f4f1ea] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00bfa6]" />
                    <span>Studio</span>
                  </div>
                  {/* Folder Tab Slope Connector */}
                  <div
                    className="w-6 h-6 bg-white/95 dark:bg-[#112c2c] -ml-1"
                    style={{
                      clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                    }}
                  />
                </div>

                {/* Folder Body Containing the 3x2 Grid Slots */}
                <div className="relative z-0 -mt-px rounded-b-[24px] rounded-tr-[24px] p-4 sm:p-5 bg-white/95 dark:bg-[#112c2c] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 shadow-inner">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {SHOWCASE_CARDS.map((card, idx) => (
                      <div
                        key={card.id}
                        ref={(el) => {
                          slotRefs.current[idx] = el;
                        }}
                        className="w-full aspect-[22/27] rounded-2xl border border-dashed border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            CHOREOGRAPHED FLOATING CARDS (MORPH ACROSS STAGES 1 -> 2 -> 3)
           ===================================================================== */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {SHOWCASE_CARDS.map((card, i) => {
            // 1. Stage 1 coordinates (Stacked Fan rising from bottom to upper-center)
            const startY = 520 + i * 35;
            const stackX = (i - 2.5) * 10;
            const stackY = -75 + (i - 2.5) * 3;
            const stackRot = -10 + i * 3.8;

            const s1X = stackX;
            const s1Y = lerp(startY, stackY, riseT);
            const s1Rot = lerp(stackRot * 1.4, stackRot, riseT);
            const s1Scale = lerp(0.86, 1.0, riseT);

            // 2. Stage 2 coordinates (Left-to-Right Downward Diagonal Cascade)
            const cascadeSpreadX = isCompact ? 54 : 138;
            const cascadeSpreadY = isCompact ? 26 : 44;
            const s2X = (i - 2.5) * cascadeSpreadX;
            const s2Y = (i - 2.5) * cascadeSpreadY;
            const s2Rot = -3.5 + i * 1.4;
            const s2Scale = isCompact ? 0.78 : 0.96;

            // Interpolate Stage 1 -> Stage 2
            const midX = lerp(s1X, s2X, toCascadeT);
            const midY = lerp(s1Y, s2Y, toCascadeT);
            const midRot = lerp(s1Rot, s2Rot, toCascadeT);
            const midScale = lerp(s1Scale, s2Scale, toCascadeT);

            // 3. Stage 3 coordinates (Exact measured slot inside the Folder 3x2 grid)
            const slot = slotMetrics[i] || {
              x: 200,
              y: 0,
              scaleX: 0.72,
              scaleY: 0.72,
            };
            const folderScale = Math.min(slot.scaleX, slot.scaleY);

            const finalX = lerp(midX, slot.x, toFolderT);
            const finalY = lerp(midY, slot.y, toFolderT);
            const finalRot = lerp(midRot, 0, toFolderT);
            const finalScale = lerp(midScale, folderScale, toFolderT);

            return (
              <Link
                to="/create"
                key={card.id}
                onMouseEnter={() =>
                  emitActiveCardTheme({
                    id: card.id === "editorial-birthday" ? "birthday" : card.id,
                    title: card.title,
                    occasion: card.occasion,
                    accentColor: i % 2 === 0 ? "#00bfa6" : "#FF5A52",
                  })
                }
                style={{
                  width: `${BASE_CARD_W}px`,
                  height: `${BASE_CARD_H}px`,
                  transform: `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0) scale(${finalScale.toFixed(3)}) rotate(${finalRot.toFixed(2)}deg)`,
                  zIndex: 20 + i,
                }}
                className="group absolute rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-2 border-white/80 dark:border-white/15 bg-white dark:bg-[#143838] pointer-events-auto cursor-pointer transition-shadow hover:shadow-[0_25px_60px_rgba(0,191,166,0.35)] will-change-transform"
              >
                {/* Card Illustration Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                />

                {/* Stage 2 Editorial White Card Overlay on Card #2 (Matching Reference Screenshot 2) */}
                {card.isEditorialInCascade && (
                  <div
                    style={{ opacity: editorialCardOverlayOpacity }}
                    className="absolute inset-0 p-5 bg-[#F4F1EA] text-[#0f2a2a] flex flex-col justify-between pointer-events-none"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans text-base font-extrabold leading-snug text-[#0f2a2a]">
                        Where portrait
                        <br />
                        meets celebration
                      </h3>
                      <span className="w-7 h-7 rounded-full bg-[#0f2a2a] text-white flex items-center justify-center shrink-0">
                        <Eye size={13} />
                      </span>
                    </div>
                    <p className="text-[11px] text-[#0f2a2a]/75 leading-relaxed font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                )}

                {/* Subtle Bottom Label Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md text-white flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-[11px] font-bold leading-tight truncate">
                      {card.title}
                    </p>
                    <p className="text-[9px] text-[#00bfa6] font-mono uppercase tracking-wider truncate">
                      {card.occasion}
                    </p>
                  </div>
                  <ArrowRight size={11} className="text-[#FF5A52] shrink-0 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
