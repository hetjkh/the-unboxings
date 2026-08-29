"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, ImageField, NumberField, TextField } from "../../components/AdminFields";
import type { BrandStory, BrandStorySection } from "@/lib/cms/content-types";

const emptyStory = (): Omit<BrandStory, "_id" | "createdAt" | "updatedAt"> => ({
  slug: "",
  title: "",
  tagline: "",
  challenge: "",
  materials: "",
  image: "",
  alt: "",
  gallery: [""],
  sections: [{ heading: "", body: "" }],
  closing: "",
  sortOrder: 0,
});

export default function AdminBrandStoriesPage() {
  const [stories, setStories] = useState<BrandStory[]>([]);
  const [form, setForm] = useState(emptyStory());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadStories() {
    setLoading(true);
    try {
      const data = await cmsFetch<BrandStory[]>("/api/cms/brand-stories");
      setStories(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load brand stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadStories();
  }, []);

  function resetForm() {
    setForm(emptyStory());
    setEditingId(null);
  }

  function updateSection(index: number, patch: Partial<BrandStorySection>) {
    setForm({
      ...form,
      sections: form.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    });
  }

  function updateGalleryItem(index: number, value: string) {
    setForm({
      ...form,
      gallery: form.gallery.map((item, itemIndex) => (itemIndex === index ? value : item)),
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      gallery: form.gallery.filter(Boolean),
      sections: form.sections.filter((section) => section.heading.trim() || section.body.trim()),
    };

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/brand-stories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMessage("Brand story updated");
      } else {
        await cmsFetch("/api/cms/brand-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMessage("Brand story created");
      }
      resetForm();
      await loadStories();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this brand story?")) return;
    await cmsFetch(`/api/cms/brand-stories/${id}`, { method: "DELETE" });
    await loadStories();
  }

  function startEdit(story: BrandStory) {
    setEditingId(story._id);
    setForm({
      slug: story.slug,
      title: story.title,
      tagline: story.tagline,
      challenge: story.challenge,
      materials: story.materials,
      image: story.image,
      alt: story.alt,
      gallery: story.gallery.length ? story.gallery : [""],
      sections: story.sections.length ? story.sections : [{ heading: "", body: "" }],
      closing: story.closing,
      sortOrder: story.sortOrder,
    });
  }

  return (
    <AdminShell>
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit brand story" : "New brand story"}</h2>
          <TextField label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
          <TextField label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: value })} plain />
          <TextField label="Tagline" value={form.tagline} onChange={(value) => setForm({ ...form, tagline: value })} multiline />
          <TextField label="Challenge" value={form.challenge} onChange={(value) => setForm({ ...form, challenge: value })} multiline />
          <TextField label="Materials & focus" value={form.materials} onChange={(value) => setForm({ ...form, materials: value })} />
          <ImageField label="Hero image" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <TextField label="Hero alt text" value={form.alt} onChange={(value) => setForm({ ...form, alt: value })} />
          <TextField label="Closing quote" value={form.closing} onChange={(value) => setForm({ ...form, closing: value })} multiline />
          <NumberField label="Sort order" value={form.sortOrder} onChange={(value) => setForm({ ...form, sortOrder: value })} />

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black/70">Gallery images</span>
              <button type="button" onClick={() => setForm({ ...form, gallery: [...form.gallery, ""] })} className="text-[10px] font-bold uppercase">
                + Add gallery image
              </button>
            </div>
            {form.gallery.map((src, index) => (
              <ImageField
                key={`gallery-${index}`}
                label={`Gallery image ${index + 1}`}
                value={src}
                onChange={(value) => updateGalleryItem(index, value)}
              />
            ))}
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black/70">Story sections</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, sections: [...form.sections, { heading: "", body: "" }] })}
                className="text-[10px] font-bold uppercase"
              >
                + Add section
              </button>
            </div>
            {form.sections.map((section, index) => (
              <article key={`section-${index}`} className="grid gap-3 border border-black/10 p-4">
                <TextField label="Section heading" value={section.heading} onChange={(value) => updateSection(index, { heading: value })} />
                <TextField label="Section body" value={section.body} onChange={(value) => updateSection(index, { body: value })} multiline />
              </article>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="h-10 bg-black px-5 text-xs font-bold text-white uppercase disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="h-10 border border-black px-5 text-xs font-bold uppercase">
                Cancel
              </button>
            ) : null}
          </div>
          {message ? <p className="m-0 text-sm text-black/70">{message}</p> : null}
        </form>

        <section className="border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">All brand stories</h2>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid max-h-[80vh] gap-4 overflow-y-auto pr-1">
            {stories.map((story) => (
              <article key={story._id} className="grid grid-cols-[72px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-16 w-16 bg-[#f7f7f7]">
                  {story.image ? <Image src={story.image} alt="" fill className="object-cover" sizes="64px" /> : null}
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{story.title}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">/{story.slug}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{story.tagline}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(story)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(story._id)} className="text-xs text-red-600 uppercase">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
