import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Wand2 } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";

export interface DecorationOption {
  id: string;
  label: string;
  tag: string;
  subtitle: string;
  image: string;
}

export const DECORATION_OPTIONS: DecorationOption[] = [
  {
    id: "cake",
    label: "Celebration Cake",
    tag: "Dessert & Candles",
    subtitle: "Artisan drip cake topped with strawberries, blueberries & lit candles",
    image: "/assets/decorations/cake.png",
  },
  {
    id: "balloons",
    label: "Party Balloons",
    tag: "Festive Floating",
    subtitle: "Metallic multi-color balloons cluster tied with elegant golden ribbons",
    image: "/assets/decorations/balloons.png",
  },
  {
    id: "diyas",
    label: "Festive Diyas",
    tag: "Traditional Glow",
    subtitle: "Carved golden oil lamps with warm flickering flames & marigold flowers",
    image: "/assets/decorations/diyas.png",
  },
  {
    id: "confetti",
    label: "Magic Confetti",
    tag: "Atmosphere & Burst",
    subtitle: "Floating golden streamers & vibrant celebration paper particles",
    image: "/assets/decorations/confetti.png",
  },
  {
    id: "flowers",
    label: "Fresh Bouquet",
    tag: "Botanical Floral",
    subtitle: "Hand-tied bouquet of gerbera daisies, fresh blooms & satin bow",
    image: "/assets/decorations/flowers.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function DecorationStep() {
  const { decorations, setDecorations } = useWishStore();

  const toggleDecoration = (value: string) => {
    if (decorations.includes(value)) {
      setDecorations(decorations.filter((d) => d !== value));
    } else {
      setDecorations([...decorations, value]);
    }
  };

  const handleSelectAll = () => {
    if (decorations.length === DECORATION_OPTIONS.length) {
      setDecorations([]);
    } else {
      setDecorations(DECORATION_OPTIONS.map((d) => d.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            <Wand2 size={13} /> Step 5 • Celebration Accents
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Add Festive Decorations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Select one or more decorative elements for AI to blend into the celebration scene.
          </p>
        </div>

        {/* Counter and Select All Action */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#00bfa6] dark:hover:text-[#00bfa6] px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {decorations.length === DECORATION_OPTIONS.length ? "Clear All" : "Select All"}
          </button>

          <AnimatePresence>
            {decorations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-[#00bfa6]/40 text-xs font-bold text-teal-800 dark:text-[#00bfa6] shadow-sm"
              >
                <Sparkles size={12} className="text-[#00bfa6]" />
                <span>{decorations.length} Selected</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid of Decoration Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {DECORATION_OPTIONS.map((item) => {
          const isSelected = decorations.includes(item.id);

          return (
            <motion.button
              key={item.id}
              type="button"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleDecoration(item.id)}
              className={`
                group relative text-left rounded-3xl p-5 border-2 cursor-pointer transition-all duration-300 shadow-sm flex flex-col justify-between
                min-h-[260px] overflow-hidden
                ${
                  isSelected
                    ? "border-[#00bfa6] ring-4 ring-[#00bfa6]/20 bg-teal-500/[0.04] dark:bg-teal-500/[0.08] shadow-lg shadow-[#00bfa6]/10"
                    : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-[#00bfa6]/50 hover:shadow-md"
                }
              `}
            >
              {/* Radial Glow Highlight behind image */}
              <div
                className={`
                  absolute -top-10 -right-10 w-44 h-44 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none
                  ${isSelected ? "bg-[#00bfa6]/25 opacity-100" : "bg-slate-200/40 dark:bg-slate-700/20 opacity-0 group-hover:opacity-100"}
                `}
              />

              {/* Top Row: Tag + Selection Checkbox */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {item.tag}
                </span>

                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border
                    ${
                      isSelected
                        ? "bg-[#00bfa6] border-[#00bfa6] text-[#0f2a2a] shadow-sm"
                        : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-transparent group-hover:border-[#00bfa6]"
                    }
                  `}
                >
                  <Check size={13} strokeWidth={3} className={isSelected ? "opacity-100" : "opacity-0"} />
                </div>
              </div>

              {/* Center Image Showcase */}
              <div className="relative z-10 flex items-center justify-center py-3 my-auto">
                <img
                  src={item.image}
                  alt={item.label}
                  className="max-h-32 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-md"
                  loading="lazy"
                />
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-between">
                  <span>{item.label}</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
