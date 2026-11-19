import { Users, Cloud, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CorporateWishesSection() {
  const stats = [
    { value: "99.4%", label: "Open Rate", detail: "Recipients cherish their custom card" },
    { value: "50K+", label: "Celebrations Sent", detail: "Birthdays, Diwali & milestones" },
    { value: "4.9 / 5", label: "Sentiment Rating", detail: "Warmth felt by team members" },
    { value: "0 hrs", label: "Manual Effort", detail: "Full OneDrive & calendar sync" },
  ];

  const automatedTimeline = [
    {
      time: "08:55 AM",
      title: "Calendar Milestone Detected",
      desc: "5th Work Anniversary identified from connected OneDrive Excel workbook.",
      status: "Synced",
      color: "text-[#00bfa6]",
    },
    {
      time: "08:58 AM",
      title: "Atmospheric Scene Synthesized",
      desc: "Wishes AI generates 4K anniversary scene preserving Arjun’s true likeness.",
      status: "Rendered",
      color: "text-[#00bfa6]",
    },
    {
      time: "09:00 AM",
      title: "Scheduled Delivery Complete",
      desc: "Personalized greeting email delivered to arjun@company.com and team channel.",
      status: "Delivered",
      color: "text-[#00bfa6]",
    },
  ];

  return (
    <section
      id="corporate"
      className="relative w-full bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] py-24 sm:py-32 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 transition-colors duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#00bfa6]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#00bfa6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00bfa6] mb-3">
            <Users size={13} className="text-[#00bfa6]" />
            <span>Built For Teams & Organizations</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.1]">
            Never miss an employee milestone,{" "}
            <span className="italic text-[#00bfa6] font-semibold">ever again.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
            Connect your corporate OneDrive or HR spreadsheet once. Wishes AI automatically
            generates tailored celebration scenes and sends them on time at local 9:00 AM.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Left Column: Live Automation Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 flex items-center justify-center text-[#00bfa6]">
                    <Cloud size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4]">OneDrive Auto-Sync</h4>
                    <p className="text-[10px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-mono">Employees_2026.xlsx • Connected</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00bfa6]/15 text-[#00bfa6]">
                  <CheckCircle size={11} /> Active 24/7
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {automatedTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00bfa6] shadow-[0_0_8px_#00bfa6]" />
                      {idx !== automatedTimeline.length - 1 && (
                        <div className="w-px h-full bg-[#0f2a2a]/15 dark:bg-[#d9faf4]/15 my-1" />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-semibold">{item.time}</span>
                        <span className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4]">{item.title}</span>
                      </div>
                      <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-6 rounded-2xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-white/60 dark:bg-[#143838]/60 backdrop-blur-md">
              <p className="font-serif italic text-sm text-[#0f2a2a] dark:text-[#d9faf4] leading-relaxed">
                “Our team of 340 distributed engineers used to receive generic Slack messages.
                With Wishes AI, each person gets a stunning, personalized celebration card that feels
                like a thoughtful gift from leadership.”
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-bold text-[#00bfa6]">Elena Rostova</span>
                <span className="text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">VP of People Operations • CloudStack Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Grid & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-3xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl flex flex-col justify-between min-h-[140px] shadow-sm"
                >
                  <div className="font-serif text-3xl sm:text-4xl text-[#00bfa6] font-normal tracking-tight">
                    {stat.value}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4] uppercase tracking-wider mt-2">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 mt-0.5">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise Action Card */}
            <div className="p-8 rounded-3xl border border-[#00bfa6]/30 bg-white dark:bg-[#143838] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-serif text-2xl text-[#0f2a2a] dark:text-[#d9faf4]">
                  Automate for your workplace
                </h4>
                <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mt-1">
                  Connect your HR roster or spreadsheet in under 2 minutes.
                </p>
              </div>

              <Link
                to="/onedrive"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.6)] transition-all hover:scale-105"
              >
                <span>Connect Calendar</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
