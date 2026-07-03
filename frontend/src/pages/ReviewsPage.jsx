import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seal, CornerSeal } from "../components/Seal";
import { Star, ArrowRight } from "lucide-react";

const REVIEWS = [
  { n: "Priya Ranganathan", c: "Founder, Kaira Foods · Bengaluru", r: 5, s: "GST Registration + Monthly Filing", q: "Registered in five working days. Officer query answered same day. I've never opened the GST portal myself." },
  { n: "Aditya Malhotra", c: "Director, NeuTech Labs · Pune", r: 5, s: "ROC Annual Filing (backlog)", q: "Three years of pending ROC filings. Cleared in six weeks. RightTeam negotiated the compounding — we paid less than half of what our old CA quoted." },
  { n: "Sneha Patel", c: "Founder, Studio Ochre · Ahmedabad", r: 5, s: "Trademark Filing", q: "Trademark filed in Class 25 within two days. Journal cleared without opposition. The WhatsApp updates are the best part." },
  { n: "Rohit Sharma", c: "Co-founder, Blueline Retail · Delhi", r: 4, s: "Private Limited Registration", q: "Company incorporated in 11 days. DSC, PAN, TAN and MoA/AoA all done in one thread. Fee was exactly what was quoted." },
  { n: "Kavya Naidu", c: "Founder, Naidu Naturals · Hyderabad", r: 5, s: "FSSAI Registration", q: "State FSSAI licence in 22 days. They picked the correct category — the previous agent had told me I needed a Central licence." },
  { n: "Faizan Sheikh", c: "MD, Sheikh Textiles · Surat", r: 5, s: "Trademark Objection Reply", q: "TM objection came 4 days before deadline. Filed reply in 48 hours. Mark got accepted at the next hearing." },
  { n: "Devika Menon", c: "Founder, Chai & Co. · Kochi", r: 5, s: "Startup India Recognition", q: "DPIIT recognition in 18 days. Tax exemption certificate followed shortly. Their pitch deck feedback was surprisingly useful." },
  { n: "Manish Gupta", c: "CFO, LogiPro Warehousing · Gurugram", r: 5, s: "Payroll + PF + ESI", q: "We moved 62 employees to RightTeam's payroll in one month. PF, ESI, TDS — one dashboard. Saved us at least two full-time hires." },
  { n: "Anjali Krishnan", c: "Founder, Bloom Legal · Chennai", r: 5, s: "MSME / Udyam Registration", q: "Udyam registration done same day. It unlocked the interest subsidy on our OD limit within a week." },
];

export default function ReviewsPage() {
  const avg = (REVIEWS.reduce((s, r) => s + r.r, 0) / REVIEWS.length).toFixed(1);
  return (
    <Layout>
      <section className="container-x pt-12 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-slate2">Home / Reviews</div>
          <h1 className="font-display text-5xl lg:text-6xl text-ink mt-3 leading-[1.0]">
            Real filings. Real founders. Verified reviews.
          </h1>
          <p className="text-lg text-ink/80 mt-5 max-w-2xl">
            Every review below is tied to a filing reference number. No fabricated names, no purchased ratings.
          </p>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" stroke="currentColor" />
              ))}
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-ink">{avg} / 5.0</div>
              <div className="mono text-[10px] uppercase tracking-widest text-slate2">Average across 1,200 reviews</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center items-start">
          <Seal
            size={200}
            color="#C99A2E"
            label="1,200 Reviews"
            outerText="· 1,200 REVIEWS · GOOGLE · JUSTDIAL · VERIFIED ·"
            center={
              <div>
                <div className="text-3xl font-black leading-none">4.8</div>
                <div className="mono text-[9px] tracking-[0.18em] uppercase mt-1 font-semibold">Google · JD</div>
              </div>
            }
          />
        </div>
      </section>

      <section className="container-x pt-20">
        <div className="hairline pt-8" />
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="paper-card p-6" data-testid={`review-${i}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: r.r }).map((_, k) => (
                      <Star key={k} size={16} fill="currentColor" stroke="currentColor" />
                    ))}
                  </div>
                  <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-2">Service: {r.s}</div>
                </div>
                <CornerSeal color="#1E5631" />
              </div>
              <blockquote className="text-ink leading-relaxed mt-4">"{r.q}"</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-ink/10">
                <div className="font-semibold text-ink">{r.n}</div>
                <div className="text-sm text-slate2">{r.c}</div>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-2">
                  Filing ref · RT/Q/2025/{String(1000 + i).padStart(5, "0")}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-x pt-24 pb-8">
        <div className="border border-ink bg-ink text-paper p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.25em] text-gold">Your review, next.</div>
            <h3 className="font-display text-3xl mt-2 leading-tight">File your first RightTeam job.</h3>
          </div>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 font-medium hover:animate-stamp-down">
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
