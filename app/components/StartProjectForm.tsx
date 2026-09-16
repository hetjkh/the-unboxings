"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import BlackSelect from "./BlackSelect";
import BlackMultiSelect from "./BlackMultiSelect";
import AutoGrowTextarea from "./AutoGrowTextarea";
import BriefSubmissionStatus from "./BriefSubmissionStatus";
import BriefSubmissionSuccess from "./BriefSubmissionSuccess";

const textFields = [
  { name: "company", label: "Company", placeholder: "Your company name", type: "text" },
  {
    name: "contactPhone",
    label: "Contact number",
    placeholder: "+971 50 123 4567",
    type: "tel",
  },
] as const;

const deliveryLocationOptions = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "International",
  "Location Not Confirmed",
] as const;

const audienceGroups = [
  {
    label: "Internal",
    options: ["Employees", "New Joiners", "Leadership / Executives"],
  },
  {
    label: "Business & Commercial",
    options: ["Clients / Customers", "VIP Clients", "Business Partners", "Investors / Stakeholders"],
  },
  {
    label: "Events & Community",
    options: ["Event Guests / Attendees", "Speakers / Delegates"],
  },
  {
    label: "Brand & Communications",
    options: ["Influencers / Creators", "Media / Press"],
  },
  {
    label: "Hospitality & Residential",
    options: ["Hotel / Hospitality Guests", "Homeowners / Residents"],
  },
  {
    label: "Public Sector",
    options: ["Government Officials / Dignitaries"],
  },
  {
    label: "Other",
    options: ["Other"],
  },
] as const;

