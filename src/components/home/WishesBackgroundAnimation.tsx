import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Gift,
  Heart,
  Sparkles,
  Star,
  PartyPopper,
  Mail,
  Flower2,
  Cake,
  Flame,
  Crown,
  type LucideProps,
} from "lucide-react";

export interface CardThemePayload {
  id: string;
  title: string;
  occasion: string;
  accentColor: string;
  wishes?: string[];
}

export function emitActiveCardTheme(payload: CardThemePayload) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CardThemePayload>("wishes:card-active", { detail: payload })
    );
  }
}

// Custom Helium Balloon SVG Component
function BalloonIcon({ className, style }: LucideProps) {
  return (
    <svg
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M18 2C9.71573 2 3 8.71573 3 17C3 26.5 11.5 33.2 16.8 34.8L15.5 37.5H20.5L19.2 34.8C24.5 33.2 33 26.5 33 17C33 8.71573 26.2843 2 18 2Z"
        fill="currentColor"
        fillOpacity="0.28"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M11 10C9.5 12 8.5 14.5 8.5 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 37.5C18 40.5 15.5 42.5 18 46"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CARD_WISH_MAP: Record<string, string[]> = {
  diwali: [
    "Subh Diwali 🪔",
    "Festival of Lights ✨",
    "Prosperity & Joy 🌸",
    "Golden Blessings 🕯️",
    "Warmest Wishes ❤️",
    "Celebrate Together 🎉",
    "Radiant Moments ✨",
    "With Love & Light 🪔",
  ],
  beach: [
    "Happy Anniversary 🌴",
    "Ocean Breeze & Love 🌊",
    "Cheers to Us! 🥂",
    "Sunset Wishes ☀️",
    "Forever Together ❤️",
    "Paradise Found ✨",
    "Warmest Wishes 🎈",
    "Coastal Magic 🐚",
  ],
  birthday: [
    "Happy Birthday! 🎂",
    "Make a Wish! 🎈",
    "Cheers & Sparklers 🥂",
    "Party Time! 🎉",
    "Stay Radiant ✨",
    "Many Happy Returns 🎁",
    "Best Wishes ❤️",
    "Celebrate Big! 🎊",
  ],
  wedding: [
    "Royal Sangeet 👑",
    "Happy Wedding! 💍",
    "Forever & Always ❤️",
    "Majestic Blessings 🌸",
    "Cheers to the Couple 🥂",
    "Timeless Love ✨",
    "Grand Celebration 🎉",
    "With All Our Love 💐",
  ],
  corporate: [
    "Happy Work Anniversary 🚀",
    "5+ Years of Excellence 🌟",
    "Kudos to the Team! 🎉",
    "Milestone Unlocked 🏆",
    "Congrats on Success! ✨",
    "Team Appreciation 👏",
    "Best Wishes 💼",
    "Onward & Upward 🚀",
  ],
  mountain: [
    "New Heights! 🏔️",
    "Adventure Awaits ✨",
    "Peak Milestone 🎯",
    "Wild & Free 🌲",
    "Best Wishes 🎈",
    "Cheers to Journey 🥂",
    "Unstoppable Spirit 🌟",
    "Warmest Wishes ❤️",
  ],
  travel: [
    "Bon Voyage! ✈️",
    "Safe Travels 🌍",
    "Global Adventure 🧭",
    "New Horizons ✨",
    "Happy Journey 🎈",
    "Explore the World 🌟",
    "Best Wishes ❤️",
    "Fly High! 🚀",
  ],
};

interface FloaterConfig {
  id: number;
  kind: "icon" | "balloon" | "word";
  Icon: React.ComponentType<LucideProps>;
  wordIndex: number;
  baseX: number; // percentage 0..100
  baseY: number; // percentage 0..100
  size: number;
  depth: number; // parallax multiplier
  duration: number;
  delay: number;
  colorClass: string;
}

const FLOATER_ITEMS: FloaterConfig[] = [
  {
    id: 1,
    kind: "balloon",
    Icon: BalloonIcon,
    wordIndex: 0,
    baseX: 7,
    baseY: 16,
    size: 30,
    depth: 1.5,
    duration: 16,
    delay: 0,
    colorClass: "text-[#FF5A52]/55 dark:text-[#FF5A52]/65",
  },
  {
    id: 2,
    kind: "icon",
    Icon: PartyPopper,
    wordIndex: 1,
    baseX: 88,
    baseY: 14,
    size: 38-,
    depth: 1.2,
    duration: 19,
    delay: 1.5,
    colorClass: "text-[#F5B24A]/60 dark:text-[#F5B24A]/70",
  },
  {
    id: 3,
    kind: "balloon",
    Icon: BalloonIcon,
    wordIndex: 2,
    baseX: 84,
    baseY: 58,
    size: 50,
    depth: 1.7,
    duration: 17,
    delay: 0.8,
    colorClass: "text-[#00bfa6]/55 dark:text-[#00bfa6]/65",
  },
  {
    id: 4,
    kind: "icon",
    Icon: Gift,
    wordIndex: 3,
    baseX: 11,
    baseY: 68,
    size: 40,
    depth: 1.1,
    duration: 21,
    delay: 2.2,
    colorClass: "text-[#F5B24A]/55 dark:text-[#F5B24A]/65",
  },
  {
    id: 5,
    kind: "icon",
    Icon: Cake,
    wordIndex: 4,
    baseX: 24,
    baseY: 28,
    size: 34,
    depth: 0.9,
    duration: 20,
    delay: 1.1,
    colorClass: "text-[#FF5A52]/50 dark:text-[#FF5A52]/60",
  },
  {
    id: 6,
    kind: "balloon",
    Icon: BalloonIcon,
    wordIndex: 5,
    baseX: 48,
    baseY: 82,
    size: 44,
    depth: 1.4,
    duration: 18,
    delay: 3.0,
    colorClass: "text-[#A78BFA]/55 dark:text-[#A78BFA]/65",
  },
  {
    id: 7,
    kind: "icon",
    Icon: Flame,
    wordIndex: 6,
    baseX: 72,
    baseY: 26,
    size: 36,
    depth: 1.3,
    duration: 15,
    delay: 0.4,
    colorClass: "text-[#F5B24A]/60 dark:text-[#F5B24A]/75",
  },
  {
    id: 8,
    kind: "icon",
    Icon: Heart,
    wordIndex: 7,
    baseX: 64,
    baseY: 74,
    size: 36,
    depth: 1.0,
    duration: 22,
    delay: 2.6,
    colorClass: "text-rose-500/50 dark:text-rose-400/65",
  },
  {
    id: 9,
    kind: "icon",
    Icon: Crown,
    wordIndex: 0,
    baseX: 32,
    baseY: 62,
    size: 34,
    depth: 1.25,
    duration: 19,
    delay: 1.8,
    colorClass: "text-[#00bfa6]/50 dark:text-[#00bfa6]/65",
  },
  {
    id: 10,
    kind: "icon",
    Icon: Sparkles,
    wordIndex: 1,
    baseX: 53,
    baseY: 12,
    size: 38,
    depth: 1.6,
    duration: 16,
    delay: 0.9,
    colorClass: "text-[#00bfa6]/55 dark:text-[#00bfa6]/70",
  },
  {
    id: 11,
    kind: "icon",
    Icon: Flower2,
    wordIndex: 2,
    baseX: 92,
    baseY: 84,
    size: 36,
    depth: 1.15,
    duration: 23,
    delay: 1.4,
    colorClass: "text-pink-500/50 dark:text-pink-400/60",
  },
  {
    id: 12,
    kind: "icon",
    Icon: Mail,
    wordIndex: 3,
    baseX: 5,
    baseY: 44,
    size: 36,
    depth: 1.35,
    duration: 20,
    delay: 2.9,
    colorClass: "text-sky-500/50 dark:text-sky-400/60",
  },
  // Floating Wish Phrase Pills
  {
    id: 13,
    kind: "word",
    Icon: Star,
    wordIndex: 0,
    baseX: 15,
    baseY: 20,
    size: 12,
    depth: 1.65,
    duration: 18,
    delay: 0.2,
    colorClass: "",
  },
  {
    id: 14,
    kind: "word",
    Icon: Star,
    wordIndex: 1,
    baseX: 78,
    baseY: 19,
    size: 12,
    depth: 1.45,
    duration: 20,
    delay: 1.7,
    colorClass: "",
  },
  {
    id: 15,
    kind: "word",
    Icon: Star,
    wordIndex: 2,
    baseX: 18,
    baseY: 78,
    size: 12,
    depth: 1.3,
    duration: 22,
    delay: 0.9,
    colorClass: "",
  },
  {
    id: 16,
    kind: "word",
    Icon: Star,
    wordIndex: 3,
    baseX: 76,
    baseY: 72,
    size: 12,
    depth: 1.55,
    duration: 19,
    delay: 2.4,
    colorClass: "",
  },
  {
    id: 17,
    kind: "word",
    Icon: Star,
    wordIndex: 4,
    baseX: 42,
    baseY: 36,
    size: 12,
    depth: 1.15,
    duration: 21,
    delay: 3.1,
    colorClass: "",
  },
  {
    id: 18,
    kind: "word",
    Icon: Star,
    wordIndex: 5,
    baseX: 86,
    baseY: 42,
    size: 12,
    depth: 1.75,
    duration: 17,
    delay: 1.2,
    colorClass: "",
  },
];

// Confetti ribbons & sparkling particles
const CONFETTI_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  width: i % 3 === 0 ? 10 : ((i * 7) % 6) + 4,
  height: i % 3 === 0 ? 4 : ((i * 7) % 6) + 4,
  isRibbon: i % 3 === 0,
  x: (i * 19 + 7) % 96,
  y: (i * 29 + 11) % 96,
  depth: 0.6 + (i % 5) * 0.3,
  duration: 14 + (i % 7) * 3,
  delay: -((i * 11) % 20),
}));

