import { useEventStore } from "../../store/eventStore";
import { useWishStore } from "../../store/wishesStore";
import { Sparkles, Cpu } from "lucide-react";

export default function EngineStep() {
  const { selectedEvent } = useEventStore();
  const { aiEngine, setAIEngine } = useWishStore();
  
  const targetName = selectedEvent?.Name || "your contact";
  const targetEvent = selectedEvent?.EventType?.toLowerCase() || "special occasion";

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Choose an AI provider</h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Select the neural diffusion model to synthesize your celebration scene.</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {/* Gemini Option */}
        <div 
          onClick={() => setAIEngine("gemini")}
          className={`border-2 rounded-2xl p-6 cursor-pointer shadow-sm relative overflow-hidden transition-all ${
            aiEngine === "gemini" 
              ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md" 
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#00bfa6]" />
              <h3 className={`font-bold text-sm ${aiEngine === "gemini" ? "text-teal-900 dark:text-white" : "text-slate-800 dark:text-slate-200"}`}>
                Google Gemini
              </h3>
            </div>
            <span className="text-[9px] font-bold text-[#00bfa6] uppercase tracking-widest bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-200/50 dark:border-teal-800/50">
              RECOMMENDED
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            Ultra-realistic facial likeness, ray-traced lighting, and legible typography rendering.
          </p>
        </div>

        {/* FLUX.1-Kontext-dev Option */}
        <div 
          onClick={() => setAIEngine("flux")}
          className={`border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-sm relative overflow-hidden ${
            aiEngine === "flux" 
              ? "border-[#00bfa6] bg-teal-50/40 dark:bg-teal-950/20 shadow-md" 
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-[#00bfa6]" />
              <h3 className={`font-bold text-sm ${aiEngine === "flux" ? "text-teal-900 dark:text-white" : "text-slate-800 dark:text-slate-200"}`}>
                FLUX.1-Kontext-dev
              </h3>
            </div>
            <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              SECONDARY OPTION
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            Black Forest Labs FLUX.1-Kontext-dev model for context-aware portrait editing and festive scene transformation.
          </p>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Prompt preview</p>
        <div className="bg-slate-100 dark:bg-slate-800/80 rounded-xl p-4 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
          Generate a warm, elegant {targetEvent} celebration portrait for <span className="text-[#00bfa6] font-bold">{targetName}</span> with cinematic festive lighting, studio bokeh, and authentic attire.
        </div>
      </div>
    </div>
  );
}
