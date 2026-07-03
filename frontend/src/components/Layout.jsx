import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { PILLARS } from "../data/services";
import { CornerSeal } from "./Seal";

const NAV = [
  ...PILLARS.map((p) => ({ label: p.label, to: `/${p.slug}` })),
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/15">
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3" data-testid="brand-home-link">
          <CornerSeal color="#0B1E3D" size={28} />
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-tight text-ink">
              RightTeam<span className="text-gold">.in</span>
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-slate2 mt-1">
              Compliance Practice · Est. 2019
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.slice(0, 5).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink/80 hover:text-ink relative py-1 hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:-bottom-0.5 hover:after:h-[2px] hover:after:bg-gold"
              data-testid={`nav-${n.to.slice(1)}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919999999999"
            className="mono text-xs text-slate2 hover:text-ink inline-flex items-center gap-1"
          >
            <Phone size={13} /> +91 99999 99999
          </a>
          <Link to="/quote" className="btn-primary" data-testid="header-quote-btn">
            Get a Quote
          </Link>
        </div>

        <button
          className="lg:hidden text-ink"
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-toggle"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/15 bg-paper">
          <div className="container-x py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-ink/85 border-b border-ink/10"
                data-testid={`mobile-nav-${n.to.slice(1)}`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-3"
              data-testid="mobile-quote-btn"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  const groups = PILLARS.map((p) => ({
    title: p.label,
    to: `/${p.slug}`,
  }));
  return (
    <footer className="mt-20 border-t border-ink/15 bg-ink text-white">
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <CornerSeal color="#FFFFFF" size={28} />
            <div>
              <div className="font-display text-lg font-bold">
                RightTeam<span className="text-gold">.in</span>
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-white/60 mt-1">
                CIN · U74999MH2019PTC000000
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 mt-4 leading-relaxed">
            An Indian compliance and registration practice — chartered accountants, company secretaries and IP attorneys, in-house.
          </p>
          <div className="mono text-xs text-white/60 mt-6 space-y-1">
            <div>hello@rightteam.in</div>
            <div>+91 99999 99999</div>
            <div>4th Floor, Nariman Chambers, Nariman Point, Mumbai 400021</div>
          </div>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Practice areas</div>
          <ul className="space-y-2 text-sm">
            {groups.map((g) => (
              <li key={g.to}>
                <Link to={g.to} className="hover:text-gold">{g.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Firm</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About the practice</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Client references</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-gold">Request a quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-white/50 mb-4">Statutory registrations</div>
          <ul className="space-y-2 text-sm text-white/80 mono text-[11px] uppercase tracking-widest">
            <li>ICAI Member Firm</li>
            <li>ICSI Registered Practice</li>
            <li>GSTIN 27AABCU9603R1ZM</li>
            <li>Bar Council MAH/1092/2015</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="mono text-[11px] tracking-widest text-white/50 uppercase">
            © {new Date().getFullYear()} RightTeam Consultancy Pvt. Ltd. Filings subject to government processing timelines.
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
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