const selectFields = [
  {
    name: "occasion",
    label: "Occasion",
    placeholder: "Select an occasion",
    options: [
      "Welcome / Onboarding",
      "Appreciation / Thank You",
      "Recognition / Award",
      "Milestone / Achievement / Anniversary",
      "Relationship Building",
      "Event / Conference",
      "Launch / Opening / Property Handover",
      "Hospitality / VIP Welcome",
      "Seasonal / Religious / Cultural Occasion",
      "Personal Celebration",
      "Farewell / Retirement",
      "Apology / Service Recovery",
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
  "Education",
  "FMCG",
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
}: {
  productName?: string;
  productCategory?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const submittingRef = useRef(false);
  const [deliveryLocations, setDeliveryLocations] = useState<string[]>([]);
  const briefInputRef = useRef<HTMLInputElement>(null);
  const needsLocationCountry = deliveryLocations.includes("International");
  const exclusiveDeliveryOptions = ["International", "Location Not Confirmed"] as const;

  function onBriefChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setBriefFile(file);
    setError("");
  }

  function clearBriefFile() {
    setBriefFile(null);
    if (briefInputRef.current) briefInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    // Capture values before the pending state disables the form fields.
    const form = event.currentTarget;
    const data = new FormData(form);

    if (briefFile && briefFile.size > 8 * 1024 * 1024) {
      setStatus("error");
      setError("Brief file must be under 8MB.");
      return;
    }

    submittingRef.current = true;
    setStatus("sending");
    setError("");
    setUploading(Boolean(briefFile));
    setUploadProgress(null);

    // Ensure selected brief file is always included for the email attachment.
    data.delete("brief");
    if (briefFile) {
      data.set("brief", briefFile, briefFile.name);
    }

    try {
      // XMLHttpRequest exposes actual upload progress for multipart attachments.
      const response = await new Promise<{
        ok: boolean;
        payload: {
          error?: string;
          warning?: string;
          whatsapp?: { ok?: boolean; error?: string };
        };
      }>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", "/api/project-brief");
        request.responseType = "json";
        request.upload.onprogress = (progressEvent) => {
          if (progressEvent.lengthComputable) {
            setUploadProgress(Math.min(100, Math.round((progressEvent.loaded / progressEvent.total) * 100)));
          }
        };
        request.upload.onload = () => setUploading(false);
        request.onload = () => {
          resolve({
            ok: request.status >= 200 && request.status < 300,
            payload: request.response ?? {},
          });
        };
        request.onerror = () => reject(new Error("Network error"));
        request.onabort = () => reject(new Error("Request cancelled"));
        request.send(data);
      });
      const { payload } = response;

      if (!response.ok) {
        setStatus("error");
        setError(payload.error || "Could not send your brief. Please try again.");
        return;
      }

      if (payload.warning || payload.whatsapp?.ok === false) {
        setStatus("error");
        setError(
          payload.warning ||
            payload.whatsapp?.error ||
            "Email sent, but WhatsApp delivery failed. Check Admin → Settings WhatsApp connection.",
        );
        return;
      }

      setStatus("sent");
      clearBriefFile();
      setDeliveryLocations([]);
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send your brief. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "sent") {
    return <BriefSubmissionSuccess onReset={() => setStatus("idle")} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2"
      encType="multipart/form-data"
    >
      <fieldset className="contents" disabled={status === "sending"} inert={status === "sending"}>
        <legend className="sr-only">Your project brief</legend>
        {productName ? <input type="hidden" name="productInterest" value={productName} /> : null}
        {productCategory ? <input type="hidden" name="productCategory" value={productCategory} /> : null}

        {textFields.map((field) => (
          <label key={field.name} className="group block">
            <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.name === "contactPhone"}
              autoComplete={field.name === "contactPhone" ? "tel" : "organization"}
              className={fieldClassName}
            />
          </label>
        ))}

        <label className="group block">
          <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Email address</span>
          <input
            name="contactEmail"
            type="email"
            placeholder="name@company.com"
            required
            autoComplete="email"
            className={fieldClassName}
          />
        </label>

        <BlackMultiSelect
          name="location"
          label="Delivery location"
          placeholder="Select delivery location(s)"
          options={deliveryLocationOptions}
          value={deliveryLocations}
          onChange={setDeliveryLocations}
          exclusiveOptions={exclusiveDeliveryOptions}
        />

        {needsLocationCountry ? (
          <label className="group block md:col-span-2">
            <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
              International country
            </span>
            <input
              name="locationCountry"
              type="text"
              required
              placeholder="Enter country name"
              className={fieldClassName}
            />
          </label>
        ) : (
          <input type="hidden" name="locationCountry" value="" />
        )}

        <BlackSelect
          name="audience"
          label="Audience"
          placeholder="Who is this for?"
          groups={audienceGroups}
        />

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
          <BlackSelect name="industry" label="Industry" placeholder="Your industry" options={industryOptions} />
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
            placeholder="Mood, references, product directions, packaging thoughts…"
            className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
          />
        </label>

        <div className="md:col-span-2">
          <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Brief Upload</span>
          <input
            ref={briefInputRef}
            id="brief-upload"
            name="brief"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className="sr-only"
            onChange={onBriefChange}
          />
          <button
            type="button"
            onClick={() => briefInputRef.current?.click()}
            className="mt-3 flex min-h-24 w-full cursor-pointer items-center justify-between gap-5 border border-dashed border-black/35 bg-transparent px-5 py-4 text-left transition-colors hover:border-black hover:bg-white/40"
          >
            <span>
              <span className="block text-sm font-medium text-black">
                {briefFile ? briefFile.name : "Add your brief or reference files"}
              </span>
              <span className="mt-1 block text-xs text-black/40">
                {briefFile
                  ? `${(briefFile.size / 1024).toFixed(0)} KB · Ready to send with your email`
                  : "PDF, DOC, JPG or PNG · Temporary until you submit or refresh"}
              </span>
            </span>
            <span className="text-2xl font-light text-black" aria-hidden="true">
              {briefFile ? "✓" : "+"}
            </span>
          </button>
          {briefFile ? (
            <button
              type="button"
              onClick={clearBriefFile}
              className="mt-3 cursor-pointer border-0 bg-transparent p-0 text-[11px] font-bold tracking-[0.08em] text-black/50 uppercase underline underline-offset-4 hover:text-black"
            >
              Remove file
            </button>
          ) : null}
        </div>
      </fieldset>

      <div className="pt-2 md:col-span-2">
        {status === "sending" ? (
          <BriefSubmissionStatus uploading={uploading} progress={uploadProgress} fileName={briefFile?.name} />
        ) : (
          <button
            type="submit"
            className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-black px-6 py-5 text-left text-xs font-bold tracking-[0.06em] text-white uppercase md:px-8 md:text-sm"
          >
            <span>
              Submit — Receive Two Bespoke Concepts Within 48 Hours
            </span>
            <span
              className="shrink-0 text-2xl font-light transition-transform group-hover:translate-x-2"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        )}
        {error ? <p role="alert" className="m-0 mt-4 text-sm leading-6 text-red-700">{error}</p> : null}
        <p className="m-0 mt-4 text-sm leading-6 text-black/55">
          We&apos;ll review your brief and get back to you within 24 hours.
        </p>
      </div>
    </form>
  );
}
