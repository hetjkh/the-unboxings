import Image from "next/image";

export default function WomenHero() {
  return (
    <section aria-label="Women's Summer" className="relative h-svh w-full">
      <Image
        src="/womes_hero.avif"
        alt="Women's Summer Collection"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
