import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? "bg-[#0A0A0C]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-white/[0.03] backdrop-blur-md border-white/5"
        }`}
      >
        {/* Brand Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.16em] font-medium text-[#8E8A82]">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection("corporate")}
            className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
          >
            For Teams
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 text-[#F4F1EA] hover:border-white/30 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold px-4 py-2 rounded-full text-[#8E8A82] hover:text-[#F4F1EA] transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            to="/create"
            className="group relative inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-[#F5B24A] to-[#E08B28] text-[#0A0A0C] text-xs font-bold tracking-wide shadow-[0_0_24px_rgba(245,178,74,0.3)] hover:shadow-[0_0_32px_rgba(245,178,74,0.5)] transition-all hover:scale-[1.02]"
          >
            <span>Create Wish</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-[#F4F1EA] p-1.5 rounded-lg border border-white/10"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-3xl p-6 bg-[#0A0A0C]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-4 text-center">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="py-2 text-sm text-[#F4F1EA] tracking-wider uppercase"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="py-2 text-sm text-[#F4F1EA] tracking-wider uppercase"
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="py-2 text-sm text-[#F4F1EA] tracking-wider uppercase"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection("corporate")}
            className="py-2 text-sm text-[#F4F1EA] tracking-wider uppercase"
          >
            For Teams
          </button>
          <hr className="border-white/10 my-1" />
          <Link
            to="/create"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-full bg-[#F5B24A] text-[#0A0A0C] text-sm font-bold"
          >
            Create Your Wish
          </Link>
          <Link
            to={user ? "/dashboard" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-xs text-[#8E8A82]"
          >
            {user ? "Go to Dashboard" : "Sign In to Account"}
          </Link>
        </div>
      )}
    </header>
  );
}
