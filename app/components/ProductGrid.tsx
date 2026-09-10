import Image from "next/image";
import type { Category } from "@/lib/cms/types";
import type { GridProduct } from "@/lib/cms/nav";
import { plainTextFromRich } from "@/lib/cms/rich-text";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";
import FormattedText from "./FormattedText";

export default function ProductGrid({
  items,
  categories,
  whatsappNumber,
}: {
  items: readonly GridProduct[];
  categories: readonly Category[];
  whatsappNumber: string;
}) {
  const categoryName = (slug: string) =>
    plainTextFromRich(categories.find((category) => category.slug === slug)?.name ?? "Products");

  return (
    <div className="grid grid-cols-2 items-stretch gap-0 lg:grid-cols-4">
      {items.map((product) => {
        const name = plainTextFromRich(product.name);
        const description = plainTextFromRich(product.description);
        const category = categoryName(product.categorySlug);
        const href = buildWhatsAppUrl(
          whatsappNumber,
          productInquiryMessage({ name, category, description }),
        );

        return (
          <article key={product._id} className="group flex h-full min-w-0 flex-col bg-white">
            <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={name}
                fill
                className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.03] sm:p-3"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-1 flex-col px-2.5 pt-2.5 pb-3 sm:px-4 sm:pt-3 sm:pb-4">
              <h2 className="m-0 line-clamp-3 text-[11px] leading-4 font-normal text-black sm:line-clamp-none sm:text-xs">
                <FormattedText html={product.name} />
              </h2>
              <p className="m-0 mt-1 text-[9px] leading-4 tracking-[0.04em] text-black/40 uppercase sm:text-[10px]">
                {category}
              </p>
              <p className="m-0 mt-2 line-clamp-3 text-[10px] leading-4 text-black/55 sm:line-clamp-4 sm:text-[11px]">
                <FormattedText html={product.description} />
              </p>
              <div className="mt-auto pt-2">
                <p className="m-0 text-[11px] leading-4 text-black/50 italic sm:text-xs">Pricing on request</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex min-h-10 w-full items-center justify-center border border-black px-2 py-2 text-[9px] leading-4 font-bold tracking-[0.04em] text-black no-underline uppercase transition-colors duration-200 hover:bg-black hover:text-white sm:min-h-0 sm:px-3 sm:text-[10px]"
                >
                  Request details
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
