import { useEventStore } from "../../store/eventStore";
import { useWishStore } from "../../store/wishesStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import { Sparkles, Cpu, Film, ImageIcon, Check } from "lucide-react";
import PlanUsageBadge from "../ui/PlanUsageBadge";

export default function EngineStep() {
  const { selectedEvent } = useEventStore();
  const {
    aiEngine,
    setAIEngine,
    videoModel,
    setVideoModel,
    animationEnabled,
    setAnimation,
  } = useWishStore();

  const { canGenerateVideo, openUpgradeModal, getPlanConfig } = useSubscriptionStore();
  const plan = getPlanConfig();

  const targetName = selectedEvent?.Name || "your contact";
  const targetEvent = selectedEvent?.EventType?.toLowerCase() || "special occasion";

  const handleToggleOutputMode = (enableVideo: boolean) => {
    if (enableVideo && !canGenerateVideo()) {
      openUpgradeModal(
        `Video generation limit reached (${plan.videoLimit}/${plan.videoLimit} on ${plan.name} Plan). Upgrade to Pro ($5) for 10 videos or Ultimate ($12) for 25 videos.`
      );
      return;
    }
    setAnimation(enableVideo);
    if (enableVideo) {
      if (!videoModel) setVideoModel("gemini-omni");
    } else {
      if (!aiEngine) setAIEngine("gemini");
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header & Format Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00bfa6] mb-1">
            {animationEnabled ? <Film size={13} /> : <ImageIcon size={13} />}
            Step 7 • {animationEnabled ? "AI Video Model" : "AI Image Model"}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {animationEnabled ? "Choose a Video Creation Model" : "Choose an Image Generation Model"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {animationEnabled
              ? "Select the AI video diffusion model to animate your celebration portrait into motion."
              : "Select the neural diffusion model to synthesize your celebration scene."}
          </p>
        </div>

        {/* Video vs Still Image Output Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <PlanUsageBadge />
          <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              type="button"
              onClick={() => handleToggleOutputMode(false)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !animationEnabled
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ImageIcon size={13} />
              <span>Still Image</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleOutputMode(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                animationEnabled
                  ? "bg-[#00bfa6] text-[#0f2a2a] shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Film size={13} />
              <span>Motion Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          DYNAMIC MODEL CARDS: VIDEO MODELS vs IMAGE MODELS
         ========================================================= */}
      {animationEnabled ? (
        /* ---------------- VIDEO CREATION MODELS ---------------- */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Video Models
            </p>
            <span className="text-[11px] font-mono font-semibold text-[#00bfa6] bg-[#00bfa6]/10 px-2.5 py-0.5 rounded-full">
              Video Creation Enabled
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Option 1: Google Gemini Omni 1.2 Flash */}
            <div
              onClick={() => {
                setAnimation(true);
                setVideoModel("gemini-omni");
                setAIEngine("gemini-omni");
              }}
              className={`border-2 rounded-2xl p-6 cursor-pointer shadow-sm relative overflow-hidden transition-all ${
                videoModel === "gemini-omni" || aiEngine === "gemini-omni"
                  ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md ring-2 ring-[#00bfa6]/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00bfa6]/15 flex items-center justify-center text-[#00bfa6]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm ${
                        videoModel === "gemini-omni" || aiEngine === "gemini-omni"
                          ? "text-teal-900 dark:text-white"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      Gemini Omni 1.2 Flash
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">Google Multimodal Interactions</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#00bfa6] uppercase tracking-widest bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-200/50 dark:border-teal-800/50">
                  RECOMMENDED • 8 SEC
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Native multimodal image-to-video generation with 3D camera pan, scene lighting, depth parallax, and genuine facial likeness retention.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-[#00bfa6]">
                  <Check size={11} /> Full Prompt Awareness
                </span>
                <span className="flex items-center gap-1 text-[#00bfa6]">
                  <Check size={11} /> 8s MP4 Output
                </span>
              </div>
            </div>

            {/* Option 2: Stable Video Diffusion (SVD XT 1.1) */}
            <div
              onClick={() => {
                setAnimation(true);
                setVideoModel("svd");
                setAIEngine("svd");
              }}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-sm relative overflow-hidden ${
                videoModel === "svd" || aiEngine === "svd"
                  ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md ring-2 ring-[#00bfa6]/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Film size={16} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm ${
                        videoModel === "svd" || aiEngine === "svd"
                          ? "text-teal-900 dark:text-white"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      Stable Video Diffusion (SVD XT 1.1)
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">ComfyUI GPU Video Diffusion</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-200/50 dark:border-teal-800/50">
                  COMFYUI GPU • 4–8 SEC
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Generates smooth video motion directly from your synthesized celebration portrait without prompt distortion or hallucination.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-[#00bfa6]">
                  <Check size={11} /> 100% Image Geometry Match
                </span>
                <span className="flex items-center gap-1 text-[#00bfa6]">
                  <Check size={11} /> 4–8s Smooth MP4
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ---------------- IMAGE GENERATION MODELS ---------------- */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Image Models
            </p>
            <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              Still Image Mode
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Gemini Option */}
            <div
              onClick={() => setAIEngine("gemini")}
              className={`border-2 rounded-2xl p-6 cursor-pointer shadow-sm relative overflow-hidden transition-all ${
                aiEngine === "gemini"
                  ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md ring-2 ring-[#00bfa6]/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#00bfa6]" />
                  <h3
                    className={`font-bold text-sm ${
                      aiEngine === "gemini"
                        ? "text-teal-900 dark:text-white"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    Google Gemini
                  </h3>
                </div>
                <span className="text-[9px] font-bold text-[#00bfa6] uppercase tracking-widest bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-200/50 dark:border-teal-800/50">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Ultra-realistic facial likeness, ray-traced lighting, and legible typography rendering for festive portrait keepsakes.
              </p>
            </div>

            {/* FLUX Option */}
            <div
              onClick={() => setAIEngine("flux")}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-sm relative overflow-hidden ${
                aiEngine === "flux"
                  ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md ring-2 ring-[#00bfa6]/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-[#00bfa6]" />
                  <h3
                    className={`font-bold text-sm ${
                      aiEngine === "flux"
                        ? "text-teal-900 dark:text-white"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    FLUX.2 Klein / Dev
                  </h3>
                </div>
                <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  COMFYUI DIFFUSION
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Black Forest Labs FLUX neural diffusion for context-aware portrait editing and festive scene transformation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Output & Prompt Preview */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          {animationEnabled ? "Motion Synthesis Preview" : "Image Synthesis Preview"}
        </p>
        <div className="bg-slate-100 dark:bg-slate-800/80 rounded-xl p-4 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
          {animationEnabled ? (
            <div>
              <span>Generate a warm, cinematic {targetEvent} celebration video for </span>
              <span className="text-[#00bfa6] font-bold">{targetName}</span>
              <span> using </span>
              <strong className="text-slate-900 dark:text-white">
                {videoModel === "svd" || aiEngine === "svd"
                  ? "Stable Video Diffusion (SVD XT 1.1 • 4s motion)"
                  : "Gemini Omni 1.2 Flash (8s cinematic video)"}
              </strong>
              <span> with authentic facial likeness, festive lighting, and dynamic camera depth.</span>
            </div>
          ) : (
            <div>
              <span>Generate a warm, elegant {targetEvent} celebration portrait for </span>
              <span className="text-[#00bfa6] font-bold">{targetName}</span>
              <span> with cinematic festive lighting, studio bokeh, and authentic attire.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
