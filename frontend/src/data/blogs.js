// Blog content data - exported as a registry so any page can look up
// a post by slug. Each post includes full SEO metadata + a structured
// `sections` array (paragraph | list | subheading | quote | cta) so the
// renderer stays clean.

export const BLOG_CATEGORIES = [
  { id: "all",         label: "All" },
  { id: "tax-law",     label: "Tax Law" },
  { id: "gst",         label: "GST" },
  { id: "audit-prep",  label: "Audit Prep" },
  { id: "compliance",  label: "Compliance" },
];

const RELATED = {
  "maximizing-deductions-small-businesses": [
    { slug: "gst-compliance-changes",          label: "Understanding GST Compliance Changes" },
    { slug: "preparing-financial-audit",        label: "Preparing for Your Next Financial Audit" },
    { slug: "business-compliance-guide-india",  label: "The Complete Guide to Business Compliance in India" },
  ],
  "gst-compliance-changes": [
    { slug: "maximizing-deductions-small-businesses", label: "Maximizing Deductions for Small Businesses" },
    { slug: "preparing-financial-audit",              label: "Preparing for Your Next Financial Audit" },
    { slug: "business-compliance-guide-india",        label: "The Complete Guide to Business Compliance in India" },
  ],
  "preparing-financial-audit": [
    { slug: "maximizing-deductions-small-businesses", label: "Maximizing Deductions for Small Businesses" },
    { slug: "gst-compliance-changes",                 label: "Understanding GST Compliance Changes" },
    { slug: "business-compliance-guide-india",        label: "The Complete Guide to Business Compliance in India" },
  ],
  "business-compliance-guide-india": [
    { slug: "gst-compliance-changes",    label: "Understanding GST Compliance Changes" },
    { slug: "preparing-financial-audit", label: "Preparing for Your Next Financial Audit" },
  ],
};

