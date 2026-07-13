import React from "react";

// Simplified unDraw-style vector illustrations using brand palette

export const RatingIllustration = ({ className = "" }) => (
  <svg viewBox="0 0 400 300" className={`w-full h-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="80" width="300" height="180" rx="10" fill="#12102C" opacity="0.05" />
    <rect x="70" y="60" width="260" height="180" rx="10" fill="#FFFFFF" stroke="#12102C" strokeWidth="4" />
    <circle cx="200" cy="110" r="30" fill="#E8522B" opacity="0.1" />
    <path d="M200 85l6.5 19.5H227l-16.5 12 6 19-16.5-12-16.5 12 6-19-16.5-12h20.5L200 85z" fill="#E8522B" />
    <path d="M140 100l4.5 13H159l-11.5 8.5 4.5 13.5L140 126.5l-11.5 8.5 4.5-13.5-11.5-8.5h14.5L140 100z" fill="#E8522B" opacity="0.5" />
    <path d="M260 100l4.5 13H279l-11.5 8.5 4.5 13.5L260 126.5l-11.5 8.5 4.5-13.5-11.5-8.5h14.5L260 100z" fill="#E8522B" opacity="0.5" />
    <rect x="100" y="170" width="200" height="8" rx="4" fill="#12102C" opacity="0.2" />
    <rect x="130" y="195" width="140" height="8" rx="4" fill="#12102C" opacity="0.2" />
  </svg>
);

export const DocumentReviewIllustration = ({ className = "" }) => (
  <svg viewBox="0 0 400 300" className={`w-full h-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="120" y="40" width="160" height="220" rx="4" fill="#FFFFFF" stroke="#12102C" strokeWidth="4" />
    <rect x="140" y="70" width="70" height="8" rx="4" fill="#12102C" />
    <rect x="140" y="100" width="120" height="6" rx="3" fill="#12102C" opacity="0.2" />
    <rect x="140" y="120" width="120" height="6" rx="3" fill="#12102C" opacity="0.2" />
    <rect x="140" y="140" width="90" height="6" rx="3" fill="#12102C" opacity="0.2" />
    <circle cx="280" cy="180" r="40" fill="#E8522B" opacity="0.1" />
    <path d="M265 180l10 10 20-20" stroke="#E8522B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarIllustration = ({ className = "" }) => (
  <svg viewBox="0 0 400 300" className={`w-full h-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="100" y="80" width="200" height="180" rx="12" fill="#FFFFFF" stroke="#12102C" strokeWidth="4" />
    <path d="M100 130h200" stroke="#12102C" strokeWidth="4" />
    <rect x="130" y="60" width="20" height="40" rx="10" fill="#E8522B" />
    <rect x="250" y="60" width="20" height="40" rx="10" fill="#E8522B" />
    <circle cx="160" cy="180" r="12" fill="#E8522B" opacity="0.2" />
    <circle cx="160" cy="180" r="4" fill="#E8522B" />
    <rect x="200" y="176" width="60" height="8" rx="4" fill="#12102C" opacity="0.2" />
    <rect x="156" y="216" width="104" height="8" rx="4" fill="#12102C" opacity="0.2" />
  </svg>
);
