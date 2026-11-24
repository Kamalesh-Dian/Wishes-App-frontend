import { ArrowRight, ArrowUp, Shield, Globe, Cloud } from "lucide-react";
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

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | string, opts: { offset: number; duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -70, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] pt-24 sm:pt-32 pb-10 overflow-hidden border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300">
      {/* Background Coral & Teal Radial Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-b from-[#00bfa6]/15 via-[#FF5A52]/10 to-transparent blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main CTA Glassmorphic Banner */}
        <div className="relative rounded-3xl p-8 sm:p-14 border border-[#0f2a2a]/12 dark:border-[#d9faf4]/15 bg-white/75 dark:bg-[#143838]/75 backdrop-blur-2xl shadow-2xl text-center max-w-4xl mx-auto mb-20 sm:mb-24 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF5A52]/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00bfa6]/20 rounded-full blur-[90px] pointer-events-none" />

          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.06] mb-5">
            Give them a celebration they will{" "}
            <span className="text-[#00bfa6]">remember forever.</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 leading-relaxed mb-9">
            One candid photo is all it takes to craft an atmospheric, deeply personal
            4K celebration scene—or connect OneDrive to automate milestones across your team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(0,191,166,0.35)] hover:shadow-[0_0_50px_rgba(0,191,166,0.6)] transition-all hover:scale-[1.03]"
            >
              <span>Create Wish</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/onedrive"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 bg-white/80 dark:bg-[#0f2a2a]/60 text-[#0f2a2a] dark:text-[#d9faf4] text-sm font-semibold hover:border-[#FF5A52] hover:text-[#FF5A52] transition-all backdrop-blur-md"
            >
              <Cloud size={16} className="text-[#FF5A52]" />
              <span>Connect OneDrive</span>
            </Link>
          </div>
        </div>

        {/* Footer Navigation & Brand Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-xs">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/wishes-logo-light.png"
                alt="Wishes AI"
                className="h-8 w-auto object-contain dark:hidden"
              />
              <img
                src="/wishes-logo-dark.png"
                alt="Wishes AI"
                className="h-8 w-auto object-contain hidden dark:block"
              />
            </Link>
            <p className="text-[#0f2a2a]/65 dark:text-[#d9faf4]/65 leading-relaxed max-w-xs">
              Identity-preserving AI celebration studio for personal keepsakes and automated workplace milestones.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#FF5A52] mb-3 font-bold">
              Sections
            </h4>
            <ul className="space-y-2 text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-[#00bfa6] transition-colors cursor-pointer"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="hover:text-[#00bfa6] transition-colors cursor-pointer"
                >
                  Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hover:text-[#00bfa6] transition-colors cursor-pointer"
                >
                  Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-[#00bfa6] transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("corporate")}
                  className="hover:text-[#00bfa6] transition-colors cursor-pointer"
                >
                  For Teams
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#00bfa6] mb-3 font-bold">
              Platform
            </h4>
            <ul className="space-y-2 text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-medium">
              <li>
                <Link to="/create" className="hover:text-[#00bfa6] transition-colors">
                  Create Wish Studio
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#00bfa6] transition-colors">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link to="/onedrive" className="hover:text-[#00bfa6] transition-colors">
                  Connect OneDrive
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#00bfa6] transition-colors">
                  Generation History
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="space-y-2 text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 mb-4">
              <div className="flex items-center gap-1.5">
                <Shield size={13} className="text-[#00bfa6]" />
                <span>Enterprise Identity Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={13} className="text-[#FF5A52]" />
                <span>AES-256 Encrypted Storage</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 text-xs font-semibold text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Large Atmospheric "WISHES AI" Wordmark */}
        <div className="relative pt-6 pb-2 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 select-none overflow-hidden text-center">
          <div
            aria-hidden="true"
            className="font-sans font-black tracking-tighter leading-none text-[clamp(3.8rem,15vw,12.5rem)] bg-gradient-to-b from-[#0f2a2a]/15 via-[#00bfa6]/15 to-transparent dark:from-[#d9faf4]/15 dark:via-[#00bfa6]/20 dark:to-transparent bg-clip-text text-transparent"
          >
            WISHES AI
          </div>

          <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
            <span className="inline-flex items-center gap-1.5 text-[#00bfa6] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa6] animate-pulse" />
              4K Diffusion & Identity Pipeline Online
            </span>
            <p>© {new Date().getFullYear()} Wishes AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
