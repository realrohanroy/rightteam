import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "../components/Layout";
import { PILLARS, SERVICES, findService } from "../data/services";
import { ArrowRight, Check, ArrowLeft, ClipboardCheck, AlertOctagon } from "lucide-react";
import { Seal } from "../components/Seal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const STEPS = ["Service", "Business", "Contact", "Filed"];

export default function QuotePage() {
  const [params] = useSearchParams();
  const preService = params.get("service") || "";
  const preName = params.get("name") || "";
  const prePhone = params.get("phone") || "";

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service_slug: preService,
    business_stage: "",
    state: "",
    turnover: "",
    full_name: preName,
    email: "",
    phone: prePhone,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const errs = {};
    if (touched.full_name && !form.full_name.trim()) {
      errs.full_name = "Full name is required";
    }
    if (touched.email) {
      if (!form.email.trim()) {
        errs.email = "Email address is required";
      } else if (!form.email.includes("@") || !form.email.includes(".")) {
        errs.email = "Please enter a valid email address";
      }
    }
    if (touched.phone) {
      if (!form.phone.trim()) {
        errs.phone = "Phone number is required";
      } else if (form.phone.replace(/[^0-9]/g, "").length < 10) {
        errs.phone = "Phone number must be at least 10 digits";
      }
    }
    return errs;
  }, [form, touched]);

  const handleNextStep = () => {
    if (!canNext()) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 450);
  };

  const chosen = useMemo(() => findService(form.service_slug), [form.service_slug]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!form.service_slug;
    if (step === 1) return !!form.business_stage && !!form.state;
    if (step === 2) return !!form.full_name && !!form.email && form.phone.length >= 10;
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = { ...form, service_name: chosen?.name || "" };
      const { data } = await axios.post(`${API}/leads`, payload);
      setResult(data);
      setStep(3);
    } catch (e) {
      setError("Something went wrong. Please try again or WhatsApp us at +91 99999 99999.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="container-x pt-10 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2 font-semibold">
            RT/QUOTE/2026 · Fixed-fee estimate
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mt-3 leading-[1.05]">
            Request a fixed-fee quote in three steps.
          </h1>
          <p className="text-base sm:text-lg text-ink/75 mt-4 max-w-2xl">
            No cost. No obligation. Your dedicated manager acknowledges within 15 minutes with the fixed fee and the exact document list.
          </p>

          {/* Progress */}
          <div className="mt-10 border border-ink/15 bg-white">
            <div className="flex" data-testid="quote-progress">
              {STEPS.map((label, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <div
                    key={label}
                    className={`flex-1 py-4 px-4 border-r last:border-r-0 border-ink/10 flex items-center gap-3 ${current ? "bg-alt" : ""}`}
                  >
                    <span
                      className={`w-6 h-6 border flex items-center justify-center shrink-0 ${
                        done
                          ? "bg-approve border-approve text-paper"
                          : current
                          ? "bg-white border-ink text-ink"
                          : "bg-white border-ink/30 text-transparent"
                      }`}
                    >
                      {done ? <Check size={14} strokeWidth={3} /> : ""}
                    </span>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-slate2 leading-none">
                        Step {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className={`text-sm font-semibold mt-1 ${current || done ? "text-ink" : "text-ink/50"}`}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 sm:p-8 relative">
              {transitioning && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center" data-testid="quote-loading">
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    <span className="mono text-[10px] uppercase tracking-widest text-slate2">Loading step...</span>
                  </div>
                </div>
              )}
              {step === 0 && (
                <div>
                  <h2 className="font-display text-2xl text-ink">What are you looking to file?</h2>
                  <p className="text-slate2 text-sm mt-1">Pick the closest match — we'll fine-tune on the call.</p>
                  <div className="mt-5 relative">
                    <select
                      value={form.service_slug}
                      onChange={(e) => update("service_slug", e.target.value)}
                      className="w-full appearance-none bg-white border border-ink/25 px-4 py-3 focus:outline-none focus:border-ink"
                      data-testid="quote-service-select"
                    >
                      <option value="">Select a service…</option>
                      {PILLARS.map((p) => (
                        <optgroup key={p.slug} label={p.label}>
                          {SERVICES.filter((s) => s.pillar === p.slug).map((s) => (
                            <option key={s.slug} value={s.slug}>{s.name} — from {s.startingPrice}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  {chosen && (
                    <div className="mt-5 border border-ink/15 p-4 bg-alt">
                      <div className="mono text-[10px] uppercase tracking-widest text-slate2">You picked</div>
                      <div className="font-display text-xl text-ink mt-1">{chosen.name}</div>
                      <div className="text-sm text-slate2 mt-1">{chosen.oneLine}</div>
                      <div className="mt-3 font-display text-2xl text-ink font-bold">Starts at {chosen.startingPrice}</div>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl text-ink">Tell us a little about the business.</h2>
                  <p className="text-slate2 text-sm mt-1">This helps us pick the right form and specialist.</p>

                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Business stage</label>
                      <select
                        value={form.business_stage}
                        onChange={(e) => update("business_stage", e.target.value)}
                        className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink"
                        data-testid="quote-stage"
                      >
                        <option value="">Select…</option>
                        <option>Not registered yet</option>
                        <option>Proprietorship / Partnership</option>
                        <option>LLP / Private Limited</option>
                        <option>Public Limited</option>
                      </select>
                    </div>
                    <div>
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">State / UT</label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => update("state", e.target.value)}
                        className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink"
                        placeholder="e.g. Maharashtra"
                        data-testid="quote-state"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Estimated annual turnover (optional)</label>
                      <select
                        value={form.turnover}
                        onChange={(e) => update("turnover", e.target.value)}
                        className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink"
                        data-testid="quote-turnover"
                      >
                        <option value="">Prefer not to say</option>
                        <option>Pre-revenue</option>
                        <option>Under ₹40 lakh</option>
                        <option>₹40 lakh – ₹1 crore</option>
                        <option>₹1 crore – ₹5 crore</option>
                        <option>Above ₹5 crore</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display text-2xl text-ink">Where should your manager reach you?</h2>
                  <p className="text-slate2 text-sm mt-1">One call, one WhatsApp thread — no spam.</p>

                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Full name</label>
                      <input
                        type="text"
                        value={form.full_name}
                        onChange={(e) => update("full_name", e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, full_name: true }))}
                        className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${
                          errors.full_name ? "border-seal" : "border-ink/25"
                        }`}
                        data-testid="quote-name"
                      />
                      {errors.full_name && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs bg-white border border-seal/30 px-2.5 py-1.5 rounded shadow-sm text-ink w-fit">
                          <AlertOctagon size={14} className="text-seal shrink-0" />
                          <span className="font-semibold">{errors.full_name}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                        className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${
                          errors.phone ? "border-seal" : "border-ink/25"
                        }`}
                        placeholder="+91 99999 99999"
                        data-testid="quote-phone"
                      />
                      {errors.phone && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs bg-white border border-seal/30 px-2.5 py-1.5 rounded shadow-sm text-ink w-fit">
                          <AlertOctagon size={14} className="text-seal shrink-0" />
                          <span className="font-semibold">{errors.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                        className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${
                          errors.email ? "border-seal" : "border-ink/25"
                        }`}
                        data-testid="quote-email"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs bg-white border border-seal/30 px-2.5 py-1.5 rounded shadow-sm text-ink w-fit">
                          <AlertOctagon size={14} className="text-seal shrink-0" />
                          <span className="font-semibold">{errors.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Anything specific? (optional)</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        rows={3}
                        className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink"
                        placeholder="e.g. 3 years of pending ROC filings, urgent"
                        data-testid="quote-notes"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 border border-seal/40 bg-seal/[0.08] p-3 text-sm text-ink">{error}</div>
                  )}
                </div>
              )}

              {step === 3 && result && (
                <div className="text-center py-6" data-testid="quote-success">
                  <div className="flex justify-center">
                    <Seal
                      size={110}
                      color="#1E5631"
                      label="Received"
                      outerText="· RECEIVED · MANAGER ASSIGNED ·"
                      center={
                        <div>
                          <ClipboardCheck size={22} className="mx-auto text-approve" />
                          <div className="mono text-[8px] tracking-[0.15em] uppercase mt-1 font-semibold">Filed</div>
                        </div>
                      }
                    />
                  </div>
                  <h2 className="font-display text-2xl text-ink mt-5">Quote request received.</h2>
                  <p className="text-slate2 mt-2 text-sm max-w-md mx-auto">
                    Your manager will call {form.full_name.split(" ")[0]} on {form.phone} within 15 minutes.
                  </p>
                  <div className="mt-5 inline-block border border-ink/20 bg-alt px-5 py-3 text-left rounded-sm">
                    <div className="mono text-[10px] uppercase tracking-widest text-slate2">Engagement reference</div>
                    <div className="mono text-base font-semibold text-ink mt-1">{result.reference}</div>
                  </div>
                  <div className="mt-8">
                    <Link to="/" className="btn-outline">Back to home</Link>
                  </div>
                </div>
              )}

              {step < 3 && (
                <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="btn-outline disabled:opacity-30"
                    data-testid="quote-back"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  {step < 2 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={!canNext()}
                      className="btn-primary disabled:opacity-40"
                      data-testid="quote-next"
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={!canNext() || submitting || Object.keys(errors).length > 0}
                      className="btn-primary disabled:opacity-40 flex items-center gap-2"
                      data-testid="quote-submit"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit quote request <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="paper-card p-6">
            <div className="mono text-[11px] uppercase tracking-widest text-slate2">Why 8,400+ businesses trust us</div>
            <ul className="mt-3 space-y-3 text-sm text-ink">
              {[
                "Fixed-fee quotes — no hourly surprises",
                "One dedicated manager per filing",
                "Filed by due date or fee refunded",
                "Chartered Accountants, CS and IP attorneys in-house",
                "4.8 / 5 on Google · 1,200 verified reviews",
              ].map((it, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 border border-approve bg-approve text-paper flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-ink/20 bg-ink text-paper p-6">
            <div className="mono text-[11px] uppercase tracking-widest text-brand">Prefer a call?</div>
            <div className="font-display text-2xl mt-2 leading-tight">Speak to a manager now.</div>
            <a href="tel:+919999999999" className="mono text-sm text-paper mt-3 block">+91 99999 99999</a>
            <div className="mono text-[10px] uppercase tracking-widest text-paper/60 mt-1">Mon-Sat · 10am – 8pm IST</div>
          </div>
        </aside>
      </section>

      <div className="h-16" />
    </Layout>
  );
}
