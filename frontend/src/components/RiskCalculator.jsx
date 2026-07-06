import React, { useState, useMemo } from "react";
import { ENTITY_TYPES, STATES, filingsFor } from "../data/marketing";
import { AlertOctagon, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const severityStyles = {
  high: "border-l-seal bg-seal/[0.04]",
  medium: "border-l-gold bg-gold/[0.05]",
  low: "border-l-approve bg-approve/[0.04]",
};

export const RiskCalculator = ({ inverted = false }) => {
  const [entity, setEntity] = useState("");
  const [state, setState] = useState("");
  const [employees, setEmployees] = useState("no");
  const [ran, setRan] = useState(false);

  const filings = useMemo(
    () => (entity ? filingsFor(entity, employees === "yes") : []),
    [entity, employees]
  );
  const highCount = filings.filter((f) => f.severity === "high").length;

  const label = inverted ? "text-white/50" : "text-slate2";
  const heading = inverted ? "text-white" : "text-ink";
  const body = inverted ? "text-white/70" : "text-ink/70";

  return (
    <section className="container-x pt-0" data-testid="risk-calculator">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className={`mono text-[11px] uppercase tracking-[0.22em] ${label}`}>
            Enter your details below
          </div>
          <p className={`${body} mt-3 leading-relaxed`}>
            Select your entity type and state. We list every statutory filing
            that applies, its due date, and the penalty exposure per day of
            delay.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className={`mono text-[11px] uppercase tracking-widest ${label}`}>Entity type</label>
              <select
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink rounded-sm"
                data-testid="risk-entity"
              >
                <option value="">Select…</option>
                {ENTITY_TYPES.map((et) => (
                  <option key={et.key} value={et.key}>{et.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`mono text-[11px] uppercase tracking-widest ${label}`}>State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink rounded-sm"
                  data-testid="risk-state"
                >
                  <option value="">Select…</option>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={`mono text-[11px] uppercase tracking-widest ${label}`}>Employees on payroll?</label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink rounded-sm"
                  data-testid="risk-employees"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes (≥ 1)</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setRan(true)}
              disabled={!entity || !state}
              className="btn-primary w-full justify-center disabled:opacity-40"
              data-testid="risk-run"
            >
              Show my compliance exposure <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-ink/15 bg-white rounded-sm">
            <div className="border-b border-ink/10 px-5 py-4 flex items-center justify-between">
              <div className="mono text-[11px] uppercase tracking-widest text-slate2">
                Statutory filing register
              </div>
              {ran && entity && (
                <div className="mono text-[11px] uppercase tracking-widest text-seal font-semibold flex items-center gap-1">
                  <AlertOctagon size={12} /> {highCount} high-severity filings
                </div>
              )}
            </div>

            {!ran || !entity ? (
              <div className="p-10 text-center">
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Awaiting input</div>
                <p className="text-slate2 mt-3 text-sm">
                  Pick an entity type and state on the left to generate your personalised filing register.
                </p>
              </div>
            ) : (
              <>
                <div className="px-5 pt-4 pb-2 mono text-[11px] text-slate2 uppercase tracking-widest border-b border-ink/10">
                  Ref: RT/RISK/{entity.toUpperCase()}/{state.slice(0, 3).toUpperCase()} · {filings.length} filings apply
                </div>
                <ol data-testid="risk-results">
                  {filings.map((f, i) => (
                    <li
                      key={i}
                      className={`grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-4 border-b last:border-b-0 border-ink/10 border-l-4 ${severityStyles[f.severity]}`}
                    >
                      <span className="mono text-[10px] uppercase tracking-widest text-slate2 pt-1 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-semibold text-ink text-sm">{f.name}</div>
                        <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-1">
                          Due: {f.due}
                        </div>
                        <div className="text-xs text-ink/80 mt-2 flex items-start gap-1.5">
                          <AlertOctagon size={12} className="text-seal mt-0.5 shrink-0" />
                          <span>Penalty: {f.penalty}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`mono text-[10px] uppercase tracking-widest font-semibold ${
                            f.severity === "high" ? "text-seal" : f.severity === "medium" ? "text-gold" : "text-approve"
                          }`}
                        >
                          {f.severity}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="px-5 py-4 border-t border-ink/10 flex items-center justify-between bg-alt">
                  <div className="mono text-[10px] uppercase tracking-widest text-slate2 flex items-center gap-1.5">
                    <Check size={12} className="text-approve" strokeWidth={3} />
                    Handled end-to-end by a dedicated manager
                  </div>
                  <Link to="/quote" className="btn-primary" data-testid="risk-cta">
                    Get a fixed quote <ArrowRight size={14} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
