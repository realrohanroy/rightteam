import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FilingTabs } from "../components/FilingTabs";
import { ServiceCard } from "../components/ServiceCard";
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
        <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
          Home / <span className="text-ink">Pillar {String(idx + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-6">
          <FilingTabs activeSlug={slug} />
          <div className="bg-white border border-t-0 border-ink/70 p-8 sm:p-12">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <div className={`mono text-[11px] uppercase tracking-[0.25em] font-semibold flex items-center gap-2 ${loss ? "text-seal" : "text-approve"}`}>
                  {loss ? <AlertOctagon size={14} /> : <Sparkles size={14} />}
                  {loss ? "Loss-framed pillar · Deadline sensitive" : "Growth-framed pillar · Build for the long run"}
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mt-3 leading-[0.98]">
                  {pillar.label}
                </h1>
                <p className="text-lg text-ink/80 mt-4 max-w-2xl">{pillar.tagline}</p>
                <p className="text-ink/70 mt-4 max-w-2xl leading-relaxed">{pillar.intro}</p>
              </div>
              <div className="md:col-span-4">
                <div className="paper-card p-5">
                  <div className="mono text-[11px] uppercase tracking-widest text-slate2">
                    Folder · {String(idx + 1).padStart(2, "0")} of {PILLARS.length}
                  </div>
                  <div className="font-display text-2xl text-ink mt-2 leading-tight">
                    {services.length} services in this folder
                  </div>
                  <Link to="/quote" className="btn-primary w-full justify-center mt-4" data-testid="pillar-cta">
                    Get a quote
                  </Link>
                  <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-3 text-center">
                    Fixed fee · No hidden charges
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pt-16">
        <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
          Services in this folder
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3">All {pillar.label} services</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="container-x pt-24 pb-8">
        <div className="hairline pt-8" />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">
              Next folder
            </div>
            <h3 className="font-display text-3xl text-ink mt-2">
              {PILLARS[(idx + 1) % PILLARS.length].label}
            </h3>
          </div>
          <div className="flex md:justify-end">
            <Link
              to={`/${PILLARS[(idx + 1) % PILLARS.length].slug}`}
              className="btn-outline"
            >
              Open next folder →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
