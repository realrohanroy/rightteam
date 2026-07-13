import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { Checklist, NeedsList } from "../components/Checklist";
import { PenaltyCallout } from "../components/PenaltyCallout";
import { Seal, CornerSeal } from "../components/Seal";
import { findService, findPillar, servicesByPillar } from "../data/services";
import { ArrowRight, Check, Phone, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import NotFoundPage from "./NotFoundPage";
import { DocStateTransition } from "../components/DocStateTransition";

export default function ServicePage() {
  const { slug } = useParams();
  const service = findService(slug);
  if (!service) return <NotFoundPage />;

  const pillar = findPillar(service.pillar);
  const related = servicesByPillar(service.pillar).filter((s) => s.slug !== slug).slice(0, 3);
  const isLoss = service.framing === "loss";

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="container-x pt-8">
        <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
          <Link to="/" className="hover:text-ink">Home</Link> /
          <Link to={`/${pillar.slug}`} className="hover:text-ink"> {pillar.label}</Link> /
          <span className="text-ink"> {service.name}</span>
        </div>
      </section>

      {/* Hero + sidebar quote */}
      <section className="container-x pt-6 pb-8 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <div className={`mono text-[11px] uppercase tracking-[0.25em] font-semibold flex items-center gap-2 ${isLoss ? "text-seal" : "text-approve"}`}>
            RT/SVC/{service.slug.toUpperCase()}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mt-3 leading-[1.05]">
            {service.name}
          </h1>
          <p className="text-base sm:text-lg text-ink/75 mt-4 leading-relaxed prose-narrow">
            {service.heroSummary}
          </p>

          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">
                  Starting at
                </div>
                <div className="font-display text-4xl text-ink font-black leading-none mt-1">
                  {service.startingPrice}
                </div>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">
                  Fixed fee · Government fees included
                </div>
              </div>
              <div className="h-14 w-px bg-ink/20 hidden sm:block" />
              <div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Turnaround</div>
                <div className="font-semibold text-ink text-lg">7–14 working days</div>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">Government processing dependent</div>
              </div>
            </div>
            
            <div className="md:ml-auto">
              <DocStateTransition />
            </div>
          </div>

          {/* Details — collapsed by default for lighter first scroll */}
          <Accordion.Root type="multiple" className="mt-10 space-y-3">
            <Accordion.Item value="needs" className="border border-ink/15 bg-white">
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
                  <h3 className="font-display text-xl text-ink">What you need to send us</h3>
                  <ChevronDown size={18} className="text-ink transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-6">
                <NeedsList items={service.whatYouNeed} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>

          {isLoss && service.penalty && (
            <div className="mt-8">
              <PenaltyCallout
                title="Miss this deadline and it costs you real money"
                body={service.penalty}
                reference={`Section reference: RT/PEN/${service.slug.toUpperCase()}`}
              />
            </div>
          )}
        </div>

        {/* Sticky sidebar quote widget */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <SidebarQuote service={service} />
        </aside>
      </section>

      {/* Filing tabs contextual */}
      <section className="container-x py-20">
        <FilingTabs activeSlug={service.pillar} />
        <div className="bg-white border border-t-0 border-ink/70 p-8 sm:p-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
              Process
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
              How we file {service.name}.
            </h2>

            <div className="mt-6 flex items-center gap-3 border border-ink/15 bg-alt p-4">
              <div className="w-10 h-10 rounded-full bg-approve/10 flex items-center justify-center text-approve">
                <Check size={20} strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Dedicated {service.name.split(" ").slice(0, 2).join(" ")} Manager</div>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-0.5">One WhatsApp thread · No hand-offs</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Checklist items={service.process} active={-1} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs?.length > 0 && (
        <section className="container-x pb-16">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
            Frequently asked
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2">
            Questions we answer daily.
          </h2>

          <div className="mt-8 border border-ink/15 bg-white divide-y divide-ink/10">
            {service.faqs.map((f, i) => (
              <FAQItem key={i} idx={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-20">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
            Related filings in {pillar.label}
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/service/${r.slug}`}
                className="paper-card p-5 group"
                data-testid={`related-${r.slug}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mono text-[11px] uppercase tracking-widest text-slate2">Also in {pillar.label}</div>
                    <div className="font-display text-lg text-ink mt-2 leading-tight">{r.name}</div>
                  </div>
                  <CornerSeal />
                </div>
                <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate2 mono text-[10px] uppercase tracking-widest">From</span>{" "}
                    <span className="font-display font-bold text-ink">{r.startingPrice}</span>
                  </div>
                  <ArrowRight size={16} className="text-ink group-hover:text-seal transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="container-x pb-6">
        <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between rounded-sm">
          <div className="text-center md:text-left">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">
              Engagement letter issued same day
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight max-w-xl">
              Request a fixed-fee quote for {service.name}.
            </h3>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Link
              to={`/quote?service=${service.slug}`}
              className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 font-medium hover:animate-stamp-down justify-center rounded-sm"
              data-testid="service-final-cta"
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <a href="tel:+919999999999" className="mono text-sm text-white/70 text-center inline-flex items-center gap-1 justify-center">
              <Phone size={12} /> or +91 99999 99999
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="p-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-6 group focus-visible:outline-none"
        data-testid={`faq-${idx}`}
      >
        <div className="flex items-start gap-4">
          <span className="mono text-[11px] uppercase tracking-widest text-slate2 pt-1 group-hover:text-brand transition-colors group-focus:text-brand">
            Q.{String(idx + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-ink group-hover:text-brand transition-colors group-focus:text-brand">{q}</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-ink shrink-0 transition-transform group-hover:text-brand group-focus:text-brand ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="text-slate2 text-sm mt-3 pl-16 leading-relaxed prose-narrow">{a}</p>}
    </div>
  );
};

const SidebarQuote = ({ service }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="paper-card p-6" data-testid="sidebar-quote">
      <div className="flex items-center justify-between">
        <div className="mono text-[11px] uppercase tracking-widest text-slate2">
          Quote form · {service.name.split(" ").slice(0, 3).join(" ")}
        </div>
        <div className="mono text-[11px] uppercase tracking-widest text-approve">Step {step + 1}/2</div>
      </div>

      <div className="mt-3 flex gap-1">
        <div className={`h-1 flex-1 ${step >= 0 ? "bg-ink" : "bg-ink/15"}`} />
        <div className={`h-1 flex-1 ${step >= 1 ? "bg-ink" : "bg-ink/15"}`} />
      </div>

      {step === 0 && (
        <div className="mt-5">
          <label className="mono text-[11px] uppercase tracking-widest text-slate2">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="sidebar-name"
            className="w-full bg-white border border-ink/25 px-3 py-2.5 mt-1 focus:outline-none focus:border-ink"
            placeholder="Full name"
          />
          <label className="mono text-[11px] uppercase tracking-widest text-slate2 block mt-4">Phone / WhatsApp</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-testid="sidebar-phone"
            className="w-full bg-white border border-ink/25 px-3 py-2.5 mt-1 focus:outline-none focus:border-ink"
            placeholder="+91"
          />
          <button
            onClick={() => setStep(1)}
            disabled={!name || phone.length < 10}
            className="btn-primary w-full justify-center mt-4 disabled:opacity-40"
            data-testid="sidebar-continue"
          >
            Continue <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-5">
          <div className="border border-approve/40 bg-approve/[0.08] p-4">
            <div className="mono text-[11px] uppercase tracking-widest text-approve font-semibold">
              Almost there
            </div>
            <p className="text-sm text-ink mt-1">
              Your manager will call {name} on {phone} within 15 minutes with the fixed quote and next steps.
            </p>
          </div>
          <Link
            to={`/quote?service=${service.slug}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`}
            className="btn-primary w-full justify-center mt-4"
            data-testid="sidebar-open-full"
          >
            Complete the quote form
          </Link>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-ink/10 space-y-2">
        <div className="flex items-center gap-2 text-xs text-approve">
          <Check size={14} strokeWidth={3} />
          <span className="mono uppercase tracking-widest">Trusted by 8,400+ businesses</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-approve">
          <Check size={14} strokeWidth={3} />
          <span className="mono uppercase tracking-widest">4.8 / 5 on Google · 1,200 reviews</span>
        </div>
      </div>
    </div>
  );
};
