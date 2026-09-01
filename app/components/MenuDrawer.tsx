"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  { label: "Resources", href: "/resources" },
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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activePanel !== "main") {
        setActivePanel("main");
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
  const openSubPanel = (panel: MenuPanel) => setActivePanel(panel);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] bg-black/10 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
      />

      <aside
        id="main-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-[640px] flex-col overflow-hidden bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex shrink-0 items-center justify-between px-6 pt-6 pb-2">
          {activePanel !== "main" ? (
            <button
              type="button"
              onClick={() => setActivePanel("main")}
              className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm leading-5 font-bold tracking-[0.08em] text-black uppercase"
            >
              <BackIcon />
              Back
            </button>
          ) : (
            <span aria-hidden="true" className="w-16" />
          )}

          <button
            type="button"
            aria-label="Close menu"
            onClick={handleClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black p-0 shadow-md"
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
            <nav className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto px-10 pb-10">
              <ul className="m-0 list-none p-0">
                {primaryLinks.map((link) => (
                  <li key={link.label}>
                    {"panel" in link ? (
                      <button
                        type="button"
                        onClick={() => openSubPanel(link.panel!)}
                        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-2 text-left text-2xl leading-8 font-bold tracking-[0.02em] text-black uppercase"
                      >
                        {link.label}
                        <ChevronIcon />
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="block py-2 text-2xl leading-8 font-bold tracking-[0.02em] text-black uppercase no-underline"
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
                      className="block py-1.5 text-base leading-6 font-normal text-black no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="/contact-us#start-project"
                className="mt-auto flex items-center justify-between pt-10 text-2xl leading-8 font-bold tracking-[0.02em] text-black uppercase no-underline"
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
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto px-10 pb-10"
            >
              <h2 className="m-0 text-[48px] leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                Solutions
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-4">
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
                        sizes="280px"
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
                      className="block py-2 text-base leading-6 font-normal text-black no-underline"
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
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto px-10 pb-10"
            >
              <h2 className="m-0 text-[48px] leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                Collections
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-4">
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
                        sizes="280px"
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
                      className="block py-2 text-base leading-6 font-normal text-black no-underline"
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
              className="flex h-full min-w-full flex-[0_0_100%] flex-col overflow-y-auto px-10 pb-10"
            >
              <h2 className="m-0 text-[48px] leading-[56px] font-light tracking-[-0.03em] text-black uppercase">
                By Industry
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-4">
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
                        sizes="280px"
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
                      className="block py-2 text-base leading-6 font-normal text-black no-underline"
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
