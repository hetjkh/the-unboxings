import ExperienceVideo from "./ExperienceVideo";

const categories = [
  {
    title: "Employee",
    tagline: "Welcome. Recognize. Celebrate.",
    video: "/video/1.webm",
    href: "/solutions",
  },
  {
    title: "Client",
    tagline: "Thank. Connect. Be remembered.",
    video: "/video/2.webm",
    href: "/solutions",
  },
  {
    title: "Brand",
    tagline: "Make your brand tangible.",
    video: "/video/3.webm",
    href: "/behind-the-design",
  },
  {
    title: "Event",
    tagline: "Make the moment last.",
    video: "/video/4.webm",
    href: "/solutions",
  },
];

export default function CategoryGrid() {
  return (
    <section aria-label="Experiences" className="w-full bg-white">
      <div className="px-8 pt-14 pb-10 text-center md:px-16">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">Experiences</h2>
        <p className="m-0 mt-3 text-xs font-bold tracking-[0.08em] text-black uppercase">Designed for every moment.</p>
        <p className="mx-auto m-0 mt-4 whitespace-nowrap text-xs leading-5 text-black/60 italic">
          From welcoming someone new to recognizing a lasting partnership, we create gifting experiences around moments that matter.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category.title}
            href={category.href}
            data-motion-card
            className="group relative block no-underline"
          >
            <div data-motion-media className="relative aspect-square w-full overflow-hidden bg-[#ececec]">
              <ExperienceVideo src={category.video} label={`${category.title} experience`} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-4 pt-16 pb-4 text-white">
                <p className="m-0 text-xs font-bold tracking-[0.08em] uppercase">{category.title}</p>
                <p className="m-0 mt-2 max-h-0 overflow-hidden text-xs leading-5 text-white/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100">
                  {category.tagline}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
