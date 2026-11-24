import { motion } from "framer-motion";
import { Film, Sparkles, PartyPopper, Flame, Check, Clock } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import PlanUsageBadge from "../ui/PlanUsageBadge";

const VIDEO_PRESETS = [
  {
    id: "cinematic-bokeh",
    title: "Gemini Omni 1.2 Flash (Cinematic Bokeh)",
    desc: "Google Gemini Omni native video generation with 3D camera pan, depth parallax & golden lighting",
    icon: Sparkles,
    badge: "GEMINI OMNI 1.2 FLASH • RECOMMENDED",
  },
  {
    id: "confetti-party",
    title: "Gemini Omni 1.2 Flash (Confetti Celebration)",
    desc: "Dynamic celebration motion with flying confetti ribbons, party energy & festive atmosphere",
    icon: PartyPopper,
    badge: "GEMINI OMNI 1.2 FLASH",
  },
  {
    id: "diya-lanterns",
    title: "Gemini Omni 1.2 Flash (Diya Lanterns & Glow)",
    desc: "Rising festive lanterns, warm amber illumination, and gentle twilight motion",
    icon: Flame,
    badge: "FESTIVAL GEMINI MODEL",
  },
];

const DURATION_PRESETS = [
  { sec: 4, label: "4s Teaser" },
  { sec: 6, label: "6s Social" },
  { sec: 8, label: "8s Cinema HD (Max)" },
];

export default function AnimationStep() {
  const {
    animationEnabled,
    setAnimation,
    additionalInformation,
    setAdditionalInformation,
    videoDuration = 8,
    setVideoDuration,
  } = useWishStore();

  const activePreset =
    VIDEO_PRESETS.find((p) => additionalInformation.includes(p.id))?.id ||
    "cinematic-bokeh";

  const { canGenerateVideo, openUpgradeModal, getPlanConfig } = useSubscriptionStore();
  const plan = getPlanConfig();

  const selectPreset = (presetId: string) => {
    if (!canGenerateVideo()) {
      openUpgradeModal(
        `Video generation limit reached (${plan.videoLimit}/${plan.videoLimit} on ${plan.name} Plan). Upgrade to Pro ($5) for 10 videos (10s each) or Ultimate ($12) for 25 videos (10s each).`
      );
      return;
    }
    setAnimation(true);
    setAdditionalInformation(presetId);
  };

  const handleToggleAnimation = () => {
    if (!animationEnabled && !canGenerateVideo()) {
      openUpgradeModal(
        `Video generation limit reached (${plan.videoLimit}/${plan.videoLimit} on ${plan.name} Plan). Upgrade to Pro ($5) for 10 videos (10s each) or Ultimate ($12) for 25 videos (10s each).`
      );
      return;
    }
    setAnimation(!animationEnabled);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            <Film size={13} /> Step 6 • Gemini Omni 1.2 Flash Video
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            AI Video Generation (Gemini Omni 1.2 Flash)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Use Google gemini-omni-1.2-flash to synthesize photorealistic MP4 video motion directly from your celebration portrait.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PlanUsageBadge />
          <button
            type="button"
            onClick={handleToggleAnimation}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shadow-sm ${
              animationEnabled
                ? "bg-[#00bfa6] text-[#0f2a2a] shadow-[0_0_20px_rgba(0,191,166,0.35)]"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Film size={14} />
            <span>AI Video: {animationEnabled ? "✓ Enabled" : "Disabled"}</span>
          </button>
        </div>
      </div>

      {/* Motion Theme Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {VIDEO_PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isSelected = animationEnabled && activePreset === preset.id;

          return (
            <motion.div
              key={preset.id}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectPreset(preset.id)}
              className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/25 shadow-lg ring-2 ring-[#00bfa6]/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00bfa6]/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-[#00bfa6] text-[#0f2a2a] flex items-center justify-center shadow-sm">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}

              <div>
                <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00bfa6]/15 text-[#00bfa6] mb-3">
                  {preset.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-[#00bfa6] mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {preset.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Video Duration Controller (4s to 10s) */}
      {animationEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 sm:p-6 rounded-2xl border border-[#00bfa6]/30 bg-teal-50/30 dark:bg-[#143838]/40 backdrop-blur-sm shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00bfa6]/20 flex items-center justify-center text-[#00bfa6]">
                <Clock size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Custom Video Duration</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00bfa6] text-[#0f2a2a]">
                    {videoDuration}s
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select celebration duration between 4s and 10s (30 FPS HD rendering)
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {DURATION_PRESETS.map((p) => {
                const isActive = videoDuration === p.sec;
                return (
                  <button
                    key={p.sec}
                    type="button"
                    onClick={() => setVideoDuration(p.sec)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#00bfa6] text-[#0f2a2a] shadow-sm font-bold"
                        : "bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-white"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-slate-400">4s</span>
              <input
                type="range"
                min="4"
                max="8"
                step="1"
                value={videoDuration}
                onChange={(e) => setVideoDuration(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00bfa6]"
              />
              <span className="text-xs font-mono text-slate-400">8s</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <span>Short teaser clip</span>
              <span className="font-mono text-[#00bfa6] font-semibold">
                Gemini Omni 1.2 Flash • {videoDuration}s MP4
              </span>
              <span>Full 8s cinematic experience</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
