import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Eye,
  Mail,
  Phone,
  MapPin,
  Globe,
  UserCheck,
  Lock,
  Database,
  Share2,
  Cookie,
  Megaphone,
  Target,
  Users,
  Clock,
  RefreshCw,
  ChevronRight,
  ArrowRight,
  FileText,
  AlertTriangle,
} from "lucide-react";

/* ── Section definitions ──────────────────────────────────────────────── */
const SECTIONS = [
  { id: "information-we-collect", label: "Information We Collect", icon: Eye },
  { id: "how-we-use", label: "How We Use Your Information", icon: UserCheck },
  { id: "marketing-communications", label: "Marketing Communications", icon: Megaphone },
  { id: "lead-generation", label: "Lead Generation Campaigns", icon: Target },
  { id: "cookies", label: "Cookies & Tracking", icon: Cookie },
  { id: "information-sharing", label: "Information Sharing", icon: Share2 },
  { id: "data-security", label: "Data Security", icon: Lock },
  { id: "data-retention", label: "Data Retention", icon: Database },
  { id: "your-rights", label: "Your Rights", icon: Users },
  { id: "third-party", label: "Third-Party Links", icon: Globe },
  { id: "childrens-privacy", label: "Children's Privacy", icon: Shield },
  { id: "changes", label: "Changes to This Policy", icon: RefreshCw },
  { id: "contact-us", label: "Contact Us", icon: Mail },
];

/* ── Reusable section wrapper ─────────────────────────────────────────── */
function PolicySection({ id, icon: Icon, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 py-10 border-b border-ink/8 last:border-0"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="shrink-0 w-10 h-10 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center">
          <Icon size={18} className="text-brand" />
        </div>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
            Section {number}
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-ink leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="pl-14 space-y-4">{children}</div>
    </section>
  );
}

/* ── Bullet list component ────────────────────────────────────────────── */
function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-ink/75 leading-relaxed">
          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Sub-section heading ──────────────────────────────────────────────── */
function SubHeading({ children }) {
  return (
    <h3 className="font-semibold text-ink text-base mt-6 mb-3 flex items-center gap-2">
      <span className="w-4 h-0.5 bg-brand inline-block" />
      {children}
    </h3>
  );
}

/* ── Body paragraph ───────────────────────────────────────────────────── */
function Para({ children }) {
  return (
    <p className="text-sm text-ink/70 leading-relaxed">{children}</p>
  );
}

