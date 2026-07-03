import React from "react";
import { CLIENT_LOGOS } from "../data/marketing";

// Wordmark-style logo placeholders — deliberately restrained (no colour,
// no illustration) so the wall reads as a corporate reference list.
const wordmarkStyles = [
  { font: "font-display", weight: "font-bold", tracking: "tracking-tight" },
  { font: "font-sans", weight: "font-semibold", tracking: "tracking-wider uppercase" },
  { font: "font-display", weight: "font-black", tracking: "tracking-tight" },
  { font: "font-mono", weight: "font-semibold", tracking: "tracking-widest uppercase" },
  { font: "font-sans", weight: "font-bold", tracking: "tracking-tight" },
];

export const LogoWall = () => (
  <section className="section-alt py-16 mt-20 border-y border-ink/10" data-testid="logo-wall">
    <div className="container-x">
      <div className="text-center">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          Client roster · Selected engagements
        </div>
        <div className="mt-3 text-ink text-lg">
          <span className="font-display font-bold">8,400+ businesses</span> trust RightTeam with filings that cannot be missed.
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-ink/10 border border-ink/10">
        {CLIENT_LOGOS.map((name, i) => {
          const style = wordmarkStyles[i % wordmarkStyles.length];
          return (
            <div
              key={name}
              className="bg-white h-24 flex items-center justify-center px-4"
              data-testid={`logo-${i}`}
            >
              <span
                className={`text-ink/70 hover:text-ink transition-colors text-base sm:text-lg ${style.font} ${style.weight} ${style.tracking}`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 mono text-[10px] uppercase tracking-widest text-slate2 text-center">
        Names shown with client permission. Additional 8,388+ engagements on record.
      </div>
    </div>
  </section>
);
