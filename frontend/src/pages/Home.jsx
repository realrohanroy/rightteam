import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { CredentialRow } from "../components/Seal";
import { TrustStrip } from "../components/TrustStrip";
import { ServiceCard } from "../components/ServiceCard";
import { RiskCalculator } from "../components/RiskCalculator";
import { TeamGrid } from "../components/TeamGrid";
import { ComparisonTable } from "../components/ComparisonTable";
import { CaseStudies } from "../components/CaseStudies";
import { LogoWall } from "../components/LogoWall";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { QuickNavChips } from "../components/QuickNavChips";
import { CredibilityBar } from "../components/CredibilityBar";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { SegmentedLogoWall } from "../components/SegmentedLogoWall";
import { ResourceCards } from "../components/ResourceCards";
import { FounderDeskIllustration, HowItWorksIllustration, CalculatorIllustration } from "../components/HeroIllustration";
import { PILLARS, SERVICES } from "../data/services";
import { ArrowRight, Check } from "lucide-react";

// ─── Hero Quote Widget (kept in hero as primary conversion mechanic) ──────────
const HeroQuoteWidget = () => {
  const [service, setService] = React.useState("");
  return (
    <div className="paper-card p-6" data-testid="hero-quote-widget">
      <div className="flex items-center justify-between">
        <div className="mono text-[11px] uppercase tracking-[0.2em] text-slate2">
          Instant micro-quote
        </div>
        <div className="mono text-[11px] uppercase tracking-widest text-approve">
          Step 1 of 3
        </div>
      </div>
      <h3 className="font-display text-xl text-ink mt-2 leading-tight">
        Which filing do you need?
      </h3>
      <div className="mt-4 relative">
        <select
          className="w-full appearance-none bg-white border border-ink/25 px-4 py-3 text-ink focus:outline-none focus:border-ink rounded-sm"
          value={service}
          onChange={(e) => setService(e.target.value)}
          data-testid="hero-service-select"
        >
          <option value="">Select a service…</option>
          {PILLARS.map((p) => (
            <optgroup key={p.slug} label={p.label}>
              {SERVICES.filter((s) => s.pillar === p.slug).map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <Link
        to={service ? `/quote?service=${service}` : "/quote"}
        className="btn-primary w-full justify-center mt-4"
        data-testid="hero-quote-continue"
      >
        Get started <ArrowRight size={16} />
      </Link>
      <div className="mt-4 pt-4 border-t border-ink/10 flex flex-wrap items-center gap-4 mono text-[11px] uppercase tracking-widest text-slate2">
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> Fixed fee
        </span>
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> Dedicated manager
        </span>
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> Refund guarantee
        </span>
      </div>
    </div>
  );
};

// ─── Pillar tabs preview (unchanged logic) ────────────────────────────────────
const PillarTabsPreview = () => {
  const pillar = PILLARS[0];
  const services = SERVICES.filter((s) => s.pillar === pillar.slug).slice(0, 3);
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="font-display text-xl text-ink leading-tight">{pillar.label}</div>
        <p className="text-sm text-slate2 mt-2 leading-relaxed">{pillar.intro}</p>
        <Link
          to={`/${pillar.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-gold decoration-2"
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
  return (
    <Layout>

      {/* ── HERO — white bg ─────────────────────────────────────────────────── */}
      <section className="bg-white" data-testid="hero-section">
        <div className="container-x pt-12 pb-14 grid lg:grid-cols-12 gap-10 items-start">

          {/* Left: headline + CTA */}
          <div className="lg:col-span-7">
            {/* Overline */}
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2 flex items-center gap-3">
              <span className="w-8 h-px bg-ink/40" />
              RightTeam Consultancy Pvt. Ltd. · CIN [TO BE CONFIRMED]
            </div>

            {/* New headline — warm, direct, ≤8 words */}
            <h1 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] leading-[1.05] mt-4 text-ink">
              We handle the paperwork.{" "}
              <span className="text-gold">You run the business.</span>
            </h1>

            {/* Subhead — specific, not stiff */}
            <p className="text-lg text-ink/75 mt-5 max-w-xl leading-relaxed">
              8,400 Indian businesses. One dedicated manager each. Filed by the
              due date, or the fee is refunded.
            </p>

            {/* CTA — short label, supporting microcopy below */}
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Link
                to="/quote"
                className="btn-primary text-base px-6 py-3.5"
                data-testid="hero-primary-cta"
              >
                Get started <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn-outline text-base px-6 py-3.5"
                data-testid="hero-secondary-cta"
              >
                Meet the practice
              </Link>
            </div>

            {/* Credentials — moved below CTA as proof, not opener */}
            <div className="mt-6">
              <CredentialRow
                items={[
                  { label: "ICAI Member Firm" },
                  { label: "ICSI Registered" },
                  { label: "GST Practitioner", color: "#8A6D1F" },
                  { label: "IPO Registered Patent Agent" },
                ]}
              />
            </div>
          </div>

          {/* Right: quote widget — kept in hero as primary conversion mechanic */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <HeroQuoteWidget />
          </div>
        </div>

        {/* Illustration band — directly below hero content, above quick-nav */}
        <div className="border-t border-ink/10 section-warm py-8 overflow-hidden">
          <div className="container-x flex justify-center">
            <FounderDeskIllustration width={520} className="max-w-full" />
          </div>
        </div>
      </section>

      {/* ── QUICK-NAV CHIPS — warm bg ────────────────────────────────────────── */}
      <QuickNavChips />

      {/* ── TRUST STRIP — white ─────────────────────────────────────────────── */}
      <TrustStrip />

      {/* ── CREDIBILITY BAR — white ─────────────────────────────────────────── */}
      <CredibilityBar />

      {/* ── COMPLIANCE CALCULATOR — navy bg ─────────────────────────────────── */}
      <section className="section-navy py-20 border-y border-white/10" data-testid="calculator-wrapper">
        <div className="container-x mb-10 flex items-center gap-6">
          <CalculatorIllustration size={80} className="shrink-0 opacity-90" />
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-gold">
              Compliance exposure · Interactive
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
              See every filing your entity owes this year.
            </h2>
          </div>
        </div>
        {/* RiskCalculator rendered inverted — override inner bg */}
        <div className="[&_.container-x]:!pt-0">
          <RiskCalculator inverted />
        </div>
      </section>

      {/* ── PRACTICE AREAS / FILING TABS — white ────────────────────────────── */}
      <section className="bg-white container-x pt-20">
        <div className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Practice areas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Five practice areas. Thirty regulated filings.
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl">
            Each practice area covers a body of statutory work with its own
            registrations, due dates and penalties. Select one to explore the
            services inside.
          </p>
        </div>

        <div className="mt-8">
          <FilingTabs activeSlug={PILLARS[0].slug} />
          <div className="bg-white border border-t-0 border-ink/60 p-6 sm:p-8 rounded-b-sm">
            <PillarTabsPreview />
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE — alt bg ────────────────────────────────────────── */}
      <ComparisonTable />

      {/* ── TEAM — white ────────────────────────────────────────────────────── */}
      <TeamGrid />

      {/* ── POPULAR SERVICES — warm bg ──────────────────────────────────────── */}
      <section className="section-warm border-y border-ink/10 py-20 mt-20">
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
              className="link-coral text-sm"
            >
              View full catalog →
            </Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* ── CASE STUDIES — white ────────────────────────────────────────────── */}
      <CaseStudies />

      {/* ── TESTIMONIALS — navy bg (renders null until real content added) ──── */}
      <TestimonialsSection />

      {/* ── PROCESS / HOW IT WORKS — warm bg ────────────────────────────────── */}
      <section className="section-warm border-y border-ink/10 py-20 mt-20">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: illustration + copy */}
          <div className="lg:col-span-5">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
              Engagement workflow
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
              One manager. Four documented stages.
            </h2>
            <p className="text-ink/70 mt-3">
              Every engagement follows the same checklist. Your dedicated
              manager owns the workflow end-to-end — you approve, we file.
            </p>
            <div className="mt-8">
              <HowItWorksIllustration width={380} className="max-w-full" />
            </div>
          </div>

          {/* Right: step list */}
          <div className="lg:col-span-7">
            <div className="border border-ink/15 bg-white rounded-sm">
              {[
                {
                  title: "Scope confirmed",
                  body: "Service defined, fixed-fee quote issued and engagement letter signed.",
                },
                {
                  title: "Manager assigned",
                  body: "Specialist (CA / CS / IP attorney) allocated. Single WhatsApp thread opened.",
                },
                {
                  title: "Prepared and reviewed",
                  body: "Forms drafted, documents collected, filing reviewed with you before submission.",
                },
                {
                  title: "Filed and acknowledged",
                  body: "Return filed with the authority. Acknowledgement, challan and certificate delivered on the same day.",
                },
              ].map((step, i, arr) => (
                <div
                  key={i}
                  className={`flex gap-5 py-5 px-6 ${
                    i !== arr.length - 1 ? "border-b border-ink/10" : ""
                  }`}
                >
                  <div className="mono text-[11px] uppercase tracking-widest text-slate2 w-12 shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-6 h-6 border border-approve bg-approve text-white flex items-center justify-center shrink-0 rounded-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-semibold text-ink">{step.title}</div>
                    <div className="text-sm text-slate2 mt-1">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEGMENTED LOGO WALL — alt bg (hidden until real logos provided) ──── */}
      <SegmentedLogoWall />

      {/* ── RESOURCE CARDS — white ──────────────────────────────────────────── */}
      <ResourceCards />

      {/* ── PENALTY CALLOUT — seal red tint ─────────────────────────────────── */}
      <section className="container-x pt-20">
        <div className="border-l-4 border-seal bg-seal/[0.04] p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center border border-seal/25">
          <div className="md:col-span-2">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-seal font-semibold">
              Penalty exposure notice
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink mt-2 leading-tight">
              An unfiled GST return today compounds to a five-figure penalty
              inside a quarter.
            </h3>
            <p className="text-ink/75 mt-3 max-w-2xl text-sm sm:text-base">
              GST late fee: ₹50 per day. TDS late return: ₹200 per day. ROC
              AOC-4 delay: ₹100 per day per form, with no upper cap. Interest
              accrues in parallel at 12–18% per annum.
            </p>
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
      <section className="container-x pt-4">
        <CompliancePDFCta variant="default" />
      </section>

      {/* ── FINAL CTA — coral gradient spotlight ─────────────────────────────── */}
      <section className="container-x pt-14 pb-14">
        <div
          className="rounded-sm p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 justify-between overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #E8632A 0%, #C1450E 100%)" }}
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
            <p className="text-white/80 mt-2 text-sm sm:text-base">
              Fixed fee. Dedicated manager. Filed by due date or fee refunded.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto relative z-10">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white px-6 py-3.5 font-semibold transition-colors hover:bg-[#FFF1EB] rounded-sm justify-center shadow-lg"
              style={{ color: "#C1450E" }}
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
