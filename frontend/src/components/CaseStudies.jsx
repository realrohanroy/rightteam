import React from "react";

const ENGAGEMENTS = [
  {
    title: "Precision Manufacturing Partner",
    desc: "Precision manufacturing partner is active across aerospace, defense and manufacturing sectors.",
    quote: "RightTeam sorted three years of ROC neglect in six weeks. They handled the compounding negotiation themselves — I never met the registrar.",
    author: "— Finance Director",
    company: "Precision Manufacturing · Pune"
  },
  {
    title: "One Person Company (OPC) Registration",
    desc: "One Person company launch for a fast-growing creative design consulting firm.",
    quote: "One Team handled everything from name approval to PAN/TAN/GSTIN. We got our incorporation certificate in 7 days.",
    author: "— Director",
    company: "Creative Agency · Mumbai"
  },
  {
    title: "Regional Logistics & Warehousing LLP",
    desc: "Managing nationwide logistics, warehousing, and supply chain solutions for corporate clients.",
    quote: "Four vendors, four spreadsheets, four excuses. RightTeam collapsed all of that into one dashboard and one manager.",
    author: "— Chief Financial Officer",
    company: "Logistics · Gurugram"
  }
];

export const CaseStudies = () => (
  <section 
    className="py-24 relative overflow-hidden bg-cover bg-center" 
    style={{ backgroundImage: "url('/engagements_bg.png')" }}
    data-testid="case-studies"
  >
    {/* Subtle dark overlay for text contrast */}
    <div className="absolute inset-0 bg-[#050B14]/50 pointer-events-none" />

    <div className="container-x relative z-10">
      {/* Centered Title */}
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
          Recent Engagements
        </h2>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ENGAGEMENTS.map((cs, i) => (
          <article 
            key={i} 
            className="relative flex flex-col rounded-2xl bg-gradient-to-br from-[#12102C]/90 to-[#2A0E3E]/70 border border-purple-500/20 p-8 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-[#12102C] hover:to-[#2A0E3E]/90 transition-all duration-500 shadow-2xl group"
          >
            {/* Ambient card corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-3xl pointer-events-none rounded-full transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
            
            {/* Title & Description */}
            <div className="flex-grow">
              <h3 className="font-display text-xl text-white font-bold leading-snug">
                {cs.title}
              </h3>
              <p className="text-sm text-white/50 mt-3.5 leading-relaxed font-medium">
                {cs.desc}
              </p>
            </div>

            {/* Cyan Quote Icon */}
            <div className="font-display text-4xl text-[#38BDF8] opacity-70 leading-none mt-6 select-none">
              “
            </div>

            {/* Quote Body */}
            <blockquote className="text-sm text-white/85 italic mt-2 leading-relaxed">
              {cs.quote}
            </blockquote>

            {/* Figcaption / Author */}
            <figcaption className="mt-6 pt-5 border-t border-white/5 flex flex-col">
              <span className="text-sm font-semibold text-white/95">
                {cs.author}
              </span>
              <span className="text-xs text-white/40 font-mono tracking-wider uppercase mt-1">
                {cs.company}
              </span>
            </figcaption>
          </article>
        ))}
      </div>
    </div>
  </section>
);
