"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { BodyBlocksEditor } from "../../components/BodyBlocksEditor";
import { cmsFetch, ImageField, NumberField, TextField } from "../../components/AdminFields";
import type { ResourceArticle, ResourceImage } from "@/lib/cms/content-types";

const emptyResource = (): Omit<ResourceArticle, "_id" | "createdAt" | "updatedAt"> => ({
  slug: "",
  title: "",
  description: "",
  category: "Resources",
  readTime: "5 min read",
  images: [{ src: "", alt: "" }],
  body: [{ type: "paragraph", text: "" }],
  sortOrder: 0,
});

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceArticle[]>([]);
  const [form, setForm] = useState(emptyResource());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadResources() {
    setLoading(true);
    try {
      const data = await cmsFetch<ResourceArticle[]>("/api/cms/resources");
      setResources(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadResources();
  }, []);

  function resetForm() {
    setForm(emptyResource());
    setEditingId(null);
  }

  function updateImage(index: number, patch: Partial<ResourceImage>) {
    setForm({
      ...form,
      images: form.images.map((image, imageIndex) => (imageIndex === index ? { ...image, ...patch } : image)),
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/resources/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Resource updated");
      } else {
        await cmsFetch("/api/cms/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Resource created");
      }
      resetForm();
      await loadResources();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resource?")) return;
    await cmsFetch(`/api/cms/resources/${id}`, { method: "DELETE" });
    await loadResources();
  }

  function startEdit(resource: ResourceArticle) {
    setEditingId(resource._id);
    setForm({
      slug: resource.slug,
      title: resource.title,
      description: resource.description,
      category: resource.category,
      readTime: resource.readTime,
      images: resource.images.length ? resource.images : [{ src: "", alt: "" }],
      body: resource.body.length ? resource.body : [{ type: "paragraph", text: "" }],
      sortOrder: resource.sortOrder,
    });
  }

  return (
    <AdminShell>
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit resource" : "New resource"}</h2>
          <TextField label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
          <TextField label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: value })} plain />
          <TextField label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} multiline />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
            <TextField label="Read time" value={form.readTime} onChange={(value) => setForm({ ...form, readTime: value })} />
          </div>
          <NumberField label="Sort order" value={form.sortOrder} onChange={(value) => setForm({ ...form, sortOrder: value })} />

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black/70">Images</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, images: [...form.images, { src: "", alt: "" }] })}
                className="text-[10px] font-bold uppercase"
              >
                + Add image
              </button>
            </div>
            {form.images.map((image, index) => (
              <article key={`image-${index}`} className="grid gap-3 border border-black/10 p-4">
                <ImageField label={`Image ${index + 1}`} value={image.src} onChange={(value) => updateImage(index, { src: value })} />
                <TextField label="Alt text" value={image.alt} onChange={(value) => updateImage(index, { alt: value })} />
                {image.src ? (
                  <div className="relative h-24 w-full max-w-xs overflow-hidden border border-black/10 bg-[#f7f7f7]">
                    <Image src={image.src} alt="" fill className="object-cover" sizes="200px" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="grid gap-3">
            <span className="text-sm font-medium text-black/70">Article body</span>
            <BodyBlocksEditor blocks={form.body} onChange={(body) => setForm({ ...form, body })} />
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
          <h2 className="m-0 text-xl font-light uppercase">All resources</h2>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid max-h-[80vh] gap-4 overflow-y-auto pr-1">
            {resources.map((resource) => (
              <article key={resource._id} className="grid grid-cols-[72px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-16 w-16 bg-[#f7f7f7]">
                  {resource.images[0]?.src ? (
                    <Image src={resource.images[0].src} alt="" fill className="object-cover" sizes="64px" />
                  ) : null}
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{resource.title}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">/{resource.slug}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{resource.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(resource)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(resource._id)} className="text-xs text-red-600 uppercase">
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
