export function heroCtaContainerClass(
  pinCta: boolean,
  { withTitle = true }: { withTitle?: boolean } = {},
) {
  const layout = withTitle
    ? "flex flex-col items-center gap-3 md:gap-4"
    : "flex justify-center";

  return `z-40 px-4 ${layout} ${
    pinCta
      ? "fixed inset-x-0 bottom-6 md:bottom-10"
      : "absolute inset-x-0 bottom-6 md:bottom-10"
  }`;
}

export const heroOverlayButtonLight =
  "inline-flex h-9 items-center justify-center bg-white px-4 py-2.5 text-[10px] leading-none font-bold tracking-normal text-black uppercase no-underline md:h-12 md:px-6 md:py-4 md:text-xs";

export const heroOverlayButtonDark =
  "inline-flex h-9 items-center justify-center border border-white bg-black/15 px-4 py-2.5 text-[10px] leading-none font-bold tracking-normal text-white uppercase no-underline md:h-12 md:px-6 md:py-4 md:text-xs";

export const heroOverlayTitleClass =
  "m-0 text-center text-sm leading-5 font-medium tracking-[-0.04em] text-white md:text-base md:leading-6";

export const heroOverlayHeadingClass =
  "m-0 max-w-[960px] text-center text-3xl leading-[1.05] font-bold tracking-[-0.05em] text-white md:text-5xl";

export const heroOverlayDescriptionClass =
  "m-0 max-w-[760px] text-center text-sm leading-5 font-normal text-white md:text-base md:leading-6";

export const heroOverlaySplitHeadingClass =
  "m-0 max-w-[470px] text-left text-3xl leading-[1.08] font-bold tracking-[-0.05em] text-white md:text-[38px] md:leading-[1.08]";

export const heroOverlaySplitDescriptionClass =
  "m-0 max-w-[560px] text-left text-sm leading-5 font-normal text-white md:text-base md:leading-6";
