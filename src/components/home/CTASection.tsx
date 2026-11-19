import { Sparkles, ArrowRight, ArrowUp, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] pt-24 sm:pt-32 pb-12 overflow-hidden border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300">
      {/* Background Radial Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00bfa6]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main CTA Hero Banner */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.05] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 backdrop-blur-md mb-8 shadow-sm">
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6]">
              Start In Seconds
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.05] mb-6">
            Give them a celebration they will{" "}
            <span className="italic text-[#00bfa6] font-semibold">remember forever.</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed mb-10">
            One candid photo is all it takes to craft an atmospheric, deeply personal
            keepsake. Zero design experience needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(0,191,166,0.35)] hover:shadow-[0_0_50px_rgba(0,191,166,0.6)] transition-all hover:scale-[1.03]"
            >
              <Sparkles size={18} className="text-[#0f2a2a]" />
              <span>Create Your Celebration Wish</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/onedrive"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 bg-white/60 dark:bg-white/[0.04] text-[#0f2a2a] dark:text-[#d9faf4] text-sm font-semibold hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all backdrop-blur-md"
            >
              <span>Automate For Teams</span>
            </Link>
          </div>
        </div>

        {/* Divider with Center Badge */}
        <div className="relative my-10 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-center">
          <span className="absolute bg-[#d9faf4] dark:bg-[#0f2a2a] px-4 text-[10px] font-mono tracking-[0.25em] uppercase text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-bold">
            CINEMATIC GENERATIVE ARTISTRY
          </span>
        </div>

        {/* Brand Display with Official Uploaded Logo */}
        <div className="select-none flex items-center justify-center my-8 sm:my-12">
          <img
            src="/wishes-logo.png"
            alt="Wishes AI Wordmark"
            className="max-h-20 sm:max-h-24 w-auto object-contain opacity-90 drop-shadow-[0_0_20px_rgba(0,191,166,0.25)]"
          />
        </div>

        {/* Footer Navigation & Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-xs">
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#00bfa6] mb-3 font-bold">
              Platform
            </h4>
            <ul className="space-y-2 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
              <li>
                <Link to="/create" className="hover:text-[#00bfa6] transition-colors">
                  AI Studio
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#00bfa6] transition-colors">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link to="/onedrive" className="hover:text-[#00bfa6] transition-colors">
                  OneDrive Automation
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#00bfa6] transition-colors">
                  Generation History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#00bfa6] mb-3 font-bold">
              Occasions
            </h4>
            <ul className="space-y-2 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
              <li>
                <a href="#gallery" className="hover:text-[#00bfa6] transition-colors">
                  Diwali Twilight
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#00bfa6] transition-colors">
                  Milestone Birthdays
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#00bfa6] transition-colors">
                  Weddings & Sangeet
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#00bfa6] transition-colors">
                  Work Anniversaries
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#00bfa6] mb-3 font-bold">
              Security & Trust
            </h4>
            <ul className="space-y-2 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
              <li className="flex items-center gap-1.5">
                <Shield size={12} className="text-[#00bfa6]" />
                <span>Identity Protection Guaranteed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe size={12} className="text-[#00bfa6]" />
                <span>Encrypted at Rest (AES-256)</span>
              </li>
              <li>
                <span className="text-[#0f2a2a]/50 dark:text-[#d9faf4]/50">Zero Data Training Consent</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 text-xs font-semibold text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>

            <div className="mt-6 md:mt-0 text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 text-left md:text-right">
              <span className="inline-flex items-center gap-1.5 text-[#00bfa6] font-mono mb-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6] animate-pulse" />
                4K Diffusion Pipeline Online
              </span>
              <p>© {new Date().getFullYear()} Wishes AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
