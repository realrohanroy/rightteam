import React from "react";
import { useCountUp } from "../hooks/useCountUp";

/** Individual animated stat item */
const AnimatedStat = ({ target, suffix = "", prefix = "", label, sublabel }) => {
  const [count, ref] = useCountUp(target, 2000);
  return (
    <div ref={ref} className="py-6 px-4 flex flex-col gap-1">
      <div className="stat-figure text-2xl sm:text-3xl">
        {prefix}{count.toLocaleString("en-IN")}{suffix}
      </div>
      <div className="font-medium text-sm text-ink leading-tight mt-0.5">
        {label}
      </div>
      <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-0.5">
        {sublabel}
      </div>
    </div>
  );
};

/** Static (non-numeric) stat item */
const StaticStat = ({ figure, label, sublabel }) => (
  <div className="py-6 px-4 flex flex-col gap-1">
    <div className="stat-figure text-lg sm:text-xl leading-tight">
      {figure}
    </div>
    <div className="font-medium text-sm text-ink leading-tight mt-0.5">
      {label}
    </div>
    <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-0.5">
      {sublabel}
    </div>
  </div>
);

export const CredibilityBar = () => (
  <div className="border-y border-ink/10 bg-white" data-testid="credibility-bar">
    <div className="container-x">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
        <StaticStat
          figure="Est. 2019"
          label="Operating for 7+ years"
          sublabel="Founded in Mumbai"
        />
        <AnimatedStat
          target={8400}
          suffix="+"
          label="Businesses served"
          sublabel="Across 24 states"
        />
        <AnimatedStat
          target={41000}
          suffix="+"
          label="Filings on record"
          sublabel="And counting"
        />
        <StaticStat
          figure="In-house CAs, CS & IP"
          label="No outsourcing, no interns"
          sublabel="Qualified professionals only"
        />
      </div>
    </div>
  </div>
);
