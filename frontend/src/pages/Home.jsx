import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { CredentialRow } from "../components/Seal";
import { ServiceCard } from "../components/ServiceCard";
import { RiskCalculator } from "../components/RiskCalculator";
import { TeamGrid } from "../components/TeamGrid";
import { ComparisonTable } from "../components/ComparisonTable";
import { CaseStudies } from "../components/CaseStudies";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { ResourcesAndCta } from "../components/ResourcesAndCta";
import { CredibilityBar } from "../components/CredibilityBar";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CalculatorIllustrationPlaceholder, ProcessIllustrationPlaceholder } from "../components/HeroIllustrationPlaceholder";
import { PenaltyChart } from "../components/PenaltyChart";
import { PILLARS, SERVICES } from "../data/services";
import { CLIENT_LOGOS } from "../data/marketing";
import { ArrowRight, Check, Calendar, Play, ChevronDown } from "lucide-react";
import { useScrollFadeIn, useScrollStagger } from "../hooks/useScrollAnimation";

// ─── Hero Service List — true infinite cycler (no snap) ───────────────────────
const HERO_SERVICES = [
  "REGISTER YOUR COMPANY",
  "GST FILINGS DONE RIGHT",
  "PROTECT YOUR BRAND",
  "GET ISO CERTIFIED",
  "GET STARTUP INDIA RECOGNITION",
  "APPLY FOR FSSAI LICENCE",
  "FILE YOUR INCOME TAX",
  "GET GEM REGISTERED",
];

const ITEM_H = 72;
const N = HERO_SERVICES.length;
const RANGE = 4; // items rendered above and below center (keeps pipeline full)

