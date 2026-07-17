import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   Bespoke professional SVG icons — one per section
   ═══════════════════════════════════════════════════════════════════════ */
const SvgAbout = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M13 17h8M17 13v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgAcceptance = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 7v1m0 8v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".35"/>
  </svg>
);

const SvgServices = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.77z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgUserDuty = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M16 3l1.5 1.5L20 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgPricing = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 10h20" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M6 15h3M15 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgConsultation = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgGovt = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10v11M10 10v11M14 10v11M18 10v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/>
  </svg>
);

const SvgIP = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);

const SvgWebUsage = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgMarketing = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgThirdParty = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgLiability = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const SvgRefund = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12a9 9 0 109 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M3 9v3h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgPrivacy = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);

const SvgChanges = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgGoverning = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".4"/>
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SvgForceMajeure = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgContact = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Icon map for quick lookup */
const SECTION_ICONS = {
  "about": SvgAbout,
  "acceptance": SvgAcceptance,
  "services": SvgServices,
  "user-responsibilities": SvgUserDuty,
  "pricing": SvgPricing,
  "consultation": SvgConsultation,
  "government-approvals": SvgGovt,
  "intellectual-property": SvgIP,
  "website-usage": SvgWebUsage,
  "marketing": SvgMarketing,
  "third-party": SvgThirdParty,
  "liability": SvgLiability,
  "cancellation": SvgRefund,
  "privacy": SvgPrivacy,
  "changes": SvgChanges,
  "governing-law": SvgGoverning,
  "force-majeure": SvgForceMajeure,
  "contact": SvgContact,
};

const SECTIONS = [
  { id: "about",                label: "About RightTeam",           icon: "about" },
  { id: "acceptance",          label: "Acceptance of Terms",        icon: "acceptance" },
  { id: "services",            label: "Services",                   icon: "services" },
  { id: "user-responsibilities",label: "User Responsibilities",     icon: "user-responsibilities" },
  { id: "pricing",             label: "Pricing & Payments",         icon: "pricing" },
  { id: "consultation",        label: "Consultation Services",      icon: "consultation" },
  { id: "government-approvals",label: "Government Approvals",       icon: "government-approvals" },
  { id: "intellectual-property",label: "Intellectual Property",     icon: "intellectual-property" },
  { id: "website-usage",       label: "Website Usage",              icon: "website-usage" },
  { id: "marketing",           label: "Marketing Communications",   icon: "marketing" },
  { id: "third-party",         label: "Third-Party Platforms",      icon: "third-party" },
  { id: "liability",           label: "Limitation of Liability",    icon: "liability" },
  { id: "cancellation",        label: "Cancellation & Refunds",     icon: "cancellation" },
  { id: "privacy",             label: "Privacy",                    icon: "privacy" },
  { id: "changes",             label: "Changes to Services",        icon: "changes" },
  { id: "governing-law",       label: "Governing Law",              icon: "governing-law" },
  { id: "force-majeure",       label: "Force Majeure",              icon: "force-majeure" },
  { id: "contact",             label: "Contact Us",                 icon: "contact" },
];

