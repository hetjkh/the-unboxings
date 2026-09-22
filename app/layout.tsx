import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteLoader from "./components/SiteLoader";
import SmoothScroll from "./components/SmoothScroll";
import { getSiteUrl } from "@/lib/seo";

const GA_MEASUREMENT_ID = "G-77KW768QTG";
const SITE_URL = getSiteUrl();

/** Runs before paint so home/category grids never flash content under the loader. */
const SITE_LOADING_BOOT = `
(function () {
  try {
    var p = location.pathname || "/";
    if (p === "/" || p === "") {
      document.documentElement.classList.add("site-loading");
      return;
    }
    if (p === "/products") {
      document.documentElement.classList.add("site-loading");
      return;
    }
    // /products/aprons = category (loader). /products/aprons/xyz = product (no loader).
    if (p.indexOf("/products/") === 0) {
      var rest = p.slice("/products/".length).replace(/\\/$/, "");
      if (rest && rest.indexOf("/") === -1) {
        document.documentElement.classList.add("site-loading");
      }
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Unboxing | Corporate Gifts & Branded Merchandise UAE",
  description:
    "Premium corporate gifting, employee welcome kits, branded merchandise and packaging solutions. UAE-based. Custom branding. Bulk orders.",
  applicationName: "The Unboxing",
  keywords: [
    "corporate gifts UAE",
    "branded merchandise Dubai",
    "employee welcome kits",
    "custom packaging",
    "executive gifts",
    "The Unboxing",
  ],
  authors: [{ name: "The Unboxing", url: SITE_URL }],
  creator: "The Unboxing",
  publisher: "The Unboxing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "The Unboxing",
    title: "The Unboxing | Corporate Gifts & Branded Merchandise UAE",
    description:
      "Premium corporate gifting, employee welcome kits, branded merchandise and packaging solutions. UAE-based. Custom branding. Bulk orders.",
    images: [
      {
        url: "/ioc.png",
        alt: "The Unboxing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unboxing | Corporate Gifts & Branded Merchandise UAE",
    description:
      "Premium corporate gifting, employee welcome kits, branded merchandise and packaging solutions in the UAE.",
    images: ["/ioc.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/ioc.png", type: "image/png" },
    ],
    apple: "/ioc.png",
    shortcut: "/favicon.ico",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SITE_LOADING_BOOT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div id="site-boot-cover" aria-hidden="true" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <SmoothScroll />
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
