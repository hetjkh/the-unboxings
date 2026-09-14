"use client";

import { useState } from "react";

export type FaqEntry = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer }: FaqEntry) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-5 text-left text-xs leading-5 font-bold tracking-[-0.02em] text-black uppercase"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className={`ml-4 shrink-0 text-xl leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="m-0 text-xs leading-6 font-normal text-black/70">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="mt-14 border-t border-[#e5e5e5]">
      {items.map((faq) => (
        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
