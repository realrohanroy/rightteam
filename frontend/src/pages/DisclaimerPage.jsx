import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   Bespoke professional SVG icons — one per section
   ═══════════════════════════════════════════════════════════════════════ */

const SvgInfo = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.9" fill="currentColor" />
  </svg>
);

const SvgAdvice = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v18M5 7l14 10M5 17l14-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
    <path d="M12 4l-8 4v4c0 4 3.5 7 8 8 4.5-1 8-4 8-8V8l-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SvgServices = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.77z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgGovt = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10v11M10 10v11M14 10v11M18 10v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
  </svg>
);

const SvgTimeline = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgLink = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgMarketing = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11v2a2 2 0 002 2h2l5 4V5L7 9H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8a4 4 0 010 8M19 5a8 8 0 010 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SvgNoGuarantee = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const SvgLiability = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" />
  </svg>
);

const SvgIP = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7a4 4 0 014 4v2a4 4 0 11-8 0v-2a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.6" />
    <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" fontFamily="serif">©</text>
  </svg>
);

const SvgUserResp = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17.5 5.5l1.2 1.2L21 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgUpdate = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64L21 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64L3 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".4" />
  </svg>
);

const SvgContact = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Section registry ─────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "general",            label: "General Information",                Icon: SvgInfo },
  { id: "advice",             label: "No Legal / Tax / Financial Advice",  Icon: SvgAdvice },
  { id: "professional",       label: "Professional Services",              Icon: SvgServices },
  { id: "government",         label: "Government Authorities",             Icon: SvgGovt },
  { id: "timelines",          label: "Service Timelines",                  Icon: SvgTimeline },
  { id: "third-party",        label: "Third-Party Links",                  Icon: SvgLink },
  { id: "marketing",          label: "Marketing & Promotional Content",    Icon: SvgMarketing },
  { id: "no-guarantee",       label: "No Guarantee of Results",            Icon: SvgNoGuarantee },
  { id: "liability",          label: "Limitation of Liability",            Icon: SvgLiability },
  { id: "ip",                 label: "Intellectual Property",              Icon: SvgIP },
  { id: "user-responsibility",label: "User Responsibility",                Icon: SvgUserResp },
  { id: "changes",            label: "Changes to This Disclaimer",         Icon: SvgUpdate },
  { id: "contact",            label: "Contact Us",                         Icon: SvgContact },
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
  const dot =
    variant === "red"
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
    note:    { wrap: "bg-brand/6 border-brand/20",           icon: "text-brand",      Icon: SvgInfo },
    warning: { wrap: "bg-[#C14410]/6 border-[#C14410]/20",   icon: "text-[#C14410]",  Icon: SvgLiability },
    ink:     { wrap: "bg-ink/5 border-ink/15",               icon: "text-ink/50",     Icon: SvgAdvice },
    success: { wrap: "bg-[#eaf5ee] border-[#2a7a4f]/25",     icon: "text-[#2a7a4f]",  Icon: SvgNoGuarantee },
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
export default function DisclaimerPage() {
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
        <title>Disclaimer — RightTeam.in</title>
        <meta
          name="description"
          content="Read the Disclaimer for RightTeam.in. Understand the limits of our informational content, professional services, and liability. Effective 01 July 2026."
        />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">Disclaimer</span>
          </nav>

          <div className="max-w-3xl">
            {/* Icon + badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center">
                {/* Alert / Disclaimer shield icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l9 4v6c0 5-3.8 9.5-9 10-5.2-.5-9-5-9-10V6l9-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="0.95" fill="currentColor" />
                </svg>
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1 rounded-sm">
                Legal Document
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
              Disclaimer
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              The information published on this Website is for general informational purposes only.
              By accessing or using RightTeam.in, you acknowledge and agree to the terms set out in this Disclaimer.
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { svg: <SvgTimeline size={14} className="text-brand" />, label: "Effective Date", value: "01 July 2026" },
                { svg: <SvgInfo size={14} className="text-brand" />,      label: "Sections",      value: `${SECTIONS.length}` },
                { svg: <SvgGovt size={14} className="text-brand" />,      label: "Jurisdiction",  value: "India — Ahmedabad" },
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
          <SvgInfo size={16} className="text-brand shrink-0 mt-0.5" />
          <p className="text-sm text-ink/75 leading-relaxed">
            The information on this Website is published in good faith and is intended solely for general
            informational purposes. For any questions, please{" "}
            <Link to="/contact" className="link-brand font-semibold">contact our team</Link>{" "}
            before relying on any content herein.
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
                <Link to="/refund-policy" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Refund Policy
                </Link>
                <Link to="/contact" className="btn-primary w-full justify-center text-xs py-2.5 rounded-sm">
                  Contact Us <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Article ─────────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">

            {/* 1 · General Information */}
            <PolicySection id="general" Icon={SvgInfo} number={1} title="General Information">
              <Para>
                The content available on this Website, including articles, guides, blogs, FAQs, service
                descriptions, and other materials, is intended to provide general information regarding
                business registration, compliance, taxation, intellectual property, and related services.
              </Para>
              <AlertBox variant="note">
                While we strive to keep the information accurate and up to date, RightTeam makes{" "}
                <strong className="text-ink">no representations or warranties</strong>, express or implied,
                regarding the completeness, accuracy, reliability, suitability, or availability of the
                information provided.
              </AlertBox>
            </PolicySection>

            {/* 2 · No Legal / Tax / Financial Advice */}
            <PolicySection id="advice" Icon={SvgAdvice} number={2} title="No Legal, Tax or Financial Advice">
              <Para>
                The information published on this Website should <strong className="text-ink">not be interpreted</strong>{" "}
                as legal, tax, accounting, financial, or professional advice.
              </Para>
              <BulletList items={[
                "Every business has unique circumstances and requires tailored guidance.",
                "Decisions should be made only after consulting a qualified professional based on your specific requirements.",
                "Using the information available on this Website does not create a professional-client relationship between you and RightTeam.",
              ]} />
              <AlertBox variant="ink">
                RightTeam does not act as your legal counsel, chartered accountant, or financial advisor
                unless explicitly engaged under a separate written agreement.
              </AlertBox>
            </PolicySection>

            {/* 3 · Professional Services */}
            <PolicySection id="professional" Icon={SvgServices} number={3} title="Professional Services">
              <Para>
                RightTeam provides professional assistance for business registrations, compliance, licensing,
                intellectual property, and related services. However, please note the following:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {[
                  { label: "Government Approvals", body: "Subject to applicable laws and regulations." },
                  { label: "Registration Authority", body: "Granted only by the relevant government body." },
                  { label: "No Outcome Guarantee", body: "Approval, registration or processing timelines cannot be guaranteed." },
                ].map((card) => (
                  <div key={card.label} className="paper-card p-4 rounded-sm text-center">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-3">
                      <SvgServices size={14} className="text-brand" />
                    </div>
                    <div className="font-semibold text-ink text-sm">{card.label}</div>
                    <div className="text-xs text-ink/55 mt-1 leading-tight">{card.body}</div>
                  </div>
                ))}
              </div>
              <AlertBox variant="note">
                Our responsibility is <strong className="text-ink">limited to providing professional support</strong>,
                documentation assistance, and application filing on your behalf.
              </AlertBox>
            </PolicySection>

            {/* 4 · Government Authorities */}
            <PolicySection id="government" Icon={SvgGovt} number={4} title="Government Authorities">
              <Para>
                Many services offered by RightTeam involve interaction with government departments and
                statutory authorities. Processing times, approval decisions, document requirements, and
                applicable fees may change <strong className="text-ink">without prior notice</strong>.
              </Para>
              <div className="mt-4 border border-ink bg-ink text-white rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SvgGovt size={15} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">Important Note</span>
                </div>
                <BulletList variant="light" items={[
                  "RightTeam shall not be responsible for delays caused by government departments.",
                  "Final decisions rest entirely with the relevant statutory authority.",
                  "Additional documentation or clarifications may be requested at any stage.",
                ]} />
              </div>
            </PolicySection>

            {/* 5 · Service Timelines */}
            <PolicySection id="timelines" Icon={SvgTimeline} number={5} title="Service Timelines">
              <Para>
                Any timelines, estimated processing periods, or expected completion dates displayed on the
                Website are <strong className="text-ink">indicative only</strong>. Actual completion depends on
                several factors:
              </Para>
              <div className="space-y-2.5 my-4">
                {[
                  { heading: "Government Processing",    desc: "Time taken by departments to review and act upon applications." },
                  { heading: "Regulatory Verification",  desc: "Additional checks or verifications by statutory bodies." },
                  { heading: "Client Response Time",     desc: "How promptly the client provides information or documents." },
                  { heading: "Document Accuracy",        desc: "Completeness and correctness of the documents submitted." },
                  { heading: "Technical / Administrative Delays", desc: "Unforeseen system, network or administrative delays." },
                ].map((item) => (
                  <div key={item.heading} className="flex items-start gap-3 border border-ink/10 rounded-sm px-4 py-3 bg-white">
                    <SvgTimeline size={13} className="text-brand shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-ink text-sm">{item.heading}</div>
                      <div className="text-xs text-ink/60 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                Timelines should <strong>not be treated as guaranteed commitments</strong> under any circumstances.
              </AlertBox>
            </PolicySection>

            {/* 6 · Third-Party Links */}
            <PolicySection id="third-party" Icon={SvgLink} number={6} title="Third-Party Links">
              <Para>
                Our Website may contain links to third-party websites, government portals, payment gateways,
                or external resources for your convenience.
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                {[
                  "Government Portals", "Payment Gateways", "Google Services",
                  "Meta Platforms", "WhatsApp", "Other External Sites",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2 border border-ink/10 rounded-sm px-3 py-2.5 text-sm text-ink/75 bg-alt">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                RightTeam does not control or endorse the content, accuracy, availability, or privacy
                practices of third-party websites and shall <strong>not be responsible</strong> for any
                loss or damage arising from their use.
              </AlertBox>
            </PolicySection>

            {/* 7 · Marketing & Promotional Content */}
            <PolicySection id="marketing" Icon={SvgMarketing} number={7} title="Marketing & Promotional Content">
              <Para>
                Any promotional offers, advertisements, service descriptions, pricing, or marketing campaigns
                displayed on this Website or through platforms such as Google, Meta (Facebook &amp; Instagram),
                LinkedIn, WhatsApp, email, or other digital channels are subject to change{" "}
                <strong className="text-ink">without prior notice</strong>.
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                {["Google Ads", "Meta (FB & IG)", "LinkedIn", "WhatsApp", "Email", "Other Digital Channels"].map((ch) => (
                  <div key={ch} className="flex items-center gap-2 border border-ink/10 bg-alt rounded-sm px-3 py-2.5 text-sm font-medium text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {ch}
                  </div>
                ))}
              </div>
              <AlertBox variant="ink">
                Nothing contained in promotional materials shall be interpreted as a guarantee of
                approval, eligibility, or outcome.
              </AlertBox>
            </PolicySection>

            {/* 8 · No Guarantee of Results */}
            <PolicySection id="no-guarantee" Icon={SvgNoGuarantee} number={8} title="No Guarantee of Results">
              <Para>
                While RightTeam is committed to delivering professional and timely services, we{" "}
                <strong className="text-ink">do not guarantee</strong> any of the following:
              </Para>
              <div className="space-y-3 my-4">
                {[
                  { heading: "Approval of Applications",  desc: "Final decision rests with the relevant government authority." },
                  { heading: "Trademark Registration",     desc: "Subject to the Registrar's examination and objections." },
                  { heading: "Government Certification",   desc: "Granted only after statutory review and verification." },
                  { heading: "Tax Benefits",               desc: "Dependent on the taxpayer's specific situation and current law." },
                  { heading: "Startup Recognition",        desc: "Conferred solely by the Department for Promotion of Industry & Internal Trade (DPIIT)." },
                  { heading: "Business Funding",           desc: "Subject to investor, scheme, or institutional discretion." },
                  { heading: "Profit or Business Success", desc: "Commercial outcomes depend on numerous factors outside RightTeam's control." },
                ].map((item) => (
                  <div key={item.heading} className="flex items-start gap-3 border border-[#C14410]/15 bg-[#C14410]/4 rounded-sm px-4 py-3">
                    <div className="w-6 h-6 rounded-sm bg-[#C14410] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <SvgNoGuarantee size={13} />
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">{item.heading}</div>
                      <div className="text-xs text-ink/60 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 9 · Limitation of Liability */}
            <PolicySection id="liability" Icon={SvgLiability} number={9} title="Limitation of Liability">
              <Para>
                To the fullest extent permitted by applicable law, RightTeam shall{" "}
                <strong className="text-ink">not be liable</strong> for any direct, indirect, incidental,
                consequential, or special damages arising from:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {[
                  "Use of this Website",
                  "Reliance on the content",
                  "Government decisions",
                  "Delays in processing",
                  "Service interruptions",
                  "Technical errors",
                  "Loss of business opportunities",
                  "Financial losses",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 border border-ink/10 rounded-sm px-4 py-2.5 text-sm text-ink/80 bg-white">
                    <SvgLiability size={11} className="text-[#C14410] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                Your use of this Website is <strong>entirely at your own risk</strong>.
              </AlertBox>
            </PolicySection>

            {/* 10 · Intellectual Property */}
            <PolicySection id="ip" Icon={SvgIP} number={10} title="Intellectual Property">
              <Para>
                All content available on this Website, including but not limited to the following, is the
                intellectual property of RightTeam unless otherwise stated:
              </Para>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                {["Text", "Graphics", "Logos", "Icons", "Images", "Videos", "Documents", "Website Design", "Source Content"].map((item) => (
                  <div key={item} className="flex items-center gap-2 border border-ink/10 rounded-sm px-3 py-2 text-sm text-ink/75 bg-alt">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <AlertBox variant="warning">
                Unauthorized copying, reproduction, distribution, or commercial use is{" "}
                <strong>prohibited without prior written permission</strong> from RightTeam.
              </AlertBox>
            </PolicySection>

            {/* 11 · User Responsibility */}
            <PolicySection id="user-responsibility" Icon={SvgUserResp} number={11} title="User Responsibility">
              <Para>Users are responsible for:</Para>
              <BulletList items={[
                "Verifying information before making business decisions.",
                "Providing accurate documents and information.",
                "Seeking independent professional advice where required.",
                "Ensuring compliance with applicable laws and regulations.",
              ]} />
              <AlertBox variant="ink">
                RightTeam shall not be held responsible for losses arising from a user's failure to
                verify information or comply with applicable legal requirements.
              </AlertBox>
            </PolicySection>

            {/* 12 · Changes to This Disclaimer */}
            <PolicySection id="changes" Icon={SvgUpdate} number={12} title="Changes to This Disclaimer">
              <Para>
                RightTeam reserves the right to modify or update this Disclaimer at any time without prior notice.
              </Para>
              <AlertBox variant="note">
                The updated version will be published on this page with the revised{" "}
                <strong className="text-ink">Effective Date</strong>. We recommend reviewing this Disclaimer
                periodically to stay informed.
              </AlertBox>
            </PolicySection>

            {/* 13 · Contact Us */}
            <PolicySection id="contact" Icon={SvgContact} number={13} title="Contact Us">
              <Para>If you have any questions regarding this Disclaimer, please contact us:</Para>

              <div className="mt-5 border border-ink/10 rounded-sm overflow-hidden">
                <div className="bg-ink text-white px-6 py-4 flex items-center gap-3">
                  <SvgContact size={16} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">RightTeam — Legal &amp; Compliance</span>
                </div>
                <div className="divide-y divide-ink/8">
                  {/* Email */}
                  <a href="mailto:support@rightteam.in" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Email</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">support@rightteam.in</div>
                    </div>
                  </a>
                  {/* Phone */}
                  <a href="tel:+918980935000" className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group">
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
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.7" />
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

            {/* ── Final Acknowledgement ───────────────────────────────── */}
            <div className="mt-12 border border-ink bg-ink text-white rounded-sm p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
                  {/* Alert shield icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l9 4v6c0 5-3.8 9.5-9 10-5.2-.5-9-5-9-10V6l9-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="0.95" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl text-white mb-3">Acknowledgement</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By accessing or using RightTeam.in, submitting an enquiry, or engaging our services,
                    you acknowledge that you have read, understood, and agreed to this Disclaimer.
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
                    <Link to="/refund-policy" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Refund Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Document footer */}
            <div className="mt-8 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                Document Ref: RT/LEGAL/DC/2026 · Effective 01 Jul 2026
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
