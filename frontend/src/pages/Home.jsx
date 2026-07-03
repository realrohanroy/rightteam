import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { Seal } from "../components/Seal";
import { TrustStrip } from "../components/TrustStrip";
import { ServiceCard } from "../components/ServiceCard";
import { PILLARS, SERVICES } from "../data/services";
import { ArrowRight, Check } from "lucide-react";

const HeroQuoteWidget = () => {
  const [service, setService] = React.useState("");
  return (
    <div className="paper-card p-6 sm:p-7" data-testid="hero-quote-widget">
      <div className="flex items-center justify-between">
        <div className="mono text-[11px] uppercase tracking-[0.2em] text-slate2">
          Instant micro-quote · 30 seconds
        </div>
        <div className="mono text-[11px] uppercase tracking-widest text-approve">
          Step 1 of 3
        </div>
      </div>
      <h3 className="font-display text-2xl text-ink mt-3 leading-tight">
        What are you looking to file today?
      </h3>
      <div className="mt-4 relative">
        <select
          className="w-full appearance-none bg-white border border-ink/25 px-4 py-3 text-ink focus:outline-none focus:border-ink"
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
      <div className="mt-4 flex items-center gap-4 mono text-[11px] uppercase tracking-widest text-slate2">
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> No hidden fees
        </span>
        <span className="inline-flex items-center gap-1 text-approve">
          <Check size={12} strokeWidth={3} /> No spam
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="container-x pt-14 pb-16 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-seal font-semibold flex items-center gap-3">
            <span className="w-8 h-px bg-seal" />
            RightTeam · Filing No. RT/WEB/2026/001
          </div>
          <h1 className="font-display text-[3rem] sm:text-[3.75rem] lg:text-[4.5rem] leading-[0.98] mt-4 text-ink">
            File the paperwork.<br />
            <span className="text-gold">Keep the business.</span>
          </h1>
          <p className="text-lg text-ink/80 mt-6 max-w-xl leading-relaxed">
            RightTeam files GST, income tax, ROC, trademarks and registrations for 8,400+ Indian startups and SMEs. One dedicated manager. Every deadline met.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link to="/quote" className="btn-primary" data-testid="hero-primary-cta">
              Start a filing <ArrowRight size={16} />
            </Link>
            <Link to="/tax-compliance" className="btn-outline" data-testid="hero-secondary-cta">
              See compliance calendar
            </Link>
            <span className="mono text-[11px] uppercase tracking-widest text-slate2 ml-2">
              Trusted by 8,400+ businesses
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <HeroQuoteWidget />

          <div className="mt-8 flex flex-wrap gap-6 items-center justify-center">
            <Seal
              size={140}
              color="#C1272D"
              label="8,400 Businesses"
              outerText="· RIGHT TEAM · REGISTERED CONSULTANTS · SINCE 2019 ·"
              center={
                <div>
                  <div className="text-2xl font-black leading-none">8,400+</div>
                  <div className="mono text-[9px] tracking-[0.18em] uppercase mt-1 font-semibold">
                    Businesses Served
                  </div>
                </div>
              }
            />
            <Seal
              size={140}
              color="#12203D"
              label="Filed on time"
              outerText="· FILED BY DUE DATE · GUARANTEED · GUARANTEED ·"
              center={
                <div>
                  <div className="text-2xl font-black leading-none">100%</div>
                  <div className="mono text-[9px] tracking-[0.18em] uppercase mt-1 font-semibold">
                    On-time Filing
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Pillars via filing tabs */}
      <section className="container-x pt-16 pb-4">
        <div className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
            Section 02 · Categories
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-3">
            Five pillars. Thirty-plus filings.
          </h2>
          <p className="text-ink/70 mt-4 max-w-2xl">
            Pick a folder. Each one covers a domain your business will meet — from Day 1 incorporation to Year 10 compliance.
          </p>
        </div>

        <div className="mt-10">
          <FilingTabs activeSlug={PILLARS[0].slug} />
          <div className="bg-white border border-t-0 border-ink/70 p-6 sm:p-8">
            <PillarTabsPreview />
          </div>
        </div>
      </section>

      {/* Loss framing CTA */}
      <section className="container-x pt-20">
        <div className="border-y border-seal/40 bg-seal/[0.05] p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="mono text-[11px] uppercase tracking-[0.2em] text-seal font-semibold">
              Missed a due date this month?
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
              A ₹200 penalty today becomes ₹18,000 by next quarter.
            </h3>
            <p className="text-ink/80 mt-3 max-w-2xl">
              GST late fee: ₹50/day. TDS late return: ₹200/day. ROC AOC-4 delay: ₹100/day per form. RightTeam catches every deadline, so nothing compounds.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/quote" className="btn-urgent justify-center" data-testid="urgent-cta">
              Recover a lapsed filing
            </Link>
            <Link to="/tax-compliance" className="btn-outline justify-center">
              See all compliance deadlines
            </Link>
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="container-x pt-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
              Section 03 · Popular filings
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-3">
              Filed most often this month.
            </h2>
          </div>
          <Link to="/quote" className="text-sm underline underline-offset-4 decoration-gold decoration-2 text-ink">
            View full catalog →
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Process */}
      <section className="container-x pt-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
            Section 04 · How it works
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-3 leading-tight">
            Four steps. One manager. Zero back-and-forth.
          </h2>
          <p className="text-ink/70 mt-4">
            Every filing follows the same clean checklist. Your dedicated manager owns the whole thing end-to-end — you approve, we file.
          </p>

          <div className="mt-8 flex items-center gap-4 border border-ink/15 bg-white p-4">
            <div className="w-12 h-12 rounded-full bg-approve/10 flex items-center justify-center text-approve">
              <Check size={24} strokeWidth={3} />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Dedicated Filing Manager</div>
              <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-1">
                On WhatsApp · Mon-Sat · 10am to 8pm
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-ink/15 bg-white p-6 sm:p-8">
            {[
              { title: "You tell us what to file", body: "Pick a service from the dropdown or WhatsApp us. Get a fixed-fee quote in 15 minutes." },
              { title: "Manager assigned", body: "A specialist (CA / CS / IP attorney) takes over. Everything is on one WhatsApp thread." },
              { title: "We prepare, you approve", body: "Forms drafted, documents collected, filing checked twice. You review before we file." },
              { title: "Filed with the government", body: "Acknowledgement, challan and certificate delivered to your inbox and stored in your dashboard." },
            ].map((step, i, arr) => (
              <div key={i} className={`flex gap-5 py-5 ${i !== arr.length - 1 ? "border-b border-ink/10" : ""}`}>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2 w-12 shrink-0 pt-1">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-6 h-6 border border-approve bg-approve text-paper flex items-center justify-center shrink-0">
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

      {/* Testimonials */}
      <section className="container-x pt-24">
        <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
          Section 05 · Testimonials
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-3 max-w-3xl">
          What founders say once the certificate lands.
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              q: "GST registration in five working days, and my manager handled every officer query. I never spoke to a government portal.",
              n: "Priya Ranganathan",
              c: "Founder, Kaira Foods · Bengaluru",
              ref: "RT/Q/20260112/A2F31",
            },
            {
              q: "We had three years of pending ROC filings. RightTeam sorted the mess, negotiated fees, and got us compliant in six weeks.",
              n: "Aditya Malhotra",
              c: "Director, NeuTech Labs · Pune",
              ref: "RT/Q/20260108/B71K3",
            },
            {
              q: "Trademark filed for one class, journal cleared without opposition. The updates on WhatsApp were the best part.",
              n: "Sneha Patel",
              c: "Founder, Studio Ochre · Ahmedabad",
              ref: "RT/Q/20251230/C09MZ",
            },
          ].map((t, i) => (
            <figure key={i} className="paper-card p-6 flex flex-col" data-testid={`testimonial-${i}`}>
              <div className="text-seal font-display text-4xl leading-none">“</div>
              <blockquote className="text-ink leading-relaxed mt-2 flex-1">{t.q}</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-ink/10">
                <div className="font-semibold text-ink">{t.n}</div>
                <div className="text-sm text-slate2">{t.c}</div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-2">
                  Filing ref · {t.ref}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-x pt-24 pb-16">
        <div className="border border-ink bg-ink text-paper p-10 sm:p-14 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-2xl">
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-gold">
              File today · Filed by Friday
            </div>
            <h3 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
              Send us the details. We'll take it from there.
            </h3>
            <p className="text-paper/70 mt-3">
              Fixed-fee, dedicated manager, no back-and-forth.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link to="/quote" className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 font-medium hover:animate-stamp-down" data-testid="footer-primary-cta">
              Get a Quote <ArrowRight size={16} />
            </Link>
            <a href="tel:+919999999999" className="mono text-sm text-paper/70 text-center">
              or call +91 99999 99999
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Small preview panel of a single pillar under the tabs.
const PillarTabsPreview = () => {
  const pillar = PILLARS[0];
  const services = SERVICES.filter((s) => s.pillar === pillar.slug).slice(0, 3);
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="font-display text-2xl text-ink leading-tight">{pillar.label}</div>
        <p className="text-sm text-slate2 mt-2">{pillar.intro}</p>
        <Link to={`/${pillar.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-4 decoration-gold decoration-2">
          Open folder →
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
