"use client";

import { useEffect, useId, useRef, useState } from "react";

export type BlackSelectGroup = {
  label: string;
  options: readonly string[];
};

type BlackSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options?: readonly string[];
  groups?: readonly BlackSelectGroup[];
  onChange?: (value: string) => void;
};

export default function BlackSelect({
  name,
  label,
  placeholder,
  options = [],
  groups,
  onChange,
}: BlackSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const useGroups = Boolean(groups?.length);

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

  function selectOption(option: string) {
    setValue(option);
    onChange?.(option);
    setOpen(false);
  }

  function optionButton(option: string, indented = false) {
    const selected = option === value;
    return (
      <li key={option} role="option" aria-selected={selected}>
        <button
          type="button"
          onClick={() => selectOption(option)}
          className={`flex w-full cursor-pointer border-0 py-2.5 text-left text-sm text-black/80 transition-colors ${
            indented ? "px-5 pl-6" : "px-4"
          } ${
            selected ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
          }`}
        >
          {option}
        </button>
      </li>
    );
  }

  return (
    <div ref={rootRef} className="relative block">
      <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className="mt-3 flex w-full cursor-pointer items-center justify-between border-0 border-b border-black/30 bg-transparent px-0 py-3 text-left text-sm outline-none transition-colors duration-300 focus:border-black"
      >
        <span className={value ? "text-black" : "text-black/30"}>{value || placeholder}</span>
        <span aria-hidden="true" className={`text-xs text-black/40 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto border border-black/15 bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          {useGroups
            ? groups!.map((group) => (
                <li key={group.label} role="presentation">
                  <div className="sticky top-0 z-[1] border-b border-black/15 bg-[#e8e7e2] px-4 py-3 text-sm font-medium tracking-[-0.01em] text-black">
                    {group.label}
                  </div>
                  <ul role="group" aria-label={group.label} className="m-0 list-none p-0">
                    {group.options.map((option) => optionButton(option, true))}
                  </ul>
                </li>
              ))
            : options.map((option) => optionButton(option))}
        </ul>
      ) : null}
    </div>
  );
}
