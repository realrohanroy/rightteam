import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import PillarPage from "@/pages/PillarPage";
import ServicePage from "@/pages/ServicePage";
import QuotePage from "@/pages/QuotePage";
import AboutPage from "@/pages/AboutPage";
import ReviewsPage from "@/pages/ReviewsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ComplianceHubPage from "@/pages/ComplianceHubPage";
import CareerPage from "@/pages/CareerPage";
import EntityCompliancePage from "@/pages/EntityCompliancePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/TermsConditionsPage";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { HelmetProvider } from "react-helmet-async";
import RefundPolicyPage from "@/pages/RefundPolicyPage";

/* Register GSAP plugins globally */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function AppInner() {
  /* Initialize Lenis smooth scroll */
  useSmoothScroll();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/compliance-calendar" element={<ComplianceHubPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/compliance-calendar/:entity" element={<EntityCompliancePage />} />
        <Route path="/service/:slug" element={<ServicePage />} />
        <Route path="/:pillar" element={<PillarPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
