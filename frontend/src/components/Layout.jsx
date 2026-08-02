import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { PILLARS, SERVICES } from "../data/services";
import { CornerSeal } from "./Seal";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Blogs", to: "/blogs" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(PILLARS[0]?.slug);
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  
  // Dynamic classes for merging with the dark hero image
  const headerClass = isHome 
    ? "absolute top-0 left-0 right-0 z-40 bg-transparent border-transparent"
    : "sticky top-0 z-40 bg-white shadow-sm border-b border-ink/10";
    
  const textColor = isHome ? "text-white/90 hover:text-white" : "text-[#0B1E3D] hover:text-brand";
  const logoTeamColor = isHome ? "text-white" : "text-[#0B1E3D]";
  const chevronColor = isHome ? "text-white/80" : "text-[#0B1E3D]";
  const buttonClass = isHome 
    ? "bg-white text-[#0B1E3D] hover:bg-white/90"
    : "bg-[#0B1E3D] text-white hover:bg-[#08162e]";

  return (
    <>
      {/* ── Top announcement bar ────────────────────────────────────────────── */}
      <div className="hidden lg:block bg-white border-b border-ink/10">
        <div className="container-x py-2 flex items-center justify-between text-sm">
          {/* Left — urgency + curiosity hook */}
          <p className="text-ink/75 font-medium">
            Don't let a missed deadline cost you a penalty.{" "}
            <Link to="/quote" className="text-brand font-semibold hover:underline underline-offset-2 transition-colors">
              Get a free compliance check →
            </Link>
          </p>
          {/* Right — direct contact reassurance */}
          <div className="flex items-center gap-6 text-ink/75 font-medium">
            <a
              href="mailto:hello@rightteam.in"
              className="flex items-center gap-1.5 hover:text-brand transition-colors"
            >
              <Mail size={14} className="text-brand" />
              hello@rightteam.in
            </a>
            <a
              href="tel:18004103090"
              className="flex items-center gap-1.5 hover:text-brand transition-colors"
            >
              <Phone size={14} className="text-brand" />
              1800 410 3090
            </a>
          </div>
        </div>
      </div>

      <header className={headerClass}>
        <div className="container-x flex items-center justify-between py-4 lg:py-12">
          <Link to="/" className="flex items-center gap-3" data-testid="brand-home-link">
            <div className="leading-none">
              <div className="font-display text-[28px] font-bold tracking-tight">
                <span className="text-brand">Right</span><span className={logoTeamColor}>Team</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => {
              if (n.hasDropdown) {
                return (
                  <div key={n.label} className="relative group py-2">
                    <button
                      className={`text-[15px] flex items-center gap-1 font-semibold transition-colors focus:outline-none ${textColor}`}
                    >
                      {n.label}
                      <ChevronDown size={16} className={`${chevronColor} group-hover:rotate-180 transition-transform`} />
                    </button>
                    {/* Dropdown Menu - Two Pane Mega Menu */}
                    <div className="absolute top-full -left-48 mt-1 w-[800px] bg-white border border-ink/10 shadow-xl rounded flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden min-h-[400px]">
                      {/* Left Pane: Categories */}
                      <div className="w-1/3 bg-gray-50 border-r border-ink/10 py-4 flex flex-col">
                        {PILLARS.map((p) => (
                          <Link
                            key={p.slug}
                            to={`/${p.slug}`}
                            onMouseEnter={() => setActiveMegaCategory(p.slug)}
                            className={`w-full text-left px-6 py-3 text-[14px] font-medium transition-colors ${activeMegaCategory === p.slug ? "bg-white text-brand border-l-4 border-brand font-semibold shadow-sm" : "text-[#0B1E3D] hover:bg-white/50 hover:text-brand border-l-4 border-transparent"}`}
                          >
                            {p.label}
                          </Link>
                        ))}
                      </div>
                      {/* Right Pane: Services */}
                      <div className="w-2/3 bg-white p-6">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 content-start">
                          {SERVICES.filter((s) => s.pillar === activeMegaCategory).map((service) => (
                            <Link
                              key={service.slug}
                              to={`/service/${service.slug}`}
                              className="text-sm text-ink/80 hover:text-brand transition-colors font-medium"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={n.label}
                  to={n.to}
                  className={`text-[15px] flex items-center gap-1 font-semibold transition-colors ${n.label === "Home" && !isHome ? "text-ink" : textColor}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/contact"
              className={`text-[15px] font-semibold px-6 py-2.5 rounded transition-colors ${buttonClass}`}
            >
              Book a Meeting
            </Link>
          </div>

          <button
            className={`lg:hidden ${isHome ? "text-white" : "text-[#0B1E3D]"}`}
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {open && (
          <div className={`lg:hidden border-t absolute top-full left-0 w-full shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto ${isHome ? "bg-black/95 border-white/10" : "bg-white border-ink/10"}`}>
            <div className="container-x py-4 flex flex-col gap-1">
              {NAV.map((n) => {
                if (n.hasDropdown) {
                  return (
                    <div key={n.label} className={`border-b ${isHome ? "border-white/5" : "border-ink/5"} flex flex-col`}>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`w-full py-3 font-semibold flex items-center justify-between text-left focus:outline-none ${isHome ? "text-white/90" : "text-[#0B1E3D]"}`}
                      >
                        <span>{n.label}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {servicesOpen && (
                        <div className="pl-4 pb-3 flex flex-col gap-2">
                          {PILLARS.map((p) => (
                            <div key={p.slug} className="flex flex-col">
                              <Link
                                to={`/${p.slug}`}
                                onClick={() => {
                                  setOpen(false);
                                  setServicesOpen(false);
                                }}
                                className={`py-1 text-sm font-semibold transition-colors ${isHome ? "text-white/90 hover:text-white" : "text-[#0B1E3D] hover:text-brand"}`}
                              >
                                {p.label}
                              </Link>
                              <div className="pl-3 mt-1 flex flex-col gap-1 border-l-2 border-brand/20">
                                {SERVICES.filter(s => s.pillar === p.slug).map(service => (
                                  <Link
                                    key={service.slug}
                                    to={`/service/${service.slug}`}
                                    onClick={() => {
                                      setOpen(false);
                                      setServicesOpen(false);
                                    }}
                                    className={`py-1 text-[13px] font-medium transition-colors ${isHome ? "text-white/60 hover:text-white" : "text-ink/70 hover:text-brand"}`}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={`py-3 border-b font-semibold flex items-center justify-between ${isHome ? "border-white/5 text-white/90" : "border-ink/5 text-[#0B1E3D]"}`}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={`text-center py-3 rounded mt-4 font-semibold ${buttonClass}`}
              >
                Book a Meeting
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};


export const Footer = () => {
  return (
    <footer className="border-t border-ink/15 bg-ink text-white">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Logo, description and contact info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <CornerSeal color="#FFFFFF" size={28} />
                <div className="font-display text-lg font-bold">
                  <span className="text-brand">Right</span><span className="text-white">Team</span><span className="text-brand">.in</span>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3 max-w-xl leading-relaxed">
                Indian compliance and registration practice. Chartered accountants, company secretaries and IP attorneys, in-house.
              </p>
            </div>
            
            {/* Contact info below the description */}
            <div className="mono text-[11px] uppercase tracking-widest text-white/60 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div><span className="text-brand">EMAIL:</span> hello@rightteam.in</div>
                <div className="hidden sm:block text-white/20">|</div>
                <div><span className="text-brand">CALL:</span> 1800 410 3090</div>
              </div>
              <div className="max-w-md text-white/50 leading-relaxed normal-case">
                Palladium Building, B1-505, Corporate Rd, near Vodafone House, Prahlad Nagar, Ahmedabad, Gujarat 380015
              </div>
            </div>
          </div>

          {/* Right Column: Three links columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:pl-10">
            <div>
              <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">SERVICES</div>
              <ul className="space-y-3 text-sm">
                <li><Link to="/company-registration" className="hover:text-brand transition-colors">Company Registration</Link></li>
                <li><Link to="/licenses-certifications" className="hover:text-brand transition-colors">Licenses & Certifications</Link></li>
                <li><Link to="/taxation-compliance" className="hover:text-brand transition-colors">Taxation & Compliance</Link></li>
                <li><Link to="/intellectual-property" className="hover:text-brand transition-colors">Intellectual Property</Link></li>
                <li><Link to="/international-business" className="hover:text-brand transition-colors">International Business Setup</Link></li>
              </ul>
            </div>

            <div>
              <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">COMPANY</div>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
                <li><Link to="/#services" className="hover:text-brand transition-colors">Our Services</Link></li>
                <li><Link to="/blogs" className="hover:text-brand transition-colors">Blog & Insights</Link></li>
                <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
                <li><Link to="/about#faq" className="hover:text-brand transition-colors">FAQs</Link></li>
                <li><Link to="/careers" className="hover:text-brand transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">LEGAL</div>
              <ul className="space-y-3 text-sm">
                <li><Link to="/privacy-policy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-brand transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-brand transition-colors">Refund Policy</Link></li>
                <li><Link to="/disclaimer" className="hover:text-brand transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-white/15">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="mono text-[11px] tracking-widest text-white/50 uppercase">
            © {new Date().getFullYear()} RightTeam Pvt.Ltd.
            Filings subject to government processing timelines.
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children, activePillar }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
