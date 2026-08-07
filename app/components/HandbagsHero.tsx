import Image from "next/image";

export default function HandbagsHero() {
  return (
    <section aria-label="Handbags" className="relative h-svh w-full">
      <Image
        src="/prodcuts/handbags_hero.avif"
        alt="Handbags"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
