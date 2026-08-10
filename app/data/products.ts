export const productCategories = [
  { name: "Tech & Electronics", slug: "tech-electronics", image: "/cat_tech.png", description: "Useful branded technology for desks, travel, onboarding, and modern work." },
  { name: "Drinkware", slug: "drinkware", image: "/cat_drinkware.png", description: "Custom mugs, bottles, and everyday hydration essentials." },
  { name: "Office Essentials", slug: "office-essentials", image: "/cat_office.png", description: "Considered desk tools and organizers for productive working environments." },
  { name: "Executive Gifts", slug: "executive-gifts", image: "/cat_executive.png", description: "Premium presentation sets created for leadership, clients, and milestones." },
  { name: "Eco Collection", slug: "eco-collection", image: "/cat_eco.png", description: "Thoughtful products made with lower-impact and natural materials." },
  { name: "Apparel & Uniforms", slug: "apparel-uniforms", image: "/cat_apparel.png", description: "Branded apparel and coordinated uniforms tailored to your team." },
  { name: "Awards & Recognition", slug: "awards-recognition", image: "/cat_awards.png", description: "Bespoke trophies and recognition pieces that make achievement tangible." },
  { name: "Packaging Solutions", slug: "packaging-solutions", image: "/cat_packaging.png", description: "Presentation packaging engineered around the product and opening moment." },
  { name: "Luxury Gifts", slug: "luxury-gifts", image: "/cat_luxury.png", description: "Refined writing, fragrance, and desk gifts with an elevated finish." },
  { name: "Travel Collection", slug: "travel-collection", image: "/cat_travel.png", description: "Smart luggage and travel accessories designed for journeys." },
] as const;

export type ProductCategorySlug = (typeof productCategories)[number]["slug"];

export const products = [
  { name: "Leather Travel Tech Organizer", category: "tech-electronics", image: "/prodcuts/product1.png" },
  { name: "Executive Tech Accessory Gift Box", category: "tech-electronics", image: "/prodcuts/product2.png" },
  { name: "Multi-Device Charging Desk Mat", category: "tech-electronics", image: "/prodcuts/product3.png" },
  { name: "Insulated Commuter Mug Collection", category: "drinkware", image: "/prodcuts/product4.png" },
  { name: "Walnut Tech Valet Organizer", category: "office-essentials", image: "/prodcuts/product5.png" },
  { name: "Leather Cable Organizer Set", category: "tech-electronics", image: "/prodcuts/product6.png" },
  { name: "Architectural Desk Organizer", category: "office-essentials", image: "/prodcuts/product7.png" },
  { name: "Insulated Desk Mug Collection", category: "drinkware", image: "/prodcuts/product8.png" },
  { name: "Executive Walnut Valet Dock", category: "office-essentials", image: "/prodcuts/product9.png" },
  { name: "Bamboo Desk Charging Organizer", category: "eco-collection", image: "/prodcuts/product10.png" },
  { name: "Magnetic Perfume Presentation Box", category: "packaging-solutions", image: "/prodcuts/product11.png" },
  { name: "Fountain Pen and Ink Gift Set", category: "luxury-gifts", image: "/prodcuts/product12.png" },
  { name: "Luxury Fragrance Presentation Box", category: "packaging-solutions", image: "/prodcuts/product13.png" },
  { name: "Executive Portfolio Gift Set", category: "executive-gifts", image: "/prodcuts/product14.png" },
  { name: "Executive Workday Gift Set", category: "executive-gifts", image: "/prodcuts/product15.png" },
  { name: "Leather Journal and Pen Gift Box", category: "luxury-gifts", image: "/prodcuts/product16.png" },
  { name: "Botanical Notebook Gift Set", category: "eco-collection", image: "/prodcuts/product17.png" },
  { name: "Olive Notebook and Pen Set", category: "office-essentials", image: "/prodcuts/product18.png" },
  { name: "Ribbed Executive Pen Set", category: "luxury-gifts", image: "/prodcuts/product19.png" },
  { name: "Premium Writing Instrument Set", category: "luxury-gifts", image: "/prodcuts/product20.png" },
  { name: "Leather Executive Desk Set", category: "office-essentials", image: "/prodcuts/product21.png" },
] as const;

export function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string) {
  return getCategory(slug)?.name ?? "Products";
}
