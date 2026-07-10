import React from "react";
import { Check, X, Minus } from "lucide-react";
import { COMPARISON } from "../data/marketing";

const iconFor = (val) => {
  const v = String(val).toLowerCase();
  if (v === "yes") return <Check className="text-approve" size={18} strokeWidth={3} />;
  if (v === "no" || v.startsWith("no ")) return <X className="text-seal" size={18} strokeWidth={2.5} />;
  if (v === "n/a" || v.startsWith("outsourced") || v.startsWith("rare") || v.startsWith("sometimes"))
    return <Minus className="text-slate2" size={18} strokeWidth={2.5} />;
  return null;
};

export const ComparisonTable = () => (
  <section className="section-alt py-28 border-y border-ink/10" data-testid="comparison-table">
    <div className="container-x">
      <div className="max-w-3xl">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          The alternatives — side by side
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
          RightTeam vs. DIY vs. Generic CA vs. Portals.
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse bg-white border border-ink/15 text-sm">
          <thead>
            <tr>
              <th className="text-left p-4 mono text-[10px] uppercase tracking-widest text-slate2 border-b border-ink/15 w-[38%]">
                Criterion
              </th>
              {COMPARISON.columns.map((c) => (
                <th
                  key={c.key}
                  className={`text-left p-4 border-b border-ink/15 ${
                    c.highlight ? "bg-ink text-white" : "text-ink"
                  }`}
                >
                  <div className={`font-display text-base ${c.highlight ? "text-white" : "text-ink"}`}>
                    {c.label}
                  </div>
                  {c.highlight && (
                    <div className="mono text-[10px] uppercase tracking-widest text-brand mt-1">
                      Our approach
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map((r, i) => (
              <tr key={i} className="border-b border-ink/10 last:border-b-0 hover:bg-brand/[0.02] transition-colors">
                <td className="p-4 text-ink font-medium">{r.feature}</td>
                {COMPARISON.columns.map((c) => (
                  <td
                    key={c.key}
                    className={`p-4 align-top ${c.highlight ? "bg-ink/[0.03]" : ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {iconFor(r[c.key])}
                      <span
                        className={`text-sm ${
                          String(r[c.key]).toLowerCase() === "yes" ? "text-ink font-medium" : "text-slate2"
                        }`}
                      >
                        {r[c.key]}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
