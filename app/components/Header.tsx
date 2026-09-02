"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuDrawer = dynamic(() => import("./MenuDrawer"), { ssr: false });

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1" />
      <path d="M15 15L20 20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconButton({
  label,
  children,
  className = "",
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative flex h-6 w-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0 ${className}`}
    >
      {children}
    </button>
  );
}

type HeaderProps = {
  overlay?: boolean;
  promoOffset?: number;
};

export default function Header({
  overlay = false,
  promoOffset = 0,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const isSolid = !overlay || isScrolled;
  const textColor = isSolid ? "text-black" : "text-white";

  return (
    <>
      <header
        className={`z-50 h-[72px] transition-colors duration-300 ${
          overlay ? "fixed right-0 left-0" : "sticky top-0"
        } ${isSolid ? "bg-white" : "bg-transparent"}`}
        style={overlay ? { top: promoOffset } : undefined}
      >
        <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 md:flex md:items-center md:justify-between md:px-8 md:py-6 lg:px-16">
          {/* Left: Start Your Project CTA */}
          <Link
            href="/contact-us#start-project"
            className={`hidden items-center gap-2 no-underline text-xs leading-[18px] font-bold md:flex ${textColor}`}
          >
            <span className="inline-block h-[1px] w-4 bg-current" aria-hidden="true" />
            <span>Start Your Project</span>
          </Link>

          {/* Center: Logo */}
          <Link
            href="/"
            aria-label="The Unboxing - go to homepage"
            className={`col-start-2 flex items-baseline gap-[0.3em] whitespace-nowrap no-underline transition-colors duration-300 ${textColor} md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[0.35em]`}
          >
            <span className="text-[9px] leading-none font-medium tracking-normal uppercase sm:text-[10px] md:text-xs">
              The
            </span>
            <span className="text-lg leading-[0.82] font-bold tracking-[-0.045em] uppercase sm:text-xl md:text-2xl">
              Unboxing
            </span>
          </Link>

          {/* Right: Icons */}
          <div className={`col-start-3 flex items-center justify-end gap-3 sm:gap-4 md:gap-6 ${textColor}`}>
            <IconButton label="Search" className={textColor}>
              <SearchIcon />
            </IconButton>
            <button
              type="button"
              aria-label="menu toggle"
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              onClick={() => setIsMenuOpen(true)}
              className={`flex cursor-pointer items-center gap-0 border-0 bg-transparent p-0 ${textColor}`}
            >
              <MenuIcon />
              <span className="ml-0 hidden text-base leading-6 font-normal md:inline">
                MENU
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
