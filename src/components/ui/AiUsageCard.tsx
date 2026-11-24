import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Sparkles, Image as ImageIcon, Film, ArrowUpRight, RotateCcw } from "lucide-react";
import { useSubscriptionStore } from "../../store/subscriptionStore";

export type AiUsageTab = "all" | "images" | "videos";

interface AiUsageCardProps {
  className?: string;
}

export default function AiUsageCard({ className = "" }: AiUsageCardProps) {
  const {
    tier,
    usedImages,
    usedVideos,
    openUpgradeModal,
    resetUsage,
    getPlanConfig,
  } = useSubscriptionStore();

  const [activeTab, setActiveTab] = useState<AiUsageTab>("all");
  const plan = getPlanConfig();

  const totalUsed = usedImages + usedVideos;
  const totalLimit = plan.totalGenerations;

  let currentUsage = totalUsed;
  let currentLimit = totalLimit;
  let tabColor = "#00bfa6"; // Teal

  if (activeTab === "images") {
    currentUsage = usedImages;
    currentLimit = plan.imageLimit;
    tabColor = "#3B82F6"; // Blue
  } else if (activeTab === "videos") {
    currentUsage = usedVideos;
    currentLimit = plan.videoLimit;
    tabColor = "#8B5CF6"; // Purple
  }

  const remaining = Math.max(0, currentLimit - currentUsage);
  const percentage = currentLimit > 0 ? Math.min(100, Math.round((currentUsage / currentLimit) * 100)) : 0;

  // Pie chart slices: used slice vs remaining slice
  // When usage is 0, give value 0.0001 so Recharts displays the clean empty background ring
  const usageData = [
    { name: "Used", value: currentUsage > 0 ? currentUsage : 0.0001 },
    { name: "Remaining", value: remaining },
  ];

  return (
    <div className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/60 dark:border-slate-800/80 shadow-sm flex flex-col items-center justify-between text-center transition-colors ${className}`}>
      {/* Header & Tabs */}
      <div className="w-full flex items-start justify-between mb-3 gap-2">
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              AI Usage
            </h3>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#00bfa6]/10 text-[#00bfa6] uppercase">
              {plan.name}
            </span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 font-bold text-base mt-0.5">
            {plan.name} Plan Quota
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/90 rounded-lg p-0.5 border border-slate-200/50 dark:border-slate-700/50">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all flex items-center gap-1 ${
              activeTab === "all"
                ? "bg-white dark:bg-slate-700 text-[#00bfa6] shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Sparkles size={10} />
            <span>All</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all flex items-center gap-1 ${
              activeTab === "images"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <ImageIcon size={10} />
            <span>Img</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all flex items-center gap-1 ${
              activeTab === "videos"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Film size={10} />
            <span>Vid</span>
          </button>
        </div>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative w-36 h-36 my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={usageData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={68}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              <Cell fill={currentUsage > 0 ? tabColor : "transparent"} />
              <Cell fill="var(--color-slate-200, rgba(148, 163, 184, 0.18))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {percentage}%
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
            {currentUsage} / {currentLimit} used
          </span>
          <span className="text-[9px] text-[#00bfa6] font-semibold mt-0.5">
            {remaining} remaining
          </span>
        </div>
      </div>

      {/* Footer Info & Upgrade Action */}
      <div className="w-full flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 gap-2">
        <div className="text-left text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {usedImages} IMG
          </span>
          {" • "}
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {usedVideos} VID
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {totalUsed > 0 && (
            <button
              type="button"
              onClick={resetUsage}
              title="Reset test usage to 0"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
            </button>
          )}

          <button
            type="button"
            onClick={() => openUpgradeModal()}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold rounded-xl transition-all shadow-sm cursor-pointer bg-[#00bfa6] text-[#0f2a2a] hover:opacity-90 hover:scale-105"
          >
            <span>{tier === "ultimate" ? "Manage" : "Upgrade"}</span>
            <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
