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
      const { data } = await axios.post(`${API}/leads`, {
        service_slug: "compliance-calendar-2026",
        service_name: "2026 India Compliance Calendar (PDF)",
        full_name: "Calendar download",
        email,
        phone: "0000000000",
        source: "calendar_download",
      });
      setReference(data.reference);
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section
      className={`${variant === "dark" ? "bg-ink text-white" : "bg-white text-ink border border-ink/15"} rounded-sm p-8 sm:p-10 grid md:grid-cols-5 gap-8 items-center`}
      data-testid="compliance-pdf-cta"
    >
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 border flex items-center justify-center ${
              variant === "dark" ? "border-white/40 text-white" : "border-ink/40 text-ink"
            }`}
          >
            <Download size={18} />
          </div>
          <div className={`mono text-[11px] uppercase tracking-[0.22em] ${variant === "dark" ? "text-brand" : "text-brand"} font-semibold`}>
            Free · PDF · 24 pages
          </div>
        </div>
        <h3
          className={`font-display text-2xl sm:text-3xl mt-4 leading-tight ${
            variant === "dark" ? "text-white" : "text-ink"
          }`}
        >
          The 2026 India Compliance Calendar.
        </h3>
        <div className="mt-4 flex items-center gap-4">
          <CornerSeal color={variant === "dark" ? "#FFFFFF" : "#0B1E3D"} size={26} />
          <div className={`mono text-[10px] uppercase tracking-widest ${variant === "dark" ? "text-white/60" : "text-slate2"}`}>
            Prepared by ICAI members · Updated Jan 2026
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        {state !== "done" ? (
          <form onSubmit={submit} noValidate className="flex flex-col gap-3">
            <label className={`mono text-[11px] uppercase tracking-widest ${variant === "dark" ? "text-white/70" : "text-slate2"}`}>
              Work email
            </label>
            <input
              type="email"
              placeholder="you@company.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              className={`px-3 py-3 focus:outline-none rounded-sm border ${
                emailError
                  ? "border-seal focus:border-seal"
                  : variant === "dark"
                  ? "bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white"
                  : "bg-white text-ink border-ink/25 focus:border-ink"
              }`}
              data-testid="pdf-email"
            />
            {emailError && (
              <div className="flex items-center gap-1.5 mt-0.5 text-xs bg-white border border-seal/30 px-2.5 py-1.5 rounded shadow-sm text-ink w-fit">
                <AlertOctagon size={14} className="text-seal shrink-0" />
                <span className="font-semibold">{emailError}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={state === "submitting"}
              className={`${variant === "dark" ? "bg-white text-ink" : "bg-ink text-white"} px-5 py-3 text-sm font-medium rounded-sm hover:animate-stamp-down flex items-center justify-center gap-2 disabled:opacity-40`}
              data-testid="pdf-submit"
            >
              {state === "submitting" ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending link…
                </>
              ) : (
                <>
                  Email me the calendar <ArrowRight size={14} />
                </>
              )}
            </button>
            {state === "error" && (
              <div className="text-xs text-seal">Something went wrong. Please try again.</div>
            )}
            <div className={`mono text-[10px] uppercase tracking-widest ${variant === "dark" ? "text-white/50" : "text-slate2"}`}>
              No spam · Unsubscribe with one click
            </div>
          </form>
        ) : (
          <div
            className={`border ${variant === "dark" ? "border-white/30 bg-white/10" : "border-approve/30 bg-approve/[0.06]"} p-5 rounded-sm`}
            data-testid="pdf-success"
          >
            <div className="flex items-center gap-2">
              <Check size={18} className={variant === "dark" ? "text-white" : "text-approve"} strokeWidth={3} />
              <div className={`mono text-[11px] uppercase tracking-widest ${variant === "dark" ? "text-white" : "text-approve"} font-semibold`}>
                Sent to {email}
              </div>
            </div>
            <div className={`mono text-[10px] uppercase tracking-widest mt-3 ${variant === "dark" ? "text-white/60" : "text-slate2"}`}>
              Reference · {reference}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
