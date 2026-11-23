import { Lock, Users, ArrowRight } from "lucide-react";
import OneDriveSync from "../components/events/oneDriveSync";
import { useSubscriptionStore } from "../store/subscriptionStore";
import UpgradeModal from "../components/ui/UpgradeModal";
import PlanUsageBadge from "../components/ui/PlanUsageBadge";

export default function OneDrivePage() {
  const { canConnectOneDrive, openUpgradeModal, tier } = useSubscriptionStore();
  const isAllowed = canConnectOneDrive();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              OneDrive Cloud Sync
            </h1>
            <PlanUsageBadge />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Sync employee roster files directly from your Microsoft cloud for 24/7 celebration automation.
          </p>
        </div>
      </div>

      {/* Gated Content */}
      {!isAllowed ? (
        <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(168,85,247,0.25)]">
            <Lock size={30} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
            <span>Ultimate Plan ($12/mo) Feature</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight mb-2">
            OneDrive Cloud Sync is Restricted
          </h2>

          <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-lg mx-auto mb-8 leading-relaxed">
            Your current plan (<span className="font-bold uppercase text-[#00bfa6]">{tier}</span>) does not include automated cloud integration. Upgrade to the <span className="font-bold text-[#00bfa6]">Ultimate Plan ($12/mo)</span> to unlock 200 generations (150 images, 50 videos) and 24/7 hands-off OneDrive synchronization.
          </p>

          <button
            onClick={() =>
              openUpgradeModal(
                "OneDrive integration is exclusive to the Ultimate Plan ($12). Upgrade to unlock automated Microsoft 365 cloud sync."
              )
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.55)] transition-all hover:scale-105 cursor-pointer"
          >
            <Users size={14} />
            <span>Upgrade to Ultimate Plan ($12/mo)</span>
            <ArrowRight size={13} />
          </button>

          <div className="mt-8 pt-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>200 Generations (150 Img, 50 Vid)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>24/7 OneDrive Auto-Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>Local 9:00 AM Automated Dispatch</span>
            </div>
          </div>
        </div>
      ) : (
        <OneDriveSync />
      )}

      <UpgradeModal />
    </div>
  );
}
