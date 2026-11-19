import { Outlet, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] flex flex-col justify-between overflow-hidden antialiased transition-colors duration-300">
      {/* Background Film Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0 film-grain opacity-25 mix-blend-multiply dark:mix-blend-screen"
        aria-hidden="true"
      />

      {/* Ambient Radial Glows */}
      <div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#00bfa6]/15 via-[#00bfa6]/5 to-transparent blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/wishes-logo-light.png"
            alt="Wishes AI"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,191,166,0.25)] dark:hidden"
          />
          <img
            src="/wishes-logo-dark.png"
            alt="Wishes AI"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,191,166,0.35)] hidden dark:block"
          />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors"
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
      <footer className="relative z-10 w-full py-6 text-center text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-mono">
        © {new Date().getFullYear()} Wishes AI • Identity-Preserving Neural Celebrations
      </footer>
    </div>
  );
}
