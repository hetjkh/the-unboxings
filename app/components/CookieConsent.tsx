"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-77KW768QTG";
const CONSENT_KEY = "tu-cookie-consent";

type ConsentValue = "accepted" | "rejected";

function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // localStorage may be unavailable
  }
  return null;
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore write failures
  }
}

export default function CookieConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);
  const isCardPage = pathname === "/card" || pathname.startsWith("/card/");

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  function accept() {
    writeConsent("accepted");
    setConsent("accepted");
  }

  function reject() {
    writeConsent("rejected");
    setConsent("rejected");
  }

  const showBanner = ready && consent === null && !isCardPage;
  const loadAnalytics = consent === "accepted";

  return (
    <>
      {loadAnalytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
        >
          <div className="mx-auto flex max-w-[920px] flex-col gap-5 border border-[#d9d5cc] bg-[#f7f5f0] p-5 shadow-[0_20px_50px_-20px_rgba(41,37,29,0.45)] sm:flex-row sm:items-end sm:gap-8 sm:p-6">
            <div className="min-w-0 flex-1">
              <p
                id="cookie-consent-title"
                className="m-0 text-[10px] font-medium tracking-[0.18em] text-[#757566] uppercase"
              >
                Cookies
              </p>
              <p id="cookie-consent-desc" className="m-0 mt-3 text-sm leading-6 text-[#252722]">
                We use essential cookies to run this site. With your permission, we also use analytics cookies
                (including Google Analytics) to improve your experience. You can accept or reject non-essential
                cookies. See our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="underline underline-offset-4">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={reject}
                className="min-h-11 cursor-pointer border border-[#252722] bg-transparent px-5 text-[10px] font-medium tracking-[0.14em] text-[#252722] uppercase transition-colors hover:bg-[#252722] hover:text-[#f7f5f0]"
              >
                Reject cookies
              </button>
              <button
                type="button"
                onClick={accept}
                className="min-h-11 cursor-pointer border border-[#252722] bg-[#252722] px-5 text-[10px] font-medium tracking-[0.14em] text-[#f7f5f0] uppercase transition-colors hover:bg-[#42463b] hover:border-[#42463b]"
              >
                Accept cookies
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
