import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight, Flame, Heart, Crown, Cake, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_ITEMS = [
  {
    id: "diwali",
    title: "Diwali Twilight Splendor",
    occasion: "Diwali • Festival of Lights",
    tag: "FESTIVE LIGHTING",
    icon: Flame,
    accent: "#F5B24A",
    description: "Brass oil lamps, glowing marigold garlands, and soft twilight reflections. Real smile, zero distortion.",
    quote: "“The diyas cast a natural golden glow that looked like a high-budget film production.”",
    bgGradient: "from-[#F5B24A]/20 via-[#1A1813] to-[#0A0A0C]",
    specs: ["Warm Candlelit Bokeh", "Silk Texture Fidelity", "Authentic Cultural Decor"],
  },
  {
    id: "birthday",
    title: "Milestone 30th Soirée",
    occasion: "Milestone Birthday",
    tag: "COCKTAIL & CANDLELIGHT",
    icon: Cake,
    accent: "#2DD4BF",
    description: "Midnight champagne reflections, floating helium balloons, and sparkling candle glow around the subject.",
    quote: "“Captured Maya’s genuine laughter in a setting more magical than any photoshoot could manage.”",
    bgGradient: "from-[#2DD4BF]/20 via-[#0F1716] to-[#0A0A0C]",
    specs: ["Subtle Lens Flare", "True Smile Preservation", "Fine Metallic Sparkles"],
  },
  {
    id: "wedding",
    title: "Royal Courtyard Wedding",
    occasion: "Wedding & Sangeet",
    tag: "PALATIAL CEREMONY",
    icon: Crown,
    accent: "#F59E0B",
    description: "Historic Rajasthani stone arches, fairy lights cascading from banyan branches, and embroidered festive elegance.",
    quote: "“We gifted this to my sister for her wedding countdown. It brought the entire family to tears.”",
    bgGradient: "from-[#F59E0B]/20 via-[#1C160F] to-[#0A0A0C]",
    specs: ["Palatial Architectural Depth", "Gold Thread Sheen", "Sunset Vignette"],
  },
  {
    id: "anniversary",
    title: "Silver Solstice Anniversary",
    occasion: "25th Silver Anniversary",
    tag: "LANTERN REFLECTIONS",
    icon: Heart,
    accent: "#E2E8F0",
    description: "Floating water lanterns drifting across a calm lake beneath a star-filled velvet sky with warm ambient intimacy.",
    quote: "“A poetic, timeless keepsake that looks like an oil painting brought to life.”",
    bgGradient: "from-[#94A3B8]/20 via-[#141820] to-[#0A0A0C]",
    specs: ["Water Ripple Reflections", "Bioluminescent Lantern Glow", "Intimate Dual Portrait"],
  },
  {
    id: "corporate",
    title: "Executive Work Milestone",
    occasion: "Corporate Achievement",
    tag: "COMPANY-WIDE GREETING",
    icon: Star,
    accent: "#38BDF8",
    description: "Contemporary glass atrium adorned with champagne gold streamers and personalized team appreciation accolades.",
    quote: "“Sent automatically via OneDrive on our VP's 5th work anniversary. Clean, respectful, and premium.”",
    bgGradient: "from-[#38BDF8]/20 via-[#0C1A24] to-[#0A0A0C]",
    specs: ["OneDrive Automated Sync", "Vector Logo Incorporation", "Instant Email Dispatch"],
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0C] text-[#F4F1EA] py-24 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A] mb-3">
            <Sparkles size={13} className="text-[#F5B24A]" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal tracking-tight text-[#F4F1EA] leading-[1.1]">
            Celebrations born from{" "}
            <span className="italic text-[#F5B24A]">real memories.</span>
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#8E8A82] leading-relaxed">
          Explore how everyday snapshots turn into atmospheric keepsakes across birthdays,
          Diwali, weddings, and milestones.
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className={`flex gap-6 sm:gap-8 px-6 sm:px-12 ${
            isMobile ? "overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" : "w-max"
          }`}
        >
          {SHOWCASE_ITEMS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`relative w-[85vw] sm:w-[460px] lg:w-[500px] h-[580px] rounded-2xl p-8 flex flex-col justify-between border border-white/10 bg-gradient-to-b ${item.bgGradient} shadow-2xl transition-all duration-300 hover:border-white/20 group shrink-0 ${
                  isMobile ? "snap-center" : ""
                }`}
              >
                {/* Header Tag & Icon */}
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <span className="inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8E8A82] mb-1">
                      SERIES 0{idx + 1} • {item.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] font-normal leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-[#F4F1EA] shadow-inner">
                    <Icon size={18} style={{ color: item.accent }} />
                  </div>
                </div>

                {/* Center Atmospheric Frame Simulation */}
                <div className="my-auto relative rounded-xl overflow-hidden border border-white/10 p-5 bg-black/40 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="text-[11px] font-bold text-[#F4F1EA] tracking-wide">
                      {item.occasion}
                    </span>
                  </div>

                  <p className="text-xs text-[#F4F1EA]/90 leading-relaxed font-serif italic mb-4">
                    {item.quote}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-white/[0.07]">
                    {item.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 text-[11px] text-[#8E8A82]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#F5B24A]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between relative z-10">
                  <span className="text-xs text-[#8E8A82] font-mono">
                    Identity Accuracy: 100%
                  </span>

                  <Link
                    to="/create"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5B24A] hover:underline transition-all group-hover:translate-x-1"
                  >
                    <span>Create in this style</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Ambient Corner Glow */}
                <div
                  className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-[90px] opacity-25 pointer-events-none"
                  style={{ backgroundColor: item.accent }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
