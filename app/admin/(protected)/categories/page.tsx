"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { CheckboxField, cmsFetch, ImageField, NumberField, TextField } from "../../components/AdminFields";
import type { Category } from "@/lib/cms/types";

const emptyCategory = (): Omit<Category, "_id" | "createdAt" | "updatedAt"> => ({
  name: "",
  slug: "",
  image: "",
  description: "",
  headerImageFit: "cover",
  sortOrder: 0,
  featuredInNav: false,
});

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyCategory());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    setLoading(true);
    const data = await cmsFetch<Category[]>("/api/cms/categories");
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    void loadCategories();
  }, []);

  function resetForm() {
    setForm(emptyCategory());
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Category updated");
      } else {
        await cmsFetch("/api/cms/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Category created");
      }
      resetForm();
      await loadCategories();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    await cmsFetch(`/api/cms/categories/${id}`, { method: "DELETE" });
    await loadCategories();
  }

  function startEdit(category: Category) {
    setEditingId(category._id);
    setForm({
      name: category.name,
      slug: category.slug,
      image: category.image,
      description: category.description,
      headerImageFit: category.headerImageFit,
      sortOrder: category.sortOrder,
      featuredInNav: category.featuredInNav,
    });
  }

  return (
    <AdminShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit category" : "New category"}</h2>
          <TextField label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <TextField label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: value })} plain />
          <ImageField label="Hero image" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <TextField label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} multiline />
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-black/70">Header image fit</span>
            <select
              value={form.headerImageFit}
              onChange={(event) => setForm({ ...form, headerImageFit: event.target.value as "contain" | "cover" })}
              className="h-10 border border-black/15 px-3 text-sm"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </label>
          <NumberField label="Sort order" value={form.sortOrder} onChange={(value) => setForm({ ...form, sortOrder: value })} />
          <CheckboxField label="Show in navigation menu" checked={form.featuredInNav} onChange={(value) => setForm({ ...form, featuredInNav: value })} />
          <div className="flex gap-3">
            <button type="submit" className="h-10 bg-black px-5 text-xs font-bold text-white uppercase">
              {editingId ? "Update" : "Create"}
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
          <h2 className="m-0 text-xl font-light uppercase">All categories</h2>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid gap-4">
            {categories.map((category) => (
              <article key={category._id} className="grid grid-cols-[72px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-16 w-16 bg-[#f7f7f7]">
                  <Image src={category.image} alt="" fill className="object-contain p-1" sizes="64px" />
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{category.name}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">/{category.slug}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{category.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(category)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(category._id)} className="text-xs text-red-600 uppercase">
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
