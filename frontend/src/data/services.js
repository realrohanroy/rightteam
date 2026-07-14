// Central catalog: 5 pillars, ~30 services. Each service has enough content
// to feed the reusable ServicePage template.

export const PILLARS = [
  {
    slug: "start-your-business",
    label: "Start Your Business",
    tagline: "Incorporation and registration filed by chartered accountants and company secretaries.",
    intro:
      "Entity structuring, MCA incorporation, DSC, PAN, TAN, partnership deeds and startup recognition — every certificate required for Day-1 operations, filed under one engagement.",
    framing: "benefit",
  },
  {
    slug: "licences-registrations",
    label: "Licences & Registrations",
    tagline: "Tax, commercial and statutory registrations required to operate legally.",
    intro:
      "GST, Udyam, FSSAI, IEC, and GeM registrations — set up and approved in days so you can invoice clients, hire teams and import/export.",
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
    slug: "protect-your-brand",
    label: "Protect Your Brand",
    tagline: "Intellectual property filings drafted and prosecuted by registered attorneys.",
    intro:
      "Trademark, copyright and patent filings prepared and prosecuted by Bar Council-registered attorneys and IPO-registered patent agents. Registry correspondence handled end-to-end.",
    framing: "benefit",
  },
  {
    slug: "grow-your-business",
    label: "Grow Your Business",
    tagline: "Certifications required for enterprise tenders, marketplaces and export.",
    intro:
      "ISO, NSIC, APEDA registrations, and business advisory services — assessed, documented and delivered to accelerate your business growth.",
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
  // ---------- Start Your Business ----------
  {
    slug: "private-limited-company",
    pillar: "start-your-business",
    name: "Private Limited Company",
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
    slug: "llp-registration",
    pillar: "start-your-business",
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
    faqs: [
      { q: "What is the minimum capital for an LLP?", a: "There is no minimum capital requirement; partners can contribute any amount." },
    ],
  },
  {
    slug: "one-person-company",
    pillar: "start-your-business",
    name: "OPC Registration",
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
    slug: "partnership-firm",
    pillar: "start-your-business",
    name: "Partnership Firm (ROF)",
    startingPrice: p(2999),
    oneLine: "The simplest way for two or more people to run a registered business together.",
    heroSummary:
      "Draft your partnership deed and register the firm with the Registrar of Firms (ROF) in your state.",
    whatYouNeed: ["PAN & Aadhaar of all partners", "Address proof of the firm", "Partnership terms (profit share, roles)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "section-8-ngo",
    pillar: "start-your-business",
    name: "Section 8 Company",
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

  // ---------- Licences & Registrations ----------
  {
    slug: "gst-registration",
    pillar: "licences-registrations",
    name: "GST Registration",
    startingPrice: p(1999),
    oneLine: "Get your GSTIN in 5-7 working days. Mandatory above threshold limits.",
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
    ],
  },
  {
    slug: "msme-udyam",
    pillar: "licences-registrations",
    name: "Udyam Registration",
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
    slug: "startup-india-recognition",
    pillar: "licences-registrations",
    name: "Startup India",
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
    slug: "import-export-code",
    pillar: "licences-registrations",
    name: "IEC Registration",
    startingPrice: p(2499),
    oneLine: "10-digit IEC from DGFT — mandatory to move goods or services across the border.",
    heroSummary:
      "DGFT IEC application, filing and certificate delivery. Lifetime validity, one-time registration.",
    whatYouNeed: ["PAN of business", "Bank certificate or cancelled cheque", "Address proof of business"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "fssai-registration",
    pillar: "licences-registrations",
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
    slug: "gem-registration",
    pillar: "licences-registrations",
    name: "GeM Registration",
    startingPrice: p(3999),
    oneLine: "Register on Government e-Marketplace to sell goods or services directly to government departments.",
    heroSummary:
      "Complete GeM portal registration, primary/secondary user setup, profile creation, and brand/OEM support.",
    whatYouNeed: [
      "PAN of business",
      "Aadhaar of signatory (linked with mobile)",
      "GSTIN and Udyam details",
      "Bank account details & active email id",
    ],
    process: filingProcess.slice(0, 4),
    framing: "benefit",
    faqs: [
      { q: "Is GeM registration mandatory?", a: "No, but it is required if you want to participate in government tenders or sell directly to government buyers." },
    ],
  },

  // ---------- Tax & Compliance ----------
  {
    slug: "roc-annual-filing",
    pillar: "tax-compliance",
    name: "ROC Compliance",
    startingPrice: p(3999),
    oneLine: "AOC-4, MGT-7 and MGT-7A filed for companies and LLPs.",
    heroSummary:
      "Annual return and financial statement filing with the ROC, including board resolutions and designated partner/director KYC.",
    whatYouNeed: ["Audited financial statements", "Board resolution copies", "Director details", "Shareholding pattern"],
    process: filingProcess,
    framing: "loss",
    penalty:
      "Late ROC filing: ₹100/day per form with no maximum cap. Continued default disqualifies directors and can strike off the company from the register.",
    faqs: [],
  },
  {
    slug: "annual-filing",
    pillar: "tax-compliance",
    name: "Annual Filing",
    startingPrice: p(4999),
    oneLine: "Comprehensive annual statutory filings for LLPs, Proprietorships and Companies.",
    heroSummary:
      "Prepare and file all annual statutory reports, financial statements, and statements of solvency with appropriate authorities.",
    whatYouNeed: [
      "Audited financial statements / Books of accounts",
      "Bank statements",
      "Partner/Director details",
      "Previous year's filed returns",
    ],
    process: filingProcess,
    framing: "loss",
    penalty: "Late filings accumulate daily fines and interest, with risk of registration cancellation.",
    faqs: [],
  },
  {
    slug: "gst-monthly-filing",
    pillar: "tax-compliance",
    name: "GST Returns",
    startingPrice: p(999),
    oneLine: "GSTR-1, GSTR-3B and annual GSTR-9 — filed on time, every time.",
    heroSummary:
      "End-to-end GST return filing: sales register, purchase reconciliation, GSTR-2B match, GSTR-3B and challan payment.",
    whatYouNeed: ["Sales invoices for the month", "Purchase invoices", "Bank statement", "Previous returns filed"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Late filing: ₹50/day (₹20 for nil returns) plus interest of 18% p.a. on unpaid tax. Two missed returns can lead to GSTIN suspension and blocked e-way bills.",
    faqs: [
      { q: "What's the GSTR-3B due date?", a: "20th of the following month for most taxpayers; 22nd or 24th for QRMP filers." },
    ],
  },
  {
    slug: "income-tax-return",
    pillar: "tax-compliance",
    name: "Income Tax Filing",
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
    name: "TDS Filing",
    startingPrice: p(1499),
    oneLine: "Quarterly Form 24Q, 26Q, 27Q filing with correct challan mapping.",
    heroSummary:
      "TDS computation, challan payment reconciliation, quarterly return filing and Form 16 / 16A generation.",
    whatYouNeed: ["Deductee list with PAN", "Challan copies", "Salary details (for 24Q)"],
    process: monthlyProcess,
    framing: "loss",
    penalty:
      "Late TDS return: ₹200/day under Sec 234E (capped at TDS amount). Penalty of ₹10,000–₹1,00,000 under Sec 271H for delayed/incorrect filing.",
    faqs: [],
  },
  {
    slug: "accounting-bookkeeping",
    pillar: "tax-compliance",
    name: "Accounting",
    startingPrice: p(4999),
    oneLine: "Books closed monthly. Audit-ready every quarter.",
    heroSummary:
      "Daily transaction posting, ledger reconciliation, and P&L / Balance Sheet delivery by qualified accountants.",
    whatYouNeed: ["Bank statements", "Sales & purchase invoices", "Expense receipts", "Payroll data"],
    process: monthlyProcess,
    framing: "benefit",
    faqs: [],
  },

  // ---------- Protect Your Brand ----------
  {
    slug: "trademark-filing",
    pillar: "protect-your-brand",
    name: "Trademark Registration",
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
    ],
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
    name: "Patent Registration",
    startingPrice: p(19999),
    oneLine: "Provisional or complete patent filing with an IP attorney.",
    heroSummary:
      "Patentability search, specification drafting, filing at the Indian Patent Office and response to examination.",
    whatYouNeed: ["Invention disclosure", "Diagrams / drawings", "Inventor details", "Assignee details (if any)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },

  // ---------- Grow Your Business ----------
  {
    slug: "iso-certification",
    pillar: "grow-your-business",
    name: "ISO Certification",
    startingPrice: p(4999),
    oneLine: "ISO 9001, 14001, 27001 — gap assessment, audit coordination and accredited certificate.",
    heroSummary:
      "Gap assessment, documentation, audit coordination and certificate delivery from an accredited certification body.",
    whatYouNeed: ["Company registration certificate", "PAN", "Nature of business", "Existing SOPs (if any)"],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "nsic-registration",
    pillar: "grow-your-business",
    name: "NSIC Registration",
    startingPrice: p(7999),
    oneLine: "Register under Single Point Registration Scheme to participate in government tenders for free.",
    heroSummary:
      "Registration of MSMEs with NSIC for marketing assistance, tender exemptions, and credit support.",
    whatYouNeed: [
      "Udyam registration certificate",
      "Financial statements of past 3 years",
      "Machinery list & quality reports",
      "Owner/Director KYC",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [
      { q: "What is the key benefit of NSIC?", a: "Tender forms are free of cost and you are exempt from Earnest Money Deposit (EMD)." },
    ],
  },
  {
    slug: "apeda-registration",
    pillar: "grow-your-business",
    name: "APEDA Registration",
    startingPrice: p(5999),
    oneLine: "Mandatory registration for exporters of scheduled agricultural and processed food products.",
    heroSummary:
      "Prepare and file APEDA application, obtain RCMC (Registration-cum-Membership Certificate) and export approval.",
    whatYouNeed: [
      "Import Export Code (IEC) certificate",
      "Bank certificate and cancelled cheque",
      "Address proof of business premises",
      "Director/Partner KYC details",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
  {
    slug: "business-advisory",
    pillar: "grow-your-business",
    name: "Business Advisory",
    startingPrice: p(24999),
    oneLine: "Expert advisory for cash flow forecasting, fund-raise readiness, and statutory planning.",
    heroSummary:
      "Strategic financial planning, compliance review, cash flow forecasting and business structuring advice from senior experts.",
    whatYouNeed: [
      "Financial reports and accounting statements",
      "Business model / projection goals",
      "Existing registration details",
    ],
    process: filingProcess,
    framing: "benefit",
    faqs: [],
  },
];

export const findService = (slug) => SERVICES.find((s) => s.slug === slug);
export const findPillar = (slug) => PILLARS.find((p) => p.slug === slug);
export const servicesByPillar = (slug) => SERVICES.filter((s) => s.pillar === slug);
