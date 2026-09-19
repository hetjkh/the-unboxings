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
    <html lang="en" className="h-full antialiased">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.site-loading { overflow: hidden; }
              #site-boot-cover { display: none; }
              html.site-loading #site-boot-cover {
                display: block;
                position: fixed;
                inset: 0;
                z-index: 10000;
                background: #fff;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("theunboxing-loader-seen")==="1")return;}catch(e){}document.documentElement.classList.add("site-loading");})();`,
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
