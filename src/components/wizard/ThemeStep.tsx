import { motion } from "framer-motion";
import { Check, MapPin, Sparkles } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";

interface ThemeOption {
  name: string;
  image: string;
  subtitle: string;
}

const THEME_PLACES: ThemeOption[] = [
  {
    name: "Beach",
    image: "/themes/beach.jpg",
    subtitle: "Tropical coast, palm breeze & ocean horizon",
  },
  {
    name: "Luxury Hotel",
    image: "/themes/luxury-hotel.jpg",
    subtitle: "Five-star resort poolside & grand architecture",
  },
  {
    name: "Office",
    image: "/themes/office.jpg",
    subtitle: "Modern glass headquarters & executive workspace",
  },
  {
    name: "Mountain",
    image: "/themes/mountain.jpg",
    subtitle: "Alpine peaks, pine forest & crystal lake",
  },
  {
    name: "Home",
    image: "/themes/home.jpg",
    subtitle: "Warm family residence & cozy garden setting",
  },
  {
    name: "Travel",
    image: "/themes/travel.jpg",
    subtitle: "Global adventure, flight & destination vibe",
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
  hidden: { opacity: 0, y: 24, scale: 0.95 },
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

export default function ThemeStep() {
  const { theme, setTheme } = useWishStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            <MapPin size={13} /> Step 3 • Destination & Setting
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Choose a celebration site
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Select the backdrop location where Wishes AI will stage your personalized portrait.
          </p>
        </div>

        {theme && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-[#00bfa6]/40 text-xs font-bold text-teal-800 dark:text-[#00bfa6] self-start sm:self-auto"
          >
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>Selected: {theme}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {THEME_PLACES.map((item, idx) => {
          const isSelected = theme === item.name;

          return (
            <motion.div
              key={item.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(item.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-colors duration-300 flex flex-col justify-between bg-white dark:bg-slate-900 ${
                isSelected
                  ? "border-[#00bfa6] ring-4 ring-[#00bfa6]/20 shadow-[0_16px_40px_rgba(0,191,166,0.22)]"
                  : "border-slate-200/90 dark:border-slate-800 hover:border-[#00bfa6]/60 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Selected Checkmark Pill */}
              {isSelected && (
                <motion.div
                  layoutId="selectedThemeCheck"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#00bfa6] text-[#0f2a2a] flex items-center justify-center shadow-md"
                >
                  <Check size={16} strokeWidth={3} />
                </motion.div>
              )}

              {/* Animated Image Stage */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#f4fdfb] dark:bg-slate-800/50 flex items-center justify-center p-3">
                {/* Ambient radial glow behind the illustration */}
                <div
                  className={`absolute inset-0 bg-radial from-[#00bfa6]/20 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-75"
                  }`}
                />

                <motion.img
                  src={item.image}
                  alt={item.name}
                  animate={{
                    y: isSelected ? [0, -6, 0] : [0, -4, 0],
                    scale: isSelected ? 1.06 : 1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: idx % 2 === 0 ? 1.2 : -1.2,
                  }}
                  transition={{
                    y: {
                      duration: 3.2 + (idx % 3) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      type: "spring",
                      stiffness: 240,
                      damping: 18,
                    },
                    rotate: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    },
                  }}
                  className="w-full h-full object-contain rounded-2xl select-none"
                />
              </div>

              {/* Card Footer Details */}
              <div
                className={`px-5 py-4 border-t transition-colors duration-300 ${
                  isSelected
                    ? "bg-teal-50/70 dark:bg-teal-950/30 border-[#00bfa6]/30"
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 group-hover:bg-slate-50/80 dark:group-hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-base font-bold transition-colors ${
                      isSelected
                        ? "text-teal-950 dark:text-[#00bfa6]"
                        : "text-slate-800 dark:text-slate-100 group-hover:text-[#00bfa6]"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                      isSelected
                        ? "bg-[#00bfa6] text-[#0f2a2a]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isSelected ? "Active" : "Select"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
