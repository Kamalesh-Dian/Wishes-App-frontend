import { Sparkles, Zap, Users, ArrowUpRight, RotateCcw } from "lucide-react";
import { useSubscriptionStore, PLAN_CONFIGS } from "../../store/subscriptionStore";

export default function PlanUsageBadge() {
  const {
    tier,
    usedImages,
    usedVideos,
    openUpgradeModal,
    resetUsage,
  } = useSubscriptionStore();

  const plan = PLAN_CONFIGS[tier];
  const Icon = tier === "ultimate" ? Users : tier === "pro" ? Zap : Sparkles;

  const remainingImages = Math.max(0, plan.imageLimit - usedImages);
  const remainingVideos = Math.max(0, plan.videoLimit - usedVideos);

  return (
    <div className="inline-flex items-center gap-2 p-1.5 px-3 rounded-full bg-slate-100/80 dark:bg-white/[0.05] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-xs shadow-sm">
      <div className="flex items-center gap-1.5 font-bold text-[#0f2a2a] dark:text-[#d9faf4]">
        <span className="w-5 h-5 rounded-full bg-[#00bfa6]/20 text-[#00bfa6] flex items-center justify-center shrink-0">
          <Icon size={11} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-[#00bfa6]">
          {plan.name} ({plan.price})
        </span>
      </div>

      <span className="text-slate-300 dark:text-slate-700">|</span>

      {/* Usage Counters */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
        <span title={`Used ${usedImages} of ${plan.imageLimit} images`}>
          🖼️ <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">{remainingImages}</span>/{plan.imageLimit}
        </span>
        <span title={`Used ${usedVideos} of ${plan.videoLimit} videos`}>
          🎬 <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">{remainingVideos}</span>/{plan.videoLimit}
        </span>
      </div>

      <button
        type="button"
        onClick={() => openUpgradeModal()}
        className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer shadow-sm hover:scale-105"
      >
        <span>{tier === "ultimate" ? "Manage" : "Upgrade"}</span>
        <ArrowUpRight size={11} />
      </button>

      {/* Testing tool: reset usage button */}
      {(usedImages > 0 || usedVideos > 0) && (
        <button
          type="button"
          onClick={resetUsage}
          title="Reset test usage to 0"
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw size={10} />
        </button>
      )}
    </div>
  );
}
