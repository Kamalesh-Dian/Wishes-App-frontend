import { motion } from "framer-motion";
import { Film, Sparkles, PartyPopper, Flame, Check } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import UpgradeModal from "../ui/UpgradeModal";
import PlanUsageBadge from "../ui/PlanUsageBadge";

const VIDEO_PRESETS = [
  {
    id: "cinematic-bokeh",
    title: "Cinematic Bokeh & Zoom",
    desc: "Smooth Ken Burns portrait zoom with floating golden light orbs",
    icon: Sparkles,
    badge: "RECOMMENDED",
  },
  {
    id: "confetti-party",
    title: "Festive Confetti & Ribbons",
    desc: "Dynamic falling celebration confetti ribbons & party energy",
    icon: PartyPopper,
    badge: "BIRTHDAYS & MILESTONES",
  },
  {
    id: "diya-lanterns",
    title: "Diya Lanterns & Golden Drift",
    desc: "Warm rising festival lanterns and twilight ember particles",
    icon: Flame,
    badge: "DIWALI & WEDDINGS",
  },
];

export default function AnimationStep() {
  const {
    animationEnabled,
    setAnimation,
    additionalInformation,
    setAdditionalInformation,
  } = useWishStore();

  const activePreset =
    VIDEO_PRESETS.find((p) => additionalInformation.includes(p.id))?.id ||
    "cinematic-bokeh";

  const { canGenerateVideo, openUpgradeModal, getPlanConfig } = useSubscriptionStore();
  const plan = getPlanConfig();

  const selectPreset = (presetId: string) => {
    if (!canGenerateVideo()) {
      openUpgradeModal(
        `Video generation limit reached (${plan.videoLimit}/${plan.videoLimit} on ${plan.name} Plan). Upgrade to Pro ($5) for 25 videos or Ultimate ($12) for 50 videos.`
      );
      return;
    }
    setAnimation(true);
    setAdditionalInformation(presetId);
  };

  const handleToggleAnimation = () => {
    if (!animationEnabled && !canGenerateVideo()) {
      openUpgradeModal(
        `Video generation limit reached (${plan.videoLimit}/${plan.videoLimit} on ${plan.name} Plan). Upgrade to Pro ($5) for 25 videos or Ultimate ($12) for 50 videos.`
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
            <Film size={13} /> Step 6 • Video & Motion Synthesis
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Animated Celebration Video Mode
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Enable motion synthesis to render both a 4K portrait and an animated celebration video.
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
            <span>Video Mode: {animationEnabled ? "✓ Enabled" : "Disabled"}</span>
          </button>
        </div>
      </div>

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
      <UpgradeModal />
    </div>
  );
}
