import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/Layout";
import { RiskCalculator } from "../components/RiskCalculator";
import { StaticComplianceTable } from "../components/StaticComplianceTable";
import { ENTITY_TYPES, filingsFor } from "../data/marketing";
import NotFoundPage from "./NotFoundPage";

export default function EntityCompliancePage() {
  const { entity } = useParams();
  
  const entityDef = ENTITY_TYPES.find((et) => et.key === entity);
  if (!entityDef) {
    return <NotFoundPage />;
  }

  // Get base filings for this entity (assuming employees = yes to show max base filings)
  const filings = filingsFor(entity, true);

  const title = `${entityDef.label} Compliance Calendar 2026 — Due Dates & Penalties`;
  const description = `Complete list of statutory due dates, MCA filings, and tax penalties for a ${entityDef.label} in India. View the full 2026 compliance calendar.`;

  // Generate FAQ / Table Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filings.map((f) => ({
      "@type": "Question",
      "name": `What is the due date for ${f.name} for a ${entityDef.label}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `The due date is ${f.due}. Penalty for non-compliance: ${f.penalty}`
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <section className="bg-alt py-20 border-b border-ink/10">
        <div className="container-x">
          <div className="mb-4">
            <Link to="/compliance-calendar" className="text-brand text-sm hover:underline">
              &larr; Back to Compliance Calendar
            </Link>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight max-w-3xl">
            {entityDef.label} Compliance Calendar 2026
          </h1>
          <p className="text-slate2 mt-4 max-w-2xl text-lg">
            Review the base statutory requirements, due dates, and potential penalties for your entity type below.
          </p>

          <StaticComplianceTable entity={entity} entityLabel={entityDef.label} filings={filings} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-x text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl text-ink leading-tight">
            Filter by State & Employees
          </h2>
          <p className="text-slate2 mt-3 text-sm">
            Use the interactive calculator below to find state-specific filings like Professional Tax.
          </p>
        </div>
        <RiskCalculator defaultEntity={entity} />
      </section>
    </Layout>
  );
}
