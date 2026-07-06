import React from "react";
import { Link } from "react-router-dom";
import { ServiceIcon } from "./ServiceIcons";

/**
 * Pillar tint system — subtle background + border color per practice area.
 * On hover: all chips shift to coral regardless of tint for consistent CTA feel.
 */
const PILLAR_TINTS = {
  "start-a-business": {
    bg: "#FFFBEB",
    border: "#D97706",
    text: "#92400E",
    label: "Start a Business",
  },
  "protect-your-brand": {
    bg: "#F5F3FF",
    border: "#7C3AED",
    text: "#4C1D95",
    label: "Protect Your Brand",
  },
  "tax-compliance": {
    bg: "#FFF1EB",
    border: "#E8632A",
    text: "#7C2D12",
    label: "Tax & Compliance",
  },
  "people-money": {
    bg: "#F0FDFA",
    border: "#0D9488",
    text: "#134E4A",
    label: "People & Money",
  },
  "grow-certify": {
    bg: "#F0FDF4",
    border: "#16A34A",
    text: "#14532D",
    label: "Grow & Certify",
  },
};

const CHIPS = [
  { label: "GST Registration",      slug: "gst-registration",         pillar: "tax-compliance",      to: "/service/gst-registration" },
  { label: "Pvt Ltd Registration",  slug: "private-limited-company",   pillar: "start-a-business",    to: "/service/private-limited-company" },
  { label: "Trademark Filing",      slug: "trademark-filing",          pillar: "protect-your-brand",  to: "/service/trademark-filing" },
  { label: "ITR Filing",            slug: "income-tax-return",         pillar: "tax-compliance",      to: "/service/income-tax-return" },
  { label: "Payroll",               slug: "payroll-management",        pillar: "people-money",        to: "/service/payroll-management" },
  { label: "MSME / Udyam",          slug: "msme-udyam",                pillar: "grow-certify",        to: "/service/msme-udyam" },
  { label: "LLP Registration",      slug: "llp-registration",          pillar: "start-a-business",    to: "/service/llp-registration" },
  { label: "Copyright",             slug: "copyright-registration",    pillar: "protect-your-brand",  to: "/service/copyright-registration" },
];

export const QuickNavChips = () => (
  <div className="section-warm border-b border-ink/10" data-testid="quick-nav-chips">
    <div className="container-x py-6">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-slate2 mb-4">
        Most-searched services — jump straight in
      </div>
      <div className="flex flex-wrap gap-3">
        {CHIPS.map((chip) => {
          const tint = PILLAR_TINTS[chip.pillar] || {};
          return (
            <Link
              key={chip.slug}
              to={chip.to}
              className="service-chip group"
              style={{
                backgroundColor: tint.bg,
                borderColor: tint.border,
                color: tint.text,
              }}
              data-testid={`quick-chip-${chip.slug}`}
              title={tint.label}
            >
              <ServiceIcon
                slug={chip.slug}
                size={18}
                color={tint.border}
                className="group-hover:brightness-0 group-hover:invert transition-all"
              />
              {chip.label}
            </Link>
          );
        })}
      </div>

      {/* Pillar legend — compact, helps users see the category system */}
      <div className="mt-4 flex flex-wrap gap-3 items-center">
        {Object.entries(PILLAR_TINTS).map(([key, { bg, border, text, label }]) => (
          <span
            key={key}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium mono uppercase tracking-widest"
            style={{ backgroundColor: bg, border: `1px solid ${border}`, color: text }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: border }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
);
