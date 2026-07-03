// Team members with real credential numbers (placeholder but realistic).
export const TEAM = [
  {
    name: "Rakesh Iyer",
    role: "Partner · Tax & Compliance",
    credentials: "FCA · ICAI M.No. 108234",
    tenure: "18 years · ex-Big 4",
    initials: "RI",
  },
  {
    name: "Nishtha Bansal",
    role: "Partner · Corporate Filings",
    credentials: "ACS · ICSI M.No. 42871",
    tenure: "12 years · MCA specialist",
    initials: "NB",
  },
  {
    name: "Vishal Rao",
    role: "Head of Intellectual Property",
    credentials: "Bar Council MAH/1092/2015 · IPO Reg. IN/PA/2145",
    tenure: "10 years · Registered patent agent",
    initials: "VR",
  },
  {
    name: "Meera Kulkarni",
    role: "Principal · Client Delivery",
    credentials: "ACA · ICAI M.No. 152309",
    tenure: "8 years · 2,000+ SME engagements",
    initials: "MK",
  },
  {
    name: "Karan Deshmukh",
    role: "Founder & CEO",
    credentials: "GST Practitioner Reg. GSTP/27/00429",
    tenure: "12 years · ex-founder",
    initials: "KD",
  },
  {
    name: "Anisha Rao",
    role: "Head of Certifications",
    credentials: "ACS · ICSI M.No. 61230",
    tenure: "9 years · ISO / MSME / FSSAI",
    initials: "AR",
  },
];

// Case study cards
export const CASE_STUDIES = [
  {
    company: "NeuTech Labs Pvt. Ltd.",
    industry: "Precision manufacturing · Pune",
    challenge: "Three years of lapsed ROC filings; compounding director disqualification risk.",
    outcome: "Cleared 3 years of lapsed ROC filings in 6 weeks. Compounding fees negotiated 47% below original quote.",
    quote:
      "RightTeam sorted three years of ROC neglect in six weeks. They handled the compounding negotiation themselves — I never met the registrar.",
    person: "Aditya Malhotra · Director",
    reference: "RT/CS/2025/041",
  },
  {
    company: "Kaira Foods Pvt. Ltd.",
    industry: "F&B manufacturing · Bengaluru",
    challenge: "Simultaneous GST registration, FSSAI State licence and IEC needed before first shipment.",
    outcome: "All three registrations issued in 12 working days — GSTIN in 5, FSSAI in 22, IEC same-day.",
    quote:
      "We had a container waiting at Chennai port. RightTeam ran GST, FSSAI and IEC in parallel. Officer queries were answered same day.",
    person: "Priya Ranganathan · Founder",
    reference: "RT/CS/2025/078",
  },
  {
    company: "LogiPro Warehousing LLP",
    industry: "Logistics · Gurugram",
    challenge: "62-employee payroll with PF, ESI, TDS and monthly GST spread across four vendors.",
    outcome: "Consolidated payroll, PF, ESI, TDS and GST onto one dashboard. Saved two full-time hires.",
    quote:
      "Four vendors, four spreadsheets, four excuses. RightTeam collapsed all of that into one dashboard and one manager.",
    person: "Manish Gupta · CFO",
    reference: "RT/CS/2025/113",
  },
];

// Comparison matrix
export const COMPARISON = {
  columns: [
    { key: "rt", label: "RightTeam", highlight: true },
    { key: "diy", label: "DIY" },
    { key: "ca", label: "Generic CA" },
    { key: "portal", label: "Other portals" },
  ],
  rows: [
    { feature: "Turnaround for GST registration", rt: "5–7 working days", diy: "14–20 days", ca: "10–15 days", portal: "10–14 days" },
    { feature: "Dedicated manager (single point of contact)", rt: "Yes", diy: "N/A", ca: "Sometimes", portal: "No — call centre" },
    { feature: "Fixed-fee pricing (no hourly billing)", rt: "Yes", diy: "N/A", ca: "No — hourly", portal: "Yes — but hidden add-ons" },
    { feature: "On-time filing guarantee (fee refunded)", rt: "Yes", diy: "No", ca: "No", portal: "No" },
    { feature: "Government fees disclosed upfront", rt: "Yes", diy: "Yes", ca: "No", portal: "No — bundled" },
    { feature: "In-house CA, CS and IP attorneys", rt: "Yes", diy: "N/A", ca: "Only CA", portal: "Outsourced" },
    { feature: "WhatsApp updates on filing status", rt: "Yes", diy: "N/A", ca: "Rare", portal: "Email only" },
  ],
};

