import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/Layout";
import { ComplianceChecklist } from "../components/ComplianceChecklist";
import { ENTITY_TYPES } from "../data/marketing";
import { Calendar } from "lucide-react";
import { CalendarIllustration } from "../components/Illustrations";

export default function ComplianceHubPage() {
  return (
    <Layout>
      <Helmet>
        <title>India Compliance Calendar — Every Filing Due Date by Entity Type</title>
        <meta name="description" content="View the complete statutory filing register for private limited companies, LLPs, and more. Check due dates and penalties for GST, ROC, and Tax filings." />
      </Helmet>

      <section className="section-navy py-28 border-y border-white/10" data-testid="hub-calculator-wrapper">
        <div className="container-x mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand shrink-0 shadow-inner overflow-hidden">
              <CalendarIllustration className="w-[120%] opacity-90" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
                India Compliance Calendar
              </h1>
              <div className="text-white/70 mt-2 text-sm max-w-xl">
                Every statutory filing for tax, MCA, and compliance. Find your exact due dates and penalties below.
              </div>
            </div>
          </div>
        </div>
        <div className="[&_.container-x]:!pt-0">
          <ComplianceChecklist inverted />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2 mb-8">
            Browse by Entity Type
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ENTITY_TYPES.map((et) => (
              <Link
                key={et.key}
                to={`/compliance-calendar/${et.key}`}
                className="block p-6 border border-ink/10 rounded-sm hover:border-ink/30 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-ink text-lg">{et.label}</div>
                <div className="text-sm text-slate2 mt-2">View full compliance calendar &rarr;</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
