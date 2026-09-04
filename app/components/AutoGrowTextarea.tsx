"use client";

import { useEffect, useRef, type TextareaHTMLAttributes } from "react";

type AutoGrowTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  minRows?: number;
};

export default function AutoGrowTextarea({
  minRows = 1,
  className = "",
  onInput,
  value,
  defaultValue,
  ...props
}: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = ref.current;
    if (!el) return;
    const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight) || 24;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, lineHeight * minRows)}px`;
  }

  useEffect(() => {
    resize();
  }, [value, defaultValue, minRows]);

  return (
    <textarea
      {...props}
      ref={ref}
      rows={minRows}
      value={value}
      defaultValue={defaultValue}
      onInput={(event) => {
        resize();
        onInput?.(event);
      }}
      className={`overflow-hidden ${className}`.trim()}
    />
  );
}
