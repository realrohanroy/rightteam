/**
 * ResourceCards.jsx
 * Four content guide cards with custom SVG illustration thumbnails.
 * Links are stub hrefs — replace with real blog/guide URLs before launch.
 */
import React from "react";
import { ArrowRight } from "lucide-react";

// Small SVG thumbnails — one per guide, concrete metaphors
const GSTCalendarThumb = () => (
  <svg viewBox="0 0 80 56" width="80" height="56" fill="none" aria-hidden>
    <rect width="80" height="56" rx="4" fill="#F7F4EC" />
    <rect x="8" y="10" width="64" height="38" rx="2" stroke="#0B1E3D" strokeWidth="1.5" fill="white" />
    <rect x="8" y="10" width="64" height="12" rx="2" fill="#0B1E3D" />
    <line x1="22" y1="6" x2="22" y2="16" stroke="#0B1E3D" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="6" x2="58" y2="16" stroke="#0B1E3D" strokeWidth="2" strokeLinecap="round" />
    {[26, 36, 46].map(y =>
      [16, 26, 36, 46, 56, 66].map(x => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" rx="1"
          fill={([36, 26], [56, 46]).flat().includes(x) && y === 36 ? "#C1272D" : "#F5F6F8"} />
      ))
    )}
    <circle cx="60" cy="36" r="4" fill="#C1272D" />
    <text x="60" y="39" textAnchor="middle" fontSize="5" fontWeight="700" fill="white">!</text>
  </svg>
);

const RegistrationThumb = () => (
  <svg viewBox="0 0 80 56" width="80" height="56" fill="none" aria-hidden>
    <rect width="80" height="56" rx="4" fill="#F7F4EC" />
    {/* Building */}
    <rect x="24" y="20" width="32" height="28" rx="1" fill="white" stroke="#0B1E3D" strokeWidth="1.5" />
    <path d="M20 22 L40 10 L60 22" stroke="#0B1E3D" strokeWidth="1.5" fill="#F7F4EC" />
    <rect x="34" y="34" width="12" height="14" rx="1" fill="#0B1E3D" opacity="0.15" />
    <rect x="28" y="26" width="8" height="6" rx="1" fill="#0B1E3D" opacity="0.2" />
    <rect x="44" y="26" width="8" height="6" rx="1" fill="#0B1E3D" opacity="0.2" />
    {/* Check badge */}
    <circle cx="60" cy="16" r="8" fill="#1E5631" />
    <polyline points="57,16 59,18 63,13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TrademarkThumb = () => (
  <svg viewBox="0 0 80 56" width="80" height="56" fill="none" aria-hidden>
    <rect width="80" height="56" rx="4" fill="#F7F4EC" />
    <path d="M40 8 L56 16 L56 34 C56 44 48 50 40 52 C32 50 24 44 24 34 L24 16 Z" fill="white" stroke="#0B1E3D" strokeWidth="1.5" />
    <text x="40" y="36" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="serif" fill="#0B1E3D">™</text>
    <text x="40" y="42" textAnchor="middle" fontSize="5" fontFamily="Inter, sans-serif" fill="#0B1E3D" opacity="0.5">vs ©</text>
  </svg>
);

const PayrollThumb = () => (
  <svg viewBox="0 0 80 56" width="80" height="56" fill="none" aria-hidden>
    <rect width="80" height="56" rx="4" fill="#F7F4EC" />
    {/* Payslip */}
    <rect x="14" y="10" width="38" height="36" rx="2" fill="white" stroke="#0B1E3D" strokeWidth="1.5" />
    <line x1="20" y1="18" x2="46" y2="18" stroke="#0B1E3D" strokeWidth="1" opacity="0.4" />
    <line x1="20" y1="24" x2="46" y2="24" stroke="#0B1E3D" strokeWidth="1" opacity="0.4" />
    <line x1="20" y1="30" x2="40" y2="30" stroke="#0B1E3D" strokeWidth="1" opacity="0.4" />
    <rect x="20" y="34" width="26" height="6" rx="1" fill="#1E5631" opacity="0.15" />
    <text x="22" y="40" fontSize="5" fontFamily="Inter, sans-serif" fill="#1E5631" fontWeight="600">₹ NET PAY</text>
    {/* People icons */}
    <circle cx="56" cy="20" r="5" fill="#0B1E3D" opacity="0.8" />
    <circle cx="64" cy="20" r="5" fill="#0B1E3D" opacity="0.6" />
    <path d="M50 34 C50 28 62 28 62 34" stroke="#0B1E3D" strokeWidth="1.5" fill="none" opacity="0.8" />
    <path d="M58 34 C58 28 70 28 70 34" stroke="#0B1E3D" strokeWidth="1.5" fill="none" opacity="0.6" />
  </svg>
);

const RESOURCES = [
  {
    thumb: RegistrationThumb,
    title: "Company Registration: The Full Process",
    desc: "From choosing an entity type to receiving your incorporation certificate — every step explained.",
    href: "/resources/company-registration-guide",
    tag: "Incorporation",
  },
  {
    thumb: GSTCalendarThumb,
    title: "GST Filing Deadlines Explained",
    desc: "GSTR-1, GSTR-3B, annual GSTR-9 — due dates, penalties, and what happens if you miss one.",
    href: "/resources/gst-filing-deadlines",
    tag: "Tax & GST",
  },
  {
    thumb: TrademarkThumb,
    title: "Trademark vs Copyright: What You Need",
    desc: "When you need a ™, when you need a ©, and when you need both. A plain-language guide for founders.",
    href: "/resources/trademark-vs-copyright",
    tag: "IP & Brand",
  },
  {
    thumb: PayrollThumb,
    title: "Payroll Compliance in India: 2025 Guide",
    desc: "PF, ESI, TDS on salary, Professional Tax — your complete monthly compliance checklist.",
    href: "/resources/payroll-compliance-india",
    tag: "Payroll",
  },
];

export const ResourceCards = () => (
  <section className="bg-white py-20 border-t border-ink/10" data-testid="resource-cards">
    <div className="container-x">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div className="max-w-2xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Compliance guides
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Know what's due before it's overdue.
          </h2>
        </div>
        <a
          href="/resources"
          className="text-sm underline underline-offset-4 decoration-gold decoration-2 text-ink"
        >
          All guides →
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RESOURCES.map((r, i) => {
          const Thumb = r.thumb;
          return (
            <a
              key={i}
              href={r.href}
              className="paper-card group flex flex-col overflow-hidden"
              data-testid={`resource-card-${i}`}
            >
              {/* Thumbnail */}
              <div className="bg-[#F7F4EC] border-b border-ink/10 p-4 flex items-center justify-center">
                <Thumb />
              </div>
              <div className="p-5 flex flex-col flex-1">
                {/* Tag */}
                <div className="mono text-[10px] uppercase tracking-widest text-gold font-semibold mb-2">
                  {r.tag}
                </div>
                <h3 className="font-display text-base text-ink leading-snug flex-1">
                  {r.title}
                </h3>
                <p className="text-sm text-slate2 mt-2 leading-relaxed">
                  {r.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-ink group-hover:text-[#E8632A] transition-colors">
                  Read guide <ArrowRight size={14} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);
