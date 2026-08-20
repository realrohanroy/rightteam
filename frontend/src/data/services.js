// Central catalog: expanded categories based on user requirements.

export const CATEGORIES = [
  { slug: "company-registration", label: "Company Registration", tagline: "Start your business with the right structure.", intro: "Entity structuring, MCA incorporation, and comprehensive start-up compliance.", framing: "benefit" },
  { slug: "ngo", label: "NGO", tagline: "Register and manage non-profit organizations.", intro: "Trust, Society, and Section 8 company registrations.", framing: "benefit" },
  { slug: "licenses-certifications", label: "Licenses & Certifications", tagline: "Statutory registrations required to operate legally.", intro: "GST, Udyam, IEC, and other essential business licenses.", framing: "benefit" },
  { slug: "fssai-registration", label: "FSSAI Registration", tagline: "Food safety compliance for all food businesses.", intro: "Basic, State, and Central FSSAI licenses.", framing: "loss" },
  { slug: "trade-license", label: "Trade License", tagline: "Municipal compliance for commercial operations.", intro: "Local trade licenses and shop act registrations.", framing: "loss" },
  { slug: "bis-registration", label: "BIS Registration", tagline: "Quality certifications for products.", intro: "BIS, ISI, and Hallmarking certifications.", framing: "benefit" },
  { slug: "international-business", label: "International Business Setup", tagline: "Expand your business globally.", intro: "FEMA compliance, subsidiary incorporation, and foreign exchange management.", framing: "benefit" },
  { slug: "taxation-compliance", label: "Taxation & Compliance", tagline: "Statutory returns and proactive tax management.", intro: "GST, TDS, income tax, and ROC returns filed accurately.", framing: "loss" },
  { slug: "intellectual-property", label: "Intellectual Property", tagline: "Protect your brand and creations.", intro: "Trademark, copyright, and patent registrations.", framing: "benefit" },
  { slug: "other-services", label: "Other Services", tagline: "Additional support for business growth.", intro: "Business advisory, ISO certifications, and more.", framing: "benefit" }
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

const p = (n) => typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : n;

// Helper to generate a placeholder service
const createService = (categorySlug, name, oneLine, price) => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  pillar: categorySlug,
  name,
  startingPrice: p(price),
  oneLine,
  heroSummary: `Professional registration and compliance services for ${name}. Includes all necessary filings and dedicated support.`,
  whatYouNeed: ["PAN & Aadhaar", "Address proof", "Business details"],
  process: filingProcess,
  framing: "benefit",
  faqs: [
    { q: `What is the process for ${name}?`, a: "The process typically takes a few working days once all documents are submitted." }
  ]
});

