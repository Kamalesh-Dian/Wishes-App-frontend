import { motion } from "framer-motion";
import { Check, Sparkles, PartyPopper } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";

export interface OccasionOption {
  id: string;
  name: string;
  tag: string;
  subtitle: string;
  image: string;
}

export const OCCASIONS: OccasionOption[] = [
  {
    id: "birthday",
    name: "Birthday",
    tag: "Celebration & Joy",
    subtitle: "Festive candles, cake, balloons & warm celebration glow",
    image: "/assets/occasions/birthday.jpg",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    tag: "Milestone & Love",
    subtitle: "Roses bouquet, elegant cake, romantic candlelight & gold arch",
    image: "/assets/occasions/anniversary.jpg",
  },
  {
    id: "festival",
    name: "Festival",
    tag: "Tradition & Radiance",
    subtitle: "Diwali diya lamps, marigold blossoms, sweets & festive lanterns",
    image: "/assets/occasions/festival.jpg",
  },
  {
    id: "achievement",
    name: "Achievement",
    tag: "Recognition & Honor",
    subtitle: "Golden winner trophy, laurels, diploma scroll & confetti triumph",
    image: "/assets/occasions/achievement.jpg",
  },
  {
    id: "newjob",
    name: "New Job",
    tag: "Career & Success",
    subtitle: "Executive desk card, coffee, corporate badge & welcome gift",
    image: "/assets/occasions/newjob.jpg",
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

export default function OccasionStep() {
  const { occasion, setOccasion } = useWishStore();

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            <PartyPopper size={13} /> Step 1 • Celebration Theme
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Choose the Occasion
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Select the milestone mood to guide AI scene composition, lighting, and styling.
          </p>
        </div>

        {occasion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-[#00bfa6]/40 text-xs font-bold text-teal-800 dark:text-[#00bfa6] self-start sm:self-auto shadow-sm"
          >
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>Selected: {occasion}</span>
          </motion.div>
        )}
      </div>

      {/* Grid of Occasion Image Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {OCCASIONS.map((item) => {
          const isSelected = occasion === item.name;

          return (
            <motion.button
              key={item.id}
              type="button"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOccasion(item.name)}
              className={`
                group relative text-left rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-md flex flex-col justify-end
                h-64 sm:h-72
                ${
                  isSelected
                    ? "border-[#00bfa6] ring-4 ring-[#00bfa6]/25 shadow-xl shadow-[#00bfa6]/15"
                    : "border-slate-200/80 dark:border-slate-800 hover:border-[#00bfa6]/60 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40"
                }
              `}
            >
              {/* Background Cover Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Overlays for readable text and depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isSelected
                    ? "bg-[#00bfa6]/15 opacity-100 ring-2 ring-inset ring-[#00bfa6]"
                    : "opacity-0 group-hover:opacity-100 bg-black/10"
                }`}
              />

              {/* Top Badges */}
              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 border border-white/15">
                  {item.tag}
                </span>

                {/* Selected Checkmark Badge */}
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isSelected
                        ? "bg-[#00bfa6] text-[#0f2a2a] scale-100 shadow-lg shadow-[#00bfa6]/40"
                        : "bg-black/40 backdrop-blur-md text-white/40 scale-90 opacity-0 group-hover:opacity-100"
                    }
                  `}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 space-y-1.5 text-white">
                <h3 className="text-xl font-extrabold tracking-tight drop-shadow-sm flex items-center justify-between">
                  <span>{item.name}</span>
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed drop-shadow-sm">
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
