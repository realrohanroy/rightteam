import React from "react";
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
import { PILLARS, SERVICES } from "../data/services";
import { ArrowRight, Check } from "lucide-react";

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
        Continue <ArrowRight size={16} />
      </Link>
      <div className="mt-4 pt-4 border-t border-ink/10 flex items-center gap-4 mono text-[11px] uppercase tracking-widest text-slate2">
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> No hidden fees
        </span>
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> Reply within 15 min
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="container-x pt-12 pb-14 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2 flex items-center gap-3">
            <span className="w-8 h-px bg-ink/40" />
            RightTeam Consultancy Pvt. Ltd. · CIN U74999MH2019PTC000000
          </div>
          <h1 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] leading-[1.05] mt-4 text-ink">
            Compliance handled by chartered accountants and company secretaries.
          </h1>
          <p className="text-lg text-ink/75 mt-5 max-w-xl leading-relaxed">
            8,400 Indian businesses. 41,000+ filings on record. One dedicated manager per engagement. Filed within statutory due dates or the fee is refunded.
          </p>

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

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link to="/quote" className="btn-primary" data-testid="hero-primary-cta">
              Request a fixed-fee quote <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline" data-testid="hero-secondary-cta">
              Meet the practice
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <HeroQuoteWidget />
        </div>
      </section>

      <TrustStrip />

      {/* Risk calculator */}
      <RiskCalculator />

      {/* Pillars via filing tabs */}
      <section className="container-x pt-20">
        <div className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Practice areas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Five practice areas. Thirty regulated filings.
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl">
            Each folder represents a body of statutory work with its own registrations, due dates and penalties. Select a folder to review the services under it.
          </p>
        </div>

        <div className="mt-8">
          <FilingTabs activeSlug={PILLARS[0].slug} />
          <div className="bg-white border border-t-0 border-ink/60 p-6 sm:p-8 rounded-b-sm">
            <PillarTabsPreview />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <ComparisonTable />

      {/* Team */}
      <TeamGrid />

      {/* Popular services */}
      <section className="container-x pt-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
              Most-requested services
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
              Filings we complete most often.
            </h2>
          </div>
          <Link to="/quote" className="text-sm underline underline-offset-4 decoration-gold decoration-2 text-ink">
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
      </section>

      {/* Case studies */}
      <CaseStudies />

      {/* Loss framing block */}
      <section className="container-x pt-20">
        <div className="border-l-4 border-seal bg-seal/[0.04] p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center border border-seal/25">
          <div className="md:col-span-2">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-seal font-semibold">
              Penalty exposure notice
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink mt-2 leading-tight">
              An unfiled GST return today compounds to a five-figure penalty inside a quarter.
            </h3>
            <p className="text-ink/75 mt-3 max-w-2xl text-sm sm:text-base">
              GST late fee: ₹50 per day. TDS late return: ₹200 per day. ROC AOC-4 delay: ₹100 per day per form, with no upper cap. Interest accrues in parallel at 12–18% per annum.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/quote" className="btn-urgent justify-center" data-testid="urgent-cta">
              Regularise a lapsed filing
            </Link>
            <Link to="/tax-compliance" className="btn-outline justify-center">
              Review compliance calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Process — restrained */}
      <section className="container-x pt-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
            Engagement workflow
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            A single manager, four documented stages.
          </h2>
          <p className="text-ink/70 mt-3">
            Every engagement follows the same checklist. Your dedicated manager owns the workflow end-to-end. You approve, we file.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-ink/15 bg-white rounded-sm">
            {[
              { title: "Scope confirmed", body: "Service defined, fixed-fee quote issued and engagement letter signed." },
              { title: "Manager assigned", body: "Specialist (CA / CS / IP attorney) allocated. Single WhatsApp thread opened." },
              { title: "Prepared and reviewed", body: "Forms drafted, documents collected, filing reviewed with you before submission." },
              { title: "Filed and acknowledged", body: "Return filed with the authority. Acknowledgement, challan and certificate delivered on the same day." },
            ].map((step, i, arr) => (
              <div key={i} className={`flex gap-5 py-5 px-6 ${i !== arr.length - 1 ? "border-b border-ink/10" : ""}`}>
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
      </section>

      {/* Client logo wall */}
      <LogoWall />

      {/* Compliance calendar download */}
      <section className="container-x pt-4">
        <CompliancePDFCta variant="default" />
      </section>

      {/* Final CTA */}
      <section className="container-x pt-14 pb-14">
        <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between rounded-sm">
          <div className="max-w-2xl">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-gold">
              New engagement · Manager assigned same day
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight">
              Send the details. Receive a fixed-fee quote within 15 minutes.
            </h3>
            <p className="text-white/70 mt-2 text-sm sm:text-base">
              Fixed fee. Dedicated manager. Filed by due date or fee refunded.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 font-medium hover:animate-stamp-down rounded-sm justify-center" data-testid="footer-primary-cta">
              Request a Quote <ArrowRight size={16} />
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

const PillarTabsPreview = () => {
  const pillar = PILLARS[0];
  const services = SERVICES.filter((s) => s.pillar === pillar.slug).slice(0, 3);
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="font-display text-xl text-ink leading-tight">{pillar.label}</div>
        <p className="text-sm text-slate2 mt-2 leading-relaxed">{pillar.intro}</p>
        <Link to={`/${pillar.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-gold decoration-2">
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
