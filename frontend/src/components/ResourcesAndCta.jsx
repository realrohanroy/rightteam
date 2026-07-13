import React from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Terminal, 
  ShieldCheck, 
  Mountain, 
  CircleDot, 
  Globe, 
  ChevronUp,
  ArrowRight
} from "lucide-react";
import { DuotoneImage } from "./DuotoneImage";

const ARTICLES = [
  {
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    category: "Tax Law",
    categoryColor: "bg-[#2563EB]", // Royal Blue
    title: "Maximizing Deductions: A Guide for Small Businesses",
    href: "/resources/maximizing-deductions",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    category: "GST",
    categoryColor: "bg-[#10B981]", // Emerald Green
    title: "Understanding the Latest GST Compliance Changes",
    href: "/resources/gst-compliance-changes",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    category: "Audit Prep",
    categoryColor: "bg-[#F97316]", // Vivid Orange
    title: "Preparing for Your Next Financial Audit",
    href: "/resources/preparing-financial-audit",
  },
];

const LOGOS = [
  { name: "NextGen Finance", icon: TrendingUp },
  { name: "TechFront", icon: Terminal },
  { name: "Prime Ventures", icon: ShieldCheck },
  { name: "Summit Group", icon: Mountain },
  { name: "Innovate Inc.", icon: CircleDot },
  { name: "Global Partners", icon: Globe },
  { name: "Apex Solutions", icon: ChevronUp },
];

export const ResourcesAndCta = () => {
  return (
    <div className="w-full">
      {/* 1. Resources & Insights Section */}
      <section className="bg-white py-20" data-testid="resources-insights-section">
        <div className="container-x">
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#0B1E3D] mb-10 text-left">
            Resources & Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => {
              const categoryHoverClass = 
                article.category === "Tax Law" ? "hover:text-[#2563EB]" :
                article.category === "GST" ? "hover:text-[#10B981]" : "hover:text-[#F97316]";

              return (
                <div key={index} className="flex flex-col group">
                  {/* Image container */}
                  <div className="overflow-hidden rounded-xl aspect-[16/10] bg-[#050B14] relative shadow-sm">
                    <DuotoneImage 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Badge */}
                  <span className={`text-white text-[11px] font-bold px-2.5 py-1 rounded w-fit mt-5 tracking-wide ${article.categoryColor}`}>
                    {article.category}
                  </span>

                  {/* Title */}
                  <Link 
                    to={article.href}
                    className={`font-sans text-lg font-bold text-[#0B1E3D] mt-3.5 leading-snug transition-colors duration-300 ${categoryHoverClass}`}
                  >
                    {article.title}
                  </Link>

                  {/* Link */}
                  <Link
                    to={article.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1E3D] mt-4 w-fit transition-colors duration-300 ${categoryHoverClass}`}
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Logo Wall Section */}
      <section className="bg-[#F3F4F6] py-8 border-y border-slate-200/50" data-testid="credibility-logo-wall">
        <div className="container-x">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-6 gap-x-4 items-center justify-items-center">
            {LOGOS.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-slate2 hover:text-[#0B1E3D] transition-colors duration-300">
                  <Icon size={18} className="shrink-0" strokeWidth={2} />
                  <span className="font-sans font-semibold text-[13px] tracking-tight">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Ready to Start CTA Section */}
      <section className="bg-[#050B14] py-20 text-center relative overflow-hidden" data-testid="ready-to-start-cta">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E3D]/20 to-transparent pointer-events-none" />
        <div className="container-x relative z-10 flex flex-col items-center">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-4.5xl font-bold text-white tracking-tight max-w-2xl leading-tight">
            Ready to Start Your Financial Journey with RightTeam?
          </h2>
          <p className="text-white/70 text-sm sm:text-base mt-4 max-w-md font-medium">
            Join hundreds of businesses optimizing their growth.
          </p>
          <Link
            to="/quote"
            className="bg-[#3B2FC9] hover:bg-[#2F24B2] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded mt-8 transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-900/40"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};
