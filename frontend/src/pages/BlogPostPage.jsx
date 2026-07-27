import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight, ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";
import { getBlogBySlug, getRelatedBlogs, BLOGS } from "../data/blogs";
import { DuotoneImage } from "../components/DuotoneImage";

/* ── Helpers ──────────────────────────────────────────────────────────── */
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
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

/* Section renderer */
function RenderSection({ section }) {
  switch (section.type) {
    case "h3":
      return <h3 className="font-display text-xl sm:text-2xl text-ink mt-10 mb-4 leading-tight">{section.text}</h3>;
    case "p":
      return <p className="text-[15px] text-ink/75 leading-[1.85] mb-5">{section.text}</p>;
    case "list":
      return (
        <ul className="space-y-2.5 my-5 pl-1">
          {section.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-ink/75 leading-[1.7]">
              <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-brand bg-brand/5 px-5 py-4 rounded-sm">
          <p className="text-[15px] text-ink/85 leading-relaxed italic">"{section.text}"</p>
        </blockquote>
      );
    default:
      return null;
  }
}

/* Build a Table of Contents from h3 sections */
function buildTOC(sections) {
  return sections
    .map((s, i) => ({ ...s, _i: i }))
    .filter((s) => s.type === "h3");
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const toc = useMemo(() => (post ? buildTOC(post.sections) : []), [post]);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    if (!post) return;
    const els = toc.map((_, i) => document.getElementById(`s-${i}`)).filter(Boolean);
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(Number(e.target.id.replace("s-", ""))); }),
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [post, toc]);

  if (!post) return <Navigate to="/blogs" replace />;

  const related = getRelatedBlogs(post.slug);
  const otherPosts = BLOGS.filter((b) => b.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.meta.title}</title>
        <meta name="description" content={post.meta.description} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <meta name="author" content={post.author} />
        <meta name="article:published_time" content={post.datePublished} />
        <meta name="article:section" content={post.category} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta.description} />
        <meta property="og:url" content={`https://www.rightteam.in/blogs/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.datePublished} />
        <meta property="article:section" content={post.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.meta.description} />
        <meta name="twitter:image" content={post.image} />

        <link rel="canonical" href={`https://www.rightteam.in/blogs/${post.slug}`} />

        {/* Article schema (JSON-LD) for Google rich results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta.description,
            image: post.image,
            datePublished: post.datePublished,
            author: { "@type": "Organization", name: "RightTeam.in" },
            publisher: {
              "@type": "Organization",
              name: "RightTeam.in",
              logo: { "@type": "ImageObject", url: "https://www.rightteam.in/logo.png" },
            },
            mainEntityOfPage: `https://www.rightteam.in/blogs/${post.slug}`,
            keywords: post.keywords.join(", "),
            articleSection: post.category,
          })}
        </script>
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="container-x pt-12 pb-12">
          <nav className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 flex-wrap">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" />
            <Link to="/blogs" className="hover:text-white/70 transition-colors">Blogs &amp; Insights</Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-brand">{post.category}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className={`text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wide ${CATEGORY_BG[post.category]}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] mono uppercase tracking-widest text-white/50">
                <Clock size={11} /> {post.readMinutes} min read
              </span>
              <span className="flex items-center gap-1.5 text-[11px] mono uppercase tracking-widest text-white/50">
                <Calendar size={11} /> {fmtDate(post.datePublished)}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-brand font-bold text-xs">RT</div>
                <div>
                  <div className="text-white/85 font-semibold text-xs">{post.author}</div>
                  <div className="text-white/40 mono text-[10px] uppercase tracking-widest">Editorial Desk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </div>

      {/* ── Cover image ──────────────────────────────────────────── */}
      <div className="container-x -mt-1">
        <div className="rounded-sm overflow-hidden aspect-[16/8] sm:aspect-[16/6] bg-[#050B14] border border-ink/10">
          <DuotoneImage src={post.image} alt={post.title} className="w-full h-full" />
        </div>
      </div>

      {/* ── Two-column: article + ToC ────────────────────────────── */}
      <div className="container-x py-14">
        <div className="flex gap-12 items-start">
          {/* Article body */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {post.sections.map((s, i) => {
              if (s.type === "h3") {
                const idx = toc.findIndex((t) => t._i === i);
                return (
                  <div key={i} id={`s-${idx}`} className="scroll-mt-28">
                    <RenderSection section={s} />
                  </div>
                );
              }
              return <RenderSection key={i} section={s} />;
            })}

            {/* Tags row */}
            <div className="mt-10 pt-6 border-t border-ink/10 flex flex-wrap items-center gap-2">
              <Tag size={13} className="text-ink/45" />
              {post.keywords.slice(0, 4).map((k) => (
                <span key={k} className="text-[11px] mono uppercase tracking-widest text-ink/60 border border-ink/10 px-2.5 py-1 rounded-sm bg-alt">
                  {k}
                </span>
              ))}
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-ink/65 hover:text-brand transition-colors"
              >
                <Share2 size={12} /> Share
              </button>
            </div>

            {/* Article-level CTA */}
            <div className="mt-10 border border-ink bg-ink text-white rounded-sm p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-brand mb-2">Need help?</div>
                <h3 className="font-display text-xl text-white mb-1.5">Talk to a RightTeam advisor</h3>
                <p className="text-sm text-white/65 leading-relaxed">Book a free 30-minute consultation, we will read this with you and map it to your books.</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/contact" className="btn-primary text-sm rounded-sm">
                  Book a Call <ArrowRight size={14} />
                </Link>
                <Link to="/quote" className="btn-outline text-sm rounded-sm border-white/30 text-white hover:border-brand">
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Author box */}
            <div className="mt-8 flex items-start gap-4 border border-ink/10 rounded-sm p-5 bg-alt">
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0">RT</div>
              <div>
                <div className="font-semibold text-ink text-sm">RightTeam Editorial</div>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Plain-English guides on business compliance, taxation and registrations reviewed by our in-house chartered accountants before publication.
                </p>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">Related Articles</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/blogs/${r.slug}`}
                      className="group flex flex-col rounded-sm overflow-hidden bg-white border border-ink/10 hover:border-brand/40 hover:shadow-lg transition-all"
                    >
                      <div className="overflow-hidden aspect-[16/9] bg-[#050B14]">
                        <DuotoneImage
                          src={r.image}
                          alt={r.label}
                          className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide w-fit mb-2 ${CATEGORY_BG[r.category] || "bg-brand"} text-white`}>
                          {r.category}
                        </div>
                        <div className="font-display text-sm text-ink leading-snug group-hover:text-brand transition-colors line-clamp-2">
                          {r.label}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-ink/10">
              <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 hover:text-brand transition-colors">
                <ArrowLeft size={14} /> All articles
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:translate-x-0.5 transition-transform">
                Talk to us <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* Sticky ToC */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 self-start">
            <div className="paper-card p-5 rounded-sm">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">In this article</div>
              <nav className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
                {toc.map((t, i) => (
                  <a
                    key={i}
                    href={`#s-${i}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`s-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`block w-full text-left text-xs leading-snug px-3 py-2 rounded-sm transition-all ${
                      activeSection === i
                        ? "bg-brand/10 text-brand border-l-2 border-brand pl-2.5"
                        : "text-ink/55 hover:text-ink hover:bg-ink/4"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}. {t.text.replace(/^\d+\.\s*/, "")}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-ink/10 space-y-2">
                <Link to="/contact" className="btn-primary w-full justify-center text-xs py-2.5 rounded-sm">
                  Talk to us <ArrowRight size={12} />
                </Link>
                <Link to="/quote" className="btn-outline w-full justify-center text-xs py-2 rounded-sm">
                  Free Quote
                </Link>
              </div>
            </div>

            {/* Mini "more from blog" */}
            <div className="mt-5 paper-card p-5 rounded-sm">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-3">More Articles</div>
              <div className="space-y-3">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blogs/${p.slug}`}
                    className="group flex items-start gap-3 -mx-2 px-2 py-2 rounded-sm hover:bg-alt transition-colors"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-sm overflow-hidden bg-[#050B14]">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] mono uppercase tracking-widest text-ink/45 mb-0.5">{p.category}</div>
                      <div className="text-xs font-semibold text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                        {p.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
