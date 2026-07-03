import React from "react";
import { CASE_STUDIES } from "../data/marketing";
import { ArrowRight } from "lucide-react";
import { CornerSeal } from "./Seal";

export const CaseStudies = () => (
  <section className="container-x pt-20" data-testid="case-studies">
    <div className="max-w-3xl">
      <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
        Case studies · Named engagements
      </div>
      <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
        Recent engagements. Named clients. Documented outcomes.
      </h2>
    </div>

    <div className="mt-10 grid md:grid-cols-3 gap-5">
      {CASE_STUDIES.map((cs, i) => (
        <article key={i} className="paper-card p-6 flex flex-col" data-testid={`case-study-${i}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="mono text-[10px] uppercase tracking-widest text-slate2">
                {cs.industry}
              </div>
              <h3 className="font-display text-lg text-ink mt-2 leading-tight">{cs.company}</h3>
            </div>
            <CornerSeal size={28} color="#1E5631" />
          </div>

          <div className="mt-4">
            <div className="mono text-[10px] uppercase tracking-widest text-seal font-semibold">The challenge</div>
            <p className="text-sm text-ink/85 mt-1">{cs.challenge}</p>
          </div>

          <div className="mt-4">
            <div className="mono text-[10px] uppercase tracking-widest text-approve font-semibold">The outcome</div>
            <p className="text-sm text-ink font-medium mt-1">{cs.outcome}</p>
          </div>

          <blockquote className="mt-5 pt-4 border-t border-ink/10 text-sm text-ink/80 italic leading-relaxed">
            "{cs.quote}"
          </blockquote>
          <figcaption className="mt-3 mono text-[10px] uppercase tracking-widest text-slate2">
            {cs.person} · Ref {cs.reference}
          </figcaption>
        </article>
      ))}
    </div>
  </section>
);
