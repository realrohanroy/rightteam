import React, { useState } from "react";
import { ENTITY_TYPES } from "../data/marketing";
import { SERVICES } from "../data/services";
import {
  Building2, Users, Briefcase, Shield, TrendingUp, CheckCircle, ArrowRight, Phone
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── Entity icon map ────────────────────────────────────────────────────────
const ENTITY_ICONS = {
  "sole-prop":   { icon: Briefcase,  color: "#E8522B" },
  "partnership": { icon: Users,      color: "#3B82F6" },
  "llp":         { icon: Shield,     color: "#8B5CF6" },
  "opc":         { icon: Building2,  color: "#10B981" },
  "pvt-ltd":     { icon: Building2,  color: "#0B1E3D" },
  "public-ltd":  { icon: TrendingUp, color: "#F59E0B" },
};

// ─── Mapping Entities to Required Compliances ───────────────────────────────
const ENTITY_COMPLIANCE_MAP = {
  "sole-prop": [
    "gst-returns",
    "income-tax-filing",
    "accounting-bookkeeping",
    "municipal-trade-license",
    "professional-tax"
  ],
  "partnership": [
    "gst-returns",
    "income-tax-filing",
    "accounting-bookkeeping",
    "tds-return-filing"
  ],
  "llp": [
    "roc-annual-filing",
    "income-tax-filing",
    "gst-returns",
    "accounting-bookkeeping"
  ],
  "opc": [
    "roc-annual-filing",
    "auditing",
    "income-tax-filing",
    "gst-returns",
    "tds-return-filing",
    "accounting-bookkeeping"
  ],
  "pvt-ltd": [
    "roc-annual-filing",
    "auditing",
    "income-tax-filing",
    "gst-returns",
    "tds-return-filing",
    "accounting-bookkeeping"
  ],
  "public-ltd": [
    "roc-annual-filing",
    "auditing",
    "income-tax-filing",
    "gst-returns",
    "tds-return-filing",
    "accounting-bookkeeping"
  ]
};

// ─── SEO summary strip — always visible, crawlable by search engines ────────
// Short 2-sentence summary + link to full guide; keeps homepage clean.
const SeoContextBlock = ({ inverted }) => (
  <aside
    aria-label="About business compliance in India"
    className={`w-full mt-8 rounded-xl border px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm ${
      inverted
        ? "border-white/10 bg-white/5 text-white/65"
        : "border-ink/10 bg-gray-50/70 text-ink/60"
    }`}
  >
    <p className="leading-relaxed flex-1">
      Every business structure in India — from a <strong className={inverted ? "text-white/85" : "text-ink/80"}>Private Limited Company</strong> to
      an <strong className={inverted ? "text-white/85" : "text-ink/80"}>LLP</strong> or Sole Proprietorship — carries different{" "}
      <strong className={inverted ? "text-white/85" : "text-ink/80"}>statutory compliance</strong> obligations under the Companies Act, GST law, and Income Tax Act.
      Select your business type above to generate your personalised checklist.
    </p>
    <Link
      to="/blogs/business-compliance-guide-india"
      className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
        inverted ? "text-brand hover:text-brand/80" : "text-brand hover:text-brand/80"
      }`}
      aria-label="Read the full business compliance guide for India"
    >
      Read the full compliance guide <ArrowRight size={13} aria-hidden="true" />
    </Link>
  </aside>
);

// ─── Trust + conversion CTA block — shown below results ─────────────────────
const ConversionBlock = ({ inverted }) => (
  <div
    className={`w-full mt-6 rounded-xl border px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
      inverted
        ? "border-white/10 bg-white/5"
        : "border-ink/10 bg-gray-50"
    }`}
  >
    <div className="flex-1">
      <p className={`font-semibold text-base ${inverted ? "text-white" : "text-ink"}`}>
        Need help completing these compliances?
      </p>
      <p className={`mt-1 text-sm leading-relaxed ${inverted ? "text-white/65" : "text-ink/65"}`}>
        Our compliance specialists help businesses stay compliant, avoid penalties, and meet every statutory deadline.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
      <Link
        to="/contact"
        className="btn-primary flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-lg bg-brand border-none hover:bg-brand/90 hover:scale-[1.02] transition-all shadow-md"
        aria-label="Talk to a compliance expert at RightTeam"
      >
        <Phone size={15} />
        Talk to a Compliance Expert
      </Link>
      <Link
        to="/quote"
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-lg border transition-all ${
          inverted
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-ink/25 text-ink hover:bg-white hover:border-ink/40"
        }`}
        aria-label="Book a free compliance consultation"
      >
        Book a Free Consultation
      </Link>
    </div>
  </div>
);

