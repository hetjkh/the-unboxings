"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, ImageField, TextField } from "../../components/AdminFields";
import type { PageHero } from "@/lib/cms/types";

const emptyHero = (): Omit<PageHero, "_id" | "createdAt" | "updatedAt"> => ({
  pageKey: "",
  label: "",
  image: "",
  alt: "",
  title: "",
  subtitle: "",
  description: "",
});

export default function AdminHeroesPage() {
  const [heroes, setHeroes] = useState<PageHero[]>([]);
  const [form, setForm] = useState(emptyHero());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadHeroes() {
    setLoading(true);
    const data = await cmsFetch<PageHero[]>("/api/cms/page-heroes");
    setHeroes(data);
    setLoading(false);
  }

  useEffect(() => {
    void loadHeroes();
  }, []);

  function resetForm() {
    setForm(emptyHero());
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/page-heroes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Page hero updated");
      } else {
        await cmsFetch("/api/cms/page-heroes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Page hero created");
      }
      resetForm();
      await loadHeroes();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this page hero?")) return;
    await cmsFetch(`/api/cms/page-heroes/${id}`, { method: "DELETE" });
    await loadHeroes();
  }

  function startEdit(hero: PageHero) {
    setEditingId(hero._id);
    setForm({
      pageKey: hero.pageKey,
      label: hero.label,
      image: hero.image,
      alt: hero.alt,
      title: hero.title ?? "",
      subtitle: hero.subtitle ?? "",
      description: hero.description ?? "",
    });
  }

  return (
    <AdminShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit page hero" : "New page hero"}</h2>
          <TextField label="Page key" value={form.pageKey} onChange={(value) => setForm({ ...form, pageKey: value })} />
          <TextField label="Label" value={form.label} onChange={(value) => setForm({ ...form, label: value })} />
          <ImageField label="Hero image" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <TextField label="Alt text" value={form.alt} onChange={(value) => setForm({ ...form, alt: value })} />
          <TextField label="Title" value={form.title ?? ""} onChange={(value) => setForm({ ...form, title: value })} />
          <TextField label="Subtitle" value={form.subtitle ?? ""} onChange={(value) => setForm({ ...form, subtitle: value })} />
          <TextField label="Description" value={form.description ?? ""} onChange={(value) => setForm({ ...form, description: value })} multiline />
          <p className="m-0 text-xs text-black/50">
            Use page keys like <code>behind-the-design</code>. Category heroes are managed under Categories.
          </p>
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
          <h2 className="m-0 text-xl font-light uppercase">All page heroes</h2>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid gap-4">
            {heroes.map((hero) => (
              <article key={hero._id} className="grid grid-cols-[96px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-20 w-24 bg-[#f7f7f7]">
                  <Image src={hero.image} alt="" fill className="object-contain p-1" sizes="96px" />
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{hero.label}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">{hero.pageKey}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{hero.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(hero)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(hero._id)} className="text-xs text-red-600 uppercase">
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
