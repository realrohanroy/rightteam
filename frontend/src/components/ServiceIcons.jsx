/**
 * ServiceIcons.jsx
 * Bespoke single-weight line icons for every RightTeam service.
 * Spec: 48×48 viewport · 2px stroke · strokeLinecap="round" · strokeLinejoin="round"
 * Color is passed as `color` prop (defaults to #0B1E3D / navy ink).
 */
import React from "react";

const icon = (paths) =>
  ({ color = "#0B1E3D", size = 48, className = "" }) => (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths}
    </svg>
  );

// ── Start a Business ─────────────────────────────────────────────────────────

export const PrivateLimitedIcon = icon(
  <>
    {/* Two-storey building with plaque */}
    <rect x="8" y="20" width="32" height="22" rx="1" />
    <rect x="14" y="28" width="8" height="14" />
    <rect x="26" y="28" width="8" height="8" />
    <path d="M8 20 L24 8 L40 20" />
    <line x1="16" y1="8" x2="16" y2="16" />
    <rect x="20" y="24" width="8" height="4" rx="0.5" strokeWidth="1.5" />
  </>
);

export const OnePersonCompanyIcon = icon(
  <>
    {/* Single figure + shield */}
    <circle cx="22" cy="14" r="6" />
    <path d="M10 40 C10 30 34 30 34 40" />
    <path d="M30 18 L38 21 L38 30 C38 35 34 38 30 40 C26 38 22 35 22 30 L22 21 Z" />
    <polyline points="26,29 29,32 35,25" />
  </>
);

export const LLPRegistrationIcon = icon(
  <>
    {/* Two handshake silhouettes + chain link */}
    <path d="M6 28 L14 24 L20 26 L26 24 L34 28" />
    <path d="M14 24 C14 19 20 17 20 22 C20 17 26 19 26 24" />
    <ellipse cx="36" cy="32" rx="5" ry="5" />
    <ellipse cx="36" cy="32" rx="2.5" ry="2.5" fill={undefined} />
    <path d="M20 26 L31 32" />
    <circle cx="10" cy="32" r="5" />
    <circle cx="10" cy="32" r="2.5" />
    <path d="M15 32 L31 32" />
  </>
);

export const Section8NGOIcon = icon(
  <>
    {/* Document with heart inside */}
    <rect x="10" y="6" width="28" height="36" rx="2" />
    <path d="M17 22 C17 18 23 17 24 22 C25 17 31 18 31 22 C31 27 24 32 24 32 C24 32 17 27 17 22 Z" />
    <line x1="16" y1="12" x2="32" y2="12" />
  </>
);

export const PublicLimitedIcon = icon(
  <>
    {/* Classical columns + bar chart */}
    <rect x="8" y="38" width="32" height="3" />
    <rect x="8" y="10" width="32" height="3" />
    <rect x="11" y="13" width="4" height="25" />
    <rect x="22" y="13" width="4" height="25" />
    <rect x="33" y="13" width="4" height="25" />
    <rect x="18" y="26" width="3" height="12" fill={undefined} opacity="0.5" />
    <rect x="27" y="20" width="3" height="18" fill={undefined} opacity="0.5" />
  </>
);

export const PartnershipFirmIcon = icon(
  <>
    {/* Two hands joining center */}
    <path d="M6 24 L16 20 L18 26 L24 24" />
    <path d="M42 24 L32 20 L30 26 L24 24" />
    <circle cx="24" cy="24" r="3" />
    <circle cx="10" cy="36" r="6" />
    <path d="M10 30 L10 24" />
    <circle cx="38" cy="36" r="6" />
    <path d="M38 30 L38 24" />
  </>
);

export const StartupIndiaIcon = icon(
  <>
    {/* Rocket + DPIIT star badge */}
    <path d="M24 8 C24 8 32 12 32 24 L24 42 L16 24 C16 12 24 8 24 8 Z" />
    <circle cx="24" cy="24" r="3" />
    <path d="M16 24 L8 32 L14 30" />
    <path d="M32 24 L40 32 L34 30" />
    <path d="M38 10 L39.2 13.6 L43 13.6 L40 16 L41.2 19.6 L38 17.2 L34.8 19.6 L36 16 L33 13.6 L36.8 13.6 Z" strokeWidth="1.5" />
  </>
);

