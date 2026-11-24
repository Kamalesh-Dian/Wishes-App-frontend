import { Layers, Zap, Users, ArrowUpRight, RotateCcw } from "lucide-react";
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
  const Icon = tier === "ultimate" ? Users : tier === "pro" ? Zap : Layers;

  const remainingImages = Math.max(0, plan.imageLimit - usedImages);
  const remainingVideos = Math.max(0, plan.videoLimit - usedVideos);

  return (
    <div className="inline-flex items-center gap-2.5 p-1 px-3 rounded-full bg-slate-100/90 dark:bg-white/[0.06] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/12 text-xs shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-1.5 font-bold text-[#0f2a2a] dark:text-[#d9faf4]">
        <span className="w-5 h-5 rounded-full bg-[#00bfa6]/20 text-[#00bfa6] flex items-center justify-center shrink-0">
          <Icon size={11} />
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00bfa6]">
          {plan.name} ({plan.price})
        </span>
      </div>

      <span className="text-slate-300 dark:text-slate-700">|</span>

      {/* Usage Counters */}
      <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
        <span className="inline-flex items-center gap-1" title={`Used ${usedImages} of ${plan.imageLimit} images (${remainingImages} left)`}>
          <span className="px-1 py-0.5 rounded text-[8.5px] font-bold tracking-wider bg-[#0f2a2a]/8 dark:bg-white/10 text-[#0f2a2a] dark:text-[#d9faf4]">IMG</span>
          <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">{usedImages}</span>/{plan.imageLimit}
        </span>
        <span className="inline-flex items-center gap-1" title={`Used ${usedVideos} of ${plan.videoLimit} videos (${remainingVideos} left)`}>
          <span className="px-1 py-0.5 rounded text-[8.5px] font-bold tracking-wider bg-[#0f2a2a]/8 dark:bg-white/10 text-[#0f2a2a] dark:text-[#d9faf4]">VID</span>
          <span className="font-bold text-[#0f2a2a] dark:text-[#d9faf4]">{usedVideos}</span>/{plan.videoLimit}
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
