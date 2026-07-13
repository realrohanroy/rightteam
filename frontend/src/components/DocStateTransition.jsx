import React, { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const DocStateTransition = ({ className = "" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative w-full max-w-[280px] h-[150px] bg-paper border border-ink/15 rounded-sm p-5 shadow-sm cursor-pointer select-none transition-all duration-300 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      data-testid="doc-transition"
    >
      {/* Background paper lines */}
      <div className="space-y-2.5">
        <div className="h-2.5 w-1/3 bg-ink/10 rounded-sm" />
        <div className="h-2 w-5/6 bg-ink/5 rounded-sm" />
        <div className="h-2 w-4/5 bg-ink/5 rounded-sm" />
        <div className="h-2 w-2/3 bg-ink/5 rounded-sm" />
      </div>

      {/* Before / Left Overdue Label */}
      <div
        className={`absolute bottom-4 left-4 flex items-center gap-1.5 border border-seal/30 bg-seal/[0.04] px-2.5 py-1 rounded-sm text-seal font-mono text-[9px] uppercase tracking-wider transition-all duration-500 ease-out ${
          hovered ? "opacity-10 scale-95 translate-x-2" : "opacity-100 scale-100 translate-x-0"
        }`}
      >
        <AlertCircle size={10} strokeWidth={2.5} />
        <span>Lapsed return</span>
      </div>

      {/* After / Right Stamped Seal */}
      <div
        className={`absolute bottom-4 right-4 flex items-center gap-1.5 border border-approve/30 bg-approve/[0.05] px-2.5 py-1.5 rounded-sm text-approve transition-all duration-500 ease-out ${
          hovered ? "opacity-100 scale-100 translate-y-0 rotate-0" : "opacity-0 scale-75 translate-y-2 -rotate-12 pointer-events-none"
        }`}
      >
        <CheckCircle2 size={12} strokeWidth={3} />
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">Filed on time</span>
      </div>

      {/* Interactive Helper Overlay */}
      <div className="absolute inset-0 bg-ink/[0.01] hover:bg-ink/[0.03] flex items-center justify-center transition-all">
        <span className="mono text-[8px] tracking-[0.2em] text-slate2 bg-white/95 px-2.5 py-1.5 shadow-sm uppercase opacity-90 pointer-events-none rounded-sm">
          {hovered ? "Result: Resolved" : "Hover to file"}
        </span>
      </div>
    </div>
  );
};
