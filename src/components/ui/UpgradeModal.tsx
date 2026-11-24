import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Layers, Zap, Users, X, ShieldCheck } from "lucide-react";
import { useSubscriptionStore, PLAN_CONFIGS, type PlanTier } from "../../store/subscriptionStore";
import { toast } from "../../store/toastStore";

export default function UpgradeModal() {
  const {
    isUpgradeModalOpen,
    upgradeModalReason,
    closeUpgradeModal,
    tier: currentTier,
    setPlan,
    usedImages,
    usedVideos,
  } = useSubscriptionStore();

  const handleSelectPlan = (tier: PlanTier) => {
    setPlan(tier);
    const plan = PLAN_CONFIGS[tier];
    toast.success(`Switched to ${plan.name} Plan (${plan.price}/mo)`);
    closeUpgradeModal();
  };

  const planList: PlanTier[] = ["free", "pro", "ultimate"];

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUpgradeModal}
            className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl my-auto bg-white dark:bg-[#143838] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Close Button */}
            <button
              onClick={closeUpgradeModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00bfa6]/15 border border-[#00bfa6]/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6]" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#00bfa6] font-bold">
                  Subscription Plans & Limits
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight">
                Unlock Wishes AI Celebration Limits
              </h2>

              {upgradeModalReason ? (
                <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-medium">
                  {upgradeModalReason}
                </div>
              ) : (
                <p className="mt-2 text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
                  Select the tier that matches your celebration needs. Current usage:{" "}
                  <span className="font-bold text-[#00bfa6]">{usedImages} images</span> &{" "}
                  <span className="font-bold text-[#00bfa6]">{usedVideos} videos</span>.
                </p>
              )}
            </div>

            {/* 3 Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {planList.map((tierKey) => {
                const plan = PLAN_CONFIGS[tierKey];
                const isCurrent = currentTier === tierKey;
                const Icon = tierKey === "ultimate" ? Users : tierKey === "pro" ? Zap : Layers;

                return (
                  <div
                    key={tierKey}
                    className={`relative rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                      tierKey === "pro"
                        ? "bg-gradient-to-b from-white to-teal-50/30 dark:from-[#184444] dark:to-[#143838] border-[#00bfa6] shadow-lg ring-2 ring-[#00bfa6]/25"
                        : isCurrent
                        ? "bg-slate-50 dark:bg-white/[0.04] border-[#00bfa6]"
                        : "bg-white/60 dark:bg-white/[0.02] border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/40"
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-[9px] font-mono font-bold tracking-wider uppercase shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00bfa6]/15 flex items-center justify-center text-[#00bfa6]">
                          <Icon size={18} />
                        </div>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#00bfa6]/20 text-[#00bfa6]">
                            Active Plan
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#0f2a2a] dark:text-[#d9faf4]">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mt-1 mb-2">
                        <span className="text-3xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4]">
                          {plan.price}
                        </span>
                        <span className="text-xs text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                          {tierKey === "free" ? "forever" : "/month"}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mb-4 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-[#0f2a2a]/5 dark:border-[#d9faf4]/5 mb-4 text-xs font-semibold text-[#0f2a2a] dark:text-[#d9faf4]">
                        <div className="flex justify-between py-0.5">
                          <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Image Limit:</span>
                          <span className="font-mono text-[#00bfa6] font-bold">{plan.imageLimit}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Video Limit:</span>
                          <span className="font-mono text-[#00bfa6] font-bold">{plan.videoLimit}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Event Scheduling:</span>
                          <span className={plan.canScheduleEvents ? "text-emerald-500 font-bold" : "text-rose-400"}>
                            {plan.canScheduleEvents ? "✓ Included" : "✗ Locked"}
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">OneDrive Sync:</span>
                          <span className={plan.canConnectOneDrive ? "text-emerald-500 font-bold" : "text-rose-400"}>
                            {plan.canConnectOneDrive ? "✓ Included" : "✗ Locked"}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-6 text-xs text-[#0f2a2a]/80 dark:text-[#d9faf4]/80">
                        {plan.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={13} className="text-[#00bfa6] mt-0.5 shrink-0" />
                            <span className="text-[11px]">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPlan(tierKey)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-slate-200 dark:bg-white/10 text-[#0f2a2a] dark:text-[#d9faf4] cursor-default"
                          : tierKey === "pro" || tierKey === "ultimate"
                          ? "bg-[#00bfa6] text-[#0f2a2a] hover:bg-[#00a892] shadow-md hover:scale-[1.02]"
                          : "bg-[#0f2a2a] dark:bg-white text-[#d9faf4] dark:text-[#0f2a2a] hover:opacity-90"
                      }`}
                    >
                      {isCurrent ? "Current Plan" : `Select ${plan.name} (${plan.price})`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer Guarantee */}
            <div className="mt-8 pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#00bfa6]" />
                <span>Instant activation • Switch or test between tiers anytime</span>
              </div>
              <button
                onClick={closeUpgradeModal}
                className="text-xs font-bold text-[#00bfa6] hover:underline cursor-pointer"
              >
                Close window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
