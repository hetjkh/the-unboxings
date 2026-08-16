"use client";

import Image from "next/image";
import { useRef } from "react";

const industries = [
  ["01", "Real Estate", "/industries/real-estate-handover.png"],
  ["02", "Hospitality", "/industries/hospitality-experience.png"],
  ["03", "Government", "/industries/government-experience.png"],
  ["04", "Healthcare", "/industries/healthcare-experience.png"],
  ["05", "Education", "/industries/education-experience.png"],
  ["06", "Aviation", "/industries/aviation-experience.png"],
  ["07", "Construction", "/industries/construction-experience.png"],
  ["08", "Technology", "/industries/technology-experience.png"],
  ["09", "Finance", "/industries/finance-experience.png"],
  ["10", "Automotive", "/industries/automotive-experience.png"],
  ["11", "Luxury", "/industries/luxury-experience.png"],
  ["12", "Retail", "/industries/retail-experience.png"],
] as const;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"} stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

export default function IndustriesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: direction === "left" ? -360 : 360, behavior: "smooth" });
  };

  return (
    <section aria-label="Industries" className="bg-white py-14 md:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-8 md:flex-row md:items-end md:justify-between md:px-16">
        <div>
          <p className="m-0 text-[10px] font-bold tracking-[0.08em] text-black/40 uppercase">Where ideas meet context</p>
          <h2 className="m-0 mt-3 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">Industries</h2>
        </div>
        <div className="flex items-end gap-6">
          <p className="m-0 max-w-[500px] text-xs leading-5 text-black/60 md:text-right">Industry knowledge shapes the ideas we bring to the table, and the experiences we make possible.</p>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" onClick={() => scroll("left")} aria-label="Previous industries" className="flex h-9 w-9 cursor-pointer items-center justify-center border border-black bg-transparent p-0 text-black"><Arrow direction="left" /></button>
            <button type="button" onClick={() => scroll("right")} aria-label="Next industries" className="flex h-9 w-9 cursor-pointer items-center justify-center border border-black bg-black p-0 text-white"><Arrow direction="right" /></button>
          </div>
        </div>
      </div>
      <div ref={carouselRef} data-lenis-prevent className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-2 [scrollbar-width:none] md:px-16">
        {industries.map(([number, industry, image]) => (
          <a key={industry} href="/contact-us#start-project" data-motion-card className="group w-[78vw] shrink-0 snap-start no-underline sm:w-[360px]">
            <div data-motion-media className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
              <Image src={image} alt={industry} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 78vw, 360px" />
              <span className="absolute top-4 left-4 text-xs font-light tracking-[-0.04em] text-white">{number}</span>
            </div>
            <div className="flex items-center justify-between border-x border-b border-[#e5e5e5] px-4 py-4">
              <span className="text-xs font-bold tracking-[-0.02em] text-black uppercase">{industry}</span>
              <span className="text-xs text-black/40">Explore →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
