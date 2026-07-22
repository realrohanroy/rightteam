import React, { useState } from "react";
import axios from "axios";
import { Download, Check, ArrowRight, AlertOctagon } from "lucide-react";
import { CornerSeal } from "./Seal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/**
 * Compliance calendar download CTA. Collects an email, records a lead
 * with source="calendar_download" so leads can be followed up.
 */
export const CompliancePDFCta = ({ variant = "default" }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | submitting | done | error
  const [reference, setReference] = useState("");
  const [emailError, setEmailError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email address is required.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid work email address.");
      return;
    }
    setEmailError("");
    setState("submitting");
    try {
      const { data } = await axios.post(`${API}/newsletter`, {
        email,
      });
      setReference(data.id || "Subscribed");
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section
      className={`relative overflow-hidden w-full py-16 ${
        variant === "dark" ? "bg-ink text-white" : "bg-[#EDEFF5] text-ink"
      }`}
      data-testid="compliance-pdf-cta"
    >
      <div className="container-x flex justify-center">

        {/* Center Column: Form & Heading */}
        <div className="flex flex-col justify-center items-center text-center w-full max-w-xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Never Miss an Important Business Update
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-ink/80 max-w-md leading-relaxed font-medium">
            Receive timely updates on company registrations, GST, ROC compliance, trademark registrations, and government policy changes.
          </p>

          {state !== "done" ? (
            <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-3 w-full max-w-md">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-transparent sm:bg-white border-0 sm:border border-ink/20 rounded-2xl sm:rounded-full p-0 sm:p-1 gap-2 sm:gap-0 transition-all">
                <input
                  type="email"
                  placeholder="Your Work Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="flex-1 bg-white sm:bg-transparent border border-ink/20 sm:border-0 rounded-full px-4 py-3 sm:py-2 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-ink sm:focus:border-0 focus:ring-2 focus:ring-ink/10 sm:focus:ring-0 shadow-sm sm:shadow-none"
                  data-testid="pdf-email"
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="bg-gradient-to-r from-[#4F46E5] to-[#9333EA] hover:from-[#4338CA] hover:to-[#805AD5] text-white text-xs sm:text-sm font-semibold px-5 py-3 sm:py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50 shrink-0"
                  data-testid="pdf-submit"
                >
                  {state === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Join Free</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
              
              {emailError && (
                <div className="flex items-center gap-1.5 mt-1 text-xs bg-white border border-red-200 px-3.5 py-1.5 rounded-full shadow-sm text-red-600 w-fit mx-auto">
                  <AlertOctagon size={13} className="shrink-0 text-red-500" />
                  <span className="font-semibold">{emailError}</span>
                </div>
              )}
              {state === "error" && (
                <div className="text-xs text-red-500 mt-1 font-semibold">Something went wrong. Please try again.</div>
              )}
            </form>
          ) : (
            <div className="mt-6 w-full max-w-md" data-testid="pdf-success">
              <div className="bg-white border border-green-600/30 px-5 py-3 rounded-full flex items-center justify-between gap-4 shadow-sm animate-stamp-in">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Sent to {email}</div>
                    <div className="text-[10px] mono uppercase tracking-wider text-ink/60">Ref: {reference}</div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  Check Inbox
                </span>
              </div>
            </div>
          )}

          <div className="mt-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ink/60">
            ✓ Weekly Business Updates • Compliance Alerts • Expert Insights
          </div>
        </div>

      </div>
    </section>
  );
};
