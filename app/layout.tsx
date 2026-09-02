import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import SiteLoader from "./components/SiteLoader";

export const metadata: Metadata = {
  title: "The Unboxing | Corporate Gifts & Branded Merchandise UAE",
  description:
    "Premium corporate gifting, employee welcome kits, branded merchandise and packaging solutions. UAE-based. Custom branding. Bulk orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
