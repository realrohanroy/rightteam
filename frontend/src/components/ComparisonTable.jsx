import React from "react";
import { Check } from "lucide-react";
import { COMPARISON } from "../data/marketing";

export const ComparisonTable = () => (
  <section className="section-alt py-24 border-y border-ink/10" data-testid="comparison-table">
    <div className="container-x">
      {/* Centered Heading with brand-consistent elements */}
      <div className="text-center mb-12">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          The alternatives — side by side
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
          RightTeam vs Others
        </h2>
      </div>

      <div className="mt-10 overflow-x-visible">
        <table className="w-full min-w-0 border-separate border-spacing-0 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm text-xs sm:text-sm table-fixed">
          <thead>
            <tr className="bg-ink">
              <th className="text-left p-3 sm:p-4 font-semibold text-white border-r border-white/10 w-[46%] sm:w-[40%]">
                Feature vs Benefit
              </th>
              {COMPARISON.columns.map((c) => {
                const isHighlight = c.highlight;
                return (
                  <th
                    key={c.key}
                    className={`text-center p-2 sm:p-4 font-display text-xs sm:text-base text-white border-r border-white/10 last:border-r-0 relative ${
                      isHighlight
                        ? "border-t-4 border-l-4 border-r-4 border-[#A855F7] rounded-t-2xl z-10 shadow-[0_-6px_15px_rgba(168,85,247,0.35),-6px_0_15px_rgba(168,85,247,0.35),6px_0_15px_rgba(168,85,247,0.35)]"
                        : ""
                    }`}
                  >
                    {c.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map((r, rowIndex) => {
              const isLastRow = rowIndex === COMPARISON.rows.length - 1;
              return (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Criterion Cell */}
                  <td className="p-2 sm:p-4 text-[#0B1E3D] font-medium border-b border-r border-slate-100 last:border-r-0">
                    {r.feature}
                  </td>
                  
                  {/* Data Cells */}
                  {COMPARISON.columns.map((c) => {
                    const isHighlight = c.highlight;
                    const value = r[c.key];
 
                    if (isHighlight) {
                      return (
                        <td
                          key={c.key}
                          className={`p-2 sm:p-4 text-center bg-white border-l-4 border-r-4 border-[#A855F7] relative z-10 ${
                            isLastRow
                              ? "border-b-4 rounded-b-2xl shadow-[0_8px_20px_rgba(168,85,247,0.4),-6px_0_15px_rgba(168,85,247,0.3),6px_0_15px_rgba(168,85,247,0.3)]"
                              : "border-b border-slate-100 shadow-[-6px_0_15px_rgba(168,85,247,0.3),6px_0_15px_rgba(168,85,247,0.3)]"
                          }`}
                        >
                          <div className="flex items-center justify-center h-full">
                            <Check className="text-[#A855F7] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                          </div>
                        </td>
                      );
                    }
 
                    return (
                      <td
                        key={c.key}
                        className={`p-2 sm:p-4 text-center text-slate2 font-medium border-b border-r border-slate-100 last:border-r-0 ${
                          isLastRow ? "border-b-0" : ""
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
