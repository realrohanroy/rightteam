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
import { CredibilityBar } from "../components/CredibilityBar";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ResourceCards } from "../components/ResourceCards";
import { CalculatorIllustrationPlaceholder, ProcessIllustrationPlaceholder } from "../components/HeroIllustrationPlaceholder";
import { PILLARS, SERVICES } from "../data/services";
import { CLIENT_LOGOS } from "../data/marketing";
import { ArrowRight, Check, Calendar } from "lucide-react";
import { useScrollFadeIn, useScrollStagger } from "../hooks/useScrollAnimation";

// ─── Hero Service List — true infinite cycler (no snap) ───────────────────────
const HERO_SERVICES = [
  "Register your company",
  "File your GST returns",
  "Protect your trademark",
  "Run payroll and PF",
  "Close a company",
  "Get ISO certified",
  "File your income tax",
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
      className="relative h-[360px] w-full max-w-[420px] overflow-hidden"
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
            className="absolute left-0 w-full pl-10 font-display flex items-center text-white"
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
        Trusted by 8,400+ Indian businesses — startups, manufacturers, and retailers.
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
  const services = SERVICES.filter((s) => s.pillar === pillar.slug).slice(0, 3);
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="font-display text-xl text-ink leading-tight">{pillar.label}</div>
        <Link
          to={`/${pillar.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-brand decoration-2"
        >
          Open practice area →
        </Link>
      </div>
      <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
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
          <div className="lg:col-span-7" ref={heroRef}>
            {/* Pill overline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90">
              <span className="text-white">Ranked #1 Compliance platform</span> 
              <span className="text-white/60 mx-1">|</span>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Read report <ArrowRight size={12} /></a>
            </div>

            {/* Headline */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] mt-6 text-white font-bold tracking-tight">
              The compliance platform to direct your best work
            </h1>

            {/* Subhead */}
            <p className="text-lg text-white/80 mt-6 max-w-xl leading-relaxed">
              Every statutory filing for tax, MCA. Intelligent workflows for professional control and collaboration. On-brand production at any scale.
            </p>


          </div>

          {/* Right: auto-looping service marquee */}
          <div className="lg:col-span-5 flex justify-end">
             {/* The list itself aligns to the right side of its container */}
            <HeroServiceList />
          </div>
        </div>

        {/* ── Trusted-by strip — pinned to bottom of hero ─────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent py-6 px-6 lg:px-16">
          <p className="text-center text-[11px] tracking-widest text-white/60 uppercase font-semibold mb-5">
            Trusted by 8,400+ Indian businesses — startups, manufacturers &amp; enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {/* Apex */}
            <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="white">APEX</text>
            </svg>
            {/* Synergy */}
            <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">SYNERGY</text>
            </svg>
            {/* Acme */}
            <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">ACME</text>
            </svg>
            {/* Vortex */}
            <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">VORTEX</text>
            </svg>
            {/* Innovate */}
            <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">INNOVATE</text>
            </svg>
            {/* Horizon */}
            <svg height="22" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="white">HORIZON</text>
            </svg>
          </div>
        </div>
      </section>


      {/* ── CREDIBILITY BAR — stat strip ──────────────────────────────────── */}
      <CredibilityBar />

      {/* ── COMPLIANCE CALCULATOR — navy bg ─────────────────────────────────── */}
      <section className="section-navy py-28 border-y border-white/10" data-testid="calculator-wrapper">
        <div className="container-x mb-12 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand shrink-0 shadow-inner">
            <Calendar size={32} strokeWidth={1.5} />
          </div>
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
              Compliance exposure · Interactive
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
              See every filing your entity owes this year.
            </h2>
          </div>
        </div>
        <div className="[&_.container-x]:!pt-0">
          <RiskCalculator inverted />
        </div>
      </section>

      {/* ── PRACTICE AREAS / FILING TABS — white ────────────────────────────── */}
      <section className="bg-white container-x py-28">
        <div className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Practice areas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Five practice areas. Thirty regulated filings.
          </h2>
        </div>

        <div className="mt-10">
          <FilingTabs activeSlug={activePillar} onTabChange={setActivePillar} />
          <div className="bg-white border border-t-0 border-ink/60 p-6 sm:p-8 rounded-b-sm">
            <PillarTabsPreview activePillarSlug={activePillar} />
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
              "msme-udyam",
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

        {/* ── PROCESS / ENGAGEMENT WORKFLOW (BENTO GRID) ───────────────────── */}
        <section className="container-x py-28 relative">
          <div className="max-w-3xl mb-16 relative z-10">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
              Engagement workflow
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white mt-4 leading-tight">
              One manager. Four documented stages.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 relative z-10">
            {/* Step 1 - Spans 2 cols */}
            <div className="md:col-span-2 relative group rounded-[20px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 sm:p-12 hover:bg-white/[0.04] transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mono text-brand font-bold text-lg mb-6 tracking-widest">01</div>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">Scope confirmed</h3>
              <p className="text-white/60 text-lg">Fixed-fee quote issued, engagement letter signed.</p>
            </div>
            
            {/* Step 2 - Spans 1 col */}
            <div className="md:col-span-1 relative group rounded-[20px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 sm:p-12 hover:bg-white/[0.04] transition-colors duration-500">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand/20 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mono text-brand font-bold text-lg mb-6 tracking-widest">02</div>
              <h3 className="font-display text-2xl text-white mb-3">Manager assigned</h3>
              <p className="text-white/60 text-lg">Specialist allocated, single WhatsApp thread opened.</p>
            </div>

            {/* Step 3 - Spans 1 col */}
            <div className="md:col-span-1 relative group rounded-[20px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 sm:p-12 hover:bg-white/[0.04] transition-colors duration-500">
              <div className="absolute top-0 left-0 w-48 h-48 bg-brand/20 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mono text-brand font-bold text-lg mb-6 tracking-widest">03</div>
              <h3 className="font-display text-2xl text-white mb-3">Prepared and reviewed</h3>
              <p className="text-white/60 text-lg">Forms drafted, documents collected, filing reviewed.</p>
            </div>

            {/* Step 4 - Spans 2 cols */}
            <div className="md:col-span-2 relative group rounded-[20px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 sm:p-12 hover:bg-white/[0.04] transition-colors duration-500">
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#1E5631]/30 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mono text-brand font-bold text-lg mb-6 tracking-widest">04</div>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">Filed and acknowledged</h3>
              <p className="text-white/60 text-lg">Return filed, acknowledgement delivered same day.</p>
            </div>
          </div>
        </section>

        {/* ── RESOURCE CARDS ─────────────────────────────────────────────────── */}
        <ResourceCards />
      </div>

      {/* ── PENALTY CALLOUT — seal red tint ─────────────────────────────────── */}
      <section className="container-x py-28">
        <div className="border-l-4 border-seal bg-seal/[0.04] p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center border border-seal/25">
          <div className="md:col-span-2">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-seal font-semibold">
              Penalty exposure notice
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink mt-2 leading-tight">
              An unfiled GST return compounds to a five-figure penalty inside a quarter.
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/quote"
              className="btn-urgent justify-center"
              data-testid="urgent-cta"
            >
              Regularise a lapsed filing
            </Link>
            <Link to="/tax-compliance" className="btn-outline justify-center">
              Review compliance calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE PDF CTA ───────────────────────────────────────────────── */}
      <section className="container-x pb-8">
        <CompliancePDFCta variant="default" />
      </section>

      {/* ── FINAL CTA — brand gradient spotlight ─────────────────────────────── */}
      <section className="container-x pt-8 pb-14">
        <div
          className="rounded-sm p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 justify-between overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #E8522B 0%, #C14410 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white opacity-[0.07]" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white opacity-[0.04]" />
          </div>
          <div className="max-w-2xl relative z-10">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-white/70">
              New engagement · Manager assigned same day
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight text-white">
              Send the details. Fixed-fee quote within 15 minutes.
            </h3>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto relative z-10">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white px-6 py-3.5 font-semibold transition-colors hover:bg-[#FFF1EB] rounded-sm justify-center shadow-lg"
              style={{ color: "#C14410" }}
              data-testid="footer-primary-cta"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <a href="tel:+919999999999" className="mono text-sm text-white/70 text-center">
              or call +91 99999 99999
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
