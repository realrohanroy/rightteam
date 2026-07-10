import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const OnTimeRing = ({ percentage = 99.8, label = "On-time rate" }) => {
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ring = ringRef.current;
    const textEl = textRef.current;
    if (ring) {
      const radius = 34;
      const circumference = 2 * Math.PI * radius;
      
      // Set initial state
      gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference });
      if (textEl) textEl.textContent = "0.0%";

      const counter = { val: 0 };
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(ring, {
            strokeDashoffset: circumference - (percentage / 100) * circumference,
            duration: 1.5,
            ease: "power2.out",
          });
          
          if (textEl) {
            gsap.to(counter, {
              val: percentage,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                textEl.textContent = `${counter.val.toFixed(1)}%`;
              }
            });
          }
        }
      });

      return () => trigger.kill();
    }
  }, [percentage]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center p-5 bg-white border border-ink/10 rounded-sm w-fit" data-testid="on-time-ring">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full transform -rotate-90 overflow-visible">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="transparent"
            stroke="#f1f3f5"
            strokeWidth="6"
          />
          {/* Animated fill circle */}
          <circle
            ref={ringRef}
            cx="40"
            cy="40"
            r="34"
            fill="transparent"
            stroke="#E8522B"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        {/* Centered text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span ref={textRef} className="font-display font-bold text-base text-ink">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="mono text-[10px] uppercase tracking-widest text-slate2 mt-3 font-semibold text-center leading-none">
        {label}
      </span>
    </div>
  );
};
