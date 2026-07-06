import React from "react";
import { Shield, Star, Users, Clock } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

const TrustItem = ({ icon: Icon, label, sub, animate, target, suffix }) => {
  const [count, ref] = useCountUp(animate ? target : 0, 1600);
  return (
    <div ref={ref} className="py-6 px-4 flex items-start gap-3">
      <Icon size={20} className="text-coral mt-0.5 shrink-0" style={{ color: "#E8632A" }} />
      <div>
        <div className="text-sm font-semibold text-ink leading-tight">
          {animate ? (
            <span className="stat-figure">
              {count.toLocaleString("en-IN")}{suffix}
            </span>
          ) : (
            label
          )}
        </div>
        <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">
          {sub}
        </div>
      </div>
    </div>
  );
};

export const TrustStrip = () => (
  <div className="border-y border-ink/10 bg-alt" data-testid="trust-strip">
    <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
      <TrustItem icon={Shield} label="MCA & GST Registered" sub="As practising consultants" />
      <TrustItem icon={Star} label="4.8 / 5 · 1,200 reviews" sub="Google & Justdial" />
      <TrustItem icon={Users} label="8,400+ businesses served" sub="Across 24 states"
        animate target={8400} suffix="+ businesses" />
      <TrustItem icon={Clock} label="Filed by due date, always" sub="Or your fee refunded" />
    </div>
  </div>
);
