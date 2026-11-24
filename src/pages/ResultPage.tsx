import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Download, Sparkles, RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";
import { useWishStore } from "../store/wishesStore";
import { synthesizeCelebrationVideo, synthesizeCelebrationVideoLocal, type GeneratedVideoResult } from "../services/videoGenerator";
import { toast } from "../store/toastStore";

export default function ResultPage() {
  const navigate = useNavigate();
  const { generatedImage, occasion, theme, customMessage, resetWish } = useWishStore();
  const [videoResult, setVideoResult] = useState<GeneratedVideoResult | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [activeEngine, setActiveEngine] = useState<"gemini" | "svd" | null>(null);
  const [showFallbackOption, setShowFallbackOption] = useState(false);

  useEffect(() => {
    const handleBack = () => {
      resetWish();
      navigate("/history", {
        replace: true,
      });
    };

    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate, resetWish]);

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
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download image");
    }
  };

  const handleDownloadVideo = () => {
    if (!videoResult) return;
    const a = document.createElement("a");
    a.href = videoResult.url;
    a.download = videoResult.filename || `wish-video-${Date.now()}.mp4`;
    a.click();
    toast.success("Video downloaded successfully!");
  };

  const handleGenerateVideo = async (engine: "video-model" | "svd") => {
    if (!generatedImage || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setActiveEngine(engine === "svd" ? "svd" : "gemini");

    try {
      toast.info(
        engine === "svd"
          ? "Generating 3-4s video diffusion with ComfyUI SVD XT..."
          : "Synthesizing 8s cinematic celebration video with Gemini Omni..."
      );

      const res = await synthesizeCelebrationVideo({
        imageUrl: generatedImage,
        occasion: occasion || "Celebration",
        theme: theme || "",
        customMessage: customMessage || "",
        durationMs: engine === "svd" ? 4000 : 8000,
        aiEngine: engine,
      });

      setVideoResult(res);
      toast.success(
        engine === "svd"
          ? "SVD celebration video ready!"
          : "Gemini Omni 8s video ready!"
      );
    } catch (err) {
      console.error(err);
      setShowFallbackOption(true);
      toast.error(
        "AI video generation failed. You can choose to make a simple animated card instead."
      );
    } finally {
      setIsGeneratingVideo(false);
      setActiveEngine(null);
    }
  };

  const handleCreateAnimatedCard = async () => {
    if (!generatedImage || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    try {
      toast.info("Generating simple animated card...");
      const res = await synthesizeCelebrationVideoLocal({
        imageUrl: generatedImage,
        occasion: occasion || "Celebration",
        theme: theme || "",
        customMessage: customMessage || "",
        durationMs: 5000,
      });
      setVideoResult({ ...res, tier: "animated-card", model: "Animated card (AI video unavailable)" });
      setShowFallbackOption(false);
      toast.success("Animated card created successfully!");
    } catch (err) {
      toast.error("Failed to create animated card");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-20 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00bfa6] mb-2">
            <Sparkles size={14} /> AI Generation Complete
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Celebration Wish
          </h1>
        </div>

        <button
          onClick={() => {
            resetWish();
            navigate("/create");
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer w-fit self-center sm:self-auto"
        >
          <ArrowLeft size={16} /> Create Another Wish
        </button>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="mb-8 flex flex-wrap justify-center sm:justify-start items-center gap-3">
        {/* Download Image Button */}
        <button
          onClick={() => generatedImage && handleDownload(generatedImage)}
          disabled={!generatedImage}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-600/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Download size={16} /> Download Wish Image
        </button>

        {/* Animate with Gemini Omni */}
        <button
          onClick={() => handleGenerateVideo("video-model")}
          disabled={!generatedImage || isGeneratingVideo}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 ${
            activeEngine === "gemini"
              ? "bg-[#00bfa6]/20 border-[#00bfa6] text-[#00bfa6]"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#00bfa6]"
          }`}
          title="Synthesize 8-second cinematic video using Gemini Omni (scene prompt & facial likeness)"
        >
          {isGeneratingVideo && activeEngine === "gemini" ? (
            <RefreshCw size={16} className="animate-spin text-[#00bfa6]" />
          ) : (
            <Film size={16} className="text-[#00bfa6]" />
          )}
          <span>
            {isGeneratingVideo && activeEngine === "gemini"
              ? "Rendering Gemini (8s)..."
              : "Animate (Gemini Omni 8s)"}
          </span>
        </button>

        {/* Animate with ComfyUI SVD XT */}
        <button
          onClick={() => handleGenerateVideo("svd")}
          disabled={!generatedImage || isGeneratingVideo}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 ${
            activeEngine === "svd"
              ? "bg-[#00bfa6]/20 border-[#00bfa6] text-[#00bfa6]"
              : "border-[#00bfa6]/40 bg-[#00bfa6]/10 text-[#008f7d] dark:text-[#2dd4bf] hover:bg-[#00bfa6]/20"
          }`}
          title="Direct image-to-video diffusion using ComfyUI SVD XT 1.1 (~3-4s video motion)"
        >
          {isGeneratingVideo && activeEngine === "svd" ? (
            <RefreshCw size={16} className="animate-spin text-[#00bfa6]" />
          ) : (
            <Sparkles size={16} className="text-[#00bfa6]" />
          )}
          <span>
            {isGeneratingVideo && activeEngine === "svd"
              ? "Diffusing SVD (4s)..."
              : "Animate (ComfyUI SVD 4s)"}
          </span>
        </button>

        {videoResult && (
          <button
            onClick={handleDownloadVideo}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md transition-colors cursor-pointer"
          >
            <Download size={16} /> Download Video (.mp4)
          </button>
        )}
      </div>

      {/* Media Display Area: Video & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Generated Image */}
        {generatedImage && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-[32px] shadow-xl max-w-full text-center">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Generated Master Artwork
            </div>
            <img
              src={generatedImage}
              alt="Generated Greeting Card"
              className="max-h-[70vh] max-w-full mx-auto object-contain rounded-2xl shadow-xs"
            />
          </div>
        )}

        {/* Video Player (If generated) or Video Prompt Banner */}
        {videoResult ? (
          <div className="bg-white dark:bg-slate-900 border border-teal-500/40 p-4 rounded-[32px] shadow-xl max-w-full text-center">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00bfa6] flex items-center gap-1.5">
                <Film size={14} />{" "}
                {videoResult.tier === "animated-card"
                  ? "Animated card (AI video unavailable)"
                  : videoResult.model || "Celebration Video"}
              </span>
              <button
                onClick={handleDownloadVideo}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download size={12} /> Save MP4
              </button>
            </div>
            <video
              src={videoResult.url}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[70vh] max-w-full mx-auto object-contain rounded-2xl shadow-xs bg-black"
            />
          </div>
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center p-12 rounded-[32px] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[#00bfa6]/10 flex items-center justify-center text-[#00bfa6] mb-4">
              <Film size={28} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
              Transform into a Motion Celebration
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              Animate your portrait and festive scene using <strong>Gemini Omni (8s)</strong> or direct <strong>ComfyUI SVD Diffusion (4s)</strong>.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleGenerateVideo("video-model")}
                disabled={isGeneratingVideo}
                className="px-4 py-2 rounded-lg bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-xs hover:bg-[#00d5b9] transition-all cursor-pointer"
              >
                Try Gemini Omni (8s)
              </button>
              <button
                onClick={() => handleGenerateVideo("svd")}
                disabled={isGeneratingVideo}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
              >
                Try SVD (4s)
              </button>
            </div>
            {showFallbackOption && (
              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex flex-col items-center gap-2 max-w-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-500 shrink-0" />
                  <span>AI video generation model is currently unavailable.</span>
                </div>
                <button
                  onClick={handleCreateAnimatedCard}
                  className="mt-1 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
                >
                  Make a simple animated card instead
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