/* ── Main page component ──────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const observerRef = useRef(null);

  /* Intersection observer for active ToC highlighting */
  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy — RightTeam.in</title>
        <meta
          name="description"
          content="Learn how RightTeam collects, uses, and protects your personal information. Our privacy policy covers data collection, marketing communications, cookies, and your rights."
        />
      </Helmet>

      {/* ── Hero / Header ─────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">Privacy Policy</span>
          </nav>

          <div className="max-w-3xl">
            {/* Icon + badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center">
                <Shield size={22} className="text-brand" />
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1 rounded-sm">
                Legal Document · RT/LEGAL/PP/2026
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
              Privacy Policy
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              We value your privacy and are committed to protecting your personal information.
              This policy explains how RightTeam.in collects, uses, and safeguards your data.
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand" />
                <span className="mono text-[11px] uppercase tracking-widest text-white/50">
                  Effective Date:
                </span>
                <span className="mono text-[11px] text-white/80 font-semibold">
                  01 July 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-brand" />
                <span className="mono text-[11px] uppercase tracking-widest text-white/50">
                  Sections:
                </span>
                <span className="mono text-[11px] text-white/80 font-semibold">
                  {SECTIONS.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-brand" />
                <span className="mono text-[11px] uppercase tracking-widest text-white/50">
                  Jurisdiction:
                </span>
                <span className="mono text-[11px] text-white/80 font-semibold">India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </div>

      {/* ── Intro consent banner ──────────────────────────────────────── */}
      <div className="container-x -mt-1">
        <div className="bg-brand/6 border border-brand/20 rounded-sm p-5 flex items-start gap-3">
          <AlertTriangle size={16} className="text-brand shrink-0 mt-0.5" />
          <p className="text-sm text-ink/75 leading-relaxed">
            By accessing or using our website, you agree to the practices described in this Privacy
            Policy. If you have questions, please{" "}
            <Link to="/contact" className="link-brand font-semibold">
              contact us
            </Link>{" "}
            before proceeding.
          </p>
        </div>
      </div>

      {/* ── Main content layout: sidebar ToC + article ────────────────── */}
      <div className="container-x py-14">
        <div className="flex gap-12 items-start">
          {/* ── Sticky Table of Contents ──────────────────────────────── */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 self-start">
            <div className="paper-card p-5 rounded-sm overflow-hidden">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">
                Contents
              </div>
              <nav className="space-y-0.5">
                {SECTIONS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-left text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-brand/10 text-brand border-l-2 border-brand pl-2.5"
                          : "text-ink/55 hover:text-ink hover:bg-ink/4"
                      }`}
                    >
                      <Icon
                        size={12}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-brand" : "text-ink/35 group-hover:text-ink/60"
                        }`}
                      />
                      <span className="leading-tight">{i + 1}. {s.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-ink/10">
                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center text-xs py-2.5 rounded-sm"
                >
                  Contact Us <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Policy Content ────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">

            {/* 1. Information We Collect */}
            <PolicySection id="information-we-collect" icon={Eye} number={1} title="Information We Collect">
              <Para>We may collect the following types of information when you interact with our website or services:</Para>

              <SubHeading>Personal Information</SubHeading>
              <Para>When you contact us or submit an enquiry, we may collect:</Para>
              <BulletList
                items={[
                  "Full Name",
                  "Email Address",
                  "Mobile Number",
                  "Company Name",
                  "Business Type",
                  "State or City",
                  "GST Number (where applicable)",
                  "PAN or other registration details (only when required for service delivery)",
                  "Documents submitted for registrations or compliance services",
                ]}
              />

              <SubHeading>Automatically Collected Information</SubHeading>
              <Para>When you visit our website, we may automatically collect:</Para>
              <BulletList
                items={[
                  "IP Address",
                  "Browser Type",
                  "Device Information",
                  "Operating System",
                  "Referral Source",
                  "Pages Visited",
                  "Time Spent on Website",
                  "Clickstream Data",
                ]}
              />
              <Para>
                This information helps us improve website performance and user experience.
              </Para>
            </PolicySection>

            {/* 2. How We Use Your Information */}
            <PolicySection id="how-we-use" icon={UserCheck} number={2} title="How We Use Your Information">
              <Para>We use your information to:</Para>
              <BulletList
                items={[
                  "Respond to your enquiries",
                  "Provide consultation and professional services",
                  "Process registrations and compliance services",
                  "Contact you regarding your request",
                  "Verify submitted information",
                  "Improve our website and services",
                  "Send service updates",
                  "Share relevant business updates, compliance reminders, newsletters, and promotional communications (where permitted)",
                  "Comply with legal and regulatory obligations",
                ]}
              />
            </PolicySection>

            {/* 3. Marketing Communications */}
            <PolicySection id="marketing-communications" icon={Megaphone} number={3} title="Marketing Communications">
              <Para>
                If you provide your contact details through our website, Meta Lead Ads, Google Ads, landing pages,
                WhatsApp forms, or other lead generation campaigns, you consent to being contacted by RightTeam through:
              </Para>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                {["Phone Calls", "SMS", "WhatsApp", "Email", "Other Electronic Channels"].map((ch) => (
                  <div
                    key={ch}
                    className="flex items-center gap-2 border border-ink/10 bg-alt rounded-sm px-3 py-2.5 text-sm font-medium text-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {ch}
                  </div>
                ))}
              </div>

              <SubHeading>These communications may include:</SubHeading>
              <BulletList
                items={[
                  "Business registration updates",
                  "Compliance reminders",
                  "Regulatory updates",
                  "Service offers",
                  "Educational content",
                  "Business insights",
                  "Promotional campaigns",
                ]}
              />

              <div className="mt-5 bg-brand/6 border border-brand/20 rounded-sm p-4 flex items-start gap-3">
                <Shield size={15} className="text-brand shrink-0 mt-0.5" />
                <p className="text-sm text-ink/70 leading-relaxed">
                  You may <strong className="text-ink">opt out</strong> of promotional communications at any time by{" "}
                  <Link to="/contact" className="link-brand font-semibold">contacting us</Link> or using the
                  unsubscribe option available in our emails.
                </p>
              </div>
            </PolicySection>

            {/* 4. Lead Generation Campaigns */}
            <PolicySection id="lead-generation" icon={Target} number={4} title="Lead Generation Campaigns">
              <Para>
                We may collect information through various marketing platforms, including but not limited to:
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {[
                  "Meta (Facebook & Instagram) Lead Ads",
                  "Google Ads",
                  "LinkedIn Campaigns",
                  "Website Contact Forms",
                  "Landing Pages",
                  "WhatsApp Campaigns",
                  "Newsletter Subscription Forms",
                ].map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-2.5 border border-ink/10 rounded-sm px-4 py-2.5 text-sm text-ink/80 bg-white"
                  >
                    <ChevronRight size={12} className="text-brand shrink-0" />
                    {platform}
                  </div>
                ))}
              </div>
              <Para>
                The information collected is used solely for responding to your enquiry, providing requested services,
                and sharing relevant business-related communications.
              </Para>
            </PolicySection>

            {/* 5. Cookies */}
            <PolicySection id="cookies" icon={Cookie} number={5} title="Cookies & Tracking Technologies">
              <Para>We use cookies and similar technologies to:</Para>
              <BulletList
                items={[
                  "Improve website performance",
                  "Remember user preferences",
                  "Analyze visitor behavior",
                  "Measure marketing campaign effectiveness",
                  "Deliver relevant advertisements",
                ]}
              />
              <Para>
                Third-party services such as Google Analytics, Meta Pixel, and similar tools may also collect certain
                information in accordance with their respective privacy policies.
              </Para>
              <div className="mt-4 border border-ink/10 rounded-sm p-4 bg-alt">
                <p className="text-sm text-ink/70 leading-relaxed">
                  <strong className="text-ink">Cookie control:</strong> You may disable cookies through your browser
                  settings; however, certain website features may not function properly as a result.
                </p>
              </div>
            </PolicySection>

            {/* 6. Information Sharing */}
            <PolicySection id="information-sharing" icon={Share2} number={6} title="Information Sharing">
              <div className="flex items-start gap-3 bg-ink text-white rounded-sm p-4 mb-5">
                <Lock size={15} className="text-brand shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-white/85">
                  We do <strong>not</strong> sell, rent, or trade your personal information. Full stop.
                </p>
              </div>
              <Para>We may share information only with:</Para>
              <BulletList
                items={[
                  "Government authorities where required for registration or statutory compliance",
                  "Trusted technology providers",
                  "Payment processing partners",
                  "Legal or regulatory authorities when required by law",
                  "Professional consultants assisting in service delivery",
                ]}
              />
              <Para>All third parties are expected to protect your information appropriately.</Para>
            </PolicySection>

            {/* 7. Data Security */}
            <PolicySection id="data-security" icon={Lock} number={7} title="Data Security">
              <Para>
                We implement appropriate technical and organizational measures to safeguard your personal information
                against unauthorized access, misuse, alteration, or disclosure.
              </Para>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
                {[
                  { label: "Encryption", desc: "Data encrypted in transit and at rest" },
                  { label: "Access Controls", desc: "Role-based access with audit logs" },
                  { label: "Monitoring", desc: "Continuous security monitoring" },
                ].map((item) => (
                  <div key={item.label} className="paper-card p-4 rounded-sm text-center">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-3">
                      <Lock size={14} className="text-brand" />
                    </div>
                    <div className="font-semibold text-ink text-sm">{item.label}</div>
                    <div className="text-xs text-ink/55 mt-1 leading-tight">{item.desc}</div>
                  </div>
                ))}
              </div>
              <Para>
                While we strive to use commercially acceptable means to protect your information, no method of internet
                transmission or electronic storage is completely secure.
              </Para>
            </PolicySection>

            {/* 8. Data Retention */}
            <PolicySection id="data-retention" icon={Database} number={8} title="Data Retention">
              <Para>We retain personal information only for as long as necessary to:</Para>
              <BulletList
                items={[
                  "Deliver requested services",
                  "Maintain statutory records",
                  "Meet legal obligations",
                  "Resolve disputes",
                  "Enforce agreements",
                ]}
              />
              <Para>
                When no longer required, information is securely deleted or anonymized.
              </Para>
            </PolicySection>

            {/* 9. Your Rights */}
            <PolicySection id="your-rights" icon={Users} number={9} title="Your Rights">
              <Para>Subject to applicable law, you may request to:</Para>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {[
                  { right: "Access", desc: "View your personal information we hold" },
                  { right: "Correct", desc: "Fix inaccurate or outdated information" },
                  { right: "Update", desc: "Keep your information current" },
                  { right: "Withdraw Consent", desc: "Opt out of marketing communications" },
                  { right: "Delete", desc: "Request deletion where legally permissible" },
                ].map((r) => (
                  <div
                    key={r.right}
                    className="flex items-start gap-3 border border-ink/10 rounded-sm p-4 bg-white hover:border-brand/30 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-6 h-6 rounded-sm bg-brand text-white flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck size={12} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">{r.right}</div>
                      <div className="text-xs text-ink/55 mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Para>To exercise these rights, please contact us using the details below.</Para>
            </PolicySection>

            {/* 10. Third-Party Links */}
            <PolicySection id="third-party" icon={Globe} number={10} title="Third-Party Links">
              <Para>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                or content of external websites. We encourage users to review their privacy policies before sharing
                personal information.
              </Para>
            </PolicySection>

            {/* 11. Children's Privacy */}
            <PolicySection id="childrens-privacy" icon={Shield} number={11} title="Children's Privacy">
              <Para>
                Our services are intended for business owners, entrepreneurs, startups, and organizations. We do not
                knowingly collect personal information from individuals under the age of <strong className="text-ink">18</strong>.
              </Para>
            </PolicySection>

            {/* 12. Changes to Policy */}
            <PolicySection id="changes" icon={RefreshCw} number={12} title="Changes to This Privacy Policy">
              <Para>
                We may update this Privacy Policy periodically to reflect changes in legal requirements or our business
                practices. The updated version will be posted on this page with the revised Effective Date.
              </Para>
              <div className="mt-4 border border-ink/10 rounded-sm p-4 bg-alt flex items-start gap-3">
                <Clock size={14} className="text-brand shrink-0 mt-0.5" />
                <Para>
                  We recommend reviewing this policy periodically to stay informed of how we are protecting your information.
                </Para>
              </div>
            </PolicySection>

            {/* 13. Contact Us */}
            <PolicySection id="contact-us" icon={Mail} number={13} title="Contact Us">
              <Para>
                If you have any questions regarding this Privacy Policy or our data practices, please contact us:
              </Para>

              <div className="mt-5 border border-ink/10 rounded-sm overflow-hidden">
                {/* Header */}
                <div className="bg-ink text-white px-6 py-4 flex items-center gap-3">
                  <Shield size={16} className="text-brand" />
                  <span className="font-semibold text-sm tracking-wide">RightTeam — Data Privacy</span>
                </div>
                {/* Contact details */}
                <div className="divide-y divide-ink/8">
                  <a
                    href="mailto:support@rightteam.in"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Email</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">
                        support@rightteam.in
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:+91XXXXXXXXXX"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Phone</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">
                        +91 XXXXXXXXXX
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://www.rightteam.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-alt transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <Globe size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Website</div>
                      <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">
                        www.rightteam.in
                      </div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 px-6 py-4">
                    <div className="w-8 h-8 rounded-sm bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-brand" />
                    </div>
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest text-ink/40">Address</div>
                      <div className="text-sm text-ink/80 leading-relaxed">
                        Palladium Building, B1-505, Corporate Rd,<br />
                        near Vodafone House, Prahlad Nagar,<br />
                        Ahmedabad, Gujarat 380015
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* ── Consent statement ──────────────────────────────────── */}
            <div className="mt-12 border border-ink bg-ink text-white rounded-sm p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
                  <UserCheck size={18} className="text-brand" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white mb-3">Your Consent</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By using our website, submitting any enquiry, completing a lead form, subscribing to our newsletter,
                    or interacting with our advertisements, you acknowledge that you have read, understood, and agreed to
                    this Privacy Policy.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary text-sm rounded-sm">
                      Reach Our Team <ArrowRight size={14} />
                    </Link>
                    <Link to="/quote" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Document footer ────────────────────────────────────── */}
            <div className="mt-8 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                Document Ref: RT/LEGAL/PP/2026 · Effective 01 Jul 2026
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-ink/35">
                © {new Date().getFullYear()} RightTeam Pvt. Ltd. — All rights reserved
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ── Mobile ToC quick-jump (horizontal scroll) ─────────────────── */}
      <div className="xl:hidden sticky bottom-0 z-30 bg-white border-t border-ink/10 shadow-md">
        <div className="container-x py-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-brand text-white"
                      : "bg-alt text-ink/60 hover:bg-ink/8 hover:text-ink"
                  }`}
                >
                  <Icon size={11} />
                  {i + 1}. {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
