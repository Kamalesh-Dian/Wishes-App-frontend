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
      color: "text-[#2DD4BF]",
    },
    {
      time: "08:58 AM",
      title: "Atmospheric Scene Synthesized",
      desc: "Wishes AI generates 4K anniversary scene preserving Arjun’s true likeness.",
      status: "Rendered",
      color: "text-[#F5B24A]",
    },
    {
      time: "09:00 AM",
      title: "Scheduled Delivery Complete",
      desc: "Personalized greeting email delivered to arjun@company.com and team channel.",
      status: "Delivered",
      color: "text-[#F5B24A]",
    },
  ];

  return (
    <section
      id="corporate"
      className="relative w-full bg-[#0A0A0C] text-[#F4F1EA] py-24 sm:py-32 px-6 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#F5B24A]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B24A] mb-3">
            <Users size={13} className="text-[#F5B24A]" />
            <span>Built For Teams & Organizations</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal tracking-tight text-[#F4F1EA] leading-[1.1]">
            Never miss an employee milestone,{" "}
            <span className="italic text-[#F5B24A]">ever again.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#8E8A82] leading-relaxed">
            Connect your corporate OneDrive or HR spreadsheet once. Wishes AI automatically
            generates tailored celebration scenes and sends them on time at local 9:00 AM.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Left Column: Live Automation Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#121217] shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.07]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5B24A]/10 border border-[#F5B24A]/30 flex items-center justify-center text-[#F5B24A]">
                    <Cloud size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F4F1EA]">OneDrive Auto-Sync</h4>
                    <p className="text-[10px] text-[#8E8A82] font-mono">Employees_2026.xlsx • Connected</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#2DD4BF]/10 text-[#2DD4BF]">
                  <CheckCircle size={11} /> Active 24/7
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {automatedTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F5B24A] shadow-[0_0_8px_#F5B24A]" />
                      {idx !== automatedTimeline.length - 1 && (
                        <div className="w-px h-full bg-white/10 my-1" />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#8E8A82]">{item.time}</span>
                        <span className="text-xs font-bold text-[#F4F1EA]">{item.title}</span>
                      </div>
                      <p className="text-xs text-[#8E8A82] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="font-serif italic text-sm text-[#F4F1EA] leading-relaxed">
                “Our team of 340 distributed engineers used to receive generic Slack messages.
                With Wishes AI, each person gets a stunning, personalized celebration card that feels
                like a thoughtful gift from leadership.”
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-bold text-[#F5B24A]">Elena Rostova</span>
                <span className="text-[#8E8A82]">VP of People Operations • CloudStack Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Grid & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#121217] flex flex-col justify-between min-h-[140px]"
                >
                  <div className="font-serif text-3xl sm:text-4xl text-[#F5B24A] font-normal tracking-tight">
                    {stat.value}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F4F1EA] uppercase tracking-wider mt-2">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-[#8E8A82] mt-0.5">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise Action Card */}
            <div className="p-8 rounded-2xl border border-[#F5B24A]/30 bg-gradient-to-br from-[#F5B24A]/10 via-[#121217] to-[#0A0A0C] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <h4 className="font-serif text-2xl text-[#F4F1EA]">
                  Automate for your workplace
                </h4>
                <p className="text-xs text-[#8E8A82] mt-1">
                  Connect your HR roster or spreadsheet in under 2 minutes.
                </p>
              </div>

              <Link
                to="/onedrive"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5B24A] text-[#0A0A0C] text-xs font-bold hover:shadow-[0_0_24px_rgba(245,178,74,0.4)] transition-all hover:scale-105"
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
