import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PenaltyChart = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      // Set dash offsets
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(dotRef.current, { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        }
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
      })
      .to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      }, "-=0.1");

      return () => {
        ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === el) t.kill();
        });
      };
    }
  }, []);

  // Curve coordinates in 360x130 grid:
  // Day 0: (40, 110)
  // Day 90: (320, 20)
  const pathData = "M 40 110 Q 180 100 320 20";

  return (
    <div ref={containerRef} className="bg-white border border-seal/20 rounded-sm p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="mono text-[10px] uppercase tracking-widest text-slate2 font-semibold">Compounding Penalty Curve (GST)</div>
        <div className="mono text-[9px] uppercase tracking-wider text-seal font-semibold">₹50/day + 18% p.a. interest</div>
      </div>
      <div className="relative">
        <svg viewBox="0 0 360 140" className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1="40" y1="20" x2="320" y2="20" stroke="#f1f3f5" strokeWidth="1" />
          <line x1="40" y1="65" x2="320" y2="65" stroke="#f1f3f5" strokeWidth="1" />
          <line x1="40" y1="110" x2="320" y2="110" stroke="#e9ecef" strokeWidth="1" />
          
          <line x1="133" y1="20" x2="133" y2="110" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="226" y1="20" x2="226" y2="110" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="2 2" />

          {/* Labels */}
          <text x="32" y="113" textAnchor="end" className="text-[9px] fill-slate2 font-mono">₹0</text>
          <text x="32" y="68" textAnchor="end" className="text-[9px] fill-slate2 font-mono">₹3.5k</text>
          <text x="32" y="23" textAnchor="end" className="text-[9px] fill-slate2 font-mono">₹7k</text>

          <text x="40" y="125" textAnchor="middle" className="text-[9px] fill-slate2 font-mono">0d</text>
          <text x="133" y="125" textAnchor="middle" className="text-[9px] fill-slate2 font-mono">30d</text>
          <text x="226" y="125" textAnchor="middle" className="text-[9px] fill-slate2 font-mono">60d</text>
          <text x="320" y="125" textAnchor="middle" className="text-[9px] fill-slate2 font-mono">90d</text>

          {/* Gradient */}
          <defs>
            <linearGradient id="gradient-penalty" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C1272D" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C1272D" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Fill Area under Curve */}
          <path d="M 40 110 Q 180 100 320 20 L 320 110 Z" fill="url(#gradient-penalty)" />

          {/* Plot line */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#C1272D"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* End indicator dot */}
          <circle
            ref={dotRef}
            cx="320"
            cy="20"
            r="5.5"
            fill="#C1272D"
            stroke="#ffffff"
            strokeWidth="1.5"
            className="shadow-sm"
          />
        </svg>

        {/* Floating Callout */}
        <div className="absolute top-2 right-2 bg-seal text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
          90 Days: ~₹6,850+ Penalty
        </div>
      </div>
    </div>
  );
};
