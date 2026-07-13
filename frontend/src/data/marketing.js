/**
 * marketing.js — RightTeam data layer
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  STATUTORY DATA DISCLAIMER
 * The compliance filing data in `filingsFor()` (due dates, penalty figures,
 * interest rates) has been compiled from publicly available statutory sources
 * as of FY 2024-25. This data MUST be reviewed and signed off by a qualified
 * Chartered Accountant before it is relied upon in production. Penalties and
 * due dates change with Finance Act amendments, CBDT/CBIC circulars, and
 * extension notifications. Do not treat this data as legal or tax advice.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Team members — credential numbers are placeholders, confirm before launch
export const TEAM = [
  {
    name: "Rakesh Iyer",
    role: "Partner · Tax & Compliance",
    credentials: "FCA · ICAI M.No. [TO BE CONFIRMED]",
    tenure: "18 years · ex-Big 4",
    initials: "RI",
  },
  {
    name: "Nishtha Bansal",
    role: "Partner · Corporate Filings",
    credentials: "ACS · ICSI M.No. [TO BE CONFIRMED]",
    tenure: "12 years · MCA specialist",
    initials: "NB",
  },
  {
    name: "Vishal Rao",
    role: "Head of Intellectual Property",
    credentials: "Bar Council [TO BE CONFIRMED] · IPO Reg. [TO BE CONFIRMED]",
    tenure: "10 years · Registered patent agent",
    initials: "VR",
  },
  {
    name: "Meera Kulkarni",
    role: "Principal · Client Delivery",
    credentials: "ACA · ICAI M.No. [TO BE CONFIRMED]",
    tenure: "8 years · 2,000+ SME engagements",
    initials: "MK",
  },
  {
    name: "Karan Deshmukh",
    role: "Founder & CEO",
    credentials: "GST Practitioner Reg. [TO BE CONFIRMED]",
    tenure: "12 years · ex-founder",
    initials: "KD",
  },
  {
    name: "Anisha Rao",
    role: "Head of Certifications",
    credentials: "ACS · ICSI M.No. [TO BE CONFIRMED]",
    tenure: "9 years · ISO / MSME / FSSAI",
    initials: "AR",
  },
];

// Case study cards — generic industry case study placeholders
export const CASE_STUDIES = [
  {
    company: "Precision Manufacturing Partner",
    industry: "Precision manufacturing · Pune",
    challenge: "Three years of lapsed ROC filings; compounding director disqualification risk.",
    outcome: "Cleared 3 years of lapsed ROC filings in 6 weeks. Compounding fees negotiated 47% below original quote.",
    quote:
      "RightTeam sorted three years of ROC neglect in six weeks. They handled the compounding negotiation themselves — I never met the registrar.",
    person: "Finance Director",
    reference: "RT/CS/2025/041",
    timeline: [
      { date: "Week 1", title: "Document Audit", desc: "Three years of missing ROC filings mapped." },
      { date: "Week 3", title: "Petition Filed", desc: "Compounding application submitted to MCA." },
      { date: "Week 6", title: "Clean Registry", desc: "All backlogs resolved; penalty capped 47% lower." },
    ]
  },
  {
    company: "F&B Manufacturing Exporter",
    industry: "F&B manufacturing · Bengaluru",
    challenge: "Simultaneous GST registration, FSSAI State licence and IEC needed before first shipment.",
    outcome: "All three registrations issued in 12 working days — GSTIN in 5, FSSAI in 22, IEC same-day.",
    quote:
      "We had a container waiting at Chennai port. RightTeam ran GST, FSSAI and IEC in parallel. Officer queries were answered same day.",
    person: "Managing Director",
    reference: "RT/CS/2025/078",
    timeline: [
      { date: "Day 1", title: "Submissions", desc: "GST, FSSAI & IEC applications filed in parallel." },
      { date: "Day 5", title: "GSTIN Issued", desc: "Officer queries cleared within 4 hours." },
      { date: "Day 12", title: "Licenses Live", desc: "FSSAI & IEC active; container successfully released." },
    ]
  },
  {
    company: "Regional Logistics & Warehousing LLP",
    industry: "Logistics · Gurugram",
    challenge: "62-employee payroll with PF, ESI, TDS and monthly GST spread across four vendors.",
    outcome: "Consolidated payroll, PF, ESI, TDS and GST onto one dashboard. Saved two full-time hires.",
    quote:
      "Four vendors, four spreadsheets, four excuses. RightTeam collapsed all of that into one dashboard and one manager.",
    person: "Chief Financial Officer",
    reference: "RT/CS/2025/113",
    timeline: [
      { date: "Month 1", title: "Consolidation", desc: "Transferred records from four different agencies." },
      { date: "Month 2", title: "Automation", desc: "Configured direct integration for PF, ESI & TDS." },
      { date: "Ongoing", title: "Optimised", desc: "Dashboard live with single account manager accountability." },
    ]
  },
];

// Comparison matrix
export const COMPARISON = {
  columns: [
    { key: "rt", label: "RightTeam", highlight: true },
    { key: "others", label: "Others" },
  ],
  rows: [
    { feature: "Turnaround for GST registration", rt: "yes", others: "14-20 days" },
    { feature: "Dedicated manager", rt: "yes", others: "No" },
    { feature: "Fixed-fee pricing", rt: "yes", others: "Varies / No" },
    { feature: "On-time filing guarantee", rt: "yes", others: "No" },
    { feature: "Government fees disclosed upfront", rt: "yes", others: "No" },
    { feature: "In-house CA, CS and IP attorneys", rt: "yes", others: "No / Rare" },
    { feature: "WhatsApp updates on filing status", rt: "yes", others: "No / Rare" },
  ],
};

// Placeholder client logos — left intentionally empty for SegmentedLogoWall.
// Populate CLIENT_LOGOS only with real, permission-cleared names.
export const CLIENT_LOGOS = [];

// Entity type options for the compliance risk calculator
export const ENTITY_TYPES = [
  { key: "sole-prop", label: "Sole Proprietorship" },
  { key: "partnership", label: "Partnership Firm" },
  { key: "llp", label: "LLP" },
  { key: "opc", label: "One Person Company" },
  { key: "pvt-ltd", label: "Private Limited Company" },
  { key: "public-ltd", label: "Public Limited Company" },
];

export const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry",
  "Dadra & Nagar Haveli and Daman & Diu", "Andaman & Nicobar Islands",
  "Lakshadweep",
];

// ─────────────────────────────────────────────────────────────────────────────
// STATUTORY FILING DATA
// Source: Income Tax Act 1961, CGST Act 2017, Companies Act 2013, LLP Act 2008,
//         EPF & MP Act 1952, ESI Act 1948 — as amended up to Finance Act 2024.
// ⚠️ MUST BE REVIEWED BY A QUALIFIED CA BEFORE PRODUCTION USE.
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_TAX = [
  {
    name: "GSTR-3B (monthly GST return)",
    due: "20th of following month (22nd/24th for QRMP filers)",
    penalty: "₹50/day for returns with tax liability; ₹20/day for nil returns. 18% p.a. interest on unpaid tax. Maximum late fee ₹10,000 per return.",
    severity: "high",
  },
  {
    name: "GSTR-1 (outward supplies)",
    due: "11th of following month (13th for QRMP filers, quarterly)",
    penalty: "₹50/day (₹20 for nil returns). Late filing blocks recipient's ITC.",
    severity: "high",
  },
  {
    name: "Income Tax Return — Sec 139(1)",
    due: "31 July (non-audit entities); 31 October (tax-audit entities); 30 November (transfer pricing cases)",
    penalty: "₹5,000 under Sec 234F if filed after due date (₹1,000 if total income ≤ ₹5 lakh). 1% per month interest on unpaid tax under Sec 234A. Loss carry-forward disallowed if return is belated.",
    severity: "high",
  },
  {
    name: "TDS Quarterly Return (Form 24Q / 26Q / 27Q)",
    due: "31 Jul (Q1), 31 Oct (Q2), 31 Jan (Q3), 31 May (Q4)",
    penalty: "₹200/day under Sec 234E (capped at TDS amount). Penalty of ₹10,000–₹1,00,000 under Sec 271H for delayed/incorrect filing. Interest at 1%/month for late TDS deduction; 1.5%/month for late TDS deposit.",
    severity: "medium",
  },
  {
    name: "Advance Tax (Sec 207 — corporates & individuals)",
    due: "15% by 15 Jun · 45% by 15 Sep · 75% by 15 Dec · 100% by 15 Mar",
    penalty: "1% per month interest under Sec 234B (if advance tax paid < 90% of assessed tax) and Sec 234C (instalment shortfall).",
    severity: "medium",
  },
];

const CORPORATE = [
  {
    name: "ROC AOC-4 (annual financial statements)",
    due: "Within 30 days of AGM (AGM must be held within 6 months of FY end)",
    penalty: "₹100/day per form with no upper cap (Sec 137, Companies Act 2013). Director disqualification risk after sustained default.",
    severity: "high",
  },
  {
    name: "ROC MGT-7 / MGT-7A (annual return)",
    due: "Within 60 days of AGM",
    penalty: "₹100/day per form with no upper cap (Sec 92). Continued default → strike-off u/s 248.",
    severity: "high",
  },
  {
    name: "DIR-3 KYC (annual director KYC)",
    due: "30 September every year",
    penalty: "DIN deactivated on 1 October if not filed. Reactivation fee: ₹5,000 per director (Form DIR-3 KYC-Web).",
    severity: "medium",
  },
  {
    name: "MSME payment disclosure (Sec 43B(h))",
    due: "With each ITR filing — payments to MSMEs must be made within 45 days",
    penalty: "Deduction disallowed as expense if payment delayed beyond 45 days. Add-back increases taxable income.",
    severity: "medium",
  },
  {
    name: "Board Meeting Minutes (Sec 173)",
    due: "Minimum 4 board meetings/year; gap between any two meetings ≤ 120 days",
    penalty: "Penalty on company (₹25,000) and every officer in default (₹5,000). CS attestation issue at audit if minutes aren't recorded.",
    severity: "low",
  },
];

const LLP_ONLY = [
  {
    name: "LLP Form 11 (annual return)",
    due: "30 May every year",
    penalty: "₹100/day with no upper cap. Default for 3 consecutive years → LLP designated for strike-off.",
    severity: "high",
  },
  {
    name: "LLP Form 8 (statement of accounts & solvency)",
    due: "30 October every year",
    penalty: "₹100/day with no upper cap.",
    severity: "high",
  },
  {
    name: "LLP DIR-3 KYC (designated partners)",
    due: "30 September every year",
    penalty: "DPIN deactivated if not filed. ₹5,000 per partner reactivation fee.",
    severity: "medium",
  },
];

const PAYROLL_IF_EMPLOYEES = [
  {
    name: "PF Monthly ECR (EPF & MP Act 1952)",
    due: "15th of following month (challan payment); ECR upload same date",
    penalty: "Interest at 12% p.a. on delayed contributions. Damages: 5% p.a. for delay ≤ 2 months, 10% for 2–4 months, 15% for 4–6 months, 25% p.a. beyond 6 months. Criminal prosecution possible for wilful default.",
    severity: "high",
  },
  {
    name: "ESI Monthly Contribution (ESI Act 1948)",
    due: "15th of following month",
    penalty: "Interest at 12% p.a. on delayed contributions. Prosecution and imprisonment (up to 3 years for repeat default) under Sec 85 ESI Act.",
    severity: "high",
  },
  {
    name: "Professional Tax — Maharashtra",
    due: "Last day of each month (monthly filer) or as per state schedule",
    penalty: "Under Maharashtra State Tax on Professions Act: penalty equal to unpaid tax + interest at 1.25%/month. Show-cause notice for non-registration.",
    severity: "medium",
  },
];

// State-specific professional tax notes (shown contextually based on state selection)
export const STATE_PT_NOTES = {
  "Maharashtra": "PT applicable. Employer PT: slab-based up to ₹2,500/month. Employee PT deducted per salary slab under MPS Act 1975.",
  "Karnataka": "PT applicable. Employee PT up to ₹200/month. Employer enrolled separately with Commercial Taxes Dept.",
  "Delhi": "No Professional Tax in Delhi — Delhi is exempt.",
  "Tamil Nadu": "PT applicable. Employee PT ₹208.33/month (₹2,500/year). Employer enrolment with Commercial Tax Dept.",
  "Telangana": "PT applicable. Slab-based up to ₹2,500/year. Registration with Commercial Tax Dept.",
  "Gujarat": "PT applicable. Rate up to ₹2,500/year. Employer deducts from employee salary monthly.",
  "West Bengal": "PT applicable. Rate up to ₹2,500/year.",
};

/**
 * filingsFor — returns the list of statutory filings applicable to a given entity type.
 * @param {string} entity - entity type key from ENTITY_TYPES
 * @param {boolean} employees - whether the entity has employees on payroll
 * @returns {Array} filing objects with name, due, penalty, severity fields
 *
 * ⚠️ Data needs CA review before production. See disclaimer at top of file.
 */
export const filingsFor = (entity, employees = false) => {
  const list = [];
  list.push(...COMMON_TAX);
  if (["opc", "pvt-ltd", "public-ltd"].includes(entity)) list.push(...CORPORATE);
  if (entity === "llp") list.push(...LLP_ONLY, CORPORATE[2]); // DIR-3 KYC equivalent
  if (employees) list.push(...PAYROLL_IF_EMPLOYEES);
  return list;
};
