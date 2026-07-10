/**
 * HeroIllustrationPlaceholder.jsx
 *
 * Properly-sized placeholder components for illustration slots.
 * Replace each placeholder with a commissioned illustration or a
 * Storyset/unDraw SVG recolored to the brand palette:
 *   Primary: #E8522B (orange-red)
 *   Navy:    #0B1E3D
 *   Paper:   #F7F4EC
 *   Green:   #1E5631 (status accents only)
 *
 * NOTE: The hero illustration specifically should be a custom-commissioned
 * piece. Do NOT use a stock illustration for the hero.
 */
import React from "react";
import { ImageOff } from "lucide-react";

const Placeholder = ({ width, height, label, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-ink/20 bg-warm/60 ${className}`}
    style={{ width, height, maxWidth: "100%" }}
    role="img"
    aria-label={label}
  >
    <ImageOff size={32} className="text-ink/30" strokeWidth={1.5} />
    <div className="mono text-[10px] uppercase tracking-widest text-ink/40 text-center px-4 leading-relaxed">
      {label}
    </div>
  </div>
);

/**
 * Hero illustration placeholder — sized to match the original FounderDeskIllustration.
 * Commission a custom illustration to replace this.
 */
export const HeroIllustrationPlaceholder = ({ width = 520, className = "" }) => (
  <Placeholder
    width={width}
    height={Math.round(width * 0.72)}
    label="Custom hero illustration — commission required. Use Storyset for supporting illustrations."
    className={className}
  />
);

/**
 * "How it works" illustration placeholder.
 * Source: Storyset "Process" or "Steps" illustration, recolored to brand palette.
 */
export const ProcessIllustrationPlaceholder = ({ width = 380, className = "" }) => (
  <Placeholder
    width={width}
    height={Math.round(width * 0.45)}
    label="Process illustration — source from Storyset, recolor to brand palette"
    className={className}
  />
);

/**
 * Calculator/calendar illustration placeholder.
 * Source: Storyset "Calendar" or "Deadline" illustration, recolored to brand palette.
 */
export const CalculatorIllustrationPlaceholder = ({ size = 80, className = "" }) => (
  <Placeholder
    width={size}
    height={size}
    label="Calendar icon"
    className={className}
  />
);
