import React, { useState, useEffect } from "react";

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

export const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto cycle cards every 4 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ENGAGEMENTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section 
      className="py-24 relative overflow-hidden bg-cover bg-center" 
      style={{ backgroundImage: "url('/engagements_bg.png')" }}
      data-testid="case-studies"
    >
      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-[#050B14]/50 pointer-events-none" />

      <div className="container-x relative z-10 lg:max-w-7xl">
        {/* Centered Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
            Recent Engagements
          </h2>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative overflow-hidden lg:overflow-visible">
          <div 
            className="flex transition-transform duration-500 ease-in-out lg:grid lg:grid-cols-3 lg:gap-8 lg:!transform-none lg:items-stretch" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {ENGAGEMENTS.map((cs, i) => (
              <div key={i} className="w-full shrink-0 px-2 sm:px-4 lg:w-auto lg:px-0 lg:flex lg:flex-col">
                <article 
                  className="relative flex flex-col h-full rounded-2xl bg-gradient-to-br from-[#12102C]/90 to-[#2A0E3E]/70 border border-purple-500/20 p-6 sm:p-7 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-[#12102C] hover:to-[#2A0E3E]/90 transition-all duration-500 shadow-2xl group min-h-[280px]"
                >
                  {/* Ambient card corner glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-3xl pointer-events-none rounded-full transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
                  
                  {/* Title & Description */}
                  <div className="flex-grow">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-bold leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-3.5 leading-relaxed font-medium">
                      {cs.desc}
                    </p>
                  </div>

                  {/* Cyan Quote Icon */}
                  <div className="font-display text-3xl text-[#38BDF8] opacity-70 leading-none mt-4 select-none">
                    “
                  </div>
 
                  {/* Quote Body */}
                  <blockquote className="text-sm text-white/85 italic mt-1 leading-relaxed">
                    {cs.quote}
                  </blockquote>
 
                  {/* Figcaption / Author */}
                  <figcaption className="mt-4 pt-4 border-t border-white/5 flex flex-col">
                    <span className="text-sm font-semibold text-white/95">
                      {cs.author}
                    </span>
                    <span className="text-xs text-white/40 font-mono tracking-wider uppercase mt-0.5">
                      {cs.company}
                    </span>
                  </figcaption>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Pagination Indicator Dots */}
        <div className="flex lg:hidden justify-center items-center gap-3 mt-8">
          {ENGAGEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                activeIndex === i 
                  ? "bg-white scale-125" 
                  : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              data-testid={`case-study-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
