import type { Metadata } from "next";
import "./globals.css";
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
    // site-loading is intentional on SSR so the boot cover matches; SiteLoader removes it.
    <html lang="en" className="h-full antialiased site-loading" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.site-loading { overflow: hidden; }
              #site-boot-cover {
                position: fixed;
                inset: 0;
                z-index: 10000;
                background: #fff;
                pointer-events: none;
              }
              html:not(.site-loading) #site-boot-cover { display: none !important; }
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <div id="site-boot-cover" aria-hidden="true" />
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
