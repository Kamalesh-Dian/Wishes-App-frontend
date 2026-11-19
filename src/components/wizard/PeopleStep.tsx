import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Sparkles } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";

interface PersonOption {
  name: string;
  image: string;
  subtitle: string;
}

const PEOPLE_OPTIONS: PersonOption[] = [
  {
    name: "Family",
    image: "/people/family.jpg",
    subtitle: "Warm moments surrounded by parents, spouse & loved ones",
  },
  {
    name: "Friends",
    image: "/people/friends.jpg",
    subtitle: "Joyful celebration with close friends & companions",
  },
  {
    name: "Colleagues",
    image: "/people/colleagues.jpg",
    subtitle: "Collaborative workplace team & professional peers",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function PeopleStep() {
  const { people, setPeople } = useWishStore();

  const togglePerson = (person: string) => {
    if (people.includes(person)) {
      setPeople(people.filter((p) => p !== person));
    } else {
      setPeople([...people, person]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            <Users size={13} /> Step 4 • Companions & Guests
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Who is celebrating with them?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Select one or more groups to include in the celebration atmosphere.
          </p>
        </div>

        {people.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-[#00bfa6]/40 text-xs font-bold text-teal-800 dark:text-[#00bfa6] self-start sm:self-auto"
          >
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>Selected: {people.join(", ")}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PEOPLE_OPTIONS.map((item, idx) => {
          const isSelected = people.includes(item.name);

          return (
            <motion.div
              key={item.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePerson(item.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-colors duration-300 flex flex-col justify-between bg-white dark:bg-slate-900 ${
                isSelected
                  ? "border-[#00bfa6] ring-4 ring-[#00bfa6]/20 shadow-[0_16px_40px_rgba(0,191,166,0.22)]"
                  : "border-slate-200/90 dark:border-slate-800 hover:border-[#00bfa6]/60 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Selected Checkmark Pill */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#00bfa6] text-[#0f2a2a] flex items-center justify-center shadow-md"
                  >
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Image Stage */}
              <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-[#ebfefb] dark:bg-slate-800/50 flex items-center justify-center p-2">
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
                    scale: isSelected ? 1.05 : 1,
                  }}
                  whileHover={{
                    scale: 1.09,
                    rotate: idx % 2 === 0 ? 1 : -1,
                  }}
                  transition={{
                    y: {
                      duration: 3.4 + idx * 0.35,
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
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                      isSelected
                        ? "bg-[#00bfa6] text-[#0f2a2a]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isSelected ? "Included" : "Add"}
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
