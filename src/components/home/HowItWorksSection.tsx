import { useEffect, useRef, useState } from "react";
import { Sparkles, Camera, Palette, Gift, CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    tag: "STEP ONE • INPUT",
    title: "A single photograph.",
    subtitle: "True likeness, zero distortion.",
    description:
      "Upload any candid photo of a friend, loved one, or colleague. Our neural identity pipeline isolates the subject, maps facial contours and natural expressions, and locks them into memory without artificial plastic smoothing.",
    icon: Camera,
    previewBadge: "BIOMETRIC FIDELITY: 99.8%",
    visual: {
      type: "upload",
      title: "Candid Portrait Analysis",
      subject: "Maya Chen • Engineering Lead",
      features: ["Natural Smile Angle", "3D Head Pose Matrix", "Ambient Skin Tone Lock"],
    },
  },
  {
    number: "02",
    tag: "STEP TWO • ATMOSPHERE",
    title: "Choose the celebration mood.",
    subtitle: "From Diwali twilight to royal weddings.",
    description:
      "Select from authentic cultural ceremonies and celebratory occasions. Whether it is oil diyas in a courtyard, a candlelit milestone birthday, or golden champagne sparklers — the environment is dynamically composed around their likeness.",
    icon: Palette,
    previewBadge: "ATMOSPHERE ENGINE: RAYTRACED LIGHTING",
    visual: {
      type: "mood",
      title: "Lighting & Setting Synthesis",
      themes: ["Diwali Diya Glow", "Milestone 30th Soirée", "Royal Palace Courtyard", "Silver Anniversary"],
    },
  },
  {
    number: "03",
    tag: "STEP THREE • MASTERPIECE",
    title: "A cinematic celebration is born.",
    subtitle: "Ready to gift, share, or automate.",
    description:
      "In seconds, your custom celebration scene is synthesized in pristine 4K resolution. Typography, personalized messages, and warm reflections blend seamlessly. Delivered instantly via email or scheduled for future delivery.",
    icon: Gift,
    previewBadge: "OUTPUT: 4K HIGH DYNAMIC RANGE",
    visual: {
      type: "result",
      title: "Final Festive Masterpiece",
      headline: "Happy 30th Birthday Maya!",
      status: "Synthesized & Verified",
    },
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger for How It Works
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActiveStep(stepIndex);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0A0A0C] text-[#F4F1EA] flex items-center justify-center py-20 px-6 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#F5B24A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#2DD4BF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A] mb-3">
            <Sparkles size={13} className="text-[#F5B24A]" />
            <span>The Creative Process</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal tracking-tight text-[#F4F1EA] leading-[1.1]">
            How a photograph transforms into{" "}
            <span className="italic text-[#F5B24A]">art.</span>
          </h2>
        </div>

        {/* 2-Column Split: Left Side Step Details, Right Side Interactive Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Staggered Steps */}
          <div className="lg:col-span-6 space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-white/[0.04] border-[#F5B24A]/40 shadow-[0_0_30px_rgba(245,178,74,0.08)]"
                      : "bg-transparent border-white/[0.05] opacity-40 hover:opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                        isActive ? "text-[#F5B24A]" : "text-[#8E8A82]"
                      }`}
                    >
                      {step.tag}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#F5B24A] text-[#0A0A0C]"
                          : "bg-white/5 text-[#8E8A82]"
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] mb-2 font-normal">
                    {step.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed text-[#8E8A82] transition-all duration-300 ${
                      isActive ? "block" : "hidden sm:block sm:line-clamp-2"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Cards with Smooth Cross-fades */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl bg-[#121217] border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs pb-4 border-b border-white/[0.07] relative z-10">
                <span className="text-[11px] font-mono tracking-wider text-[#8E8A82] uppercase">
                  {STEPS[activeStep].previewBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F5B24A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B24A] animate-ping" />
                  PHASE {STEPS[activeStep].number} OF 03
                </span>
              </div>

              {/* Step 1 Visual: Upload & Face Scan */}
              {activeStep === 0 && (
                <div className="relative z-10 my-auto flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 border-dashed border-[#F5B24A]/60 flex items-center justify-center bg-white/[0.02] shadow-[0_0_40px_rgba(245,178,74,0.15)] mb-4 overflow-hidden">
                    {/* Face Scan Line Animation */}
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F5B24A] to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
                    <div className="w-20 h-24 rounded-xl border border-white/20 bg-white/5 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-[#F5B24A] bg-[#F5B24A]/10 mb-2" />
                      <div className="w-12 h-6 rounded-t-lg bg-white/10" />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl text-[#F4F1EA]">
                    {STEPS[0].visual.subject}
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                    {STEPS[0].visual.features?.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#2DD4BF]"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 Visual: Celebration Atmosphere Theme Picker */}
              {activeStep === 1 && (
                <div className="relative z-10 my-auto grid grid-cols-2 gap-3.5">
                  {STEPS[1].visual.themes?.map((th, i) => (
                    <div
                      key={th}
                      className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between min-h-[90px] ${
                        i === 0
                          ? "bg-gradient-to-br from-[#F5B24A]/20 to-transparent border-[#F5B24A] shadow-[0_0_20px_rgba(245,178,74,0.2)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-[10px] tracking-widest text-[#8E8A82] uppercase">
                        THEME 0{i + 1}
                      </span>
                      <p className="font-serif text-sm sm:text-base text-[#F4F1EA] font-normal">
                        {th}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3 Visual: Rendered 4K Masterpiece */}
              {activeStep === 2 && (
                <div className="relative z-10 my-auto text-center flex flex-col items-center">
                  <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-[#F5B24A]/50 bg-gradient-to-tr from-[#1A1813] via-[#0A0A0C] to-[#0F1716] p-5 shadow-[0_0_40px_rgba(245,178,74,0.2)]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] bg-[#2DD4BF]/10 text-[#2DD4BF] font-mono mb-2">
                      <CheckCircle2 size={11} /> RENDER COMPLETE
                    </span>
                    <h4 className="font-serif text-2xl text-[#F4F1EA] mb-1">
                      Happy 30th Birthday Maya!
                    </h4>
                    <p className="text-xs text-[#8E8A82] italic font-serif">
                      "May your new decade glow with the warmth and radiance you give everyone around you."
                    </p>
                  </div>
                  <Link
                    to="/create"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#F5B24A] hover:underline"
                  >
                    <span>Generate this style now</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              {/* Bottom Subtle Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] text-[11px] text-[#8E8A82] relative z-10">
                <span>Identity Preservation Core</span>
                <span className="text-[#F5B24A]">Wishes AI Engine 3.1</span>
              </div>

              {/* Corner Watermark */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#F5B24A]/5 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
