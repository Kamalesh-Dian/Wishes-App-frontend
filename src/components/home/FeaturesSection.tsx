import { useState, useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Sun,
  Wand2,
  Maximize2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";

interface FeatureCardProps {
  icon: typeof Sparkles;
  tag: string;
  title: string;
  description: string;
  highlight: string;
}

function FeatureCard({ icon: Icon, tag, title, description, highlight }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-7 sm:p-8 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-white/70 dark:bg-[#143838]/70 backdrop-blur-xl transition-all duration-300 hover:border-[#00bfa6]/60 hover:shadow-xl overflow-hidden flex flex-col justify-between group"
    >
      {/* Dynamic Cursor Hover Glow Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 191, 166, 0.16), transparent 80%)`,
          }}
        />
      )}

      <div>
        {/* Top Tag & Icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#00bfa6]">
            {tag}
          </span>
          <div className="w-10 h-10 rounded-xl bg-[#00bfa6]/10 border border-[#00bfa6]/25 flex items-center justify-center text-[#00bfa6] group-hover:scale-110 transition-transform">
            <Icon size={18} />
          </div>
        </div>

        {/* Feature Title */}
        <h3 className="font-serif text-2xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] mb-2 leading-snug">
          {title}
        </h3>

        {/* Feature Description */}
        <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Bottom Highlight Stat */}
      <div className="mt-8 pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold text-[#00bfa6]">
          {highlight}
        </span>
        <span className="text-xs text-[#0f2a2a]/50 dark:text-[#d9faf4]/50 group-hover:text-[#00bfa6] group-hover:translate-x-1 transition-all">
          &rarr;
        </span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      tag: "BIOMETRICS",
      title: "Zero Face Distortion",
      description:
        "Preserves facial micro-expressions, smile angles, and bone structure without the generic, plastic-smoothed look typical of standard generative AI.",
      highlight: "FIDELITY: 99.8% IDENTITY LOCK",
    },
    {
      icon: Sun,
      tag: "LIGHTING",
      title: "Atmospheric Scene Synthesis",
      description:
        "Calculates natural light bounce from festive oil diyas, candle flames, chandeliers, or sunlit floral mandaps across skin and fabric textures.",
      highlight: "STUDIO RAY-TRACED ILLUMINATION",
    },
    {
      icon: Maximize2,
      tag: "RESOLUTION",
      title: "True 4K UHD Master Prints",
      description:
        "Every generation exports at razor-sharp 300 DPI resolution, ready for digital invitations, Instagram Stories, or physical framed canvas keepsakes.",
      highlight: "ULTRA HD: 4096 × 2160 PX",
    },
    {
      icon: Layers,
      tag: "COLLECTION",
      title: "100+ Curated Festive Themes",
      description:
        "Handcrafted celebration presets including Diwali Twilight, Golden Anniversaries, Milestone Birthdays, and Destination Sangeet celebrations.",
      highlight: "CULTURALLY AUTHENTIC ATTIRE",
    },
    {
      icon: Wand2,
      tag: "SPEED",
      title: "60-Second Instant Delivery",
      description:
        "Distributed GPU acceleration delivers your personalized scene in under a minute without queuing or long rendering delays.",
      highlight: "LATENCY: ~45 SECONDS",
    },
    {
      icon: Calendar,
      tag: "AUTOMATION",
      title: "Automated Calendar Sync",
      description:
        "Connect OneDrive, Outlook, or Excel rosters once. The system automatically creates and dispatches celebrations at local 9:00 AM on employee birthdays.",
      highlight: "ZERO-TOUCH WORKPLACE AUTOMATION",
    },
  ];

  return (
    <section
      id="features"
      className="relative z-10 w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-24"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#00bfa6]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF5A52] mb-3">
            <Sparkles size={13} className="text-[#FF5A52]" />
            <span>Under The Hood</span>
          </div>
          <h2 className="font-sans text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.08]">
            Engineered for genuine likeness,{" "}
            <span className="text-[#00bfa6]">not generic faces.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
            Most generative tools hallucinate an unrecognizable stranger. Wishes AI separates facial
            geometry and preserves identity while styling festive surroundings.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Bottom Banner Card */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl border border-[#00bfa6]/30 bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#0f2a2a] dark:text-[#d9faf4]">
              Ready to test with your own photograph?
            </h4>
            <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mt-1">
              Upload any portrait and preview your personalized festive scene in under 60 seconds.
            </p>
          </div>

          <Link
            to="/create"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_35px_rgba(0,191,166,0.6)] transition-all hover:scale-105"
          >
            <span>Start Generation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