export const CompanyNameSearchIcon = icon(
  <>
    {/* Magnifier over text lines */}
    <circle cx="20" cy="20" r="11" />
    <line x1="28" y1="28" x2="40" y2="40" />
    <line x1="15" y1="16" x2="25" y2="16" />
    <line x1="15" y1="20" x2="25" y2="20" />
    <line x1="15" y1="24" x2="22" y2="24" />
  </>
);

export const DigitalSignatureIcon = icon(
  <>
    {/* USB token + lock */}
    <rect x="14" y="20" width="20" height="22" rx="2" />
    <rect x="20" y="26" width="8" height="10" rx="1" />
    <circle cx="24" cy="29" r="2" />
    <line x1="24" y1="31" x2="24" y2="34" />
    <rect x="18" y="12" width="12" height="8" rx="1" />
    <line x1="22" y1="8" x2="22" y2="12" />
    <line x1="26" y1="8" x2="26" y2="12" />
    <line x1="24" y1="6" x2="24" y2="8" />
  </>
);

export const ImportExportIcon = icon(
  <>
    {/* Globe with bidirectional arrows */}
    <circle cx="24" cy="24" r="16" />
    <ellipse cx="24" cy="24" rx="7" ry="16" />
    <line x1="8" y1="24" x2="40" y2="24" />
    <line x1="10" y1="16" x2="38" y2="16" />
    <line x1="10" y1="32" x2="38" y2="32" />
    <polyline points="6,10 10,14 14,10" />
    <line x1="10" y1="14" x2="10" y2="6" />
    <polyline points="42,38 38,34 34,38" />
    <line x1="38" y1="34" x2="38" y2="42" />
  </>
);

// ── Protect Your Brand ───────────────────────────────────────────────────────

export const TrademarkFilingIcon = icon(
  <>
    {/* ™ letterform inside shield */}
    <path d="M24 6 L38 12 L38 28 C38 36 31 42 24 44 C17 42 10 36 10 28 L10 12 Z" />
    <text
      x="24"
      y="30"
      textAnchor="middle"
      fontSize="14"
      fontWeight="600"
      fontFamily="serif"
      fill="#0B1E3D"
      stroke="none"
    >
      ™
    </text>
  </>
);

export const TrademarkObjectionIcon = icon(
  <>
    {/* Document + red exclamation + pen */}
    <rect x="8" y="6" width="24" height="32" rx="2" />
    <line x1="14" y1="14" x2="26" y2="14" />
    <line x1="14" y1="19" x2="26" y2="19" />
    <line x1="14" y1="24" x2="20" y2="24" />
    <circle cx="35" cy="16" r="7" />
    <line x1="35" y1="12" x2="35" y2="18" />
    <circle cx="35" cy="20" r="1" fill="#0B1E3D" stroke="none" />
    <line x1="28" y1="36" x2="42" y2="36" />
    <path d="M34 34 L38 38" />
  </>
);

export const TrademarkRenewalIcon = icon(
  <>
    {/* Circular renewal arrow around ™ */}
    <path d="M24 10 A14 14 0 1 1 12 32" />
    <polyline points="8,28 12,32 16,28" />
    <text
      x="24"
      y="28"
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      fontFamily="serif"
      fill="#0B1E3D"
      stroke="none"
    >
      ™
    </text>
  </>
);

export const TrademarkAssignmentIcon = icon(
  <>
    {/* Transfer arrow between two entities */}
    <rect x="4" y="14" width="14" height="18" rx="2" />
    <rect x="30" y="14" width="14" height="18" rx="2" />
    <path d="M18 22 L22 18 L30 22 L22 26 Z" />
    <line x1="7" y1="20" x2="15" y2="20" />
    <line x1="7" y1="24" x2="15" y2="24" />
    <line x1="33" y1="20" x2="41" y2="20" />
    <line x1="33" y1="24" x2="41" y2="24" />
  </>
);

export const CopyrightRegistrationIcon = icon(
  <>
    {/* © letterform + quill pen */}
    <circle cx="20" cy="24" r="14" />
    <path d="M27 18 C24 14 14 16 14 24 C14 32 24 34 27 30" />
    <path d="M36 8 C36 8 44 12 40 22 L32 30 L28 32 L30 28 L38 18 C38 18 40 14 36 8 Z" />
    <line x1="28" y1="32" x2="26" y2="38" />
  </>
);

export const PatentFilingIcon = icon(
  <>
    {/* Lightbulb + filing tray */}
    <path d="M24 8 A10 10 0 0 1 30 26 L30 30 L18 30 L18 26 A10 10 0 0 1 24 8 Z" />
    <rect x="18" y="30" width="12" height="4" rx="1" />
    <line x1="21" y1="34" x2="27" y2="34" />
    <rect x="8" y="38" width="32" height="6" rx="1" />
    <line x1="8" y1="41" x2="40" y2="41" />
    <line x1="24" y1="18" x2="24" y2="24" />
  </>
);

