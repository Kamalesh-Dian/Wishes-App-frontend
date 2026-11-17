import { Download, Sparkles, ArrowLeft, RefreshCw, CheckCircle2, Share2 } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { toast } from "../../store/toastStore";
import { useNavigate } from "react-router-dom";

export default function GenerateStep() {
  const { generatedImage, occasion, resetWish, prevStep } = useWishStore();
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wishes-ai-${(occasion || "greeting").toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Failed to download image", error);
      toast.error("Failed to download image");
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(generatedImage);
      toast.success("Image URL copied to clipboard!");
    }
  };

  const handleNewWish = () => {
    resetWish();
    navigate("/create");
  };

  if (!generatedImage) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
        <Sparkles size={40} className="text-slate-400 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
          No image generated yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
          Please go back to step 8 (Review & Generate) to synthesize your greeting image first.
        </p>
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Step 8
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 mb-2">
            <CheckCircle2 size={12} /> Render Complete
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Final Greeting</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} /> Back to Edit
          </button>
          <button
            onClick={handleNewWish}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} /> Create Another
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md border border-slate-200/80 dark:border-slate-700 flex items-center justify-center">
          <img
            src={generatedImage}
            alt="Final generated wish"
            className="w-full h-full object-contain bg-slate-950"
          />
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Export & Share</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your customized greeting is ready. You can download the high-resolution file or copy the CDN URL.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Download size={14} /> Download PNG
            </button>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer"
            >
              <Share2 size={14} /> Copy Image Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
