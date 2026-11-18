import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#F4F1EA] flex flex-col justify-center items-center px-4 overflow-hidden antialiased">
      {/* Background Film Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0 film-grain opacity-25 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F5B24A]/10 via-[#2DD4BF]/5 to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <Sparkles size={12} className="text-[#F5B24A]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A]">
              Page Not Found
            </span>
          </div>

          <h1 className="font-serif text-[clamp(5rem,14vw,8rem)] font-normal text-[#F4F1EA] leading-none mb-4">
            404
          </h1>

          <p className="text-sm text-[#8E8A82] max-w-sm mx-auto mb-8 leading-relaxed">
            The celebration or destination you are searching for might have moved into another realm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-[#F4F1EA] hover:border-white/25 hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F5B24A] text-[#0A0A0C] text-xs font-bold hover:shadow-[0_0_24px_rgba(245,178,74,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Home size={14} />
              <span>Return Home</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
