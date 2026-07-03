import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seal } from "../components/Seal";
import { ArrowRight, Check } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container-x pt-12 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">Home / About</div>
          <h1 className="font-display text-5xl lg:text-6xl text-ink mt-3 leading-[1.0]">
            We file the paperwork so founders can build the business.
          </h1>
          <p className="text-lg text-ink/80 mt-6 max-w-2xl leading-relaxed">
            RightTeam was started in 2019 by a chartered accountant, a company secretary and a former founder who spent 400 hours of his last startup on compliance instead of customers. Since then we've filed 41,000+ returns and registrations for 8,400+ Indian businesses.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-center">
          <Seal
            size={200}
            color="#12203D"
            label="Since 2019"
            outerText="· INCORPORATED 2019 · CIN U74999MH2019PTC · MUMBAI ·"
            center={
              <div>
                <div className="text-3xl font-black leading-none">2019</div>
                <div className="mono text-[9px] tracking-[0.18em] uppercase mt-1 font-semibold">Est.</div>
              </div>
            }
          />
        </div>
      </section>

      <section className="container-x pt-20">
        <div className="hairline pt-8" />
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "8,400+", l: "Businesses served" },
            { n: "41,000+", l: "Filings completed" },
            { n: "24", l: "States and UTs" },
            { n: "4.8 / 5", l: "Google rating" },
          ].map((s, i) => (
            <div key={i} className="border-l-2 border-gold pl-5 py-2">
              <div className="font-display text-4xl font-black text-ink leading-none">{s.n}</div>
              <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">Section 02 · What we believe</div>
          <h2 className="font-display text-4xl text-ink mt-3 leading-tight">
            Compliance is boring. That's why it should be predictable.
          </h2>
        </div>
        <div className="space-y-6">
          {[
            { t: "Fixed fees, always.", b: "You should know the total cost before you send us anything. No hourly billing games." },
            { t: "One manager, one thread.", b: "You get one dedicated person and one WhatsApp thread. No hand-offs, no repeating yourself." },
            { t: "Miss a deadline, we refund.", b: "If we miss a filing due date because of us, you don't pay. Simple." },
            { t: "Explain before you file.", b: "Every draft is reviewed with you before it goes to the government. No surprises after filing." },
          ].map((v, i) => (
            <div key={i} className="border-t border-ink/15 pt-5 flex gap-4">
              <div className="w-6 h-6 border border-approve bg-approve text-paper flex items-center justify-center shrink-0">
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

      <section className="container-x pt-24">
        <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">Section 03 · The team</div>
        <h2 className="font-display text-4xl text-ink mt-3">Who actually files your paperwork.</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { n: "Rakesh Iyer, FCA", r: "Head of Tax & Compliance", y: "18 years · Big 4 alumnus" },
            { n: "Nishtha Bansal, CS", r: "Head of Corporate Filings", y: "12 years · MCA specialist" },
            { n: "Adv. Vishal Rao", r: "Head of IP Practice", y: "10 years · Registered patent agent" },
            { n: "Meera Kulkarni", r: "Head of Client Managers", y: "8 years · Serviced 2,000+ SMEs" },
            { n: "Karan Deshmukh", r: "Founder & CEO", y: "Ex-founder · 2x compliance survivor" },
            { n: "Anisha Rao", r: "Head of Growth Services", y: "Certifications, MSME, FSSAI, ISO" },
          ].map((p, i) => (
            <div key={i} className="paper-card p-6" data-testid={`team-${i}`}>
              <div className="mono text-[11px] uppercase tracking-widest text-slate2">{p.r}</div>
              <div className="font-display text-xl text-ink mt-2">{p.n}</div>
              <div className="text-sm text-slate2 mt-2">{p.y}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-24 pb-8">
        <div className="border border-ink bg-ink text-paper p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-gold">Ready to file?</div>
            <h3 className="font-display text-3xl mt-2 leading-tight">Let a manager take it from here.</h3>
          </div>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 font-medium hover:animate-stamp-down">
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
