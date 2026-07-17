import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   Bespoke professional SVG icons — one per section
   ═══════════════════════════════════════════════════════════════════════ */

const SvgScope = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M11 8v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgProfessional = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgEligible = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M7.5 12l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgNonRefund = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const SvgInitiated = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgGovt = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10v11M10 10v11M14 10v11M18 10v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/>
  </svg>
);

const SvgClient = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17 3l1 1.5L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgCancellation = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgProcess = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgTimeline = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgModification = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgRefuse = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgUpdate = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64L21 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64L3 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".4"/>
  </svg>
);

const SvgContact = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Section registry ─────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "scope",           label: "Scope",                         Icon: SvgScope },
  { id: "professional",    label: "Professional Service Nature",   Icon: SvgProfessional },
  { id: "eligible",        label: "Eligible Refunds",              Icon: SvgEligible },
  { id: "non-refundable",  label: "Non-Refundable Payments",       Icon: SvgNonRefund },
  { id: "initiated",       label: "Services Already Initiated",    Icon: SvgInitiated },
  { id: "government",      label: "Government Decisions",          Icon: SvgGovt },
  { id: "client-delays",   label: "Client-Related Delays",         Icon: SvgClient },
  { id: "cancellation",    label: "Cancellation Requests",         Icon: SvgCancellation },
  { id: "process",         label: "Refund Process",                Icon: SvgProcess },
  { id: "timeline",        label: "Processing Time",               Icon: SvgTimeline },
  { id: "modification",    label: "Modification of Services",      Icon: SvgModification },
  { id: "refuse",          label: "Right to Refuse Refunds",       Icon: SvgRefuse },
  { id: "policy-updates",  label: "Policy Updates",                Icon: SvgUpdate },
  { id: "contact",         label: "Contact Us",                    Icon: SvgContact },
];

/* ── Reusable helpers ─────────────────────────────────────────────────── */
function PolicySection({ id, Icon, number, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-10 border-b border-ink/8 last:border-0">
      <div className="flex items-start gap-4 mb-6">
        <div className="shrink-0 w-10 h-10 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center">
          <Icon size={18} className="text-brand" />
        </div>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
            Section {number}
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-ink leading-tight">{title}</h2>
        </div>
      </div>
      <div className="pl-14 space-y-4">{children}</div>
    </section>
  );
}

