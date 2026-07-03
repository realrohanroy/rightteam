import React from "react";
import { Check } from "lucide-react";

// Tick-state checklist. Each item is either "checked", "current" or "upcoming".
// The vertical hairline connects the items into a filing checklist column.
export const Checklist = ({ items, active = -1 }) => {
  return (
    <ol className="relative">
      <span
        className="absolute left-[11px] top-2 bottom-2 w-px bg-ink/20"
        aria-hidden
      />
      {items.map((item, idx) => {
        const state = idx < active ? "done" : idx === active ? "current" : "upcoming";
        return (
          <li
            key={idx}
            className="relative pl-10 py-4 border-b border-ink/10 last:border-b-0"
            data-testid={`checklist-item-${idx}`}
          >
            <span
              className={`absolute left-0 top-4 flex items-center justify-center w-6 h-6 border ${
                state === "done"
                  ? "bg-approve border-approve text-paper"
                  : state === "current"
                  ? "bg-white border-ink text-ink"
                  : "bg-white border-ink/30 text-transparent"
              }`}
              aria-hidden
            >
              {state === "done" ? <Check size={14} strokeWidth={3} /> : ""}
            </span>
            <div className="flex flex-col gap-1">
              <div className="text-xs mono text-slate2 uppercase tracking-widest">
                Step {String(idx + 1).padStart(2, "0")}
              </div>
              <h4 className="font-semibold text-ink text-base">{item.title}</h4>
              {item.body && <p className="text-sm text-slate2 leading-relaxed">{item.body}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

// Compact "what you need" list
export const NeedsList = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm text-ink">
        <span className="mt-0.5 inline-flex w-5 h-5 border border-ink/40 items-center justify-center">
          <Check size={12} strokeWidth={3} className="text-ink" />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
