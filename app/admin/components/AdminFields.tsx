"use client";

import Image from "next/image";
import { useState } from "react";

import RichTextField from "./RichTextField";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/cms/upload", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as { path?: string; error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? "Upload failed");
  }
  return data.path ?? "";
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const path = await uploadImage(file);
      onChange(path);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-black/70">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/uploads/your-image.png or /products/01.jpg"
        className="h-10 border border-black/15 px-3 text-sm"
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex h-9 cursor-pointer items-center border border-black bg-black px-4 text-xs font-bold text-white uppercase">
          {uploading ? "Uploading..." : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
        {value ? (
          <div className="relative h-16 w-16 overflow-hidden border border-black/10 bg-[#f7f7f7]">
            <Image src={value} alt="" fill className="object-contain p-1" sizes="64px" />
          </div>
        ) : null}
      </div>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline = false,
  plain = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  plain?: boolean;
}) {
  if (plain) {
    return (
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-black/70">{label}</span>
        {multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={4}
            className="border border-black/15 px-3 py-2 text-sm"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 border border-black/15 px-3 text-sm"
          />
        )}
      </label>
    );
  }

  return <RichTextField label={label} value={value} onChange={onChange} compact={!multiline} />;
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-black/70">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-10 border border-black/15 px-3 text-sm"
      />
    </label>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="font-medium text-black/70">{label}</span>
    </label>
  );
}

export async function cmsFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const text = await response.text();
  const data = text ? (JSON.parse(text) as { error?: string }) : {};
  if (!response.ok) {
    throw new Error(data.error ?? "Request failed");
  }
  return data as T;
}
