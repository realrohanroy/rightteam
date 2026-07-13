import React from "react";
import { AlertOctagon, Check } from "lucide-react";
import { Link } from "react-router-dom";

const severityStyles = {
  high: "border-l-seal bg-seal/[0.04]",
  medium: "border-l-caution bg-caution/[0.05]",
  low: "border-l-approve bg-approve/[0.04]",
};

export const StaticComplianceTable = ({ entity, entityLabel, filings }) => {
  const highCount = filings.filter((f) => f.severity === "high").length;

  return (
    <div className="border border-ink/15 bg-white rounded-sm w-full max-w-4xl mx-auto my-8">
      <div className="border-b border-ink/10 px-5 py-4 flex items-center justify-between">
        <div className="mono text-[11px] uppercase tracking-widest text-slate2">
          Statutory filing register — {entityLabel}
        </div>
        <div className="mono text-[11px] uppercase tracking-widest text-seal font-semibold flex items-center gap-1">
          <AlertOctagon size={12} /> {highCount} high-severity filings
        </div>
      </div>

      <div className="px-5 pt-4 pb-2 mono text-[11px] text-slate2 uppercase tracking-widest border-b border-ink/10">
        Ref: RT/RISK/{entity.toUpperCase()}/ALL · {filings.length} base filings apply
      </div>
      
      <ol data-testid="static-risk-results">
        {filings.map((f, i) => (
          <li
            key={i}
            className={`grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-4 border-b last:border-b-0 border-ink/10 border-l-4 ${severityStyles[f.severity]}`}
          >
            <span className="mono text-[10px] uppercase tracking-widest text-slate2 pt-1 w-8">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="font-semibold text-ink text-sm">{f.name}</div>
              <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-1">
                Due: {f.due}
              </div>
              <div className="text-xs text-ink/80 mt-2 flex items-start gap-1.5">
                <AlertOctagon size={12} className="text-seal mt-0.5 shrink-0" />
                <span>Penalty: {f.penalty}</span>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`mono text-[10px] uppercase tracking-widest font-semibold ${
                  f.severity === "high" ? "text-seal" : f.severity === "medium" ? "text-caution" : "text-approve"
                }`}
              >
                {f.severity}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="px-5 py-4 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-alt">
        <div className="mono text-[10px] uppercase tracking-widest text-slate2 flex items-center gap-1.5 text-center sm:text-left">
          <Check size={12} className="text-approve shrink-0" strokeWidth={3} />
          <span>Need help with these filings?</span>
        </div>
        <Link to="/quote" className="btn-primary w-full sm:w-auto justify-center">
          Get a fixed quote
        </Link>
      </div>
    </div>
  );
};
