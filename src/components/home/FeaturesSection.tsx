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
      className="relative rounded-2xl p-8 border border-white/10 bg-[#121217] transition-all duration-300 hover:border-white/25 overflow-hidden flex flex-col justify-between group"
    >
      {/* Dynamic Cursor Hover Glow Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 178, 74, 0.12), transparent 80%)`,
          }}
        />
      )}

      <div>
        {/* Top Tag & Icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F5B24A]">
            {tag}
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B24A] group-hover:scale-110 transition-transform">
            <Icon size={18} />
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-2xl text-[#F4F1EA] mb-3 font-normal leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#8E8A82] leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Highlight Badge */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#2DD4BF]">
          {highlight}
        </span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setBtnOffset({ x, y });
  };

  const handleMagneticLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const features = [
    {
      icon: ShieldCheck,
      tag: "IDENTITY ENGINE",
      title: "Facial Fidelity Core",
      description:
        "Preserves bone structure, authentic smile curvatures, and gaze. Never turns your loved ones into unrecognizably smooth CGI figures.",
      highlight: "✓ Zero Plastic Smoothing",
    },
    {
      icon: Sun,
      tag: "ATMOSPHERE",
      title: "Lighting & Festive Synthesis",
      description:
        "Physically accurate light scattering from oil lamps, warm chandeliers, or outdoor festival fireworks that reflect naturally on skin and clothing.",
      highlight: "✓ Volumetric Atmospheric Depth",
    },
    {
      icon: Wand2,
      tag: "EASE OF USE",
      title: "Zero Prompt Engineering",
      description:
        "No complex keywords or negative prompts required. Choose the occasion and mood, and let our curated aesthetic models direct the scene.",
      highlight: "✓ 1-Click Aesthetic Selection",
    },
    {
      icon: Maximize2,
      tag: "RESOLUTION",
      title: "4K Print-Grade Quality",
      description:
        "Outputs crystal-clear 4K resolution images suitable for physical framing, high-end digital greeting cards, and office celebration boards.",
      highlight: "✓ Studio Print-Ready Assets",
    },
    {
      icon: Layers,
      tag: "CULTURE",
      title: "Authentic Celebrations",
      description:
        "Deep cultural fidelity for Diwali, Weddings, Eid, Birthdays, and Anniversaries with historically and regionally accurate ornamental details.",
      highlight: "✓ Culturally Researched Motifs",
    },
    {
      icon: Calendar,
      tag: "AUTOMATION",
      title: "Corporate Calendar Sync",
      description:
        "Connect OneDrive, Excel, or Google Workspace to automate employee birthdays and work anniversaries with zero manual intervention.",
      highlight: "✓ Scheduled 9:00 AM Automated Dispatch",
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full bg-[#0A0A0C] text-[#F4F1EA] py-24 sm:py-32 px-6 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5B24A]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A] mb-3">
            <Sparkles size={13} className="text-[#F5B24A]" />
            <span>Under The Hood</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal tracking-tight text-[#F4F1EA] leading-[1.1]">
            Engineered for emotion,{" "}
            <span className="italic text-[#F5B24A]">built with precision.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#8E8A82] leading-relaxed">
            Every layer of Wishes AI is calibrated to deliver cinematic visual artistry
            without sacrificing the human connection at the center.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => (
            <FeatureCard key={feat.title} {...feat} />
          ))}
        </div>

        {/* Magnetic Interactive CTA Button */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <Link
            to="/create"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            style={{
              transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] border border-white/15 text-[#F4F1EA] font-semibold text-sm hover:border-[#F5B24A] hover:bg-[#F5B24A]/10 transition-all duration-200 shadow-lg"
          >
            <Sparkles size={16} className="text-[#F5B24A]" />
            <span>Experience the Technology</span>
            <ArrowRight size={15} className="text-[#F5B24A] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
