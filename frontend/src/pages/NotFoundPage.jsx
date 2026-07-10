import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seal } from "../components/Seal";

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="container-x min-h-[70vh] flex flex-col items-center justify-center text-center py-24 md:py-32">
        <div className="mb-8">
          <Seal
            size={180}
            label="FILING NOT FOUND"
            outerText="· ERROR 404 · REGISTRY RECORD EMPTY ·"
            color="#C1272D"
            animateIn={true}
          />
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl text-ink font-bold tracking-tight max-w-xl leading-tight">
          This record does not exist in the ledger.
        </h1>
        
        <p className="text-base sm:text-lg text-slate2 mt-6 max-w-md leading-relaxed">
          The requested filing, practice area, or resource is unavailable or has been archived. Check the statutory register.
        </p>

        <div className="mt-10">
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 hover:bg-brand-dark transition-colors px-8 py-3.5 rounded-sm"
          >
            Return to the ledger
          </Link>
        </div>
      </section>
    </Layout>
  );
}
