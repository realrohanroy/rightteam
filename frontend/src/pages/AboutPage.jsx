import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { CredentialRow } from "../components/Seal";
import { CompliancePDFCta } from "../components/CompliancePDFCta";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { OnTimeRing } from "../components/OnTimeRing";
import { DuotoneImage } from "../components/DuotoneImage";

export default function AboutPage() {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <Layout>
      <section className="container-x pt-10 relative pb-10">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">Home / About the practice</div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">
          <div className="max-w-xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.05]">
              A statutory compliance practice run by chartered accountants and company secretaries.
            </h1>
            <p className="text-base sm:text-lg text-ink/75 mt-5 leading-relaxed prose-narrow">
              Incorporated in Ahmedabad in 2026, Right Team now services 2000+ businesses across 24 states and UT with in-house CAs, CS and IP attorneys.
            </p>
            
            <div className="mt-8 relative h-[300px] w-full lg:hidden rounded-md overflow-hidden mb-6 shadow-xl border border-ink/5">
              <img 
                src="/images/about_hero.png" 
                alt="Professional Indian corporate accounting office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="hidden lg:block relative h-[450px] w-full rounded-md overflow-hidden shadow-2xl transition-transform hover:-translate-y-1 duration-500 border border-ink/5">
            <img 
              src="/images/about_hero.png" 
              alt="Professional Indian corporate accounting office"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="hairline pt-8" />
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "2000+", l: "Businesses on retainer" },
              { n: "500+", l: "Compliance & Legal Solutions" },
              { n: "24", l: "States and Union Territories" },
              { n: "0", l: "Penalty missed" },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-brand pl-5 py-1">
                <div className="font-display text-3xl font-bold text-ink leading-none">{s.n}</div>
                <div className="mono text-[11px] uppercase tracking-widest text-slate2 mt-2 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <OnTimeRing percentage={100} label="On-time filing rate" />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-32 container-x pb-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-slate2">FAQs</div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="hidden lg:flex mt-20 ml-10 justify-start">
            <img 
              src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/questions_75e0.svg" 
              alt="FAQ illustration" 
              className="w-64 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply" 
              style={{ filter: "sepia(1) hue-rotate(330deg) saturate(3) brightness(0.9)" }}
              loading="lazy"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion.Root type="multiple" defaultValue={["faq-0"]} className="space-y-0 border-t border-ink/10">
            {[
              { 
                q: "How long does company registration actually take?", 
                a: "Usually 7-10 working days for a Pvt Ltd or LLP, once your documents are in order. Honestly, the delays we see are almost never on the government's side, it's incomplete paperwork. That's why we check everything before we file, not after it gets rejected." 
              },
              { 
                q: "Do I really need a CA, or can I just do this myself?", 
                a: "You can register it yourself, no law against that. But we've seen enough rejected applications to know where people trip up, a DIN mismatch here, a naming conflict there. We're not saying you can't do it. We're saying we've already made those mistakes so you don't have to." 
              },
              { 
                q: "What happens if I miss a GST or ROC deadline?", 
                a: "It adds up faster than most people expect, and on some filings there's no cap on the penalty. The good news, we clear lapsed filings all the time, even multi-year ones. It's fixable. Just gets pricier the longer you sit on it." 
              },
              { 
                q: "How does your pricing work?", 
                a: "One fixed fee, told to you upfront, before you say yes to anything. And we don't hide the government fee inside our number either, you'll always know what's ours and what's the state's." 
              },
              { 
                q: "What if you're the one who's late?", 
                a: "Then you get your fee back. Simple as that, as long as the delay was on us, not because we were waiting on a document from you. This is also why every client gets one manager who owns the whole thing, not a rotating support queue." 
              },
              { 
                q: "Do you only work with startups?", 
                a: "No, half our clients are companies that have been running for years and just need their compliance sorted. Startups usually come to us through \"Start a Business.\" Older businesses usually land in \"Tax & Compliance\" or \"People & Money.\"" 
              },
            ].map((v, i) => (
              <Accordion.Item key={i} value={`faq-${i}`} className="border-b border-ink/10">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start sm:items-center justify-between py-5 text-left group gap-4">
                    <span className="font-semibold text-ink text-base sm:text-lg pr-4">{v.q}</span>
                    <ChevronDown size={18} className="text-ink shrink-0 transition-transform group-data-[state=open]:rotate-180 mt-1 sm:mt-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-5">
                  <p className="text-slate2 text-sm sm:text-base leading-relaxed prose-narrow">{v.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <section className="container-x py-16">
        <CompliancePDFCta />
      </section>

      <section className="container-x pb-6">
        <div className="border border-ink bg-ink text-white p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between rounded-sm">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight">Request a fixed-fee quote.</h3>
          </div>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 font-medium hover:animate-stamp-down rounded-sm">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