function BulletList({ items, variant = "brand" }) {
  const dot = variant === "red"
    ? "bg-[#C14410]"
    : variant === "green"
    ? "bg-[#2a7a4f]"
    : "bg-brand";
  const textClass = variant === "light" ? "text-white/85" : "text-ink/75";
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-3 text-sm ${textClass} leading-relaxed`}>
          <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${dot}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }) {
  return (
    <h3 className="font-semibold text-ink text-base mt-6 mb-3 flex items-center gap-2">
      <span className="w-4 h-0.5 bg-brand inline-block" />
      {children}
    </h3>
  );
}

function Para({ children }) {
  return <p className="text-sm text-ink/70 leading-relaxed">{children}</p>;
}

function AlertBox({ variant = "note", children }) {
  const map = {
    note:    { wrap: "bg-brand/6 border-brand/20",           icon: "text-brand",      Icon: SvgEligible },
    warning: { wrap: "bg-[#C14410]/6 border-[#C14410]/20",   icon: "text-[#C14410]",  Icon: SvgNonRefund },
    ink:     { wrap: "bg-ink/5 border-ink/15",               icon: "text-ink/50",     Icon: SvgProfessional },
    success: { wrap: "bg-[#eaf5ee] border-[#2a7a4f]/25",     icon: "text-[#2a7a4f]",  Icon: SvgEligible },
  };
  const s = map[variant] ?? map.note;
  const IconEl = s.Icon;
  return (
    <div className={`flex items-start gap-3 border rounded-sm p-4 ${s.wrap}`}>
      <IconEl size={15} className={`shrink-0 mt-0.5 ${s.icon}`} />
      <div className="text-sm text-ink/70 leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Layout>
      <Helmet>
        <title>Refund Policy — RightTeam.in</title>
        <meta
          name="description"
          content="Understand RightTeam's Refund Policy — which payments are eligible for refunds, non-refundable charges, the refund process, and timelines. Effective 01 July 2026."
        />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">Refund Policy</span>
          </nav>

          <div className="max-w-3xl">
            {/* Icon + badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center">
                {/* Indian Rupee / wallet refund SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3h12M6 8h12M9 8c0 3.31 2.69 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M6 8l6 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M18 3c0 2.76-2.69 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                </svg>
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1 rounded-sm">
                Legal Document
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
              Refund Policy
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              We strive to provide reliable, transparent, and professional services. This policy explains
              the conditions under which refunds may or may not be granted by RightTeam.
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { svg: <SvgTimeline size={14} className="text-brand" />, label: "Effective Date", value: "01 July 2026" },
                { svg: <SvgScope size={14} className="text-brand" />,    label: "Sections",      value: `${SECTIONS.length}` },
                { svg: <SvgTimeline size={14} className="text-brand" />, label: "Refund TAT",    value: "7–15 Business Days" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  {m.svg}
                  <span className="mono text-[11px] uppercase tracking-widest text-white/50">{m.label}:</span>
                  <span className="mono text-[11px] text-white/80 font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </div>

      {/* ── Intro banner ─────────────────────────────────────────────── */}
      <div className="container-x -mt-1">
        <div className="bg-brand/6 border border-brand/20 rounded-sm p-5 flex items-start gap-3">
          <SvgEligible size={16} className="text-brand shrink-0 mt-0.5" />
          <p className="text-sm text-ink/75 leading-relaxed">
            By engaging our services or making a payment, you acknowledge and agree to this Refund Policy.
            For queries, please{" "}
            <Link to="/contact" className="link-brand font-semibold">contact our team</Link>{" "}
            before raising a dispute.
          </p>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="container-x py-14">
        <div className="flex gap-12 items-start">

          {/* ── Sticky ToC ──────────────────────────────────────────── */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 self-start">
            <div className="paper-card p-5 rounded-sm overflow-hidden">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">Contents</div>
              <nav className="space-y-0.5 max-h-[64vh] overflow-y-auto pr-1">
                {SECTIONS.map((s, i) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-left text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-brand/10 text-brand border-l-2 border-brand pl-2.5"
                          : "text-ink/55 hover:text-ink hover:bg-ink/4"
                      }`}
                    >
                      <s.Icon
                        size={12}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-brand" : "text-ink/35 group-hover:text-ink/60"
                        }`}
                      />
                      <span className="leading-tight">{i + 1}. {s.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick links */}
              <div className="mt-6 pt-4 border-t border-ink/10 space-y-2">
                <Link to="/terms-conditions" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Terms &amp; Conditions
                </Link>
                <Link to="/privacy-policy" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Privacy Policy
                </Link>
                <Link to="/disclaimer" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Disclaimer
                </Link>
                <Link to="/contact" className="btn-primary w-full justify-center text-xs py-2.5 rounded-sm">
                  Contact Us <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Article ─────────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">

            {/* 1 · Scope */}
            <PolicySection id="scope" Icon={SvgScope} number={1} title="Scope">
              <Para>
                This Refund Policy applies to all services offered by RightTeam, including but not limited to:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {[
                  "Company Registration", "LLP Registration", "OPC Registration",
                  "GST Registration", "Trademark Registration", "Copyright & Patent Assistance",
                  "Startup India Registration", "ROC Compliance", "Annual Filings",
                  "Business Licences", "Tax & Compliance Services", "Professional Consulting",
                ].map((svc) => (
                  <div key={svc} className="flex items-center gap-2.5 border border-ink/10 rounded-sm px-4 py-2.5 text-sm text-ink/80 bg-white hover:border-brand/30 hover:bg-brand/3 transition-all">
                    <SvgScope size={11} className="text-brand shrink-0" />
                    {svc}
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 2 · Professional Service Nature */}
            <PolicySection id="professional" Icon={SvgProfessional} number={2} title="Professional Service Nature">
              <Para>
                RightTeam provides professional services that involve consultation, documentation, drafting,
                filing, coordination with government authorities, and administrative work.
              </Para>
              <AlertBox variant="ink">
                Once work has commenced, resources are allocated and professional time is invested. Therefore,
                refunds are <strong className="text-ink">subject to the conditions outlined</strong> in this policy.
              </AlertBox>
            </PolicySection>

            {/* 3 · Eligible Refunds */}
            <PolicySection id="eligible" Icon={SvgEligible} number={3} title="Eligible Refunds">
              <Para>A refund may be considered if:</Para>
              <div className="space-y-3 my-4">
                {[
                  { heading: "Duplicate Payment",    desc: "A duplicate payment has been made for the same service." },
                  { heading: "Technical Error",       desc: "Payment was made due to a verified technical error." },
                  { heading: "Our Inability",         desc: "RightTeam is unable to initiate the service due to reasons solely attributable to us." },
                  { heading: "No Work Commenced",     desc: "The service cannot be provided and no work has commenced." },
                ].map((item) => (
                  <div key={item.heading} className="flex items-start gap-3 border border-[#2a7a4f]/20 bg-[#eaf5ee] rounded-sm px-4 py-3">
                    <div className="w-6 h-6 rounded-sm bg-[#2a7a4f] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <SvgEligible size={13} />
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">{item.heading}</div>
                      <div className="text-xs text-ink/60 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <AlertBox variant="success">
                Approved refunds will generally be processed to the original payment method within{" "}
                <strong className="text-ink">7–15 business days</strong>, subject to banking timelines.
              </AlertBox>
            </PolicySection>

            {/* 4 · Non-Refundable */}
            <PolicySection id="non-refundable" Icon={SvgNonRefund} number={4} title="Non-Refundable Payments">
              <Para>The following amounts are generally <strong className="text-ink">non-refundable</strong>:</Para>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                {[
                  "Government Fees", "Statutory Charges", "Stamp Duty",
                  "Taxes Paid to Authorities", "Third-Party Charges",
                  "Digital Signature Certificate (DSC) Charges", "Name Reservation Fees",
                  "Filing Fees", "Consultation Fees", "Documentation / Drafting Charges",
                  "Professional Fees for Completed Work",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 border border-[#C14410]/15 bg-[#C14410]/4 rounded-sm px-3 py-2.5 text-sm text-ink/80">
                    <SvgNonRefund size={11} className="text-[#C14410] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <AlertBox variant="warning">
                These amounts are incurred as part of service delivery and{" "}
                <strong>cannot usually be recovered</strong> once disbursed.
              </AlertBox>
            </PolicySection>

            {/* 5 · Services Already Initiated */}
            <PolicySection id="initiated" Icon={SvgInitiated} number={5} title="Services Already Initiated">
              <Para>
                Refunds will generally <strong className="text-ink">not be available</strong> once any of the following
                activities have started:
              </Para>
              <BulletList variant="red" items={[
                "Consultation has been provided.",
                "Documents have been reviewed.",
                "Drafting or preparation has begun.",
                "Government applications have been filed.",
                "Registrations have been submitted.",
                "Compliance work has commenced.",
                "Third-party payments have been made on your behalf.",
              ]} />
            </PolicySection>

            {/* 6 · Government Decisions */}
            <PolicySection id="government" Icon={SvgGovt} number={6} title="Government Decisions">
              <Para>
                RightTeam cannot guarantee approval of any application submitted to government departments
                or statutory authorities.
              </Para>
              <div className="mt-4 border border-ink bg-ink text-white rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SvgGovt size={15} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">No Refund in These Scenarios</span>
                </div>
                <BulletList variant="light" items={[
                  "Application rejected by a government authority.",
                  "Application put on hold or returned for clarification.",
                  "Delayed due to government processing timelines.",
                  "Subject to additional requirements imposed by authorities.",
                ]} />
              </div>
              <div className="mt-4">
                <AlertBox variant="ink">
                  Our responsibility is limited to providing <strong className="text-ink">professional assistance</strong>{" "}
                  in preparing and submitting the application.
                </AlertBox>
              </div>
            </PolicySection>

            {/* 7 · Client-Related Delays */}
            <PolicySection id="client-delays" Icon={SvgClient} number={7} title="Client-Related Delays">
              <Para>Refund requests may not be accepted where delays arise due to:</Para>
              <BulletList variant="red" items={[
                "Incorrect or incomplete information provided by the client.",
                "Failure to submit required documents.",
                "Delayed responses from the client.",
                "Change of mind after work has commenced.",
                "Failure to meet statutory or regulatory requirements.",
              ]} />
            </PolicySection>

            {/* 8 · Cancellation Requests */}
            <PolicySection id="cancellation" Icon={SvgCancellation} number={8} title="Cancellation Requests">
              <Para>Clients may request cancellation <strong className="text-ink">before work begins</strong>.</Para>
              <SubHeading>If the cancellation is approved:</SubHeading>
              <div className="space-y-2.5 my-3">
                {[
                  "Any applicable government or third-party charges already incurred will be deducted.",
                  "Administrative or processing charges may also apply.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 border border-ink/10 rounded-sm px-4 py-3 bg-white text-sm text-ink/75">
                    <SvgCancellation size={13} className="text-brand shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                Once work has commenced, cancellation may <strong>not be possible</strong>.
              </AlertBox>
            </PolicySection>

            {/* 9 · Refund Process */}
            <PolicySection id="process" Icon={SvgProcess} number={9} title="Refund Process">
              <Para>To request a refund, please contact us with the following details:</Para>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {[
                  { label: "Full Name",               icon: "👤" },
                  { label: "Registered Email Address", icon: "📧" },
                  { label: "Mobile Number",            icon: "📞" },
                  { label: "Service Requested",        icon: "🛠" },
                  { label: "Payment Details",          icon: "💳" },
                  { label: "Reason for Refund",        icon: "📝" },
                ].map((field) => (
                  <div key={field.label} className="flex items-center gap-3 border border-ink/10 rounded-sm px-4 py-3 bg-white text-sm font-medium text-ink">
                    <span className="text-base">{field.icon}</span>
                    {field.label}
                  </div>
                ))}
              </div>

              <Para>Our team will review the request and respond within a reasonable timeframe.</Para>

              <div className="mt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-brand/30 bg-brand/6 text-brand text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-brand hover:text-white transition-all"
                >
                  <SvgContact size={14} />
                  Submit a Refund Request <ArrowRight size={13} />
                </Link>
              </div>
            </PolicySection>

            {/* 10 · Processing Time */}
            <PolicySection id="timeline" Icon={SvgTimeline} number={10} title="Processing Time">
              <Para>If a refund is approved:</Para>

              {/* Timeline steps */}
              <div className="relative mt-5 pl-6 space-y-0">
                {[
                  { step: "01", label: "Request Reviewed",   desc: "Our team evaluates the refund request against this policy." },
                  { step: "02", label: "Approval Decision",  desc: "You will be notified of approval or decline with reasoning." },
                  { step: "03", label: "Processing Initiated", desc: "Approved refunds are processed within 7–15 business days." },
                  { step: "04", label: "Credit to Account",  desc: "Amount credited through the original payment method where possible." },
                ].map((s, i, arr) => (
                  <div key={s.step} className="flex items-start gap-4 pb-6 relative">
                    {/* Vertical line */}
                    {i < arr.length - 1 && (
                      <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-brand/20" />
                    )}
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center z-10 mt-0.5">
                      <span className="text-[9px] font-bold">{s.step}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">{s.label}</div>
                      <div className="text-xs text-ink/55 mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <AlertBox variant="ink">
                Actual credit timelines depend on your bank and payment service provider and may vary.
              </AlertBox>
            </PolicySection>

            {/* 11 · Modification of Services */}
            <PolicySection id="modification" Icon={SvgModification} number={11} title="Modification of Services">
              <Para>
                In certain cases, instead of a refund, RightTeam may offer an alternative resolution:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {[
                  { label: "Service Modification", desc: "Adjusting the scope of the engaged service." },
                  { label: "Credit Adjustment",    desc: "Applying the amount as credit toward another service." },
                  { label: "Equivalent Service",   desc: "An alternative service of equivalent value." },
                ].map((card) => (
                  <div key={card.label} className="paper-card p-4 rounded-sm text-center">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-3">
                      <SvgModification size={14} className="text-brand" />
                    </div>
                    <div className="font-semibold text-ink text-sm">{card.label}</div>
                    <div className="text-xs text-ink/55 mt-1 leading-tight">{card.desc}</div>
                  </div>
                ))}
              </div>
              <Para>This will be discussed with the client where appropriate.</Para>
            </PolicySection>

            {/* 12 · Right to Refuse */}
            <PolicySection id="refuse" Icon={SvgRefuse} number={12} title="Right to Refuse Refunds">
              <Para>RightTeam reserves the right to decline refund requests where:</Para>
              <BulletList variant="red" items={[
                "The service has already been substantially performed.",
                "The request does not comply with this Refund Policy.",
                "Misuse, fraud, or false claims are suspected.",
                "Required information is not provided to evaluate the request.",
              ]} />
            </PolicySection>

            {/* 13 · Policy Updates */}
            <PolicySection id="policy-updates" Icon={SvgUpdate} number={13} title="Policy Updates">
              <Para>
                RightTeam may update this Refund Policy from time to time to reflect changes in our services,
                business practices, or legal requirements.
              </Para>
              <AlertBox variant="note">
                The revised policy will be published on this page with the updated{" "}
                <strong className="text-ink">Effective Date</strong>. We recommend reviewing this policy periodically.
              </AlertBox>
            </PolicySection>

            {/* 14 · Contact */}
            <PolicySection id="contact" Icon={SvgContact} number={14} title="Contact Us">
              <Para>For refund-related queries, please contact us:</Para>

              <div className="mt-5 border border-ink/10 rounded-sm overflow-hidden">
                <div className="bg-ink text-white px-6 py-4 flex items-center gap-3">
                  <SvgContact size={16} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">RightTeam — Refunds & Billing</span>
                </div>
                <div className="divide-y divide-ink/8">
                  {/* Email */}
                  <a href="mailto:support@rightteam.in" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Email</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">support@rightteam.in</div>
                    </div>
                  </a>
                  {/* Phone */}
                  <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <SvgContact size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Phone</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">+91 XXXXXXXXXX</div>
                    </div>
                  </a>
                  {/* Website */}
                  <a href="https://www.rightteam.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Website</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">www.rightteam.in</div>
                    </div>
                  </a>
                  {/* Address */}
                  <div className="flex items-start gap-4 px-6 py-4">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.7"/>
                      </svg>
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Address</div>
                      <div className="text-sm text-ink/80 leading-relaxed">
                        Palladium Building, B1-505, Corporate Rd,<br />
                        near Vodafone House, Prahlad Nagar,<br />
                        Ahmedabad, Gujarat 380015
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* ── Final Note / Acknowledgement ────────────────────────── */}
            <div className="mt-12 border border-ink bg-ink text-white rounded-sm p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
                  {/* Rupee icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3h12M6 8h12M9 8c0 3.31 2.69 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    <path d="M6 8l6 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl text-white mb-3">Final Note</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By making a payment for any service offered by RightTeam, you acknowledge that you have
                    read, understood, and agreed to this Refund Policy.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary text-sm rounded-sm">
                      Contact Our Team <ArrowRight size={14} />
                    </Link>
                    <Link to="/terms-conditions" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Terms &amp; Conditions
                    </Link>
                    <Link to="/privacy-policy" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Privacy Policy
                    </Link>
                    <Link to="/disclaimer" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Disclaimer
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Document footer */}
            <div className="mt-8 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                Document Ref: RT/LEGAL/RP/2026 · Effective 01 Jul 2026
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                © {new Date().getFullYear()} RightTeam Pvt. Ltd. — All rights reserved
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ── Mobile bottom pill strip ─────────────────────────────────── */}
      <div className="xl:hidden sticky bottom-0 z-30 bg-white border-t border-ink/10 shadow-md">
        <div className="container-x py-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {SECTIONS.map((s, i) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive ? "bg-brand text-white" : "bg-alt text-ink/60 hover:bg-ink/8 hover:text-ink"
                  }`}
                >
                  <s.Icon size={11} />
                  {i + 1}. {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
