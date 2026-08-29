"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { CheckboxField, cmsFetch, ImageField, NumberField, TextField } from "../../components/AdminFields";
import type { Solution } from "@/lib/cms/types";

const emptySolution = (): Omit<Solution, "_id" | "createdAt" | "updatedAt"> => ({
  title: "",
  slug: "",
  description: "",
  image: "",
  href: "/solutions",
  tags: [],
  sortOrder: 0,
  featuredInNav: false,
});

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [form, setForm] = useState(emptySolution());
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadSolutions() {
    setLoading(true);
    const data = await cmsFetch<Solution[]>("/api/cms/solutions");
    setSolutions(data);
    setLoading(false);
  }

  useEffect(() => {
    void loadSolutions();
  }, []);

  function resetForm() {
    setForm(emptySolution());
    setTagsInput("");
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/solutions/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMessage("Solution updated");
      } else {
        await cmsFetch("/api/cms/solutions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMessage("Solution created");
      }
      resetForm();
      await loadSolutions();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this solution?")) return;
    await cmsFetch(`/api/cms/solutions/${id}`, { method: "DELETE" });
    await loadSolutions();
  }

  function startEdit(solution: Solution) {
    setEditingId(solution._id);
    setForm({
      title: solution.title,
      slug: solution.slug,
      description: solution.description,
      image: solution.image,
      href: solution.href,
      tags: solution.tags,
      sortOrder: solution.sortOrder,
      featuredInNav: solution.featuredInNav,
    });
    setTagsInput(solution.tags.join(", "));
  }

  return (
    <AdminShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit solution" : "New solution"}</h2>
          <TextField label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
          <TextField label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: value })} plain />
          <ImageField label="Image" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <TextField label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} multiline />
          <TextField label="Link (href)" value={form.href} onChange={(value) => setForm({ ...form, href: value })} />
          <TextField label="Tags (comma separated)" value={tagsInput} onChange={setTagsInput} />
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
          <h2 className="m-0 text-xl font-light uppercase">All solutions</h2>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid gap-4">
            {solutions.map((solution) => (
              <article key={solution._id} className="grid grid-cols-[72px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-16 w-16 bg-[#f7f7f7]">
                  <Image src={solution.image} alt="" fill className="object-contain p-1" sizes="64px" />
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{solution.title}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">{solution.href}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{solution.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(solution)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(solution._id)} className="text-xs text-red-600 uppercase">
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
