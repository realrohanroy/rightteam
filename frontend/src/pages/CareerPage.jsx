import React, { useRef, useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import {
  MapPin,
  Clock,
  Users,
  ChevronRight,
  CheckCircle2,
  Upload,
  Briefcase,
  TrendingUp,
  Star,
  Heart,
  BookOpen,
  Target,
  ArrowRight,
  Phone,
  Mail,
  User,
  FileText,
  X,
  Check,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API = `${BACKEND_URL}/api`;
/* JOBS are fetched live from the HR portal — see useEffect in CareerPage */

const WHY_JOIN = [
  {
    icon: <Users className="w-7 h-7 text-brand" />,
    title: "Great People",
    desc: "Work with talented and supportive professionals who push each other to grow.",
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-brand" />,
    title: "Growth Mindset",
    desc: "Learn, grow and build a rewarding career with structured development paths.",
  },
  {
    icon: <Target className="w-7 h-7 text-brand" />,
    title: "Make an Impact",
    desc: "Empower businesses and make a real difference in India's compliance ecosystem.",
  },
];

const CULTURE_PILLARS = [
  {
    icon: <Heart className="w-8 h-8 text-brand" />,
    title: "People First",
    desc: "We believe in a people-first culture built on trust, respect and collaboration.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-brand" />,
    title: "Continuous Learning",
    desc: "We encourage learning and provide opportunities to upgrade your skills continuously.",
  },
  {
    icon: <Star className="w-8 h-8 text-brand" />,
    title: "Performance Rewards",
    desc: "We recognize your efforts and reward performance and achievements generously.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-brand" />,
    title: "Work–Life Balance",
    desc: "We value flexibility and ensure a healthy balance of work and life.",
  },
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0 years)",
  "Less than 1 year",
  "1–2 Years",
  "2–3 Years",
  "3–5 Years",
  "5–8 Years",
  "8+ Years",
];

/* ─────────────────────────────────────────────────────────────────────────────
   JOB CARD
───────────────────────────────────────────────────────────────────────────── */
function JobCard({ job, onApply }) {
  return (
    <div className="paper-card p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 group transition-all duration-300">
      {/* Left — icon + details */}
      <div className="flex gap-5 flex-1 min-w-0">
        <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-alt border border-ink/10 group-hover:border-brand/30 transition-colors duration-300">
          {job.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink text-lg leading-tight mb-2">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
            <span className="flex items-center gap-1.5 text-sm text-slate2">
              <Clock className="w-3.5 h-3.5 text-brand" /> {job.type}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate2">
              <MapPin className="w-3.5 h-3.5 text-brand" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate2">
              <Users className="w-3.5 h-3.5 text-brand" /> {job.experience}
            </span>
          </div>
          <p className="text-sm text-slate2 leading-relaxed">{job.description}</p>
        </div>
      </div>

      {/* Right — responsibilities + CTA */}
      <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-ink/10 pt-5 lg:pt-0 lg:pl-8">
        {job.responsibilities && job.responsibilities.length > 0 && (
          <>
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink/60 mb-3 font-semibold">
              Key Responsibilities
            </div>
            <ul className="space-y-2 mb-5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <CheckCircle2 className="w-4 h-4 text-approve mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </>
        )}
        <button
          onClick={() => onApply(job.title)}
          className="btn-primary w-full justify-center text-sm"
          id={`apply-btn-${job.id}`}
        >
          Apply Now <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APPLICATION FORM
───────────────────────────────────────────────────────────────────────────── */
function ApplicationForm({ selectedRole, onRoleChange }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: selectedRole || "",
    experience: "",
    resume: null,
    coverNote: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Sync position when prop changes
  React.useEffect(() => {
    if (selectedRole) {
      setForm((f) => ({ ...f, position: selectedRole }));
    }
  }, [selectedRole]);

  const validate = (data) => {
    const e = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    else if (data.fullName.trim().length < 2) e.fullName = "Name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(data.fullName)) e.fullName = "Name can only contain letters and spaces.";

    if (!data.phone) e.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(data.phone)) e.phone = "Enter a valid 10-digit mobile number (digits only).";

    if (!data.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email address.";

    if (!data.position) e.position = "Please select a position.";
    if (!data.experience) e.experience = "Please select your experience level.";
    if (!data.resume) e.resume = "Please upload your resume.";
    else if (data.resume.size > 5 * 1024 * 1024) e.resume = "Resume must be under 5 MB.";
    else if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(data.resume.type))
      e.resume = "Only PDF or Word documents are accepted.";

    return e;
  };

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const e = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  };

  const handlePhoneInput = (e) => {
    // Strip non-digits immediately
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleChange("phone", raw);
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate(form);
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("resume", file);
      setTouched((t) => ({ ...t, resume: true }));
    }
  };

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.fullName);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("position", form.position);
      // We don't have experience field mapped in backend, backend only has "portfolio", "linkedin", "message"
      // But we can stuff experience and cover note into "message"
      const combinedMessage = `Experience: ${form.experience}\nCover Note: ${form.coverNote}`;
      formData.append("message", combinedMessage);
      
      // Append the actual file
      formData.append("resume", form.resume);

      await axios.post(`${API}/career`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError("Failed to submit application. Please check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 border rounded-sm text-sm text-ink placeholder-slate2/70 bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field] && touched[field]
        ? "border-seal focus:ring-seal/30"
        : "border-ink/20 focus:ring-brand/30 focus:border-brand"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-approve/10 flex items-center justify-center mb-6 animate-[stamp-in_500ms_cubic-bezier(.22,1.2,.36,1)_both]">
          <Check className="w-10 h-10 text-approve" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-2xl text-ink mb-3">Application Submitted!</h3>
        <p className="text-slate2 text-sm max-w-sm leading-relaxed mb-6">
          Thank you for your interest in joining RightTeam. Our HR team will review your application and reach out within 3–5 business days.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ fullName: "", phone: "", email: "", position: "", experience: "", resume: null, coverNote: "" });
            setTouched({});
            setErrors({});
          }}
          className="btn-outline text-sm"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-name">
          Full Name <span className="text-seal">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate2/60" />
          <input
            id="career-name"
            type="text"
            placeholder="e.g. Priya Sharma"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={`${inputClass("fullName")} pl-10`}
            autoComplete="name"
          />
        </div>
        {errors.fullName && touched.fullName && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-phone">
          Mobile Number <span className="text-seal">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate2/60" />
          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-ink/60 border-r border-ink/20 pr-3 select-none">+91</span>
          <input
            id="career-phone"
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            value={form.phone}
            onChange={handlePhoneInput}
            onBlur={() => handleBlur("phone")}
            onKeyDown={(e) => {
              if (!/[\d\b\t]/.test(e.key) && !["Backspace","Delete","Tab","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","End","Home"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            maxLength={10}
            className={`${inputClass("phone")} pl-20`}
            autoComplete="tel"
          />
        </div>
        {errors.phone && touched.phone && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.phone}
          </p>
        )}
        {!errors.phone && touched.phone && form.phone.length === 10 && (
          <p className="mt-1.5 text-xs text-approve flex items-center gap-1">
            <Check className="w-3 h-3" /> Valid 10-digit number
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-email">
          Email Address <span className="text-seal">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate2/60" />
          <input
            id="career-email"
            type="email"
            placeholder="you@company.in"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputClass("email")} pl-10`}
            autoComplete="email"
          />
        </div>
        {errors.email && touched.email && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.email}
          </p>
        )}
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-position">
          Position Applying For <span className="text-seal">*</span>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate2/60 pointer-events-none" />
          <select
            id="career-position"
            value={form.position}
            onChange={(e) => handleChange("position", e.target.value)}
            onBlur={() => handleBlur("position")}
            className={`${inputClass("position")} pl-10 appearance-none cursor-pointer`}
          >
            <option value="">Select a position</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.title}>{j.title}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-slate2/60 pointer-events-none" />
        </div>
        {errors.position && touched.position && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.position}
          </p>
        )}
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-experience">
          Total Experience <span className="text-seal">*</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate2/60 pointer-events-none" />
          <select
            id="career-experience"
            value={form.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            onBlur={() => handleBlur("experience")}
            className={`${inputClass("experience")} pl-10 appearance-none cursor-pointer`}
          >
            <option value="">Select experience level</option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-slate2/60 pointer-events-none" />
        </div>
        {errors.experience && touched.experience && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.experience}
          </p>
        )}
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          Resume / CV <span className="text-seal">*</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="career-resume"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full px-4 py-3.5 border-2 border-dashed rounded-sm flex items-center gap-3 transition-all duration-200 group hover:border-brand hover:bg-brand/5 ${
            errors.resume && touched.resume
              ? "border-seal bg-seal/5"
              : form.resume
              ? "border-approve bg-approve/5"
              : "border-ink/25"
          }`}
        >
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
            form.resume ? "bg-approve/15" : "bg-alt group-hover:bg-brand/10"
          }`}>
            {form.resume ? (
              <Check className="w-4.5 h-4.5 text-approve" />
            ) : (
              <Upload className="w-4.5 h-4.5 text-brand" />
            )}
          </div>
          <div className="text-left flex-1 min-w-0">
            {form.resume ? (
              <div>
                <p className="text-sm font-semibold text-approve truncate">{form.resume.name}</p>
                <p className="text-xs text-slate2">
                  {(form.resume.size / 1024).toFixed(0)} KB · Click to replace
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-ink">Click to upload your resume</p>
                <p className="text-xs text-slate2">PDF or Word document · Max 5 MB</p>
              </div>
            )}
          </div>
          {form.resume && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleChange("resume", null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="shrink-0 w-6 h-6 rounded-full bg-slate2/15 flex items-center justify-center hover:bg-seal/20 transition-colors"
            >
              <X className="w-3 h-3 text-slate2" />
            </button>
          )}
        </button>
        {errors.resume && touched.resume && (
          <p className="mt-1.5 text-xs text-seal flex items-center gap-1">
            <X className="w-3 h-3" /> {errors.resume}
          </p>
        )}
      </div>

      {/* Cover Note (optional) */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5" htmlFor="career-cover">
          Cover Note <span className="text-slate2 font-normal">(Optional)</span>
        </label>
        <textarea
          id="career-cover"
          rows={3}
          placeholder="Briefly tell us why you'd be a great fit for this role..."
          value={form.coverNote}
          onChange={(e) => handleChange("coverNote", e.target.value)}
          className="w-full px-4 py-3.5 border border-ink/20 rounded-sm text-sm text-ink placeholder-slate2/70 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
        />
      </div>

      {/* Privacy note */}
      <p className="text-xs text-slate2/80 leading-relaxed">
        By submitting, you agree that RightTeam may store and process your data for recruitment purposes. We do not share personal information with third parties.
      </p>

      {submitError && (
        <div className="text-sm text-seal bg-seal/10 p-3 border border-seal/20 rounded-sm">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        id="career-submit-btn"
        className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Submit Application <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function CareerPage() {
  const formRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [liveJobs, setLiveJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/hr/jobs`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setLiveJobs(Array.isArray(data) ? data : []))
      .catch(() => setLiveJobs([]))
      .finally(() => setJobsLoading(false));
  }, []);

  // Map API job shape → shape expected by JobCard
  const jobs = liveJobs.map((j) => ({
    id: String(j.id),
    title: j.title,
    type: j.type,
    location: j.location,
    experience: j.department,   // use department as the badge label
    description: j.description,
    responsibilities: [],        // API doesn't carry these; hidden when empty
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <rect width="48" height="48" rx="10" fill="#0B1E3D" />
        <rect x="12" y="28" width="6" height="8" rx="1" fill="#E8522B" />
        <rect x="21" y="22" width="6" height="14" rx="1" fill="#fff" fillOpacity=".7" />
        <rect x="30" y="16" width="6" height="20" rx="1" fill="#E8522B" />
      </svg>
    ),
  }));

  const scrollToForm = (roleTitle) => {
    setSelectedRole(roleTitle);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <Layout>
      <Helmet>
        <title>Careers at RightTeam – Join India's Leading Compliance Practice</title>
        <meta
          name="description"
          content="Explore career opportunities at RightTeam. Join our team of CAs, CS professionals, and business development experts. Build your career in compliance and legal services."
        />
      </Helmet>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        {/* Stock background image */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt="RightTeam collaborating"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 select-none pointer-events-none"
        />
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-ink/90 to-ink" />

        <div className="container-x relative z-10 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-brand inline-block" />
              Join Our Team
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-6">
              Build Your Career.{" "}
              <span className="text-brand">Grow With Us.</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
              Be part of India's most trusted compliance and registration practice. We're growing fast and looking for passionate professionals to join our Ahmedabad team.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToForm("")}
                className="inline-flex items-center gap-2.5 bg-brand text-white px-7 py-3.5 rounded-sm font-semibold text-sm hover:bg-brand-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,82,43,0.4)]"
                id="hero-view-openings-btn"
              >
                View Open Positions <ChevronRight className="w-4.5 h-4.5" />
              </button>
              <a
                href="#why-rightteam"
                className="inline-flex items-center gap-2.5 border border-white/30 text-white px-7 py-3.5 rounded-sm font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Why RightTeam
              </a>
            </div>
          </div>

          
        </div>
      </section>

      {/* ── Why Join Section ─────────────────────────────────────────────── */}
      <section id="why-rightteam" className="section-alt py-16">
        <div className="container-x">
          <div className="grid sm:grid-cols-3 gap-5">
            {WHY_JOIN.map((w, i) => (
              <div
                key={i}
                className="bg-white border border-ink/10 rounded-sm p-6 flex items-start gap-4 hover:border-brand/30 hover:shadow-[0_6px_20px_-8px_rgba(232,82,43,0.2)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-sm bg-brand-light flex items-center justify-center shrink-0">
                  {w.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-base mb-1">{w.title}</h3>
                  <p className="text-sm text-slate2 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture Pillars ───────────────────────────────────────────────── */}
      <section className="container-x py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand mb-3">Our Culture</div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Why Build Your Career With RightTeam?
          </h2>
          <p className="text-slate2 mt-4 max-w-xl mx-auto leading-relaxed">
            We foster an environment where professionals thrive, grow and make a meaningful impact every single day.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE_PILLARS.map((p, i) => (
            <div
              key={i}
              className="paper-card p-7 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-brand/8 flex items-center justify-center mb-4" style={{ background: "rgba(232,82,43,0.08)" }}>
                {p.icon}
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">{p.title}</h3>
              <p className="text-sm text-slate2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Positions ────────────────────────────────────────────────── */}
      <section className="section-alt py-16 sm:py-20">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand mb-2">Hiring Now</div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink">Open Positions</h2>
            </div>
            <div className="flex items-center gap-2 bg-approve/10 text-approve border border-approve/20 rounded-sm px-4 py-2 text-sm font-semibold w-fit">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-approve opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-approve" />
              </span>
              {jobsLoading ? "Loading…" : `${jobs.length} Active Opening${jobs.length !== 1 ? "s" : ""}`}
            </div>
          </div>

          <div className="space-y-5">
            {jobsLoading && (
              <div className="text-slate2 text-sm py-8 text-center">Loading openings…</div>
            )}
            {!jobsLoading && jobs.length === 0 && (
              <div className="paper-card p-8 text-center text-slate2 text-sm">
                No open positions at the moment. Check back soon or send your CV to{" "}
                <a href="mailto:careers@rightteam.in" className="text-brand hover:underline">careers@rightteam.in</a>.
              </div>
            )}
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={scrollToForm} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form Section ──────────────────────────────────────── */}
      <section ref={formRef} className="container-x py-16 sm:py-24" id="apply-form">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — illustration / info panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="mono text-[11px] uppercase tracking-[0.22em] text-brand mb-3">Apply Now</div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4 leading-tight">
                Join Our Growing Team
              </h2>
              <p className="text-slate2 leading-relaxed mb-8">
                Take the next step in your career. Fill out the form and our HR team will get back to you within 3–5 business days.
              </p>

              {/* Process steps */}
              <div className="space-y-4 mb-8">
                {[
                  { step: "01", title: "Submit Application", desc: "Fill the form with your details and upload your resume." },
                  { step: "02", title: "Initial Screening", desc: "Our HR team reviews applications within 3–5 working days." },
                  { step: "03", title: "Interview Rounds", desc: "One or two interview rounds depending on the role." },
                  { step: "04", title: "Offer & Onboarding", desc: "Receive your offer letter and join the RightTeam family." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-sm bg-ink flex items-center justify-center shrink-0">
                      <span className="mono text-[11px] font-bold text-brand">{s.step}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm mb-0.5">{s.title}</div>
                      <div className="text-xs text-slate2 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="border border-ink/10 rounded-sm p-5 bg-alt">
                <div className="mono text-[11px] uppercase tracking-widest text-slate2 mb-3">HR Contact</div>
                <a href="mailto:careers@rightteam.in" className="flex items-center gap-2.5 text-sm text-ink font-medium hover:text-brand transition-colors mb-2">
                  <Mail className="w-4 h-4 text-brand" /> careers@rightteam.in
                </a>
                <a href="tel:18004103090" className="flex items-center gap-2.5 text-sm text-ink font-medium hover:text-brand transition-colors">
                  <Phone className="w-4 h-4 text-brand" /> 1800 410 3090
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="border border-ink/10 rounded-sm bg-white shadow-[0_2px_40px_-15px_rgba(11,30,61,0.15)] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-ink/10">
                <div className="w-10 h-10 rounded-sm bg-brand flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-lg leading-tight">Application Form</h3>
                  <p className="text-xs text-slate2">All fields marked <span className="text-seal font-bold">*</span> are required</p>
                </div>
              </div>
              <ApplicationForm selectedRole={selectedRole} onRoleChange={setSelectedRole} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="section-alt border-t border-ink/10">
        <div className="container-x py-14">
          <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between rounded-sm">
            <div className="text-center md:text-left">
              <div className="mono text-[11px] uppercase tracking-widest text-brand mb-2">Don't see your role?</div>
              <h3 className="font-display text-2xl sm:text-3xl leading-tight">
                Send us your resume anyway.
              </h3>
              <p className="text-white/65 mt-2 text-sm max-w-md">
                We're always on the lookout for exceptional talent. Drop your CV and we'll reach out when a matching role opens up.
              </p>
            </div>
            <a
              href="mailto:careers@rightteam.in"
              className="inline-flex items-center gap-2 bg-brand text-white px-7 py-3.5 font-semibold text-sm rounded-sm hover:bg-brand-dark transition-all shrink-0 hover:-translate-y-0.5"
            >
              Email Your CV <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
