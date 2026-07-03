import React from "react";
import { AlertOctagon } from "lucide-react";

export const PenaltyCallout = ({ title = "Miss this and it costs you", body, reference }) => (
  <div
    data-testid="penalty-callout"
    className="relative border border-seal/30 bg-seal/[0.06] border-l-4 border-l-seal p-5 sm:p-6"
  >
    <div className="flex items-start gap-3">
      <AlertOctagon className="text-seal shrink-0 mt-0.5" size={22} />
      <div className="flex-1">
        <div className="mono text-[11px] uppercase tracking-[0.2em] text-seal font-semibold">
          Penalty Notice
        </div>
        <h4 className="font-display text-xl text-ink mt-1">{title}</h4>
        <p className="text-sm text-ink/80 leading-relaxed mt-2">{body}</p>
        {reference && (
          <div className="mt-3 mono text-xs text-slate2">Ref: {reference}</div>
        )}
      </div>
    </div>
  </div>
);
