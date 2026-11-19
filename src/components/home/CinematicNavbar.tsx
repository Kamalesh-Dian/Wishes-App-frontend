import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../hooks/useTheme";

export default function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    // Use Lenis smooth scroll if active, fallback to native
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | string, opts: { offset: number; duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between border pointer-events-auto shadow-lg backdrop-blur-xl ${
          scrolled
            ? "bg-[#d9faf4]/90 dark:bg-[#0f2a2a]/90 border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-[0_10px_35px_rgba(15,42,42,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
            : "bg-[#d9faf4]/70 dark:bg-[#0f2a2a]/70 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"
        }`}
      >
        {/* Brand Logo with Uploaded Mark */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/wishes-icon.png"
            alt="Wishes AI Logo"
            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,191,166,0.4)]"
          />
          <span className="font-serif text-lg tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] font-normal hidden xs:inline-block">
            Wishes <span className="italic text-[#00bfa6] font-semibold">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] uppercase tracking-[0.16em] font-medium text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors cursor-pointer"
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection("corporate")}
            className="hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors cursor-pointer"
          >
            For Teams
          </button>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-colors cursor-pointer"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* User Auth Link */}
          {user ? (
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 rounded-full text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 hover:text-[#00bfa6] dark:hover:text-[#00bfa6] transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Primary CTA */}
          <Link
            to="/create"
            className="group relative inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(0,191,166,0.35)] hover:shadow-[0_0_30px_rgba(0,191,166,0.6)] transition-all hover:scale-[1.02]"
          >
            <span>Create Wish</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-[#0f2a2a] dark:text-[#d9faf4] p-1.5 rounded-lg border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-3xl p-6 bg-[#d9faf4]/95 dark:bg-[#0f2a2a]/95 backdrop-blur-2xl border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-2xl flex flex-col gap-4 text-center pointer-events-auto">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="py-2 text-sm text-[#0f2a2a] dark:text-[#d9faf4] tracking-wider uppercase font-semibold"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="py-2 text-sm text-[#0f2a2a] dark:text-[#d9faf4] tracking-wider uppercase font-semibold"
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="py-2 text-sm text-[#0f2a2a] dark:text-[#d9faf4] tracking-wider uppercase font-semibold"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection("corporate")}
            className="py-2 text-sm text-[#0f2a2a] dark:text-[#d9faf4] tracking-wider uppercase font-semibold"
          >
            For Teams
          </button>
          <hr className="border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 my-1" />
          <Link
            to="/create"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-sm font-bold shadow-[0_0_20px_rgba(0,191,166,0.35)]"
          >
            Create Your Wish
          </Link>
          <Link
            to={user ? "/dashboard" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70"
          >
            {user ? "Go to Dashboard" : "Sign In to Account"}
          </Link>
        </div>
      )}
    </header>
  );
}
