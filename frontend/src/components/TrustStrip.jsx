import React from "react";
import { Shield, Star, Users, Clock } from "lucide-react";

const items = [
  { icon: Shield, label: "MCA & GST Registered", sub: "As practising consultants" },
  { icon: Star, label: "4.8 / 5 · 1,200 reviews", sub: "Google & Justdial" },
  { icon: Users, label: "8,400+ businesses served", sub: "Across 24 states" },
  { icon: Clock, label: "Filed by due date, always", sub: "Or your fee refunded" },
];

export const TrustStrip = () => (
  <div className="border-y border-ink/10 bg-alt" data-testid="trust-strip">
    <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
      {items.map((it, i) => (
        <div key={i} className="py-6 px-4 flex items-start gap-3">
          <it.icon size={20} className="text-approve mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-ink leading-tight">{it.label}</div>
            <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">
              {it.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
