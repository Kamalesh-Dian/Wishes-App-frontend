import { useEffect, useState } from "react";
import { Search, Heart, Download, X, Sparkles, Plus, Trash2 } from "lucide-react";
import { useHistoryStore } from "../store/historyStore";
import { deleteWish } from "../services/history";
import { toast } from "../store/toastStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Wish {
  _id: string;
  occasion: string;
  theme: string;
  generatedImage: string;
  createdAt: string;
  aiProvider?: string;
}

export default function HistoryPage() {
  const { history, fetchHistory, removeWishFromHistory, loading } = useHistoryStore();
  const navigate = useNavigate();
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"generated" | "sent">("generated");

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wish-${Date.now()}.jpg`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Image downloaded!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download image");
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (deletingId) return;

    setDeletingId(id);
    try {
      await deleteWish(id);
      removeWishFromHistory(id);
      if (selectedWish?._id === id) {
        setSelectedWish(null);
      }
      toast.success("Wish deleted from history");
    } catch (error) {
      console.error("Failed to delete wish:", error);
      toast.error("Failed to delete wish");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredHistory = history.filter((item) => {
    if (activeTab === "sent") return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.occasion?.toLowerCase().includes(q) ||
      item.theme?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sent Wishes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 md:mt-2 text-xs md:text-sm font-medium">
            Your complete gallery of AI-generated masterpieces.
          </p>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("generated")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === "generated"
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          Generated Images
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === "sent"
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          Sent Wishes
        </button>
      </div>

      {/* Masonry Grid, Loading State, or Empty State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading your history...
          </p>
        </div>
      ) : (
        <div
          className={
            filteredHistory.length === 0
              ? ""
              : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          }
        >
          {filteredHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg mx-auto mt-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-white/60 dark:border-slate-800 shadow-sm text-center"
            >
              <div className="w-20 h-20 mx-auto bg-teal-50 dark:bg-teal-500/10 text-teal-500 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                No magic created yet
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Your generated wishes, images, and sent emails will appear here. Start creating
                beautiful, AI-powered wishes for your team today.
              </p>

              <button
                onClick={() => navigate("/create")}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-sm cursor-pointer"
              >
                <Plus size={16} /> Create your first wish
              </button>
            </motion.div>
          ) : (
            filteredHistory.map((item, i) => {
              const heights = ["h-48", "h-64", "h-80"];
              const hClass = heights[i % heights.length];
              const isDeleting = deletingId === item._id;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedWish(item)}
                  className={`w-full ${hClass} rounded-2xl overflow-hidden relative group cursor-pointer break-inside-avoid shadow-sm border border-slate-200/60 dark:border-slate-800`}
                >
                  <img
                    src={item.generatedImage}
                    alt={item.occasion}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.classList.add(
                        "bg-gradient-to-br",
                        "from-blue-500",
                        "to-purple-600"
                      );
                    }}
                  />

                  {/* Quick Delete Button on Card */}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item._id, e)}
                    disabled={isDeleting}
                    aria-label={`Delete ${item.occasion} wish`}
                    title="Delete wish"
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 backdrop-blur-md shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <div>
                      <h3 className="text-white font-bold text-sm">{item.occasion}</h3>
                      <p className="text-white/80 text-[10px] font-semibold mt-0.5">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal */}
      {selectedWish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedWish(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-slate-100 dark:bg-slate-800 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Generation preview
              </h3>
              <button
                onClick={() => setSelectedWish(null)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
              <img
                src={selectedWish.generatedImage}
                alt={selectedWish.occasion}
                className="w-full max-h-[60vh] object-contain rounded-2xl shadow-sm"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Generated{" "}
                {new Date(selectedWish.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                · {selectedWish.aiProvider || "Gemini"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedWish._id)}
                  disabled={deletingId === selectedWish._id}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 text-[11px] font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  <span>{deletingId === selectedWish._id ? "Deleting..." : "Delete"}</span>
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-full transition-colors cursor-pointer">
                  <Heart size={14} /> Save
                </button>
                <button
                  onClick={() => handleDownload(selectedWish.generatedImage)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-bold rounded-full transition-colors shadow-sm shadow-teal-500/20 cursor-pointer"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
