"use client";

import { useId, useState } from "react";
import type { FaqEntry } from "../data/faqs";

function FaqItem({ question, answer, index }: FaqEntry & { index: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-black/20">
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start justify-between gap-6 border-0 bg-transparent py-6 text-left md:py-7"
      >
        <span className="flex min-w-0 items-start gap-4 md:gap-6">
          <span className="mt-0.5 shrink-0 text-[10px] font-medium tracking-[0.18em] text-black/35">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-6 font-medium tracking-[-0.02em] text-black md:text-base md:leading-7">
            {question}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/20 text-lg leading-none font-light transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[32rem] pb-6 md:pb-7" : "max-h-0"}`}
      >
        <p className="m-0 max-w-[720px] pl-8 text-sm leading-6 text-black/55 md:pl-12 md:leading-7">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqAccordion({
  items,
  className = "",
}: {
  items: readonly FaqEntry[];
  className?: string;
}) {
  return (
    <div className={`border-t border-black/20 ${className}`}>
      {items.map((faq, index) => (
        <FaqItem key={faq.question} index={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
