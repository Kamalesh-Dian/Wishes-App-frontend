import { FileSpreadsheet, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ExcelUploader from "../components/events/ExcelUploader";

export default function ExcelImportPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Navigation & Header */}
      <div className="space-y-3">
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

      {/* Main Content */}
      <ExcelUploader />
    </div>
  );
}
