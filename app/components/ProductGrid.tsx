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
    categories.find((category) => category.slug === slug)?.name ?? "Products";

  return (
    <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
      {items.map((product) => {
        const name = plainTextFromRich(product.name);
        const description = plainTextFromRich(product.description);
        const category = categoryName(product.categorySlug);
        const href = buildWhatsAppUrl(
          whatsappNumber,
          productInquiryMessage({ name, category, description }),
        );

        return (
          <article key={product._id} className="group flex flex-col bg-white">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <Image src={product.image} alt={name} fill className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="flex min-h-[210px] flex-col px-4 pt-3 pb-4">
              <h2 className="m-0 text-xs leading-4 font-normal text-black">
                <FormattedText html={product.name} />
              </h2>
              <p className="m-0 mt-1 text-[10px] leading-4 tracking-[0.04em] text-black/40 uppercase">{category}</p>
              <p className="m-0 mt-2 text-[11px] leading-4 text-black/55">
                <FormattedText html={product.description} />
              </p>
              <p className="m-0 mt-2 text-xs leading-4 text-black/50 italic">Pricing on request</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center border border-black px-3 py-2 text-[10px] leading-4 font-bold tracking-[0.04em] text-black no-underline uppercase transition-colors duration-200 hover:bg-black hover:text-white"
              >
                Request details
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
