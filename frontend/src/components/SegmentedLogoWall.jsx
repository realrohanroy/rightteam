/**
 * SegmentedLogoWall.jsx
 *
 * CONTENT POLICY: This component ships with an EMPTY data source.
 * Do NOT populate CLIENT_SEGMENTS with invented or placeholder company names.
 * Add real client logos (with written permission) to the segments below before activating.
 *
 * To activate: populate CLIENT_SEGMENTS and set FEATURE_ENABLED = true.
 */
import React, { useState } from "react";

const FEATURE_ENABLED = false; // Flip to true once real client logo data is provided

/**
 * Replace each segment's `logos` array with real, permission-cleared client names.
 * Each entry: { name: string, industry?: string }
 * If you have SVG logo files, add an `svgPath` field and render them instead of wordmarks.
 */
const CLIENT_SEGMENTS = [
  {
    label: "Early-stage startups",
    logos: [
      // { name: "Client Name", industry: "SaaS · Mumbai" },
    ],
  },
  {
    label: "Manufacturing & logistics",
    logos: [
      // { name: "Client Name", industry: "Precision mfg · Pune" },
    ],
  },
  {
    label: "D2C & retail",
    logos: [
      // { name: "Client Name", industry: "F&B · Bengaluru" },
    ],
  },
];

const wordmarkStyles = [
  "font-display font-bold tracking-tight",
  "font-sans font-semibold tracking-wider uppercase",
  "font-display font-black tracking-tight",
  "font-mono font-semibold tracking-widest uppercase",
  "font-sans font-bold tracking-tight",
];

export const SegmentedLogoWall = () => {
  const [activeSegment, setActiveSegment] = useState(0);

  // Hidden until real client data is provided
  if (!FEATURE_ENABLED) return null;

  const segment = CLIENT_SEGMENTS[activeSegment];

  return (
    <section
      className="section-alt py-16 mt-0 border-y border-ink/10"
      data-testid="segmented-logo-wall"
    >
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Client roster · Selected engagements
          </div>
          <div className="mt-3 text-ink text-lg">
            <span className="font-display font-bold">8,400+ businesses</span> trust
            RightTeam with filings that cannot be missed.
          </div>
        </div>

        {/* Segment tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {CLIENT_SEGMENTS.map((seg, i) => (
            <button
              key={i}
              onClick={() => setActiveSegment(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                i === activeSegment
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink border-ink/20 hover:border-ink"
              }`}
              data-testid={`logo-segment-${i}`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Logo grid */}
        {segment.logos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
            {segment.logos.map(({ name }, i) => (
              <div
                key={name}
                className="bg-white h-20 flex items-center justify-center px-4"
                data-testid={`logo-${i}`}
              >
                <span
                  className={`text-ink/70 hover:text-ink transition-colors text-base ${
                    wordmarkStyles[i % wordmarkStyles.length]
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-ink/10 bg-white rounded-sm p-10 text-center text-slate2 text-sm">
            Client logos coming soon.
          </div>
        )}

        <div className="mt-6 mono text-[10px] uppercase tracking-widest text-slate2 text-center">
          Names shown with client permission.
        </div>
      </div>
    </section>
  );
};
