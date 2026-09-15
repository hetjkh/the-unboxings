"use client";

import { useEffect, useId, useRef, useState } from "react";

type BlackMultiSelectProps = {
  name: string;
  label: string;
  hint?: string;
  placeholder: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  exclusiveOptions?: readonly string[];
};

export default function BlackMultiSelect({
  name,
  label,
  hint,
  placeholder,
  options,
  value,
  onChange,
  exclusiveOptions = [],
}: BlackMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleOption(option: string) {
    const isExclusive = exclusiveOptions.includes(option);
    const alreadySelected = value.includes(option);

    if (alreadySelected) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    if (isExclusive) {
      onChange([option]);
      return;
    }

    onChange([...value.filter((item) => !exclusiveOptions.includes(item)), option]);
  }

  const summary = value.length > 0 ? value.join(", ") : placeholder;

  return (
    <div ref={rootRef} className="relative block">
      <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">{label}</span>
      {hint ? <p className="m-0 mt-2 text-xs leading-5 text-black/45">{hint}</p> : null}

      {value.map((item) => (
        <input key={item} type="hidden" name={name} value={item} />
      ))}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-multiselectable="true"
        onClick={() => setOpen((current) => !current)}
        className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 border-0 border-b border-black/30 bg-transparent px-0 py-3 text-left text-sm outline-none transition-colors duration-300 focus:border-black"
      >
        <span className={`min-w-0 flex-1 truncate ${value.length ? "text-black" : "text-black/30"}`}>
          {summary}
        </span>
        <span aria-hidden="true" className={`shrink-0 text-xs text-black/40 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto border border-black/15 bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          {options.map((option) => {
            const selected = value.includes(option);
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`flex w-full cursor-pointer items-center gap-3 border-0 px-4 py-2.5 text-left text-sm transition-colors ${
                    selected ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center border text-[10px] ${
                      selected ? "border-white bg-white text-black" : "border-black/30 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
