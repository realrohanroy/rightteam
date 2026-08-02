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
  // Start Your Business
  "private-limited-company": Building2,
  "llp-registration": Handshake,
  "one-person-company": ShieldCheck,
  "partnership-firm": Users,
  "section-8-ngo": Heart,

  // Licences & Registrations
  "gst-registration": Receipt,
  "msme-udyam": Factory,
  "startup-india": Rocket,
  "import-export-code": Globe,
  "fssai-registration": UtensilsCrossed,
  "gem-registration": Store,

  // Tax & Compliance
  "roc-annual-filing": FileText,
  "annual-filing": CalendarCheck,
  "gst-monthly-filing": CalendarCheck,
  "income-tax-return": Calculator,
  "tds-return-filing": BarChart3,
  "accounting-bookkeeping": BookOpen,

  // Protect Your Brand
  "trademark-filing": Shield,
  "copyright-registration": Copyright,
  "patent-filing": Lightbulb,

  // Grow Your Business
  "iso-certification": BadgeCheck,
  "nsic-registration": BadgeCheck,
  "apeda-registration": Globe,
  "business-advisory": TrendingUp,
};

/**
 * ServiceIcon — resolves the correct Lucide icon for a service slug.
 * Falls back to a generic document icon if slug not found.
 */
export const ServiceIcon = ({ slug, size = 48, color = "#0B1E3D", className = "" }) => {
  const Icon = ICON_MAP[slug] || FileText;
  return <Icon size={size} color={color} className={className} strokeWidth={1.5} />;
};
