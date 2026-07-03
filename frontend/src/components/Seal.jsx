import React, { useEffect, useRef, useState } from "react";

/**
 * A small circular credential-badge seal — approximately the size of a
 * real certification mark (ISO/ICAI badge). Used only for credential
 * markers and status indicators, never as hero illustration.
 */
export const Seal = ({
  size = 96,
  label = "Filed on time",
  outerText = "· FILED ON TIME · GUARANTEED ·",
  color = "#0B1E3D",
  center,
  animateIn = true,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(!animateIn);

  useEffect(() => {
    if (!animateIn) return;
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
  }, [animateIn]);

  const r = size / 2;
  const textRadius = r - 9;
  const uid = `${size}-${color.replace("#", "")}`;

  return (
    <div
      ref={ref}
      className={`inline-block align-middle ${visible ? "animate-stamp-in" : "opacity-0"}`}
      style={{ width: size, height: size }}
      data-testid={`seal-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ color }}>
        <defs>
          <path
            id={`seal-path-${uid}`}
            d={`M ${r},${r} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${2 * textRadius},0 a ${textRadius},${textRadius} 0 1,1 -${2 * textRadius},0`}
          />
        </defs>
        <circle cx={r} cy={r} r={r - 2} fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx={r} cy={r} r={r - 6} fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1.5" />
        <text
          fill="currentColor"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.16em" }}
          fontSize={size * 0.09}
        >
          <textPath href={`#seal-path-${uid}`} startOffset="0">
            {outerText}
          </textPath>
        </text>
      </svg>
      <div
        style={{
          marginTop: -size * 0.66,
          height: size * 0.4,
          color,
          fontFamily: "Fraunces, serif",
        }}
        className="flex items-center justify-center text-center px-3 relative pointer-events-none"
      >
        {center ? (
          center
        ) : (
          <div>
            <div className="text-sm font-black leading-tight">{label.split(" ")[0]}</div>
            <div className="mono text-[8px] tracking-[0.15em] uppercase mt-0.5 font-semibold">
              {label.split(" ").slice(1).join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Small mark for cards / brand — corner badge sized
export const CornerSeal = ({ color = "#0B1E3D", size = 32 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} style={{ color }} aria-hidden>
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 1.5" />
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

// A row of credential badges (ICAI, ICSI, GST Practitioner etc)
export const CredentialRow = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((it, i) => (
      <span key={i} className="credential-badge" data-testid={`credential-${i}`}>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: it.color || "#1E5631" }}
        />
        {it.label}
      </span>
    ))}
  </div>
);
