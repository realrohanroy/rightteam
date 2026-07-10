import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { ServiceCard } from "../components/ServiceCard";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { PILLARS, servicesByPillar, findPillar } from "../data/services";
import { AlertOctagon, Sparkles } from "lucide-react";

export default function PillarPage() {
  const { pillar: slug } = useParams();
  const pillar = findPillar(slug);
  if (!pillar) return <Navigate to="/" replace />;

  const services = servicesByPillar(slug);
  const idx = PILLARS.findIndex((p) => p.slug === slug);
  const loss = pillar.framing === "loss";

  return (
    <Layout>
      <section className="container-x pt-10">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          Home / <span className="text-ink">Practice area {String(idx + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-5">
          <FilingTabs activeSlug={slug} />
          <div className="bg-white border border-t-0 border-ink/60 p-8 sm:p-10 rounded-b-sm">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <div className={`mono text-[11px] uppercase tracking-[0.22em] font-semibold flex items-center gap-2 ${loss ? "text-seal" : "text-approve"}`}>
                  {loss ? <AlertOctagon size={14} /> : <Sparkles size={14} />}
                  {loss ? "Statutory returns · Due-date sensitive" : "Registration & certification services"}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mt-3 leading-[1.05]">
                  {pillar.label}
                </h1>
                <p className="text-lg text-ink/80 mt-4 prose-narrow">{pillar.tagline}</p>
              </div>
              <div className="md:col-span-4">
                <div className="paper-card p-5">
                  <div className="mono text-[11px] uppercase tracking-widest text-slate2">
                    Practice area · {String(idx + 1).padStart(2, "0")} of {PILLARS.length}
                  </div>
                  <div className="font-display text-xl text-ink mt-2 leading-tight">
                    {services.length} services under this practice
                  </div>
                  <Link to="/quote" className="btn-primary w-full justify-center mt-4" data-testid="pillar-cta">
                    Request a quote
                  </Link>
                  <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-3 text-center">
                    Fixed fee · Government charges disclosed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
          Services in this practice area
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mt-2">All {pillar.label} services</h2>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Exit CTA — compliance PDF */}
      <section className="container-x pb-8">
        <CompliancePDFCta />
      </section>

      <section className="container-x pb-6">
        <div className="hairline pt-6" />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">
              Next practice area
            </div>
            <h3 className="font-display text-2xl text-ink mt-2">
              {PILLARS[(idx + 1) % PILLARS.length].label}
            </h3>
          </div>
          <div className="flex md:justify-end">
            <Link
              to={`/${PILLARS[(idx + 1) % PILLARS.length].slug}`}
              className="btn-outline"
            >
              Open next practice area →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
