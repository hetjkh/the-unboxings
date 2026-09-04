"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl, projectBriefMessage } from "@/lib/whatsapp";

const formFields = [
  { name: "company", label: "Company", placeholder: "Your company name" },
  { name: "audience", label: "Audience", placeholder: "Who is this for?" },
  { name: "occasion", label: "Occasion", placeholder: "Event, launch, welcome…" },
  { name: "quantity", label: "Quantity", placeholder: "Estimated units" },
  { name: "budget", label: "Budget", placeholder: "Estimated budget" },
  { name: "timeline", label: "Timeline", placeholder: "When do you need it?" },
  { name: "industry", label: "Industry", placeholder: "Your industry" },
] as const;

export default function ProjectBriefForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {};

    for (const field of formFields) {
      fields[field.name] = String(data.get(field.name) ?? "");
    }
    fields.objectives = String(data.get("objectives") ?? "");

    const hasContent = Object.values(fields).some((value) => value.trim());
    if (!hasContent) {
      setError("Please fill in at least one field before sending on WhatsApp.");
      return;
    }

    const href = buildWhatsAppUrl(whatsappNumber, projectBriefMessage(fields));
    if (href === "#") {
      setError("WhatsApp number is not configured yet. Please set it in Admin → Settings.");
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
      {formFields.map((field) => (
        <label key={field.name} className="group block">
          <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
            {field.label}
          </span>
          <input
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            className="mt-3 w-full border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
          />
        </label>
      ))}

      <label className="group block md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Objectives</span>
        <textarea
          name="objectives"
          rows={4}
          placeholder="What should this experience achieve?"
          className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
        />
      </label>

      <label className="md:col-span-2">
        <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Brief Upload</span>
        <span className="mt-3 flex min-h-24 cursor-pointer items-center justify-between gap-5 border border-dashed border-black/35 px-5 py-4 transition-colors hover:border-black hover:bg-white/40">
          <span>
            <span className="block text-sm font-medium">Add your brief or reference files</span>
            <span className="mt-1 block text-xs text-black/40">
              Files can&apos;t be sent in WhatsApp chat open — share them after you message us.
            </span>
          </span>
          <span className="text-2xl font-light" aria-hidden="true">+</span>
          <input name="brief" type="file" className="sr-only" disabled />
        </span>
      </label>

      <div className="pt-2 md:col-span-2">
        <button
          type="submit"
          className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-black px-6 py-5 text-left text-xs font-bold tracking-[0.06em] text-white uppercase md:px-8 md:text-sm"
        >
          <span>Send brief on WhatsApp</span>
          <span className="shrink-0 text-2xl font-light transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
        </button>
        <p className="m-0 mt-4 text-sm leading-6 text-black/55">
          Your brief opens in WhatsApp with the details filled in. We&apos;ll reply within 24 hours.
        </p>
        {error ? <p className="m-0 mt-3 text-sm text-red-700">{error}</p> : null}
      </div>
    </form>
  );
}
