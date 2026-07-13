import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { PILLARS } from "../data/services";
import { CornerSeal } from "./Seal";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  
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
      <div className="hidden md:block bg-white border-b border-ink/10">
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
        <div className="container-x flex items-center justify-between py-5 lg:py-12">
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
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-ink/10 shadow-lg py-2 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {PILLARS.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/${p.slug}`}
                          className="block px-4 py-2.5 text-sm text-[#0B1E3D] hover:bg-alt font-medium transition-colors"
                        >
                          {p.label}
                        </Link>
                      ))}
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
          <div className={`lg:hidden border-t absolute top-full left-0 w-full shadow-lg ${isHome ? "bg-black/95 border-white/10" : "bg-white border-ink/10"}`}>
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
                        <div className="pl-4 pb-3 flex flex-col gap-1">
                          {PILLARS.map((p) => (
                            <Link
                              key={p.slug}
                              to={`/${p.slug}`}
                              onClick={() => {
                                setOpen(false);
                                setServicesOpen(false);
                              }}
                              className={`py-2 text-sm font-medium transition-colors ${isHome ? "text-white/70 hover:text-white" : "text-ink/80 hover:text-brand"}`}
                            >
                              {p.label}
                            </Link>
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
  const groups = PILLARS.map((p) => ({
    title: p.label,
    to: `/${p.slug}`,
  }));
  return (
    <footer className="border-t border-ink/15 bg-ink text-white">
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <CornerSeal color="#FFFFFF" size={28} />
            <div>
              <div className="font-display text-lg font-bold">
                <span className="text-brand">Right</span><span className="text-white">Team</span><span className="text-brand">.in</span>
              </div>
              
            </div>
          </div>
          <p className="text-sm text-white/70 mt-4 leading-relaxed">
            Indian compliance and registration practice — chartered accountants, company secretaries and IP attorneys, in-house.
          </p>
          <div className="mono text-xs text-white/60 mt-6 space-y-1">
            <div>hello@rightteam.in</div>
            <div>+91 99999 99999</div>
            <div>Palladium Building, B1-505, Corporate Rd, near Vodafone House, Prahlad Nagar, Ahmedabad, Gujarat 380015</div>
          </div>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Our Services</div>
          <ul className="space-y-2 text-sm">
            {groups.map((g) => (
              <li key={g.to}>
                <Link to={g.to} className="hover:text-brand">{g.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Firm</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand">About the practice</Link></li>
            <li><Link to="/reviews" className="hover:text-brand">Client references</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-brand">Request a quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Statutory registrations</div>
          <ul className="space-y-2 text-sm text-white/80 mono text-[11px] uppercase tracking-widest">
            <li>ICAI Member Firm</li>
            <li>ICSI Registered Practice</li>
            <li>GSTIN [TO BE CONFIRMED]</li>
            <li>Bar Council [TO BE CONFIRMED]</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="mono text-[11px] tracking-widest text-white/50 uppercase">
            © {new Date().getFullYear()} RightTeam Pvt.Ltd.
            Filings subject to government processing timelines.
          </div>
          <div className="mono text-[11px] tracking-widest text-white/50 uppercase">
            Ref: RT/WEB/2026/HOME
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
