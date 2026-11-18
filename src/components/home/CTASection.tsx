import { Sparkles, ArrowRight, ArrowUp, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0A0A0C] text-[#F4F1EA] pt-28 sm:pt-36 pb-12 overflow-hidden border-t border-white/[0.06]">
      {/* Background Radial Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#F5B24A]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main CTA Hero Banner */}
        <div className="text-center max-w-4xl mx-auto mb-28 sm:mb-36">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_24px_rgba(245,178,74,0.15)]">
            <Sparkles size={13} className="text-[#F5B24A]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A]">
              Start In Seconds
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight text-[#F4F1EA] leading-[1.05] mb-6">
            Give them a celebration they will{" "}
            <span className="italic text-[#F5B24A]">remember forever.</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#8E8A82] leading-relaxed mb-10">
            One candid photo is all it takes to craft an atmospheric, deeply personal
            keepsake. Zero design experience needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-gradient-to-r from-[#F5B24A] via-[#EAB308] to-[#F59E0B] text-[#0A0A0C] font-bold text-sm sm:text-base shadow-[0_0_40px_rgba(245,178,74,0.4)] hover:shadow-[0_0_60px_rgba(245,178,74,0.65)] transition-all hover:scale-[1.03]"
            >
              <Sparkles size={18} className="text-[#0A0A0C]" />
              <span>Create Your Celebration Wish</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/onedrive"
              className="inline-flex items-center gap-2 px-7 py-4.5 rounded-full border border-white/15 bg-white/[0.03] text-[#F4F1EA] text-sm font-semibold hover:border-white/30 hover:bg-white/[0.06] transition-all backdrop-blur-md"
            >
              <span>Automate For Teams</span>
            </Link>
          </div>
        </div>

        {/* Divider with Center Badge */}
        <div className="relative my-12 border-t border-white/[0.08] flex items-center justify-center">
          <span className="absolute bg-[#0A0A0C] px-4 text-[10px] font-mono tracking-[0.25em] uppercase text-[#8E8A82]">
            CINEMATIC GENERATIVE ARTISTRY
          </span>
        </div>

        {/* Giant Luxury Wordmark */}
        <div className="select-none text-center my-10 sm:my-14 overflow-hidden">
          <span className="font-serif text-[clamp(3.5rem,15vw,13rem)] font-normal tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent block leading-none">
            WISHES AI
          </span>
        </div>

        {/* Footer Navigation & Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-white/[0.06] text-xs">
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#F5B24A] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-[#8E8A82]">
              <li>
                <Link to="/create" className="hover:text-[#F4F1EA] transition-colors">
                  AI Studio
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#F4F1EA] transition-colors">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link to="/onedrive" className="hover:text-[#F4F1EA] transition-colors">
                  OneDrive Automation
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#F4F1EA] transition-colors">
                  Generation History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#F5B24A] mb-3">
              Occasions
            </h4>
            <ul className="space-y-2 text-[#8E8A82]">
              <li>
                <a href="#gallery" className="hover:text-[#F4F1EA] transition-colors">
                  Diwali Celebrations
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4F1EA] transition-colors">
                  Milestone Birthdays
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4F1EA] transition-colors">
                  Weddings & Sangeet
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4F1EA] transition-colors">
                  Work Anniversaries
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#F5B24A] mb-3">
              Security & Trust
            </h4>
            <ul className="space-y-2 text-[#8E8A82]">
              <li className="flex items-center gap-1.5">
                <Shield size={12} className="text-[#2DD4BF]" />
                <span>Identity Protection Guaranteed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe size={12} className="text-[#2DD4BF]" />
                <span>Encrypted at Rest (AES-256)</span>
              </li>
              <li>
                <span className="text-[#8E8A82]">Zero Data Training Consent</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-[#8E8A82] hover:text-[#F4F1EA] hover:border-white/30 transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>

            <div className="mt-6 md:mt-0 text-[11px] text-[#8E8A82] text-left md:text-right">
              <span className="inline-flex items-center gap-1.5 text-[#2DD4BF] font-mono mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
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
