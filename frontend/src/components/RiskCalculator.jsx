import React, { useState, useMemo } from "react";
import { ENTITY_TYPES, STATES, filingsFor } from "../data/marketing";
import {
  AlertOctagon, ArrowRight, Check, ChevronDown, Calendar,
  Mail, Building2, Users, Briefcase, Shield, TrendingUp, DownloadCloud
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// ─── Entity icon map ────────────────────────────────────────────────────────
const ENTITY_ICONS = {
  "sole-prop":   { icon: Briefcase,  color: "#E8522B" },
  "partnership": { icon: Users,      color: "#3B82F6" },
  "llp":         { icon: Shield,     color: "#8B5CF6" },
  "opc":         { icon: Building2,  color: "#10B981" },
  "pvt-ltd":     { icon: Building2,  color: "#0B1E3D" },
  "public-ltd":  { icon: TrendingUp, color: "#F59E0B" },
};

// ─── Severity colours ────────────────────────────────────────────────────────
const SEV_DOT = {
  high:   "bg-red-500",
  medium: "bg-amber-400",
  low:    "bg-green-500",
};
const SEV_BORDER = {
  high:   "border-l-red-500",
  medium: "border-l-amber-400",
  low:    "border-l-green-500",
};

// ─── Rough 30-day penalty estimate per filing ────────────────────────────────
const PENALTY_30D = {
  "GSTR-3B (monthly GST return)":            15000,
  "GSTR-1 (outward supplies)":               15000,
  "Income Tax Return — Sec 139(1)":           5000,
  "TDS Quarterly Return (Form 24Q / 26Q / 27Q)": 6000,
  "Advance Tax (Sec 207 — corporates & individuals)": 3000,
  "ROC AOC-4 (annual financial statements)":  3000,
  "ROC MGT-7 / MGT-7A (annual return)":      3000,
  "DIR-3 KYC (annual director KYC)":          5000,
  "MSME payment disclosure (Sec 43B(h))":     2000,
  "Board Meeting Minutes (Sec 173)":          5000,
  "LLP Form 11 (annual return)":              3000,
  "LLP Form 8 (statement of accounts & solvency)": 3000,
  "LLP DIR-3 KYC (designated partners)":     5000,
  "PF Monthly ECR (EPF & MP Act 1952)":      10000,
  "ESI Monthly Contribution (ESI Act 1948)": 10000,
  "Professional Tax — Maharashtra":           2000,
};

function estimateExposure(filings) {
  return filings.reduce((sum, f) => sum + (PENALTY_30D[f.name] || 2000), 0);
}

// ─── Shorten due date label for compact layout ──────────────────────────────
const getShortDue = (due) => {
  if (!due) return "";
  const d = due.toLowerCase();
  if (d.includes("20th of following month")) return "Monthly (20th)";
  if (d.includes("11th of following month")) return "Monthly (11th)";
  if (d.includes("15th of following month")) return "Monthly (15th)";
  if (d.includes("last day of each month")) return "Monthly (last)";
  if (d.includes("31 july")) return "31 July";
  if (d.includes("30 september")) return "30 Sept";
  if (d.includes("30 october")) return "30 Oct";
  if (d.includes("30 may")) return "30 May";
  if (d.includes("31 jul") && d.includes("31 oct")) return "Quarterly";
  if (d.includes("advance tax")) return "Quarterly";
  if (d.includes("30 days of agm")) return "30d post-AGM";
  if (d.includes("60 days of agm")) return "60d post-AGM";
  if (d.includes("board meeting")) return "4 meetings/yr";
  if (d.includes("msme")) return "Within 45 days";
  
  // fallback: get first few words
  let short = due.split("(")[0].split(";")[0].split("—")[0].split("•")[0].split("·")[0].trim();
  if (short.length > 15) {
    return short.substring(0, 12) + "...";
  }
  return short;
};

// ─── Estimate days remaining dynamically ────────────────────────────────────
const getDaysUntil = (dueName, dueText) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const day = today.getDate();

  const diffDays = (targetDate) => {
    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const text = dueText.toLowerCase();

  // Monthly filings
  if (text.includes("20th of following month") || text.includes("20th of the following month")) {
    const target = new Date(year, month + 1, 20);
    return diffDays(target);
  }
  if (text.includes("11th of following month")) {
    const target = new Date(year, month + 1, 11);
    return diffDays(target);
  }
  if (text.includes("15th of following month")) {
    const target = new Date(year, month + 1, 15);
    return diffDays(target);
  }
  if (text.includes("last day of each month")) {
    const target = new Date(year, month + 1, 0); // last day of current month
    return diffDays(target);
  }

  // Specific annual / quarterly dates
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    january: 0, february: 1, march: 2, april: 3, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };

  const dateRegex = /(\d+)\s+([a-z]{3,9})/g;
  let match;
  let nextDate = null;
  let minDiff = Infinity;

  while ((match = dateRegex.exec(text)) !== null) {
    const d = parseInt(match[1], 10);
    const mName = match[2];
    const m = monthsMap[mName];
    if (m !== undefined) {
      let target = new Date(year, m, d);
      let diff = diffDays(target);
      if (diff < 0) {
        target = new Date(year + 1, m, d);
        diff = diffDays(target);
      }
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        nextDate = target;
      }
    }
  }

  if (nextDate) {
    return minDiff;
  }

  if (text.includes("board meeting")) {
    return 45;
  }
  if (text.includes("itr filing")) {
    return 15;
  }

  return 30; // fallback
};

