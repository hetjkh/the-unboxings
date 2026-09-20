"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SearchHit } from "@/app/api/search/route";
import CmsImage from "./CmsImage";

const TYPE_LABEL: Record<SearchHit["type"], string> = {
  product: "Product",
  category: "Collection",
  solution: "Solution",
  story: "Brand Story",
  resource: "Insight",
};

type FilterTab = "all" | SearchHit["type"];

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Products" },
  { id: "category", label: "Collections" },
  { id: "solution", label: "Solutions" },
  { id: "story", label: "Stories" },
  { id: "resource", label: "Insights" },
];

const SUGGESTIONS = [
  "Drinkware",
  "Executive gifts",
  "Welcome kits",
  "Luxury writing",
  "Packaging",
  "Aprons",
  "Staff ID",
  "Eco",
];

const BROWSE_CATEGORIES = [
  { label: "Tech & Electronics", slug: "tech-electronics" },
  { label: "Drinkware", slug: "drinkware" },
  { label: "Executive Gifts", slug: "executive-gifts" },
  { label: "Apparel & Uniforms", slug: "apparel-uniforms" },
  { label: "Luxury Writing", slug: "luxury-writing" },
  { label: "Packaging", slug: "packaging-solutions" },
  { label: "Office Essentials", slug: "office-essentials" },
  { label: "Eco Collection", slug: "eco-collection" },
  { label: "Aprons", slug: "aprons" },
  { label: "Staff ID", slug: "staff-id" },
  { label: "Keychains", slug: "keychains" },
  { label: "Travel Collection", slug: "travel-collection" },
] as const;

const QUICK_LINKS = [
  { label: "All products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "By industry", href: "/industries" },
  { label: "Brand stories", href: "/inspiration-gallery" },
  { label: "Materials", href: "/materials" },
  { label: "FAQ", href: "/faq" },
  { label: "Start a project", href: "/contact-us#start-project" },
];

const RECENT_KEY = "theunboxing.search.recent";

type BrowseCategory = {
  title: string;
  slug: string;
  description: string;
  image?: string;
};

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string").slice(0, 6) : [];
  } catch {
    return [];
  }
}

