import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PILLARS } from "../data/services";

// Category navigation styled as filing folder tabs.
export const FilingTabs = ({ activeSlug }) => {
  const location = useLocation();
  const active = activeSlug || location.pathname.split("/")[1];

  return (
    <div
      data-testid="filing-tabs"
      className="relative overflow-x-auto"
    >
      <div className="flex items-end gap-1 min-w-max border-b border-ink/70">
        {PILLARS.map((p) => {
          const isActive = active === p.slug;
          return (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              data-testid={`filing-tab-${p.slug}`}
              className={`filing-tab whitespace-nowrap ${isActive ? "filing-tab-active" : ""}`}
            >
              <span className="mono text-[10px] uppercase tracking-widest text-slate2 block leading-none mb-1">
                Pillar {PILLARS.findIndex((x) => x.slug === p.slug) + 1}
              </span>
              {p.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
