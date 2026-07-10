import React from "react";
import { CASE_STUDIES } from "../data/marketing";
import { CornerSeal } from "./Seal";

export const CaseStudies = () => (
  <section className="container-x py-28 relative" data-testid="case-studies">
    <div className="max-w-3xl relative z-10">
      <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
        Case studies
      </div>
      <h2 className="font-display text-4xl sm:text-5xl text-white mt-4 leading-tight">
        Recent engagements.
      </h2>
    </div>

    <div className="mt-16 grid md:grid-cols-3 gap-6 relative z-10">
      {CASE_STUDIES.map((cs, i) => (
        <article 
          key={i} 
          className="relative group flex flex-col rounded-[20px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 hover:bg-white/[0.04] transition-all duration-500" 
          data-testid={`case-study-${i}`}
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="mono text-[10px] uppercase tracking-widest text-white/40">
                {cs.industry}
              </div>
              <h3 className="font-display text-xl text-white mt-2 leading-tight">{cs.company}</h3>
            </div>
            <CornerSeal size={28} color="rgba(255,255,255,0.2)" />
          </div>

          <div className="mt-8 relative z-10">
            <div className="mono text-[10px] uppercase tracking-widest text-white/40 font-semibold">The challenge</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">{cs.challenge}</p>
          </div>

          <div className="mt-6 relative z-10">
            <div className="mono text-[10px] uppercase tracking-widest text-brand font-semibold">The outcome</div>
            <p className="text-sm text-white font-medium mt-2 leading-relaxed">{cs.outcome}</p>
          </div>

          <blockquote className="mt-8 pt-6 border-t border-white/10 text-sm text-white/50 italic leading-relaxed relative z-10">
            "{cs.quote}"
          </blockquote>
          <figcaption className="mt-4 mono text-[10px] uppercase tracking-widest text-white/30 relative z-10">
            {cs.person} · Ref {cs.reference}
          </figcaption>
        </article>
      ))}
    </div>
  </section>
);
