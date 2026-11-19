import { useState } from "react";
import { Download, Sparkles, ArrowLeft, RotateCcw, CheckCircle2, Share2, PlusCircle } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { toast } from "../../store/toastStore";

export default function GenerateStep() {
  const { generatedImage, occasion, resetWish, prevStep } = useWishStore();
  const [downloaded, setDownloaded] = useState(false);

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
      setDownloaded(true);
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

  const handleStartFromStep1 = () => {
    resetWish();
    toast.success("Starting fresh from Step 1!");
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950/40 text-[#00bfa6] mb-2">
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
          
          {/* Go to Step 1 Button */}
          <button
            onClick={handleStartFromStep1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold hover:bg-[#00a892] shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw size={13} /> Go to Step 1
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
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Export & Next Actions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your customized greeting is ready. Download your high-resolution file, then start creating your next celebration from Step 1.
          </p>

          <div className="space-y-2.5 pt-2">
            {/* Download PNG Button */}
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Download size={14} /> Download PNG
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Share2 size={14} /> Copy Image Link
            </button>

            <hr className="border-slate-200 dark:border-slate-700 my-1" />

            {/* Prominent Go to Step 1 Button */}
            <button
              onClick={handleStartFromStep1}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00bfa6] hover:bg-[#00a892] text-[#0f2a2a] text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <PlusCircle size={15} /> Create from Step 1 (Start Over)
            </button>
          </div>

          {downloaded && (
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-[#00bfa6]/30 text-center animate-in fade-in duration-300">
              <span className="text-[11px] font-semibold text-[#00bfa6] block">
                ✓ Download complete!
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Click "Create from Step 1" above to design your next scene.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