// ─── ICS calendar export ─────────────────────────────────────────────────────
function generateICS(filings, entityLabel) {
  const uid = () => Math.random().toString(36).slice(2, 10).toUpperCase();
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const baseYear = 2025;

  const events = filings.map((f) => {
    const summary = `RightTeam: ${f.name}`;
    const desc = `Due: ${f.due}\\nSeverity: ${f.severity.toUpperCase()}\\nPenalty if missed: ${f.penalty.substring(0, 120)}...\\n\\nFiled by RightTeam — rightteam.in`;
    const dtStart = `${baseYear}1031`;
    return [
      "BEGIN:VEVENT",
      `UID:${uid()}@rightteam.in`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      `CATEGORIES:Compliance,Tax`,
      "BEGIN:VALARM",
      "TRIGGER:-P7D",
      "ACTION:DISPLAY",
      `DESCRIPTION:7-day reminder: ${summary}`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-P15D",
      "ACTION:DISPLAY",
      `DESCRIPTION:15-day reminder: ${summary}`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-P30D",
      "ACTION:DISPLAY",
      `DESCRIPTION:30-day reminder: ${summary}`,
      "END:VALARM",
      "END:VEVENT",
    ].join("\r\n");
  });

  const cal = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RightTeam//Compliance Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:RightTeam — ${entityLabel} Compliance`,
    "X-WR-TIMEZONE:Asia/Kolkata",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([cal], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rightteam-compliance-${entityLabel.toLowerCase().replace(/\s+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Email reminder capture ──────────────────────────────────────────────────
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function ReminderCapture({ entityLabel, filingCount }) {
  const [email, setEmail]       = useState("");
  const [consent, setConsent]   = useState(false);
  const [uiState, setUiState]   = useState("idle");
  const [emailErr, setEmailErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email) { setEmailErr("Email is required."); return; }
    if (!email.includes("@") || !email.includes(".")) { setEmailErr("Enter a valid email."); return; }
    if (!consent) { setEmailErr("Please accept the consent checkbox."); return; }
    setEmailErr("");
    setUiState("submitting");
    try {
      await axios.post(`${API}/leads`, {
        service_slug: "compliance-reminders",
        service_name: `Compliance Reminders — ${entityLabel}`,
        full_name: "Reminder signup",
        email,
        phone: "0000000000",
        source: "compliance_reminders",
        notes: `Entity: ${entityLabel}, Filings: ${filingCount}`,
      });
      setUiState("done");
    } catch {
      setUiState("error");
    }
  };

  if (uiState === "done") {
    return (
      <div className="flex items-center gap-2.5 p-3 bg-green-50 border border-green-200 rounded-lg animate-stamp-in" data-testid="reminders-success">
        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <Check size={14} className="text-green-600" strokeWidth={3} />
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Reminders set for {email}</div>
          <div className="text-xs text-ink/60 mono uppercase tracking-wider">30, 15 &amp; 7 days before each deadline</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-2.5" data-testid="reminders-form">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
          className="flex-1 border border-ink/20 bg-white rounded-lg px-3 py-2 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-brand"
          data-testid="reminders-email"
        />
        <button
          type="submit"
          disabled={uiState === "submitting"}
          className="btn-primary justify-center sm:px-4 py-2 text-xs whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5 w-full sm:w-auto"
          data-testid="reminders-submit"
        >
          {uiState === "submitting" ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <><Mail size={12} /> Set Reminders</>
          )}
        </button>
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => { setConsent(e.target.checked); setEmailErr(""); }}
          className="mt-0.5 accent-brand"
          data-testid="reminders-consent"
        />
        <span className="text-xs text-ink/60 leading-relaxed">
          Email me a reminder 30, 15, and 7 days before each deadline. I consent to RightTeam contacting me about compliance matters.
        </span>
      </label>
      {emailErr && (
        <div className="text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertOctagon size={11} /> {emailErr}
        </div>
      )}
      {uiState === "error" && (
        <div className="text-xs text-red-500">Something went wrong — please try again.</div>
      )}
    </form>
  );
}

// ─── Single filing row — collapse/expand ────────────────────────────────────
function FilingRow({ filing, index, defaultOpen, daysUntil }) {
  const [open, setOpen] = useState(defaultOpen);
  const daysText = daysUntil <= 0 ? "Due now / overdue" : `in ${daysUntil} days`;
  const shortDue = getShortDue(filing.due);

  return (
    <li className="border-b last:border-b-0 border-ink/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left transition-colors hover:bg-alt/60 border-l-4 ${SEV_BORDER[filing.severity]}`}
        aria-expanded={open}
        data-testid={`filing-row-${index}`}
      >
        {/* Left part: Severity dot */}
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${SEV_DOT[filing.severity]}`} aria-label={filing.severity} />

        {/* Middle part: Name & Due date stack */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="font-semibold text-ink text-sm truncate leading-snug">{filing.name}</div>
          <div className="mono text-[10px] uppercase tracking-wider text-slate2 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>Due: {shortDue}</span>
            <span className="text-ink/20">•</span>
            <span className={`font-semibold lowercase ${daysUntil <= 30 ? "text-red-500" : "text-ink/40"}`}>
              {daysText}
            </span>
          </div>
        </div>

        {/* Right part: Chevron */}
        <ChevronDown
          size={14}
          className={`shrink-0 text-ink/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-4 pt-1 bg-alt/30 border-l-4 border-l-transparent">
          <div className="mono text-[10px] uppercase tracking-widest text-slate2 mb-1.5">Due</div>
          <div className="text-xs text-ink mb-3">{filing.due}</div>
          <div className="mono text-[10px] uppercase tracking-widest text-slate2 mb-1.5">Penalty if missed</div>
          <div className="text-xs text-ink/80 leading-relaxed">{filing.penalty}</div>
        </div>
      )}
    </li>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export const RiskCalculator = ({ inverted = false, defaultEntity = "" }) => {
  const [entity,    setEntity]    = useState(defaultEntity);
  const [state,     setStateVal]  = useState("");
  const [employees, setEmployees] = useState("no");
  const [ran,       setRan]       = useState(false);
  const [loading,   setLoading]   = useState(false);

  React.useEffect(() => {
    if (defaultEntity) setEntity(defaultEntity);
  }, [defaultEntity]);

  const handleCalculate = () => {
    setLoading(true);
    setRan(false);
    setTimeout(() => { setLoading(false); setRan(true); }, 1000);
  };

  const filings = useMemo(
    () => (entity ? filingsFor(entity, employees === "yes") : []),
    [entity, employees]
  );

  // Sort by days until deadline ascending (nearest first)
  const sortedFilings = useMemo(() => {
    const mapped = filings.map((f) => ({
      ...f,
      daysUntil: getDaysUntil(f.name, f.due)
    }));
    return mapped.sort((a, b) => a.daysUntil - b.daysUntil);
  }, [filings]);

  const totalExposure = useMemo(() => estimateExposure(sortedFilings), [sortedFilings]);
  const highCount     = filings.filter((f) => f.severity === "high").length;
  const entityLabel   = ENTITY_TYPES.find((e) => e.key === entity)?.label || entity;

  const label   = inverted ? "text-white/50"  : "text-slate2";

  return (
    <section className="container-x pt-0 w-full max-w-full overflow-x-hidden" data-testid="risk-calculator">
      <div className="flex flex-col items-center gap-10 w-full max-w-3xl mx-auto">

        {/* ── Inputs ── */}
        <div className="w-full flex flex-col items-center text-center">
          <div className={`mono text-[11px] uppercase tracking-[0.22em] ${label}`}>
            Enter your details below
          </div>

          <div className="mt-6 space-y-5 w-full max-w-full">
            {/* Entity type — responsive icon tiles */}
            <div className="w-full max-w-full">
              <label className={`mono text-[11px] uppercase tracking-widest ${label} mb-2 block`}>
                Entity type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-full" data-testid="risk-entity-tiles">
                {ENTITY_TYPES.map((et) => {
                  const cfg     = ENTITY_ICONS[et.key] || { icon: Building2, color: "#0B1E3D" };
                  const Icon    = cfg.icon;
                  const active  = entity === et.key;
                  return (
                    <button
                      key={et.key}
                      type="button"
                      onClick={() => setEntity(et.key)}
                      data-testid={`entity-tile-${et.key}`}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center cursor-pointer min-w-0 ${
                        active
                          ? "border-brand bg-brand/5 shadow-sm"
                          : "border-ink/15 bg-white hover:border-ink/30 hover:bg-alt"
                      }`}
                      aria-pressed={active}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: active ? `${cfg.color}20` : "#f5f6f8" }}
                      >
                        <Icon size={18} style={{ color: active ? cfg.color : "#6b7280" }} />
                      </div>
                      <span
                        className={`text-[10px] font-semibold leading-tight break-words max-w-full ${
                          active ? "text-brand" : "text-ink/60"
                        }`}
                      >
                        {et.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* State + Employees */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="min-w-0">
                <label className={`mono text-[11px] uppercase tracking-widest ${label} block h-4 truncate`}>State</label>
                <select
                  value={state}
                  onChange={(e) => setStateVal(e.target.value)}
                  className={`w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink rounded-sm text-sm ${
                    state === "" ? "text-slate2" : "text-ink"
                  }`}
                  data-testid="risk-state"
                >
                  <option value="" disabled className="text-slate2">Select state…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s} className="text-ink">{s}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-0">
                <label className={`mono text-[11px] uppercase tracking-widest ${label} block h-4 truncate`}>Employees on payroll?</label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink rounded-sm text-ink text-sm"
                  data-testid="risk-employees"
                >
                  <option value="no" className="text-ink">No</option>
                  <option value="yes" className="text-ink">Yes (≥ 1)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!entity || !state || loading}
              className="btn-primary w-full justify-center disabled:opacity-40 flex items-center gap-2"
              data-testid="risk-run"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating register...
                </>
              ) : (
                <>Show my compliance exposure <ArrowRight size={14} /></>
              )}
            </button>
          </div>
        </div>

        {/* ── Results panel ── */}
        <div className="w-full">
          <div className="border border-ink/15 bg-white rounded-sm overflow-hidden w-full max-w-full">
            {/* Panel header */}
            <div className="border-b border-ink/10 px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
              <div className="mono text-[11px] uppercase tracking-widest text-slate2 truncate">
                Statutory Filing Register
              </div>
              {ran && entity && !loading && (
                <div className="mono text-[11px] uppercase tracking-widest text-red-500 font-semibold flex items-center gap-1 self-start sm:self-auto shrink-0">
                  <AlertOctagon size={12} /> {highCount} high-severity
                </div>
              )}
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="p-10 space-y-6 animate-pulse" data-testid="calculator-loading">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-8 h-4 bg-ink/10 rounded-sm" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-ink/10 rounded-sm w-2/3" />
                      <div className="h-3 bg-ink/10 rounded-sm w-1/3" />
                    </div>
                  </div>
                ))}
              </div>

            /* Awaiting input */
            ) : !ran || !entity ? (
              <div className="p-10 text-center">
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Awaiting input</div>
                <p className="text-slate2 mt-3 text-sm prose-narrow mx-auto">
                  Pick an entity type and state to generate your filing register.
                </p>
              </div>

            /* Results */
            ) : (
              <>
                {/* ── Headline exposure number ── */}
                <div className="px-4 sm:px-5 py-5 bg-red-50 border-b border-red-100 animate-fade-in w-full" data-testid="exposure-headline">
                  <div className="mono text-[10px] uppercase tracking-widest text-red-400 mb-1 leading-normal">
                    Estimated exposure if filings are missed (30-day delay)
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-red-600">
                    ₹{totalExposure.toLocaleString("en-IN")}+
                  </div>
                  <div className="text-sm text-red-500 mt-1 leading-normal">
                    across {sortedFilings.length} statutory deadlines
                  </div>
                </div>

                {/* ── Filing list (collapsible) ── */}
                <ol data-testid="risk-results" className="w-full">
                  {sortedFilings.map((f, i) => (
                    <FilingRow
                      key={i}
                      filing={f}
                      index={i}
                      defaultOpen={i === 0}
                      daysUntil={f.daysUntil}
                    />
                  ))}
                </ol>

                {/* ── Calendar export + Reminder capture ── */}
                <div className="px-4 sm:px-5 py-5 border-t border-ink/10 bg-alt/40 space-y-4 w-full">
                  {/* Calendar export */}
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 w-full">
                    <div className="mono text-[10px] uppercase tracking-widest text-slate2 flex items-center gap-1.5 justify-start">
                      <Check size={12} className="text-approve" strokeWidth={3} />
                      Handled end-to-end by a dedicated manager
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => generateICS(sortedFilings, entityLabel)}
                        className="btn-outline flex items-center justify-center gap-1.5 text-xs !px-3 !py-2 w-full sm:w-auto"
                        data-testid="add-to-calendar"
                      >
                        <DownloadCloud size={13} /> Add all to calendar
                      </button>
                      <Link to="/quote" className="btn-primary flex items-center justify-center gap-1.5 text-xs !px-3 !py-2 w-full sm:w-auto" data-testid="risk-cta">
                        Get a fixed quote <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Email reminder capture */}
                  <div className="border-t border-ink/10 pt-4 w-full">
                    <div className="mono text-[10px] uppercase tracking-widest text-slate2 mb-2 flex items-center gap-1.5">
                      <Mail size={11} /> Get reminders
                    </div>
                    <ReminderCapture entityLabel={entityLabel} filingCount={sortedFilings.length} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
