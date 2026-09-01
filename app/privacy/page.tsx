import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy | The Unboxing",
  description: "Privacy policy for The Unboxing website and communications.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-8 py-16 text-black md:px-16 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Legal</p>
          <h1 className="m-0 mt-4 text-4xl font-light tracking-[-0.04em] uppercase md:text-5xl">Privacy</h1>
          <p className="m-0 mt-8 text-sm leading-6 text-black/60">
            We respect your privacy. Information submitted through our contact forms, project briefs or newsletter is used
            only to respond to your enquiry, prepare proposals and share relevant updates where you have opted in.
          </p>
          <p className="m-0 mt-6 text-sm leading-6 text-black/60">
            We do not sell personal data to third parties. For questions about how your information is handled, contact us
            at{" "}
            <a href="mailto:hello@theunboxing.ae" className="text-black underline underline-offset-4">
              hello@theunboxing.ae
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
