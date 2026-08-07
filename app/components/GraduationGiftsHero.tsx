import Image from "next/image";

export default function GraduationGiftsHero() {
  return (
    <section aria-label="Graduation Gifts" className="relative h-svh w-full">
      <Image
        src="/prodcuts/gifts/heroategory.avif"
        alt="Graduation Gifts"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
