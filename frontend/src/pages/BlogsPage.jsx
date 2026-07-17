import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight, Search, Clock, Calendar } from "lucide-react";
import { BLOGS, BLOG_CATEGORIES } from "../data/blogs";
import { DuotoneImage } from "../components/DuotoneImage";

/* ── Helpers ──────────────────────────────────────────────────────────── */
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const CATEGORY_BG = {
  "Tax Law":   "bg-[#2563EB]",
  "GST":       "bg-[#10B981]",
  "Audit Prep":"bg-[#F97316]",
};

const CATEGORY_TXT = {
  "Tax Law":   "text-[#2563EB]",
  "GST":       "text-[#10B981]",
  "Audit Prep":"text-[#F97316]",
};

function FeaturedCard({ post }) {
  const cat = CATEGORY_TXT[post.category] || "text-brand";
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-ink/10 hover:border-brand/40 hover:shadow-2xl transition-all duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="overflow-hidden aspect-[16/10] md:aspect-auto md:h-full bg-[#050B14] relative">
          <DuotoneImage
            src={post.image}
            alt={post.title}
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-7 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wide ${CATEGORY_BG[post.category]}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] mono uppercase tracking-widest text-ink/40">
              <Clock size={11} /> {post.readMinutes} min read
            </span>
          </div>
          <h3 className="font-display text-2xl lg:text-3xl text-ink leading-tight mb-3 group-hover:text-brand transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-ink/65 leading-relaxed line-clamp-3">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand">
            Read Article
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }) {
  const cat = CATEGORY_TXT[post.category] || "text-brand";
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-white border border-ink/10 hover:border-brand/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
    >
      <div className="overflow-hidden aspect-[16/10] bg-[#050B14] relative">
        <DuotoneImage
          src={post.image}
          alt={post.title}
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${CATEGORY_BG[post.category]}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[10px] mono uppercase tracking-widest text-ink/40">
            <Clock size={10} /> {post.readMinutes} min
          </span>
        </div>
        <h3 className="font-display text-lg text-ink leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-ink/55 leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-ink/8">
          <span className="flex items-center gap-1.5 text-[11px] text-ink/45 mono">
            <Calendar size={10} /> {fmtDate(post.datePublished)}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${cat} group-hover:translate-x-0.5 transition-transform`}>
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...BLOGS].sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished)),
    []
  );

  const featured = sorted[0];
  const rest = sorted.slice(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((b) => {
      const inCat =
        activeCategory === "all" || b.categorySlug === activeCategory;
      if (!inCat) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query, sorted]);

  const list = useMemo(() => {
    if (activeCategory === "all" && !query.trim()) {
      return { featured, list: rest };
    }
    return { featured: null, list: filtered };
  }, [activeCategory, query, featured, rest, filtered]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Blogs &amp; Insights — RightTeam.in</title>
        <meta
          name="description"
          content="Practical, expert-written guides on business compliance, GST, tax planning, audit preparation and more from the RightTeam editorial desk."
        />
        <meta name="keywords" content="business blog India, GST blog, tax saving blog, audit blog, RightTeam insights" />
        <meta property="og:title" content="Blogs &amp; Insights — RightTeam.in" />
        <meta property="og:description" content="Practical, expert-written guides on business compliance, GST, tax planning, audit preparation and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rightteam.in/blogs" />
        <link rel="canonical" href="https://www.rightteam.in/blogs" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-14">
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">Blogs &amp; Insights</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-brand/20 border border-brand/30 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h12l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 4v4h4M7 13h10M7 17h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1 rounded-sm">
                Editorial · RightTeam
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
              Blogs &amp; Insights
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              Practical, plain-English guides on business compliance, GST, tax saving and audit
              readiness — written by the RightTeam editorial desk and reviewed by our chartered
              accountants.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <span className="mono text-[11px] uppercase tracking-widest text-white/50">Articles:</span>
                <span className="mono text-[11px] text-white/80 font-semibold">{BLOGS.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span className="mono text-[11px] uppercase tracking-widest text-white/50">Updated:</span>
                <span className="mono text-[11px] text-white/80 font-semibold">July 2026</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </div>

      {/* ── Filter + Search bar ──────────────────────────────────── */}
      <div className="container-x -mt-1">
        <div className="bg-white border border-ink/10 rounded-sm p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4 shadow-sm">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {BLOG_CATEGORIES.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-ink text-white"
                      : "bg-alt text-ink/65 hover:bg-ink/8 hover:text-ink"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="md:ml-auto flex items-center gap-2 border border-ink/10 rounded-sm px-3 py-2 bg-alt md:w-72">
            <Search size={14} className="text-ink/45 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* ── Featured + Grid ──────────────────────────────────────── */}
      <div className="container-x py-14">
        {list.featured && (
          <div className="mb-12">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">Featured Article</div>
            <FeaturedCard post={list.featured} />
          </div>
        )}

        {list.list.length > 0 ? (
          <>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-5">
              {list.featured ? "Latest Articles" : "Articles"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.list.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-ink/10 rounded-sm">
            <div className="font-display text-2xl text-ink mb-2">No articles found</div>
            <p className="text-sm text-ink/60">Try a different category or clear the search.</p>
          </div>
        )}

        {/* ── Newsletter / CTA strip ─────────────────────────────── */}
        <div className="mt-16 border border-ink bg-ink text-white rounded-sm p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-brand mb-2">Stay informed</div>
            <h3 className="font-display text-2xl text-white mb-2">Get practical compliance updates in your inbox</h3>
            <p className="text-sm text-white/65 leading-relaxed">One short, no-spam email a month. GST, tax and audit — distilled.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm rounded-sm">
              Subscribe <ArrowRight size={14} />
            </Link>
            <Link to="/quote" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
