import React from "react";
import { TEAM } from "../data/marketing";

export const TeamGrid = ({ withHeading = true }) => (
  <section className="container-x py-28" data-testid="team-grid">
    {withHeading && (
      <div className="max-w-3xl">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          The team
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
          In-house CAs, company secretaries and IP attorneys.
        </h2>
      </div>
    )}

    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TEAM.map((t, i) => (
        <article key={i} className="paper-card p-5 flex gap-4" data-testid={`team-card-${i}`}>
          <div
            className="shrink-0 w-16 h-16 border border-ink/25 bg-alt flex items-center justify-center font-display font-bold text-ink text-xl rounded-sm"
            aria-hidden
          >
            {t.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-lg text-ink leading-tight">{t.name}</div>
            <div className="text-sm text-slate2 mt-0.5">{t.role}</div>
            <div className="mono text-[10px] uppercase tracking-widest text-ink mt-3 border-t border-ink/10 pt-3">
              {t.credentials}
            </div>
            <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">
              {t.tenure}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);
