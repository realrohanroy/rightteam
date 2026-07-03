import React, { useEffect, useRef, useState } from "react";

// A circular ink-stamp seal. Uses a dashed border, curved outer text,
// and center content. Animates in when it scrolls into view.
export const Seal = ({
  size = 160,
  label = "500+ Filings Completed",
  outerText = "RIGHT TEAM · CERTIFIED · SINCE 2019 ·",
  color = "#C1272D",
  center,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = size / 2;
  const textRadius = r - 14;

  return (
    <div
      ref={ref}
      className={`inline-block ${visible ? "animate-stamp-in" : "opacity-0"}`}
      style={{ width: size, height: size }}
      data-testid={`seal-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ color }}>
        <defs>
          <path
            id={`seal-path-${size}-${color.replace("#", "")}`}
            d={`M ${r},${r} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${2 * textRadius},0 a ${textRadius},${textRadius} 0 1,1 -${2 * textRadius},0`}
          />
        </defs>
        <circle cx={r} cy={r} r={r - 3} fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx={r} cy={r} r={r - 10} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <text
          fill="currentColor"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 700, letterSpacing: "0.14em" }}
          fontSize={size * 0.075}
        >
          <textPath href={`#seal-path-${size}-${color.replace("#", "")}`} startOffset="0">
            {outerText}
          </textPath>
        </text>
        <line x1={size * 0.22} y1={r} x2={size * 0.78} y2={r} stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <div
        style={{
          marginTop: -size * 0.62,
          height: size * 0.36,
          color,
          fontFamily: "Fraunces, serif",
        }}
        className="flex items-center justify-center text-center px-6 relative pointer-events-none"
      >
        {center ? (
          center
        ) : (
          <div>
            <div className="text-xl font-black leading-tight">{label.split(" ")[0]}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase mt-1 font-semibold">
              {label.split(" ").slice(1).join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Small corner mark for cards
export const CornerSeal = ({ color = "#12203D" }) => (
  <svg viewBox="0 0 40 40" width="40" height="40" style={{ color }} aria-hidden>
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1.5" />
    <text
      x="20"
      y="24"
      textAnchor="middle"
      fill="currentColor"
      style={{ fontFamily: "Fraunces, serif", fontWeight: 800, fontSize: 10 }}
    >
      RT
    </text>
  </svg>
);
