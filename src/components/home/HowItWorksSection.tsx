import { useState } from "react";
import { Sparkles, Camera, Palette, Gift, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      "Select an occasion, custom festive theme, and emotional tone. The AI designs bespoke surroundings, realistic cultural attire, warm festive lighting, and cinematic bokeh that harmonizes naturally with the subject.",
    icon: Palette,
    previewBadge: "100+ CURATED FESTIVE PRESETS",
    visual: {
      type: "theme",
      title: "Atmospheric Synthesis",
      activeTheme: "Diwali Twilight & Golden Marigolds",
      options: ["Diwali Glow", "Milestone 30th", "Royal Sangeet", "Silver Anniversary"],
    },
  },
  {
    number: "03",
    tag: "STEP THREE • MASTERPIECE",
    title: "Download 4K keepsake.",
    subtitle: "Or automate schedule delivery.",
    description:
      "Within 60 seconds, your high-resolution portrait is synthesized with studio illumination. Download for prints, send directly via email, or sync with OneDrive for automatic employee birthdays and work anniversaries.",
    icon: Gift,
    previewBadge: "ULTRA HD 4K EXPORT",
    visual: {
      type: "result",
      title: "Final Festive Masterpiece",
      headline: "Happy 30th Birthday Maya!",
      status: "Synthesized & Verified",
    },
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300"
    >
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#00bfa6]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00bfa6]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
            <Sparkles size={13} className="text-[#00bfa6]" />
            <span>The Creative Process</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
            How a photograph transforms into{" "}
            <span className="italic text-[#00bfa6] font-semibold">art.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed max-w-2xl">
            From an everyday smartphone photo to an extraordinary, atmospheric celebration scene.
            No complex prompts required.
          </p>
        </div>

        {/* 2-Column Split: Left Side Step Details, Right Side Interactive Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Natural Flowing Steps */}
          <div className="lg:col-span-6 space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_12px_35px_rgba(0,191,166,0.18)] scale-[1.01]"
                      : "bg-white/50 dark:bg-[#143838]/40 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 hover:border-[#00bfa6]/50 hover:bg-white/80 dark:hover:bg-[#143838]/70"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-xs tracking-widest text-[#00bfa6] font-bold">
                      {step.tag}
                    </span>
                    <span className="font-serif text-2xl text-[#00bfa6]/40 dark:text-[#00bfa6]/60">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4]">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#00bfa6] mt-0.5 mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#00bfa6]">
                      <CheckCircle2 size={12} className="text-[#00bfa6]" />
                      {step.previewBadge}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? "bg-[#00bfa6] text-[#0f2a2a]" : "bg-[#0f2a2a]/5 dark:bg-[#d9faf4]/10 text-[#0f2a2a] dark:text-[#d9faf4]"
                    }`}>
                      <Icon size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Interactive Frame Container */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#143838] border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Soft Ambient Inner Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00bfa6]/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Top Bar of the Card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00bfa6] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#0f2a2a]/80 dark:text-[#d9faf4]/80 font-bold">
                    Pipeline Simulation
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#00bfa6]/15 text-[#00bfa6] font-bold">
                  STEP 0{activeStep + 1} / 03
                </span>
              </div>

              {/* Dynamic Interactive Body based on Active Step */}
              <div className="my-6">
                {activeStep === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#00bfa6]/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Camera size={18} className="text-[#00bfa6]" />
                        <span className="font-bold text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          Face Contours & Expression Lock
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Identified key landmark points across eyes, jawline, and natural smile.
                        Subject identity mapped into neural latent vectors.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#00bfa6] font-bold text-xs">99.8%</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Fidelity</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#00bfa6] font-bold text-xs">68 Pts</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Geometry</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/40 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                        <span className="block text-[#00bfa6] font-bold text-xs">100%</span>
                        <span className="text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">Skin Lock</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#00bfa6]/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Palette size={18} className="text-[#00bfa6]" />
                        <span className="font-bold text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          Atmospheric Lighting & Festive Styling
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Synthesizing warm oil diya candlelights, floral marigold garlands, and evening twilight bokeh.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {["Diwali Twilight Splendor", "30th Birthday Candlelight", "Royal Palace Wedding"].map((theme, i) => (
                        <div
                          key={theme}
                          className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                            i === 0
                              ? "bg-[#00bfa6]/15 border-[#00bfa6] text-[#00bfa6]"
                              : "bg-[#d9faf4]/30 dark:bg-[#0f2a2a]/30 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70"
                          }`}
                        >
                          <span>{theme}</span>
                          <span className="font-mono text-[10px] uppercase">{i === 0 ? "Selected" : "Ready"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-[#d9faf4]/60 dark:bg-[#0f2a2a]/60 border border-[#00bfa6]/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Gift size={18} className="text-[#00bfa6]" />
                        <span className="font-bold text-sm text-[#0f2a2a] dark:text-[#d9faf4]">
                          Studio 4K Export Ready
                        </span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                        Rendered with authentic likeness, silk attire textures, and cinematic depth.
                        Dispatched in high-resolution JPG & WebP formats.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#00bfa6]/15 to-[#00bfa6]/5 border border-[#00bfa6]/30 flex items-center justify-between">
                      <div>
                        <span className="font-serif text-lg font-bold text-[#0f2a2a] dark:text-[#d9faf4] block">
                          Happy Birthday Maya!
                        </span>
                        <span className="text-[11px] font-mono text-[#00bfa6]">4096 × 2160 • 300 DPI</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-sm">
                        Ready
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeStep === idx
                          ? "w-8 bg-[#00bfa6]"
                          : "w-2 bg-[#0f2a2a]/20 dark:bg-[#d9faf4]/20 hover:bg-[#00bfa6]/50"
                      }`}
                      aria-label={`Jump to step ${idx + 1}`}
                    />
                  ))}
                </div>

                <Link
                  to="/create"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00bfa6] hover:underline"
                >
                  <span>Experience AI Studio</span>
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
