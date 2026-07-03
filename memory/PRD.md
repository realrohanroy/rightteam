# RightTeam.in — PRD

## Original Problem Statement
Multi-page marketing site for RightTeam.in, an Indian business compliance & registration consultancy (React + Tailwind + FastAPI + MongoDB). Uses a "letterhead and official seal" identity (deep indigo ink, bond-paper background, seal red, marigold gold, approval green, slate). Signature element: circular ink-stamp seal. Layout devices: ledger hairlines, filing folder tabs, checklist tick states, penalty callouts on compliance pages.

## User Personas
- **Startup founders (Day 0–1)** — need Pvt Ltd / OPC / LLP registration, DSC, PAN/TAN, Startup India.
- **Small business owners (₹40L–₹5cr turnover)** — need GST, ITR, ROC, payroll, MSME/FSSAI.
- **Compliance managers / CFOs at growing SMEs** — need pending filings resolved, virtual CFO, ROC catch-up.
- **Enterprises pursuing tenders** — need ISO, MSME/Udyam, IEC, certifications.

## Core Requirements (static)
- 5 pillar hubs, ~30 service pages under a single reusable template
- Instant micro-quote widget on home + multi-step quote form
- Loss-framed messaging (penalty callouts) on Tax & Compliance
- Trust markers next to every CTA, starting price on every card
- Filing-tab nav, ledger hairlines, ink-stamp seals

## Architecture
- **Frontend**: React 19, react-router-dom, Tailwind. Data-driven service catalog at `/app/frontend/src/data/services.js` feeds one `ServicePage` template.
- **Backend**: FastAPI. Routes under `/api`: `/health`, `/leads` (POST/GET), `/contact` (POST). MongoDB collections: `leads`, `contacts`. References formatted as `RT/Q/YYYYMMDD/XXXXXX` and `RT/C/…`.
- **Design tokens** in `tailwind.config.js`: `ink #12203D`, `paper #F7F4EC`, `seal #C1272D`, `gold #C99A2E`, `approve #1E5631`, `slate2 #5B6472`. Fonts: Fraunces (display), Inter (body), IBM Plex Mono (mono).

## Implemented — 2025-12
- Home, 5 pillar hubs, service template applied to all ~30 services, multi-step quote page, About, Reviews, Contact
- Ink-stamp seal component (scroll-in animation, hover-stamp CTA), filing tabs, checklist steps, penalty callouts
- Backend: leads and contact endpoints with reference numbers persisted to MongoDB
- E2E tested — 100% pass on both backend and frontend flows (report: `/app/test_reports/iteration_1.json`)

## Backlog (deferred)
- **P0**: Lead delivery integration (Resend email + WhatsApp/Twilio) — user said "will integrate later"
- **P1**: Admin dashboard for leads (`/admin/leads`) with auth
- **P1**: Blog / knowledge base for SEO (each service already has structured content — easy to extend)
- **P2**: State-specific pricing overrides (Shop Act, FSSAI vary by state)
- **P2**: Compliance calendar page with month-by-month due dates
- **P2**: Live chat / WhatsApp click-to-chat pill
- **P2**: Client login area (dashboard, document uploads, filing status)

## Test credentials
Not applicable — public marketing site, no auth flows.