// ── Tax & Compliance ─────────────────────────────────────────────────────────

export const GSTRegistrationIcon = icon(
  <>
    {/* GST letterform with official stamp ring */}
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="12" strokeDasharray="2 2" strokeWidth="1" />
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fontSize="11"
      fontWeight="700"
      fontFamily="Inter, sans-serif"
      fill="#0B1E3D"
      stroke="none"
    >
      GST
    </text>
  </>
);

export const GSTMonthlyFilingIcon = icon(
  <>
    {/* Calendar grid with checkmarks */}
    <rect x="6" y="10" width="36" height="32" rx="2" />
    <line x1="6" y1="18" x2="42" y2="18" />
    <line x1="16" y1="6" x2="16" y2="14" />
    <line x1="32" y1="6" x2="32" y2="14" />
    <polyline points="13,25 15,28 20,22" strokeWidth="2.5" />
    <polyline points="26,25 28,28 33,22" strokeWidth="2.5" />
    <polyline points="13,35 15,38 20,32" strokeWidth="2.5" />
    <line x1="26" y1="35" x2="34" y2="35" strokeDasharray="2 2" />
  </>
);

export const IncomeTaxReturnIcon = icon(
  <>
    {/* Calculator with rupee symbol */}
    <rect x="10" y="8" width="28" height="34" rx="2" />
    <rect x="14" y="12" width="20" height="8" rx="1" />
    <rect x="14" y="24" width="5" height="5" rx="0.5" />
    <rect x="21.5" y="24" width="5" height="5" rx="0.5" />
    <rect x="29" y="24" width="5" height="5" rx="0.5" />
    <rect x="14" y="32" width="5" height="5" rx="0.5" />
    <rect x="21.5" y="32" width="5" height="5" rx="0.5" />
    <rect x="29" y="24" width="5" height="13" rx="0.5" />
    {/* Rupee symbol inside display */}
    <text x="20" y="19" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0B1E3D" stroke="none" fontFamily="Inter, sans-serif">₹</text>
  </>
);

export const TDSReturnIcon = icon(
  <>
    {/* Salary bar chart with deduction arrow */}
    <rect x="8" y="30" width="8" height="12" />
    <rect x="20" y="20" width="8" height="22" />
    <rect x="32" y="10" width="8" height="32" />
    <path d="M8 8 L40 8" strokeDasharray="3 2" />
    <path d="M10 6 L36 6 L36 2" strokeWidth="1.5" />
    <path d="M32 2 L40 2" />
    <polyline points="36,2 40,6 36,10" />
  </>
);

export const ROCAnnualFilingIcon = icon(
  <>
    {/* Building + stacked annual report */}
    <rect x="14" y="10" width="20" height="26" rx="1" />
    <path d="M14 10 L24 4 L34 10" />
    <line x1="21" y1="18" x2="27" y2="18" />
    <line x1="21" y1="22" x2="27" y2="22" />
    <rect x="6" y="32" width="12" height="10" rx="1" />
    <rect x="8" y="34" width="12" height="10" rx="1" />
    <rect x="10" y="36" width="12" height="6" rx="1" />
    <line x1="12" y1="39" x2="20" y2="39" />
  </>
);

export const DIR3KYCIcon = icon(
  <>
    {/* Director silhouette + ID card */}
    <rect x="10" y="20" width="28" height="20" rx="2" />
    <circle cx="18" cy="30" r="4" />
    <line x1="24" y1="27" x2="34" y2="27" />
    <line x1="24" y1="31" x2="34" y2="31" />
    <circle cx="24" cy="12" r="6" />
    <path d="M14 20 C14 16 34 16 34 20" />
  </>
);

export const DirectorShareChangesIcon = icon(
  <>
    {/* Org-chart nodes with transfer arrow */}
    <rect x="18" y="4" width="12" height="10" rx="1" />
    <line x1="24" y1="14" x2="24" y2="20" />
    <line x1="12" y1="20" x2="36" y2="20" />
    <line x1="12" y1="20" x2="12" y2="26" />
    <line x1="36" y1="20" x2="36" y2="26" />
    <rect x="6" y="26" width="12" height="10" rx="1" />
    <rect x="30" y="26" width="12" height="10" rx="1" />
    <path d="M18 40 L24 36 L30 40 L24 44 Z" />
    <line x1="24" y1="36" x2="24" y2="44" />
  </>
);

