This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Product catalogue

Open `public/catalogue.html` directly in a browser, or visit `/catalogue.html` on the running website. It is a self-contained, 12-page A4 catalogue with embedded product images and fonts; it also works offline.

Click **Save as PDF / Print**, choose **Save as PDF**, and use **A4 portrait**, **100% scale**, **no margins**, **background graphics on**, and **headers/footers off**.

Run `npm run build:catalogue` to regenerate the catalogue. The generator in `scripts/build-catalogue.mjs` selects 38 products across all 15 categories from `app/data/products.ts`, uses images from `public`, and writes `public/catalogue.html`. This is a curated snapshot of the checked-in website content; CMS edits require updating the source selection and rebuilding. Contact information follows the website's contact page.

`node scripts/check-catalogue.mjs` verifies the document in headless Chrome on Windows and writes screenshots, a sample PDF, and layout results to the ignored `artifacts/catalogue/` directory.

## Luxury experience catalogue (2026)

Visit `/catalogue` for the new catalogue landing page, or `/luxury-catalogue/index.html` to explore all 22 redesigned pages. The direct PDF is `/luxury-catalogue/The-Unboxing-Luxury-Experience-2026.pdf`. A catalogue link is included in the site footer.

This edition uses the supplied **The_Unboxing_Luxury_Experience_Catalogue_2026.pptx**, retaining its 22-page story and imagery with refined copy, an ivory/charcoal/gold design, and landscape layouts. It is separate from the existing product catalogue above. All website images and the PDF are checked in, so deployment does not require PowerPoint or Chrome.

To update the design or copy, edit `scripts/luxury-content.mjs` and `scripts/luxury-catalogue.css`, then run `npm run build:luxury-catalogue`. Export requires local Chrome (set `CHROME_PATH` if it is installed somewhere other than the default Windows location). The exporter checks all page boundaries, images, mobile width and the 22-page PDF before writing the download. Reports go to `artifacts/luxury-catalogue/`.

To re-extract the original source images, run `powershell -ExecutionPolicy Bypass -File scripts/extract-luxury-deck.ps1 -Source "C:\path\to\catalogue.pptx"`, followed by `node scripts/prepare-luxury-images.mjs` and the build command. This requires the source presentation only when replacing source images; ordinary catalogue rebuilds use the checked-in JPEGs.

With the dev server running on port 3000, `node scripts/export-luxury-catalogue.mjs --check-site` also verifies the landing page at desktop/mobile widths, preview links and actual PDF delivery.

## Local development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
