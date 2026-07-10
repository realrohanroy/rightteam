/**
 * ResourceCards.jsx
 * Four content guide cards with Lucide icon thumbnails replacing hand-coded SVGs.
 * Links are stub hrefs — replace with real blog/guide URLs before launch.
 */
import React from "react";
import { ArrowRight, CalendarCheck, Building2, Shield, Wallet } from "lucide-react";

const RESOURCES = [
  {
    icon: Building2,
    title: "Company Registration: The Full Process",
    href: "/resources/company-registration-guide",
    tag: "Incorporation",
    color: "#E8522B", // Brand Orange-Red
  },
  {
    icon: CalendarCheck,
    title: "GST Filing Deadlines Explained",
    href: "/resources/gst-filing-deadlines",
    tag: "Tax & GST",
    color: "#4A90E2", // Soft Blue for variety
  },
  {
    icon: Shield,
    title: "Trademark vs Copyright: What You Need",
    href: "/resources/trademark-vs-copyright",
    tag: "IP & Brand",
    color: "#E8B92B", // Warm Gold
  },
  {
    icon: Wallet,
    title: "Payroll Compliance in India: 2025 Guide",
    href: "/resources/payroll-compliance-india",
    tag: "Payroll",
    color: "#1E5631", // Success Green
  },
];

export const ResourceCards = () => (
  <section className="py-28 relative" data-testid="resource-cards">
    {/* Subtle top border separating sections within the dark breakaway */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    
    <div className="container-x relative z-10">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-16">
        <div className="max-w-2xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
            Compliance guides
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-4 leading-tight">
            Know what's due before it's overdue.
          </h2>
        </div>
        <a
          href="/resources"
          className="text-sm underline underline-offset-4 decoration-brand decoration-2 text-white hover:text-brand transition-colors"
        >
          All guides →
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RESOURCES.map((r, i) => {
          const Icon = r.icon;
          return (
            <a
              key={i}
              href={r.href}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
              data-testid={`resource-card-${i}`}
            >
              {/* Dynamic ambient hover glow based on the card's accent color */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700" 
                style={{ backgroundColor: r.color }}
              />

              {/* Thumbnail Area */}
              <div className="p-8 flex items-center justify-center relative z-10">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: `${r.color}15` }} // 15% opacity background
                >
                  <Icon size={32} color={r.color} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 pt-2 flex flex-col flex-1 relative z-10">
                <div 
                  className="mono text-[10px] uppercase tracking-widest font-semibold mb-3"
                  style={{ color: r.color }}
                >
                  {r.tag}
                </div>
                <h3 className="font-display text-xl text-white leading-snug flex-1">
                  {r.title}
                </h3>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                  Read guide <ArrowRight size={14} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);
