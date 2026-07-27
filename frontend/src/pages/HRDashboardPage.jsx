import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("hr_token")}` };
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

const JOB_TYPES = ["Full-time", "Part-time", "Internship"];

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function HRDashboardPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("hr_username") || "HR";

  const [jobs, setJobs]           = useState([]);
  const [loadingJobs, setLoading] = useState(true);
  const [sessionMsg, setSession]  = useState("");

  // Form state
  const EMPTY_FORM = { title: "", department: "", location: "", type: "Full-time", description: "" };
  const [form, setForm]         = useState(EMPTY_FORM);
  const [formErr, setFormErr]   = useState({});
  const [submitting, setSub]    = useState(false);
  const [successMsg, setSuccess]= useState("");

  // ── Expired session handler ───────────────────────────────────────────────

  const handleExpired = useCallback(() => {
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_username");
    navigate("/hr", { replace: true, state: { expired: true } });
  }, [navigate]);

  // ── Guard: redirect if no token ───────────────────────────────────────────

  useEffect(() => {
    if (!localStorage.getItem("hr_token")) navigate("/hr", { replace: true });
  }, [navigate]);

  // ── Fetch all jobs ────────────────────────────────────────────────────────

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/hr/jobs/all`, { headers: authHeaders() });
      if (res.status === 401) { handleExpired(); return; }
      const data = await res.json();
      setJobs(data);
    } catch {
      // Network error — keep showing whatever was loaded
    } finally {
      setLoading(false);
    }
  }, [handleExpired]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // ── Logout ────────────────────────────────────────────────────────────────

  const logout = async () => {
    try {
      await fetch(`${API}/hr/logout`, { method: "POST", headers: authHeaders() });
    } catch { /* best-effort */ }
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_username");
    navigate("/hr", { replace: true });
  };

  // ── Post a job ────────────────────────────────────────────────────────────

  const validateForm = () => {
    const errs = {};
    if (!form.title.trim())       errs.title       = "Required";
    if (form.title.length > 200)  errs.title       = "Max 200 chars";
    if (!form.department.trim())  errs.department  = "Required";
    if (!form.location.trim())    errs.location    = "Required";
    if (!form.description.trim()) errs.description = "Required";
    if (form.description.length > 5000) errs.description = "Max 5000 chars";
    return errs;
  };

  const submitJob = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormErr(errs); return; }
    setSub(true);
    setFormErr({});
    setSuccess("");
    try {
      const res = await fetch(`${API}/hr/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(form),
      });
      if (res.status === 401) { handleExpired(); return; }
      if (res.ok) {
        setForm(EMPTY_FORM);
        setSuccess("Job posting published successfully.");
        fetchJobs();
      } else {
        const data = await res.json();
        setFormErr(data);
      }
    } catch {
      setFormErr({ _: "Network error. Please try again." });
    } finally {
      setSub(false);
    }
  };

  // ── Deactivate (soft-delete) ──────────────────────────────────────────────

  const deactivateJob = async (job) => {
    if (!window.confirm(`Hide "${job.title}" from the public careers page?\n\nThis can be re-activated by your admin. The record is preserved.`)) return;
    try {
      const res = await fetch(`${API}/hr/jobs/${job.id}/delete`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401) { handleExpired(); return; }
      if (res.ok) setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, is_active: false } : j));
    } catch {
      alert("Network error. Please try again.");
    }
  };

  const activeJobs   = jobs.filter((j) => j.is_active);
  const inactiveJobs = jobs.filter((j) => !j.is_active);

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <span style={s.brand}>RightTeam <span style={s.tag}>HR</span></span>
        <div style={s.headerRight}>
          <span style={s.who}>{username}</span>
          <button onClick={logout} style={s.logoutBtn}>Sign out</button>
        </div>
      </header>

      <div style={s.body}>
        {/* ── Post a Job ── */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Post a New Job Opening</h2>
          <form onSubmit={submitJob} noValidate>
            <div style={s.grid2}>
              <Field label="Job Title *" error={formErr.title}>
                <input style={s.input} value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </Field>
              <Field label="Department *" error={formErr.department}>
                <input style={s.input} value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
              </Field>
              <Field label="Location *" error={formErr.location}>
                <input style={s.input} value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
              </Field>
              <Field label="Type *" error={formErr.type}>
                <select style={s.input} value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label={`Description * (${form.description.length}/5000)`} error={formErr.description}>
              <textarea style={{ ...s.input, minHeight: 120, resize: "vertical" }}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                maxLength={5000} />
            </Field>
            {formErr._ && <div style={s.errBox}>{formErr._}</div>}
            {successMsg && <div style={s.successBox}>{successMsg}</div>}
            <button type="submit" style={{ ...s.primaryBtn, opacity: submitting ? 0.65 : 1 }} disabled={submitting}>
              {submitting ? "Publishing…" : "Publish Job"}
            </button>
          </form>
        </section>

        {/* ── Active Job Listings ── */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Active Listings ({activeJobs.length})</h2>
          {loadingJobs ? (
            <div style={s.emptyText}>Loading…</div>
          ) : activeJobs.length === 0 ? (
            <div style={s.emptyText}>No active job postings yet.</div>
          ) : (
            <div style={s.jobList}>
              {activeJobs.map((job) => <JobCard key={job.id} job={job} onDeactivate={deactivateJob} />)}
            </div>
          )}
        </section>

        {/* ── Inactive Listings ── */}
        {inactiveJobs.length > 0 && (
          <section style={s.section}>
            <h2 style={{ ...s.sectionTitle, color: "#9ca3af" }}>Hidden / Inactive ({inactiveJobs.length})</h2>
            <div style={s.jobList}>
              {inactiveJobs.map((job) => <JobCard key={job.id} job={job} inactive />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={s.label}>{label}</label>
      {children}
      {error && <div style={s.fieldErr}>{error}</div>}
    </div>
  );
}

function JobCard({ job, onDeactivate, inactive = false }) {
  return (
    <div style={{ ...s.card, opacity: inactive ? 0.55 : 1 }}>
      <div style={s.cardTop}>
        <div>
          <div style={s.cardTitle}>{job.title}</div>
          <div style={s.cardMeta}>
            {job.department} · {job.location} · {job.type}
            {job.created_at && <> · {new Date(job.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</>}
            {job["created_by__username"] && <> · by {job["created_by__username"]}</>}
          </div>
        </div>
        {!inactive && onDeactivate && (
          <button onClick={() => onDeactivate(job)} style={s.deactivateBtn}>
            Deactivate
          </button>
        )}
        {inactive && <span style={s.inactiveBadge}>Hidden</span>}
      </div>
      <p style={s.cardDesc}>{job.description}</p>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  page:         { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter', sans-serif" },
  header:       { background: "#0B1E3D", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand:        { color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" },
  tag:          { background: "#E8522B", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, marginLeft: 6, letterSpacing: "0.08em", textTransform: "uppercase" },
  headerRight:  { display: "flex", alignItems: "center", gap: 14 },
  who:          { color: "rgba(255,255,255,0.65)", fontSize: 13 },
  logoutBtn:    { background: "transparent", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 4, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 },
  body:         { maxWidth: 860, margin: "0 auto", padding: "32px 20px 60px" },
  section:      { background: "#fff", borderRadius: 8, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" },
  sectionTitle: { margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#111827" },
  grid2:        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" },
  label:        { display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em" },
  input:        { width: "100%", border: "1px solid #d1d5db", borderRadius: 4, padding: "9px 11px", fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  fieldErr:     { color: "#dc2626", fontSize: 12, marginTop: 4 },
  errBox:       { background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: 4, padding: "10px 12px", fontSize: 13, marginBottom: 12 },
  successBox:   { background: "#f0fdf4", border: "1px solid #86efac", color: "#15803d", borderRadius: 4, padding: "10px 12px", fontSize: 13, marginBottom: 12 },
  primaryBtn:   { background: "#E8522B", color: "#fff", border: "none", borderRadius: 4, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  jobList:      { display: "flex", flexDirection: "column", gap: 12 },
  card:         { border: "1px solid #e5e7eb", borderRadius: 6, padding: "16px 18px" },
  cardTop:      { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 },
  cardTitle:    { fontWeight: 700, fontSize: 15, color: "#111827" },
  cardMeta:     { fontSize: 12, color: "#6b7280", marginTop: 3 },
  cardDesc:     { fontSize: 13, color: "#374151", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 },
  deactivateBtn:{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: 4, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600, flexShrink: 0 },
  inactiveBadge:{ background: "#f3f4f6", border: "1px solid #d1d5db", color: "#6b7280", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontWeight: 700, flexShrink: 0 },
  emptyText:    { color: "#9ca3af", fontSize: 14 },
};
