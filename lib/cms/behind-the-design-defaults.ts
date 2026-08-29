import type { BehindTheDesignContent } from "./behind-the-design-types";

export const DEFAULT_BEHIND_THE_DESIGN: Omit<BehindTheDesignContent, "_id" | "createdAt" | "updatedAt"> = {
  pageKey: "behind-the-design",
  hero: {
    subtitle: "Our process",
    titleLine1: "Behind the",
    titleLine2: "Design",
    description:
      "From an idea on paper to an experience in someone's hands. Every decision, detail and material turns a brand brief into something worth keeping.",
    image: "/sketch.png",
    alt: "Hand sketching trophy designs on tracing paper beside acrylic prototypes and material samples",
    ctaText: "Explore the process",
  },
  approach: {
    label: "What happens behind the object",
    quote:
      "The final piece is only the visible part. The real value is built through the thinking, testing and craft that comes before it.",
  },
  processHeader: {
    eyebrow: "Eight considered stages",
    title: "From thought to form",
    description:
      "One continuous process, shaped by curiosity, tested through craft and carried through to the final reveal.",
  },
  steps: [
    {
      slug: "idea",
      title: "Idea",
      tagline: "The Thought",
      description: "We begin with the brand, the audience and the moment it needs to create.",
      detail:
        "The process begins on paper. Ideas are questioned, explored and refined before a single dimension is decided.",
      image: "/behind-the-design/idea.png",
      alt: "Concept notes, sketches and a black box asking what the experience should feel like",
      sortOrder: 0,
    },
    {
      slug: "sketch",
      title: "Sketch",
      tagline: "The Sketch",
      description: "Possibilities take shape on paper before materials set any limits.",
      detail:
        "Multiple concepts are explored, challenged and refined until the right form emerges — designing the packaging and the object as one complete experience.",
      image: "/behind-the-design/sketch.png",
      alt: "Hand-drawn box concept sketches exploring opening mechanisms and bottle forms",
      sortOrder: 1,
    },
    {
      slug: "3d-design",
      title: "3D Design",
      tagline: "The Measure",
      description: "Form, proportion and function are resolved down to the smallest detail.",
      detail:
        "Precision turns an idea into something buildable. Every dimension, clearance and mechanism is carefully considered so the final experience feels effortless and refined.",
      image: "/behind-the-design/3d-design.png",
      alt: "Hands measuring a prototype beside CAD models, technical drawings and hardware",
      sortOrder: 2,
    },
    {
      slug: "prototype",
      title: "Prototype",
      tagline: "The Prototype",
      description: "The idea becomes something tangible that we can hold, assess and improve.",
      detail:
        "Prototyping turns assumptions into answers. Each version tests the structure, fit and reveal — refining every detail before the final piece moves into production.",
      image: "/behind-the-design/prototype.png",
      alt: "Two packaging prototypes compared for structure and reveal experience",
      sortOrder: 3,
    },
    {
      slug: "material-selection",
      title: "Material Selection",
      tagline: "The Layers",
      description: "Every texture, weight and finish is chosen with purpose.",
      detail:
        "Every layer is designed with intention. From story and materials to personal details and the final object, each reveal builds anticipation for what comes next.",
      image: "/behind-the-design/materials.png",
      alt: "Stacked drawers with wood, stone and fabric samples beside hinges and hardware",
      sortOrder: 4,
    },
    {
      slug: "production",
      title: "Production",
      tagline: "The Assembly",
      description: "Precision technology and practiced craftsmanship work together.",
      detail:
        "Every component is finished separately, then precisely brought together. Structure, materials, hidden mechanisms and illumination become one seamless final experience.",
      image: "/behind-the-design/production.png",
      alt: "Exploded view of lid, trays, mechanisms, illuminated base and bottle assembled as one",
      sortOrder: 5,
    },
    {
      slug: "packaging",
      title: "Packaging",
      tagline: "The Final Product",
      description: "The reveal is designed as carefully as the piece itself.",
      detail:
        "The final form is intentionally restrained, allowing the experience to unfold through discovery. What appears simple from the outside transforms layer by layer.",
      image: "/behind-the-design/packaging.png",
      alt: "Closed presentation box beside the open illuminated packaging reveal",
      sortOrder: 6,
    },
    {
      slug: "delivery",
      title: "Delivery",
      tagline: "The Masterpiece",
      description: "The final experience reaches the people it was designed for.",
      detail:
        "What began as an idea becomes a fully resolved experience — where material, structure, light and detail lead to one defining moment: the object itself.",
      image: "/behind-the-design/delivery.png",
      alt: "Finished perfume bottle revealed in its illuminated presentation box",
      sortOrder: 7,
    },
  ],
  cta: {
    eyebrow: "Designed around your story",
    heading: "Not sourced from a catalogue. Designed from the story up.",
    linkText: "Start your design journey",
    linkHref: "/contact-us#start-project",
  },
};
