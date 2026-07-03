// Central catalog: 5 pillars, ~30 services. Each service has enough content
// to feed the reusable ServicePage template.

export const PILLARS = [
  {
    slug: "start-a-business",
    label: "Start a Business",
    tagline: "Incorporation and registration filed by chartered accountants and company secretaries.",
    intro:
      "Entity structuring, MCA incorporation, DSC, PAN, TAN, IEC and Startup India recognition — every certificate required for Day-1 operations, filed under one engagement.",
    framing: "benefit",
  },
  {
    slug: "protect-your-brand",
    label: "Protect Your Brand",
    tagline: "Intellectual property filings drafted and prosecuted by registered attorneys.",
    intro:
      "Trademark, copyright and patent filings prepared and prosecuted by Bar Council-registered attorneys and IPO-registered patent agents. Registry correspondence handled end-to-end.",
    framing: "benefit",
  },
  {
    slug: "tax-compliance",
    label: "Tax & Compliance",
    tagline: "Statutory returns filed before the due date. Penalty exposure managed proactively.",
    intro:
      "GST, TDS, income tax and ROC returns filed by ICAI and ICSI members. Every return reconciled and reviewed with you before submission, filed within statutory due dates.",
    framing: "loss",
  },
  {
    slug: "people-money",
    label: "People & Money",
    tagline: "Payroll, statutory contributions and financial reporting managed as an outsourced function.",
    intro:
      "End-to-end payroll, PF, ESI, TDS, bookkeeping and virtual CFO services delivered by qualified accountants and dedicated relationship managers.",
    framing: "benefit",
  },
  {
    slug: "grow-certify",
    label: "Grow & Certify",
    tagline: "Certifications required for enterprise tenders, marketplaces and export.",
    intro:
      "ISO 9001/14001/27001/45001, MSME/Udyam, FSSAI and state business licences — assessed, documented and issued through accredited certification bodies.",
    framing: "benefit",
  },
];

// Reusable process step templates
const filingProcess = [
  { title: "Share basic details", body: "Send us your PAN, Aadhaar and business info through a secure link." },
  { title: "We prepare the paperwork", body: "Your dedicated manager drafts all forms and supporting documents." },
  { title: "You review & sign", body: "Digital signature or DSC — approve everything before submission." },
  { title: "We file with the authority", body: "Filed the same day. You receive the acknowledgement on the spot." },
  { title: "Certificate delivered", body: "Government-issued certificate sent to your inbox and WhatsApp." },
];

const monthlyProcess = [
  { title: "Send us your data", body: "Upload invoices, bank statements or connect your accounting software." },
  { title: "Reconciliation", body: "Your manager reconciles GST returns, purchase and sales registers." },
  { title: "Draft return shared", body: "You review the return summary before filing — no surprises." },
  { title: "Filed before the due date", body: "Return filed, challan paid, acknowledgement stored in your dashboard." },
];

// helper
const p = (n) => `₹${n.toLocaleString("en-IN")}`;

