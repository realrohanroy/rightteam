/**
 * HeroIllustration.jsx — recolored with real fills.
 * Palette:
 *   Skin:    #D4956A (warm mid-tone)
 *   Hair:    #2C1A0E (dark brown)
 *   Jacket:  #1E3A5F (dark navy-blue blazer)
 *   Shirt:   #F0EDE8 (off-white)
 *   Desk:    #C9A87C (warm oak)
 *   Screen:  #1D4ED8 → #60A5FA (monitor glow gradient)
 *   Paper:   #F7F4EC (warm cream)
 *   Seal:    #C1272D (red)
 *   Coral:   #E8632A (accent)
 *   Approve: #1E5631 (green badge)
 */
import React from "react";

export const FounderDeskIllustration = ({ width = 480, className = "" }) => {
  const h = Math.round(width * 0.72);
  return (
    <svg
      viewBox="0 0 480 346"
      width={width}
      height={h}
      fill="none"
      className={className}
      aria-label="Founder at desk with compliance documents and RightTeam stamp"
      role="img"
    >
      {/* Warm paper background */}
      <rect width="480" height="346" rx="12" fill="#F7F4EC" />

      {/* Subtle grid lines — blueprint feel */}
      {[60, 120, 180, 240, 300].map(y => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#0B1E3D" strokeWidth="0.4" opacity="0.06" />
      ))}
      {[80, 160, 240, 320, 400].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="346" stroke="#0B1E3D" strokeWidth="0.4" opacity="0.06" />
      ))}

      {/* ── Desk surface ─────────────────────────────────────────────── */}
      {/* Oak desk top with grain */}
      <rect x="20" y="238" width="440" height="14" rx="3" fill="#C9A87C" />
      <rect x="20" y="238" width="440" height="4" rx="0" fill="#D4B88A" opacity="0.6" />
      {/* Desk legs */}
      <rect x="48" y="252" width="12" height="70" rx="2" fill="#B8966A" />
      <rect x="420" y="252" width="12" height="70" rx="2" fill="#B8966A" />

      {/* ── Document pile (left side) ─────────────────────────────────── */}
      <rect x="52" y="226" width="84" height="5" rx="1" fill="#C9A87C" opacity="0.5" />
      {/* Bottom doc — coral tinted */}
      <rect x="54" y="208" width="80" height="16" rx="2" fill="#FFF1EB" stroke="#E8632A" strokeWidth="1" />
      <line x1="62" y1="213" x2="116" y2="213" stroke="#E8632A" strokeWidth="1" opacity="0.5" />
      <line x1="62" y1="218" x2="108" y2="218" stroke="#E8632A" strokeWidth="1" opacity="0.5" />
      {/* Middle doc — white */}
      <rect x="56" y="194" width="80" height="16" rx="2" fill="#FFFFFF" stroke="#0B1E3D" strokeWidth="1" />
      <line x1="64" y1="199" x2="118" y2="199" stroke="#0B1E3D" strokeWidth="1" opacity="0.3" />
      <line x1="64" y1="204" x2="110" y2="204" stroke="#0B1E3D" strokeWidth="1" opacity="0.3" />
      {/* Top doc — cream with seal stamp impression */}
      <rect x="58" y="180" width="80" height="16" rx="2" fill="#F7F4EC" stroke="#0B1E3D" strokeWidth="1" />
      <circle cx="120" cy="188" r="7" fill="none" stroke="#C1272D" strokeWidth="1.2" strokeDasharray="2 1.5" />
      <text x="120" y="191" textAnchor="middle" fontSize="5" fill="#C1272D" fontFamily="serif" stroke="none" fontWeight="700">RT</text>

      {/* ── Monitor ──────────────────────────────────────────────────── */}
      {/* Monitor housing */}
      <rect x="178" y="146" width="164" height="94" rx="5" fill="#1A2744" />
      {/* Screen bezel */}
      <rect x="184" y="152" width="152" height="80" rx="3" fill="#0F1B35" />
      {/* Screen glow — blue gradient */}
      <defs>
        <linearGradient id="screenGrad" x1="184" y1="152" x2="336" y2="232" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="184" y="152" width="152" height="80" rx="3" fill="url(#screenGrad)" opacity="0.9" />
      {/* Code lines on screen */}
      <rect x="194" y="162" width="70" height="4" rx="2" fill="#FDE68A" opacity="0.9" />
      <rect x="194" y="171" width="100" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      <rect x="194" y="179" width="80" height="3" rx="1.5" fill="#6EE7B7" opacity="0.7" />
      <rect x="194" y="187" width="110" height="3" rx="1.5" fill="#FFFFFF" opacity="0.3" />
      <rect x="194" y="195" width="60" height="3" rx="1.5" fill="#FCA5A5" opacity="0.6" />
      <rect x="194" y="203" width="90" height="3" rx="1.5" fill="#FFFFFF" opacity="0.35" />
      <rect x="194" y="211" width="50" height="3" rx="1.5" fill="#6EE7B7" opacity="0.5" />
      {/* Screen ambient glow spill on desk */}
      <ellipse cx="260" cy="246" rx="70" ry="8" fill="#1D4ED8" opacity="0.06" />
      {/* Monitor stand */}
      <rect x="249" y="240" width="22" height="6" rx="1" fill="#1A2744" />
      <rect x="234" y="246" width="52" height="4" rx="2" fill="#1A2744" />

      {/* ── Notification badge on monitor corner ─────────────────────── */}
      <circle cx="334" cy="154" r="10" fill="#E8632A" />
      <text x="334" y="158" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif" fill="#fff" stroke="none">✓</text>

      {/* ── Founder figure ───────────────────────────────────────────── */}
      {/* --- Body / jacket --- */}
      <path d="M278 156 Q282 150 308 148 Q334 150 338 156 L346 240 H270 Z" fill="#1E3A5F" />
      {/* Jacket lapels */}
      <path d="M300 150 L308 170 L316 150" fill="#2E5080" />
      {/* Shirt / collar visible */}
      <path d="M302 150 L308 168 L314 150" fill="#F0EDE8" />
      {/* Tie — gold */}
      <path d="M306 152 L308 172 L310 152" fill="#8A6D1F" />

      {/* --- Left arm on desk --- */}
      <path d="M278 172 Q264 184 258 210 Q256 224 266 228" stroke="#D4956A" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Hand left */}
      <circle cx="266" cy="228" r="7" fill="#D4956A" />

      {/* --- Right arm toward keyboard --- */}
      <path d="M338 172 Q354 184 358 208" stroke="#1E3A5F" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Right sleeve cuff */}
      <rect x="350" y="203" width="15" height="8" rx="2" fill="#F0EDE8" />
      <circle cx="357" cy="207" r="5" fill="#D4956A" />

      {/* --- Neck --- */}
      <rect x="302" y="140" width="12" height="14" rx="4" fill="#D4956A" />

      {/* --- Head --- */}
      {/* Face base */}
      <ellipse cx="308" cy="122" rx="26" ry="28" fill="#D4956A" />
      {/* Hair — dark brown */}
      <path d="M282 114 Q284 94 308 92 Q332 94 334 114" fill="#2C1A0E" />
      {/* Forehead highlight */}
      <ellipse cx="308" cy="108" rx="14" ry="8" fill="#D4956A" opacity="0.6" />
      {/* Hair side burns */}
      <rect x="282" y="114" width="6" height="18" rx="3" fill="#2C1A0E" />
      <rect x="320" y="114" width="6" height="18" rx="3" fill="#2C1A0E" />

      {/* Ear */}
      <ellipse cx="282" cy="124" rx="5" ry="7" fill="#C4845A" />
      <ellipse cx="334" cy="124" rx="5" ry="7" fill="#C4845A" />

      {/* Glasses frames */}
      <rect x="294" y="120" width="13" height="9" rx="2.5" fill="none" stroke="#8A6D1F" strokeWidth="1.5" />
      <rect x="310" y="120" width="13" height="9" rx="2.5" fill="none" stroke="#8A6D1F" strokeWidth="1.5" />
      <line x1="307" y1="124" x2="310" y2="124" stroke="#8A6D1F" strokeWidth="1.2" />
      {/* Glasses arms */}
      <line x1="282" y1="124" x2="294" y2="124" stroke="#8A6D1F" strokeWidth="1.2" />
      <line x1="323" y1="124" x2="334" y2="124" stroke="#8A6D1F" strokeWidth="1.2" />
      {/* Lens glare */}
      <path d="M296 121 L298 123" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
      <path d="M312 121 L314 123" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />

      {/* Eyebrows */}
      <path d="M295 118 Q301 116 307 118" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M311 118 Q317 116 323 118" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Slight smile */}
      <path d="M303 133 Q308 136 313 133" stroke="#A06040" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* ── Keyboard ─────────────────────────────────────────────────── */}
      <rect x="226" y="230" width="98" height="12" rx="2" fill="#D4C9B5" />
      {[234, 244, 254, 264, 274, 284, 294, 304, 314].map(x => (
        <rect key={x} x={x} y={232} width="7" height="4" rx="1" fill="#C2B8A4" />
      ))}
      <rect x="246" y={236} width="32" height="4" rx="1" fill="#C2B8A4" />

      {/* ── RightTeam Seal — mid-air stamp effect ─────────────────────── */}
      <g transform="translate(376, 112) rotate(-8)">
        {/* Outer glow */}
        <circle cx="30" cy="30" r="32" fill="#C1272D" opacity="0.08" />
        {/* Seal body */}
        <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#C1272D" strokeWidth="2" />
        <circle cx="30" cy="30" r="22" fill="none" stroke="#C1272D" strokeWidth="1" strokeDasharray="3 2" />
        {/* Inner fill — very light red */}
        <circle cx="30" cy="30" r="21" fill="#FFF5F5" />
        <text x="30" y="26" textAnchor="middle" fontSize="8" fontWeight="700"
          fontFamily="Inter, sans-serif" fill="#C1272D" stroke="none" letterSpacing="1">RIGHTTEAM</text>
        <text x="30" y="34" textAnchor="middle" fontSize="6.5" fontWeight="600"
          fontFamily="Inter, sans-serif" fill="#C1272D" stroke="none">FILED ON TIME</text>
        <text x="30" y="41" textAnchor="middle" fontSize="5.5"
          fontFamily="IBM Plex Mono, monospace" fill="#C1272D" stroke="none" opacity="0.7">GUARANTEED</text>
        {/* Motion lines */}
        <line x1="30" y1="-6" x2="30" y2="-14" stroke="#C1272D" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="54" y1="8" x2="60" y2="3" stroke="#C1272D" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <line x1="6" y1="8" x2="0" y2="3" stroke="#C1272D" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <line x1="56" y1="30" x2="64" y2="30" stroke="#C1272D" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      </g>

      {/* ── Status badge ─────────────────────────────────────────────── */}
      <g transform="translate(42, 144)">
        <rect width="96" height="32" rx="16" fill="#1E5631" />
        <text x="48" y="20" textAnchor="middle" fontSize="11" fontWeight="600"
          fontFamily="Inter, sans-serif" fill="#FFFFFF" stroke="none">
          Filed on time ✓
        </text>
      </g>

      {/* ── Decorative coral dot accents ─────────────────────────────── */}
      <circle cx="454" cy="28" r="6" fill="#E8632A" opacity="0.25" />
      <circle cx="440" cy="48" r="4" fill="#E8632A" opacity="0.15" />
      <circle cx="32" cy="72" r="8" fill="#0B1E3D" opacity="0.07" />
      <circle cx="22" cy="28" r="4" fill="#8A6D1F" opacity="0.2" />
    </svg>
  );
};

