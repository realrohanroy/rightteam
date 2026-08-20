import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { ServiceIcon } from "./ServiceIcons";
import { motion } from "framer-motion";

export const ServiceCard = ({ service }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="h-full"
  >
    <Link
      to={`/service/${service.slug}`}
      data-testid={`service-card-${service.slug}`}
      className="paper-card flex flex-col p-6 group h-full"
    >
      {/* Bespoke service icon — concrete metaphor per service, not a generic badge */}
      <div className="w-14 h-14 rounded-sm bg-alt flex items-center justify-center mb-2">
        <ServiceIcon slug={service.slug} size={40} color="#0B1E3D" />
      </div>


      <h3 className="font-display text-xl text-ink mt-1 leading-tight">
        {service.name}
      </h3>
      <p className="text-sm text-slate2 mt-2 leading-relaxed flex-1">
        {service.oneLine}
      </p>

      <div className={`mt-5 pt-4 border-t border-ink/10 flex items-end ${service.startingPrice ? 'justify-between' : 'justify-end'}`}>
        {service.startingPrice && (
          <div>
            <div className="mono text-[11px] uppercase tracking-widest text-slate2">
              Starting at
            </div>
            <div className="font-display text-2xl text-ink font-bold leading-none mt-1">
              {service.startingPrice}
            </div>
          </div>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-brand transition-colors">
          View details
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-approve">
        <Check size={14} strokeWidth={3} />
        <span className="mono uppercase tracking-widest">Filed by a dedicated manager</span>
      </div>
    </Link>
  </motion.div>
);
