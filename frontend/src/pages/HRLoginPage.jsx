import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API = `${BACKEND_URL}/api`;

export default function HRLoginPage() {
  const navigate = useNavigate();
  const [form, setForm]         = useState({ username: "", password: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [checking, setChecking] = useState(true); // checking existing session

  // If already logged in with a valid token, go straight to dashboard
  useEffect(() => {
    const token = localStorage.getItem("hr_token");
    if (!token) { setChecking(false); return; }
    fetch(`${API}/hr/jobs/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.ok) navigate("/hr/dashboard", { replace: true });
        else { localStorage.removeItem("hr_token"); localStorage.removeItem("hr_username"); setChecking(false); }
      })
      .catch(() => setChecking(false));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/hr/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("hr_token", data.token);
        localStorage.setItem("hr_username", data.username);
        navigate("/hr/dashboard", { replace: true });
      } else if (res.status === 429) {
        setError("Too many failed attempts. Please wait 60 seconds and try again.");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Could not reach server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div style={styles.page}>
        <div style={styles.spinner} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>HR Portal Login | RightTeam</title>
      </Helmet>
      <div style={styles.card}>
        <div style={styles.logo}>RightTeam</div>
        <div style={styles.subtitle}>HR Portal</div>
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="hr-username">Username</label>
            <input
              id="hr-username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              style={styles.input}
              required
              disabled={loading}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="hr-password">Password</label>
            <input
              id="hr-password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              style={styles.input}
              required
              disabled={loading}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button
            type="submit"
            style={{ ...styles.btn, opacity: loading ? 0.65 : 1 }}
            disabled={loading || !form.username || !form.password}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0B1E3D",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 380,
    boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
  },
  logo: {
    fontWeight: 800,
    fontSize: 22,
    color: "#0B1E3D",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 28,
    marginTop: 2,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  field: { marginBottom: 16 },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 4,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    color: "#111827",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    borderRadius: 4,
    padding: "10px 12px",
    fontSize: 13,
    marginBottom: 14,
  },
  btn: {
    width: "100%",
    background: "#E8522B",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "11px 0",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
    letterSpacing: "0.02em",
  },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid rgba(255,255,255,0.2)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
