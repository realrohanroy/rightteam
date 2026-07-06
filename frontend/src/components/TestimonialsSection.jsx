/**
 * TestimonialsSection.jsx
 *
 * CONTENT POLICY: This component intentionally ships with EMPTY / STUBBED content.
 * Do NOT populate with invented names, quotes, or companies.
 * Replace TESTIMONIALS array items with real client-approved content before going live.
 * Each item follows the exact structure below.
 */
import React from "react";

const Star = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M8 1.5L9.8 6.1H14.8L10.8 9L12.2 13.6L8 10.9L3.8 13.6L5.2 9L1.2 6.1H6.2L8 1.5Z"
      fill={filled ? "#8A6D1F" : "none"}
      stroke="#8A6D1F"
      strokeWidth="1.2"
    />
  </svg>
);

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} filled={n <= rating} />
    ))}
  </div>
);

/**
 * STUB STRUCTURE — replace with real, signed-off testimonials before launch.
 * Fields: quote (string), name (string), role (string), company (string),
 *         city (string), rating (1–5), initials (2 chars for avatar).
 */
const TESTIMONIALS = [
  // {
  //   quote: "Replace with real client quote — must have written sign-off before publishing.",
  //   name: "Client Name",
  //   role: "Founder / Director / CFO",
  //   company: "Company Name",
  //   city: "City",
  //   rating: 5,
  //   initials: "AB",
  // },
  // Add additional real testimonials here.
];

/**
 * TestimonialsSection renders nothing (null) when TESTIMONIALS array is empty,
 * so uncommenting and populating the array above is all that's needed to activate it.
 */
export const TestimonialsSection = () => {
  if (!TESTIMONIALS.length) return null;

  return (
    <section className="section-navy py-20" data-testid="testimonials">
      <div className="container-x">
        <div className="max-w-3xl mb-10">
          <div className="mono text-[11px] uppercase tracking-[0.22em] text-gold">
            Client references
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white mt-3 leading-tight">
            Heard from the founders who filed with us.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col gap-4 backdrop-blur-sm"
              data-testid={`testimonial-${i}`}
            >
              <StarRating rating={t.rating} />

              <blockquote className="text-white/85 leading-relaxed text-sm flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-ink border border-white/20 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-sm text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="mono text-[10px] uppercase tracking-widest text-white/50 mt-0.5">
                    {t.role} · {t.company}
                  </div>
                  <div className="mono text-[10px] uppercase tracking-widest text-white/40">
                    {t.city}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