function saveRecent(term: string) {
  const next = [term, ...loadRecent().filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 6);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [browseCategory, setBrowseCategory] = useState<BrowseCategory | null>(null);
  const [browseProducts, setBrowseProducts] = useState<SearchHit[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    setRecent(loadRecent());
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (browseCategory) {
          setBrowseCategory(null);
          setBrowseProducts([]);
          return;
        }
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, browseCategory]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setTab("all");
      setResults([]);
      setBrowseCategory(null);
      setBrowseProducts([]);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || browseCategory) return;

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search failed");
        const payload = (await response.json()) as { results?: SearchHit[] };
        setResults(payload.results ?? []);
      } catch (err) {
        if (controller.signal.aborted) return;
        setResults([]);
        setError(err instanceof Error ? err.message : "Search failed");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, isOpen, browseCategory]);

  async function openCategory(slug: string, fallbackLabel: string) {
    setLoading(true);
    setError("");
    setQuery("");
    setTab("product");
    try {
      const response = await fetch(`/api/search?category=${encodeURIComponent(slug)}`);
      if (!response.ok) throw new Error("Could not load collection");
      const payload = (await response.json()) as {
        category?: BrowseCategory;
        results?: SearchHit[];
      };
      setBrowseCategory(
        payload.category ?? {
          title: fallbackLabel,
          slug,
          description: "",
        },
      );
      setBrowseProducts(payload.results ?? []);
      saveRecent(fallbackLabel);
      setRecent(loadRecent());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load collection");
      setBrowseCategory(null);
      setBrowseProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const counts = useMemo(() => {
    const source = browseCategory ? browseProducts : results;
    const base: Record<FilterTab, number> = {
      all: source.length,
      product: 0,
      category: 0,
      solution: 0,
      story: 0,
      resource: 0,
    };
    for (const hit of source) base[hit.type] += 1;
    return base;
  }, [results, browseProducts, browseCategory]);

  const filtered = useMemo(() => {
    const source = browseCategory ? browseProducts : results;
    return tab === "all" ? source : source.filter((hit) => hit.type === tab);
  }, [results, browseProducts, browseCategory, tab]);

  function applySuggestion(term: string) {
    setBrowseCategory(null);
    setBrowseProducts([]);
    setQuery(term);
    setTab("all");
    saveRecent(term);
    setRecent(loadRecent());
    inputRef.current?.focus();
  }

  function handleResultClick(hit: SearchHit) {
    if (hit.type === "category" && hit.categorySlug) {
      void openCategory(hit.categorySlug, hit.title);
      return;
    }
    const term = query.trim();
    if (term.length >= 2) saveRecent(term);
    else if (hit.title) saveRecent(hit.title);
    onClose();
  }

  if (!isOpen) return null;

  const showIdle = !browseCategory && query.trim().length < 2;

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogId}
      data-lenis-prevent
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.16),transparent_50%)]" />

      <div className="relative flex h-dvh w-full flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-white/20 bg-white/55 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="shrink-0 border-b border-white/30 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 md:px-8 md:pt-6">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="m-0 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                  Search The Unboxing
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer border border-black/15 bg-white/45 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-black uppercase backdrop-blur-md transition-colors hover:bg-black hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/45 bg-white/55 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl md:px-5 md:py-4">
                <span className="shrink-0 text-black/45" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M15 15L20 20" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  id={dialogId}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setBrowseCategory(null);
                    setBrowseProducts([]);
                    setQuery(event.target.value);
                  }}
                  placeholder="Search products, collections, gifts, stories…"
                  className="min-w-0 flex-1 border-0 bg-transparent text-base text-black outline-none placeholder:text-black/35 md:text-lg"
                  autoComplete="off"
                />
                {query || browseCategory ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setBrowseCategory(null);
                      setBrowseProducts([]);
                      setTab("all");
                    }}
                    className="cursor-pointer border-0 bg-transparent px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-black/45 uppercase hover:text-black"
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              {!browseCategory ? (
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {TABS.map((item) => {
                    const active = tab === item.id;
                    const count = showIdle ? null : counts[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTab(item.id)}
                        className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-colors ${
                          active
                            ? "border-black bg-black text-white"
                            : "border-white/50 bg-white/35 text-black/65 backdrop-blur-md hover:border-black/30 hover:text-black"
                        }`}
                      >
                        {item.label}
                        {count != null ? <span className="ml-1.5 opacity-70">{count}</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-8 md:py-7 [-webkit-overflow-scrolling:touch]"
            data-lenis-prevent
          >
            <div className="mx-auto w-full max-w-[1200px]">
              {browseCategory ? (
                <div className="grid gap-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setBrowseCategory(null);
                          setBrowseProducts([]);
                          setTab("all");
                        }}
                        className="cursor-pointer border-0 bg-transparent p-0 text-[10px] font-bold tracking-[0.16em] text-black/45 uppercase hover:text-black"
                      >
                        ← Back to search
                      </button>
                      <h2 className="m-0 mt-2 text-[clamp(1.5rem,3vw,2.4rem)] font-light tracking-[-0.04em] text-black uppercase">
                        {browseCategory.title}
                      </h2>
                      {browseCategory.description ? (
                        <p className="m-0 mt-2 max-w-[560px] text-sm leading-6 text-black/55">
                          {browseCategory.description}
                        </p>
                      ) : null}
                    </div>
                    <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">
                      {browseProducts.length} product{browseProducts.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {[0, 1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="aspect-[3/4] animate-pulse rounded-2xl border border-white/40 bg-white/35"
                        />
                      ))}
                    </div>
                  ) : browseProducts.length === 0 ? (
                    <div className="rounded-2xl border border-white/45 bg-white/40 px-5 py-10 text-center backdrop-blur-md">
                      <p className="m-0 text-sm text-black/65">No products in this collection yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {browseProducts.map((hit) => (
                        <Link
                          key={hit.href}
                          href={hit.href}
                          onClick={onClose}
                          className="group text-black no-underline"
                        >
                          <div className="relative aspect-square overflow-hidden bg-transparent">
                            {hit.image ? (
                              <CmsImage
                                src={hit.image}
                                alt={hit.title}
                                fill
                                className="object-contain object-center transition-transform duration-400 group-hover:scale-[1.04]"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            ) : null}
                          </div>
                          <div className="px-1 pt-3">
                            <p className="m-0 line-clamp-2 text-xs font-medium leading-4 md:text-sm md:leading-5">
                              {hit.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : showIdle ? (
                <div className="grid gap-8 md:gap-10">
                  {recent.length > 0 ? (
                    <section>
                      <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-black/40 uppercase">
                        Recent searches
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {recent.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => applySuggestion(term)}
                            className="cursor-pointer rounded-full border border-white/50 bg-white/45 px-3.5 py-2 text-xs text-black/75 backdrop-blur-md transition-colors hover:border-black/40 hover:bg-white/80 hover:text-black"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  <section>
                    <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-black/40 uppercase">
                      Popular suggestions
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTIONS.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => applySuggestion(term)}
                          className="cursor-pointer rounded-full border border-white/50 bg-white/45 px-3.5 py-2 text-xs text-black/75 backdrop-blur-md transition-colors hover:border-black/40 hover:bg-white/80 hover:text-black"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-black/40 uppercase">
                      Browse by category
                    </p>
                    <p className="m-0 mt-2 text-xs text-black/45">
                      Open a collection here — products stay in this search view.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                      {BROWSE_CATEGORIES.map((item) => (
                        <button
                          key={item.slug}
                          type="button"
                          onClick={() => void openCategory(item.slug, item.label)}
                          className="cursor-pointer rounded-xl border border-white/45 bg-white/40 px-3 py-3.5 text-left text-xs font-medium text-black backdrop-blur-md transition-colors hover:border-black/35 hover:bg-white/75"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-black/40 uppercase">
                      Quick links
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="text-xs tracking-[0.04em] text-black/60 no-underline underline-offset-4 hover:text-black hover:underline"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              ) : loading ? (
                <div className="grid gap-3">
                  {[0, 1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-xl border border-white/40 bg-white/35 backdrop-blur-md"
                    />
                  ))}
                </div>
              ) : error ? (
                <p className="m-0 rounded-xl border border-red-200/70 bg-red-50/70 px-4 py-3 text-sm text-red-700 backdrop-blur-md">
                  {error}
                </p>
              ) : filtered.length === 0 ? (
                <div className="rounded-xl border border-white/45 bg-white/40 px-5 py-8 text-center backdrop-blur-md">
                  <p className="m-0 text-sm text-black/70">No results for “{query.trim()}”.</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.slice(0, 4).map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => applySuggestion(term)}
                        className="cursor-pointer rounded-full border border-black/15 bg-white/70 px-3 py-1.5 text-[11px] text-black"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="m-0 list-none space-y-2 p-0">
                  {filtered.map((hit) => (
                    <li key={`${hit.type}-${hit.href}-${hit.title}`}>
                      {hit.type === "category" && hit.categorySlug ? (
                        <button
                          type="button"
                          onClick={() => void openCategory(hit.categorySlug!, hit.title)}
                          className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/40 bg-white/40 px-3 py-3 text-left text-black backdrop-blur-md transition-all hover:border-black/25 hover:bg-white/75"
                        >
                          <ResultMedia hit={hit} />
                          <ResultCopy hit={hit} />
                          <span className="shrink-0 text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">
                            View products
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={hit.href}
                          onClick={() => handleResultClick(hit)}
                          className="group flex items-center gap-4 rounded-xl border border-white/40 bg-white/40 px-3 py-3 text-black no-underline backdrop-blur-md transition-all hover:border-black/25 hover:bg-white/75"
                        >
                          <ResultMedia hit={hit} />
                          <ResultCopy hit={hit} />
                          <span
                            className="shrink-0 text-lg font-light text-black/30 transition-transform group-hover:translate-x-0.5 group-hover:text-black"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="border-t border-white/30 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-[10px] tracking-[0.08em] text-black/40 uppercase md:px-8">
            {browseCategory
              ? `${browseCategory.title} · ${browseProducts.length} products`
              : showIdle
                ? "Tip — open a category to browse products without leaving search"
                : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultMedia({ hit }: { hit: SearchHit }) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-transparent">
      {hit.image ? (
        <CmsImage
          src={hit.image}
          alt=""
          fill
          className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="64px"
        />
      ) : null}
    </div>
  );
}

function ResultCopy({ hit }: { hit: SearchHit }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">
        {TYPE_LABEL[hit.type]}
      </p>
      <p className="m-0 mt-1 truncate text-sm font-medium tracking-[-0.01em]">{hit.title}</p>
      {hit.description ? (
        <p className="m-0 mt-1 line-clamp-1 text-xs leading-5 text-black/50">{hit.description}</p>
      ) : null}
    </div>
  );
}
