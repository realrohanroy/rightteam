import React, { useState } from "react";
import { ENTITY_TYPES } from "../data/marketing";
import { SERVICES } from "../data/services";
import {
  Building2, Users, Briefcase, Shield, TrendingUp, CheckCircle, ArrowRight
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

export const RiskCalculator = ({ inverted = false, defaultEntity = "" }) => {
  const [entity, setEntity] = useState(defaultEntity);
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
    <section className="container-x pt-0 w-full max-w-full overflow-x-hidden" data-testid="compliance-checklist">
      <div className="flex flex-col items-center gap-10 w-full max-w-3xl mx-auto">
        
        {/* ── Inputs ── */}
        <div className="w-full flex flex-col items-center text-center">
          <div className={`mono text-[11px] uppercase tracking-[0.22em] ${label}`}>
            Select Your Company Type
          </div>

          <div className="mt-6 w-full max-w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-full" data-testid="risk-entity-tiles">
              {ENTITY_TYPES.map((et) => {
                const cfg = ENTITY_ICONS[et.key] || { icon: Building2, color: "#0B1E3D" };
                const Icon = cfg.icon;
                const active = entity === et.key;
                return (
                  <button
                    key={et.key}
                    type="button"
                    onClick={() => setEntity(et.key)}
                    data-testid={`entity-tile-${et.key}`}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all text-center cursor-pointer min-w-0 ${
                      active
                        ? "border-brand bg-white shadow-md transform scale-[1.02]"
                        : "border-ink/10 bg-white hover:border-ink/25 hover:bg-gray-50/80 hover:shadow-sm"
                    }`}
                    aria-pressed={active}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ backgroundColor: active ? `${cfg.color}15` : "#f8fafc" }}
                    >
                      <Icon size={20} style={{ color: active ? cfg.color : "#64748b" }} />
                    </div>
                    <span
                      className={`text-xs font-bold leading-snug break-words max-w-full transition-colors ${
                        active ? "text-brand" : "text-ink/70"
                      }`}
                    >
                      {et.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Results panel ── */}
        <div className="w-full">
          <div className="border border-ink/15 bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-full">
            {/* Panel header */}
            <div className="border-b border-ink/10 px-5 sm:px-6 py-5 flex items-center justify-between gap-2 w-full bg-gray-50/50">
              <div className="mono text-xs uppercase tracking-widest text-slate2 font-semibold">
                Required Statutory Compliances
              </div>
              {entity && (
                <div className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full">
                  {activeRequiredServices.length} Requirements
                </div>
              )}
            </div>

            {/* Awaiting input */}
            {!entity ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <CheckCircle size={40} className="text-ink/10 mb-4" />
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Awaiting selection</div>
                <p className="text-ink/50 mt-2 text-sm max-w-xs mx-auto">
                  Pick your business structure above to see the exact statutory filings you need to stay compliant.
                </p>
              </div>
            ) : (
              /* Results List */
              <div className="divide-y divide-ink/10" data-testid="compliance-results">
                {activeRequiredServices.map((service, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        <CheckCircle size={18} className="text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-ink mb-1 group-hover:text-brand transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-[13px] text-ink/70 leading-relaxed">
                          {service.oneLine}
                        </p>
                      </div>
                    </div>
                    <div className="sm:shrink-0 flex items-center justify-end">
                      <Link 
                        to={`/service/${service.slug}`} 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand/80 transition-colors py-2 px-4 rounded-lg border border-brand/20 hover:border-brand/40 bg-brand/5 hover:bg-brand/10"
                      >
                        Get it done <ArrowRight size={14} />
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
            )}
            
            {/* CTA Footer */}
            {entity && (
              <div className="bg-ink p-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-white/90 text-sm font-medium text-center sm:text-left">
                  Need help managing all these compliances?
                </div>
                <Link to="/contact" className="btn-primary shrink-0 bg-brand text-white border-none hover:bg-brand/90 hover:scale-[1.02] transition-all shadow-lg px-6 py-2.5 text-sm font-bold rounded-lg flex items-center gap-2">
                  Talk to an Expert <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
