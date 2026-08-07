export default function PromoBanner() {
  return (
    <div className="fixed top-0 right-0 left-0 z-[60] flex h-8 items-center justify-center bg-[#ebebeb] px-4 text-center text-xs leading-4 text-black">
      <p className="m-0">
        UAE-Based Team · Worldwide Delivery ·{" "}
        <a href="/contact-us" className="text-black underline underline-offset-2">
          Contact Us
        </a>
      </p>
    </div>
  );
}
