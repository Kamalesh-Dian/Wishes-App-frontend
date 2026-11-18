import { Outlet, Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#F4F1EA] flex flex-col justify-between overflow-hidden antialiased">
      {/* Background Film Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0 film-grain opacity-25 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Ambient Radial Glows */}
      <div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#F5B24A]/10 via-[#2DD4BF]/5 to-transparent blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5B24A] to-[#2DD4BF] p-[1px] shadow-[0_0_16px_rgba(245,178,74,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0A0A0C] rounded-full flex items-center justify-center">
              <Sparkles size={14} className="text-[#F5B24A]" />
            </div>
          </div>
          <span className="font-serif text-lg tracking-tight text-[#F4F1EA] font-normal">
            Wishes <span className="italic text-[#F5B24A]">AI</span>
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8E8A82] hover:text-[#F4F1EA] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to home</span>
        </Link>
      </header>

      {/* Centered Auth Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom Footer Note */}
      <footer className="relative z-10 w-full py-6 text-center text-[11px] text-[#8E8A82]/70 font-mono">
        © {new Date().getFullYear()} Wishes AI • Identity-Preserving Neural Celebrations
      </footer>
    </div>
  );
}
