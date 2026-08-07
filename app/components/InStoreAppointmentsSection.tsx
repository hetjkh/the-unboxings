import Image from "next/image";

export default function InStoreAppointmentsSection() {
  return (
    <section aria-label="In Store Appointments" className="border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto w-full max-w-[720px] px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
          In Store Appointments
        </h2>
        <p className="m-0 mt-4 text-base leading-6 font-normal text-black">
          Visit a Gucci boutique in person for advice on everything from styling and gifting
          to aftercare.
        </p>

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[560px] overflow-hidden">
          <Image
            src="/card1.avif"
            alt="Gucci boutique"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>

        <h3 className="m-0 mt-10 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
          Book an Appointment
        </h3>
        <p className="m-0 mx-auto mt-4 max-w-[520px] text-base leading-6 font-normal text-black">
          Enjoy priority access to the boutique of your choice at the time and date that suits
          you. When you arrive, your Client Advisor will guide you through a hand-picked
          selection of pieces for you to try-on and style.
        </p>
        <a
          href="#"
          className="mt-6 inline-block text-base leading-6 font-medium text-black underline underline-offset-2"
        >
          Book an In Store Appointment
        </a>
      </div>
    </section>
  );
}
