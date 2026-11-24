import { Check, RefreshCw, Download, Edit2, Save, Sparkles, Wand2, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWishStore } from "../../store/wishesStore";
import { generateWish } from "../../services/generateWish";
import { shareWishViaNativeOrWhatsApp } from "../../services/whatsappShare";
import { toast } from "../../store/toastStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import PlanUsageBadge from "../ui/PlanUsageBadge";

const GENERATION_STAGES = [
  { threshold: 25, label: "Analyzing occasion and stylistic requirements..." },
  { threshold: 60, label: "Synthesizing visual art with AI generative model..." },
  { threshold: 85, label: "Enhancing details, lighting, and celebratory textures..." },
  { threshold: 98, label: "Finalizing composition and optimizing image..." },
];

export default function ReviewStep() {
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const {
    resetWish,
    uploadedImage,
    generatedImage,
    setGeneratedImage,
    generatedVideo,
    setGeneratedVideo,
    occasion,
    theme,
    people,
    decorations,
    customMessage,
    setCustomMessage,
    animationEnabled,
    aiEngine,
    additionalInformation,
  } = useWishStore();

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const currentStageLabel = () => {
    for (const stage of GENERATION_STAGES) {
      if (progress <= stage.threshold) return stage.label;
    }
    return "Wrapping up render...";
  };

  const handleGenerate = async () => {
    const { canGenerateImage, openUpgradeModal, getPlanConfig, usedImages, recordImageGeneration } = useSubscriptionStore.getState();
    if (!canGenerateImage()) {
      const plan = getPlanConfig();
      openUpgradeModal(
        `Image generation limit reached for your ${plan.name} Plan (${usedImages}/${plan.imageLimit} images used). Upgrade to Pro ($5) for 75 images or Ultimate ($12) for 150 images.`
      );
      return;
    }

    setIsGenerating(true);
    setProgress(5);

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const increment = prev < 50 ? 5 : prev < 80 ? 3 : 1;
        return Math.min(95, prev + increment);
      });
    }, 400);

    try {
      const trimmedMessage = customMessage.trim();
      const payload = {
        occasion,
        theme,
        people,
        decorations,
        customMessage: trimmedMessage,
        animationEnabled,
        aiEngine,
        uploadedImage,
        additionalInformation,
      };

      const response = await generateWish(payload);

      if (response.success && response.imageURL) {
        recordImageGeneration();
        setProgress(100);
        setGeneratedImage(response.imageURL);
        if (response.videoURL) {
          setGeneratedVideo(response.videoURL);
          toast.success("Celebration image & motion video synthesized successfully!");
        } else {
          toast.success("Wish image generated successfully!");
        }
      } else {
        toast.error(response.error || "Failed to generate wish.");
      }
    } catch (error: unknown) {
      console.error(error);
      const errMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error;
      toast.error(errMessage || "An error occurred while generating the image.");
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setIsGenerating(false);
    }
  };

  const handleApprove = () => {
    toast.success("Wish generated and approved!");
    resetWish();
    navigate("/dashboard");
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wishes-ai-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded");
    } catch (error) {
      console.error("Failed to download image", error);
      toast.error("Failed to download image");
    }
  };

  const hasCustomPrompt = customMessage.trim().length > 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Review & generate</h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">
        Review details and prompt your AI engine to synthesize the final design.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/5 aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700/80 overflow-hidden flex items-center justify-center relative">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center p-8 text-center w-full max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 shadow-sm border border-teal-200/50 dark:border-teal-800/50">
                <Wand2 size={24} className="animate-pulse" />
              </div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100 tracking-wide mb-1">
                Synthesizing greeting art
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 min-h-[1.5rem] transition-all">
                {currentStageLabel()}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-teal-500 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-400 mt-2">
                {progress}% completed
              </span>
            </div>
          ) : generatedVideo ? (
            <video
              src={generatedVideo}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : generatedImage ? (
            <img src={generatedImage} alt="Generated wish" className="w-full h-full object-cover" />
          ) : uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded reference"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="text-center p-6 text-slate-400 dark:text-slate-500">
              <p className="text-sm font-medium">No reference image provided</p>
              <p className="text-xs mt-1">Wishes AI will design entirely from scratch.</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Custom Prompt / Greeting Text
            </p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Save size={12} /> Save
                </>
              ) : (
                <>
                  <Edit2 size={12} /> Edit
                </>
              )}
            </button>
          </div>

          {isEditing ? (
            <textarea
              placeholder="Write a custom greeting message or scene prompt (optional)..."
              className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-sm mb-6 w-full h-32 resize-none transition-colors"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm mb-6 cursor-pointer hover:border-teal-500/40 transition-colors min-h-[4.5rem] flex items-center"
            >
              {hasCustomPrompt ? (
                <p className="text-slate-700 dark:text-slate-200">{customMessage.trim()}</p>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                  No custom prompt added. Click Edit to add a custom greeting or instructions.
                </p>
              )}
            </div>
          )}

          {/* Subscription Credits Bar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Plan Credits:
            </span>
            <PlanUsageBadge />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!generatedImage ? (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-4 py-2.5 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer ${
                  isGenerating
                    ? "bg-slate-400 dark:bg-slate-700 cursor-not-allowed"
                    : "bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900"
                }`}
              >
                <Sparkles size={14} strokeWidth={2.5} />{" "}
                {isGenerating
                  ? animationEnabled
                    ? "Synthesizing Video..."
                    : "Synthesizing..."
                  : animationEnabled
                  ? "Generate Wish & Video"
                  : "Generate Image"}
              </button>
            ) : (
              <>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <Check size={14} strokeWidth={3} /> Approve & Save
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} /> Regenerate
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <Download size={14} /> Download
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!generatedImage) return;
                    shareWishViaNativeOrWhatsApp({
                      occasion: occasion || "Celebration",
                      customMessage,
                      mediaUrl: generatedImage,
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <button
                  onClick={() => {
                    resetWish();
                    navigate("/create");
                    toast.success("Ready to create a new wish from Step 1!");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#00bfa6] hover:bg-[#00a892] text-[#0f2a2a] text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Start Over (Step 1)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
