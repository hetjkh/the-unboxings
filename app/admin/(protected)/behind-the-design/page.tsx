"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, ImageField, TextField } from "../../components/AdminFields";
import { DEFAULT_BEHIND_THE_DESIGN } from "@/lib/cms/behind-the-design-defaults";
import type { BehindTheDesignContent, BehindTheDesignStep } from "@/lib/cms/behind-the-design-types";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border border-black/10 bg-white p-6">
      <h2 className="m-0 text-lg font-light uppercase">{title}</h2>
      {children}
    </section>
  );
}

export default function AdminBehindTheDesignPage() {
  const [content, setContent] = useState<BehindTheDesignContent | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadContent() {
    setLoading(true);
    try {
      const data = await cmsFetch<BehindTheDesignContent>("/api/cms/behind-the-design");
      setContent(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load content");
      setContent({
        ...DEFAULT_BEHIND_THE_DESIGN,
        _id: "local",
        createdAt: "",
        updatedAt: "",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadContent();
  }, []);

  function updateStep(index: number, patch: Partial<BehindTheDesignStep>) {
    if (!content) return;
    const steps = content.steps.map((step, stepIndex) => (stepIndex === index ? { ...step, ...patch } : step));
    setContent({ ...content, steps });
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!content) return;

    setSaving(true);
    setMessage("");
    try {
      const { _id, createdAt, updatedAt, ...payload } = content;
      await cmsFetch("/api/cms/behind-the-design", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMessage("Behind the Design page saved");
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !content) {
    return (
      <AdminShell>
        <p className="text-sm text-black/50">Loading Behind the Design content...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <form onSubmit={handleSave} className="grid gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-black/10 bg-white p-6">
          <div>
            <h1 className="m-0 text-2xl font-light uppercase">Behind the Design</h1>
            <p className="m-0 mt-2 text-sm text-black/60">Edit the hero, section copy, process steps and bottom CTA.</p>
          </div>
          <button type="submit" disabled={saving} className="h-10 bg-black px-5 text-xs font-bold text-white uppercase disabled:opacity-60">
            {saving ? "Saving..." : "Save page"}
          </button>
        </div>

        <SectionCard title="Hero">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Subtitle" value={content.hero.subtitle} onChange={(value) => setContent({ ...content, hero: { ...content.hero, subtitle: value } })} />
            <TextField label="CTA text" value={content.hero.ctaText} onChange={(value) => setContent({ ...content, hero: { ...content.hero, ctaText: value } })} />
            <TextField label="Title line 1" value={content.hero.titleLine1} onChange={(value) => setContent({ ...content, hero: { ...content.hero, titleLine1: value } })} />
            <TextField label="Title line 2" value={content.hero.titleLine2} onChange={(value) => setContent({ ...content, hero: { ...content.hero, titleLine2: value } })} />
          </div>
          <TextField label="Description" value={content.hero.description} onChange={(value) => setContent({ ...content, hero: { ...content.hero, description: value } })} multiline />
          <ImageField label="Hero image" value={content.hero.image} onChange={(value) => setContent({ ...content, hero: { ...content.hero, image: value } })} />
          <TextField label="Hero image alt text" value={content.hero.alt} onChange={(value) => setContent({ ...content, hero: { ...content.hero, alt: value } })} />
          {content.hero.image ? (
            <div className="relative h-40 w-full max-w-md overflow-hidden border border-black/10 bg-[#f7f7f7]">
              <Image src={content.hero.image} alt="" fill className="object-contain p-2" sizes="400px" />
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Approach section">
          <TextField label="Label" value={content.approach.label} onChange={(value) => setContent({ ...content, approach: { ...content.approach, label: value } })} />
          <TextField label="Quote" value={content.approach.quote} onChange={(value) => setContent({ ...content, approach: { ...content.approach, quote: value } })} multiline />
        </SectionCard>

        <SectionCard title="Process header">
          <TextField label="Eyebrow" value={content.processHeader.eyebrow} onChange={(value) => setContent({ ...content, processHeader: { ...content.processHeader, eyebrow: value } })} />
          <TextField label="Title" value={content.processHeader.title} onChange={(value) => setContent({ ...content, processHeader: { ...content.processHeader, title: value } })} />
          <TextField label="Description" value={content.processHeader.description} onChange={(value) => setContent({ ...content, processHeader: { ...content.processHeader, description: value } })} multiline />
        </SectionCard>

        <SectionCard title="Process steps">
          <div className="grid gap-6">
            {content.steps.map((step, index) => (
              <article key={step.slug} className="grid gap-4 border border-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="m-0 text-sm font-bold uppercase">
                    Step {String(index + 1).padStart(2, "0")} — {step.title}
                  </h3>
                  <div className="relative h-14 w-20 overflow-hidden border border-black/10 bg-[#f7f7f7]">
                    <Image src={step.image} alt="" fill className="object-contain p-1" sizes="80px" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <TextField label="Title" value={step.title} onChange={(value) => updateStep(index, { title: value })} />
                  <TextField label="Tagline" value={step.tagline} onChange={(value) => updateStep(index, { tagline: value })} />
                </div>
                <TextField label="Description" value={step.description} onChange={(value) => updateStep(index, { description: value })} multiline />
                <TextField label="Detail" value={step.detail} onChange={(value) => updateStep(index, { detail: value })} multiline />
                <ImageField label="Step image" value={step.image} onChange={(value) => updateStep(index, { image: value })} />
                <TextField label="Image alt text" value={step.alt} onChange={(value) => updateStep(index, { alt: value })} />
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Bottom CTA">
          <TextField label="Eyebrow" value={content.cta.eyebrow} onChange={(value) => setContent({ ...content, cta: { ...content.cta, eyebrow: value } })} />
          <TextField label="Heading" value={content.cta.heading} onChange={(value) => setContent({ ...content, cta: { ...content.cta, heading: value } })} multiline />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Link text" value={content.cta.linkText} onChange={(value) => setContent({ ...content, cta: { ...content.cta, linkText: value } })} />
            <TextField label="Link URL" value={content.cta.linkHref} onChange={(value) => setContent({ ...content, cta: { ...content.cta, linkHref: value } })} />
          </div>
        </SectionCard>

        {message ? <p className="m-0 text-sm text-black/70">{message}</p> : null}
      </form>
    </AdminShell>
  );
}