export default function WishesBackgroundAnimation() {
  const [activeCard, setActiveCard] = useState<CardThemePayload>({
    id: "wedding",
    title: "Royal Sangeet",
    occasion: "Palace Celebration",
    accentColor: "#00bfa6",
  });
  const [pulseKey, setPulseKey] = useState(0);
  const [cursorNearItem, setCursorNearItem] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Normalized cursor (-1 to +1) for smooth 3D multi-layer parallax
  const rawNormX = useMotionValue(0);
  const rawNormY = useMotionValue(0);
  const rawPxX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const rawPxY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  const springNormX = useSpring(rawNormX, { stiffness: 90, damping: 22 });
  const springNormY = useSpring(rawNormY, { stiffness: 90, damping: 22 });
  const springPxX = useSpring(rawPxX, { stiffness: 140, damping: 25 });
  const springPxY = useSpring(rawPxY, { stiffness: 140, damping: 25 });

  const layer1X = useTransform(springNormX, [-1, 1], [38, -38]);
  const layer1Y = useTransform(springNormY, [-1, 1], [28, -28]);
  const layer2X = useTransform(springNormX, [-1, 1], [-56, 56]);
  const layer2Y = useTransform(springNormY, [-1, 1], [-42, 42]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w - 0.5) * 2;
      const ny = (e.clientY / h - 0.5) * 2;
      rawNormX.set(nx);
      rawNormY.set(ny);
      rawPxX.set(e.clientX);
      rawPxY.set(e.clientY);

      const pctX = (e.clientX / w) * 100;
      const pctY = (e.clientY / h) * 100;
      setMousePos({ x: pctX, y: pctY });

      // Detect closest floating balloon / wish item to cursor for interactive repulsion
      let closestId: number | null = null;
      let minDist = 14; // percentage threshold
      for (const item of FLOATER_ITEMS) {
        const dx = item.baseX - pctX;
        const dy = item.baseY - pctY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closestId = item.id;
        }
      }
      setCursorNearItem(closestId);
    };

    const handleCardActive = (e: Event) => {
      const custom = e as CustomEvent<CardThemePayload>;
      if (custom.detail) {
        setActiveCard(custom.detail);
        setPulseKey((prev) => prev + 1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("wishes:card-active", handleCardActive);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wishes:card-active", handleCardActive);
    };
  }, [rawNormX, rawNormY, rawPxX, rawPxY]);

  const activeWishes =
    activeCard.wishes ||
    CARD_WISH_MAP[activeCard.id] ||
    CARD_WISH_MAP.birthday;

  const confettiColors = [
    activeCard.accentColor,
    "#00bfa6",
    "#FF5A52",
    "#F5B24A",
    "#A78BFA",
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[2]"
      aria-hidden="true"
    >
      {/* Card-Reactive Ambient Aura Follower */}
      <motion.div
        style={{
          x: springPxX,
          y: springPxY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${activeCard.accentColor}26 0%, ${activeCard.accentColor}08 45%, transparent 72%)`,
        }}
        className="w-[460px] h-[460px] rounded-full blur-[60px] transition-colors duration-700"
      />

      {/* Parallax Layer 1: Floating Balloons & Celebratory Icons */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0"
      >
        {FLOATER_ITEMS.filter((item) => item.kind !== "word").map((item) => {
          const Icon = item.Icon;
          const isNearCursor = cursorNearItem === item.id;
          // Repulsion vector away from cursor
          const repelX = isNearCursor
            ? (item.baseX - mousePos.x) * 3.2
            : 0;
          const repelY = isNearCursor
            ? (item.baseY - mousePos.y) * 3.2
            : 0;

          return (
            <motion.div
              key={item.id}
              style={{
                left: `${item.baseX}%`,
                top: `${item.baseY}%`,
              }}
              animate={{
                y: [repelY, repelY - 34, repelY],
                x: [repelX, repelX + 16, repelX - 16, repelX],
                rotate:
                  item.kind === "balloon"
                    ? [-8, 8, -8]
                    : [0, 18, -18, 0],
                scale: isNearCursor ? 1.32 : pulseKey % 2 === 0 ? [1, 1.12, 1] : 1,
              }}
              transition={{
                y: {
                  duration: item.duration,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                },
                x: {
                  duration: item.duration * 1.1,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: item.kind === "balloon" ? 5.5 : 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                },
              }}
              className={`absolute ${item.colorClass} transition-colors duration-500`}
            >
              <Icon
                style={{
                  width: item.size,
                  height: item.size,
                  color:
                    item.id % 3 === 0 ? activeCard.accentColor : undefined,
                }}
                className="opacity-70 dark:opacity-75 drop-shadow-sm"
                strokeWidth={1.8}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Parallax Layer 2: Card-Synced Floating Wish Phrase Pills */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0"
      >
        {FLOATER_ITEMS.filter((item) => item.kind === "word").map((item) => {
          const phrase = activeWishes[item.wordIndex % activeWishes.length];
          const isNearCursor = cursorNearItem === item.id;
          const repelX = isNearCursor ? (item.baseX - mousePos.x) * 3.5 : 0;
          const repelY = isNearCursor ? (item.baseY - mousePos.y) * 3.5 : 0;

          return (
            <motion.div
              key={`${item.id}-${phrase}`}
              style={{
                left: `${item.baseX}%`,
                top: `${item.baseY}%`,
                borderColor: `${activeCard.accentColor}55`,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: [0.45, 0.85, 0.45],
                y: [repelY, repelY - 28, repelY],
                x: [repelX, repelX - 14, repelX + 14, repelX],
                rotate: [-4, 4, -4],
                scale: isNearCursor ? 1.2 : 1,
              }}
              transition={{
                opacity: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: item.duration,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                },
                x: {
                  duration: item.duration * 1.15,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                },
              }}
              className="absolute px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wide bg-white/65 dark:bg-[#143838]/70 text-[#0f2a2a]/80 dark:text-[#d9faf4]/85 border backdrop-blur-md shadow-sm whitespace-nowrap"
            >
              {phrase}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Rising & Swirling Confetti Ribbons / Particles */}
      {CONFETTI_PARTICLES.map((p) => {
        const color = confettiColors[p.id % confettiColors.length];
        return (
          <motion.div
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.width,
              height: p.height,
              backgroundColor: color,
            }}
            animate={{
              y: ["0vh", "-95vh"],
              x: [
                0,
                Math.sin(p.id) * 32 + (mousePos.x - 50) * 0.35 * p.depth,
                0,
              ],
              rotate: p.isRibbon ? [0, 180, 360] : [0, 90, 180],
              opacity: [0, 0.65, 0.65, 0],
            }}
            transition={{
              y: {
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              },
              x: {
                duration: p.duration * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4 + (p.id % 4),
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              },
            }}
            className={p.isRibbon ? "absolute rounded-sm" : "absolute rounded-full"}
          />
        );
      })}
    </div>
  );
}
