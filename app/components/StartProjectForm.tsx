import BlackSelect from "./BlackSelect";
import AutoGrowTextarea from "./AutoGrowTextarea";

const textFields = [
  { name: "company", label: "Company", placeholder: "Your company name" },
] as const;

const selectFields = [
  {
    name: "audience",
    label: "Audience",
    placeholder: "Who is this for?",
    options: [
      "Employees",
      "New Joiners",
      "Leadership / Executives",
      "Clients",
      "VIP Clients",
      "Partners",
      "Investors / Stakeholders",
      "Customers",
      "Event Guests / Attendees",
      "Speakers / Delegates",
      "Influencers / Creators",
      "Media / Press",
      "Homeowners / Residents",
      "Hotel / Hospitality Guests",
      "Government / Dignitaries",
      "Other",
    ],
  },
  {
    name: "occasion",
    label: "Occasion",
    placeholder: "Select an occasion",
    options: [
      "Employee welcome",
      "Recognition / Award",
      "Client appreciation",
      "Brand launch",
      "Event / Conference",
      "Hospitality / VIP arrival",
      "Seasonal / Cultural occasion",
      "Other",
    ],
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "Estimated units",
    options: [
      "Under 50",
      "50–100",
      "100–250",
      "250–500",
      "500–1,000",
      "1,000+",
      "Not sure yet",
    ],
  },
  {
    name: "budget",
    label: "Budget",
    placeholder: "Estimated budget",
    options: [
      "Under AED 10,000",
      "AED 10,000–25,000",
      "AED 25,000–50,000",
      "AED 50,000–100,000",
      "AED 100,000+",
      "Prefer to discuss",
    ],
  },
  {
    name: "timeline",
    label: "Timeline",
    placeholder: "When do you need it?",
    options: [
      "Within 2 weeks",
      "2–4 weeks",
      "1–2 months",
      "2–3 months",
      "3+ months",
      "Flexible",
    ],
  },
] as const;

const industryOptions = [
  "Real Estate & Property Development",
  "Government & Public Sector",
  "Hospitality & Hotels",
  "Banking & Financial Services",
  "Automotive",
  "Technology & SaaS",
  "Events & Exhibitions",
  "Healthcare & Pharmaceuticals",
  "Travel & Tourism",
  "Luxury & Fashion",
] as const;

const fieldClassName =
  "mt-3 w-full appearance-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black";

export default function StartProjectForm({
  productName,
  productCategory,
  defaultSpecificIdeas = "",
}: {
  productName?: string;
  productCategory?: string;
  defaultSpecificIdeas?: string;
}) {
  return (
    <form className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2" encType="multipart/form-data">
      {productName ? (
        <input type="hidden" name="productInterest" value={productName} />
      ) : null}
      {productCategory ? (
        <input type="hidden" name="productCategory" value={productCategory} />
      ) : null}

      {textFields.map((field) => (
        <label key={field.name} className="group block">
          <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
            {field.label}
          </span>
          <input
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            className={fieldClassName}
          />
        </label>
      ))}

      {selectFields.map((field) => (
        <BlackSelect
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options}
        />
      ))}

      <div className="md:col-span-2">
        <BlackSelect
          name="industry"
          label="Industry"
          placeholder="Your industry"
          options={industryOptions}
        />
      </div>

      <label className="group block md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Objectives</span>
        <AutoGrowTextarea
          name="objectives"
          minRows={1}
          placeholder="What should this experience achieve?"
          className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
        />
      </label>

      <label className="group block md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
          Additional notes or requirements
        </span>
        <span className="mt-2 block text-xs leading-5 text-black/40">
          For example items to be included, materials, etc.
        </span>
        <AutoGrowTextarea
          name="additionalNotes"
          minRows={1}
          placeholder="Share any must-haves, materials, inclusions or constraints"
          className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
        />
      </label>

      <label className="group block md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
          Are there any specific ideas you already have?
        </span>
        <AutoGrowTextarea
          name="specificIdeas"
          minRows={1}
          defaultValue={defaultSpecificIdeas}
          placeholder="Mood, references, product directions, packaging thoughts…"
          className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
        />
      </label>

      <label className="md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Brief Upload</span>
        <span className="mt-3 flex min-h-24 cursor-pointer items-center justify-between gap-5 border border-dashed border-black/35 px-5 py-4 transition-colors hover:border-black hover:bg-white/40">
          <span>
            <span className="block text-sm font-medium">Add your brief or reference files</span>
            <span className="mt-1 block text-xs text-black/40">PDF, DOC, JPG or PNG</span>
          </span>
          <span className="text-2xl font-light" aria-hidden="true">
            +
          </span>
          <input name="brief" type="file" className="sr-only" />
        </span>
      </label>

      <div className="pt-2 md:col-span-2">
        <button
          type="submit"
          className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-black px-6 py-5 text-left text-xs font-bold tracking-[0.06em] text-white uppercase md:px-8 md:text-sm"
        >
          <span>Submit — Receive Two Bespoke Concepts Within 48 Hours</span>
          <span
            className="shrink-0 text-2xl font-light transition-transform group-hover:translate-x-2"
            aria-hidden="true"
          >
            →
          </span>
        </button>
        <p className="m-0 mt-4 text-sm leading-6 text-black/55">
          We&apos;ll review your brief and get back to you within 24 hours.
        </p>
      </div>
    </form>
  );
}
