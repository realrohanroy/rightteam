import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { CredentialRow } from "../components/Seal";
import { TeamGrid } from "../components/TeamGrid";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { ArrowRight, Check } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container-x pt-10">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Home / About the practice</div>
        <div className="mt-4 max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.05]">
            A statutory compliance practice run by chartered accountants and company secretaries.
          </h1>
          <p className="text-base sm:text-lg text-ink/75 mt-5 leading-relaxed max-w-3xl">
            RightTeam Consultancy Pvt. Ltd. was incorporated in Mumbai in 2019 and now services 8,400+ Indian businesses across 24 states. The firm is registered with ICAI as a member firm and maintains active practising registrations across ICSI and the Bar Council of Maharashtra.
          </p>

          <div className="mt-6">
            <CredentialRow
              items={[
                { label: "ICAI Member Firm" },
                { label: "ICSI Registered Practice" },
                { label: "GST Practitioner GSTP/27/00429", color: "#8A6D1F" },
                { label: "IPO Registered Patent Agent" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-x pt-16">
        <div className="hairline pt-8" />
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "8,400+", l: "Businesses on retainer" },
            { n: "41,000+", l: "Statutory filings completed" },
            { n: "24", l: "States and Union Territories" },
            { n: "0", l: "Fee-refund penalty misses to date" },
          ].map((s, i) => (
            <div key={i} className="border-l-2 border-gold pl-5 py-1">
              <div className="font-display text-3xl font-bold text-ink leading-none">{s.n}</div>
              <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Principles of practice</div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Statutory work is boring by design. It should also be predictable.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-5">
          {[
            { t: "Fixed-fee engagements.", b: "The quote issued at engagement is the fee billed at completion. Hourly billing is not offered." },
            { t: "Named accountability.", b: "Every engagement is assigned to a named manager whose ICAI or ICSI membership number appears on the engagement letter." },
            { t: "Missed-deadline refund.", b: "If a statutory return is filed late due to the firm, the professional fee for that return is refunded in full." },
            { t: "Documented review.", b: "Every return is reviewed with the client before submission. Draft, approval and filing are all logged in the client dashboard." },
          ].map((v, i) => (
            <div key={i} className="border-t border-ink/10 pt-5 flex gap-4">
              <div className="w-6 h-6 border border-approve bg-approve text-white flex items-center justify-center shrink-0 rounded-sm">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="font-semibold text-ink">{v.t}</div>
                <p className="text-slate2 text-sm mt-1">{v.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TeamGrid />

      <section className="container-x pt-16">
        <CompliancePDFCta />
      </section>

      <section className="container-x pt-14 pb-6">
        <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between rounded-sm">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-gold">Engage the practice</div>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight">Request a fixed-fee quote.</h3>
          </div>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 font-medium hover:animate-stamp-down rounded-sm">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
