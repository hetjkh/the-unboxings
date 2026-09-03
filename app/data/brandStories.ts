export type BrandStorySection = {
  heading: string;
  body: string;
};

export type BrandStory = {
  slug: string;
  title: string;
  tagline: string;
  challenge: string;
  materials: string;
  materialsDetail?: string;
  image: string;
  alt: string;
  gallery: readonly string[];
  sections: readonly BrandStorySection[];
  closing: string;
};

export const brandStories: readonly BrandStory[] = [
  {
    slug: "dubai-developer-homeowners",
    title: "How a Dubai Developer Welcomed 500 Homeowners",
    tagline: "The first gift in a new home should feel like it belongs there.",
    challenge:
      "Turn a standardized handover process into something that feels personal, considered and worthy of the moment.",
    materials: "Architectural Crystal Model · Signature Home Fragrance · Leather Key Holder · Personalised Residence Plaque · Bespoke Presentation Box",
    image: "/brand-stories/dubai-developer-homeowners/hero.png",
    alt: "Homeowner carrying a The Unboxing welcome case into a Dubai apartment overlooking the skyline",
    gallery: ["/brand-stories/dubai-developer-homeowners/01.png"],
    sections: [
      {
        heading: "The Challenge",
        body: "Handing over 500 homes is a major operational milestone. But for the homeowner, there is only one handover that matters — theirs. The challenge was to turn a standardized handover process into something that feels personal, considered and worthy of the moment.",
      },
      {
        heading: "The Idea",
        body: "We approached the project around one simple thought: the first gift in a new home should feel like it belongs there. Rather than creating a conventional branded hamper, we designed a welcome experience around the architecture, materials and character of the development.",
      },
      {
        heading: "The Design",
        body: "The experience began before the box was opened. A minimal presentation box was developed with a structured interior, carefully considered material combinations and individual compartments that allowed every element to reveal itself progressively. Inside, the gifting pieces were selected and customized to feel less like promotional merchandise and more like objects the homeowner would actually want to keep.",
      },
      {
        heading: "The Unboxing",
        body: "Open the box. Discover the first layer. Lift the presentation piece. Find the personalized element beneath it. Every detail was positioned intentionally so that receiving the gift became part of the handover experience itself.",
      },
      {
        heading: "The Outcome",
        body: "500 homes. 500 handovers. 500 individual welcome moments. What could have been a standard gifting exercise became part of the homeowner's first memory of receiving their new property.",
      },
    ],
    closing: "What could have been a standard gifting exercise became part of the homeowner's first memory of receiving their new property.",
  },
  {
    slug: "dubai-skyline-chess-set",
    title: "Dubai, Built to Play.",
    tagline: "What if you could actually play with the Dubai skyline?",
    challenge:
      "How we transformed Dubai's iconic skyline into a functional executive piece designed to live beyond the gifting moment.",
    materials: "Clear acrylic · Smoked acrylic · Architectural form · Executive gift",
    image: "/brand-stories/dubai-skyline-chess-set/hero.png",
    alt: "Acrylic Dubai skyline chess set displayed against the city at night",
    gallery: [
      "/brand-stories/dubai-skyline-chess-set/01.png",
      "/brand-stories/dubai-skyline-chess-set/02.png",
      "/brand-stories/dubai-skyline-chess-set/03.png",
      "/brand-stories/dubai-skyline-chess-set/04.png",
      "/brand-stories/dubai-skyline-chess-set/05.png",
      "/brand-stories/dubai-skyline-chess-set/06.png",
      "/brand-stories/dubai-skyline-chess-set/07.png",
      "/brand-stories/dubai-skyline-chess-set/08.png",
      "/brand-stories/dubai-skyline-chess-set/09.png",
      "/brand-stories/dubai-skyline-chess-set/10.png",
    ],
    sections: [
      {
        heading: "The Brief",
        body: "Create a premium executive gift that could represent Dubai without relying on the usual landmarks printed on another conventional souvenir. It needed to feel sophisticated, collectible and unmistakably connected to the city. Our starting question was: what if you could actually play with the Dubai skyline?",
      },
      {
        heading: "The Idea",
        body: "Dubai is a city shaped by ambition. Every tower begins as an idea. Every development requires vision. Every major achievement involves decisions made several moves ahead. There was a natural connection with chess — a game built around vision, strategy and possibility. So rather than simply engraving Dubai's skyline onto a chessboard, we decided to make the skyline the chess set itself.",
      },
      {
        heading: "From Architecture to Chess Pieces",
        body: "We studied the forms that make Dubai's architecture instantly recognizable — towers, curves, spires, domes and geometric silhouettes. Those architectural characteristics were then reinterpreted as individual chess pieces. The king becomes a commanding skyscraper. The queen takes inspiration from one of the skyline's most expressive forms. Bishops, knights, rooks and pawns each become miniature pieces of architecture. Together, the 32 pieces create two opposing miniature skylines across the board.",
      },
      {
        heading: "The Material",
        body: "Clear and smoked acrylic were chosen to give each side its own identity while keeping the entire object visually connected. Light passes through the pieces, revealing edges, architectural details and reflections across the board. During the day, it feels almost sculptural. Under evening lighting, the miniature skyline comes alive.",
      },
      {
        heading: "The Detail That Changes Everything",
        body: "Look at the piece from across the room and you see a premium chess set. Come closer and you begin recognizing buildings. Start playing, and suddenly you're moving a miniature city across the board. That moment of discovery is exactly what we wanted to create.",
      },
      {
        heading: "The Outcome",
        body: "What began as an executive gift became something between architecture, art and strategy. A functional chess set. A miniature interpretation of Dubai. A conversation piece designed to remain on a desk, boardroom table or in a home long after the gifting moment has passed.",
      },
    ],
    closing: "Dubai wasn't printed on the chess set. Dubai became the chess set.",
  },
  {
    slug: "the-private-reveal",
    title: "Access, Unboxed.",
    tagline: "Don't design a box. Design the reveal.",
    challenge:
      "How we turned the presentation of an exclusive banking card into an experience worthy of what it unlocks.",
    materials: "Matte black · Smoked acrylic · Hidden magnets · Integrated illumination",
    image: "/brand-stories/the-private-reveal/hero.png",
    alt: "Illuminated private access card presentation box revealing a personalized name",
    gallery: [
      "/brand-stories/the-private-reveal/01.png",
      "/brand-stories/the-private-reveal/02.png",
      "/brand-stories/the-private-reveal/03.png",
      "/brand-stories/the-private-reveal/04.png",
    ],
    sections: [
      {
        heading: "The Brief",
        body: "Create a premium presentation for an exclusive banking card designed for select HNI and UHNI clients. But a beautiful box wasn't enough. So instead of asking, \"How should we package the card?\" we asked: \"How should someone feel before they discover it?\"",
      },
      {
        heading: "The Idea",
        body: "Our answer was anticipation. The card wouldn't appear immediately. Each layer would reveal something new, gradually leading toward it. Curiosity became part of the design.",
      },
      {
        heading: "The Architecture",
        body: "A restrained matte-black exterior concealed personalised panels, smoked acrylic, sculpted surfaces, hidden magnets, mechanical doors and integrated illumination. Every detail served one purpose: build anticipation for what comes next.",
      },
      {
        heading: "The Personalisation",
        body: "Luxury should feel personal. Each presentation carried only the recipient's name. Hundreds could be produced. Each one needed to feel like the only one made.",
      },
      {
        heading: "The Assembly",
        body: "Panel resistance. Edge alignment. Magnetic strength. Light. Movement. Every component was tested not only for how it looked — but for how the moment felt.",
      },
      {
        heading: "The Reveal",
        body: "The final doors separated. Warm light appeared. And for the first time, the card was revealed. Alone. Elevated. Illuminated. Nothing competing for attention. Just the object the entire experience had been leading toward.",
      },
      {
        heading: "The Experience",
        body: "What normally takes seconds became a sequence of curiosity, interaction, anticipation and reveal. The packaging didn't simply contain the card. It changed the way the card was received.",
      },
    ],
    closing: "The product was the same. The feeling of receiving it wasn't.",
  },
  {
    slug: "a-majlis-reimagined",
    title: "A Majlis, Reimagined.",
    tagline: "A Ramadan gesture rooted in generosity, culture and meaningful relationships.",
    challenge:
      "How we translated the spirit of Ramadan hospitality into a contemporary gifting experience.",
    materials: "Stone · Brass · Oud · Bakhoor · Arabic coffee · Mashrabiya detail",
    image: "/brand-stories/a-majlis-reimagined/hero.png",
    alt: "Contemporary majlis gift box with brass incense sculpture and mashrabiya doors",
    gallery: [
      "/brand-stories/a-majlis-reimagined/01.png",
      "/brand-stories/a-majlis-reimagined/02.png",
    ],
    sections: [
      {
        heading: "The Brief",
        body: "Ramadan gifting is an expression of appreciation. For important clients and partners, we wanted to go beyond another elaborate seasonal hamper. We asked: what if the gift was inspired by the experience of Ramadan itself?",
      },
      {
        heading: "The Inspiration",
        body: "The answer was the majlis — a place of gathering, conversation and hospitality. That spirit became the foundation of the experience.",
      },
      {
        heading: "The Design",
        body: "The box was interpreted as a contemporary majlis. Opening doors. Mashrabiya-inspired screens. Warm light. Stone and brass. The recipient doesn't simply open a box. They enter an experience.",
      },
      {
        heading: "The Ritual",
        body: "At its centre sits a contemporary brass-and-stone incense sculpture, surrounded by oud, bakhoor, bespoke fragrance and Arabic coffee. Nothing was added simply to fill the box. Every object had a reason to be there.",
      },
      {
        heading: "The Table",
        body: "Six carefully selected dates and confections are presented individually, almost like jewellery. Because generosity isn't always about abundance. Sometimes, it's about consideration.",
      },
      {
        heading: "The Personal Gesture",
        body: "The final layer contains no product. Only a letter: Some relationships are built through business. The important ones grow beyond it. Ramadan Kareem. And suddenly, the gift becomes about something more than the occasion. It becomes about the relationship.",
      },
    ],
    closing: "Generosity isn't measured by how much we give. It's remembered by the thought with which it was given.",
  },
  {
    slug: "from-sketch-to-legacy",
    title: "From One Sketch to a Company Legacy",
    tagline: "The company had grown. The idea that started it all had never changed.",
    challenge:
      "To mark 25 years, we returned to where it all began, the founder's original sketch and transformed it into 100 individually crafted pieces.",
    materials: "Founder's sketch · Hand-finished metal · Optical crystal · Numbered edition",
    image: "/brand-stories/from-sketch-to-legacy/hero.png",
    alt: "Gold skyline sculpture preserved in optical crystal beside the original sketch",
    gallery: [
      "/brand-stories/from-sketch-to-legacy/01.png",
      "/brand-stories/from-sketch-to-legacy/02.png",
      "/brand-stories/from-sketch-to-legacy/03.png",
      "/brand-stories/from-sketch-to-legacy/04.png",
      "/brand-stories/from-sketch-to-legacy/05.png",
      "/brand-stories/from-sketch-to-legacy/06.png",
    ],
    sections: [
      {
        heading: "The Story",
        body: "25 years deserved more than an anniversary gift. The brief began with a simple request: create 100 premium pieces to mark a company's 25th anniversary. But an anniversary isn't really about the number. It's about everything that happened before it. So rather than beginning with products, we began with the company's story.",
      },
      {
        heading: "The Discovery",
        body: "Deep within the founder's archive was something almost forgotten — a rough sketch from the company's earliest days. It wasn't polished. There were pencil marks, corrections and imperfect lines. But within that drawing was something far more valuable than perfection. It was the beginning. Instead of reproducing the sketch on another commemorative object, we asked: could we turn the original idea itself into the gift?",
      },
      {
        heading: "The Transformation",
        body: "The founder's original line was carefully traced and digitised. Its imperfections weren't simply erased. The character of the original drawing was preserved while its proportions were refined and engineered into a three-dimensional form. What had existed on paper for 25 years slowly began to become an object.",
      },
      {
        heading: "The Craft",
        body: "The final form was produced in metal and individually finished by hand. The finished metal form was then suspended within a block of optical crystal — preserving the original line almost as though it had been frozen in time. Each piece was individually numbered. One hundred pieces. One shared beginning.",
      },
      {
        heading: "The Unboxing",
        body: "A restrained architectural presentation box was created around a single object. Opening it revealed the sculpture alongside a reproduction of the founder's original sketch and the story of how that sketch became the company it represents today.",
      },
      {
        heading: "The Legacy",
        body: "Twenty-five years earlier, it was simply a line on a piece of paper. Now it represented the people, decisions, risks, ideas and years that followed. We didn't create 100 anniversary gifts. We took the company's first idea and gave 100 people a piece of its history.",
      },
    ],
    closing: "Some gifts celebrate a milestone. The right one tells you why the milestone matters.",
  },
  {
    slug: "the-first-signature",
    title: "The First Signature",
    tagline: "Before there was a company, there was a signature.",
    challenge:
      "The signature that started a company, transformed into a piece of its legacy.",
    materials: "Formed brass · Optical crystal · Black stone · Limited edition",
    image: "/brand-stories/the-first-signature/hero.png",
    alt: "Gold signature sculpture casting its handwritten shadow onto crystal",
    gallery: [
      "/brand-stories/the-first-signature/01.png",
      "/brand-stories/the-first-signature/02.png",
      "/brand-stories/the-first-signature/03.png",
    ],
    sections: [
      {
        heading: "The Story",
        body: "Thirty years later, there was much to celebrate — growth, people, partnerships and milestones. But instead of looking at what the company had become, we went back to where it began.",
      },
      {
        heading: "The Discovery",
        body: "Inside the archive, we found the founder's signature on one of the company's earliest agreements. A few centimetres of imperfect, human handwriting. Yet everything that followed had somehow begun with that line.",
      },
      {
        heading: "From Ink to Object",
        body: "Every stroke and imperfection was preserved, then transformed from a two-dimensional signature into a three-dimensional brass sculpture. From the front, the handwriting remains recognizable. From every other angle, it becomes abstract art.",
      },
      {
        heading: "The Reveal",
        body: "Suspended above black stone and backed by optical crystal, the sculpture reveals its final secret when illuminated: its shadow recreates the original handwritten signature. Ink became metal. Writing became sculpture. History became something you could hold.",
      },
      {
        heading: "The Meaning",
        body: "A limited number were created for people who became part of the company's journey. Not simply an anniversary gift — a piece of where it all began.",
      },
    ],
    closing: "Every company has a history. Some can trace theirs back to a single line.",
  },
  {
    slug: "the-ascent",
    title: "The Ascent",
    tagline: "Recognition, given form.",
    challenge:
      "Achievement isn't a destination. It's the journey upward. We turned that idea into an award designed to embody progress.",
    materials: "Optical crystal · Formed brass · Honed black stone",
    image: "/brand-stories/the-ascent/hero.png",
    alt: "Crystal award with a rising brass line on a black stone base",
    gallery: [
      "/brand-stories/the-ascent/01.png",
      "/brand-stories/the-ascent/02.png",
    ],
    sections: [
      {
        heading: "The Brief",
        body: "Awards celebrate extraordinary achievements, yet often look remarkably similar. We wanted to create something that didn't simply say achievement — but expressed it.",
      },
      {
        heading: "The Line",
        body: "We began with one idea: progress is never a straight line. It changes direction, encounters challenges and continues forward. That journey became the flowing brass line at the heart of the object.",
      },
      {
        heading: "The Sketch",
        body: "The line needed something permanent to move through. Brass became progress. Crystal became permanence. Together, they began transforming recognition into sculpture.",
      },
      {
        heading: "The Proportion",
        body: "Every millimetre mattered. Crystal thickness, brass movement, height and balance were refined until neither material dominated the other. The difference between an award and an object of design can be millimetres.",
      },
      {
        heading: "The Prototype",
        body: "Digital design became physical form. Crystal changed how light travelled through the object. Brass changed its movement and character. So we tested, adjusted and refined. Designed digitally. Resolved physically.",
      },
      {
        heading: "The Assembly",
        body: "Precision-cut optical crystal, formed brass and honed black stone were individually finished and brought together. Separate materials. One continuous idea.",
      },
      {
        heading: "The Object",
        body: "From a distance, it appears to be sculpture. Look closer and its meaning emerges: crystal captures the moment, while the brass line continues moving upward. Not designed to look like recognition. Designed to represent it.",
      },
    ],
    closing: "Achievement is a journey. Recognition is a reminder.",
  },
  {
    slug: "the-quiet-journey",
    title: "The Quiet Journey",
    tagline: "Rest, before you arrive.",
    challenge:
      "We designed the journey around what travellers need most — a moment to switch off.",
    materials: "Aromatherapy · Neck support · Earplugs · Sleep mask · Travel blanket",
    image: "/brand-stories/the-quiet-journey/hero.png",
    alt: "Open travel rest kit with aromatherapy, mask, earplugs, neck support and blanket",
    gallery: [
      "/brand-stories/the-quiet-journey/01.png",
      "/brand-stories/the-quiet-journey/02.png",
      "/brand-stories/the-quiet-journey/03.png",
    ],
    sections: [
      {
        heading: "The Story",
        body: "Long-haul travel is filled with movement. Instead of asking what should go inside another amenity kit, we asked: what does someone actually need to switch off? The answer wasn't more products. It was a sequence of moments.",
      },
      {
        heading: "The Transition",
        body: "The case opens quietly. A sleep mask appears with one message: the rest of the journey can wait. An invitation to leave everything else behind.",
      },
      {
        heading: "The Ritual",
        body: "The experience follows the natural rhythm of rest: Unwind. Settle. Quiet. Rest. Warmth. Aromatherapy, neck support, reusable earplugs, a soft sleep mask and a lightweight blanket. Five objects. One considered ritual.",
      },
      {
        heading: "The Night Layer",
        body: "A concealed compartment marked \"When you're ready\" reveals the blanket and neck support only when they're needed. The experience unfolds gradually, rather than all at once.",
      },
      {
        heading: "The Morning",
        body: "A softer layer introduces face mist, hydrating balm and a refreshing towel. One message: Good morning. Arrive feeling like you've arrived.",
      },
      {
        heading: "The Object That Remains",
        body: "The case itself was designed to continue travelling — as a tech pouch, passport organizer, cable case or travel organizer. The journey finishes. The object doesn't.",
      },
    ],
    closing: "Because sometimes the greatest luxury isn't another product. It's permission to switch off.",
  },
  {
    slug: "welcome-before-a-word",
    title: "Welcome, Before a Word Is Spoken",
    tagline: "A welcome designed to make every VIP guest feel expected, not simply accommodated.",
    challenge:
      "A sense of place, thoughtfully designed into the very first moment of arrival.",
    materials: "Wood · Leather · Brass · Glass · Sculpted Metal · Premium Paper",
    materialsDetail:
      "<strong>Material</strong><br />Wood · Leather · Brass · Glass · Sculpted Metal · Premium Paper",
    image: "/brand-stories/welcome-before-a-word/hero.png",
    alt: "VIP hospitality welcome chest with Dubai fragrance, keepsakes and local delicacies",
    gallery: ["/brand-stories/welcome-before-a-word/01.png"],
    sections: [
      {
        heading: "The Brief",
        body: "Luxury hospitality carefully choreographs arrival — the car, the greeting, the room. But once the suite door closes, the welcome often becomes predictable. We asked: how could the room itself say, \"We knew you were coming\"? Not another luxury hamper. An arrival ritual.",
      },
      {
        heading: "The Idea",
        body: "The experience was built around five moments: Place. Scent. Taste. Personalisation. Tomorrow. Every layer had a purpose. Every object had a reason to be there. Because luxury isn't about giving more. It's about considering more.",
      },
      {
        heading: "The Welcome",
        body: "The presentation opens with an illuminated interpretation of Dubai — from desert landscape to skyline. One message appears: Welcome to Dubai. The destination wasn't simply printed on the packaging. It became part of the experience.",
      },
      {
        heading: "Made for the Guest",
        body: "A bespoke Dubai fragrance. A refined diffuser. Locally inspired delicacies. A personal travel keepsake. Rather than a collection of gifts, each object becomes another memory of the stay.",
      },
      {
        heading: "The Hidden Gesture",
        body: "Then a discreet brass tab appears: For Tomorrow. Inside, there is no product. Only: Breakfast reserved — 8:30 AM. Your car awaits — 10:00 AM. And suddenly, the gift becomes something more. It becomes hospitality.",
      },
      {
        heading: "The Experience",
        body: "Dubai Skyline Sculpture · Bespoke Fragrance · Reed Diffuser · Premium Dates & Nuts · Leather Travel Accessories · Arabian Coffee · Personalised Welcome Note",
      },
    ],
    closing: "Luxury isn't what you leave in the room. It's how you make someone feel when they enter it.",
  },
] as const;
