import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { CornerSeal } from "./Seal";

export const ServiceCard = ({ service }) => (
  <Link
    to={`/service/${service.slug}`}
    data-testid={`service-card-${service.slug}`}
    className="paper-card flex flex-col p-6 group"
  >
    <div className="flex items-start justify-between">
      <span className="mono text-[11px] uppercase tracking-widest text-slate2">
        RT/SVC/{service.slug.split("-").slice(0, 2).join("-").toUpperCase()}
      </span>
      <CornerSeal color="#12203D" />
    </div>

    <h3 className="font-display text-xl text-ink mt-4 leading-tight">
      {service.name}
    </h3>
    <p className="text-sm text-slate2 mt-2 leading-relaxed flex-1">
      {service.oneLine}
    </p>

    <div className="mt-5 pt-4 border-t border-ink/10 flex items-end justify-between">
      <div>
        <div className="mono text-[11px] uppercase tracking-widest text-slate2">
          Starting at
        </div>
        <div className="font-display text-2xl text-ink font-bold leading-none mt-1">
          {service.startingPrice}
        </div>
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-seal transition-colors">
        View details
        <ArrowUpRight size={16} />
      </span>
    </div>

    <div className="mt-4 flex items-center gap-2 text-xs text-approve">
      <Check size={14} strokeWidth={3} />
      <span className="mono uppercase tracking-widest">Filed by a dedicated manager</span>
    </div>
  </Link>
);
