"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { buildNavCatalog } from "@/lib/cms/nav";
import type { CatalogData } from "@/lib/cms/types";

// ─── Navigation Data ────────────────────────────────────────────────────────

const defaultProductsLinks = [
  { label: "Tech & Electronics", href: "/products/tech-electronics" },
  { label: "Drinkware", href: "/products/drinkware" },
  { label: "Office Essentials", href: "/products/office-essentials" },
  { label: "Executive Gifts", href: "/products/executive-gifts" },
  { label: "Eco Collection", href: "/products/eco-collection" },
  { label: "Health & Wellness", href: "/products/health-wellness" },
  { label: "Apparel & Uniforms", href: "/products/apparel-uniforms" },
  { label: "Aprons", href: "/products/aprons" },
  { label: "Staff ID", href: "/products/staff-id" },
  { label: "Keychains", href: "/products/keychains" },
  { label: "Awards & Recognition", href: "/products/awards-recognition" },
  { label: "Packaging Solutions", href: "/products/packaging-solutions" },
  { label: "Luxury Gifts", href: "/products/luxury-gifts" },
  { label: "Luxury Writing", href: "/products/luxury-writing" },
  { label: "Travel Collection", href: "/products/travel-collection" },
];

const defaultSolutionsLinks = [
  { label: "Employee Welcome Kits", href: "/solutions" },
  { label: "Event Merchandise", href: "/solutions" },
  { label: "Executive Gifts", href: "/products/executive-gifts" },
  { label: "Staff ID & Badges", href: "/products/staff-id" },
  { label: "Packaging Solutions", href: "/products/packaging-solutions" },
  { label: "Luxury Writing", href: "/products/luxury-writing" },
];

const primaryLinks = [
  { label: "Solutions", panel: "solutions" as MenuPanel },
  { label: "Collections", panel: "products" as MenuPanel },
  { label: "By Industry", panel: "industries" as MenuPanel },
  { label: "Brand Stories", href: "/inspiration-gallery" },
  { label: "Behind the Design", href: "/behind-the-design" },
  { label: "Materials", href: "/materials" },
  { label: "Ideas & Insights", href: "/resources" },
];

const secondaryLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/about#process" },
];

const defaultIndustriesLinks = [
  { label: "Real Estate", href: "/industries" },
  { label: "Hospitality", href: "/industries" },
  { label: "Government", href: "/industries" },
  { label: "Healthcare", href: "/industries" },
  { label: "Health & Wellness", href: "/industries" },
  { label: "Education", href: "/industries" },
  { label: "Aviation", href: "/industries" },
  { label: "Construction", href: "/industries" },
  { label: "Technology", href: "/industries" },
  { label: "Finance", href: "/industries" },
  { label: "Automotive", href: "/industries" },
  { label: "Luxury", href: "/industries" },
  { label: "Retail", href: "/industries" },
];

const defaultIndustryFeatures = [
  {
    name: "Real Estate",
    image: "/industries/real-estate.webp",
    href: "/industries",
  },
  {
    name: "Hospitality",
    image: "/industries/hospitality.webp",
    href: "/industries",
  },
  {
    name: "Healthcare",
    image: "/industries/healthcare.webp",
    href: "/industries",
  },
  {
    name: "Luxury",
    image: "/industries/luxury.webp",
    href: "/industries",
  },
];

const defaultProductFeatures = [
  {
    name: "Employee Welcome Kits",
    image: "/bo.png",
    href: "/solutions",
  },
  {
    name: "Executive Gifts",
    image: "/products/15.jpg",
    href: "/products/executive-gifts",
  },
  {
    name: "Eco Collection",
    image: "/products/21.jpg",
    href: "/products/eco-collection",
  },
  {
    name: "Tech & Electronics",
    image: "/products/07.jpg",
    href: "/products/tech-electronics",
  },
];

const defaultSolutionFeatures = [
  {
    name: "Employee Welcome Kits",
    image: "/bo.png",
    href: "/solutions",
  },
  {
    name: "Event Merchandise",
    image: "/products/slides/kitchen-apron-black.png",
    href: "/products/aprons",
  },
  {
    name: "Staff ID & Badges",
    image: "/products/slides/staff-id-premium-portrait-badge.png",
    href: "/products/staff-id",
  },
  {
    name: "Luxury Writing",
    image: "/products/slides/luxury-gifts/fountain-pen-leather.png",
    href: "/products/luxury-writing",
  },
];

type MenuPanel = "main" | "solutions" | "products" | "industries";

const panelOffset: Record<MenuPanel, number> = {
  main: 0,
  solutions: 1,
  products: 2,
  industries: 3,
};

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

type MenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [activePanel, setActivePanel] = useState<MenuPanel>("main");
  const [productsLinks, setProductsLinks] = useState(defaultProductsLinks);
  const [solutionsLinks, setSolutionsLinks] = useState(defaultSolutionsLinks);
  const [productFeatures, setProductFeatures] = useState(defaultProductFeatures);
  const [solutionFeatures, setSolutionFeatures] = useState(defaultSolutionFeatures);
  const [industriesLinks] = useState(defaultIndustriesLinks);
  const [industryFeatures] = useState(defaultIndustryFeatures);

  useEffect(() => {
    fetch("/api/catalog")
      .then((response) => response.json())
      .then((catalog: CatalogData) => {
        const nav = buildNavCatalog(catalog);
        if (nav.productsLinks.length) setProductsLinks(nav.productsLinks);
        if (nav.solutionsLinks.length) setSolutionsLinks(nav.solutionsLinks);
        if (nav.productFeatures.length) setProductFeatures(nav.productFeatures);
        if (nav.solutionFeatures.length) setSolutionFeatures(nav.solutionFeatures);
      })
      .catch(() => {
        // Keep defaults when catalog API is unavailable.
      });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = document.activeElement as HTMLElement | null;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const scrollY = window.scrollY;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    body.style.overflow = "hidden";
    if (mobile) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    }
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = previousOverflow;
      if (mobile) {
        body.style.position = previousPosition;
        body.style.top = previousTop;
        body.style.width = previousWidth;
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const goBack = () => {
    setActivePanel("main");
    requestAnimationFrame(() => panelTriggerRef.current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']") ?? [])
          .filter((element) => !element.closest("[inert]"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
        return;
      }
      if (event.key !== "Escape") return;
      if (activePanel !== "main") {
        setActivePanel("main");
        requestAnimationFrame(() => panelTriggerRef.current?.focus({ preventScroll: true }));
        return;
      }
      onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, activePanel]);

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => setActivePanel("main"), 500);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => onClose();
  const openSubPanel = (panel: MenuPanel, trigger: HTMLButtonElement) => {
    panelTriggerRef.current = trigger;
    setActivePanel(panel);
    requestAnimationFrame(() => {
      const nav = drawerRef.current?.querySelector<HTMLElement>(`[data-panel="${panel}"]`);
      if (nav) nav.scrollTop = 0;
      nav?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <div
        aria-hidden="true"
        data-lenis-prevent
        className={`fixed inset-0 z-[60] bg-black/10 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
      />

      <aside
        ref={drawerRef}
        id="main-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-lenis-prevent
        className={`fixed top-0 right-0 z-[70] flex h-dvh w-full max-w-[640px] flex-col overflow-hidden bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-in-out md:h-full ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex shrink-0 items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 md:px-6 md:pt-6 md:pb-2">
          {activePanel !== "main" ? (
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-11 cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm leading-5 font-bold tracking-[0.08em] text-black uppercase md:min-h-0"
            >
              <BackIcon />
              Back
            </button>
          ) : (
            <span aria-hidden="true" className="w-16" />
          )}

          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={handleClose}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-black p-0 shadow-md md:h-10 md:w-10"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${panelOffset[activePanel] * 100}%)` }}
          >
            {/* ── Main Panel ── */}
            <nav inert={activePanel !== "main"} aria-label="Main menu" className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto overscroll-y-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10 md:pb-10">
              <ul className="m-0 list-none p-0">
                {primaryLinks.map((link) => (
                  <li key={link.label}>
                    {"panel" in link ? (
                      <button
                        type="button"
                        onClick={(event) => openSubPanel(link.panel!, event.currentTarget)}
                        className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent py-2 text-left text-xl leading-7 font-bold tracking-[0.02em] text-black uppercase md:min-h-0 md:text-2xl md:leading-8"
                      >
                        {link.label}
                        <ChevronIcon />
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="block min-h-12 py-2 text-xl leading-7 font-bold tracking-[0.02em] text-black uppercase no-underline md:min-h-0 md:text-2xl md:leading-8"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <ul className="m-0 mt-6 list-none p-0">
                {secondaryLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2.5 text-base leading-6 font-normal text-black no-underline md:py-1.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="/contact-us#start-project"
                className="mt-auto flex items-center justify-between gap-3 pt-10 text-xl leading-7 font-bold tracking-[0.02em] text-black uppercase no-underline md:text-2xl md:leading-8"
              >
                Start a Project
                <span aria-hidden="true" className="text-2xl font-light">
                  →
                </span>
              </a>
            </nav>

            {/* ── Solutions Panel ── */}
            <nav
              aria-label="Solutions"
              data-panel="solutions"
              inert={activePanel !== "solutions"}
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto overscroll-y-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10 md:pb-10"
            >
              <h2 tabIndex={-1} className="m-0 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight outline-none md:text-[48px] md:leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                Solutions
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
                {solutionFeatures.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex flex-col no-underline"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 767px) 45vw, 280px"
                      />
                    </div>
                    <span className="mt-1 text-sm leading-5 font-normal text-black">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>

              <ul className="m-0 mt-10 list-none p-0">
                {solutionsLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2.5 text-base leading-6 font-normal text-black no-underline md:py-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Collections Panel ── */}
            <nav
              aria-label="Collections"
              data-panel="products"
              inert={activePanel !== "products"}
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto overscroll-y-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10 md:pb-10"
            >
              <h2 tabIndex={-1} className="m-0 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight outline-none md:text-[48px] md:leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                Collections
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
                {productFeatures.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    className="group flex flex-col no-underline"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 767px) 45vw, 280px"
                      />
                    </div>
                    <span className="mt-1 text-sm leading-5 font-normal text-black">
                      {product.name}
                    </span>
                  </a>
                ))}
              </div>

              <ul className="m-0 mt-10 list-none p-0">
                {productsLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2.5 text-base leading-6 font-normal text-black no-underline md:py-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── By Industry Panel ── */}
            <nav
              aria-label="By Industry"
              data-panel="industries"
              inert={activePanel !== "industries"}
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto overscroll-y-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10 md:pb-10"
            >
              <h2 tabIndex={-1} className="m-0 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight outline-none md:text-[48px] md:leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                By Industry
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
                {industryFeatures.map((industry) => (
                  <a
                    key={industry.name}
                    href={industry.href}
                    className="group flex flex-col no-underline"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 767px) 45vw, 280px"
                      />
                    </div>
                    <span className="mt-1 text-sm leading-5 font-normal text-black">
                      {industry.name}
                    </span>
                  </a>
                ))}
              </div>

              <ul className="m-0 mt-10 list-none p-0">
                {industriesLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2.5 text-base leading-6 font-normal text-black no-underline md:py-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
