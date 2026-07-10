import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { CredentialRow } from "../components/Seal";
import { TeamGrid } from "../components/TeamGrid";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { OnTimeRing } from "../components/OnTimeRing";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container-x pt-10">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Home / About the practice</div>
        <div className="mt-4 max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.05]">
            A statutory compliance practice run by chartered accountants and company secretaries.
          </h1>
          <p className="text-base sm:text-lg text-ink/75 mt-5 leading-relaxed prose-narrow">
            Incorporated in Mumbai in 2019, RightTeam now services 8,400+ businesses across 24 states with in-house CAs, CS and IP attorneys.
          </p>

          <div className="mt-6">
            <CredentialRow
              items={[
                { label: "ICAI Member Firm" },
                { label: "ICSI Registered Practice" },
                { label: "GST Practitioner GSTP/27/00429", color: "#E8522B" },
                { label: "IPO Registered Patent Agent" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="hairline pt-8" />
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "8,400+", l: "Businesses on retainer" },
              { n: "41,000+", l: "Statutory filings completed" },
              { n: "24", l: "States and Union Territories" },
              { n: "0", l: "Fee-refund penalty misses" },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-brand pl-5 py-1">
                <div className="font-display text-3xl font-bold text-ink leading-none">{s.n}</div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-2 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <OnTimeRing percentage={99.8} label="On-time filing rate" />
          </div>
        </div>
      </section>

      <section className="container-x pb-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Principles of practice</div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            Predictable by design.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <Accordion.Root type="multiple" defaultValue={["v-0"]} className="space-y-0 border-t border-ink/10">
            {[
              { t: "Fixed-fee engagements.", b: "The quote issued at engagement is the fee billed at completion. Hourly billing is not offered." },
              { t: "Named accountability.", b: "Every engagement is assigned to a named manager whose ICAI or ICSI membership number appears on the engagement letter." },
              { t: "Missed-deadline refund.", b: "If a statutory return is filed late due to the firm, the professional fee for that return is refunded in full." },
              { t: "Documented review.", b: "Every return is reviewed with the client before submission. Draft, approval and filing are all logged in the client dashboard." },
            ].map((v, i) => (
              <Accordion.Item key={i} value={`v-${i}`} className="border-b border-ink/10">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left group gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border border-approve bg-approve text-white flex items-center justify-center shrink-0 rounded-sm">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-semibold text-ink">{v.t}</span>
                    </div>
                    <ChevronDown size={18} className="text-ink shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-5 pl-14">
                  <p className="text-slate2 text-sm leading-relaxed prose-narrow">{v.b}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <TeamGrid />

      <section className="container-x py-16">
        <CompliancePDFCta />
      </section>

      <section className="container-x pb-6">
        <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between rounded-sm">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand">Engage the practice</div>
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
