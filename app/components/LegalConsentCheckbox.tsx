"use client";

import Link from "next/link";

type LegalConsentCheckboxProps = {
  id?: string;
  className?: string;
  /** Dark surfaces (e.g. footer) */
  tone?: "light" | "dark";
};

export default function LegalConsentCheckbox({
  id = "legal-consent",
  className = "",
  tone = "light",
}: LegalConsentCheckboxProps) {
  const isDark = tone === "dark";

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 ${className}`}
    >
      <input
        id={id}
        name="legalConsent"
        type="checkbox"
        required
        className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-black ${
          isDark ? "accent-white" : ""
        }`}
      />
      <span className={`text-xs leading-5 ${isDark ? "text-white/55" : "text-black/55"}`}>
        I agree to the{" "}
        <Link
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-4 ${isDark ? "text-white hover:text-white/80" : "text-black hover:text-black/70"}`}
          onClick={(event) => event.stopPropagation()}
        >
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-4 ${isDark ? "text-white hover:text-white/80" : "text-black hover:text-black/70"}`}
          onClick={(event) => event.stopPropagation()}
        >
          Privacy Policy
        </Link>
        <span className={isDark ? "text-white/35" : "text-black/35"}> *</span>
      </span>
    </label>
  );
}