/* ── Reusable helpers ─────────────────────────────────────────────────── */
function PolicySection({ id, iconKey, number, title, children }) {
  const Icon = SECTION_ICONS[iconKey];
  return (
    <section id={id} className="scroll-mt-28 py-10 border-b border-ink/8 last:border-0">
      <div className="flex items-start gap-4 mb-6">
        <div className="shrink-0 w-10 h-10 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center">
          {Icon && <Icon size={18} className="text-brand" />}
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

function BulletList({ items, tone = "light" }) {
  const textClass = tone === "dark" ? "text-white/80" : "text-ink/75";
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${textClass}`}>
          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
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
  const styles = {
    note:    { bg: "bg-brand/6 border-brand/20",      icon: "text-brand",      Icon: SvgLiability },
    warning: { bg: "bg-[#C14410]/6 border-[#C14410]/20", icon: "text-[#C14410]", Icon: SvgForceMajeure },
    ink:     { bg: "bg-ink/5 border-ink/15",          icon: "text-ink/50",     Icon: SvgPrivacy },
  };
  const s = styles[variant];
  const IconEl = s.Icon;
  return (
    <div className={`flex items-start gap-3 border rounded-sm p-4 ${s.bg}`}>
      <IconEl size={15} className={`shrink-0 mt-0.5 ${s.icon}`} />
      <div className="text-sm text-ink/70 leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
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
        <title>Terms & Conditions — RightTeam.in</title>
        <meta
          name="description"
          content="Read the Terms & Conditions governing your use of RightTeam.in. Covers services, payments, user responsibilities, intellectual property, liability, and more."
        />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">Terms &amp; Conditions</span>
          </nav>

          <div className="max-w-3xl">
            {/* Icon + badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center">
                {/* Gavel / legal hammer SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2L8 8l1.5 1.5-5.5 5.5a2 2 0 000 2.83l2.12 2.12a2 2 0 002.83 0L14.5 14.5 16 16l6-6-8-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 22l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1 rounded-sm">
                Legal Documentin 
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
              Terms &amp; Conditions
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              These Terms &amp; Conditions govern your access to and use of RightTeam.in's website,
              services, and digital platforms. Please read them carefully before proceeding.
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { svg: <SvgRefund size={14} className="text-brand" />, label: "Effective Date", value: "01 July 2026" },
                { svg: <SvgAbout size={14} className="text-brand" />,  label: "Sections", value: `${SECTIONS.length}` },
                { svg: <SvgGoverning size={14} className="text-brand" />, label: "Jurisdiction", value: "India — Ahmedabad" },
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

      {/* ── Intro banner ────────────────────────────────────────────────── */}
      <div className="container-x -mt-1">
        <div className="bg-brand/6 border border-brand/20 rounded-sm p-5 flex items-start gap-3">
          <SvgAcceptance size={16} className="text-brand shrink-0 mt-0.5" />
          <p className="text-sm text-ink/75 leading-relaxed">
            By accessing our website, submitting an enquiry, or using any of our services, you agree
            to these Terms &amp; Conditions. If you do not agree, please discontinue use immediately or{" "}
            <Link to="/contact" className="link-brand font-semibold">contact us</Link>.
          </p>
        </div>
      </div>

      {/* ── Layout: ToC sidebar + article ───────────────────────────────── */}
      <div className="container-x py-14">
        <div className="flex gap-12 items-start">

          {/* ── Sticky Table of Contents ──────────────────────────────── */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 self-start">
            <div className="paper-card p-5 rounded-sm overflow-hidden">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">Contents</div>
              <nav className="space-y-0.5 max-h-[66vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand/30 scrollbar-track-transparent">
                {SECTIONS.map((s, i) => {
                  const Icon = SECTION_ICONS[s.icon];
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
                      {Icon && (
                        <Icon
                          size={12}
                          className={`shrink-0 transition-colors ${
                            isActive ? "text-brand" : "text-ink/35 group-hover:text-ink/60"
                          }`}
                        />
                      )}
                      <span className="leading-tight">{i + 1}. {s.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-ink/10 space-y-2">
                <Link to="/privacy-policy" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Refund Policy
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

          {/* ── Policy Article ────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">

            {/* 1 · About */}
            <PolicySection id="about" iconKey="about" number={1} title="About RightTeam">
              <Para>
                RightTeam provides professional business support services including, but not limited to:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {[
                  "Company Registration", "LLP Registration", "OPC Registration",
                  "GST Registration", "Trademark Registration", "Copyright & Patent Assistance",
                  "Business Licences", "Startup India Registration", "ROC Compliance",
                  "Annual Filings", "Tax & Regulatory Compliance", "Business Consulting",
                ].map((svc) => (
                  <div key={svc} className="flex items-center gap-2.5 border border-ink/10 rounded-sm px-4 py-2.5 text-sm text-ink/80 bg-white hover:border-brand/30 hover:bg-brand/3 transition-all">
                    <SvgServices size={12} className="text-brand shrink-0" />
                    {svc}
                  </div>
                ))}
              </div>
              <AlertBox variant="note">
                <strong className="text-ink">Important:</strong> RightTeam acts as a professional service provider
                and does not guarantee approval from any government authority.
              </AlertBox>
            </PolicySection>

            {/* 2 · Acceptance */}
            <PolicySection id="acceptance" iconKey="acceptance" number={2} title="Acceptance of Terms">
              <Para>By using this website, you confirm that:</Para>
              <div className="space-y-3 my-4">
                {[
                  { label: "Age Requirement", desc: "You are at least 18 years of age." },
                  { label: "Accurate Information", desc: "The information you provide is accurate and complete." },
                  { label: "Legal Compliance", desc: "You agree to comply with all applicable laws and regulations." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 border border-ink/10 rounded-sm px-4 py-3 bg-white">
                    <div className="w-6 h-6 rounded-sm bg-brand text-white flex items-center justify-center shrink-0 mt-0.5">
                      <SvgAcceptance size={13} />
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">{item.label}</div>
                      <div className="text-xs text-ink/55 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 3 · Services */}
            <PolicySection id="services" iconKey="services" number={3} title="Services">
              <Para>
                Our services are provided based on the information and documents submitted by the client.
                Processing times may vary depending on:
              </Para>
              <BulletList items={[
                "Government departments",
                "Regulatory authorities",
                "Third-party verification",
                "Client document submission",
                "Public holidays or unforeseen circumstances",
              ]} />
              <AlertBox variant="note">
                Estimated timelines are <strong className="text-ink">indicative only</strong> and should not be treated
                as guaranteed completion dates.
              </AlertBox>
            </PolicySection>

            {/* 4 · User Responsibilities */}
            <PolicySection id="user-responsibilities" iconKey="user-responsibilities" number={4} title="User Responsibilities">
              <Para>You agree to:</Para>
              <BulletList items={[
                "Provide accurate and genuine information.",
                "Submit authentic supporting documents.",
                "Respond promptly to requests for additional information.",
                "Maintain confidentiality of your login credentials (if applicable).",
                "Use the website only for lawful purposes.",
              ]} />
              <AlertBox variant="warning">
                You are <strong>solely responsible</strong> for any delay caused by incomplete, inaccurate, or
                incorrect information provided to us.
              </AlertBox>
            </PolicySection>

            {/* 5 · Pricing */}
            <PolicySection id="pricing" iconKey="pricing" number={5} title="Pricing & Payments">
              <Para>
                Service fees displayed on the website are subject to change without prior notice.
                Unless otherwise specified:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {[
                  { heading: "Government Fees", body: "Charged separately from our professional fees." },
                  { heading: "Stamp Duty & Taxes", body: "Statutory charges may be additional to quoted prices." },
                  { heading: "Payment Terms", body: "Professional fees payable before commencement unless agreed." },
                ].map((card) => (
                  <div key={card.heading} className="paper-card p-4 rounded-sm">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center mb-3">
                      <SvgPricing size={14} className="text-brand" />
                    </div>
                    <div className="font-semibold text-ink text-sm mb-1">{card.heading}</div>
                    <div className="text-xs text-ink/55 leading-tight">{card.body}</div>
                  </div>
                ))}
              </div>
              <Para>Invoices will be issued where applicable.</Para>
            </PolicySection>

            {/* 6 · Consultation */}
            <PolicySection id="consultation" iconKey="consultation" number={6} title="Consultation Services">
              <Para>
                Consultations provided by RightTeam are based on the information available at the time of discussion.
              </Para>
              <AlertBox variant="ink">
                Recommendations should not be considered <strong className="text-ink">legal opinions or financial advice</strong>{" "}
                unless specifically stated in writing. Clients are encouraged to seek independent professional advice
                where necessary.
              </AlertBox>
            </PolicySection>

            {/* 7 · Govt Approvals */}
            <PolicySection id="government-approvals" iconKey="government-approvals" number={7} title="Government Approvals">
              <Para>
                Many of our services involve submissions to government departments and statutory authorities.
              </Para>
              <div className="mt-4 border border-ink bg-ink text-white rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SvgGovt size={16} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">Important Disclaimer</span>
                </div>
                <BulletList tone="dark" items={[
                  "RightTeam cannot influence approval decisions.",
                  "We cannot guarantee registration, certification, licence, or trademark approval.",
                  "We are not responsible for delays caused by government authorities.",
                ]} />
              </div>
            </PolicySection>

            {/* 8 · IP */}
            <PolicySection id="intellectual-property" iconKey="intellectual-property" number={8} title="Intellectual Property">
              <Para>
                All content available on this website is the property of RightTeam unless otherwise stated:
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                {["Text", "Graphics", "Logos", "Icons", "Images", "Videos", "Designs", "Layouts", "Documents"].map((item) => (
                  <div key={item} className="flex items-center gap-2 border border-ink/10 rounded-sm px-3 py-2 text-sm text-ink/75 bg-alt">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                No content may be <strong>copied, reproduced, distributed, or used</strong> without prior
                written permission from RightTeam.
              </AlertBox>
            </PolicySection>

            {/* 9 · Website Usage */}
            <PolicySection id="website-usage" iconKey="website-usage" number={9} title="Website Usage">
              <Para>Users agree not to:</Para>
              <BulletList items={[
                "Attempt unauthorized access to our systems.",
                "Upload malicious software or harmful content.",
                "Interfere with website functionality.",
                "Use automated tools to extract website content.",
                "Misrepresent their identity.",
              ]} />
              <AlertBox variant="warning">
                Violation may result in <strong>restricted access and legal action</strong> where applicable.
              </AlertBox>
            </PolicySection>

            {/* 10 · Marketing */}
            <PolicySection id="marketing" iconKey="marketing" number={10} title="Marketing Communications">
              <Para>
                By submitting your information through our website, contact forms, Meta Lead Ads, Google Ads,
                WhatsApp campaigns, landing pages, or other enquiry forms, you consent to receive communications
                from RightTeam through:
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                {["Phone Calls", "SMS", "WhatsApp", "Email", "Other Electronic Channels"].map((ch) => (
                  <div key={ch} className="flex items-center gap-2 border border-ink/10 bg-alt rounded-sm px-3 py-2.5 text-sm font-medium text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {ch}
                  </div>
                ))}
              </div>
              <SubHeading>Communications may include:</SubHeading>
              <BulletList items={[
                "Service updates", "Consultation follow-ups", "Compliance reminders",
                "Business updates", "Newsletters", "Promotional offers",
              ]} />
              <div className="mt-4 flex items-start gap-3 bg-brand/6 border border-brand/20 rounded-sm p-4">
                <SvgMarketing size={15} className="text-brand shrink-0 mt-0.5" />
                <p className="text-sm text-ink/70">
                  You may <strong className="text-ink">opt out</strong> of promotional communications at any time
                  by contacting us or using the unsubscribe link in our emails.
                </p>
              </div>
            </PolicySection>

            {/* 11 · Third Party */}
            <PolicySection id="third-party" iconKey="third-party" number={11} title="Third-Party Platforms">
              <Para>Our website may integrate with or link to third-party services including:</Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {[
                  "Government Portals", "Payment Gateways", "Google Services",
                  "Meta Platforms", "WhatsApp", "Other External Websites",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2.5 border border-ink/10 rounded-sm px-4 py-2.5 text-sm text-ink/80 bg-white">
                    <SvgThirdParty size={12} className="text-brand shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
              <Para>
                We are not responsible for the content, availability, or privacy practices of third-party platforms.
              </Para>
            </PolicySection>

            {/* 12 · Liability */}
            <PolicySection id="liability" iconKey="liability" number={12} title="Limitation of Liability">
              <Para>
                To the maximum extent permitted by law, RightTeam shall not be liable for:
              </Para>
              <BulletList items={[
                "Government delays",
                "Rejection of applications",
                "Business losses",
                "Loss of profits",
                "Indirect or consequential damages",
                "Service interruptions beyond our control",
              ]} />
              <div className="mt-5 border border-ink bg-ink text-white rounded-sm p-5 flex items-start gap-3">
                <SvgLiability size={16} className="text-brand shrink-0 mt-0.5" />
                <p className="text-sm text-white/80 leading-relaxed">
                  Our total liability, if any, shall not exceed the{" "}
                  <strong className="text-white">professional fees paid</strong> for the relevant service.
                </p>
              </div>
            </PolicySection>

            {/* 13 · Cancellation */}
            <PolicySection id="cancellation" iconKey="cancellation" number={13} title="Cancellation & Refunds">
              <Para>
                Cancellation and refund requests shall be governed by our Refund Policy.
              </Para>
              <div className="space-y-3 my-4">
                {[
                  { label: "Professional Fees", desc: "Fees already utilized for consultation, documentation, drafting, or government filing may not be refundable." },
                  { label: "Government Fees", desc: "Statutory charges and taxes are generally non-refundable unless otherwise permitted by applicable regulations." },
                ].map((item) => (
                  <div key={item.label} className="border border-ink/10 rounded-sm p-4 bg-white">
                    <div className="font-semibold text-ink text-sm mb-1 flex items-center gap-2">
                      <SvgRefund size={13} className="text-brand" />
                      {item.label}
                    </div>
                    <p className="text-xs text-ink/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 14 · Privacy */}
            <PolicySection id="privacy" iconKey="privacy" number={14} title="Privacy">
              <Para>
                Your use of this website is also governed by our Privacy Policy, which explains how we
                collect, use, and protect your personal information.
              </Para>
              <div className="mt-4">
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-2 border border-brand/30 bg-brand/6 text-brand text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-brand hover:text-white transition-all"
                >
                  <SvgPrivacy size={14} />
                  Read our Privacy Policy <ArrowRight size={13} />
                </Link>
              </div>
            </PolicySection>

            {/* 15 · Changes */}
            <PolicySection id="changes" iconKey="changes" number={15} title="Changes to Services">
              <Para>RightTeam reserves the right to:</Para>
              <BulletList items={[
                "Modify services",
                "Update pricing",
                "Revise website content",
                "Change these Terms & Conditions",
              ]} />
              <AlertBox variant="ink">
                Any changes will become effective upon <strong className="text-ink">publication on this website</strong>.
                We recommend revisiting these Terms periodically.
              </AlertBox>
            </PolicySection>

            {/* 16 · Governing Law */}
            <PolicySection id="governing-law" iconKey="governing-law" number={16} title="Governing Law">
              <Para>
                These Terms &amp; Conditions shall be governed by and interpreted in accordance with the
                laws of <strong className="text-ink">India</strong>.
              </Para>
              <div className="mt-4 flex items-start gap-4 border border-ink/10 rounded-sm p-5 bg-white">
                <div className="w-10 h-10 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                  <SvgGoverning size={18} className="text-brand" />
                </div>
                <div>
                  <div className="font-semibold text-ink text-sm mb-1">Exclusive Jurisdiction</div>
                  <p className="text-sm text-ink/65 leading-relaxed">
                    Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the
                    competent courts located in <strong className="text-ink">Ahmedabad, Gujarat</strong>.
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* 17 · Force Majeure */}
            <PolicySection id="force-majeure" iconKey="force-majeure" number={17} title="Force Majeure">
              <Para>
                RightTeam shall not be held responsible for delays or failure to perform its obligations due to
                events beyond reasonable control, including but not limited to:
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                {[
                  "Natural Disasters", "Government Restrictions", "Internet Outages",
                  "Technical Failures", "Strikes", "Pandemics", "Acts of War",
                ].map((ev) => (
                  <div key={ev} className="flex items-center gap-2 border border-ink/10 rounded-sm px-3 py-2.5 text-sm text-ink/75 bg-alt">
                    <SvgForceMajeure size={11} className="text-brand shrink-0" />
                    {ev}
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 18 · Contact */}
            <PolicySection id="contact" iconKey="contact" number={18} title="Contact Us">
              <Para>
                For any questions regarding these Terms &amp; Conditions, please contact us:
              </Para>
              <div className="mt-5 border border-ink/10 rounded-sm overflow-hidden">
                <div className="bg-ink text-white px-6 py-4 flex items-center gap-3">
                  <SvgContact size={16} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">RightTeam — Legal &amp; Compliance</span>
                </div>
                <div className="divide-y divide-ink/8">
                  <a href="mailto:support@rightteam.in" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      {/* Mail icon */}
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
                  <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <SvgContact size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Phone</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">+91 XXXXXXXXXX</div>
                    </div>
                  </a>
                  <a href="https://www.rightteam.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <SvgWebUsage size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Website</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">www.rightteam.in</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 px-6 py-4">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      {/* Map pin */}
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

            {/* ── Acknowledgement ─────────────────────────────────────── */}
            <div className="mt-12 border border-ink bg-ink text-white rounded-sm p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
                  <SvgAcceptance size={18} className="text-brand" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white mb-3">Acknowledgement</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By accessing or using RightTeam.in, submitting an enquiry, or engaging our services,
                    you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary text-sm rounded-sm">
                      Reach Our Team <ArrowRight size={14} />
                    </Link>
                    <Link to="/privacy-policy" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Privacy Policy
                    </Link>
                    <Link to="/refund-policy" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Refund Policy
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
                Document Ref: RT/LEGAL/TC/2026 · Effective 01 Jul 2026
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                © {new Date().getFullYear()} RightTeam Pvt. Ltd. — All rights reserved
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ── Mobile bottom nav ─────────────────────────────────────────── */}
      <div className="xl:hidden sticky bottom-0 z-30 bg-white border-t border-ink/10 shadow-md">
        <div className="container-x py-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {SECTIONS.map((s, i) => {
              const Icon = SECTION_ICONS[s.icon];
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive ? "bg-brand text-white" : "bg-alt text-ink/60 hover:bg-ink/8 hover:text-ink"
                  }`}
                >
                  {Icon && <Icon size={11} />}
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
