"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";

const PHONE_TEL = "tel:+971506023071";
const PHONE_WHATSAPP = "https://wa.me/971506023071";

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerSnapshot() {
  // Prefer WhatsApp on SSR/desktop-first so first paint matches typical desktop use.
  return true;
}

type PhoneContactLinkProps = {
  className?: string;
  children: ReactNode;
};

/** Desktop → WhatsApp; mobile → native phone dialer. */
export default function PhoneContactLink({ className, children }: PhoneContactLinkProps) {
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);
  const href = isDesktop ? PHONE_WHATSAPP : PHONE_TEL;

  return (
    <a
      href={href}
      className={className}
      target={isDesktop ? "_blank" : undefined}
      rel={isDesktop ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export { PHONE_TEL, PHONE_WHATSAPP };