export const ComplianceChecklist = ({ inverted = false, defaultEntity = "" }) => {
  const [entity, setEntity] = useState(defaultEntity);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const label = inverted ? "text-white/50" : "text-slate2";

  React.useEffect(() => {
    if (defaultEntity) setEntity(defaultEntity);
  }, [defaultEntity]);

  const activeRequiredServices = entity
    ? (ENTITY_COMPLIANCE_MAP[entity] || [])
        .map(slug => SERVICES.find(s => s.slug === slug))
        .filter(Boolean)
    : [];

  return (
    <section
      className="container-x pt-0 w-full max-w-full overflow-x-hidden"
      data-testid="compliance-checklist"
      aria-label="Business compliance checker"
    >
      <div className="flex flex-col items-center gap-10 w-full max-w-3xl mx-auto">

        {/* ── Entity picker ── */}
        <div className="w-full flex flex-col items-center text-center">
          {/* Eyebrow — "What type of business do you operate?" */}
          <p className={`mono text-[11px] uppercase tracking-[0.22em] ${label}`}>
            What type of business do you operate?
          </p>

          <div className="mt-6 w-full max-w-full">
            {/* Entity type grid — aria-label for screen readers */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-full"
              data-testid="risk-entity-tiles"
              role="group"
              aria-label="Select your business structure"
            >
              {ENTITY_TYPES.map((et) => {
                const cfg = ENTITY_ICONS[et.key] || { icon: Building2, color: "#0B1E3D" };
                const Icon = cfg.icon;
                const active = entity === et.key;
                return (
                  <button
                    key={et.key}
                    type="button"
                    onClick={() => { setEntity(et.key); setHasSubmitted(false); }}
                    data-testid={`entity-tile-${et.key}`}
                    data-route={et.futureRoute}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all text-center cursor-pointer select-none min-w-0 ${
                      active
                        ? "border-brand bg-white shadow-md transform scale-[1.02]"
                        : "border-ink/10 bg-white hover:border-ink/25 hover:bg-gray-50/80 hover:shadow-sm"
                    }`}
                    aria-pressed={active}
                    aria-label={`${et.label} — ${et.subtitle}`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ backgroundColor: active ? `${cfg.color}15` : "#f8fafc" }}
                    >
                      <Icon size={20} style={{ color: active ? cfg.color : "#64748b" }} />
                    </div>
                    {/* Card label */}
                    <span
                      className={`text-xs font-bold leading-snug break-words max-w-full transition-colors ${
                        active ? "text-brand" : "text-ink/70"
                      }`}
                    >
                      {et.label}
                    </span>
                    {/* Subtitle line — compliance descriptor */}
                    {et.subtitle && (
                      <span
                        className={`text-[11px] leading-tight break-words max-w-full transition-colors ${
                          active ? "text-brand/70" : "text-ink/40"
                        }`}
                      >
                        {et.subtitle}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Generate button ── */}
            <div className="mt-4 flex justify-center w-full">
              <button
                onClick={() => {
                  if (!entity) return;
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setHasSubmitted(true);
                  }, 800);
                }}
                disabled={!entity || loading}
                className={`btn-primary w-full max-w-md px-8 py-3.5 text-[15px] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed ${
                  inverted ? "bg-brand" : ""
                }`}
                aria-label="Generate compliance checklist for selected business type"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    Generating...
                  </>
                ) : (
                  <>Generate My Compliance Checklist <ArrowRight size={16} aria-hidden="true" /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── SEO context block removed per request ── */}

        {/* ── Results panel — shown after submission ── */}
        {hasSubmitted && (
          <div className="w-full mt-4 animate-fade-in">
            <div className="border border-ink/15 bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-full">
              {/* Panel header */}
              <div className="border-b border-ink/10 px-5 sm:px-6 py-5 flex items-center justify-between gap-2 w-full bg-gray-50/50">
                <div className="mono text-xs uppercase tracking-widest text-slate2 font-semibold">
                  Required Statutory Compliances
                </div>
                <div className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full">
                  {activeRequiredServices.length} Requirements
                </div>
              </div>

              {/* Results list */}
              <div className="divide-y divide-ink/10" data-testid="compliance-results">
                {activeRequiredServices.map((service, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        <CheckCircle size={18} className="text-green-500" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-ink mb-1 group-hover:text-brand transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-[13px] text-ink/70 leading-relaxed">
                          {service.oneLine}
                        </p>
                      </div>
                    </div>
                    <div className="sm:shrink-0 flex items-center justify-end">
                      <Link
                        to={`/service/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand/80 transition-colors py-2 px-4 rounded-lg border border-brand/20 hover:border-brand/40 bg-brand/5 hover:bg-brand/10"
                        aria-label={`Learn about and get ${service.name} done`}
                      >
                        Get it done <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Fallback if mapped services aren't found in SERVICES */}
                {activeRequiredServices.length === 0 && (
                  <div className="p-10 text-center text-sm text-ink/50">
                    Compliance checklist is being updated for this entity type.
                  </div>
                )}
              </div>

              {/* Results panel footer CTA */}
              <div className="bg-ink p-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-white/90 text-sm font-medium text-center sm:text-left">
                  Need help managing all these compliances?
                </div>
                <Link
                  to="/contact"
                  className="btn-primary shrink-0 bg-brand text-white border-none hover:bg-brand/90 hover:scale-[1.02] transition-all shadow-lg px-6 py-2.5 text-sm font-bold rounded-lg flex items-center gap-2"
                  aria-label="Talk to a RightTeam compliance expert"
                >
                  Talk to an Expert <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* ── Trust + conversion CTA below results ── */}
            <ConversionBlock inverted={inverted} />
          </div>
        )}
      </div>
    </section>
  );
};
