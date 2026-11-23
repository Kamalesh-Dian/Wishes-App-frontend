import { useState, useEffect } from "react";
import {
  Download,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  PlusCircle,
  Film,
  MessageCircle,
  Send,
  Mail,
  Image as ImageIcon,
} from "lucide-react";
import api from "../../services/api";
import { useWishStore } from "../../store/wishesStore";
import { toast } from "../../store/toastStore";
import {
  synthesizeCelebrationVideo,
  type VideoMotionStyle,
  type GeneratedVideoResult,
} from "../../services/videoGenerator";
import {
  openWhatsAppDirect,
  shareWishViaNativeOrWhatsApp,
} from "../../services/whatsappShare";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import UpgradeModal from "../ui/UpgradeModal";
import PlanUsageBadge from "../ui/PlanUsageBadge";

export default function GenerateStep() {
  const {
    generatedImage,
    occasion,
    theme,
    customMessage,
    animationEnabled,
    additionalInformation,
    resetWish,
    prevStep,
  } = useWishStore();

  const [downloaded, setDownloaded] = useState(false);
  const [viewMode, setViewMode] = useState<"image" | "video">("image");
  const [videoStyle, setVideoStyle] = useState<VideoMotionStyle>(() => {
    if (additionalInformation.includes("confetti-party")) return "confetti-party";
    if (additionalInformation.includes("diya-lanterns")) return "diya-lanterns";
    return "cinematic-bokeh";
  });
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] =
    useState<GeneratedVideoResult | null>(null);

  // WhatsApp composer state
  const [showWhatsAppBox, setShowWhatsAppBox] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");

  // Email composer state
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState("kamaleshe76@gmail.com");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleSendEmail = async () => {
    if (!emailRecipient.trim()) {
      toast.error("Please enter a recipient email address");
      return;
    }

    try {
      setIsSendingEmail(true);

      let videoBase64: string | undefined = undefined;
      if (generatedVideo?.blob) {
        videoBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(generatedVideo.blob);
        });
      }

      const res = await api.post("/generate/send-email", {
        to: emailRecipient.trim(),
        name: recipientName.trim() || undefined,
        occasion: occasion || "Celebration",
        customMessage,
        imageUrl: generatedImage,
        videoBase64,
      });

      if (res.data?.success) {
        toast.success(`Celebration wish & video sent to ${emailRecipient.trim()}!`);
        setShowEmailBox(false);
      } else {
        toast.error(res.data?.error || "Failed to send email");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to dispatch email. Please verify SMTP or email address.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  useEffect(() => {
    return () => {
      if (generatedVideo?.url) {
        URL.revokeObjectURL(generatedVideo.url);
      }
    };
  }, [generatedVideo]);

  const handleDownloadImage = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wishes-ai-${(occasion || "greeting")
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}.png`;
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

  const handleSynthesizeVideo = async () => {
    if (!generatedImage || isGeneratingVideo) return;

    const { canGenerateVideo, openUpgradeModal, getPlanConfig, usedVideos, recordVideoGeneration } = useSubscriptionStore.getState();
    if (!canGenerateVideo()) {
      const plan = getPlanConfig();
      openUpgradeModal(
        `Video generation limit reached for your ${plan.name} Plan (${usedVideos}/${plan.videoLimit} videos used). Upgrade to Pro ($5) for 25 videos or Ultimate ($12) for 50 videos.`
      );
      return;
    }

    setIsGeneratingVideo(true);
    setVideoProgress(5);
    try {
      const result = await synthesizeCelebrationVideo({
        imageUrl: generatedImage,
        occasion: occasion || "Celebration",
        theme,
        customMessage,
        style: videoStyle,
        onProgress: (p) => setVideoProgress(p),
      });
      if (generatedVideo?.url) {
        URL.revokeObjectURL(generatedVideo.url);
      }
      setGeneratedVideo(result);
      recordVideoGeneration();
      setViewMode("video");
      toast.success("Animated celebration video generated!");
    } catch (error) {
      console.error("Video synthesis error:", error);
      toast.error("Failed to generate animated video");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!generatedVideo) return;
    const a = document.createElement("a");
    a.href = generatedVideo.url;
    a.download = generatedVideo.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    toast.success("Celebration video downloaded!");
  };

  const handleShareLink = async () => {
    if (!generatedImage) return;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(generatedImage);
      toast.success("Image URL copied to clipboard!");
    }
  };

  const handleWhatsAppSend = async (useDirectNumber: boolean) => {
    if (!generatedImage) return;
    if (useDirectNumber) {
      if (!whatsappPhone.trim()) {
        toast.error("Please enter a WhatsApp phone number (with country code).");
        return;
      }
      openWhatsAppDirect({
        phone: whatsappPhone,
        recipientName: recipientName.trim() || undefined,
        occasion: occasion || "Celebration",
        customMessage,
        mediaUrl: generatedImage,
      });
      toast.success("Opening WhatsApp chat...");
    } else {
      await shareWishViaNativeOrWhatsApp({
        recipientName: recipientName.trim() || undefined,
        occasion: occasion || "Celebration",
        customMessage,
        mediaUrl: generatedImage,
        mediaBlob:
          viewMode === "video" && generatedVideo ? generatedVideo.blob : undefined,
        mediaFilename:
          viewMode === "video" && generatedVideo
            ? generatedVideo.filename
            : undefined,
      });
      toast.success("Sharing wish to WhatsApp...");
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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950/40 text-[#00bfa6] mb-2">
            <CheckCircle2 size={12} /> Render Complete
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Your Final Celebration KeepSake
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle: Image vs Video */}
          {generatedVideo && (
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-2">
              <button
                type="button"
                onClick={() => setViewMode("image")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === "image"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <ImageIcon size={13} /> Image
              </button>
              <button
                type="button"
                onClick={() => setViewMode("video")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === "video"
                    ? "bg-[#00bfa6] text-[#0f2a2a] shadow-sm"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Film size={13} /> Video
              </button>
            </div>
          )}

          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} /> Back to Edit
          </button>

          <button
            onClick={handleStartFromStep1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold hover:bg-[#00a892] shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw size={13} /> Go to Step 1
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Preview Stage (Image or Synthesized Video) */}
        <div className="lg:col-span-7 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-200/80 dark:border-slate-700 flex items-center justify-center relative">
          {isGeneratingVideo ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-white max-w-sm">
              <Film size={36} className="text-[#00bfa6] animate-bounce mb-3" />
              <p className="font-bold text-sm mb-1">
                Synthesizing Animated Celebration Video...
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Rendering 30fps Ken Burns motion, festive bokeh, and greeting overlay
              </p>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#00bfa6] h-2 rounded-full transition-all duration-200"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-[#00bfa6] mt-2">
                {videoProgress}%
              </span>
            </div>
          ) : viewMode === "video" && generatedVideo ? (
            <video
              key={generatedVideo.url}
              src={generatedVideo.url}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain bg-slate-950"
            />
          ) : (
            <img
              src={generatedImage}
              alt="Final generated wish"
              className="w-full h-full object-contain bg-slate-950"
            />
          )}
        </div>

        {/* Right Action Column: Video Generator, WhatsApp Dispatch & Downloads */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700/80 space-y-5">
          {/* 1. Video Generation Studio Box */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Film size={15} className="text-[#00bfa6]" />
                Celebration Video Generator
              </span>
              {animationEnabled && (
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00bfa6]/15 text-[#00bfa6]">
                  MOTION READY
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "cinematic-bokeh", label: "Bokeh Zoom" },
                { id: "confetti-party", label: "Confetti" },
                { id: "diya-lanterns", label: "Lanterns" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setVideoStyle(s.id as VideoMotionStyle)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    videoStyle === s.id
                      ? "border-[#00bfa6] bg-[#00bfa6]/15 text-teal-900 dark:text-[#00bfa6]"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSynthesizeVideo}
                disabled={isGeneratingVideo}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#00bfa6] hover:bg-[#00a892] text-[#0f2a2a] text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Film size={14} />
                <span>
                  {isGeneratingVideo
                    ? `Rendering ${videoProgress}%...`
                    : generatedVideo
                      ? "Re-Render Video"
                      : "Generate Video"}
                </span>
              </button>

              {generatedVideo && (
                <button
                  type="button"
                  onClick={handleDownloadVideo}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Download size={13} /> Video
                </button>
              )}
            </div>
          </div>

          {/* 2. WhatsApp Wish Sending Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <MessageCircle size={15} className="text-emerald-600 dark:text-emerald-400" />
                Send Wish on WhatsApp
              </span>
              <button
                type="button"
                onClick={() => setShowWhatsAppBox(!showWhatsAppBox)}
                className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 underline cursor-pointer"
              >
                {showWhatsAppBox ? "Hide Number" : "Send to Number"}
              </button>
            </div>

            {showWhatsAppBox && (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient Name (e.g. Maya)"
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="Phone with country code (e.g. +919876543210)"
                    className="flex-1 px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleWhatsAppSend(true)}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Send size={12} /> Send
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => handleWhatsAppSend(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Share Wish via WhatsApp</span>
            </button>
          </div>

          {/* 3. Email Wish Card & Video */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                <Mail size={16} />
                <span>Send to Email</span>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailBox(!showEmailBox)}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {showEmailBox ? "Hide" : "Compose"}
              </button>
            </div>

            {showEmailBox && (
              <div className="space-y-2 pt-1">
                <input
                  type="email"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  disabled={isSendingEmail}
                  onClick={handleSendEmail}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  <Send size={12} />
                  <span>{isSendingEmail ? "Dispatching Email..." : "Send Celebration & Video"}</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Standard Export & Reset Actions */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadImage}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Download size={14} /> Download PNG
              </button>

              <button
                onClick={handleShareLink}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Share2 size={14} /> Copy Link
              </button>
            </div>

            <button
              onClick={handleStartFromStep1}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00bfa6] hover:bg-[#00a892] text-[#0f2a2a] text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <PlusCircle size={15} /> Create from Step 1 (Start Over)
            </button>
          </div>

          {/* Subscription Credits Bar */}
          <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Plan Usage:</span>
            <PlanUsageBadge />
          </div>

          {downloaded && (
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-[#00bfa6]/30 text-center">
              <span className="text-[11px] font-semibold text-[#00bfa6] block">
                ✓ Media saved! Click &ldquo;Create from Step 1&rdquo; to design another.
              </span>
            </div>
          )}
        </div>
      </div>
      <UpgradeModal />
    </div>
  );
}