export const SERVICES = [
  // --- Company Registration ---
  createService("company-registration", "Private Limited Company", "The default structure for startups raising capital.", 6999),
  createService("company-registration", "Public Limited Company", "For large-scale businesses planning to raise public funds.", 14999),
  createService("company-registration", "One Person Company", "For solo founders who want limited liability.", 6999),
  createService("company-registration", "LLP registration", "Partnership flexibility with limited liability.", 6999),
  createService("company-registration", "Partnership Firm", "Simple way for two or more people to run a business.", 3999),
  createService("company-registration", "Sole Proprietorship", "Simplest business structure for a single owner.", 1999),
  createService("company-registration", "Nidhi Company", "For cultivating the habit of thrift and savings among members.", 19999),
  createService("company-registration", "Microfinance Company", "Section 8 company providing microcredit.", 24999),
  createService("company-registration", "Producer Company", "For farmers and agriculturists.", 14999),
  createService("company-registration", "Indian Subsidiary", "Setup an Indian subsidiary for a foreign entity.", 29999),
  createService("company-registration", "Foreign Subsidiary Company", "Setup a foreign subsidiary.", 49999),
  createService("company-registration", "Foreign Company", "Branch office, liaison office, or project office.", 39999),

  // --- NGO ---
  createService("ngo", "Section 8 Company", "Non-profit company registration.", 6999),
  createService("ngo", "Trust Registration", "Setup a charitable trust.", 9999),
  createService("ngo", "Society Registration", "Register a society under the Societies Registration Act.", 11999),
  createService("ngo", "12A and 80G Registration", "Tax exemptions for NGOs.", 4999),
  createService("ngo", "FCRA Registration", "For receiving foreign contributions.", 24999),
  createService("ngo", "CSR-1 Registration", "Mandatory for NGOs undertaking CSR activities.", 2499),

  // --- Licenses & Certifications ---
  createService("licenses-certifications", "Startup India", "DPIIT recognition for tax exemptions and grants.", 3999),
  createService("licenses-certifications", "Udyam Registration", "MSME registration for benefits.", 999),
  createService("licenses-certifications", "GST Registration", "Get your GSTIN in 5-7 working days.", 1499),
  createService("licenses-certifications", "Import Export Code", "10-digit IEC from DGFT.", 1499),
  createService("licenses-certifications", "GeM Registration", "Register on Government e-Marketplace.", 4999),
  createService("licenses-certifications", "Digital Signature Certificate", "Class 3 DSC for secure filings.", 1499),
  createService("licenses-certifications", "ISO Certification", "ISO 9001 and other quality certifications.", 3999),
  createService("licenses-certifications", "Shop and Establishment", "Mandatory state-level registration.", 2499),
  createService("licenses-certifications", "Professional Tax", "Registration for professional tax.", 1999),
  createService("licenses-certifications", "NSIC Registration", "For participating in government tenders.", "As per case"),
  createService("licenses-certifications", "APEDA Registration", "For exporters of agricultural products.", 14999),

  // --- FSSAI Registration ---
  createService("fssai-registration", "Basic FSSAI Registration", "For small food businesses.", 999),
  createService("fssai-registration", "State FSSAI License", "For mid-sized food businesses.", "Prof. fee ₹3,999 + Gov fees"),
  createService("fssai-registration", "Central FSSAI License", "For large food businesses and importers.", "Prof. fee ₹7,999 + Gov fees"),
  createService("fssai-registration", "FSSAI Annual Return", "Filing of mandatory food safety returns.", 1999),

  // --- Trade License ---
  createService("trade-license", "Municipal Trade License", "General trade license from local municipality.", 4999),
  createService("trade-license", "Health Trade License", "For businesses dealing with goods/services affecting public health.", 5999),

  // --- BIS Registration ---
  createService("bis-registration", "BIS Certification (ISI)", "Quality certification for specific products.", "As per case"),
  createService("bis-registration", "BIS Hallmarking", "For precious metals like gold and silver.", "As per case"),
  createService("bis-registration", "WPC Approval", "Wireless Planning & Coordination approval.", "As per case"),
  createService("bis-registration", "EPR Authorization", "Extended Producer Responsibility for e-waste/plastic.", "As per case"),

  // --- International Business Setup ---
  createService("international-business", "FEMA Compliance", "Foreign Exchange Management Act compliance.", 9999),
  createService("international-business", "FDI Reporting", "Filing of FC-GPR and FC-TRS.", 7999),
  createService("international-business", "ODI Compliance", "Overseas Direct Investment compliance.", 14999),
  createService("international-business", "Transfer Pricing", "Advisory and compliance for international transactions.", 29999),

  // --- Taxation & Compliance ---
  {
    ...createService("taxation-compliance", "ROC Annual Filing", "AOC-4, MGT-7 and MGT-7A filed.", null),
    process: filingProcess, framing: "loss"
  },
  {
    ...createService("taxation-compliance", "Auditing", "Statutory, internal, and tax audits.", null),
    process: filingProcess, framing: "loss"
  },
  {
    ...createService("taxation-compliance", "GST Returns", "Monthly/Quarterly GST filings.", null),
    process: monthlyProcess, framing: "loss"
  },
  {
    ...createService("taxation-compliance", "Income Tax Filing", "ITR-1 to ITR-7 filed.", null),
    process: filingProcess, framing: "loss"
  },
  {
    ...createService("taxation-compliance", "TDS Return Filing", "Quarterly Form 24Q, 26Q, 27Q.", null),
    process: monthlyProcess, framing: "loss"
  },
  {
    ...createService("taxation-compliance", "Accounting & Bookkeeping", "Monthly accounting services.", null),
    process: monthlyProcess, framing: "benefit"
  },

  // --- Intellectual Property ---
  createService("intellectual-property", "Trademark Registration", "Protect your brand name and logo.", "₹1,999 + Gov fees"),
  createService("intellectual-property", "Trademark Objection", "Respond to registry objections.", 2499),
  createService("intellectual-property", "Copyright Registration", "Protect software, literature, or art.", 9999),
  createService("intellectual-property", "Patent Filing", "Protect your inventions.", "On Request"),
  createService("intellectual-property", "Design Registration", "Protect the aesthetic design of your product.", "On Request"),

  // --- Other Services ---
  createService("other-services", "Business Advisory", "Expert advisory for cash flow and strategy.", 24999),
  createService("other-services", "Drafting of Legal Documents", "NDAs, employment agreements, and more.", 3999),
  createService("other-services", "Pitch Deck Preparation", "Professional pitch deck for fundraising.", 8999)
];

// For backwards compatibility and routing logic
export const PILLARS = CATEGORIES;
export const findService = (slug) => SERVICES.find((s) => s.slug === slug);
export const findPillar = (slug) => CATEGORIES.find((p) => p.slug === slug);
export const servicesByPillar = (slug) => SERVICES.filter((s) => s.pillar === slug);