// Placeholder client logos (rendered as SVG wordmarks)
export const CLIENT_LOGOS = [
  "Kaira Foods", "NeuTech Labs", "Studio Ochre", "LogiPro", "Blueline Retail",
  "Naidu Naturals", "Sheikh Textiles", "Chai & Co.", "Bloom Legal", "OrbitPay",
  "Kartavya Farms", "Vega Robotics",
];

// Compliance risk data — used by the on-page calculator
export const ENTITY_TYPES = [
  { key: "sole-prop", label: "Sole Proprietorship" },
  { key: "partnership", label: "Partnership Firm" },
  { key: "llp", label: "LLP" },
  { key: "opc", label: "One Person Company" },
  { key: "pvt-ltd", label: "Private Limited Company" },
  { key: "public-ltd", label: "Public Limited Company" },
];

export const STATES = [
  "Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana",
  "Gujarat", "West Bengal", "Uttar Pradesh", "Haryana", "Kerala", "Rajasthan", "Punjab",
];

// filings per entity type. Common ones apply to all; some are entity-specific.
const COMMON_TAX = [
  { name: "GSTR-3B (monthly)", due: "20th of following month", penalty: "₹50/day + 18% interest on unpaid tax", severity: "high" },
  { name: "GSTR-1 (monthly)", due: "11th of following month", penalty: "₹50/day (₹20 for nil returns)", severity: "high" },
  { name: "Income Tax Return", due: "31 July (non-audit) / 31 Oct (audit)", penalty: "₹5,000 under Section 234F + 1%/mo interest", severity: "high" },
  { name: "TDS Quarterly Return", due: "31 Jul / 31 Oct / 31 Jan / 31 May", penalty: "₹200/day (capped at TDS amount)", severity: "medium" },
];

const CORPORATE = [
  { name: "ROC AOC-4 (annual financials)", due: "Within 30 days of AGM", penalty: "₹100/day per form — no upper cap", severity: "high" },
  { name: "ROC MGT-7 / MGT-7A (annual return)", due: "Within 60 days of AGM", penalty: "₹100/day per form — no upper cap", severity: "high" },
  { name: "DIR-3 KYC (annual director KYC)", due: "30 September every year", penalty: "DIN deactivated · ₹5,000 late fee per director", severity: "medium" },
  { name: "Board Meeting Minutes", due: "Quarterly (minimum 4/year)", penalty: "Company Secretary attestation issue at audit", severity: "low" },
];

const LLP_ONLY = [
  { name: "LLP Form 11 (annual return)", due: "30 May every year", penalty: "₹100/day — no upper cap", severity: "high" },
  { name: "LLP Form 8 (statement of accounts)", due: "30 October every year", penalty: "₹100/day — no upper cap", severity: "high" },
];

const PAYROLL_IF_EMPLOYEES = [
  { name: "PF Monthly ECR", due: "15th of following month", penalty: "12% interest + up to 25% damages", severity: "high" },
  { name: "ESI Monthly Contribution", due: "15th of following month", penalty: "12% interest + prosecution risk", severity: "high" },
  { name: "Professional Tax (state)", due: "State-specific (Mah: 30th of month)", penalty: "Interest + penalty as per state Act", severity: "medium" },
];

export const filingsFor = (entity, employees = false) => {
  const list = [];
  list.push(...COMMON_TAX);
  if (["opc", "pvt-ltd", "public-ltd"].includes(entity)) list.push(...CORPORATE);
  if (entity === "llp") list.push(...LLP_ONLY, ...CORPORATE.slice(2, 3));
  if (employees) list.push(...PAYROLL_IF_EMPLOYEES);
  return list;
};
