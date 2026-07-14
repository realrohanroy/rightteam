import React from "react";
import { useCountUp } from "../hooks/useCountUp";

/** Individual animated stat item */
const AnimatedStat = ({ target, suffix = "", prefix = "", label, sublabel, className = "" }) => {
  const [count, ref] = useCountUp(target, 2000);
  return (
    <div ref={ref} className={`py-6 px-4 flex flex-col gap-1 ${className}`}>
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
const StaticStat = ({ figure, label, sublabel, className = "" }) => (
  <div className={`py-6 px-4 flex flex-col gap-1 ${className}`}>
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
      <div className="grid grid-cols-2 md:grid-cols-4">
        <StaticStat
          figure="Est. 2026"
          label="Trusted Since Day One"
          sublabel="FOUNDED IN AHMEDABAD"
          className="border-r border-b md:border-b-0 border-ink/10"
        />
        <AnimatedStat
          target={500}
          suffix="+"
          label="Businesses served"
          sublabel="ACROSS INDIA"
          className="border-b md:border-r md:border-b-0 border-ink/10"
        />
        <AnimatedStat
          target={50}
          suffix="+"
          label="Compliance & Legal SOlutions"
          sublabel="FOR STARTUPS & MSMEs"
          className="border-r border-ink/10"
        />
        <StaticStat
          figure="In-house CAs, CS & IP"
          label="No outsourcing, no interns"
          sublabel="Qualified professionals only"
          className=""
        />
      </div>
    </div>
  </div>
);
