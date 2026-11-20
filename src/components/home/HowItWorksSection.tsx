import { useState, useEffect, useRef } from "react";
import { Sparkles, Camera, Palette, Gift, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    tag: "STEP ONE • CANDID PORTRAIT",
    title: "Upload a candid photo.",
    subtitle: "True facial likeness, zero distortion.",
    description:
      "Upload your photo with clear facial expression for stunning results. AI will enhance and customize your picture in a festive background.",
    icon: Camera,
    previewBadge: "BIOMETRIC FIDELITY: 99.8%",
    image: "/people/person.jpg",
    imageCaption: "Candid Subject Identity Locked • 68 Landmark Vectors",
  },
  {
    number: "02",
    tag: "STEP TWO • FESTIVE ATMOSPHERE",
    title: "Choose a festive atmosphere.",
    subtitle: "From Diwali night markets to royal palace arches.",
    description:
      "Select an occasion, destination setting, and celebratory mood. The engine stages warm brass diyas, candlelit bokeh, and culturally authentic attire that harmonizes naturally with the subject.",
    icon: Palette,
    previewBadge: "100+ CURATED FESTIVE PRESETS",
    image: "/themes/theme.avif",
    imageCaption: "Atmospheric Lighting & Destination Backdrop Staging",
  },
  {
    number: "03",
    tag: "STEP THREE • 4K MASTERPIECE",
    title: "Export in 4K Ultra-HD.",
    subtitle: "Instant download or scheduled team delivery.",
    description:
      "In under 60 seconds, your studio-grade celebration scene is rendered. Download for framing, share a direct link, or automate delivery via OneDrive roster sync.",
    icon: Gift,
    previewBadge: "4K",
    image: "/showcase/celebration.webp",
    imageCaption: "Final 4K Celebration Scene • Studio Ray-Traced Output",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center+=100",
        end: "bottom center-=80",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const currentStepData = STEPS[activeStep] || STEPS[0];

  return (
    <section
      id="how-it-works"
      className="relative z-10 w-full bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-24"
    >
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#00bfa6]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF5A52]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF5A52] mb-3">
            <Sparkles size={13} className="text-[#FF5A52]" />
            <span>The Creative Process</span>
          </div>
          <h2 className="font-sans text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.08]">
            How a candid photograph becomes{" "}
            <span className="text-[#00bfa6]">celebration art.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed max-w-2xl">
            Three guided steps from an everyday smartphone portrait to an atmospheric, studio-lit
            4K celebration scene—no prompt engineering required.
          </p>
        </div>

        {/* 2-Column Split: Left Side Step Cards, Right Side Sticky Visual Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Flowing Step Cards */}
          <div className="lg:col-span-6 space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_14px_38px_rgba(0,191,166,0.18)] scale-[1.01]"
                      : "bg-white/55 dark:bg-[#143838]/45 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50 hover:bg-white/80 dark:hover:bg-[#143838]/75"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-[11px] tracking-widest text-[#FF5A52] font-bold uppercase">
                      {step.tag}
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-[#00bfa6]/50 dark:text-[#00bfa6]/70">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#0f2a2a] dark:text-[#d9faf4]">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#00bfa6] mt-1 mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#00bfa6]">
                      <CheckCircle2 size={13} className="text-[#00bfa6]" />
                      {step.previewBadge}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#00bfa6] text-[#0f2a2a]"
                          : "bg-[#0f2a2a]/5 dark:bg-[#d9faf4]/10 text-[#0f2a2a] dark:text-[#d9faf4]"
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Pipeline Stage */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-[#143838]/90 backdrop-blur-xl border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
              {/* Soft Ambient Coral & Teal Inner Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00bfa6]/12 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#FF5A52]/12 rounded-full blur-[80px] pointer-events-none" />

              {/* Top Bar of the Visual Pipeline */}
              <div className="flex items-center justify-between pb-4 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#b01010] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#0f2a2a]/85 dark:text-[#d9faf4]/85 font-bold">
                    Visual Pipeline
                  </span>
                </div>
              </div>

              {/* Layered Celebration Visual Preview Card */}
              <div className="my-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 bg-[#091616] h-52 sm:h-60 shadow-inner group">
                  <img
                    key={currentStepData.image}
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091616]/90 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#091616]/80 border border-[#FF5A52]/50 text-[10px] font-mono font-bold text-[#FF5A52] uppercase tracking-wider">
                    {currentStepData.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#d9faf4]">
                    <span className="font-semibold truncate">{currentStepData.imageCaption}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00bfa6] text-[#0f2a2a] font-bold shrink-0">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Step-Specific Pipeline Telemetry */}
                {activeStep === 0 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#00bfa6]/30">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Camera size={16} className="text-[#00bfa6]" />
                        <span className="font-bold text-xs sm:text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          Facial Landmark & Expression Lock
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Isolates facial contours, eye reflections, and natural smile geometry into protected latent vectors.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#00bfa6] font-bold text-xs">99.8%</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Identity Lock</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#FF5A52] font-bold text-xs">68 Pts</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">3D Mesh</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#00bfa6] font-bold text-xs">100%</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Tone Match</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#FF5A52]/35">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Palette size={16} className="text-[#FF5A52]" />
                        <span className="font-bold text-xs sm:text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          Night-Market Lanterns & Festive Styling
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Synthesizing warm oil diya reflections, marigold garlands, and evening twilight bokeh around the subject.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {["Diwali Twilight", "30th Soirée", "Royal Sangeet"].map((theme, i) => (
                        <div
                          key={theme}
                          className={`p-2.5 rounded-lg border text-[11px] font-bold text-center ${
                            i === 0
                              ? "bg-[#FF5A52]/15 border-[#FF5A52] text-[#FF5A52]"
                              : "bg-[#d9faf4]/30 dark:bg-[#0f2a2a]/30 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70"
                          }`}
                        >
                          {theme}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#00bfa6]/30">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Gift size={16} className="text-[#00bfa6]" />
                        <span className="font-bold text-xs sm:text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          4K Ultra-HD Master Print Ready
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Rendered at 4096 × 2160 px (300 DPI) for framing, instant social sharing, or automated OneDrive dispatch.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#00bfa6]/15 to-[#FF5A52]/10 border border-[#00bfa6]/30 flex items-center justify-between">
                      <div>
                        <span className="font-sans text-sm font-bold text-[#0f2a2a] dark:text-[#d9faf4] block">
                          Celebration Scene Verified
                        </span>
                        <span className="text-[11px] font-mono text-[#00bfa6]">
                          4096 × 2160 • 300 DPI • PNG / WEBP
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-sm">
                        4K Ready
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-end">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00bfa6] hover:text-[#FF5A52] transition-colors"
                >
                  <span>Open AI Studio</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
