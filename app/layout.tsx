import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteLoader from "./components/SiteLoader";
import SmoothScroll from "./components/SmoothScroll";

const GA_MEASUREMENT_ID = "G-77KW768QTG";

export const metadata: Metadata = {
  title: "The Unboxing | Corporate Gifts & Branded Merchandise UAE",
  description:
    "Premium corporate gifting, employee welcome kits, branded merchandise and packaging solutions. UAE-based. Custom branding. Bulk orders.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/ioc.png", type: "image/png" },
    ],
    apple: "/ioc.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
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
