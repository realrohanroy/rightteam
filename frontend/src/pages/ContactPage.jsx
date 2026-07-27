import React, { useState, useMemo } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { Seal } from "../components/Seal";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { DuotoneImage } from "../components/DuotoneImage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API = `${BACKEND_URL}/api`;

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "", message: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const errors = useMemo(() => {
    const errs = {};
    if (touched.full_name && !form.full_name.trim()) errs.full_name = "Full name is required";
    if (touched.email) {
      if (!form.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    }
    if (touched.phone && form.phone && !/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }
    if (touched.message && !form.message.trim()) errs.message = "Message is required";
    return errs;
  }, [form, touched]);

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ full_name: true, email: true, phone: true, message: true });
    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim() || (form.phone && !/^\d{10}$/.test(form.phone)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      setResult(data);
    } catch {
      setError("Something went wrong. Please email hello@rightteam.in directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="container-x pt-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Home / Contact</div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mt-4 leading-[1.05]">
            Reach the practice.
          </h1>
          <p className="text-base sm:text-lg text-ink/75 mt-5 max-w-xl">
            Enquiries are acknowledged within 15 minutes during business hours. For a specific filing, use the quote form for a fixed-fee estimate.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 border border-ink flex items-center justify-center text-ink shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Email</div>
                <a href="mailto:hello@rightteam.in" className="text-ink font-semibold underline underline-offset-4 decoration-gold decoration-2">
                  hello@rightteam.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 border border-ink flex items-center justify-center text-ink shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Phone / WhatsApp</div>
                <a href="tel:+919999999999" className="text-ink font-semibold">+91 99999 99999</a>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-1">Mon-Sat · 10am – 8pm IST</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 border border-ink flex items-center justify-center text-ink shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2">Office</div>
                <div className="text-ink">Palladium Building, B1-505, Corporate Rd, near Vodafone House, Prahlad Nagar, Ahmedabad, Gujarat 380015</div>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-6">
          <div className="paper-card p-6 sm:p-8">
            {!result && (
              <form onSubmit={submit} data-testid="contact-form">
                <div className="mono text-[11px] uppercase tracking-[0.2em] text-slate2">
                  Contact Us
                </div>
                <h2 className="font-display text-2xl text-ink mt-2">Send us a message</h2>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mono text-[11px] uppercase tracking-widest text-slate2">Full name <span className="text-seal">*</span></label>
                    <input
                      required
                      className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${errors.full_name ? "border-seal" : "border-ink/25"}`}
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, full_name: true }))}
                      data-testid="contact-name"
                    />
                    {errors.full_name && <div className="text-xs text-seal mt-1">{errors.full_name}</div>}
                  </div>
                  <div>
                    <label className="mono text-[11px] uppercase tracking-widest text-slate2">Mobile Number</label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/60 border-r border-ink/20 pr-2 select-none">+91</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        className={`w-full bg-white border pl-12 pr-3 py-2.5 focus:outline-none focus:border-ink ${errors.phone ? "border-seal" : "border-ink/25"}`}
                        value={form.phone}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setForm({ ...form, phone: raw });
                        }}
                        onKeyDown={(e) => {
                          if (!/[\d\b\t]/.test(e.key) && !["Backspace","Delete","Tab","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","End","Home"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                        placeholder="9876543210"
                        maxLength={10}
                        data-testid="contact-phone"
                      />
                    </div>
                    {errors.phone && <div className="text-xs text-seal mt-1">{errors.phone}</div>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mono text-[11px] uppercase tracking-widest text-slate2">Email <span className="text-seal">*</span></label>
                    <input
                      required
                      type="email"
                      className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${errors.email ? "border-seal" : "border-ink/25"}`}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, email: true }))}
                      placeholder="you@company.in"
                      data-testid="contact-email"
                    />
                    {errors.email && <div className="text-xs text-seal mt-1">{errors.email}</div>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mono text-[11px] uppercase tracking-widest text-slate2">Subject</label>
                    <input
                      className="w-full mt-1 bg-white border border-ink/25 px-3 py-2.5 focus:outline-none focus:border-ink"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Need help with GST notice"
                      data-testid="contact-subject"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-end">
                      <label className="mono text-[11px] uppercase tracking-widest text-slate2">Message <span className="text-seal">*</span></label>
                      <span className="mono text-[10px] text-slate2">{form.message.length}/1000</span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      maxLength={1000}
                      className={`w-full mt-1 bg-white border px-3 py-2.5 focus:outline-none focus:border-ink ${errors.message ? "border-seal" : "border-ink/25"}`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 1000) })}
                      onBlur={() => setTouched(t => ({ ...t, message: true }))}
                      data-testid="contact-message"
                    />
                    {errors.message && <div className="text-xs text-seal mt-1">{errors.message}</div>}
                  </div>
                </div>

                {error && <div className="mt-4 border border-seal/40 bg-seal/[0.08] p-3 text-sm text-ink">{error}</div>}

                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-6 disabled:opacity-40" data-testid="contact-submit">
                  {submitting ? "Sending…" : "Send message"} <ArrowRight size={14} />
                </button>
                <div className="mono text-[10px] uppercase tracking-widest text-slate2 mt-3 text-center">
                  We reply in 15 minutes · Never share your data
                </div>
              </form>
            )}

            {result && (
              <div className="text-center py-8" data-testid="contact-success">
                <div className="flex justify-center">
                  <Seal
                    size={96}
                    color="#1E5631"
                    label="Received"
                    outerText="· MESSAGE RECEIVED · REPLY SOON ·"
                    center={
                      <div>
                        <Check size={20} className="mx-auto text-approve" strokeWidth={3} />
                        <div className="mono text-[8px] tracking-[0.15em] uppercase mt-1 font-semibold">Sent</div>
                      </div>
                    }
                  />
                </div>
                <h3 className="font-display text-xl text-ink mt-5">Message received.</h3>
                <p className="text-slate2 mt-2 text-sm">We'll reply on {form.email} within 15 minutes.</p>
                <div className="mt-5 inline-block border border-ink/20 bg-alt px-5 py-3 text-left rounded-sm">
                  <div className="mono text-[10px] uppercase tracking-widest text-slate2">Reference number</div>
                  <div className="mono text-base font-semibold text-ink mt-1">{result.reference}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="h-16" />
    </Layout>
  );
}
