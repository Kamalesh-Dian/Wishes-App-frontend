import { Check, Sparkles, Zap, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      generations: "8 Generations",
      badge: null,
      description: "Ideal for trying out neural likeness celebration scenes for personal moments.",
      icon: Sparkles,
      features: [
        "5 AI image generations",
        "3 animated celebration video generations",
        "Total 8 generations included",
        "Biometric facial likeness lock",
        "Standard celebration presets",
        "Direct image & video download",
        "Single-wish creation only",
        "No event schedule option",
        "No OneDrive connection",
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
      description: "100 generations with event scheduling for active celebrants and growing teams.",
      icon: Zap,
      features: [
        "100 total generations (75 images, 25 videos)",
        "75 4K studio image generations (300 DPI)",
        "25 animated celebration video generations",
        "Event scheduling included (calendar & milestones)",
        "Manual Excel roster import (.xlsx)",
        "Priority FLUX GPU generation queue",
        "Direct email & WhatsApp dispatch",
        "No OneDrive option (manual roster only)",
      ],
      ctaText: "Get Started with Pro ($5)",
      ctaLink: "/create",
      highlighted: true,
    },
    {
      name: "Ultimate",
      price: "$12",
      period: "per month",
      generations: "200 Generations",
      badge: "NO RESTRICTIONS",
      description: "Full workplace automation engine with 24/7 automated OneDrive synchronization.",
      icon: Users,
      features: [
        "200 total generations (150 images, 50 videos)",
        "150 4K Ultra-HD image generations",
        "50 animated celebration video generations",
        "No restrictions on features",
        "Full event scheduling & milestone tracking",
        "Automated OneDrive & Microsoft 365 cloud sync",
        "Automated local 9:00 AM delivery to inboxes",
        "Multi-recipient team broadcast & VIP support",
      ],
      ctaText: "Get Ultimate ($12)",
      ctaLink: "/onedrive",
      highlighted: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative z-10 w-full bg-transparent text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300 scroll-mt-24"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00bfa6]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/[0.05] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={12} className="text-[#FF5A52]" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF5A52]">
              Simple & Transparent
            </span>
          </div>

          <h2 className="font-sans text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.08]">
            Plans designed to celebrate{" "}
            <span className="text-[#00bfa6]">everyone.</span>
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
