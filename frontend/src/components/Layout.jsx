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
          <CornerSeal color="#12203D" />
          <div className="leading-none">
            <div className="font-display text-xl font-black tracking-tight text-ink">
              RightTeam<span className="text-gold">.in</span>
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-slate2 mt-1">
              Compliance · Since 2019
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
    <footer className="mt-24 border-t border-ink/20 bg-ink text-paper">
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <CornerSeal color="#F7F4EC" />
            <div>
              <div className="font-display text-xl font-black">
                RightTeam<span className="text-gold">.in</span>
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-paper/60 mt-1">
                CIN · U74999MH2019PTC000000
              </div>
            </div>
          </div>
          <p className="text-sm text-paper/70 mt-4 leading-relaxed">
            Business compliance and registration for Indian startups and SMEs. Filed by chartered accountants, company secretaries and IP attorneys.
          </p>
          <div className="mono text-xs text-paper/60 mt-6 space-y-1">
            <div>hello@rightteam.in</div>
            <div>+91 99999 99999</div>
            <div>4th Floor, Nariman Point, Mumbai 400021</div>
          </div>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-paper/50 mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {groups.map((g) => (
              <li key={g.to}>
                <Link to={g.to} className="hover:text-gold">{g.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-paper/50 mb-4">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-gold">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono text-[11px] uppercase tracking-widest text-paper/50 mb-4">Legal</div>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>GST 27AABCU9603R1ZM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="mono text-[11px] tracking-widest text-paper/50 uppercase">
            © {new Date().getFullYear()} RightTeam Consultancy Pvt. Ltd. All filings are subject to government processing timelines.
          </div>
          <div className="mono text-[11px] tracking-widest text-paper/50 uppercase">
            Document Ref: RT/WEB/2026/HOME
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
