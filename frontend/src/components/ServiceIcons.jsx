/**
 * ServiceIcons.jsx
 * Maps each RightTeam service slug to a Lucide icon.
 * Replaces hand-coded SVG artwork with a consistent icon library.
 * All icons use a unified stroke weight and color system.
 */
import React from "react";
import {
  Building2,
  ShieldCheck,
  Users,
  Heart,
  Landmark,
  Handshake,
  Rocket,
  Search,
  KeyRound,
  Globe,
  Shield,
  ShieldAlert,
  RefreshCw,
  ArrowLeftRight,
  Copyright,
  Lightbulb,
  Receipt,
  CalendarCheck,
  Calculator,
  BarChart3,
  FileText,
  UserCheck,
  GitBranch,
  DoorClosed,
  Wallet,
  ShieldPlus,
  HeartPulse,
  BookOpen,
  TrendingUp,
  BadgeCheck,
  Factory,
  UtensilsCrossed,
  Store,
} from "lucide-react";

// ── Master lookup by slug ─────────────────────────────────────────────────────

const ICON_MAP = {
  // Start a Business
  "private-limited-company": Building2,
  "one-person-company": ShieldCheck,
  "llp-registration": Handshake,
  "section-8-ngo": Heart,
  "public-limited-company": Landmark,
  "partnership-firm": Users,
  "startup-india-recognition": Rocket,
  "company-name-search": Search,
  "digital-signature-certificate": KeyRound,
  "import-export-code": Globe,

  // Protect Your Brand
  "trademark-filing": Shield,
  "trademark-objection-reply": ShieldAlert,
  "trademark-renewal": RefreshCw,
  "trademark-assignment": ArrowLeftRight,
  "copyright-registration": Copyright,
  "patent-filing": Lightbulb,

  // Tax & Compliance
  "gst-registration": Receipt,
  "gst-monthly-filing": CalendarCheck,
  "income-tax-return": Calculator,
  "tds-return-filing": BarChart3,
  "roc-annual-filing": FileText,
  "dir-3-kyc": UserCheck,
  "director-share-changes": GitBranch,
  "company-closure": DoorClosed,

  // People & Money
  "payroll-management": Wallet,
  "pf-registration-filing": ShieldPlus,
  "esi-registration-filing": HeartPulse,
  "accounting-bookkeeping": BookOpen,
  "virtual-cfo": TrendingUp,

  // Grow & Certify
  "iso-certification": BadgeCheck,
  "msme-udyam": Factory,
  "fssai-registration": UtensilsCrossed,
  "business-licenses": Store,
};

/**
 * ServiceIcon — resolves the correct Lucide icon for a service slug.
 * Falls back to a generic document icon if slug not found.
 */
export const ServiceIcon = ({ slug, size = 48, color = "#0B1E3D", className = "" }) => {
  const Icon = ICON_MAP[slug] || FileText;
  return <Icon size={size} color={color} className={className} strokeWidth={1.5} />;
};
