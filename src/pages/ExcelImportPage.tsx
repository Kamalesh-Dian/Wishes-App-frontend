import { FileSpreadsheet, ShieldCheck, Clock, ArrowLeft, Lock, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ExcelUploader from "../components/events/ExcelUploader";
import { useSubscriptionStore } from "../store/subscriptionStore";
import UpgradeModal from "../components/ui/UpgradeModal";
import PlanUsageBadge from "../components/ui/PlanUsageBadge";

export default function ExcelImportPage() {
  const { canScheduleEvents, openUpgradeModal } = useSubscriptionStore();
  const isAllowed = canScheduleEvents();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Navigation & Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Events</span>
            </Link>
            <span className="text-[#0f2a2a]/30 dark:text-[#d9faf4]/30">/</span>
            <span className="text-xs font-semibold text-[#00bfa6]">Roster Import</span>
          </div>

          <PlanUsageBadge />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#00bfa6] mb-1">
              <FileSpreadsheet size={13} />
              <span>Bulk Employee Milestone Automation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight">
              Employee Milestone Roster
            </h1>
            <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mt-1 max-w-2xl leading-relaxed">
              Import your organization's milestone roster. Wishes AI synthesizes 4K identity-preserving
              celebration scenes for each employee and schedules delivery for 9:00 AM on their special day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00bfa6]/10 text-[#00bfa6] border border-[#00bfa6]/25">
              <Clock size={11} />
              <span>9:00 AM Dispatch</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00bfa6]/10 text-[#00bfa6] border border-[#00bfa6]/25">
              <ShieldCheck size={11} />
              <span>Biometric Identity Lock</span>
            </span>
          </div>
        </div>
      </div>

      {/* Gated Content */}
      {!isAllowed ? (
        <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 text-[#00bfa6] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(0,191,166,0.25)]">
            <Lock size={30} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
            <span>Pro Plan ($5/mo) Feature</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight mb-2">
            Roster Import is Locked on Free Plan
          </h2>

          <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-lg mx-auto mb-8 leading-relaxed">
            Bulk Excel roster import and milestone scheduling require the <span className="font-bold text-[#00bfa6]">Pro Plan ($5/mo)</span> or <span className="font-bold text-[#00bfa6]">Ultimate Plan ($12/mo)</span>. Upgrade to automate milestone tracking across your entire team.
          </p>

          <button
            onClick={() => openUpgradeModal("Upgrade to Pro ($5) to unlock bulk Excel roster import.")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.55)] transition-all hover:scale-105 cursor-pointer"
          >
            <Zap size={14} />
            <span>Upgrade to Pro Plan ($5/mo)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      ) : (
        <ExcelUploader />
      )}

      <UpgradeModal />
    </div>
  );
}
