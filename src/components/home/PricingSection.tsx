import { Check, Sparkles, Zap, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      generations: "10 Generations",
      badge: null,
      description: "Ideal for trying out neural likeness celebration scenes for personal moments.",
      icon: Sparkles,
      features: [
        "10 AI celebration generations",
        "Standard HD export resolution",
        "Biometric facial likeness lock",
        "Standard celebration presets (Birthdays, Anniversaries)",
        "Direct image download",
        "Community support",
      ],
      ctaText: "Get Started Free",
      ctaLink: "/register",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$5",
      period: "per month",
      generations: "100 Generations",
      badge: "MOST POPULAR",
      description: "Complete studio experience for active celebrants, creators, and family events.",
      icon: Zap,
      features: [
        "100 studio-grade generations",
        "4K Ultra-HD resolution master prints (300 DPI)",
        "All 100+ celebration presets (Diwali, Weddings, Sangeet)",
        "Priority GPU queue (<30s generation time)",
        "Direct personalized email dispatch",
        "Zero watermark & commercial rights",
        "Priority creator support",
      ],
      ctaText: "Upgrade to Pro",
      ctaLink: "/create",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$10",
      period: "per month",
      generations: "200 Generations",
      badge: "BEST FOR WORKPLACES",
      description: "Automated hands-off employee milestone celebration engine for modern teams.",
      icon: Users,
      features: [
        "200 automated celebrations per month",
        "Everything included in Pro",
        "Automated OneDrive & Excel roster synchronization",
        "Scheduled local 9:00 AM delivery to employee inboxes",
        "Custom company logos & corporate footer styling",
        "Multi-recipient team channel broadcast",
        "Dedicated account & setup support",
      ],
      ctaText: "Automate For Teams",
      ctaLink: "/onedrive",
      highlighted: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00bfa6]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/[0.05] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={12} className="text-[#00bfa6]" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00bfa6]">
              Simple & Transparent
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
            Plans designed to celebrate{" "}
            <span className="italic text-[#00bfa6] font-semibold">everyone.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed max-w-xl mx-auto">
            Start free with 10 generations. Upgrade anytime to unlock 4K studio outputs, all festive
            presets, and automated workplace calendar sync.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 sm:p-9 border transition-all duration-300 flex flex-col justify-between ${
                  plan.highlighted
                    ? "bg-white dark:bg-[#143838] border-[#00bfa6] shadow-[0_20px_50px_rgba(0,191,166,0.22)] scale-[1.02] z-20"
                    : "bg-white/70 dark:bg-[#143838]/70 border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-lg hover:border-[#00bfa6]/60 z-10"
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 flex items-center justify-center text-[#00bfa6]">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00bfa6]/15 text-[#00bfa6]">
                      {plan.generations}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4]">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mt-3 mb-2">
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-medium">
                      / {plan.period}
                    </span>
                  </div>

                  <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <hr className="border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 mb-6" />

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs text-[#0f2a2a]/80 dark:text-[#d9faf4]/80 leading-relaxed"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#00bfa6]/15 flex items-center justify-center text-[#00bfa6] shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Action Button */}
                <Link
                  to={plan.ctaLink}
                  className={`w-full py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? "bg-[#00bfa6] text-[#0f2a2a] shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_35px_rgba(0,191,166,0.6)] hover:scale-[1.02]"
                      : "bg-[#d9faf4]/70 dark:bg-[#0f2a2a]/80 border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 text-[#0f2a2a] dark:text-[#d9faf4] hover:border-[#00bfa6] hover:text-[#00bfa6]"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 text-center text-xs text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
          <p>
            🔒 All plans include enterprise identity privacy, zero public data model training, and AES-256 encrypted storage.
          </p>
        </div>
      </div>
    </section>
  );
}