/**
 * HowItWorksIllustration — 4 colored steps with distinct fills per step.
 */
export const HowItWorksIllustration = ({ width = 560, className = "" }) => {
  const h = Math.round(width * 0.45);

  // Step configs: bg fill, icon color, circle border color
  const steps = [
    {
      x: 50, label: "You share\ndocuments",
      bg: "#FFF1EB", border: "#E8632A", iconColor: "#E8632A",
      icon: (
        <>
          <rect x="-18" y="-14" width="36" height="28" rx="3" fill="#FFF1EB" stroke="#E8632A" strokeWidth="1.8" />
          <rect x="-18" y="4" width="36" height="10" rx="2" fill="#E8632A" opacity="0.15" />
          <line x1="-10" y1="-6" x2="10" y2="-6" stroke="#E8632A" strokeWidth="1.5" />
          <line x1="-10" y1="-1" x2="10" y2="-1" stroke="#E8632A" strokeWidth="1.5" opacity="0.7" />
          <line x1="-10" y1="4" x2="4" y2="4" stroke="#E8632A" strokeWidth="1.5" opacity="0.5" />
        </>
      ),
    },
    {
      x: 190, label: "Manager\nprepares",
      bg: "#F5F3FF", border: "#7C3AED", iconColor: "#7C3AED",
      icon: (
        <>
          {/* Manager head — with skin tone */}
          <circle cx="0" cy="-10" r="10" fill="#D4956A" />
          <path d="M-8 -14 Q0 -18 8 -14" fill="#2C1A0E" />
          <rect x="-2" y="-2" width="4" height="2" rx="1" fill="#C4845A" />
          {/* Body */}
          <path d="M-14 8 C-14 0 14 0 14 8 L16 14 H-16 Z" fill="#1E3A5F" />
          {/* Pencil */}
          <line x1="12" y1="-20" x2="22" y2="-6" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="-6" x2="24" y2="-2" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="-6" r="2" fill="#FDE68A" />
        </>
      ),
    },
    {
      x: 330, label: "Stamped\n& filed",
      bg: "#FFF5F5", border: "#C1272D", iconColor: "#C1272D",
      icon: (
        <>
          <rect x="-18" y="-12" width="36" height="22" rx="2" fill="#C1272D" />
          <rect x="-14" y="-9" width="28" height="16" rx="1" fill="#A01E23" opacity="0.5" />
          <text x="0" y="2" textAnchor="middle" fontSize="9" fontWeight="700"
            fontFamily="Inter, sans-serif" fill="#fff" stroke="none">FILED</text>
          <rect x="-14" y="10" width="28" height="7" rx="1" fill="#C1272D" opacity="0.6" />
          <rect x="-10" y="17" width="20" height="8" rx="1" fill="#0B1E3D" opacity="0.3" />
        </>
      ),
    },
    {
      x: 470, label: "Certificate\ndelivered",
      bg: "#F0FDF4", border: "#16A34A", iconColor: "#16A34A",
      icon: (
        <>
          <rect x="-22" y="-16" width="44" height="32" rx="3" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
          <path d="M-22 -16 L0 2 L22 -16" stroke="#16A34A" strokeWidth="1.5" fill="none" />
          <path d="M-22 16 L-9 4" stroke="#16A34A" strokeWidth="1.5" />
          <path d="M22 16 L9 4" stroke="#16A34A" strokeWidth="1.5" />
          {/* Ribbon medal */}
          <circle cx="0" cy="4" r="7" fill="#16A34A" />
          <text x="0" y="8" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" stroke="none">✓</text>
          {/* Ribbon tails */}
          <path d="M-4 11 L-6 18 L0 15 L6 18 L4 11 Z" fill="#16A34A" opacity="0.6" />
        </>
      ),
    },
  ];

  return (
    <svg
      viewBox={`0 0 560 ${Math.round(560 * 0.45)}`}
      width={width}
      height={h}
      fill="none"
      className={className}
      aria-label="Four-step process: share documents, manager prepares, stamped and filed, certificate delivered"
      role="img"
    >
      {/* Dashed connector */}
      <line x1="88" y1="80" x2="432" y2="80" stroke="#0B1E3D" strokeWidth="1.5"
        strokeDasharray="6 4" opacity="0.2" />

      {steps.map((step, i) => (
        <g key={i} transform={`translate(${step.x}, 80)`}>
          {/* Colored circle bg */}
          <circle r="36" fill={step.bg} stroke={step.border} strokeWidth="2" />
          {/* Step number */}
          <text x="0" y="-46" textAnchor="middle" fontSize="10" fontWeight="600"
            fontFamily="IBM Plex Mono, monospace" fill={step.border} opacity="0.7">
            {String(i + 1).padStart(2, "0")}
          </text>
          {/* Icon */}
          {step.icon}
          {/* Label */}
          {step.label.split("\n").map((line, j) => (
            <text key={j} x="0" y={52 + j * 16} textAnchor="middle" fontSize="12"
              fontWeight={600} fontFamily="Inter, sans-serif" fill="#0B1E3D">
              {line}
            </text>
          ))}
          {/* Arrow connector */}
          {i < 3 && (
            <g transform="translate(66, 0)">
              <circle r="10" fill={step.bg} stroke={step.border} strokeWidth="1.5" opacity="0.5" />
              <polyline points="-4,-5 4,0 -4,5" fill="none" stroke={step.border} strokeWidth="1.5" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
};

/**
 * CalculatorIllustration — compliance calendar with colored penalty markers.
 */
export const CalculatorIllustration = ({ size = 120, className = "" }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none"
    className={className} aria-label="Compliance calendar with due dates" role="img">
    {/* Calendar body */}
    <rect x="8" y="18" width="104" height="94" rx="5" fill="#FFFFFF"
      stroke="#0B1E3D" strokeWidth="1.5" />
    {/* Header — navy */}
    <rect x="8" y="18" width="104" height="24" rx="5" fill="#0B1E3D" />
    <rect x="8" y="30" width="104" height="12" fill="#0B1E3D" />
    {/* Binding rings */}
    <rect x="30" y="10" width="6" height="16" rx="3" fill="#0B1E3D" />
    <rect x="57" y="10" width="6" height="16" rx="3" fill="#0B1E3D" />
    <rect x="84" y="10" width="6" height="16" rx="3" fill="#0B1E3D" />
    {/* Month label */}
    <text x="60" y="33" textAnchor="middle" fontSize="9" fontWeight="600"
      fontFamily="Inter, sans-serif" fill="#FFFFFF" stroke="none">COMPLIANCE CALENDAR</text>

    {/* Day grid — 4 rows × 7 cols */}
    {[48, 62, 76, 90].map((y, ri) =>
      [14, 25, 36, 47, 58, 69, 80, 91, 102].map((x, xi) => {
        const isHighPenalty = (x === 69 && y === 48) || (x === 36 && y === 76) || (x === 91 && y === 62);
        const isMedPenalty  = (x === 47 && y === 62) || (x === 102 && y === 76);
        const isApproved    = (x === 25 && y === 48) || (x === 80 && y === 90);
        return (
          <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" rx="2"
            fill={isHighPenalty ? "#E8632A" : isMedPenalty ? "#FDE68A" : isApproved ? "#D1FAE5" : "#F5F6F8"}
          />
        );
      })
    )}

    {/* Alert icons on high-penalty dates */}
    {[[73, 52], [40, 80], [95, 66]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="5" fill="#C1272D" />
        <text x={x} y={y + 4} textAnchor="middle" fontSize="7" fontWeight="700"
          fill="#fff" stroke="none">!</text>
      </g>
    ))}

    {/* Today marker */}
    <circle cx="29" cy="52" r="5" fill="none" stroke="#E8632A" strokeWidth="1.5" />
  </svg>
);
