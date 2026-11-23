import { useEffect, useCallback, useState } from "react";
import { Lock, Zap, ArrowRight } from "lucide-react";
import { fetchEventsBySource } from "../services/event";
import { useEventStore } from "../store/eventStore";
import { useSubscriptionStore } from "../store/subscriptionStore";
import ImportedEventsTable from "../components/events/ImportedEventsTable";
import AddEventModal from "../components/events/AddEventModal";
import UpgradeModal from "../components/ui/UpgradeModal";
import PlanUsageBadge from "../components/ui/PlanUsageBadge";

export default function EventDashboardPage() {
  const { setManualEvents, setOneDriveEvents } = useEventStore();
  const { canScheduleEvents, openUpgradeModal } = useSubscriptionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isScheduleAllowed = canScheduleEvents();

  const normalizeEvents = (events: any[]) =>
    events.map((event) => ({
      ...event,
      Name: event.name,
      Email: event.email,
      Department: event.department,
      EventType: event.occasion,
      EventDate: event.eventDate,
      photoUrl: event.photoUrl,
      generatedWishImage: event.generatedWishImage,
      generatedWishText: event.generatedWishText,
      generatedAt: event.generatedAt,
      status: event.status,
    }));

  const loadEvents = useCallback(async () => {
    if (!isScheduleAllowed) {
      setIsLoading(false);
      return;
    }
    try {
      const [manual, onedrive] = await Promise.all([
        fetchEventsBySource("excel"),
        fetchEventsBySource("onedrive"),
      ]);
      setManualEvents(normalizeEvents(manual.data));
      setOneDriveEvents(normalizeEvents(onedrive.data));
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setIsLoading(false);
    }
  }, [isScheduleAllowed, setManualEvents, setOneDriveEvents]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleAddClick = () => {
    if (!isScheduleAllowed) {
      openUpgradeModal(
        "Event scheduling is available on Pro ($5) and Ultimate ($12) plans. Free accounts are limited to single-wish creation."
      );
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Events
            </h1>
            <PlanUsageBadge />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            All upcoming and past milestone events across your contacts.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className={`px-5 py-2.5 font-bold text-xs rounded-full shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
            isScheduleAllowed
              ? "bg-[#00bfa6] text-[#0f2a2a] hover:opacity-90 hover:scale-105"
              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#00bfa6]"
          }`}
        >
          {!isScheduleAllowed && <Lock size={13} className="text-[#00bfa6]" />}
          <span>+ Add event</span>
        </button>
      </div>

      {/* Free Plan Locked Feature Banner */}
      {!isScheduleAllowed ? (
        <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 text-[#00bfa6] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(0,191,166,0.25)]">
            <Lock size={30} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
            <span>Pro Plan ($5/mo) Feature</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight mb-2">
            Milestone Scheduling is Locked
          </h2>

          <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-lg mx-auto mb-8 leading-relaxed">
            Your current <span className="font-bold text-[#00bfa6]">Free Plan</span> includes 5 images and 3 videos for single creations. Upgrade to <span className="font-bold text-[#00bfa6]">Pro ($5/mo)</span> to unlock event scheduling, custom milestone tracking, and 100 generations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openUpgradeModal("Upgrade to Pro ($5) to unlock milestone scheduling and 100 generations.")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.55)] transition-all hover:scale-105 cursor-pointer"
            >
              <Zap size={14} />
              <span>Upgrade to Pro Plan ($5/mo)</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>100 Generations (75 Img, 25 Vid)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>Unlimited Event Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00bfa6] font-bold">✓</span>
              <span>Excel Roster Ingestion</span>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-[#00bfa6] rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Loading events...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden scrollbar-slim">
          <ImportedEventsTable />
        </div>
      )}

      {/* Add Event Modal */}
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpgradeModal />
    </div>
  );
}