export const BLOGS = [
  // ── 1. Tax deductions guide ──────────────────────────────────────────────
  {
    slug: "maximizing-deductions-small-businesses",
    title: "Maximizing Deductions: A Guide for Small Businesses",
    excerpt:
      "Small businesses routinely leave money on the table at tax time. Here is a practical, section-wise checklist of deductions you can claim - and the documentation you need to keep.",
    category: "Tax Law",
    categoryColor: "bg-[#2563EB]",
    categorySlug: "tax-law",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop",
    author: "RightTeam Editorial",
    datePublished: "2026-06-12",
    readMinutes: 5,
    keywords: [
      "small business tax deductions India",
      "Section 80 deductions",
      "business expense claims",
      "tax saving for startups",
      "deduction checklist CA",
    ],
    meta: {
      title: "Maximizing Deductions: A Guide for Small Businesses | RightTeam",
      description:
        "Practical guide to small business tax deductions in India - Section 80C to 80U, depreciation, home office and more. With a free downloadable checklist.",
    },
    sections: [
      { type: "p", text: "For most small businesses, tax planning is a year-round activity that pays for itself the moment you file. Yet surveys consistently show that eligible businesses claim only a fraction of the deductions they are entitled to sometimes because the rules are buried in the Income Tax Act, and sometimes because the supporting documents were never kept." },
      { type: "p", text: "This guide walks you through the deductions that move the needle for Indian small businesses, organized by section so you can match each one to your books. Keep it open during your next quarterly review." },

      { type: "h3", text: "1. Section 80C The classic ₹1.5 lakh bucket" },
      { type: "p", text: "80C is the most familiar section. It covers a long list of investments and expenses PPF, ELSS, life insurance premiums, NSC, home loan principal, tuition fees for children, and ULIPs. For a small business run as a proprietorship, these flow through the owner's personal return. The key is to keep proof: premium receipts, statement of account, Form 16A where applicable." },
      { type: "list", items: [
        "PPF, ELSS, NSC, life insurance - keep 5-year statements.",
        "Home loan principal - Form 16A / bank certificate.",
        "Children's tuition fee - bonafide certificate from the school.",
      ]},

      { type: "h3", text: "2. Section 80D - Health insurance premiums" },
      { type: "p", text: "Premiums paid for health insurance covering self, spouse, dependent children and parents qualify for deduction up to ₹25,000. If parents are senior citizens, the cap rises to ₹50,000. Keep premium receipts and the policy document; preventive health check-ups (up to ₹5,000) are included within the same cap." },

      { type: "h3", text: "3. Section 80CCD(1B) - Extra ₹50,000 for NPS" },
      { type: "p", text: "Contributions to the National Pension System by an individual are eligible for an additional deduction of up to ₹50,000 over and above Section 80C. If you are self-employed, ensure your PRAN is active and that contributions are routed through the correct nodal office." },

      { type: "h3", text: "4. Section 80E - Education loan interest" },
      { type: "p", text: "Interest paid on an education loan taken for higher studies for self, spouse, children or a legal ward is fully deductible. There is no upper limit, and the deduction is available for up to 8 years from the start of repayment. Hold on to the loan sanction letter and annual interest certificate." },

      { type: "h3", text: "5. Section 80G - Donations to registered funds" },
      { type: "p", text: "Donations to specified relief funds, PM Cares, the Prime Minister's National Relief Fund and 100% deduction-eligible institutions qualify. Keep the donation receipt with the institution's 80G registration number, PAN and amount. Cash donations above ₹2,000 are not eligible - pay by cheque, UPI or bank transfer." },

      { type: "h3", text: "6. Section 80TTA - Interest on savings" },
      { type: "p", text: "Interest earned on savings accounts (up to ₹10,000) is deductible for individuals and HUFs. Banks provide this on Form 16A or the interest certificate - useful for small businesses with parked reserves." },

      { type: "h3", text: "7. Depreciation under Section 32" },
      { type: "p", text: "For businesses, depreciation on plant, machinery, furniture and buildings is a powerful deduction. Assets above ₹1 lakh are eligible for additional depreciation in the year of purchase. Maintain an asset register and depreciation schedule; this is also the first thing a tax officer will ask for." },

      { type: "h3", text: "8. Home office deduction (for the self-employed)" },
      { type: "p", text: "If a portion of your home is used exclusively and regularly for business, a proportionate share of rent, repairs, electricity and depreciation can be claimed. The deduction is limited to the income from business - it cannot create a loss. Keep the floor plan and utility bills to substantiate the proportion." },

      { type: "h3", text: "9. Section 80JJAA - Employment generation" },
      { type: "p", text: "Small businesses that employ new workmen (in manufacturing) can claim a 30% deduction of additional wages paid, for 3 assessment years. Contract employees do not count. Maintain appointment letters, payroll and PF/ESI deposits." },

      { type: "h3", text: "10. Section 80U - Disability deduction" },
      { type: "p", text: "Persons with disabilities (40%+ certified) can claim a flat deduction of ₹75,000; for severe disability, ₹1.25 lakh. A medical certificate from a notified authority is required." },

      { type: "h3", text: "Documentation checklist" },
      { type: "list", items: [
        "Premium receipts, statement of accounts, Form 16A.",
        "Asset register with depreciation schedule.",
        "Home office floor plan and utility bills.",
        "Donation receipts with 80G reference numbers.",
        "Payroll, PF/ESI challans for employment-based deductions.",
      ]},

      { type: "quote", text: "A deduction is only as good as the document that supports it. Keep proofs digital, indexed, and accessible from your CA's dashboard - it is the single highest-leverage habit in small business tax planning." },

      { type: "h3", text: "How RightTeam can help" },
      { type: "p", text: "From proprietorship firms to private limited companies, our chartered accountants and tax advisors review your books quarterly to make sure every eligible deduction is claimed, every quarter, with the right paperwork. Book a 30-minute consultation and we will map your deductions against your last ITR." },
    ],
  },

  // ── 2. GST compliance changes ────────────────────────────────────────────
  {
    slug: "gst-compliance-changes",
    title: "Understanding the Latest GST Compliance Changes",
    excerpt:
      "From GSTR-1/IFF auto-population to IMS for mismatched invoices - a clear breakdown of recent GST changes and what they mean for your monthly filings.",
    category: "GST",
    categoryColor: "bg-[#10B981]",
    categorySlug: "gst",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    author: "RightTeam Editorial",
    datePublished: "2026-06-22",
    readMinutes: 6,
    keywords: [
      "GST compliance India 2026",
      "GSTR-1 auto population",
      "IMS invoice management",
      "GST monthly return",
      "GSTR-3B changes",
    ],
    meta: {
      title: "Understanding the Latest GST Compliance Changes | RightTeam",
      description:
        "Stay current with recent GST changes in India - auto-populated GSTR-1, IMS for invoice mismatches, and quarterly return options for small taxpayers.",
    },
    sections: [
      { type: "p", text: "GST in India continues to evolve. The past year has brought several changes to how returns are filed, how invoices are matched, and how small taxpayers can opt for simpler cycles. If your finance team is still filing returns the way they were two years ago, you are probably leaving both time and money on the table." },
      { type: "p", text: "Here is a clear, action-oriented summary of the changes that matter to small and mid-sized businesses." },

      { type: "h3", text: "1. GSTR-1 / IFF auto-population" },
      { type: "p", text: "Outward supplies in GSTR-1 (and the Invoice Furnishing Facility) are now auto-populated from invoices uploaded to the Invoice Management System (IMS). The supplier no longer has to manually key in B2B invoice details - the recipient's acceptance flows back into GSTR-1 before filing." },
      { type: "list", items: [
        "Upload invoices on the GST portal → IMS.",
        "Recipient accepts, rejects or keeps pending on the IMS dashboard.",
        "Auto-populated details flow into GSTR-1 / IFF by the 11th of the next month.",
        "Supplier files GSTR-1 with these pre-filled values - saving hours of data entry.",
      ]},

      { type: "h3", text: "2. Invoice Management System (IMS)" },
      { type: "p", text: "IMS is the single window where a recipient reviews the invoices issued to them. Once accepted, the input tax credit is locked in; if rejected, the supplier must correct the invoice. Pending status is treated as deemed acceptance after the due date. For high-volume businesses, the IMS workflow reduces reconciliation effort by an order of magnitude." },

      { type: "h3", text: "3. Quarterly Return Monthly Payment (QRMP) updates" },
      { type: "p", text: "Small taxpayers with aggregate turnover up to ₹5 crore can opt for QRMP. The IFF (Invoice Furnishing Facility) for the first two months now feeds directly into the quarterly GSTR-1. This means businesses can continue issuing invoices monthly, while only filing one consolidated return at the end of the quarter." },

      { type: "h3", text: "4. GSTR-3B - the changes that matter" },
      { type: "p", text: "GSTR-3B now references IMS-accepted values for ITC claims. Discrepancies must be reconciled before the due date or the system will flag a mismatch. Most importantly, late fees have been rationalised - nil returns filed within 30 days of the due date attract no fee, and a small fixed fee applies thereafter." },
      { type: "list", items: [
        "Auto-population from IMS - fewer manual entries.",
        "Late fee rationalised for nil returns.",
        "Mandatory reconciliation for high-value ITC.",
      ]},

      { type: "h3", text: "5. E-invoicing thresholds" },
      { type: "p", text: "The e-invoicing threshold has been progressively lowered. Businesses with turnover above ₹5 crore must already be issuing e-invoices; further reductions to the threshold are expected. If your turnover is approaching this mark, getting on the e-invoice and IMS workflow now is far cheaper than retrofitting it later." },

      { type: "h3", text: "6. Reverse charge and TCS updates" },
      { type: "p", text: "Several services have been re-classified under reverse charge - including legal services from advocates and renting of motor vehicles. E-commerce operators are also required to collect TCS at the revised rate of 0.5% (1% for certain categories). Reconcile these monthly to avoid interest." },

      { type: "h3", text: "7. Composition scheme - what changed" },
      { type: "p", text: "Composition dealers can now file quarterly GSTR-4 (instead of annual), with a single consolidated payment. The turnover limit for service providers under composition remains ₹50 lakh. There is no input tax credit under composition - keep that in mind when planning B2B sales." },

      { type: "quote", text: "Most GST notices we see at RightTeam stem from a missed IMS acceptance or a stale ITC reconciliation - not from a calculation error. Discipline in the workflow matters more than the math." },

      { type: "h3", text: "What you should do this quarter" },
      { type: "list", items: [
        "Audit your IMS dashboard - accept or reject pending invoices before the 11th.",
        "Switch to QRMP if your turnover is under ₹5 crore and your invoicing is regular.",
        "Reconcile GSTR-2B with your purchase register every month.",
        "Update your ERP / accounting tool to support e-invoicing at the new threshold.",
      ]},

      { type: "h3", text: "How RightTeam can help" },
      { type: "p", text: "Our GST desk manages end-to-end monthly and quarterly compliance for over 200 clients - from upload to IMS to GSTR-3B, with quarterly health checks. We also help migrate legacy books onto e-invoice and IMS-ready stacks. Book a free 30-minute review to find out how much time you can save." },
    ],
  },

  // ── 3. Audit preparation guide ───────────────────────────────────────────
  {
    slug: "preparing-financial-audit",
    title: "Preparing for Your Next Financial Audit",
    excerpt:
      "An audit is less painful when you walk in prepared. This 8-step plan turns a stressful audit season into a routine check - and protects you from last-minute scrambles.",
    category: "Audit Prep",
    categoryColor: "bg-[#F97316]",
    categorySlug: "audit-prep",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    author: "RightTeam Editorial",
    datePublished: "2026-07-01",
    readMinutes: 5,
    keywords: [
      "financial audit preparation India",
      "statutory audit checklist",
      "audit readiness small business",
      "tax audit documentation",
      "internal controls audit",
    ],
    meta: {
      title: "Preparing for Your Next Financial Audit | RightTeam",
      description:
        "A practical 8-step preparation plan for your next statutory or tax audit - checklists, document index, internal controls, and a calm walkthrough of the auditor's process.",
    },
    sections: [
      { type: "p", text: "An audit is rarely a problem for a well-prepared business. The stress usually comes from last-minute scrambles - missing vouchers, unreconciled bank statements, or a single disputed invoice that holds up the entire filing. This plan makes sure none of those happen." },
      { type: "p", text: "Whether you are facing a statutory audit under the Companies Act, a tax audit under Section 44AB, or an internal review by a lender or investor, the same 8 steps apply." },

      { type: "h3", text: "Step 1 - Lock the books early" },
      { type: "p", text: "Close your books at least 30 days before the audit. That gives you a clear window to reconcile, fix errors, and gather supporting documents. Late entries in the audit year are a red flag - the auditor will question every one of them." },

      { type: "h3", text: "Step 2 - Build a document index" },
      { type: "p", text: "A single shared folder (drive, OneDrive, even email) with a clean structure: vouchers, bank statements, GST returns, TDS challans, fixed asset register, statutory registers, prior-year audited financials, board minutes, related-party agreements. If the auditor can find what they need without chasing you, the audit moves twice as fast." },
      { type: "list", items: [
        "Trial balance, ledgers, journals.",
        "Bank statements for all accounts, fully reconciled.",
        "GST returns (GSTR-1, 3B, 9) and TDS challans.",
        "Fixed asset register with depreciation schedule.",
        "Statutory registers (members, directors, charges).",
        "Prior year audited financials and audit reports.",
      ]},

      { type: "h3", text: "Step 3 - Reconcile the bank first" },
      { type: "p", text: "Bank reconciliation is the single most time-consuming part of an audit. Do it before the auditor starts, not during. Use your accounting tool's auto-match, but always investigate unmatched entries - they are almost always the source of queries." },

      { type: "h3", text: "Step 4 - Test your internal controls" },
      { type: "p", text: "Auditors will sample transactions, so make sure each transaction has a clean approval trail: a PO, a GRN, an invoice, a payment proof, and a ledger entry. If any of those are missing, fill the gap now - not during fieldwork." },

      { type: "h3", text: "Step 5 - Pre-clear big or unusual items" },
      { type: "p", text: "Identify the top 10 transactions by value and the top 10 by risk (related-party, one-off, unusual counter-party). Walk through them with your CA before the audit. The discussion will surface the right documentation and the right disclosure language." },

      { type: "h3", text: "Step 6 - Disclose related-party transactions" },
      { type: "p", text: "Don't bury related-party transactions. List them in a separate schedule with the nature of the relationship, the value, and the terms. Auditors are required to specifically test these - surprise is the worst possible strategy." },

      { type: "h3", text: "Step 7 - Prepare your tax positions" },
      { type: "p", text: "For every significant tax position (deferred tax, MAT credit, doubtful recoveries, Section 80 deductions, GST ITC claims), maintain a one-pager with the position, the supporting document, and the legal basis. Auditors love clarity; they do not love improvisation." },

      { type: "h3", text: "Step 8 - Brief the team" },
      { type: "p", text: "Tell your finance team, vendors and bankers that an audit is starting. Set up a single point of contact for the auditor. Brief anyone who will be at the audit - the cashier, the store manager, the IT lead - so they are not caught off-guard by a query." },

      { type: "quote", text: "A good audit feels like a routine check. A bad audit feels like a crisis. The difference is six weeks of preparation, not six months." },

      { type: "h3", text: "How RightTeam can help" },
      { type: "p", text: "We provide end-to-end audit support - from pre-audit bookkeeping cleanup to working-paper preparation, to attending the audit with your statutory auditors. We can also be your single point of contact, so your team keeps working while the audit happens around them." },
    ],
  },

  // ── 4. Business compliance guide (new) ───────────────────────────────────
  // Route: /blogs/business-compliance-guide-india
  // Image: business discussion between a woman and man (Unsplash)
  {
    slug: "business-compliance-guide-india",
    title: "The Complete Guide to Business Compliance in India (FY 2026–27)",
    excerpt:
      "Every registered business in India carries mandatory statutory obligations that vary by legal structure. This guide maps out exactly which ROC, MCA, GST, income tax, and annual filing requirements apply to your company — and what happens if you miss them.",
    category: "Compliance",
    categoryColor: "bg-[#0B1E3D]",
    categorySlug: "compliance",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop",
    author: "RightTeam Editorial",
    datePublished: "2026-08-04",
    readMinutes: 8,
    keywords: [
      "statutory compliance India",
      "company compliance checklist",
      "ROC compliance",
      "MCA compliance",
      "GST compliance",
      "annual filing India",
      "LLP compliance",
      "Private Limited compliance",
      "income tax compliance business",
      "business compliance FY 2026-27",
    ],
    meta: {
      title: "Complete Guide to Business Compliance in India (FY 2026–27) | RightTeam",
      description:
        "Know exactly which statutory compliances — ROC, MCA, GST, income tax, and annual filings — apply to your business structure in India. Updated for FY 2026–27.",
    },
    sections: [
      { type: "p", text: "Every registered business in India has specific statutory compliance obligations determined by its legal structure. A Private Limited Company follows a different annual compliance calendar from an LLP, which differs again from a Sole Proprietorship or a Partnership Firm. Getting this mapping wrong — or missing a deadline — attracts penalties, interest, and in serious cases, director disqualification or company strike-off." },
      { type: "p", text: "This guide maps out the key statutory compliance requirements by entity type, explains why they exist, and shows you what to expect if you miss them. It is updated for FY 2026–27 and reviewed by RightTeam's in-house chartered accountants and company secretaries." },
      { type: "link", text: "Check Your Compliance Automatically", url: "/#compliance-check" },

      { type: "h3", text: "1. Why Statutory Compliance Matters for Every Business" },
      { type: "p", text: "Statutory compliance is not optional — it is mandated by the Income Tax Act 1961, the Companies Act 2013, the CGST Act 2017, the LLP Act 2008, and several other central and state laws. Regulators including the Ministry of Corporate Affairs (MCA), the Central Board of Direct Taxes (CBDT), and the Central Board of Indirect Taxes and Customs (CBIC) all enforce separate compliance calendars with independent penalty structures." },
      { type: "list", items: [
        "Missing a GST return attracts a late fee of ₹50/day (₹20/day for nil returns), plus 18% p.a. interest on unpaid tax.",
        "Missing an ROC annual filing (AOC-4 or MGT-7) attracts ₹100/day per form — with no upper cap under Sections 137 and 92 of the Companies Act.",
        "Sustained ROC default triggers director disqualification under Section 164(2) and can lead to company strike-off under Section 248.",
        "Late income tax filing attracts ₹5,000 under Section 234F and bars loss carry-forward.",
      ]},

      { type: "h3", text: "2. Private Limited Company Compliance" },
      { type: "p", text: "A Private Limited Company registered under the Companies Act 2013 carries the most comprehensive annual compliance calendar. Every Private Limited Company — regardless of turnover or activity — must complete the following every financial year." },
      { type: "list", items: [
        "ROC AOC-4: Annual financial statements filed with the Registrar of Companies within 30 days of the AGM.",
        "ROC MGT-7A: Annual return filed within 60 days of the AGM (OPCs and small companies use MGT-7A; others use MGT-7).",
        "Statutory audit: Mandatory under Section 139 for all companies, irrespective of turnover.",
        "Board meetings: Minimum 4 per year with no more than 120 days between consecutive meetings.",
        "DIR-3 KYC: Annual director KYC by 30 September; DIN deactivated otherwise.",
        "Income tax return: Filed by 31 October for companies requiring tax audit, 31 July otherwise.",
        "GST returns: Monthly GSTR-1, GSTR-3B, and annual GSTR-9 (where applicable).",
        "TDS quarterly returns: Form 26Q/24Q filed within prescribed due dates each quarter.",
      ]},

      { type: "h3", text: "3. LLP Compliance Requirements" },
      { type: "p", text: "An LLP (Limited Liability Partnership) registered under the LLP Act 2008 has its own MCA compliance calendar. LLP compliance is lighter than a private limited company but still mandatory every year — missed filings attract ₹100/day penalties with no cap." },
      { type: "list", items: [
        "LLP Form 11 (Annual Return): Filed by 30 May each year. Penalty: ₹100/day from the due date.",
        "LLP Form 8 (Statement of Accounts & Solvency): Filed by 30 October each year.",
        "DIR-3 KYC for designated partners: Filed by 30 September; DPIN deactivated on default.",
        "Income tax return: Filed by 31 July (non-audit LLPs) or 31 October (audit LLPs).",
        "GST compliance: Monthly GSTR-1 and GSTR-3B if registered under GST.",
      ]},

      { type: "h3", text: "4. One Person Company (OPC) Compliance" },
      { type: "p", text: "An OPC is a private limited company with a single member. Its ROC and MCA compliance obligations mirror those of a regular Private Limited Company, though the AGM requirement is relaxed. OPCs must complete AOC-4 (financial statements), statutory audit, director KYC, and income tax return filing every year." },

      { type: "h3", text: "5. Sole Proprietorship & Partnership Firm Compliance" },
      { type: "p", text: "Sole Proprietorships and Partnership Firms are not registered under the Companies Act, so there are no ROC filings. However, they still carry significant compliance obligations under GST and the Income Tax Act." },
      { type: "list", items: [
        "Income tax return (ITR-3 or ITR-4): Filed by 31 July (non-audit) or 31 October (Section 44AB audit cases).",
        "GST returns: If GST-registered, monthly GSTR-1 and GSTR-3B, and annual GSTR-9.",
        "TDS returns: If the business deducts TDS (e.g., rent payments, professional fees), quarterly Form 26Q.",
        "Partnership deed registration: While optional federally, required in most states for banking and legal disputes.",
        "Municipal trade licence: Required in most municipalities for operating a business from a physical location.",
      ]},

      { type: "h3", text: "6. GST Compliance — Applicable to All Registered Businesses" },
      { type: "p", text: "GST compliance cuts across all entity types. Any business with aggregate turnover above ₹20 lakh (₹10 lakh for North-East states) must register and file returns. For businesses in the QRMP scheme (turnover up to ₹5 crore), quarterly returns with monthly payments apply. All others file monthly." },
      { type: "list", items: [
        "GSTR-1 (outward supplies): 11th of the following month for monthly filers; quarterly for QRMP.",
        "GSTR-3B (summary return + payment): 20th of the following month (22nd/24th for QRMP filers).",
        "GSTR-9 (annual return): 31 December of the following financial year.",
        "E-invoicing: Mandatory for businesses with turnover above ₹5 crore.",
      ]},

      { type: "h3", text: "7. Income Tax Compliance — Key Deadlines" },
      { type: "p", text: "Income tax compliance applies to every business — sole proprietors, partners, directors, and companies alike. The key annual deadline is 31 July for most non-audit taxpayers, and 31 October for companies and businesses requiring a tax audit under Section 44AB." },
      { type: "list", items: [
        "Advance tax: Paid in four instalments — 15 June (15%), 15 September (45%), 15 December (75%), and 15 March (100%).",
        "TDS deduction and deposit: TDS must be deducted and deposited by the 7th of the following month.",
        "ITR filing: 31 July (most non-audit cases), 31 October (audit companies), 30 November (transfer pricing).",
      ]},

      { type: "h3", text: "8. Common Compliance Mistakes and How to Avoid Them" },
      { type: "p", text: "The most expensive compliance mistakes are not complex — they are simply missed due dates. The following are the most common issues RightTeam sees when businesses first engage with us." },
      { type: "list", items: [
        "Treating GST and income tax as the only compliance obligations — and ignoring ROC filings until a director's DIN is deactivated.",
        "Missing DIR-3 KYC (due 30 September every year) — this deactivates a director's DIN instantly on 1 October.",
        "Confusing the AGM deadline with the ROC filing deadline — AGM must be held by 30 September, but AOC-4 and MGT-7 have separate 30-day and 60-day windows after the AGM.",
        "Not filing LLP Form 11 by 30 May — the most common LLP compliance lapse we see.",
        "Registering under GST but not filing nil returns when there are no transactions — nil returns still require filing.",
      ]},

      { type: "quote", text: "A compliance deadline missed is not just a fine — it is a signal to regulators that the business is not governed. The reputational and operational cost of a DIN deactivation or company strike-off notice far exceeds the cost of staying on top of every annual filing." },

      { type: "h3", text: "9. Frequently Asked Questions on Business Compliance in India" },
      { type: "p", text: "Is compliance mandatory even if my company has no business activity? Yes. A Dormant Company or Strike-Off application must be filed if you want to stop compliance obligations. Simply having no transactions does not waive the annual ROC, income tax, or GST filing requirements." },
      { type: "p", text: "What is the difference between statutory audit and tax audit? A statutory audit is mandatory for all companies under the Companies Act and must be conducted by a Chartered Accountant before the ROC filings. A tax audit under Section 44AB of the Income Tax Act applies to businesses with turnover above the prescribed threshold." },
      { type: "p", text: "Can I manage all my compliance requirements myself? For micro-businesses and sole proprietors with simple books, basic GST and income tax compliance is manageable. However, once a company or LLP is involved — with ROC filings, statutory audit, director KYC and event-based compliances — professional management is strongly recommended. The penalties for errors and delays are disproportionately high." },

      { type: "h3", text: "How RightTeam Can Help" },
      { type: "p", text: "RightTeam manages end-to-end statutory compliance for Private Limited Companies, LLPs, OPCs, Partnership Firms and Proprietorships across India. Our in-house CAs, Company Secretaries and tax advisors handle every annual filing, ROC form, GST return and income tax submission — with deadline reminders and a dedicated account manager for each client. Book a free compliance review to find out exactly which filings apply to your business and get a fixed-price annual compliance quote." },
    ],
  },
];

export const getBlogBySlug = (slug) => BLOGS.find((b) => b.slug === slug);

export const getRelatedBlogs = (slug) =>
  (RELATED[slug] || []).map((r) => ({ ...r, ...getBlogBySlug(r.slug) }));