export const CompanyClosureIcon = icon(
  <>
    {/* Door closing / strike-off */}
    <rect x="12" y="6" width="24" height="36" rx="2" />
    <circle cx="31" cy="24" r="2" />
    <line x1="10" y1="42" x2="38" y2="42" />
    {/* Strike-through X */}
    <line x1="8" y1="8" x2="40" y2="40" strokeWidth="2.5" stroke="#C1272D" />
    <line x1="40" y1="8" x2="8" y2="40" strokeWidth="2.5" stroke="#C1272D" />
  </>
);

// ── People & Money ───────────────────────────────────────────────────────────

export const PayrollManagementIcon = icon(
  <>
    {/* Payslip document + 3 employee avatar row */}
    <rect x="10" y="14" width="28" height="28" rx="2" />
    <line x1="16" y1="22" x2="32" y2="22" />
    <line x1="16" y1="27" x2="28" y2="27" />
    <line x1="16" y1="32" x2="22" y2="32" />
    <line x1="28" y1="32" x2="32" y2="32" />
    {/* Three mini avatars above */}
    <circle cx="16" cy="8" r="3" />
    <circle cx="24" cy="8" r="3" />
    <circle cx="32" cy="8" r="3" />
  </>
);

export const PFRegistrationIcon = icon(
  <>
    {/* PF shield + workers */}
    <path d="M24 4 L38 10 L38 26 C38 34 31 40 24 42 C17 40 10 34 10 26 L10 10 Z" />
    <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" fill="#0B1E3D" stroke="none">PF</text>
    <circle cx="14" cy="44" r="3" />
    <circle cx="24" cy="44" r="3" />
    <circle cx="34" cy="44" r="3" />
  </>
);

export const ESIRegistrationIcon = icon(
  <>
    {/* Medical cross + contribution bar */}
    <rect x="18" y="8" width="12" height="20" rx="1" />
    <rect x="12" y="14" width="24" height="8" rx="1" />
    <rect x="8" y="32" width="8" height="10" rx="1" />
    <rect x="20" y="28" width="8" height="14" rx="1" />
    <rect x="32" y="24" width="8" height="18" rx="1" />
    <line x1="6" y1="42" x2="42" y2="42" />
  </>
);

export const AccountingBookkeepingIcon = icon(
  <>
    {/* Open ledger + balance scale */}
    <rect x="6" y="10" width="18" height="28" rx="1" />
    <rect x="24" y="10" width="18" height="28" rx="1" />
    <line x1="6" y1="18" x2="24" y2="18" />
    <line x1="24" y1="18" x2="42" y2="18" />
    <line x1="10" y1="24" x2="22" y2="24" />
    <line x1="26" y1="24" x2="38" y2="24" />
    <line x1="10" y1="28" x2="22" y2="28" />
    <line x1="26" y1="28" x2="38" y2="28" />
    {/* Scale beam */}
    <line x1="24" y1="4" x2="24" y2="10" />
    <line x1="12" y1="4" x2="36" y2="4" />
    <ellipse cx="12" cy="7" rx="4" ry="2" />
    <ellipse cx="36" cy="7" rx="4" ry="2" />
  </>
);

export const VirtualCFOIcon = icon(
  <>
    {/* Line chart + star crown */}
    <polyline points="6,36 16,24 24,28 32,14 42,8" strokeWidth="2.5" />
    <circle cx="42" cy="8" r="3" />
    <circle cx="32" cy="14" r="3" />
    <circle cx="24" cy="28" r="3" />
    <circle cx="16" cy="24" r="3" />
    {/* Crown */}
    <path d="M16 42 L20 36 L24 40 L28 34 L32 38 L36 32 L38 42 Z" strokeWidth="1.5" />
  </>
);

// ── Grow & Certify ───────────────────────────────────────────────────────────

export const ISOCertificationIcon = icon(
  <>
    {/* ISO square badge with certification ribbon */}
    <rect x="8" y="10" width="32" height="24" rx="2" />
    <text x="24" y="27" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif" fill="#0B1E3D" stroke="none">ISO</text>
    <path d="M16 34 L16 44 L24 40 L32 44 L32 34" />
    <circle cx="24" cy="36" r="3" fill="#0B1E3D" stroke="none" />
  </>
);