export const SERVICES = [
  // ---------- Start a Business ----------
  {
    slug: "private-limited-company",
    pillar: "start-a-business",
    name: "Private Limited Company Registration",
    startingPrice: p(6999),
    oneLine: "The default structure for startups raising capital. 2 directors, limited liability, MCA registered.",
    heroSummary:
      "Register a Private Limited Company with the MCA in 10-14 working days. Includes DSC, DIN, name approval, incorporation certificate, PAN, TAN and MoA/AoA.",
    whatYouNeed: [
      "PAN & Aadhaar of all directors",
      "Passport-size photo of each director",
      "Address proof (Utility bill / bank statement, not older than 2 months)",
      "Registered office proof (Rent agreement or NOC + utility bill)",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [
      { q: "How long does it take?", a: "10 to 14 working days end-to-end, subject to MCA processing." },
      { q: "How many directors do I need?", a: "Minimum 2 directors, at least one must be a resident Indian." },
      { q: "Is a physical office required?", a: "No, a valid registered address is enough — a residential address works." },
      { q: "What's included in the fee?", a: "Government fees, DSC for 2 directors, DIN, name approval, incorporation, PAN and TAN." },
    ],
  },
  {
    slug: "one-person-company",
    pillar: "start-a-business",
    name: "One Person Company (OPC) Registration",
    startingPrice: p(5999),
    oneLine: "For solo founders who want limited liability without a co-founder.",
    heroSummary:
      "Register your OPC with the MCA and operate as a company with a single member. Includes DSC, DIN, name approval and incorporation certificate.",
    whatYouNeed: [
      "PAN & Aadhaar of the sole member",
      "Nominee's PAN & consent",
      "Address proof (utility bill, bank statement)",
      "Registered office proof",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [
      { q: "Can I convert OPC to Pvt Ltd later?", a: "Yes, mandatorily on crossing ₹2 crore turnover or ₹50 lakh paid-up capital." },
    ],
  },
  {
    slug: "llp-registration",
    pillar: "start-a-business",
    name: "LLP Registration",
    startingPrice: p(5499),
    oneLine: "Partnership flexibility with the safety of limited liability.",
    heroSummary:
      "Incorporate a Limited Liability Partnership under the LLP Act, 2008. Includes DPIN, name approval, incorporation and LLP agreement drafting.",
    whatYouNeed: [
      "PAN & Aadhaar of all partners",
      "Address proof of each partner",
      "Registered office proof",
      "LLP agreement contribution details",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "section-8-ngo",
    pillar: "start-a-business",
    name: "Section 8 / NGO Registration",
    startingPrice: p(12999),
    oneLine: "Non-profit company registration for charitable, educational or social causes.",
    heroSummary:
      "Register a Section 8 company with MCA licence, incorporation certificate and object clause drafted for your cause.",
    whatYouNeed: [
      "PAN & Aadhaar of directors",
      "Project plan and estimated income/expenditure",
      "Registered office proof",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "public-limited-company",
    pillar: "start-a-business",
    name: "Public Limited Company Registration",
    startingPrice: p(24999),
    oneLine: "For businesses planning to raise capital from the public or list.",
    heroSummary:
      "Full-service public limited company incorporation with minimum 7 shareholders and 3 directors, MoA/AoA and MCA certificate.",
    whatYouNeed: ["PAN & Aadhaar of directors and shareholders", "Registered office proof", "Draft MoA/AoA inputs"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "partnership-firm",
    pillar: "start-a-business",
    name: "Partnership Firm Registration",
    startingPrice: p(2999),
    oneLine: "The simplest way for two or more people to run a business together.",
    heroSummary:
      "Draft your partnership deed and register the firm with the Registrar of Firms in your state.",
    whatYouNeed: ["PAN & Aadhaar of all partners", "Address proof of the firm", "Partnership terms (profit share, roles)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "startup-india-recognition",
    pillar: "start-a-business",
    name: "Startup India Recognition",
    startingPrice: p(4999),
    oneLine: "DPIIT recognition to unlock tax exemptions, tender benefits and government grants.",
    heroSummary:
      "Apply for DPIIT recognition under the Startup India scheme. Includes pitch deck alignment, application filing and follow-up.",
    whatYouNeed: ["Incorporation certificate", "PAN of the entity", "Brief on innovation / product", "Website / pitch deck"],
    process: filingProcess.slice(0, 4),
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "company-name-search",
    pillar: "start-a-business",
    name: "Company Name Search & Reservation",
    startingPrice: p(1999),
    oneLine: "Reserve your company name with MCA before someone else does.",
    heroSummary:
      "MCA name search, availability check and RUN (Reserve Unique Name) filing with 2 name options.",
    whatYouNeed: ["Preferred company names (up to 2)", "Objects of the proposed company"],
    process: filingProcess.slice(0, 4),
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "digital-signature-certificate",
    pillar: "start-a-business",
    name: "Digital Signature Certificate (DSC)",
    startingPrice: p(1499),
    oneLine: "Class 3 DSC for company filings, GST, ROC and tenders.",
    heroSummary:
      "Get a Class 3 DSC issued by a licensed certifying authority. Delivered on USB token, valid for 2 years.",
    whatYouNeed: ["PAN & Aadhaar", "Passport-size photo", "Mobile & email for OTP verification"],
    process: filingProcess.slice(0, 4),
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "import-export-code",
    pillar: "start-a-business",
    name: "Import Export Code (IEC)",
    startingPrice: p(2499),
    oneLine: "10-digit IEC from DGFT — mandatory to move goods or services across the border.",
    heroSummary:
      "DGFT IEC application, filing and certificate delivery. Lifetime validity, one-time registration.",
    whatYouNeed: ["PAN of business", "Bank certificate or cancelled cheque", "Address proof of business"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },

  // ---------- Protect Your Brand ----------
  {
    slug: "trademark-filing",
    pillar: "protect-your-brand",
    name: "Trademark Search & Filing",
    startingPrice: p(4499),
    oneLine: "File your ™ with the Trademark Registry in the right class. Get the ® once granted.",
    heroSummary:
      "Public search, class selection, TM-A filing and status tracking until registration or objection. Covers 1 class, 1 mark.",
    whatYouNeed: [
      "Brand name / logo (in vector or high-res)",
      "Applicant details (individual or entity)",
      "Description of goods or services",
      "Date of first use (if any)",
    ],
    process: [
      { title: "Public search", body: "We check the TM registry for identical or deceptively similar marks in your class." },
      { title: "Class & specification", body: "Right class picked, specification drafted to maximise protection." },
      { title: "TM-A filed", body: "Application filed. You can start using ™ from Day 1." },
      { title: "Examination & journal", body: "We respond to examination reports and monitor journal publication." },
      { title: "Registration certificate", body: "Once accepted and unopposed, the ® certificate is issued." },
    ],
    framing: "benefit",
    faqs: [
      { q: "How long till I can use ®?", a: "Typically 12-18 months if unopposed. You can use ™ from the filing date." },
      { q: "One class or multi-class?", a: "Base price is for one class, one mark. Add-ons available for more classes." },
    ],
  },
  {
    slug: "trademark-objection-reply",
    pillar: "protect-your-brand",
    name: "Trademark Objection Reply",
    startingPrice: p(3999),
    oneLine: "Received a TM examination report? We draft and file the reply within 30 days.",
    heroSummary:
      "Reply drafted by a trademark attorney addressing every ground of objection, filed before the 30-day deadline.",
    whatYouNeed: ["Examination report", "Original TM application details", "Any prior use evidence"],
    process: filingProcess.slice(0, 4),
    framing: "loss",
    penalty: "Miss the 30-day reply window and your trademark application is treated as abandoned. Refiling means starting over — new fees, new priority date.",
    faqs: [],
  },
  {
    slug: "trademark-renewal",
    pillar: "protect-your-brand",
    name: "Trademark Renewal",
    startingPrice: p(4999),
    oneLine: "Renew every 10 years. Skip it and you lose the mark.",
    heroSummary:
      "TM-R filing, government fee handling and renewal certificate delivery. We start reminders 6 months before expiry.",
    whatYouNeed: ["Registration number", "Current owner details", "Renewal fee"],
    process: filingProcess.slice(0, 4),
    framing: "loss",
    penalty: "If you don't renew within 6 months of expiry, the mark can be removed from the register. Restoration fees are steep and success isn't guaranteed.",
    faqs: [],
  },
  {
    slug: "trademark-assignment",
    pillar: "protect-your-brand",
    name: "Trademark Licensing & Assignment",
    startingPrice: p(6999),
    oneLine: "Sell, transfer or license your trademark on paper the Registry accepts.",
    heroSummary:
      "Deed drafting, TM-P filing and Registry recording of your assignment or licence.",
    whatYouNeed: ["Assignor & assignee details", "Trademark registration certificate", "Commercial terms of the deal"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "copyright-registration",
    pillar: "protect-your-brand",
    name: "Copyright Registration",
    startingPrice: p(3999),
    oneLine: "Register copyright over software, literary work, music, film or artwork.",
    heroSummary:
      "Application drafting, filing with the Copyright Office and delivery of the Diary Number and eventual certificate.",
    whatYouNeed: ["The work (soft copy)", "Author details", "Nature of work"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "patent-filing",
    pillar: "protect-your-brand",
    name: "Patent Filing",
    startingPrice: p(19999),
    oneLine: "Provisional or complete patent filing with an IP attorney.",
    heroSummary:
      "Patentability search, specification drafting, filing at the Indian Patent Office and response to examination.",
    whatYouNeed: ["Invention disclosure", "Diagrams / drawings", "Inventor details", "Assignee details (if any)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },

  // ---------- Tax & Compliance ----------
  {
    slug: "gst-registration",
    pillar: "tax-compliance",
    name: "GST Registration",
    startingPrice: p(1999),
    oneLine: "Get your GSTIN in 5-7 working days. Mandatory above ₹40 lakh turnover.",
    heroSummary:
      "GSTIN application, ARN generation, officer query handling and GST certificate delivery. Includes state-specific compliance guidance.",
    whatYouNeed: [
      "PAN of business",
      "Aadhaar of proprietor / partners / directors",
      "Address proof of principal place of business",
      "Bank account details (cancelled cheque)",
      "Digital signature (for companies / LLPs)",
    ],
    process: filingProcess,
    framing: "loss",
    penalty:
      "Operating without GST when you should be registered: penalty of 10% of the tax due (minimum ₹10,000). For deliberate evasion, penalty rises to 100% of the tax and interest.",
    faqs: [
      { q: "Is GST mandatory for my business?", a: "Yes if turnover exceeds ₹40 lakh (₹20 lakh for services, ₹10 lakh in special-category states) or if you sell inter-state." },
      { q: "How long does GST registration take?", a: "5-7 working days once documents are complete and Aadhaar authentication is done." },
      { q: "Can I register voluntarily below the threshold?", a: "Yes — voluntary registration lets you claim input tax credit and gives you a GSTIN for B2B customers." },
    ],
  },
  {
    slug: "gst-monthly-filing",
    pillar: "tax-compliance",
    name: "GST Monthly / Annual Filing",
    startingPrice: p(999),
    oneLine: "GSTR-1, GSTR-3B and annual GSTR-9 — filed on time, every time.",
    heroSummary:
      "End-to-end GST return filing: sales register, purchase reconciliation, GSTR-2B match, GSTR-3B and challan payment.",
    whatYouNeed: ["Sales invoices for the month", "Purchase invoices", "Bank statement", "Previous returns filed"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Late filing: ₹50 per day (₹20 for nil returns) plus interest of 18% p.a. on unpaid tax. Two missed returns can lead to GSTIN suspension and blocked e-way bills.",
    faqs: [
      { q: "What's the GSTR-3B due date?", a: "20th of the following month for most taxpayers; 22nd or 24th for QRMP filers." },
      { q: "Can you handle backdated returns?", a: "Yes — we file pending returns and calculate late fees and interest transparently." },
    ],
  },
  {
    slug: "income-tax-return",
    pillar: "tax-compliance",
    name: "Income Tax Return (ITR) Filing",
    startingPrice: p(1499),
    oneLine: "ITR-1 to ITR-7 filed by a chartered accountant. Refunds tracked till credit.",
    heroSummary:
      "We pick the right ITR form, compute your tax, claim every deduction, e-verify and follow up on the refund.",
    whatYouNeed: ["PAN & Aadhaar", "Form 16 / income proofs", "Bank statements", "Investment proofs", "Previous year's ITR"],
    process: filingProcess.slice(0, 4),
    framing: "loss",
    penalty:
      "Late ITR filing: up to ₹5,000 under Section 234F, plus 1% interest per month on unpaid tax. Miss the belated deadline and you can't carry forward losses.",
    faqs: [],
  },
  {
    slug: "tds-return-filing",
    pillar: "tax-compliance",
    name: "TDS Return Filing",
    startingPrice: p(1499),
    oneLine: "Quarterly Form 24Q, 26Q, 27Q filing with correct challan mapping.",
    heroSummary:
      "TDS computation, challan payment reconciliation, quarterly return filing and Form 16 / 16A generation.",
    whatYouNeed: ["Deductee list with PAN", "Challan copies", "Salary details (for 24Q)"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Late TDS return: ₹200 per day (capped at TDS amount). Interest of 1.5% per month on late TDS deposit. Non-deduction is disallowed as expense under Section 40(a).",
    faqs: [],
  },
  {
    slug: "roc-annual-filing",
    pillar: "tax-compliance",
    name: "ROC Annual Filing",
    startingPrice: p(3999),
    oneLine: "AOC-4, MGT-7 and MGT-7A filed for companies and LLPs.",
    heroSummary:
      "Annual return and financial statement filing with the ROC, including board resolutions and attestation.",
    whatYouNeed: ["Audited financial statements", "Board resolution copies", "Director details", "Shareholding pattern"],
    process: filingProcess,
    framing: "loss",
    penalty:
      "Late ROC filing: ₹100 per day per form with no maximum cap. Continued default disqualifies directors and can strike off the company from the register.",
    faqs: [],
  },
  {
    slug: "dir-3-kyc",
    pillar: "tax-compliance",
    name: "DIR-3 KYC",
    startingPrice: p(999),
    oneLine: "Annual director KYC. Miss it and your DIN is deactivated.",
    heroSummary:
      "DIR-3 KYC filing with DSC and OTP verification. Turnaround: same day.",
    whatYouNeed: ["Director DIN", "PAN & Aadhaar", "DSC", "Personal mobile & email"],
    process: filingProcess.slice(0, 4),
    framing: "loss",
    penalty:
      "Miss the September 30 deadline and your DIN is deactivated. Reactivation costs ₹5,000 per director as a late fee.",
    faqs: [],
  },
  {
    slug: "director-share-changes",
    pillar: "tax-compliance",
    name: "Director / Share / Capital Changes",
    startingPrice: p(3499),
    oneLine: "Add or remove a director, transfer shares, change capital — filed correctly.",
    heroSummary:
      "DIR-12, PAS-3, SH-7 and MGT-14 filings with board resolutions and attestation.",
    whatYouNeed: ["Board resolution copies", "Consent letters", "Existing MoA/AoA"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "company-closure",
    pillar: "tax-compliance",
    name: "Company / LLP / OPC Closure",
    startingPrice: p(14999),
    oneLine: "Strike-off filing so a dormant entity stops accumulating penalties.",
    heroSummary:
      "STK-2 (companies) or Form 24 (LLP) closure filing, including bank account closure and creditor NOCs.",
    whatYouNeed: ["Board resolution for closure", "Latest financial statements", "Bank closure certificate", "Directors' affidavit"],
    process: filingProcess,
    framing: "loss",
    penalty:
      "A dormant company still owes ROC and IT filings. Skip them and penalties compound at ₹100/day per form — often more than the closure cost within a year.",
    faqs: [],
  },

  // ---------- People & Money ----------
  {
    slug: "payroll-management",
    pillar: "people-money",
    name: "Payroll Management",
    startingPrice: p(3999),
    oneLine: "Monthly payroll, payslips, TDS, PF and ESI — one dashboard, one manager.",
    heroSummary:
      "Salary computation, statutory deduction, payslip generation and monthly compliance filings for teams of 5 to 500.",
    whatYouNeed: ["Employee master data", "Attendance & leave data", "CTC breakup structure"],
    process: monthlyProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "pf-registration-filing",
    pillar: "people-money",
    name: "PF Registration & Filing",
    startingPrice: p(3499),
    oneLine: "EPFO registration and monthly ECR filing — mandatory above 20 employees.",
    heroSummary:
      "EPFO code generation, employee mapping, monthly ECR upload and challan payment reconciliation.",
    whatYouNeed: ["PAN of employer", "Address proof", "Employee list with UAN (if any)"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Delayed PF deposit: interest at 12% p.a. plus damages up to 25% p.a. Non-registration when applicable can attract prosecution under the EPF Act.",
    faqs: [],
  },
  {
    slug: "esi-registration-filing",
    pillar: "people-money",
    name: "ESI Registration & Filing",
    startingPrice: p(2999),
    oneLine: "ESIC code, half-yearly returns and monthly contribution filing.",
    heroSummary:
      "ESIC registration, employee mapping and monthly contribution filing with challan reconciliation.",
    whatYouNeed: ["PAN of employer", "Address proof", "Employee list with salary details"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Late ESI contribution: interest at 12% p.a. Prosecution and imprisonment possible for wilful default under the ESI Act.",
    faqs: [],
  },
  {
    slug: "accounting-bookkeeping",
    pillar: "people-money",
    name: "Accounting & Bookkeeping",
    startingPrice: p(4999),
    oneLine: "Books closed monthly. Audit-ready every quarter.",
    heroSummary:
      "Daily transaction posting, monthly ledger reconciliation, P&L and balance sheet delivered by the 10th of every month.",
    whatYouNeed: ["Bank statements", "Sales & purchase invoices", "Expense receipts", "Payroll data"],
    process: monthlyProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "virtual-cfo",
    pillar: "people-money",
    name: "Virtual CFO Services",
    startingPrice: p(24999),
    oneLine: "A part-time finance leader for growing businesses. Board-ready reports monthly.",
    heroSummary:
      "Cash-flow forecasting, MIS reporting, fund-raise readiness and finance strategy — retained monthly.",
    whatYouNeed: ["Access to accounting software", "Bank data feeds", "Business plan / targets"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },

  // ---------- Grow & Certify ----------
  {
    slug: "iso-certification",
    pillar: "grow-certify",
    name: "ISO Certification",
    startingPrice: p(4999),
    oneLine: "ISO 9001, 14001, 27001, 45001 — chosen and issued by accredited bodies.",
    heroSummary:
      "Gap assessment, documentation, audit coordination and certificate delivery from an accredited certification body.",
    whatYouNeed: ["Company registration certificate", "PAN", "Nature of business", "Existing SOPs (if any)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "msme-udyam",
    pillar: "grow-certify",
    name: "MSME / Udyam Registration",
    startingPrice: p(1499),
    oneLine: "Unlock lower interest rates, government tenders and delayed-payment protection.",
    heroSummary:
      "Udyam registration on the government portal with Aadhaar-linked business details and certificate issue.",
    whatYouNeed: ["Aadhaar of proprietor / signatory", "PAN of business", "Bank details", "Business activity code (NIC)"],
    process: filingProcess.slice(0, 4),
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "fssai-registration",
    pillar: "grow-certify",
    name: "FSSAI Registration",
    startingPrice: p(2499),
    oneLine: "Mandatory for anyone selling, storing or manufacturing food. Basic, State or Central licence.",
    heroSummary:
      "We pick the right FSSAI category (Basic / State / Central) based on your turnover and file the application end-to-end.",
    whatYouNeed: ["Business proof", "Address proof", "Food category list", "Owner ID proof"],
    process: filingProcess,
    framing: "loss",
    penalty:
      "Operating without a valid FSSAI licence: fine up to ₹5 lakh and up to 6 months imprisonment for repeat offences under the FSS Act.",
    faqs: [],
  },
  {
    slug: "business-licenses",
    pillar: "grow-certify",
    name: "Business Licenses (Shop Act, Trade License)",
    startingPrice: p(1999),
    oneLine: "Shop & Establishment, Trade License, Professional Tax — state-specific filings.",
    heroSummary:
      "Application drafting, state portal filing and follow-up until the licence is issued and displayed at your premises.",
    whatYouNeed: ["Address proof of premises", "Rent agreement / ownership proof", "Owner KYC", "Employee count"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
];

export const findService = (slug) => SERVICES.find((s) => s.slug === slug);
export const findPillar = (slug) => PILLARS.find((p) => p.slug === slug);
export const servicesByPillar = (slug) => SERVICES.filter((s) => s.pillar === slug);