const HeroServiceList = () => {
  // virtualIndex grows forever — no reset ever needed
  const [virtualIndex, setVirtualIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setVirtualIndex((v) => v + 1), 2000);
    return () => clearInterval(id);
  }, []);

  // Render positions virtualIndex - RANGE … virtualIndex + RANGE
  const positions = Array.from({ length: RANGE * 2 + 1 }, (_, k) => virtualIndex - RANGE + k);

  return (
    <div
      className="relative h-[360px] w-full max-w-[600px] overflow-hidden"
      data-testid="hero-service-marquee"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      {/* Fixed arrow — stays at vertical center */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-[#E72061] text-[16px] pointer-events-none select-none">
        ▶
      </div>

      {/* Absolutely-positioned items — each slides to its own computed Y */}
      {positions.map((pos) => {
        const dist = pos - virtualIndex;       // distance from active (-RANGE … +RANGE)
        const absDist = Math.abs(dist);
        const active = absDist === 0;
        // center of container = 180px; active item center at 180px
        const yCenter = 180 + dist * ITEM_H - ITEM_H / 2;
        // label wraps cyclically; handle negative modulo correctly
        const label = HERO_SERVICES[((pos % N) + N) % N];

        return (
          <div
            key={pos}
            className="absolute left-0 w-full pl-10 font-display flex items-center text-white whitespace-nowrap"
            style={{
              height: `${ITEM_H}px`,
              top: 0,
              transform: `translateY(${yCenter}px)`,
              fontSize: active ? "1.75rem" : "1.35rem",
              fontWeight: active ? 700 : 400,
              opacity: active ? 1 : absDist === 1 ? 0.45 : absDist === 2 ? 0.2 : 0,
              transformOrigin: "left center",
              scale: active ? 1 : 0.88,
              transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, font-size 0.45s ease, scale 0.45s ease",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};


// ─── Client Logo Row ──────────────────────────────────────────────────────────
const ClientLogoRow = () => (
  <section className="bg-white border-b border-ink/10 py-10" data-testid="client-logo-row">
    <div className="container-x text-center">
      <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
        Trusted by 500+ Indian businesses — startups, manufacturers, and retailers.
      </div>
      {CLIENT_LOGOS && CLIENT_LOGOS.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-12 sm:gap-16">
          {CLIENT_LOGOS.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt || "Client Logo"}
              className="h-8 object-contain opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          ))}
        </div>
      )}
    </div>
  </section>
);

// ─── Pillar tabs preview (dynamic logic) ──────────────────────────────────────
const PillarTabsPreview = ({ activePillarSlug }) => {
  const pillar = PILLARS.find((p) => p.slug === activePillarSlug) || PILLARS[0];
  const services = SERVICES.filter((s) => s.pillar === pillar.slug).slice(0, 4);
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-1">
        <div className="font-display text-xl text-ink leading-tight">{pillar.label}</div>
        <Link
          to={`/${pillar.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-brand decoration-2"
        >
          View all services →
        </Link>
      </div>
      <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
};

// ─── Mobile Pillar Accordion ──────────────────────────────────────────────────
const MobilePillarAccordion = () => {
  const [openSlug, setOpenSlug] = useState(PILLARS[0].slug);
  return (
    <div className="divide-y divide-ink/10 border border-ink/15 rounded-sm overflow-hidden">
      {PILLARS.map((p, idx) => {
        const isOpen = openSlug === p.slug;
        const services = SERVICES.filter((s) => s.pillar === p.slug).slice(0, 4);
        return (
          <div key={p.slug}>
            {/* Accordion Header */}
            <button
              onClick={() => setOpenSlug(isOpen ? null : p.slug)}
              className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors ${
                isOpen ? "bg-ink text-white" : "bg-white text-ink hover:bg-alt"
              }`}
            >
              <div>
                <div className="font-display text-base font-semibold">{p.label}</div>
              </div>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : "text-ink/40"
                }`}
              />
            </button>

            {/* Accordion Body */}
            {isOpen && (
              <div className="bg-white px-4 pb-4 pt-3 space-y-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/service/${s.slug}`}
                    className="flex items-start gap-3 p-3 border border-ink/10 rounded-sm hover:border-ink/25 hover:bg-alt transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-ink leading-snug">{s.name}</div>
                      <div className="text-xs text-slate2 mt-0.5 line-clamp-2">{s.oneLine}</div>
                    </div>
                    <div className="shrink-0 mono text-[10px] text-brand font-semibold mt-0.5 whitespace-nowrap">
                      {s.startingPrice}
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/${p.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-brand decoration-2 mt-1"
                >
                  View all services →
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useScrollFadeIn({ y: 20 });
  const servicesGridRef = useScrollStagger({ stagger: 0.08 });
  const [activePillar, setActivePillar] = useState(PILLARS[0].slug);

  return (
    <Layout>
      <section className="relative bg-[#050B14] overflow-hidden min-h-[85vh] flex flex-col justify-center pt-24 pb-16" data-testid="hero-section">
        {/* Background Image — Surreal/Dramatic Abstract */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Dramatic abstract surreal landscape"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Subtle gradient overlays to ensure text legibility while keeping it dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-black/30" />
        </div>

        <div className="container-x relative z-10 w-full grid lg:grid-cols-12 gap-16 lg:gap-12 items-center flex-1">
          
          {/* Left: headline + CTA */}
          <div className="lg:col-span-6" ref={heroRef}>
            {/* Pill overline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90">
              <span className="text-white">Fast. Reliable. Hassle-Free Compliance.</span> 
              <span className="text-white/60 mx-1">|</span>
              <a href="/contact" className="hover:text-white transition-colors flex items-center gap-1">Talk to an Expert<ArrowRight size={12} /></a>
            </div>

            {/* Headline */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] mt-6 text-white font-bold tracking-tight">
              The compliance platform to direct your best work
            </h1>

            {/* Subhead */}
            <p className="text-lg text-white/80 mt-6 max-w-xl leading-relaxed">
              Every statutory filing for tax, MCA. Intelligent workflows for professional control and collaboration. On-brand production at any scale.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center bg-white text-[#050B14] px-8 py-3.5 text-sm font-bold tracking-wide rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-md"
                data-testid="hero-get-started"
              >
                Get Started Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white/10 px-8 py-3.5 text-sm font-bold tracking-wide rounded-xl active:scale-95 transition-all"
                data-testid="hero-book-meeting"
              >
                <Play size={14} fill="currentColor" />
                <span>Why RightTeam?</span>
              </Link>
            </div>
          </div>

          {/* Right: auto-looping service marquee — hidden on mobile/smaller screens */}
          <div className="hidden lg:flex lg:col-span-6 justify-end">
             {/* The list itself aligns to the right side of its container */}
            <HeroServiceList />
          </div>
        </div>

        {/* ── Trusted-by strip — transparent backdrop, overlays the hero background, infinite horizontal marquee on mobile/desktop ── */}
        <div className="lg:absolute relative bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-transparent py-6 overflow-hidden">
          <p className="text-center text-[11px] tracking-widest text-white uppercase font-semibold mb-5 px-6">
            Trusted by 2000+ Indian businesses — startups, manufacturers &amp; enterprises
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee-left lg:!animate-none lg:justify-center flex gap-12 sm:gap-16 items-center w-max lg:w-full hover:[animation-play-state:paused] lg:hover:[animation-play-state:running] cursor-pointer">
              {/* First set of logos */}
              <div className="flex shrink-0 items-center gap-12 sm:gap-16 lg:justify-center lg:w-full">
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="white">APEX</text>
                </svg>
                <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">SYNERGY</text>
                </svg>
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">ACME</text>
                </svg>
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">VORTEX</text>
                </svg>
                <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">INNOVATE</text>
                </svg>
                <svg height="22" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">HORIZON</text>
                </svg>
              </div>
              
              {/* Second identical set of logos for seamless infinite loop */}
              <div className="flex lg:hidden shrink-0 items-center gap-12 sm:gap-16" aria-hidden="true">
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="white">APEX</text>
                </svg>
                <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">SYNERGY</text>
                </svg>
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">ACME</text>
                </svg>
                <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">VORTEX</text>
                </svg>
                <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">INNOVATE</text>
                </svg>
                <svg height="22" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">HORIZON</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── CREDIBILITY BAR — stat strip ──────────────────────────────────── */}
      <CredibilityBar />

      {/* ── COMPLIANCE CALCULATOR — navy bg ─────────────────────────────────── */}
      <section className="section-navy py-28 border-y border-white/10" data-testid="calculator-wrapper">
        <div className="container-x mb-12 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand shrink-0 shadow-inner">
            <Calendar size={32} strokeWidth={1.5} />
          </div>
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
              FREE COMPLIANCE CHECK • ONLINE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
              Check Your Business Compliance in Just 30 Seconds.
            </h2>
          </div>
        </div>
        <div className="[&_.container-x]:!pt-0">
          <RiskCalculator inverted />
        </div>
      </section>

      {/* ── OUR SERVICES / FILING TABS — white ────────────────────────────── */}
      <section id="services" className="bg-white container-x py-28">
        <div className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Our Services
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Everything your business needs. From Registration to Compliance.
          </h2>
        </div>

        <div className="mt-10">
          {/* Mobile: Accordion */}
          <div className="lg:hidden">
            <MobilePillarAccordion />
          </div>
          {/* Desktop: Original tab+preview layout */}
          <div className="hidden lg:block">
            <FilingTabs activeSlug={activePillar} onTabChange={setActivePillar} />
            <div className="bg-white border border-t-0 border-ink/60 p-6 sm:p-8 rounded-b-sm">
              <PillarTabsPreview activePillarSlug={activePillar} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE — alt bg ────────────────────────────────────────── */}
      <ComparisonTable />

      {/* ── POPULAR SERVICES — warm bg ──────────────────────────────────────── */}
      <section className="section-warm border-y border-ink/10 py-28">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
                Most-requested services
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
                Filings we complete most often.
              </h2>
            </div>
            <Link
              to="/quote"
              className="link-brand text-sm"
            >
              View full catalog →
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" ref={servicesGridRef}>
            {[
              "private-limited-company",
              "gst-registration",
              "trademark-filing",
              "income-tax-return",
              "startup-india-recognition",
              "iso-certification",
            ].map((slug) => {
              const s = SERVICES.find((x) => x.slug === slug);
              return <ServiceCard key={slug} service={s} />;
            })}
          </div>
        </div>
      </section>

      {/* ── MAGNIFIC-INSPIRED DARK BREAKAWAY SECTION ──────────────────────── */}
      <div className="bg-[#050B14] text-white overflow-hidden">
        
        {/* ── CASE STUDIES ───────────────────────────────────────────────────── */}
        <CaseStudies />

        {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
        <TestimonialsSection />
      </div>
      <ResourcesAndCta />

      {/* ── COMPLIANCE PDF CTA ───────────────────────────────────────────────── */}
      <CompliancePDFCta variant="default" />

    </Layout>
  );
}