export const MSMEUdyamIcon = icon(
  <>
    {/* Gear cog + certificate ribbon */}
    <circle cx="22" cy="22" r="8" />
    <circle cx="22" cy="22" r="4" />
    {/* Gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 22 + 8 * Math.cos(rad);
      const y1 = 22 + 8 * Math.sin(rad);
      const x2 = 22 + 11 * Math.cos(rad);
      const y2 = 22 + 11 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />;
    })}
    <rect x="30" y="8" width="12" height="16" rx="1" />
    <line x1="33" y1="14" x2="39" y2="14" />
    <line x1="33" y1="18" x2="39" y2="18" />
    <path d="M32 24 L32 34 L36 30 L40 34 L40 24" />
  </>
);

export const FSSAIRegistrationIcon = icon(
  <>
    {/* Plate/bowl + FSSAI approval mark */}
    <ellipse cx="24" cy="28" rx="16" ry="4" />
    <path d="M8 28 C8 20 40 20 40 28" />
    <circle cx="24" cy="22" r="6" />
    <polyline points="21,22 23,24 27,20" strokeWidth="2.5" />
    <path d="M16 14 Q24 10 32 14" />
    <circle cx="36" cy="14" r="5" />
    <polyline points="34,14 35.5,15.5 38,13" strokeWidth="2" />
  </>
);

export const BusinessLicensesIcon = icon(
  <>
    {/* Shop fascia + licence stamp */}
    <rect x="6" y="18" width="36" height="24" rx="1" />
    <path d="M6 18 L6 12 L42 12 L42 18" />
    <path d="M4 10 L44 10" />
    <path d="M16 42 L16 28 L28 28 L28 42" />
    <rect x="30" y="28" width="10" height="8" rx="1" />
    <circle cx="38" cy="14" r="7" />
    <polyline points="35,14 37.5,16.5 42,12" strokeWidth="2.5" />
  </>
);

// ── Master lookup by slug ─────────────────────────────────────────────────────

const ICON_MAP = {
  "private-limited-company": PrivateLimitedIcon,
  "one-person-company": OnePersonCompanyIcon,
  "llp-registration": LLPRegistrationIcon,
  "section-8-ngo": Section8NGOIcon,
  "public-limited-company": PublicLimitedIcon,
  "partnership-firm": PartnershipFirmIcon,
  "startup-india-recognition": StartupIndiaIcon,
  "company-name-search": CompanyNameSearchIcon,
  "digital-signature-certificate": DigitalSignatureIcon,
  "import-export-code": ImportExportIcon,
  "trademark-filing": TrademarkFilingIcon,
  "trademark-objection-reply": TrademarkObjectionIcon,
  "trademark-renewal": TrademarkRenewalIcon,
  "trademark-assignment": TrademarkAssignmentIcon,
  "copyright-registration": CopyrightRegistrationIcon,
  "patent-filing": PatentFilingIcon,
  "gst-registration": GSTRegistrationIcon,
  "gst-monthly-filing": GSTMonthlyFilingIcon,
  "income-tax-return": IncomeTaxReturnIcon,
  "tds-return-filing": TDSReturnIcon,
  "roc-annual-filing": ROCAnnualFilingIcon,
  "dir-3-kyc": DIR3KYCIcon,
  "director-share-changes": DirectorShareChangesIcon,
  "company-closure": CompanyClosureIcon,
  "payroll-management": PayrollManagementIcon,
  "pf-registration-filing": PFRegistrationIcon,
  "esi-registration-filing": ESIRegistrationIcon,
  "accounting-bookkeeping": AccountingBookkeepingIcon,
  "virtual-cfo": VirtualCFOIcon,
  "iso-certification": ISOCertificationIcon,
  "msme-udyam": MSMEUdyamIcon,
  "fssai-registration": FSSAIRegistrationIcon,
  "business-licenses": BusinessLicensesIcon,
};

/**
 * ServiceIcon — resolves the correct icon for a service slug.
 * Falls back to a generic document icon if slug not found.
 */
export const ServiceIcon = ({ slug, size = 48, color = "#0B1E3D", className = "" }) => {
  const Icon = ICON_MAP[slug];
  if (Icon) return <Icon size={size} color={color} className={className} />;
  // Generic fallback: document outline
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="10" y="6" width="28" height="36" rx="2" />
      <line x1="16" y1="16" x2="32" y2="16" />
      <line x1="16" y1="22" x2="32" y2="22" />
      <line x1="16" y1="28" x2="24" y2="28" />
    </svg>
  );
};
