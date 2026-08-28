import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home, FileSearch, Calendar, MessageSquare } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NotFoundPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".error-code", 
      { opacity: 0, y: 100, rotateX: -45 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" }
    )
    .fromTo(".error-line",
      { width: 0 },
      { width: "100%", duration: 0.8, ease: "power3.inOut" },
      "-=0.6"
    )
    .fromTo(".error-content > *",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".quick-link-card",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <Layout>
      <section 
        ref={containerRef}
        className="min-h-[85vh] relative flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden bg-white"
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-slate2/5 blur-[120px]"></div>
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - 404 & Typography */}
          <div className="error-content flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-brand inline-block"></span>
              <span className="text-brand font-semibold tracking-wider text-sm uppercase">Record Not Found</span>
            </div>
            
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-display font-bold leading-none tracking-tighter text-ink mb-4 error-code" style={{ perspective: "1000px" }}>
              404
            </h1>
            
            <div className="w-full h-[1px] bg-slate-200 my-8 error-line relative">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-brand"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight mb-6">
              This filing is missing from the ledger.
            </h2>
            
            <p className="text-lg text-slate2 mb-10 max-w-lg leading-relaxed">
              The compliance page or resource you're looking for has been archived, moved, or never existed. Don't worry, we'll help you get back to business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="btn-primary inline-flex items-center justify-center gap-2 hover:bg-brand-dark transition-all duration-300 px-8 py-4 rounded-sm shadow-lg shadow-brand/20 group"
              >
                <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Return to Dashboard
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 text-ink hover:text-brand transition-colors px-8 py-4 rounded-sm border border-slate-200 hover:border-brand bg-white group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Contact Support
              </Link>
            </div>
          </div>

          {/* Right Column - Helpful Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-ink mb-2 error-content">Helpful Resources</h3>
            
            <Link to="/quote" className="quick-link-card group p-6 rounded-xl border border-slate-200 bg-white hover:border-brand hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-ink font-semibold text-lg group-hover:text-brand transition-colors">Get a Quote</h4>
                <p className="text-slate2 text-sm mt-1">Discover customized tax & MCA compliance plans for your business.</p>
              </div>
            </Link>

            <Link to="/compliance-calendar" className="quick-link-card group p-6 rounded-xl border border-slate-200 bg-white hover:border-brand hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-ink font-semibold text-lg group-hover:text-brand transition-colors">Compliance Calendar</h4>
                <p className="text-slate2 text-sm mt-1">Check upcoming due dates and stay ahead of penalties.</p>
              </div>
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
